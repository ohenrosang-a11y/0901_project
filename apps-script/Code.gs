/**
 * 기록의 온도 - Google Sheets 인증 API
 *
 * 1. Apps Script 편집기(Extensions > Apps Script)에 이 내용을 붙여넣습니다.
 * 2. setupAuth()를 한 번 실행하고 권한을 승인합니다.
 * 3. [배포] > [배포 관리] > 연필 아이콘 클릭 > [새 버전] 선택 후 [배포]를 누릅니다.
 */

const AUTH_CONFIG = Object.freeze({
  spreadsheetId: '1RhBPPLH-jYe6w63h_ud5S8gcT9-GEKI9eDSfkvgTvp8',
  usersSheet: 'Users',
  sessionsSheet: 'Sessions',
  hashIterations: 600, // 초고속 응답을 위한 최적화 해시 반복 횟수
  legacyHashIterations: 12000, // 기존 가입 계정 호환성 보장
  sessionHours: 24,
  maxLoginAttempts: 5,
  loginBlockSeconds: 15 * 60,
});

const USER_HEADERS = [
  'id',
  'email',
  'name',
  'nickname',
  'passwordHash',
  'passwordSalt',
  'status',
  'createdAt',
  'lastLoginAt',
];

const SESSION_HEADERS = [
  'tokenHash',
  'userId',
  'expiresAt',
  'createdAt',
];

// 실행 컨텍스트 메모리 캐시 (불필요한 중복 API 호출 방지)
let cachedSpreadsheet_ = null;
let cachedPepper_ = null;

function setupAuth() {
  ensureAuthSetup_();
  return '인증용 시트와 보안 설정이 준비되었습니다.';
}

function doGet(e) {
  try {
    const action = String((e && e.parameter && e.parameter.action) || 'health');

    if (action === 'health') {
      return json_({ ok: true, message: 'Auth API is running.' });
    }

    return json_({ ok: false, message: '지원하지 않는 요청입니다.' });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, message: '서버 처리 중 오류가 발생했습니다.' });
  }
}

function doPost(e) {
  try {
    const payload = parseBody_(e);
    const action = String(payload.action || '');

    if (action === 'signup') {
      return signup_(payload);
    }

    if (action === 'login') {
      return login_(payload);
    }

    if (action === 'logout') {
      return logout_(String(payload.token || ''));
    }

    if (action === 'me') {
      return getCurrentUser_(String(payload.token || ''));
    }

    return json_({ ok: false, message: '지원하지 않는 요청입니다.' });
  } catch (error) {
    console.error(error);
    return json_({
      ok: false,
      message: error && error.message
        ? error.message
        : '요청을 처리하지 못했습니다.',
    });
  }
}

function signup_(payload) {
  const email = normalizeEmail_(payload.email);
  const name = cleanText_(payload.name, 40);
  const nickname = cleanText_(payload.nickname, 30);
  const password = String(payload.password || '');

  validateSignup_(email, name, nickname, password);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getSheet_(AUTH_CONFIG.usersSheet);
    const users = getObjects_(sheet);

    if (users.some(function (user) { return normalizeEmail_(user.email) === email; })) {
      return json_({ ok: false, code: 'EMAIL_EXISTS', message: '이미 가입된 이메일입니다.' });
    }

    if (
      users.some(function (user) {
        return String(user.nickname).toLowerCase() === nickname.toLowerCase();
      })
    ) {
      return json_({ ok: false, code: 'NICKNAME_EXISTS', message: '이미 사용 중인 필명입니다.' });
    }

    const salt = createRandomToken_();
    const passwordHash = hashPassword_(password, salt, AUTH_CONFIG.hashIterations);
    const now = new Date();
    const userId = Utilities.getUuid();

    sheet.appendRow([
      userId,
      email,
      name,
      nickname,
      passwordHash,
      salt,
      'ACTIVE',
      now,
      '',
    ]);

    return json_({
      ok: true,
      message: '회원가입이 완료되었습니다.',
      data: {
        user: {
          id: userId,
          email: email,
          name: name,
          nickname: nickname,
        },
      },
    });
  } finally {
    lock.releaseLock();
  }
}

