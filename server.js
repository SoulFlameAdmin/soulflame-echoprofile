const http = require("http");
const crypto = require("crypto");

const APP_NAME = "SoulFlame Twins";
const MODULE_NAME = "EchoProfile";
const APP_VERSION = "V44_EMAIL_DELIVERY_CLIENT_MESSAGE_FLOW";

const OWNER_EMAIL = process.env.OWNER_EMAIL || "stere0metal360@gmail.com";
const APP_MODE = process.env.APP_MODE || "production";
const DATA_MODE = process.env.DATA_MODE || "supabase";
const ADMIN_PIN = process.env.ECHO_ADMIN_PIN || "ECHO-ADMIN-999";
const SERVER_STARTED_AT = Date.now();

const INLINE_INDEX_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"\u003e\n  \u003ctitle\u003eAI Twin by SoulFlame — Full Twin Unlock\u003c/title\u003e\n  \u003cmeta name=\"description\" content=\"Създай безплатен AI Twin и отключи Full AI Twin чрез код. EchoProfile, Future Twin message и личен AI план.\"\u003e\n  \u003cmeta property=\"og:title\" content=\"AI Twin by SoulFlame\"\u003e\n  \u003cmeta property=\"og:description\" content=\"Създай безплатен AI Twin и отключи Full AI Twin с код.\"\u003e\n  \u003cmeta name=\"theme-color\" content=\"#050611\"\u003e\n\n  \u003cstyle\u003e\n    :root {\n      --bg0:#03040a;\n      --bg1:#080b1f;\n      --bg2:#111a46;\n      --text:#f8f7ff;\n      --soft:#b9c3e8;\n      --muted:#7f8ab4;\n      --line:rgba(255,255,255,.14);\n      --glass:rgba(255,255,255,.078);\n      --glass2:rgba(255,255,255,.045);\n      --cyan:#00eaff;\n      --violet:#7c3cff;\n      --pink:#ff4ff3;\n      --gold:#ffd166;\n      --green:#23e6a8;\n      --red:#ff4d6d;\n      --shadow:0 28px 90px rgba(0,0,0,.42);\n    }\n\n    * { box-sizing: border-box; }\n\n    html {\n      scroll-behavior: smooth;\n      background: var(--bg0);\n    }\n\n    body {\n      margin: 0;\n      min-height: 100vh;\n      font-family: Arial, Helvetica, sans-serif;\n      color: var(--text);\n      background:\n        radial-gradient(circle at 15% 8%, rgba(124,60,255,.30), transparent 32rem),\n        radial-gradient(circle at 86% 12%, rgba(0,234,255,.18), transparent 30rem),\n        radial-gradient(circle at 50% 105%, rgba(255,79,243,.10), transparent 34rem),\n        linear-gradient(135deg, var(--bg0), var(--bg1) 46%, var(--bg2));\n      overflow-x: hidden;\n      -webkit-font-smoothing: antialiased;\n      text-rendering: geometricPrecision;\n    }\n\n    body::before {\n      content: \"\";\n      position: fixed;\n      inset: 0;\n      pointer-events: none;\n      z-index: 0;\n      background:\n        linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),\n        linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);\n      background-size: 64px 64px;\n      mask-image: radial-gradient(circle at 50% 16%, rgba(0,0,0,.58), transparent 70%);\n    }\n\n    .wrap {\n      position: relative;\n      z-index: 1;\n      width: min(1240px, 100%);\n      margin: 0 auto;\n      padding: 22px;\n    }\n\n    .nav {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      gap: 14px;\n      padding: 12px;\n      border: 1px solid rgba(255,255,255,.12);\n      background: rgba(6,8,20,.72);\n      border-radius: 24px;\n      box-shadow: 0 16px 45px rgba(0,0,0,.22);\n      position: sticky;\n      top: 12px;\n      z-index: 20;\n    }\n\n    .brand {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      font-weight: 950;\n      letter-spacing: -.5px;\n      white-space: nowrap;\n    }\n\n    .logo {\n      width: 42px;\n      height: 42px;\n      border-radius: 16px;\n      background:\n        radial-gradient(circle at 30% 22%, #fff, transparent 15%),\n        linear-gradient(135deg, var(--cyan), var(--violet), var(--pink));\n      box-shadow: 0 0 34px rgba(124,60,255,.42);\n      flex: 0 0 auto;\n    }\n\n    .navlinks {\n      display: flex;\n      gap: 8px;\n      flex-wrap: wrap;\n      justify-content: flex-end;\n    }\n\n    .pill {\n      color: var(--text);\n      text-decoration: none;\n      font-size: 13px;\n      font-weight: 900;\n      padding: 10px 12px;\n      border: 1px solid rgba(255,255,255,.13);\n      background: rgba(255,255,255,.06);\n      border-radius: 999px;\n      transition: transform .2s ease, border-color .2s ease, background .2s ease;\n    }\n\n    .pill:hover {\n      transform: translateY(-2px);\n      border-color: rgba(0,234,255,.36);\n      background: rgba(0,234,255,.08);\n    }\n\n    .hero {\n      min-height: calc(100vh - 110px);\n      display: grid;\n      grid-template-columns: 1.04fr .96fr;\n      gap: 22px;\n      align-items: center;\n      padding: 44px 0 28px;\n    }\n\n    .card {\n      border: 1px solid var(--line);\n      background:\n        linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.045)),\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.08), transparent 38%);\n      border-radius: 30px;\n      padding: clamp(22px, 4vw, 42px);\n      box-shadow: var(--shadow);\n      position: relative;\n      overflow: hidden;\n      transform: translateZ(0);\n    }\n\n    .card.light {\n      background:\n        linear-gradient(180deg, rgba(255,255,255,.075), rgba(255,255,255,.04)),\n        rgba(255,255,255,.035);\n    }\n\n    .badge {\n      display: inline-flex;\n      align-items: center;\n      gap: 9px;\n      border: 1px solid rgba(255,255,255,.14);\n      background: rgba(0,0,0,.20);\n      color: var(--soft);\n      padding: 9px 13px;\n      border-radius: 999px;\n      font-size: 13px;\n      font-weight: 950;\n      margin-bottom: 18px;\n    }\n\n    .dot {\n      width: 9px;\n      height: 9px;\n      border-radius: 99px;\n      background: var(--green);\n      box-shadow: 0 0 16px var(--green);\n    }\n\n    h1 {\n      margin: 0 0 18px;\n      font-size: clamp(46px, 7.8vw, 108px);\n      letter-spacing: -4px;\n      line-height: .88;\n    }\n\n    h2 {\n      margin: 0 0 14px;\n      font-size: clamp(28px, 4vw, 50px);\n      letter-spacing: -1.6px;\n      line-height: 1;\n    }\n\n    h3 {\n      margin: 0 0 8px;\n      font-size: 21px;\n    }\n\n    p {\n      margin: 0 0 15px;\n      color: var(--soft);\n      line-height: 1.65;\n      font-size: 17px;\n    }\n\n    .grad {\n      background: linear-gradient(90deg, var(--cyan), #5ca8ff, var(--violet), var(--pink));\n      -webkit-background-clip: text;\n      background-clip: text;\n      color: transparent;\n    }\n\n    .gold { color: var(--gold); }\n    .green { color: var(--green); }\n\n    .actions {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 12px;\n      margin-top: 24px;\n    }\n\n    button, .btn {\n      border: 0;\n      cursor: pointer;\n      color: white;\n      background: linear-gradient(135deg, var(--violet), #3f8dff);\n      border-radius: 18px;\n      padding: 14px 18px;\n      font-weight: 950;\n      text-decoration: none;\n      font-size: 15px;\n      box-shadow: 0 16px 42px rgba(124,60,255,.24);\n      transition: transform .2s ease, filter .2s ease, box-shadow .2s ease;\n      transform: translateZ(0);\n    }\n\n    button:hover, .btn:hover {\n      transform: translateY(-2px);\n      filter: saturate(1.1);\n      box-shadow: 0 20px 52px rgba(124,60,255,.30);\n    }\n\n    button.secondary, .btn.secondary {\n      background: rgba(255,255,255,.09);\n      border: 1px solid var(--line);\n      box-shadow: none;\n    }\n\n    button.gold, .btn.gold {\n      background: linear-gradient(135deg, #ffb703, #ff4ff3);\n      box-shadow: 0 16px 45px rgba(255,79,243,.18);\n    }\n\n    .heroBullets {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 10px;\n      margin-top: 22px;\n    }\n\n    .heroBullet {\n      border: 1px solid rgba(255,255,255,.12);\n      background: rgba(255,255,255,.045);\n      border-radius: 18px;\n      padding: 13px;\n      color: var(--soft);\n      font-size: 13px;\n      line-height: 1.4;\n    }\n\n    .heroBullet b {\n      color: var(--text);\n      display: block;\n      margin-bottom: 4px;\n    }\n\n    .stage {\n      min-height: 560px;\n      display: grid;\n      place-items: center;\n      perspective: 1000px;\n      overflow: hidden;\n    }\n\n    .device {\n      position: relative;\n      width: min(440px, 86vw);\n      aspect-ratio: 1 / 1.15;\n      transform-style: preserve-3d;\n      transition: transform .14s linear;\n    }\n\n    .halo {\n      position: absolute;\n      inset: 12%;\n      border-radius: 50%;\n      background: radial-gradient(circle, rgba(0,234,255,.22), rgba(124,60,255,.10), transparent 64%);\n      opacity: .75;\n      animation: haloPulse 5.5s ease-in-out infinite;\n    }\n\n    .orb {\n      position: absolute;\n      inset: 14% 8% 20%;\n      border-radius: 50%;\n      background:\n        radial-gradient(circle at 34% 24%, rgba(255,255,255,.95), transparent 10%),\n        radial-gradient(circle at 42% 42%, rgba(0,234,255,.72), transparent 24%),\n        radial-gradient(circle at 58% 56%, rgba(124,60,255,.60), transparent 40%),\n        radial-gradient(circle at 70% 70%, rgba(255,79,243,.36), transparent 55%),\n        rgba(255,255,255,.05);\n      border: 1px solid rgba(255,255,255,.22);\n      box-shadow:\n        inset 0 0 80px rgba(255,255,255,.07),\n        0 0 80px rgba(0,234,255,.20),\n        0 0 120px rgba(124,60,255,.28);\n      animation: levitate 5.8s ease-in-out infinite;\n      transform: translateZ(70px);\n    }\n\n    .orb::before {\n      content: \"\";\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      width: 126%;\n      height: 30%;\n      border: 1px solid rgba(255,255,255,.20);\n      border-radius: 50%;\n      transform: translate(-50%, -50%) rotateX(70deg) rotateZ(15deg);\n    }\n\n    .shadowOrb {\n      position: absolute;\n      left: 50%;\n      bottom: 5%;\n      width: 54%;\n      height: 12%;\n      transform: translateX(-50%) rotateX(72deg);\n      background: radial-gradient(ellipse, rgba(0,234,255,.28), rgba(124,60,255,.14), transparent 68%);\n      filter: blur(10px);\n      opacity: .72;\n      animation: shadowPulse 5.8s ease-in-out infinite;\n    }\n\n    .chip {\n      position: absolute;\n      z-index: 4;\n      border: 1px solid rgba(255,255,255,.14);\n      background: rgba(2,4,14,.58);\n      border-radius: 18px;\n      padding: 12px 14px;\n      color: #e7ecff;\n      box-shadow: 0 16px 45px rgba(0,0,0,.26);\n      font-weight: 950;\n      animation: chipFloat 5.4s ease-in-out infinite;\n      transform: translateZ(120px);\n      white-space: nowrap;\n    }\n\n    .chip small {\n      display: block;\n      margin-top: 3px;\n      color: var(--muted);\n      font-weight: 800;\n    }\n\n    .chip.c1 { top: 6%; left: 1%; }\n    .chip.c2 { top: 18%; right: 0; animation-delay: .7s; }\n    .chip.c3 { bottom: 18%; left: 0; animation-delay: 1.3s; }\n    .chip.c4 { bottom: 6%; right: 7%; animation-delay: 2s; }\n\n    @keyframes levitate {\n      0%,100% { transform: translateY(0) translateZ(70px) scale(1); }\n      50% { transform: translateY(-18px) translateZ(84px) scale(1.018); }\n    }\n\n    @keyframes haloPulse {\n      0%,100% { transform: scale(.96); opacity:.52; }\n      50% { transform: scale(1.07); opacity:.82; }\n    }\n\n    @keyframes shadowPulse {\n      0%,100% { opacity:.46; transform: translateX(-50%) rotateX(72deg) scale(.92); }\n      50% { opacity:.75; transform: translateX(-50%) rotateX(72deg) scale(1.1); }\n    }\n\n    @keyframes chipFloat {\n      0%,100% { translate:0 0; }\n      50% { translate:0 -10px; }\n    }\n\n    .section { padding: 30px 0; }\n\n    .grid3, .grid4, .pricingGrid, .fullGrid {\n      display: grid;\n      gap: 14px;\n    }\n\n    .grid3 { grid-template-columns: repeat(3, 1fr); }\n    .grid4 { grid-template-columns: repeat(4, 1fr); }\n    .pricingGrid { grid-template-columns: repeat(3, 1fr); }\n    .fullGrid { grid-template-columns: repeat(2, 1fr); }\n\n    .mini, .priceCard, .stepCard, .fullBlock {\n      border: 1px solid var(--line);\n      background: var(--glass2);\n      border-radius: 24px;\n      padding: 18px;\n      transform: translateY(18px);\n      opacity: 0;\n      transition: transform .55s ease, opacity .55s ease;\n    }\n\n    .mini.show, .priceCard.show, .stepCard.show, .fullBlock.show {\n      transform: translateY(0);\n      opacity: 1;\n    }\n\n    .mini strong, .stepCard strong, .fullBlock strong {\n      display: block;\n      margin-bottom: 8px;\n      font-size: 17px;\n    }\n\n    .stepNumber {\n      width: 36px;\n      height: 36px;\n      display: grid;\n      place-items: center;\n      border-radius: 14px;\n      background: linear-gradient(135deg, var(--cyan), var(--violet));\n      font-weight: 950;\n      margin-bottom: 12px;\n    }\n\n    .priceCard.featured {\n      border-color: rgba(0,234,255,.38);\n      background:\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.10), transparent 34%),\n        rgba(255,255,255,.06);\n      box-shadow: 0 20px 70px rgba(0,234,255,.08);\n    }\n\n    .price {\n      font-size: 34px;\n      font-weight: 950;\n      letter-spacing: -1px;\n      margin: 10px 0;\n    }\n\n    .list {\n      display: grid;\n      gap: 9px;\n      margin-top: 14px;\n      color: var(--soft);\n      font-size: 14px;\n      line-height: 1.45;\n    }\n\n    .list span::before {\n      content: \"✓ \";\n      color: var(--green);\n      font-weight: 950;\n    }\n\n    .appGrid {\n      display: grid;\n      grid-template-columns: .78fr 1.22fr;\n      gap: 22px;\n      align-items: start;\n    }\n\n    label {\n      display: block;\n      margin: 14px 0 7px;\n      color: var(--soft);\n      font-size: 13px;\n      font-weight: 950;\n    }\n\n    input, textarea, select {\n      width: 100%;\n      border: 1px solid var(--line);\n      background: rgba(0,0,0,.26);\n      color: var(--text);\n      border-radius: 16px;\n      padding: 14px 15px;\n      outline: none;\n      font-size: 15px;\n      transition: border-color .18s ease, box-shadow .18s ease;\n    }\n\n    input:focus, textarea:focus, select:focus {\n      border-color: rgba(0,234,255,.48);\n      box-shadow: 0 0 0 4px rgba(0,234,255,.07);\n    }\n\n    textarea {\n      min-height: 106px;\n      resize: vertical;\n    }\n\n    .signalGrid {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 12px;\n      margin-top: 14px;\n    }\n\n    .signal {\n      border: 1px solid var(--line);\n      background: rgba(0,0,0,.24);\n      border-radius: 20px;\n      padding: 16px;\n      cursor: pointer;\n      transition: transform .18s ease, border-color .18s ease, background .18s ease;\n    }\n\n    .signal:hover {\n      transform: translateY(-3px);\n      border-color: rgba(0,234,255,.32);\n    }\n\n    .signal.active {\n      background: linear-gradient(135deg, rgba(124,60,255,.34), rgba(0,234,255,.12));\n      border-color: rgba(0,234,255,.44);\n    }\n\n    .signal b {\n      display: block;\n      margin-bottom: 6px;\n      font-size: 16px;\n    }\n\n    .signal span {\n      display: block;\n      color: var(--soft);\n      font-size: 13px;\n      line-height: 1.45;\n    }\n\n    .result, .fullResult {\n      display: none;\n      margin-top: 16px;\n    }\n\n    .result.show, .fullResult.show {\n      display: block;\n      animation: resultIn .42s ease both;\n    }\n\n    @keyframes resultIn {\n      from { opacity:0; transform:translateY(12px); }\n      to { opacity:1; transform:translateY(0); }\n    }\n\n    .resultHero, .fullHero {\n      border: 1px solid var(--line);\n      background:\n        radial-gradient(circle at 20% 20%, rgba(0,234,255,.14), transparent 30%),\n        rgba(255,255,255,.045);\n      border-radius: 26px;\n      padding: 22px;\n      margin-bottom: 14px;\n    }\n\n    .fullHero {\n      border-color: rgba(255,209,102,.34);\n      background:\n        radial-gradient(circle at 18% 18%, rgba(255,209,102,.14), transparent 30%),\n        radial-gradient(circle at 90% 5%, rgba(255,79,243,.14), transparent 35%),\n        rgba(255,255,255,.05);\n    }\n\n    .aiCard {\n      border: 1px solid rgba(0,234,255,.28);\n      background:\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.12), transparent 30%),\n        rgba(0,0,0,.22);\n      border-radius: 24px;\n      padding: 18px;\n      margin-top: 14px;\n    }\n\n    .resultTitle, .fullTitle {\n      font-size: clamp(28px, 4vw, 54px);\n      font-weight: 950;\n      letter-spacing: -2px;\n      margin: 8px 0 10px;\n      line-height: 1;\n    }\n\n    .scoreGrid {\n      display: grid;\n      grid-template-columns: repeat(4, 1fr);\n      gap: 10px;\n      margin: 14px 0;\n    }\n\n    .score {\n      border: 1px solid var(--line);\n      background: rgba(255,255,255,.055);\n      border-radius: 18px;\n      padding: 13px;\n      text-align: center;\n    }\n\n    .score b {\n      display: block;\n      font-size: 24px;\n      margin-bottom: 3px;\n    }\n\n    .success, .errorBox {\n      display: none;\n      border-radius: 20px;\n      padding: 15px;\n      margin-top: 14px;\n    }\n\n    .success {\n      border: 1px solid rgba(37,224,163,.34);\n      background: rgba(37,224,163,.08);\n      color: #caffdf;\n    }\n\n    .errorBox {\n      border: 1px solid rgba(255,77,109,.34);\n      background: rgba(255,77,109,.08);\n      color: #ffd5dd;\n    }\n\n    .success.show, .errorBox.show {\n      display: block;\n    }\n\n    details {\n      border: 1px solid var(--line);\n      background: rgba(0,0,0,.18);\n      border-radius: 20px;\n      padding: 14px;\n      margin-top: 14px;\n    }\n\n    summary {\n      cursor: pointer;\n      font-weight: 950;\n    }\n\n    pre {\n      background: rgba(0,0,0,.34);\n      border: 1px solid var(--line);\n      color: #dbe4ff;\n      border-radius: 18px;\n      padding: 16px;\n      overflow: auto;\n      white-space: pre-wrap;\n      min-height: 120px;\n    }\n\n    #progress {\n      position: fixed;\n      left: 0;\n      top: 0;\n      height: 3px;\n      width: 100%;\n      transform-origin: 0 50%;\n      transform: scaleX(0);\n      background: linear-gradient(90deg, var(--cyan), var(--violet), var(--pink));\n      z-index: 100;\n      pointer-events: none;\n    }\n\n    .stickyCta {\n      position: fixed;\n      left: 50%;\n      bottom: 18px;\n      z-index: 50;\n      transform: translateX(-50%) translateY(120px);\n      opacity: 0;\n      pointer-events: none;\n      display: none;\n      gap: 8px;\n      padding: 8px;\n      border: 1px solid rgba(255,255,255,.14);\n      background: rgba(6,8,20,.82);\n      border-radius: 22px;\n      box-shadow: 0 18px 60px rgba(0,0,0,.34);\n    }\n\n    .stickyCta.show {\n      transform: translateX(-50%) translateY(0);\n      opacity: 1;\n      pointer-events: auto;\n    }\n\n    .footer {\n      text-align: center;\n      color: var(--muted);\n      font-size: 13px;\n      padding: 30px 0 70px;\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      *, *::before, *::after {\n        animation-duration: .001ms !important;\n        animation-iteration-count: 1 !important;\n        transition-duration: .001ms !important;\n        scroll-behavior: auto !important;\n      }\n    }\n\n    @media (max-width: 980px) {\n      html { scroll-behavior: auto; }\n\n      .hero, .appGrid, .grid3, .grid4, .pricingGrid, .scoreGrid, .fullGrid {\n        grid-template-columns: 1fr;\n      }\n\n      .signalGrid, .heroBullets {\n        grid-template-columns: 1fr;\n      }\n\n      .stage {\n        min-height: 450px;\n      }\n\n      .card {\n        border-radius: 25px;\n      }\n\n      h1 {\n        letter-spacing: -2.5px;\n      }\n\n      .nav {\n        align-items: flex-start;\n        flex-direction: column;\n        position: relative;\n        top: auto;\n      }\n\n      .navlinks {\n        justify-content: flex-start;\n      }\n\n      .stickyCta {\n        display: flex;\n        width: calc(100% - 28px);\n        justify-content: center;\n      }\n\n      .stickyCta .btn, .stickyCta button {\n        flex: 1;\n        padding: 12px 10px;\n        font-size: 13px;\n      }\n\n      .chip {\n        font-size: 12px;\n      }\n\n      .chip.c1 { left: 2%; }\n      .chip.c2 { right: 2%; }\n      .chip.c3 { left: 3%; }\n      .chip.c4 { right: 4%; }\n    }\n      /* V42_CHECKOUT_FLOW_CSS */\n    .checkoutPanel {\n      display: none;\n      border: 1px solid rgba(255,209,102,.35);\n      background:\n        radial-gradient(circle at 20% 10%, rgba(255,209,102,.12), transparent 30%),\n        rgba(255,255,255,.045);\n      border-radius: 24px;\n      padding: 18px;\n      margin-top: 16px;\n    }\n\n    .checkoutPanel.show {\n      display: block;\n      animation: resultIn .42s ease both;\n    }\n\n    .checkoutGrid {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 14px;\n      margin-top: 14px;\n    }\n\n    .checkoutCard {\n      border: 1px solid var(--line);\n      background: rgba(0,0,0,.20);\n      border-radius: 20px;\n      padding: 16px;\n    }\n\n    .checkoutCard strong {\n      display: block;\n      margin-bottom: 8px;\n      font-size: 17px;\n    }\n\n    .paymentIdBox {\n      display: inline-flex;\n      padding: 7px 10px;\n      border-radius: 999px;\n      background: rgba(0,0,0,.28);\n      border: 1px solid rgba(255,255,255,.12);\n      color: var(--gold);\n      font-family: Consolas, monospace;\n      font-size: 13px;\n      margin: 8px 0;\n    }\n\n    @media (max-width: 980px) {\n      .checkoutGrid {\n        grid-template-columns: 1fr;\n      }\n    }\r\n      /* V44_EMAIL_DELIVERY_CLIENT_MESSAGE_FLOW_CSS */\n    .trustGrid,\n    .faqGrid {\n      display: grid;\n      gap: 14px;\n    }\n\n    .trustGrid {\n      grid-template-columns: repeat(4, 1fr);\n    }\n\n    .faqGrid {\n      grid-template-columns: repeat(2, 1fr);\n    }\n\n    .trustCard,\n    .faqCard {\n      border: 1px solid var(--line);\n      background: var(--glass2);\n      border-radius: 24px;\n      padding: 18px;\n    }\n\n    .trustCard strong,\n    .faqCard strong {\n      display: block;\n      margin-bottom: 8px;\n      font-size: 17px;\n    }\n\n    .legalLine {\n      border: 1px solid rgba(255,209,102,.28);\n      background: rgba(255,209,102,.08);\n      color: #ffe7a8;\n      border-radius: 20px;\n      padding: 16px;\n      margin-top: 16px;\n      line-height: 1.55;\n    }\n\n    .legalLinks {\n      display: flex;\n      gap: 8px;\n      flex-wrap: wrap;\n      margin-top: 14px;\n    }\n\n    @media (max-width: 980px) {\n      .trustGrid,\n      .faqGrid {\n        grid-template-columns: 1fr;\n      }\n    }\r\n  \u003c/style\u003e\n\u003c/head\u003e\n\n\u003cbody\u003e\n  \u003cdiv id=\"progress\"\u003e\u003c/div\u003e\n\n  \u003cdiv class=\"stickyCta\" id=\"stickyCta\"\u003e\n    \u003ca class=\"btn\" href=\"#create\"\u003eСъздай Twin\u003c/a\u003e\n    \u003ca class=\"btn secondary\" href=\"#unlock\"\u003eОтключи\u003c/a\u003e\n  \u003c/div\u003e\n\n  \u003cdiv class=\"wrap\"\u003e\n    \u003cnav class=\"nav\"\u003e\n      \u003cdiv class=\"brand\"\u003e\n        \u003cdiv class=\"logo\"\u003e\u003c/div\u003e\n        \u003cdiv\u003eAI Twin by SoulFlame\u003c/div\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"navlinks\"\u003e\n        \u003ca class=\"pill\" href=\"#create\"\u003eCreate Twin\u003c/a\u003e\n        \u003ca class=\"pill\" href=\"#unlock\"\u003eUnlock Full\u003c/a\u003e\n        \u003ca class=\"pill\" href=\"#pricing\"\u003eЦени\u003c/a\u003e\u003ca class=\"pill\" href=\"#trust\"\u003eTrust\u003c/a\u003e\u003ca class=\"pill\" href=\"#faq\"\u003eFAQ\u003c/a\u003e\n        \u003ca class=\"pill\" href=\"/test\" target=\"_blank\"\u003eTest\u003c/a\u003e\n        \u003ca class=\"pill\" href=\"/admin\" target=\"_blank\"\u003eAdmin\u003c/a\u003e\n      \u003c/div\u003e\n    \u003c/nav\u003e\n\n    \u003csection class=\"hero\"\u003e\n      \u003cdiv class=\"card\"\u003e\n        \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e V44 · Email Delivery Flow\u003c/div\u003e\n\n        \u003ch1\u003eСъздай и отключи своя \u003cspan class=\"grad\"\u003eFull AI Twin\u003c/span\u003e\u003c/h1\u003e\n\n        \u003cp\u003e\n          Първо създаваш безплатен Mini Twin. След това с unlock код отключваш Full AI Twin:\n          Future Twin послание, силни страни, рискове, 7-дневен план и следващ ход.\n        \u003c/p\u003e\n\n        \u003cp\u003e\n          Това вече е завършен продукт flow: \u003cspan class=\"green\"\u003eFree Twin → Request → Code → Full Twin Result\u003c/span\u003e.\n        \u003c/p\u003e\n\n        \u003cdiv class=\"actions\"\u003e\n          \u003ca class=\"btn\" href=\"#create\"\u003eСъздай AI Twin\u003c/a\u003e\n          \u003ca class=\"btn gold\" href=\"#unlock\"\u003eОтключи Full Twin\u003c/a\u003e\n          \u003cbutton class=\"secondary\" onclick=\"checkHealth()\"\u003eSystem Check\u003c/button\u003e\n        \u003c/div\u003e\n\n        \u003cdiv class=\"heroBullets\"\u003e\n          \u003cdiv class=\"heroBullet\"\u003e\u003cb\u003eMini Twin\u003c/b\u003eБезплатен старт\u003c/div\u003e\n          \u003cdiv class=\"heroBullet\"\u003e\u003cb\u003eUnlock Code\u003c/b\u003eКод от admin\u003c/div\u003e\n          \u003cdiv class=\"heroBullet\"\u003e\u003cb\u003eFull Report\u003c/b\u003eКрасив резултат\u003c/div\u003e\n        \u003c/div\u003e\n\n        \u003cdetails\u003e\n          \u003csummary\u003eLive System Status\u003c/summary\u003e\n          \u003cpre id=\"healthBox\"\u003eReady.\u003c/pre\u003e\n        \u003c/details\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card stage\" id=\"core\"\u003e\n        \u003cdiv class=\"device\" id=\"device\"\u003e\n          \u003cdiv class=\"halo\"\u003e\u003c/div\u003e\n          \u003cdiv class=\"orb\"\u003e\u003c/div\u003e\n          \u003cdiv class=\"shadowOrb\"\u003e\u003c/div\u003e\n\n          \u003cdiv class=\"chip c1\"\u003eMini Twin\u003csmall\u003efree signal\u003c/small\u003e\u003c/div\u003e\n          \u003cdiv class=\"chip c2\"\u003eUnlock Code\u003csmall\u003eadmin generated\u003c/small\u003e\u003c/div\u003e\n          \u003cdiv class=\"chip c3\"\u003eFull Echo\u003csmall\u003edeep blueprint\u003c/small\u003e\u003c/div\u003e\n          \u003cdiv class=\"chip c4\"\u003eFuture Twin\u003csmall\u003enext self\u003c/small\u003e\u003c/div\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection id=\"how\" class=\"section\"\u003e\n      \u003cdiv class=\"card light\"\u003e\n        \u003ch2\u003eКак работи\u003c/h2\u003e\n        \u003cp\u003eV41 добавя липсващата магия след плащане или admin код.\u003c/p\u003e\n\n        \u003cdiv class=\"grid3\"\u003e\n          \u003cdiv class=\"stepCard\"\u003e\n            \u003cdiv class=\"stepNumber\"\u003e1\u003c/div\u003e\n            \u003cstrong\u003eСъздай Mini Twin\u003c/strong\u003e\n            \u003cp\u003eПопълваш име, контакт, цел и избираш вътрешни Twin сигнали.\u003c/p\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"stepCard\"\u003e\n            \u003cdiv class=\"stepNumber\"\u003e2\u003c/div\u003e\n            \u003cstrong\u003eВземи unlock код\u003c/strong\u003e\n            \u003cp\u003eAdmin генерира код от dashboard или потвърждава плащане.\u003c/p\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"stepCard\"\u003e\n            \u003cdiv class=\"stepNumber\"\u003e3\u003c/div\u003e\n            \u003cstrong\u003eОтключи Full Twin\u003c/strong\u003e\n            \u003cp\u003eВъвеждаш кода и получаваш Full AI Twin report на самата страница.\u003c/p\u003e\n          \u003c/div\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection id=\"create\" class=\"section appGrid\"\u003e\n      \u003cdiv class=\"card light\"\u003e\n        \u003ch2\u003eТвоят Mini Twin\u003c/h2\u003e\n\n        \u003clabel\u003eИме\u003c/label\u003e\n        \u003cinput id=\"name\" placeholder=\"Например: Димитър\"\u003e\n\n        \u003clabel\u003eКонтакт\u003c/label\u003e\n        \u003cinput id=\"contact\" placeholder=\"email / телефон / Instagram\"\u003e\n\n        \u003clabel\u003eВъзраст\u003c/label\u003e\n        \u003cselect id=\"age\"\u003e\n          \u003coption\u003e18-24\u003c/option\u003e\n          \u003coption selected\u003e25-34\u003c/option\u003e\n          \u003coption\u003e35-44\u003c/option\u003e\n          \u003coption\u003e45+\u003c/option\u003e\n        \u003c/select\u003e\n\n        \u003clabel\u003eКакво искаш да прави твоят AI Twin?\u003c/label\u003e\n        \u003ctextarea id=\"goal\" placeholder=\"Например: да ме разбира, да ми помага с решения, бизнес, връзки, бъдещи избори...\"\u003e\u003c/textarea\u003e\n\n        \u003cdiv class=\"actions\"\u003e\n          \u003cbutton onclick=\"generateTwin()\"\u003eGenerate Mini Twin\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"demoTwin()\"\u003eDemo\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"resetTwin()\"\u003eReset\u003c/button\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card light\"\u003e\n        \u003ch2\u003eTwin Signals\u003c/h2\u003e\n        \u003cp\u003eИзбери вътрешните сигнали, които най-много приличат на теб.\u003c/p\u003e\n\n        \u003cdiv id=\"signals\" class=\"signalGrid\"\u003e\u003c/div\u003e\n\n        \u003cdiv id=\"successBox\" class=\"success\"\u003e\n          Mini AI Twin е записан успешно в SoulFlame cloud.\n        \u003c/div\u003e\n\n        \u003cdiv id=\"result\" class=\"result\"\u003e\n          \u003cdiv class=\"resultHero\"\u003e\n            \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e Mini Twin Activated\u003c/div\u003e\n            \u003cdiv id=\"resultTitle\" class=\"resultTitle\"\u003e\u003c/div\u003e\n            \u003cdiv id=\"resultText\"\u003e\u003c/div\u003e\n\n            \u003cdiv class=\"aiCard\" id=\"aiCard\"\u003e\n              \u003ch3\u003eMini AI Twin Card\u003c/h3\u003e\n              \u003cp id=\"aiCardText\"\u003eТвоята AI карта ще се появи тук.\u003c/p\u003e\n            \u003c/div\u003e\n          \u003c/div\u003e\n\n          \u003cdiv id=\"scoreGrid\" class=\"scoreGrid\"\u003e\u003c/div\u003e\n\n          \u003cdiv class=\"mini show\"\u003e\n            \u003ch3\u003eСледва: Full Twin\u003c/h3\u003e\n            \u003cp\u003e\n              Checkout Full Twin, вземи unlock код и отключи дълбокия резултат долу.\n            \u003c/p\u003e\n\n            \u003cdiv class=\"actions\"\u003e\n              \u003cbutton class=\"gold\" onclick=\"requestFullTwin()\"\u003eCheckout Full AI Twin\u003c/button\u003e\n              \u003ca class=\"btn secondary\" href=\"#unlock\"\u003eИмам код\u003c/a\u003e\n              \u003cbutton class=\"secondary\" onclick=\"copyTwin()\"\u003eКопирай Mini резултата\u003c/button\u003e\n            \u003c/div\u003e\n          \u003c/div\u003e\n\n          \u003cdetails\u003e\n            \u003csummary\u003eAdvanced API response\u003c/summary\u003e\n            \u003cpre id=\"apiBox\"\u003eReady.\u003c/pre\u003e\n          \u003c/details\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection id=\"checkout\" class=\"section\"\u003e\n      \u003cdiv class=\"card light\"\u003e\n        \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e Checkout Flow\u003c/div\u003e\n        \u003ch2\u003eПлащане за Full AI Twin\u003c/h2\u003e\n        \u003cp\u003e\n          След като заявиш Full AI Twin, системата създава payment request.\n          Ако има настроен payment link във Vercel Environment Variables, бутонът ще отвори директно плащане.\n        \u003c/p\u003e\n\n        \u003cdiv id=\"checkoutPanel\" class=\"checkoutPanel\"\u003e\n          \u003ch3\u003eCheckout created\u003c/h3\u003e\n          \u003cp id=\"checkoutText\"\u003ePayment request created.\u003c/p\u003e\n          \u003cdiv id=\"paymentIdBox\" class=\"paymentIdBox\"\u003epaymentId: pending\u003c/div\u003e\n\n          \u003cdiv class=\"checkoutGrid\"\u003e\n            \u003cdiv class=\"checkoutCard\"\u003e\n              \u003cstrong\u003e1. Плати\u003c/strong\u003e\n              \u003cp\u003eОтвори payment link и направи плащане.\u003c/p\u003e\n              \u003cdiv class=\"actions\"\u003e\n                \u003ca id=\"paymentLinkBtn\" class=\"btn gold\" href=\"#\" target=\"_blank\"\u003eOpen Payment Link\u003c/a\u003e\n              \u003c/div\u003e\n            \u003c/div\u003e\n\n            \u003cdiv class=\"checkoutCard\"\u003e\n              \u003cstrong\u003e2. Вземи код\u003c/strong\u003e\n              \u003cp\u003eСлед плащане admin потвърждава paymentId и генерира unlock code.\u003c/p\u003e\n              \u003cdiv class=\"actions\"\u003e\n                \u003ca class=\"btn secondary\" href=\"#unlock\"\u003eИмам код\u003c/a\u003e\n                \u003cbutton class=\"secondary\" onclick=\"copyPaymentInfo()\"\u003eCopy Payment Info\u003c/button\u003e\n              \u003c/div\u003e\n            \u003c/div\u003e\n          \u003c/div\u003e\n        \u003c/div\u003e\n\n        \u003cdetails\u003e\n          \u003csummary\u003eCheckout API response\u003c/summary\u003e\n          \u003cpre id=\"checkoutApiBox\"\u003eReady.\u003c/pre\u003e\n        \u003c/details\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n    \u003csection id=\"unlock\" class=\"section\"\u003e\n      \u003cdiv class=\"card light\"\u003e\n        \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e Full AI Twin Unlock\u003c/div\u003e\n        \u003ch2\u003eОтключи Full AI Twin\u003c/h2\u003e\n        \u003cp\u003e\n          Въведи unlock кода, който си получил. След успешно отключване ще видиш Full Twin report тук.\n        \u003c/p\u003e\n\n        \u003cdiv class=\"appGrid\"\u003e\n          \u003cdiv\u003e\n            \u003clabel\u003eUnlock code\u003c/label\u003e\n            \u003cinput id=\"unlockCode\" placeholder=\"Например: ECHO-ABCD-1234\"\u003e\n\n            \u003clabel\u003eИме за Full Report\u003c/label\u003e\n            \u003cinput id=\"unlockName\" placeholder=\"Ще се попълни автоматично, ако имаш Mini Twin\"\u003e\n\n            \u003cdiv class=\"actions\"\u003e\n              \u003cbutton class=\"gold\" onclick=\"unlockFullTwin()\"\u003eUnlock Full Twin\u003c/button\u003e\n              \u003cbutton class=\"secondary\" onclick=\"pasteDemoCode()\"\u003eDemo code format\u003c/button\u003e\n            \u003c/div\u003e\n\n            \u003cdiv id=\"unlockSuccess\" class=\"success\"\u003eFull AI Twin е отключен.\u003c/div\u003e\n            \u003cdiv id=\"unlockError\" class=\"errorBox\"\u003eГрешка при отключване.\u003c/div\u003e\n\n            \u003cdetails\u003e\n              \u003csummary\u003eUnlock API response\u003c/summary\u003e\n              \u003cpre id=\"unlockApiBox\"\u003eReady.\u003c/pre\u003e\n            \u003c/details\u003e\n          \u003c/div\u003e\n\n          \u003cdiv\u003e\n            \u003cdiv id=\"fullResult\" class=\"fullResult\"\u003e\n              \u003cdiv class=\"fullHero\"\u003e\n                \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e Full Twin Activated\u003c/div\u003e\n                \u003cdiv id=\"fullTitle\" class=\"fullTitle\"\u003e\u003c/div\u003e\n                \u003cp id=\"futureMessage\"\u003e\u003c/p\u003e\n              \u003c/div\u003e\n\n              \u003cdiv class=\"fullGrid\"\u003e\n                \u003cdiv class=\"fullBlock show\"\u003e\n                  \u003cstrong\u003e1. Core Strength\u003c/strong\u003e\n                  \u003cp id=\"strengthText\"\u003e\u003c/p\u003e\n                \u003c/div\u003e\n\n                \u003cdiv class=\"fullBlock show\"\u003e\n                  \u003cstrong\u003e2. Hidden Risk\u003c/strong\u003e\n                  \u003cp id=\"riskText\"\u003e\u003c/p\u003e\n                \u003c/div\u003e\n\n                \u003cdiv class=\"fullBlock show\"\u003e\n                  \u003cstrong\u003e3. 7-Day Action Plan\u003c/strong\u003e\n                  \u003cp id=\"planText\"\u003e\u003c/p\u003e\n                \u003c/div\u003e\n\n                \u003cdiv class=\"fullBlock show\"\u003e\n                  \u003cstrong\u003e4. Next Move\u003c/strong\u003e\n                  \u003cp id=\"nextMoveText\"\u003e\u003c/p\u003e\n                \u003c/div\u003e\n              \u003c/div\u003e\n\n              \u003cdiv class=\"actions\"\u003e\n                \u003cbutton class=\"gold\" onclick=\"copyFullReport()\"\u003eКопирай Full Report\u003c/button\u003e\n                \u003cbutton class=\"secondary\" onclick=\"saveFullReportAsProfile()\"\u003eЗапиши Full Report\u003c/button\u003e\n              \u003c/div\u003e\n            \u003c/div\u003e\n\n            \u003cdiv id=\"lockedPreview\" class=\"aiCard\"\u003e\n              \u003ch3\u003eFull Twin Preview\u003c/h3\u003e\n              \u003cp\u003e\n                Тук ще се появи отключеният Full AI Twin: Future message, силни страни, рискове и план.\n              \u003c/p\u003e\n            \u003c/div\u003e\n          \u003c/div\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection id=\"pricing\" class=\"section\"\u003e\n      \u003cdiv class=\"card light\"\u003e\n        \u003ch2\u003eПакети\u003c/h2\u003e\n        \u003cp\u003eЗапочваш безплатно. Отключваш Full Twin чрез код.\u003c/p\u003e\n\n        \u003cdiv class=\"pricingGrid\"\u003e\n          \u003cdiv class=\"priceCard\"\u003e\n            \u003ch3\u003eMini Twin\u003c/h3\u003e\n            \u003cdiv class=\"price\"\u003e0€\u003c/div\u003e\n            \u003cp\u003eПърви AI Twin seed.\u003c/p\u003e\n            \u003cdiv class=\"list\"\u003e\n              \u003cspan\u003eОсновен AI профил\u003c/span\u003e\n              \u003cspan\u003eTwin signals\u003c/span\u003e\n              \u003cspan\u003eCloud запис\u003c/span\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"actions\"\u003e\n              \u003ca class=\"btn secondary\" href=\"#create\"\u003eЗапочни\u003c/a\u003e\n            \u003c/div\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"priceCard featured\"\u003e\n            \u003ch3\u003eFull AI Twin\u003c/h3\u003e\n            \u003cdiv class=\"price\"\u003e19€\u003c/div\u003e\n            \u003cp\u003eОтключен Full Report.\u003c/p\u003e\n            \u003cdiv class=\"list\"\u003e\n              \u003cspan\u003eFuture Twin message\u003c/span\u003e\n              \u003cspan\u003eCore Strength\u003c/span\u003e\n              \u003cspan\u003eHidden Risk\u003c/span\u003e\n              \u003cspan\u003e7-Day Action Plan\u003c/span\u003e\n              \u003cspan\u003eUnlock code\u003c/span\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"actions\"\u003e\n              \u003ca class=\"btn gold\" href=\"#unlock\"\u003eОтключи\u003c/a\u003e\n            \u003c/div\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"priceCard\"\u003e\n            \u003ch3\u003eDeep Twin\u003c/h3\u003e\n            \u003cdiv class=\"price\"\u003e49€\u003c/div\u003e\n            \u003cp\u003eПо-дълбок анализ за развитие.\u003c/p\u003e\n            \u003cdiv class=\"list\"\u003e\n              \u003cspan\u003eПоведенчески цикли\u003c/span\u003e\n              \u003cspan\u003eСилни страни\u003c/span\u003e\n              \u003cspan\u003eРискове и блокажи\u003c/span\u003e\n              \u003cspan\u003eAI roadmap\u003c/span\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"actions\"\u003e\n              \u003ca class=\"btn secondary\" href=\"#create\"\u003eЗаяви\u003c/a\u003e\n            \u003c/div\u003e\n          \u003c/div\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection id=\"trust\" class=\"section\"\u003e\n      \u003cdiv class=\"card light\"\u003e\n        \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e Trust Layer\u003c/div\u003e\n        \u003ch2\u003eСигурност и доверие\u003c/h2\u003e\n        \u003cp\u003e\n          SoulFlame AI Twin е MVP, но вече има ясна структура: данни, privacy, disclaimer,\n          admin контрол и вътрешна analytics система.\n        \u003c/p\u003e\n\n        \u003cdiv class=\"trustGrid\"\u003e\n          \u003cdiv class=\"trustCard\"\u003e\n            \u003cstrong\u003ePrivacy-first MVP\u003c/strong\u003e\n            \u003cp\u003eСъбираме само данните, които въвеждаш доброволно за AI Twin профила.\u003c/p\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"trustCard\"\u003e\n            \u003cstrong\u003eNot medical advice\u003c/strong\u003e\n            \u003cp\u003eAI Twin е за самоанализ и креативна рефлексия, не за диагноза.\u003c/p\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"trustCard\"\u003e\n            \u003cstrong\u003eAdmin control\u003c/strong\u003e\n            \u003cp\u003eПрофили, заявки, кодове и събития се виждат в admin dashboard.\u003c/p\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"trustCard\"\u003e\n            \u003cstrong\u003eAnalytics events\u003c/strong\u003e\n            \u003cp\u003eВажни действия се записват като events, за да знаем какво работи.\u003c/p\u003e\n          \u003c/div\u003e\n        \u003c/div\u003e\n\n        \u003cdiv class=\"legalLine\"\u003e\n          AI Twin не заменя психолог, лекар, юрист или финансов консултант.\n          Резултатите са за лична рефлексия и продуктово преживяване.\n        \u003c/div\u003e\n\n        \u003cdiv class=\"legalLinks\"\u003e\n          \u003ca class=\"btn secondary\" href=\"/privacy\" target=\"_blank\"\u003ePrivacy Policy\u003c/a\u003e\n          \u003ca class=\"btn secondary\" href=\"/terms\" target=\"_blank\"\u003eTerms\u003c/a\u003e\n          \u003ca class=\"btn secondary\" href=\"/disclaimer\" target=\"_blank\"\u003eDisclaimer\u003c/a\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection id=\"faq\" class=\"section\"\u003e\n      \u003cdiv class=\"card light\"\u003e\n        \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e FAQ\u003c/div\u003e\n        \u003ch2\u003eЧести въпроси\u003c/h2\u003e\n\n        \u003cdiv class=\"faqGrid\"\u003e\n          \u003cdiv class=\"faqCard\"\u003e\n            \u003cstrong\u003eКакво е AI Twin?\u003c/strong\u003e\n            \u003cp\u003eДигитален профил, който започва от твоите сигнали, цел и поведенчески модел.\u003c/p\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"faqCard\"\u003e\n            \u003cstrong\u003eБезплатен ли е?\u003c/strong\u003e\n            \u003cp\u003eMini Twin е безплатен. Full Twin се отключва с код след заявка или плащане.\u003c/p\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"faqCard\"\u003e\n            \u003cstrong\u003eКъде отиват данните?\u003c/strong\u003e\n            \u003cp\u003eПрофилите и събитията се записват в Supabase backend на проекта.\u003c/p\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"faqCard\"\u003e\n            \u003cstrong\u003eТова психологическа диагноза ли е?\u003c/strong\u003e\n            \u003cp\u003eНе. Това е AI продукт за самоанализ, креативност и лична посока.\u003c/p\u003e\n          \u003c/div\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n    \u003cdiv class=\"footer\"\u003e\n      SoulFlame Twins · V44 Email Delivery Client Message Flow · Vercel + Supabase\n    \u003c/div\u003e\n  \u003c/div\u003e\n\n  \u003cscript\u003e\n    const signalDefs = [\n      { key: \"vision\", title: \"Vision Engine\", text: \"Виждам възможности преди да станат очевидни.\", score: 10 },\n      { key: \"logic\", title: \"System Mind\", text: \"Подреждам хаос в структура, план и стратегия.\", score: 10 },\n      { key: \"emotion\", title: \"Emotional Radar\", text: \"Усещам хора, сигнали и скрити настроения.\", score: 10 },\n      { key: \"action\", title: \"Momentum Core\", text: \"Искам движение, скорост и реален резултат.\", score: 10 },\n      { key: \"social\", title: \"Influence Layer\", text: \"Влияя чрез думи, присъствие и идея.\", score: 10 },\n      { key: \"future\", title: \"Future Self\", text: \"Мисля за версията ми след 1, 3 или 5 години.\", score: 10 },\n      { key: \"deep\", title: \"Deep Mind\", text: \"Искам да видя подсъзнателните си модели.\", score: 10 },\n      { key: \"creator\", title: \"Creator Mode\", text: \"Искам да създавам системи.\", score: 10 }\n    ];\n\n    const archetypes = {\n      vision: \"Future Architect\",\n      logic: \"Quantum System Builder\",\n      emotion: \"Emotional Mirror\",\n      action: \"Momentum Engine\",\n      social: \"Influence Twin\",\n      future: \"Future Self Twin\",\n      deep: \"Subconscious Explorer\",\n      creator: \"Creator Twin\"\n    };\n\n    const descriptions = {\n      vision: \"Твоят AI Twin мисли напред: идеи, сценарии, възможности и бъдещи системи.\",\n      logic: \"Твоят AI Twin подрежда хаоса: планове, стъпки, логика и решения.\",\n      emotion: \"Твоят AI Twin разчита емоционални сигнали: реакции, хора и връзки.\",\n      action: \"Твоят AI Twin те бута към действие: скорост, фокус и изпълнение.\",\n      social: \"Твоят AI Twin усилва влиянието ти: комуникация, позициониране и присъствие.\",\n      future: \"Твоят AI Twin говори като бъдеща версия на теб: предупреждения, избори и посока.\",\n      deep: \"Твоят AI Twin анализира дълбоки модели: страхове, мотивация и повторения.\",\n      creator: \"Твоят AI Twin работи като създател: бизнес, системи, идеи и реализация.\"\n    };\n\n    const selected = {};\n    let lastTwin = null;\n    let lastFullReport = null;\n\n    const byId = id =\u003e document.getElementById(id);\r\n\r\n    async function trackEvent(type, payload = {}) {\n      try {\n        await fetch(\"/api/event\", {\n          method: \"POST\",\n          headers: { \"Content-Type\": \"application/json\" },\n          body: JSON.stringify({\n            type,\n            page: location.pathname,\n            referrer: document.referrer || \"\",\n            payload: Object.assign({}, payload, {\n              path: location.pathname,\n              hash: location.hash || \"\",\n              title: document.title,\n              time: new Date().toISOString()\n            })\n          })\n        });\n      } catch {}\n    }\n\n    function setupV43Analytics() {\n      trackEvent(\"page_view\", {\n        url: location.href\n      });\n\n      document.addEventListener(\"click\", event =\u003e {\n        const target = event.target.closest(\"a, button, .signal\");\n        if (!target) return;\n\n        const section = target.closest(\"section\");\n        const label =\n          (target.innerText || target.getAttribute(\"href\") || target.id || target.className || \"click\")\n            .toString()\n            .trim()\n            .slice(0, 140);\n\n        trackEvent(\"ui_click\", {\n          label,\n          href: target.getAttribute(\"href\") || \"\",\n          section: section ? section.id || \"\" : \"\"\n        });\n      }, { passive: true });\n\n      const milestones = new Set();\n\n      window.addEventListener(\"scroll\", () =\u003e {\n        const max = document.documentElement.scrollHeight - window.innerHeight;\n        if (max \u003c= 0) return;\n\n        const percent = Math.round((window.scrollY / max) * 100);\n        const marks = [25, 50, 75, 100];\n\n        marks.forEach(mark =\u003e {\n          if (percent \u003e= mark \u0026\u0026 !milestones.has(mark)) {\n            milestones.add(mark);\n            trackEvent(\"scroll_depth\", { percent: mark });\n          }\n        });\n      }, { passive: true });\n    }\n\n\n    function showJson(id, data) {\n      const el = byId(id);\n      if (!el) return;\n      el.textContent = typeof data === \"string\" ? data : JSON.stringify(data, null, 2);\n    }\n\n    function renderSignals() {\n      const box = byId(\"signals\");\n      box.innerHTML = \"\";\n\n      signalDefs.forEach(signal =\u003e {\n        const div = document.createElement(\"div\");\n        div.className = \"signal\";\n        div.dataset.key = signal.key;\n        div.innerHTML = \"\u003cb\u003e\" + signal.title + \"\u003c/b\u003e\u003cspan\u003e\" + signal.text + \"\u003c/span\u003e\";\n\n        div.addEventListener(\"click\", () =\u003e {\n          selected[signal.key] = !selected[signal.key];\n          div.classList.toggle(\"active\", Boolean(selected[signal.key]));\n        });\n\n        box.appendChild(div);\n      });\n    }\n\n    async function checkHealth() {\n      showJson(\"healthBox\", \"Checking /api/health...\");\n\n      try {\n        const res = await fetch(\"/api/health\");\n        const data = await res.json();\n        showJson(\"healthBox\", data);\n      } catch (error) {\n        showJson(\"healthBox\", error.message);\n      }\n    }\n\n    function demoTwin() {\n      byId(\"name\").value = \"Demo Full Twin\";\n      byId(\"contact\").value = \"demo@soulflame.local\";\n      byId(\"age\").value = \"25-34\";\n      byId(\"goal\").value = \"Искам AI Twin, който ми помага да мисля по-ясно, да вземам решения и да развивам идеите си.\";\n\n      [\"vision\", \"logic\", \"future\", \"creator\"].forEach(key =\u003e selected[key] = true);\n\n      document.querySelectorAll(\".signal\").forEach(el =\u003e {\n        el.classList.toggle(\"active\", Boolean(selected[el.dataset.key]));\n      });\n\n      location.hash = \"#create\";\n    }\n\n    function buildScores() {\n      const scores = {};\n      signalDefs.forEach(signal =\u003e {\n        scores[signal.key] = selected[signal.key] ? signal.score : 2;\n      });\n      return scores;\n    }\n\n    function getTopSignals(scores) {\n      return Object.entries(scores).sort((a, b) =\u003e b[1] - a[1]);\n    }\n\n    async function generateTwin() {\n      const name = byId(\"name\").value.trim();\n      const contact = byId(\"contact\").value.trim();\n      const age = byId(\"age\").value;\n      const goal = byId(\"goal\").value.trim();\n\n      if (!name) {\n        alert(\"Попълни име.\");\n        return;\n      }\n\n      if (!contact) {\n        alert(\"Попълни контакт.\");\n        return;\n      }\n\n      const activeSignals = Object.keys(selected).filter(key =\u003e selected[key]);\n\n      if (!activeSignals.length) {\n        alert(\"Избери поне един Twin Signal.\");\n        return;\n      }\n\n      const scores = buildScores();\n      const top = getTopSignals(scores);\n      const mainKey = top[0][0];\n      const secondKey = top[1][0];\n\n      const profile = archetypes[mainKey] + \" + \" + archetypes[secondKey];\n      const report = descriptions[mainKey];\n\n      const fullReport =\n        \"Full AI Twin за \" + name + \": водещ слой \" + archetypes[mainKey] +\n        \", втори слой \" + archetypes[secondKey] +\n        \". Следва Future Twin message, личен план и deep Echo анализ.\";\n\n      lastTwin = {\n        id: Date.now(),\n        user: { name, contact, age, goal },\n        mainTrait: mainKey,\n        secondTrait: secondKey,\n        profile,\n        scores,\n        report,\n        fullReport,\n        selectedSignals: activeSignals,\n        product: \"AI Twin by SoulFlame\",\n        version: \"V44_EMAIL_DELIVERY_CLIENT_MESSAGE_FLOW\",\n        createdAt: new Date().toISOString()\n      };\n\n      localStorage.setItem(\"soulflame_last_twin\", JSON.stringify(lastTwin));\n\n      byId(\"unlockName\").value = name;\n\n      byId(\"result\").classList.add(\"show\");\n      byId(\"resultTitle\").textContent = profile;\n\n      byId(\"resultText\").innerHTML =\n        \"\u003cp\u003e\u003cstrong\u003e\" + name + \"\u003c/strong\u003e, твоят Mini Twin започва като \u003cstrong class=\u0027grad\u0027\u003e\" + archetypes[mainKey] + \"\u003c/strong\u003e.\u003c/p\u003e\" +\n        \"\u003cp\u003e\" + report + \"\u003c/p\u003e\" +\n        \"\u003cp\u003eВтори активен слой: \u003cstrong\u003e\" + archetypes[secondKey] + \"\u003c/strong\u003e.\u003c/p\u003e\" +\n        \"\u003cp class=\u0027gold\u0027\u003eMini Twin: active · Full Twin: locked\u003c/p\u003e\";\n\n      byId(\"aiCardText\").innerHTML =\n        \"\u003cstrong\u003e\" + profile + \"\u003c/strong\u003e\u003cbr\u003e\" +\n        \"Основна посока: \" + report + \"\u003cbr\u003e\" +\n        \"Следващо ниво: Full AI Twin с unlock code.\";\n\n      const grid = byId(\"scoreGrid\");\n      grid.innerHTML = \"\";\n\n      top.slice(0, 4).forEach(([key, value]) =\u003e {\n        const div = document.createElement(\"div\");\n        div.className = \"score\";\n        div.innerHTML = \"\u003cb\u003e\" + value + \"\u003c/b\u003e\u003cspan\u003e\" + archetypes[key] + \"\u003c/span\u003e\";\n        grid.appendChild(div);\n      });\n\n      await saveTwin(lastTwin);\n    }\n\n    async function saveTwin(twin) {\n      showJson(\"apiBox\", \"Saving Mini AI Twin to SoulFlame cloud...\");\n\n      try {\n        const res = await fetch(\"/api/profile\", {\n          method: \"POST\",\n          headers: { \"Content-Type\": \"application/json\" },\n          body: JSON.stringify(twin)\n        });\n\n        const data = await res.json();\n        showJson(\"apiBox\", data);\n\n        if (data.ok) {\n          byId(\"successBox\").classList.add(\"show\");\n        }\n      } catch (error) {\n        showJson(\"apiBox\", error.message);\n      }\n    }\n\n    let lastCheckout = null;\n\n    async function createCheckoutForFullTwin() {\n      if (!lastTwin) {\n        loadLastTwin();\n      }\n\n      if (!lastTwin) {\n        alert(\"Първо генерирай Mini Twin.\");\n        return;\n      }\n\n      showJson(\"checkoutApiBox\", \"Creating checkout...\");\n\n      try {\n        const res = await fetch(\"/api/checkout\", {\n          method: \"POST\",\n          headers: { \"Content-Type\": \"application/json\" },\n          body: JSON.stringify({\n            offer: \"Full AI Twin by SoulFlame\",\n            amount: \"19.00 EUR\",\n            provider: \"payment_link\",\n            user: lastTwin.user,\n            profile: lastTwin.profile,\n            scores: lastTwin.scores,\n            rawTwin: lastTwin\n          })\n        });\n\n        const data = await res.json();\n        showJson(\"checkoutApiBox\", data);\n\n        if (!data.ok) {\n          alert(data.error || \"Checkout failed.\");\n          return;\n        }\n\n        lastCheckout = data;\n        localStorage.setItem(\"soulflame_last_checkout\", JSON.stringify(data));\n\n        renderCheckout(data);\n        location.hash = \"#checkout\";\n      } catch (error) {\n        showJson(\"checkoutApiBox\", error.message);\n        alert(error.message);\n      }\n    }\n\n    function renderCheckout(data) {\n      const panel = byId(\"checkoutPanel\");\n      const text = byId(\"checkoutText\");\n      const paymentId = byId(\"paymentIdBox\");\n      const btn = byId(\"paymentLinkBtn\");\n\n      if (!panel) return;\n\n      panel.classList.add(\"show\");\n\n      const id =\n        data.payment \u0026\u0026 data.payment.id\n          ? data.payment.id\n          : \"pending\";\n\n      paymentId.textContent = \"paymentId: \" + id;\n\n      if (data.paymentUrl) {\n        text.innerHTML =\n          \"Payment link е активен. Плати, после admin потвърждава paymentId и получаваш unlock code.\";\n        btn.href = data.paymentUrl;\n        btn.style.display = \"inline-flex\";\n      } else {\n        text.innerHTML =\n          \"Payment request е създаден, но няма настроен payment link. Добави PAYMENT_LINK_FULL_TWIN във Vercel env или потвърди ръчно от admin.\";\n        btn.href = \"#\";\n        btn.style.display = \"none\";\n      }\n    }\n\n    function copyPaymentInfo() {\n      if (!lastCheckout) {\n        try {\n          const saved = localStorage.getItem(\"soulflame_last_checkout\");\n          if (saved) lastCheckout = JSON.parse(saved);\n        } catch {}\n      }\n\n      if (!lastCheckout) {\n        alert(\"Няма checkout info.\");\n        return;\n      }\n\n      const id =\n        lastCheckout.payment \u0026\u0026 lastCheckout.payment.id\n          ? lastCheckout.payment.id\n          : \"pending\";\n\n      const text =\n        \"SoulFlame Full AI Twin payment request\\n\" +\n        \"paymentId: \" + id + \"\\n\" +\n        \"offer: Full AI Twin by SoulFlame\\n\" +\n        \"amount: 19.00 EUR\\n\" +\n        \"paymentUrl: \" + (lastCheckout.paymentUrl || \"manual\") + \"\\n\";\n\n      navigator.clipboard.writeText(text);\n      alert(\"Payment info copied.\");\n    }\n\n    function restoreCheckout() {\n      try {\n        const saved = localStorage.getItem(\"soulflame_last_checkout\");\n        if (saved) {\n          lastCheckout = JSON.parse(saved);\n          renderCheckout(lastCheckout);\n        }\n      } catch {}\n    }\n\r\n    async function requestFullTwin() {\r\n      await createCheckoutForFullTwin();\r\n    }\r\n\r\n    function loadLastTwin() {\n      try {\n        const saved = localStorage.getItem(\"soulflame_last_twin\");\n        if (saved) {\n          lastTwin = JSON.parse(saved);\n          if (lastTwin.user \u0026\u0026 lastTwin.user.name) {\n            byId(\"unlockName\").value = lastTwin.user.name;\n          }\n        }\n      } catch {}\n    }\n\n    function makeFullReport(codeData) {\n      loadLastTwin();\n\n      const name =\n        byId(\"unlockName\").value.trim() ||\n        (lastTwin \u0026\u0026 lastTwin.user \u0026\u0026 lastTwin.user.name) ||\n        \"SoulFlame User\";\n\n      const profile =\n        lastTwin \u0026\u0026 lastTwin.profile\n          ? lastTwin.profile\n          : \"Future Architect + Quantum System Builder\";\n\n      const mainTrait =\n        lastTwin \u0026\u0026 lastTwin.mainTrait\n          ? lastTwin.mainTrait\n          : \"vision\";\n\n      const secondTrait =\n        lastTwin \u0026\u0026 lastTwin.secondTrait\n          ? lastTwin.secondTrait\n          : \"logic\";\n\n      const mainName = archetypes[mainTrait] || \"Future Architect\";\n      const secondName = archetypes[secondTrait] || \"Quantum System Builder\";\n\n      const futureMessage =\n        name + \", твоят Future Twin казва: не чакай да станеш готов. Ти се изграждаш чрез действие. \" +\n        \"Следващата версия на теб не идва от мотивация, а от система, която повтаряш всеки ден.\";\n\n      const strength =\n        \"Твоята основна сила е комбинацията между \" + mainName + \" и \" + secondName +\n        \". Това означава, че можеш да виждаш посока и да я превръщаш в структура.\";\n\n      const risk =\n        \"Скритият риск е да държиш прекалено много идеи отворени едновременно. Когато всичко е важно, мозъкът губи фокус. \" +\n        \"Твоят Full Twin трябва да те връща към 1 главен ход.\";\n\n      const plan =\n        \"Ден 1: избери една цел. Ден 2: напиши 3 стъпки. Ден 3: направи първата версия. \" +\n        \"Ден 4: покажи я на човек. Ден 5: вземи обратна връзка. Ден 6: подобри. Ден 7: публикувай или продай.\";\n\n      const nextMove =\n        \"Следващият ход е да превърнеш идеята в публичен резултат: страница, демо, пост или оферта. \" +\n        \"Не усъвършенствай скрито. Изкарвай навън.\";\n\n      return {\n        name,\n        profile,\n        mainTrait,\n        secondTrait,\n        code: codeData,\n        futureMessage,\n        strength,\n        risk,\n        plan,\n        nextMove,\n        unlockedAt: new Date().toISOString(),\n        version: \"V44_EMAIL_DELIVERY_CLIENT_MESSAGE_FLOW\"\n      };\n    }\n\n    async function unlockFullTwin() {\n      const code = byId(\"unlockCode\").value.trim().toUpperCase();\n\n      byId(\"unlockSuccess\").classList.remove(\"show\");\n      byId(\"unlockError\").classList.remove(\"show\");\n\n      if (!code) {\n        alert(\"Въведи unlock код.\");\n        return;\n      }\n\n      showJson(\"unlockApiBox\", \"Unlocking Full AI Twin...\");\n\n      try {\n        const res = await fetch(\"/api/unlock\", {\n          method: \"POST\",\n          headers: { \"Content-Type\": \"application/json\" },\n          body: JSON.stringify({\n            code,\n            user: lastTwin ? lastTwin.user : { name: byId(\"unlockName\").value.trim() },\n            profileId: lastTwin ? lastTwin.id : null\n          })\n        });\n\n        const data = await res.json();\n        showJson(\"unlockApiBox\", data);\n\n        if (!data.ok) {\n          byId(\"unlockError\").textContent = data.error || \"Unlock failed.\";\n          byId(\"unlockError\").classList.add(\"show\");\n          return;\n        }\n\n        lastFullReport = makeFullReport(data.code);\n        localStorage.setItem(\"soulflame_last_full_report\", JSON.stringify(lastFullReport));\n\n        renderFullReport(lastFullReport);\n\n        byId(\"unlockSuccess\").classList.add(\"show\");\n        byId(\"lockedPreview\").style.display = \"none\";\n      } catch (error) {\n        showJson(\"unlockApiBox\", error.message);\n        byId(\"unlockError\").textContent = error.message;\n        byId(\"unlockError\").classList.add(\"show\");\n      }\n    }\n\n    function renderFullReport(report) {\n      byId(\"fullResult\").classList.add(\"show\");\n      byId(\"fullTitle\").textContent = report.profile;\n      byId(\"futureMessage\").textContent = report.futureMessage;\n      byId(\"strengthText\").textContent = report.strength;\n      byId(\"riskText\").textContent = report.risk;\n      byId(\"planText\").textContent = report.plan;\n      byId(\"nextMoveText\").textContent = report.nextMove;\n      location.hash = \"#unlock\";\n    }\n\n    function pasteDemoCode() {\n      byId(\"unlockCode\").value = \"ECHO-XXXX-XXXX\";\n      alert(\"Това е само формат. Истински код се генерира от /admin.\");\n    }\n\n    function copyTwin() {\n      if (!lastTwin) {\n        loadLastTwin();\n      }\n\n      if (!lastTwin) {\n        alert(\"Няма Mini Twin за копиране.\");\n        return;\n      }\n\n      const text =\n        \"AI Twin by SoulFlame\\n\" +\n        \"Име: \" + lastTwin.user.name + \"\\n\" +\n        \"Профил: \" + lastTwin.profile + \"\\n\" +\n        \"Report: \" + lastTwin.report + \"\\n\";\n\n      navigator.clipboard.writeText(text);\n      alert(\"Mini Twin резултатът е копиран.\");\n    }\n\n    function copyFullReport() {\n      if (!lastFullReport) {\n        try {\n          const saved = localStorage.getItem(\"soulflame_last_full_report\");\n          if (saved) lastFullReport = JSON.parse(saved);\n        } catch {}\n      }\n\n      if (!lastFullReport) {\n        alert(\"Няма Full Report за копиране.\");\n        return;\n      }\n\n      const text =\n        \"FULL AI TWIN by SoulFlame\\n\\n\" +\n        \"Име: \" + lastFullReport.name + \"\\n\" +\n        \"Профил: \" + lastFullReport.profile + \"\\n\\n\" +\n        \"Future Message:\\n\" + lastFullReport.futureMessage + \"\\n\\n\" +\n        \"Core Strength:\\n\" + lastFullReport.strength + \"\\n\\n\" +\n        \"Hidden Risk:\\n\" + lastFullReport.risk + \"\\n\\n\" +\n        \"7-Day Plan:\\n\" + lastFullReport.plan + \"\\n\\n\" +\n        \"Next Move:\\n\" + lastFullReport.nextMove + \"\\n\";\n\n      navigator.clipboard.writeText(text);\n      alert(\"Full Report е копиран.\");\n    }\n\n    async function saveFullReportAsProfile() {\n      if (!lastFullReport) {\n        alert(\"Първо отключи Full Twin.\");\n        return;\n      }\n\n      const body = {\n        id: Date.now(),\n        user: {\n          name: lastFullReport.name,\n          contact: lastTwin \u0026\u0026 lastTwin.user ? lastTwin.user.contact : \"\",\n          goal: \"Full AI Twin unlocked\",\n          age: lastTwin \u0026\u0026 lastTwin.user ? lastTwin.user.age : \"\"\n        },\n        mainTrait: lastFullReport.mainTrait,\n        secondTrait: lastFullReport.secondTrait,\n        profile: lastFullReport.profile,\n        scores: lastTwin ? lastTwin.scores : {},\n        report: lastFullReport.futureMessage,\n        fullReport: JSON.stringify(lastFullReport, null, 2),\n        product: \"Full AI Twin by SoulFlame\",\n        version: \"V44_EMAIL_DELIVERY_CLIENT_MESSAGE_FLOW\",\n        createdAt: new Date().toISOString()\n      };\n\n      try {\n        const res = await fetch(\"/api/profile\", {\n          method: \"POST\",\n          headers: { \"Content-Type\": \"application/json\" },\n          body: JSON.stringify(body)\n        });\n\n        const data = await res.json();\n        showJson(\"unlockApiBox\", data);\n\n        if (data.ok) {\n          alert(\"Full Report е записан.\");\n        }\n      } catch (error) {\n        showJson(\"unlockApiBox\", error.message);\n      }\n    }\n\n    function resetTwin() {\n      Object.keys(selected).forEach(key =\u003e delete selected[key]);\n      document.querySelectorAll(\".signal\").forEach(el =\u003e el.classList.remove(\"active\"));\n      byId(\"result\").classList.remove(\"show\");\n      byId(\"successBox\").classList.remove(\"show\");\n      showJson(\"apiBox\", \"Ready.\");\n      lastTwin = null;\n      localStorage.removeItem(\"soulflame_last_twin\");\n    }\n\n    function setupReveal() {\n      const items = document.querySelectorAll(\".mini, .priceCard, .stepCard, .fullBlock\");\n\n      if (!(\"IntersectionObserver\" in window)) {\n        items.forEach(el =\u003e el.classList.add(\"show\"));\n        return;\n      }\n\n      const io = new IntersectionObserver(entries =\u003e {\n        entries.forEach(entry =\u003e {\n          if (entry.isIntersecting) {\n            entry.target.classList.add(\"show\");\n            io.unobserve(entry.target);\n          }\n        });\n      }, { threshold: .12 });\n\n      items.forEach(el =\u003e io.observe(el));\n    }\n\n    function setupLightParallax() {\n      const device = byId(\"device\");\n      const reduce = window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches;\n\n      if (!device || reduce || window.innerWidth \u003c 980) return;\n\n      let tx = 0;\n      let ty = 0;\n      let cx = 0;\n      let cy = 0;\n      let ticking = false;\n\n      window.addEventListener(\"pointermove\", event =\u003e {\n        const x = event.clientX / window.innerWidth - .5;\n        const y = event.clientY / window.innerHeight - .5;\n\n        tx = x * 10;\n        ty = y * -10;\n\n        if (!ticking) {\n          ticking = true;\n          requestAnimationFrame(loop);\n        }\n      }, { passive: true });\n\n      function loop() {\n        cx += (tx - cx) * .08;\n        cy += (ty - cy) * .08;\n\n        device.style.transform = \"rotateY(\" + cx.toFixed(2) + \"deg) rotateX(\" + cy.toFixed(2) + \"deg)\";\n\n        if (Math.abs(tx - cx) \u003e .02 || Math.abs(ty - cy) \u003e .02) {\n          requestAnimationFrame(loop);\n        } else {\n          ticking = false;\n        }\n      }\n    }\n\n    function setupProgressAndSticky() {\n      const progress = byId(\"progress\");\n      const sticky = byId(\"stickyCta\");\n      let ticking = false;\n\n      window.addEventListener(\"scroll\", () =\u003e {\n        if (ticking) return;\n        ticking = true;\n\n        requestAnimationFrame(() =\u003e {\n          const max = document.documentElement.scrollHeight - window.innerHeight;\n          const value = max \u003e 0 ? window.scrollY / max : 0;\n\n          if (progress) {\n            progress.style.transform = \"scaleX(\" + Math.max(0, Math.min(1, value)).toFixed(4) + \")\";\n          }\n\n          if (sticky) {\n            sticky.classList.toggle(\"show\", window.scrollY \u003e 650);\n          }\n\n          ticking = false;\n        });\n      }, { passive: true });\n    }\n\n    function restoreSaved() {\n      loadLastTwin();\n\n      try {\n        const savedFull = localStorage.getItem(\"soulflame_last_full_report\");\n        if (savedFull) {\n          lastFullReport = JSON.parse(savedFull);\n        }\n      } catch {}\n    }\n\n    setupV43Analytics();\r\n    renderSignals();\n    setupReveal();\n    setupLightParallax();\n    setupProgressAndSticky();\n    restoreSaved();\r\n    restoreCheckout();\n    checkHealth();\n  \u003c/script\u003e\n\u003c/body\u003e\n\u003c/html\u003e";
const INLINE_ADMIN_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"\u003e\n  \u003ctitle\u003eSoulFlame Admin — Email Delivery\u003c/title\u003e\n  \u003cmeta name=\"theme-color\" content=\"#050611\"\u003e\n\n  \u003cstyle\u003e\n    :root {\n      --bg0:#03040a;\n      --bg1:#080b1f;\n      --bg2:#111a46;\n      --text:#f8f7ff;\n      --soft:#b9c3e8;\n      --muted:#7f8ab4;\n      --line:rgba(255,255,255,.14);\n      --glass:rgba(255,255,255,.078);\n      --glass2:rgba(255,255,255,.045);\n      --cyan:#00eaff;\n      --violet:#7c3cff;\n      --pink:#ff4ff3;\n      --gold:#ffd166;\n      --green:#23e6a8;\n      --red:#ff4d6d;\n      --shadow:0 28px 90px rgba(0,0,0,.42);\n    }\n\n    * { box-sizing: border-box; }\n\n    html { background: var(--bg0); }\n\n    body {\n      margin: 0;\n      min-height: 100vh;\n      font-family: Arial, Helvetica, sans-serif;\n      color: var(--text);\n      background:\n        radial-gradient(circle at 15% 8%, rgba(124,60,255,.28), transparent 32rem),\n        radial-gradient(circle at 86% 12%, rgba(0,234,255,.16), transparent 30rem),\n        linear-gradient(135deg, var(--bg0), var(--bg1) 48%, var(--bg2));\n      -webkit-font-smoothing: antialiased;\n    }\n\n    .wrap {\n      width: min(1320px, 100%);\n      margin: 0 auto;\n      padding: 22px;\n    }\n\n    .nav {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 14px;\n      padding: 14px;\n      border: 1px solid var(--line);\n      background: rgba(6,8,20,.72);\n      border-radius: 24px;\n      box-shadow: 0 16px 45px rgba(0,0,0,.24);\n      margin-bottom: 18px;\n    }\n\n    .brand {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      font-weight: 950;\n      letter-spacing: -.5px;\n    }\n\n    .logo {\n      width: 42px;\n      height: 42px;\n      border-radius: 16px;\n      background:\n        radial-gradient(circle at 30% 22%, #fff, transparent 15%),\n        linear-gradient(135deg, var(--cyan), var(--violet), var(--pink));\n      box-shadow: 0 0 34px rgba(124,60,255,.42);\n    }\n\n    .links {\n      display: flex;\n      gap: 8px;\n      flex-wrap: wrap;\n    }\n\n    a, button {\n      border: 0;\n      cursor: pointer;\n      color: white;\n      text-decoration: none;\n      background: linear-gradient(135deg, var(--violet), #3f8dff);\n      border-radius: 14px;\n      padding: 12px 14px;\n      font-weight: 900;\n      font-size: 14px;\n      transition: transform .18s ease, filter .18s ease;\n    }\n\n    a:hover, button:hover {\n      transform: translateY(-2px);\n      filter: saturate(1.1);\n    }\n\n    button.secondary, a.secondary {\n      background: rgba(255,255,255,.08);\n      border: 1px solid var(--line);\n    }\n\n    button.gold {\n      background: linear-gradient(135deg, #ffb703, #ff4ff3);\n    }\n\n    button.red {\n      background: linear-gradient(135deg, #ff4d6d, #7c3cff);\n    }\n\n    .hero {\n      display: grid;\n      grid-template-columns: 1fr .9fr;\n      gap: 18px;\n      margin-bottom: 18px;\n    }\n\n    .card {\n      border: 1px solid var(--line);\n      background:\n        linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.045)),\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.08), transparent 38%);\n      border-radius: 26px;\n      padding: 22px;\n      box-shadow: var(--shadow);\n      overflow: hidden;\n    }\n\n    h1 {\n      margin: 0 0 12px;\n      font-size: clamp(34px, 5vw, 70px);\n      line-height: .92;\n      letter-spacing: -2.5px;\n    }\n\n    h2 {\n      margin: 0 0 12px;\n      font-size: 26px;\n      letter-spacing: -.8px;\n    }\n\n    h3 {\n      margin: 0 0 8px;\n      font-size: 18px;\n    }\n\n    p {\n      margin: 0 0 12px;\n      color: var(--soft);\n      line-height: 1.55;\n    }\n\n    .grad {\n      background: linear-gradient(90deg, var(--cyan), #5ca8ff, var(--violet), var(--pink));\n      -webkit-background-clip: text;\n      background-clip: text;\n      color: transparent;\n    }\n\n    .badge {\n      display: inline-flex;\n      align-items: center;\n      gap: 9px;\n      border: 1px solid rgba(255,255,255,.14);\n      background: rgba(0,0,0,.20);\n      color: var(--soft);\n      padding: 8px 12px;\n      border-radius: 999px;\n      font-size: 13px;\n      font-weight: 950;\n      margin-bottom: 14px;\n    }\n\n    .dot {\n      width: 9px;\n      height: 9px;\n      border-radius: 99px;\n      background: var(--green);\n      box-shadow: 0 0 16px var(--green);\n    }\n\n    .pinBox {\n      display: grid;\n      grid-template-columns: 1fr auto auto;\n      gap: 10px;\n      align-items: center;\n      margin-top: 14px;\n    }\n\n    input, select, textarea {\n      width: 100%;\n      border: 1px solid var(--line);\n      background: rgba(0,0,0,.28);\n      color: var(--text);\n      border-radius: 14px;\n      padding: 13px 14px;\n      outline: none;\n      font-size: 14px;\n    }\n\n    textarea {\n      min-height: 180px;\n      resize: vertical;\n      line-height: 1.45;\n    }\n\n    input:focus, textarea:focus, select:focus {\n      border-color: rgba(0,234,255,.48);\n      box-shadow: 0 0 0 4px rgba(0,234,255,.07);\n    }\n\n    .metrics {\n      display: grid;\n      grid-template-columns: repeat(5, 1fr);\n      gap: 12px;\n      margin-bottom: 18px;\n    }\n\n    .metric {\n      border: 1px solid var(--line);\n      background: rgba(255,255,255,.045);\n      border-radius: 20px;\n      padding: 16px;\n    }\n\n    .metric b {\n      display: block;\n      font-size: 30px;\n      margin-bottom: 4px;\n    }\n\n    .metric span {\n      color: var(--soft);\n      font-size: 13px;\n      font-weight: 800;\n    }\n\n    .tools {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 14px;\n      margin-bottom: 18px;\n    }\n\n    .emailGrid {\n      display: grid;\n      grid-template-columns: .8fr 1.2fr;\n      gap: 14px;\n      margin-bottom: 18px;\n    }\n\n    .templateGrid {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 8px;\n      margin: 10px 0;\n    }\n\n    .tabs {\n      display: flex;\n      gap: 8px;\n      flex-wrap: wrap;\n      margin-bottom: 14px;\n    }\n\n    .tab {\n      background: rgba(255,255,255,.08);\n      border: 1px solid var(--line);\n    }\n\n    .tab.active {\n      background: linear-gradient(135deg, rgba(124,60,255,.9), rgba(0,234,255,.62));\n      border-color: rgba(0,234,255,.32);\n    }\n\n    .searchLine {\n      display: grid;\n      grid-template-columns: 1fr auto auto;\n      gap: 10px;\n      margin-bottom: 14px;\n    }\n\n    .tableWrap {\n      overflow: auto;\n      border: 1px solid var(--line);\n      border-radius: 20px;\n      background: rgba(0,0,0,.20);\n      max-height: 560px;\n    }\n\n    table {\n      width: 100%;\n      border-collapse: collapse;\n      min-width: 900px;\n    }\n\n    th, td {\n      padding: 12px;\n      border-bottom: 1px solid rgba(255,255,255,.08);\n      text-align: left;\n      vertical-align: top;\n      font-size: 13px;\n    }\n\n    th {\n      position: sticky;\n      top: 0;\n      z-index: 2;\n      background: rgba(10,12,28,.95);\n      color: var(--soft);\n      font-size: 12px;\n      text-transform: uppercase;\n      letter-spacing: .6px;\n    }\n\n    tr:hover td {\n      background: rgba(255,255,255,.035);\n    }\n\n    .tag {\n      display: inline-flex;\n      border: 1px solid rgba(255,255,255,.12);\n      background: rgba(255,255,255,.06);\n      color: var(--soft);\n      border-radius: 999px;\n      padding: 5px 8px;\n      font-size: 12px;\n      font-weight: 800;\n      white-space: nowrap;\n    }\n\n    .tag.green {\n      color: #caffdf;\n      border-color: rgba(35,230,168,.3);\n      background: rgba(35,230,168,.08);\n    }\n\n    .tag.gold {\n      color: #ffe7a8;\n      border-color: rgba(255,209,102,.3);\n      background: rgba(255,209,102,.08);\n    }\n\n    .tag.red {\n      color: #ffc1cc;\n      border-color: rgba(255,77,109,.3);\n      background: rgba(255,77,109,.08);\n    }\n\n    .mono {\n      font-family: Consolas, monospace;\n      color: #dbe4ff;\n    }\n\n    .raw {\n      min-height: 240px;\n      max-height: 520px;\n      overflow: auto;\n      background: rgba(0,0,0,.35);\n      border: 1px solid var(--line);\n      color: #dbe4ff;\n      border-radius: 18px;\n      padding: 16px;\n      white-space: pre-wrap;\n      font-family: Consolas, monospace;\n      font-size: 13px;\n    }\n\n    .small {\n      font-size: 12px;\n      color: var(--muted);\n    }\n\n    .footer {\n      color: var(--muted);\n      text-align: center;\n      font-size: 13px;\n      padding: 24px 0 40px;\n    }\n\n    @media(max-width: 980px) {\n      .hero, .tools, .metrics, .emailGrid {\n        grid-template-columns: 1fr;\n      }\n\n      .pinBox, .searchLine, .templateGrid {\n        grid-template-columns: 1fr;\n      }\n\n      .nav {\n        align-items: flex-start;\n        flex-direction: column;\n      }\n\n      .links {\n        justify-content: flex-start;\n      }\n    }\n  \u003c/style\u003e\n\u003c/head\u003e\n\n\u003cbody\u003e\n  \u003cdiv class=\"wrap\"\u003e\n    \u003cnav class=\"nav\"\u003e\n      \u003cdiv class=\"brand\"\u003e\n        \u003cdiv class=\"logo\"\u003e\u003c/div\u003e\n        \u003cdiv\u003eSoulFlame Admin Pro\u003c/div\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"links\"\u003e\n        \u003ca class=\"secondary\" href=\"/\" target=\"_blank\"\u003eSite\u003c/a\u003e\n        \u003ca class=\"secondary\" href=\"/test\" target=\"_blank\"\u003eTest\u003c/a\u003e\n        \u003cbutton class=\"secondary\" onclick=\"loadAll()\"\u003eRefresh\u003c/button\u003e\n        \u003cbutton class=\"secondary\" onclick=\"exportJson()\"\u003eExport JSON\u003c/button\u003e\n      \u003c/div\u003e\n    \u003c/nav\u003e\n\n    \u003csection class=\"hero\"\u003e\n      \u003cdiv class=\"card\"\u003e\n        \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e V44 · Email Delivery Flow\u003c/div\u003e\n        \u003ch1\u003eAI Twin \u003cspan class=\"grad\"\u003eDelivery Room\u003c/span\u003e\u003c/h1\u003e\n        \u003cp\u003e\n          Това е командният център за профили, заявки, плащания, unlock кодове и email/client delivery.\n        \u003c/p\u003e\n\n        \u003cdiv class=\"pinBox\"\u003e\n          \u003cinput id=\"pin\" placeholder=\"ECHO_ADMIN_PIN\"\u003e\n          \u003cbutton onclick=\"savePin()\"\u003eSave PIN\u003c/button\u003e\n          \u003cbutton class=\"gold\" onclick=\"loadAll()\"\u003eLoad Data\u003c/button\u003e\n        \u003c/div\u003e\n\n        \u003cp class=\"small\" style=\"margin-top:10px\"\u003e\n          PIN се пази само локално в браузъра. За реално email изпращане сложи RESEND_API_KEY и EMAIL_FROM във Vercel env.\n        \u003c/p\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eSystem Status\u003c/h2\u003e\n        \u003cp id=\"systemText\"\u003eReady.\u003c/p\u003e\n        \u003cdiv class=\"links\"\u003e\n          \u003cbutton onclick=\"health()\"\u003eHealth\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"metricsOnly()\"\u003eMetrics\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"clearLocal()\"\u003eClear PIN\u003c/button\u003e\n        \u003c/div\u003e\n        \u003cpre class=\"raw\" id=\"statusBox\"\u003eReady.\u003c/pre\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection class=\"metrics\"\u003e\n      \u003cdiv class=\"metric\"\u003e\u003cb id=\"mProfiles\"\u003e0\u003c/b\u003e\u003cspan\u003eProfiles\u003c/span\u003e\u003c/div\u003e\n      \u003cdiv class=\"metric\"\u003e\u003cb id=\"mLeads\"\u003e0\u003c/b\u003e\u003cspan\u003eLeads\u003c/span\u003e\u003c/div\u003e\n      \u003cdiv class=\"metric\"\u003e\u003cb id=\"mPayments\"\u003e0\u003c/b\u003e\u003cspan\u003ePayments\u003c/span\u003e\u003c/div\u003e\n      \u003cdiv class=\"metric\"\u003e\u003cb id=\"mCodes\"\u003e0\u003c/b\u003e\u003cspan\u003eUnlock Codes\u003c/span\u003e\u003c/div\u003e\n      \u003cdiv class=\"metric\"\u003e\u003cb id=\"mEvents\"\u003e0\u003c/b\u003e\u003cspan\u003eEvents\u003c/span\u003e\u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection class=\"emailGrid\"\u003e\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eEmail / Client Message\u003c/h2\u003e\n        \u003cp\u003eИзбери template, попълни контакт и прати или копирай съобщението.\u003c/p\u003e\n\n        \u003clabel\u003eRecipient email/contact\u003c/label\u003e\n        \u003cinput id=\"emailTo\" placeholder=\"client@email.com\"\u003e\n\n        \u003clabel\u003eSubject\u003c/label\u003e\n        \u003cinput id=\"emailSubject\" placeholder=\"SoulFlame AI Twin\"\u003e\n\n        \u003clabel\u003eTemplates\u003c/label\u003e\n        \u003cdiv class=\"templateGrid\"\u003e\n          \u003cbutton class=\"secondary\" onclick=\"templatePaymentInstructions()\"\u003ePayment Instructions\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"templateUnlockCode()\"\u003eUnlock Code\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"templateFullReportReady()\"\u003eFull Report Ready\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"templateFollowUp()\"\u003eFollow-up\u003c/button\u003e\n        \u003c/div\u003e\n\n        \u003clabel\u003eMessage\u003c/label\u003e\n        \u003ctextarea id=\"emailMessage\" placeholder=\"Client message...\"\u003e\u003c/textarea\u003e\n\n        \u003cdiv class=\"links\" style=\"margin-top:12px\"\u003e\n          \u003cbutton class=\"gold\" onclick=\"sendEmail()\"\u003eSend / Prepare Email\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"copyEmailMessage()\"\u003eCopy Message\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"openMailto()\"\u003eOpen Mail App\u003c/button\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eDelivery Response\u003c/h2\u003e\n        \u003cp\u003e\n          Ако Resend не е настроен, системата ще върне manual_copy mode — пак е полезно, защото дава готов текст.\n        \u003c/p\u003e\n        \u003cpre class=\"raw\" id=\"emailBox\"\u003eReady.\u003c/pre\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection class=\"tools\"\u003e\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eGenerate Unlock Code\u003c/h2\u003e\n        \u003cp\u003eСъздава код за Full AI Twin.\u003c/p\u003e\n\n        \u003cinput id=\"codeOffer\" value=\"Full AI Twin\" placeholder=\"Offer\"\u003e\n        \u003cbr\u003e\u003cbr\u003e\n        \u003cinput id=\"codeNote\" placeholder=\"Note / client / payment reference\"\u003e\n        \u003cbr\u003e\u003cbr\u003e\n        \u003cbutton class=\"gold\" onclick=\"generateCode()\"\u003eGenerate Code\u003c/button\u003e\n\n        \u003cpre class=\"raw\" id=\"codeBox\"\u003eReady.\u003c/pre\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eConfirm Payment\u003c/h2\u003e\n        \u003cp\u003eВъвеждаш paymentId и системата маркира плащането като paid + генерира код.\u003c/p\u003e\n\n        \u003cinput id=\"paymentId\" placeholder=\"paymentId например 1780...\"\u003e\n        \u003cbr\u003e\u003cbr\u003e\n        \u003cbutton class=\"gold\" onclick=\"confirmPayment()\"\u003eConfirm Payment\u003c/button\u003e\n\n        \u003cpre class=\"raw\" id=\"paymentBox\"\u003eReady.\u003c/pre\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection class=\"card\"\u003e\n      \u003cdiv class=\"tabs\"\u003e\n        \u003cbutton class=\"tab active\" data-tab=\"profiles\" onclick=\"setTab(\u0027profiles\u0027)\"\u003eProfiles\u003c/button\u003e\n        \u003cbutton class=\"tab\" data-tab=\"leads\" onclick=\"setTab(\u0027leads\u0027)\"\u003eLeads\u003c/button\u003e\n        \u003cbutton class=\"tab\" data-tab=\"payments\" onclick=\"setTab(\u0027payments\u0027)\"\u003ePayments\u003c/button\u003e\n        \u003cbutton class=\"tab\" data-tab=\"unlock_codes\" onclick=\"setTab(\u0027unlock_codes\u0027)\"\u003eCodes\u003c/button\u003e\n        \u003cbutton class=\"tab\" data-tab=\"events\" onclick=\"setTab(\u0027events\u0027)\"\u003eEvents\u003c/button\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"searchLine\"\u003e\n        \u003cinput id=\"search\" placeholder=\"Search name / contact / profile / code...\" oninput=\"renderTable()\"\u003e\n        \u003cbutton class=\"secondary\" onclick=\"copyVisible()\"\u003eCopy Visible\u003c/button\u003e\n        \u003cbutton class=\"secondary\" onclick=\"loadAll()\"\u003eRefresh\u003c/button\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"tableWrap\"\u003e\n        \u003ctable\u003e\n          \u003cthead id=\"thead\"\u003e\u003c/thead\u003e\n          \u003ctbody id=\"tbody\"\u003e\u003c/tbody\u003e\n        \u003c/table\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection class=\"card\" style=\"margin-top:18px\"\u003e\n      \u003ch2\u003eRaw Data\u003c/h2\u003e\n      \u003cpre class=\"raw\" id=\"rawBox\"\u003eNo data loaded.\u003c/pre\u003e\n    \u003c/section\u003e\n\n    \u003cdiv class=\"footer\"\u003e\n      SoulFlame Twins · V44 Email Delivery Client Message Flow · Vercel + Supabase\n    \u003c/div\u003e\n  \u003c/div\u003e\n\n  \u003cscript\u003e\n    let state = {\n      tab: \"profiles\",\n      selectedRow: null,\n      data: {\n        profiles: [],\n        leads: [],\n        payments: [],\n        unlock_codes: [],\n        events: [],\n        admin_logs: []\n      },\n      lastRaw: null\n    };\n\n    const byId = id =\u003e document.getElementById(id);\n\n    function show(id, data) {\n      byId(id).textContent = typeof data === \"string\" ? data : JSON.stringify(data, null, 2);\n    }\n\n    function getPin() {\n      return byId(\"pin\").value.trim();\n    }\n\n    function savePin() {\n      localStorage.setItem(\"soulflame_admin_pin\", getPin());\n      show(\"statusBox\", \"PIN saved locally.\");\n    }\n\n    function clearLocal() {\n      localStorage.removeItem(\"soulflame_admin_pin\");\n      byId(\"pin\").value = \"\";\n      show(\"statusBox\", \"Local PIN cleared.\");\n    }\n\n    function loadPin() {\n      byId(\"pin\").value = localStorage.getItem(\"soulflame_admin_pin\") || \"\";\n    }\n\n    async function api(url, options = {}) {\n      const headers = Object.assign({}, options.headers || {});\n      if (getPin()) headers[\"x-admin-pin\"] = getPin();\n\n      const res = await fetch(url, Object.assign({}, options, { headers }));\n      const text = await res.text();\n\n      try {\n        return { status: res.status, data: JSON.parse(text) };\n      } catch {\n        return { status: res.status, data: text };\n      }\n    }\n\n    async function health() {\n      show(\"statusBox\", \"Checking health...\");\n      const result = await api(\"/api/health\");\n      show(\"statusBox\", result.data);\n\n      if (result.data \u0026\u0026 result.data.version) {\n        byId(\"systemText\").textContent = \"Live: \" + result.data.version + \" · \" + result.data.activeDataMode;\n      }\n    }\n\n    async function metricsOnly() {\n      show(\"statusBox\", \"Loading metrics...\");\n      const result = await api(\"/api/admin/metrics\");\n      show(\"statusBox\", result.data);\n    }\n\n    async function loadAll() {\n      show(\"rawBox\", \"Loading admin data...\");\n\n      const result = await api(\"/api/admin/data\");\n\n      if (!result.data || !result.data.ok) {\n        show(\"rawBox\", result.data || result);\n        return;\n      }\n\n      state.lastRaw = result.data;\n      state.data.profiles = asArray(result.data.profiles);\n      state.data.leads = asArray(result.data.leads);\n      state.data.payments = asArray(result.data.payments);\n      state.data.unlock_codes = asArray(result.data.unlock_codes);\n      state.data.events = asArray(result.data.events);\n      state.data.admin_logs = asArray(result.data.admin_logs);\n\n      updateMetrics(result.data.metrics || {});\n      show(\"rawBox\", result.data);\n      renderTable();\n    }\n\n    function asArray(value) {\n      return Array.isArray(value) ? value : [];\n    }\n\n    function updateMetrics(metrics) {\n      byId(\"mProfiles\").textContent = metrics.profiles || state.data.profiles.length || 0;\n      byId(\"mLeads\").textContent = metrics.leads || state.data.leads.length || 0;\n      byId(\"mPayments\").textContent = metrics.payments || state.data.payments.length || 0;\n      byId(\"mCodes\").textContent = metrics.unlock_codes || state.data.unlock_codes.length || 0;\n      byId(\"mEvents\").textContent = metrics.events || state.data.events.length || 0;\n    }\n\n    function setTab(tab) {\n      state.tab = tab;\n\n      document.querySelectorAll(\".tab\").forEach(btn =\u003e {\n        btn.classList.toggle(\"active\", btn.dataset.tab === tab);\n      });\n\n      renderTable();\n    }\n\n    function getRows() {\n      const rows = state.data[state.tab] || [];\n      const q = byId(\"search\").value.trim().toLowerCase();\n\n      if (!q) return rows;\n\n      return rows.filter(row =\u003e JSON.stringify(row).toLowerCase().includes(q));\n    }\n\n    function columnsFor(tab) {\n      if (tab === \"profiles\") return [\"id\", \"created_at\", \"name\", \"contact\", \"profile\", \"main_trait\", \"second_trait\"];\n      if (tab === \"leads\") return [\"id\", \"created_at\", \"offer\", \"name\", \"contact\", \"profile\"];\n      if (tab === \"payments\") return [\"id\", \"created_at\", \"status\", \"offer\", \"amount\", \"name\", \"contact\", \"code\"];\n      if (tab === \"unlock_codes\") return [\"id\", \"created_at\", \"code\", \"status\", \"offer\", \"payment_id\", \"profile_id\"];\n      if (tab === \"events\") return [\"id\", \"created_at\", \"type\", \"payload\"];\n      return [\"id\", \"created_at\"];\n    }\n\n    function renderTable() {\n      const rows = getRows();\n      const cols = columnsFor(state.tab);\n\n      byId(\"thead\").innerHTML =\n        \"\u003ctr\u003e\" + cols.map(c =\u003e \"\u003cth\u003e\" + escapeHtml(c) + \"\u003c/th\u003e\").join(\"\") + \"\u003cth\u003eActions\u003c/th\u003e\u003c/tr\u003e\";\n\n      byId(\"tbody\").innerHTML = rows.map(row =\u003e {\n        const tds = cols.map(col =\u003e \"\u003ctd\u003e\" + formatCell(col, row[col]) + \"\u003c/td\u003e\").join(\"\");\n        return \"\u003ctr\u003e\" + tds + \"\u003ctd\u003e\" + actionButtons(row) + \"\u003c/td\u003e\u003c/tr\u003e\";\n      }).join(\"\") || \"\u003ctr\u003e\u003ctd colspan=\u0027\" + (cols.length + 1) + \"\u0027\u003eNo rows.\u003c/td\u003e\u003c/tr\u003e\";\n    }\n\n    function formatCell(col, value) {\n      if (value === null || value === undefined) return \"\";\n\n      if (col === \"status\") {\n        const cls = value === \"paid\" || value === \"unused\" ? \"green\" : value === \"pending\" ? \"gold\" : \"red\";\n        return \"\u003cspan class=\u0027tag \" + cls + \"\u0027\u003e\" + escapeHtml(String(value)) + \"\u003c/span\u003e\";\n      }\n\n      if (col === \"code\") return \"\u003cspan class=\u0027mono\u0027\u003e\" + escapeHtml(String(value)) + \"\u003c/span\u003e\";\n\n      if (typeof value === \"object\") {\n        return \"\u003cspan class=\u0027small\u0027\u003e\" + escapeHtml(JSON.stringify(value).slice(0, 180)) + \"\u003c/span\u003e\";\n      }\n\n      const text = String(value);\n      return escapeHtml(text.length \u003e 120 ? text.slice(0, 120) + \"...\" : text);\n    }\n\n    function actionButtons(row) {\n      const encoded = encodeURIComponent(JSON.stringify(row));\n      let html = \"\u003cbutton class=\u0027secondary\u0027 onclick=\u0027viewRow(\\\"\" + encoded + \"\\\")\u0027\u003eView\u003c/button\u003e\";\n      html += \" \u003cbutton class=\u0027secondary\u0027 onclick=\u0027useForEmail(\\\"\" + encoded + \"\\\")\u0027\u003eUse Email\u003c/button\u003e\";\n\n      if (row.code) {\n        html += \" \u003cbutton class=\u0027secondary\u0027 onclick=\u0027copyText(\\\"\" + escapeAttr(row.code) + \"\\\")\u0027\u003eCopy Code\u003c/button\u003e\";\n      }\n\n      if (state.tab === \"payments\" \u0026\u0026 row.id) {\n        html += \" \u003cbutton class=\u0027gold\u0027 onclick=\u0027confirmPaymentId(\\\"\" + escapeAttr(row.id) + \"\\\")\u0027\u003eConfirm\u003c/button\u003e\";\n      }\n\n      return html;\n    }\n\n    function viewRow(encoded) {\n      const row = JSON.parse(decodeURIComponent(encoded));\n      state.selectedRow = row;\n      show(\"rawBox\", row);\n    }\n\n    function useForEmail(encoded) {\n      const row = JSON.parse(decodeURIComponent(encoded));\n      state.selectedRow = row;\n      show(\"rawBox\", row);\n\n      const contact = row.contact || row.email || row.name || \"\";\n      byId(\"emailTo\").value = contact;\n\n      if (row.code) {\n        templateUnlockCode(row);\n      } else if (state.tab === \"payments\") {\n        templatePaymentInstructions(row);\n      } else if (state.tab === \"profiles\") {\n        templateFullReportReady(row);\n      } else {\n        templateFollowUp(row);\n      }\n    }\n\n    function clientName(row) {\n      row = row || state.selectedRow || {};\n      return row.name || (row.user \u0026\u0026 row.user.name) || \"приятелю\";\n    }\n\n    function clientContact(row) {\n      row = row || state.selectedRow || {};\n      return row.contact || (row.user \u0026\u0026 row.user.contact) || byId(\"emailTo\").value.trim();\n    }\n\n    function templatePaymentInstructions(row) {\n      row = row || state.selectedRow || {};\n      const name = clientName(row);\n      const paymentId = row.id || \"PAYMENT_ID\";\n      const amount = row.amount || \"19.00 EUR\";\n\n      byId(\"emailSubject\").value = \"SoulFlame Full AI Twin — Payment instructions\";\n      byId(\"emailMessage\").value =\n        \"Здравей, \" + name + \",\\n\\n\" +\n        \"Твоята заявка за Full AI Twin е създадена.\\n\\n\" +\n        \"Payment ID: \" + paymentId + \"\\n\" +\n        \"Сума: \" + amount + \"\\n\\n\" +\n        \"След плащане ще получиш unlock code, с който отключваш Full AI Twin report на сайта:\\n\" +\n        \"https://soulflame-twins.vercel.app/#unlock\\n\\n\" +\n        \"SoulFlame AI Twin\";\n    }\n\n    function templateUnlockCode(row) {\n      row = row || state.selectedRow || {};\n      const name = clientName(row);\n      const code = row.code || \"ECHO-XXXX-XXXX\";\n\n      byId(\"emailSubject\").value = \"Твоят Full AI Twin unlock code\";\n      byId(\"emailMessage\").value =\n        \"Здравей, \" + name + \",\\n\\n\" +\n        \"Твоят Full AI Twin unlock code е:\\n\\n\" +\n        code + \"\\n\\n\" +\n        \"Отвори сайта и въведи кода тук:\\n\" +\n        \"https://soulflame-twins.vercel.app/#unlock\\n\\n\" +\n        \"След това ще видиш Full AI Twin report: Future message, strength, hidden risk, 7-day plan и next move.\\n\\n\" +\n        \"SoulFlame AI Twin\";\n    }\n\n    function templateFullReportReady(row) {\n      row = row || state.selectedRow || {};\n      const name = clientName(row);\n\n      byId(\"emailSubject\").value = \"Твоят AI Twin е готов\";\n      byId(\"emailMessage\").value =\n        \"Здравей, \" + name + \",\\n\\n\" +\n        \"Твоят AI Twin профил е готов.\\n\\n\" +\n        \"Можеш да отвориш сайта тук:\\n\" +\n        \"https://soulflame-twins.vercel.app/\\n\\n\" +\n        \"Ако имаш unlock code, използвай секцията Full AI Twin Unlock.\\n\\n\" +\n        \"SoulFlame AI Twin\";\n    }\n\n    function templateFollowUp(row) {\n      row = row || state.selectedRow || {};\n      const name = clientName(row);\n\n      byId(\"emailSubject\").value = \"SoulFlame AI Twin — следваща стъпка\";\n      byId(\"emailMessage\").value =\n        \"Здравей, \" + name + \",\\n\\n\" +\n        \"Пиша ти за твоя AI Twin профил.\\n\\n\" +\n        \"Следващата стъпка е да отключиш Full AI Twin, за да получиш по-дълбок анализ, Future Twin message и личен план.\\n\\n\" +\n        \"Линк:\\n\" +\n        \"https://soulflame-twins.vercel.app/\\n\\n\" +\n        \"SoulFlame AI Twin\";\n    }\n\n    async function sendEmail() {\n      const to = byId(\"emailTo\").value.trim();\n      const subject = byId(\"emailSubject\").value.trim();\n      const message = byId(\"emailMessage\").value.trim();\n\n      if (!to) {\n        alert(\"Попълни recipient.\");\n        return;\n      }\n\n      if (!message) {\n        alert(\"Попълни message.\");\n        return;\n      }\n\n      show(\"emailBox\", \"Sending/preparing email...\");\n\n      const result = await api(\"/api/admin/email\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({ to, subject, message })\n      });\n\n      show(\"emailBox\", result.data);\n\n      if (result.data \u0026\u0026 result.data.mode === \"manual_copy\") {\n        navigator.clipboard.writeText(message);\n      }\n    }\n\n    function copyEmailMessage() {\n      const message = byId(\"emailMessage\").value.trim();\n      if (!message) {\n        alert(\"Няма message.\");\n        return;\n      }\n\n      navigator.clipboard.writeText(message);\n      show(\"emailBox\", \"Message copied.\");\n    }\n\n    function openMailto() {\n      const to = encodeURIComponent(byId(\"emailTo\").value.trim());\n      const subject = encodeURIComponent(byId(\"emailSubject\").value.trim());\n      const body = encodeURIComponent(byId(\"emailMessage\").value.trim());\n\n      if (!to) {\n        alert(\"Попълни recipient.\");\n        return;\n      }\n\n      window.location.href = \"mailto:\" + to + \"?subject=\" + subject + \"\u0026body=\" + body;\n    }\n\n    function copyText(text) {\n      navigator.clipboard.writeText(text);\n      show(\"statusBox\", \"Copied: \" + text);\n    }\n\n    function copyVisible() {\n      const rows = getRows();\n      navigator.clipboard.writeText(JSON.stringify(rows, null, 2));\n      show(\"statusBox\", \"Visible rows copied: \" + rows.length);\n    }\n\n    function exportJson() {\n      const data = state.lastRaw || state.data;\n      const blob = new Blob([JSON.stringify(data, null, 2)], { type: \"application/json\" });\n      const url = URL.createObjectURL(blob);\n      const a = document.createElement(\"a\");\n      a.href = url;\n      a.download = \"soulflame-admin-export-\" + Date.now() + \".json\";\n      a.click();\n      URL.revokeObjectURL(url);\n    }\n\n    async function generateCode() {\n      show(\"codeBox\", \"Generating code...\");\n\n      const body = {\n        offer: byId(\"codeOffer\").value.trim() || \"Full AI Twin\",\n        note: byId(\"codeNote\").value.trim()\n      };\n\n      const result = await api(\"/api/admin/code\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(body)\n      });\n\n      show(\"codeBox\", result.data);\n\n      if (result.data \u0026\u0026 result.data.code) {\n        navigator.clipboard.writeText(result.data.code);\n        state.selectedRow = result.data.row || { code: result.data.code, offer: body.offer };\n        templateUnlockCode(state.selectedRow);\n      }\n\n      await loadAll();\n    }\n\n    async function confirmPayment() {\n      const paymentId = byId(\"paymentId\").value.trim();\n\n      if (!paymentId) {\n        alert(\"Въведи paymentId.\");\n        return;\n      }\n\n      await confirmPaymentId(paymentId);\n    }\n\n    async function confirmPaymentId(paymentId) {\n      show(\"paymentBox\", \"Confirming payment \" + paymentId + \"...\");\n\n      const result = await api(\"/api/admin/payment-confirm\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({ paymentId: Number(paymentId) })\n      });\n\n      show(\"paymentBox\", result.data);\n\n      if (result.data \u0026\u0026 result.data.deliveryText) {\n        navigator.clipboard.writeText(result.data.deliveryText);\n\n        const payment = result.data.payment || {};\n        const codeObj = result.data.code || {};\n        state.selectedRow = {\n          name: payment.name || \"\",\n          contact: payment.contact || \"\",\n          code: codeObj.code || payment.code || \"\"\n        };\n\n        byId(\"emailTo\").value = state.selectedRow.contact || \"\";\n        templateUnlockCode(state.selectedRow);\n      }\n\n      await loadAll();\n    }\n\n    function escapeHtml(value) {\n      return String(value)\n        .replaceAll(\"\u0026\", \"\u0026amp;\")\n        .replaceAll(\"\u003c\", \"\u0026lt;\")\n        .replaceAll(\"\u003e\", \"\u0026gt;\")\n        .replaceAll(\u0027\"\u0027, \"\u0026quot;\")\n        .replaceAll(\"\u0027\", \"\u0026#039;\");\n    }\n\n    function escapeAttr(value) {\n      return String(value)\n        .replaceAll(\"\\\\\", \"\\\\\\\\\")\n        .replaceAll(\u0027\"\u0027, \"\u0026quot;\")\n        .replaceAll(\"\u0027\", \"\u0026#039;\");\n    }\n\n    loadPin();\n    health();\n  \u003c/script\u003e\n\u003c/body\u003e\n\u003c/html\u003e";
const INLINE_TEST_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\"\u003e\n  \u003ctitle\u003eSoulFlame Twins — Production Test\u003c/title\u003e\n  \u003cstyle\u003e\n    body{\n      margin:0;\n      min-height:100vh;\n      background:linear-gradient(135deg,#05060d,#101327,#07111e);\n      color:white;\n      font-family:Arial,sans-serif;\n      padding:24px;\n    }\n    .wrap{width:min(1000px,100%);margin:0 auto}\n    .card{\n      border:1px solid rgba(255,255,255,.16);\n      background:rgba(255,255,255,.08);\n      border-radius:24px;\n      padding:22px;\n      margin-bottom:16px;\n    }\n    button{\n      border:0;\n      cursor:pointer;\n      color:white;\n      background:linear-gradient(135deg,#7c3cff,#4c8dff);\n      border-radius:14px;\n      padding:13px 15px;\n      font-weight:900;\n      margin:6px 4px 0 0;\n    }\n    input{\n      border-radius:14px;\n      padding:13px 14px;\n      border:1px solid rgba(255,255,255,.16);\n      background:rgba(0,0,0,.28);\n      color:white;\n      width:min(420px,100%);\n    }\n    pre{\n      background:rgba(0,0,0,.35);\n      padding:16px;\n      border-radius:16px;\n      overflow:auto;\n      white-space:pre-wrap;\n      min-height:300px;\n    }\n    a{color:#8bdfff}\n  \u003c/style\u003e\n\u003c/head\u003e\n\u003cbody\u003e\n  \u003cdiv class=\"wrap\"\u003e\n    \u003cdiv class=\"card\"\u003e\n      \u003ch1\u003eProduction Test — SoulFlame Twins\u003c/h1\u003e\n      \u003cp\u003eТества всички основни routes без да пипаш кода.\u003c/p\u003e\n      \u003ca href=\"/\"\u003eBack to site\u003c/a\u003e\n      \u003cbr\u003e\u003cbr\u003e\n      \u003cinput id=\"pin\" placeholder=\"Admin PIN за admin tests\"\u003e\n      \u003cbr\u003e\n      \u003cbutton onclick=\"testHealth()\"\u003eHealth\u003c/button\u003e\n      \u003cbutton onclick=\"testProfile()\"\u003eProfile Write\u003c/button\u003e\n      \u003cbutton onclick=\"testLead()\"\u003eLead Write\u003c/button\u003e\n      \u003cbutton onclick=\"testPayment()\"\u003ePayment Request\u003c/button\u003e\n      \u003cbutton onclick=\"testAdminData()\"\u003eAdmin Data\u003c/button\u003e\n      \u003cbutton onclick=\"testAdminCode()\"\u003eAdmin Code\u003c/button\u003e\n      \u003cbutton onclick=\"runAll()\"\u003eRun All Basic\u003c/button\u003e\n    \u003c/div\u003e\n\n    \u003cdiv class=\"card\"\u003e\n      \u003ch2\u003eOutput\u003c/h2\u003e\n      \u003cpre id=\"out\"\u003eReady.\u003c/pre\u003e\n    \u003c/div\u003e\n  \u003c/div\u003e\n\n  \u003cscript\u003e\n    const out = document.getElementById(\"out\");\n\n    function show(data){\n      out.textContent = typeof data === \"string\" ? data : JSON.stringify(data,null,2);\n    }\n\n    function pin(){\n      return document.getElementById(\"pin\").value.trim();\n    }\n\n    async function call(url, options = {}){\n      const res = await fetch(url, options);\n      const text = await res.text();\n      try { return { status:res.status, data: JSON.parse(text) }; }\n      catch { return { status:res.status, data:text }; }\n    }\n\n    async function testHealth(){\n      show(\"Testing /api/health...\");\n      show(await call(\"/api/health\"));\n    }\n\n    async function testProfile(){\n      show(\"Testing /api/profile...\");\n      const body = {\n        id: Date.now(),\n        user:{ name:\"V30 Test Client\", contact:\"v30-test@soulflame.local\", goal:\"V30 route test\", age:\"25-34\" },\n        mainTrait:\"vision\",\n        secondTrait:\"logic\",\n        profile:\"V30 Production Test Profile\",\n        scores:{ vision:10, logic:9, emotion:6, social:5, action:8 },\n        report:\"V30 mini report\",\n        fullReport:\"V30 full report\",\n        createdAt:new Date().toISOString()\n      };\n\n      show(await call(\"/api/profile\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\" },\n        body:JSON.stringify(body)\n      }));\n    }\n\n    async function testLead(){\n      show(\"Testing /api/lead...\");\n      show(await call(\"/api/lead\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\" },\n        body:JSON.stringify({\n          offer:\"V30 Lead Test\",\n          user:{ name:\"V30 Lead\", contact:\"lead@soulflame.local\" },\n          profile:\"Lead route test\",\n          scores:{ vision:1 }\n        })\n      }));\n    }\n\n    async function testPayment(){\n      show(\"Testing /api/payment-request...\");\n      show(await call(\"/api/payment-request\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\" },\n        body:JSON.stringify({\n          offer:\"Full AI Echo\",\n          amount:\"19.99 лв\",\n          method:\"manual\",\n          user:{ name:\"V30 Payment\", contact:\"payment@soulflame.local\" },\n          profile:\"Payment route test\",\n          scores:{ vision:1 }\n        })\n      }));\n    }\n\n    async function testAdminData(){\n      show(\"Testing /api/admin/data...\");\n      show(await call(\"/api/admin/data\", {\n        headers:{ \"x-admin-pin\":pin() }\n      }));\n    }\n\n    async function testAdminCode(){\n      show(\"Testing /api/admin/code...\");\n      show(await call(\"/api/admin/code\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\", \"x-admin-pin\":pin() },\n        body:JSON.stringify({ offer:\"Full AI Echo\", note:\"V30 test code\" })\n      }));\n    }\n\n    async function runAll(){\n      const results = {};\n      results.health = await call(\"/api/health\");\n      results.profile = await call(\"/api/profile\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\" },\n        body:JSON.stringify({\n          id: Date.now(),\n          user:{ name:\"V30 RunAll\", contact:\"runall@soulflame.local\", goal:\"Run all\", age:\"25-34\" },\n          mainTrait:\"vision\",\n          secondTrait:\"logic\",\n          profile:\"RunAll Profile\",\n          scores:{ vision:10, logic:9 },\n          report:\"RunAll mini\",\n          fullReport:\"RunAll full\",\n          createdAt:new Date().toISOString()\n        })\n      });\n      results.lead = await call(\"/api/lead\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\" },\n        body:JSON.stringify({ offer:\"RunAll Lead\", user:{ name:\"RunAll\", contact:\"runall@soulflame.local\" } })\n      });\n      results.payment = await call(\"/api/payment-request\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\" },\n        body:JSON.stringify({ offer:\"Full AI Echo\", amount:\"19.99 лв\", method:\"manual\", user:{ name:\"RunAll\", contact:\"runall@soulflame.local\" } })\n      });\n      show(results);\n    }\n  \u003c/script\u003e\n\u003c/body\u003e\n\u003c/html\u003e";
const INLINE_PRIVACY_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"\u003e\n  \u003cmeta name=\"theme-color\" content=\"#050611\"\u003e\n    \u003cstyle\u003e\n    :root {\n      --bg0:#03040a;\n      --bg1:#080b1f;\n      --bg2:#111a46;\n      --text:#f8f7ff;\n      --soft:#b9c3e8;\n      --muted:#7f8ab4;\n      --line:rgba(255,255,255,.14);\n      --cyan:#00eaff;\n      --violet:#7c3cff;\n      --pink:#ff4ff3;\n      --green:#23e6a8;\n      --gold:#ffd166;\n      --shadow:0 28px 90px rgba(0,0,0,.42);\n    }\n\n    * { box-sizing: border-box; }\n\n    body {\n      margin: 0;\n      min-height: 100vh;\n      font-family: Arial, Helvetica, sans-serif;\n      color: var(--text);\n      background:\n        radial-gradient(circle at 15% 8%, rgba(124,60,255,.30), transparent 32rem),\n        radial-gradient(circle at 86% 12%, rgba(0,234,255,.18), transparent 30rem),\n        linear-gradient(135deg, var(--bg0), var(--bg1) 46%, var(--bg2));\n      -webkit-font-smoothing: antialiased;\n    }\n\n    .wrap {\n      width: min(980px, 100%);\n      margin: 0 auto;\n      padding: 22px;\n    }\n\n    nav {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      gap: 14px;\n      padding: 12px;\n      border: 1px solid var(--line);\n      background: rgba(6,8,20,.72);\n      border-radius: 24px;\n      margin-bottom: 18px;\n      box-shadow: 0 16px 45px rgba(0,0,0,.22);\n    }\n\n    .brand {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      font-weight: 950;\n    }\n\n    .logo {\n      width: 42px;\n      height: 42px;\n      border-radius: 16px;\n      background:\n        radial-gradient(circle at 30% 22%, #fff, transparent 15%),\n        linear-gradient(135deg, var(--cyan), var(--violet), var(--pink));\n      box-shadow: 0 0 34px rgba(124,60,255,.42);\n    }\n\n    .links {\n      display: flex;\n      gap: 8px;\n      flex-wrap: wrap;\n    }\n\n    a {\n      color: white;\n      text-decoration: none;\n      background: rgba(255,255,255,.08);\n      border: 1px solid var(--line);\n      border-radius: 999px;\n      padding: 10px 12px;\n      font-size: 13px;\n      font-weight: 900;\n    }\n\n    .card {\n      border: 1px solid var(--line);\n      background:\n        linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.045)),\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.08), transparent 38%);\n      border-radius: 30px;\n      padding: clamp(22px, 4vw, 42px);\n      box-shadow: var(--shadow);\n    }\n\n    h1 {\n      margin: 0 0 18px;\n      font-size: clamp(38px, 6vw, 72px);\n      line-height: .9;\n      letter-spacing: -2.5px;\n      background: linear-gradient(90deg, var(--cyan), #5ca8ff, var(--violet), var(--pink));\n      -webkit-background-clip: text;\n      background-clip: text;\n      color: transparent;\n    }\n\n    h2 {\n      margin-top: 28px;\n      font-size: 24px;\n    }\n\n    p, li {\n      color: var(--soft);\n      line-height: 1.65;\n      font-size: 16px;\n    }\n\n    .note {\n      border: 1px solid rgba(255,209,102,.28);\n      background: rgba(255,209,102,.08);\n      color: #ffe7a8;\n      padding: 14px;\n      border-radius: 18px;\n      margin: 18px 0;\n    }\n\n    footer {\n      color: var(--muted);\n      text-align: center;\n      font-size: 13px;\n      padding: 26px 0 40px;\n    }\n\n    @media(max-width: 760px) {\n      nav {\n        flex-direction: column;\n        align-items: flex-start;\n      }\n    }\n  \u003c/style\u003e\n\u003c/head\u003e\n\u003cbody\u003e\n  \u003cdiv class=\"wrap\"\u003e\n    \u003cnav\u003e\n      \u003cdiv class=\"brand\"\u003e\u003cspan class=\"logo\"\u003e\u003c/span\u003e AI Twin by SoulFlame\u003c/div\u003e\n      \u003cdiv class=\"links\"\u003e\n        \u003ca href=\"/\"\u003eHome\u003c/a\u003e\n        \u003ca href=\"/privacy\"\u003ePrivacy\u003c/a\u003e\n        \u003ca href=\"/terms\"\u003eTerms\u003c/a\u003e\n        \u003ca href=\"/disclaimer\"\u003eDisclaimer\u003c/a\u003e\n      \u003c/div\u003e\n    \u003c/nav\u003e\n\n    \u003cmain class=\"card\"\u003e\n      \u003ctitle\u003ePrivacy Policy — SoulFlame AI Twin\u003c/title\u003e\n\u003ch1\u003ePrivacy Policy\u003c/h1\u003e\n\u003cp\u003eТази страница описва как SoulFlame AI Twin обработва информацията, която въвеждаш при създаване на Mini Twin, Full Twin заявка или unlock flow.\u003c/p\u003e\n\n\u003cdiv class=\"note\"\u003e\n  SoulFlame AI Twin не е медицинска, психиатрична или терапевтична услуга. Резултатите са за самоанализ, креативност и лична рефлексия.\n\u003c/div\u003e\n\n\u003ch2\u003eКакви данни се събират\u003c/h2\u003e\n\u003cul\u003e\n  \u003cli\u003eИме или псевдоним, който въвеждаш.\u003c/li\u003e\n  \u003cli\u003eКонтакт, който предоставяш доброволно — email, телефон или социален профил.\u003c/li\u003e\n  \u003cli\u003eЦел, описание, избрани Twin сигнали и резултат от профила.\u003c/li\u003e\n  \u003cli\u003eТехнически събития като кликове, генериране на профил, checkout request и unlock action.\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch2\u003eЗащо се събират\u003c/h2\u003e\n\u003cul\u003e\n  \u003cli\u003eЗа да се създаде Mini AI Twin профил.\u003c/li\u003e\n  \u003cli\u003eЗа да се обработи Full AI Twin заявка.\u003c/li\u003e\n  \u003cli\u003eЗа да се подобри продуктът и conversion flow.\u003c/li\u003e\n  \u003cli\u003eЗа admin управление на профили, заявки, плащания и unlock кодове.\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch2\u003eКъде се съхраняват\u003c/h2\u003e\n\u003cp\u003eДанните се съхраняват в Supabase база данни, свързана със SoulFlame Twins проекта.\u003c/p\u003e\n\n\u003ch2\u003eПремахване на данни\u003c/h2\u003e\n\u003cp\u003eМожеш да поискаш премахване на данни чрез контакт със собственика на проекта: stere0metal360@gmail.com.\u003c/p\u003e\n\n\u003ch2\u003eПоследна актуализация\u003c/h2\u003e\n\u003cp\u003eV43 Legal Trust Analytics.\u003c/p\u003e\n    \u003c/main\u003e\n\n    \u003cfooter\u003eSoulFlame Twins · Legal Trust Layer · V43\u003c/footer\u003e\n  \u003c/div\u003e\n\u003c/body\u003e\n\u003c/html\u003e";
const INLINE_TERMS_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"\u003e\n  \u003cmeta name=\"theme-color\" content=\"#050611\"\u003e\n    \u003cstyle\u003e\n    :root {\n      --bg0:#03040a;\n      --bg1:#080b1f;\n      --bg2:#111a46;\n      --text:#f8f7ff;\n      --soft:#b9c3e8;\n      --muted:#7f8ab4;\n      --line:rgba(255,255,255,.14);\n      --cyan:#00eaff;\n      --violet:#7c3cff;\n      --pink:#ff4ff3;\n      --green:#23e6a8;\n      --gold:#ffd166;\n      --shadow:0 28px 90px rgba(0,0,0,.42);\n    }\n\n    * { box-sizing: border-box; }\n\n    body {\n      margin: 0;\n      min-height: 100vh;\n      font-family: Arial, Helvetica, sans-serif;\n      color: var(--text);\n      background:\n        radial-gradient(circle at 15% 8%, rgba(124,60,255,.30), transparent 32rem),\n        radial-gradient(circle at 86% 12%, rgba(0,234,255,.18), transparent 30rem),\n        linear-gradient(135deg, var(--bg0), var(--bg1) 46%, var(--bg2));\n      -webkit-font-smoothing: antialiased;\n    }\n\n    .wrap {\n      width: min(980px, 100%);\n      margin: 0 auto;\n      padding: 22px;\n    }\n\n    nav {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      gap: 14px;\n      padding: 12px;\n      border: 1px solid var(--line);\n      background: rgba(6,8,20,.72);\n      border-radius: 24px;\n      margin-bottom: 18px;\n      box-shadow: 0 16px 45px rgba(0,0,0,.22);\n    }\n\n    .brand {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      font-weight: 950;\n    }\n\n    .logo {\n      width: 42px;\n      height: 42px;\n      border-radius: 16px;\n      background:\n        radial-gradient(circle at 30% 22%, #fff, transparent 15%),\n        linear-gradient(135deg, var(--cyan), var(--violet), var(--pink));\n      box-shadow: 0 0 34px rgba(124,60,255,.42);\n    }\n\n    .links {\n      display: flex;\n      gap: 8px;\n      flex-wrap: wrap;\n    }\n\n    a {\n      color: white;\n      text-decoration: none;\n      background: rgba(255,255,255,.08);\n      border: 1px solid var(--line);\n      border-radius: 999px;\n      padding: 10px 12px;\n      font-size: 13px;\n      font-weight: 900;\n    }\n\n    .card {\n      border: 1px solid var(--line);\n      background:\n        linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.045)),\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.08), transparent 38%);\n      border-radius: 30px;\n      padding: clamp(22px, 4vw, 42px);\n      box-shadow: var(--shadow);\n    }\n\n    h1 {\n      margin: 0 0 18px;\n      font-size: clamp(38px, 6vw, 72px);\n      line-height: .9;\n      letter-spacing: -2.5px;\n      background: linear-gradient(90deg, var(--cyan), #5ca8ff, var(--violet), var(--pink));\n      -webkit-background-clip: text;\n      background-clip: text;\n      color: transparent;\n    }\n\n    h2 {\n      margin-top: 28px;\n      font-size: 24px;\n    }\n\n    p, li {\n      color: var(--soft);\n      line-height: 1.65;\n      font-size: 16px;\n    }\n\n    .note {\n      border: 1px solid rgba(255,209,102,.28);\n      background: rgba(255,209,102,.08);\n      color: #ffe7a8;\n      padding: 14px;\n      border-radius: 18px;\n      margin: 18px 0;\n    }\n\n    footer {\n      color: var(--muted);\n      text-align: center;\n      font-size: 13px;\n      padding: 26px 0 40px;\n    }\n\n    @media(max-width: 760px) {\n      nav {\n        flex-direction: column;\n        align-items: flex-start;\n      }\n    }\n  \u003c/style\u003e\n\u003c/head\u003e\n\u003cbody\u003e\n  \u003cdiv class=\"wrap\"\u003e\n    \u003cnav\u003e\n      \u003cdiv class=\"brand\"\u003e\u003cspan class=\"logo\"\u003e\u003c/span\u003e AI Twin by SoulFlame\u003c/div\u003e\n      \u003cdiv class=\"links\"\u003e\n        \u003ca href=\"/\"\u003eHome\u003c/a\u003e\n        \u003ca href=\"/privacy\"\u003ePrivacy\u003c/a\u003e\n        \u003ca href=\"/terms\"\u003eTerms\u003c/a\u003e\n        \u003ca href=\"/disclaimer\"\u003eDisclaimer\u003c/a\u003e\n      \u003c/div\u003e\n    \u003c/nav\u003e\n\n    \u003cmain class=\"card\"\u003e\n      \u003ctitle\u003eTerms — SoulFlame AI Twin\u003c/title\u003e\n\u003ch1\u003eTerms of Use\u003c/h1\u003e\n\u003cp\u003eИзползвайки SoulFlame AI Twin, приемаш тези условия.\u003c/p\u003e\n\n\u003ch2\u003eКакво представлява услугата\u003c/h2\u003e\n\u003cp\u003eSoulFlame AI Twin е дигитален продукт за самоанализ, креативна рефлексия и AI-базиран профил. Той не заменя специалист, лекар, психолог, терапевт, финансов или юридически консултант.\u003c/p\u003e\n\n\u003ch2\u003eПотребителска отговорност\u003c/h2\u003e\n\u003cul\u003e\n  \u003cli\u003eНе въвеждай чувствителни данни, които не желаеш да се съхраняват.\u003c/li\u003e\n  \u003cli\u003eНе използвай резултатите като медицинска диагноза.\u003c/li\u003e\n  \u003cli\u003eНе използвай продукта за вземане на високорискови решения без човешка проверка.\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch2\u003eПлатени функции\u003c/h2\u003e\n\u003cp\u003eFull AI Twin може да се отключва чрез payment request, payment link и unlock code. В текущия MVP част от процеса може да бъде ръчен чрез admin dashboard.\u003c/p\u003e\n\n\u003ch2\u003eПромени\u003c/h2\u003e\n\u003cp\u003eУслугата е в активна разработка. Функциите, цените и flow-ът могат да се променят.\u003c/p\u003e\n    \u003c/main\u003e\n\n    \u003cfooter\u003eSoulFlame Twins · Legal Trust Layer · V43\u003c/footer\u003e\n  \u003c/div\u003e\n\u003c/body\u003e\n\u003c/html\u003e";
const INLINE_DISCLAIMER_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"\u003e\n  \u003cmeta name=\"theme-color\" content=\"#050611\"\u003e\n    \u003cstyle\u003e\n    :root {\n      --bg0:#03040a;\n      --bg1:#080b1f;\n      --bg2:#111a46;\n      --text:#f8f7ff;\n      --soft:#b9c3e8;\n      --muted:#7f8ab4;\n      --line:rgba(255,255,255,.14);\n      --cyan:#00eaff;\n      --violet:#7c3cff;\n      --pink:#ff4ff3;\n      --green:#23e6a8;\n      --gold:#ffd166;\n      --shadow:0 28px 90px rgba(0,0,0,.42);\n    }\n\n    * { box-sizing: border-box; }\n\n    body {\n      margin: 0;\n      min-height: 100vh;\n      font-family: Arial, Helvetica, sans-serif;\n      color: var(--text);\n      background:\n        radial-gradient(circle at 15% 8%, rgba(124,60,255,.30), transparent 32rem),\n        radial-gradient(circle at 86% 12%, rgba(0,234,255,.18), transparent 30rem),\n        linear-gradient(135deg, var(--bg0), var(--bg1) 46%, var(--bg2));\n      -webkit-font-smoothing: antialiased;\n    }\n\n    .wrap {\n      width: min(980px, 100%);\n      margin: 0 auto;\n      padding: 22px;\n    }\n\n    nav {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      gap: 14px;\n      padding: 12px;\n      border: 1px solid var(--line);\n      background: rgba(6,8,20,.72);\n      border-radius: 24px;\n      margin-bottom: 18px;\n      box-shadow: 0 16px 45px rgba(0,0,0,.22);\n    }\n\n    .brand {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      font-weight: 950;\n    }\n\n    .logo {\n      width: 42px;\n      height: 42px;\n      border-radius: 16px;\n      background:\n        radial-gradient(circle at 30% 22%, #fff, transparent 15%),\n        linear-gradient(135deg, var(--cyan), var(--violet), var(--pink));\n      box-shadow: 0 0 34px rgba(124,60,255,.42);\n    }\n\n    .links {\n      display: flex;\n      gap: 8px;\n      flex-wrap: wrap;\n    }\n\n    a {\n      color: white;\n      text-decoration: none;\n      background: rgba(255,255,255,.08);\n      border: 1px solid var(--line);\n      border-radius: 999px;\n      padding: 10px 12px;\n      font-size: 13px;\n      font-weight: 900;\n    }\n\n    .card {\n      border: 1px solid var(--line);\n      background:\n        linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.045)),\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.08), transparent 38%);\n      border-radius: 30px;\n      padding: clamp(22px, 4vw, 42px);\n      box-shadow: var(--shadow);\n    }\n\n    h1 {\n      margin: 0 0 18px;\n      font-size: clamp(38px, 6vw, 72px);\n      line-height: .9;\n      letter-spacing: -2.5px;\n      background: linear-gradient(90deg, var(--cyan), #5ca8ff, var(--violet), var(--pink));\n      -webkit-background-clip: text;\n      background-clip: text;\n      color: transparent;\n    }\n\n    h2 {\n      margin-top: 28px;\n      font-size: 24px;\n    }\n\n    p, li {\n      color: var(--soft);\n      line-height: 1.65;\n      font-size: 16px;\n    }\n\n    .note {\n      border: 1px solid rgba(255,209,102,.28);\n      background: rgba(255,209,102,.08);\n      color: #ffe7a8;\n      padding: 14px;\n      border-radius: 18px;\n      margin: 18px 0;\n    }\n\n    footer {\n      color: var(--muted);\n      text-align: center;\n      font-size: 13px;\n      padding: 26px 0 40px;\n    }\n\n    @media(max-width: 760px) {\n      nav {\n        flex-direction: column;\n        align-items: flex-start;\n      }\n    }\n  \u003c/style\u003e\n\u003c/head\u003e\n\u003cbody\u003e\n  \u003cdiv class=\"wrap\"\u003e\n    \u003cnav\u003e\n      \u003cdiv class=\"brand\"\u003e\u003cspan class=\"logo\"\u003e\u003c/span\u003e AI Twin by SoulFlame\u003c/div\u003e\n      \u003cdiv class=\"links\"\u003e\n        \u003ca href=\"/\"\u003eHome\u003c/a\u003e\n        \u003ca href=\"/privacy\"\u003ePrivacy\u003c/a\u003e\n        \u003ca href=\"/terms\"\u003eTerms\u003c/a\u003e\n        \u003ca href=\"/disclaimer\"\u003eDisclaimer\u003c/a\u003e\n      \u003c/div\u003e\n    \u003c/nav\u003e\n\n    \u003cmain class=\"card\"\u003e\n      \u003ctitle\u003eDisclaimer — SoulFlame AI Twin\u003c/title\u003e\n\u003ch1\u003eDisclaimer\u003c/h1\u003e\n\n\u003cdiv class=\"note\"\u003e\n  Важно: SoulFlame AI Twin не е медицинска, психологическа, терапевтична, финансова или юридическа услуга.\n\u003c/div\u003e\n\n\u003ch2\u003eAI резултати\u003c/h2\u003e\n\u003cp\u003eAI Twin резултатите са интерпретативни и креативни. Те могат да помогнат за самоанализ, но не са обективна диагноза или гарантирана прогноза.\u003c/p\u003e\n\n\u003ch2\u003eПсихологически език\u003c/h2\u003e\n\u003cp\u003eДуми като “емоционален радар”, “скрит риск”, “Future Twin” и “подсъзнателни модели” се използват като продуктови и творчески концепции, не като клинични термини.\u003c/p\u003e\n\n\u003ch2\u003eПри сериозни проблеми\u003c/h2\u003e\n\u003cp\u003eАко имаш сериозни психологически, здравни, финансови или правни проблеми, обърни се към квалифициран специалист.\u003c/p\u003e\n\n\u003ch2\u003eОтговорност\u003c/h2\u003e\n\u003cp\u003eИзползваш SoulFlame AI Twin по собствена преценка. Винаги проверявай важните решения с реален човек или специалист.\u003c/p\u003e\n    \u003c/main\u003e\n\n    \u003cfooter\u003eSoulFlame Twins · Legal Trust Layer · V43\u003c/footer\u003e\n  \u003c/div\u003e\n\u003c/body\u003e\n\u003c/html\u003e";

