const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function loadEnv() {
  const envPath = path.join(__dirname, ".env");

  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");

    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();

    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;

const APP_NAME = "SoulFlame Twins";
const MODULE_NAME = "EchoProfile";
const APP_VERSION = "V33_ABSOLUTE_PATH_HARD_FIX";

const OWNER_EMAIL = process.env.OWNER_EMAIL || "stere0metal360@gmail.com";
const APP_MODE = process.env.APP_MODE || "production";
const DATA_MODE = process.env.DATA_MODE || "supabase";
const ADMIN_PIN = process.env.ECHO_ADMIN_PIN || "ECHO-ADMIN-999";
const SERVER_STARTED_AT = Date.now();

function now() {
  return new Date().toISOString();
}

function fallbackIndexHtml() {
  return `<!doctype html>
<html lang="bg">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>SoulFlame Twins — EchoProfile</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      color: white;
      background:
        radial-gradient(circle at 20% 10%, rgba(124,60,255,.35), transparent 35%),
        radial-gradient(circle at 85% 15%, rgba(0,234,255,.22), transparent 35%),
        linear-gradient(135deg, #050611, #101327 55%, #07111e);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .card {
      width: min(980px, 100%);
      border: 1px solid rgba(255,255,255,.16);
      background: rgba(255,255,255,.08);
      border-radius: 30px;
      padding: 36px;
      box-shadow: 0 30px 100px rgba(0,0,0,.35);
      backdrop-filter: blur(16px);
    }

    h1 {
      margin: 0 0 12px;
      font-size: clamp(42px, 7vw, 86px);
      letter-spacing: -3px;
      line-height: .95;
    }

    .grad {
      background: linear-gradient(90deg, #00eaff, #7c3cff, #ff5cf7);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    p {
      color: #b8c2e6;
      font-size: 18px;
      line-height: 1.6;
      max-width: 760px;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 24px;
    }

    a, button {
      border: 0;
      cursor: pointer;
      color: white;
      text-decoration: none;
      background: linear-gradient(135deg, #7c3cff, #4c8dff);
      border-radius: 16px;
      padding: 14px 18px;
      font-weight: 900;
      font-size: 15px;
    }

    button.secondary, a.secondary {
      background: rgba(255,255,255,.10);
      border: 1px solid rgba(255,255,255,.18);
    }

    pre {
      margin-top: 22px;
      background: rgba(0,0,0,.35);
      border: 1px solid rgba(255,255,255,.14);
      border-radius: 18px;
      padding: 18px;
      overflow: auto;
      color: #dbe4ff;
      min-height: 120px;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <main class="card">
    <h1>SoulFlame <span class="grad">Twins</span></h1>
    <p>
      EchoProfile production recovery page. Server.js V33 работи и вече връща началната страница директно.
    </p>
    <p>
      Следващата стъпка е да замениш fallback дизайна с пълния index.html, но сайтът вече не трябва да дава Not found.
    </p>

    <div class="actions">
      <button onclick="health()">API Health</button>
      <button class="secondary" onclick="profile()">Test Supabase Write</button>
      <a class="secondary" href="/test">Test Page</a>
      <a class="secondary" href="/admin">Admin</a>
    </div>

    <pre id="out">Ready.</pre>
  </main>

  <script>
    const out = document.getElementById("out");

    function show(data) {
      out.textContent = typeof data === "string" ? data : JSON.stringify(data, null, 2);
    }

    async function health() {
      const res = await fetch("/api/health");
      show(await res.json());
    }

    async function profile() {
      const body = {
        id: Date.now(),
        user: {
          name: "V33 Root Test Client",
          contact: "v33-root@soulflame.local",
          goal: "V33 root frontend production test",
          age: "25-34"
        },
        mainTrait: "vision",
        secondTrait: "logic",
        profile: "V33 Root Supabase test profile",
        scores: {
          vision: 10,
          logic: 9,
          emotion: 6,
          social: 5,
          action: 8
        },
        report: "V33 Root Mini Echo test.",
        fullReport: "V33 Root Full Echo test.",
        createdAt: new Date().toISOString()
      };

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      show(await res.json());
    }

    health();
  </script>
</body>
</html>`;
}

function fallbackAdminHtml() {
  return `<!doctype html>
<html lang="bg">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>SoulFlame Twins Admin</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      background: #080914;
      color: white;
      font-family: Arial, sans-serif;
      padding: 24px;
    }

    .card {
      max-width: 1000px;
      margin: 0 auto;
      border: 1px solid rgba(255,255,255,.16);
      background: rgba(255,255,255,.08);
      border-radius: 24px;
      padding: 24px;
    }

    input, button {
      padding: 13px 14px;
      border-radius: 14px;
      margin: 6px 4px 6px 0;
    }

    input {
      border: 1px solid rgba(255,255,255,.16);
      background: rgba(0,0,0,.35);
      color: white;
      width: min(420px, 100%);
    }

    button {
      border: 0;
      background: #7c3cff;
      color: white;
      font-weight: 900;
      cursor: pointer;
    }

    pre {
      background: rgba(0,0,0,.35);
      padding: 16px;
      border-radius: 16px;
      white-space: pre-wrap;
      overflow: auto;
      min-height: 300px;
    }

    a { color: #8bdfff; }
  </style>
</head>
<body>
  <div class="card">
    <h1>SoulFlame Twins Admin</h1>
    <p>Въведи ECHO_ADMIN_PIN.</p>

    <input id="pin" placeholder="Admin PIN">
    <br>

    <button onclick="metrics()">Metrics</button>
    <button onclick="data()">Load Data</button>
    <button onclick="code()">Generate Unlock Code</button>
    <a href="/">Back</a>

    <pre id="out">Ready.</pre>
  </div>

  <script>
    const out = document.getElementById("out");

    function show(data) {
      out.textContent = typeof data === "string" ? data : JSON.stringify(data, null, 2);
    }

    function pin() {
      return document.getElementById("pin").value.trim();
    }

    async function metrics() {
      const res = await fetch("/api/admin/metrics", {
        headers: { "x-admin-pin": pin() }
      });

      show(await res.json());
    }

    async function data() {
      const res = await fetch("/api/admin/data", {
        headers: { "x-admin-pin": pin() }
      });

      show(await res.json());
    }

    async function code() {
      const res = await fetch("/api/admin/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin()
        },
        body: JSON.stringify({
          offer: "Full AI Echo",
          note: "Generated from V33 admin"
        })
      });

      show(await res.json());
    }
  </script>
</body>
</html>`;
}

function fallbackTestHtml() {
  return `<!doctype html>
<html lang="bg">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>SoulFlame Twins Test</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      background: #080914;
      color: white;
      font-family: Arial, sans-serif;
      padding: 24px;
    }

    .card {
      max-width: 1000px;
      margin: 0 auto;
      border: 1px solid rgba(255,255,255,.16);
      background: rgba(255,255,255,.08);
      border-radius: 24px;
      padding: 24px;
    }

    button {
      padding: 13px 14px;
      border-radius: 14px;
      border: 0;
      background: #7c3cff;
      color: white;
      font-weight: 900;
      cursor: pointer;
      margin: 6px 4px 6px 0;
    }

    pre {
      background: rgba(0,0,0,.35);
      padding: 16px;
      border-radius: 16px;
      white-space: pre-wrap;
      overflow: auto;
      min-height: 320px;
    }

    a { color: #8bdfff; }
  </style>
</head>
<body>
  <div class="card">
    <h1>SoulFlame Twins Test</h1>
    <a href="/">Back</a>
    <br><br>

    <button onclick="health()">Health</button>
    <button onclick="profile()">Profile Write</button>
    <button onclick="lead()">Lead Write</button>
    <button onclick="payment()">Payment Request</button>

    <pre id="out">Ready.</pre>
  </div>

  <script>
    const out = document.getElementById("out");

    function show(data) {
      out.textContent = typeof data === "string" ? data : JSON.stringify(data, null, 2);
    }

    async function call(url, options) {
      const res = await fetch(url, options || {});
      const text = await res.text();

      try {
        return {
          status: res.status,
          data: JSON.parse(text)
        };
      } catch {
        return {
          status: res.status,
          data: text
        };
      }
    }

    async function health() {
      show(await call("/api/health"));
    }

    async function profile() {
      show(await call("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now(),
          user: {
            name: "V33 Test Client",
            contact: "v33-test@soulflame.local",
            goal: "V33 production test",
            age: "25-34"
          },
          mainTrait: "vision",
          secondTrait: "logic",
          profile: "V33 Test Profile",
          scores: { vision: 10, logic: 9, emotion: 6, social: 5, action: 8 },
          report: "V33 mini",
          fullReport: "V33 full",
          createdAt: new Date().toISOString()
        })
      }));
    }

    async function lead() {
      show(await call("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offer: "V33 Lead Test",
          user: {
            name: "V33 Lead",
            contact: "lead-v33@soulflame.local"
          },
          profile: "Lead profile test",
          scores: { vision: 10 }
        })
      }));
    }

    async function payment() {
      show(await call("/api/payment-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offer: "Full AI Echo",
          amount: "19.99 лв",
          method: "manual",
          user: {
            name: "V33 Payment",
            contact: "payment-v33@soulflame.local"
          },
          profile: "Payment test",
          scores: { vision: 10 }
        })
      }));
    }

    health();
  </script>
</body>
</html>`;
}

function readHtmlFile(fileName, fallback) {
  const filePath = path.join(ROOT, fileName);

  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf8");
    }
  } catch {}

  return fallback;
}

