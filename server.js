const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const APP_NAME = "SoulFlame Twins";
const APP_VERSION = "V62_METAVERSE_BUTTON_SOULMATCH_PAGE";
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

const projects = [
  ["AI Echo / EchoProfile",65,"Психологически профил, scoring, личностни, работни и емоционални сигнали.","Архитектура, начални въпроси, логика за Twin Core и връзка към SoulMatch.","Реални EchoProfile въпроси + scoring резултат + запис към Memory."],
  ["AI Twin",45,"Личен/бизнес Twin, поздрав по име, Memory, Work Twin, Future Twin, Voice/Avatar слоеве.","Mini Twin, Full Twin checkout/unlock, intro flow Личен/Бизнес + вход.","Да вържем GPT API + Supabase Memory + реален персонален стил."],
  ["SoulMatch",25,"Съвместимост между хора чрез EchoProfile, ценности, комуникация и red/green flags.","Концепция, логика за съвместимост и място в SoulFlame света.","Match алгоритъм: 5-10 психологически категории + процент съвместимост."],
  ["Twins World",15,"Свят от дигитални двойници, публични профили, AR EchoCards, Twin marketplace.","Име, структура и място като четвърти свят на SoulFlame.","Публичен Twin профил + AR EchoCard demo."],
  ["DAVID",10,"Главен AI агент и бъдеща операционна система над EchoProfile, Twin, SoulMatch и Twins World.","Роля, философия, архитектурна позиция и дългосрочна посока.","DAVID Command Center: задачи, решения, памет и контрол над модулите."]
];

