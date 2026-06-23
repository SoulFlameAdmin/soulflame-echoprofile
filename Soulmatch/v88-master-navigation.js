(function () {
  "use strict";

  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return Array.from(document.querySelectorAll(s)); }

  function tree() {
    return qs(".sf-v83-tree") || qs(".sf-v82-tree");
  }

  function clickSoulPage(page) {
    const aliases = page === "messages" || page === "chat"
      ? ["messages", "chat"]
      : [page];

    let btn = null;

    for (const p of aliases) {
      const buttons = qsa('.menu-btn[data-page="' + p + '"], .nav-item[data-page="' + p + '"], [data-page="' + p + '"]');
      btn = buttons.find(b => !b.closest(".sf-v83-tree") && !b.closest(".sf-v82-tree"));
      if (btn) break;
    }

    if (btn) {
      btn.click();
    } else {
      document.body.dataset.sfRequestedPage = page;
      window.dispatchEvent(new CustomEvent("sf:v88:navigate", { detail: { page: page, aliases: aliases } }));
    }

    setTimeout(updateMode, 100);
    setTimeout(updateMode, 280);
  }

  function clickAiTwin() {
    clickSoulPage("aitwin");
  }

  function closeDrawer() {
    document.body.classList.remove("sf-v83-drawer-open");
    document.body.classList.remove("sf-v82-drawer-open");
    document.body.classList.remove("sf-sidebar-open");
    document.body.classList.remove("sf-menu-open");
  }

  function sendToAiEcho(payload) {
    clickAiTwin();

    setTimeout(function () {
      const frame = qs("#sfAiEchoFrame");

      if (frame && frame.contentWindow) {
        frame.contentWindow.postMessage(payload, "*");
      } else {
        window.postMessage(payload, "*");
      }
    }, 360);

    closeDrawer();
  }

  function activateLine(btn) {
    qsa("[data-v88-action]").forEach(x => x.classList.remove("sf-v88-line-active"));
    btn.classList.add("sf-v88-line-active");
  }

  function handle(btn) {
    activateLine(btn);

    const action = btn.dataset.v88Action;

    if (action === "page") {
      clickSoulPage(btn.dataset.page);
      closeDrawer();
      return;
    }

    if (action === "echo") {
      sendToAiEcho({
        type: "V88_OPEN_PANEL",
        panel: btn.dataset.panel
      });
      return;
    }

    if (action === "user") {
      sendToAiEcho({
        type: "V87_USER_VIEW",
        view: btn.dataset.view
      });

      setTimeout(function () {
        sendToAiEcho({
          type: "V88_USER_VIEW",
          view: btn.dataset.view
        });
      }, 80);

      return;
    }

    if (action === "admin") {
      sendToAiEcho({
        type: "V85_ADMIN_VIEW",
        view: btn.dataset.view
      });

      setTimeout(function () {
        sendToAiEcho({
          type: "V88_ADMIN_VIEW",
          view: btn.dataset.view
        });
      }, 80);

      return;
    }
  }

  function cleanOldBlocks() {
    qsa(".v86-user-block, .v87-user-block, .v85-admin-block, .final-admin-order-block, .sf-v84-admin-tree, .sf-v841-admin-final, .sf-v842-admin-block, .sf-v843-admin-block").forEach(x => {
      x.remove();
    });
  }

  function rebuildTree() {
    const t = tree();
    if (!t) return;

    cleanOldBlocks();

    if (t.dataset.v88Master === "ready") return;

    document.body.classList.add("sf-v88-master-active");

    t.dataset.v88Master = "ready";

    t.innerHTML = `
      <div class="sf-v83-root">SoulFlame\\</div>

      <div class="sf-v83-section">├─ SoulMatch\\</div>
      <button class="sf-v83-line" data-v88-action="page" data-page="messages">│  ├─ 💬 Messages</button>
      <button class="sf-v83-line" data-v88-action="page" data-page="matches">│  ├─ ❤️ Matches</button>
      <button class="sf-v83-line" data-v88-action="page" data-page="aitwin">│  ├─ 🤖 AI Twin</button>
      <button class="sf-v83-line" data-v88-action="page" data-page="profile">│  ├─ 🧍 Profile</button>
      <button class="sf-v83-line" data-v88-action="page" data-page="daily">│  └─ 🔥 Daily</button>

      <div class="sf-v83-section">├─ AI Echo\\</div>
      <button class="sf-v83-line" data-v88-action="echo" data-panel="profilePanel">│  ├─ 👤 Profile</button>
      <button class="sf-v83-line" data-v88-action="echo" data-panel="echoPanel">│  ├─ 🧠 EchoProfile</button>
      <button class="sf-v83-line" data-v88-action="echo" data-panel="chatPanel">│  └─ 💬 GPT Chat</button>

      <div class="sf-v83-section">├─ User\\</div>
      <button class="sf-v83-line" data-v88-action="user" data-view="connectors">│  ├─ 🧩 Connectors</button>
      <button class="sf-v83-line" data-v88-action="user" data-view="twinplus">│  ├─ 🌐 Twin+ Network</button>
      <button class="sf-v83-line sf-v88-health-line" data-v88-action="user" data-view="health">│  └─ 💚 AI Twin Health</button>

      <div class="sf-v83-section">└─ ADMIN\\ 🔒</div>
      <button class="sf-v83-line sf-v88-admin-line" data-v88-action="admin" data-view="mine">   ├─ 1. 👑 Моят Twin</button>
      <button class="sf-v83-line sf-v88-admin-line" data-v88-action="admin" data-view="all">   ├─ 2. 👥 Всички Twin-ове / Connect Talk</button>
      <button class="sf-v83-line sf-v88-admin-line" data-v88-action="admin" data-view="network">   └─ 3. 🌐 Network / Bugs / Payments</button>
    `;

    t.querySelectorAll("[data-v88-action]").forEach(btn => {
      btn.addEventListener("click", function () {
        handle(btn);
      });
    });
  }

  function updateMode() {
    const aiActive = Boolean(
      qs("#aitwin.page.active") ||
      qs('.menu-btn.active[data-page="aitwin"], [data-page="aitwin"].active') ||
      qs("#sfAiEchoFrame")
    );

    document.body.classList.toggle("sf-v83-ai-active", aiActive);
    document.body.classList.toggle("sf-v82-ai-active", aiActive);
    document.body.classList.toggle("sf-ai-twin-host", aiActive);
  }

  function boot() {
    rebuildTree();
    updateMode();

    document.addEventListener("click", function () {
      setTimeout(updateMode, 60);
      setTimeout(rebuildTree, 120);
      setTimeout(cleanOldBlocks, 250);
    }, true);

    setInterval(function () {
      rebuildTree();
      cleanOldBlocks();
      updateMode();
    }, 1000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.SoulFlameV88MasterNavigation = {
    rebuildTree,
    clickSoulPage,
    sendToAiEcho
  };
})();