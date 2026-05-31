(function () {
  function q(selector) {
    return document.querySelector(selector);
  }

  function addV21Links() {
    const nav = q(".nav-actions");
    if (!nav || q("#v21Links")) return;

    const wrap = document.createElement("span");
    wrap.id = "v21Links";
    wrap.className = "v21-links";
    wrap.innerHTML = `
      <a href="admin-security.html">Admin Security</a>
      <a href="supabase-keys.html">Supabase Keys</a>
    `;

    nav.appendChild(wrap);
  }

  function addV21Panel() {
    const landing = q("#landingScreen");
    if (!landing || q("#v21Panel")) return;

    const panel = document.createElement("div");
    panel.id = "v21Panel";
    panel.className = "v21-panel";
    panel.innerHTML = `
      <div>
        <div class="result-label">V21 Security Lock</div>
        <h2>Admin PIN вече е сменен</h2>
        <p>V21 маха default PIN warning-а, добавя private PIN storage, Supabase key intake и security docs преди реалното cloud включване.</p>
      </div>
      <div class="v21-actions">
        <a href="admin-security.html">Admin Security</a>
        <a href="supabase-keys.html">Supabase Keys</a>
        <a href="cloud-test.html">Cloud Test</a>
      </div>
    `;

    landing.appendChild(panel);
  }

  function boot() {
    addV21Links();
    addV21Panel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
