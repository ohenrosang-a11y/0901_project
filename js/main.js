const AUTH_API_URL = "https://script.google.com/macros/s/AKfycbzn1psT8w_bRAKlSaJpPAM99OzOV4T-Z9LV4aGbYe3PW9JmRyMW6313zw7v-mCZbzMY/exec";

// 1. 기본 제공 게시글 데이터
const defaultPosts = [
  {
    id: "post-1",
    title: "좋은 코드는 읽는 사람을 배려한다",
    category: "개발",
    date: "2026. 09. 05",
    read: "6분",
    excerpt: "코드는 컴퓨터보다 사람이 더 자주 읽습니다. 협업하며 배운 읽기 좋은 코드의 작은 원칙들을 정리했습니다.",
    visual: "{ clean code }",
    author: "김민준",
    authorNickname: "minjune",
    body: `코드는 컴퓨터가 실행하지만, 그 코드를 가장 오래 마주하는 것은 결국 사람입니다. 좋은 코드는 정답을 뽐내기보다 다음 사람의 이해를 돕습니다.

처음 개발을 배울 때는 동작하는 코드를 만드는 것만으로 충분하다고 생각했습니다. 하지만 여러 사람과 하나의 제품을 오래 만들면서 기준이 달라졌습니다. 오늘의 영리한 한 줄보다 다음 달에도 편하게 고칠 수 있는 열 줄이 더 나을 때가 많았습니다.

## 이름은 가장 가까운 설명서다
변수와 함수의 이름은 코드에서 가장 자주 읽는 문장입니다. \`data\`나 \`value\`처럼 맥락을 감춘 이름보다, 무엇을 담고 왜 존재하는지 드러내는 이름이 좋습니다. 이름을 정하기 어렵다면 코드가 한 번에 너무 많은 일을 하는 것은 아닌지 살펴볼 신호이기도 합니다.

> 좋은 이름은 주석 없이도 코드가 자신의 의도를 말하게 합니다.

## 한 번에 하나의 맥락만 보여주기
긴 함수는 읽는 사람이 머릿속에 많은 정보를 동시에 올려두게 만듭니다. 의미 있는 단위로 나누면 세부 구현을 잠시 접어 두고 전체 흐름부터 이해할 수 있습니다. 함수의 길이보다 중요한 것은 하나의 추상화 수준을 유지하는 일입니다.

## 팀의 언어를 만드는 일
코드 스타일은 개인의 취향보다 팀의 약속에 가깝습니다. 함께 이름의 규칙을 정하고 반복되는 판단을 자동화하면 리뷰에서는 더 중요한 문제에 집중할 수 있습니다. 결국 읽기 좋은 코드는 기술적 능력을 넘어 동료의 시간을 존중하는 태도에서 시작합니다.`
  },
  {
    id: "post-2",
    title: "사이드 프로젝트를 끝내는 방법",
    category: "개발",
    date: "2026. 08. 28",
    read: "8분",
    excerpt: "거창한 계획보다 완성의 경험이 중요합니다. 범위를 줄이고 끝까지 배포하기 위해 사용한 현실적인 방법들.",
    visual: "ship →",
    author: "김민준",
    authorNickname: "minjune",
    body: `사이드 프로젝트의 가장 큰 적은 거창한 계획입니다. 처음에는 온갖 멋진 기능과 완벽한 설계를 꿈꾸지만, 일상의 피로와 마주하면 프로젝트는 서서히 멈춥니다.

## 범위를 반으로, 다시 그 반으로 줄이기
가장 먼저 해야 할 일은 핵심 가치 하나만 남기고 모든 것을 덜어내는 것입니다. 회원가입이 없어도 동작할 수 있다면 빼고, 세련된 애니메이션 대신 빠른 배포를 택하세요.

> 완성되지 않은 100점짜리 기획보다, 배포된 60점짜리 작은 제품이 훨씬 더 많은 것을 가르쳐 줍니다.

## 피드백의 순환을 빠르게 만들기
제품을 공개하고 단 한 명의 사용자라도 써보게 하는 순간, 프로젝트는 의무가 아닌 대화가 됩니다. 작게 만들어 빠르게 배포하세요.`
  },
  {
    id: "post-3",
    title: "여름의 끝에서 발견한 것들",
    category: "일상",
    date: "2026. 08. 19",
    read: "4분",
    excerpt: "유난히 길었던 여름, 익숙한 동네를 천천히 걸으며 새롭게 보게 된 장면과 마음에 관한 기록입니다.",
    visual: "08 / 19",
    author: "김민준",
    authorNickname: "minjune",
    body: `유난히 덥고 길었던 여름이 지나가고 있습니다. 해질녘 바람의 온도가 달라진 것을 느끼며 매일 걷던 동네 골목길을 천천히 걸었습니다.

빠르게 지나칠 때는 보이지 않던 담벼락의 능소화와 작은 서점의 불빛이 눈에 들어왔습니다. 삶에서도 때로는 속도를 늦추어야만 보이는 것들이 있습니다.`
  },
  {
    id: "post-4",
    title: "꾸준함에 재능이 필요한가요",
    category: "생각",
    date: "2026. 08. 11",
    read: "5분",
    excerpt: "매일 잘하는 대신 다시 돌아오는 연습. 꾸준함을 의지가 아닌 환경의 문제로 바라봅니다.",
    visual: "again.",
    author: "김민준",
    authorNickname: "minjune",
    body: `무언가를 매일 꾸준히 하는 사람들을 보면 대단한 의지력이 있는 것처럼 보입니다. 하지만 꾸준함은 의지의 문제가 아니라 마찰을 줄이는 환경의 문제입니다.

하루 실패했다고 포기하지 않고, 다음 날 아무 일 없었다는 듯 다시 시작하는 복원력이 꾸준함의 본질입니다.`
  },
  {
    id: "post-5",
    title: "CSS Grid로 만드는 유연한 레이아웃",
    category: "개발",
    date: "2026. 07. 30",
    read: "7분",
    excerpt: "복잡한 미디어 쿼리를 줄이고 콘텐츠에 맞춰 자연스럽게 반응하는 그리드 패턴을 소개합니다.",
    visual: "# grid",
    author: "김민준",
    authorNickname: "minjune",
    body: `CSS Grid는 2차원 레이아웃을 다루는 데 있어 가장 강력한 도구입니다. \`repeat(auto-fit, minmax(...))\` 구문만 익혀도 대부분의 반응형 카드를 미디어 쿼리 없이 구현할 수 있습니다.`
  },
  {
    id: "post-6",
    title: "느리게 읽는 시간",
    category: "일상",
    date: "2026. 07. 18",
    read: "3분",
    excerpt: "속도에서 잠시 벗어나 문장 하나를 오래 바라보는 일이 건네준 뜻밖의 여유에 대하여.",
    visual: "pause",
    author: "김민준",
    authorNickname: "minjune",
    body: `요즘 우리는 스크롤을 내리며 훑어보는 읽기에 익숙해져 있습니다. 한 권의 책을 천천히 읽으며 문장 사이의 여백을 음미하는 시간은 흩어진 주의력을 모아줍니다.`
  }
];

