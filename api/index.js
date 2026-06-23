module.exports = async function handler(req, res) {
  const deployedAt = "2026-05-31 05:20:56";

  const html = `
<!doctype html>
<html lang="bg">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>SoulFlame Twins</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background:
        radial-gradient(circle at 20% 10%, rgba(124,60,255,.38), transparent 35%),
        radial-gradient(circle at 80% 20%, rgba(0,240,255,.25), transparent 30%),
        linear-gradient(135deg, #05060d, #101327, #070812);
      color: white;
      font-family: Arial, sans-serif;
      padding: 24px;
    }
    .card {
      width: min(980px, 100%);
      border: 1px solid rgba(255,255,255,.16);
      background: rgba(255,255,255,.08);
      border-radius: 28px;
      padding: 34px;
      box-shadow: 0 22px 80px rgba(0,0,0,.35);
    }
    .badge {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      border: 1px solid rgba(255,255,255,.16);
      background: rgba(0,0,0,.22);
      color: #aab3d0;
      padding: 9px 13px;
      border-radius: 999px;
      margin-bottom: 18px;
      font-size: 13px;
    }
    .dot {
      width: 9px;
      height: 9px;
      border-radius: 99px;
      background: #23d18b;
      box-shadow: 0 0 18px #23d18b;
    }
    h1 {
      font-size: clamp(42px, 7vw, 86px);
      line-height: .92;
      margin: 0 0 18px;
      letter-spacing: -2px;
    }
    .grad {
      background: linear-gradient(90deg,#00f0ff,#7c3cff,#ff5cf7);
      -webkit-background-clip: text;
      color: transparent;
    }
    p {
      color: #aab3d0;
      font-size: 18px;
      line-height: 1.55;
    }
    a, button {
      display: inline-block;
      margin: 8px 8px 0 0;
      border: 0;
      border-radius: 16px;
      padding: 14px 18px;
      color: white;
      background: linear-gradient(135deg,#7c3cff,#4c8dff);
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
    }
    button.secondary, a.secondary {
      background: rgba(255,255,255,.10);
      border: 1px solid rgba(255,255,255,.16);
    }
    pre {
      margin-top: 18px;
      padding: 16px;
      border-radius: 16px;
      background: rgba(0,0,0,.35);
      color: #aab3d0;
      white-space: pre-wrap;
      overflow: auto;
      min-height: 120px;
    }
  </style>
</head>
<body>
  <main class="card">
    <div class="badge"><span class="dot"></span> Production Online · Vercel API + Supabase</div>
    <h1>SoulFlame <span class="grad">Twins</span></h1>
    <p>Главната страница вече се сервира през Vercel API route. Backend-ът е свързан със Supabase cloud.</p>
    <p>Deployed at: ${deployedAt}</p>

    <a href="/api/health" target="_blank">API Health</a>
    <button class="secondary" onclick="testWrite()">Test Supabase Write</button>

    <pre id="out">Loading health...</pre>
  </main>

  <script>
    const out = document.getElementById("out");

    async function testWrite() {
      out.textContent = "Sending profile to /api/profile...";

      const body = {
        id: Date.now(),
        user: {
          name: "Root API Frontend Test Client",
          contact: "root-api-frontend@soulflame.local",
          goal: "Root API frontend production test",
          age: "25-34"
        },
        mainTrait: "vision",
        secondTrait: "logic",
        profile: "Root API frontend Supabase test profile",
        scores: { vision:10, logic:9, emotion:6, social:5, action:8 },
        report: "Root API frontend Mini Echo test.",
        fullReport: "Root API frontend Full Echo test.",
        createdAt: new Date().toISOString()
      };

      try {
        const res = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        const data = await res.json();
        out.textContent = JSON.stringify(data, null, 2);
      } catch (e) {
        out.textContent = e.message;
      }
    }

    fetch("/api/health")
      .then(r => r.json())
      .then(d => out.textContent = JSON.stringify(d, null, 2))
      .catch(e => out.textContent = e.message);
  </script>
</body>
</html>
`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
};