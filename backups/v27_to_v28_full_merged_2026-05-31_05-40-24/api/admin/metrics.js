function requireAdmin(req, res) {
  const pin = String(process.env.ECHO_ADMIN_PIN || "").trim();
  const incoming = String(req.headers["x-admin-pin"] || "").trim();

  if (!pin || !incoming || pin !== incoming) {
    res.status(401).json({ ok:false, error:"Admin PIN required." });
    return false;
  }

  return true;
}

module.exports = async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  res.status(200).json({
    ok:true,
    message:"Metrics endpoint active.",
    time:new Date().toISOString()
  });
};