const { requireAdmin } = require("../_shared/admin");

module.exports = async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  res.status(501).json({
    ok: false,
    stage: "V23_PREP_ONLY",
    message: "api/admin/payment-confirm.js is a placeholder. Full serverless migration comes in V24."
  });
};