function now() {
  return new Date().toISOString();
}

function getSupabaseUrl() {
  return String(process.env.SUPABASE_URL || "").replace(/\/$/, "");
}

function getSupabaseKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";
}

function supabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseKey());
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-admin-pin",
    "Cache-Control": "public, max-age=0, must-revalidate"
  });

  res.end(JSON.stringify(data, null, 2));
}

function sendHtml(res, html) {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, max-age=0, must-revalidate"
  });

  res.end(html);
}

function sendText(res, status, text) {
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "public, max-age=0, must-revalidate"
  });

  res.end(text);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();

      if (body.length > 2000000) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });

    req.on("error", reject);
  });
}

function isAdmin(req) {
  const incoming = String(req.headers["x-admin-pin"] || "").trim();
  return Boolean(incoming && incoming === ADMIN_PIN);
}

function requireAdmin(req, res) {
  if (!isAdmin(req)) {
    sendJson(res, 401, {
      ok: false,
      error: "Admin PIN required."
    });
    return false;
  }

  return true;
}

async function supabaseRequest(table, options = {}) {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();

  if (!url || !key) {
    throw new Error("Missing Supabase env vars.");
  }

  const response = await fetch(url + "/rest/v1/" + table + (options.query || ""), {
    method: options.method || "GET",
    headers: Object.assign(
      {
        apikey: key,
        Authorization: "Bearer " + key,
        "Content-Type": "application/json"
      },
      options.headers || {}
    ),
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error("Supabase error " + response.status + ": " + text);
  }

  try {
    return text ? JSON.parse(text) : [];
  } catch {
    return text;
  }
}

function profileRow(body) {
  return {
    id: Number(body.id) || Date.now(),
    name: body.user && body.user.name ? body.user.name : body.name || "",
    contact: body.user && body.user.contact ? body.user.contact : body.contact || "",
    goal: body.user && body.user.goal ? body.user.goal : body.goal || "",
    age: body.user && body.user.age ? body.user.age : body.age || "",
    main_trait: body.mainTrait || body.main_trait || "",
    second_trait: body.secondTrait || body.second_trait || "",
    profile: body.profile || "",
    scores: body.scores || {},
    mini_report: body.report || body.mini_report || "",
    full_report: body.fullReport || body.full_report || "",
    raw: body
  };
}

function leadRow(body) {
  return {
    id: Date.now(),
    offer: body.offer || "EchoProfile",
    name: body.user && body.user.name ? body.user.name : body.name || "",
    contact: body.user && body.user.contact ? body.user.contact : body.contact || "",
    profile: body.profile || "",
    scores: body.scores || {},
    raw: body
  };
}

function paymentRow(body) {
  return {
    id: Date.now(),
    status: "pending",
    offer: body.offer || "Full AI Echo",
    amount: body.amount || "19.99 лв",
    method: body.method || "manual",
    name: body.user && body.user.name ? body.user.name : body.name || "",
    contact: body.user && body.user.contact ? body.user.contact : body.contact || "",
    profile: body.profile || "",
    scores: body.scores || {},
    code: "",
    raw: body
  };
}

function makeUnlockCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  function part(length) {
    let value = "";
    for (let i = 0; i < length; i++) {
      value += alphabet[crypto.randomInt(0, alphabet.length)];
    }
    return value;
  }

  return "ECHO-" + part(4) + "-" + part(4);
}

