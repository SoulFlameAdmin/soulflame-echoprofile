(function () {
  "use strict";

  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return Array.from(document.querySelectorAll(s)); }

  function getSidebar() {
    return qs(".sidebar");
  }

  function getFrame() {
    return qs("#sfAiEchoFrame");
  }

  function postToAi(payload) {
    const frame = getFrame();

    if (frame && frame.contentWindow) {
      frame.contentWindow.postMessage(payload, "*");
    }

    document.body.classList.remove("drawer-open");
    const toggle = qs("#drawerToggle");
    if (toggle) toggle.textContent = "▶";
  }

  function activeLine(btn) {
    qsa(".v92-tree-line").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
  }

  function route(btn) {
    activeLine(btn);

    const type = btn.dataset.v92Type;
    const panel = btn.dataset.v92Panel;
    const view = btn.dataset.v92View;

    if (type === "panel") {
      postToAi({
        type: "V91_OPEN_PANEL",
        panel: panel
      });
      return;
    }

    if (type === "v92panel") {
      postToAi({
        type: "V92_OPEN_PANEL",
        panel: panel
      });
      return;
    }

    if (type === "user") {
      postToAi({
        type: "V91_USER_VIEW",
        view: view
      });
      return;
    }

    if (type === "admin") {
      postToAi({
        type: "V91_ADMIN_VIEW",
        view: view
      });
      return;
    }
  }

  function buildTree() {
    const sidebar = getSidebar();
    if (!sidebar) return;

    let tree = qs("#v92AiCmdTree");

    if (!tree) {
      tree = document.createElement("div");
      tree.id = "v92AiCmdTree";
      tree.className = "v92-ai-cmd-tree";

      tree.innerHTML = `
        <div class="v92-tree-title">AI Echo\\</div>
        <button class="v92-tree-line" data-v92-type="panel" data-v92-panel="profilePanel">│ ├─ Profile</button>
        <button class="v92-tree-line" data-v92-type="panel" data-v92-panel="echoPanel">│ ├─ EchoProfile</button>
        <button class="v92-tree-line" data-v92-type="panel" data-v92-panel="chatPanel">│ └─ GPT Chat</button>

        <div class="v92-tree-title">SoulFlame Core\\</div>
        <button class="v92-tree-line" data-v92-type="v92panel" data-v92-panel="aiTwinHomePanel">│ ├─ AI Twin Home</button>
        <button class="v92-tree-line" data-v92-type="v92panel" data-v92-panel="futureTwinPanel">│ ├─ Future Twin</button>
        <button class="v92-tree-line" data-v92-type="v92panel" data-v92-panel="memoryPanel">│ ├─ Memory</button>
        <button class="v92-tree-line" data-v92-type="v92panel" data-v92-panel="soulMatchCorePanel">│ ├─ SoulMatch Core</button>
        <button class="v92-tree-line" data-v92-type="v92panel" data-v92-panel="arEchoCardPanel">│ ├─ AR EchoCard</button>
        <button class="v92-tree-line" data-v92-type="v92panel" data-v92-panel="settingsPanel">│ └─ Settings / Privacy</button>

        <div class="v92-tree-title">User\\</div>
        <button class="v92-tree-line" data-v92-type="user" data-v92-view="connectors">│ ├─ Connectors</button>
        <button class="v92-tree-line" data-v92-type="user" data-v92-view="twinplus">│ ├─ Twin+ Network</button>
        <button class="v92-tree-line health" data-v92-type="user" data-v92-view="health">│ └─ AI Twin Health</button>

        <div class="v92-tree-title">ADMIN\\ 🔒</div>
        <button class="v92-tree-line admin" data-v92-type="admin" data-v92-view="mine">│ ├─ 1. My Twin</button>
        <button class="v92-tree-line admin" data-v92-type="admin" data-v92-view="all">│ ├─ 2. All Twins / Connect Talk</button>
        <button class="v92-tree-line admin" data-v92-type="admin" data-v92-view="network">│ └─ 3. Network / Bugs / Payments</button>

        <div class="v92-tree-title">System\\</div>
        <button class="v92-tree-line system" data-v92-type="v92panel" data-v92-panel="systemHealthPanel">│ ├─ API Health</button>
        <button class="v92-tree-line system" data-v92-type="v92panel" data-v92-panel="supabaseStatusPanel">│ ├─ Supabase Status</button>
        <button class="v92-tree-line system" data-v92-type="v92panel" data-v92-panel="deployPanel">│ ├─ Deploy / Vercel</button>
        <button class="v92-tree-line system" data-v92-type="v92panel" data-v92-panel="dataMemoryPanel">│ └─ Data / Memory Log</button>
      `;

      const premium = sidebar.querySelector(".premium");

      if (premium) {
        sidebar.insertBefore(tree, premium);
      } else {
        sidebar.appendChild(tree);
      }

      tree.querySelectorAll(".v92-tree-line").forEach(btn => {
        btn.addEventListener("click", () => route(btn));
      });
    }
  }

  function boot() {
    buildTree();

    document.addEventListener("click", () => {
      setTimeout(buildTree, 80);
      setTimeout(buildTree, 240);
    }, true);

    setInterval(buildTree, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.SoulFlameV92CmdTree = { buildTree, postToAi };
})();