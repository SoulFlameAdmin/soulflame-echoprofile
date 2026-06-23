(function () {
  "use strict";

  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return Array.from(document.querySelectorAll(s)); }

  function main() {
    return qs(".main");
  }

  function openPanel(id) {
    const panel = qs("#" + id);
    if (!panel) return false;

    qsa(".panel").forEach(p => p.classList.remove("active"));
    panel.classList.add("active");

    qsa(".topbar .tab[data-panel]").forEach(b => b.classList.remove("active"));
    const tab = qs('.topbar .tab[data-panel="' + id + '"]');
    if (tab) tab.classList.add("active");

    return true;
  }

  function addPanel(id, title, desc, bodyHtml) {
    if (qs("#" + id)) return;

    const m = main();
    if (!m) return;

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

    m.appendChild(section);
  }

  function ensurePages() {
    if (!main()) return;

    addPanel(
      "aiTwinHomePanel",
      "AI Twin Home",
      "Central home for the personal AI Twin. Profile, memory, future twin, user tools and admin system connect here.",
      `
      <div class="v96-page-grid">
        <div class="v96-card"><h3>Identity</h3><p>Name, Instagram, EchoProfile and memory create the Twin identity.</p></div>
        <div class="v96-card"><h3>Growth</h3><p>The Twin grows from conversations, events, connectors and Twin+ links.</p></div>
        <div class="v96-card"><h3>Network</h3><p>Twin+ connects two AI Twins for talk, matching or paid access.</p></div>
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
          <select class="field" id="v96FutureMode">
            <option value="1 year">You after 1 year</option>
            <option value="5 years">You after 5 years</option>
            <option value="brave path">You if you choose the brave path</option>
            <option value="no change">You if you change nothing</option>
          </select>
          <textarea class="field" id="v96FutureQuestion" style="height:120px;padding-top:14px;" placeholder="What should my future Twin tell me?"></textarea>
          <button class="main-btn" id="v96GenerateFuture">Generate Future Twin Message</button>
        </div>
        <div class="card">
          <h3>Future Twin output</h3>
          <pre class="v96-log" id="v96FutureOutput">Ready.</pre>
        </div>
      </div>`
    );

    addPanel(
      "memoryPanel",
      "Memory",
      "Memory area for profile saves, chat events, connectors, Twin+ links, payments and local system data.",
      `
      <div class="grid2">
        <div class="card">
          <h3>Memory actions</h3>
          <button class="main-btn" id="v96LoadMemory">Load Memory Summary</button>
        </div>
        <div class="card">
          <h3>Memory output</h3>
          <pre class="v96-log" id="v96MemoryOutput">Ready.</pre>
        </div>
      </div>`
    );

    addPanel(
      "soulMatchCorePanel",
      "SoulMatch Core",
      "Core matching layer: profiles, compatibility, conversations, matches and AI Twin relations.",
      `
      <div class="v96-page-grid">
        <div class="v96-card"><h3>Messages</h3><p>Conversation layer between people and Twins.</p></div>
        <div class="v96-card"><h3>Matches</h3><p>Compatibility and EchoProfile matching.</p></div>
        <div class="v96-card"><h3>AI Twin Matching</h3><p>One Twin can be matched with another Twin.</p></div>
      </div>`
    );

    addPanel(
      "arEchoCardPanel",
      "AR EchoCard",
      "Future AR card where the AI Twin appears as a digital identity/profile card.",
      `
      <div class="grid2">
        <div class="card">
          <h3>AR Card Preview</h3>
          <p class="muted">Future QR/AR profile cards, AI Twin preview and shareable identity.</p>
        </div>
        <div class="card">
          <h3>AR EchoCard output</h3>
          <pre class="v96-log">Status: prepared
Next: QR card, visual avatar, AR profile layer.</pre>
        </div>
      </div>`
    );

    addPanel(
      "settingsPanel",
      "Settings / Privacy",
      "Privacy, data control, local storage, profile visibility and AI Twin permissions.",
      `
      <div class="v96-page-grid">
        <div class="v96-card"><h3>Privacy</h3><p>Control which data the Twin can use.</p></div>
        <div class="v96-card"><h3>Visibility</h3><p>Choose public, private or paid access.</p></div>
        <div class="v96-card"><h3>Data</h3><p>Export, review or delete local Twin data.</p></div>
      </div>`
    );

    addPanel(
      "systemHealthPanel",
      "API Health",
      "Live backend health from /api/health and /api/v91/health.",
      `
      <div class="grid2">
        <div class="card">
          <h3>System API</h3>
          <button class="main-btn" id="v96LoadApiHealth">Load API Health</button>
        </div>
        <div class="card">
          <h3>API output</h3>
          <pre class="v96-log" id="v96ApiHealthOutput">Ready.</pre>
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
          <button class="main-btn" id="v96LoadSupabase">Check Supabase</button>
        </div>
        <div class="card">
          <h3>Supabase output</h3>
          <pre class="v96-log" id="v96SupabaseOutput">Ready.</pre>
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
        <pre class="v96-log">cd E:\\SoulFlame_EchoProfile_MVP
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
          <button class="main-btn" id="v96LoadDataMemory">Load Data / Memory</button>
        </div>
        <div class="card">
          <h3>Data output</h3>
          <pre class="v96-log" id="v96DataMemoryOutput">Ready.</pre>
        </div>
      </div>`
    );

    wireButtons();
  }

  async function fetchJson(url, fallback) {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (err) {
      return { ok: false, error: err.message, fallback };
    }
  }

  async function loadSystemSafe() {
    const pin = sessionStorage.getItem("sf_admin_pin") || "admin";

    let res = await fetch("/api/v91/system", {
      headers: { "x-admin-pin": pin }
    }).catch(() => null);

    if (res && res.ok) return await res.json();

    res = await fetch("/api/v90/system", {
      headers: { "x-admin-pin": pin }
    }).catch(() => null);

    if (res && res.ok) return await res.json();

    return { ok: false, error: "No system endpoint available." };
  }

  function wireButtons() {
    const futureBtn = qs("#v96GenerateFuture");
    if (futureBtn && !futureBtn.dataset.ready) {
      futureBtn.dataset.ready = "1";
      futureBtn.onclick = function () {
        const mode = qs("#v96FutureMode").value;
        const question = qs("#v96FutureQuestion").value || "Give me a message.";
        qs("#v96FutureOutput").textContent =
          "Future Twin mode: " + mode + "\n\n" +
          "Message:\n" +
          "Your future Twin says: keep building SoulFlame step by step. The system becomes real when every page loads, saves data, and connects people through their AI Twins.\n\n" +
          "Question: " + question;
      };
    }

    const memoryBtn = qs("#v96LoadMemory");
    if (memoryBtn && !memoryBtn.dataset.ready) {
      memoryBtn.dataset.ready = "1";
      memoryBtn.onclick = async function () {
        const out = qs("#v96MemoryOutput");
        out.textContent = "Loading...";
        const data = await loadSystemSafe();
        out.textContent = JSON.stringify({
          memoryRule: "Memory is built from profiles, events, connectors, Twin+ links, payments and conversations.",
          stats: data.stats || null,
          myTwin: data.myTwin || [],
          recentEvents: data.raw ? data.raw.recentEvents : []
        }, null, 2);
      };
    }

    const apiBtn = qs("#v96LoadApiHealth");
    if (apiBtn && !apiBtn.dataset.ready) {
      apiBtn.dataset.ready = "1";
      apiBtn.onclick = async function () {
        const out = qs("#v96ApiHealthOutput");
        out.textContent = "Loading...";
        const h1 = await fetchJson("/api/health", {});
        const h2 = await fetchJson("/api/v91/health", await fetchJson("/api/v90/health", {}));
        out.textContent = JSON.stringify({ apiHealth: h1, twinHealth: h2 }, null, 2);
      };
    }

    const supabaseBtn = qs("#v96LoadSupabase");
    if (supabaseBtn && !supabaseBtn.dataset.ready) {
      supabaseBtn.dataset.ready = "1";
      supabaseBtn.onclick = async function () {
        const out = qs("#v96SupabaseOutput");
        out.textContent = "Loading...";
        const h = await fetchJson("/api/v91/health", await fetchJson("/api/v90/health", {}));
        out.textContent = JSON.stringify({
          supabaseConfigured: h.infrastructure ? h.infrastructure.supabaseConfigured : false,
          meaning: h.infrastructure && h.infrastructure.supabaseConfigured
            ? "Supabase is connected."
            : "Supabase is not connected. Twin health loses points until Supabase keys are added.",
          infrastructure: h.infrastructure || null
        }, null, 2);
      };
    }

    const dataBtn = qs("#v96LoadDataMemory");
    if (dataBtn && !dataBtn.dataset.ready) {
      dataBtn.dataset.ready = "1";
      dataBtn.onclick = async function () {
        const out = qs("#v96DataMemoryOutput");
        out.textContent = "Loading...";
        const data = await loadSystemSafe();
        out.textContent = JSON.stringify(data || { ok: false, error: "No data" }, null, 2);
      };
    }
  }

  window.addEventListener("message", function (event) {
    const data = event.data;
    if (!data || typeof data !== "object") return;

    if (data.type === "V96_OPEN_PANEL" || data.type === "V92_OPEN_PANEL") {
      ensurePages();
      openPanel(data.panel);

      if (data.panel === "systemHealthPanel") {
        setTimeout(() => {
          const btn = qs("#v96LoadApiHealth");
          if (btn) btn.click();
        }, 120);
      }

      if (data.panel === "supabaseStatusPanel") {
        setTimeout(() => {
          const btn = qs("#v96LoadSupabase");
          if (btn) btn.click();
        }, 120);
      }

      if (data.panel === "dataMemoryPanel") {
        setTimeout(() => {
          const btn = qs("#v96LoadDataMemory");
          if (btn) btn.click();
        }, 120);
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

  window.SoulFlameV96ExtraPages = { ensurePages, openPanel };
})();