async function insertEvent(type, payload = {}) {
  try {
    await supabaseRequest("events", {
      method: "POST",
      headers: {
        Prefer: "return=minimal"
      },
      body: {
        id: Date.now() + crypto.randomInt(0, 999),
        type,
        payload
      }
    });
  } catch {}
}

async function safeTable(name) {
  try {
    return await supabaseRequest(name, {
      method: "GET",
      query: "?select=*&order=created_at.desc&limit=50"
    });
  } catch (error) {
    return {
      error: error.message
    };
  }
}

async function handleHealth(req, res) {
  const configured = supabaseConfigured();

  sendJson(res, 200, {
    ok: true,
    app: APP_NAME,
    module: MODULE_NAME,
    version: APP_VERSION,
    appMode: APP_MODE,
    requestedDataMode: DATA_MODE,
    activeDataMode: configured ? "supabase" : "missing_supabase_env",
    supabaseConfigured: configured,
    warnings: configured ? [] : ["Missing SUPABASE_URL or SUPABASE key"],
    ownerEmail: OWNER_EMAIL,
    uptimeSeconds: Math.round((Date.now() - SERVER_STARTED_AT) / 1000),
    adminSecurityWarning: ADMIN_PIN === "ECHO-ADMIN-999" ? "Change default admin PIN before going online." : null,
    routes: [
      "/",
      "/admin",
      "/test",
      "/api/health",
      "/api/profile",
      "/api/lead",
      "/api/payment-request", "/api/checkout",
      "/api/unlock",
      "/api/admin/data",
      "/api/admin/metrics",
      "/api/admin/code",
      "/api/admin/payment-confirm"
    ],
    time: now()
  });
}

