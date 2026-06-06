const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const APP_NAME = "SoulFlame Twins";
const APP_VERSION = "V67_LOGIN_PHONE_POLISH";
const OWNER_EMAIL = process.env.OWNER_EMAIL || "stere0metal360@gmail.com";
const PORT = process.env.PORT || 3000;
const PAYMENT_LINK_FULL_TWIN = process.env.PAYMENT_LINK_FULL_TWIN || "https://revolut.me/dimitarlambov02?currency=EUR&amount=20&note=Full%20AI%20Twin%20%2B%20your%20email";
const UNLOCK_CODES = (process.env.UNLOCK_CODES || "ECHO-2026-FULL,ECHO-FULL-TWIN,ECHO-MITKO-20").split(",").map(x => x.trim().toUpperCase()).filter(Boolean);

function send(res, status, body, type = "text/html; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(body);
}
function sendJson(res, status, data) { send(res, status, JSON.stringify(data, null, 2), "application/json; charset=utf-8"); }
function readBody(req) {
  return new Promise(resolve => {
    let body = "";
    req.on("data", c => { body += c; if (body.length > 1e6) req.destroy(); });
    req.on("end", () => { try { resolve(body ? JSON.parse(body) : {}); } catch { resolve({}); } });
  });
}
function makeId(prefix = "sf") { return prefix + "_" + crypto.randomBytes(8).toString("hex"); }

