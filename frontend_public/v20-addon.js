(function () {
  function q(selector) {
    return document.querySelector(selector);
  }

  function addV20Links() {
    const nav = q(".nav-actions");
    if (!nav || q("#v20Links")) return;

    const wrap = document.createElement("span");
    wrap.id = "v20Links";
    wrap.className = "v20-links";
    wrap.innerHTML = `
      <a href="deploy-command-center.html">Command Center</a>
      <a href="supabase-activation.html">Supabase Wizard</a>
      <a href="production-blockers.html">Blockers</a>
    `;

    nav.appendChild(wrap);
  }

  function addV20Panel() {
    const landing = q("#landingScreen");
    if (!landing || q("#v20Panel")) return;

    const panel = document.createElement("div");
    panel.id = "v20Panel";
    panel.className = "v20-panel";
    panel.innerHTML = `
      <div>
        <div class="result-label">V20 Command Center</div>
        <h2>Supabase Activation + Pre-Deploy Control</h2>
        <p>V20 добавя wizard, production blockers, admin PIN tools, launch readiness, API skeleton и frontend public package преди реалния Vercel deploy.</p>
      </div>
      <div class="v20-actions">
        <a href="deploy-command-center.html">Command Center</a>
        <a href="supabase-activation.html">Activation Wizard</a>
        <a href="cloud-test.html">Cloud Test</a>
        <a href="supabase-test.html">Supabase Test</a>
      </div>
    `;

    landing.appendChild(panel);
  }

  function boot() {
    addV20Links();
    addV20Panel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
