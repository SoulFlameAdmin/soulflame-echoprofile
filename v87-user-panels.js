(function () {
  "use strict";

  let v87System = null;

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

  async function fetchSystem() {
    const res = await fetch("/api/twin-health-v87");
    const data = await res.json();
    v87System = data;
    return data;
  }

  function ensureConnectorsPanel() {
    if (qs("#v87ConnectorsPanel")) return;

    const panel = document.createElement("section");
    panel.className = "panel";
    panel.id = "v87ConnectorsPanel";
    panel.innerHTML = `
      <div class="headline">
        <div>
          <h2>Connectors</h2>
          <p>Тук са само connector-ите. Няма Twin+, няма health, няма network.</p>
        </div>
      </div>

      <div class="glass">
        <h3>Конектори</h3>
        <div class="connector-grid" id="v87ConnectorsBox"></div>
      </div>

      <div class="glass" style="margin-top:20px;">
        <h3>Connector output</h3>
        <pre class="v87-json" id="v87ConnectorOutput">Избери connector.</pre>
      </div>
    `;

    const main = qs(".main");
    if (main) main.appendChild(panel);

    renderConnectors();
  }

  function renderConnectors() {
    const box = qs("#v87ConnectorsBox");
    if (!box) return;

    const list = ["Facebook", "GitHub", "Google", "Instagram", "Telegram", "Snapchat"];
    box.innerHTML = "";

    list.forEach(name => {
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
        const out = qs("#v87ConnectorOutput");
        if (out) out.textContent = JSON.stringify(data, null, 2);
      };

      box.appendChild(el);
    });
  }

  function ensureTwinPlusPanel() {
    if (qs("#v87TwinPlusPanel")) return;

    const panel = document.createElement("section");
    panel.className = "panel";
    panel.id = "v87TwinPlusPanel";
    panel.innerHTML = `
      <div class="headline">
        <div>
          <h2>Twin+ Network</h2>
          <p>Тук се добавят два Twin-а в разговор. Това е основата за Twin Talk, matching и платено свързване.</p>
        </div>
        <button class="ghost-btn" id="v87RefreshTwinPlus">Refresh</button>
      </div>

      <div class="grid2">
        <div class="v87-card">
          <h3>Добави 2 Twin-а в разговор</h3>

          <select class="v87-select" id="v87TwinA"></select>
          <select class="v87-select" id="v87TwinB"></select>

          <input class="field" id="v87ConversationTopic" placeholder="Тема, например: Twin Talk / Match / Business intro" />

          <button class="main-btn" id="v87CreateConversation">Създай Twin+ разговор</button>
        </div>

        <div class="v87-card">
          <h3>Какво прави Twin+ Network</h3>
          <p class="muted">
            Избираш два AI Twin-а. Системата ги записва като conversation pair.
            После може да се добави плащане, match score, chat room и AI-to-AI разговор.
          </p>
        </div>
      </div>

      <div class="v87-card" style="margin-top:20px;">
        <h3>Matching / Conversations</h3>
        <pre class="v87-json" id="v87TwinPlusOutput">Няма заредени данни.</pre>
      </div>
    `;

    const main = qs(".main");
    if (main) main.appendChild(panel);

    const refresh = qs("#v87RefreshTwinPlus");
    if (refresh) refresh.onclick = loadTwinPlus;

    const create = qs("#v87CreateConversation");
    if (create) create.onclick = createConversation;
  }

  function fillTwinSelects(system) {
    const a = qs("#v87TwinA");
    const b = qs("#v87TwinB");

    if (!a || !b) return;

    const twins = system.twins || [];

    a.innerHTML = "";
    b.innerHTML = "";

    twins.forEach(t => {
      const label = `${t.isMine ? "👑 " : ""}${t.name} | ${t.instagram || "-"} | Health ${t.health?.score || 0}%`;
      const optA = document.createElement("option");
      optA.value = t.id;
      optA.textContent = label;

      const optB = document.createElement("option");
      optB.value = t.id;
      optB.textContent = label;

      a.appendChild(optA);
      b.appendChild(optB);
    });

    if (twins.length > 1) b.selectedIndex = 1;
  }

  async function loadTwinPlus() {
    ensureTwinPlusPanel();

    const system = await fetchSystem();
    fillTwinSelects(system);

    const out = qs("#v87TwinPlusOutput");
    if (out) {
      out.textContent = JSON.stringify({
        globalHealth: system.globalHealth,
        conversations: system.raw?.conversations || [],
        twins: (system.twins || []).map(t => ({
          id: t.id,
          name: t.name,
          instagram: t.instagram,
          health: t.health,
          bestMatches: t.bestMatches,
          relatedConversations: t.related?.conversations || []
        }))
      }, null, 2);
    }
  }

  async function createConversation() {
    const a = qs("#v87TwinA");
    const b = qs("#v87TwinB");
    const topic = qs("#v87ConversationTopic");

    if (!a || !b || !a.value || !b.value) {
      alert("Избери два Twin-а.");
      return;
    }

    if (a.value === b.value) {
      alert("Избери два различни Twin-а.");
      return;
    }

    const res = await fetch("/api/twinplus/conversation-v87", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        twinAId: a.value,
        twinBId: b.value,
        topic: topic?.value || "Twin+ conversation",
        paymentStatus: "checking",
        status: "created"
      })
    });

    const data = await res.json().catch(() => ({}));
    const out = qs("#v87TwinPlusOutput");
    if (out) out.textContent = JSON.stringify(data, null, 2);

    await loadTwinPlus();
  }

  function ensureHealthPanel() {
    if (qs("#v87HealthPanel")) return;

    const panel = document.createElement("section");
    panel.className = "panel";
    panel.id = "v87HealthPanel";
    panel.innerHTML = `
      <div class="headline">
        <div>
          <h2>AI Twin Health</h2>
          <p>Реално здраве 0–100% за всеки AI Twin: памет, EchoProfile, Supabase, OpenAI, connectors, Twin+, плащания, events и грешки.</p>
        </div>
        <button class="ghost-btn" id="v87RefreshHealth">Refresh</button>
      </div>

      <div class="v87-card">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <h3 style="margin:0 0 8px;">Общо здраве на всички AI Twin-ове</h3>
            <p class="muted" id="v87GlobalHealthLabel" style="margin:0;">Зареждане...</p>
          </div>
          <div class="v87-health-score" id="v87GlobalHealthScore">0%</div>
        </div>
        <div class="v87-health-bar">
          <div class="v87-health-fill" id="v87GlobalHealthFill"></div>
        </div>
      </div>

      <div class="v87-mini-grid" style="margin-top:18px;">
        <div class="v87-mini"><strong id="v87Supabase">-</strong><small>Supabase</small></div>
        <div class="v87-mini"><strong id="v87OpenAI">-</strong><small>OpenAI/GPT</small></div>
        <div class="v87-mini"><strong id="v87Profiles">0</strong><small>Profiles / Memory</small></div>
        <div class="v87-mini"><strong id="v87Events">0</strong><small>Events</small></div>
        <div class="v87-mini"><strong id="v87ConnectorsCount">0</strong><small>Connectors</small></div>
        <div class="v87-mini"><strong id="v87TwinLinksCount">0</strong><small>Twin+ Links</small></div>
        <div class="v87-mini"><strong id="v87PaymentsCount">0</strong><small>Payments</small></div>
        <div class="v87-mini"><strong id="v87ConversationsCount">0</strong><small>Conversations</small></div>
      </div>

      <div class="v87-card" style="margin-top:20px;">
        <h3>Здраве по AI Twin</h3>
        <div class="v87-twin-list" id="v87TwinHealthList"></div>
      </div>

      <div class="v87-card" style="margin-top:20px;">
        <h3>Raw health JSON</h3>
        <pre class="v87-json" id="v87HealthJson">Loading...</pre>
      </div>
    `;

    const main = qs(".main");
    if (main) main.appendChild(panel);

    const refresh = qs("#v87RefreshHealth");
    if (refresh) refresh.onclick = loadHealth;
  }

  function renderHealthRow(t) {
    const row = document.createElement("div");
    row.className = "v87-twin-health-row";

    const score = t.health?.score || 0;
    const label = t.isMine ? "👑 " : "";
    const payment = t.paymentStatus?.paid ? "paid" : "not paid";

    row.innerHTML = `
      <div class="v87-row-head">
        <div>
          <strong>${label}${t.name || "Unknown Twin"}</strong><br>
          <small>${t.instagram || "-"} • Level ${t.level || "-"}/10 • ${t.echoType || "Not profiled"}</small>
        </div>
        <div style="text-align:right;">
          <strong>${score}%</strong><br>
          <small>${t.health?.label || ""}</small>
        </div>
      </div>

      <div class="v87-health-bar">
        <div class="v87-health-fill" style="width:${score}%"></div>
      </div>

      <div class="v87-mini-grid" style="margin-top:12px;">
        <div class="v87-mini"><strong>${t.health?.factors?.memory ? "ON" : "OFF"}</strong><small>Памет</small></div>
        <div class="v87-mini"><strong>${t.health?.factors?.echoProfile ? "ON" : "OFF"}</strong><small>EchoProfile</small></div>
        <div class="v87-mini"><strong>${t.health?.factors?.supabase ? "ON" : "OFF"}</strong><small>Supabase</small></div>
        <div class="v87-mini"><strong>${t.health?.factors?.openai ? "ON" : "OFF"}</strong><small>OpenAI</small></div>
        <div class="v87-mini"><strong>${t.health?.factors?.connectors ? "ON" : "OFF"}</strong><small>Connectors</small></div>
        <div class="v87-mini"><strong>${t.health?.factors?.twinPlus ? "ON" : "OFF"}</strong><small>Twin+</small></div>
        <div class="v87-mini"><strong>${payment}</strong><small>Payment</small></div>
        <div class="v87-mini"><strong>${t.health?.factors?.errors || 0}</strong><small>Errors</small></div>
      </div>
    `;

    row.onclick = function () {
      const json = qs("#v87HealthJson");
      if (json) json.textContent = JSON.stringify(t, null, 2);
    };

    return row;
  }

  async function loadHealth() {
    ensureHealthPanel();

    const system = await fetchSystem();

    const score = system.globalHealth?.score || 0;

    qs("#v87GlobalHealthScore").textContent = score + "%";
    qs("#v87GlobalHealthFill").style.width = score + "%";
    qs("#v87GlobalHealthLabel").textContent = system.globalHealth?.label || "-";

    qs("#v87Supabase").textContent = system.infrastructure?.supabaseConfigured ? "ON" : "OFF";
    qs("#v87OpenAI").textContent = system.infrastructure?.openaiConfigured ? "ON" : "OFF";
    qs("#v87Profiles").textContent = system.infrastructure?.localProfiles ?? 0;
    qs("#v87Events").textContent = system.infrastructure?.localEvents ?? 0;
    qs("#v87ConnectorsCount").textContent = system.infrastructure?.localConnectors ?? 0;
    qs("#v87TwinLinksCount").textContent = system.infrastructure?.localTwinLinks ?? 0;
    qs("#v87PaymentsCount").textContent = system.infrastructure?.localPayments ?? 0;
    qs("#v87ConversationsCount").textContent = system.infrastructure?.localConversations ?? 0;

    const list = qs("#v87TwinHealthList");
    if (list) {
      list.innerHTML = "";

      (system.twins || []).forEach(t => {
        list.appendChild(renderHealthRow(t));
      });

      if (!(system.twins || []).length) {
        list.innerHTML = `<div class="v87-twin-health-row"><strong>Няма AI Twin профили.</strong><br><small>Създай поне един EchoProfile.</small></div>`;
      }
    }

    const json = qs("#v87HealthJson");
    if (json) json.textContent = JSON.stringify(system, null, 2);
  }

  function openUserView(view) {
    ensureConnectorsPanel();
    ensureTwinPlusPanel();
    ensureHealthPanel();

    if (view === "connectors") {
      openPanel("v87ConnectorsPanel");
      renderConnectors();
      return;
    }

    if (view === "twinplus") {
      openPanel("v87TwinPlusPanel");
      loadTwinPlus();
      return;
    }

    if (view === "health") {
      openPanel("v87HealthPanel");
      loadHealth();
      return;
    }
  }

  window.addEventListener("message", function (event) {
    const data = event && event.data ? event.data : null;
    if (!data || typeof data !== "object") return;

    if (data.type === "V87_USER_VIEW") {
      openUserView(data.view || "health");
    }
  });

  function boot() {
    ensureConnectorsPanel();
    ensureTwinPlusPanel();
    ensureHealthPanel();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.SoulFlameV87User = {
    openUserView,
    loadHealth,
    loadTwinPlus,
    createConversation
  };
})();