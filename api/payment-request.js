async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body || "{}"); } catch { return {}; }
  }
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", c => data += c.toString());
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

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok:false, error:"Method not allowed. Use POST." });
    return;
  }

  try {
    const body = await readJson(req);
    const url = getUrl();
    const key = getKey();

    if (!url || !key) throw new Error("Missing Supabase env vars.");

    const row = {
      id: Date.now(),
      status: "pending",
      offer: body.offer || "Full AI Echo",
      amount: body.amount || "19.99 лв",
      method: body.method || "manual",
      name: body.user?.name || body.name || "",
      contact: body.user?.contact || body.contact || "",
      profile: body.profile || "",
      scores: body.scores || {},
      code: "",
      raw: body
    };

    const response = await fetch(`${url}/rest/v1/payments`, {
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

    res.status(200).json({
      ok: true,
      saved: "payment-request",
      payment: text ? JSON.parse(text)[0] : row,
      message: "Заявката за Full Echo е създадена."
    });
  } catch (error) {
    res.status(500).json({
      ok:false,
      error:error.message,
      warning:"If this is a column/table error, run cloud/supabase/v30_schema_patch.sql"
    });
  }
};