const INLINE_INDEX_HTML = readHtmlFile("index.html", fallbackIndexHtml());
const INLINE_ADMIN_HTML = readHtmlFile("admin.html", fallbackAdminHtml());
const INLINE_TEST_HTML = readHtmlFile("test.html", fallbackTestHtml());

function getSupabaseUrl() {
  return String(process.env.SUPABASE_URL || "").replace(/\/$/, "");
}

function getSupabaseKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";
}

function supabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseKey());
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-admin-pin",
    "Cache-Control": "public, max-age=0, must-revalidate"
  });

  res.end(JSON.stringify(data, null, 2));
}

function sendHtml(res, html) {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, max-age=0, must-revalidate"
  });

  res.end(html);
}

function sendText(res, status, text) {
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "public, max-age=0, must-revalidate"
  });

  res.end(text);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();

      if (body.length > 2000000) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });

    req.on("error", reject);
  });
}

function isAdmin(req) {
  const incoming = String(req.headers["x-admin-pin"] || "").trim();
  return Boolean(incoming && incoming === ADMIN_PIN);
}

function requireAdmin(req, res) {
  if (!isAdmin(req)) {
    sendJson(res, 401, {
      ok: false,
      error: "Admin PIN required."
    });

    return false;
  }

  return true;
}

async function supabaseRequest(table, options = {}) {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();

  if (!url || !key) {
    throw new Error("Missing Supabase env vars.");
  }

  const response = await fetch(url + "/rest/v1/" + table + (options.query || ""), {
    method: options.method || "GET",
    headers: Object.assign(
      {
        apikey: key,
        Authorization: "Bearer " + key,
        "Content-Type": "application/json"
      },
      options.headers || {}
    ),
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error("Supabase error " + response.status + ": " + text);
  }

  try {
    return text ? JSON.parse(text) : [];
  } catch {
    return text;
  }
}

function profileRow(body) {
  return {
    id: Number(body.id) || Date.now(),
    name: body.user && body.user.name ? body.user.name : body.name || "",
    contact: body.user && body.user.contact ? body.user.contact : body.contact || "",
    goal: body.user && body.user.goal ? body.user.goal : body.goal || "",
    age: body.user && body.user.age ? body.user.age : body.age || "",
    main_trait: body.mainTrait || body.main_trait || "",
    second_trait: body.secondTrait || body.second_trait || "",
    profile: body.profile || "",
    scores: body.scores || {},
    mini_report: body.report || body.mini_report || "",
    full_report: body.fullReport || body.full_report || "",
    raw: body
  };
}

function leadRow(body) {
  return {
    id: Date.now(),
    offer: body.offer || "EchoProfile",
    name: body.user && body.user.name ? body.user.name : body.name || "",
    contact: body.user && body.user.contact ? body.user.contact : body.contact || "",
    profile: body.profile || "",
    scores: body.scores || {},
    raw: body
  };
}

function paymentRow(body) {
  return {
    id: Date.now(),
    status: "pending",
    offer: body.offer || "Full AI Echo",
    amount: body.amount || "19.99 лв",
    method: body.method || "manual",
    name: body.user && body.user.name ? body.user.name : body.name || "",
    contact: body.user && body.user.contact ? body.user.contact : body.contact || "",
    profile: body.profile || "",
    scores: body.scores || {},
    code: "",
    raw: body
  };
}

function makeUnlockCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  function part(length) {
    let value = "";

    for (let i = 0; i < length; i++) {
      value += alphabet[crypto.randomInt(0, alphabet.length)];
    }

    return value;
  }

  return "ECHO-" + part(4) + "-" + part(4);
}

