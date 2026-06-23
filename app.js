const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");

app.disable("x-powered-by");
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

app.use((req, res, next) => {
  res.setHeader("X-SoulFlame-Version", "V90");
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

function sha256(text) {
  return crypto.createHash("sha256").update(String(text || "")).digest("hex");
}

function adminOk(req) {
  const pin =
    req.headers["x-admin-pin"] ||
    req.headers["x-soulflame-admin"] ||
    req.query.pin ||
    req.body?.pin ||
    "";

  const admin = readJson("data/admin.local.json", {});
  const expected = admin.hash || sha256("admin");

  return sha256(pin) === expected;
}

function mineKeys() {
  return [
    "dimitar",
    "dimitar lambov",
    "mitko",
    "stere0metal360",
    "@stere0metal360",
    "stere0metal360@gmail.com"
  ];
}

function twinText(twin) {
  return [
    twin.id,
    twin.name,
    twin.instagram,
    twin.email,
    twin.contact,
    twin.twinType,
    twin.echoType,
    JSON.stringify(twin.raw || {})
  ].join(" ").toLowerCase();
}

function isMine(twin) {
  const txt = twinText(twin);
  return mineKeys().some(k => txt.includes(k.toLowerCase()));
}

function normalizeTwin(profile, index) {
  const raw = profile.raw || profile.profileRaw || profile;
  const user = profile.user || raw.user || {};
  const echo = profile.echo || raw.echo || {};
  const scores = echo.score || profile.scores || raw.scores || {};

  const name =
    user.name ||
    profile.name ||
    raw.name ||
    "Unknown Twin";

  const instagram =
    user.instagram ||
    profile.instagram ||
    raw.instagram ||
    profile.contact ||
    raw.contact ||
    "";

  const twinType =
    profile.twinType ||
    raw.twinType ||
    profile.goal ||
    raw.goal ||
    "AI Twin";

  const echoType =
    echo.echoType ||
    profile.echoType ||
    profile.main_trait ||
    raw.main_trait ||
    "Not profiled";

  const compatibility =
    echo.compatibility ||
    raw.compatibility ||
    profile.compatibility ||
    0;

  const level =
    echo.level ||
    profile.level ||
    raw.level ||
    Math.max(1, Math.min(10, Math.round(Number(compatibility || 10) / 10)));

  return {
    id: profile.id || raw.id || "twin_" + index,
    name,
    instagram,
    twinType,
    echoType,
    compatibility,
    level,
    scores,
    summary: echo.summary || profile.summary || profile.mini_report || raw.mini_report || profile.profile || "",
    createdAt: profile.createdAt || raw.createdAt || "",
    raw
  };
}

function orderTwins(twins) {
  const arr = Array.isArray(twins) ? [...twins] : [];

  arr.sort((a, b) => {
    const am = isMine(a) ? 0 : 1;
    const bm = isMine(b) ? 0 : 1;

    if (am !== bm) return am - bm;

    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  return arr;
}

function related(list, twin) {
  const keys = [twin.id, twin.name, twin.instagram]
    .filter(Boolean)
    .map(x => String(x).toLowerCase());

  return list.filter(item => {
    const txt = JSON.stringify(item).toLowerCase();
    return keys.some(k => k && txt.includes(k));
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

  const base = 94 - diff * 3;
  const levelPenalty = Math.min(8, Math.abs(Number(a.level || 1) - Number(b.level || 1)));

  return Math.max(35, Math.min(99, Math.round(base - levelPenalty)));
}

function twinHealth(twin, ctx) {
  const hasMemory = Boolean(twin.raw);
  const hasEcho = Boolean(twin.echoType && twin.echoType !== "Not profiled");
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hasSupabase = Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY));
  const hasConnectors = ctx.connectors.length > 0;
  const hasNetwork = ctx.twinLinks.length > 0 || ctx.connections.length > 0 || ctx.conversations.length > 0;
  const hasPayment = ctx.payments.some(p => p.paid === true || String(p.status || "").toLowerCase() === "paid");
  const hasEvents = ctx.events.length > 0;
  const errors = ctx.errors.length;

  let score = 10;

  if (hasMemory) score += 15;
  if (hasEcho) score += 20;
  if (hasOpenAI) score += 12;
  if (hasSupabase) score += 12;
  if (hasConnectors) score += 8;
  if (hasNetwork) score += 8;
  if (hasPayment) score += 5;
  if (hasEvents) score += 5;

  score -= Math.min(20, errors * 7);
  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score,
    label:
      score >= 85 ? "Excellent" :
      score >= 65 ? "Good" :
      score >= 45 ? "Medium" :
      "Weak",
    factors: {
      memory: hasMemory,
      echoProfile: hasEcho,
      openai: hasOpenAI,
      supabase: hasSupabase,
      connectors: hasConnectors,
      twinPlus: hasNetwork,
      payments: hasPayment,
      events: hasEvents,
      errors
    }
  };
}

function buildSystem() {
  const profiles = readJson("data/profiles.local.json", []);
  const events = readJson("data/events.local.json", []);
  const connectors = readJson("data/connectors.local.json", {});
  const twinLinks = readJson("data/twin_links.local.json", []);
  const payments = readJson("data/payments.local.json", []);
  const connections = readJson("data/twin_connections.local.json", []);
  const conversations = readJson("data/twin_conversations.local.json", []);

  const normalized = orderTwins(profiles.map(normalizeTwin));

  const enriched = normalized.map(twin => {
    const relatedEvents = related(events, twin);
    const relatedPayments = related(payments, twin);
    const relatedConnections = related(connections, twin);
    const relatedConversations = related(conversations, twin);
    const relatedTwinLinks = related(twinLinks, twin);

    const relatedConnectors = Object.values(connectors).filter(c => {
      const txt = JSON.stringify(c).toLowerCase();
      return txt.includes(String(twin.instagram || "").toLowerCase()) ||
             txt.includes(String(twin.name || "").toLowerCase());
    });

    const errors = relatedEvents.filter(e => {
      const txt = JSON.stringify(e).toLowerCase();
      return txt.includes("error") || txt.includes("fail") || txt.includes("failed") || txt.includes("греш");
    });

    const paidList = relatedPayments.filter(p => p.paid === true || String(p.status || "").toLowerCase() === "paid");
    const totalPaid = paidList.reduce((sum, p) => sum + Number(p.amount || 0), 0);

    const health = twinHealth(twin, {
      events: relatedEvents,
      connectors: relatedConnectors,
      twinLinks: relatedTwinLinks,
      payments: relatedPayments,
      connections: relatedConnections,
      conversations: relatedConversations,
      errors
    });

    return {
      ...twin,
      isMine: isMine(twin),
      paid: paidList.length > 0,
      paymentStatus: {
        paid: paidList.length > 0,
        totalPaid,
        currency: paidList[0]?.currency || relatedPayments[0]?.currency || "EUR",
        payments: relatedPayments
      },
      related: {
        events: relatedEvents,
        connectors: relatedConnectors,
        twinLinks: relatedTwinLinks,
        payments: relatedPayments,
        connections: relatedConnections,
        conversations: relatedConversations,
        errors
      },
      health,
      connections: relatedConnections,
      lastCommands: relatedEvents,
      errorEvents: errors,
      errorCount: errors.length,
      problemExplanation:
        !twin.echoType || twin.echoType === "Not profiled"
          ? "Twin has no EchoProfile yet."
          : errors.length
            ? "There are saved errors."
            : !process.env.OPENAI_API_KEY
              ? "OpenAI API is not connected. Chat is fallback."
              : "OK."
    };
  });

  const mineRaw = enriched.filter(t => t.isMine);
  const myTwin = mineRaw.length ? mineRaw : (enriched[0] ? [enriched[0]] : []);
  const myIds = new Set(myTwin.map(t => String(t.id || "")));
  const otherTwins = enriched.filter(t => !myIds.has(String(t.id || "")));

  const matchMatrix = enriched.map(a => ({
    twinId: a.id,
    name: a.name,
    instagram: a.instagram,
    isMine: a.isMine,
    bestMatches: enriched
      .filter(b => b.id !== a.id)
      .map(b => ({
        twinId: b.id,
        name: b.name,
        instagram: b.instagram,
        score: matchScore(a, b),
        paid: b.paid,
        status: matchScore(a, b) >= 75 ? "good_match" : "weak_match"
      }))
      .sort((x, y) => y.score - x.score)
      .slice(0, 10)
  }));

  const globalHealth = enriched.length
    ? Math.round(enriched.reduce((sum, t) => sum + Number(t.health.score || 0), 0) / enriched.length)
    : 0;

  return {
    ok: true,
    version: "V90",
    adminOrder: {
      one: "My Twin",
      two: "All Twins / Connect Talk",
      three: "Network / Bugs / Payments",
      rule: "My Twin is always first."
    },
    globalHealth: {
      score: globalHealth,
      label:
        globalHealth >= 85 ? "Excellent global health" :
        globalHealth >= 65 ? "Good global health" :
        globalHealth >= 45 ? "Medium global health" :
        "Weak global health"
    },
    infrastructure: {
      openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
      supabaseConfigured: Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)),
      localProfiles: profiles.length,
      localEvents: events.length,
      localConnectors: Object.keys(connectors).length,
      localTwinLinks: twinLinks.length,
      localPayments: payments.length,
      localConnections: connections.length,
      localConversations: conversations.length,
      time: new Date().toISOString()
    },
    stats: {
      totalTwins: enriched.length,
      myTwinCount: myTwin.length,
      otherTwinsCount: otherTwins.length,
      payments: payments.length,
      connections: connections.length,
      conversations: conversations.length,
      events: events.length
    },
    myTwin,
    otherTwins,
    allTwinsOrdered: enriched,
    twins: enriched,
    payments,
    connections,
    conversations,
    matchMatrix,
    errorsByTwin: enriched.map(t => ({
      id: t.id,
      name: t.name,
      instagram: t.instagram,
      isMine: t.isMine,
      health: t.health,
      paid: t.paid,
      paymentStatus: t.paymentStatus,
      errorCount: t.errorCount,
      problemExplanation: t.problemExplanation,
      lastCommands: t.lastCommands,
      errorEvents: t.errorEvents,
      allTwinData: t
    })),
    raw: {
      connectors,
      twinLinks,
      recentEvents: events.slice(-120)
    }
  };
}

function sendHtml(res, rel) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) return res.status(404).send("Missing file: " + rel);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.sendFile(file);
}

