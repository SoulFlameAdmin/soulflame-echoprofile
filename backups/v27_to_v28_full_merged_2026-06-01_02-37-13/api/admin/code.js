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

function requireAdmin(req, res) {
  const pin = String(process.env.ECHO_ADMIN_PIN || "").trim();
  const incoming = String(req.headers["x-admin-pin"] || "").trim();

  if (!pin || !incoming || pin !== incoming) {
    res.status(401).json({ ok:false, error:"Admin PIN required." });
    return false;
  }

  return true;
}

function getKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";
}

function getUrl() {
  return String(process.env.SUPABASE_URL || "").replace(/\/$/, "");
}

function makeCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  function part(n) {
    let value = "";
    for (let i = 0; i < n; i++) value += alphabet[Math.floor(Math.random() * alphabet.length)];
    return value;
  }
  return `ECHO-${part(4)}-${part(4)}`;
}

module.exports = async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method !== "POST") {
    res.status(405).json({ ok:false, error:"Method not allowed. Use POST." });
    return;
  }

  try {
    const body = await readJson(req);
    const url = getUrl();
    const key = getKey();
    const code = makeCode();

    const row = {
      id: Date.now(),
      code,
      status:"unused",
      offer:body.offer || "Full AI Echo",
      note:body.note || "",
      used_at:null,
      used_by:null,
      profile_id:null,
      payment_id:body.paymentId || null,
      raw:body
    };

    const response = await fetch(`${url}/rest/v1/unlock_codes`, {
      method:"POST",
      headers:{
        "apikey":key,
        "Authorization":"Bearer " + key,
        "Content-Type":"application/json",
        "Prefer":"return=representation"
      },
      body:JSON.stringify(row)
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`Supabase error ${response.status}: ${text}`);
    }

    res.status(200).json({
      ok:true,
      code,
      row:text ? JSON.parse(text)[0] : row,
      deliveryText:`Твоят Full Echo код е: ${code}`
    });
  } catch (error) {
    res.status(500).json({ ok:false, error:error.message });
  }
};