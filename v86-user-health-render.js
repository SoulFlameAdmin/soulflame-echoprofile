(function () {
  "use strict";

  function qs(s) { return document.querySelector(s); }

  function openPanel(id) {
    if (typeof openPanelById === "function") {
      openPanelById(id);
      return;
    }

    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    const panel = qs("#" + id);
    if (panel) panel.classList.add("active");
  }

  function getUserInfo() {
    let state = {};
    try {
      state = JSON.parse(localStorage.getItem("sf_v83_profile") || "{}");
    } catch {}

    return {
      name: state.name || "Dimitar",
      instagram: state.instagram || "@stere0metal360",
      twinType: state.twinType || "Личен",
      echo: state.echo || null
    };
  }

  function ensureConnectorsPanel() {
    if (qs("#connectorsPanel")) return;

    const panel = document.createElement("section");
    panel.className = "panel";
    panel.id = "connectorsPanel";
    panel.innerHTML = `
      <div class="headline">
        <div>
          <h2>Connectors</h2>
          <p>Тук са връзките на User Twin-а към външни профили и системи.</p>
        </div>
      </div>

      <div class="glass">
        <h3>Профилни конектори</h3>
        <div class="connector-grid" id="v86ConnectorsBox"></div>
      </div>

      <div class="glass" style="margin-top:20px;">
        <h3>Connector status</h3>
        <pre id="v86ConnectorOutput">Избери connector.</pre>
      </div>
    `;

    const main = qs(".main");
    if (main) main.appendChild(panel);

    renderConnectors();
  }

  function ensureTwinPlusPanel() {
    if (qs("#twinPlusPanel")) return;

    const panel = document.createElement("section");
    panel.className = "panel";
    panel.id = "twinPlusPanel";
    panel.innerHTML = `
      <div class="headline">
        <div>
          <h2>Twin+</h2>
          <p>Запознай твоя Twin с приятелите си и техните Twin-ове. Това е средата за бъдещи AI Twin връзки.</p>
        </div>
      </div>

      <div class="grid2">
        <div class="glass">
          <h3>Създай Twin+ връзка</h3>
          <input class="field" id="v86FriendName" placeholder="Име на приятел" />
          <input class="field" id="v86FriendInstagram" placeholder="Instagram на приятел" />
          <input class="field" id="v86FriendTwinId" placeholder="Twin ID, ако има" />
          <button class="main-btn" id="v86CreateTwinPlus">Свържи Twin+</button>
        </div>

        <div class="glass">
          <h3>Какво значи Twin+</h3>
          <p class="muted">Twin+ позволява два AI Twin-а да бъдат свързани за разговор, matching, friendship graph или платена Twin Talk връзка.</p>
        </div>
      </div>

      <div class="glass" style="margin-top:20px;">
        <h3>Twin+ output</h3>
        <pre id="v86TwinPlusOutput">Още няма връзка.</pre>
      </div>
    `;

    const main = qs(".main");
    if (main) main.appendChild(panel);

    const btn = qs("#v86CreateTwinPlus");
    if (btn) btn.onclick = createTwinPlusV86;
  }

  function ensureHealthPanel() {
    if (qs("#twinHealthPanel")) return;

    const panel = document.createElement("section");
    panel.className = "panel";
    panel.id = "twinHealthPanel";
    panel.innerHTML = `
      <div class="headline">
        <div>
          <h2>Здравето на твоя Twin</h2>
          <p>Тук се вижда реалният health статус на локалната SoulFlame система. Данните идват директно от /api/health, но се показват вътре, без нов прозорец.</p>
        </div>
        <button class="ghost-btn" id="v86RefreshHealth">Refresh</button>
      </div>

      <div class="v86-health-wrap">
        <div class="v86-health-card">
          <div class="v86-health-top">
            <div>
              <h3 style="margin:0 0 8px;">Twin Health Score</h3>
              <p class="muted" id="v86HealthText" style="margin:0;">Изчисляване...</p>
            </div>
            <div class="v86-health-score" id="v86HealthScore">0%</div>
          </div>

          <div class="v86-health-bar">
            <div class="v86-health-fill" id="v86HealthFill"></div>
          </div>
        </div>

        <div class="v86-health-grid">
          <div class="v86-health-metric"><strong id="v86OpenAI">-</strong><small>OpenAI</small></div>
          <div class="v86-health-metric"><strong id="v86Supabase">-</strong><small>Supabase</small></div>
          <div class="v86-health-metric"><strong id="v86Profiles">0</strong><small>Local Profiles</small></div>
          <div class="v86-health-metric"><strong id="v86Events">0</strong><small>Events</small></div>
          <div class="v86-health-metric"><strong id="v86Connectors">0</strong><small>Connectors</small></div>
          <div class="v86-health-metric"><strong id="v86TwinLinks">0</strong><small>Twin+ Links</small></div>
          <div class="v86-health-metric"><strong id="v86Version">-</strong><small>Version</small></div>
          <div class="v86-health-metric"><strong id="v86Status">-</strong><small>Status</small></div>
        </div>

        <div class="v86-health-card">
          <h3 style="margin-top:0;">Raw /api/health JSON</h3>
          <pre class="v86-health-json" id="v86HealthJson">Loading...</pre>
        </div>
      </div>
    `;

    const main = qs(".main");
    if (main) main.appendChild(panel);

    const refresh = qs("#v86RefreshHealth");
    if (refresh) refresh.onclick = loadHealth;
  }

  function ensureAll() {
    ensureConnectorsPanel();
    ensureTwinPlusPanel();
    ensureHealthPanel();
  }

  function renderConnectors() {
    const box = qs("#v86ConnectorsBox");
    if (!box) return;

    const connectors = ["Facebook", "GitHub", "Google", "Instagram", "Telegram", "Snapchat"];
    box.innerHTML = "";

    connectors.forEach(name => {
      const el = document.createElement("div");
      el.className = "connector";
      el.innerHTML = `
        <strong>${name}</strong>
        <p class="muted">Status: prepared</p>
        <button>Connect ${name}</button>
      `;

      el.querySelector("button").onclick = async function () {
        const user = getUserInfo();

        const res = await fetch("/api/connectors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            instagram: user.instagram,
            connector: name,
            status: "prepared"
          })
        });

        const data = await res.json().catch(() => ({}));
        const out = qs("#v86ConnectorOutput");
        if (out) out.textContent = JSON.stringify(data, null, 2);
      };

      box.appendChild(el);
    });
  }

  async function createTwinPlusV86() {
    const user = getUserInfo();

    const friendName = (qs("#v86FriendName") || {}).value || "";
    const friendInstagram = (qs("#v86FriendInstagram") || {}).value || "";
    const friendTwinId = (qs("#v86FriendTwinId") || {}).value || "";

    const res = await fetch("/api/twin-plus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        instagram: user.instagram,
        friendName,
        friendInstagram,
        friendTwinId
      })
    });

    const data = await res.json().catch(() => ({}));
    const out = qs("#v86TwinPlusOutput");
    if (out) out.textContent = JSON.stringify(data, null, 2);
  }

  function calculateHealth(data) {
    let score = 20;

    if (data.ok) score += 15;
    if (data.openaiConfigured) score += 20;
    if (data.supabaseConfigured) score += 15;
    if ((data.localProfiles || 0) > 0) score += 15;
    if ((data.localEvents || 0) > 0) score += 8;
    if ((data.localConnectors || 0) > 0) score += 4;
    if ((data.localTwinLinks || 0) > 0) score += 3;

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  function healthLabel(score) {
    if (score >= 85) return "Много добро здраве. Twin системата е почти готова.";
    if (score >= 65) return "Добро здраве. Основата работи, но има липсващи връзки.";
    if (score >= 45) return "Средно здраве. Системата работи локално, но не е напълно свързана.";
    return "Слабо здраве. Липсват важни backend/API връзки.";
  }

  async function loadHealth() {
    ensureHealthPanel();

    const jsonBox = qs("#v86HealthJson");

    try {
      const res = await fetch("/api/health");
      const data = await res.json();

      const score = calculateHealth(data);

      qs("#v86HealthScore").textContent = score + "%";
      qs("#v86HealthFill").style.width = score + "%";
      qs("#v86HealthText").textContent = healthLabel(score);

      qs("#v86OpenAI").textContent = data.openaiConfigured ? "ON" : "OFF";
      qs("#v86Supabase").textContent = data.supabaseConfigured ? "ON" : "OFF";
      qs("#v86Profiles").textContent = data.localProfiles ?? 0;
      qs("#v86Events").textContent = data.localEvents ?? 0;
      qs("#v86Connectors").textContent = data.localConnectors ?? 0;
      qs("#v86TwinLinks").textContent = data.localTwinLinks ?? 0;
      qs("#v86Version").textContent = data.version || "-";
      qs("#v86Status").textContent = data.ok ? "OK" : "BAD";

      if (jsonBox) jsonBox.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      if (jsonBox) {
        jsonBox.textContent = JSON.stringify({
          ok: false,
          error: err.message
        }, null, 2);
      }

      qs("#v86HealthScore").textContent = "0%";
      qs("#v86HealthFill").style.width = "0%";
      qs("#v86HealthText").textContent = "Health API не отговори.";
    }
  }

  function openUserView(view) {
    ensureAll();

    if (view === "connectors") {
      openPanel("connectorsPanel");
      renderConnectors();
      return;
    }

    if (view === "twinplus") {
      openPanel("twinPlusPanel");
      return;
    }

    if (view === "health") {
      openPanel("twinHealthPanel");
      loadHealth();
      return;
    }
  }

  window.addEventListener("message", function (event) {
    const data = event && event.data ? event.data : null;
    if (!data || typeof data !== "object") return;

    if (data.type === "V86_USER_VIEW") {
      openUserView(data.view || "health");
    }
  });

  function boot() {
    ensureAll();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.SoulFlameV86User = { openUserView, loadHealth };
})();