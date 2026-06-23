const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { createDataAdapter } = require("./core/database-engine");

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
const DATA_DIR = path.join(ROOT, process.env.DATA_DIR || "data");
const ADMIN_PIN = process.env.ECHO_ADMIN_PIN || "ECHO-ADMIN-999";
const OWNER_EMAIL = process.env.OWNER_EMAIL || "stere0metal360@gmail.com";
const APP_MODE = process.env.APP_MODE || "local";
const DATA_MODE = process.env.DATA_MODE || "local";
const APP_VERSION = process.env.APP_VERSION || "V17_DEPLOY_PREP_BUSINESS_HARDENING";
const SERVER_STARTED_AT = Date.now();
const DEFAULT_ADMIN_PIN = "ECHO-ADMIN-999";

const dbEngine = createDataAdapter({
  dataMode: DATA_MODE,
  dataDir: DATA_DIR,
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || ""
});

const db = dbEngine.adapter;
const ACTIVE_DATA_MODE = dbEngine.activeMode;
const CLOUD_WARNINGS = dbEngine.warnings || [];

function now() {
  return new Date().toISOString();
}

async function event(type, payload = {}) {
  await db.push("events", {
    id: Date.now() + Math.floor(Math.random() * 999),
    type,
    payload,
    createdAt: now()
  });
}

function sendJSON(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-admin-pin"
  });

  res.end(JSON.stringify(data, null, 2));
}

function isAdmin(req) {
  return String(req.headers["x-admin-pin"] || "").trim() === ADMIN_PIN;
}

function requireAdmin(req, res) {
  if (!isAdmin(req)) {
    sendJSON(res, 401, {
      ok: false,
      error: "Admin PIN required"
    });

    return false;
  }

  return true;
}

function parseBody(req) {
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
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
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
    ".ico": "image/x-icon"
  };

  return types[ext] || "application/octet-stream";
}

function serveStatic(req, res) {
  let requested = decodeURIComponent(req.url.split("?")[0]);

  if (requested === "/") requested = "/index.html";

  const safePath = path.normalize(requested).replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": getMime(filePath) });
  fs.createReadStream(filePath).pipe(res);
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

  return `ECHO-${part(4)}-${part(4)}`;
}

async function generateUniqueCode() {
  const codes = await db.read("codes");
  let code = makeUnlockCode();

  while (codes.some(item => item.code === code)) {
    code = makeUnlockCode();
  }

  return code;
}

async function calculateMetrics() {
  const data = await db.all();

  const paidPayments = data.payments.filter(p => p.status === "paid");
  const pendingPayments = data.payments.filter(p => p.status === "pending");
  const usedCodes = data.codes.filter(c => c.status === "used");
  const unusedCodes = data.codes.filter(c => c.status === "unused");

  const estimatedRevenue = paidPayments.reduce((sum, p) => {
    const amount = String(p.amount || "0").replace(",", ".").match(/\d+(\.\d+)?/);
    return sum + (amount ? Number(amount[0]) : 0);
  }, 0);

  return {
    profiles: data.profiles.length,
    leads: data.leads.length,
    payments: data.payments.length,
    paidPayments: paidPayments.length,
    pendingPayments: pendingPayments.length,
    codes: data.codes.length,
    usedCodes: usedCodes.length,
    unusedCodes: unusedCodes.length,
    estimatedRevenue: `${estimatedRevenue.toFixed(2)} лв`,
    events: data.events.length
  };
}

async function getAdminData() {
  return {
    ...(await db.all()),
    metrics: await calculateMetrics(),
    system: {
      version: APP_VERSION,
      requestedDataMode: DATA_MODE,
      activeDataMode: ACTIVE_DATA_MODE,
      warnings: CLOUD_WARNINGS
    }
  };
}