app.get("/api/health", (req, res) => {
  const system = buildSystem();
  res.json({
    ok: true,
    version: "V90",
    openaiConfigured: system.infrastructure.openaiConfigured,
    supabaseConfigured: system.infrastructure.supabaseConfigured,
    localProfiles: system.infrastructure.localProfiles,
    localEvents: system.infrastructure.localEvents,
    localConnectors: system.infrastructure.localConnectors,
    localTwinLinks: system.infrastructure.localTwinLinks,
    time: system.infrastructure.time
  });
});

app.get("/api/v90/health", (req, res) => {
  const system = buildSystem();
  res.json({
    ok: true,
    version: "V90",
    globalHealth: system.globalHealth,
    infrastructure: system.infrastructure,
    twins: system.twins.map(t => ({
      id: t.id,
      name: t.name,
      instagram: t.instagram,
      isMine: t.isMine,
      health: t.health,
      paid: t.paid,
      level: t.level,
      echoType: t.echoType,
      problemExplanation: t.problemExplanation
    }))
  });
});

app.get("/api/v90/system", (req, res) => {
  if (!adminOk(req)) return res.status(401).json({ ok: false, error: "ADMIN locked" });
  res.json(buildSystem());
});

app.post("/api/profile", (req, res) => {
  const body = req.body || {};
  const saved = appendJson("data/profiles.local.json", {
    user: body.user || {},
    name: body.name || body.user?.name || "",
    instagram: body.instagram || body.user?.instagram || body.contact || "",
    twinType: body.twinType || "AI Twin",
    echo: body.echo || null,
    answers: body.answers || {},
    raw: body
  });

  appendJson("data/events.local.json", {
    type: "profile_saved",
    profileId: saved.id,
    payload: saved
  });

  res.json({ ok: true, version: "V90", saved });
});

