async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;

  if (typeof req.body === "string") {
    try { return JSON.parse(req.body || "{}"); } catch { return {}; }
  }

  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => {
      data += chunk.toString();
      if (data.length > 2000000) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch { reject(new Error("Invalid JSON")); }
    });
    req.on("error", reject);
  });
}

function getKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";
}

function getUrl() {
  return String(process.env.SUPABASE_URL || "").replace(/\/$/, "");
}

function rowFromBody(body) {
  return {
    id: Number(body.id) || Date.now(),
    name: body.user?.name || body.name || "",
    contact: body.user?.contact || body.contact || "",
    goal: body.user?.goal || body.goal || "",
    age: body.user?.age || body.age || "",
    main_trait: body.mainTrait || body.main_trait || "",
    second_trait: body.secondTrait || body.second_trait || "",
    profile: body.profile || "",
    scores: body.scores || {},
    mini_report: body.report || body.mini_report || "",
    full_report: body.fullReport || body.full_report || "",
    raw: body
  };
}

async function insertProfile(row) {
  const url = getUrl();
  const key = getKey();

  if (!url || !key) throw new Error("Missing Supabase env vars.");

  const response = await fetch(`${url}/rest/v1/profiles`, {
    method: "POST",
    headers: {
      "apikey": key,
      "Authorization": "Bearer " + key,
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    },
    body: JSON.stringify(row)
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Supabase error ${response.status}: ${text}`);
  }

  return text ? JSON.parse(text) : [];
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok:false, error:"Method not allowed. Use POST." });
    return;
  }

  try {
    const body = await readJson(req);
    const row = rowFromBody(body);
    const inserted = await insertProfile(row);

    res.status(200).json({
      ok: true,
      saved: "profile",
      activeDataMode: "supabase",
      id: row.id,
      inserted
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
      activeDataMode: "supabase",
      warnings: []
    });
  }
};