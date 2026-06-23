const http = require("http");
const crypto = require("crypto");

const APP_NAME = "SoulFlame Twins";
const MODULE_NAME = "EchoProfile";
const APP_VERSION = "V36_QUANTUM_LEVITATION_ULTRA_SMOOTH";

const OWNER_EMAIL = process.env.OWNER_EMAIL || "stere0metal360@gmail.com";
const APP_MODE = process.env.APP_MODE || "production";
const DATA_MODE = process.env.DATA_MODE || "supabase";
const ADMIN_PIN = process.env.ECHO_ADMIN_PIN || "ECHO-ADMIN-999";
const SERVER_STARTED_AT = Date.now();

const INLINE_INDEX_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"\u003e\n  \u003ctitle\u003eAI Twin by SoulFlame — Quantum Levitation\u003c/title\u003e\n  \u003cmeta name=\"description\" content=\"AI Twin by SoulFlame — Quantum Levitation дизайн, EchoProfile, Future Twin и персонален AI сигнал.\"\u003e\n  \u003cmeta property=\"og:title\" content=\"AI Twin by SoulFlame — Quantum Levitation\"\u003e\n  \u003cmeta property=\"og:description\" content=\"Създай AI Twin, който започва от твоя вътрешен Echo сигнал.\"\u003e\n  \u003cmeta name=\"theme-color\" content=\"#050611\"\u003e\n\n  \u003cstyle\u003e\n    @property --spin {\n      syntax: \"\u003cangle\u003e\";\n      inherits: false;\n      initial-value: 0deg;\n    }\n\n    @property --glow {\n      syntax: \"\u003cnumber\u003e\";\n      inherits: false;\n      initial-value: 0;\n    }\n\n    :root {\n      --bg0: #03040a;\n      --bg1: #07091a;\n      --bg2: #101843;\n      --text: #f8f7ff;\n      --soft: #b9c3e8;\n      --muted: #7f8ab4;\n      --line: rgba(255,255,255,.16);\n      --glass: rgba(255,255,255,.085);\n      --glass2: rgba(255,255,255,.052);\n      --blackGlass: rgba(0,0,0,.34);\n      --cyan: #00eaff;\n      --violet: #7c3cff;\n      --pink: #ff4ff3;\n      --gold: #ffd166;\n      --green: #23e6a8;\n      --red: #ff4770;\n      --radius: 30px;\n      --shadow: 0 32px 120px rgba(0,0,0,.52);\n      --mx: 50%;\n      --my: 50%;\n    }\n\n    * {\n      box-sizing: border-box;\n    }\n\n    html {\n      scroll-behavior: smooth;\n      background: var(--bg0);\n    }\n\n    body {\n      margin: 0;\n      min-height: 100vh;\n      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif;\n      color: var(--text);\n      background:\n        radial-gradient(circle at var(--mx) var(--my), rgba(0,234,255,.16), transparent 18rem),\n        radial-gradient(circle at 14% 8%, rgba(124,60,255,.36), transparent 34rem),\n        radial-gradient(circle at 86% 12%, rgba(0,234,255,.22), transparent 30rem),\n        radial-gradient(circle at 50% 105%, rgba(255,79,243,.14), transparent 34rem),\n        linear-gradient(135deg, var(--bg0), var(--bg1) 46%, var(--bg2));\n      overflow-x: hidden;\n      text-rendering: geometricPrecision;\n      -webkit-font-smoothing: antialiased;\n    }\n\n    body::before {\n      content: \"\";\n      position: fixed;\n      inset: 0;\n      z-index: 0;\n      pointer-events: none;\n      background:\n        linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),\n        linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);\n      background-size: 58px 58px;\n      mask-image: radial-gradient(circle at 50% 18%, rgba(0,0,0,.72), transparent 72%);\n    }\n\n    body::after {\n      content: \"\";\n      position: fixed;\n      inset: -20%;\n      z-index: 0;\n      pointer-events: none;\n      background: conic-gradient(from var(--spin), transparent, rgba(0,234,255,.11), transparent, rgba(255,79,243,.12), transparent);\n      filter: blur(70px);\n      opacity: .75;\n      animation: spinField 18s linear infinite;\n    }\n\n    @keyframes spinField {\n      to {\n        --spin: 360deg;\n      }\n    }\n\n    #quantumCanvas {\n      position: fixed;\n      inset: 0;\n      z-index: 0;\n      pointer-events: none;\n      opacity: .62;\n    }\n\n    .wrap {\n      position: relative;\n      z-index: 2;\n      width: min(1280px, 100%);\n      margin: 0 auto;\n      padding: 22px;\n    }\n\n    .nav {\n      position: sticky;\n      top: 12px;\n      z-index: 20;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      gap: 14px;\n      padding: 12px;\n      border: 1px solid rgba(255,255,255,.12);\n      background: rgba(6,8,20,.58);\n      backdrop-filter: blur(22px) saturate(140%);\n      border-radius: 24px;\n      box-shadow: 0 18px 60px rgba(0,0,0,.24);\n    }\n\n    .brand {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      font-weight: 950;\n      letter-spacing: -.55px;\n      white-space: nowrap;\n    }\n\n    .logo {\n      width: 42px;\n      height: 42px;\n      border-radius: 16px;\n      position: relative;\n      background:\n        radial-gradient(circle at 31% 24%, #fff, transparent 16%),\n        conic-gradient(from var(--spin), var(--cyan), var(--violet), var(--pink), var(--cyan));\n      box-shadow: 0 0 42px rgba(124,60,255,.48);\n      animation: spinField 8s linear infinite;\n      flex: 0 0 auto;\n    }\n\n    .logo::after {\n      content: \"\";\n      position: absolute;\n      inset: 7px;\n      border-radius: 12px;\n      border: 1px solid rgba(255,255,255,.26);\n      background: rgba(0,0,0,.18);\n    }\n\n    .navlinks {\n      display: flex;\n      justify-content: flex-end;\n      align-items: center;\n      gap: 8px;\n      flex-wrap: wrap;\n    }\n\n    .pill {\n      color: var(--text);\n      text-decoration: none;\n      font-size: 13px;\n      font-weight: 900;\n      padding: 10px 12px;\n      border: 1px solid rgba(255,255,255,.13);\n      background: rgba(255,255,255,.065);\n      border-radius: 999px;\n      transition: transform .22s ease, border-color .22s ease, background .22s ease;\n    }\n\n    .pill:hover {\n      transform: translateY(-2px);\n      border-color: rgba(0,234,255,.44);\n      background: rgba(0,234,255,.09);\n    }\n\n    .hero {\n      min-height: calc(100vh - 110px);\n      display: grid;\n      grid-template-columns: 1.03fr .97fr;\n      gap: 22px;\n      align-items: center;\n      padding: 44px 0 28px;\n    }\n\n    .card {\n      border: 1px solid var(--line);\n      background:\n        linear-gradient(180deg, rgba(255,255,255,.105), rgba(255,255,255,.055)),\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.10), transparent 40%);\n      backdrop-filter: blur(24px) saturate(150%);\n      border-radius: var(--radius);\n      padding: clamp(22px, 4vw, 42px);\n      box-shadow: var(--shadow);\n      position: relative;\n      overflow: hidden;\n      transform: translateZ(0);\n      content-visibility: auto;\n      contain-intrinsic-size: 700px;\n    }\n\n    .card::before {\n      content: \"\";\n      position: absolute;\n      inset: 0;\n      opacity: .55;\n      pointer-events: none;\n      background:\n        linear-gradient(115deg, transparent 0 35%, rgba(255,255,255,.14) 49%, transparent 61%),\n        radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,.10), transparent 22rem);\n      transform: translateX(-38%);\n      animation: glassScan 8.5s ease-in-out infinite;\n    }\n\n    @keyframes glassScan {\n      0%, 100% {\n        transform: translateX(-42%);\n      }\n      50% {\n        transform: translateX(42%);\n      }\n    }\n\n    .above {\n      position: relative;\n      z-index: 2;\n    }\n\n    .badge {\n      display: inline-flex;\n      align-items: center;\n      gap: 9px;\n      border: 1px solid rgba(255,255,255,.14);\n      background: rgba(0,0,0,.24);\n      color: var(--soft);\n      padding: 9px 13px;\n      border-radius: 999px;\n      font-size: 13px;\n      font-weight: 950;\n      margin-bottom: 18px;\n    }\n\n    .dot {\n      width: 9px;\n      height: 9px;\n      border-radius: 99px;\n      background: var(--green);\n      box-shadow: 0 0 18px var(--green);\n    }\n\n    h1 {\n      margin: 0 0 18px;\n      font-size: clamp(48px, 8vw, 116px);\n      letter-spacing: -4.8px;\n      line-height: .86;\n    }\n\n    h2 {\n      margin: 0 0 14px;\n      font-size: clamp(28px, 4vw, 52px);\n      letter-spacing: -1.8px;\n      line-height: 1;\n    }\n\n    h3 {\n      margin: 0 0 8px;\n      font-size: 21px;\n      letter-spacing: -.4px;\n    }\n\n    p {\n      margin: 0 0 15px;\n      color: var(--soft);\n      line-height: 1.65;\n      font-size: 17px;\n    }\n\n    .grad {\n      background: linear-gradient(90deg, var(--cyan), #57a7ff, var(--violet), var(--pink));\n      -webkit-background-clip: text;\n      background-clip: text;\n      color: transparent;\n    }\n\n    .gold {\n      color: var(--gold);\n    }\n\n    .actions {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 12px;\n      margin-top: 24px;\n    }\n\n    button,\n    .btn {\n      border: 0;\n      cursor: pointer;\n      color: white;\n      background:\n        radial-gradient(circle at 30% 20%, rgba(255,255,255,.36), transparent 22%),\n        linear-gradient(135deg, var(--violet), #3f8dff);\n      border-radius: 18px;\n      padding: 14px 18px;\n      font-weight: 950;\n      text-decoration: none;\n      font-size: 15px;\n      box-shadow: 0 18px 50px rgba(124,60,255,.28);\n      transition: transform .22s ease, filter .22s ease, box-shadow .22s ease;\n      transform: translateZ(0);\n    }\n\n    button:hover,\n    .btn:hover {\n      transform: translateY(-3px) scale(1.01);\n      filter: saturate(1.2);\n      box-shadow: 0 24px 70px rgba(124,60,255,.38);\n    }\n\n    button.secondary,\n    .btn.secondary {\n      background: rgba(255,255,255,.09);\n      border: 1px solid var(--line);\n      box-shadow: none;\n    }\n\n    button.gold,\n    .btn.gold {\n      background:\n        radial-gradient(circle at 28% 20%, rgba(255,255,255,.38), transparent 22%),\n        linear-gradient(135deg, #ffb703, #ff4ff3);\n      box-shadow: 0 18px 55px rgba(255,79,243,.22);\n    }\n\n    .quantumStage {\n      min-height: 590px;\n      display: grid;\n      place-items: center;\n      perspective: 1400px;\n      overflow: hidden;\n      border-radius: var(--radius);\n    }\n\n    .device {\n      position: relative;\n      width: min(460px, 86vw);\n      aspect-ratio: 1 / 1.18;\n      transform-style: preserve-3d;\n      will-change: transform;\n      transition: transform .08s linear;\n    }\n\n    .halo {\n      position: absolute;\n      inset: 9%;\n      border-radius: 50%;\n      background: conic-gradient(from var(--spin), rgba(0,234,255,.0), rgba(0,234,255,.8), rgba(124,60,255,.0), rgba(255,79,243,.72), rgba(0,234,255,.0));\n      filter: blur(20px);\n      opacity: .72;\n      animation: spinField 7s linear infinite;\n      transform: translateZ(-60px);\n    }\n\n    .orb {\n      position: absolute;\n      inset: 13% 8% 18%;\n      border-radius: 48% 52% 44% 56% / 46% 48% 52% 54%;\n      background:\n        radial-gradient(circle at 34% 24%, rgba(255,255,255,.95), transparent 10%),\n        radial-gradient(circle at 42% 42%, rgba(0,234,255,.80), transparent 22%),\n        radial-gradient(circle at 58% 56%, rgba(124,60,255,.66), transparent 38%),\n        radial-gradient(circle at 70% 70%, rgba(255,79,243,.44), transparent 50%),\n        rgba(255,255,255,.05);\n      border: 1px solid rgba(255,255,255,.24);\n      box-shadow:\n        inset 0 0 100px rgba(255,255,255,.08),\n        0 0 90px rgba(0,234,255,.28),\n        0 0 160px rgba(124,60,255,.36);\n      animation: levitate 5.8s ease-in-out infinite, morph 8s ease-in-out infinite;\n      transform: translateZ(90px);\n    }\n\n    .orb::before,\n    .orb::after {\n      content: \"\";\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      width: 128%;\n      height: 31%;\n      border: 1px solid rgba(255,255,255,.22);\n      border-radius: 50%;\n      transform: translate(-50%, -50%) rotateX(72deg) rotateZ(16deg);\n      box-shadow: 0 0 40px rgba(0,234,255,.20);\n    }\n\n    .orb::after {\n      width: 86%;\n      height: 22%;\n      transform: translate(-50%, -50%) rotateX(68deg) rotateZ(-36deg);\n      border-color: rgba(255,79,243,.28);\n    }\n\n    .shadowOrb {\n      position: absolute;\n      left: 50%;\n      bottom: 3%;\n      width: 54%;\n      height: 12%;\n      transform: translateX(-50%) rotateX(72deg);\n      background: radial-gradient(ellipse, rgba(0,234,255,.36), rgba(124,60,255,.18), transparent 68%);\n      filter: blur(13px);\n      opacity: .88;\n      animation: shadowPulse 5.8s ease-in-out infinite;\n    }\n\n    .chip {\n      position: absolute;\n      z-index: 4;\n      border: 1px solid rgba(255,255,255,.16);\n      background: rgba(2,4,14,.52);\n      backdrop-filter: blur(18px) saturate(150%);\n      border-radius: 18px;\n      padding: 12px 14px;\n      color: #e7ecff;\n      box-shadow: 0 20px 70px rgba(0,0,0,.30);\n      font-weight: 950;\n      animation: chipFloat 4.9s ease-in-out infinite;\n      transform: translateZ(160px);\n      white-space: nowrap;\n    }\n\n    .chip small {\n      display: block;\n      margin-top: 3px;\n      color: var(--muted);\n      font-weight: 800;\n    }\n\n    .chip.c1 {\n      top: 4%;\n      left: 0;\n    }\n\n    .chip.c2 {\n      top: 18%;\n      right: -3%;\n      animation-delay: .8s;\n    }\n\n    .chip.c3 {\n      bottom: 18%;\n      left: -1%;\n      animation-delay: 1.4s;\n    }\n\n    .chip.c4 {\n      bottom: 5%;\n      right: 7%;\n      animation-delay: 2.1s;\n    }\n\n    @keyframes levitate {\n      0%, 100% {\n        transform: translateY(0) translateZ(90px) scale(1);\n      }\n      50% {\n        transform: translateY(-24px) translateZ(110px) scale(1.025);\n      }\n    }\n\n    @keyframes morph {\n      0%, 100% {\n        border-radius: 48% 52% 44% 56% / 46% 48% 52% 54%;\n      }\n      50% {\n        border-radius: 54% 46% 58% 42% / 48% 55% 45% 52%;\n      }\n    }\n\n    @keyframes shadowPulse {\n      0%, 100% {\n        opacity: .58;\n        transform: translateX(-50%) rotateX(72deg) scale(.92);\n      }\n      50% {\n        opacity: .92;\n        transform: translateX(-50%) rotateX(72deg) scale(1.16);\n      }\n    }\n\n    @keyframes chipFloat {\n      0%, 100% {\n        translate: 0 0;\n      }\n      50% {\n        translate: 0 -14px;\n      }\n    }\n\n    .section {\n      padding: 28px 0;\n    }\n\n    .grid4 {\n      display: grid;\n      grid-template-columns: repeat(4, 1fr);\n      gap: 14px;\n    }\n\n    .mini {\n      border: 1px solid var(--line);\n      background: var(--glass2);\n      border-radius: 24px;\n      padding: 18px;\n      transform: translateY(18px);\n      opacity: 0;\n      transition: transform .7s cubic-bezier(.2,.9,.2,1), opacity .7s ease;\n      content-visibility: auto;\n      contain-intrinsic-size: 230px;\n    }\n\n    .mini.show {\n      transform: translateY(0);\n      opacity: 1;\n    }\n\n    .mini strong {\n      display: block;\n      margin-bottom: 8px;\n      font-size: 17px;\n    }\n\n    .appGrid {\n      display: grid;\n      grid-template-columns: .78fr 1.22fr;\n      gap: 22px;\n      align-items: start;\n    }\n\n    label {\n      display: block;\n      margin: 14px 0 7px;\n      color: var(--soft);\n      font-size: 13px;\n      font-weight: 950;\n    }\n\n    input,\n    textarea,\n    select {\n      width: 100%;\n      border: 1px solid var(--line);\n      background: rgba(0,0,0,.28);\n      color: var(--text);\n      border-radius: 16px;\n      padding: 14px 15px;\n      outline: none;\n      font-size: 15px;\n      transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;\n    }\n\n    input:focus,\n    textarea:focus,\n    select:focus {\n      border-color: rgba(0,234,255,.52);\n      box-shadow: 0 0 0 4px rgba(0,234,255,.08);\n      background: rgba(0,0,0,.34);\n    }\n\n    textarea {\n      min-height: 106px;\n      resize: vertical;\n    }\n\n    .signalGrid {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 12px;\n      margin-top: 14px;\n    }\n\n    .signal {\n      border: 1px solid var(--line);\n      background:\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.08), transparent 34%),\n        rgba(0,0,0,.24);\n      border-radius: 20px;\n      padding: 16px;\n      cursor: pointer;\n      transition: transform .2s ease, border-color .2s ease, background .2s ease, box-shadow .2s ease;\n      transform: translateZ(0);\n    }\n\n    .signal:hover {\n      transform: translateY(-4px);\n      border-color: rgba(0,234,255,.36);\n      box-shadow: 0 16px 60px rgba(0,234,255,.08);\n    }\n\n    .signal.active {\n      background:\n        radial-gradient(circle at 20% 10%, rgba(255,255,255,.18), transparent 28%),\n        linear-gradient(135deg, rgba(124,60,255,.40), rgba(0,234,255,.16));\n      border-color: rgba(0,234,255,.52);\n      box-shadow: 0 20px 80px rgba(0,234,255,.10);\n    }\n\n    .signal b {\n      display: block;\n      margin-bottom: 6px;\n      font-size: 16px;\n    }\n\n    .signal span {\n      display: block;\n      color: var(--soft);\n      font-size: 13px;\n      line-height: 1.45;\n    }\n\n    .result {\n      display: none;\n      margin-top: 16px;\n    }\n\n    .result.show {\n      display: block;\n      animation: resultIn .55s cubic-bezier(.2,.9,.2,1);\n    }\n\n    @keyframes resultIn {\n      from {\n        opacity: 0;\n        transform: translateY(16px) scale(.985);\n      }\n      to {\n        opacity: 1;\n        transform: translateY(0) scale(1);\n      }\n    }\n\n    .resultHero {\n      border: 1px solid var(--line);\n      background:\n        radial-gradient(circle at 20% 20%, rgba(0,234,255,.18), transparent 30%),\n        radial-gradient(circle at 80% 10%, rgba(124,60,255,.24), transparent 36%),\n        rgba(255,255,255,.055);\n      border-radius: 26px;\n      padding: 22px;\n      margin-bottom: 14px;\n    }\n\n    .resultTitle {\n      font-size: clamp(28px, 4vw, 54px);\n      font-weight: 950;\n      letter-spacing: -2px;\n      margin: 8px 0 10px;\n      line-height: 1;\n    }\n\n    .scoreGrid {\n      display: grid;\n      grid-template-columns: repeat(4, 1fr);\n      gap: 10px;\n      margin: 14px 0;\n    }\n\n    .score {\n      border: 1px solid var(--line);\n      background: rgba(255,255,255,.06);\n      border-radius: 18px;\n      padding: 13px;\n      text-align: center;\n    }\n\n    .score b {\n      display: block;\n      font-size: 24px;\n      margin-bottom: 3px;\n    }\n\n    .success {\n      display: none;\n      border: 1px solid rgba(37,224,163,.35);\n      background: rgba(37,224,163,.09);\n      color: #caffdf;\n      border-radius: 20px;\n      padding: 15px;\n      margin-top: 14px;\n    }\n\n    .success.show {\n      display: block;\n    }\n\n    details {\n      border: 1px solid var(--line);\n      background: rgba(0,0,0,.20);\n      border-radius: 20px;\n      padding: 14px;\n      margin-top: 14px;\n    }\n\n    summary {\n      cursor: pointer;\n      font-weight: 950;\n    }\n\n    pre {\n      background: rgba(0,0,0,.36);\n      border: 1px solid var(--line);\n      color: #dbe4ff;\n      border-radius: 18px;\n      padding: 16px;\n      overflow: auto;\n      white-space: pre-wrap;\n      min-height: 120px;\n    }\n\n    .footer {\n      text-align: center;\n      color: var(--muted);\n      font-size: 13px;\n      padding: 30px 0 48px;\n    }\n\n    @supports (animation-timeline: view()) {\n      .mini {\n        animation: revealByView both;\n        animation-timeline: view();\n        animation-range: entry 10% cover 34%;\n      }\n\n      @keyframes revealByView {\n        from {\n          opacity: 0;\n          transform: translateY(28px) scale(.98);\n        }\n        to {\n          opacity: 1;\n          transform: translateY(0) scale(1);\n        }\n      }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      *,\n      *::before,\n      *::after {\n        animation-duration: .001ms !important;\n        animation-iteration-count: 1 !important;\n        transition-duration: .001ms !important;\n        scroll-behavior: auto !important;\n      }\n\n      #quantumCanvas {\n        display: none;\n      }\n    }\n\n    @media (max-width: 980px) {\n      .hero,\n      .appGrid {\n        grid-template-columns: 1fr;\n      }\n\n      .grid4,\n      .scoreGrid {\n        grid-template-columns: 1fr;\n      }\n\n      .signalGrid {\n        grid-template-columns: 1fr;\n      }\n\n      .quantumStage {\n        min-height: 500px;\n      }\n\n      .card {\n        border-radius: 25px;\n      }\n\n      h1 {\n        letter-spacing: -2.7px;\n      }\n\n      .nav {\n        align-items: flex-start;\n        flex-direction: column;\n        position: relative;\n        top: auto;\n      }\n\n      .navlinks {\n        justify-content: flex-start;\n      }\n\n      .chip {\n        font-size: 12px;\n      }\n\n      .chip.c1 {\n        left: 2%;\n      }\n\n      .chip.c2 {\n        right: 2%;\n      }\n\n      .chip.c3 {\n        left: 3%;\n      }\n\n      .chip.c4 {\n        right: 4%;\n      }\n    }\n  \u003c/style\u003e\n\u003c/head\u003e\n\u003cbody\u003e\n  \u003ccanvas id=\"quantumCanvas\" aria-hidden=\"true\"\u003e\u003c/canvas\u003e\n\n  \u003cdiv class=\"wrap\"\u003e\n    \u003cnav class=\"nav\"\u003e\n      \u003cdiv class=\"brand\"\u003e\n        \u003cdiv class=\"logo\"\u003e\u003c/div\u003e\n        \u003cdiv\u003eAI Twin by SoulFlame\u003c/div\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"navlinks\"\u003e\n        \u003ca class=\"pill\" href=\"#create\"\u003eCreate Twin\u003c/a\u003e\n        \u003ca class=\"pill\" href=\"#quantum\"\u003eQuantum Core\u003c/a\u003e\n        \u003ca class=\"pill\" href=\"/test\" target=\"_blank\"\u003eTest\u003c/a\u003e\n        \u003ca class=\"pill\" href=\"/admin\" target=\"_blank\"\u003eAdmin\u003c/a\u003e\n      \u003c/div\u003e\n    \u003c/nav\u003e\n\n    \u003csection class=\"hero\"\u003e\n      \u003cdiv class=\"card tilt\"\u003e\n        \u003cdiv class=\"above\"\u003e\n          \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e V36 · Quantum Levitation Ultra Smooth\u003c/div\u003e\n\n          \u003ch1\u003eBuild your \u003cspan class=\"grad\"\u003eAI Twin\u003c/span\u003e in quantum mode\u003c/h1\u003e\n\n          \u003cp\u003e\n            Това е новото лице на SoulFlame Twins — гладък, левитиращ, футуристичен AI Twin интерфейс,\n            който комбинира EchoProfile, Future Self, deep signal и cloud запис.\n          \u003c/p\u003e\n\n          \u003cp\u003e\n            Дизайнът е построен за усещане: плавно движение, 3D parallax, quantum particles,\n            стъклени слоеве и реален Supabase backend.\n          \u003c/p\u003e\n\n          \u003cdiv class=\"actions\"\u003e\n            \u003ca class=\"btn\" href=\"#create\"\u003eАктивирай AI Twin\u003c/a\u003e\n            \u003cbutton class=\"secondary\" onclick=\"checkHealth()\"\u003eSystem Check\u003c/button\u003e\n            \u003cbutton class=\"gold\" onclick=\"demoTwin()\"\u003eDemo Twin\u003c/button\u003e\n          \u003c/div\u003e\n\n          \u003cdetails\u003e\n            \u003csummary\u003eLive System Status\u003c/summary\u003e\n            \u003cpre id=\"healthBox\"\u003eReady.\u003c/pre\u003e\n          \u003c/details\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card quantumStage tilt\" id=\"quantum\"\u003e\n        \u003cdiv class=\"device\" id=\"device\"\u003e\n          \u003cdiv class=\"halo\"\u003e\u003c/div\u003e\n          \u003cdiv class=\"orb\"\u003e\u003c/div\u003e\n          \u003cdiv class=\"shadowOrb\"\u003e\u003c/div\u003e\n\n          \u003cdiv class=\"chip c1\"\u003eEcho Core\u003csmall\u003eidentity signal\u003c/small\u003e\u003c/div\u003e\n          \u003cdiv class=\"chip c2\"\u003eFuture Twin\u003csmall\u003esimulation layer\u003c/small\u003e\u003c/div\u003e\n          \u003cdiv class=\"chip c3\"\u003eQuantum Memory\u003csmall\u003ebehavior map\u003c/small\u003e\u003c/div\u003e\n          \u003cdiv class=\"chip c4\"\u003eSoulFlame Sync\u003csmall\u003ecloud active\u003c/small\u003e\u003c/div\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection class=\"section\"\u003e\n      \u003cdiv class=\"grid4\"\u003e\n        \u003cdiv class=\"mini\"\u003e\n          \u003cstrong\u003eQuantum Smooth\u003c/strong\u003e\n          \u003cp\u003eДвижението е върху transform и opacity, за да се усеща леко и плавно.\u003c/p\u003e\n        \u003c/div\u003e\n\n        \u003cdiv class=\"mini\"\u003e\n          \u003cstrong\u003eLevitation Core\u003c/strong\u003e\n          \u003cp\u003eЦентралният orb симулира AI Twin ядро с плаващи слоеве и реакция към курсора.\u003c/p\u003e\n        \u003c/div\u003e\n\n        \u003cdiv class=\"mini\"\u003e\n          \u003cstrong\u003eEcho Signal\u003c/strong\u003e\n          \u003cp\u003eПотребителят избира вътрешните си сигнали и системата създава Twin Seed.\u003c/p\u003e\n        \u003c/div\u003e\n\n        \u003cdiv class=\"mini\"\u003e\n          \u003cstrong\u003eSupabase Cloud\u003c/strong\u003e\n          \u003cp\u003eВсеки генериран AI Twin се записва като реален profile в базата.\u003c/p\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection id=\"create\" class=\"section appGrid\"\u003e\n      \u003cdiv class=\"card\"\u003e\n        \u003cdiv class=\"above\"\u003e\n          \u003ch2\u003eТвоят Twin Seed\u003c/h2\u003e\n\n          \u003clabel\u003eИме\u003c/label\u003e\n          \u003cinput id=\"name\" placeholder=\"Например: Димитър\"\u003e\n\n          \u003clabel\u003eКонтакт\u003c/label\u003e\n          \u003cinput id=\"contact\" placeholder=\"email / телефон / Instagram\"\u003e\n\n          \u003clabel\u003eВъзраст\u003c/label\u003e\n          \u003cselect id=\"age\"\u003e\n            \u003coption\u003e18-24\u003c/option\u003e\n            \u003coption selected\u003e25-34\u003c/option\u003e\n            \u003coption\u003e35-44\u003c/option\u003e\n            \u003coption\u003e45+\u003c/option\u003e\n          \u003c/select\u003e\n\n          \u003clabel\u003eКакво искаш да прави твоят AI Twin?\u003c/label\u003e\n          \u003ctextarea id=\"goal\" placeholder=\"Например: да ме разбира, да ми помага с решения, бизнес, връзки, бъдещи избори...\"\u003e\u003c/textarea\u003e\n\n          \u003cdiv class=\"actions\"\u003e\n            \u003cbutton onclick=\"generateTwin()\"\u003eGenerate AI Twin\u003c/button\u003e\n            \u003cbutton class=\"secondary\" onclick=\"resetTwin()\"\u003eReset\u003c/button\u003e\n          \u003c/div\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card\"\u003e\n        \u003cdiv class=\"above\"\u003e\n          \u003ch2\u003eTwin Signals\u003c/h2\u003e\n          \u003cp\u003eИзбери вътрешните сигнали, които най-много приличат на теб.\u003c/p\u003e\n\n          \u003cdiv id=\"signals\" class=\"signalGrid\"\u003e\u003c/div\u003e\n\n          \u003cdiv id=\"successBox\" class=\"success\"\u003e\n            AI Twin seed е записан успешно в SoulFlame cloud.\n          \u003c/div\u003e\n\n          \u003cdiv id=\"result\" class=\"result\"\u003e\n            \u003cdiv class=\"resultHero\"\u003e\n              \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e AI Twin Activated\u003c/div\u003e\n              \u003cdiv id=\"resultTitle\" class=\"resultTitle\"\u003e\u003c/div\u003e\n              \u003cdiv id=\"resultText\"\u003e\u003c/div\u003e\n            \u003c/div\u003e\n\n            \u003cdiv id=\"scoreGrid\" class=\"scoreGrid\"\u003e\u003c/div\u003e\n\n            \u003cdiv class=\"mini show\"\u003e\n              \u003ch3\u003eFull Twin Upgrade\u003c/h3\u003e\n              \u003cp\u003e\n                Full Twin отключва Future Twin message, deep Echo Blueprint,\n                личен план и AI mirror profile.\n              \u003c/p\u003e\n\n              \u003cdiv class=\"actions\"\u003e\n                \u003cbutton class=\"gold\" onclick=\"requestFullTwin()\"\u003eЗаяви Full AI Twin\u003c/button\u003e\n                \u003cbutton class=\"secondary\" onclick=\"copyTwin()\"\u003eКопирай резултата\u003c/button\u003e\n              \u003c/div\u003e\n            \u003c/div\u003e\n\n            \u003cdetails\u003e\n              \u003csummary\u003eAdvanced API response\u003c/summary\u003e\n              \u003cpre id=\"apiBox\"\u003eReady.\u003c/pre\u003e\n            \u003c/details\u003e\n          \u003c/div\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003cdiv class=\"footer\"\u003e\n      SoulFlame Twins · V36 Quantum Levitation Ultra Smooth · Vercel + Supabase\n    \u003c/div\u003e\n  \u003c/div\u003e\n\n  \u003cscript\u003e\n    const signalDefs = [\n      { key: \"vision\", title: \"Vision Engine\", text: \"Виждам възможности преди да станат очевидни.\", score: 10 },\n      { key: \"logic\", title: \"System Mind\", text: \"Подреждам хаос в структура, план и стратегия.\", score: 10 },\n      { key: \"emotion\", title: \"Emotional Radar\", text: \"Усещам хора, сигнали и скрити настроения.\", score: 10 },\n      { key: \"action\", title: \"Momentum Core\", text: \"Искам движение, скорост и реален резултат.\", score: 10 },\n      { key: \"social\", title: \"Influence Layer\", text: \"Влияя чрез думи, присъствие и идея.\", score: 10 },\n      { key: \"future\", title: \"Future Self\", text: \"Мисля за версията ми след 1, 3 или 5 години.\", score: 10 },\n      { key: \"deep\", title: \"Deep Mind\", text: \"Искам да видя подсъзнателните си модели.\", score: 10 },\n      { key: \"creator\", title: \"Creator Mode\", text: \"Не искам само да участвам. Искам да създавам системи.\", score: 10 }\n    ];\n\n    const archetypes = {\n      vision: \"Future Architect\",\n      logic: \"Quantum System Builder\",\n      emotion: \"Emotional Mirror\",\n      action: \"Momentum Engine\",\n      social: \"Influence Twin\",\n      future: \"Future Self Twin\",\n      deep: \"Subconscious Explorer\",\n      creator: \"Creator Twin\"\n    };\n\n    const descriptions = {\n      vision: \"Твоят AI Twin мисли напред: идеи, сценарии, възможности и бъдещи системи.\",\n      logic: \"Твоят AI Twin подрежда хаоса: планове, стъпки, логика и решения.\",\n      emotion: \"Твоят AI Twin разчита емоционални сигнали: реакции, хора и връзки.\",\n      action: \"Твоят AI Twin те бута към действие: скорост, фокус и изпълнение.\",\n      social: \"Твоят AI Twin усилва влиянието ти: комуникация, позициониране и присъствие.\",\n      future: \"Твоят AI Twin говори като бъдеща версия на теб: предупреждения, избори и посока.\",\n      deep: \"Твоят AI Twin анализира дълбоки модели: страхове, мотивация и повторения.\",\n      creator: \"Твоят AI Twin работи като създател: бизнес, системи, идеи и реализация.\"\n    };\n\n    const selected = {};\n    let lastTwin = null;\n\n    function showJson(id, data) {\n      const el = document.getElementById(id);\n      if (!el) return;\n      el.textContent = typeof data === \"string\" ? data : JSON.stringify(data, null, 2);\n    }\n\n    function renderSignals() {\n      const box = document.getElementById(\"signals\");\n      box.innerHTML = \"\";\n\n      signalDefs.forEach(signal =\u003e {\n        const div = document.createElement(\"div\");\n        div.className = \"signal\";\n        div.dataset.key = signal.key;\n        div.innerHTML = \"\u003cb\u003e\" + signal.title + \"\u003c/b\u003e\u003cspan\u003e\" + signal.text + \"\u003c/span\u003e\";\n\n        div.addEventListener(\"click\", () =\u003e {\n          const change = () =\u003e {\n            selected[signal.key] = !selected[signal.key];\n            div.classList.toggle(\"active\", Boolean(selected[signal.key]));\n          };\n\n          if (document.startViewTransition) {\n            document.startViewTransition(change);\n          } else {\n            change();\n          }\n        });\n\n        box.appendChild(div);\n      });\n    }\n\n    async function checkHealth() {\n      showJson(\"healthBox\", \"Checking /api/health...\");\n\n      try {\n        const res = await fetch(\"/api/health\");\n        const data = await res.json();\n        showJson(\"healthBox\", data);\n      } catch (error) {\n        showJson(\"healthBox\", error.message);\n      }\n    }\n\n    function demoTwin() {\n      document.getElementById(\"name\").value = \"Demo Quantum Twin\";\n      document.getElementById(\"contact\").value = \"demo@soulflame.local\";\n      document.getElementById(\"age\").value = \"25-34\";\n      document.getElementById(\"goal\").value = \"Искам AI Twin, който ми помага да мисля по-ясно, да вземам решения и да развивам идеите си.\";\n\n      [\"vision\", \"logic\", \"future\", \"creator\"].forEach(key =\u003e selected[key] = true);\n\n      document.querySelectorAll(\".signal\").forEach(el =\u003e {\n        el.classList.toggle(\"active\", Boolean(selected[el.dataset.key]));\n      });\n\n      location.hash = \"#create\";\n    }\n\n    function buildScores() {\n      const scores = {};\n\n      signalDefs.forEach(signal =\u003e {\n        scores[signal.key] = selected[signal.key] ? signal.score : 2;\n      });\n\n      return scores;\n    }\n\n    function getTopSignals(scores) {\n      return Object.entries(scores).sort((a, b) =\u003e b[1] - a[1]);\n    }\n\n    async function generateTwin() {\n      const name = document.getElementById(\"name\").value.trim();\n      const contact = document.getElementById(\"contact\").value.trim();\n      const age = document.getElementById(\"age\").value;\n      const goal = document.getElementById(\"goal\").value.trim();\n\n      if (!name) {\n        alert(\"Попълни име.\");\n        return;\n      }\n\n      if (!contact) {\n        alert(\"Попълни контакт.\");\n        return;\n      }\n\n      const activeSignals = Object.keys(selected).filter(key =\u003e selected[key]);\n\n      if (!activeSignals.length) {\n        alert(\"Избери поне един Twin Signal.\");\n        return;\n      }\n\n      const scores = buildScores();\n      const top = getTopSignals(scores);\n      const mainKey = top[0][0];\n      const secondKey = top[1][0];\n\n      const profile = archetypes[mainKey] + \" + \" + archetypes[secondKey];\n      const report = descriptions[mainKey];\n\n      const fullReport =\n        \"Full AI Twin за \" + name + \": водещ слой \" + archetypes[mainKey] +\n        \", втори слой \" + archetypes[secondKey] +\n        \". Следва Future Twin message, личен план и deep Echo анализ.\";\n\n      lastTwin = {\n        id: Date.now(),\n        user: { name, contact, age, goal },\n        mainTrait: mainKey,\n        secondTrait: secondKey,\n        profile,\n        scores,\n        report,\n        fullReport,\n        selectedSignals: activeSignals,\n        product: \"AI Twin by SoulFlame\",\n        version: \"V36_QUANTUM_LEVITATION_ULTRA_SMOOTH\",\n        createdAt: new Date().toISOString()\n      };\n\n      const showResult = () =\u003e {\n        document.getElementById(\"result\").classList.add(\"show\");\n        document.getElementById(\"resultTitle\").textContent = profile;\n\n        document.getElementById(\"resultText\").innerHTML =\n          \"\u003cp\u003e\u003cstrong\u003e\" + name + \"\u003c/strong\u003e, твоят AI Twin започва като \u003cstrong class=\u0027grad\u0027\u003e\" + archetypes[mainKey] + \"\u003c/strong\u003e.\u003c/p\u003e\" +\n          \"\u003cp\u003e\" + report + \"\u003c/p\u003e\" +\n          \"\u003cp\u003eВтори активен слой: \u003cstrong\u003e\" + archetypes[secondKey] + \"\u003c/strong\u003e.\u003c/p\u003e\" +\n          \"\u003cp class=\u0027gold\u0027\u003eTwin Seed: active · Cloud sync: pending\u003c/p\u003e\";\n\n        const grid = document.getElementById(\"scoreGrid\");\n        grid.innerHTML = \"\";\n\n        top.slice(0, 4).forEach(([key, value]) =\u003e {\n          const div = document.createElement(\"div\");\n          div.className = \"score\";\n          div.innerHTML = \"\u003cb\u003e\" + value + \"\u003c/b\u003e\u003cspan\u003e\" + archetypes[key] + \"\u003c/span\u003e\";\n          grid.appendChild(div);\n        });\n      };\n\n      if (document.startViewTransition) {\n        document.startViewTransition(showResult);\n      } else {\n        showResult();\n      }\n\n      await saveTwin(lastTwin);\n    }\n\n    async function saveTwin(twin) {\n      showJson(\"apiBox\", \"Saving AI Twin seed to SoulFlame cloud...\");\n\n      try {\n        const res = await fetch(\"/api/profile\", {\n          method: \"POST\",\n          headers: { \"Content-Type\": \"application/json\" },\n          body: JSON.stringify(twin)\n        });\n\n        const data = await res.json();\n        showJson(\"apiBox\", data);\n\n        if (data.ok) {\n          document.getElementById(\"successBox\").classList.add(\"show\");\n        }\n      } catch (error) {\n        showJson(\"apiBox\", error.message);\n      }\n    }\n\n    async function requestFullTwin() {\n      if (!lastTwin) {\n        alert(\"Първо генерирай AI Twin.\");\n        return;\n      }\n\n      showJson(\"apiBox\", \"Creating Full AI Twin request...\");\n\n      try {\n        const res = await fetch(\"/api/payment-request\", {\n          method: \"POST\",\n          headers: { \"Content-Type\": \"application/json\" },\n          body: JSON.stringify({\n            offer: \"Full AI Twin by SoulFlame\",\n            amount: \"19.99 лв\",\n            method: \"manual\",\n            user: lastTwin.user,\n            profile: lastTwin.profile,\n            scores: lastTwin.scores,\n            rawTwin: lastTwin\n          })\n        });\n\n        const data = await res.json();\n        showJson(\"apiBox\", data);\n\n        if (data.ok) {\n          alert(\"Заявката за Full AI Twin е създадена.\");\n        }\n      } catch (error) {\n        showJson(\"apiBox\", error.message);\n      }\n    }\n\n    function copyTwin() {\n      if (!lastTwin) {\n        alert(\"Няма AI Twin за копиране.\");\n        return;\n      }\n\n      const text =\n        \"AI Twin by SoulFlame\\n\" +\n        \"Име: \" + lastTwin.user.name + \"\\n\" +\n        \"Профил: \" + lastTwin.profile + \"\\n\" +\n        \"Report: \" + lastTwin.report + \"\\n\";\n\n      navigator.clipboard.writeText(text);\n      alert(\"AI Twin резултатът е копиран.\");\n    }\n\n    function resetTwin() {\n      Object.keys(selected).forEach(key =\u003e delete selected[key]);\n      document.querySelectorAll(\".signal\").forEach(el =\u003e el.classList.remove(\"active\"));\n      document.getElementById(\"result\").classList.remove(\"show\");\n      document.getElementById(\"successBox\").classList.remove(\"show\");\n      showJson(\"apiBox\", \"Ready.\");\n      lastTwin = null;\n    }\n\n    function setupReveal() {\n      const items = document.querySelectorAll(\".mini\");\n\n      if (!(\"IntersectionObserver\" in window)) {\n        items.forEach(el =\u003e el.classList.add(\"show\"));\n        return;\n      }\n\n      const io = new IntersectionObserver(entries =\u003e {\n        entries.forEach(entry =\u003e {\n          if (entry.isIntersecting) {\n            entry.target.classList.add(\"show\");\n            io.unobserve(entry.target);\n          }\n        });\n      }, { threshold: .16 });\n\n      items.forEach(el =\u003e io.observe(el));\n    }\n\n    function setupPointer() {\n      const device = document.getElementById(\"device\");\n      const reduce = window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches;\n\n      if (!device || reduce) return;\n\n      let targetX = 0;\n      let targetY = 0;\n      let currentX = 0;\n      let currentY = 0;\n\n      window.addEventListener(\"pointermove\", event =\u003e {\n        const x = event.clientX / window.innerWidth;\n        const y = event.clientY / window.innerHeight;\n\n        document.documentElement.style.setProperty(\"--mx\", (x * 100).toFixed(2) + \"%\");\n        document.documentElement.style.setProperty(\"--my\", (y * 100).toFixed(2) + \"%\");\n\n        targetX = (x - .5) * 18;\n        targetY = (y - .5) * -18;\n      }, { passive: true });\n\n      function raf() {\n        currentX += (targetX - currentX) * .08;\n        currentY += (targetY - currentY) * .08;\n        device.style.transform = \"rotateY(\" + currentX.toFixed(2) + \"deg) rotateX(\" + currentY.toFixed(2) + \"deg)\";\n        requestAnimationFrame(raf);\n      }\n\n      raf();\n    }\n\n    function setupCanvas() {\n      const canvas = document.getElementById(\"quantumCanvas\");\n      const ctx = canvas.getContext(\"2d\");\n      const reduce = window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches;\n\n      if (reduce) return;\n\n      let width = 0;\n      let height = 0;\n      let dpr = 1;\n      let particles = [];\n\n      function resize() {\n        dpr = Math.min(window.devicePixelRatio || 1, 2);\n        width = window.innerWidth;\n        height = window.innerHeight;\n        canvas.width = Math.floor(width * dpr);\n        canvas.height = Math.floor(height * dpr);\n        canvas.style.width = width + \"px\";\n        canvas.style.height = height + \"px\";\n        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\n\n        const count = Math.min(92, Math.max(44, Math.floor(width / 18)));\n        particles = Array.from({ length: count }, () =\u003e ({\n          x: Math.random() * width,\n          y: Math.random() * height,\n          vx: (Math.random() - .5) * .22,\n          vy: (Math.random() - .5) * .22,\n          r: Math.random() * 1.8 + .7,\n          a: Math.random() * .42 + .12\n        }));\n      }\n\n      function draw() {\n        ctx.clearRect(0, 0, width, height);\n\n        for (let i = 0; i \u003c particles.length; i++) {\n          const p = particles[i];\n\n          p.x += p.vx;\n          p.y += p.vy;\n\n          if (p.x \u003c -20) p.x = width + 20;\n          if (p.x \u003e width + 20) p.x = -20;\n          if (p.y \u003c -20) p.y = height + 20;\n          if (p.y \u003e height + 20) p.y = -20;\n\n          ctx.beginPath();\n          ctx.fillStyle = \"rgba(0,234,255,\" + p.a + \")\";\n          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);\n          ctx.fill();\n\n          for (let j = i + 1; j \u003c particles.length; j++) {\n            const q = particles[j];\n            const dx = p.x - q.x;\n            const dy = p.y - q.y;\n            const dist = Math.sqrt(dx * dx + dy * dy);\n\n            if (dist \u003c 115) {\n              ctx.beginPath();\n              ctx.strokeStyle = \"rgba(124,60,255,\" + ((1 - dist / 115) * .16).toFixed(3) + \")\";\n              ctx.lineWidth = 1;\n              ctx.moveTo(p.x, p.y);\n              ctx.lineTo(q.x, q.y);\n              ctx.stroke();\n            }\n          }\n        }\n\n        requestAnimationFrame(draw);\n      }\n\n      resize();\n      window.addEventListener(\"resize\", resize, { passive: true });\n      draw();\n    }\n\n    renderSignals();\n    setupReveal();\n    setupPointer();\n    setupCanvas();\n    checkHealth();\n  \u003c/script\u003e\n\u003c/body\u003e\n\u003c/html\u003e";
const INLINE_ADMIN_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\"\u003e\n  \u003ctitle\u003eSoulFlame Twins Admin\u003c/title\u003e\n  \u003cstyle\u003e\n    body{\n      margin:0;\n      min-height:100vh;\n      background:\n        radial-gradient(circle at 20% 10%, rgba(124,60,255,.30), transparent 35%),\n        linear-gradient(135deg,#05060d,#101327,#07111e);\n      color:white;\n      font-family:Arial,sans-serif;\n      padding:24px;\n    }\n    .wrap{width:min(1120px,100%);margin:0 auto}\n    .card{\n      border:1px solid rgba(255,255,255,.16);\n      background:rgba(255,255,255,.08);\n      border-radius:24px;\n      padding:22px;\n      margin-bottom:16px;\n      box-shadow:0 22px 80px rgba(0,0,0,.28);\n    }\n    input,button{\n      border-radius:14px;\n      padding:13px 14px;\n      border:1px solid rgba(255,255,255,.16);\n      background:rgba(0,0,0,.28);\n      color:white;\n    }\n    button{\n      cursor:pointer;\n      background:linear-gradient(135deg,#7c3cff,#4c8dff);\n      font-weight:900;\n      margin:6px 4px 0 0;\n    }\n    pre{\n      background:rgba(0,0,0,.35);\n      padding:16px;\n      border-radius:16px;\n      overflow:auto;\n      white-space:pre-wrap;\n      min-height:260px;\n    }\n    a{color:#8bdfff}\n  \u003c/style\u003e\n\u003c/head\u003e\n\u003cbody\u003e\n  \u003cdiv class=\"wrap\"\u003e\n    \u003cdiv class=\"card\"\u003e\n      \u003ch1\u003eSoulFlame Twins Admin\u003c/h1\u003e\n      \u003cp\u003eВъведи admin PIN от Vercel Environment Variables.\u003c/p\u003e\n      \u003cinput id=\"pin\" placeholder=\"ECHO_ADMIN_PIN\" style=\"width:min(420px,100%)\"\u003e\n      \u003cbr\u003e\n      \u003cbutton onclick=\"loadData()\"\u003eLoad Data\u003c/button\u003e\n      \u003cbutton onclick=\"loadMetrics()\"\u003eMetrics\u003c/button\u003e\n      \u003cbutton onclick=\"generateCode()\"\u003eGenerate Unlock Code\u003c/button\u003e\n      \u003ca href=\"/\" style=\"margin-left:12px\"\u003eBack\u003c/a\u003e\n      \u003ca href=\"/test\" style=\"margin-left:12px\"\u003eTest\u003c/a\u003e\n    \u003c/div\u003e\n\n    \u003cdiv class=\"card\"\u003e\n      \u003ch2\u003eOutput\u003c/h2\u003e\n      \u003cpre id=\"out\"\u003eReady.\u003c/pre\u003e\n    \u003c/div\u003e\n  \u003c/div\u003e\n\n  \u003cscript\u003e\n    const out = document.getElementById(\"out\");\n\n    function show(data){\n      out.textContent = typeof data === \"string\" ? data : JSON.stringify(data,null,2);\n    }\n\n    function pin(){\n      return document.getElementById(\"pin\").value.trim();\n    }\n\n    async function loadData(){\n      show(\"Loading admin data...\");\n      const res = await fetch(\"/api/admin/data\", {\n        headers: { \"x-admin-pin\": pin() }\n      });\n      const data = await res.json();\n      show(data);\n    }\n\n    async function loadMetrics(){\n      show(\"Loading metrics...\");\n      const res = await fetch(\"/api/admin/metrics\", {\n        headers: { \"x-admin-pin\": pin() }\n      });\n      const data = await res.json();\n      show(data);\n    }\n\n    async function generateCode(){\n      show(\"Generating code...\");\n      const res = await fetch(\"/api/admin/code\", {\n        method:\"POST\",\n        headers: {\n          \"Content-Type\":\"application/json\",\n          \"x-admin-pin\": pin()\n        },\n        body: JSON.stringify({\n          offer:\"Full AI Echo\",\n          note:\"Generated from admin panel\"\n        })\n      });\n      const data = await res.json();\n      show(data);\n    }\n  \u003c/script\u003e\n\u003c/body\u003e\n\u003c/html\u003e";
const INLINE_TEST_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\"\u003e\n  \u003ctitle\u003eSoulFlame Twins — Production Test\u003c/title\u003e\n  \u003cstyle\u003e\n    body{\n      margin:0;\n      min-height:100vh;\n      background:linear-gradient(135deg,#05060d,#101327,#07111e);\n      color:white;\n      font-family:Arial,sans-serif;\n      padding:24px;\n    }\n    .wrap{width:min(1000px,100%);margin:0 auto}\n    .card{\n      border:1px solid rgba(255,255,255,.16);\n      background:rgba(255,255,255,.08);\n      border-radius:24px;\n      padding:22px;\n      margin-bottom:16px;\n    }\n    button{\n      border:0;\n      cursor:pointer;\n      color:white;\n      background:linear-gradient(135deg,#7c3cff,#4c8dff);\n      border-radius:14px;\n      padding:13px 15px;\n      font-weight:900;\n      margin:6px 4px 0 0;\n    }\n    input{\n      border-radius:14px;\n      padding:13px 14px;\n      border:1px solid rgba(255,255,255,.16);\n      background:rgba(0,0,0,.28);\n      color:white;\n      width:min(420px,100%);\n    }\n    pre{\n      background:rgba(0,0,0,.35);\n      padding:16px;\n      border-radius:16px;\n      overflow:auto;\n      white-space:pre-wrap;\n      min-height:300px;\n    }\n    a{color:#8bdfff}\n  \u003c/style\u003e\n\u003c/head\u003e\n\u003cbody\u003e\n  \u003cdiv class=\"wrap\"\u003e\n    \u003cdiv class=\"card\"\u003e\n      \u003ch1\u003eProduction Test — SoulFlame Twins\u003c/h1\u003e\n      \u003cp\u003eТества всички основни routes без да пипаш кода.\u003c/p\u003e\n      \u003ca href=\"/\"\u003eBack to site\u003c/a\u003e\n      \u003cbr\u003e\u003cbr\u003e\n      \u003cinput id=\"pin\" placeholder=\"Admin PIN за admin tests\"\u003e\n      \u003cbr\u003e\n      \u003cbutton onclick=\"testHealth()\"\u003eHealth\u003c/button\u003e\n      \u003cbutton onclick=\"testProfile()\"\u003eProfile Write\u003c/button\u003e\n      \u003cbutton onclick=\"testLead()\"\u003eLead Write\u003c/button\u003e\n      \u003cbutton onclick=\"testPayment()\"\u003ePayment Request\u003c/button\u003e\n      \u003cbutton onclick=\"testAdminData()\"\u003eAdmin Data\u003c/button\u003e\n      \u003cbutton onclick=\"testAdminCode()\"\u003eAdmin Code\u003c/button\u003e\n      \u003cbutton onclick=\"runAll()\"\u003eRun All Basic\u003c/button\u003e\n    \u003c/div\u003e\n\n    \u003cdiv class=\"card\"\u003e\n      \u003ch2\u003eOutput\u003c/h2\u003e\n      \u003cpre id=\"out\"\u003eReady.\u003c/pre\u003e\n    \u003c/div\u003e\n  \u003c/div\u003e\n\n  \u003cscript\u003e\n    const out = document.getElementById(\"out\");\n\n    function show(data){\n      out.textContent = typeof data === \"string\" ? data : JSON.stringify(data,null,2);\n    }\n\n    function pin(){\n      return document.getElementById(\"pin\").value.trim();\n    }\n\n    async function call(url, options = {}){\n      const res = await fetch(url, options);\n      const text = await res.text();\n      try { return { status:res.status, data: JSON.parse(text) }; }\n      catch { return { status:res.status, data:text }; }\n    }\n\n    async function testHealth(){\n      show(\"Testing /api/health...\");\n      show(await call(\"/api/health\"));\n    }\n\n    async function testProfile(){\n      show(\"Testing /api/profile...\");\n      const body = {\n        id: Date.now(),\n        user:{ name:\"V30 Test Client\", contact:\"v30-test@soulflame.local\", goal:\"V30 route test\", age:\"25-34\" },\n        mainTrait:\"vision\",\n        secondTrait:\"logic\",\n        profile:\"V30 Production Test Profile\",\n        scores:{ vision:10, logic:9, emotion:6, social:5, action:8 },\n        report:\"V30 mini report\",\n        fullReport:\"V30 full report\",\n        createdAt:new Date().toISOString()\n      };\n\n      show(await call(\"/api/profile\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\" },\n        body:JSON.stringify(body)\n      }));\n    }\n\n    async function testLead(){\n      show(\"Testing /api/lead...\");\n      show(await call(\"/api/lead\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\" },\n        body:JSON.stringify({\n          offer:\"V30 Lead Test\",\n          user:{ name:\"V30 Lead\", contact:\"lead@soulflame.local\" },\n          profile:\"Lead route test\",\n          scores:{ vision:1 }\n        })\n      }));\n    }\n\n    async function testPayment(){\n      show(\"Testing /api/payment-request...\");\n      show(await call(\"/api/payment-request\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\" },\n        body:JSON.stringify({\n          offer:\"Full AI Echo\",\n          amount:\"19.99 лв\",\n          method:\"manual\",\n          user:{ name:\"V30 Payment\", contact:\"payment@soulflame.local\" },\n          profile:\"Payment route test\",\n          scores:{ vision:1 }\n        })\n      }));\n    }\n\n    async function testAdminData(){\n      show(\"Testing /api/admin/data...\");\n      show(await call(\"/api/admin/data\", {\n        headers:{ \"x-admin-pin\":pin() }\n      }));\n    }\n\n    async function testAdminCode(){\n      show(\"Testing /api/admin/code...\");\n      show(await call(\"/api/admin/code\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\", \"x-admin-pin\":pin() },\n        body:JSON.stringify({ offer:\"Full AI Echo\", note:\"V30 test code\" })\n      }));\n    }\n\n    async function runAll(){\n      const results = {};\n      results.health = await call(\"/api/health\");\n      results.profile = await call(\"/api/profile\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\" },\n        body:JSON.stringify({\n          id: Date.now(),\n          user:{ name:\"V30 RunAll\", contact:\"runall@soulflame.local\", goal:\"Run all\", age:\"25-34\" },\n          mainTrait:\"vision\",\n          secondTrait:\"logic\",\n          profile:\"RunAll Profile\",\n          scores:{ vision:10, logic:9 },\n          report:\"RunAll mini\",\n          fullReport:\"RunAll full\",\n          createdAt:new Date().toISOString()\n        })\n      });\n      results.lead = await call(\"/api/lead\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\" },\n        body:JSON.stringify({ offer:\"RunAll Lead\", user:{ name:\"RunAll\", contact:\"runall@soulflame.local\" } })\n      });\n      results.payment = await call(\"/api/payment-request\", {\n        method:\"POST\",\n        headers:{ \"Content-Type\":\"application/json\" },\n        body:JSON.stringify({ offer:\"Full AI Echo\", amount:\"19.99 лв\", method:\"manual\", user:{ name:\"RunAll\", contact:\"runall@soulflame.local\" } })\n      });\n      show(results);\n    }\n  \u003c/script\u003e\n\u003c/body\u003e\n\u003c/html\u003e";

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
      "/api/payment-request",
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

    if (req.method === "POST" && pathName === "/api/payment-request") {
      await handlePaymentRequest(req, res);
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