app.post("/api/connectors", (req, res) => {
  const body = req.body || {};
  const key = String(body.instagram || body.name || "local-user").toLowerCase();
  const store = readJson("data/connectors.local.json", {});

  if (!store[key]) {
    store[key] = {
      key,
      name: body.name || "",
      instagram: body.instagram || "",
      connectors: {},
      updatedAt: new Date().toISOString()
    };
  }

  store[key].connectors[body.connector || "Unknown"] = {
    status: body.status || "prepared",
    handle: body.handle || "",
    updatedAt: new Date().toISOString()
  };

  store[key].updatedAt = new Date().toISOString();

  writeJson("data/connectors.local.json", store);
  appendJson("data/events.local.json", { type: "connector_update", payload: body });

  res.json({ ok: true, version: "V90", connectorSystem: store[key] });
});

app.post("/api/v90/payment", (req, res) => {
  if (!adminOk(req)) return res.status(401).json({ ok: false, error: "ADMIN locked" });

  const body = req.body || {};

  const payment = appendJson("data/payments.local.json", {
    twinId: body.twinId || "",
    name: body.name || "",
    instagram: body.instagram || "",
    amount: Number(body.amount || 0),
    currency: body.currency || "EUR",
    product: body.product || "Twin Talk / Twin+ connection",
    paid: body.paid !== false,
    status: body.status || "paid",
    note: body.note || ""
  });

  appendJson("data/events.local.json", {
    type: "payment_update_v90",
    payload: payment
  });

  res.json({ ok: true, version: "V90", payment, system: buildSystem() });
});

