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

  function sendAdmin(view) {
    clickAiTwin();

    setTimeout(function () {
      const frame = qs("#sfAiEchoFrame");
      if (frame && frame.contentWindow) {
        frame.contentWindow.postMessage({
          type: "FINAL_ADMIN_VIEW",
          view: view
        }, "*");
      }
    }, 350);

    closeDrawer();
  }

  function patchAdminTree() {
    const tree = qs(".sf-v83-tree") || qs(".sf-v82-tree");
    if (!tree) return;

    qsa(".sf-v83-admin, .sf-v84-admin-tree, .sf-v841-admin-final, .sf-v842-admin-block, .sf-v843-admin-block").forEach(x => {
      x.style.display = "none";
    });

    let block = qs(".final-admin-order-block");

    if (!block) {
      block = document.createElement("div");
      block.className = "final-admin-order-block";
      block.innerHTML = `
        <div class="final-admin-title">└─ ADMIN\\ 🔒</div>
        <button class="final-admin-btn mine" data-final-admin="mine">   ├─ 1. 👑 Моят Twin</button>
        <button class="final-admin-btn" data-final-admin="others">   ├─ 2. 👥 Другите Twin-ове</button>
        <button class="final-admin-btn errors" data-final-admin="errors">   └─ 3. ⚠ Bugs / Commands / Errors</button>
      `;

      tree.appendChild(block);

      block.querySelectorAll("[data-final-admin]").forEach(btn => {
        btn.addEventListener("click", function () {
          block.querySelectorAll(".final-admin-btn").forEach(x => x.classList.remove("active"));
          btn.classList.add("active");
          sendAdmin(btn.dataset.finalAdmin);
        });
      });
    }
  }

  function boot() {
    patchAdminTree();

    document.addEventListener("click", function () {
      setTimeout(patchAdminTree, 80);
      setTimeout(patchAdminTree, 250);
    }, true);

    setInterval(patchAdminTree, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.FinalAdminOrderTree = { patchAdminTree, sendAdmin };
})();