async function insertEvent(type, payload = {}) {
  try {
    await supabaseRequest("events", {
      method: "POST",
      headers: {
        Prefer: "return=minimal"
      },
      body: {
        id: Date.now() + crypto.randomInt(0, 999),
        type,
        payload
      }
    });
  } catch {}
}

async function handleHealth(req, res) {
  const configured = supabaseConfigured();

  sendJson(res, 200, {
    ok: true,
    app: APP_NAME,
    module: MODULE_NAME,
    version: APP_VERSION,
    appMode: APP_MODE,
    requestedDataMode: DATA_MODE,
    activeDataMode: configured ? "supabase" : "missing_supabase_env",
    supabaseConfigured: configured,
    warnings: configured ? [] : ["Missing SUPABASE_URL or SUPABASE key"],
    ownerEmail: OWNER_EMAIL,
    uptimeSeconds: Math.round((Date.now() - SERVER_STARTED_AT) / 1000),
    adminSecurityWarning: ADMIN_PIN === "ECHO-ADMIN-999" ? "Change default admin PIN before going online." : null,
    routes: [
      "/",
      "/admin",
      "/test",
      "/api/health",
      "/api/profile",
      "/api/lead",
      "/api/payment-request",
      "/api/unlock",
      "/api/admin/data",
      "/api/admin/metrics",
      "/api/admin/code",
      "/api/admin/payment-confirm"
    ],
    time: now()
  });
}

