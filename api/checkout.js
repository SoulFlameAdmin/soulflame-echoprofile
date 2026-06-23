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
    const body = req.body || {};
    const checkoutId = `checkout_${Date.now()}`;

    return res.status(200).json({
      ok: true,
      version: "V78",
      checkoutId,
      status: "created",
      paymentUrl: `/unlock?checkout=${checkoutId}`,
      note: "V78 checkout endpoint is active. Connect Stripe/Revolut/Supabase payment confirmation in V79."
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message || "Checkout failed",
      version: "V78"
    });
  }
};