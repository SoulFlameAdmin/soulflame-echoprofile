(function () {
  "use strict";

  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return Array.from(document.querySelectorAll(s)); }

  function clickAiTwin() {
    const btn = qs('.menu-btn[data-page="aitwin"]') || qs('[data-page="aitwin"]');
    if (btn) btn.click();
  }

  function closeDrawer() {
    document.body.classList.remove("sf-v83-drawer-open");
    document.body.classList.remove("sf-v82-drawer-open");
    document.body.classList.remove("sf-sidebar-open");
  }

  function sendUserView(view) {
    clickAiTwin();

    setTimeout(function () {
      const frame = qs("#sfAiEchoFrame");
      if (frame && frame.contentWindow) {
        frame.contentWindow.postMessage({
          type: "V87_USER_VIEW",
          view: view
        }, "*");
      }
    }, 350);

    closeDrawer();
  }

  function patchUserTree() {
    const tree = qs(".sf-v83-tree") || qs(".sf-v82-tree");
    if (!tree) return;

    qsa('.v86-user-block, .sf-v83-line[data-action="echo"][data-panel="userPanel"], .sf-v83-line[data-action="open"][data-url="/api/health"]').forEach(x => {
      x.style.display = "none";
    });

    let block = qs(".v87-user-block");

    if (!block) {
      block = document.createElement("div");
      block.className = "v87-user-block";

      block.innerHTML = `
        <div class="v87-user-title">├─ User\\</div>
        <button class="v87-user-btn" data-v87-user="connectors">│  ├─ 🧩 Connectors</button>
        <button class="v87-user-btn" data-v87-user="twinplus">│  ├─ 🌐 Twin+ Network</button>
        <button class="v87-user-btn health" data-v87-user="health">│  └─ 💚 AI Twin Health</button>
      `;

      const adminBlock =
        qs(".v85-admin-block") ||
        qs(".v843-admin-block") ||
        qs(".final-admin-order-block") ||
        null;

      if (adminBlock && adminBlock.parentNode === tree) {
        tree.insertBefore(block, adminBlock);
      } else {
        tree.appendChild(block);
      }

      block.querySelectorAll("[data-v87-user]").forEach(btn => {
        btn.addEventListener("click", function () {
          block.querySelectorAll(".v87-user-btn").forEach(x => x.classList.remove("active"));
          btn.classList.add("active");
          sendUserView(btn.dataset.v87User);
        });
      });
    }
  }

  function boot() {
    patchUserTree();

    document.addEventListener("click", function () {
      setTimeout(patchUserTree, 80);
      setTimeout(patchUserTree, 250);
    }, true);

    setInterval(patchUserTree, 1000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.SoulFlameV87UserTree = { patchUserTree, sendUserView };
})();