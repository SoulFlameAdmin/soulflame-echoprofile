(function () {
  "use strict";

  const AUTH_KEY = "sf_logged_in";
  const NAME_KEY = "sf_name";
  const IG_KEY = "sf_instagram";

  function qs(s) {
    return document.querySelector(s);
  }

  function getStoredProfile() {
    let legacy = {};
    try {
      legacy = JSON.parse(localStorage.getItem("sf_v83_profile") || "{}");
    } catch {}

    const name =
      localStorage.getItem(NAME_KEY) ||
      legacy.name ||
      legacy.user?.name ||
      "Dimitar";

    const instagram =
      localStorage.getItem(IG_KEY) ||
      legacy.instagram ||
      legacy.user?.instagram ||
      "@stere0metal360";

    return { name, instagram };
  }

  function isLoggedIn() {
    return localStorage.getItem(AUTH_KEY) === "1";
  }

  function saveLogin(name, instagram) {
    localStorage.setItem(AUTH_KEY, "1");
    localStorage.setItem(NAME_KEY, name || "Dimitar");
    localStorage.setItem(IG_KEY, instagram || "@stere0metal360");

    updateProfileMini();
    hideLoginOverlay();
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem("sf_admin_pin");

    showLoginOverlay();
    updateProfileMini();
  }

  function updateProfileMini() {
    const box = qs(".profile-mini");
    if (!box) return;

    const profile = getStoredProfile();
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
      small.textContent = isLoggedIn() ? "Your profile" : "Logged out";
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

  function hideLoginOverlay() {
    const overlay = qs("#sfLoginOverlay");
    if (overlay) overlay.remove();
  }

  function showLoginOverlay() {
    if (qs("#sfLoginOverlay")) return;

    const profile = getStoredProfile();

    const overlay = document.createElement("div");
    overlay.id = "sfLoginOverlay";
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "999999";
    overlay.style.background = "linear-gradient(180deg,#06112f,#0b2bc9)";
    overlay.style.display = "grid";
    overlay.style.placeItems = "center";
    overlay.style.padding = "22px";

    overlay.innerHTML = `
      <form id="sfLoginForm" style="
        width:min(440px, 92vw);
        border:1px solid rgba(255,255,255,.18);
        border-radius:28px;
        padding:28px;
        background:rgba(255,255,255,.10);
        box-shadow:0 30px 90px rgba(0,0,0,.35);
        color:white;
        font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;
      ">
        <h1 style="margin:0 0 10px;font-size:34px;letter-spacing:-1px;">SoulFlame Login</h1>
        <p style="margin:0 0 22px;color:rgba(255,255,255,.72);line-height:1.45;">
          Влез, за да продължиш към профила си.
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
          margin-bottom:22px;
        " />

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
        ">Вход</button>
      </form>
    `;

    document.body.appendChild(overlay);

    const form = qs("#sfLoginForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = qs("#sfLoginName").value.trim() || "Dimitar";
      const instagram = qs("#sfLoginInstagram").value.trim() || "@stere0metal360";

      saveLogin(name, instagram);
    });
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function bootAuth() {
    updateProfileMini();

    if (!isLoggedIn()) {
      showLoginOverlay();
    }

    setInterval(function () {
      updateProfileMini();

      if (!isLoggedIn()) {
        showLoginOverlay();
      }
    }, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootAuth);
  } else {
    bootAuth();
  }

  window.SoulFlameAuth = {
    login: saveLogin,
    logout,
    isLoggedIn,
    showLoginOverlay
  };
})();