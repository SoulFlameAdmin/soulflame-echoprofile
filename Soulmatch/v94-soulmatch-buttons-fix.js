(function () {
  "use strict";

  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return Array.from(document.querySelectorAll(s)); }

  const PAGE_IDS = ["messages", "matches", "aitwin", "profile", "daily"];

  function getDrawerToggle() {
    return qs("#drawerToggle") || qs(".drawer-toggle");
  }

  function setDrawer(open) {
    document.body.classList.toggle("drawer-open", !!open);

    const toggle = getDrawerToggle();
    if (toggle) {
      toggle.textContent = "";
      toggle.innerHTML = "";
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.setAttribute("title", open ? "Close menu" : "Open menu");
    }
  }

  function closeDrawer() {
    setDrawer(false);
  }

  function ensureAiFrame() {
    const frame = qs("#sfAiEchoFrame");
    if (!frame) return;

    const src = frame.getAttribute("src") || "";
    if (!src || !src.includes("ai-echo")) {
      frame.setAttribute("src", "/ai-echo.html?v=940");
    }
  }

  function setActiveButton(pageId) {
    qsa(".sidebar .nav-btn[data-page], .sidebar button[data-page]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.page === pageId);
    });
  }

  function setActivePage(pageId) {
    PAGE_IDS.forEach(id => {
      const page = qs("#" + id);
      if (page) {
        page.classList.toggle("active", id === pageId);
      }
    });
  }

  function openSoulMatchPage(pageId) {
    if (!PAGE_IDS.includes(pageId)) pageId = "messages";

    setActivePage(pageId);
    setActiveButton(pageId);

    const isAiTwin = pageId === "aitwin";
    document.body.classList.toggle("ai-mode", isAiTwin);

    if (isAiTwin) {
      ensureAiFrame();
    }

    closeDrawer();

    try {
      const url = new URL(window.location.href);
      url.searchParams.set("page", pageId);
      url.searchParams.set("v", "940");
      window.history.replaceState({}, "", url.toString());
    } catch {}

    window.dispatchEvent(new CustomEvent("soulflame:page", {
      detail: { page: pageId }
    }));
  }

  function bindButtons() {
    qsa(".sidebar .nav-btn[data-page], .sidebar button[data-page]").forEach(btn => {
      if (btn.dataset.v94Bound === "1") return;

      btn.dataset.v94Bound = "1";

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        openSoulMatchPage(btn.dataset.page);
      }, true);
    });
  }

  function hardCapture(e) {
    const btn = e.target.closest && e.target.closest(".sidebar .nav-btn[data-page], .sidebar button[data-page]");
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    openSoulMatchPage(btn.dataset.page);
  }

  function restoreFromUrl() {
    try {
      const url = new URL(window.location.href);
      const page = url.searchParams.get("page");

      if (page && PAGE_IDS.includes(page)) {
        openSoulMatchPage(page);
        return;
      }
    } catch {}

    const active = qs(".page.active");
    if (active && PAGE_IDS.includes(active.id)) {
      setActiveButton(active.id);
      document.body.classList.toggle("ai-mode", active.id === "aitwin");
      return;
    }

    openSoulMatchPage("messages");
  }

  function boot() {
    bindButtons();
    restoreFromUrl();

    document.addEventListener("click", hardCapture, true);

    document.addEventListener("click", function () {
      setTimeout(bindButtons, 50);
      setTimeout(bindButtons, 250);
    }, true);

    setInterval(bindButtons, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.SoulFlameV94SoulMatchButtons = {
    openSoulMatchPage,
    bindButtons
  };
})();