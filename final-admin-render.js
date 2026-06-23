(function () {
  "use strict";

  const MY_KEYS = [
    "dimitar",
    "dimitar lambov",
    "mitko",
    "митко",
    "димитър",
    "stere0metal360",
    "@stere0metal360",
    "stere0metal360@gmail.com"
  ];

  let adminData = null;
  let currentView = "mine";

  function qs(s) { return document.querySelector(s); }

  function textOf(t) {
    return [
      t.id,
      t.name,
      t.instagram,
      t.email,
      t.contact,
      t.twinType,
      t.echoType,
      JSON.stringify(t.raw || {})
    ].join(" ").toLowerCase();
  }

  function isMine(t) {
    const txt = textOf(t);
    return MY_KEYS.some(k => txt.includes(k.toLowerCase()));
  }

  function normalizeTwin(t, i) {
    const raw = t.raw || t;
    const user = t.user || raw.user || {};
    const echo = t.echo || raw.echo || {};

    return {
      ...t,
      id: t.id || raw.id || ("twin_" + i),
      name: user.name || t.name || raw.name || "Unknown Twin",
      instagram: user.instagram || t.instagram || raw.instagram || t.contact || raw.contact || "",
      twinType: t.twinType || raw.twinType || t.goal || raw.goal || "AI Twin",
      echoType: echo.echoType || t.echoType || t.main_trait || raw.main_trait || "Not profiled",
      compatibility: echo.compatibility || t.compatibility || 0,
      level: echo.level || t.level || Math.max(1, Math.min(10, Math.round(Number(echo.compatibility || t.compatibility || 10) / 10))),
      scores: echo.score || t.scores || {},
      summary: echo.summary || t.summary || t.mini_report || raw.mini_report || "",
      raw: raw
    };
  }

  function orderTwins(twins) {
    const arr = (Array.isArray(twins) ? twins : []).map(normalizeTwin);

    arr.sort((a, b) => {
      const am = isMine(a) ? 0 : 1;
      const bm = isMine(b) ? 0 : 1;

      if (am !== bm) return am - bm;

      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return arr;
  }

  function splitTwins(twins) {
    const ordered = orderTwins(twins);
    let mine = ordered.filter(isMine);

    if (!mine.length && ordered.length) {
      mine = [ordered[0]];
    }

    const mineIds = new Set(mine.map(t => String(t.id || "")));
    const others = ordered.filter(t => !mineIds.has(String(t.id || "")));

    return { ordered, mine, others };
  }

  async function loginAdmin() {
    let pin = sessionStorage.getItem("sf_admin_pin") || "admin";

    let res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-pin": pin
      },
      body: JSON.stringify({ pin })
    });

    let data = await res.json().catch(() => ({}));

    if (!data.ok) {
      pin = prompt("ADMIN password:");
      if (!pin) return null;

      res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin
        },
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

  async function fetchAdminData() {
    const pin = await loginAdmin();
    if (!pin) return null;

    let res = await fetch("/api/admin/system-v843", {
      headers: { "x-admin-pin": pin }
    });

    let data = await res.json().catch(() => ({}));

    if (!data.ok) {
      res = await fetch("/api/admin/system", {
        headers: { "x-admin-pin": pin }
      });
      data = await res.json().catch(() => ({}));
    }

    if (!data.ok) {
      alert(data.error || "ADMIN locked");
      return null;
    }

    adminData = data;
    return data;
  }

  function openAdminPanelUI() {
    if (typeof openPanelById === "function") {
      openPanelById("adminPanel");
    } else {
      document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
      const panel = qs("#adminPanel");
      if (panel) panel.classList.add("active");
    }
  }

  function ensureToolbar() {
    const panel = qs("#adminPanel");
    if (!panel || qs("#finalAdminToolbar")) return;

    const bar = document.createElement("div");
    bar.id = "finalAdminToolbar";
    bar.style.cssText = "display:flex;flex-wrap:wrap;gap:10px;margin:0 0 22px;";

    bar.innerHTML = `
      <button data-view="mine">1. 👑 Моят Twin</button>
      <button data-view="others">2. 👥 Другите Twin-ове</button>
      <button data-view="errors">3. ⚠ Bugs / Commands / Errors</button>
    `;

    bar.querySelectorAll("button").forEach(btn => {
      btn.style.cssText = "min-height:44px;border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:0 16px;background:rgba(255,255,255,.06);color:#fff;font-weight:900;cursor:pointer;";
      btn.onclick = () => loadAdminView(btn.dataset.view);
    });

    const headline = panel.querySelector(".headline");
    if (headline) headline.insertAdjacentElement("afterend", bar);
    else panel.prepend(bar);
  }

  function setToolbar(view) {
    const bar = qs("#finalAdminToolbar");
    if (!bar) return;

    bar.querySelectorAll("button").forEach(btn => {
      btn.style.background = btn.dataset.view === view
        ? "linear-gradient(135deg,#2563ff,#7c3cff)"
        : "rgba(255,255,255,.06)";
    });
  }

  function clearAdmin() {
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
      finalRule: "1 = my Twin, 2 = other Twins, 3 = errors for every registered Twin. My Twin is always first.",
      item
    }, null, 2);
  }

  function makeTwinRow(twin, section) {
    const row = document.createElement("div");
    row.className = "twin-row";

    const label = isMine(twin) ? "👑 " : "";
    const level = twin.level || "-";
    const echoType = twin.echoType || "Not profiled";

    row.innerHTML = `
      <div>
        <b>${label}${twin.name || "Unknown Twin"}</b><br>
        <small>${twin.instagram || "-"} • Level ${level}/10 • ${echoType}</small>
      </div>
      <button>Open</button>
    `;

    row.querySelector("button").onclick = () => showDetail(twin, section);
    return row;
  }

  function makeErrorRow(twin) {
    const row = document.createElement("div");
    row.className = "twin-row";

    const label = isMine(twin) ? "👑 " : "";
    const commands = Array.isArray(twin.lastCommands) ? twin.lastCommands.length : 0;
    const problem = twin.problemExplanation || "Няма намерен проблем.";

    row.innerHTML = `
      <div>
        <b>${label}${twin.name || "Unknown Twin"}</b><br>
        <small>${twin.instagram || "-"} • Level ${twin.level || "-"}/10 • ${twin.echoType || "Not profiled"}</small><br>
        <small>Commands/Events: ${commands} • ${problem}</small>
      </div>
      <button>Inspect</button>
    `;

    row.querySelector("button").onclick = () => showDetail(twin, "3. Bugs / Commands / Errors");
    return row;
  }

  function extractTwins(data) {
    if (Array.isArray(data.allTwinsOrdered)) return data.allTwinsOrdered;
    if (Array.isArray(data.twins)) return data.twins;
    if (Array.isArray(data.myTwin) || Array.isArray(data.otherTwins)) {
      return [...(data.myTwin || []), ...(data.otherTwins || [])];
    }
    return [];
  }

  function render(view) {
    if (!adminData) return;

    ensureToolbar();
    setToolbar(view);
    clearAdmin();

    const list = qs("#adminTwinsList");
    const raw = qs("#adminRaw");
    if (!list) return;

    const all = extractTwins(adminData);
    const parts = splitTwins(all);

    if (raw) {
      raw.textContent = JSON.stringify({
        view,
        structure: {
          "1": "Моят Twin",
          "2": "Другите Twin-ове",
          "3": "Bugs / Commands / Errors за всички"
        },
        rule: "Моят Twin е винаги първи.",
        myTwinCount: parts.mine.length,
        otherTwinsCount: parts.others.length,
        totalTwins: parts.ordered.length,
        stats: adminData.stats || {}
      }, null, 2);
    }

    if (view === "mine") {
      list.appendChild(title("1. 👑 Моят Twin — винаги първи"));

      if (!parts.mine.length) {
        list.innerHTML += `<div class="twin-row"><div><b>Няма намерен мой Twin.</b><br><small>Създай профил с Dimitar / Mitko / @stere0metal360.</small></div></div>`;
        return;
      }

      parts.mine.forEach(t => list.appendChild(makeTwinRow(t, "1. My Twin")));
      showDetail(parts.mine[0], "1. My Twin");
      return;
    }

    if (view === "others") {
      list.appendChild(title("2. 👥 Другите Twin-ове"));

      if (!parts.others.length) {
        list.innerHTML += `<div class="twin-row"><div><b>Няма други Twin-ове.</b><br><small>Когато други се регистрират, ще се появят тук.</small></div></div>`;
        return;
      }

      parts.others.forEach(t => list.appendChild(makeTwinRow(t, "2. Other Twins")));
      showDetail(parts.others[0], "2. Other Twins");
      return;
    }

    if (view === "errors") {
      list.appendChild(title("3. ⚠ Bugs / Commands / Errors — всички регистрирани Twin-ове"));

      if (!parts.ordered.length) {
        list.innerHTML += `<div class="twin-row"><div><b>Няма регистрирани Twin-ове.</b><br><small>Няма грешки или команди.</small></div></div>`;
        return;
      }

      parts.ordered.forEach(t => list.appendChild(makeErrorRow(t)));
      showDetail(parts.ordered[0], "3. Bugs / Commands / Errors");
      return;
    }
  }

  async function loadAdminView(view) {
    currentView = view || "mine";
    openAdminPanelUI();
    ensureToolbar();

    const data = await fetchAdminData();
    if (!data) return;

    render(currentView);
  }

  window.openAdminPanel = function () {
    loadAdminView("mine");
  };

  window.loadAdminSystem = function () {
    loadAdminView(currentView || "mine");
  };

  window.addEventListener("message", function (event) {
    const data = event && event.data ? event.data : null;
    if (!data || typeof data !== "object") return;

    if (data.type === "FINAL_ADMIN_VIEW" || data.type === "AI_ECHO_ADMIN_VIEW") {
      loadAdminView(data.view || "mine");
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureToolbar);
  } else {
    ensureToolbar();
  }

  window.FinalAdminRender = { loadAdminView, render, showDetail };
})();