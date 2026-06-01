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
    const code = String(body.code || "").trim().toUpperCase();
    const url = getUrl();
    const key = getKey();

    if (!url || !key) throw new Error("Missing Supabase env vars.");
    if (!code) throw new Error("Missing unlock code.");

    const find = await fetch(`${url}/rest/v1/unlock_codes?code=eq.${encodeURIComponent(code)}&select=*`, {
      headers: {
        "apikey": key,
        "Authorization": "Bearer " + key
      }
    });

    const foundText = await find.text();

    if (!find.ok) {
      throw new Error(`Supabase error ${find.status}: ${foundText}`);
    }

    const rows = foundText ? JSON.parse(foundText) : [];

    if (!rows.length) {
      res.status(404).json({ ok:false, error:"Кодът не съществува." });
      return;
    }

    const current = rows[0];

    if (current.status === "used") {
      res.status(409).json({ ok:false, error:"Кодът вече е използван.", code:current });
      return;
    }

    const update = await fetch(`${url}/rest/v1/unlock_codes?id=eq.${current.id}`, {
      method: "PATCH",
      headers: {
        "apikey": key,
        "Authorization": "Bearer " + key,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify({
        status: "used",
        used_at: new Date().toISOString(),
        used_by: body.user || {},
        profile_id: body.profileId || null
      })
    });

    const updateText = await update.text();

    if (!update.ok) {
      throw new Error(`Supabase error ${update.status}: ${updateText}`);
    }

    res.status(200).json({
      ok:true,
      unlocked:true,
      code:updateText ? JSON.parse(updateText)[0] : current
    });
  } catch (error) {
    res.status(500).json({
      ok:false,
      error:error.message,
      warning:"If this is a column/table error, run cloud/supabase/v30_schema_patch.sql"
    });
  }
};