const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const APP_NAME = "SoulFlame Twins";
const APP_VERSION = "V56_PERSONAL_BUSINESS_LOGIN_INTRO";
const OWNER_EMAIL = process.env.OWNER_EMAIL || "stere0metal360@gmail.com";
const PORT = process.env.PORT || 3000;

const PAYMENT_LINK_FULL_TWIN =
  process.env.PAYMENT_LINK_FULL_TWIN ||
  "https://revolut.me/dimitarlambov02?currency=EUR&amount=20&note=Full%20AI%20Twin%20%2B%20your%20email";

const UNLOCK_CODES = (process.env.UNLOCK_CODES || "ECHO-2026-FULL,ECHO-FULL-TWIN,ECHO-MITKO-20")
  .split(",")
  .map(x => x.trim().toUpperCase())
  .filter(Boolean);

function send(res, status, body, type = "text/html; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function sendJson(res, status, data) {
  send(res, status, JSON.stringify(data, null, 2), "application/json; charset=utf-8");
}

function readBody(req) {
  return new Promise(resolve => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1e6) req.destroy();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function readIndex() {
  const file = path.join(__dirname, "index.html");
  if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");

  return "<!doctype html><html><body><h1>SoulFlame index.html missing</h1></body></html>";
}

function makeId(prefix = "sf") {
  return prefix + "_" + crypto.randomBytes(8).toString("hex");
}

function makeFullReport(payload = {}) {
  const twin = payload.twin || {};
  const user = twin.user || {};
  const name = payload.name || user.name || "SoulFlame User";
  const mode = user.mode || "personal";
  const selectedType = user.selectedType || "Личен";
  const profile = twin.profile || "Future Architect + Quantum System Builder";

  return [
    "FULL AI TWIN REPORT",
    "",
    "Name: " + name,
    "Type: " + selectedType,
    "Mode: " + mode,
    "Profile: " + profile,
    "",
    "Core reading:",
    name + " има Twin ядро, което може да се развива през EchoProfile, Memory, Future Twin, SoulMatch и DAVID.",
    "",
    "Strong signals:",
    twin.mainTrait ? "- Main trait: " + twin.mainTrait : "- Main trait: vision",
    twin.secondTrait ? "- Second trait: " + twin.secondTrait : "- Second trait: logic",
    "",
    "Next steps:",
    "1. Попълни EchoProfile.",
    "2. Добави Memory.",
    "3. Активирай Work/Future режим.",
    "4. Свържи SoulMatch.",
    "5. После DAVID управлява системата.",
    "",
    "Created by SoulFlame · " + APP_VERSION
  ].join("\n");
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
    return send(res, 200, readIndex());
  }

  if (req.method === "GET" && url.pathname === "/landing") {
    return send(res, 200, `
      <!doctype html>
      <html lang="bg">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>SoulFlame Landing</title>
        <style>
          body{margin:0;background:#050611;color:white;font-family:Arial,sans-serif;display:grid;place-items:center;min-height:100vh}
          main{width:min(900px,92vw);padding:40px;border:1px solid rgba(255,255,255,.12);border-radius:28px;background:rgba(255,255,255,.05)}
          h1{font-size:54px;margin:0 0 16px;background:linear-gradient(90deg,#00eaff,#7c3cff,#ff4ff3);-webkit-background-clip:text;color:transparent}
          p{color:#b9c3e8;line-height:1.6;font-size:18px}
          a{color:white}
        </style>
      </head>
      <body>
        <main>
          <h1>AI Twins by SoulFlame</h1>
          <p>Личен или бизнес AI Twin, който започва с избор, вход, плавно създаване и Echo Chat.</p>
          <p><a href="/">← Back to app</a></p>
        </main>
      </body>
      </html>
    `);
  }

  if (req.method === "GET" && url.pathname === "/admin") {
    return send(res, 200, `
      <!doctype html>
      <html lang="bg">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>SoulFlame Admin</title>
        <style>
          body{margin:0;background:#050611;color:white;font-family:Arial,sans-serif;display:grid;place-items:center;min-height:100vh}
          main{width:min(900px,92vw);padding:40px;border:1px solid rgba(255,255,255,.12);border-radius:28px;background:rgba(255,255,255,.05)}
          h1{font-size:48px;margin:0 0 16px}
          p{color:#b9c3e8}
          code{background:#111;padding:4px 8px;border-radius:8px}
        </style>
      </head>
      <body>
        <main>
          <h1>SoulFlame Admin</h1>
          <p>Version: <code>${APP_VERSION}</code></p>
          <p>Owner: <code>${OWNER_EMAIL}</code></p>
          <p>Admin panel placeholder. Следващ слой: профили, плащания, unlock codes, analytics.</p>
        </main>
      </body>
      </html>
    `);
  }

  if (req.method === "GET" && url.pathname === "/favicon.ico") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "POST" && url.pathname === "/api/event") {
    const payload = await readBody(req);
    console.log("event", JSON.stringify({
      id: makeId("evt"),
      time: new Date().toISOString(),
      type: payload.type || "unknown",
      page: payload.page || "",
      version: APP_VERSION
    }));
    return sendJson(res, 200, { ok: true, version: APP_VERSION });
  }

  if (req.method === "POST" && url.pathname === "/api/profile") {
    const payload = await readBody(req);
    const id = makeId("profile");

    console.log("profile", JSON.stringify({
      id,
      time: new Date().toISOString(),
      user: payload.user || null,
      profile: payload.profile || null,
      version: APP_VERSION
    }));

    return sendJson(res, 200, {
      ok: true,
      id,
      saved: true,
      storage: "runtime-log-demo",
      version: APP_VERSION,
      received: payload
    });
  }

  if (req.method === "POST" && url.pathname === "/api/checkout") {
    const payload = await readBody(req);
    const checkoutId = makeId("checkout");

    console.log("checkout", JSON.stringify({
      id: checkoutId,
      amount: payload.amount || "20.00 EUR",
      user: payload.user || null,
      time: new Date().toISOString()
    }));

    return sendJson(res, 200, {
      ok: true,
      checkoutId,
      amount: payload.amount || "20.00 EUR",
      paymentUrl: PAYMENT_LINK_FULL_TWIN,
      note: "Full AI Twin + your email",
      provider: "revolut_manual_checkout",
      version: APP_VERSION
    });
  }

  if (req.method === "POST" && url.pathname === "/api/unlock") {
    const payload = await readBody(req);
    const code = String(payload.code || "").trim().toUpperCase();

    if (!UNLOCK_CODES.includes(code)) {
      return sendJson(res, 200, {
        ok: false,
        error: "Invalid unlock code",
        code,
        hint: "Demo valid codes: ECHO-2026-FULL, ECHO-FULL-TWIN, ECHO-MITKO-20"
      });
    }

    return sendJson(res, 200, {
      ok: true,
      code,
      unlocked: true,
      unlockedAt: new Date().toISOString(),
      version: APP_VERSION
    });
  }

  if (req.method === "POST" && url.pathname === "/api/full-report") {
    const payload = await readBody(req);
    return sendJson(res, 200, {
      ok: true,
      reportId: makeId("report"),
      report: makeFullReport(payload),
      version: APP_VERSION
    });
  }

  return sendJson(res, 404, {
    ok: false,
    error: "Not found",
    path: url.pathname,
    version: APP_VERSION
  });
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} ${APP_VERSION} running on port ${PORT}`);
});