function extraCss() {
  return `
    .projectsDrawerBox{border:1px solid rgba(255,255,255,.13);background:rgba(0,0,0,.20);border-radius:24px;padding:16px;display:grid;gap:12px}.projectsDrawerBox h2{margin:0;font-size:24px;letter-spacing:-.8px}.projectsDrawerBox>p{color:var(--soft);line-height:1.5;margin:0}.drawerProject{border:1px solid rgba(255,255,255,.11);background:rgba(255,255,255,.045);border-radius:18px;padding:13px;display:grid;gap:9px}.drawerProjectTop{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.drawerProjectTop b{font-size:15px}.drawerProjectTop span{color:var(--soft);font-size:12px;line-height:1.35}.percentBadge{color:#071017;background:linear-gradient(135deg,#23e6a8,#00eaff);padding:7px 10px;border-radius:999px;font-weight:950;white-space:nowrap;font-size:12px}.progressTrack{height:10px;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.10)}.progressFill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--cyan),var(--violet),var(--pink));box-shadow:0 0 24px rgba(124,60,255,.28)}.drawerProjectMeta{display:grid;grid-template-columns:1fr;gap:7px}.drawerProjectMeta div{border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.13);border-radius:13px;padding:9px;color:var(--soft);font-size:12px;line-height:1.4}.drawerProjectMeta strong{display:block;color:var(--text);margin-bottom:3px}.updateHint{color:var(--muted);font-size:12px;line-height:1.5;margin:0}
    .metaverseBottom{display:grid;gap:16px}.metaHero{display:grid;grid-template-columns:1.05fr .95fr;gap:16px;align-items:stretch}.metaBig{border:1px solid rgba(255,255,255,.13);background:radial-gradient(circle at 16% 8%,rgba(0,234,255,.12),transparent 34%),linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.035));border-radius:28px;padding:24px}.metaBig h2{font-size:clamp(34px,5vw,62px);line-height:.95;margin:0 0 12px;letter-spacing:-2px;background:linear-gradient(90deg,var(--cyan),#8bb7ff,var(--violet),var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent}.metaBig p{color:var(--soft);line-height:1.65}.metaChatPreview{display:grid;gap:10px;margin-top:16px}.metaBubble{width:min(82%,720px);border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.055);border-radius:20px;padding:14px;color:var(--soft);line-height:1.5}.metaBubble.user{justify-self:end;background:linear-gradient(135deg,rgba(124,60,255,.35),rgba(0,234,255,.10));color:#eef5ff}.metaActionRow{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.metaActionRow a,.metaActionRow button{border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.08);color:var(--text);border-radius:999px;padding:11px 14px;font-weight:950;cursor:pointer;text-decoration:none}.metaActionRow .primary{border:0;background:linear-gradient(135deg,var(--violet),#3f8dff)}.metaVisual{position:relative;overflow:hidden;min-height:420px;border:1px solid rgba(255,255,255,.13);border-radius:30px;background:radial-gradient(circle at 40% 20%,rgba(0,234,255,.24),transparent 26%),radial-gradient(circle at 80% 72%,rgba(255,79,243,.20),transparent 32%),linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.03));box-shadow:0 26px 80px rgba(0,0,0,.30);padding:22px;display:grid;align-content:end}.metaVisual:before{content:"";position:absolute;inset:20px;border-radius:28px;background:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:38px 38px;mask-image:radial-gradient(circle at center,black,transparent 72%)}.metaPlanet{position:absolute;width:180px;height:180px;border-radius:50%;right:34px;top:34px;background:radial-gradient(circle at 30% 25%,#fff,transparent 12%),linear-gradient(135deg,#00eaff,#7c3cff,#ff4ff3);box-shadow:0 0 70px rgba(124,60,255,.45)}.metaOrbit{position:absolute;width:320px;height:160px;border:1px solid rgba(255,255,255,.20);border-radius:50%;right:-20px;top:72px;transform:rotate(-18deg)}.metaVisualText{position:relative;z-index:2}.metaVisualText h3{font-size:clamp(28px,4vw,46px);line-height:.96;margin:0 0 10px;letter-spacing:-1.6px}.metaVisualText p{color:var(--soft);line-height:1.55;margin:0 0 16px}.metaVisualBtn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:14px 18px;font-weight:950;color:white;text-decoration:none;background:linear-gradient(135deg,var(--violet),#3f8dff,var(--pink));box-shadow:0 18px 45px rgba(124,60,255,.30)}.soulmatchPage{min-height:100vh;background:radial-gradient(circle at 18% 10%,rgba(0,234,255,.16),transparent 32rem),radial-gradient(circle at 80% 20%,rgba(255,79,243,.13),transparent 34rem),#050611;color:white;font-family:Arial,sans-serif;padding:34px}.soulmatchShell{width:min(1180px,94vw);margin:0 auto;display:grid;gap:18px}.soulmatchHero{border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.055);border-radius:32px;padding:34px}.soulmatchHero h1{font-size:clamp(42px,7vw,86px);line-height:.92;margin:0 0 14px;background:linear-gradient(90deg,#00eaff,#8bb7ff,#7c3cff,#ff4ff3);-webkit-background-clip:text;color:transparent}.soulmatchHero p{color:#b9c3e8;font-size:18px;line-height:1.6}.soulmatchGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.soulmatchCard{border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.045);border-radius:24px;padding:20px}.soulmatchCard p{color:#b9c3e8;line-height:1.55}.backHome{display:inline-flex;width:max-content;border-radius:999px;padding:13px 17px;background:linear-gradient(135deg,#7c3cff,#3f8dff);color:white;text-decoration:none;font-weight:900}@media(max-width:900px){.metaHero,.soulmatchGrid{grid-template-columns:1fr}.drawerProjectTop{display:grid}.percentBadge{width:max-content}.metaVisual{min-height:340px}}
  `;
}

function projectsDrawerBox() {
  const rows = projects.map(([n,p,d,done,next]) => `<div class="drawerProject"><div class="drawerProjectTop"><div><b>${n}</b><br><span>${d}</span></div><div class="percentBadge">${p}%</div></div><div class="progressTrack"><div class="progressFill" style="width:${p}%"></div></div><div class="drawerProjectMeta"><div><strong>Създадено</strong>${done}</div><div><strong>Следващ ход</strong>${next}</div></div></div>`).join("");
  return `<div class="projectsDrawerBox" id="soulflame-projects"><h2>Проекти на SoulFlame</h2><p>Тук следим идеите, процента, създаденото и следващия ход.</p>${rows}<p class="updateHint">Команда: "ъпдейтни проекта" → сменяме процента и статуса.</p></div>`;
}

