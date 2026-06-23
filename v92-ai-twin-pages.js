(function () {
  "use strict";

  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return Array.from(document.querySelectorAll(s)); }

  function main() {
    return qs(".main");
  }

  function openPanel(id) {
    const panel = qs("#" + id);
    if (!panel) return;

    qsa(".panel").forEach(p => p.classList.remove("active"));
    panel.classList.add("active");

    qsa(".topbar .tab[data-panel]").forEach(b => b.classList.remove("active"));
    const tab = qs('.topbar .tab[data-panel="' + id + '"]');
    if (tab) tab.classList.add("active");
  }

  function panelExists(id) {
    return Boolean(qs("#" + id));
  }

  function addPanel(id, title, desc, bodyHtml) {
    if (panelExists(id)) return;

    const section = document.createElement("section");
    section.className = "panel";
    section.id = id;

    section.innerHTML = `
      <div class="headline">
        <div>
          <h1>${title}</h1>
          <p>${desc}</p>
        </div>
      </div>
      ${bodyHtml}
    `;

    main().appendChild(section);
  }

  function ensurePages() {
    if (!main()) return;

    addPanel(
      "aiTwinHomePanel",
      "AI Twin Home",
      "Central home for the personal AI Twin. From here we connect profile, memory, future twin, user tools and admin system.",
      `
      <div class="v92-page-grid">
        <div class="v92-action-card">
          <h3>Identity</h3>
          <p>Your AI Twin identity starts from name, Instagram, EchoProfile and memory.</p>
        </div>
        <div class="v92-action-card">
          <h3>Growth</h3>
          <p>The Twin grows through conversations, saved events, connectors and future matching.</p>
        </div>
        <div class="v92-action-card">
          <h3>Network</h3>
          <p>Twin+ connects two AI Twins into conversation, matching or paid Twin Talk.</p>
        </div>
      </div>`
    );

    addPanel(
      "futureTwinPanel",
      "Future Twin",
      "Talk with possible future versions of yourself: 1 year, 5 years, brave path or no-change path.",
      `
      <div class="grid2">
        <div class="card">
          <h3>Create future message</h3>
          <select class="field" id="v92FutureMode">
            <option value="1 year">You after 1 year</option>
            <option value="5 years">You after 5 years</option>
            <option value="brave path">You if you choose the brave path</option>
            <option value="no change">You if you change nothing</option>
          </select>
          <textarea class="field" id="v92FutureQuestion" style="height:120px;padding-top:14px;" placeholder="What should my future Twin tell me?"></textarea>
          <button class="main-btn" id="v92GenerateFuture">Generate Future Twin Message</button>
        </div>
        <div class="card">
          <h3>Future Twin output</h3>
          <pre class="v92-log" id="v92FutureOutput">Ready.</pre>
        </div>
      </div>`
    );

    addPanel(
      "memoryPanel",
      "Memory",
      "Memory area for the AI Twin: profile saves, chat events, connectors, Twin+ links and local system data.",
      `
      <div class="grid2">
        <div class="card">
          <h3>Memory actions</h3>
          <button class="main-btn" id="v92LoadMemory">Load Memory Summary</button>
        </div>
        <div class="card">
          <h3>Memory output</h3>
          <pre class="v92-log" id="v92MemoryOutput">Ready.</pre>
        </div>
      </div>`
    );

    addPanel(
      "soulMatchCorePanel",
      "SoulMatch Core",
      "The core matching layer: profiles, compatibility, conversations, matches and AI Twin relations.",
      `
      <div class="v92-page-grid">
        <div class="v92-action-card"><h3>Messages</h3><p>Conversation layer between people and Twins.</p></div>
        <div class="v92-action-card"><h3>Matches</h3><p>Compatibility and EchoProfile matching.</p></div>
        <div class="v92-action-card"><h3>AI Twin Matching</h3><p>Future engine where one Twin can be matched with another Twin.</p></div>
      </div>`
    );

    addPanel(
      "arEchoCardPanel",
      "AR EchoCard",
      "Future AR card where the AI Twin can appear as a digital identity / profile card.",
      `
      <div class="grid2">
        <div class="card">
          <h3>AR Card Preview</h3>
          <p class="muted">This is the place for future QR/AR profile cards, AI Twin preview and shareable identity.</p>
        </div>
        <div class="card">
          <h3>AR EchoCard output</h3>
          <pre class="v92-log">Status: prepared
Next: QR card, visual avatar, AR profile layer.</pre>
        </div>
      </div>`
    );

    addPanel(
      "settingsPanel",
      "Settings / Privacy",
      "Privacy, data control, local storage, profile visibility and AI Twin permissions.",
      `
      <div class="v92-page-grid">
        <div class="v92-action-card"><h3>Privacy</h3><p>Control which data the Twin can use.</p></div>
        <div class="v92-action-card"><h3>Visibility</h3><p>Choose public, private or paid access.</p></div>
        <div class="v92-action-card"><h3>Data</h3><p>Export, review or delete local Twin data.</p></div>
      </div>`
    );

    addPanel(
      "systemHealthPanel",
      "API Health",
      "System health from the backend. This loads live data from /api/health and /api/v91/health.",
      `
      <div class="grid2">
        <div class="card">
          <h3>System API</h3>
          <button class="main-btn" id="v92LoadApiHealth">Load API Health</button>
        </div>
        <div class="card">
          <h3>API output</h3>
          <pre class="v92-log" id="v92ApiHealthOutput">Ready.</pre>
        </div>
      </div>`
    );

    addPanel(
      "supabaseStatusPanel",
      "Supabase Status",
      "Shows whether Supabase is connected and how it affects Twin health.",
      `
      <div class="grid2">
        <div class="card">
          <h3>Supabase</h3>
          <button class="main-btn" id="v92LoadSupabase">Check Supabase</button>
        </div>
        <div class="card">
          <h3>Supabase output</h3>
          <pre class="v92-log" id="v92SupabaseOutput">Ready.</pre>
        </div>
      </div>`
    );

    addPanel(
      "deployPanel",
      "Deploy / Vercel",
      "Deployment command center for Git and Vercel.",
      `
      <div class="card">
        <h3>Deploy commands</h3>
        <pre class="v92-log">cd E:\\SoulFlame_EchoProfile_MVP
git status
git add .
git commit -m "deploy: update SoulFlame site"
git push origin main
npx vercel --prod --yes</pre>
      </div>`
    );

    addPanel(
      "dataMemoryPanel",
      "Data / Memory Log",
      "Raw data and memory log from the local SoulFlame system.",
      `
      <div class="grid2">
        <div class="card">
          <h3>Data actions</h3>
          <button class="main-btn" id="v92LoadDataMemory">Load Data / Memory</button>
        </div>
        <div class="card">
          <h3>Data output</h3>
          <pre class="v92-log" id="v92DataMemoryOutput">Ready.</pre>
        </div>
      </div>`
    );

    wireButtons();
  }

  function wireButtons() {
    const futureBtn = qs("#v92GenerateFuture");
    if (futureBtn && !futureBtn.dataset.ready) {
      futureBtn.dataset.ready = "1";
      futureBtn.onclick = function () {
        const mode = qs("#v92FutureMode").value;
        const question = qs("#v92FutureQuestion").value || "Give me a message.";
        qs("#v92FutureOutput").textContent =
          "Future Twin mode: " + mode + "\n\n" +
          "Message:\n" +
          "Your future Twin would tell you: keep building SoulFlame step by step. The system becomes real when every page loads, saves data, and connects people through their AI Twins.\n\n" +
          "Question: " + question;
      };
    }

    const memoryBtn = qs("#v92LoadMemory");
    if (memoryBtn && !memoryBtn.dataset.ready) {
      memoryBtn.dataset.ready = "1";
      memoryBtn.onclick = async function () {
        const out = qs("#v92MemoryOutput");
        out.textContent = "Loading...";
        const data = await loadAdminSystemSafe();
        out.textContent = JSON.stringify({
          memoryRule: "Memory is built from profiles, events, connectors, Twin+ links, payments and conversations.",
          stats: data ? data.stats : null,
          myTwin: data ? data.myTwin : [],
          recentEvents: data && data.raw ? data.raw.recentEvents : []
        }, null, 2);
      };
    }

    const apiBtn = qs("#v92LoadApiHealth");
    if (apiBtn && !apiBtn.dataset.ready) {
      apiBtn.dataset.ready = "1";
      apiBtn.onclick = async function () {
        const out = qs("#v92ApiHealthOutput");
        out.textContent = "Loading...";
        const h1 = await fetchJson("/api/health", {});
        const h2 = await fetchJson("/api/v91/health", {});
        out.textContent = JSON.stringify({ apiHealth: h1, twinHealth: h2 }, null, 2);
      };
    }

    const supabaseBtn = qs("#v92LoadSupabase");
    if (supabaseBtn && !supabaseBtn.dataset.ready) {
      supabaseBtn.dataset.ready = "1";
      supabaseBtn.onclick = async function () {
        const out = qs("#v92SupabaseOutput");
        out.textContent = "Loading...";
        const h = await fetchJson("/api/v91/health", {});
        out.textContent = JSON.stringify({
          supabaseConfigured: h.infrastructure ? h.infrastructure.supabaseConfigured : false,
          meaning: h.infrastructure && h.infrastructure.supabaseConfigured
            ? "Supabase is connected."
            : "Supabase is not connected. Twin health loses points until Supabase keys are added.",
          infrastructure: h.infrastructure || null
        }, null, 2);
      };
    }

    const dataBtn = qs("#v92LoadDataMemory");
    if (dataBtn && !dataBtn.dataset.ready) {
      dataBtn.dataset.ready = "1";
      dataBtn.onclick = async function () {
        const out = qs("#v92DataMemoryOutput");
        out.textContent = "Loading...";
        const data = await loadAdminSystemSafe();
        out.textContent = JSON.stringify(data || { ok: false, error: "No data" }, null, 2);
      };
    }
  }

  async function fetchJson(url, fallback) {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (err) {
      return { ok: false, error: err.message, fallback };
    }
  }

  async function loadAdminSystemSafe() {
    try {
      const pin = sessionStorage.getItem("sf_admin_pin") || "admin";
      const res = await fetch("/api/v91/system", {
        headers: { "x-admin-pin": pin }
      });
      return await res.json();
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  window.addEventListener("message", function (event) {
    const data = event.data;
    if (!data || typeof data !== "object") return;

    if (data.type === "V92_OPEN_PANEL") {
      ensurePages();
      openPanel(data.panel);

      if (data.panel === "systemHealthPanel") {
        setTimeout(() => {
          const btn = qs("#v92LoadApiHealth");
          if (btn) btn.click();
        }, 100);
      }

      if (data.panel === "supabaseStatusPanel") {
        setTimeout(() => {
          const btn = qs("#v92LoadSupabase");
          if (btn) btn.click();
        }, 100);
      }

      if (data.panel === "dataMemoryPanel") {
        setTimeout(() => {
          const btn = qs("#v92LoadDataMemory");
          if (btn) btn.click();
        }, 100);
      }
    }
  });

  function boot() {
    ensurePages();
    setInterval(ensurePages, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.SoulFlameV92Pages = { ensurePages, openPanel };
})();