function login_(payload) {
  const email = normalizeEmail_(payload.email);
  const password = String(payload.password || '');

  if (!isValidEmail_(email) || !password) {
    return json_({ ok: false, code: 'INVALID_INPUT', message: '이메일과 비밀번호를 확인해 주세요.' });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    if (isLoginBlocked_(email)) {
      return json_({
        ok: false,
        code: 'TOO_MANY_ATTEMPTS',
        message: '로그인 시도가 너무 많습니다. 15분 후 다시 시도해 주세요.',
      });
    }

    const usersSheet = getSheet_(AUTH_CONFIG.usersSheet);
    const users = getObjects_(usersSheet);
    const user = users.find(function (item) {
      return normalizeEmail_(item.email) === email;
    });

    if (!user || user.status !== 'ACTIVE') {
      recordFailedLogin_(email);
      return json_({
        ok: false,
        code: 'INVALID_CREDENTIALS',
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      });
    }

    const salt = String(user.passwordSalt);
    const storedHash = String(user.passwordHash);

    // 1. 고속 해시 검증 (AUTH_CONFIG.hashIterations)
    let valid = constantTimeEqual_(hashPassword_(password, salt, AUTH_CONFIG.hashIterations), storedHash);

    // 2. 기존 레거시 계정(12000 iterations) 호환성 검증 및 자동 업그레이드
    if (!valid && AUTH_CONFIG.legacyHashIterations) {
      const legacyHash = hashPassword_(password, salt, AUTH_CONFIG.legacyHashIterations);
      if (constantTimeEqual_(legacyHash, storedHash)) {
        valid = true;
        // 다음 로그인부터 지연 없이 처리되도록 고속 해시로 자동 업데이트
        try {
          const newFastHash = hashPassword_(password, salt, AUTH_CONFIG.hashIterations);
          const hashCol = USER_HEADERS.indexOf('passwordHash') + 1;
          usersSheet.getRange(user.__rowNumber, hashCol).setValue(newFastHash);
        } catch (migErr) {
          console.warn('Hash upgrade notice:', migErr);
        }
      }
    }

    if (!valid) {
      recordFailedLogin_(email);
      return json_({
        ok: false,
        code: 'INVALID_CREDENTIALS',
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      });
    }

    clearFailedLogins_(email);

    // 주기적 세션 정리 (로그인 5회당 1회 배치 처리)
    if (Math.random() < 0.2) {
      deleteExpiredSessions_();
    }

    const token = createRandomToken_() + createRandomToken_();
    const tokenHash = sha256_(token);
    const now = new Date();
    const expiresAt = new Date(
      now.getTime() + AUTH_CONFIG.sessionHours * 60 * 60 * 1000
    );

    getSheet_(AUTH_CONFIG.sessionsSheet).appendRow([
      tokenHash,
      user.id,
      expiresAt,
      now,
    ]);

    updateUserLastLogin_(usersSheet, user.__rowNumber, now);

    const pubUser = publicUser_(user);

    // ScriptCache에 세션 캐싱 (10분간 DB 조회 없이 초고속 me 응답)
    try {
      CacheService.getScriptCache().put('user_sess:' + tokenHash, JSON.stringify(pubUser), 600);
    } catch (cErr) {}

    return json_({
      ok: true,
      message: '로그인되었습니다.',
      data: {
        token: token,
        expiresAt: expiresAt.toISOString(),
        user: pubUser,
      },
    });
  } finally {
    lock.releaseLock();
  }
}

