(function () {
  "use strict";

  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return Array.from(document.querySelectorAll(s)); }

  function t(s) { return s; }

  function getTree() {
    return qs(".sf-v83-tree") || qs(".sf-v82-tree");
  }

  function cleanOld() {
    qsa(".v86-user-block, .v87-user-block, .v85-admin-block, .final-admin-order-block, .sf-v84-admin-tree, .sf-v841-admin-final, .sf-v842-admin-block, .sf-v843-admin-block").forEach(x => x.remove());
  }

  function closeDrawer() {
    document.body.classList.remove("sf-v83-drawer-open");
    document.body.classList.remove("sf-v82-drawer-open");
    document.body.classList.remove("sf-sidebar-open");
  }

  function activate(btn) {
    qsa("[data-v89-action]").forEach(x => x.classList.remove("sf-v89-active-line"));
    btn.classList.add("sf-v89-active-line");
  }

  function findExternalPageButton(ids) {
    for (const id of ids) {
      const buttons = qsa('.menu-btn[data-page="' + id + '"], .nav-item[data-page="' + id + '"], [data-page="' + id + '"]');
      const found = buttons.find(b => !b.closest(".sf-v83-tree") && !b.closest(".sf-v82-tree"));
      if (found) return found;
    }
    return null;
  }

  function showPage(ids) {
    const btn = findExternalPageButton(ids);
    if (btn) {
      btn.click();
      return;
    }

    const pages = qsa(".page, .content-page");
    pages.forEach(p => p.classList.remove("active"));

    for (const id of ids) {
      const p = qs("#" + id);
      if (p) {
        p.classList.add("active");
        return;
      }
    }
  }

  function openAiTwin() {
    showPage(["aitwin", "ai-twin", "aiTwin"]);
  }

  function postToAiEcho(payload) {
    openAiTwin();

    setTimeout(function () {
      const frame = qs("#sfAiEchoFrame");
      if (frame && frame.contentWindow) {
        frame.contentWindow.postMessage(payload, "*");
      }
    }, 360);

    closeDrawer();
  }

  function handle(btn) {
    activate(btn);

    const action = btn.dataset.v89Action;

    if (action === "page") {
      const pages = String(btn.dataset.pages || "").split(",").map(x => x.trim()).filter(Boolean);
      showPage(pages);
      closeDrawer();
      return;
    }

    if (action === "echo") {
      postToAiEcho({
        type: "V89_OPEN_PANEL",
        panel: btn.dataset.panel
      });
      return;
    }

    if (action === "user") {
      postToAiEcho({
        type: "V89_USER_VIEW",
        view: btn.dataset.view
      });
      return;
    }

    if (action === "admin") {
      postToAiEcho({
        type: "V89_ADMIN_VIEW",
        view: btn.dataset.view
      });
      return;
    }
  }

  function rebuildTree() {
    const tree = getTree();
    if (!tree) return;

    cleanOld();

    document.body.classList.add("sf-v89-master");

    const html = `
      <div class="sf-v83-root">SoulFlame\\</div>

      <div class="sf-v83-section">├─ SoulMatch\\</div>
      <button class="sf-v83-line" data-v89-action="page" data-pages="chat,messages,message">│  ├─ 💬 Messages</button>
      <button class="sf-v83-line" data-v89-action="page" data-pages="matches,match">│  ├─ ❤️ Matches</button>
      <button class="sf-v83-line" data-v89-action="page" data-pages="aitwin,ai-twin,aiTwin">│  ├─ 🤖 AI Twin</button>
      <button class="sf-v83-line" data-v89-action="page" data-pages="profile">│  ├─ 🧍 Profile</button>
      <button class="sf-v83-line" data-v89-action="page" data-pages="daily">│  └─ 🔥 Daily</button>

      <div class="sf-v83-section">├─ AI Echo\\</div>
      <button class="sf-v83-line" data-v89-action="echo" data-panel="profilePanel">│  ├─ 👤 Profile</button>
      <button class="sf-v83-line" data-v89-action="echo" data-panel="echoPanel">│  ├─ 🧠 EchoProfile</button>
      <button class="sf-v83-line" data-v89-action="echo" data-panel="chatPanel">│  └─ 💬 GPT Chat</button>

      <div class="sf-v83-section">├─ User\\</div>
      <button class="sf-v83-line" data-v89-action="user" data-view="connectors">│  ├─ 🧩 Connectors</button>
      <button class="sf-v83-line" data-v89-action="user" data-view="twinplus">│  ├─ 🌐 Twin+ Network</button>
      <button class="sf-v83-line sf-v89-health-line" data-v89-action="user" data-view="health">│  └─ 💚 AI Twin Health</button>

      <div class="sf-v83-section">└─ ADMIN\\ 🔒</div>
      <button class="sf-v83-line sf-v89-admin-line" data-v89-action="admin" data-view="mine">   ├─ 1. 👑 Моят Twin</button>
      <button class="sf-v83-line sf-v89-admin-line" data-v89-action="admin" data-view="all">   ├─ 2. 👥 Всички Twin-ове / Connect Talk</button>
      <button class="sf-v83-line sf-v89-admin-line" data-v89-action="admin" data-view="network">   └─ 3. 🌐 Network / Bugs / Payments</button>
    `;

    if (tree.dataset.v89Html !== "1" || !tree.querySelector("[data-v89-action]")) {
      tree.innerHTML = html;
      tree.dataset.v89Html = "1";

      tree.querySelectorAll("[data-v89-action]").forEach(btn => {
        btn.addEventListener("click", function () {
          handle(btn);
        });
      });
    }
  }

  function updateMode() {
    const aiActive = Boolean(qs("#aitwin.page.active") || qs("#aitwin.active") || qs('.menu-btn.active[data-page="aitwin"], [data-page="aitwin"].active'));
    document.body.classList.toggle("sf-v83-ai-active", aiActive);
    document.body.classList.toggle("sf-v82-ai-active", aiActive);
    document.body.classList.toggle("sf-ai-twin-host", aiActive);
  }

  function boot() {
    rebuildTree();
    updateMode();

    document.addEventListener("click", function () {
      setTimeout(updateMode, 60);
      setTimeout(rebuildTree, 100);
      setTimeout(cleanOld, 240);
    }, true);

    setInterval(function () {
      rebuildTree();
      cleanOld();
      updateMode();
    }, 900);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.SoulFlameV89Tree = {
    rebuildTree,
    postToAiEcho,
    showPage
  };
})();