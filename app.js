const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const VERSION = "V2_UNIFIED_WORKING_SITE";

app.disable("x-powered-by");
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

app.use((req, res, next) => {
  res.setHeader("X-SoulFlame-Version", VERSION);
  next();
});

function readJson(rel, fallback) {
  try {
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(rel, data) {
  const file = path.join(ROOT, rel);
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

function appendJson(rel, item) {
  const list = readJson(rel, []);
  const saved = {
    id: "sf_" + Date.now() + "_" + Math.random().toString(16).slice(2),
    createdAt: new Date().toISOString(),
    ...item
  };
  list.push(saved);
  writeJson(rel, list);
  return saved;
}

function normalizeTwin(profile, index) {
  const raw = profile.raw || profile.profileRaw || profile;
  const user = profile.user || raw.user || {};
  const echo = profile.echo || raw.echo || {};
  const scores = echo.score || profile.scores || raw.scores || {};
  const name = user.name || profile.name || raw.name || "Unknown Twin";
  const instagram = user.instagram || profile.instagram || raw.instagram || profile.contact || raw.contact || "";
  const twinType = profile.twinType || raw.twinType || profile.goal || raw.goal || "AI Twin";
  const echoType = echo.echoType || profile.echoType || profile.main_trait || raw.main_trait || raw.profile || "Not profiled";
  const compatibility = echo.compatibility || raw.compatibility || profile.compatibility || 0;
  const level = echo.level || profile.level || raw.level || Math.max(1, Math.min(10, Math.round(Number(compatibility || 10) / 10)));
  return {
    id: profile.id || raw.id || "twin_" + index,
    name,
    instagram,
    contact: user.contact || profile.contact || raw.contact || "",
    twinType,
    echoType,
    compatibility,
    level,
    scores,
    summary: echo.summary || profile.summary || profile.mini_report || raw.mini_report || profile.report || "",
    createdAt: profile.createdAt || raw.createdAt || "",
    raw
  };
}

function isMine(twin) {
  const txt = JSON.stringify(twin).toLowerCase();
  return ["dimitar", "mitko", "stere0metal360"].some(k => txt.includes(k));
}

function orderTwins(twins) {
  return [...twins].sort((a, b) => {
    const am = isMine(a) ? 0 : 1;
    const bm = isMine(b) ? 0 : 1;
    if (am !== bm) return am - bm;
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });
}

function matchScore(a, b) {
  const av = a.scores || {};
  const bv = b.scores || {};
  const diff =
    Math.abs(Number(av.A || 0) - Number(bv.A || 0)) +
    Math.abs(Number(av.AV || 0) - Number(bv.AV || 0)) +
    Math.abs(Number(av.S || 0) - Number(bv.S || 0)) +
    Math.abs(Number(av.D || 0) - Number(bv.D || 0));
  return Math.max(35, Math.min(99, Math.round(94 - diff * 3)));
}

function buildSystem() {
  const profiles = readJson("data/profiles.local.json", []);
  const events = readJson("data/events.local.json", []);
  const connectors = readJson("data/connectors.local.json", {});
  const payments = readJson("data/payments.local.json", []);
  const connections = readJson("data/twin_connections.local.json", []);
  const conversations = readJson("data/twin_conversations.local.json", []);
  const twins = orderTwins(profiles.map(normalizeTwin)).map(twin => {
    const hasEcho = Boolean(twin.echoType && twin.echoType !== "Not profiled");
    const relatedPayments = payments.filter(p => JSON.stringify(p).toLowerCase().includes(String(twin.name || "").toLowerCase()));
    const paid = relatedPayments.some(p => p.paid === true || String(p.status || "").toLowerCase() === "paid");
    let health = 20;
    if (twin.raw) health += 20;
    if (hasEcho) health += 25;
    if (Object.keys(connectors).length) health += 10;
    if (paid) health += 10;
    if (events.length) health += 10;
    health = Math.max(0, Math.min(100, health));
    return {
      ...twin,
      isMine: isMine(twin),
      paid,
      health: {
        score: health,
        label: health >= 85 ? "Excellent" : health >= 65 ? "Good" : health >= 45 ? "Medium" : "Weak",
        factors: {
          memory: Boolean(twin.raw),
          echoProfile: hasEcho,
          connectors: Object.keys(connectors).length > 0,
          payments: paid,
          events: events.length > 0
        }
      },
      paymentStatus: {
        paid,
        totalPaid: relatedPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0),
        currency: relatedPayments[0]?.currency || "EUR",
        payments: relatedPayments
      }
    };
  });
  const myTwin = twins.filter(t => t.isMine);
  const otherTwins = twins.filter(t => !t.isMine);
  const matchMatrix = twins.map(a => ({
    twinId: a.id,
    name: a.name,
    instagram: a.instagram,
    isMine: a.isMine,
    bestMatches: twins
      .filter(b => b.id !== a.id)
      .map(b => ({ twinId: b.id, name: b.name, instagram: b.instagram, score: matchScore(a, b), paid: b.paid }))
      .sort((x, y) => y.score - x.score)
      .slice(0, 10)
  }));
  const globalHealth = twins.length ? Math.round(twins.reduce((s, t) => s + t.health.score, 0) / twins.length) : 0;
  return {
    ok: true,
    version: VERSION,
    globalHealth: {
      score: globalHealth,
      label: globalHealth >= 85 ? "Excellent global health" : globalHealth >= 65 ? "Good global health" : globalHealth >= 45 ? "Medium global health" : "Weak global health"
    },
    infrastructure: {
      localProfiles: profiles.length,
      localEvents: events.length,
      localConnectors: Object.keys(connectors).length,
      localPayments: payments.length,
      localConnections: connections.length,
      localConversations: conversations.length,
      time: new Date().toISOString()
    },
    stats: {
      totalTwins: twins.length,
      myTwinCount: myTwin.length,
      otherTwinsCount: otherTwins.length,
      payments: payments.length,
      connections: connections.length,
      conversations: conversations.length,
      events: events.length
    },
    myTwin: myTwin.length ? myTwin : (twins[0] ? [twins[0]] : []),
    otherTwins,
    allTwinsOrdered: twins,
    twins,
    payments,
    connections,
    conversations,
    matchMatrix,
    raw: { connectors, recentEvents: events.slice(-120) }
  };
}

function sendHtml(res, rel) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) return res.status(404).send("Missing file: " + rel);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.sendFile(file);
}

