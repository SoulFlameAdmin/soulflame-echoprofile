(function () {
  "use strict";

  function qs(s) { return document.querySelector(s); }

  function openPanel(id) {
    if (!id) return;

    if (typeof openPanelById === "function") {
      openPanelById(id);
      return;
    }

    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));

    const panel = qs("#" + id);
    if (panel) panel.classList.add("active");

    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    const btn = qs('.tab-btn[data-panel="' + id + '"]');
    if (btn) btn.classList.add("active");
  }

  function openUser(view) {
    if (window.SoulFlameV87User && typeof window.SoulFlameV87User.openUserView === "function") {
      window.SoulFlameV87User.openUserView(view);
      return;
    }

    if (window.SoulFlameV86User && typeof window.SoulFlameV86User.openUserView === "function") {
      window.SoulFlameV86User.openUserView(view);
      return;
    }

    if (view === "connectors") openPanel("v87ConnectorsPanel");
    if (view === "twinplus") openPanel("v87TwinPlusPanel");
    if (view === "health") openPanel("v87HealthPanel");
  }

  function openAdmin(view) {
    if (window.SoulFlameV85Admin && typeof window.SoulFlameV85Admin.loadView === "function") {
      window.SoulFlameV85Admin.loadView(view);
      return;
    }

    if (window.FinalAdminRender && typeof window.FinalAdminRender.loadAdminView === "function") {
      window.FinalAdminRender.loadAdminView(view === "all" ? "others" : view === "network" ? "errors" : view);
      return;
    }

    if (typeof openAdminPanel === "function") {
      openAdminPanel();
      return;
    }

    openPanel("adminPanel");
  }

  window.addEventListener("message", function (event) {
    const data = event && event.data ? event.data : null;
    if (!data || typeof data !== "object") return;

    if (data.type === "V88_OPEN_PANEL") {
      openPanel(data.panel);
    }

    if (data.type === "V88_USER_VIEW") {
      openUser(data.view || "health");
    }

    if (data.type === "V88_ADMIN_VIEW") {
      openAdmin(data.view || "mine");
    }
  });

  window.SoulFlameV88Router = {
    openPanel,
    openUser,
    openAdmin
  };
})();