async function handlePublicConfig(req, res) {
  sendJson(res, 200, {
    ok: true,
    app: APP_NAME,
    module: MODULE_NAME,
    version: APP_VERSION,
    ownerEmail: OWNER_EMAIL,
    appMode: APP_MODE,
    requestedDataMode: DATA_MODE,
    activeDataMode: supabaseConfigured() ? "supabase" : "missing_supabase_env",
    products: {
      mini: "Mini Echo",
      full: "Full AI Twin",
      deep: "Deep Echo Blueprint"
    },
    prices: {
      mini: "0 лв",
      full: "19.99 лв",
      deep: "49 лв"
    },
    time: now()
  });
}

async function handleAdminData(req, res) {
  if (!requireAdmin(req, res)) return;

  const profiles = await safeTable("profiles");
  const leads = await safeTable("leads");
  const payments = await safeTable("payments");
  const unlockCodes = await safeTable("unlock_codes");
  const events = await safeTable("events");
  const adminLogs = await safeTable("admin_logs");

  sendJson(res, 200, {
    ok: true,
    metrics: {
      profiles: Array.isArray(profiles) ? profiles.length : 0,
      leads: Array.isArray(leads) ? leads.length : 0,
      payments: Array.isArray(payments) ? payments.length : 0,
      unlock_codes: Array.isArray(unlockCodes) ? unlockCodes.length : 0,
      events: Array.isArray(events) ? events.length : 0,
      admin_logs: Array.isArray(adminLogs) ? adminLogs.length : 0
    },
    profiles,
    leads,
    payments,
    unlock_codes: unlockCodes,
    events,
    admin_logs: adminLogs,
    system: {
      version: APP_VERSION,
      activeDataMode: supabaseConfigured() ? "supabase" : "missing_supabase_env",
      ownerEmail: OWNER_EMAIL
    }
  });
}