app.get("/api/health", (req, res) => {
  const s = buildSystem();
  res.json({ ok: true, version: VERSION, infrastructure: s.infrastructure, globalHealth: s.globalHealth });
});

app.get("/api/v91/health", (req, res) => {
  const s = buildSystem();
  res.json({ ok: true, version: VERSION, globalHealth: s.globalHealth, infrastructure: s.infrastructure, twins: s.twins });
});

app.get("/api/v91/system", (req, res) => {
  res.json(buildSystem());
});

app.post("/api/event", (req, res) => {
  const body = req.body || {};
  const event = appendJson("data/events.local.json", { type: body.type || "event", page: body.page || "unknown", payload: body.payload || body });
  res.json({ ok: true, version: VERSION, event });
});

app.post("/api/profile", (req, res) => {
  const body = req.body || {};
  const saved = appendJson("data/profiles.local.json", {
    user: body.user || {},
    name: body.name || body.user?.name || "",
    instagram: body.instagram || body.user?.instagram || body.contact || body.user?.contact || "",
    contact: body.contact || body.user?.contact || "",
    twinType: body.twinType || body.user?.selectedType || body.mode || "AI Twin",
    echo: body.echo || null,
    answers: body.answers || {},
    raw: body
  });
  appendJson("data/events.local.json", { type: "profile_saved", profileId: saved.id, payload: saved });
  res.json({ ok: true, version: VERSION, saved, system: buildSystem() });
});

app.post("/api/connectors", (req, res) => {
  const body = req.body || {};
  const key = String(body.instagram || body.name || "local-user").toLowerCase();
  const store = readJson("data/connectors.local.json", {});
  if (!store[key]) store[key] = { key, name: body.name || "", instagram: body.instagram || "", connectors: {}, updatedAt: new Date().toISOString() };
  store[key].connectors[body.connector || "Unknown"] = { status: body.status || "prepared", handle: body.handle || "", updatedAt: new Date().toISOString() };
  store[key].updatedAt = new Date().toISOString();
  writeJson("data/connectors.local.json", store);
  appendJson("data/events.local.json", { type: "connector_update", payload: body });
  res.json({ ok: true, version: VERSION, connectorSystem: store[key] });
});

