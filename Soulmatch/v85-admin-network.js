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
          type: "V85_ADMIN_VIEW",
          view: view
        }, "*");
      }
    }, 350);

    closeDrawer();
  }

  function patchTree() {
    const tree = qs(".sf-v83-tree") || qs(".sf-v82-tree");
    if (!tree) return;

    qsa(".sf-v83-admin, .sf-v84-admin-tree, .sf-v841-admin-final, .sf-v842-admin-block, .sf-v843-admin-block, .final-admin-order-block").forEach(x => {
      x.style.display = "none";
    });

    let block = qs(".v85-admin-block");

    if (!block) {
      block = document.createElement("div");
      block.className = "v85-admin-block";
      block.innerHTML = `
        <div class="v85-admin-title">└─ ADMIN\\ 🔒</div>
        <button class="v85-admin-btn mine" data-v85-admin="mine">   ├─ 1. 👑 Моят Twin</button>
        <button class="v85-admin-btn" data-v85-admin="all">   ├─ 2. 👥 Всички Twin-ове / Connect Talk</button>
        <button class="v85-admin-btn network" data-v85-admin="network">   └─ 3. 🌐 Network / Bugs / Payments</button>
      `;

      tree.appendChild(block);

      block.querySelectorAll("[data-v85-admin]").forEach(btn => {
        btn.addEventListener("click", function () {
          block.querySelectorAll(".v85-admin-btn").forEach(x => x.classList.remove("active"));
          btn.classList.add("active");
          sendAdmin(btn.dataset.v85Admin);
        });
      });
    }
  }

  function boot() {
    patchTree();

    document.addEventListener("click", function () {
      setTimeout(patchTree, 80);
      setTimeout(patchTree, 250);
    }, true);

    setInterval(patchTree, 1000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.SoulFlameV85Tree = { patchTree, sendAdmin };
})();