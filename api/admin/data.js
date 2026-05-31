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

async function getTable(table) {
  const url = getUrl();
  const key = getKey();

  const response = await fetch(`${url}/rest/v1/${table}?select=*&order=created_at.desc&limit=50`, {
    headers: {
      "apikey": key,
      "Authorization": "Bearer " + key
    }
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`${table}: ${response.status} ${text}`);
  }

  return text ? JSON.parse(text) : [];
}

module.exports = async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    const [profiles, leads, payments, unlock_codes, events] = await Promise.all([
      getTable("profiles"),
      getTable("leads"),
      getTable("payments"),
      getTable("unlock_codes"),
      getTable("events")
    ]);

    res.status(200).json({
      ok:true,
      metrics:{
        profiles:profiles.length,
        leads:leads.length,
        payments:payments.length,
        unlock_codes:unlock_codes.length,
        events:events.length
      },
      profiles,
      leads,
      payments,
      unlock_codes,
      events
    });
  } catch (error) {
    res.status(500).json({ ok:false, error:error.message });
  }
};