async function handleCreateCode(body) {
  const code = await generateUniqueCode();

  const newCode = {
    id: Date.now(),
    code,
    status: "unused",
    offer: body.offer || "Full AI Echo",
    note: body.note || "",
    deliveryText: `Здравей! Твоят Full Echo код е: ${code}. Влез в EchoProfile, въведи кода в полето за Full Echo и отключи пълния анализ.`,
    createdAt: now(),
    usedAt: null,
    usedBy: null,
    profileId: null,
    paymentId: body.paymentId || null
  };

  await db.push("codes", newCode);
  await event("code_generated", { code, offer: newCode.offer });

  return newCode;
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "OPTIONS") {
      sendJSON(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET" && req.url.startsWith("/api/health")) {
      sendJSON(res, 200, {
        ok: true,
        app: "SoulFlame EchoProfile",
        version: APP_VERSION,
        appMode: APP_MODE,
        requestedDataMode: DATA_MODE,
        activeDataMode: ACTIVE_DATA_MODE,
        warnings: CLOUD_WARNINGS,
        ownerEmail: OWNER_EMAIL,
        uptimeSeconds: Math.round((Date.now() - SERVER_STARTED_AT) / 1000),
        adminSecurityWarning: ADMIN_PIN === DEFAULT_ADMIN_PIN ? "Change default admin PIN before going online." : null,
        time: now()
      });
      return;
    }

    if (req.method === "GET" && req.url.startsWith("/api/public-config")) {
      sendJSON(res, 200, {
        ok: true,
        version: APP_VERSION,
        ownerEmail: OWNER_EMAIL,
        uptimeSeconds: Math.round((Date.now() - SERVER_STARTED_AT) / 1000),
        adminSecurityWarning: ADMIN_PIN === DEFAULT_ADMIN_PIN ? "Change default admin PIN before going online." : null,
        appMode: APP_MODE,
        requestedDataMode: DATA_MODE,
        activeDataMode: ACTIVE_DATA_MODE,
        warnings: CLOUD_WARNINGS,
        products: {
          mini: "Mini Echo",
          full: "Full AI Echo",
          deep: "Deep Echo Blueprint"
        },
        prices: {
          mini: "0 лв",
          full: "19.99 лв",
          deep: "49 лв"
        }
      });
      return;
    }

    if (req.method === "GET" && (req.url.startsWith("/api/data") || req.url.startsWith("/api/admin/data"))) {
      if (!requireAdmin(req, res)) return;
      sendJSON(res, 200, await getAdminData());
      return;
    }

    if (req.method === "GET" && req.url.startsWith("/api/admin/metrics")) {
      if (!requireAdmin(req, res)) return;
      sendJSON(res, 200, {
        ok: true,
        metrics: await calculateMetrics(),
        system: {
          requestedDataMode: DATA_MODE,
          activeDataMode: ACTIVE_DATA_MODE,
          warnings: CLOUD_WARNINGS
        }
      });
      return;
    }

    if (req.method === "GET" && req.url.startsWith("/api/admin/export")) {
      if (!requireAdmin(req, res)) return;
      sendJSON(res, 200, {
        ok: true,
        exportedAt: now(),
        data: await getAdminData()
      });
      return;
    }

    if (req.method === "POST" && req.url.startsWith("/api/profile")) {
      const profile = await parseBody(req);

      const saved = {
        ...profile,
        serverSavedAt: now()
      };

      const profiles = await db.push("profiles", saved);
      await event("profile_created", { profileId: saved.id, name: saved.user?.name });

      sendJSON(res, 200, {
        ok: true,
        saved: "profile",
        total: profiles.length
      });
      return;
    }

    if (req.method === "POST" && req.url.startsWith("/api/lead")) {
      const lead = await parseBody(req);

      const saved = {
        ...lead,
        serverSavedAt: now()
      };

      const leads = await db.push("leads", saved);
      await event("lead_created", { offer: saved.offer, name: saved.user?.name });

      sendJSON(res, 200, {
        ok: true,
        saved: "lead",
        total: leads.length
      });
      return;
    }

    if (req.method === "POST" && (req.url.startsWith("/api/code") || req.url.startsWith("/api/admin/code"))) {
      if (!requireAdmin(req, res)) return;

      const body = await parseBody(req);
      const newCode = await handleCreateCode(body);

      sendJSON(res, 200, {
        ok: true,
        code: newCode
      });
      return;
    }

    if (req.method === "POST" && req.url.startsWith("/api/unlock")) {
      const body = await parseBody(req);
      const submittedCode = String(body.code || "").trim().toUpperCase();
      const codes = await db.read("codes");

      const found = codes.find(item => item.code === submittedCode);

      if (!found) {
        sendJSON(res, 404, { ok: false, error: "Кодът не съществува." });
        return;
      }

      if (found.status === "used") {
        sendJSON(res, 409, { ok: false, error: "Този код вече е използван.", code: found });
        return;
      }

      found.status = "used";
      found.usedAt = now();
      found.usedBy = body.user || null;
      found.profileId = body.profileId || null;

      await db.write("codes", codes);
      await event("code_used", { code: found.code, profileId: found.profileId });

      sendJSON(res, 200, {
        ok: true,
        unlocked: true,
        code: found
      });
      return;
    }

    if (req.method === "POST" && req.url.startsWith("/api/payment-request")) {
      const body = await parseBody(req);

      const payment = {
        id: Date.now(),
        status: "pending",
        flow: ["pending"],
        offer: body.offer || "Full AI Echo",
        amount: body.amount || "19.99 лв",
        method: body.method || "manual",
        user: body.user || null,
        profile: body.profile || null,
        scores: body.scores || null,
        code: null,
        clientInstructions: "След заявката изпрати плащане по уговорения начин. След потвърждение ще получиш еднократен код за Full Echo.",
        createdAt: now(),
        paidAt: null,
        confirmedAt: null
      };

      const payments = await db.push("payments", payment);
      await event("payment_requested", { paymentId: payment.id, offer: payment.offer });

      sendJSON(res, 200, {
        ok: true,
        payment,
        total: payments.length
      });
      return;
    }

    if (req.method === "POST" && (req.url.startsWith("/api/payment-confirm") || req.url.startsWith("/api/admin/payment-confirm"))) {
      if (!requireAdmin(req, res)) return;

      const body = await parseBody(req);
      const paymentId = Number(body.paymentId);

      const payments = await db.read("payments");
      const payment = payments.find(item => Number(item.id) === paymentId);

      if (!payment) {
        sendJSON(res, 404, { ok: false, error: "Плащането не е намерено." });
        return;
      }

      if (payment.status === "paid" && payment.code) {
        const codes = await db.read("codes");
        sendJSON(res, 200, {
          ok: true,
          payment,
          code: codes.find(item => item.code === payment.code) || null
        });
        return;
      }

      const newCode = await handleCreateCode({
        offer: payment.offer || "Full AI Echo",
        note: `Generated from payment ${payment.id}`,
        paymentId: payment.id
      });

      newCode.deliveryText = `Здравей! Плащането е потвърдено. Твоят Full Echo код е: ${newCode.code}. Въведи го в EchoProfile, за да отключиш пълния анализ.`;

      const codes = await db.read("codes");
      const codeIndex = codes.findIndex(item => item.code === newCode.code);
      if (codeIndex >= 0) {
        codes[codeIndex] = newCode;
        await db.write("codes", codes);
      }

      payment.status = "paid";
      payment.flow = ["pending", "paid", "code_generated"];
      payment.code = newCode.code;
      payment.deliveryText = newCode.deliveryText;
      payment.paidAt = now();
      payment.confirmedAt = now();

      await db.write("payments", payments);
      await event("payment_confirmed", { paymentId: payment.id, code: newCode.code });

      sendJSON(res, 200, {
        ok: true,
        payment,
        code: newCode
      });
      return;
    }

    if (req.method === "DELETE" && (req.url.startsWith("/api/data") || req.url.startsWith("/api/admin/data"))) {
      if (!requireAdmin(req, res)) return;

      await db.clear();
      await event("data_cleared", { by: "admin" });

      sendJSON(res, 200, {
        ok: true,
        cleared: true
      });
      return;
    }

    serveStatic(req, res);
  } catch (error) {
    sendJSON(res, 500, {
      ok: false,
      error: error.message,
      activeDataMode: ACTIVE_DATA_MODE,
      warnings: CLOUD_WARNINGS
    });
  }
});

server.listen(PORT, () => {
  console.log("");
  console.log("SoulFlame EchoProfile V17 Deploy Prep + Business Hardening is running.");
  console.log("Open: http://localhost:" + PORT);
  console.log("Requested Data Mode: " + DATA_MODE);
  console.log("Active Data Mode: " + ACTIVE_DATA_MODE);
  console.log("Owner Email: " + OWNER_EMAIL);
  console.log("Admin PIN: " + ADMIN_PIN);
  if (CLOUD_WARNINGS.length) {
    console.log("Warnings:");
    CLOUD_WARNINGS.forEach(w => console.log("- " + w));
  }
  console.log("");
});