function bottomMetaverseSoulMatch() {
  return `<section class="below"><div class="sectionCard" id="metaverse-soulmatch"><div class="metaverseBottom"><div class="metaHero"><div class="metaBig"><h2>Metaverse / SoulMatch</h2><p>Това е социалният слой под чата: Twin свят като Facebook chat, където хора, профили и AI двойници ще се свързват чрез EchoProfile, SoulMatch и Memory.</p><div class="metaChatPreview"><div class="metaBubble">SoulFlame Metaverse: виждаш хора, Twin профили, стаи и съвместимост.</div><div class="metaBubble user">SoulMatch: намира подходящи хора по EchoProfile, ценности и поведение.</div><div class="metaBubble">AI Twin: помага в разговора, но само със съгласие и контрол.</div></div><div class="metaActionRow"><a class="primary" href="/soulmatch">Open SoulMatch</a><button onclick="window.scrollTo({top:0,behavior:'smooth'})">Back to chat</button></div></div><div class="metaVisual"><div class="metaPlanet"></div><div class="metaOrbit"></div><div class="metaVisualText"><h3>Twin Metaverse</h3><p>Отвори SoulMatch страницата и виж бъдещия социален свят на AI Twin-овете.</p><a class="metaVisualBtn" href="/soulmatch">Metaverse</a></div></div></div></div></div></section>`;
}

function forceLoginScript() {
  return `<script id="restoreLoginFlow">(function(){window.addEventListener('load',function(){try{localStorage.removeItem('soulflame_v56_profile');}catch(e){}setTimeout(function(){if(typeof showOnly==='function'){showOnly('choiceScreen');}var m=document.getElementById('messages');if(m)m.innerHTML='';},80);});})();</script>`;
}

function cleanAndInject(html) {
  if (html.includes("</style>")) html = html.replace("</style>", extraCss() + "\n</style>");
  html = html.replace(/<section class="below">[\s\S]*?<\/section>\s*<\/section>\s*<script>/, bottomMetaverseSoulMatch() + "\n</section>\n\n<script>");
  if (!html.includes('id="metaverse-soulmatch"') && html.includes("<script>")) html = html.replace("<script>", bottomMetaverseSoulMatch() + "\n<script>");
  if (!html.includes('class="projectsDrawerBox"') && html.includes('<div class="formCard" id="create">')) html = html.replace('<div class="formCard" id="create">', projectsDrawerBox() + '\n\n        <div class="formCard" id="create">');
  if (!html.includes('id="restoreLoginFlow"')) html = html.replace("</body>", forceLoginScript() + "\n</body>");
  return html;
}

function readIndex() {
  const file = path.join(__dirname, "index.html");
  if (fs.existsSync(file)) return cleanAndInject(fs.readFileSync(file, "utf8"));
  return "<!doctype html><html><body><h1>SoulFlame index.html missing</h1></body></html>";
}

function soulmatchPage() {
  return `<!doctype html><html lang="bg"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SoulMatch Metaverse</title><style>${extraCss()}</style></head><body class="soulmatchPage"><main class="soulmatchShell"><a class="backHome" href="/">← Back to SoulFlame</a><section class="soulmatchHero"><h1>SoulMatch Metaverse</h1><p>Тук ще бъде социалната страница: хора, AI Twin профили, чат стаи, съвместимост и бъдещ Facebook-like слой за SoulFlame.</p></section><section class="soulmatchGrid"><div class="soulmatchCard"><h2>EchoProfile Match</h2><p>Сравнява личност, ценности, комуникация, емоции и цели.</p></div><div class="soulmatchCard"><h2>Metaverse Chat</h2><p>Стаи, приятели, Twin разговори и социален feed.</p></div><div class="soulmatchCard"><h2>AI Twin Panel</h2><p>Активният Twin помага в разговора, но само със съгласие и контрол.</p></div></section></main></body></html>`;
}

