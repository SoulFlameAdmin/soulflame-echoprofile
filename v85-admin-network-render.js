(function () {
  "use strict";

  let adminData = null;
  let currentView = "mine";

  function qs(s) { return document.querySelector(s); }

  function openAdminUI() {
    if (typeof openPanelById === "function") openPanelById("adminPanel");
    else {
      document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
      const p = qs("#adminPanel");
      if (p) p.classList.add("active");
    }
  }

  async function adminPin() {
    let pin = sessionStorage.getItem("sf_admin_pin") || "admin";

    let res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify({ pin })
    });

    let data = await res.json().catch(() => ({}));

    if (!data.ok) {
      pin = prompt("ADMIN password:");
      if (!pin) return null;

      res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-pin": pin },
        body: JSON.stringify({ pin })
      });

      data = await res.json().catch(() => ({}));
      if (!data.ok) {
        alert("Wrong ADMIN password");
        sessionStorage.removeItem("sf_admin_pin");
        return null;
      }
    }

    sessionStorage.setItem("sf_admin_pin", pin);
    return pin;
  }

  async function fetchSystem() {
    const pin = await adminPin();
    if (!pin) return null;

    const res = await fetch("/api/admin/control-v85", {
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

  function ensureToolbar() {
    const panel = qs("#adminPanel");
    if (!panel || qs("#v85AdminToolbar")) return;

    const bar = document.createElement("div");
    bar.id = "v85AdminToolbar";
    bar.style.cssText = "display:flex;flex-wrap:wrap;gap:10px;margin:0 0 22px;";
    bar.innerHTML = `
      <button data-view="mine">1. 👑 Моят Twin</button>
      <button data-view="all">2. 👥 Всички Twin-ове / Connect Talk</button>
      <button data-view="network">3. 🌐 Network / Bugs / Payments</button>
    `;

    bar.querySelectorAll("button").forEach(btn => {
      btn.style.cssText = "min-height:44px;border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:0 16px;background:rgba(255,255,255,.06);color:#fff;font-weight:900;cursor:pointer;";
      btn.onclick = () => loadView(btn.dataset.view);
    });

    const headline = panel.querySelector(".headline");
    if (headline) headline.insertAdjacentElement("afterend", bar);
    else panel.prepend(bar);
  }

  function setToolbar(view) {
    const bar = qs("#v85AdminToolbar");
    if (!bar) return;

    bar.querySelectorAll("button").forEach(btn => {
      btn.style.background = btn.dataset.view === view
        ? "linear-gradient(135deg,#2563ff,#7c3cff)"
        : "rgba(255,255,255,.06)";
    });
  }

  function clear() {
    const list = qs("#adminTwinsList");
    const detail = qs("#adminTwinDetail");
    const raw = qs("#adminRaw");

    if (list) list.innerHTML = "";
    if (detail) detail.textContent = "";
    if (raw) raw.textContent = "";
  }

  function title(text) {
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
      rule: "Моят Twin винаги е първи.",
      item
    }, null, 2);
  }

  async function markPaid(twin) {
    const amount = prompt("Колко е платил? Например 9, 19, 49:", "9");
    if (amount === null) return;

    const product = prompt("За какво е платил?", "Twin Talk / Twin+ connection");
    const pin = sessionStorage.getItem("sf_admin_pin") || "admin";

    const res = await fetch("/api/admin/payment-v85", {
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
    if (!data.ok) alert(data.error || "Payment save failed");
    await loadView(currentView);
  }

  async function connectToMyTwin(twin) {
    const mine = (adminData.myTwin || [])[0];
    if (!mine) {
      alert("Няма намерен мой Twin.");
      return;
    }

    const reason = prompt("Причина за връзка / talk:", "Paid Twin Talk / Matching connection");
    if (reason === null) return;

    const pin = sessionStorage.getItem("sf_admin_pin") || "admin";

    const res = await fetch("/api/admin/connect-twins-v85", {
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
        paidRequired: true,
        paymentStatus: twin.paid ? "paid" : "not_paid",
        status: twin.paid ? "connected_paid" : "pending_payment"
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!data.ok) alert(data.error || "Connection failed");
    await loadView(currentView);
  }

  function twinRow(twin, section, withActions) {
    const row = document.createElement("div");
    row.className = "twin-row";

    const label = twin.isMine ? "👑 " : "";
    const paid = twin.paid ? "✅ paid" : "❌ not paid";
    const total = twin.payment?.totalPaid || 0;
    const currency = twin.payment?.currency || "EUR";

    row.innerHTML = `
      <div>
        <b>${label}${twin.name || "Unknown Twin"}</b><br>
        <small>${twin.instagram || "-"} • Level ${twin.level || "-"}/10 • ${twin.echoType || "Not profiled"}</small><br>
        <small>${paid} • ${total} ${currency}</small>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;">
        <button data-act="open">Open</button>
        ${withActions ? `<button data-act="paid">Mark Paid</button><button data-act="connect">Connect Talk</button>` : ""}
      </div>
    `;

    row.querySelector('[data-act="open"]').onclick = () => showDetail(twin, section);

    const paidBtn = row.querySelector('[data-act="paid"]');
    if (paidBtn) paidBtn.onclick = () => markPaid(twin);

    const connectBtn = row.querySelector('[data-act="connect"]');
    if (connectBtn) connectBtn.onclick = () => connectToMyTwin(twin);

    return row;
  }

  function networkRow(entry) {
    const row = document.createElement("div");
    row.className = "twin-row";

    const label = entry.isMine ? "👑 " : "";
    const paid = entry.payment?.paid ? "✅ paid" : "❌ not paid";
    const connections = Array.isArray(entry.connections) ? entry.connections.length : 0;
    const errors = entry.errorCount || 0;

    row.innerHTML = `
      <div>
        <b>${label}${entry.name || "Unknown Twin"}</b><br>
        <small>${entry.instagram || "-"} • ${paid} • Connections: ${connections} • Errors: ${errors}</small><br>
        <small>${entry.problemExplanation || "No status"}</small>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;">
        <button data-act="open">Inspect</button>
        <button data-act="paid">Mark Paid</button>
        <button data-act="connect">Connect Talk</button>
      </div>
    `;

    row.querySelector('[data-act="open"]').onclick = () => showDetail(entry, "3. Network / Bugs / Payments");
    row.querySelector('[data-act="paid"]').onclick = () => markPaid(entry);
    row.querySelector('[data-act="connect"]').onclick = () => connectToMyTwin(entry);

    return row;
  }

  function render(view) {
    if (!adminData) return;

    ensureToolbar();
    setToolbar(view);
    clear();

    const list = qs("#adminTwinsList");
    const raw = qs("#adminRaw");
    if (!list) return;

    if (raw) {
      raw.textContent = JSON.stringify({
        view,
        order: adminData.adminOrder,
        stats: adminData.stats
      }, null, 2);
    }

    if (view === "mine") {
      list.appendChild(title("1. 👑 Моят Twin — отваря твоя Twin"));
      const mine = adminData.myTwin || [];

      if (!mine.length) {
        list.innerHTML += `<div class="twin-row"><div><b>Няма намерен мой Twin.</b><br><small>Създай профил с Dimitar / Mitko / @stere0metal360.</small></div></div>`;
        return;
      }

      mine.forEach(t => list.appendChild(twinRow(t, "1. My Twin", false)));
      showDetail(mine[0], "1. My Twin");
      return;
    }

    if (view === "all") {
      list.appendChild(title("2. 👥 Всички Twin-ове — разглеждане, плащане, Connect for Talk"));
      const all = adminData.allTwinsOrdered || [];

      if (!all.length) {
        list.innerHTML += `<div class="twin-row"><div><b>Няма Twin-ове.</b><br><small>Когато има регистрации, ще се появят тук.</small></div></div>`;
        return;
      }

      all.forEach(t => list.appendChild(twinRow(t, "2. All Twins / Connect Talk", true)));
      showDetail(all[0], "2. All Twins / Connect Talk");
      return;
    }

    if (view === "network") {
      list.appendChild(title("3. 🌐 Network / Bugs / Payments — всички Twin-ове, връзки, match, плащания, грешки"));

      const entries = adminData.allTwinsOrdered || [];

      if (!entries.length) {
        list.innerHTML += `<div class="twin-row"><div><b>Няма Twin-ове.</b><br><small>Няма данни за network.</small></div></div>`;
        return;
      }

      entries.forEach(e => list.appendChild(networkRow(e)));

      const matrix = document.createElement("div");
      matrix.className = "twin-row";
      matrix.innerHTML = `
        <div>
          <b>Matching Matrix</b><br>
          <small>Показва кой Twin има най-силен match с кой.</small>
        </div>
        <button>Open Matrix</button>
      `;
      matrix.querySelector("button").onclick = () => showDetail(adminData.matchMatrix || [], "Matching Matrix");
      list.appendChild(matrix);

      const payments = document.createElement("div");
      payments.className = "twin-row";
      payments.innerHTML = `
        <div>
          <b>Payments</b><br>
          <small>Кой за какво и колко е платил.</small>
        </div>
        <button>Open Payments</button>
      `;
      payments.querySelector("button").onclick = () => showDetail(adminData.payments || [], "Payments");
      list.appendChild(payments);

      const connections = document.createElement("div");
      connections.className = "twin-row";
      connections.innerHTML = `
        <div>
          <b>Twin Connections</b><br>
          <small>Кой Twin с кой е свързан.</small>
        </div>
        <button>Open Connections</button>
      `;
      connections.querySelector("button").onclick = () => showDetail(adminData.connections || [], "Twin Connections");
      list.appendChild(connections);

      showDetail(entries[0], "3. Network / Bugs / Payments");
    }
  }

  async function loadView(view) {
    currentView = view || "mine";
    openAdminUI();
    ensureToolbar();

    const data = await fetchSystem();
    if (!data) return;

    render(currentView);
  }

  window.openAdminPanel = function () {
    loadView("mine");
  };

  window.loadAdminSystem = function () {
    loadView(currentView || "mine");
  };

  window.addEventListener("message", function (event) {
    const data = event && event.data ? event.data : null;
    if (!data || typeof data !== "object") return;

    if (data.type === "V85_ADMIN_VIEW") {
      loadView(data.view || "mine");
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureToolbar);
  } else {
    ensureToolbar();
  }

  window.SoulFlameV85Admin = { loadView, render, showDetail, markPaid, connectToMyTwin };
})();