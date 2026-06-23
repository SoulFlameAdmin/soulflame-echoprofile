module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(501).json({
        error: "Missing OPENAI_API_KEY. Add it in Vercel Environment Variables or local .env."
      });
    }

    const body = req.body || {};
    const model = body.model || process.env.AI_TWIN_MODEL || "gpt-4o-mini";
    const message = String(body.message || "").trim();
    const page = String(body.page || "ai-twin");
    const history = Array.isArray(body.history) ? body.history.slice(-12) : [];

    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    const systemPrompt = [
      "You are Echo, the AI Twin layer of SoulFlame.",
      "Speak in Bulgarian unless the user uses another language.",
      "Be direct, intelligent, strategic, emotionally aware, and concise.",
      "You are not just a chatbot: you help build EchoProfile, Memory, Future Twin, SoulMatch, and AI Twin.",
      "Never claim to have real memories unless they are provided in the conversation or stored context.",
      "Current page: " + page
    ].join("\n");

    const messages = [
      { role: "system", content: systemPrompt },
      ...history
        .filter(m => m && (m.role === "user" || m.role === "assistant") && m.content)
        .map(m => ({ role: m.role, content: String(m.content).slice(0, 4000) })),
      { role: "user", content: message }
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errMsg = data && data.error && data.error.message
        ? data.error.message
        : "OpenAI request failed";

      return res.status(response.status).json({
        error: errMsg,
        model
      });
    }

    const reply =
      data &&
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content
        ? data.choices[0].message.content
        : "Echo не върна отговор.";

    return res.status(200).json({
      ok: true,
      model,
      reply
    });
  } catch (err) {
    return res.status(500).json({
      error: err && err.message ? err.message : "Server error"
    });
  }
};