// 2. 글 데이터 저장소 헬퍼 함수 (CRUD 공통)
function getStoredCustomPosts() {
  try {
    const raw = localStorage.getItem("blog-custom-posts");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCustomPosts(list) {
  localStorage.setItem("blog-custom-posts", JSON.stringify(list));
}

function deleteCustomPost(id) {
  const posts = getStoredCustomPosts();
  const next = posts.filter((p) => String(p.id) !== String(id));
  saveCustomPosts(next);
}

function getAllPosts() {
  const custom = getStoredCustomPosts();
  return [...custom, ...defaultPosts];
}

// 3. 모바일 네비게이션 토글
const nav = document.querySelector(".site-nav"),
  toggle = document.querySelector(".menu-toggle");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  });
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// 4. 메인 피드 글 목록 렌더링 (실제 데이터 기반 목록 카드 & 상세 이동 연결)
const list = document.querySelector("#post-list"),
  search = document.querySelector("#post-search"),
  filters = document.querySelectorAll("[data-filter]"),
  empty = document.querySelector("#empty-state"),
  more = document.querySelector("#load-more");

let activeFilter = "all",
  visibleCount = 4;

function renderPosts() {
  if (!list) return;
  const posts = getAllPosts();
  const query = (search?.value || "").trim().toLowerCase();
  const filtered = posts.filter(
    (p) =>
      (activeFilter === "all" || p.category === activeFilter) &&
      (p.title + p.excerpt).toLowerCase().includes(query)
  );

  list.innerHTML = filtered
    .slice(0, visibleCount)
    .map((p) => {
      const isCustom = !String(p.id).startsWith("post-");
      const detailUrl = `post-detail.html?id=${encodeURIComponent(p.id)}`;
      return `
      <article class="post-item" data-url="${detailUrl}">
        <div class="post-content">
          <div class="post-meta">
            <span class="category">${escapeHtml(p.category)}</span>
            <span>${escapeHtml(p.date)}</span>
            <span>· ${escapeHtml(p.read)}</span>
            ${p.author ? `<span>· ${escapeHtml(p.author)}</span>` : ""}
            ${isCustom ? `<span class="post-badge-new">NEW</span>` : ""}
          </div>
          <h3><a href="${detailUrl}">${escapeHtml(p.title)}</a></h3>
          <p class="post-excerpt">${escapeHtml(p.excerpt)}</p>
        </div>
        <a class="post-thumb placeholder" href="${detailUrl}" aria-label="${escapeHtml(p.title)} 읽기">${escapeHtml(p.visual || "{ note }")}</a>
      </article>
    `;
    })
    .join("");

  // 카드 전체 클릭 시 상세 페이지로 이동
  list.querySelectorAll(".post-item").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest("a")) {
        const url = card.dataset.url;
        if (url) location.href = url;
      }
    });
  });

  if (empty) empty.hidden = filtered.length > 0;
  if (more) more.hidden = visibleCount >= filtered.length;
}

filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    activeFilter = btn.dataset.filter;
    visibleCount = 4;
    renderPosts();
  })
);

search?.addEventListener("input", () => {
  visibleCount = 4;
  renderPosts();
});

more?.addEventListener("click", () => {
  visibleCount += 2;
  renderPosts();
});

renderPosts();

// 5. 글 상세 페이지 동적 렌더링 (R: Read)
function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatMarkdownToHtml(content) {
  if (!content) return { html: "", headings: [] };
  const lines = content.split(/\r?\n/);
  const htmlParts = [];
  const headings = [];
  let currentP = [];

  const flushP = () => {
    if (currentP.length > 0) {
      const text = currentP.join("<br>");
      htmlParts.push(`<p>${formatInline(text)}</p>`);
      currentP = [];
    }
  };

  const formatInline = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, "<code>$1</code>");
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushP();
    } else if (trimmed.startsWith("## ")) {
      flushP();
      const headingText = trimmed.slice(3).trim();
      const headingId = "heading-" + (headings.length + 1);
      headings.push({ id: headingId, title: headingText });
      htmlParts.push(`<h2 id="${headingId}">${formatInline(escapeHtml(headingText))}</h2>`);
    } else if (trimmed.startsWith("> ")) {
      flushP();
      const quoteText = escapeHtml(trimmed.slice(2).trim());
      htmlParts.push(`<blockquote>${formatInline(quoteText)}</blockquote>`);
    } else {
      currentP.push(escapeHtml(trimmed));
    }
  });
  flushP();
  return { html: htmlParts.join(""), headings };
}

