function isAdmin(req) {
  const adminPin = process.env.ECHO_ADMIN_PIN || "";
  const incoming = req.headers["x-admin-pin"] || "";
  return String(incoming).trim() === String(adminPin).trim();
}

function requireAdmin(req, res) {
  if (!isAdmin(req)) {
    res.status(401).json({
      ok: false,
      error: "Admin PIN required"
    });
    return false;
  }
  return true;
}

module.exports = { isAdmin, requireAdmin };