function colorFluidChoiceCss() {
  return `
  <style id="colorFluidChoiceScreen">
    #choiceScreen, #choiceScreen *, #loginScreen, #loginScreen * { filter:none !important; }
    #choiceScreen, #loginScreen {
      background:
        radial-gradient(circle at 18% 12%, rgba(124,60,255,.30), transparent 32rem),
        radial-gradient(circle at 84% 74%, rgba(0,234,255,.17), transparent 34rem),
        radial-gradient(circle at 52% 18%, rgba(255,79,243,.12), transparent 28rem),
        #000 !important;
      color:var(--text) !important;
    }
    #choiceScreen .soulLogo, #loginScreen .soulLogo {
      background:
        radial-gradient(circle at 30% 24%, #fff, transparent 15%),
        linear-gradient(135deg, var(--cyan), var(--violet), var(--pink)) !important;
      box-shadow:0 0 54px rgba(124,60,255,.46), 0 0 88px rgba(0,234,255,.16) !important;
      animation:sfLogoFloat 4.8s ease-in-out infinite, sfLogoHue 7s linear infinite;
    }
    #choiceScreen .onboardBrand h1, #loginScreen .loginCard h2 {
      background:linear-gradient(90deg, var(--cyan), #8bb7ff, var(--violet), var(--pink), var(--cyan)) !important;
      background-size:240% 100% !important;
      -webkit-background-clip:text !important;
      background-clip:text !important;
      color:transparent !important;
      animation:sfTextFlow 5.8s ease-in-out infinite, sfFloatSoft 4.4s ease-in-out infinite;
      text-shadow:0 0 34px rgba(124,60,255,.20) !important;
    }
    #choiceScreen .onboardBrand p, #loginScreen .loginCard p { color:#dbe4ff !important; animation:sfFloatSoft 5.2s ease-in-out infinite; }
    #choiceScreen .choiceBox, #loginScreen .loginCard {
      background:
        radial-gradient(circle at 18% 12%, rgba(0,234,255,.20), transparent 36%),
        radial-gradient(circle at 92% 86%, rgba(124,60,255,.24), transparent 35%),
        linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.030)) !important;
      border:1px solid rgba(0,234,255,.22) !important;
      box-shadow:0 28px 90px rgba(0,0,0,.50), inset 0 0 0 1px rgba(255,255,255,.035) !important;
      transform-style:preserve-3d;
      animation:sfCardFloat 6s ease-in-out infinite !important;
    }
    #choiceScreen .choiceBox:nth-child(2) {
      background:
        radial-gradient(circle at 18% 12%, rgba(255,79,243,.22), transparent 36%),
        radial-gradient(circle at 92% 86%, rgba(0,234,255,.18), transparent 35%),
        linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.030)) !important;
      border-color:rgba(255,79,243,.24) !important;
      animation-delay:.9s !important;
    }
    #choiceScreen .choiceBox:hover, #loginScreen .loginCard:hover {
      transform:translateY(-8px) scale(1.012) !important;
      border-color:rgba(0,234,255,.45) !important;
      box-shadow:0 34px 110px rgba(0,0,0,.58), 0 0 60px rgba(124,60,255,.20) !important;
    }
    #choiceScreen .choiceBox::after, #loginScreen .loginCard::after {
      background:linear-gradient(135deg, rgba(124,60,255,.22), rgba(0,234,255,.12), rgba(255,79,243,.18)) !important;
      filter:blur(5px) !important;
      animation:sfOrbDrift 7s ease-in-out infinite;
    }
    #choiceScreen .choiceBox small {
      background:linear-gradient(90deg, var(--cyan), #8bb7ff, var(--pink), var(--cyan)) !important;
      background-size:220% 100% !important;
      -webkit-background-clip:text !important;
      background-clip:text !important;
      color:transparent !important;
      animation:sfTextFlow 4.5s ease-in-out infinite;
    }
    #choiceScreen .choiceBox h2 { color:#fff !important; animation:sfFloatSoft 4.8s ease-in-out infinite; text-shadow:0 0 28px rgba(0,234,255,.10) !important; }
    #choiceScreen .choiceBox p { color:#d7defc !important; }

    #loginScreen .loginCard { position:relative !important; overflow:hidden !important; }
    #loginScreen .loginCard h2 { margin-bottom:10px !important; }
    #loginScreen .loginFields input {
      background:rgba(0,0,0,.42) !important;
      border:1px solid rgba(0,234,255,.18) !important;
      color:#fff !important;
      box-shadow:inset 0 0 0 1px rgba(255,255,255,.025) !important;
    }
    #loginScreen .loginFields input:focus {
      border-color:rgba(0,234,255,.50) !important;
      box-shadow:0 0 28px rgba(0,234,255,.11), inset 0 0 0 1px rgba(255,255,255,.04) !important;
    }
    #loginScreen .loginBtn {
      background:linear-gradient(135deg,var(--violet),#3f8dff,var(--pink)) !important;
      box-shadow:0 18px 46px rgba(124,60,255,.34) !important;
      color:white !important;
    }

    @media (max-width: 720px) {
      #choiceScreen, #loginScreen { min-height:100svh !important; place-items:start center !important; padding:28px 14px 18px !important; overflow-y:auto !important; }
      #choiceScreen .onboardShell { width:100% !important; max-width:430px !important; gap:18px !important; }
      #choiceScreen .onboardBrand { gap:9px !important; }
      #choiceScreen .soulLogo { width:62px !important; height:62px !important; border-radius:22px !important; }
      #choiceScreen .onboardBrand h1 { font-size:clamp(42px,13vw,58px) !important; letter-spacing:-2px !important; line-height:.92 !important; }
      #choiceScreen .onboardBrand p { font-size:16px !important; line-height:1.35 !important; max-width:320px !important; margin:0 auto !important; }
      #choiceScreen .choiceGrid { grid-template-columns:1fr !important; gap:12px !important; margin-top:4px !important; }
      #choiceScreen .choiceBox { min-height:178px !important; border-radius:28px !important; padding:22px 22px 20px !important; }
      #choiceScreen .choiceBox small { margin-bottom:26px !important; font-size:12px !important; letter-spacing:1.8px !important; }
      #choiceScreen .choiceBox h2 { font-size:clamp(34px,10vw,44px) !important; letter-spacing:-1.5px !important; margin-bottom:9px !important; }
      #choiceScreen .choiceBox p { font-size:16px !important; line-height:1.45 !important; max-width:295px !important; }
      #choiceScreen .choiceBox::after { width:160px !important; height:160px !important; right:-56px !important; bottom:-60px !important; }

      #loginScreen { justify-content:center !important; align-items:center !important; padding:18px 14px !important; }
      #loginScreen .loginCard {
        width:min(390px, calc(100vw - 28px)) !important;
        border-radius:30px !important;
        padding:24px 20px 22px !important;
        margin:0 auto !important;
      }
      #loginScreen .soulLogo {
        width:58px !important;
        height:58px !important;
        border-radius:21px !important;
        margin:0 auto 18px !important;
      }
      #loginScreen .loginCard h2 {
        font-size:clamp(38px,12vw,54px) !important;
        text-align:center !important;
        letter-spacing:-2px !important;
        line-height:.92 !important;
      }
      #loginScreen .loginCard p {
        text-align:center !important;
        font-size:15px !important;
        line-height:1.42 !important;
        margin-bottom:18px !important;
      }
      #loginScreen .loginFields { gap:10px !important; }
      #loginScreen .loginFields input {
        border-radius:18px !important;
        padding:14px 15px !important;
        font-size:15.5px !important;
      }
      #loginScreen .loginBtn {
        margin-top:14px !important;
        border-radius:18px !important;
        padding:15px 16px !important;
        font-size:16px !important;
      }
    }

    @media (max-width: 380px) {
      #choiceScreen { padding-top:20px !important; }
      #choiceScreen .onboardShell { gap:14px !important; }
      #choiceScreen .soulLogo { width:54px !important; height:54px !important; }
      #choiceScreen .onboardBrand h1 { font-size:40px !important; }
      #choiceScreen .onboardBrand p { font-size:14px !important; }
      #choiceScreen .choiceBox { min-height:160px !important; padding:18px !important; }
      #choiceScreen .choiceBox small { margin-bottom:20px !important; font-size:11px !important; }
      #choiceScreen .choiceBox h2 { font-size:34px !important; }
      #choiceScreen .choiceBox p { font-size:14.5px !important; }
      #loginScreen .loginCard { padding:20px 17px !important; border-radius:26px !important; }
      #loginScreen .soulLogo { width:52px !important; height:52px !important; margin-bottom:14px !important; }
      #loginScreen .loginCard h2 { font-size:38px !important; }
      #loginScreen .loginCard p { font-size:14px !important; margin-bottom:14px !important; }
      #loginScreen .loginFields input { padding:13px 14px !important; }
    }

    @keyframes sfTextFlow { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
    @keyframes sfCardFloat { 0%,100%{translate:0 0} 50%{translate:0 -7px} }
    @keyframes sfFloatSoft { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
    @keyframes sfLogoFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(2deg)} }
    @keyframes sfLogoHue { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }
    @keyframes sfOrbDrift { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-18px,-14px) scale(1.08)} }
  </style>`;
}