async function handlePublicConfig(req, res) {
  sendJson(res, 200, {
    ok: true,
    app: APP_NAME,
    module: MODULE_NAME,
    version: APP_VERSION,
    ownerEmail: OWNER_EMAIL,
    appMode: APP_MODE,
    requestedDataMode: DATA_MODE,
    activeDataMode: supabaseConfigured() ? "supabase" : "missing_supabase_env",
    products: {
      mini: "Mini Echo",
      full: "Full AI Echo",
      deep: "Deep Echo Blueprint"
    },
    prices: {
      mini: "0 лв",
      full: "19.99 лв",
      deep: "49 лв"
    },
    time: now()
  });
}

async function safeTable(name) {
  try {
    return await supabaseRequest(name, {
      method: "GET",
      query: "?select=*&order=created_at.desc&limit=50"
    });
  } catch (error) {
    return {
      error: error.message
    };
  }
}

async function handleAdminData(req, res) {
  if (!requireAdmin(req, res)) return;

  const profiles = await safeTable("profiles");
  const leads = await safeTable("leads");
  const payments = await safeTable("payments");
  const unlockCodes = await safeTable("unlock_codes");
  const events = await safeTable("events");
  const adminLogs = await safeTable("admin_logs");

  sendJson(res, 200, {
    ok: true,
    metrics: {
      profiles: Array.isArray(profiles) ? profiles.length : 0,
      leads: Array.isArray(leads) ? leads.length : 0,
      payments: Array.isArray(payments) ? payments.length : 0,
      unlock_codes: Array.isArray(unlockCodes) ? unlockCodes.length : 0,
      events: Array.isArray(events) ? events.length : 0,
      admin_logs: Array.isArray(adminLogs) ? adminLogs.length : 0
    },
    profiles,
    leads,
    payments,
    unlock_codes: unlockCodes,
    events,
    admin_logs: adminLogs,
    system: {
      version: APP_VERSION,
      activeDataMode: supabaseConfigured() ? "supabase" : "missing_supabase_env",
      ownerEmail: OWNER_EMAIL
    }
  });
}

async function handleAdminMetrics(req, res) {
  if (!requireAdmin(req, res)) return;

  const profiles = await safeTable("profiles");
  const leads = await safeTable("leads");
  const payments = await safeTable("payments");
  const unlockCodes = await safeTable("unlock_codes");
  const events = await safeTable("events");

  sendJson(res, 200, {
    ok: true,
    app: APP_NAME,
    version: APP_VERSION,
    metrics: {
      profiles: Array.isArray(profiles) ? profiles.length : 0,
      leads: Array.isArray(leads) ? leads.length : 0,
      payments: Array.isArray(payments) ? payments.length : 0,
      unlock_codes: Array.isArray(unlockCodes) ? unlockCodes.length : 0,
      events: Array.isArray(events) ? events.length : 0
    },
    time: now()
  });
}

async function handleProfile(req, res) {
  const body = await readBody(req);
  const row = profileRow(body);

  const inserted = await supabaseRequest("profiles", {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: row
  });

  await insertEvent("profile_created", {
    profileId: row.id,
    name: row.name,
    contact: row.contact
  });

  sendJson(res, 200, {
    ok: true,
    saved: "profile",
    activeDataMode: "supabase",
    id: row.id,
    inserted
  });
}