app.post("/api/v91/payment", (req, res) => {
  const body = req.body || {};
  const payment = appendJson("data/payments.local.json", {
    twinId: body.twinId || "",
    name: body.name || "",
    instagram: body.instagram || "",
    amount: Number(body.amount || 0),
    currency: body.currency || "EUR",
    product: body.product || "SoulFlame product",
    paid: body.paid !== false,
    status: body.status || "paid",
    note: body.note || ""
  });
  appendJson("data/events.local.json", { type: "payment_update", payload: payment });
  res.json({ ok: true, version: VERSION, payment, system: buildSystem() });
});

app.post("/api/v91/connect", (req, res) => {
  const body = req.body || {};
  const connection = appendJson("data/twin_connections.local.json", {
    fromTwinId: body.fromTwinId || "",
    fromName: body.fromName || "",
    fromInstagram: body.fromInstagram || "",
    toTwinId: body.toTwinId || "",
    toName: body.toName || "",
    toInstagram: body.toInstagram || "",
    type: body.type || "twin_connection",
    reason: body.reason || "Connected twins",
    status: body.status || "connected",
    paymentStatus: body.paymentStatus || "checking"
  });
  appendJson("data/events.local.json", { type: "twin_connection", payload: connection });
  res.json({ ok: true, version: VERSION, connection, system: buildSystem() });
});

app.post("/api/checkout", (req, res) => {
  const body = req.body || {};
  const checkout = appendJson("data/events.local.json", { type: "checkout_created", payload: body });
  res.json({ ok: true, version: VERSION, checkoutId: checkout.id, paymentUrl: process.env.PAYMENT_LINK_FULL_TWIN || "", amount: body.amount || "20.00 EUR", note: "Full AI Twin + your email" });
});

app.post("/api/unlock", (req, res) => {
  const body = req.body || {};
  const code = String(body.code || "").trim();
  appendJson("data/events.local.json", { type: code ? "unlock_checked" : "unlock_empty", payload: { hasCode: Boolean(code), profileId: body.profileId || null } });
  if (!code) return res.status(400).json({ ok: false, version: VERSION, error: "Paste unlock code first." });
  res.json({ ok: true, version: VERSION, code, unlocked: true, demoMode: true });
});

app.post("/api/full-report", (req, res) => {
  const body = req.body || {};
  const twin = body.twin || {};
  const user = twin.user || {};
  const name = body.name || user.name || twin.name || "SoulFlame User";
  const profile = twin.profile || twin.echoType || "Future Architect + Quantum System Builder";
  const report = [
    "FULL AI TWIN REPORT",
    "",
    "Име: " + name,
    "Профил: " + profile,
    "",
    "EchoProfile: силен стремеж към бъдеще, система, дълбочина и лична посока.",
    "Future Twin: следващата версия става силна, когато идеите се подредят в реални продукти.",
    "SoulMatch: най-добрите връзки са с хора, които разбират визията и държат стабилност.",
    "Action: първо работещ сайт, после EchoProfile, после AI Twin, после плащане и Business Twin."
  ].join("\n");
  appendJson("data/events.local.json", { type: "full_report_generated", payload: { name, profile } });
  res.json({ ok: true, version: VERSION, report });
});

app.post("/api/chat", (req, res) => {
  const body = req.body || {};
  const message = String(body.message || "").trim();
  if (!message) return res.status(400).json({ ok: false, error: "Missing message" });
  appendJson("data/events.local.json", { type: "chat_message", payload: { message, profile: body.profile || {} } });
  res.json({ ok: true, version: VERSION, localFallback: true, reply: "Local Echo работи. Съобщението е записано. Следващата стъпка е да вържем реален AI от server env." });
});

app.get("/", (req, res) => sendHtml(res, "index.html"));
app.get(["/soulmatch", "/soulmatch/", "/ai-echo", "/ai-echo/", "/ai-echo.html", "/landing", "/admin"], (req, res) => sendHtml(res, "index.html"));
app.use(express.static(ROOT, { dotfiles: "ignore", index: false }));
app.use((req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ ok: false, error: "API route not found", path: req.path });
  return sendHtml(res, "index.html");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("SoulFlame " + VERSION + " running: http://localhost:" + PORT);
});