function renderPostDetailPage() {
  const articleLayout = document.querySelector(".article-layout");
  if (!articleLayout) return;

  const params = new URLSearchParams(location.search);
  const postId = params.get("id");
  if (!postId) return;

  const all = getAllPosts();
  const post = all.find((p) => String(p.id) === String(postId));
  if (!post) return;

  const isCustomPost = getStoredCustomPosts().some(
    (p) => String(p.id) === String(post.id)
  );

  // 문서 타이틀 변경
  document.title = `${post.title} — 기록의 온도`;

  // 카테고리
  const catEl = document.querySelector(".article-header .category");
  if (catEl) catEl.textContent = post.category;

  // 제목
  const titleEl = document.querySelector(".article-header h1");
  if (titleEl) titleEl.textContent = post.title;

  // 메타 정보 및 수정/삭제 액션
  const metaEl = document.querySelector(".article-meta");
  if (metaEl) {
    metaEl.innerHTML = `
      <span>${escapeHtml(post.author || "김민준")}</span><span>·</span>
      <time>${escapeHtml(post.date)}</time><span>·</span>
      <span>${escapeHtml(post.read)} 소요</span>
      ${
        isCustomPost
          ? `
        <div class="article-actions">
          <a href="write.html?edit=${encodeURIComponent(post.id)}" class="button secondary btn-sm btn-edit">수정</a>
          <button type="button" class="button secondary btn-sm btn-delete" id="detail-delete-btn" data-delete-id="${escapeHtml(post.id)}">삭제</button>
        </div>`
          : ""
      }
    `;

    if (isCustomPost) {
      document.querySelector("#detail-delete-btn")?.addEventListener("click", () => {
        if (confirm(`"${post.title}" 글을 정말 삭제하시겠습니까?`)) {
          deleteCustomPost(post.id);
          alert("글이 삭제되었습니다.");
          location.href = "index.html";
        }
      });
    }
  }

  // 커버 비주얼
  const coverEl = document.querySelector(".article-cover");
  if (coverEl) coverEl.textContent = post.visual || `{ ${post.category} }`;

  // 본문 및 목차 렌더링
  const bodyEl = document.querySelector(".article-body");
  if (bodyEl && post.body) {
    const { html: contentHtml, headings } = formatMarkdownToHtml(post.body);
    const toc = document.querySelector(".article-toc");
    if (toc) {
      if (headings.length > 0) {
        toc.style.display = "block";
        toc.innerHTML =
          `<p>이 글의 목차</p>` +
          headings
            .map((h) => `<a href="#${h.id}">${escapeHtml(h.title)}</a>`)
            .join("");
      } else {
        toc.style.display = "none";
      }
    }

    bodyEl.innerHTML = `
      <p class="lead">${escapeHtml(post.excerpt)}</p>
      ${contentHtml}
      <div class="tag-list"><span>#${escapeHtml(post.category)}</span><span>#기록</span></div>
      <div class="article-author">
        <img src="assets/images/images.jfif" alt="${escapeHtml(post.author || "작성자")}">
        <div>
          <strong>${escapeHtml(post.author || "김민준")}</strong>
          <p>${post.authorNickname ? "@" + escapeHtml(post.authorNickname) + " · " : ""}배움과 생각을 솔직하게 기록합니다.</p>
        </div>
      </div>
      <nav class="article-nav" aria-label="글 이동">
        <a href="index.html">← 목록으로 돌아가기</a>
        <a href="write.html">새 글 쓰기 →</a>
      </nav>
    `;
  }
}
renderPostDetailPage();

// 6. 데모 폼 및 비밀번호 토글
document.querySelectorAll("[data-demo-form]").forEach((form) =>
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const status =
      form.querySelector(".form-status") ||
      document.querySelector(`#${form.dataset.status}`);
    if (form.checkValidity()) {
      if (status) status.textContent = form.dataset.message || "완료되었습니다.";
      form.reset();
    }
  })
);

document.querySelectorAll(".password-toggle").forEach((btn) =>
  btn.addEventListener("click", () => {
    const input = btn.previousElementSibling;
    input.type = input.type === "password" ? "text" : "password";
    btn.textContent = input.type === "password" ? "보기" : "숨김";
  })
);

// 7. 회원 인증 관련 기능 (Apps Script 연동)
function showAuthMessage(form, message, isError = false) {
  const box = form.querySelector(".success-box");
  if (!box) return;
  box.hidden = false;
  box.classList.toggle("is-error", isError);
  box.textContent = message;
}

