function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function buildReport(input = {}) {
  const echoType = input.echoType || input.type || "Visionary Connector";

  return {
    title: "SoulFlame EchoProfile MVP Report",
    version: "V78",
    echoType,
    compatibilityScore: input.compatibilityScore || 82,
    summary: "Deep emotional intensity, strong future projection and high need for loyalty, clarity and stable communication.",
    strengths: [
      "Strong emotional depth",
      "Fast pattern recognition",
      "High future-orientation",
      "Powerful attachment energy"
    ],
    risks: [
      "Overthinking when signals are unclear",
      "Fast emotional acceleration",
      "Need for reassurance under stress"
    ],
    nextStep: "Connect this EchoProfile result to SoulMatch profiles and generate a real compatibility map."
  };
}

module.exports = async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed",
      allowed: ["GET", "POST"],
      version: "V78"
    });
  }

  try {
    const input = req.method === "GET" ? req.query : req.body;

    return res.status(200).json({
      ok: true,
      version: "V78",
      report: buildReport(input || {})
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message || "Full report failed",
      version: "V78"
    });
  }
};