function makeFullReport(payload = {}) {
  const twin = payload.twin || {}, user = twin.user || {};
  const name = payload.name || user.name || "SoulFlame User";
  const mode = user.mode || "personal";
  const selectedType = user.selectedType || "Личен";
  const profile = twin.profile || "Future Architect + Quantum System Builder";
  return ["FULL AI TWIN REPORT","","Name: "+name,"Type: "+selectedType,"Mode: "+mode,"Profile: "+profile,"","Core reading:",name+" има Twin ядро, което може да се развива през EchoProfile, Memory, Future Twin, SoulMatch и DAVID.","","Next steps:","1. Попълни EchoProfile.","2. Добави Memory.","3. Активирай Work/Future режим.","4. Свържи SoulMatch.","5. После DAVID управлява системата.","","Created by SoulFlame · "+APP_VERSION].join("\n");
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) return send(res, 200, readIndex());
  if (req.method === "GET" && url.pathname === "/soulmatch") return send(res, 200, soulmatchPage());
  if (req.method === "GET" && url.pathname === "/landing") return send(res, 200, `<!doctype html><html lang="bg"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SoulFlame Landing</title><style>body{margin:0;background:#050611;color:white;font-family:Arial,sans-serif;display:grid;place-items:center;min-height:100vh}main{width:min(900px,92vw);padding:40px;border:1px solid rgba(255,255,255,.12);border-radius:28px;background:rgba(255,255,255,.05)}h1{font-size:54px;margin:0 0 16px;background:linear-gradient(90deg,#00eaff,#7c3cff,#ff4ff3);-webkit-background-clip:text;color:transparent}p{color:#b9c3e8;line-height:1.6;font-size:18px}a{color:white}</style></head><body><main><h1>AI Twins by SoulFlame</h1><p>Личен или бизнес AI Twin, който започва с избор, вход, плавно създаване и Echo Chat.</p><p><a href="/">← Back to app</a></p></main></body></html>`);
  if (req.method === "GET" && url.pathname === "/admin") return send(res, 200, `<!doctype html><html lang="bg"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SoulFlame Admin</title><style>body{margin:0;background:#050611;color:white;font-family:Arial,sans-serif;display:grid;place-items:center;min-height:100vh}main{width:min(900px,92vw);padding:40px;border:1px solid rgba(255,255,255,.12);border-radius:28px;background:rgba(255,255,255,.05)}h1{font-size:48px;margin:0 0 16px}p{color:#b9c3e8}code{background:#111;padding:4px 8px;border-radius:8px}</style></head><body><main><h1>SoulFlame Admin</h1><p>Version: <code>${APP_VERSION}</code></p><p>Owner: <code>${OWNER_EMAIL}</code></p><p>Admin panel placeholder.</p></main></body></html>`);
  if (req.method === "GET" && url.pathname === "/favicon.ico") { res.writeHead(204); return res.end(); }
  if (req.method === "POST" && url.pathname === "/api/event") { const payload = await readBody(req); console.log("event", JSON.stringify({ id: makeId("evt"), time: new Date().toISOString(), type: payload.type || "unknown", page: payload.page || "", version: APP_VERSION })); return sendJson(res, 200, { ok: true, version: APP_VERSION }); }
  if (req.method === "POST" && url.pathname === "/api/profile") { const payload = await readBody(req); const id = makeId("profile"); return sendJson(res, 200, { ok: true, id, saved: true, storage: "runtime-log-demo", version: APP_VERSION, received: payload }); }
  if (req.method === "POST" && url.pathname === "/api/checkout") { const payload = await readBody(req); const checkoutId = makeId("checkout"); return sendJson(res, 200, { ok: true, checkoutId, amount: payload.amount || "20.00 EUR", paymentUrl: PAYMENT_LINK_FULL_TWIN, note: "Full AI Twin + your email", provider: "revolut_manual_checkout", version: APP_VERSION }); }
  if (req.method === "POST" && url.pathname === "/api/unlock") { const payload = await readBody(req); const code = String(payload.code || "").trim().toUpperCase(); if (!UNLOCK_CODES.includes(code)) return sendJson(res, 200, { ok: false, error: "Invalid unlock code", code }); return sendJson(res, 200, { ok: true, code, unlocked: true, unlockedAt: new Date().toISOString(), version: APP_VERSION }); }
  if (req.method === "POST" && url.pathname === "/api/full-report") { const payload = await readBody(req); return sendJson(res, 200, { ok: true, reportId: makeId("report"), report: makeFullReport(payload), version: APP_VERSION }); }
  return sendJson(res, 404, { ok: false, error: "Not found", path: url.pathname, version: APP_VERSION });
});
server.listen(PORT, () => console.log(`${APP_NAME} ${APP_VERSION} running on port ${PORT}`));