function logout_(token) {
  if (!token) {
    return json_({ ok: true, message: '로그아웃되었습니다.' });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const tokenHash = sha256_(token);

    // 캐시 즉시 무효화
    try {
      CacheService.getScriptCache().remove('user_sess:' + tokenHash);
    } catch (cErr) {}

    const sheet = getSheet_(AUTH_CONFIG.sessionsSheet);
    const sessions = getObjects_(sheet);
    const session = sessions.find(function (item) {
      return constantTimeEqual_(String(item.tokenHash), tokenHash);
    });

    if (session) {
      sheet.deleteRow(session.__rowNumber);
    }

    return json_({ ok: true, message: '로그아웃되었습니다.' });
  } finally {
    lock.releaseLock();
  }
}

function getCurrentUser_(token) {
  if (!token) {
    return json_({ ok: false, code: 'UNAUTHORIZED', message: '로그인이 필요합니다.' });
  }

  const tokenHash = sha256_(token);

  // 1. ScriptCache 캐시 우선 확인 (0초대 초고속 응답)
  try {
    const cached = CacheService.getScriptCache().get('user_sess:' + tokenHash);
    if (cached) {
      const user = JSON.parse(cached);
      return json_({ ok: true, data: { user: user } });
    }
  } catch (cErr) {}

  // 2. DB 조회 (캐시 미스 시)
  const sessions = getObjects_(getSheet_(AUTH_CONFIG.sessionsSheet));
  const session = sessions.find(function (item) {
    return (
      constantTimeEqual_(String(item.tokenHash), tokenHash) &&
      new Date(item.expiresAt).getTime() > Date.now()
    );
  });

  if (!session) {
    return json_({ ok: false, code: 'SESSION_EXPIRED', message: '로그인이 만료되었습니다.' });
  }

  const user = getObjects_(getSheet_(AUTH_CONFIG.usersSheet)).find(function (item) {
    return String(item.id) === String(session.userId) && item.status === 'ACTIVE';
  });

  if (!user) {
    return json_({ ok: false, code: 'UNAUTHORIZED', message: '사용자 정보를 찾을 수 없습니다.' });
  }

  const pubUser = publicUser_(user);

  // 캐시 재등록
  try {
    CacheService.getScriptCache().put('user_sess:' + tokenHash, JSON.stringify(pubUser), 600);
  } catch (cErr) {}

  return json_({ ok: true, data: { user: pubUser } });
}

function validateSignup_(email, name, nickname, password) {
  if (!isValidEmail_(email)) {
    throw new Error('올바른 이메일을 입력해 주세요.');
  }

  if (name.length < 2 || nickname.length < 2) {
    throw new Error('이름과 필명은 2자 이상 입력해 주세요.');
  }

  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    throw new Error('비밀번호는 영문과 숫자를 포함해 8자 이상이어야 합니다.');
  }
}

function hashPassword_(password, salt, iterations) {
  const pepper = getPepper_();
  const iterCount = iterations || AUTH_CONFIG.hashIterations;

  let value = salt + String(password) + pepper;

  for (let i = 0; i < iterCount; i += 1) {
    value = sha256_(value + salt + pepper);
  }

  return value;
}

function sha256_(value) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(value),
    Utilities.Charset.UTF_8
  );

  let hex = '';
  for (let i = 0; i < bytes.length; i += 1) {
    const b = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex += (b < 16 ? '0' : '') + b.toString(16);
  }
  return hex;
}