function validateAuthForm(form) {
  let valid = true;
  form.querySelectorAll("[required]").forEach((input) => {
    const error = input.closest(".field")?.querySelector(".field-error");
    if ((input.type === "checkbox" && !input.checked) || !input.value.trim()) {
      valid = false;
      if (error) error.textContent = "필수 입력 항목입니다.";
    } else if (input.type === "email" && !input.validity.valid) {
      valid = false;
      if (error) error.textContent = "올바른 이메일을 입력해 주세요.";
    } else if (
      input.name === "password" &&
      (input.value.length < 8 ||
        !/[A-Za-z]/.test(input.value) ||
        !/[0-9]/.test(input.value))
    ) {
      valid = false;
      if (error)
        error.textContent = "영문과 숫자를 포함해 8자 이상 입력해 주세요.";
    } else if (error) {
      error.textContent = "";
    }
  });

  const password = form.querySelector("[name=password]"),
    confirm = form.querySelector("[name=passwordConfirm]");
  if (confirm && password?.value !== confirm.value) {
    valid = false;
    confirm.closest(".field").querySelector(".field-error").textContent =
      "비밀번호가 일치하지 않습니다.";
  }

  if (
    !valid &&
    form.querySelector("[name=terms]") &&
    !form.querySelector("[name=terms]").checked
  ) {
    showAuthMessage(form, "이용약관과 개인정보 처리방침에 동의해 주세요.", true);
  }
  return valid;
}

async function authRequest(payload) {
  const response = await fetch(AUTH_API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("인증 서버에 연결하지 못했습니다.");
  return response.json();
}

document.querySelectorAll(".auth-form").forEach((form) =>
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateAuthForm(form)) return;

    const action = form.dataset.authAction,
      button = form.querySelector("[type=submit]"),
      originalText = button.textContent,
      formData = new FormData(form);

    button.disabled = true;
    button.textContent = action === "login" ? "로그인 중..." : "계정 생성 중...";
    showAuthMessage(form, "요청을 처리하고 있습니다.");

    try {
      const payload = {
        action,
        email: formData.get("email"),
        password: formData.get("password"),
      };
      if (action === "signup") {
        payload.name = formData.get("name");
        payload.nickname = formData.get("nickname");
      }

      const result = await authRequest(payload);
      if (!result.ok) throw new Error(result.message || "요청을 처리하지 못했습니다.");

      if (action === "login") {
        const storage = formData.get("remember") ? "local" : "session";
        const target = storage === "local" ? localStorage : sessionStorage;
        const other = storage === "local" ? sessionStorage : localStorage;
        other.removeItem("blogAuthToken");
        other.removeItem("blogAuthUser");
        target.setItem("blogAuthToken", result.data.token);
        target.setItem("blogAuthUser", JSON.stringify(result.data.user));
        showAuthMessage(form, "로그인되었습니다. 프로필로 이동합니다.");
        setTimeout(() => (location.href = "profile.html"), 700);
      } else {
        form.reset();
        showAuthMessage(
          form,
          "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다."
        );
        setTimeout(() => (location.href = "login.html"), 900);
      }
    } catch (error) {
      showAuthMessage(
        form,
        error.message || "인증 서버와 통신하지 못했습니다.",
        true
      );
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  })
);

// 8. 저장된 인증 세션 관리 및 로그아웃
function getStoredAuth() {
  const isLocal = !!localStorage.getItem("blogAuthToken");
  const storage = isLocal ? localStorage : sessionStorage;
  const token = storage.getItem("blogAuthToken");
  let user = null;
  try {
    const raw = storage.getItem("blogAuthUser");
    if (raw) user = JSON.parse(raw);
  } catch (e) {}
  return { storage, token, user };
}

async function handleLogout() {
  const auth = getStoredAuth();
  try {
    if (auth.token) {
      await authRequest({ action: "logout", token: auth.token });
    }
  } catch (err) {
    console.warn("Logout request failed:", err);
  } finally {
    localStorage.removeItem("blogAuthToken");
    localStorage.removeItem("blogAuthUser");
    sessionStorage.removeItem("blogAuthToken");
    sessionStorage.removeItem("blogAuthUser");
    location.href = "index.html";
  }
}