async function handleAdminMetrics(req, res) {
  if (!requireAdmin(req, res)) return;

  const profiles = await safeTable("profiles");
  const leads = await safeTable("leads");
  const payments = await safeTable("payments");
  const unlockCodes = await safeTable("unlock_codes");
  const events = await safeTable("events");

  sendJson(res, 200, {
    ok: true,
    app: APP_NAME,
    version: APP_VERSION,
    metrics: {
      profiles: Array.isArray(profiles) ? profiles.length : 0,
      leads: Array.isArray(leads) ? leads.length : 0,
      payments: Array.isArray(payments) ? payments.length : 0,
      unlock_codes: Array.isArray(unlockCodes) ? unlockCodes.length : 0,
      events: Array.isArray(events) ? events.length : 0
    },
    time: now()
  });
}

async function handleProfile(req, res) {
  const body = await readBody(req);
  const row = profileRow(body);

  const inserted = await supabaseRequest("profiles", {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: row
  });

  await insertEvent("profile_created", {
    profileId: row.id,
    name: row.name,
    contact: row.contact
  });

  sendJson(res, 200, {
    ok: true,
    saved: "profile",
    activeDataMode: "supabase",
    id: row.id,
    inserted
  });
}

async function handleLead(req, res) {
  const body = await readBody(req);
  const row = leadRow(body);

  const inserted = await supabaseRequest("leads", {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: row
  });

  await insertEvent("lead_created", {
    leadId: row.id,
    offer: row.offer,
    name: row.name
  });

  sendJson(res, 200, {
    ok: true,
    saved: "lead",
    id: row.id,
    inserted
  });
}

