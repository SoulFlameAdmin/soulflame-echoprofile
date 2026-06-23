(function () {
  "use strict";

  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

  function isAiTwinActive() {
    var section = qs("#aitwin.page.active");
    var activeBtn = qs(".menu-btn.active[data-page='aitwin'], .nav-item.active[data-page='aitwin'], [data-page='aitwin'].active");
    return Boolean(section || activeBtn);
  }

  function ensureUI() {
    var backdrop = qs(".sf-v82-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "sf-v82-backdrop";
      backdrop.addEventListener("click", closeDrawer);
      document.body.appendChild(backdrop);
    }

    var drawer = qs(".sf-v82-drawer");
    if (!drawer) {
      drawer = document.createElement("aside");
      drawer.className = "sf-v82-drawer";
      drawer.innerHTML = `
        <div class="sf-v82-drawer-head">
          <div class="sf-v82-drawer-brand">
            <div class="sf-v82-drawer-logo">🔥</div>
            <div>
              <strong>SoulFlame</strong>
              <small>CMD Tree Navigation</small>
            </div>
          </div>
          <button class="sf-v82-close" type="button" aria-label="Close">×</button>
        </div>

        <div class="sf-v82-tree">
          <div class="sf-v82-tree-root">SoulFlame\\</div>

          <div class="sf-v82-tree-section">├─ SoulMatch\\</div>
          <button class="sf-v82-tree-line" data-action="page" data-page="chat">│  ├─ 💬 Messages</button>
          <button class="sf-v82-tree-line" data-action="page" data-page="matches">│  ├─ ❤️ Matches</button>
          <button class="sf-v82-tree-line" data-action="page" data-page="aitwin">│  ├─ 🤖 AI Twin</button>
          <button class="sf-v82-tree-line" data-action="page" data-page="profile">│  ├─ 🧍 Profile</button>
          <button class="sf-v82-tree-line" data-action="page" data-page="daily">│  └─ 🔥 Daily</button>

          <div class="sf-v82-tree-section">├─ AI Echo\\</div>
          <button class="sf-v82-tree-line" data-action="echo" data-panel="profilePanel">│  ├─ 👤 Profile</button>
          <button class="sf-v82-tree-line" data-action="echo" data-panel="echoPanel">│  ├─ 🧠 EchoProfile</button>
          <button class="sf-v82-tree-line" data-action="echo" data-panel="chatPanel">│  ├─ 💬 GPT Chat</button>
          <button class="sf-v82-tree-line" data-action="echo" data-panel="backendPanel">│  └─ 🧩 Backend</button>

          <div class="sf-v82-tree-section">└─ System\\</div>
          <button class="sf-v82-tree-line" data-action="open" data-url="/api/health">   ├─ /api/health</button>
          <button class="sf-v82-tree-line" data-action="echo" data-panel="backendPanel">   ├─ Supabase Status</button>
          <button class="sf-v82-tree-line" data-action="open" data-url="/ai-echo.html?v=820">   └─ AI Echo Direct</button>
        </div>

        <div class="sf-v82-drawer-footer">
          <strong>AI Twin Mode</strong>
          <p>Стрелката отляво отваря/затваря това меню. Burger бутонът в AI Echo прави същото.</p>
        </div>
      `;
      document.body.appendChild(drawer);

      drawer.querySelector(".sf-v82-close").addEventListener("click", closeDrawer);

      drawer.querySelectorAll("[data-action]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          handleTreeAction(btn);
        });
      });
    }

    var edge = qs(".sf-v82-edge-toggle");
    if (!edge) {
      edge = document.createElement("button");
      edge.className = "sf-v82-edge-toggle";
      edge.type = "button";
      edge.textContent = "▶";
      edge.setAttribute("aria-label", "Open SoulMatch menu");
      edge.addEventListener("click", toggleDrawer);
      document.body.appendChild(edge);
    }
  }

  function openDrawer() {
    if (!isAiTwinActive()) return;
    ensureUI();
    document.body.classList.add("sf-v82-drawer-open");
    document.body.classList.remove("sf-sidebar-open");
    updateArrow();
  }

  function closeDrawer() {
    document.body.classList.remove("sf-v82-drawer-open");
    document.body.classList.remove("sf-sidebar-open");
    updateArrow();
  }

  function toggleDrawer() {
    if (!isAiTwinActive()) return;
    if (document.body.classList.contains("sf-v82-drawer-open")) closeDrawer();
    else openDrawer();
  }

  function updateArrow() {
    var edge = qs(".sf-v82-edge-toggle");
    if (!edge) return;

    var open = document.body.classList.contains("sf-v82-drawer-open");
    edge.textContent = open ? "◀" : "▶";
    edge.setAttribute("aria-label", open ? "Close SoulMatch menu" : "Open SoulMatch menu");
  }

  function updateMode() {
    ensureUI();

    var ai = isAiTwinActive();

    document.body.classList.toggle("sf-v82-ai-active", ai);
    document.body.classList.toggle("sf-ai-twin-host", ai);

    if (!ai) {
      closeDrawer();
    }

    // Prevent older scripts from leaving broken overlay active.
    if (!document.body.classList.contains("sf-v82-drawer-open")) {
      document.body.classList.remove("sf-sidebar-open");
    }

    updateArrow();

    var status = qs(".sf-v78-status");
    if (!status) {
      status = document.createElement("div");
      status.className = "sf-v78-status";
      document.body.appendChild(status);
    }

    status.textContent = ai ? "SoulFlame V82 - AI Twin tree mode" : "SoulFlame V82 - SoulMatch";
  }

  function clickSoulPage(page) {
    var selectors = [
      '.menu-btn[data-page="' + page + '"]',
      '.nav-item[data-page="' + page + '"]',
      '[data-page="' + page + '"]'
    ];

    var btn = null;
    for (var i = 0; i < selectors.length; i++) {
      btn = qs(selectors[i]);
      if (btn) break;
    }

    if (btn) {
      btn.click();
    }

    setTimeout(updateMode, 80);
    setTimeout(updateMode, 220);
  }

  function sendEchoPanel(panel) {
    clickSoulPage("aitwin");

    setTimeout(function () {
      var frame = qs("#sfAiEchoFrame");
      if (frame && frame.contentWindow) {
        frame.contentWindow.postMessage({
          type: "AI_ECHO_OPEN_PANEL",
          panel: panel
        }, "*");
      }
    }, 260);
  }

  function handleTreeAction(btn) {
    var action = btn.dataset.action;

    qsa(".sf-v82-tree-line").forEach(function (x) {
      x.classList.remove("active");
    });
    btn.classList.add("active");

    if (action === "page") {
      clickSoulPage(btn.dataset.page);
      closeDrawer();
      return;
    }

    if (action === "echo") {
      sendEchoPanel(btn.dataset.panel);
      closeDrawer();
      return;
    }

    if (action === "open") {
      window.open(btn.dataset.url, "_blank");
      closeDrawer();
      return;
    }
  }

  function bindNavigation() {
    qsa(".menu-btn, .nav-item, [data-page]").forEach(function (btn) {
      if (btn.dataset.v82Bound === "true") return;
      btn.dataset.v82Bound = "true";

      btn.addEventListener("click", function () {
        closeDrawer();
        setTimeout(updateMode, 0);
        setTimeout(updateMode, 100);
        setTimeout(updateMode, 260);
      }, true);
    });
  }

  function boot() {
    ensureUI();
    bindNavigation();
    updateMode();

    document.addEventListener("click", function () {
      setTimeout(bindNavigation, 40);
      setTimeout(updateMode, 80);
    }, true);

    window.addEventListener("message", function (event) {
      var data = event && event.data ? event.data : null;
      if (!data || typeof data !== "object") return;

      if (data.type === "SOULMATCH_TOGGLE_DRAWER") toggleDrawer();
      if (data.type === "SOULMATCH_OPEN_DRAWER") openDrawer();
      if (data.type === "SOULMATCH_CLOSE_DRAWER") closeDrawer();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });

    window.addEventListener("resize", function () {
      setTimeout(updateMode, 80);
    });

    setInterval(updateMode, 900);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.SoulFlameV82 = {
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    toggleDrawer: toggleDrawer,
    updateMode: updateMode
  };
})();