function cleanAndInject(html) {
  html = html.replace(/<style id="bwChoiceScreenOnly">[\s\S]*?<\/style>/g, "");
  html = html.replace(/<style id="forceBlackWhiteSoulFlame">[\s\S]*?<\/style>/g, "");
  html = html.replace(/<style id="soulflameBlackWhiteTheme">[\s\S]*?<\/style>/g, "");
  html = html.replace(/<style id="colorFluidChoiceScreen">[\s\S]*?<\/style>/g, "");
  if (html.includes("</head>")) html = html.replace("</head>", colorFluidChoiceCss() + "\n</head>");
  return html;
}

function readIndex() {
  const file = path.join(__dirname, "index.html");
  if (fs.existsSync(file)) return cleanAndInject(fs.readFileSync(file, "utf8"));
  return "<!doctype html><html><body><h1>SoulFlame index.html missing</h1></body></html>";
}

function soulmatchPage() {
  return `<!doctype html><html lang="bg"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SoulMatch Metaverse</title><style>body{margin:0;background:#050611;color:white;font-family:Arial,sans-serif;padding:24px}main{width:min(1120px,94vw);margin:auto;display:grid;gap:18px}.hero,.card{border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.055);border-radius:28px;padding:28px}h1{font-size:clamp(42px,8vw,86px);margin:0;background:linear-gradient(90deg,#00eaff,#7c3cff,#ff4ff3);-webkit-background-clip:text;color:transparent}p{color:#b9c3e8;line-height:1.6}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}a{color:white}.btn{display:inline-flex;border-radius:999px;padding:12px 16px;background:linear-gradient(135deg,#7c3cff,#3f8dff);text-decoration:none;font-weight:900}@media(max-width:800px){.grid{grid-template-columns:1fr}}</style></head><body><main><a class="btn" href="/">← Back</a><section class="hero"><h1>SoulMatch by SoulFlame</h1><p>Социална страница като Facebook/Instagram за AI Twin профили, match проценти и Twin разговори.</p></section><section class="grid"><div class="card"><h2>EchoProfile Match</h2><p>Личност, ценности, комуникация.</p></div><div class="card"><h2>Metaverse Chat</h2><p>Стаи, хора, профили и feed.</p></div><div class="card"><h2>AI Twin Panel</h2><p>Асистент със съгласие и контрол.</p></div></section></main></body></html>`;
}

