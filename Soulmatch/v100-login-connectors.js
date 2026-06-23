(function () {
  "use strict";

  const AUTH_KEY = "sf_logged_in";
  const NAME_KEY = "sf_name";
  const IG_KEY = "sf_instagram";
  const CONNECTORS_KEY = "sf_login_connectors";

  const CONNECTORS = [
    { key: "facebook", label: "Facebook", icon: "f" },
    { key: "snapchat", label: "Snapchat", icon: "S" },
    { key: "instagram", label: "Instagram", icon: "IG" },
    { key: "github", label: "GitHub", icon: "Git" },
    { key: "google", label: "Google Profile", icon: "G" }
  ];

  function qs(s) {
    return document.querySelector(s);
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getStoredProfile() {
    let legacy = {};
    try {
      legacy = JSON.parse(localStorage.getItem("sf_v83_profile") || "{}");
    } catch {}

    return {
      name: localStorage.getItem(NAME_KEY) || legacy.name || legacy.user?.name || "Dimitar",
      instagram: localStorage.getItem(IG_KEY) || legacy.instagram || legacy.user?.instagram || "@stere0metal360"
    };
  }

  function getSelectedConnectors() {
    try {
      const list = JSON.parse(localStorage.getItem(CONNECTORS_KEY) || "[]");
      if (Array.isArray(list)) return list;
    } catch {}
    return [];
  }

  function saveSelectedConnectors(list) {
    localStorage.setItem(CONNECTORS_KEY, JSON.stringify(Array.from(new Set(list))));
  }

  function isLoggedIn() {
    return localStorage.getItem(AUTH_KEY) === "1";
  }

  function hideLoginOverlay() {
    const overlay = qs("#sfLoginOverlay");
    if (overlay) overlay.remove();
  }

  function updateProfileMini() {
    const box = qs(".profile-mini");
    if (!box) return;

    const profile = getStoredProfile();
    const connectors = getSelectedConnectors();

    const avatar = box.querySelector(".avatar");
    const strong = box.querySelector("strong");
    const small = box.querySelector("small");

    if (avatar) {
      avatar.textContent = (profile.name || "D").trim().charAt(0).toUpperCase() || "D";
    }

    if (strong) {
      strong.textContent = profile.name || "Dimitar";
    }

    if (small) {
      small.textContent = isLoggedIn()
        ? "Your profile • " + connectors.length + " connectors"
        : "Logged out";
    }

    let btn = qs("#sfLogoutBtn");

    if (!btn) {
      btn = document.createElement("button");
      btn.id = "sfLogoutBtn";
      btn.type = "button";
      btn.textContent = "Изход";
      btn.style.marginTop = "10px";
      btn.style.border = "1px solid rgba(255,255,255,.22)";
      btn.style.borderRadius = "12px";
      btn.style.padding = "8px 14px";
      btn.style.background = "rgba(255,255,255,.14)";
      btn.style.color = "#fff";
      btn.style.fontWeight = "900";
      btn.style.cursor = "pointer";

      const textBox = box.querySelector("div:not(.avatar)") || box;
      textBox.appendChild(document.createElement("br"));
      textBox.appendChild(btn);

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        logout();
      });
    }

    btn.style.display = isLoggedIn() ? "inline-block" : "none";
  }

  async function saveConnectorToBackend(name, instagram, connectorKey) {
    try {
      await fetch("/api/connectors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          instagram,
          connector: connectorKey,
          status: "connected_from_login",
          source: "login_screen"
        })
      });
    } catch (err) {
      console.warn("Connector save failed:", connectorKey, err);
    }
  }

  async function saveAllConnectors(name, instagram, connectors) {
    for (const key of connectors) {
      await saveConnectorToBackend(name, instagram, key);
    }
  }

  async function saveLogin(name, instagram, connectors) {
    const finalName = name || "Dimitar";
    const finalInstagram = instagram || "@stere0metal360";
    const finalConnectors = Array.isArray(connectors) ? connectors : [];

    localStorage.setItem(AUTH_KEY, "1");
    localStorage.setItem(NAME_KEY, finalName);
    localStorage.setItem(IG_KEY, finalInstagram);
    saveSelectedConnectors(finalConnectors);

    await saveAllConnectors(finalName, finalInstagram, finalConnectors);

    updateProfileMini();
    hideLoginOverlay();
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem("sf_admin_pin");

    updateProfileMini();
    showLoginOverlay();
  }

  function connectorButtonHtml(connector, selected) {
    const active = selected.includes(connector.key);

    return `
      <button type="button" class="sfConnectorBtn" data-connector="${connector.key}" style="
        min-height:52px;
        border:1px solid ${active ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.18)"};
        border-radius:16px;
        background:${active ? "rgba(255,255,255,.24)" : "rgba(255,255,255,.09)"};
        color:white;
        padding:10px 12px;
        cursor:pointer;
        display:flex;
        align-items:center;
        gap:10px;
        text-align:left;
        font-weight:900;
      ">
        <span style="
          width:34px;
          height:34px;
          border-radius:12px;
          background:rgba(255,255,255,.16);
          display:grid;
          place-items:center;
          font-size:12px;
          font-weight:950;
        ">${escapeHtml(connector.icon)}</span>
        <span>
          <span style="display:block;">${escapeHtml(connector.label)}</span>
          <small style="display:block;color:rgba(255,255,255,.68);font-weight:700;">Connector</small>
        </span>
      </button>
    `;
  }

  function showLoginOverlay() {
    const old = qs("#sfLoginOverlay");
    if (old) old.remove();

    const profile = getStoredProfile();
    const selected = getSelectedConnectors();

    const overlay = document.createElement("div");
    overlay.id = "sfLoginOverlay";
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "999999";
    overlay.style.background = "linear-gradient(180deg,#06112f,#0b2bc9)";
    overlay.style.display = "grid";
    overlay.style.placeItems = "center";
    overlay.style.padding = "22px";
    overlay.style.overflow = "auto";

    overlay.innerHTML = `
      <form id="sfLoginForm" style="
        width:min(520px, 94vw);
        border:1px solid rgba(255,255,255,.18);
        border-radius:28px;
        padding:28px;
        background:rgba(255,255,255,.10);
        box-shadow:0 30px 90px rgba(0,0,0,.35);
        color:white;
        font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;
      ">
        <h1 style="margin:0 0 10px;font-size:34px;letter-spacing:-1px;">SoulFlame Login</h1>

        <p style="margin:0 0 18px;color:rgba(255,255,255,.72);line-height:1.45;">
          Влез в профила си и избери connector-и. Колкото повече са вързани, толкова по-силен става AI Twin профилът.
        </p>

        <label style="display:block;font-weight:900;margin-bottom:8px;">Име</label>
        <input id="sfLoginName" value="${escapeHtml(profile.name || "Dimitar")}" style="
          width:100%;
          height:54px;
          border:1px solid rgba(255,255,255,.18);
          border-radius:16px;
          background:rgba(255,255,255,.10);
          color:white;
          padding:0 14px;
          font-size:16px;
          outline:none;
          margin-bottom:16px;
        " />

        <label style="display:block;font-weight:900;margin-bottom:8px;">Instagram / username</label>
        <input id="sfLoginInstagram" value="${escapeHtml(profile.instagram || "@stere0metal360")}" style="
          width:100%;
          height:54px;
          border:1px solid rgba(255,255,255,.18);
          border-radius:16px;
          background:rgba(255,255,255,.10);
          color:white;
          padding:0 14px;
          font-size:16px;
          outline:none;
          margin-bottom:18px;
        " />

        <div style="
          border:1px solid rgba(255,255,255,.14);
          border-radius:22px;
          padding:16px;
          background:rgba(0,0,0,.10);
          margin-bottom:20px;
        ">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;">
            <strong>Connectors</strong>
            <button type="button" id="sfSelectAllConnectors" style="
              border:1px solid rgba(255,255,255,.22);
              border-radius:999px;
              background:rgba(255,255,255,.12);
              color:white;
              padding:8px 12px;
              font-weight:900;
              cursor:pointer;
            ">Вържи всички</button>
          </div>

          <p style="margin:0 0 14px;color:rgba(255,255,255,.68);line-height:1.4;">
            Това са connector-и към бъдещата база: Facebook, Snapchat, Instagram, GitHub и Google Profile.
          </p>

          <div id="sfConnectorGrid" style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:10px;
          ">
            ${CONNECTORS.map(c => connectorButtonHtml(c, selected)).join("")}
          </div>
        </div>

        <button type="submit" style="
          width:100%;
          height:56px;
          border:0;
          border-radius:16px;
          background:#ffffff;
          color:#0b2bc9;
          font-weight:950;
          font-size:16px;
          cursor:pointer;
        ">Вход + запази connector-и</button>

        <p id="sfConnectorStatus" style="
          margin:14px 0 0;
          color:rgba(255,255,255,.72);
          font-size:13px;
          line-height:1.35;
        ">Избрани connector-и: ${selected.length}</p>
      </form>
    `;

    document.body.appendChild(overlay);

    const form = qs("#sfLoginForm");
    const status = qs("#sfConnectorStatus");

    function currentSelected() {
      return Array.from(document.querySelectorAll(".sfConnectorBtn.active"))
        .map(btn => btn.dataset.connector)
        .filter(Boolean);
    }

    function setBtnActive(btn, active) {
      btn.classList.toggle("active", active);
      btn.style.border = active ? "1px solid rgba(255,255,255,.85)" : "1px solid rgba(255,255,255,.18)";
      btn.style.background = active ? "rgba(255,255,255,.24)" : "rgba(255,255,255,.09)";
    }

    document.querySelectorAll(".sfConnectorBtn").forEach(btn => {
      if (selected.includes(btn.dataset.connector)) {
        btn.classList.add("active");
      }

      btn.addEventListener("click", function () {
        setBtnActive(btn, !btn.classList.contains("active"));
        const list = currentSelected();
        saveSelectedConnectors(list);
        status.textContent = "Избрани connector-и: " + list.length;
      });
    });

    const allBtn = qs("#sfSelectAllConnectors");
    allBtn.addEventListener("click", function () {
      document.querySelectorAll(".sfConnectorBtn").forEach(btn => setBtnActive(btn, true));
      const list = currentSelected();
      saveSelectedConnectors(list);
      status.textContent = "Избрани connector-и: " + list.length + " / всички вързани";
    });

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = qs("#sfLoginName").value.trim() || "Dimitar";
      const instagram = qs("#sfLoginInstagram").value.trim() || "@stere0metal360";
      const connectors = currentSelected();

      status.textContent = "Записвам login + connector-и...";

      await saveLogin(name, instagram, connectors);

      status.textContent = "Готово.";
    });
  }

  function boot() {
    updateProfileMini();

    if (!isLoggedIn()) {
      showLoginOverlay();
    }

    setInterval(function () {
      updateProfileMini();

      if (!isLoggedIn() && !qs("#sfLoginOverlay")) {
        showLoginOverlay();
      }
    }, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.SoulFlameAuth = {
    login: saveLogin,
    logout,
    isLoggedIn,
    showLoginOverlay,
    connectors: getSelectedConnectors
  };
})();