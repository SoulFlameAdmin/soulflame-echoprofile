const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { LocalDataAdapter } = require("./core/data-adapter");

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

    if (!process.env[key]) {
      process.env[key] = value;
    }
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
const APP_VERSION = process.env.APP_VERSION || "V15_REAL_PRODUCT_ENGINE";

const db = new LocalDataAdapter(fs, path, DATA_DIR);

function now() {
  return new Date().toISOString();
}

function event(type, payload = {}) {
  db.push("events", {
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

function generateUniqueCode() {
  const codes = db.read("codes");
  let code = makeUnlockCode();

  while (codes.some(item => item.code === code)) {
    code = makeUnlockCode();
  }

  return code;
}

function calculateMetrics() {
  const data = db.all();

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

const server = http.createServer(async (req, res) => {
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
      dataMode: DATA_MODE,
      ownerEmail: OWNER_EMAIL,
      time: now()
    });
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/api/public-config")) {
    sendJSON(res, 200, {
      ok: true,
      version: APP_VERSION,
      ownerEmail: OWNER_EMAIL,
      appMode: APP_MODE,
      dataMode: DATA_MODE,
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

  if (req.method === "GET" && req.url.startsWith("/api/data")) {
    if (!requireAdmin(req, res)) return;

    sendJSON(res, 200, {
      ...db.all(),
      metrics: calculateMetrics()
    });
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/api/metrics")) {
    if (!requireAdmin(req, res)) return;

    sendJSON(res, 200, {
      ok: true,
      metrics: calculateMetrics()
    });
    return;
  }

  if (req.method === "POST" && req.url.startsWith("/api/profile")) {
    try {
      const profile = await parseBody(req);

      const saved = {
        ...profile,
        serverSavedAt: now()
      };

      const profiles = db.push("profiles", saved);
      event("profile_created", { profileId: saved.id, name: saved.user?.name });

      sendJSON(res, 200, {
        ok: true,
        saved: "profile",
        total: profiles.length
      });
    } catch (error) {
      sendJSON(res, 400, { ok: false, error: error.message });
    }

    return;
  }

  if (req.method === "POST" && req.url.startsWith("/api/lead")) {
    try {
      const lead = await parseBody(req);

      const saved = {
        ...lead,
        serverSavedAt: now()
      };

      const leads = db.push("leads", saved);
      event("lead_created", { offer: saved.offer, name: saved.user?.name });

      sendJSON(res, 200, {
        ok: true,
        saved: "lead",
        total: leads.length
      });
    } catch (error) {
      sendJSON(res, 400, { ok: false, error: error.message });
    }

    return;
  }

  if (req.method === "POST" && req.url.startsWith("/api/code")) {
    if (!requireAdmin(req, res)) return;

    try {
      const body = await parseBody(req);
      const code = generateUniqueCode();

      const newCode = {
        id: Date.now(),
        code,
        status: "unused",
        offer: body.offer || "Full AI Echo",
        note: body.note || "",
        deliveryText: `Твоят SoulFlame EchoProfile код е: ${code}. Въведи го в полето за Full Echo, за да отключиш анализа.`,
        createdAt: now(),
        usedAt: null,
        usedBy: null,
        profileId: null,
        paymentId: body.paymentId || null
      };

      db.push("codes", newCode);
      event("code_generated", { code, offer: newCode.offer });

      sendJSON(res, 200, {
        ok: true,
        code: newCode
      });
    } catch (error) {
      sendJSON(res, 400, { ok: false, error: error.message });
    }

    return;
  }

  if (req.method === "POST" && req.url.startsWith("/api/unlock")) {
    try {
      const body = await parseBody(req);
      const submittedCode = String(body.code || "").trim().toUpperCase();
      const codes = db.read("codes");

      const found = codes.find(item => item.code === submittedCode);

      if (!found) {
        sendJSON(res, 404, {
          ok: false,
          error: "Кодът не съществува."
        });
        return;
      }

      if (found.status === "used") {
        sendJSON(res, 409, {
          ok: false,
          error: "Този код вече е използван.",
          code: found
        });
        return;
      }

      found.status = "used";
      found.usedAt = now();
      found.usedBy = body.user || null;
      found.profileId = body.profileId || null;

      db.write("codes", codes);
      event("code_used", { code: found.code, profileId: found.profileId });

      sendJSON(res, 200, {
        ok: true,
        unlocked: true,
        code: found
      });
    } catch (error) {
      sendJSON(res, 400, { ok: false, error: error.message });
    }

    return;
  }

  if (req.method === "POST" && req.url.startsWith("/api/payment-request")) {
    try {
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

      const payments = db.push("payments", payment);
      event("payment_requested", { paymentId: payment.id, offer: payment.offer });

      sendJSON(res, 200, {
        ok: true,
        payment,
        total: payments.length
      });
    } catch (error) {
      sendJSON(res, 400, { ok: false, error: error.message });
    }

    return;
  }

  if (req.method === "POST" && req.url.startsWith("/api/payment-confirm")) {
    if (!requireAdmin(req, res)) return;

    try {
      const body = await parseBody(req);
      const paymentId = Number(body.paymentId);

      const payments = db.read("payments");
      const codes = db.read("codes");

      const payment = payments.find(item => Number(item.id) === paymentId);

      if (!payment) {
        sendJSON(res, 404, {
          ok: false,
          error: "Плащането не е намерено."
        });
        return;
      }

      if (payment.status === "paid" && payment.code) {
        sendJSON(res, 200, {
          ok: true,
          payment,
          code: codes.find(item => item.code === payment.code) || null
        });
        return;
      }

      const codeValue = generateUniqueCode();

      const newCode = {
        id: Date.now() + 1,
        code: codeValue,
        status: "unused",
        offer: payment.offer || "Full AI Echo",
        note: `Generated from payment ${payment.id}`,
        deliveryText: `Здравей, плащането е потвърдено. Твоят SoulFlame EchoProfile код е: ${codeValue}. Въведи го в полето за Full Echo, за да отключиш анализа.`,
        createdAt: now(),
        usedAt: null,
        usedBy: null,
        profileId: payment.profile?.id || null,
        paymentId: payment.id
      };

      codes.push(newCode);

      payment.status = "paid";
      payment.flow = ["pending", "paid", "code_generated"];
      payment.code = codeValue;
      payment.deliveryText = newCode.deliveryText;
      payment.paidAt = now();
      payment.confirmedAt = now();

      db.write("codes", codes);
      db.write("payments", payments);

      event("payment_confirmed", { paymentId: payment.id, code: codeValue });

      sendJSON(res, 200, {
        ok: true,
        payment,
        code: newCode
      });
    } catch (error) {
      sendJSON(res, 400, { ok: false, error: error.message });
    }

    return;
  }

  if (req.method === "DELETE" && req.url.startsWith("/api/data")) {
    if (!requireAdmin(req, res)) return;

    db.clear();
    event("data_cleared", { by: "admin" });

    sendJSON(res, 200, {
      ok: true,
      cleared: true
    });

    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log("");
  console.log("SoulFlame EchoProfile V15 Real Product Engine is running.");
  console.log("Open: http://localhost:" + PORT);
  console.log("Mode: " + APP_MODE);
  console.log("Data Mode: " + DATA_MODE);
  console.log("Owner Email: " + OWNER_EMAIL);
  console.log("Admin PIN: " + ADMIN_PIN);
  console.log("");
});
