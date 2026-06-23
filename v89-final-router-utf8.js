(function () {
  "use strict";

  let adminData = null;
  let currentAdminView = "mine";

  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return Array.from(document.querySelectorAll(s)); }

  const BG = {
    profile: "\u041F\u0440\u043E\u0444\u0438\u043B",
    user: "User",
    admin: "ADMIN",
    adminSystem: "ADMIN System",
    adminDesc: "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u0435\u043D \u0446\u0435\u043D\u0442\u044A\u0440: \u043C\u043E\u044F\u0442 Twin, \u0432\u0441\u0438\u0447\u043A\u0438 Twin-\u043E\u0432\u0435, network, \u043F\u043B\u0430\u0449\u0430\u043D\u0438\u044F, \u0433\u0440\u0435\u0448\u043A\u0438.",
    myTwin: "1. \uD83D\uDC51 \u041C\u043E\u044F\u0442 Twin",
    allTwins: "2. \uD83D\uDC65 \u0412\u0441\u0438\u0447\u043A\u0438 Twin-\u043E\u0432\u0435 / Connect Talk",
    network: "3. \uD83C\uDF10 Network / Bugs / Payments",
    otherTwins: "2. \uD83D\uDC65 \u0414\u0440\u0443\u0433\u0438\u0442\u0435 Twin-\u043E\u0432\u0435",
    healthTitle: "AI Twin Health",
    healthDesc: "\u0420\u0435\u0430\u043B\u043D\u043E \u0437\u0434\u0440\u0430\u0432\u0435 0-100% \u0437\u0430 \u0432\u0441\u0435\u043A\u0438 AI Twin: \u043F\u0430\u043C\u0435\u0442, EchoProfile, Supabase, OpenAI, connectors, Twin+, \u043F\u043B\u0430\u0449\u0430\u043D\u0438\u044F, events \u0438 \u0433\u0440\u0435\u0448\u043A\u0438.",
    connectorsTitle: "Connectors",
    connectorsDesc: "\u0422\u0443\u043A \u0441\u0430 \u0441\u0430\u043C\u043E connector-\u0438\u0442\u0435. \u041D\u044F\u043C\u0430 Twin+, \u043D\u044F\u043C\u0430 health, \u043D\u044F\u043C\u0430 network.",
    twinPlusTitle: "Twin+ Network",
    twinPlusDesc: "\u0422\u0443\u043A \u0441\u0435 \u0434\u043E\u0431\u0430\u0432\u044F\u0442 \u0434\u0432\u0430 Twin-\u0430 \u0432 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440."
  };

  function setText(sel, text) {
    const el = qs(sel);
    if (el) el.textContent = text;
  }

  function forceUtf8Labels() {
    const brandStrong = qs(".brand strong");
    if (brandStrong) brandStrong.textContent = "AI Echo";

    const brandSmall = qs(".brand small, #miniMeta");
    if (brandSmall && !brandSmall.textContent.includes("•")) {
      brandSmall.textContent = "SoulFlame AI Twin";
    }

    qsa('.tab-btn[data-panel="profilePanel"]').forEach(x => x.textContent = BG.profile);
    qsa('.tab-btn[data-panel="echoPanel"]').forEach(x => x.textContent = "EchoProfile");
    qsa('.tab-btn[data-panel="chatPanel"]').forEach(x => x.textContent = "GPT Chat");
    qsa('.tab-btn[data-panel="userPanel"]').forEach(x => x.textContent = "User");
    qsa('.tab-btn[data-panel="adminPanel"]').forEach(x => x.textContent = "ADMIN");

    qsa(".burger-btn").forEach(x => x.textContent = "\u2630 SoulMatch");

    setText("#adminPanel .headline h2", BG.adminSystem);
    setText("#adminPanel .headline p", BG.adminDesc);
  }

  function openPanel(id) {
    if (!id) return;

    if (typeof openPanelById === "function") {
      openPanelById(id);
    } else {
      qsa(".panel").forEach(p => p.classList.remove("active"));
      const panel = qs("#" + id);
      if (panel) panel.classList.add("active");

      qsa(".tab-btn").forEach(b => b.classList.remove("active"));
      const btn = qs('.tab-btn[data-panel="' + id + '"]');
      if (btn) btn.classList.add("active");
    }

    forceUtf8Labels();
  }

  function ensureConnectorsPanel() {
    if (qs("#v89ConnectorsPanel")) return;

    const panel = document.createElement("section");
    panel.className = "panel";
    panel.id = "v89ConnectorsPanel";

    panel.innerHTML = `
      <div class="headline">
        <div>
          <h2>${BG.connectorsTitle}</h2>
          <p>${BG.connectorsDesc}</p>
        </div>
      </div>
      <div class="glass">
        <h3>Connectors</h3>
        <div class="connector-grid" id="v89ConnectorsBox"></div>
      </div>
      <div class="glass" style="margin-top:20px;">
        <h3>Output</h3>
        <pre class="admin-detail" id="v89ConnectorOutput">Ready.</pre>
      </div>
    `;

    const main = qs(".main");
    if (main) main.appendChild(panel);

    renderConnectors();
  }

  function renderConnectors() {
    const box = qs("#v89ConnectorsBox");
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
        const body = {
          name: localStorage.getItem("sf_name") || "Dimitar",
          instagram: localStorage.getItem("sf_instagram") || "@stere0metal360",
          connector: name,
          status: "prepared"
        };

        const res = await fetch("/api/connectors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        const data = await res.json().catch(() => ({}));
        qs("#v89ConnectorOutput").textContent = JSON.stringify(data, null, 2);
      };

      box.appendChild(el);
    });
  }

  function ensureTwinPlusPanel() {
    if (qs("#v89TwinPlusPanel")) return;

    const panel = document.createElement("section");
    panel.className = "panel";
    panel.id = "v89TwinPlusPanel";

    panel.innerHTML = `
      <div class="headline">
        <div>
          <h2>${BG.twinPlusTitle}</h2>
          <p>${BG.twinPlusDesc}</p>
        </div>
        <button class="ghost-btn" id="v89RefreshTwinPlus">Refresh</button>
      </div>

      <div class="grid2">
        <div class="glass">
          <h3>Twin+ Conversation</h3>
          <select class="field" id="v89TwinA"></select>
          <select class="field" id="v89TwinB"></select>
          <input class="field" id="v89TalkReason" placeholder="Reason / topic" />
          <button class="main-btn" id="v89ConnectTwins">Connect 2 Twins</button>
        </div>

        <div class="glass">
          <h3>Network data</h3>
          <pre class="admin-detail" id="v89TwinPlusOutput">Ready.</pre>
        </div>
      </div>
    `;

    const main = qs(".main");
    if (main) main.appendChild(panel);

    qs("#v89RefreshTwinPlus").onclick = loadTwinPlus;
    qs("#v89ConnectTwins").onclick = connectSelectedTwins;
  }

  function ensureHealthPanel() {
    if (qs("#v89HealthPanel")) return;

    const panel = document.createElement("section");
    panel.className = "panel";
    panel.id = "v89HealthPanel";

    panel.innerHTML = `
      <div class="headline">
        <div>
          <h2>${BG.healthTitle}</h2>
          <p>${BG.healthDesc}</p>
        </div>
        <button class="ghost-btn" id="v89RefreshHealth">Refresh</button>
      </div>

      <div class="glass">
        <h3>Global Health</h3>
        <div style="font-size:54px;font-weight:950;" id="v89GlobalHealth">0%</div>
        <div style="height:18px;border-radius:999px;background:rgba(255,255,255,.10);overflow:hidden;margin-top:12px;">
          <div id="v89GlobalHealthFill" style="height:100%;width:0%;background:linear-gradient(90deg,#ff5572,#ffd166,#37d998);"></div>
        </div>
        <p class="muted" id="v89GlobalHealthLabel">Loading...</p>
      </div>

      <div class="glass" style="margin-top:20px;">
        <h3>All Twin Health</h3>
        <div class="list" id="v89HealthList"></div>
      </div>

      <div class="glass" style="margin-top:20px;">
        <h3>Raw Health JSON</h3>
        <pre class="admin-detail" id="v89HealthJson">Loading...</pre>
      </div>
    `;

    const main = qs(".main");
    if (main) main.appendChild(panel);

    qs("#v89RefreshHealth").onclick = loadHealth;
  }

  function ensureAdminToolbar() {
    const panel = qs("#adminPanel");
    if (!panel) return;

    qsa("#sfV84AdminToolbar, #sfV841Toolbar, #sfV842Toolbar, #sfV843Toolbar, #finalAdminToolbar, #v85AdminToolbar").forEach(x => x.remove());

    let bar = qs("#v89AdminToolbar");

    if (!bar) {
      bar = document.createElement("div");
      bar.id = "v89AdminToolbar";
      bar.style.cssText = "display:flex;flex-wrap:wrap;gap:10px;margin:0 0 22px;";
      bar.innerHTML = `
        <button data-view="mine">${BG.myTwin}</button>
        <button data-view="all">${BG.allTwins}</button>
        <button data-view="network">${BG.network}</button>
      `;

      bar.querySelectorAll("button").forEach(btn => {
        btn.style.cssText = "min-height:44px;border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:0 16px;background:rgba(255,255,255,.06);color:#fff;font-weight:900;cursor:pointer;";
        btn.onclick = () => loadAdmin(btn.dataset.view);
      });

      const headline = panel.querySelector(".headline");
      if (headline) headline.insertAdjacentElement("afterend", bar);
      else panel.prepend(bar);
    }
  }

  function setAdminToolbar(view) {
    const bar = qs("#v89AdminToolbar");
    if (!bar) return;

    bar.querySelectorAll("button").forEach(btn => {
      btn.style.background = btn.dataset.view === view
        ? "linear-gradient(135deg,#2563ff,#7c3cff)"
        : "rgba(255,255,255,.06)";
    });
  }

  async function adminPin() {
    let pin = sessionStorage.getItem("sf_admin_pin") || "admin";

    const tryLogin = async function (p) {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-pin": p },
        body: JSON.stringify({ pin: p })
      });
      return res.json().catch(() => ({}));
    };

    let data = await tryLogin(pin);

    if (!data.ok) {
      pin = prompt("ADMIN password:");
      if (!pin) return null;

      data = await tryLogin(pin);

      if (!data.ok) {
        alert("Wrong ADMIN password");
        sessionStorage.removeItem("sf_admin_pin");
        return null;
      }
    }

    sessionStorage.setItem("sf_admin_pin", pin);
    return pin;
  }

  async function loadAdminData() {
    const pin = await adminPin();
    if (!pin) return null;

    const res = await fetch("/api/v89/system", {
      headers: { "x-admin-pin": pin }
    });

    const data = await res.json().catch(() => ({}));

    if (!data.ok) {
      alert(data.error || "ADMIN locked");
      return null;
    }

    adminData = data;
    return data;
  }

  function adminClear() {
    const list = qs("#adminTwinsList");
    const detail = qs("#adminTwinDetail");
    const raw = qs("#adminRaw");

    if (list) list.innerHTML = "";
    if (detail) detail.textContent = "";
    if (raw) raw.textContent = "";
  }

  function adminTitle(text) {
    const div = document.createElement("div");
    div.style.cssText = "padding:14px 16px;border-radius:18px;background:rgba(37,99,255,.14);border:1px solid rgba(37,99,255,.26);font-weight:950;color:#fff;";
    div.textContent = text;
    return div;
  }

  function showDetail(item, section) {
    const detail = qs("#adminTwinDetail");
    if (!detail) return;

    detail.textContent = JSON.stringify({
      section,
      rule: "\u041C\u043E\u044F\u0442 Twin \u0432\u0438\u043D\u0430\u0433\u0438 \u0435 \u043F\u044A\u0440\u0432\u0438.",
      item
    }, null, 2);
  }

  async function markPaid(twin) {
    const amount = prompt("\u041A\u043E\u043B\u043A\u043E \u0435 \u043F\u043B\u0430\u0442\u0438\u043B?", "9");
    if (amount === null) return;

    const product = prompt("\u0417\u0430 \u043A\u0430\u043A\u0432\u043E \u0435 \u043F\u043B\u0430\u0442\u0438\u043B?", "Twin Talk / Twin+ connection");
    const pin = sessionStorage.getItem("sf_admin_pin") || "admin";

    const res = await fetch("/api/v89/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify({
        twinId: twin.id,
        name: twin.name,
        instagram: twin.instagram,
        amount: Number(amount || 0),
        currency: "EUR",
        product: product || "Twin Talk",
        status: "paid",
        paid: true
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!data.ok) alert(data.error || "Payment failed");
    await loadAdmin(currentAdminView);
  }

  async function connectToMine(twin) {
    const mine = (adminData && adminData.myTwin && adminData.myTwin[0]) ? adminData.myTwin[0] : null;
    if (!mine) {
      alert("No my Twin found.");
      return;
    }

    if (mine.id === twin.id) {
      alert("Cannot connect the same Twin.");
      return;
    }

    const reason = prompt("Reason / topic:", "Twin Talk / Match connection");
    if (reason === null) return;

    const pin = sessionStorage.getItem("sf_admin_pin") || "admin";

    const res = await fetch("/api/v89/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify({
        fromTwinId: mine.id,
        fromName: mine.name,
        fromInstagram: mine.instagram,
        toTwinId: twin.id,
        toName: twin.name,
        toInstagram: twin.instagram,
        reason,
        status: twin.paid ? "connected_paid" : "pending_payment",
        paymentStatus: twin.paid ? "paid" : "not_paid"
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!data.ok) alert(data.error || "Connection failed");
    await loadAdmin(currentAdminView);
  }

  function makeAdminRow(twin, section, actions) {
    const row = document.createElement("div");
    row.className = "twin-row";

    const label = twin.isMine ? "\uD83D\uDC51 " : "";
    const paid = twin.paid ? "\u2705 paid" : "\u274C not paid";
    const total = twin.paymentStatus && twin.paymentStatus.totalPaid ? twin.paymentStatus.totalPaid : 0;
    const currency = twin.paymentStatus && twin.paymentStatus.currency ? twin.paymentStatus.currency : "EUR";

    row.innerHTML = `
      <div>
        <b>${label}${twin.name || "Unknown Twin"}</b><br>
        <small>${twin.instagram || "-"} • Level ${twin.level || "-"}/10 • ${twin.echoType || "Not profiled"}</small><br>
        <small>${paid} • ${total} ${currency} • Health ${twin.health ? twin.health.score : 0}%</small>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;">
        <button data-act="open">Open</button>
        ${actions ? `<button data-act="paid">Mark Paid</button><button data-act="connect">Connect Talk</button>` : ""}
      </div>
    `;

    row.querySelector('[data-act="open"]').onclick = () => showDetail(twin, section);

    const paidBtn = row.querySelector('[data-act="paid"]');
    if (paidBtn) paidBtn.onclick = () => markPaid(twin);

    const connectBtn = row.querySelector('[data-act="connect"]');
    if (connectBtn) connectBtn.onclick = () => connectToMine(twin);

    return row;
  }

  async function loadAdmin(view) {
    currentAdminView = view || "mine";

    openPanel("adminPanel");
    ensureAdminToolbar();
    setAdminToolbar(currentAdminView);
    forceUtf8Labels();

    const data = await loadAdminData();
    if (!data) return;

    adminClear();

    const list = qs("#adminTwinsList");
    const raw = qs("#adminRaw");
    if (!list) return;

    if (raw) {
      raw.textContent = JSON.stringify({
        view: currentAdminView,
        stats: data.stats,
        globalHealth: data.globalHealth,
        order: data.adminOrder
      }, null, 2);
    }

    if (currentAdminView === "mine") {
      list.appendChild(adminTitle(BG.myTwin));
      const mine = data.myTwin || [];

      if (!mine.length) {
        list.innerHTML += `<div class="twin-row"><div><b>No my Twin found.</b></div></div>`;
        return;
      }

      mine.forEach(twin => list.appendChild(makeAdminRow(twin, "1. My Twin", false)));
      showDetail(mine[0], "1. My Twin");
      return;
    }

    if (currentAdminView === "all") {
      list.appendChild(adminTitle(BG.allTwins));
      const all = data.allTwinsOrdered || [];

      if (!all.length) {
        list.innerHTML += `<div class="twin-row"><div><b>No twins found.</b></div></div>`;
        return;
      }

      all.forEach(twin => list.appendChild(makeAdminRow(twin, "2. All Twins / Connect Talk", true)));
      showDetail(all[0], "2. All Twins / Connect Talk");
      return;
    }

    if (currentAdminView === "network") {
      list.appendChild(adminTitle(BG.network));
      const all = data.allTwinsOrdered || [];

      if (!all.length) {
        list.innerHTML += `<div class="twin-row"><div><b>No network data.</b></div></div>`;
        return;
      }

      all.forEach(twin => list.appendChild(makeAdminRow(twin, "3. Network / Bugs / Payments", true)));

      const matrix = document.createElement("div");
      matrix.className = "twin-row";
      matrix.innerHTML = `<div><b>Matching Matrix</b><br><small>Who matches with who.</small></div><button>Open</button>`;
      matrix.querySelector("button").onclick = () => showDetail(data.matchMatrix || [], "Matching Matrix");
      list.appendChild(matrix);

      const payments = document.createElement("div");
      payments.className = "twin-row";
      payments.innerHTML = `<div><b>Payments</b><br><small>Who paid, for what, how much.</small></div><button>Open</button>`;
      payments.querySelector("button").onclick = () => showDetail(data.payments || [], "Payments");
      list.appendChild(payments);

      const connections = document.createElement("div");
      connections.className = "twin-row";
      connections.innerHTML = `<div><b>Connections</b><br><small>Which Twin is connected with which Twin.</small></div><button>Open</button>`;
      connections.querySelector("button").onclick = () => showDetail(data.connections || [], "Connections");
      list.appendChild(connections);

      showDetail(all[0], "3. Network / Bugs / Payments");
    }
  }

  function fillTwinSelects(data) {
    const a = qs("#v89TwinA");
    const b = qs("#v89TwinB");
    if (!a || !b) return;

    const twins = data.twins || data.allTwinsOrdered || [];

    a.innerHTML = "";
    b.innerHTML = "";

    twins.forEach(twin => {
      const label = `${twin.isMine ? "👑 " : ""}${twin.name} | ${twin.instagram || "-"} | Health ${twin.health ? twin.health.score : 0}%`;

      const oa = document.createElement("option");
      oa.value = twin.id;
      oa.textContent = label;

      const ob = document.createElement("option");
      ob.value = twin.id;
      ob.textContent = label;

      a.appendChild(oa);
      b.appendChild(ob);
    });

    if (twins.length > 1) b.selectedIndex = 1;
  }

  async function loadHealth() {
    ensureHealthPanel();

    const res = await fetch("/api/v89/health");
    const data = await res.json().catch(() => ({}));

    const score = data.globalHealth ? data.globalHealth.score : 0;

    setText("#v89GlobalHealth", score + "%");
    setText("#v89GlobalHealthLabel", data.globalHealth ? data.globalHealth.label : "No data");

    const fill = qs("#v89GlobalHealthFill");
    if (fill) fill.style.width = score + "%";

    const list = qs("#v89HealthList");
    if (list) {
      list.innerHTML = "";
      (data.twins || []).forEach(twin => {
        const row = document.createElement("div");
        row.className = "twin-row";
        row.innerHTML = `
          <div>
            <b>${twin.isMine ? "👑 " : ""}${twin.name}</b><br>
            <small>${twin.instagram || "-"} • Health ${twin.health.score}% • ${twin.health.label}</small><br>
            <small>OpenAI: ${twin.health.factors.openai ? "ON" : "OFF"} • Supabase: ${twin.health.factors.supabase ? "ON" : "OFF"} • Memory: ${twin.health.factors.memory ? "ON" : "OFF"} • Errors: ${twin.health.factors.errors}</small>
          </div>
          <button>Open</button>
        `;
        row.querySelector("button").onclick = () => {
          const box = qs("#v89HealthJson");
          if (box) box.textContent = JSON.stringify(twin, null, 2);
        };
        list.appendChild(row);
      });
    }

    const json = qs("#v89HealthJson");
    if (json) json.textContent = JSON.stringify(data, null, 2);
  }

  async function loadTwinPlus() {
    ensureTwinPlusPanel();

    const pin = sessionStorage.getItem("sf_admin_pin") || "admin";
    const res = await fetch("/api/v89/system", {
      headers: { "x-admin-pin": pin }
    });

    const data = await res.json().catch(() => ({}));

    fillTwinSelects(data);

    const out = qs("#v89TwinPlusOutput");
    if (out) {
      out.textContent = JSON.stringify({
        twins: data.allTwinsOrdered || [],
        matchMatrix: data.matchMatrix || [],
        connections: data.connections || [],
        conversations: data.conversations || []
      }, null, 2);
    }
  }

  async function connectSelectedTwins() {
    const a = qs("#v89TwinA");
    const b = qs("#v89TwinB");

    if (!a || !b || !a.value || !b.value) {
      alert("Select two Twins.");
      return;
    }

    if (a.value === b.value) {
      alert("Select two different Twins.");
      return;
    }

    const pin = sessionStorage.getItem("sf_admin_pin") || "admin";
    const reason = qs("#v89TalkReason") ? qs("#v89TalkReason").value : "Twin+ conversation";

    const data = adminData || await loadAdminData();
    const twins = data ? (data.allTwinsOrdered || []) : [];

    const twinA = twins.find(t => t.id === a.value) || {};
    const twinB = twins.find(t => t.id === b.value) || {};

    const res = await fetch("/api/v89/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify({
        fromTwinId: twinA.id,
        fromName: twinA.name,
        fromInstagram: twinA.instagram,
        toTwinId: twinB.id,
        toName: twinB.name,
        toInstagram: twinB.instagram,
        reason,
        status: "twinplus_conversation_created",
        paymentStatus: "checking"
      })
    });

    const result = await res.json().catch(() => ({}));
    const out = qs("#v89TwinPlusOutput");
    if (out) out.textContent = JSON.stringify(result, null, 2);

    await loadTwinPlus();
  }

  function ensureTwinPlusPanel() {
    if (qs("#v89TwinPlusPanel")) return;

    const panel = document.createElement("section");
    panel.className = "panel";
    panel.id = "v89TwinPlusPanel";
    panel.innerHTML = `
      <div class="headline">
        <div>
          <h2>${BG.twinPlusTitle}</h2>
          <p>${BG.twinPlusDesc}</p>
        </div>
        <button class="ghost-btn" id="v89RefreshTwinPlus">Refresh</button>
      </div>
      <div class="grid2">
        <div class="glass">
          <h3>Twin+ Conversation</h3>
          <select class="field" id="v89TwinA"></select>
          <select class="field" id="v89TwinB"></select>
          <input class="field" id="v89TalkReason" placeholder="Reason / topic" />
          <button class="main-btn" id="v89ConnectTwins">Connect 2 Twins</button>
        </div>
        <div class="glass">
          <h3>Network Data</h3>
          <pre class="admin-detail" id="v89TwinPlusOutput">Ready.</pre>
        </div>
      </div>
    `;
    const main = qs(".main");
    if (main) main.appendChild(panel);

    qs("#v89RefreshTwinPlus").onclick = loadTwinPlus;
    qs("#v89ConnectTwins").onclick = connectSelectedTwins;
  }

  function ensureHealthPanel() {
    if (qs("#v89HealthPanel")) return;

    const panel = document.createElement("section");
    panel.className = "panel";
    panel.id = "v89HealthPanel";
    panel.innerHTML = `
      <div class="headline">
        <div>
          <h2>${BG.healthTitle}</h2>
          <p>${BG.healthDesc}</p>
        </div>
        <button class="ghost-btn" id="v89RefreshHealth">Refresh</button>
      </div>
      <div class="glass">
        <h3>Global Health</h3>
        <div style="font-size:54px;font-weight:950;" id="v89GlobalHealth">0%</div>
        <div style="height:18px;border-radius:999px;background:rgba(255,255,255,.10);overflow:hidden;margin-top:12px;">
          <div id="v89GlobalHealthFill" style="height:100%;width:0%;background:linear-gradient(90deg,#ff5572,#ffd166,#37d998);"></div>
        </div>
        <p class="muted" id="v89GlobalHealthLabel">Loading...</p>
      </div>
      <div class="glass" style="margin-top:20px;">
        <h3>All Twin Health</h3>
        <div class="list" id="v89HealthList"></div>
      </div>
      <div class="glass" style="margin-top:20px;">
        <h3>Raw Health JSON</h3>
        <pre class="admin-detail" id="v89HealthJson">Loading...</pre>
      </div>
    `;
    const main = qs(".main");
    if (main) main.appendChild(panel);

    qs("#v89RefreshHealth").onclick = loadHealth;
  }

  function openUser(view) {
    ensureConnectorsPanel();
    ensureTwinPlusPanel();
    ensureHealthPanel();

    if (view === "connectors") {
      openPanel("v89ConnectorsPanel");
      renderConnectors();
      return;
    }

    if (view === "twinplus") {
      openPanel("v89TwinPlusPanel");
      loadTwinPlus();
      return;
    }

    if (view === "health") {
      openPanel("v89HealthPanel");
      loadHealth();
      return;
    }
  }

  window.addEventListener("message", function (event) {
    const data = event && event.data ? event.data : null;
    if (!data || typeof data !== "object") return;

    if (data.type === "V89_OPEN_PANEL") {
      openPanel(data.panel);
    }

    if (data.type === "V89_USER_VIEW") {
      openUser(data.view || "health");
    }

    if (data.type === "V89_ADMIN_VIEW") {
      loadAdmin(data.view || "mine");
    }
  });

  function boot() {
    forceUtf8Labels();
    ensureConnectorsPanel();
    ensureTwinPlusPanel();
    ensureHealthPanel();
    ensureAdminToolbar();

    setInterval(function () {
      forceUtf8Labels();
      ensureAdminToolbar();
      qsa("#sfV84AdminToolbar, #sfV841Toolbar, #sfV842Toolbar, #sfV843Toolbar, #finalAdminToolbar, #v85AdminToolbar").forEach(x => x.remove());
    }, 1000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.SoulFlameV89Router = {
    openPanel,
    openUser,
    loadAdmin,
    loadHealth,
    loadTwinPlus,
    forceUtf8Labels
  };
})();