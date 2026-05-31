const { getSystemInfo } = require("./_shared/system");

module.exports = async function handler(req, res) {
  res.status(200).json({
    ok: true,
    message: "V23 Vercel prep health endpoint placeholder. Full API migration comes in V24.",
    ...getSystemInfo()
  });
};