async function handlePaymentRequest(req, res) {
  const body = await readBody(req);
  const row = paymentRow(body);

  const inserted = await supabaseRequest("payments", {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: row
  });

  await insertEvent("payment_requested", {
    paymentId: row.id,
    offer: row.offer,
    amount: row.amount,
    contact: row.contact
  });

  sendJson(res, 200, {
    ok: true,
    saved: "payment-request",
    payment: Array.isArray(inserted) ? inserted[0] : inserted,
    message: "Заявката за Full AI Twin е създадена."
  });
}

async function handleClientEvent(req, res) {
  const body = await readBody(req);

  const type = body.type || "client_event";
  const payload = Object.assign({}, body.payload || {}, {
    page: body.page || "",
    referrer: body.referrer || "",
    userAgent: req.headers["user-agent"] || "",
    createdAt: now(),
    source: "client"
  });

  await insertEvent(type, payload);

  sendJson(res, 200, {
    ok: true,
    saved: "event",
    type,
    time: now()
  });
}

async function handleCheckout(req, res) {
  const body = await readBody(req);

  const offer = body.offer || "Full AI Twin by SoulFlame";
  const amount = body.amount || "19.00 EUR";
  const provider = body.provider || "payment_link";

  const fullTwinLink =
    process.env.PAYMENT_LINK_FULL_TWIN ||
    process.env.STRIPE_PAYMENT_LINK_FULL_TWIN ||
    process.env.GUMROAD_PAYMENT_LINK_FULL_TWIN ||
    process.env.REVOLUT_PAYMENT_LINK_FULL_TWIN ||
    "";

  const deepTwinLink =
    process.env.PAYMENT_LINK_DEEP_TWIN ||
    process.env.STRIPE_PAYMENT_LINK_DEEP_TWIN ||
    process.env.GUMROAD_PAYMENT_LINK_DEEP_TWIN ||
    process.env.REVOLUT_PAYMENT_LINK_DEEP_TWIN ||
    "";

  const selectedLink =
    String(offer).toLowerCase().includes("deep")
      ? deepTwinLink
      : fullTwinLink;

  const paymentBody = {
    offer,
    amount,
    method: provider,
    user: body.user || {},
    profile: body.profile || "",
    scores: body.scores || {},
    rawTwin: body.rawTwin || null,
    checkout: {
      provider,
      paymentUrl: selectedLink || null,
      createdAt: now()
    }
  };

  const row = paymentRow(paymentBody);

  const inserted = await supabaseRequest("payments", {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: row
  });

  await insertEvent("checkout_created", {
    paymentId: row.id,
    offer,
    amount,
    provider,
    hasPaymentLink: Boolean(selectedLink),
    contact: row.contact
  });

  sendJson(res, 200, {
    ok: true,
    saved: "checkout",
    activeDataMode: "supabase",
    payment: Array.isArray(inserted) ? inserted[0] : inserted,
    paymentUrl: selectedLink || null,
    checkoutMode: selectedLink ? "payment_link" : "manual",
    message: selectedLink
      ? "Checkout created. Open paymentUrl to pay."
      : "Checkout created, but no payment link env var is configured. Use manual admin confirm.",
    envNeeded: selectedLink ? [] : [
      "PAYMENT_LINK_FULL_TWIN",
      "PAYMENT_LINK_DEEP_TWIN"
    ]
  });
}

