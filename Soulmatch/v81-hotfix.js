(function () {
  "use strict";

  function qs(sel) {
    return document.querySelector(sel);
  }

  function qsa(sel) {
    return Array.from(document.querySelectorAll(sel));
  }

  function ensureBackdrop() {
    var backdrop = qs(".sf-v81-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "sf-v81-backdrop";
      document.body.appendChild(backdrop);
      backdrop.addEventListener("click", closeDrawer);
    }
    return backdrop;
  }

  function isAiTwinActive() {
    var section = qs("#aitwin.page.active");
    var activeBtn = qs(".menu-btn.active[data-page='aitwin'], .nav-item.active[data-page='aitwin'], [data-page='aitwin'].active");
    return Boolean(section || activeBtn);
  }

  function openDrawer() {
    if (!isAiTwinActive()) return;
    ensureBackdrop();
    document.body.classList.add("sf-sidebar-open");
  }

  function closeDrawer() {
    document.body.classList.remove("sf-sidebar-open");
  }

  function toggleDrawer() {
    if (!isAiTwinActive()) return;
    ensureBackdrop();
    document.body.classList.toggle("sf-sidebar-open");
  }

  function updateMode() {
    var ai = isAiTwinActive();

    document.body.classList.toggle("sf-ai-twin-host", ai);

    if (!ai) {
      closeDrawer();
    }

    ensureBackdrop();

    var status = qs(".sf-v78-status");
    if (!status) {
      status = document.createElement("div");
      status.className = "sf-v78-status";
      document.body.appendChild(status);
    }

    status.textContent = ai
      ? "SoulFlame V81.1 - AI Twin fullscreen"
      : "SoulFlame V81.1 - SoulMatch normal";
  }

  function bindButtons() {
    qsa(".menu-btn, .nav-item, [data-page]").forEach(function (btn) {
      if (btn.dataset.v811Bound === "true") return;
      btn.dataset.v811Bound = "true";

      btn.addEventListener("click", function () {
        closeDrawer();
        setTimeout(updateMode, 0);
        setTimeout(updateMode, 80);
        setTimeout(updateMode, 220);
      }, true);
    });
  }

  function boot() {
    ensureBackdrop();
    bindButtons();
    updateMode();

    window.addEventListener("message", function (event) {
      var data = event && event.data ? event.data : null;
      if (!data || typeof data !== "object") return;

      if (data.type === "SOULMATCH_TOGGLE_DRAWER") {
        toggleDrawer();
      }

      if (data.type === "SOULMATCH_CLOSE_DRAWER") {
        closeDrawer();
      }
    });

    document.addEventListener("click", function () {
      setTimeout(bindButtons, 40);
      setTimeout(updateMode, 80);
    }, true);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });

    window.addEventListener("resize", function () {
      setTimeout(updateMode, 80);
    });

    // Hard guard: prevents overlay from staying active because of older scripts
    setInterval(updateMode, 700);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.SoulFlameV811 = {
    updateMode: updateMode,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    toggleDrawer: toggleDrawer
  };
})();