function constantTimeEqual_(left, right) {
  if (left.length !== right.length) {
    return false;
  }

  let difference = 0;
  for (let i = 0; i < left.length; i += 1) {
    difference |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return difference === 0;
}

function createRandomToken_() {
  return Utilities.getUuid().replace(/-/g, '');
}

function publicUser_(user) {
  return {
    id: String(user.id),
    email: String(user.email),
    name: String(user.name),
    nickname: String(user.nickname),
  };
}

function updateUserLastLogin_(sheet, rowNumber, date) {
  const lastLoginColumn = USER_HEADERS.indexOf('lastLoginAt') + 1;
  sheet.getRange(rowNumber, lastLoginColumn).setValue(date);
}

function deleteExpiredSessions_() {
  try {
    const sheet = getSheet_(AUTH_CONFIG.sessionsSheet);
    const values = sheet.getDataRange().getValues();
    if (values.length < 2) return;

    const headers = values[0];
    const expCol = headers.indexOf('expiresAt');
    if (expCol === -1) return;

    const now = Date.now();
    let hasExpired = false;
    const remainingRows = [headers];

    for (let i = 1; i < values.length; i += 1) {
      const row = values[i];
      const expTime = new Date(row[expCol]).getTime();
      if (expTime > now) {
        remainingRows.push(row);
      } else {
        hasExpired = true;
      }
    }

    if (hasExpired) {
      sheet.clearContents();
      sheet.getRange(1, 1, remainingRows.length, headers.length).setValues(remainingRows);
    }
  } catch (err) {
    console.warn('Session cleanup warning:', err);
  }
}

function loginAttemptKey_(email) {
  return 'login:' + sha256_(email).slice(0, 32);
}

function isLoginBlocked_(email) {
  const attempts = Number(
    CacheService.getScriptCache().get(loginAttemptKey_(email)) || 0
  );
  return attempts >= AUTH_CONFIG.maxLoginAttempts;
}

function recordFailedLogin_(email) {
  const cache = CacheService.getScriptCache();
  const key = loginAttemptKey_(email);
  const attempts = Number(cache.get(key) || 0) + 1;
  cache.put(key, String(attempts), AUTH_CONFIG.loginBlockSeconds);
}

function clearFailedLogins_(email) {
  CacheService.getScriptCache().remove(loginAttemptKey_(email));
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('요청 본문이 없습니다.');
  }

  return JSON.parse(e.postData.contents);
}

function normalizeEmail_(email) {
  return String(email || '').trim().toLowerCase();
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanText_(value, maxLength) {
  return String(value || '')
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, maxLength);
}

function getPepper_() {
  if (!cachedPepper_) {
    const properties = PropertiesService.getScriptProperties();
    cachedPepper_ = properties.getProperty('PASSWORD_PEPPER');
    if (!cachedPepper_) {
      cachedPepper_ = Utilities.getUuid() + Utilities.getUuid() + Utilities.getUuid();
      properties.setProperty('PASSWORD_PEPPER', cachedPepper_);
    }
  }
  return cachedPepper_;
}

function getSpreadsheet_() {
  if (!cachedSpreadsheet_) {
    cachedSpreadsheet_ = SpreadsheetApp.openById(AUTH_CONFIG.spreadsheetId);
  }
  return cachedSpreadsheet_;
}

function getSheet_(name) {
  const spreadsheet = getSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    ensureAuthSetup_();
    sheet = spreadsheet.getSheetByName(name);
  }

  if (!sheet) {
    throw new Error('인증용 시트를 준비하지 못했습니다: ' + name);
  }

  return sheet;
}

function ensureAuthSetup_() {
  const spreadsheet = getSpreadsheet_();

  createSheetIfMissing_(spreadsheet, AUTH_CONFIG.usersSheet, USER_HEADERS);
  createSheetIfMissing_(spreadsheet, AUTH_CONFIG.sessionsSheet, SESSION_HEADERS);

  getPepper_();

  return spreadsheet;
}

function getObjects_(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) {
    return [];
  }

  const headers = values[0];
  return values.slice(1)
    .map(function (row, index) {
      const item = { __rowNumber: index + 2 };
      headers.forEach(function (header, columnIndex) {
        item[header] = row[columnIndex];
      });
      return item;
    })
    .filter(function (item) { return item.id || item.tokenHash; });
}

function createSheetIfMissing_(spreadsheet, name, headers) {
  let sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#22211f')
      .setFontColor('#ffffff');
    sheet.autoResizeColumns(1, headers.length);
  }
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
