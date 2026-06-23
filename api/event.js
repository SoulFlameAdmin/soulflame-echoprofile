function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

module.exports = async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed",
      allowed: ["POST"],
      version: "V78"
    });
  }

  try {
    const event = {
      id: `event_${Date.now()}`,
      createdAt: new Date().toISOString(),
      type: req.body?.type || "event",
      payload: req.body || {}
    };

    return res.status(200).json({
      ok: true,
      version: "V78",
      event
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message || "Event failed",
      version: "V78"
    });
  }
};