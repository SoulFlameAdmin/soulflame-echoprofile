module.exports = async function handler(req, res) {
  res.status(501).json({
    ok: false,
    stage: "V23_PREP_ONLY",
    message: "api/lead.js is a placeholder. Full serverless migration comes in V24."
  });
};
