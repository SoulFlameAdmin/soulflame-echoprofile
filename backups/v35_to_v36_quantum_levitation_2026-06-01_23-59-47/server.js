const http = require("http");
const crypto = require("crypto");

const APP_NAME = "SoulFlame Twins";
const MODULE_NAME = "EchoProfile";
const APP_VERSION = "V35_HARD_INLINE_AI_TWIN_FRONTEND";

const OWNER_EMAIL = process.env.OWNER_EMAIL || "stere0metal360@gmail.com";
const APP_MODE = process.env.APP_MODE || "production";
const DATA_MODE = process.env.DATA_MODE || "supabase";
const ADMIN_PIN = process.env.ECHO_ADMIN_PIN || "ECHO-ADMIN-999";
const SERVER_STARTED_AT = Date.now();

const INLINE_INDEX_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\"\u003e\n  \u003ctitle\u003eAI Twin by SoulFlame — Levitation Twin\u003c/title\u003e\n  \u003cmeta name=\"description\" content=\"AI Twin by SoulFlame — създай своя дигитален двойник чрез EchoProfile, Future Twin и персонален AI сигнал.\"\u003e\n  \u003cmeta property=\"og:title\" content=\"AI Twin by SoulFlame\"\u003e\n  \u003cmeta property=\"og:description\" content=\"Срещни своя AI Twin — дигитална версия на теб, която започва от EchoProfile.\"\u003e\n  \u003cmeta name=\"theme-color\" content=\"#050611\"\u003e\n\n  \u003cstyle\u003e\n    :root{\n      --bg0:#04050d;\n      --bg1:#090b1d;\n      --bg2:#10163a;\n      --glass:rgba(255,255,255,.085);\n      --glass2:rgba(255,255,255,.055);\n      --line:rgba(255,255,255,.16);\n      --text:#f7f7ff;\n      --muted:#aeb8d7;\n      --cyan:#00eaff;\n      --violet:#7c3cff;\n      --pink:#ff4ff3;\n      --gold:#ffd166;\n      --green:#25e0a3;\n      --red:#ff4d6d;\n      --shadow:0 30px 110px rgba(0,0,0,.46);\n    }\n\n    *{box-sizing:border-box}\n\n    html{scroll-behavior:smooth}\n\n    body{\n      margin:0;\n      min-height:100vh;\n      font-family:Arial, Helvetica, sans-serif;\n      color:var(--text);\n      background:\n        radial-gradient(circle at 16% 8%, rgba(124,60,255,.36), transparent 34%),\n        radial-gradient(circle at 82% 14%, rgba(0,234,255,.22), transparent 30%),\n        radial-gradient(circle at 50% 100%, rgba(255,79,243,.13), transparent 36%),\n        linear-gradient(135deg,var(--bg0),var(--bg1) 46%,var(--bg2));\n      overflow-x:hidden;\n    }\n\n    body:before{\n      content:\"\";\n      position:fixed;\n      inset:0;\n      pointer-events:none;\n      background-image:\n        linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),\n        linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);\n      background-size:52px 52px;\n      mask-image:linear-gradient(to bottom, rgba(0,0,0,.55), transparent 78%);\n      z-index:0;\n    }\n\n    .wrap{\n      position:relative;\n      z-index:1;\n      width:min(1240px,100%);\n      margin:0 auto;\n      padding:24px;\n    }\n\n    .nav{\n      display:flex;\n      align-items:center;\n      justify-content:space-between;\n      gap:16px;\n      padding:14px 0 28px;\n    }\n\n    .brand{\n      display:flex;\n      align-items:center;\n      gap:13px;\n      font-weight:950;\n      letter-spacing:-.6px;\n    }\n\n    .logo{\n      width:44px;\n      height:44px;\n      border-radius:17px;\n      background:\n        radial-gradient(circle at 30% 25%, #fff, transparent 22%),\n        linear-gradient(135deg,var(--cyan),var(--violet),var(--pink));\n      box-shadow:0 0 45px rgba(124,60,255,.55);\n    }\n\n    .navlinks{\n      display:flex;\n      align-items:center;\n      justify-content:flex-end;\n      gap:10px;\n      flex-wrap:wrap;\n    }\n\n    .pill{\n      border:1px solid var(--line);\n      background:rgba(255,255,255,.07);\n      color:var(--text);\n      border-radius:999px;\n      padding:10px 13px;\n      text-decoration:none;\n      font-size:13px;\n      font-weight:850;\n    }\n\n    .hero{\n      display:grid;\n      grid-template-columns:1.02fr .98fr;\n      gap:22px;\n      align-items:stretch;\n      padding:12px 0 22px;\n    }\n\n    .card{\n      border:1px solid var(--line);\n      background:linear-gradient(180deg, rgba(255,255,255,.095), rgba(255,255,255,.055));\n      backdrop-filter:blur(20px);\n      border-radius:32px;\n      padding:34px;\n      box-shadow:var(--shadow);\n    }\n\n    .badge{\n      display:inline-flex;\n      align-items:center;\n      gap:9px;\n      border:1px solid var(--line);\n      background:rgba(0,0,0,.23);\n      color:var(--muted);\n      padding:9px 13px;\n      border-radius:999px;\n      font-size:13px;\n      font-weight:900;\n      margin-bottom:18px;\n    }\n\n    .dot{\n      width:9px;\n      height:9px;\n      border-radius:99px;\n      background:var(--green);\n      box-shadow:0 0 18px var(--green);\n    }\n\n    h1{\n      margin:0 0 18px;\n      font-size:clamp(48px,7.6vw,104px);\n      line-height:.88;\n      letter-spacing:-4px;\n    }\n\n    h2{\n      margin:0 0 14px;\n      font-size:clamp(26px,3.5vw,46px);\n      letter-spacing:-1.5px;\n    }\n\n    h3{\n      margin:0 0 10px;\n      font-size:20px;\n    }\n\n    p{\n      color:var(--muted);\n      font-size:17px;\n      line-height:1.6;\n      margin:0 0 15px;\n    }\n\n    .grad{\n      background:linear-gradient(90deg,var(--cyan),var(--violet),var(--pink));\n      -webkit-background-clip:text;\n      background-clip:text;\n      color:transparent;\n    }\n\n    .gold{\n      color:var(--gold);\n    }\n\n    .actions{\n      display:flex;\n      flex-wrap:wrap;\n      gap:12px;\n      margin-top:22px;\n    }\n\n    button,.btn{\n      border:0;\n      cursor:pointer;\n      color:white;\n      background:linear-gradient(135deg,var(--violet),#4c8dff);\n      border-radius:17px;\n      padding:14px 18px;\n      font-weight:950;\n      text-decoration:none;\n      box-shadow:0 15px 42px rgba(124,60,255,.27);\n      font-size:15px;\n    }\n\n    button.secondary,.btn.secondary{\n      background:rgba(255,255,255,.09);\n      border:1px solid var(--line);\n      box-shadow:none;\n    }\n\n    button.gold,.btn.gold{\n      background:linear-gradient(135deg,#ffb703,#ff4ff3);\n    }\n\n    .levitationStage{\n      position:relative;\n      min-height:530px;\n      overflow:hidden;\n      display:grid;\n      place-items:center;\n    }\n\n    .orb{\n      position:relative;\n      width:min(390px,88vw);\n      aspect-ratio:1/1;\n      border-radius:50%;\n      background:\n        radial-gradient(circle at 35% 28%, rgba(255,255,255,.92), transparent 10%),\n        radial-gradient(circle at 50% 45%, rgba(0,234,255,.85), transparent 0 20%, rgba(124,60,255,.58) 38%, rgba(255,79,243,.30) 58%, transparent 70%),\n        radial-gradient(circle, rgba(255,255,255,.08), rgba(255,255,255,.02));\n      border:1px solid rgba(255,255,255,.22);\n      box-shadow:\n        0 0 80px rgba(0,234,255,.26),\n        0 0 140px rgba(124,60,255,.34),\n        inset 0 0 80px rgba(255,255,255,.08);\n      animation:floatOrb 5.6s ease-in-out infinite;\n    }\n\n    .orb:before,\n    .orb:after{\n      content:\"\";\n      position:absolute;\n      inset:11%;\n      border-radius:50%;\n      border:1px solid rgba(255,255,255,.18);\n      transform:rotateX(72deg) rotateZ(18deg);\n      box-shadow:0 0 42px rgba(0,234,255,.22);\n    }\n\n    .orb:after{\n      inset:22%;\n      transform:rotateX(68deg) rotateZ(-31deg);\n      border-color:rgba(255,79,243,.22);\n    }\n\n    .ring{\n      position:absolute;\n      width:min(520px,96vw);\n      height:130px;\n      border-radius:50%;\n      border:1px solid rgba(255,255,255,.16);\n      transform:rotateX(68deg);\n      box-shadow:0 0 55px rgba(0,234,255,.12);\n      animation:ringSpin 9s linear infinite;\n    }\n\n    .floatChip{\n      position:absolute;\n      border:1px solid var(--line);\n      background:rgba(0,0,0,.28);\n      backdrop-filter:blur(16px);\n      border-radius:18px;\n      padding:12px 14px;\n      font-weight:900;\n      color:#dbe4ff;\n      box-shadow:0 22px 60px rgba(0,0,0,.26);\n      animation:floatChip 4.8s ease-in-out infinite;\n    }\n\n    .chip1{top:40px;left:26px}\n    .chip2{right:28px;top:92px;animation-delay:.7s}\n    .chip3{left:52px;bottom:76px;animation-delay:1.3s}\n    .chip4{right:58px;bottom:48px;animation-delay:2s}\n\n    @keyframes floatOrb{\n      0%,100%{transform:translateY(0) scale(1)}\n      50%{transform:translateY(-22px) scale(1.025)}\n    }\n\n    @keyframes floatChip{\n      0%,100%{transform:translateY(0)}\n      50%{transform:translateY(-13px)}\n    }\n\n    @keyframes ringSpin{\n      from{transform:rotateX(68deg) rotateZ(0)}\n      to{transform:rotateX(68deg) rotateZ(360deg)}\n    }\n\n    .section{\n      padding:18px 0;\n    }\n\n    .grid4{\n      display:grid;\n      grid-template-columns:repeat(4,1fr);\n      gap:14px;\n    }\n\n    .mini{\n      border:1px solid var(--line);\n      background:var(--glass2);\n      border-radius:24px;\n      padding:18px;\n    }\n\n    .mini strong{\n      display:block;\n      margin-bottom:8px;\n      font-size:17px;\n    }\n\n    .appGrid{\n      display:grid;\n      grid-template-columns:.78fr 1.22fr;\n      gap:22px;\n      align-items:start;\n    }\n\n    label{\n      display:block;\n      margin:14px 0 7px;\n      color:var(--muted);\n      font-size:13px;\n      font-weight:900;\n    }\n\n    input,textarea,select{\n      width:100%;\n      border:1px solid var(--line);\n      background:rgba(0,0,0,.27);\n      color:var(--text);\n      border-radius:16px;\n      padding:14px 15px;\n      outline:none;\n      font-size:15px;\n    }\n\n    textarea{\n      min-height:100px;\n      resize:vertical;\n    }\n\n    .signalGrid{\n      display:grid;\n      grid-template-columns:repeat(2,1fr);\n      gap:12px;\n      margin-top:14px;\n    }\n\n    .signal{\n      border:1px solid var(--line);\n      background:rgba(0,0,0,.24);\n      border-radius:18px;\n      padding:15px;\n      cursor:pointer;\n      transition:.18s;\n    }\n\n    .signal:hover{\n      transform:translateY(-2px);\n      border-color:rgba(0,234,255,.36);\n    }\n\n    .signal.active{\n      background:linear-gradient(135deg, rgba(124,60,255,.35), rgba(0,234,255,.14));\n      border-color:rgba(0,234,255,.46);\n      box-shadow:0 18px 55px rgba(0,234,255,.08);\n    }\n\n    .signal b{\n      display:block;\n      margin-bottom:6px;\n    }\n\n    .signal span{\n      color:var(--muted);\n      font-size:13px;\n      line-height:1.45;\n    }\n\n    .result{\n      display:none;\n      margin-top:16px;\n    }\n\n    .result.show{\n      display:block;\n    }\n\n    .resultHero{\n      border:1px solid var(--line);\n      background:\n        radial-gradient(circle at 20% 20%, rgba(0,234,255,.16), transparent 30%),\n        radial-gradient(circle at 80% 10%, rgba(124,60,255,.22), transparent 36%),\n        rgba(255,255,255,.055);\n      border-radius:26px;\n      padding:22px;\n      margin-bottom:14px;\n    }\n\n    .resultTitle{\n      font-size:clamp(28px,4vw,52px);\n      font-weight:950;\n      letter-spacing:-1.8px;\n      margin:8px 0 10px;\n    }\n\n    .scoreGrid{\n      display:grid;\n      grid-template-columns:repeat(4,1fr);\n      gap:10px;\n      margin:14px 0;\n    }\n\n    .score{\n      border:1px solid var(--line);\n      background:rgba(255,255,255,.06);\n      border-radius:18px;\n      padding:13px;\n      text-align:center;\n    }\n\n    .score b{\n      display:block;\n      font-size:24px;\n      margin-bottom:3px;\n    }\n\n    .success{\n      display:none;\n      border:1px solid rgba(37,224,163,.35);\n      background:rgba(37,224,163,.09);\n      color:#caffdf;\n      border-radius:20px;\n      padding:15px;\n      margin-top:14px;\n    }\n\n    .success.show{\n      display:block;\n    }\n\n    details{\n      border:1px solid var(--line);\n      background:rgba(0,0,0,.20);\n      border-radius:20px;\n      padding:14px;\n      margin-top:14px;\n    }\n\n    summary{\n      cursor:pointer;\n      font-weight:900;\n    }\n\n    pre{\n      background:rgba(0,0,0,.36);\n      border:1px solid var(--line);\n      color:#dbe4ff;\n      border-radius:18px;\n      padding:16px;\n      overflow:auto;\n      white-space:pre-wrap;\n      min-height:120px;\n    }\n\n    .footer{\n      text-align:center;\n      color:var(--muted);\n      font-size:13px;\n      padding:28px 0 44px;\n    }\n\n    @media(max-width:960px){\n      .hero,.appGrid{grid-template-columns:1fr}\n      .grid4,.scoreGrid{grid-template-columns:1fr}\n      .signalGrid{grid-template-columns:1fr}\n      .card{padding:23px;border-radius:26px}\n      h1{letter-spacing:-2px}\n      .levitationStage{min-height:430px}\n      .nav{align-items:flex-start;flex-direction:column}\n      .navlinks{justify-content:flex-start}\n      .floatChip{font-size:12px}\n      .chip1{left:12px}\n      .chip2{right:12px}\n      .chip3{left:18px}\n      .chip4{right:18px}\n    }\n  \u003c/style\u003e\n\u003c/head\u003e\n\u003cbody\u003e\n  \u003cdiv class=\"wrap\"\u003e\n    \u003cnav class=\"nav\"\u003e\n      \u003cdiv class=\"brand\"\u003e\n        \u003cdiv class=\"logo\"\u003e\u003c/div\u003e\n        \u003cdiv\u003eAI Twin by SoulFlame\u003c/div\u003e\n      \u003c/div\u003e\n      \u003cdiv class=\"navlinks\"\u003e\n        \u003ca class=\"pill\" href=\"#create\"\u003eCreate Twin\u003c/a\u003e\n        \u003ca class=\"pill\" href=\"/test\" target=\"_blank\"\u003eTest\u003c/a\u003e\n        \u003ca class=\"pill\" href=\"/admin\" target=\"_blank\"\u003eAdmin\u003c/a\u003e\n      \u003c/div\u003e\n    \u003c/nav\u003e\n\n    \u003csection class=\"hero\"\u003e\n      \u003cdiv class=\"card\"\u003e\n        \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e V34 · Levitation AI Twin\u003c/div\u003e\n        \u003ch1\u003eСъздай своя \u003cspan class=\"grad\"\u003eAI Twin\u003c/span\u003e\u003c/h1\u003e\n        \u003cp\u003e\n          Не просто EchoProfile. Това е началото на твоя дигитален двойник —\n          версия на теб, която помни, анализира, симулира бъдещи избори и постепенно се превръща в личен AI съюзник.\n        \u003c/p\u003e\n        \u003cp\u003e\n          SoulFlame Twin започва с вътрешен сигнал: визия, логика, емоция, действие и социална интуиция.\n          После отключва Future Twin, Full Echo и персонален AI път.\n        \u003c/p\u003e\n        \u003cdiv class=\"actions\"\u003e\n          \u003ca class=\"btn\" href=\"#create\"\u003eАктивирай Twin Signal\u003c/a\u003e\n          \u003cbutton class=\"secondary\" onclick=\"checkHealth()\"\u003eПровери системата\u003c/button\u003e\n          \u003cbutton class=\"gold\" onclick=\"demoTwin()\"\u003eДемо Twin\u003c/button\u003e\n        \u003c/div\u003e\n\n        \u003cdetails\u003e\n          \u003csummary\u003eSystem Status\u003c/summary\u003e\n          \u003cpre id=\"healthBox\"\u003eReady.\u003c/pre\u003e\n        \u003c/details\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card levitationStage\"\u003e\n        \u003cdiv class=\"ring\"\u003e\u003c/div\u003e\n        \u003cdiv class=\"orb\"\u003e\u003c/div\u003e\n        \u003cdiv class=\"floatChip chip1\"\u003eEchoProfile Core\u003c/div\u003e\n        \u003cdiv class=\"floatChip chip2\"\u003eFuture Self Simulation\u003c/div\u003e\n        \u003cdiv class=\"floatChip chip3\"\u003eMemory Layer\u003c/div\u003e\n        \u003cdiv class=\"floatChip chip4\"\u003eAI Twin Signal\u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection class=\"section\"\u003e\n      \u003cdiv class=\"grid4\"\u003e\n        \u003cdiv class=\"mini\"\u003e\n          \u003cstrong\u003e1. Echo Signal\u003c/strong\u003e\n          \u003cp\u003eИзбираш вътрешните си модели и системата изгражда първичен психологически отпечатък.\u003c/p\u003e\n        \u003c/div\u003e\n        \u003cdiv class=\"mini\"\u003e\n          \u003cstrong\u003e2. Digital Twin Seed\u003c/strong\u003e\n          \u003cp\u003eСъздава се първо ядро на твоя AI Twin — профил, цел, мотивация и стил.\u003c/p\u003e\n        \u003c/div\u003e\n        \u003cdiv class=\"mini\"\u003e\n          \u003cstrong\u003e3. Future Twin\u003c/strong\u003e\n          \u003cp\u003eПолучаваш версия на себе си, която говори от бъдещето и те насочва.\u003c/p\u003e\n        \u003c/div\u003e\n        \u003cdiv class=\"mini\"\u003e\n          \u003cstrong\u003e4. Full Echo\u003c/strong\u003e\n          \u003cp\u003eОтключваш дълбок анализ, поведенчески цикли, рискове и next-step план.\u003c/p\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection id=\"create\" class=\"section appGrid\"\u003e\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eТвоят Twin Seed\u003c/h2\u003e\n\n        \u003clabel\u003eИме\u003c/label\u003e\n        \u003cinput id=\"name\" placeholder=\"Например: Димитър\"\u003e\n\n        \u003clabel\u003eКонтакт\u003c/label\u003e\n        \u003cinput id=\"contact\" placeholder=\"email / телефон / Instagram\"\u003e\n\n        \u003clabel\u003eВъзраст\u003c/label\u003e\n        \u003cselect id=\"age\"\u003e\n          \u003coption\u003e18-24\u003c/option\u003e\n          \u003coption selected\u003e25-34\u003c/option\u003e\n          \u003coption\u003e35-44\u003c/option\u003e\n          \u003coption\u003e45+\u003c/option\u003e\n        \u003c/select\u003e\n\n        \u003clabel\u003eКакво искаш да направи твоят AI Twin за теб?\u003c/label\u003e\n        \u003ctextarea id=\"goal\" placeholder=\"Например: да ме разбира, да ми помага с решения, бизнес, връзки, бъдещи избори...\"\u003e\u003c/textarea\u003e\n\n        \u003cdiv class=\"actions\"\u003e\n          \u003cbutton onclick=\"generateTwin()\"\u003eGenerate AI Twin\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"resetTwin()\"\u003eReset\u003c/button\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eИзбери Twin Signals\u003c/h2\u003e\n        \u003cp\u003eНатисни сигналите, които най-много приличат на теб.\u003c/p\u003e\n\n        \u003cdiv id=\"signals\" class=\"signalGrid\"\u003e\u003c/div\u003e\n\n        \u003cdiv id=\"successBox\" class=\"success\"\u003e\n          AI Twin seed е записан успешно в SoulFlame cloud.\n        \u003c/div\u003e\n\n        \u003cdiv id=\"result\" class=\"result\"\u003e\n          \u003cdiv class=\"resultHero\"\u003e\n            \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e AI Twin Activated\u003c/div\u003e\n            \u003cdiv id=\"resultTitle\" class=\"resultTitle\"\u003e\u003c/div\u003e\n            \u003cdiv id=\"resultText\"\u003e\u003c/div\u003e\n          \u003c/div\u003e\n\n          \u003cdiv id=\"scoreGrid\" class=\"scoreGrid\"\u003e\u003c/div\u003e\n\n          \u003cdiv class=\"mini\"\u003e\n            \u003ch3\u003eFull Twin Upgrade\u003c/h3\u003e\n            \u003cp\u003e\n              Full Twin може да включва персонален AI профил, Future Twin message,\n              deep Echo Blueprint и план за развитие.\n            \u003c/p\u003e\n            \u003cdiv class=\"actions\"\u003e\n              \u003cbutton class=\"gold\" onclick=\"requestFullTwin()\"\u003eЗаяви Full AI Twin\u003c/button\u003e\n              \u003cbutton class=\"secondary\" onclick=\"copyTwin()\"\u003eКопирай резултата\u003c/button\u003e\n            \u003c/div\u003e\n          \u003c/div\u003e\n\n          \u003cdetails\u003e\n            \u003csummary\u003eAdvanced API response\u003c/summary\u003e\n            \u003cpre id=\"apiBox\"\u003eReady.\u003c/pre\u003e\n          \u003c/details\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003cdiv class=\"footer\"\u003e\n      SoulFlame Twins · V34 Top Levitation AI Twin · Vercel + Supabase\n    \u003c/div\u003e\n  \u003c/div\u003e\n\n  \u003cscript\u003e\n    const signalDefs = [\n      {\n        key: \"vision\",\n        title: \"Визионер\",\n        text: \"Виждам идеи преди да станат очевидни.\",\n        score: 10\n      },\n      {\n        key: \"logic\",\n        title: \"Архитект\",\n        text: \"Превръщам хаоса в план и система.\",\n        score: 10\n      },\n      {\n        key: \"emotion\",\n        title: \"Емоционален радар\",\n        text: \"Усещам хора, сигнали и скрити настроения.\",\n        score: 10\n      },\n      {\n        key: \"action\",\n        title: \"Двигател\",\n        text: \"Искам движение, скорост и реален резултат.\",\n        score: 10\n      },\n      {\n        key: \"social\",\n        title: \"Влияние\",\n        text: \"Мога да въздействам чрез думи, присъствие и идея.\",\n        score: 10\n      },\n      {\n        key: \"future\",\n        title: \"Future Self\",\n        text: \"Мисля за версията на себе си след 1, 3 или 5 години.\",\n        score: 10\n      },\n      {\n        key: \"deep\",\n        title: \"Deep Mind\",\n        text: \"Искам да разбера подсъзнателните си модели.\",\n        score: 10\n      },\n      {\n        key: \"leader\",\n        title: \"Създател\",\n        text: \"Не искам само да участвам. Искам да създавам системи.\",\n        score: 10\n      }\n    ];\n\n    const selected = {};\n    let lastTwin = null;\n\n    const archetypes = {\n      vision: \"Future Architect\",\n      logic: \"System Builder\",\n      emotion: \"Emotional Mirror\",\n      action: \"Momentum Engine\",\n      social: \"Influence Twin\",\n      future: \"Future Self Twin\",\n      deep: \"Subconscious Explorer\",\n      leader: \"Creator Twin\"\n    };\n\n    const descriptions = {\n      vision: \"Твоят AI Twin трябва да мисли напред — идеи, сценарии, възможности и бъдещи системи.\",\n      logic: \"Твоят AI Twin трябва да подрежда хаоса — планове, стъпки, структури и решения.\",\n      emotion: \"Твоят AI Twin трябва да разчита емоционални сигнали — вътрешни реакции, хора и връзки.\",\n      action: \"Твоят AI Twin трябва да те бута към действие — скорост, фокус и изпълнение.\",\n      social: \"Твоят AI Twin трябва да усилва влиянието ти — комуникация, позициониране и присъствие.\",\n      future: \"Твоят AI Twin трябва да говори като твоя бъдеща версия — предупреждения, избори и посока.\",\n      deep: \"Твоят AI Twin трябва да анализира дълбоки модели — страхове, мотивация и повторения.\",\n      leader: \"Твоят AI Twin трябва да работи като създател — бизнес, системи, идеи и реализация.\"\n    };\n\n    function showJson(id, data) {\n      document.getElementById(id).textContent =\n        typeof data === \"string\" ? data : JSON.stringify(data, null, 2);\n    }\n\n    function renderSignals() {\n      const box = document.getElementById(\"signals\");\n      box.innerHTML = \"\";\n\n      signalDefs.forEach(signal =\u003e {\n        const div = document.createElement(\"div\");\n        div.className = \"signal\";\n        div.dataset.key = signal.key;\n        div.innerHTML = \"\u003cb\u003e\" + signal.title + \"\u003c/b\u003e\u003cspan\u003e\" + signal.text + \"\u003c/span\u003e\";\n\n        div.addEventListener(\"click\", () =\u003e {\n          selected[signal.key] = !selected[signal.key];\n          div.classList.toggle(\"active\", selected[signal.key]);\n        });\n\n        box.appendChild(div);\n      });\n    }\n\n    async function checkHealth() {\n      showJson(\"healthBox\", \"Checking /api/health...\");\n\n      try {\n        const res = await fetch(\"/api/health\");\n        const data = await res.json();\n        showJson(\"healthBox\", data);\n      } catch (error) {\n        showJson(\"healthBox\", error.message);\n      }\n    }\n\n    function demoTwin() {\n      document.getElementById(\"name\").value = \"Demo Twin\";\n      document.getElementById(\"contact\").value = \"demo@soulflame.local\";\n      document.getElementById(\"age\").value = \"25-34\";\n      document.getElementById(\"goal\").value = \"Искам AI Twin, който ми помага да вземам по-смели решения и да развивам идеите си.\";\n\n      [\"vision\", \"logic\", \"future\", \"leader\"].forEach(key =\u003e selected[key] = true);\n\n      document.querySelectorAll(\".signal\").forEach(el =\u003e {\n        el.classList.toggle(\"active\", Boolean(selected[el.dataset.key]));\n      });\n\n      location.hash = \"#create\";\n    }\n\n    function buildScores() {\n      const scores = {\n        vision: 0,\n        logic: 0,\n        emotion: 0,\n        action: 0,\n        social: 0,\n        future: 0,\n        deep: 0,\n        leader: 0\n      };\n\n      signalDefs.forEach(signal =\u003e {\n        scores[signal.key] = selected[signal.key] ? signal.score : 2;\n      });\n\n      return scores;\n    }\n\n    function getTopSignals(scores) {\n      return Object.entries(scores).sort((a, b) =\u003e b[1] - a[1]);\n    }\n\n    async function generateTwin() {\n      const name = document.getElementById(\"name\").value.trim();\n      const contact = document.getElementById(\"contact\").value.trim();\n      const age = document.getElementById(\"age\").value;\n      const goal = document.getElementById(\"goal\").value.trim();\n\n      if (!name) {\n        alert(\"Попълни име.\");\n        return;\n      }\n\n      if (!contact) {\n        alert(\"Попълни контакт.\");\n        return;\n      }\n\n      const activeSignals = Object.keys(selected).filter(key =\u003e selected[key]);\n\n      if (!activeSignals.length) {\n        alert(\"Избери поне един Twin Signal.\");\n        return;\n      }\n\n      const scores = buildScores();\n      const top = getTopSignals(scores);\n      const mainKey = top[0][0];\n      const secondKey = top[1][0];\n\n      const profile = archetypes[mainKey] + \" + \" + archetypes[secondKey];\n      const report = descriptions[mainKey];\n\n      const fullReport =\n        \"Full AI Twin за \" + name + \": водещ слой \" + archetypes[mainKey] +\n        \", втори слой \" + archetypes[secondKey] +\n        \". Следващата стъпка е Future Twin message, личен план и deep Echo анализ.\";\n\n      lastTwin = {\n        id: Date.now(),\n        user: { name, contact, age, goal },\n        mainTrait: mainKey,\n        secondTrait: secondKey,\n        profile,\n        scores,\n        report,\n        fullReport,\n        selectedSignals: activeSignals,\n        product: \"AI Twin by SoulFlame\",\n        version: \"V34_TOP_LEVITATION_AI_TWIN\",\n        createdAt: new Date().toISOString()\n      };\n\n      document.getElementById(\"result\").classList.add(\"show\");\n      document.getElementById(\"resultTitle\").textContent = profile;\n\n      document.getElementById(\"resultText\").innerHTML =\n        \"\u003cp\u003e\u003cstrong\u003e\" + name + \"\u003c/strong\u003e, твоят AI Twin започва като \u003cstrong class=\u0027grad\u0027\u003e\" + archetypes[mainKey] + \"\u003c/strong\u003e.\u003c/p\u003e\" +\n        \"\u003cp\u003e\" + report + \"\u003c/p\u003e\" +\n        \"\u003cp\u003eВтори активен слой: \u003cstrong\u003e\" + archetypes[secondKey] + \"\u003c/strong\u003e.\u003c/p\u003e\" +\n        \"\u003cp class=\u0027gold\u0027\u003eTwin Seed: active · Cloud sync: pending\u003c/p\u003e\";\n\n      const grid = document.getElementById(\"scoreGrid\");\n      grid.innerHTML = \"\";\n\n      top.slice(0, 4).forEach(([key, value]) =\u003e {\n        const div = document.createElement(\"div\");\n        div.className = \"score\";\n        div.innerHTML = \"\u003cb\u003e\" + value + \"\u003c/b\u003e\u003cspan\u003e\" + archetypes[key] + \"\u003c/span\u003e\";\n        grid.appendChild(div);\n      });\n\n      await saveTwin(lastTwin);\n    }\n\n    async function saveTwin(twin) {\n      showJson(\"apiBox\", \"Saving AI Twin seed to SoulFlame cloud...\");\n\n      try {\n        const res = await fetch(\"/api/profile\", {\n          method: \"POST\",\n          headers: {\n            \"Content-Type\": \"application/json\"\n          },\n          body: JSON.stringify(twin)\n        });\n\n        const data = await res.json();\n        showJson(\"apiBox\", data);\n\n        if (data.ok) {\n          document.getElementById(\"successBox\").classList.add(\"show\");\n        }\n      } catch (error) {\n        showJson(\"apiBox\", error.message);\n      }\n    }\n\n    async function requestFullTwin() {\n      if (!lastTwin) {\n        alert(\"Първо генерирай AI Twin.\");\n        return;\n      }\n\n      showJson(\"apiBox\", \"Creating Full AI Twin request...\");\n\n      try {\n        const res = await fetch(\"/api/payment-request\", {\n          method: \"POST\",\n          headers: {\n            \"Content-Type\": \"application/json\"\n          },\n          body: JSON.stringify({\n            offer: \"Full AI Twin by SoulFlame\",\n            amount: \"19.99 лв\",\n            method: \"manual\",\n            user: lastTwin.user,\n            profile: lastTwin.profile,\n            scores: lastTwin.scores,\n            rawTwin: lastTwin\n          })\n        });\n\n        const data = await res.json();\n        showJson(\"apiBox\", data);\n\n        if (data.ok) {\n          alert(\"Заявката за Full AI Twin е създадена.\");\n        }\n      } catch (error) {\n        showJson(\"apiBox\", error.message);\n      }\n    }\n\n    function copyTwin() {\n      if (!lastTwin) {\n        alert(\"Няма AI Twin за копиране.\");\n        return;\n      }\n\n      const text =\n        \"AI Twin by SoulFlame\\n\" +\n        \"Име: \" + lastTwin.user.name + \"\\n\" +\n        \"Профил: \" + lastTwin.profile + \"\\n\" +\n        \"Report: \" + lastTwin.report + \"\\n\";\n\n      navigator.clipboard.writeText(text);\n      alert(\"AI Twin резултатът е копиран.\");\n    }\n\n    function resetTwin() {\n      Object.keys(selected).forEach(key =\u003e delete selected[key]);\n      document.querySelectorAll(\".signal\").forEach(el =\u003e el.classList.remove(\"active\"));\n      document.getElementById(\"result\").classList.remove(\"show\");\n      document.getElementById(\"successBox\").classList.remove(\"show\");\n      showJson(\"apiBox\", \"Ready.\");\n      lastTwin = null;\n    }\n\n    renderSignals();\n    checkHealth();\n  \u003c/script\u003e\n\u003c/body\u003e\n\u003c/html\u003e";
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