async function handleAdminEmail(req, res) {
  if (!requireAdmin(req, res)) return;

  const body = await readBody(req);

  const to = String(body.to || "").trim();
  const subject = String(body.subject || "SoulFlame AI Twin").trim();
  const message = String(body.message || body.body || "").trim();

  if (!to) {
    sendJson(res, 400, {
      ok: false,
      error: "Recipient email/contact is required."
    });
    return;
  }

  if (!message) {
    sendJson(res, 400, {
      ok: false,
      error: "Message body is required."
    });
    return;
  }

  const resendKey = process.env.RESEND_API_KEY || "";
  const fromEmail = process.env.EMAIL_FROM || "SoulFlame <onboarding@resend.dev>";

  const payload = {
    from: fromEmail,
    to: [to],
    subject,
    text: message
  };

  if (!resendKey) {
    await insertEvent("email_manual_copy_ready", {
      to,
      subject,
      message,
      mode: "manual_copy",
      reason: "RESEND_API_KEY not configured"
    });

    sendJson(res, 200, {
      ok: true,
      mode: "manual_copy",
      sent: false,
      to,
      subject,
      message,
      warning: "RESEND_API_KEY is not configured. Copy this message manually or configure Resend env vars.",
      envNeeded: ["RESEND_API_KEY", "EMAIL_FROM"]
    });
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + resendKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const text = await response.text();

  if (!response.ok) {
    await insertEvent("email_send_failed", {
      to,
      subject,
      response: text
    });

    sendJson(res, 500, {
      ok: false,
      sent: false,
      error: "Resend error " + response.status,
      details: text
    });
    return;
  }

  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  await insertEvent("email_sent", {
    to,
    subject,
    provider: "resend",
    response: data
  });

  sendJson(res, 200, {
    ok: true,
    mode: "resend",
    sent: true,
    to,
    subject,
    providerResponse: data
  });
}

async function handleAdminCode(req, res) {
  if (!requireAdmin(req, res)) return;

  const body = await readBody(req);
  const code = makeUnlockCode();

  const row = {
    id: Date.now(),
    code,
    status: "unused",
    offer: body.offer || "Full AI Twin",
    note: body.note || "",
    used_at: null,
    used_by: null,
    profile_id: null,
    payment_id: body.paymentId || null,
    raw: body
  };

  const inserted = await supabaseRequest("unlock_codes", {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: row
  });

  await insertEvent("code_generated", {
    code,
    offer: row.offer,
    paymentId: row.payment_id
  });

  sendJson(res, 200, {
    ok: true,
    code,
    row: Array.isArray(inserted) ? inserted[0] : inserted,
    deliveryText: "Твоят Full AI Twin код е: " + code
  });
}

async function handleUnlock(req, res) {
  const body = await readBody(req);
  const submittedCode = String(body.code || "").trim().toUpperCase();

  if (!submittedCode) {
    sendJson(res, 400, {
      ok: false,
      error: "Missing unlock code."
    });
    return;
  }

  const rows = await supabaseRequest("unlock_codes", {
    method: "GET",
    query: "?code=eq." + encodeURIComponent(submittedCode) + "&select=*"
  });

  if (!Array.isArray(rows) || rows.length === 0) {
    sendJson(res, 404, {
      ok: false,
      error: "Кодът не съществува."
    });
    return;
  }

  const current = rows[0];

  if (current.status === "used") {
    sendJson(res, 409, {
      ok: false,
      error: "Този код вече е използван.",
      code: current
    });
    return;
  }

  const updated = await supabaseRequest("unlock_codes", {
    method: "PATCH",
    query: "?id=eq." + encodeURIComponent(current.id),
    headers: {
      Prefer: "return=representation"
    },
    body: {
      status: "used",
      used_at: now(),
      used_by: body.user || null,
      profile_id: body.profileId || null
    }
  });

  await insertEvent("code_used", {
    code: submittedCode,
    profileId: body.profileId || null
  });

  sendJson(res, 200, {
    ok: true,
    unlocked: true,
    code: Array.isArray(updated) ? updated[0] : updated
  });
}

async function handlePaymentConfirm(req, res) {
  if (!requireAdmin(req, res)) return;

  const body = await readBody(req);
  const paymentId = Number(body.paymentId);

  if (!paymentId) {
    sendJson(res, 400, {
      ok: false,
      error: "paymentId required."
    });
    return;
  }

  const payments = await supabaseRequest("payments", {
    method: "GET",
    query: "?id=eq." + encodeURIComponent(paymentId) + "&select=*"
  });

  if (!Array.isArray(payments) || payments.length === 0) {
    sendJson(res, 404, {
      ok: false,
      error: "Плащането не е намерено."
    });
    return;
  }

  const payment = payments[0];

  if (payment.status === "paid" && payment.code) {
    sendJson(res, 200, {
      ok: true,
      payment,
      deliveryText: "Плащането вече е потвърдено. Код: " + payment.code
    });
    return;
  }

  const code = makeUnlockCode();

  const codeRow = {
    id: Date.now(),
    code,
    status: "unused",
    offer: payment.offer || "Full AI Twin",
    note: "Generated from payment " + payment.id,
    used_at: null,
    used_by: null,
    profile_id: null,
    payment_id: payment.id,
    raw: { payment }
  };

  const insertedCode = await supabaseRequest("unlock_codes", {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: codeRow
  });

  const updatedPayment = await supabaseRequest("payments", {
    method: "PATCH",
    query: "?id=eq." + encodeURIComponent(payment.id),
    headers: {
      Prefer: "return=representation"
    },
    body: {
      status: "paid",
      code,
      raw: Object.assign({}, payment.raw || {}, {
        confirmedAt: now(),
        generatedCode: code
      })
    }
  });

  await insertEvent("payment_confirmed", {
    paymentId: payment.id,
    code
  });

  sendJson(res, 200, {
    ok: true,
    payment: Array.isArray(updatedPayment) ? updatedPayment[0] : updatedPayment,
    code: Array.isArray(insertedCode) ? insertedCode[0] : insertedCode,
    deliveryText: "Здравей! Плащането е потвърдено. Твоят Full AI Twin код е: " + code
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const parsed = new URL(req.url, "http://localhost");
    const pathName = parsed.pathname;

    if (req.method === "OPTIONS") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET" && pathName === "/") {
      sendHtml(res, INLINE_INDEX_HTML);
      return;
    }

    if (req.method === "GET" && pathName === "/admin") {
      sendHtml(res, INLINE_ADMIN_HTML);
      return;
    }

    if (req.method === "GET" && pathName === "/test") {
      sendHtml(res, INLINE_TEST_HTML);
      return;
    }
    if (req.method === "GET" && pathName === "/privacy") {
      sendHtml(res, INLINE_PRIVACY_HTML);
      return;
    }

    if (req.method === "GET" && pathName === "/terms") {
      sendHtml(res, INLINE_TERMS_HTML);
      return;
    }

    if (req.method === "GET" && pathName === "/disclaimer") {
      sendHtml(res, INLINE_DISCLAIMER_HTML);
      return;
    }


    if (req.method === "GET" && pathName === "/api/health") {
      await handleHealth(req, res);
      return;
    }

    if (req.method === "GET" && pathName === "/api/public-config") {
      await handlePublicConfig(req, res);
      return;
    }

    if (req.method === "GET" && (pathName === "/api/data" || pathName === "/api/admin/data")) {
      await handleAdminData(req, res);
      return;
    }

    if (req.method === "GET" && pathName === "/api/admin/metrics") {
      await handleAdminMetrics(req, res);
      return;
    }

    if (req.method === "POST" && pathName === "/api/profile") {
      await handleProfile(req, res);
      return;
    }

    if (req.method === "POST" && pathName === "/api/lead") {
      await handleLead(req, res);
      return;
    }
    if (req.method === "POST" && pathName === "/api/event") {
      await handleClientEvent(req, res);
      return;
    }


    if (req.method === "POST" && pathName === "/api/checkout") {
      await handleCheckout(req, res);
      return;
    }
    if (req.method === "POST" && pathName === "/api/payment-request") {
      await handlePaymentRequest(req, res);
      return;
    }
    if (req.method === "POST" && pathName === "/api/admin/email") {
      await handleAdminEmail(req, res);
      return;
    }


    if (req.method === "POST" && (pathName === "/api/code" || pathName === "/api/admin/code")) {
      await handleAdminCode(req, res);
      return;
    }

    if (req.method === "POST" && pathName === "/api/unlock") {
      await handleUnlock(req, res);
      return;
    }

    if (req.method === "POST" && (pathName === "/api/payment-confirm" || pathName === "/api/admin/payment-confirm")) {
      await handlePaymentConfirm(req, res);
      return;
    }

    sendText(res, 404, "Not found");
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: error.message,
      version: APP_VERSION,
      activeDataMode: supabaseConfigured() ? "supabase" : "missing_supabase_env",
      warning: "If this is a Supabase table/column error, run the schema patch in Supabase SQL Editor."
    });
  }
});

const PORT = Number(process.env.PORT || 3000);

server.listen(PORT, () => {
  console.log("");
  console.log(APP_NAME + " " + APP_VERSION + " running.");
  console.log("Open: http://localhost:" + PORT);
  console.log("App mode: " + APP_MODE);
  console.log("Requested data mode: " + DATA_MODE);
  console.log("Supabase configured: " + supabaseConfigured());
  console.log("Owner email: " + OWNER_EMAIL);
  console.log("");
});