// 9. 프로필 페이지 내 작성 글 관리 렌더링 (U: Update & D: Delete)
function renderMyPostsList(auth) {
  const listEl = document.querySelector("#my-posts-list");
  const countEl = document.querySelector("#my-posts-count");
  const emptyEl = document.querySelector("#my-posts-empty");
  if (!listEl) return;

  const customPosts = getStoredCustomPosts();
  let userPosts = customPosts;
  if (auth && auth.user) {
    userPosts = customPosts.filter(
      (p) =>
        !p.userId ||
        p.userId === auth.user.id ||
        p.author === auth.user.name ||
        p.authorNickname === auth.user.nickname
    );
  }

  if (countEl) countEl.textContent = `${userPosts.length}편`;

  if (userPosts.length === 0) {
    listEl.innerHTML = "";
    if (emptyEl) emptyEl.hidden = false;
    return;
  }

  if (emptyEl) emptyEl.hidden = true;

  listEl.innerHTML = userPosts
    .map((p) => {
      const detailUrl = `post-detail.html?id=${encodeURIComponent(p.id)}`;
      return `
      <div class="my-post-item" data-url="${detailUrl}">
        <div class="my-post-info">
          <div class="my-post-meta">
            <span class="category">${escapeHtml(p.category)}</span>
            <span class="date">${escapeHtml(p.date)}</span>
            <span class="read-time">· ${escapeHtml(p.read)}</span>
          </div>
          <h3 class="my-post-title">
            <a href="${detailUrl}">${escapeHtml(p.title)}</a>
          </h3>
          <p class="my-post-excerpt">${escapeHtml(p.excerpt)}</p>
        </div>
        <div class="my-post-actions">
          <a href="${detailUrl}" class="button secondary btn-sm" title="글 읽기">보기</a>
          <a href="write.html?edit=${encodeURIComponent(p.id)}" class="button secondary btn-sm btn-edit" title="글 수정">수정</a>
          <button type="button" class="button secondary btn-sm btn-delete" data-delete-id="${escapeHtml(p.id)}" title="글 삭제">삭제</button>
        </div>
      </div>
    `;
    })
    .join("");

  // 아이템 카드 클릭 시 상세 페이지 이동
  listEl.querySelectorAll(".my-post-item").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest("a") && !e.target.closest("button")) {
        const url = card.dataset.url;
        if (url) location.href = url;
      }
    });
  });

  listEl.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const deleteId = btn.dataset.deleteId;
      const target = customPosts.find((p) => String(p.id) === String(deleteId));
      const targetTitle = target ? `"${target.title}" ` : "";
      if (confirm(`${targetTitle}글을 정말 삭제하시겠습니까?`)) {
        deleteCustomPost(deleteId);
        renderMyPostsList(auth);
      }
    });
  });
}

// 10. 프로필 페이지 전체 렌더링
function renderProfilePage(auth) {
  const userSec = document.querySelector("#user-profile-view"),
    guestSec = document.querySelector("#guest-profile-view");
  if (!userSec && !guestSec) return;

  if (auth && auth.token) {
    if (userSec) userSec.hidden = false;
    if (guestSec) guestSec.hidden = true;

    if (auth.user) {
      const u = auth.user;
      const nameEl = document.querySelector("#user-display-name"),
        nickEl = document.querySelector("#user-display-nickname"),
        emailEl = document.querySelector("#user-display-email"),
        idEl = document.querySelector("#user-display-id"),
        avatarEl = document.querySelector("#profile-avatar");

      if (nameEl) nameEl.textContent = u.name || "사용자";
      if (nickEl) nickEl.textContent = u.nickname ? `@${u.nickname}` : "";
      if (emailEl) emailEl.textContent = u.email || "";
      if (idEl) idEl.textContent = u.id || "-";
      if (avatarEl)
        avatarEl.textContent = (u.name || u.nickname || "U")
          .slice(0, 1)
          .toUpperCase();

      renderMyPostsList(auth);
    } else {
      authRequest({ action: "me", token: auth.token })
        .then((res) => {
          if (res && res.ok && res.data && res.data.user) {
            auth.user = res.data.user;
            auth.storage.setItem(
              "blogAuthUser",
              JSON.stringify(res.data.user)
            );
            renderProfilePage(auth);
          }
        })
        .catch(() => {});
    }

    const btn = document.querySelector("#profile-logout-btn");
    if (btn) btn.onclick = async () => await handleLogout();
  } else {
    if (userSec) userSec.hidden = true;
    if (guestSec) guestSec.hidden = false;
  }
}

