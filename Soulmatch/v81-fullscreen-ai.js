(function () {
  "use strict";

  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

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

  function activePageName() {
    var activeBtn = qs(".menu-btn.active,[data-page].active,.nav-item.active");
    if (!activeBtn || !activeBtn.dataset) return "";
    return String(activeBtn.dataset.page || "").toLowerCase();
  }

  function activeSectionId() {
    var activeSection = qs(".page.active");
    return activeSection ? String(activeSection.id || "").toLowerCase() : "";
  }

  function isAiTwinActive() {
    var p = activePageName();
    var s = activeSectionId();
    return p === "aitwin" || p === "ai" || s === "aitwin";
  }

  function openDrawer() {
    if (!isAiTwinActive()) return;
    document.body.classList.add("sf-sidebar-open");
  }

  function closeDrawer() {
    document.body.classList.remove("sf-sidebar-open");
  }

  function toggleDrawer() {
    if (!isAiTwinActive()) return;
    document.body.classList.toggle("sf-sidebar-open");
  }

  function updateMode() {
    var ai = isAiTwinActive();
    document.body.classList.toggle("sf-ai-twin-host", ai);

    if (!ai) closeDrawer();

    ensureBackdrop();

    var status = qs(".sf-v78-status");
    if (!status) {
      status = document.createElement("div");
      status.className = "sf-v78-status";
      document.body.appendChild(status);
    }

    status.textContent = ai ? "SoulFlame V81 - AI Twin fullscreen" : "SoulFlame V81 - SoulMatch";
  }

  function bindNavigation() {
    qsa(".menu-btn, .nav-item, [data-page]").forEach(function(btn) {
      if (btn.dataset.v81Bound === "true") return;
      btn.dataset.v81Bound = "true";

      btn.addEventListener("click", function () {
        setTimeout(updateMode, 0);
        setTimeout(updateMode, 100);
        setTimeout(updateMode, 220);
      }, true);
    });
  }

  function boot() {
    ensureBackdrop();
    bindNavigation();
    updateMode();

    document.addEventListener("click", function () {
      setTimeout(bindNavigation, 40);
      setTimeout(updateMode, 80);
    }, true);

    window.addEventListener("resize", function () {
      setTimeout(updateMode, 60);
    });

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

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.SoulFlameV81Host = {
    updateMode: updateMode,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    toggleDrawer: toggleDrawer
  };
})();