app.post("/api/v90/connect", (req, res) => {
  if (!adminOk(req)) return res.status(401).json({ ok: false, error: "ADMIN locked" });

  const body = req.body || {};

  const connection = appendJson("data/twin_connections.local.json", {
    fromTwinId: body.fromTwinId || "",
    fromName: body.fromName || "",
    fromInstagram: body.fromInstagram || "",
    toTwinId: body.toTwinId || "",
    toName: body.toName || "",
    toInstagram: body.toInstagram || "",
    type: body.type || "twin_talk_connection",
    reason: body.reason || "Admin connected twins",
    status: body.status || "connected",
    paymentStatus: body.paymentStatus || "checking"
  });

  appendJson("data/events.local.json", {
    type: "twin_connection_v90",
    payload: connection
  });

  res.json({ ok: true, version: "V90", connection, system: buildSystem() });
});

app.post("/api/chat", async (req, res) => {
  const body = req.body || {};
  const message = String(body.message || "").trim();

  if (!message) return res.status(400).json({ ok: false, error: "Missing message" });

  appendJson("data/events.local.json", {
    type: "chat_message",
    payload: {
      message,
      profile: body.profile || {}
    }
  });

  if (!process.env.OPENAI_API_KEY) {
    return res.json({
      ok: true,
      version: "V90",
      localFallback: true,
      reply: "Local Echo is working. Add OPENAI_API_KEY to enable real GPT answers."
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.AI_TWIN_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are SoulFlame AI Echo. Reply clearly and concisely." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ ok: false, error: data.error?.message || "OpenAI error" });
    }

    res.json({
      ok: true,
      version: "V90",
      reply: data.choices?.[0]?.message?.content || "No reply."
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get("/", (req, res) => sendHtml(res, "index.html"));
app.get(["/soulmatch", "/soulmatch/"], (req, res) => sendHtml(res, path.join("Soulmatch", "index.html")));
app.get(["/ai-echo", "/ai-echo/", "/ai-echo.html"], (req, res) => sendHtml(res, "ai-echo.html"));

app.use("/Soulmatch", express.static(path.join(ROOT, "Soulmatch")));
app.use(express.static(ROOT, { dotfiles: "ignore", index: false }));

app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ ok: false, error: "API route not found", path: req.path });
  }

  return sendHtml(res, "index.html");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("SoulFlame V90 running: http://localhost:" + PORT);
  console.log("SoulMatch: http://localhost:" + PORT + "/soulmatch");
  console.log("AI Echo: http://localhost:" + PORT + "/ai-echo.html");
});