// 11. 네비게이션 로그인/로그아웃/프로필 UI 갱신
function updateAuthUI() {
  const auth = getStoredAuth();
  const loginLinks = document.querySelectorAll(
    'a[href="login.html"], .nav-login, a[href="#logout"]'
  );
  const signupLinks = document.querySelectorAll(
    'a[href="signup.html"], .nav-signup, .nav-cta'
  );

  if (auth.token) {
    loginLinks.forEach((link) => {
      link.textContent = "로그아웃";
      link.href = "#logout";
      link.setAttribute("aria-label", "로그아웃");
      link.onclick = async (e) => {
        e.preventDefault();
        await handleLogout();
      };
    });

    signupLinks.forEach((link) => {
      link.textContent = "프로필";
      link.href = "profile.html";
      link.setAttribute("aria-label", "내 프로필");
      link.classList.add("nav-cta");
    });
  } else {
    loginLinks.forEach((link) => {
      link.textContent = "로그인";
      link.href = "login.html";
      link.onclick = null;
    });

    signupLinks.forEach((link) => {
      link.textContent = "회원가입";
      link.href = "signup.html";
    });
  }

  renderProfilePage(auth);
}
updateAuthUI();

// 12. 좋아요 및 링크 복사
const like = document.querySelector("[data-like]");
like?.addEventListener("click", () => {
  like.classList.toggle("is-active");
  like.setAttribute("aria-pressed", String(like.classList.contains("is-active")));
  like.textContent = like.classList.contains("is-active") ? "♥" : "♡";
});

const copy = document.querySelector("[data-copy]");
copy?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    copy.textContent = "✓";
    setTimeout(() => (copy.textContent = "↗"), 1400);
  } catch {
    copy.textContent = "!";
  }
});

// 13. 글쓰기 및 글수정 에디터 (C: Create & U: Update)
const editor =
  document.querySelector("#editor-form") ||
  document.querySelector(".editor-form");