function makeFullReport(payload = {}) {
  const twin = payload.twin || {}, user = twin.user || {};
  const name = payload.name || user.name || "SoulFlame User";
  return ["FULL AI TWIN REPORT","","Name: "+name,"","Created by SoulFlame · "+APP_VERSION].join("\n");
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) return send(res, 200, readIndex());
  if (req.method === "GET" && url.pathname === "/soulmatch") return send(res, 200, soulmatchPage());
  if (req.method === "GET" && url.pathname === "/landing") return send(res, 200, `<!doctype html><html><head><title>SoulFlame Landing</title></head><body style="margin:0;background:#050611;color:white;font-family:Arial;display:grid;place-items:center;min-height:100vh"><main><h1>AI Twins by SoulFlame</h1><p>Landing page.</p><a href="/" style="color:white">Back</a></main></body></html>`);
  if (req.method === "GET" && url.pathname === "/admin") return send(res, 200, `<!doctype html><html><body style="margin:0;background:#050611;color:white;font-family:Arial;display:grid;place-items:center;min-height:100vh"><main><h1>SoulFlame Admin</h1><p>${APP_VERSION}</p></main></body></html>`);
  if (req.method === "GET" && url.pathname === "/favicon.ico") { res.writeHead(204); return res.end(); }
  if (req.method === "POST" && url.pathname === "/api/event") return sendJson(res, 200, { ok:true, version:APP_VERSION });
  if (req.method === "POST" && url.pathname === "/api/profile") { const payload = await readBody(req); return sendJson(res, 200, { ok:true, id:makeId("profile"), saved:true, version:APP_VERSION, received:payload }); }
  if (req.method === "POST" && url.pathname === "/api/checkout") return sendJson(res, 200, { ok:true, checkoutId:makeId("checkout"), amount:"20.00 EUR", paymentUrl:PAYMENT_LINK_FULL_TWIN, version:APP_VERSION });
  if (req.method === "POST" && url.pathname === "/api/unlock") { const payload = await readBody(req); const code = String(payload.code || "").trim().toUpperCase(); return sendJson(res, 200, { ok:UNLOCK_CODES.includes(code), code, unlocked:UNLOCK_CODES.includes(code), version:APP_VERSION }); }
  if (req.method === "POST" && url.pathname === "/api/full-report") { const payload = await readBody(req); return sendJson(res, 200, { ok:true, reportId:makeId("report"), report:makeFullReport(payload), version:APP_VERSION }); }
  return sendJson(res, 404, { ok:false, error:"Not found", path:url.pathname, version:APP_VERSION });
});
server.listen(PORT, () => console.log(`${APP_NAME} ${APP_VERSION} running on port ${PORT}`));
