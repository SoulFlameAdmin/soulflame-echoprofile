(function () {
  "use strict";

  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return Array.from(document.querySelectorAll(s)); }

  function sidebar() {
    return qs(".sidebar");
  }

  function frame() {
    return qs("#sfAiEchoFrame");
  }

  function setDrawer(open) {
    document.body.classList.toggle("drawer-open", !!open);

    const toggle = qs("#drawerToggle") || qs(".drawer-toggle");
    if (toggle) {
      toggle.textContent = open ? "◀" : "▶";
    }
  }

  function closeDrawer() {
    setDrawer(false);
  }

  function ensureAiFrameReady() {
    const f = frame();
    if (!f) return null;

    const src = f.getAttribute("src") || "";
    if (!src.includes("ai-echo")) {
      f.setAttribute("src", "/ai-echo.html?v=960");
    }

    return f;
  }

  function postMany(messages) {
    const f = ensureAiFrameReady();
    if (!f || !f.contentWindow) return;

    messages.forEach((msg, index) => {
      setTimeout(() => {
        try {
          f.contentWindow.postMessage(msg, "*");
        } catch {}
      }, 80 + index * 80);
    });

    setTimeout(closeDrawer, 180);
  }

  function activate(btn) {
    qsa(".v96-tree-line").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
  }

  function route(btn) {
    activate(btn);

    const type = btn.dataset.v96Type;
    const panel = btn.dataset.v96Panel;
    const view = btn.dataset.v96View;

    if (type === "panel") {
      postMany([
        { type: "V91_OPEN_PANEL", panel },
        { type: "V90_OPEN_PANEL", panel },
        { type: "V96_OPEN_PANEL", panel }
      ]);
      return;
    }

    if (type === "extra") {
      postMany([
        { type: "V96_OPEN_PANEL", panel },
        { type: "V92_OPEN_PANEL", panel }
      ]);
      return;
    }

    if (type === "user") {
      postMany([
        { type: "V91_USER_VIEW", view },
        { type: "V90_USER_VIEW", view },
        { type: "V96_USER_VIEW", view }
      ]);
      return;
    }

    if (type === "admin") {
      postMany([
        { type: "V91_ADMIN_VIEW", view },
        { type: "V90_ADMIN_VIEW", view },
        { type: "V96_ADMIN_VIEW", view }
      ]);
      return;
    }
  }

  function buildTree() {
    const side = sidebar();
    if (!side) return;

    qsa(".v92-ai-cmd-tree").forEach(x => x.remove());

    let tree = qs("#v96AiTwinCmdTree");

    if (!tree) {
      tree = document.createElement("div");
      tree.id = "v96AiTwinCmdTree";
      tree.className = "v96-ai-cmd-tree";

      tree.innerHTML = `
        <div class="v96-tree-title">AI Echo\\</div>
        <button class="v96-tree-line" data-v96-type="panel" data-v96-panel="profilePanel">│ ├─ Profile</button>
        <button class="v96-tree-line" data-v96-type="panel" data-v96-panel="echoPanel">│ ├─ EchoProfile</button>
        <button class="v96-tree-line" data-v96-type="panel" data-v96-panel="chatPanel">│ └─ GPT Chat</button>

        <div class="v96-tree-title">SoulFlame Core\\</div>
        <button class="v96-tree-line" data-v96-type="extra" data-v96-panel="aiTwinHomePanel">│ ├─ AI Twin Home</button>
        <button class="v96-tree-line" data-v96-type="extra" data-v96-panel="futureTwinPanel">│ ├─ Future Twin</button>
        <button class="v96-tree-line" data-v96-type="extra" data-v96-panel="memoryPanel">│ ├─ Memory</button>
        <button class="v96-tree-line" data-v96-type="extra" data-v96-panel="soulMatchCorePanel">│ ├─ SoulMatch Core</button>
        <button class="v96-tree-line" data-v96-type="extra" data-v96-panel="arEchoCardPanel">│ ├─ AR EchoCard</button>
        <button class="v96-tree-line" data-v96-type="extra" data-v96-panel="settingsPanel">│ └─ Settings / Privacy</button>

        <div class="v96-tree-title">User\\</div>
        <button class="v96-tree-line user" data-v96-type="user" data-v96-view="connectors">│ ├─ Connectors</button>
        <button class="v96-tree-line user" data-v96-type="user" data-v96-view="twinplus">│ ├─ Twin+ Network</button>
        <button class="v96-tree-line health" data-v96-type="user" data-v96-view="health">│ └─ AI Twin Health</button>

        <div class="v96-tree-title">ADMIN\\ lock</div>
        <button class="v96-tree-line admin" data-v96-type="admin" data-v96-view="mine">│ ├─ 1. My Twin</button>
        <button class="v96-tree-line admin" data-v96-type="admin" data-v96-view="all">│ ├─ 2. All Twins / Connect Talk</button>
        <button class="v96-tree-line admin" data-v96-type="admin" data-v96-view="network">│ └─ 3. Network / Bugs / Payments</button>

        <div class="v96-tree-title">System\\</div>
        <button class="v96-tree-line system" data-v96-type="extra" data-v96-panel="systemHealthPanel">│ ├─ API Health</button>
        <button class="v96-tree-line system" data-v96-type="extra" data-v96-panel="supabaseStatusPanel">│ ├─ Supabase Status</button>
        <button class="v96-tree-line system" data-v96-type="extra" data-v96-panel="deployPanel">│ ├─ Deploy / Vercel</button>
        <button class="v96-tree-line system" data-v96-type="extra" data-v96-panel="dataMemoryPanel">│ └─ Data / Memory Log</button>
      `;

      const premium = side.querySelector(".premium");

      if (premium) {
        side.insertBefore(tree, premium);
      } else {
        side.appendChild(tree);
      }

      tree.querySelectorAll(".v96-tree-line").forEach(btn => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          route(btn);
        });
      });
    }
  }

  function boot() {
    buildTree();

    document.addEventListener("click", function () {
      setTimeout(buildTree, 80);
      setTimeout(buildTree, 250);
    }, true);

    setInterval(buildTree, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.SoulFlameV96AiTwinCmdTree = { buildTree, postMany };
})();