if (editor) {
  const title =
    editor.querySelector("#post-title") || editor.querySelector(".title-input");
  const summary =
    editor.querySelector("#post-summary") ||
    editor.querySelector(".summary-input");
  const body =
    editor.querySelector("#post-body") || editor.querySelector(".body-input");
  const category =
    editor.querySelector("#editor-category") ||
    editor.querySelector(".editor-category");
  const status = document.querySelector(".draft-status");
  const authorText = document.querySelector("#editor-author-text");
  const loginLink = document.querySelector("#editor-login-link");
  const modeLabel = document.querySelector("#editor-mode-label");
  const submitBtn = document.querySelector("#editor-submit-btn");
  const saveBtn = document.querySelector("#editor-save-btn");
  const draftKey = "blog-draft";

  // 수정 모드 확인 (?edit=id 또는 ?id=id)
  const urlParams = new URLSearchParams(location.search);
  const editId = urlParams.get("edit") || urlParams.get("id");
  let editingPost = null;

  if (editId) {
    const customList = getStoredCustomPosts();
    editingPost = customList.find((p) => String(p.id) === String(editId));
  }

  // 작성자 정보 표시
  const auth = getStoredAuth();
  if (authorText) {
    if (auth.user) {
      authorText.innerHTML = `작성자: <strong>${escapeHtml(auth.user.name)}</strong> (@${escapeHtml(auth.user.nickname)})`;
      if (loginLink) loginLink.style.display = "none";
    } else {
      authorText.innerHTML = `작성자: <strong>게스트</strong> (로그인 시 회원 정보가 작성자로 등록됩니다)`;
      if (loginLink) loginLink.style.display = "inline";
    }
  }

  if (editingPost) {
    // === 수정 모드 (Update Mode) ===
    document.title = `글 수정: ${editingPost.title} — 기록의 온도`;
    if (modeLabel) modeLabel.textContent = "글 수정하기";
    if (submitBtn) submitBtn.textContent = "수정 완료";
    if (status) status.textContent = "기존 글 수정 모드";
    if (saveBtn) saveBtn.style.display = "none";

    if (title) title.value = editingPost.title || "";
    if (summary) summary.value = editingPost.excerpt || "";
    if (category) category.value = editingPost.category || "개발";
    if (body) body.value = editingPost.body || "";
  } else {
    // === 새 글 작성 모드 (Create Mode) ===
    try {
      const draft = JSON.parse(localStorage.getItem(draftKey));
      if (draft) {
        if (title) title.value = draft.title || "";
        if (summary) summary.value = draft.summary || "";
        if (body) body.value = draft.body || "";
        if (category) category.value = draft.category || "개발";
        if (status) status.textContent = "임시저장본 불러옴";
      }
    } catch (e) {}

    const saveDraft = () => {
      localStorage.setItem(
        draftKey,
        JSON.stringify({
          title: title?.value || "",
          summary: summary?.value || "",
          body: body?.value || "",
          category: category?.value || "개발",
        })
      );
      if (status) {
        status.textContent = `${new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        })} 임시저장됨`;
      }
    };

    saveBtn?.addEventListener("click", saveDraft);
  }

  // 서식 도구 툴바
  document.querySelectorAll("[data-format]").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (!body) return;
      const mark = btn.dataset.format;
      const start = body.selectionStart;
      const end = body.selectionEnd;
      const selected = body.value.slice(start, end);
      body.setRangeText(mark + selected + mark, start, end, "select");
      body.focus();
    })
  );

  // 글 발행/수정 제출
  editor.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleVal = title?.value.trim() || "";
    const bodyVal = body?.value.trim() || "";
    const catVal = category?.value || "개발";
    let summaryVal = summary?.value.trim() || "";

    if (!titleVal) {
      alert("제목을 입력해 주세요.");
      title?.focus();
      return;
    }
    if (!bodyVal) {
      alert("본문 내용을 입력해 주세요.");
      body?.focus();
      return;
    }

    if (!summaryVal) {
      summaryVal =
        bodyVal.replace(/[#*`_>]/g, "").trim().slice(0, 90) + "...";
    }

    const readMinutes = Math.max(1, Math.ceil(bodyVal.length / 300));
    const customList = getStoredCustomPosts();

    if (editingPost) {
      // 1. 기존 글 수정 (Update)
      const idx = customList.findIndex((p) => String(p.id) === String(editingPost.id));
      if (idx !== -1) {
        customList[idx].title = titleVal;
        customList[idx].category = catVal;
        customList[idx].excerpt = summaryVal;
        customList[idx].body = bodyVal;
        customList[idx].read = `${readMinutes}분`;
        customList[idx].visual = `{ ${catVal} }`;
        customList[idx].updatedAt = Date.now();
        saveCustomPosts(customList);
      }
      alert("글이 성공적으로 수정되었습니다!\n상세 페이지로 이동합니다.");
      location.href = `post-detail.html?id=${encodeURIComponent(editingPost.id)}`;
    } else {
      // 2. 새 글 생성 (Create)
      const currentAuth = getStoredAuth();
      const authorName = currentAuth.user ? currentAuth.user.name : "게스트";
      const authorNick = currentAuth.user ? currentAuth.user.nickname : "";
      const authorId = currentAuth.user ? currentAuth.user.id : null;
      const now = new Date();
      const dateStr = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, "0")}. ${String(now.getDate()).padStart(2, "0")}`;

      const newPost = {
        id: "post_" + Date.now(),
        userId: authorId,
        title: titleVal,
        category: catVal,
        date: dateStr,
        read: `${readMinutes}분`,
        excerpt: summaryVal,
        body: bodyVal,
        author: authorName,
        authorNickname: authorNick,
        visual: `{ ${catVal} }`,
        createdAt: Date.now(),
      };

      customList.unshift(newPost);
      saveCustomPosts(customList);
      localStorage.removeItem(draftKey);

      alert("글이 성공적으로 발행되었습니다!\n메인 글 목록으로 이동합니다.");
      location.href = "index.html#latest";
    }
  });
}
