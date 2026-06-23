(function () {
  "use strict";

  function qs(sel) {
    return document.querySelector(sel);
  }

  function qsa(sel) {
    return Array.from(document.querySelectorAll(sel));
  }

  function currentPage() {
    var active =
      qs(".menu-btn.active") ||
      qs(".nav-item.active") ||
      qs("[data-page].active");

    return active && active.dataset ? active.dataset.page : "chat";
  }

  function refreshLayout() {
    var page = currentPage();
    var isMessages = page === "chat" || page === "messages";

    document.body.classList.toggle("v78-messages-mode", isMessages);
    document.body.classList.toggle("v78-not-messages-mode", !isMessages);

    var status = qs(".sf-v78-status");
    if (!status) {
      status = document.createElement("div");
      status.className = "sf-v78-status";
      document.body.appendChild(status);
    }

    status.textContent = isMessages
      ? "SoulFlame V79 - Messages"
      : "SoulFlame V79 - Focus mode";
  }

  function bindNav() {
    qsa(".menu-btn, .nav-item, [data-page]").forEach(function (btn) {
      if (btn.dataset.v79Bound === "true") return;
      btn.dataset.v79Bound = "true";

      btn.addEventListener("click", function () {
        setTimeout(refreshLayout, 0);
        setTimeout(refreshLayout, 80);
        setTimeout(refreshLayout, 220);
      }, true);
    });
  }

  function boot() {
    bindNav();
    refreshLayout();

    window.addEventListener("resize", function () {
      setTimeout(refreshLayout, 60);
    });

    document.addEventListener("click", function () {
      setTimeout(bindNav, 40);
      setTimeout(refreshLayout, 80);
    }, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.SoulFlameV79 = {
    version: "V79",
    refreshLayout: refreshLayout
  };
})();