async function handleLead(req, res) {
  const body = await readBody(req);
  const row = leadRow(body);

  const inserted = await supabaseRequest("leads", {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: row
  });

  await insertEvent("lead_created", {
    leadId: row.id,
    offer: row.offer,
    name: row.name
  });

  sendJson(res, 200, {
    ok: true,
    saved: "lead",
    id: row.id,
    inserted
  });
}

async function handlePaymentRequest(req, res) {
  const body = await readBody(req);
  const row = paymentRow(body);

  const inserted = await supabaseRequest("payments", {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: row
  });

  await insertEvent("payment_requested", {
    paymentId: row.id,
    offer: row.offer,
    amount: row.amount,
    contact: row.contact
  });

  sendJson(res, 200, {
    ok: true,
    saved: "payment-request",
    payment: Array.isArray(inserted) ? inserted[0] : inserted,
    message: "Заявката за Full Echo е създадена."
  });
}

async function handleAdminCode(req, res) {
  if (!requireAdmin(req, res)) return;

  const body = await readBody(req);
  const code = makeUnlockCode();

  const row = {
    id: Date.now(),
    code,
    status: "unused",
    offer: body.offer || "Full AI Echo",
    note: body.note || "",
    used_at: null,
    used_by: null,
    profile_id: null,
    payment_id: body.paymentId || null,
    raw: body
  };

  const inserted = await supabaseRequest("unlock_codes", {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: row
  });

  await insertEvent("code_generated", {
    code,
    offer: row.offer,
    paymentId: row.payment_id
  });

  sendJson(res, 200, {
    ok: true,
    code,
    row: Array.isArray(inserted) ? inserted[0] : inserted,
    deliveryText: "Твоят Full Echo код е: " + code
  });
}

async function handleUnlock(req, res) {
  const body = await readBody(req);
  const submittedCode = String(body.code || "").trim().toUpperCase();

  if (!submittedCode) {
    sendJson(res, 400, {
      ok: false,
      error: "Missing unlock code."
    });

    return;
  }

  const rows = await supabaseRequest("unlock_codes", {
    method: "GET",
    query: "?code=eq." + encodeURIComponent(submittedCode) + "&select=*"
  });

  if (!Array.isArray(rows) || rows.length === 0) {
    sendJson(res, 404, {
      ok: false,
      error: "Кодът не съществува."
    });

    return;
  }

  const current = rows[0];

  if (current.status === "used") {
    sendJson(res, 409, {
      ok: false,
      error: "Този код вече е използван.",
      code: current
    });

    return;
  }

  const updated = await supabaseRequest("unlock_codes", {
    method: "PATCH",
    query: "?id=eq." + encodeURIComponent(current.id),
    headers: {
      Prefer: "return=representation"
    },
    body: {
      status: "used",
      used_at: now(),
      used_by: body.user || null,
      profile_id: body.profileId || null
    }
  });

  await insertEvent("code_used", {
    code: submittedCode,
    profileId: body.profileId || null
  });

  sendJson(res, 200, {
    ok: true,
    unlocked: true,
    code: Array.isArray(updated) ? updated[0] : updated
  });
}

async function handlePaymentConfirm(req, res) {
  if (!requireAdmin(req, res)) return;

  const body = await readBody(req);
  const paymentId = Number(body.paymentId);

  if (!paymentId) {
    sendJson(res, 400, {
      ok: false,
      error: "paymentId required."
    });

    return;
  }

  const payments = await supabaseRequest("payments", {
    method: "GET",
    query: "?id=eq." + encodeURIComponent(paymentId) + "&select=*"
  });

  if (!Array.isArray(payments) || payments.length === 0) {
    sendJson(res, 404, {
      ok: false,
      error: "Плащането не е намерено."
    });

    return;
  }

  const payment = payments[0];

  if (payment.status === "paid" && payment.code) {
    sendJson(res, 200, {
      ok: true,
      payment,
      deliveryText: "Плащането вече е потвърдено. Код: " + payment.code
    });

    return;
  }

  const code = makeUnlockCode();

  const codeRow = {
    id: Date.now(),
    code,
    status: "unused",
    offer: payment.offer || "Full AI Echo",
    note: "Generated from payment " + payment.id,
    used_at: null,
    used_by: null,
    profile_id: null,
    payment_id: payment.id,
    raw: {
      payment
    }
  };

  const insertedCode = await supabaseRequest("unlock_codes", {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: codeRow
  });

  const updatedPayment = await supabaseRequest("payments", {
    method: "PATCH",
    query: "?id=eq." + encodeURIComponent(payment.id),
    headers: {
      Prefer: "return=representation"
    },
    body: {
      status: "paid",
      code,
      raw: {
        ...payment.raw,
        confirmedAt: now(),
        generatedCode: code
      }
    }
  });

  await insertEvent("payment_confirmed", {
    paymentId: payment.id,
    code
  });

  sendJson(res, 200, {
    ok: true,
    payment: Array.isArray(updatedPayment) ? updatedPayment[0] : updatedPayment,
    code: Array.isArray(insertedCode) ? insertedCode[0] : insertedCode,
    deliveryText: "Здравей! Плащането е потвърдено. Твоят Full Echo код е: " + code
  });
}

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".webp": "image/webp"
  };

  return types[ext] || "application/octet-stream";
}

