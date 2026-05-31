module.exports = async function handler(req, res) {
  res.status(501).json({
    ok: false,
    stage: "V23_PREP_ONLY",
    message: "api/profile.js is a placeholder. Full Supabase serverless migration comes in V24."
  });
};
