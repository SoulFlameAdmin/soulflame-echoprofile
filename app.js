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
  res.setHeader("X-SoulFlame-Version", "V83");
  if (req.path.endsWith(".html")) res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (req.path.endsWith(".js")) res.setHeader("Content-Type", "application/javascript; charset=utf-8");
  if (req.path.endsWith(".css")) res.setHeader("Content-Type", "text/css; charset=utf-8");
  next();
});

function sendHtml(res, rel) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) return res.status(404).send("Missing file: " + rel);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.sendFile(file);
}

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

function adminHash() {
  const local = readJson("data/admin.local.json", null);
  return process.env.ADMIN_PIN_HASH || local?.hash || sha256(process.env.ADMIN_PIN || "admin");
}

function isAdmin(req) {
  const pin =
    req.headers["x-admin-pin"] ||
    req.headers["x-soulflame-admin"] ||
    req.query.pin ||
    req.body?.pin ||
    "";

  return sha256(pin) === adminHash();
}

function supabaseConfig() {
  return {
    url: String(process.env.SUPABASE_URL || "").replace(/\/$/, ""),
    key: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ""
  };
}

async function insertSupabase(table, row) {
  const cfg = supabaseConfig();
  if (!cfg.url || !cfg.key) return { ok: false, skipped: true, reason: "Missing Supabase env" };

  const response = await fetch(`${cfg.url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: cfg.key,
      Authorization: "Bearer " + cfg.key,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify(row)
  });

  const text = await response.text();
  if (!response.ok) return { ok: false, status: response.status, error: text };
  return { ok: true, data: text ? JSON.parse(text) : [] };
}

function calcEchoResult(answers, questions) {
  const score = { A: 0, AV: 0, S: 0, D: 0 };

  for (const q of questions) {
    if (answers?.[q.id] !== "yes") continue;
    const w = q.weights || {};
    for (const k of Object.keys(score)) score[k] += Number(w[k] || 0);
  }

  const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
  const top = sorted[0] || ["S", 0];

  const typeMap = {
    A: "Deep Attachment Visionary",
    AV: "Guarded Independent Flame",
    S: "Stable Loyal Builder",
    D: "Magnetic Future Seeker"
  };

  const echoType = typeMap[top[0]] || "Visionary Connector";
  const compatibility = Math.max(55, Math.min(97, 70 + top[1] * 2));

  return {
    score,
    dominant: top[0],
    echoType,
    compatibility,
    level: Math.max(1, Math.min(10, Math.round(compatibility / 10))),
    summary: `Р В Р’В Р РЋРЎвЂєР В Р’В Р В РІР‚В Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В Р РЏР В Р Р‹Р Р†Р вЂљРЎв„ў Echo Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚вЂќ Р В Р’В Р вЂ™Р’Вµ ${echoType}. Compatibility Р В Р Р‹Р В Р РЏР В Р’В Р СћРІР‚ВР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚Сћ: ${compatibility}%.`
  };
}

function normalizeTwin(profile, index = 0) {
  const raw = profile.raw || profile.profileRaw || profile;
  const user = profile.user || raw.user || {};
  const echo = profile.echo || raw.echo || {};
  const scores = echo.score || profile.scores || raw.scores || {};

  const name =
    user.name ||
    profile.name ||
    raw.name ||
    raw.user?.name ||
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
    profile.main_trait ||
    raw.main_trait ||
    "Not profiled";

  const compatibility =
    echo.compatibility ||
    raw.compatibility ||
    0;

  const level =
    echo.level ||
    profile.level ||
    raw.level ||
    Math.max(1, Math.min(10, Math.round(Number(compatibility || 10) / 10)));

  const id = profile.id || raw.id || `twin_${index}`;

  return {
    id,
    name,
    instagram,
    twinType,
    echoType,
    compatibility,
    level,
    scores,
    summary: echo.summary || profile.mini_report || raw.mini_report || profile.profile || "",
    createdAt: profile.createdAt || raw.createdAt || "",
    raw
  };
}

function allTwins() {
  const profiles = readJson("data/profiles.local.json", []);
  return profiles.map(normalizeTwin);
}

function currentTwinKey(body = {}) {
  return String(body.instagram || body.contact || body.name || "local-user").toLowerCase().trim();
}

function explainTwinProblem(twin, events = []) {
  const errors = events.filter(e => {
    const txt = JSON.stringify(e).toLowerCase();
    return txt.includes("error") || txt.includes("fail") || txt.includes("Р В Р’В Р РЋРІР‚вЂњР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†РІР‚С™Р’В¬");
  });

  if (!twin.echoType || twin.echoType === "Not profiled") {
    return "Twin-Р В Р Р‹Р В РІР‚В°Р В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљР’В°Р В Р’В Р вЂ™Р’Вµ Р В Р’В Р В РІР‚В¦Р В Р Р‹Р В Р РЏР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В° Р В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В Р В Р Р‹Р В РІР‚В°Р В Р Р‹Р В РІР‚С™Р В Р Р‹Р Р†РІР‚С™Р’В¬Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦ EchoProfile. Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’ВР В Р Р‹Р В РІР‚В°Р В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’Вµ Р В Р’В Р вЂ™Р’Вµ Р В Р’В Р В РІР‚В  Р В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В°, Р В Р’В Р вЂ™Р’В° Р В Р’В Р В РІР‚В  Р В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РЎвЂњР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљР’В°Р В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРІР‚ВР В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ў.";
  }

  if (!process.env.OPENAI_API_KEY) {
    return "GPT API Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В РІР‚в„–Р В Р Р‹Р Р†Р вЂљР Р‹ Р В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РЎвЂњР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°. Chat Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В±Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚В Р В Р’В Р В РІР‚В Р В Р Р‹Р В РІР‚В°Р В Р’В Р В РІР‚В  fallback Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В¶Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋР’В, Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚Сћ Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В»Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏР В Р Р‹Р Р†Р вЂљРЎв„ў GPT Р В Р’В Р В РІР‚В¦Р В Р Р‹Р В Р РЏР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В° Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚вЂњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РІР‚С™Р В Р Р‹Р В Р РЏ.";
  }

  if (errors.length) {
    return `Р В Р’В Р вЂ™Р’ВР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В° ${errors.length} Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚В error/fail Р В Р Р‹Р В РЎвЂњР В Р Р‹Р В РІР‚В°Р В Р’В Р вЂ™Р’В±Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ. Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚В Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚В Р В Р’В Р РЋРІР‚В payload.`;
  }

  return "Р В Р’В Р РЋРЎС™Р В Р Р‹Р В Р РЏР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРІР‚СњР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’В. Twin-Р В Р Р‹Р В РІР‚В°Р В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎвЂєР В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В» Р В Р’В Р РЋРІР‚В Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚вЂњР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В¶Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В° Р В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚СњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°.";
}

app.get("/health", (req, res) => {
  res.json({ ok: true, app: "SoulFlame", version: "V83", time: new Date().toISOString() });
});

app.get("/api/health", (req, res) => {
  const cfg = supabaseConfig();
  res.json({
    ok: true,
    version: "V83",
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
    supabaseConfigured: Boolean(cfg.url && cfg.key),
    localProfiles: readJson("data/profiles.local.json", []).length,
    localEvents: readJson("data/events.local.json", []).length,
    localConnectors: Object.keys(readJson("data/connectors.local.json", {})).length,
    localTwinLinks: readJson("data/twin_links.local.json", []).length,
    time: new Date().toISOString()
  });
});

app.get("/api/echo-questions", (req, res) => {
  res.json({ ok: true, version: "V83", questions: readJson("data/echoprofile_questions.json", []) });
});

app.post("/api/event", (req, res) => {
  const event = appendJson("data/events.local.json", {
    type: req.body?.type || "event",
    payload: req.body || {}
  });
  res.json({ ok: true, version: "V83", event });
});

app.post("/api/profile", async (req, res) => {
  try {
    const body = req.body || {};
    const user = body.user || {};
    const questions = readJson("data/echoprofile_questions.json", []);
    const echo = body.echo || calcEchoResult(body.answers || {}, questions);

    const saved = appendJson("data/profiles.local.json", {
      user,
      twinType: body.twinType || "",
      instagram: body.instagram || user.instagram || "",
      answers: body.answers || {},
      echo,
      source: body.source || "ai-echo",
      raw: body
    });

    const row = {
      id: Date.now(),
      name: user.name || body.name || "",
      contact: user.contact || body.contact || user.instagram || body.instagram || "",
      goal: body.twinType || "",
      main_trait: echo.echoType || "",
      second_trait: echo.dominant || "",
      profile: echo.summary || "",
      scores: echo.score || {},
      mini_report: echo.summary || "",
      full_report: "",
      raw: { ...body, localProfileId: saved.id }
    };

    const supabase = await insertSupabase("profiles", row);

    res.json({ ok: true, version: "V83", saved, echo, supabase });
  } catch (err) {
    appendJson("data/events.local.json", { type: "profile_error", error: err.message });
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post("/api/connectors", (req, res) => {
  const body = req.body || {};
  const key = currentTwinKey(body);
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

  store[key].name = body.name || store[key].name;
  store[key].instagram = body.instagram || store[key].instagram;
  store[key].connectors[body.connector] = {
    status: body.status || "prepared",
    handle: body.handle || "",
    updatedAt: new Date().toISOString()
  };
  store[key].updatedAt = new Date().toISOString();

  writeJson("data/connectors.local.json", store);
  appendJson("data/events.local.json", { type: "connector_update", payload: body });

  res.json({ ok: true, version: "V83", system: store[key] });
});

app.post("/api/twin-plus", (req, res) => {
  const body = req.body || {};
  const link = appendJson("data/twin_links.local.json", {
    owner: {
      name: body.name || "",
      instagram: body.instagram || ""
    },
    friend: {
      name: body.friendName || "",
      instagram: body.friendInstagram || "",
      twinId: body.friendTwinId || ""
    },
    status: "introduced",
    note: body.note || "Twin+ introduction created"
  });

  appendJson("data/events.local.json", { type: "twin_plus_link", payload: link });
  res.json({ ok: true, version: "V83", link });
});

app.post("/api/user-system", (req, res) => {
  const body = req.body || {};
  const key = currentTwinKey(body);
  const twins = allTwins();
  const mine = twins.filter(t => {
    const raw = `${t.name} ${t.instagram}`.toLowerCase();
    return raw.includes(String(body.name || "").toLowerCase()) || raw.includes(String(body.instagram || "").toLowerCase());
  });

  const connectors = readJson("data/connectors.local.json", {});
  const links = readJson("data/twin_links.local.json", []);
  const events = readJson("data/events.local.json", []).slice(-40);

  res.json({
    ok: true,
    version: "V83",
    key,
    mine,
    connectors: connectors[key] || null,
    twinPlus: links.filter(l => {
      const txt = JSON.stringify(l).toLowerCase();
      return txt.includes(String(body.instagram || "").toLowerCase()) || txt.includes(String(body.name || "").toLowerCase());
    }),
    recentEvents: events
  });
});

app.post("/api/admin/login", (req, res) => {
  if (!isAdmin(req)) {
    appendJson("data/events.local.json", { type: "admin_login_failed" });
    return res.status(401).json({ ok: false, error: "Wrong admin password" });
  }

  appendJson("data/events.local.json", { type: "admin_login_success" });

  res.json({
    ok: true,
    version: "V83",
    token: "local-admin-session",
    message: "Admin unlocked"
  });
});

app.get("/api/admin/system", (req, res) => {
  if (!isAdmin(req)) return res.status(401).json({ ok: false, error: "Admin locked" });

  const twins = allTwins();
  const events = readJson("data/events.local.json", []).slice(-120);
  const connectors = readJson("data/connectors.local.json", {});
  const links = readJson("data/twin_links.local.json", []);

  const priority = ["dimitar", "stere0metal360", "Р В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚Сћ", "mitko"];
  twins.sort((a, b) => {
    const aa = `${a.name} ${a.instagram}`.toLowerCase();
    const bb = `${b.name} ${b.instagram}`.toLowerCase();
    const ap = priority.some(p => aa.includes(p)) ? 0 : 1;
    const bp = priority.some(p => bb.includes(p)) ? 0 : 1;
    if (ap !== bp) return ap - bp;
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  const enriched = twins.map(t => {
    const relatedEvents = events.filter(e => JSON.stringify(e).toLowerCase().includes(String(t.instagram || t.name).toLowerCase())).slice(-12);
    return {
      ...t,
      connectors: connectors[String(t.instagram || t.name || "").toLowerCase()] || null,
      twinPlus: links.filter(l => JSON.stringify(l).toLowerCase().includes(String(t.instagram || t.name).toLowerCase())),
      lastCommands: relatedEvents,
      problemExplanation: explainTwinProblem(t, relatedEvents)
    };
  });

  res.json({
    ok: true,
    version: "V83",
    stats: {
      twins: enriched.length,
      events: events.length,
      connectors: Object.keys(connectors).length,
      twinPlusLinks: links.length,
      openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
      supabaseConfigured: Boolean(supabaseConfig().url && supabaseConfig().key)
    },
    twins: enriched,
    events,
    connectors,
    links
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const body = req.body || {};
    const message = String(body.message || "").trim();
    if (!message) return res.status(400).json({ ok: false, error: "Missing message" });

    const profile = body.profile || {};
    const history = Array.isArray(body.history) ? body.history.slice(-12) : [];
    const apiKey = process.env.OPENAI_API_KEY;
    const model = body.model || process.env.AI_TWIN_MODEL || "gpt-4o-mini";

    appendJson("data/events.local.json", {
      type: "ai_chat_message",
      payload: { message, profile, page: body.page || "ai-echo" }
    });

    if (!apiKey) {
      const name = profile.name || "Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚В";
      const echoType = profile.echoType || profile.echo?.echoType || "EchoProfile Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљР’В°Р В Р’В Р вЂ™Р’Вµ Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’Вµ Р В Р’В Р вЂ™Р’Вµ Р В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В Р В Р Р‹Р В РІР‚В°Р В Р Р‹Р В РІР‚С™Р В Р Р‹Р Р†РІР‚С™Р’В¬Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦";
      return res.json({
        ok: true,
        version: "V83",
        localFallback: true,
        reply: `${name}, Р В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В»Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏР В Р Р‹Р Р†Р вЂљРЎв„ў AI Echo Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В±Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚В. Р В Р’В Р вЂ™Р’В Р В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦ GPT Р В Р Р‹Р Р†Р вЂљР’В°Р В Р’В Р вЂ™Р’Вµ Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р Р‹Р В РІР‚В°Р В Р’В Р РЋРІР‚вЂњР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’Вµ, Р В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚вЂњР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚Сћ Р В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В¶Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†РІР‚С™Р’В¬ OPENAI_API_KEY. Р В Р’В Р РЋРЎвЂєР В Р’В Р вЂ™Р’ВµР В Р’В Р РЋРІР‚СњР В Р Р‹Р РЋРІР‚СљР В Р Р‹Р Р†Р вЂљР’В° Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎвЂєР В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В»: ${echoType}.`
      });
    }

    const systemPrompt = [
      "You are Echo, the AI Twin layer of SoulFlame.",
      "Speak Bulgarian by default.",
      "Be direct, strategic, emotionally intelligent, and concise.",
      "Build EchoProfile, AI Twin, Future Twin, Memory Layer, SoulMatch and Twin+ network.",
      "Profile:",
      JSON.stringify(profile).slice(0, 4000)
    ].join("\n");

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.filter(m => m && ["user", "assistant"].includes(m.role) && m.content).map(m => ({
        role: m.role,
        content: String(m.content).slice(0, 3000)
      })),
      { role: "user", content: message }
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ model, messages, temperature: 0.72, max_tokens: 850 })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      appendJson("data/events.local.json", { type: "openai_error", error: data?.error?.message || "OpenAI failed" });
      return res.status(response.status).json({ ok: false, error: data?.error?.message || "OpenAI request failed" });
    }

    res.json({ ok: true, version: "V83", model, reply: data?.choices?.[0]?.message?.content || "Echo Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’Вµ Р В Р’В Р В РІР‚В Р В Р Р‹Р В РІР‚В°Р В Р Р‹Р В РІР‚С™Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚вЂњР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™." });
  } catch (err) {
    appendJson("data/events.local.json", { type: "chat_error", error: err.message });
    res.status(500).json({ ok: false, error: err.message });
  }
});


// SOULFLAME_V85_ADMIN_NETWORK_START
function v85ReadJson(rel, fallback) {
  try {
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function v85WriteJson(rel, data) {
  const file = path.join(ROOT, rel);
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

function v85AppendJson(rel, item) {
  const list = v85ReadJson(rel, []);
  const saved = {
    id: "v85_" + Date.now() + "_" + Math.random().toString(16).slice(2),
    createdAt: new Date().toISOString(),
    ...item
  };
  list.push(saved);
  v85WriteJson(rel, list);
  return saved;
}

function v85Hash(text) {
  return require("crypto").createHash("sha256").update(String(text || "")).digest("hex");
}

function v85AdminOk(req) {
  const pin =
    req.headers["x-admin-pin"] ||
    req.headers["x-soulflame-admin"] ||
    req.query.pin ||
    (req.body && req.body.pin) ||
    "";

  const admin = v85ReadJson("data/admin.local.json", {});
  const expected = admin.hash || v85Hash("admin");
  return v85Hash(pin) === expected;
}

function v85MineKeys() {
  return [
    "dimitar",
    "dimitar lambov",
    "mitko",
    "Р В РЎВР В РЎвЂР РЋРІР‚С™Р В РЎвЂќР В РЎвЂў",
    "Р В РўвЂР В РЎвЂР В РЎВР В РЎвЂР РЋРІР‚С™Р РЋР вЂ°Р РЋР вЂљ",
    "stere0metal360",
    "@stere0metal360",
    "stere0metal360@gmail.com"
  ];
}

function v85TwinText(twin) {
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

function v85IsMine(twin) {
  const txt = v85TwinText(twin);
  return v85MineKeys().some(k => txt.includes(k.toLowerCase()));
}

function v85NormalizeTwin(profile, index) {
  const raw = profile.raw || profile.profileRaw || profile;
  const user = profile.user || raw.user || {};
  const echo = profile.echo || raw.echo || {};
  const scores = echo.score || profile.scores || raw.scores || {};

  const name =
    user.name ||
    profile.name ||
    raw.name ||
    raw.user?.name ||
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
    profile.main_trait ||
    raw.main_trait ||
    "Not profiled";

  const compatibility =
    echo.compatibility ||
    raw.compatibility ||
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
    summary: echo.summary || profile.mini_report || raw.mini_report || profile.profile || "",
    createdAt: profile.createdAt || raw.createdAt || "",
    raw
  };
}

function v85OrderTwins(twins) {
  const arr = Array.isArray(twins) ? [...twins] : [];
  arr.sort((a, b) => {
    const am = v85IsMine(a) ? 0 : 1;
    const bm = v85IsMine(b) ? 0 : 1;
    if (am !== bm) return am - bm;
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });
  return arr;
}

function v85SplitTwins(twins) {
  const ordered = v85OrderTwins(twins);
  let mine = ordered.filter(v85IsMine);
  if (!mine.length && ordered.length) mine = [ordered[0]];

  const mineIds = new Set(mine.map(t => String(t.id || "")));
  const others = ordered.filter(t => !mineIds.has(String(t.id || "")));

  return { ordered, mine, others };
}

function v85PaymentSummary(twin, payments) {
  const txt = v85TwinText(twin);
  const related = payments.filter(p => {
    const ptxt = JSON.stringify(p).toLowerCase();
    return ptxt.includes(String(twin.id || "").toLowerCase()) ||
           ptxt.includes(String(twin.name || "").toLowerCase()) ||
           ptxt.includes(String(twin.instagram || "").toLowerCase());
  });

  const paid = related.filter(p => p.paid === true || String(p.status || "").toLowerCase() === "paid");
  const totalPaid = paid.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  return {
    paid: paid.length > 0,
    totalPaid,
    currency: paid[0]?.currency || related[0]?.currency || "EUR",
    payments: related,
    lastPayment: related[related.length - 1] || null
  };
}

function v85RelatedEvents(twin, events) {
  const keys = [twin.id, twin.name, twin.instagram].filter(Boolean).map(x => String(x).toLowerCase());
  if (!keys.length) return events.slice(-8);

  return events.filter(e => {
    const txt = JSON.stringify(e).toLowerCase();
    return keys.some(k => k && txt.includes(k));
  }).slice(-20);
}

function v85Problem(twin, relatedEvents) {
  const txt = JSON.stringify(relatedEvents || []).toLowerCase();
  const hasError = txt.includes("error") || txt.includes("fail") || txt.includes("Р В РЎвЂ“Р РЋР вЂљР В Р’ВµР РЋРІвЂљВ¬") || txt.includes("failed");

  if (!twin.echoType || twin.echoType === "Not profiled") {
    return "Twin-Р РЋР вЂ°Р РЋРІР‚С™ Р В РЎвЂўР РЋРІР‚В°Р В Р’Вµ Р В Р вЂ¦Р РЋР РЏР В РЎВР В Р’В° Р В Р’В·Р В Р’В°Р В Р вЂ Р РЋР вЂ°Р РЋР вЂљР РЋРІвЂљВ¬Р В Р’ВµР В Р вЂ¦ EchoProfile.";
  }

  if (hasError) {
    return "Р В Р’ВР В РЎВР В Р’В° error/fail Р РЋР С“Р РЋР вЂ°Р В Р’В±Р В РЎвЂР РЋРІР‚С™Р В РЎвЂР РЋР РЏ. Р В РЎСџР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР В РЎвЂ lastCommands/errorEvents.";
  }

  if (!process.env.OPENAI_API_KEY) {
    return "OPENAI_API_KEY Р В Р’В»Р В РЎвЂР В РЎвЂ”Р РЋР С“Р В Р вЂ Р В Р’В°. Chat Р В Р’Вµ Р В Р вЂ Р РЋР вЂ°Р В Р вЂ  fallback Р РЋР вЂљР В Р’ВµР В Р’В¶Р В РЎвЂР В РЎВ.";
  }

  return "OK. Р В РЎСљР РЋР РЏР В РЎВР В Р’В° Р В РЎвЂќР РЋР вЂљР В РЎвЂР РЋРІР‚С™Р В РЎвЂР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р’В±Р В Р’В»Р В Р’ВµР В РЎВ.";
}

function v85Vector(twin) {
  const s = twin.scores || {};
  return {
    A: Number(s.A || 0),
    AV: Number(s.AV || 0),
    S: Number(s.S || 0),
    D: Number(s.D || 0)
  };
}

function v85MatchScore(a, b) {
  const av = v85Vector(a);
  const bv = v85Vector(b);
  const diff =
    Math.abs(av.A - bv.A) +
    Math.abs(av.AV - bv.AV) +
    Math.abs(av.S - bv.S) +
    Math.abs(av.D - bv.D);

  const base = 94 - diff * 3;
  const levelBonus = Math.min(6, Math.abs(Number(a.level || 1) - Number(b.level || 1)));
  return Math.max(40, Math.min(99, Math.round(base - levelBonus)));
}

function v85BuildSystem() {
  const profiles = v85ReadJson("data/profiles.local.json", []);
  const payments = v85ReadJson("data/payments.local.json", []);
  const connections = v85ReadJson("data/twin_connections.local.json", []);
  const events = v85ReadJson("data/events.local.json", []);
  const connectors = v85ReadJson("data/connectors.local.json", {});
  const twinPlus = v85ReadJson("data/twin_links.local.json", []);

  const twins = profiles.map(v85NormalizeTwin);
  const partsRaw = v85SplitTwins(twins);

  const enriched = partsRaw.ordered.map(twin => {
    const relatedEvents = v85RelatedEvents(twin, events);
    const payment = v85PaymentSummary(twin, payments);
    const lower = String(twin.instagram || twin.name || twin.id || "").toLowerCase();

    const relatedConnections = connections.filter(c => {
      const txt = JSON.stringify(c).toLowerCase();
      return txt.includes(String(twin.id || "").toLowerCase()) ||
             txt.includes(String(twin.name || "").toLowerCase()) ||
             txt.includes(String(twin.instagram || "").toLowerCase());
    });

    const errorEvents = relatedEvents.filter(e => {
      const txt = JSON.stringify(e).toLowerCase();
      return txt.includes("error") || txt.includes("fail") || txt.includes("Р В РЎвЂ“Р РЋР вЂљР В Р’ВµР РЋРІвЂљВ¬") || txt.includes("failed");
    });

    return {
      ...twin,
      isMine: v85IsMine(twin),
      payment,
      paid: payment.paid,
      connectors: connectors[lower] || null,
      twinPlus: twinPlus.filter(l => JSON.stringify(l).toLowerCase().includes(lower)),
      connections: relatedConnections,
      lastCommands: relatedEvents,
      errorEvents,
      errorCount: errorEvents.length,
      problemExplanation: v85Problem(twin, relatedEvents)
    };
  });

  const parts = v85SplitTwins(enriched);

  const matchMatrix = [];
  for (const a of enriched) {
    const matches = enriched
      .filter(b => b.id !== a.id)
      .map(b => ({
        twinId: b.id,
        name: b.name,
        instagram: b.instagram,
        score: v85MatchScore(a, b),
        paid: b.paid,
        status: v85MatchScore(a, b) >= 75 ? "good_match" : "weak_match"
      }))
      .sort((x, y) => y.score - x.score);

    matchMatrix.push({
      twinId: a.id,
      name: a.name,
      instagram: a.instagram,
      isMine: a.isMine,
      bestMatches: matches.slice(0, 10)
    });
  }

  const errorsByTwin = enriched.map(twin => ({
    id: twin.id,
    name: twin.name,
    instagram: twin.instagram,
    isMine: twin.isMine,
    level: twin.level,
    paid: twin.paid,
    payment: twin.payment,
    errorCount: twin.errorCount,
    problemExplanation: twin.problemExplanation,
    lastCommands: twin.lastCommands,
    errorEvents: twin.errorEvents,
    connections: twin.connections,
    allTwinData: twin
  }));

  return {
    ok: true,
    version: "V85",
    adminOrder: {
      one: "Р В РЎС™Р В РЎвЂўР РЋР РЏР РЋРІР‚С™ Twin",
      two: "Р В РІР‚в„ўР РЋР С“Р В РЎвЂР РЋРІР‚РЋР В РЎвЂќР В РЎвЂ Twin-Р В РЎвЂўР В Р вЂ Р В Р’Вµ / Connect for Talk",
      three: "Network / Bugs / Payments",
      rule: "Р В РЎС™Р В РЎвЂўР РЋР РЏР РЋРІР‚С™ Twin Р В Р’Вµ Р В Р вЂ Р В РЎвЂР В Р вЂ¦Р В Р’В°Р В РЎвЂ“Р В РЎвЂ Р В РЎвЂ”Р РЋР вЂ°Р РЋР вЂљР В Р вЂ Р В РЎвЂ."
    },
    stats: {
      totalTwins: enriched.length,
      myTwinCount: parts.mine.length,
      otherTwinsCount: parts.others.length,
      payments: payments.length,
      connections: connections.length,
      events: events.length,
      openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
      supabaseConfigured: Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY))
    },
    myTwin: parts.mine,
    allTwinsOrdered: enriched,
    otherTwins: parts.others,
    payments,
    connections,
    matchMatrix,
    errorsByTwin,
    raw: {
      connectors,
      twinPlus,
      recentEvents: events.slice(-120)
    }
  };
}

app.get("/api/admin/control-v85", (req, res) => {
  if (!v85AdminOk(req)) return res.status(401).json({ ok: false, error: "ADMIN locked" });
  res.json(v85BuildSystem());
});

app.post("/api/admin/payment-v85", (req, res) => {
  if (!v85AdminOk(req)) return res.status(401).json({ ok: false, error: "ADMIN locked" });

  const body = req.body || {};
  const payment = v85AppendJson("data/payments.local.json", {
    twinId: body.twinId || "",
    name: body.name || "",
    instagram: body.instagram || "",
    amount: Number(body.amount || 0),
    currency: body.currency || "EUR",
    product: body.product || "Twin Talk / Twin+ connection",
    paid: body.paid === true || String(body.status || "").toLowerCase() === "paid",
    status: body.status || "paid",
    note: body.note || ""
  });

  v85AppendJson("data/events.local.json", { type: "payment_update", payload: payment });
  res.json({ ok: true, version: "V85", payment, system: v85BuildSystem() });
});

app.post("/api/admin/connect-twins-v85", (req, res) => {
  if (!v85AdminOk(req)) return res.status(401).json({ ok: false, error: "ADMIN locked" });

  const body = req.body || {};
  const connection = v85AppendJson("data/twin_connections.local.json", {
    fromTwinId: body.fromTwinId || "",
    fromName: body.fromName || "",
    fromInstagram: body.fromInstagram || "",
    toTwinId: body.toTwinId || "",
    toName: body.toName || "",
    toInstagram: body.toInstagram || "",
    type: body.type || "talk_connection",
    reason: body.reason || "Admin connected twins for paid talk",
    paidRequired: body.paidRequired !== false,
    paymentStatus: body.paymentStatus || "checking",
    status: body.status || "connected_by_admin"
  });

  v85AppendJson("data/events.local.json", { type: "admin_twin_connection", payload: connection });
  res.json({ ok: true, version: "V85", connection, system: v85BuildSystem() });
});
// SOULFLAME_V85_ADMIN_NETWORK_END


// SOULFLAME_V87_USER_NETWORK_HEALTH_START
function v87ReadJson(rel, fallback) {
  try {
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function v87WriteJson(rel, data) {
  const file = path.join(ROOT, rel);
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

function v87AppendJson(rel, item) {
  const list = v87ReadJson(rel, []);
  const saved = {
    id: "v87_" + Date.now() + "_" + Math.random().toString(16).slice(2),
    createdAt: new Date().toISOString(),
    ...item
  };
  list.push(saved);
  v87WriteJson(rel, list);
  return saved;
}

function v87MineKeys() {
  return [
    "dimitar",
    "dimitar lambov",
    "mitko",
    "Р СР С‘РЎвЂљР С”Р С•",
    "Р Т‘Р С‘Р СР С‘РЎвЂљРЎР‰РЎР‚",
    "stere0metal360",
    "@stere0metal360",
    "stere0metal360@gmail.com"
  ];
}

function v87TwinText(twin) {
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

function v87IsMine(twin) {
  const txt = v87TwinText(twin);
  return v87MineKeys().some(k => txt.includes(k.toLowerCase()));
}

function v87NormalizeTwin(profile, index) {
  const raw = profile.raw || profile.profileRaw || profile;
  const user = profile.user || raw.user || {};
  const echo = profile.echo || raw.echo || {};
  const scores = echo.score || profile.scores || raw.scores || {};

  const name =
    user.name ||
    profile.name ||
    raw.name ||
    raw.user?.name ||
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
    profile.main_trait ||
    raw.main_trait ||
    "Not profiled";

  const compatibility =
    echo.compatibility ||
    raw.compatibility ||
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
    summary: echo.summary || profile.mini_report || raw.mini_report || profile.profile || "",
    createdAt: profile.createdAt || raw.createdAt || "",
    raw
  };
}

function v87OrderTwins(twins) {
  const arr = Array.isArray(twins) ? [...twins] : [];

  arr.sort((a, b) => {
    const am = v87IsMine(a) ? 0 : 1;
    const bm = v87IsMine(b) ? 0 : 1;

    if (am !== bm) return am - bm;

    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  return arr;
}

function v87Related(list, twin) {
  const keys = [twin.id, twin.name, twin.instagram]
    .filter(Boolean)
    .map(x => String(x).toLowerCase());

  return list.filter(item => {
    const txt = JSON.stringify(item).toLowerCase();
    return keys.some(k => k && txt.includes(k));
  });
}

function v87MatchScore(a, b) {
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

function v87HealthScore(twin, ctx) {
  const factors = {
    memory: Boolean(twin.raw),
    echoProfile: Boolean(twin.echoType && twin.echoType !== "Not profiled"),
    openai: Boolean(process.env.OPENAI_API_KEY),
    supabase: Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)),
    connectors: ctx.connectors.length > 0,
    twinPlus: ctx.twinLinks.length > 0 || ctx.conversations.length > 0 || ctx.connections.length > 0,
    payments: ctx.payments.some(p => p.paid === true || String(p.status || "").toLowerCase() === "paid"),
    events: ctx.events.length > 0,
    errors: ctx.errors.length
  };

  let score = 10;

  if (factors.memory) score += 15;
  if (factors.echoProfile) score += 20;
  if (factors.openai) score += 12;
  if (factors.supabase) score += 12;
  if (factors.connectors) score += 8;
  if (factors.twinPlus) score += 8;
  if (factors.payments) score += 5;
  if (factors.events) score += 5;

  score -= Math.min(20, factors.errors * 7);

  score = Math.max(0, Math.min(100, Math.round(score)));

  let label = "Р РЋР В»Р В°Р В±Р С• Р В·Р Т‘РЎР‚Р В°Р Р†Р Вµ";
  if (score >= 85) label = "Р СљР Р…Р С•Р С–Р С• Р Т‘Р С•Р В±РЎР‚Р С• Р В·Р Т‘РЎР‚Р В°Р Р†Р Вµ";
  else if (score >= 65) label = "Р вЂќР С•Р В±РЎР‚Р С• Р В·Р Т‘РЎР‚Р В°Р Р†Р Вµ";
  else if (score >= 45) label = "Р РЋРЎР‚Р ВµР Т‘Р Р…Р С• Р В·Р Т‘РЎР‚Р В°Р Р†Р Вµ";

  return {
    score,
    label,
    factors,
    explanation: {
      memory: factors.memory ? "Р С‘Р СР В° Р В»Р С•Р С”Р В°Р В»Р Р…Р В° Р С—Р В°Р СР ВµРЎвЂљ/Р С—РЎР‚Р С•РЎвЂћР С‘Р В»" : "Р В»Р С‘Р С—РЎРѓР Р†Р В° РЎРѓРЎвЂљР В°Р В±Р С‘Р В»Р ВµР Р… Р С—РЎР‚Р С•РЎвЂћР С‘Р В»",
      echoProfile: factors.echoProfile ? "EchoProfile Р Вµ Р Р…Р В°Р В»Р С‘РЎвЂЎР ВµР Р…" : "EchoProfile Р В»Р С‘Р С—РЎРѓР Р†Р В°",
      openai: factors.openai ? "OpenAI/GPT Р Вµ РЎРѓР Р†РЎР‰РЎР‚Р В·Р В°Р Р…" : "OpenAI/GPT Р Р…Р Вµ Р Вµ РЎРѓР Р†РЎР‰РЎР‚Р В·Р В°Р Р…",
      supabase: factors.supabase ? "Supabase Р Вµ РЎРѓР Р†РЎР‰РЎР‚Р В·Р В°Р Р…" : "Supabase Р Р…Р Вµ Р Вµ РЎРѓР Р†РЎР‰РЎР‚Р В·Р В°Р Р…",
      connectors: factors.connectors ? "Р С‘Р СР В° connector-Р С‘" : "Р Р…РЎРЏР СР В° connector-Р С‘",
      twinPlus: factors.twinPlus ? "Р С‘Р СР В° Twin+ / network Р Р†РЎР‚РЎР‰Р В·Р С”Р С‘" : "Р Р…РЎРЏР СР В° Twin+ Р Р†РЎР‚РЎР‰Р В·Р С”Р С‘",
      payments: factors.payments ? "Р С‘Р СР В° Р С—Р В»Р В°РЎвЂ°Р В°Р Р…Р Вµ" : "Р Р…РЎРЏР СР В° Р В·Р В°Р С—Р С‘РЎРѓР В°Р Р…Р С• Р С—Р В»Р В°РЎвЂ°Р В°Р Р…Р Вµ",
      events: factors.events ? "Р С‘Р СР В° Р В°Р С”РЎвЂљР С‘Р Р†Р Р…Р С•РЎРѓРЎвЂљ/events" : "Р Р…РЎРЏР СР В° Р В°Р С”РЎвЂљР С‘Р Р†Р Р…Р С•РЎРѓРЎвЂљ",
      errors: factors.errors ? "Р С‘Р СР В° Р С–РЎР‚Р ВµРЎв‚¬Р С”Р С‘" : "Р Р…РЎРЏР СР В° Р В·Р В°Р С—Р С‘РЎРѓР В°Р Р…Р С‘ Р С–РЎР‚Р ВµРЎв‚¬Р С”Р С‘"
    }
  };
}

function v87BuildTwinHealthSystem() {
  const profiles = v87ReadJson("data/profiles.local.json", []);
  const events = v87ReadJson("data/events.local.json", []);
  const connectors = v87ReadJson("data/connectors.local.json", {});
  const twinLinks = v87ReadJson("data/twin_links.local.json", []);
  const payments = v87ReadJson("data/payments.local.json", []);
  const connections = v87ReadJson("data/twin_connections.local.json", []);
  const conversations = v87ReadJson("data/twin_conversations.local.json", []);

  const twins = v87OrderTwins(profiles.map(v87NormalizeTwin));

  const enriched = twins.map(twin => {
    const relatedEvents = v87Related(events, twin);
    const relatedConnectors = Object.values(connectors).filter(c => {
      const txt = JSON.stringify(c).toLowerCase();
      return v87TwinText(twin).split(" ").some(k => k && k.length > 3 && txt.includes(k));
    });

    const relatedTwinLinks = v87Related(twinLinks, twin);
    const relatedPayments = v87Related(payments, twin);
    const relatedConnections = v87Related(connections, twin);
    const relatedConversations = v87Related(conversations, twin);

    const errorEvents = relatedEvents.filter(e => {
      const txt = JSON.stringify(e).toLowerCase();
      return txt.includes("error") || txt.includes("fail") || txt.includes("failed") || txt.includes("Р С–РЎР‚Р ВµРЎв‚¬");
    });

    const health = v87HealthScore(twin, {
      events: relatedEvents,
      connectors: relatedConnectors,
      twinLinks: relatedTwinLinks,
      payments: relatedPayments,
      connections: relatedConnections,
      conversations: relatedConversations,
      errors: errorEvents
    });

    const bestMatches = twins
      .filter(other => other.id !== twin.id)
      .map(other => ({
        twinId: other.id,
        name: other.name,
        instagram: other.instagram,
        score: v87MatchScore(twin, other),
        status: v87MatchScore(twin, other) >= 75 ? "good_match" : "weak_match"
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    const paidList = relatedPayments.filter(p => p.paid === true || String(p.status || "").toLowerCase() === "paid");
    const totalPaid = paidList.reduce((sum, p) => sum + Number(p.amount || 0), 0);

    return {
      ...twin,
      isMine: v87IsMine(twin),
      health,
      related: {
        events: relatedEvents,
        connectors: relatedConnectors,
        twinLinks: relatedTwinLinks,
        payments: relatedPayments,
        connections: relatedConnections,
        conversations: relatedConversations,
        errors: errorEvents
      },
      paymentStatus: {
        paid: paidList.length > 0,
        totalPaid,
        currency: paidList[0]?.currency || relatedPayments[0]?.currency || "EUR",
        payments: relatedPayments
      },
      bestMatches
    };
  });

  const globalScore = enriched.length
    ? Math.round(enriched.reduce((sum, t) => sum + Number(t.health.score || 0), 0) / enriched.length)
    : 0;

  return {
    ok: true,
    version: "V87",
    globalHealth: {
      score: globalScore,
      twins: enriched.length,
      label:
        globalScore >= 85 ? "Р СљР Р…Р С•Р С–Р С• Р Т‘Р С•Р В±РЎР‚Р С• Р С•Р В±РЎвЂ°Р С• Р В·Р Т‘РЎР‚Р В°Р Р†Р Вµ" :
        globalScore >= 65 ? "Р вЂќР С•Р В±РЎР‚Р С• Р С•Р В±РЎвЂ°Р С• Р В·Р Т‘РЎР‚Р В°Р Р†Р Вµ" :
        globalScore >= 45 ? "Р РЋРЎР‚Р ВµР Т‘Р Р…Р С• Р С•Р В±РЎвЂ°Р С• Р В·Р Т‘РЎР‚Р В°Р Р†Р Вµ" :
        "Р РЋР В»Р В°Р В±Р С• Р С•Р В±РЎвЂ°Р С• Р В·Р Т‘РЎР‚Р В°Р Р†Р Вµ"
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
    twins: enriched,
    raw: {
      healthLike: {
        ok: true,
        version: "V87",
        openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
        supabaseConfigured: Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)),
        localProfiles: profiles.length,
        localEvents: events.length,
        localConnectors: Object.keys(connectors).length,
        localTwinLinks: twinLinks.length,
        time: new Date().toISOString()
      },
      payments,
      connections,
      conversations
    }
  };
}

app.get("/api/twin-health-v87", (req, res) => {
  res.json(v87BuildTwinHealthSystem());
});

app.post("/api/twinplus/conversation-v87", (req, res) => {
  const body = req.body || {};

  const system = v87BuildTwinHealthSystem();
  const twins = system.twins || [];

  const a =
    twins.find(t => t.id === body.twinAId) ||
    twins.find(t => String(t.name).toLowerCase() === String(body.twinAName || "").toLowerCase());

  const b =
    twins.find(t => t.id === body.twinBId) ||
    twins.find(t => String(t.name).toLowerCase() === String(body.twinBName || "").toLowerCase());

  if (!a || !b) {
    return res.status(400).json({
      ok: false,
      error: "Missing twin A or twin B"
    });
  }

  if (a.id === b.id) {
    return res.status(400).json({
      ok: false,
      error: "Cannot connect the same twin with itself"
    });
  }

  const score = v87MatchScore(a, b);

  const conversation = v87AppendJson("data/twin_conversations.local.json", {
    twinA: {
      id: a.id,
      name: a.name,
      instagram: a.instagram
    },
    twinB: {
      id: b.id,
      name: b.name,
      instagram: b.instagram
    },
    matchScore: score,
    status: body.status || "created",
    paymentStatus: body.paymentStatus || "checking",
    topic: body.topic || "Twin+ conversation",
    reason: body.reason || "Twin+ Network added two twins into conversation"
  });

  v87AppendJson("data/events.local.json", {
    type: "twinplus_conversation_created",
    payload: conversation
  });

  res.json({
    ok: true,
    version: "V87",
    conversation,
    system: v87BuildTwinHealthSystem()
  });
});
// SOULFLAME_V87_USER_NETWORK_HEALTH_END

app.get("/", (req, res) => sendHtml(res, "index.html"));
app.get(["/ai-echo", "/ai-echo/", "/ai-echo.html"], (req, res) => sendHtml(res, "ai-echo.html"));
app.get(["/soulmatch", "/soulmatch/"], (req, res) => sendHtml(res, path.join("Soulmatch", "index.html")));

app.use("/Soulmatch", express.static(path.join(ROOT, "Soulmatch")));
app.use(express.static(ROOT, { dotfiles: "ignore", index: false }));

app.use((req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ ok: false, error: "API route not found", path: req.path });
  return sendHtml(res, "index.html");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SoulFlame V83 running: http://localhost:${PORT}`);
  console.log(`SoulMatch: http://localhost:${PORT}/soulmatch`);
  console.log(`AI Echo: http://localhost:${PORT}/ai-echo.html`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
});