function serveStatic(req, res) {
  let requested = decodeURIComponent(req.url.split("?")[0]);

  if (requested === "/") {
    sendHtml(res, INLINE_INDEX_HTML);
    return;
  }

  if (requested === "/admin") {
    sendHtml(res, INLINE_ADMIN_HTML);
    return;
  }

  if (requested === "/test") {
    sendHtml(res, INLINE_TEST_HTML);
    return;
  }

  const safePath = path.normalize(requested).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    sendText(res, 403, "Forbidden");
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    sendText(res, 404, "Not found");
    return;
  }

  res.writeHead(200, {
    "Content-Type": getMime(filePath),
    "Cache-Control": "public, max-age=0, must-revalidate"
  });

  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  try {
    const parsed = new URL(req.url, "http://localhost");
    const pathName = parsed.pathname;

    if (req.method === "OPTIONS") {
      sendJson(res, 200, {
        ok: true
      });
      return;
    }

    if (req.method === "GET" && pathName === "/") {
      sendHtml(res, INLINE_INDEX_HTML);
      return;
    }

    if (req.method === "GET" && pathName === "/admin") {
      sendHtml(res, INLINE_ADMIN_HTML);
      return;
    }

    if (req.method === "GET" && pathName === "/test") {
      sendHtml(res, INLINE_TEST_HTML);
      return;
    }

    if (req.method === "GET" && pathName === "/api/health") {
      await handleHealth(req, res);
      return;
    }

    if (req.method === "GET" && pathName === "/api/public-config") {
      await handlePublicConfig(req, res);
      return;
    }

    if (req.method === "GET" && (pathName === "/api/data" || pathName === "/api/admin/data")) {
      await handleAdminData(req, res);
      return;
    }

    if (req.method === "GET" && pathName === "/api/admin/metrics") {
      await handleAdminMetrics(req, res);
      return;
    }

    if (req.method === "POST" && pathName === "/api/profile") {
      await handleProfile(req, res);
      return;
    }

    if (req.method === "POST" && pathName === "/api/lead") {
      await handleLead(req, res);
      return;
    }

    if (req.method === "POST" && pathName === "/api/payment-request") {
      await handlePaymentRequest(req, res);
      return;
    }

    if (req.method === "POST" && (pathName === "/api/code" || pathName === "/api/admin/code")) {
      await handleAdminCode(req, res);
      return;
    }

    if (req.method === "POST" && pathName === "/api/unlock") {
      await handleUnlock(req, res);
      return;
    }

    if (req.method === "POST" && (pathName === "/api/payment-confirm" || pathName === "/api/admin/payment-confirm")) {
      await handlePaymentConfirm(req, res);
      return;
    }

    serveStatic(req, res);
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: error.message,
      version: APP_VERSION,
      activeDataMode: supabaseConfigured() ? "supabase" : "missing_supabase_env",
      warning: "If this is a Supabase table/column error, run the schema patch in Supabase SQL Editor."
    });
  }
});

server.listen(PORT, () => {
  console.log("");
  console.log(APP_NAME + " " + APP_VERSION + " running.");
  console.log("Open: http://localhost:" + PORT);
  console.log("App mode: " + APP_MODE);
  console.log("Requested data mode: " + DATA_MODE);
  console.log("Supabase configured: " + supabaseConfigured());
  console.log("Owner email: " + OWNER_EMAIL);
  console.log("");
});