const http = require("http");
const crypto = require("crypto");

const APP_NAME = "SoulFlame Twins";
const MODULE_NAME = "EchoProfile";
const APP_VERSION = "V53_RESTORE_CLASSIC_DRAWER";

const OWNER_EMAIL = process.env.OWNER_EMAIL || "stere0metal360@gmail.com";
const APP_MODE = process.env.APP_MODE || "production";
const DATA_MODE = process.env.DATA_MODE || "supabase";
const ADMIN_PIN = process.env.ECHO_ADMIN_PIN || "ECHO-ADMIN-999";
const SERVER_STARTED_AT = Date.now();

const INLINE_INDEX_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"\u003e\n  \u003ctitle\u003eAI Twins by SoulFlame\u003c/title\u003e\n  \u003cmeta name=\"description\" content=\"Create your AI Twin by SoulFlame. EchoProfile, Future Twin, Memory, SoulMatch and Full AI Twin unlock.\"\u003e\n  \u003cmeta name=\"theme-color\" content=\"#050611\"\u003e\n\n  \u003cstyle\u003e\n    :root {\n      --bg0:#050611;\n      --bg1:#080b1f;\n      --bg2:#111a46;\n      --panel:rgba(255,255,255,.065);\n      --panel2:rgba(255,255,255,.045);\n      --panel3:rgba(0,0,0,.30);\n      --line:rgba(255,255,255,.13);\n      --text:#f8f7ff;\n      --soft:#b9c3e8;\n      --muted:#7f8ab4;\n      --cyan:#00eaff;\n      --violet:#7c3cff;\n      --pink:#ff4ff3;\n      --gold:#ffd166;\n      --green:#23e6a8;\n      --red:#ff4d6d;\n      --shadow:0 28px 90px rgba(0,0,0,.42);\n      --radius:28px;\n      --headerH:68px;\n    }\n\n    * {\n      box-sizing: border-box;\n    }\n\n    html {\n      min-height: 100%;\n      background: var(--bg0);\n      scroll-behavior: smooth;\n    }\n\n    body {\n      margin: 0;\n      min-height: 100vh;\n      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif;\n      color: var(--text);\n      background:\n        radial-gradient(circle at 18% 8%, rgba(124,60,255,.28), transparent 34rem),\n        radial-gradient(circle at 80% 10%, rgba(0,234,255,.16), transparent 32rem),\n        radial-gradient(circle at 48% 92%, rgba(255,79,243,.10), transparent 34rem),\n        linear-gradient(135deg, var(--bg0), var(--bg1) 46%, var(--bg2));\n      -webkit-font-smoothing: antialiased;\n      overflow-x: hidden;\n    }\n\n    button,\n    input,\n    textarea,\n    select {\n      font: inherit;\n    }\n\n    a {\n      color: inherit;\n    }\n\n    .screen {\n      min-height: 100dvh;\n      display: flex;\n      flex-direction: column;\n      padding: 14px;\n    }\n\n    .topbar {\n      height: var(--headerH);\n      display: grid;\n      grid-template-columns: auto 1fr auto;\n      align-items: center;\n      gap: 12px;\n      border: 1px solid var(--line);\n      background: rgba(5,6,17,.78);\n      backdrop-filter: blur(18px);\n      border-radius: 24px;\n      padding: 10px 12px;\n      box-shadow: 0 16px 50px rgba(0,0,0,.24);\n      position: sticky;\n      top: 10px;\n      z-index: 30;\n    }\n\n    .brand {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      min-width: 0;\n    }\n\n    .logo {\n      width: 42px;\n      height: 42px;\n      border-radius: 16px;\n      background:\n        radial-gradient(circle at 30% 22%, #fff, transparent 15%),\n        linear-gradient(135deg, var(--cyan), var(--violet), var(--pink));\n      box-shadow:\n        0 0 28px rgba(0,234,255,.25),\n        0 0 44px rgba(124,60,255,.28);\n      flex: 0 0 auto;\n    }\n\n    .brandText {\n      display: grid;\n      line-height: 1.02;\n    }\n\n    .brandText strong {\n      font-weight: 950;\n      letter-spacing: -.5px;\n      white-space: nowrap;\n    }\n\n    .brandText span {\n      color: var(--muted);\n      font-size: 12px;\n      font-weight: 800;\n    }\n\n    .centerTitle {\n      text-align: center;\n      font-weight: 950;\n      letter-spacing: -.8px;\n      font-size: clamp(18px, 2.2vw, 28px);\n      background: linear-gradient(90deg, var(--cyan), #8bb7ff, var(--violet), var(--pink));\n      -webkit-background-clip: text;\n      background-clip: text;\n      color: transparent;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n\n    .topActions {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n    }\n\n    .pill,\n    .iconBtn,\n    .btn {\n      border: 1px solid rgba(255,255,255,.13);\n      color: var(--text);\n      background: rgba(255,255,255,.07);\n      border-radius: 999px;\n      cursor: pointer;\n      font-weight: 900;\n      text-decoration: none;\n      transition: transform .18s ease, background .18s ease, border-color .18s ease;\n    }\n\n    .pill {\n      padding: 10px 12px;\n      font-size: 13px;\n    }\n\n    .iconBtn {\n      width: 44px;\n      height: 44px;\n      display: inline-grid;\n      place-items: center;\n      font-size: 20px;\n    }\n\n    .pill:hover,\n    .iconBtn:hover,\n    .btn:hover {\n      transform: translateY(-1px);\n      background: rgba(255,255,255,.105);\n      border-color: rgba(0,234,255,.28);\n    }\n\n    .burger {\n      display: none;\n    }\n\n    .heroGrid {\n      flex: 1;\n      display: grid;\n      grid-template-columns: minmax(0, 1fr) minmax(360px, 1fr);\n      gap: 14px;\n      padding-top: 14px;\n      min-height: 0;\n    }\n\n    .chatPanel,\n    .optionsPanel {\n      min-height: 0;\n      border: 1px solid var(--line);\n      background:\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.08), transparent 32%),\n        linear-gradient(180deg, rgba(255,255,255,.082), rgba(255,255,255,.045));\n      border-radius: var(--radius);\n      box-shadow: var(--shadow);\n      overflow: hidden;\n      position: relative;\n    }\n\n    .chatPanel {\n      display: grid;\n      grid-template-rows: auto 1fr auto;\n      height: calc(100dvh - var(--headerH) - 42px);\n    }\n\n    .panelHead {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 12px;\n      padding: 16px 18px;\n      border-bottom: 1px solid rgba(255,255,255,.10);\n      background: rgba(0,0,0,.16);\n    }\n\n    .panelHeadTitle {\n      display: grid;\n      gap: 3px;\n    }\n\n    .panelHeadTitle strong {\n      font-size: 17px;\n      letter-spacing: -.4px;\n    }\n\n    .panelHeadTitle span {\n      color: var(--muted);\n      font-size: 12px;\n      font-weight: 800;\n    }\n\n    .statusDot {\n      display: inline-flex;\n      align-items: center;\n      gap: 8px;\n      color: #bfffe9;\n      font-size: 12px;\n      font-weight: 950;\n      border: 1px solid rgba(35,230,168,.22);\n      background: rgba(35,230,168,.07);\n      padding: 8px 10px;\n      border-radius: 999px;\n      white-space: nowrap;\n    }\n\n    .statusDot::before {\n      content: \"\";\n      width: 8px;\n      height: 8px;\n      border-radius: 50%;\n      background: var(--green);\n      box-shadow: 0 0 14px var(--green);\n    }\n\n    .messages {\n      overflow-y: auto;\n      padding: 18px;\n      display: flex;\n      flex-direction: column;\n      gap: 14px;\n      scrollbar-width: thin;\n      scrollbar-color: rgba(255,255,255,.20) transparent;\n    }\n\n    .message {\n      width: min(82%, 760px);\n      padding: 14px 15px;\n      border: 1px solid rgba(255,255,255,.12);\n      border-radius: 22px;\n      line-height: 1.55;\n      color: var(--soft);\n      white-space: pre-wrap;\n      animation: msgIn .22s ease both;\n    }\n\n    @keyframes msgIn {\n      from { opacity: 0; transform: translateY(6px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n\n    .message.bot {\n      align-self: flex-start;\n      background: rgba(255,255,255,.065);\n      border-top-left-radius: 8px;\n    }\n\n    .message.user {\n      align-self: flex-end;\n      background: linear-gradient(135deg, rgba(124,60,255,.34), rgba(0,234,255,.12));\n      border-color: rgba(0,234,255,.22);\n      border-top-right-radius: 8px;\n      color: #eef5ff;\n    }\n\n    .quickActions {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 8px;\n      margin-top: 10px;\n    }\n\n    .quickActions button {\n      border: 1px solid rgba(255,255,255,.13);\n      background: rgba(255,255,255,.08);\n      color: var(--text);\n      border-radius: 999px;\n      padding: 9px 11px;\n      cursor: pointer;\n      font-size: 13px;\n      font-weight: 900;\n    }\n\n    .composerWrap {\n      padding: 14px;\n      border-top: 1px solid rgba(255,255,255,.10);\n      background: rgba(0,0,0,.18);\n    }\n\n    .composer {\n      display: grid;\n      grid-template-columns: 1fr auto;\n      gap: 10px;\n      align-items: end;\n      border: 1px solid rgba(255,255,255,.13);\n      background: rgba(0,0,0,.26);\n      border-radius: 24px;\n      padding: 10px;\n    }\n\n    .composer textarea {\n      width: 100%;\n      min-height: 44px;\n      max-height: 120px;\n      resize: none;\n      border: 0;\n      outline: 0;\n      background: transparent;\n      color: var(--text);\n      padding: 11px 12px;\n      line-height: 1.35;\n    }\n\n    .sendBtn {\n      width: 46px;\n      height: 46px;\n      border: 0;\n      border-radius: 16px;\n      background: linear-gradient(135deg, var(--violet), #3f8dff);\n      color: white;\n      cursor: pointer;\n      font-size: 20px;\n      font-weight: 950;\n      box-shadow: 0 12px 30px rgba(124,60,255,.24);\n    }\n\n    .optionsPanel {\n      height: calc(100dvh - var(--headerH) - 42px);\n      display: grid;\n      grid-template-rows: auto 1fr;\n    }\n\n    .optionsBody {\n      overflow-y: auto;\n      padding: 18px;\n      display: grid;\n      gap: 14px;\n      align-content: start;\n    }\n\n    .bigLogoBlock {\n      min-height: 130px;\n      display: grid;\n      place-items: center;\n      text-align: center;\n      border: 1px solid rgba(255,255,255,.13);\n      background:\n        radial-gradient(circle at 50% 10%, rgba(255,255,255,.10), transparent 22%),\n        linear-gradient(135deg, rgba(0,234,255,.10), rgba(124,60,255,.16), rgba(255,79,243,.10));\n      border-radius: 24px;\n      padding: 18px;\n    }\n\n    .bigLogoBlock h1 {\n      margin: 0;\n      font-size: clamp(28px, 4vw, 54px);\n      letter-spacing: -2px;\n      line-height: .92;\n      background: linear-gradient(90deg, var(--cyan), #8bb7ff, var(--violet), var(--pink));\n      -webkit-background-clip: text;\n      background-clip: text;\n      color: transparent;\n    }\n\n    .bigLogoBlock p {\n      margin: 10px 0 0;\n      color: var(--soft);\n      line-height: 1.45;\n    }\n\n    .optionGrid {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 12px;\n    }\n\n    .optionCard {\n      min-height: 112px;\n      border: 1px solid rgba(255,255,255,.13);\n      background: rgba(255,255,255,.052);\n      border-radius: 22px;\n      padding: 15px;\n      cursor: pointer;\n      transition: transform .18s ease, background .18s ease, border-color .18s ease;\n    }\n\n    .optionCard:hover {\n      transform: translateY(-2px);\n      background: rgba(255,255,255,.085);\n      border-color: rgba(0,234,255,.25);\n    }\n\n    .optionCard b {\n      display: block;\n      margin-bottom: 7px;\n      font-size: 16px;\n    }\n\n    .optionCard span {\n      color: var(--soft);\n      font-size: 13px;\n      line-height: 1.42;\n      display: block;\n    }\n\n    .formCard {\n      border: 1px solid rgba(255,255,255,.13);\n      background: rgba(0,0,0,.18);\n      border-radius: 24px;\n      padding: 16px;\n    }\n\n    .formCard h2 {\n      margin: 0 0 10px;\n      letter-spacing: -.8px;\n      font-size: 24px;\n    }\n\n    .formGrid {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 10px;\n    }\n\n    .field {\n      display: grid;\n      gap: 6px;\n    }\n\n    .field.full {\n      grid-column: 1 / -1;\n    }\n\n    label {\n      color: var(--muted);\n      font-size: 12px;\n      font-weight: 900;\n      text-transform: uppercase;\n      letter-spacing: .5px;\n    }\n\n    input,\n    select {\n      width: 100%;\n      border: 1px solid rgba(255,255,255,.13);\n      background: rgba(0,0,0,.25);\n      color: var(--text);\n      border-radius: 16px;\n      padding: 13px 14px;\n      outline: 0;\n    }\n\n    input:focus,\n    select:focus {\n      border-color: rgba(0,234,255,.42);\n      box-shadow: 0 0 0 4px rgba(0,234,255,.08);\n    }\n\n    .signalGrid {\n      display: grid;\n      grid-template-columns: repeat(4, 1fr);\n      gap: 8px;\n      margin-top: 10px;\n    }\n\n    .signal {\n      border: 1px solid rgba(255,255,255,.13);\n      background: rgba(255,255,255,.055);\n      color: var(--text);\n      border-radius: 16px;\n      padding: 10px 9px;\n      cursor: pointer;\n      font-size: 13px;\n      font-weight: 900;\n      text-align: center;\n      user-select: none;\n    }\n\n    .signal.active {\n      background: linear-gradient(135deg, rgba(124,60,255,.8), rgba(0,234,255,.42));\n      border-color: rgba(0,234,255,.35);\n    }\n\n    .actions {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 10px;\n      margin-top: 12px;\n    }\n\n    .btn {\n      padding: 13px 14px;\n      border-radius: 18px;\n      text-align: center;\n    }\n\n    .btn.primary {\n      border: 0;\n      background: linear-gradient(135deg, var(--violet), #3f8dff);\n      box-shadow: 0 14px 36px rgba(124,60,255,.22);\n    }\n\n    .btn.gold {\n      border: 0;\n      background: linear-gradient(135deg, #ffb703, #ff4ff3);\n      box-shadow: 0 14px 36px rgba(255,79,243,.18);\n    }\n\n    .btn.green {\n      border: 0;\n      background: linear-gradient(135deg, #23e6a8, #00eaff);\n      color: #071017;\n    }\n\n    .unlockGrid {\n      display: grid;\n      grid-template-columns: 1fr auto;\n      gap: 10px;\n      margin-top: 10px;\n    }\n\n    .paymentNote {\n      border: 1px solid rgba(255,209,102,.32);\n      background: rgba(255,209,102,.08);\n      color: #ffe7a8;\n      border-radius: 18px;\n      padding: 13px;\n      line-height: 1.5;\n      font-size: 13px;\n      margin-top: 12px;\n    }\n\n    .paymentNote code {\n      color: #fff4cb;\n      background: rgba(0,0,0,.25);\n      padding: 2px 6px;\n      border-radius: 8px;\n    }\n\n    .drawerOverlay {\n      display: none;\n      position: fixed;\n      inset: 0;\n      background: rgba(0,0,0,.55);\n      z-index: 80;\n    }\n\n    .drawer {\n      position: fixed;\n      top: 0;\n      right: 0;\n      width: min(420px, 92vw);\n      height: 100dvh;\n      background:\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.12), transparent 30%),\n        linear-gradient(180deg, rgba(12,15,38,.98), rgba(5,6,17,.98));\n      border-left: 1px solid rgba(255,255,255,.14);\n      z-index: 90;\n      transform: translateX(105%);\n      transition: transform .22s ease;\n      display: grid;\n      grid-template-rows: auto 1fr;\n      box-shadow: -20px 0 80px rgba(0,0,0,.45);\n    }\n\n    .drawer.open {\n      transform: translateX(0);\n    }\n\n    .drawerOverlay.open {\n      display: block;\n    }\n\n    .drawerHead {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 16px;\n      border-bottom: 1px solid rgba(255,255,255,.12);\n    }\n\n    .drawerBody {\n      overflow-y: auto;\n      padding: 16px;\n    }\n\n    .below {\n      width: min(1180px, calc(100% - 28px));\n      margin: 0 auto;\n      padding: 42px 0 80px;\n      display: grid;\n      gap: 18px;\n    }\n\n    .sectionCard {\n      border: 1px solid var(--line);\n      background:\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.06), transparent 30%),\n        rgba(255,255,255,.045);\n      border-radius: 28px;\n      padding: clamp(22px, 4vw, 36px);\n      box-shadow: 0 20px 70px rgba(0,0,0,.24);\n    }\n\n    .sectionCard h2 {\n      margin: 0 0 12px;\n      font-size: clamp(28px, 5vw, 54px);\n      line-height: .95;\n      letter-spacing: -2px;\n    }\n\n    .sectionCard p {\n      color: var(--soft);\n      line-height: 1.65;\n      font-size: 16px;\n    }\n\n    .three {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 14px;\n    }\n\n    .mini {\n      border: 1px solid rgba(255,255,255,.13);\n      background: rgba(0,0,0,.16);\n      border-radius: 22px;\n      padding: 18px;\n    }\n\n    .mini b {\n      display: block;\n      margin-bottom: 8px;\n    }\n\n    .mini span {\n      color: var(--soft);\n      line-height: 1.5;\n      font-size: 14px;\n    }\n\n    .apiBox {\n      margin-top: 12px;\n      white-space: pre-wrap;\n      max-height: 260px;\n      overflow: auto;\n      border: 1px solid rgba(255,255,255,.12);\n      background: rgba(0,0,0,.28);\n      border-radius: 18px;\n      padding: 14px;\n      color: #dbe4ff;\n      font-family: Consolas, ui-monospace, monospace;\n      font-size: 12px;\n    }\n\n    @media (max-width: 980px) {\n      :root {\n        --headerH:64px;\n      }\n\n      html {\n        scroll-behavior: auto;\n      }\n\n      .screen {\n        min-height: 100dvh;\n        padding: 10px;\n      }\n\n      .topbar {\n        top: 8px;\n        border-radius: 20px;\n        grid-template-columns: auto 1fr auto;\n      }\n\n      .brandText span {\n        display: none;\n      }\n\n      .centerTitle {\n        font-size: 18px;\n      }\n\n      .topActions .pill {\n        display: none;\n      }\n\n      .burger {\n        display: inline-grid;\n      }\n\n      .heroGrid {\n        display: block;\n        padding-top: 10px;\n      }\n\n      .chatPanel {\n        height: calc(100dvh - var(--headerH) - 30px);\n        border-radius: 24px;\n      }\n\n      .optionsPanel {\n        display: none;\n      }\n\n      .message {\n        width: min(92%, 760px);\n        font-size: 15px;\n      }\n\n      .panelHead {\n        padding: 13px 14px;\n      }\n\n      .statusDot {\n        display: none;\n      }\n\n      .messages {\n        padding: 14px;\n      }\n\n      .composerWrap {\n        padding: 10px;\n      }\n\n      .composer {\n        border-radius: 22px;\n      }\n\n      .composer textarea {\n        font-size: 16px;\n      }\n\n      .formGrid,\n      .actions,\n      .unlockGrid,\n      .three {\n        grid-template-columns: 1fr;\n      }\n\n      .signalGrid {\n        grid-template-columns: 1fr 1fr;\n      }\n\n      .below {\n        width: calc(100% - 20px);\n        padding-top: 30px;\n      }\n\n      .sectionCard {\n        border-radius: 24px;\n      }\n    }\n\n    @media (max-width: 520px) {\n      .brandText strong {\n        max-width: 92px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      .centerTitle {\n        font-size: 16px;\n      }\n\n      .logo {\n        width: 38px;\n        height: 38px;\n        border-radius: 14px;\n      }\n\n      .bigLogoBlock h1 {\n        font-size: 34px;\n      }\n\n      .optionGrid {\n        grid-template-columns: 1fr;\n      }\n    }\n      /* V53_RESTORE_CLASSIC_DRAWER_CSS */\n    .drawerBodyHost {\n      display: grid;\n      gap: 14px;\n      min-height: 100%;\n    }\n\n    .drawerBodyHost \u003e .optionsBody {\n      overflow: visible;\n      padding: 0;\n      display: grid;\n      gap: 14px;\n      align-content: start;\n    }\n\n    .drawerBodyHost .bigLogoBlock {\n      min-height: 120px;\n    }\n\n    .drawerBodyHost .optionGrid {\n      grid-template-columns: 1fr 1fr;\n    }\n\n    .drawerBodyHost .formCard {\n      box-shadow: none;\n    }\n\n    .drawerBodyHost .apiBox {\n      max-height: 220px;\n    }\n\n    @media (max-width: 980px) {\n      .drawer {\n        width: min(560px, 94vw);\n      }\n\n      .drawerBody {\n        padding: 16px;\n      }\n\n      .drawerBodyHost .optionGrid {\n        grid-template-columns: 1fr 1fr;\n      }\n\n      .drawerBodyHost .formGrid,\n      .drawerBodyHost .actions,\n      .drawerBodyHost .unlockGrid {\n        grid-template-columns: 1fr;\n      }\n\n      .drawerBodyHost .signalGrid {\n        grid-template-columns: 1fr 1fr;\n      }\n    }\n\n    @media (max-width: 520px) {\n      .drawer {\n        width: 94vw;\n      }\n\n      .drawerBody {\n        padding: 12px;\n      }\n\n      .drawerBodyHost .optionGrid {\n        grid-template-columns: 1fr;\n      }\n\n      .drawerBodyHost .bigLogoBlock h1 {\n        font-size: 32px;\n      }\n    }\r\n  \u003c/style\u003e\n\u003c/head\u003e\n\n\u003cbody\u003e\n  \u003cdiv class=\"screen\"\u003e\n    \u003cheader class=\"topbar\"\u003e\n      \u003cdiv class=\"brand\"\u003e\n        \u003cdiv class=\"logo\"\u003e\u003c/div\u003e\n        \u003cdiv class=\"brandText\"\u003e\n          \u003cstrong\u003eSoulFlame\u003c/strong\u003e\n          \u003cspan\u003eAI Twin OS\u003c/span\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"centerTitle\"\u003eAI Twins by SoulFlame\u003c/div\u003e\n\n      \u003cdiv class=\"topActions\"\u003e\n        \u003ca class=\"pill\" href=\"#how\"\u003eHow it works\u003c/a\u003e\n        \u003ca class=\"pill\" href=\"/landing\"\u003eLanding\u003c/a\u003e\n        \u003ca class=\"pill\" href=\"/admin\" target=\"_blank\"\u003eAdmin\u003c/a\u003e\n        \u003cbutton class=\"iconBtn burger\" onclick=\"openDrawer()\" aria-label=\"Open menu\"\u003e☰\u003c/button\u003e\n      \u003c/div\u003e\n    \u003c/header\u003e\n\n    \u003cmain class=\"heroGrid\"\u003e\n      \u003csection class=\"chatPanel\" id=\"chat\"\u003e\n        \u003cdiv class=\"panelHead\"\u003e\n          \u003cdiv class=\"panelHeadTitle\"\u003e\n            \u003cstrong\u003eEcho Chat\u003c/strong\u003e\n            \u003cspan\u003eGPT-like AI Twin interface · classic drawer restored\u003c/span\u003e\n          \u003c/div\u003e\n          \u003cdiv class=\"statusDot\"\u003eLive MVP\u003c/div\u003e\n        \u003c/div\u003e\n\n        \u003cdiv class=\"messages\" id=\"messages\"\u003e\u003c/div\u003e\n\n        \u003cdiv class=\"composerWrap\"\u003e\n          \u003cdiv class=\"composer\"\u003e\n            \u003ctextarea id=\"prompt\" placeholder=\"Ask your AI Twin... Напиши какво искаш да разбереш за себе си\"\u003e\u003c/textarea\u003e\n            \u003cbutton class=\"sendBtn\" onclick=\"sendPrompt()\"\u003e➜\u003c/button\u003e\n          \u003c/div\u003e\n        \u003c/div\u003e\n      \u003c/section\u003e\n\n      \u003caside class=\"optionsPanel\" id=\"desktopOptions\"\u003e\n        \u003cdiv class=\"panelHead\"\u003e\n          \u003cdiv class=\"panelHeadTitle\"\u003e\n            \u003cstrong\u003eSF Options\u003c/strong\u003e\n            \u003cspan\u003e50/50 presentation mode\u003c/span\u003e\n          \u003c/div\u003e\n          \u003cdiv class=\"statusDot\"\u003eReady\u003c/div\u003e\n        \u003c/div\u003e\n\n        \u003cdiv class=\"optionsBody\"\u003e\n          \u003cdiv class=\"bigLogoBlock\"\u003e\n            \u003cdiv\u003e\n              \u003ch1\u003eAI Twins\u003cbr\u003eby SoulFlame\u003c/h1\u003e\n              \u003cp\u003eChat-first interface. EchoProfile. Future Twin. Full AI Twin unlock.\u003c/p\u003e\n            \u003c/div\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"optionGrid\" id=\"optionGridDesktop\"\u003e\u003c/div\u003e\n\n          \u003cdiv class=\"formCard\" id=\"create\"\u003e\n            \u003ch2\u003eCreate Mini Twin\u003c/h2\u003e\n\n            \u003cdiv class=\"formGrid\"\u003e\n              \u003cdiv class=\"field\"\u003e\n                \u003clabel\u003eName\u003c/label\u003e\n                \u003cinput id=\"name\" placeholder=\"Dimitar / Client\"\u003e\n              \u003c/div\u003e\n\n              \u003cdiv class=\"field\"\u003e\n                \u003clabel\u003eContact\u003c/label\u003e\n                \u003cinput id=\"contact\" placeholder=\"email / Instagram / phone\"\u003e\n              \u003c/div\u003e\n\n              \u003cdiv class=\"field\"\u003e\n                \u003clabel\u003eAge\u003c/label\u003e\n                \u003cselect id=\"age\"\u003e\n                  \u003coption value=\"18-24\"\u003e18-24\u003c/option\u003e\n                  \u003coption value=\"25-34\" selected\u003e25-34\u003c/option\u003e\n                  \u003coption value=\"35-44\"\u003e35-44\u003c/option\u003e\n                  \u003coption value=\"45+\"\u003e45+\u003c/option\u003e\n                \u003c/select\u003e\n              \u003c/div\u003e\n\n              \u003cdiv class=\"field\"\u003e\n                \u003clabel\u003eMode\u003c/label\u003e\n                \u003cselect id=\"mode\"\u003e\n                  \u003coption value=\"personal\"\u003ePersonal Twin\u003c/option\u003e\n                  \u003coption value=\"work\"\u003eWork Twin\u003c/option\u003e\n                  \u003coption value=\"future\"\u003eFuture Twin\u003c/option\u003e\n                  \u003coption value=\"creator\"\u003eCreator Twin\u003c/option\u003e\n                \u003c/select\u003e\n              \u003c/div\u003e\n\n              \u003cdiv class=\"field full\"\u003e\n                \u003clabel\u003eGoal\u003c/label\u003e\n                \u003cinput id=\"goal\" placeholder=\"What do you want your AI Twin to help you with?\"\u003e\n              \u003c/div\u003e\n            \u003c/div\u003e\n\n            \u003cdiv class=\"signalGrid\" id=\"signals\"\u003e\u003c/div\u003e\n\n            \u003cdiv class=\"actions\"\u003e\n              \u003cbutton class=\"btn primary\" onclick=\"createMiniTwin()\"\u003eCreate Mini Twin\u003c/button\u003e\n              \u003cbutton class=\"btn gold\" onclick=\"checkoutFullTwin()\"\u003eCheckout Full Twin\u003c/button\u003e\n            \u003c/div\u003e\n\n            \u003cdiv class=\"paymentNote\"\u003e\n              Full AI Twin: \u003cb\u003e20 EUR\u003c/b\u003e through Revolut.\u003cbr\u003e\n              Note in Revolut: \u003ccode\u003eFull AI Twin + your email\u003c/code\u003e\n            \u003c/div\u003e\n\n            \u003cdiv class=\"apiBox\" id=\"apiBox\"\u003eReady.\u003c/div\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"formCard\" id=\"unlock\"\u003e\n            \u003ch2\u003eUnlock Full Twin\u003c/h2\u003e\n            \u003cp style=\"color:var(--soft);line-height:1.5;margin-top:0\"\u003eEnter the code received after payment.\u003c/p\u003e\n\n            \u003cdiv class=\"unlockGrid\"\u003e\n              \u003cinput id=\"unlockCode\" placeholder=\"ECHO-XXXX-XXXX\"\u003e\n              \u003cbutton class=\"btn green\" onclick=\"unlockFullTwin()\"\u003eUnlock\u003c/button\u003e\n            \u003c/div\u003e\n\n            \u003cdiv class=\"apiBox\" id=\"fullReportBox\"\u003eFull report will appear here.\u003c/div\u003e\n          \u003c/div\u003e\n        \u003c/div\u003e\n      \u003c/aside\u003e\n    \u003c/main\u003e\n  \u003c/div\u003e\n\n  \u003cdiv class=\"drawerOverlay\" id=\"drawerOverlay\" onclick=\"closeDrawer()\"\u003e\u003c/div\u003e\n\n    \u003caside class=\"drawer\" id=\"drawer\"\u003e\n    \u003cdiv class=\"drawerHead\"\u003e\n      \u003cstrong\u003eSF Options\u003c/strong\u003e\n      \u003cbutton class=\"iconBtn\" onclick=\"closeDrawer()\"\u003e×\u003c/button\u003e\n    \u003c/div\u003e\n\n    \u003cdiv class=\"drawerBody\"\u003e\n      \u003cdiv id=\"drawerBodyHost\" class=\"drawerBodyHost\"\u003e\u003c/div\u003e\n    \u003c/div\u003e\n  \u003c/aside\u003e\n\n  \u003csection class=\"below\"\u003e\n    \u003cdiv class=\"sectionCard\" id=\"how\"\u003e\n      \u003ch2\u003ePresentation-ready SoulFlame flow\u003c/h2\u003e\n      \u003cp\u003e\n        Първият екран вече изглежда като GPT-style продукт: chat first, options 50/50 на PC,\n        burger menu на телефон и ясна посока към Mini Twin, Full Twin и unlock.\n      \u003c/p\u003e\n\n      \u003cdiv class=\"three\"\u003e\n        \u003cdiv class=\"mini\"\u003e\n          \u003cb\u003e1. Chat first\u003c/b\u003e\n          \u003cspan\u003eПотребителят вижда разговора веднага, без да се губи в дълга страница.\u003c/span\u003e\n        \u003c/div\u003e\n\n        \u003cdiv class=\"mini\"\u003e\n          \u003cb\u003e2. SF Options\u003c/b\u003e\n          \u003cspan\u003eEchoProfile, AI Twin, Future Twin, Memory, SoulMatch и AR EchoCard са в центъра.\u003c/span\u003e\n        \u003c/div\u003e\n\n        \u003cdiv class=\"mini\"\u003e\n          \u003cb\u003e3. Full Twin\u003c/b\u003e\n          \u003cspan\u003eCheckout 20€ през Revolut, после unlock code и Full AI Twin Report.\u003c/span\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n    \u003c/div\u003e\n\n    \u003cdiv class=\"sectionCard\"\u003e\n      \u003ch2\u003eWhat is AI Twins by SoulFlame?\u003c/h2\u003e\n      \u003cp\u003e\n        AI Twin е дигитален профил, който започва с EchoProfile и постепенно се развива към Future Twin,\n        Memory, SoulMatch и персонален AI асистент. Тази версия е направена за показване пред хора:\n        първо впечатление, ясен flow и директен продукт.\n      \u003c/p\u003e\n    \u003c/div\u003e\n\n    \u003cdiv class=\"sectionCard\"\u003e\n      \u003ch2\u003eTrust\u003c/h2\u003e\n      \u003cp\u003e\n        SoulFlame AI Twin е продукт за самоанализ и креативна рефлексия. Не е медицинска, психологическа,\n        финансова или юридическа диагноза.\n      \u003c/p\u003e\n      \u003cdiv class=\"actions\" style=\"max-width:520px\"\u003e\n        \u003ca class=\"btn\" href=\"/privacy\"\u003ePrivacy\u003c/a\u003e\n        \u003ca class=\"btn\" href=\"/terms\"\u003eTerms\u003c/a\u003e\n      \u003c/div\u003e\n    \u003c/div\u003e\n  \u003c/section\u003e\n\n  \u003cscript\u003e\n    const version = \"V53_RESTORE_CLASSIC_DRAWER\";\n    const byId = id =\u003e document.getElementById(id);\n\n    let selectedSignals = [\"vision\", \"logic\", \"future\"];\n    let lastTwin = null;\n    let lastCheckout = null;\n\n    const optionItems = [\n      [\"EchoProfile\", \"личностни и работни сигнали\"],\n      [\"AI Twin\", \"Personal, Work, Future, Voice, Avatar\"],\n      [\"Future Twin\", \"ти след 1 година / 5 години\"],\n      [\"Memory\", \"лична памет и развитие\"],\n      [\"SoulMatch\", \"съвместимост и връзки\"],\n      [\"AR EchoCard\", \"визитка с AI присъствие\"],\n      [\"Settings\", \"privacy, unlock, profile\"],\n      [\"Full Twin\", \"20€ unlock report\"]\n    ];\n\n    const signalItems = [\n      [\"vision\", \"Vision\"],\n      [\"logic\", \"Logic\"],\n      [\"emotion\", \"Emotion\"],\n      [\"action\", \"Action\"],\n      [\"social\", \"Social\"],\n      [\"future\", \"Future\"],\n      [\"deep\", \"Deep\"],\n      [\"creator\", \"Creator\"]\n    ];\n\n    function showJson(id, data) {\n      const el = byId(id);\n      if (!el) return;\n      el.textContent = typeof data === \"string\" ? data : JSON.stringify(data, null, 2);\n    }\n\n    function addMessage(role, text, actions = []) {\n      const box = byId(\"messages\");\n      const msg = document.createElement(\"div\");\n      msg.className = \"message \" + role;\n      msg.textContent = text;\n\n      if (actions.length) {\n        const actionBox = document.createElement(\"div\");\n        actionBox.className = \"quickActions\";\n\n        actions.forEach(action =\u003e {\n          const btn = document.createElement(\"button\");\n          btn.textContent = action.label;\n          btn.onclick = action.onClick;\n          actionBox.appendChild(btn);\n        });\n\n        msg.appendChild(actionBox);\n      }\n\n      box.appendChild(msg);\n      box.scrollTop = box.scrollHeight;\n    }\n\n    function initOptions() {\n      const html = optionItems.map(item =\u003e {\n        return \"\u003cdiv class=\u0027optionCard\u0027 onclick=\u0027optionClick(\\\"\" + item[0] + \"\\\")\u0027\u003e\u003cb\u003e\" + item[0] + \"\u003c/b\u003e\u003cspan\u003e\" + item[1] + \"\u003c/span\u003e\u003c/div\u003e\";\n      }).join(\"\");\n\n      byId(\"optionGridDesktop\").innerHTML = html;\n      byId(\"optionGridMobile\").innerHTML = html;\n    }\n\n    function initSignals() {\n      byId(\"signals\").innerHTML = signalItems.map(item =\u003e {\n        const active = selectedSignals.includes(item[0]) ? \" active\" : \"\";\n        return \"\u003cdiv class=\u0027signal\" + active + \"\u0027 data-signal=\u0027\" + item[0] + \"\u0027 onclick=\u0027toggleSignal(\\\"\" + item[0] + \"\\\")\u0027\u003e\" + item[1] + \"\u003c/div\u003e\";\n      }).join(\"\");\n    }\n\n    function toggleSignal(key) {\n      if (selectedSignals.includes(key)) {\n        selectedSignals = selectedSignals.filter(x =\u003e x !== key);\n      } else {\n        selectedSignals.push(key);\n      }\n\n      if (selectedSignals.length === 0) selectedSignals = [\"vision\"];\n      initSignals();\n    }\n\n    function optionClick(name) {\n      closeDrawer();\n\n      const map = {\n        \"EchoProfile\": \"EchoProfile е стартът: въпроси, сигнали и scoring за Mini Twin.\",\n        \"AI Twin\": \"AI Twin има Personal, Work, Future, Voice и Avatar посоки.\",\n        \"Future Twin\": \"Future Twin показва каква версия можеш да станеш след време.\",\n        \"Memory\": \"Memory ще пази важните избори, цели и модели на човека.\",\n        \"SoulMatch\": \"SoulMatch ще използва EchoProfile за съвместимост.\",\n        \"AR EchoCard\": \"AR EchoCard е визитка/профил с AI присъствие.\",\n        \"Settings\": \"Settings пази privacy, unlock и профилните настройки.\",\n        \"Full Twin\": \"Full Twin се отключва с код след 20€ Revolut checkout.\"\n      };\n\n      addMessage(\"bot\", map[name] || name);\n    }\n\n    function sendPrompt() {\n      const input = byId(\"prompt\");\n      const text = input.value.trim();\n      if (!text) return;\n\n      addMessage(\"user\", text);\n      input.value = \"\";\n\n      const lower = text.toLowerCase();\n\n      if (lower.includes(\"price\") || lower.includes(\"cena\") || lower.includes(\"цена\") || lower.includes(\"20\")) {\n        addMessage(\"bot\", \"Full AI Twin струва 20 EUR. Плащането е през Revolut. В бележката се пише: Full AI Twin + your email.\", [\n          { label: \"Checkout Full Twin\", onClick: checkoutFullTwin }\n        ]);\n        return;\n      }\n\n      if (lower.includes(\"code\") || lower.includes(\"unlock\") || lower.includes(\"код\")) {\n        addMessage(\"bot\", \"Въведи unlock code в секцията Unlock Full Twin. Кодът изглежда така: ECHO-XXXX-XXXX.\", [\n          { label: \"Go to unlock\", onClick: () =\u003e location.hash = \"#unlock\" }\n        ]);\n        return;\n      }\n\n      if (lower.includes(\"create\") || lower.includes(\"twin\") || lower.includes(\"създай\")) {\n        addMessage(\"bot\", \"Попълни полетата вдясно и натисни Create Mini Twin. На телефон отвори burger менюто ☰.\", [\n          { label: \"Create Mini Twin\", onClick: createMiniTwin }\n        ]);\n        return;\n      }\n\n      addMessage(\"bot\", \"Разбрах. Аз съм Echo интерфейсът на SoulFlame. Мога да те водя към Mini Twin, Full Twin, Future Twin, Memory и SoulMatch. За демо: натисни Create Mini Twin или Checkout Full Twin.\", [\n        { label: \"Create Mini Twin\", onClick: createMiniTwin },\n        { label: \"Checkout\", onClick: checkoutFullTwin }\n      ]);\n    }\n\n    function dominantTraits() {\n      const scores = {};\n      signalItems.forEach(item =\u003e scores[item[0]] = selectedSignals.includes(item[0]) ? 8 : 3);\n\n      selectedSignals.forEach((key, index) =\u003e {\n        scores[key] = 10 - Math.min(index, 4);\n      });\n\n      const sorted = Object.entries(scores).sort((a, b) =\u003e b[1] - a[1]);\n\n      return {\n        scores,\n        mainTrait: sorted[0][0],\n        secondTrait: sorted[1] ? sorted[1][0] : \"logic\"\n      };\n    }\n\n    function profileName(main, second) {\n      const names = {\n        vision: \"Future Architect\",\n        logic: \"Quantum System Builder\",\n        emotion: \"Emotional Mirror\",\n        action: \"Momentum Engine\",\n        social: \"Influence Twin\",\n        future: \"Future Self Twin\",\n        deep: \"Subconscious Explorer\",\n        creator: \"Creator Twin\"\n      };\n\n      return (names[main] || \"Future Architect\") + \" + \" + (names[second] || \"Quantum System Builder\");\n    }\n\n    async function createMiniTwin() {\n      const traits = dominantTraits();\n\n      const user = {\n        name: byId(\"name\").value.trim() || \"SoulFlame User\",\n        contact: byId(\"contact\").value.trim(),\n        age: byId(\"age\").value,\n        goal: byId(\"goal\").value.trim() || \"Build a stronger future version\",\n        mode: byId(\"mode\").value\n      };\n\n      const profile = profileName(traits.mainTrait, traits.secondTrait);\n\n      lastTwin = {\n        id: Date.now(),\n        user,\n        mainTrait: traits.mainTrait,\n        secondTrait: traits.secondTrait,\n        profile,\n        scores: traits.scores,\n        report: \"Mini Twin: \" + profile + \". Your strongest signals are \" + selectedSignals.join(\", \") + \".\",\n        fullReport: \"\",\n        createdAt: new Date().toISOString(),\n        version\n      };\n\n      localStorage.setItem(\"soulflame_last_twin\", JSON.stringify(lastTwin));\n\n      addMessage(\"bot\", \"Mini Twin created:\\n\\n\" + profile + \"\\n\\nGoal: \" + user.goal + \"\\n\\nNow you can checkout Full AI Twin for 20 EUR.\", [\n        { label: \"Checkout Full Twin\", onClick: checkoutFullTwin }\n      ]);\n\n      showJson(\"apiBox\", \"Saving profile...\");\n\n      try {\n        const res = await fetch(\"/api/profile\", {\n          method: \"POST\",\n          headers: { \"Content-Type\": \"application/json\" },\n          body: JSON.stringify(lastTwin)\n        });\n\n        const data = await res.json();\n        showJson(\"apiBox\", data);\n      } catch (error) {\n        showJson(\"apiBox\", error.message);\n      }\n    }\n\n    function loadLastTwin() {\n      if (lastTwin) return;\n\n      try {\n        const saved = localStorage.getItem(\"soulflame_last_twin\");\n        if (saved) lastTwin = JSON.parse(saved);\n      } catch {}\n    }\n\n    async function checkoutFullTwin() {\n      loadLastTwin();\n\n      if (!lastTwin) {\n        addMessage(\"bot\", \"Първо създай Mini Twin. След това checkout-ът ще знае за кой човек е Full Twin.\", [\n          { label: \"Create Mini Twin\", onClick: createMiniTwin }\n        ]);\n        return;\n      }\n\n      showJson(\"apiBox\", \"Creating checkout...\");\n\n      try {\n        const res = await fetch(\"/api/checkout\", {\n          method: \"POST\",\n          headers: { \"Content-Type\": \"application/json\" },\n          body: JSON.stringify({\n            offer: \"Full AI Twin by SoulFlame\",\n            amount: \"20.00 EUR\",\n            provider: \"revolut_manual_checkout\",\n            user: lastTwin.user,\n            profile: lastTwin.profile,\n            scores: lastTwin.scores,\n            rawTwin: lastTwin\n          })\n        });\n\n        const data = await res.json();\n        lastCheckout = data;\n        localStorage.setItem(\"soulflame_last_checkout\", JSON.stringify(data));\n        showJson(\"apiBox\", data);\n\n        if (data.paymentUrl) {\n          addMessage(\"bot\", \"Checkout is ready.\\n\\nPay exactly 20 EUR through Revolut.\\nNote: Full AI Twin + your email\\n\\nAfter payment you will receive unlock code.\", [\n            { label: \"Open Revolut\", onClick: () =\u003e window.open(data.paymentUrl, \"_blank\") },\n            { label: \"Unlock Code\", onClick: () =\u003e location.hash = \"#unlock\" }\n          ]);\n          window.open(data.paymentUrl, \"_blank\");\n        } else {\n          addMessage(\"bot\", \"Checkout created, but payment link is missing. Admin must check PAYMENT_LINK_FULL_TWIN.\");\n        }\n      } catch (error) {\n        showJson(\"apiBox\", error.message);\n        addMessage(\"bot\", \"Checkout error: \" + error.message);\n      }\n    }\n\n    async function unlockFullTwin() {\n      const code = byId(\"unlockCode\").value.trim().toUpperCase();\n\n      if (!code) {\n        addMessage(\"bot\", \"Paste your unlock code first.\");\n        return;\n      }\n\n      showJson(\"fullReportBox\", \"Unlocking...\");\n\n      try {\n        const res = await fetch(\"/api/unlock\", {\n          method: \"POST\",\n          headers: { \"Content-Type\": \"application/json\" },\n          body: JSON.stringify({\n            code,\n            user: byId(\"contact\").value.trim() || null,\n            profileId: lastTwin ? lastTwin.id : null\n          })\n        });\n\n        const data = await res.json();\n\n        if (!data.ok) {\n          showJson(\"fullReportBox\", data);\n          addMessage(\"bot\", data.error || \"Unlock failed.\");\n          return;\n        }\n\n        loadLastTwin();\n\n        const reportRes = await fetch(\"/api/full-report\", {\n          method: \"POST\",\n          headers: { \"Content-Type\": \"application/json\" },\n          body: JSON.stringify({\n            code: data.code,\n            twin: lastTwin,\n            name: lastTwin \u0026\u0026 lastTwin.user ? lastTwin.user.name : \"SoulFlame User\",\n            source: \"v52_unlock\"\n          })\n        });\n\n        const reportData = await reportRes.json();\n\n        showJson(\"fullReportBox\", reportData.report || reportData);\n        addMessage(\"bot\", \"Full AI Twin unlocked.\\n\\nYour report is now visible in the Unlock panel.\");\n      } catch (error) {\n        showJson(\"fullReportBox\", error.message);\n        addMessage(\"bot\", \"Unlock error: \" + error.message);\n      }\n    }\n\n    function mountOptionsForViewport() {\n      const optionsBody = document.querySelector(\".optionsBody\");\n      const drawerHost = byId(\"drawerBodyHost\");\n      const desktopPanel = byId(\"desktopOptions\");\n\n      if (!optionsBody || !drawerHost || !desktopPanel) return;\n\n      if (window.innerWidth \u003c= 980) {\n        if (optionsBody.parentElement !== drawerHost) {\n          drawerHost.appendChild(optionsBody);\n        }\n      } else {\n        if (optionsBody.parentElement !== desktopPanel) {\n          desktopPanel.appendChild(optionsBody);\n        }\n\n        byId(\"drawer\").classList.remove(\"open\");\n        byId(\"drawerOverlay\").classList.remove(\"open\");\n      }\n    }\n\n    function openDrawer() {\n      mountOptionsForViewport();\n      byId(\"drawer\").classList.add(\"open\");\n      byId(\"drawerOverlay\").classList.add(\"open\");\n    }\n\n    function closeDrawer() {\n      byId(\"drawer\").classList.remove(\"open\");\n      byId(\"drawerOverlay\").classList.remove(\"open\");\n    }\n\n    byId(\"prompt\").addEventListener(\"keydown\", event =\u003e {\n      if (event.key === \"Enter\" \u0026\u0026 !event.shiftKey) {\n        event.preventDefault();\n        sendPrompt();\n      }\n    });\n\n    initOptions();\r\n    initSignals();\r\n    mountOptionsForViewport();\r\n    window.addEventListener(\"resize\", mountOptionsForViewport);\n\n    addMessage(\"bot\", \"Welcome to AI Twins by SoulFlame.\\n\\nThis is the GPT-like presentation interface: chat on the screen, SF Options in the center, Mini Twin, Full Twin checkout and unlock flow.\", [\n      { label: \"Create Mini Twin\", onClick: createMiniTwin },\n      { label: \"Checkout Full Twin\", onClick: checkoutFullTwin },\n      { label: \"Open Menu\", onClick: openDrawer }\n    ]);\n\n    try {\n      fetch(\"/api/event\", {\n        method: \"POST\",\n        headers: { \"Content-Type\": \"application/json\" },\n        body: JSON.stringify({\n          type: \"v52_ui_view\",\n          page: \"/\",\n          referrer: document.referrer || \"\",\n          payload: {\n            version,\n            screen: window.innerWidth + \"x\" + window.innerHeight,\n            time: new Date().toISOString()\n          }\n        })\n      });\n    } catch {}\n  \u003c/script\u003e\n\u003c/body\u003e\n\u003c/html\u003e";
const INLINE_ADMIN_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"\u003e\n  \u003ctitle\u003eSoulFlame Admin — Email Delivery\u003c/title\u003e\n  \u003cmeta name=\"theme-color\" content=\"#050611\"\u003e\n\n  \u003cstyle\u003e\n    :root {\n      --bg0:#03040a;\n      --bg1:#080b1f;\n      --bg2:#111a46;\n      --text:#f8f7ff;\n      --soft:#b9c3e8;\n      --muted:#7f8ab4;\n      --line:rgba(255,255,255,.14);\n      --glass:rgba(255,255,255,.078);\n      --glass2:rgba(255,255,255,.045);\n      --cyan:#00eaff;\n      --violet:#7c3cff;\n      --pink:#ff4ff3;\n      --gold:#ffd166;\n      --green:#23e6a8;\n      --red:#ff4d6d;\n      --shadow:0 28px 90px rgba(0,0,0,.42);\n    }\n\n    * { box-sizing: border-box; }\n\n    html { background: var(--bg0); }\n\n    body {\n      margin: 0;\n      min-height: 100vh;\n      font-family: Arial, Helvetica, sans-serif;\n      color: var(--text);\n      background:\n        radial-gradient(circle at 15% 8%, rgba(124,60,255,.28), transparent 32rem),\n        radial-gradient(circle at 86% 12%, rgba(0,234,255,.16), transparent 30rem),\n        linear-gradient(135deg, var(--bg0), var(--bg1) 48%, var(--bg2));\n      -webkit-font-smoothing: antialiased;\n    }\n\n    .wrap {\n      width: min(1320px, 100%);\n      margin: 0 auto;\n      padding: 22px;\n    }\n\n    .nav {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 14px;\n      padding: 14px;\n      border: 1px solid var(--line);\n      background: rgba(6,8,20,.72);\n      border-radius: 24px;\n      box-shadow: 0 16px 45px rgba(0,0,0,.24);\n      margin-bottom: 18px;\n    }\n\n    .brand {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      font-weight: 950;\n      letter-spacing: -.5px;\n    }\n\n    .logo {\n      width: 42px;\n      height: 42px;\n      border-radius: 16px;\n      background:\n        radial-gradient(circle at 30% 22%, #fff, transparent 15%),\n        linear-gradient(135deg, var(--cyan), var(--violet), var(--pink));\n      box-shadow: 0 0 34px rgba(124,60,255,.42);\n    }\n\n    .links {\n      display: flex;\n      gap: 8px;\n      flex-wrap: wrap;\n    }\n\n    a, button {\n      border: 0;\n      cursor: pointer;\n      color: white;\n      text-decoration: none;\n      background: linear-gradient(135deg, var(--violet), #3f8dff);\n      border-radius: 14px;\n      padding: 12px 14px;\n      font-weight: 900;\n      font-size: 14px;\n      transition: transform .18s ease, filter .18s ease;\n    }\n\n    a:hover, button:hover {\n      transform: translateY(-2px);\n      filter: saturate(1.1);\n    }\n\n    button.secondary, a.secondary {\n      background: rgba(255,255,255,.08);\n      border: 1px solid var(--line);\n    }\n\n    button.gold {\n      background: linear-gradient(135deg, #ffb703, #ff4ff3);\n    }\n\n    button.red {\n      background: linear-gradient(135deg, #ff4d6d, #7c3cff);\n    }\n\n    .hero {\n      display: grid;\n      grid-template-columns: 1fr .9fr;\n      gap: 18px;\n      margin-bottom: 18px;\n    }\n\n    .card {\n      border: 1px solid var(--line);\n      background:\n        linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.045)),\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.08), transparent 38%);\n      border-radius: 26px;\n      padding: 22px;\n      box-shadow: var(--shadow);\n      overflow: hidden;\n    }\n\n    h1 {\n      margin: 0 0 12px;\n      font-size: clamp(34px, 5vw, 70px);\n      line-height: .92;\n      letter-spacing: -2.5px;\n    }\n\n    h2 {\n      margin: 0 0 12px;\n      font-size: 26px;\n      letter-spacing: -.8px;\n    }\n\n    h3 {\n      margin: 0 0 8px;\n      font-size: 18px;\n    }\n\n    p {\n      margin: 0 0 12px;\n      color: var(--soft);\n      line-height: 1.55;\n    }\n\n    .grad {\n      background: linear-gradient(90deg, var(--cyan), #5ca8ff, var(--violet), var(--pink));\n      -webkit-background-clip: text;\n      background-clip: text;\n      color: transparent;\n    }\n\n    .badge {\n      display: inline-flex;\n      align-items: center;\n      gap: 9px;\n      border: 1px solid rgba(255,255,255,.14);\n      background: rgba(0,0,0,.20);\n      color: var(--soft);\n      padding: 8px 12px;\n      border-radius: 999px;\n      font-size: 13px;\n      font-weight: 950;\n      margin-bottom: 14px;\n    }\n\n    .dot {\n      width: 9px;\n      height: 9px;\n      border-radius: 99px;\n      background: var(--green);\n      box-shadow: 0 0 16px var(--green);\n    }\n\n    .pinBox {\n      display: grid;\n      grid-template-columns: 1fr auto auto;\n      gap: 10px;\n      align-items: center;\n      margin-top: 14px;\n    }\n\n    input, select, textarea {\n      width: 100%;\n      border: 1px solid var(--line);\n      background: rgba(0,0,0,.28);\n      color: var(--text);\n      border-radius: 14px;\n      padding: 13px 14px;\n      outline: none;\n      font-size: 14px;\n    }\n\n    textarea {\n      min-height: 180px;\n      resize: vertical;\n      line-height: 1.45;\n    }\n\n    input:focus, textarea:focus, select:focus {\n      border-color: rgba(0,234,255,.48);\n      box-shadow: 0 0 0 4px rgba(0,234,255,.07);\n    }\n\n    .metrics {\n      display: grid;\n      grid-template-columns: repeat(5, 1fr);\n      gap: 12px;\n      margin-bottom: 18px;\n    }\n\n    .metric {\n      border: 1px solid var(--line);\n      background: rgba(255,255,255,.045);\n      border-radius: 20px;\n      padding: 16px;\n    }\n\n    .metric b {\n      display: block;\n      font-size: 30px;\n      margin-bottom: 4px;\n    }\n\n    .metric span {\n      color: var(--soft);\n      font-size: 13px;\n      font-weight: 800;\n    }\n\n    .tools {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 14px;\n      margin-bottom: 18px;\n    }\n\n    .emailGrid {\n      display: grid;\n      grid-template-columns: .8fr 1.2fr;\n      gap: 14px;\n      margin-bottom: 18px;\n    }\n\n    .templateGrid {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 8px;\n      margin: 10px 0;\n    }\n\n    .tabs {\n      display: flex;\n      gap: 8px;\n      flex-wrap: wrap;\n      margin-bottom: 14px;\n    }\n\n    .tab {\n      background: rgba(255,255,255,.08);\n      border: 1px solid var(--line);\n    }\n\n    .tab.active {\n      background: linear-gradient(135deg, rgba(124,60,255,.9), rgba(0,234,255,.62));\n      border-color: rgba(0,234,255,.32);\n    }\n\n    .searchLine {\n      display: grid;\n      grid-template-columns: 1fr auto auto;\n      gap: 10px;\n      margin-bottom: 14px;\n    }\n\n    .tableWrap {\n      overflow: auto;\n      border: 1px solid var(--line);\n      border-radius: 20px;\n      background: rgba(0,0,0,.20);\n      max-height: 560px;\n    }\n\n    table {\n      width: 100%;\n      border-collapse: collapse;\n      min-width: 900px;\n    }\n\n    th, td {\n      padding: 12px;\n      border-bottom: 1px solid rgba(255,255,255,.08);\n      text-align: left;\n      vertical-align: top;\n      font-size: 13px;\n    }\n\n    th {\n      position: sticky;\n      top: 0;\n      z-index: 2;\n      background: rgba(10,12,28,.95);\n      color: var(--soft);\n      font-size: 12px;\n      text-transform: uppercase;\n      letter-spacing: .6px;\n    }\n\n    tr:hover td {\n      background: rgba(255,255,255,.035);\n    }\n\n    .tag {\n      display: inline-flex;\n      border: 1px solid rgba(255,255,255,.12);\n      background: rgba(255,255,255,.06);\n      color: var(--soft);\n      border-radius: 999px;\n      padding: 5px 8px;\n      font-size: 12px;\n      font-weight: 800;\n      white-space: nowrap;\n    }\n\n    .tag.green {\n      color: #caffdf;\n      border-color: rgba(35,230,168,.3);\n      background: rgba(35,230,168,.08);\n    }\n\n    .tag.gold {\n      color: #ffe7a8;\n      border-color: rgba(255,209,102,.3);\n      background: rgba(255,209,102,.08);\n    }\n\n    .tag.red {\n      color: #ffc1cc;\n      border-color: rgba(255,77,109,.3);\n      background: rgba(255,77,109,.08);\n    }\n\n    .mono {\n      font-family: Consolas, monospace;\n      color: #dbe4ff;\n    }\n\n    .raw {\n      min-height: 240px;\n      max-height: 520px;\n      overflow: auto;\n      background: rgba(0,0,0,.35);\n      border: 1px solid var(--line);\n      color: #dbe4ff;\n      border-radius: 18px;\n      padding: 16px;\n      white-space: pre-wrap;\n      font-family: Consolas, monospace;\n      font-size: 13px;\n    }\n\n    .small {\n      font-size: 12px;\n      color: var(--muted);\n    }\n\n    .footer {\n      color: var(--muted);\n      text-align: center;\n      font-size: 13px;\n      padding: 24px 0 40px;\n    }\n\n    @media(max-width: 980px) {\n      .hero, .tools, .metrics, .emailGrid {\n        grid-template-columns: 1fr;\n      }\n\n      .pinBox, .searchLine, .templateGrid {\n        grid-template-columns: 1fr;\n      }\n\n      .nav {\n        align-items: flex-start;\n        flex-direction: column;\n      }\n\n      .links {\n        justify-content: flex-start;\n      }\n    }\n  \u003c/style\u003e\n\u003c/head\u003e\n\n\u003cbody\u003e\n  \u003cdiv class=\"wrap\"\u003e\n    \u003cnav class=\"nav\"\u003e\n      \u003cdiv class=\"brand\"\u003e\n        \u003cdiv class=\"logo\"\u003e\u003c/div\u003e\n        \u003cdiv\u003eSoulFlame Admin Pro\u003c/div\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"links\"\u003e\n        \u003ca class=\"secondary\" href=\"/\" target=\"_blank\"\u003eSite\u003c/a\u003e\u003ca class=\"secondary\" href=\"/landing\" target=\"_blank\"\u003eLanding\u003c/a\u003e\u003ca class=\"secondary\" href=\"/payment-success\" target=\"_blank\"\u003eSuccess\u003c/a\u003e\n        \u003ca class=\"secondary\" href=\"/test\" target=\"_blank\"\u003eTest\u003c/a\u003e\n        \u003cbutton class=\"secondary\" onclick=\"loadAll()\"\u003eRefresh\u003c/button\u003e\n        \u003cbutton class=\"secondary\" onclick=\"exportJson()\"\u003eExport JSON\u003c/button\u003e\n      \u003c/div\u003e\n    \u003c/nav\u003e\n\n    \u003csection class=\"hero\"\u003e\n      \u003cdiv class=\"card\"\u003e\n        \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e V48 · Payment Provider Setup\u003c/div\u003e\n        \u003ch1\u003eAI Twin \u003cspan class=\"grad\"\u003eDelivery Room\u003c/span\u003e\u003c/h1\u003e\n        \u003cp\u003e\n          Това е командният център за профили, заявки, плащания, unlock кодове и email/client delivery.\n        \u003c/p\u003e\n\n        \u003cdiv class=\"pinBox\"\u003e\n          \u003cinput id=\"pin\" placeholder=\"ECHO_ADMIN_PIN\"\u003e\n          \u003cbutton onclick=\"savePin()\"\u003eSave PIN\u003c/button\u003e\n          \u003cbutton class=\"gold\" onclick=\"loadAll()\"\u003eLoad Data\u003c/button\u003e\n        \u003c/div\u003e\n\n        \u003cp class=\"small\" style=\"margin-top:10px\"\u003e\n          PIN се пази само локално в браузъра. За реално email изпращане сложи RESEND_API_KEY и EMAIL_FROM във Vercel env.\n        \u003c/p\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eSystem Status\u003c/h2\u003e\n        \u003cp id=\"systemText\"\u003eReady.\u003c/p\u003e\n        \u003cdiv class=\"links\"\u003e\n          \u003cbutton onclick=\"health()\"\u003eHealth\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"metricsOnly()\"\u003eMetrics\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"clearLocal()\"\u003eClear PIN\u003c/button\u003e\n        \u003c/div\u003e\n        \u003cpre class=\"raw\" id=\"statusBox\"\u003eReady.\u003c/pre\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection class=\"metrics\"\u003e\n      \u003cdiv class=\"metric\"\u003e\u003cb id=\"mProfiles\"\u003e0\u003c/b\u003e\u003cspan\u003eProfiles\u003c/span\u003e\u003c/div\u003e\n      \u003cdiv class=\"metric\"\u003e\u003cb id=\"mLeads\"\u003e0\u003c/b\u003e\u003cspan\u003eLeads\u003c/span\u003e\u003c/div\u003e\n      \u003cdiv class=\"metric\"\u003e\u003cb id=\"mPayments\"\u003e0\u003c/b\u003e\u003cspan\u003ePayments\u003c/span\u003e\u003c/div\u003e\n      \u003cdiv class=\"metric\"\u003e\u003cb id=\"mCodes\"\u003e0\u003c/b\u003e\u003cspan\u003eUnlock Codes\u003c/span\u003e\u003c/div\u003e\n      \u003cdiv class=\"metric\"\u003e\u003cb id=\"mEvents\"\u003e0\u003c/b\u003e\u003cspan\u003eEvents\u003c/span\u003e\u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection class=\"emailGrid\"\u003e\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eEmail / Client Message\u003c/h2\u003e\n        \u003cp\u003eИзбери template, попълни контакт и прати или копирай съобщението.\u003c/p\u003e\n\n        \u003clabel\u003eRecipient email/contact\u003c/label\u003e\n        \u003cinput id=\"emailTo\" placeholder=\"client@email.com\"\u003e\n\n        \u003clabel\u003eSubject\u003c/label\u003e\n        \u003cinput id=\"emailSubject\" placeholder=\"SoulFlame AI Twin\"\u003e\n\n        \u003clabel\u003eTemplates\u003c/label\u003e\n        \u003cdiv class=\"templateGrid\"\u003e\n          \u003cbutton class=\"secondary\" onclick=\"templatePaymentInstructions()\"\u003ePayment Instructions\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"templateUnlockCode()\"\u003eUnlock Code\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"templateFullReportReady()\"\u003eFull Report Ready\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"templateFollowUp()\"\u003eFollow-up\u003c/button\u003e\n        \u003c/div\u003e\n\n        \u003clabel\u003eMessage\u003c/label\u003e\n        \u003ctextarea id=\"emailMessage\" placeholder=\"Client message...\"\u003e\u003c/textarea\u003e\n\n        \u003cdiv class=\"links\" style=\"margin-top:12px\"\u003e\n          \u003cbutton class=\"gold\" onclick=\"sendEmail()\"\u003eSend / Prepare Email\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"copyEmailMessage()\"\u003eCopy Message\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"openMailto()\"\u003eOpen Mail App\u003c/button\u003e\n        \u003c/div\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eDelivery Response\u003c/h2\u003e\n        \u003cp\u003e\n          Ако Resend не е настроен, системата ще върне manual_copy mode — пак е полезно, защото дава готов текст.\n        \u003c/p\u003e\n        \u003cpre class=\"raw\" id=\"emailBox\"\u003eReady.\u003c/pre\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection class=\"tools\" id=\"v50AutoUnlockPanel\"\u003e\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eV50 Auto Unlock 20 EUR\u003c/h2\u003e\n        \u003cp\u003eWebhook платено 20 EUR → paid payment → unlock code → email delivery.\u003c/p\u003e\n\n        \u003cdiv class=\"links\" style=\"margin-top:12px\"\u003e\n          \u003cbutton class=\"gold\" onclick=\"loadV50PaymentConfig()\"\u003eCheck V50 Config\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"copyV50WebhookGuide()\"\u003eCopy Webhook Guide\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"testV50GenericWebhook()\"\u003eTest Generic Paid 20 EUR\u003c/button\u003e\n        \u003c/div\u003e\n\n        \u003cpre class=\"raw\" id=\"v50Box\"\u003eReady.\u003c/pre\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eV50 URLs\u003c/h2\u003e\n        \u003cpre class=\"raw\"\u003eGumroad webhook:\nhttps://soulflame-twins.vercel.app/api/webhook/gumroad?secret=YOUR_SECRET\n\nGeneric webhook:\nhttps://soulflame-twins.vercel.app/api/webhook/payment?secret=YOUR_SECRET\n\nStripe webhook:\nhttps://soulflame-twins.vercel.app/api/webhook/stripe\n\nSuccess:\nhttps://soulflame-twins.vercel.app/payment-success\n\nCancel:\nhttps://soulflame-twins.vercel.app/payment-cancel\u003c/pre\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n    \u003csection class=\"tools\" id=\"v48PaymentSetupPanel\"\u003e\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eV48 Payment Provider Setup\u003c/h2\u003e\n        \u003cp\u003eПроверява дали payment links и webhook secrets са настроени във Vercel env.\u003c/p\u003e\n\n        \u003cdiv class=\"links\" style=\"margin-top:12px\"\u003e\n          \u003cbutton class=\"gold\" onclick=\"loadPaymentConfig()\"\u003eCheck Payment Config\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"copyPaymentSetupGuide()\"\u003eCopy Setup Guide\u003c/button\u003e\n          \u003cbutton class=\"secondary\" onclick=\"testCheckout()\"\u003eTest Checkout API\u003c/button\u003e\n        \u003c/div\u003e\n\n        \u003cpre class=\"raw\" id=\"paymentConfigBox\"\u003eReady.\u003c/pre\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eProvider URLs\u003c/h2\u003e\n        \u003cp\u003eСложи тези URL-и в Stripe/Gumroad/Revolut/PayPal настройките.\u003c/p\u003e\n\n        \u003cpre class=\"raw\"\u003eSuccess URL:\nhttps://soulflame-twins.vercel.app/payment-success\n\nCancel URL:\nhttps://soulflame-twins.vercel.app/payment-cancel\n\nGeneric webhook:\nhttps://soulflame-twins.vercel.app/api/webhook/payment\n\nStripe webhook:\nhttps://soulflame-twins.vercel.app/api/webhook/stripe\n\nLanding for ads:\nhttps://soulflame-twins.vercel.app/landing\u003c/pre\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n    \u003csection class=\"tools\" id=\"v45AutoCodePanel\"\u003e\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eV45 Auto-Code Paid Payment\u003c/h2\u003e\n        \u003cp\u003eСимулира реално платено плащане: създава paid payment + unlock code автоматично.\u003c/p\u003e\n\n        \u003cinput id=\"autoName\" placeholder=\"Client name\"\u003e\n        \u003cbr\u003e\u003cbr\u003e\n        \u003cinput id=\"autoContact\" placeholder=\"Client email/contact\"\u003e\n        \u003cbr\u003e\u003cbr\u003e\n        \u003cinput id=\"autoOffer\" value=\"Full AI Twin by SoulFlame\" placeholder=\"Offer\"\u003e\n        \u003cbr\u003e\u003cbr\u003e\n        \u003cinput id=\"autoAmount\" value=\"19.00 EUR\" placeholder=\"Amount\"\u003e\n        \u003cbr\u003e\u003cbr\u003e\n\n        \u003cbutton class=\"gold\" onclick=\"autoCodePaid()\"\u003eCreate Paid + Code\u003c/button\u003e\n        \u003cbutton class=\"secondary\" onclick=\"copyWebhookExample()\"\u003eCopy Webhook Example\u003c/button\u003e\n\n        \u003cpre class=\"raw\" id=\"autoCodeBox\"\u003eReady.\u003c/pre\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eWebhook URLs\u003c/h2\u003e\n        \u003cp\u003eЗа реални плащания можеш да вържеш webhook към тези endpoints.\u003c/p\u003e\n\n        \u003cpre class=\"raw\"\u003eGeneric webhook:\nPOST https://soulflame-twins.vercel.app/api/webhook/payment\nHeader: x-webhook-secret: PAYMENT_WEBHOOK_SECRET\n\nStripe webhook:\nPOST https://soulflame-twins.vercel.app/api/webhook/stripe\nHeader: stripe-signature: from Stripe\n\nAdmin auto-code:\nPOST https://soulflame-twins.vercel.app/api/admin/auto-code\nHeader: x-admin-pin: ECHO_ADMIN_PIN\u003c/pre\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n    \u003csection class=\"tools\"\u003e\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eGenerate Unlock Code\u003c/h2\u003e\n        \u003cp\u003eСъздава код за Full AI Twin.\u003c/p\u003e\n\n        \u003cinput id=\"codeOffer\" value=\"Full AI Twin\" placeholder=\"Offer\"\u003e\n        \u003cbr\u003e\u003cbr\u003e\n        \u003cinput id=\"codeNote\" placeholder=\"Note / client / payment reference\"\u003e\n        \u003cbr\u003e\u003cbr\u003e\n        \u003cbutton class=\"gold\" onclick=\"generateCode()\"\u003eGenerate Code\u003c/button\u003e\n\n        \u003cpre class=\"raw\" id=\"codeBox\"\u003eReady.\u003c/pre\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"card\"\u003e\n        \u003ch2\u003eConfirm Payment\u003c/h2\u003e\n        \u003cp\u003eВъвеждаш paymentId и системата маркира плащането като paid + генерира код.\u003c/p\u003e\n\n        \u003cinput id=\"paymentId\" placeholder=\"paymentId например 1780...\"\u003e\n        \u003cbr\u003e\u003cbr\u003e\n        \u003cbutton class=\"gold\" onclick=\"confirmPayment()\"\u003eConfirm Payment\u003c/button\u003e\n\n        \u003cpre class=\"raw\" id=\"paymentBox\"\u003eReady.\u003c/pre\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection class=\"card\"\u003e\n      \u003cdiv class=\"tabs\"\u003e\n        \u003cbutton class=\"tab active\" data-tab=\"profiles\" onclick=\"setTab(\u0027profiles\u0027)\"\u003eProfiles\u003c/button\u003e\n        \u003cbutton class=\"tab\" data-tab=\"leads\" onclick=\"setTab(\u0027leads\u0027)\"\u003eLeads\u003c/button\u003e\n        \u003cbutton class=\"tab\" data-tab=\"payments\" onclick=\"setTab(\u0027payments\u0027)\"\u003ePayments\u003c/button\u003e\n        \u003cbutton class=\"tab\" data-tab=\"unlock_codes\" onclick=\"setTab(\u0027unlock_codes\u0027)\"\u003eCodes\u003c/button\u003e\n        \u003cbutton class=\"tab\" data-tab=\"events\" onclick=\"setTab(\u0027events\u0027)\"\u003eEvents\u003c/button\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"searchLine\"\u003e\n        \u003cinput id=\"search\" placeholder=\"Search name / contact / profile / code...\" oninput=\"renderTable()\"\u003e\n        \u003cbutton class=\"secondary\" onclick=\"copyVisible()\"\u003eCopy Visible\u003c/button\u003e\n        \u003cbutton class=\"secondary\" onclick=\"loadAll()\"\u003eRefresh\u003c/button\u003e\n      \u003c/div\u003e\n\n      \u003cdiv class=\"tableWrap\"\u003e\n        \u003ctable\u003e\n          \u003cthead id=\"thead\"\u003e\u003c/thead\u003e\n          \u003ctbody id=\"tbody\"\u003e\u003c/tbody\u003e\n        \u003c/table\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n\n    \u003csection class=\"card\" style=\"margin-top:18px\"\u003e\n      \u003ch2\u003eRaw Data\u003c/h2\u003e\n      \u003cpre class=\"raw\" id=\"rawBox\"\u003eNo data loaded.\u003c/pre\u003e\n    \u003c/section\u003e\n\n    \u003cdiv class=\"footer\"\u003e\n      SoulFlame Twins · V48 Payment Provider Final Setup · Vercel + Supabase\n    \u003c/div\u003e\n  \u003c/div\u003e\n\n  \u003cscript\u003e\n    let state = {\n      tab: \"profiles\",\n      selectedRow: null,\n      data: {\n        profiles: [],\n        leads: [],\n        payments: [],\n        unlock_codes: [],\n        events: [],\n        admin_logs: []\n      },\n      lastRaw: null\n    };\n\n    const byId = id =\u003e document.getElementById(id);\n\n    function show(id, data) {\n      byId(id).textContent = typeof data === \"string\" ? data : JSON.stringify(data, null, 2);\n    }\n\n    function getPin() {\n      return byId(\"pin\").value.trim();\n    }\n\n    function savePin() {\n      localStorage.setItem(\"soulflame_admin_pin\", getPin());\n      show(\"statusBox\", \"PIN saved locally.\");\n    }\n\n    function clearLocal() {\n      localStorage.removeItem(\"soulflame_admin_pin\");\n      byId(\"pin\").value = \"\";\n      show(\"statusBox\", \"Local PIN cleared.\");\n    }\n\n    function loadPin() {\n      byId(\"pin\").value = localStorage.getItem(\"soulflame_admin_pin\") || \"\";\n    }\n\n    async function api(url, options = {}) {\n      const headers = Object.assign({}, options.headers || {});\n      if (getPin()) headers[\"x-admin-pin\"] = getPin();\n\n      const res = await fetch(url, Object.assign({}, options, { headers }));\n      const text = await res.text();\n\n      try {\n        return { status: res.status, data: JSON.parse(text) };\n      } catch {\n        return { status: res.status, data: text };\n      }\n    }\n\n    async function health() {\n      show(\"statusBox\", \"Checking health...\");\n      const result = await api(\"/api/health\");\n      show(\"statusBox\", result.data);\n\n      if (result.data \u0026\u0026 result.data.version) {\n        byId(\"systemText\").textContent = \"Live: \" + result.data.version + \" · \" + result.data.activeDataMode;\n      }\n    }\n\n    async function metricsOnly() {\n      show(\"statusBox\", \"Loading metrics...\");\n      const result = await api(\"/api/admin/metrics\");\n      show(\"statusBox\", result.data);\n    }\n\n    async function loadAll() {\n      show(\"rawBox\", \"Loading admin data...\");\n\n      const result = await api(\"/api/admin/data\");\n\n      if (!result.data || !result.data.ok) {\n        show(\"rawBox\", result.data || result);\n        return;\n      }\n\n      state.lastRaw = result.data;\n      state.data.profiles = asArray(result.data.profiles);\n      state.data.leads = asArray(result.data.leads);\n      state.data.payments = asArray(result.data.payments);\n      state.data.unlock_codes = asArray(result.data.unlock_codes);\n      state.data.events = asArray(result.data.events);\n      state.data.admin_logs = asArray(result.data.admin_logs);\n\n      updateMetrics(result.data.metrics || {});\n      show(\"rawBox\", result.data);\n      renderTable();\n    }\n\n    function asArray(value) {\n      return Array.isArray(value) ? value : [];\n    }\n\n    function updateMetrics(metrics) {\n      byId(\"mProfiles\").textContent = metrics.profiles || state.data.profiles.length || 0;\n      byId(\"mLeads\").textContent = metrics.leads || state.data.leads.length || 0;\n      byId(\"mPayments\").textContent = metrics.payments || state.data.payments.length || 0;\n      byId(\"mCodes\").textContent = metrics.unlock_codes || state.data.unlock_codes.length || 0;\n      byId(\"mEvents\").textContent = metrics.events || state.data.events.length || 0;\n    }\n\n    function setTab(tab) {\n      state.tab = tab;\n\n      document.querySelectorAll(\".tab\").forEach(btn =\u003e {\n        btn.classList.toggle(\"active\", btn.dataset.tab === tab);\n      });\n\n      renderTable();\n    }\n\n    function getRows() {\n      const rows = state.data[state.tab] || [];\n      const q = byId(\"search\").value.trim().toLowerCase();\n\n      if (!q) return rows;\n\n      return rows.filter(row =\u003e JSON.stringify(row).toLowerCase().includes(q));\n    }\n\n    function columnsFor(tab) {\n      if (tab === \"profiles\") return [\"id\", \"created_at\", \"name\", \"contact\", \"profile\", \"main_trait\", \"second_trait\"];\n      if (tab === \"leads\") return [\"id\", \"created_at\", \"offer\", \"name\", \"contact\", \"profile\"];\n      if (tab === \"payments\") return [\"id\", \"created_at\", \"status\", \"offer\", \"amount\", \"name\", \"contact\", \"code\"];\n      if (tab === \"unlock_codes\") return [\"id\", \"created_at\", \"code\", \"status\", \"offer\", \"payment_id\", \"profile_id\"];\n      if (tab === \"events\") return [\"id\", \"created_at\", \"type\", \"payload\"];\n      return [\"id\", \"created_at\"];\n    }\n\n    function renderTable() {\n      const rows = getRows();\n      const cols = columnsFor(state.tab);\n\n      byId(\"thead\").innerHTML =\n        \"\u003ctr\u003e\" + cols.map(c =\u003e \"\u003cth\u003e\" + escapeHtml(c) + \"\u003c/th\u003e\").join(\"\") + \"\u003cth\u003eActions\u003c/th\u003e\u003c/tr\u003e\";\n\n      byId(\"tbody\").innerHTML = rows.map(row =\u003e {\n        const tds = cols.map(col =\u003e \"\u003ctd\u003e\" + formatCell(col, row[col]) + \"\u003c/td\u003e\").join(\"\");\n        return \"\u003ctr\u003e\" + tds + \"\u003ctd\u003e\" + actionButtons(row) + \"\u003c/td\u003e\u003c/tr\u003e\";\n      }).join(\"\") || \"\u003ctr\u003e\u003ctd colspan=\u0027\" + (cols.length + 1) + \"\u0027\u003eNo rows.\u003c/td\u003e\u003c/tr\u003e\";\n    }\n\n    function formatCell(col, value) {\n      if (value === null || value === undefined) return \"\";\n\n      if (col === \"status\") {\n        const cls = value === \"paid\" || value === \"unused\" ? \"green\" : value === \"pending\" ? \"gold\" : \"red\";\n        return \"\u003cspan class=\u0027tag \" + cls + \"\u0027\u003e\" + escapeHtml(String(value)) + \"\u003c/span\u003e\";\n      }\n\n      if (col === \"code\") return \"\u003cspan class=\u0027mono\u0027\u003e\" + escapeHtml(String(value)) + \"\u003c/span\u003e\";\n\n      if (typeof value === \"object\") {\n        return \"\u003cspan class=\u0027small\u0027\u003e\" + escapeHtml(JSON.stringify(value).slice(0, 180)) + \"\u003c/span\u003e\";\n      }\n\n      const text = String(value);\n      return escapeHtml(text.length \u003e 120 ? text.slice(0, 120) + \"...\" : text);\n    }\n\n    function actionButtons(row) {\n      const encoded = encodeURIComponent(JSON.stringify(row));\n      let html = \"\u003cbutton class=\u0027secondary\u0027 onclick=\u0027viewRow(\\\"\" + encoded + \"\\\")\u0027\u003eView\u003c/button\u003e\";\n      html += \" \u003cbutton class=\u0027secondary\u0027 onclick=\u0027useForEmail(\\\"\" + encoded + \"\\\")\u0027\u003eUse Email\u003c/button\u003e\";\n\n      if (row.code) {\n        html += \" \u003cbutton class=\u0027secondary\u0027 onclick=\u0027copyText(\\\"\" + escapeAttr(row.code) + \"\\\")\u0027\u003eCopy Code\u003c/button\u003e\";\n      }\n\n      if (state.tab === \"payments\" \u0026\u0026 row.id) {\n        html += \" \u003cbutton class=\u0027gold\u0027 onclick=\u0027confirmPaymentId(\\\"\" + escapeAttr(row.id) + \"\\\")\u0027\u003eConfirm\u003c/button\u003e\";\n      }\n\n      return html;\n    }\n\n    function viewRow(encoded) {\n      const row = JSON.parse(decodeURIComponent(encoded));\n      state.selectedRow = row;\n      show(\"rawBox\", row);\n    }\n\n    function useForEmail(encoded) {\n      const row = JSON.parse(decodeURIComponent(encoded));\n      state.selectedRow = row;\n      show(\"rawBox\", row);\n\n      const contact = row.contact || row.email || row.name || \"\";\n      byId(\"emailTo\").value = contact;\n\n      if (row.code) {\n        templateUnlockCode(row);\n      } else if (state.tab === \"payments\") {\n        templatePaymentInstructions(row);\n      } else if (state.tab === \"profiles\") {\n        templateFullReportReady(row);\n      } else {\n        templateFollowUp(row);\n      }\n    }\n\n    function clientName(row) {\n      row = row || state.selectedRow || {};\n      return row.name || (row.user \u0026\u0026 row.user.name) || \"приятелю\";\n    }\n\n    function clientContact(row) {\n      row = row || state.selectedRow || {};\n      return row.contact || (row.user \u0026\u0026 row.user.contact) || byId(\"emailTo\").value.trim();\n    }\n\n    function templatePaymentInstructions(row) {\n      row = row || state.selectedRow || {};\n      const name = clientName(row);\n      const paymentId = row.id || \"PAYMENT_ID\";\n      const amount = row.amount || \"19.00 EUR\";\n\n      byId(\"emailSubject\").value = \"SoulFlame Full AI Twin — Payment instructions\";\n      byId(\"emailMessage\").value =\n        \"Здравей, \" + name + \",\\n\\n\" +\n        \"Твоята заявка за Full AI Twin е създадена.\\n\\n\" +\n        \"Payment ID: \" + paymentId + \"\\n\" +\n        \"Сума: \" + amount + \"\\n\\n\" +\n        \"След плащане ще получиш unlock code, с който отключваш Full AI Twin report на сайта:\\n\" +\n        \"https://soulflame-twins.vercel.app/#unlock\\n\\n\" +\n        \"SoulFlame AI Twin\";\n    }\n\n    function templateUnlockCode(row) {\n      row = row || state.selectedRow || {};\n      const name = clientName(row);\n      const code = row.code || \"ECHO-XXXX-XXXX\";\n\n      byId(\"emailSubject\").value = \"Твоят Full AI Twin unlock code\";\n      byId(\"emailMessage\").value =\n        \"Здравей, \" + name + \",\\n\\n\" +\n        \"Твоят Full AI Twin unlock code е:\\n\\n\" +\n        code + \"\\n\\n\" +\n        \"Отвори сайта и въведи кода тук:\\n\" +\n        \"https://soulflame-twins.vercel.app/#unlock\\n\\n\" +\n        \"След това ще видиш Full AI Twin report: Future message, strength, hidden risk, 7-day plan и next move.\\n\\n\" +\n        \"SoulFlame AI Twin\";\n    }\n\n    function templateFullReportReady(row) {\n      row = row || state.selectedRow || {};\n      const name = clientName(row);\n\n      byId(\"emailSubject\").value = \"Твоят AI Twin е готов\";\n      byId(\"emailMessage\").value =\n        \"Здравей, \" + name + \",\\n\\n\" +\n        \"Твоят AI Twin профил е готов.\\n\\n\" +\n        \"Можеш да отвориш сайта тук:\\n\" +\n        \"https://soulflame-twins.vercel.app/\\n\\n\" +\n        \"Ако имаш unlock code, използвай секцията Full AI Twin Unlock.\\n\\n\" +\n        \"SoulFlame AI Twin\";\n    }\n\n    function templateFollowUp(row) {\n      row = row || state.selectedRow || {};\n      const name = clientName(row);\n\n      byId(\"emailSubject\").value = \"SoulFlame AI Twin — следваща стъпка\";\n      byId(\"emailMessage\").value =\n        \"Здравей, \" + name + \",\\n\\n\" +\n        \"Пиша ти за твоя AI Twin профил.\\n\\n\" +\n        \"Следващата стъпка е да отключиш Full AI Twin, за да получиш по-дълбок анализ, Future Twin message и личен план.\\n\\n\" +\n        \"Линк:\\n\" +\n        \"https://soulflame-twins.vercel.app/\\n\\n\" +\n        \"SoulFlame AI Twin\";\n    }\n\n    async function sendEmail() {\n      const to = byId(\"emailTo\").value.trim();\n      const subject = byId(\"emailSubject\").value.trim();\n      const message = byId(\"emailMessage\").value.trim();\n\n      if (!to) {\n        alert(\"Попълни recipient.\");\n        return;\n      }\n\n      if (!message) {\n        alert(\"Попълни message.\");\n        return;\n      }\n\n      show(\"emailBox\", \"Sending/preparing email...\");\n\n      const result = await api(\"/api/admin/email\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({ to, subject, message })\n      });\n\n      show(\"emailBox\", result.data);\n\n      if (result.data \u0026\u0026 result.data.mode === \"manual_copy\") {\n        navigator.clipboard.writeText(message);\n      }\n    }\n\n    function copyEmailMessage() {\n      const message = byId(\"emailMessage\").value.trim();\n      if (!message) {\n        alert(\"Няма message.\");\n        return;\n      }\n\n      navigator.clipboard.writeText(message);\n      show(\"emailBox\", \"Message copied.\");\n    }\n\n    function openMailto() {\n      const to = encodeURIComponent(byId(\"emailTo\").value.trim());\n      const subject = encodeURIComponent(byId(\"emailSubject\").value.trim());\n      const body = encodeURIComponent(byId(\"emailMessage\").value.trim());\n\n      if (!to) {\n        alert(\"Попълни recipient.\");\n        return;\n      }\n\n      window.location.href = \"mailto:\" + to + \"?subject=\" + subject + \"\u0026body=\" + body;\n    }\n\n    function copyText(text) {\n      navigator.clipboard.writeText(text);\n      show(\"statusBox\", \"Copied: \" + text);\n    }\n\n    function copyVisible() {\n      const rows = getRows();\n      navigator.clipboard.writeText(JSON.stringify(rows, null, 2));\n      show(\"statusBox\", \"Visible rows copied: \" + rows.length);\n    }\n\n    function exportJson() {\n      const data = state.lastRaw || state.data;\n      const blob = new Blob([JSON.stringify(data, null, 2)], { type: \"application/json\" });\n      const url = URL.createObjectURL(blob);\n      const a = document.createElement(\"a\");\n      a.href = url;\n      a.download = \"soulflame-admin-export-\" + Date.now() + \".json\";\n      a.click();\n      URL.revokeObjectURL(url);\n    }\n\n    async function loadV50PaymentConfig() {\n      show(\"v50Box\", \"Checking V50 config...\");\n      const result = await api(\"/api/payment-config\");\n      show(\"v50Box\", result.data);\n    }\n\n    function copyV50WebhookGuide() {\n      const guide =\n        \"SoulFlame V50 Auto Unlock Setup\\n\\n\" +\n        \"Best automatic provider: Gumroad or Stripe.\\n\\n\" +\n        \"Required Vercel env:\\n\" +\n        \"PAYMENT_LINK_FULL_TWIN=https://your-fixed-20-eur-payment-link\\n\" +\n        \"GUMROAD_WEBHOOK_SECRET=your-secret\\n\" +\n        \"PAYMENT_WEBHOOK_SECRET=your-secret\\n\" +\n        \"RESEND_API_KEY=your-resend-key\\n\" +\n        \"EMAIL_FROM=verified@email.com\\n\\n\" +\n        \"Gumroad webhook URL:\\n\" +\n        \"https://soulflame-twins.vercel.app/api/webhook/gumroad?secret=YOUR_SECRET\\n\\n\" +\n        \"Generic webhook URL:\\n\" +\n        \"https://soulflame-twins.vercel.app/api/webhook/payment?secret=YOUR_SECRET\\n\\n\" +\n        \"Stripe webhook URL:\\n\" +\n        \"https://soulflame-twins.vercel.app/api/webhook/stripe\\n\\n\" +\n        \"Rule: paid/completed + amount \u003e= 20 EUR + email/contact =\u003e auto code + email.\\n\";\n\n      navigator.clipboard.writeText(guide);\n      show(\"v50Box\", guide);\n    }\n\n    async function testV50GenericWebhook() {\n      show(\"v50Box\", \"Testing generic webhook auto unlock...\");\n\n      const result = await api(\"/api/webhook/payment?secret=test\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n          status: \"paid\",\n          amount: \"20.00\",\n          currency: \"EUR\",\n          provider: \"admin_v50_test\",\n          externalId: \"test_\" + Date.now(),\n          name: \"V50 Test Client\",\n          contact: \"v50-test@soulflame.local\",\n          email: \"v50-test@soulflame.local\",\n          offer: \"Full AI Twin by SoulFlame\"\n        })\n      });\n\n      show(\"v50Box\", result.data);\n    }\n\r\n    async function loadPaymentConfig() {\n      show(\"paymentConfigBox\", \"Checking payment config...\");\n\n      const result = await api(\"/api/payment-config\");\n      show(\"paymentConfigBox\", result.data);\n    }\n\n    function copyPaymentSetupGuide() {\n      const guide =\n        \"SoulFlame V48 Payment Setup\\n\\n\" +\n        \"1. Create Stripe Payment Link / Gumroad product / Revolut payment link.\\n\" +\n        \"2. Put link in Vercel env:\\n\" +\n        \"   PAYMENT_LINK_FULL_TWIN=https://...\\n\\n\" +\n        \"3. Success URL:\\n\" +\n        \"   https://soulflame-twins.vercel.app/payment-success\\n\\n\" +\n        \"4. Cancel URL:\\n\" +\n        \"   https://soulflame-twins.vercel.app/payment-cancel\\n\\n\" +\n        \"5. Generic webhook URL:\\n\" +\n        \"   https://soulflame-twins.vercel.app/api/webhook/payment\\n\\n\" +\n        \"6. Generic webhook header:\\n\" +\n        \"   x-webhook-secret: PAYMENT_WEBHOOK_SECRET\\n\\n\" +\n        \"7. Stripe webhook URL:\\n\" +\n        \"   https://soulflame-twins.vercel.app/api/webhook/stripe\\n\\n\" +\n        \"8. Add Stripe webhook secret in Vercel:\\n\" +\n        \"   STRIPE_WEBHOOK_SECRET=whsec_...\\n\";\n\n      navigator.clipboard.writeText(guide);\n      show(\"paymentConfigBox\", guide);\n    }\n\n    async function testCheckout() {\n      show(\"paymentConfigBox\", \"Testing checkout...\");\n\n      const result = await api(\"/api/checkout\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n          offer: \"Full AI Twin by SoulFlame\",\n          amount: \"19.00 EUR\",\n          provider: \"admin_test_checkout\",\n          user: {\n            name: \"Admin Test Client\",\n            contact: \"admin-test@soulflame.local\",\n            goal: \"Test V48 payment provider setup\",\n            age: \"25-34\"\n          },\n          profile: \"V48 Payment Config Test\",\n          scores: {\n            vision: 10,\n            logic: 9\n          }\n        })\n      });\n\n      show(\"paymentConfigBox\", result.data);\n    }\n\r\n    async function autoCodePaid() {\n      const body = {\n        name: byId(\"autoName\").value.trim(),\n        contact: byId(\"autoContact\").value.trim(),\n        offer: byId(\"autoOffer\").value.trim() || \"Full AI Twin by SoulFlame\",\n        amount: byId(\"autoAmount\").value.trim() || \"19.00 EUR\",\n        method: \"admin_auto_code\",\n        raw: {\n          source: \"admin_auto_code_panel\",\n          createdAt: new Date().toISOString()\n        }\n      };\n\n      if (!body.contact) {\n        alert(\"Попълни client email/contact.\");\n        return;\n      }\n\n      show(\"autoCodeBox\", \"Creating paid payment + unlock code...\");\n\n      const result = await api(\"/api/admin/auto-code\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(body)\n      });\n\n      show(\"autoCodeBox\", result.data);\n\n      if (result.data \u0026\u0026 result.data.code) {\n        navigator.clipboard.writeText(result.data.deliveryText || result.data.code);\n\n        state.selectedRow = {\n          name: body.name,\n          contact: body.contact,\n          code: result.data.code\n        };\n\n        byId(\"emailTo\").value = body.contact;\n        templateUnlockCode(state.selectedRow);\n      }\n\n      await loadAll();\n    }\n\n    function copyWebhookExample() {\n      const example = {\n        secret: \"put-secret-in-header-x-webhook-secret\",\n        name: \"Client Name\",\n        contact: \"client@email.com\",\n        offer: \"Full AI Twin by SoulFlame\",\n        amount: \"19.00 EUR\",\n        provider: \"generic_payment_provider\",\n        externalId: \"payment_123\",\n        status: \"paid\"\n      };\n\n      navigator.clipboard.writeText(JSON.stringify(example, null, 2));\n      show(\"autoCodeBox\", example);\n    }\n\r\n    async function generateCode() {\n      show(\"codeBox\", \"Generating code...\");\n\n      const body = {\n        offer: byId(\"codeOffer\").value.trim() || \"Full AI Twin\",\n        note: byId(\"codeNote\").value.trim()\n      };\n\n      const result = await api(\"/api/admin/code\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(body)\n      });\n\n      show(\"codeBox\", result.data);\n\n      if (result.data \u0026\u0026 result.data.code) {\n        navigator.clipboard.writeText(result.data.code);\n        state.selectedRow = result.data.row || { code: result.data.code, offer: body.offer };\n        templateUnlockCode(state.selectedRow);\n      }\n\n      await loadAll();\n    }\n\n    async function confirmPayment() {\n      const paymentId = byId(\"paymentId\").value.trim();\n\n      if (!paymentId) {\n        alert(\"Въведи paymentId.\");\n        return;\n      }\n\n      await confirmPaymentId(paymentId);\n    }\n\n    async function confirmPaymentId(paymentId) {\n      show(\"paymentBox\", \"Confirming payment \" + paymentId + \"...\");\n\n      const result = await api(\"/api/admin/payment-confirm\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({ paymentId: Number(paymentId) })\n      });\n\n      show(\"paymentBox\", result.data);\n\n      if (result.data \u0026\u0026 result.data.deliveryText) {\n        navigator.clipboard.writeText(result.data.deliveryText);\n\n        const payment = result.data.payment || {};\n        const codeObj = result.data.code || {};\n        state.selectedRow = {\n          name: payment.name || \"\",\n          contact: payment.contact || \"\",\n          code: codeObj.code || payment.code || \"\"\n        };\n\n        byId(\"emailTo\").value = state.selectedRow.contact || \"\";\n        templateUnlockCode(state.selectedRow);\n      }\n\n      await loadAll();\n    }\n\n    function escapeHtml(value) {\n      return String(value)\n        .replaceAll(\"\u0026\", \"\u0026amp;\")\n        .replaceAll(\"\u003c\", \"\u0026lt;\")\n        .replaceAll(\"\u003e\", \"\u0026gt;\")\n        .replaceAll(\u0027\"\u0027, \"\u0026quot;\")\n        .replaceAll(\"\u0027\", \"\u0026#039;\");\n    }\n\n    function escapeAttr(value) {\n      return String(value)\n        .replaceAll(\"\\\\\", \"\\\\\\\\\")\n        .replaceAll(\u0027\"\u0027, \"\u0026quot;\")\n        .replaceAll(\"\u0027\", \"\u0026#039;\");\n    }\n\n    loadPin();\n    health();\n  \u003c/script\u003e\n\u003c/body\u003e\n\u003c/html\u003e";
const INLINE_LANDING_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"\u003e\n  \u003ctitle\u003eБезплатен AI Twin — SoulFlame\u003c/title\u003e\n  \u003cmeta name=\"description\" content=\"Създай безплатен AI Twin за 60 секунди. Отключи Full AI Twin с Future message и личен план.\"\u003e\n  \u003cmeta property=\"og:title\" content=\"Създай безплатен AI Twin\"\u003e\n  \u003cmeta property=\"og:description\" content=\"Твоят дигитален двойник започва с EchoProfile.\"\u003e\n  \u003cmeta name=\"theme-color\" content=\"#050611\"\u003e\n\n  \u003cstyle\u003e\n    :root {\n      --bg0:#03040a;\n      --bg1:#080b1f;\n      --bg2:#111a46;\n      --text:#f8f7ff;\n      --soft:#b9c3e8;\n      --muted:#7f8ab4;\n      --line:rgba(255,255,255,.14);\n      --cyan:#00eaff;\n      --violet:#7c3cff;\n      --pink:#ff4ff3;\n      --gold:#ffd166;\n      --green:#23e6a8;\n      --red:#ff4d6d;\n      --shadow:0 26px 80px rgba(0,0,0,.42);\n    }\n\n    * {\n      box-sizing: border-box;\n    }\n\n    html {\n      scroll-behavior: smooth;\n      background: var(--bg0);\n    }\n\n    body {\n      margin: 0;\n      min-height: 100vh;\n      font-family: Arial, Helvetica, sans-serif;\n      color: var(--text);\n      background:\n        radial-gradient(circle at 18% 8%, rgba(124,60,255,.30), transparent 30rem),\n        radial-gradient(circle at 85% 10%, rgba(0,234,255,.18), transparent 28rem),\n        linear-gradient(135deg, var(--bg0), var(--bg1) 46%, var(--bg2));\n      overflow-x: hidden;\n      -webkit-font-smoothing: antialiased;\n    }\n\n    .wrap {\n      width: min(980px, 100%);\n      margin: 0 auto;\n      padding: 18px;\n    }\n\n    .nav {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      gap: 12px;\n      padding: 12px;\n      border: 1px solid var(--line);\n      background: rgba(6,8,20,.72);\n      border-radius: 22px;\n      margin-bottom: 18px;\n    }\n\n    .brand {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      font-weight: 950;\n      letter-spacing: -.4px;\n    }\n\n    .logo {\n      width: 38px;\n      height: 38px;\n      border-radius: 15px;\n      background:\n        radial-gradient(circle at 30% 22%, #fff, transparent 15%),\n        linear-gradient(135deg, var(--cyan), var(--violet), var(--pink));\n      box-shadow: 0 0 30px rgba(124,60,255,.42);\n      flex: 0 0 auto;\n    }\n\n    .pill {\n      color: var(--text);\n      text-decoration: none;\n      font-size: 13px;\n      font-weight: 900;\n      padding: 10px 12px;\n      border: 1px solid rgba(255,255,255,.13);\n      background: rgba(255,255,255,.06);\n      border-radius: 999px;\n    }\n\n    .hero {\n      min-height: calc(100vh - 86px);\n      display: grid;\n      align-items: center;\n      padding: 22px 0 80px;\n    }\n\n    .card {\n      border: 1px solid var(--line);\n      background:\n        linear-gradient(180deg, rgba(255,255,255,.090), rgba(255,255,255,.045)),\n        radial-gradient(circle at 20% 10%, rgba(0,234,255,.09), transparent 38%);\n      border-radius: 30px;\n      padding: clamp(24px, 6vw, 54px);\n      box-shadow: var(--shadow);\n      position: relative;\n      overflow: hidden;\n    }\n\n    .badge {\n      display: inline-flex;\n      align-items: center;\n      gap: 8px;\n      border: 1px solid rgba(255,255,255,.14);\n      background: rgba(0,0,0,.20);\n      color: var(--soft);\n      padding: 9px 13px;\n      border-radius: 999px;\n      font-size: 13px;\n      font-weight: 950;\n      margin-bottom: 18px;\n    }\n\n    .dot {\n      width: 9px;\n      height: 9px;\n      border-radius: 99px;\n      background: var(--green);\n      box-shadow: 0 0 16px var(--green);\n    }\n\n    h1 {\n      margin: 0 0 18px;\n      font-size: clamp(46px, 10vw, 112px);\n      letter-spacing: -4px;\n      line-height: .88;\n    }\n\n    h2 {\n      margin: 0 0 14px;\n      font-size: clamp(28px, 5vw, 48px);\n      letter-spacing: -1.5px;\n      line-height: 1;\n    }\n\n    p {\n      margin: 0 0 15px;\n      color: var(--soft);\n      line-height: 1.62;\n      font-size: 18px;\n    }\n\n    .grad {\n      background: linear-gradient(90deg, var(--cyan), #5ca8ff, var(--violet), var(--pink));\n      -webkit-background-clip: text;\n      background-clip: text;\n      color: transparent;\n    }\n\n    .gold {\n      color: var(--gold);\n    }\n\n    .actions {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 12px;\n      margin-top: 24px;\n    }\n\n    .btn {\n      display: inline-flex;\n      justify-content: center;\n      align-items: center;\n      text-align: center;\n      border: 0;\n      cursor: pointer;\n      color: white;\n      background: linear-gradient(135deg, var(--violet), #3f8dff);\n      border-radius: 18px;\n      padding: 16px 18px;\n      font-weight: 950;\n      text-decoration: none;\n      font-size: 16px;\n      box-shadow: 0 16px 42px rgba(124,60,255,.24);\n    }\n\n    .btn.gold {\n      background: linear-gradient(135deg, #ffb703, #ff4ff3);\n      box-shadow: 0 16px 45px rgba(255,79,243,.18);\n    }\n\n    .proof {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 10px;\n      margin-top: 22px;\n    }\n\n    .proof div {\n      border: 1px solid rgba(255,255,255,.12);\n      background: rgba(255,255,255,.045);\n      border-radius: 18px;\n      padding: 13px;\n      color: var(--soft);\n      font-size: 13px;\n      line-height: 1.4;\n    }\n\n    .proof b {\n      color: var(--text);\n      display: block;\n      margin-bottom: 4px;\n    }\n\n    .steps {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 14px;\n      margin: 18px 0;\n    }\n\n    .step {\n      border: 1px solid var(--line);\n      background: rgba(255,255,255,.045);\n      border-radius: 24px;\n      padding: 18px;\n    }\n\n    .step strong {\n      display: block;\n      margin-bottom: 8px;\n      font-size: 17px;\n    }\n\n    .sticky {\n      position: fixed;\n      left: 50%;\n      bottom: 16px;\n      z-index: 20;\n      transform: translateX(-50%);\n      width: min(720px, calc(100% - 24px));\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 8px;\n      padding: 8px;\n      border: 1px solid rgba(255,255,255,.14);\n      background: rgba(6,8,20,.86);\n      border-radius: 22px;\n      box-shadow: 0 18px 60px rgba(0,0,0,.34);\n    }\n\n    .note {\n      border: 1px solid rgba(255,209,102,.28);\n      background: rgba(255,209,102,.08);\n      color: #ffe7a8;\n      border-radius: 18px;\n      padding: 14px;\n      margin-top: 18px;\n      line-height: 1.55;\n      font-size: 14px;\n    }\n\n    footer {\n      color: var(--muted);\n      text-align: center;\n      font-size: 13px;\n      padding: 28px 0 88px;\n    }\n\n    @media (max-width: 780px) {\n      html {\n        scroll-behavior: auto;\n      }\n\n      .wrap {\n        padding: 14px;\n      }\n\n      .nav {\n        align-items: flex-start;\n        flex-direction: column;\n      }\n\n      .hero {\n        min-height: auto;\n        padding: 12px 0 90px;\n      }\n\n      .card {\n        border-radius: 24px;\n        padding: 22px;\n      }\n\n      h1 {\n        letter-spacing: -2.3px;\n      }\n\n      p {\n        font-size: 16px;\n      }\n\n      .actions,\n      .proof,\n      .steps {\n        grid-template-columns: 1fr;\n      }\n\n      .sticky {\n        grid-template-columns: 1fr;\n      }\n\n      .btn {\n        padding: 14px 14px;\n      }\n    }\n  \u003c/style\u003e\n\u003c/head\u003e\n\n\u003cbody\u003e\n  \u003cdiv class=\"wrap\"\u003e\n    \u003cnav class=\"nav\"\u003e\n      \u003cdiv class=\"brand\"\u003e\n        \u003cdiv class=\"logo\"\u003e\u003c/div\u003e\n        \u003cdiv\u003eAI Twin by SoulFlame\u003c/div\u003e\n      \u003c/div\u003e\n\n      \u003ca class=\"pill\" href=\"/\"\u003eFull Site\u003c/a\u003e\n    \u003c/nav\u003e\n\n    \u003cmain class=\"hero\"\u003e\n      \u003csection class=\"card\"\u003e\n        \u003cdiv class=\"badge\"\u003e\u003cspan class=\"dot\"\u003e\u003c/span\u003e Free Mini Twin · Full Twin Unlock\u003c/div\u003e\n\n        \u003ch1\u003eСъздай безплатен \u003cspan class=\"grad\"\u003eAI Twin\u003c/span\u003e за 60 секунди\u003c/h1\u003e\n\n        \u003cp\u003e\n          Отговори с няколко вътрешни сигнала и получи първа версия на своя дигитален двойник.\n          После можеш да отключиш Full AI Twin с Future message и личен 7-дневен план.\n        \u003c/p\u003e\n\n        \u003cp class=\"gold\"\u003e\n          Не е просто тест. Това е първият слой към твоя персонален AI профил.\n        \u003c/p\u003e\n\n        \u003cdiv class=\"actions\"\u003e\n          \u003ca class=\"btn gold\" href=\"/#create\"\u003eСъздай AI Twin\u003c/a\u003e\n          \u003ca class=\"btn\" href=\"/#unlock\"\u003eИмам unlock code\u003c/a\u003e\n        \u003c/div\u003e\n\n        \u003cdiv class=\"proof\"\u003e\n          \u003cdiv\u003e\u003cb\u003eMini Twin\u003c/b\u003eБезплатен старт\u003c/div\u003e\n          \u003cdiv\u003e\u003cb\u003eFull Twin\u003c/b\u003eFuture message + план\u003c/div\u003e\n          \u003cdiv\u003e\u003cb\u003eCloud\u003c/b\u003eПрофил + unlock flow\u003c/div\u003e\n        \u003c/div\u003e\n\n        \u003cdiv class=\"steps\"\u003e\n          \u003cdiv class=\"step\"\u003e\n            \u003cstrong\u003e1. Избираш сигнали\u003c/strong\u003e\n            \u003cp\u003eВизия, логика, емоция, действие, бъдеще.\u003c/p\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"step\"\u003e\n            \u003cstrong\u003e2. Получаваш Twin\u003c/strong\u003e\n            \u003cp\u003eСистемата създава първия ти AI profile.\u003c/p\u003e\n          \u003c/div\u003e\n\n          \u003cdiv class=\"step\"\u003e\n            \u003cstrong\u003e3. Отключваш Full\u003c/strong\u003e\n            \u003cp\u003eС код получаваш по-дълбок Full Report.\u003c/p\u003e\n          \u003c/div\u003e\n        \u003c/div\u003e\n\n        \u003cdiv class=\"note\"\u003e\n          SoulFlame AI Twin е продукт за самоанализ и креативна рефлексия. Не е медицинска или психологическа диагноза.\n        \u003c/div\u003e\n      \u003c/section\u003e\n    \u003c/main\u003e\n\n    \u003cfooter\u003e\n      SoulFlame Twins · V47 Deep Full Twin Report Engine ·\n      \u003ca href=\"/privacy\"\u003ePrivacy\u003c/a\u003e · \u003ca href=\"/terms\"\u003eTerms\u003c/a\u003e · \u003ca href=\"/disclaimer\"\u003eDisclaimer\u003c/a\u003e\n    \u003c/footer\u003e\n  \u003c/div\u003e\n\n  \u003cdiv class=\"sticky\"\u003e\n    \u003ca class=\"btn gold\" href=\"/#create\"\u003eСъздай безплатно\u003c/a\u003e\n    \u003ca class=\"btn\" href=\"/#unlock\"\u003eОтключи Full\u003c/a\u003e\n  \u003c/div\u003e\n\n  \u003cscript\u003e\n    try {\n      fetch(\"/api/event\", {\n        method: \"POST\",\n        headers: { \"Content-Type\": \"application/json\" },\n        body: JSON.stringify({\n          type: \"landing_view\",\n          page: \"/landing\",\n          referrer: document.referrer || \"\",\n          payload: {\n            url: location.href,\n            time: new Date().toISOString(),\n            source: \"v46_ad_landing\"\n          }\n        })\n      });\n    } catch {}\n  \u003c/script\u003e\n\u003c/body\u003e\n\u003c/html\u003e";
const INLINE_PAYMENT_SUCCESS_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"\u003e\n  \u003ctitle\u003ePayment Success — SoulFlame AI Twin\u003c/title\u003e\n  \u003cmeta name=\"theme-color\" content=\"#050611\"\u003e\n  \u003cstyle\u003e\n    :root{--bg0:#03040a;--bg1:#080b1f;--bg2:#111a46;--text:#f8f7ff;--soft:#b9c3e8;--line:rgba(255,255,255,.14);--green:#23e6a8;--violet:#7c3cff;--pink:#ff4ff3;--gold:#ffd166}\n    *{box-sizing:border-box}\n    body{margin:0;min-height:100vh;font-family:Arial,Helvetica,sans-serif;color:var(--text);background:radial-gradient(circle at 15% 8%,rgba(124,60,255,.30),transparent 32rem),linear-gradient(135deg,var(--bg0),var(--bg1),var(--bg2))}\n    .wrap{width:min(820px,100%);margin:0 auto;padding:22px;min-height:100vh;display:grid;place-items:center}\n    .card{border:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.045));border-radius:30px;padding:clamp(24px,5vw,44px);box-shadow:0 28px 90px rgba(0,0,0,.42)}\n    h1{margin:0 0 18px;font-size:clamp(38px,7vw,72px);line-height:.92;letter-spacing:-2.5px}\n    p{color:var(--soft);line-height:1.6;font-size:17px}\n    .ok{color:var(--green);font-weight:950}\n    .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px}\n    a{color:white;text-decoration:none;background:linear-gradient(135deg,var(--violet),#3f8dff);padding:14px 18px;border-radius:18px;font-weight:950}\n    a.gold{background:linear-gradient(135deg,#ffb703,#ff4ff3)}\n  \u003c/style\u003e\n\u003c/head\u003e\n\u003cbody\u003e\n  \u003cdiv class=\"wrap\"\u003e\n    \u003csection class=\"card\"\u003e\n      \u003ch1\u003e\u003cspan class=\"ok\"\u003ePayment received\u003c/span\u003e\u003c/h1\u003e\n      \u003cp\u003eАко плащането е през автоматичен provider webhook, системата ще създаде unlock code и ще го изпрати на email. Ако не получиш code, пиши на SoulFlame admin с payment screenshot.\u003c/p\u003e\n      \u003cdiv class=\"actions\"\u003e\n        \u003ca class=\"gold\" href=\"/#unlock\"\u003eОтключи Full Twin\u003c/a\u003e\n        \u003ca href=\"/\"\u003eКъм сайта\u003c/a\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n  \u003c/div\u003e\n\u003c/body\u003e\n\u003c/html\u003e";
const INLINE_PAYMENT_CANCEL_HTML = "\u003c!doctype html\u003e\n\u003chtml lang=\"bg\"\u003e\n\u003chead\u003e\n  \u003cmeta charset=\"utf-8\"\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"\u003e\n  \u003ctitle\u003ePayment Cancelled — SoulFlame AI Twin\u003c/title\u003e\n  \u003cmeta name=\"theme-color\" content=\"#050611\"\u003e\n  \u003cstyle\u003e\n    :root{--bg0:#03040a;--bg1:#080b1f;--bg2:#111a46;--text:#f8f7ff;--soft:#b9c3e8;--line:rgba(255,255,255,.14);--violet:#7c3cff;--pink:#ff4ff3;--gold:#ffd166}\n    *{box-sizing:border-box}\n    body{margin:0;min-height:100vh;font-family:Arial,Helvetica,sans-serif;color:var(--text);background:radial-gradient(circle at 15% 8%,rgba(124,60,255,.30),transparent 32rem),linear-gradient(135deg,var(--bg0),var(--bg1),var(--bg2))}\n    .wrap{width:min(820px,100%);margin:0 auto;padding:22px;min-height:100vh;display:grid;place-items:center}\n    .card{border:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.045));border-radius:30px;padding:clamp(24px,5vw,44px);box-shadow:0 28px 90px rgba(0,0,0,.42)}\n    h1{margin:0 0 18px;font-size:clamp(38px,7vw,72px);line-height:.92;letter-spacing:-2.5px}\n    p{color:var(--soft);line-height:1.6;font-size:17px}\n    .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px}\n    a{color:white;text-decoration:none;background:linear-gradient(135deg,var(--violet),#3f8dff);padding:14px 18px;border-radius:18px;font-weight:950}\n    a.gold{background:linear-gradient(135deg,#ffb703,#ff4ff3)}\n  \u003c/style\u003e\n\u003c/head\u003e\n\u003cbody\u003e\n  \u003cdiv class=\"wrap\"\u003e\n    \u003csection class=\"card\"\u003e\n      \u003ch1\u003ePayment cancelled\u003c/h1\u003e\n      \u003cp\u003eПлащането не е завършено. Можеш да опиташ отново или да останеш с безплатния Mini Twin.\u003c/p\u003e\n      \u003cdiv class=\"actions\"\u003e\n        \u003ca class=\"gold\" href=\"/#checkout\"\u003eОпитай пак\u003c/a\u003e\n        \u003ca href=\"/\"\u003eКъм сайта\u003c/a\u003e\n      \u003c/div\u003e\n    \u003c/section\u003e\n  \u003c/div\u003e\n\u003c/body\u003e\n\u003c/html\u003e";
const INLINE_TEST_HTML = "<!doctype html><html><head><meta charset='utf-8'><title>SoulFlame Test</title></head><body><h1>SoulFlame Test OK</h1></body></html>";

const INLINE_PRIVACY_HTML = "<!doctype html><html lang='bg'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>Privacy</title></head><body style='font-family:Arial;background:#050611;color:white;padding:24px'><h1>Privacy Policy</h1><p>SoulFlame AI Twin stores voluntarily submitted profile, contact, payment and unlock data in Supabase.</p><p>Contact: stere0metal360@gmail.com</p><a style='color:white' href='/'>Home</a></body></html>";
const INLINE_TERMS_HTML = "<!doctype html><html lang='bg'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>Terms</title></head><body style='font-family:Arial;background:#050611;color:white;padding:24px'><h1>Terms</h1><p>SoulFlame AI Twin is an MVP for self-reflection and creative AI profiling. It is not medical, psychological, financial or legal advice.</p><a style='color:white' href='/'>Home</a></body></html>";
const INLINE_DISCLAIMER_HTML = "<!doctype html><html lang='bg'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>Disclaimer</title></head><body style='font-family:Arial;background:#050611;color:white;padding:24px'><h1>Disclaimer</h1><p>AI Twin reports are interpretive and creative. They are not diagnosis or professional advice.</p><a style='color:white' href='/'>Home</a></body></html>";

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
    "Access-Control-Allow-Headers": "Content-Type, x-admin-pin, x-webhook-secret, stripe-signature",
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

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();

      if (body.length > 3000000) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function readBody(req) {
  const raw = await readRawBody(req);
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    return parseForm(raw);
  }
}

function parseForm(raw) {
  const out = {};
  String(raw || "").split("&").forEach(pair => {
    const parts = pair.split("=");
    const key = decodeURIComponent(parts[0] || "").trim();
    const value = decodeURIComponent((parts.slice(1).join("=") || "").replace(/\+/g, " "));
    if (key) out[key] = value;
  });
  return out;
}

function isAdmin(req) {
  const incoming = String(req.headers["x-admin-pin"] || "").trim();
  return Boolean(incoming && incoming === ADMIN_PIN);
}

function requireAdmin(req, res) {
  if (!isAdmin(req)) {
    sendJson(res, 401, { ok: false, error: "Admin PIN required." });
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

function findMissingColumn(errorMessage) {
  const text = String(errorMessage || "");
  const match1 = text.match(/Could not find the '([^']+)' column/i);
  if (match1) return match1[1];

  const match2 = text.match(/column "([^"]+)"/i);
  if (match2) return match2[1];

  return "";
}

async function supabaseWriteWithFallback(table, options = {}, depth = 0) {
  try {
    return await supabaseRequest(table, options);
  } catch (error) {
    const missing = findMissingColumn(error.message);

    if (missing && options.body && Object.prototype.hasOwnProperty.call(options.body, missing) && depth < 12) {
      const nextBody = Object.assign({}, options.body);
      delete nextBody[missing];

      await insertEventSafe("schema_column_fallback", {
        table,
        removedColumn: missing,
        originalError: error.message
      });

      return await supabaseWriteWithFallback(table, Object.assign({}, options, { body: nextBody }), depth + 1);
    }

    throw error;
  }
}

async function insertEventSafe(type, payload = {}) {
  try {
    if (!supabaseConfigured()) return;

    await supabaseRequest("events", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: {
        id: Date.now() + crypto.randomInt(0, 999),
        type,
        payload
      }
    });
  } catch {}
}

async function insertEvent(type, payload = {}) {
  await insertEventSafe(type, payload);
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
    id: Number(body.id) || Date.now(),
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
    id: Number(body.id) || Date.now(),
    status: body.status || "pending",
    offer: body.offer || "Full AI Twin by SoulFlame",
    amount: body.amount || "20.00 EUR",
    method: body.method || "manual",
    name: body.user && body.user.name ? body.user.name : body.name || "",
    contact: body.user && body.user.contact ? body.user.contact : body.contact || body.email || "",
    profile: body.profile || "",
    scores: body.scores || {},
    code: body.code || "",
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

async function safeTable(name) {
  try {
    return await supabaseRequest(name, {
      method: "GET",
      query: "?select=*&order=created_at.desc&limit=50"
    });
  } catch (error) {
    return { error: error.message };
  }
}

async function findPayment(paymentId) {
  if (!paymentId) return null;

  try {
    const rows = await supabaseRequest("payments", {
      method: "GET",
      query: "?id=eq." + encodeURIComponent(paymentId) + "&select=*"
    });

    return Array.isArray(rows) && rows.length ? rows[0] : null;
  } catch {
    return null;
  }
}

async function findCodeByPayment(paymentId) {
  if (!paymentId) return null;

  try {
    const rows = await supabaseRequest("unlock_codes", {
      method: "GET",
      query: "?payment_id=eq." + encodeURIComponent(paymentId) + "&select=*"
    });

    return Array.isArray(rows) && rows.length ? rows[0] : null;
  } catch {
    return null;
  }
}

function normalizeCurrency(value) {
  return String(value || "EUR").trim().toUpperCase();
}

function parseAmountToNumber(input = {}) {
  const directCents =
    input.price_cents ||
    input.amount_cents ||
    input.amount_total ||
    input.amount_received ||
    input.paid_cents ||
    "";

  if (directCents !== "" && directCents !== null && directCents !== undefined) {
    const n = Number(String(directCents).replace(/[^\d.-]/g, ""));
    if (Number.isFinite(n) && Math.abs(n) >= 100) return n / 100;
  }

  const raw =
    input.amount ||
    input.price ||
    input.formatted_price ||
    input.value ||
    input.total ||
    "";

  const str = String(raw).replace(",", ".").replace(/[^\d.-]/g, "");
  const n = Number(str);

  return Number.isFinite(n) ? n : 0;
}

function isPaidStatus(input = {}) {
  const status = String(input.status || input.payment_status || input.sale_status || input.order_status || "paid").toLowerCase();

  return ["paid", "completed", "success", "succeeded", "successful", "approved"].includes(status);
}

function isTwentyEurPaid(input = {}) {
  const amount = parseAmountToNumber(input);
  const currency = normalizeCurrency(input.currency || input.currency_code || "EUR");

  return isPaidStatus(input) && amount >= 20 && currency === "EUR";
}

function extractCustomerEmail(input = {}) {
  return (
    input.email ||
    input.contact ||
    input.customer_email ||
    input.purchaser_email ||
    input.buyer_email ||
    input.recipient_email ||
    (input.customer_details && input.customer_details.email) ||
    ""
  );
}

function extractCustomerName(input = {}) {
  return (
    input.name ||
    input.full_name ||
    input.customer_name ||
    input.buyer_name ||
    input.purchaser_name ||
    (input.customer_details && input.customer_details.name) ||
    ""
  );
}

async function sendAutomaticCodeEmail(to, code, context = {}) {
  const email = String(to || "").trim();

  if (!email || !email.includes("@")) {
    await insertEvent("auto_code_no_email", {
      code,
      to,
      context
    });

    return {
      sent: false,
      mode: "no_valid_email",
      warning: "No valid email/contact for automatic delivery."
    };
  }

  const resendKey = process.env.RESEND_API_KEY || "";
  const fromEmail = process.env.EMAIL_FROM || "SoulFlame <onboarding@resend.dev>";

  const subject = "Твоят Full AI Twin unlock code";
  const message =
    "Здравей!\n\n" +
    "Плащането за Full AI Twin е потвърдено.\n\n" +
    "Твоят unlock code е:\n\n" +
    code + "\n\n" +
    "Отключи Full AI Twin тук:\n" +
    "https://soulflame-twins.vercel.app/#unlock\n\n" +
    "SoulFlame AI Twin";

  if (!resendKey) {
    await insertEvent("auto_email_manual_copy_required", {
      to: email,
      subject,
      message,
      code,
      context,
      reason: "RESEND_API_KEY not configured"
    });

    return {
      sent: false,
      mode: "manual_copy",
      warning: "RESEND_API_KEY not configured. Code was generated, but email was not sent.",
      to: email,
      subject,
      message
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + resendKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      subject,
      text: message
    })
  });

  const text = await response.text();

  if (!response.ok) {
    await insertEvent("auto_email_send_failed", {
      to: email,
      code,
      response: text,
      context
    });

    return {
      sent: false,
      mode: "resend_failed",
      error: text
    };
  }

  let providerResponse = {};
  try {
    providerResponse = text ? JSON.parse(text) : {};
  } catch {
    providerResponse = { raw: text };
  }

  await insertEvent("auto_email_sent", {
    to: email,
    code,
    provider: "resend",
    providerResponse,
    context
  });

  return {
    sent: true,
    mode: "resend",
    to: email,
    providerResponse
  };
}

async function autoCreatePaidUnlockCode(input = {}) {
  const paymentId = Number(input.paymentId || input.id) || Date.now() + crypto.randomInt(0, 999);
  const existingPayment = await findPayment(paymentId);
  const existingCode = await findCodeByPayment(paymentId);
  const code = existingCode && existingCode.code ? existingCode.code : makeUnlockCode();

  const contact = extractCustomerEmail(input);
  const name = extractCustomerName(input);

  const paymentBody = {
    id: paymentId,
    status: "paid",
    offer: input.offer || input.product_name || input.product || "Full AI Twin by SoulFlame",
    amount: input.amount || (parseAmountToNumber(input).toFixed(2) + " EUR"),
    method: input.method || input.provider || "auto_webhook",
    name,
    contact,
    profile: input.profile || "",
    scores: input.scores || {},
    code,
    raw: Object.assign({}, input.raw || {}, {
      autoCode: true,
      autoCodeAt: now(),
      externalId: input.externalId || input.sale_id || input.order_id || "",
      provider: input.provider || input.method || "auto",
      source: input.source || "auto_code"
    })
  };

  let payment;

  if (existingPayment) {
    const updated = await supabaseWriteWithFallback("payments", {
      method: "PATCH",
      query: "?id=eq." + encodeURIComponent(paymentId),
      headers: { Prefer: "return=representation" },
      body: {
        status: "paid",
        code,
        raw: Object.assign({}, existingPayment.raw || {}, paymentBody.raw || {})
      }
    });

    payment = Array.isArray(updated) ? updated[0] : updated;
  } else {
    const inserted = await supabaseWriteWithFallback("payments", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: paymentBody
    });

    payment = Array.isArray(inserted) ? inserted[0] : inserted;
  }

  let codeRow = existingCode;

  if (!codeRow) {
    const insertedCode = await supabaseWriteWithFallback("unlock_codes", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: {
        id: Date.now() + crypto.randomInt(0, 999),
        code,
        status: "unused",
        offer: paymentBody.offer,
        note: "Auto-generated after paid 20 EUR payment " + paymentId,
        used_at: null,
        used_by: null,
        profile_id: null,
        payment_id: paymentId,
        raw: {
          payment,
          source: input.source || "auto_code",
          externalId: input.externalId || input.sale_id || input.order_id || ""
        }
      }
    });

    codeRow = Array.isArray(insertedCode) ? insertedCode[0] : insertedCode;
  }

  const emailDelivery = await sendAutomaticCodeEmail(contact, code, {
    paymentId,
    offer: paymentBody.offer,
    source: input.source || "auto_code"
  });

  await insertEvent("auto_code_created_after_20_eur", {
    paymentId,
    code,
    contact,
    offer: paymentBody.offer,
    source: input.source || "auto_code",
    externalId: input.externalId || input.sale_id || input.order_id || "",
    emailDelivery
  });

  return {
    paymentId,
    payment,
    code,
    codeRow,
    emailDelivery,
    deliveryText:
      "Плащането е потвърдено. Твоят Full AI Twin код е: " +
      code +
      "\n\nОтключи тук: https://soulflame-twins.vercel.app/#unlock"
  };
}

function verifyStripeSignature(raw, signature, secret) {
  if (!signature || !secret) return false;

  const parts = String(signature).split(",");
  const timestampPart = parts.find(p => p.startsWith("t="));
  const signatures = parts.filter(p => p.startsWith("v1=")).map(p => p.slice(3));

  if (!timestampPart || !signatures.length) return false;

  const timestamp = timestampPart.slice(2);
  const signedPayload = timestamp + "." + raw;
  const expected = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex");

  return signatures.some(sig => {
    try {
      const a = Buffer.from(expected, "hex");
      const b = Buffer.from(sig, "hex");
      return a.length === b.length && crypto.timingSafeEqual(a, b);
    } catch {
      return false;
    }
  });
}

function deepTraitInfo(key) {
  const map = {
    vision: { title: "Future Architect", power: "вижда посока преди другите", risk: "може да се изгуби в прекалено много възможности" },
    logic: { title: "Quantum System Builder", power: "превръща хаоса в структура", risk: "може да анализира прекалено дълго" },
    emotion: { title: "Emotional Mirror", power: "усеща хора и сигнали", risk: "може да поема чужди емоции" },
    action: { title: "Momentum Engine", power: "движи нещата бързо", risk: "може да гори енергия без посока" },
    social: { title: "Influence Twin", power: "влияе чрез думи и присъствие", risk: "може да се адаптира прекалено" },
    future: { title: "Future Self Twin", power: "мисли през бъдещи версии", risk: "може да живее повече в бъдещето" },
    deep: { title: "Subconscious Explorer", power: "вижда дълбоки модели", risk: "може да усложнява простото" },
    creator: { title: "Creator Twin", power: "създава системи и продукти", risk: "може да започне много проекти" }
  };

  return map[key] || map.vision;
}

function pickTraitFromScores(scores, fallback) {
  const entries = Object.entries(scores || {}).sort((a, b) => Number(b[1] || 0) - Number(a[1] || 0));
  return entries.length ? entries[0][0] : fallback;
}

function buildDeepFullTwinReport(input = {}) {
  const twin = input.twin || input.rawTwin || {};
  const user = twin.user || input.user || {};
  const name = input.name || user.name || "SoulFlame User";
  const scores = twin.scores || input.scores || {};

  const mainTrait = twin.mainTrait || twin.main_trait || input.mainTrait || pickTraitFromScores(scores, "vision");
  const secondTrait = twin.secondTrait || twin.second_trait || input.secondTrait || "logic";

  const first = deepTraitInfo(mainTrait);
  const second = deepTraitInfo(secondTrait);

  const profile = twin.profile || input.profile || (first.title + " + " + second.title);
  const goal = user.goal || input.goal || "да изгради по-ясна бъдеща версия на себе си";

  const futureMessage =
    name + ", твоят Future Twin казва: не чакай да станеш готов. Главната ти линия е, че " +
    first.power + ", а вторият ти двигател е, че " + second.power + ".";

  const strength =
    "Твоята основна сила е синтезът между " + first.title + " и " + second.title + ".";

  const risk =
    "Скритият риск: " + first.risk + ", а също така " + second.risk + ".";

  const identityCore = "Identity Core: ти търсиш не просто отговор, а форма на бъдещето.";
  const mindPattern = "Mind Pattern: визия → малка версия → тест → подобрение.";
  const emotionalPattern = "Emotional Pattern: емоцията е гориво, но иска посока.";
  const businessPattern = "Business Mode: продавай трансформация, не само функция.";
  const moneyPattern = "Money Pattern: парите идват, когато покажеш публично работеща версия.";
  const relationshipPattern = "Relationship Mode: нужни са хора, които те подкрепят и заземяват.";
  const shadowPattern = "Shadow Pattern: врагът е разпиляване, не липса на идеи.";
  const plan = "Ден 1: цел. Ден 2: 3 стъпки. Ден 3: първа версия. Ден 4: покажи. Ден 5: feedback. Ден 6: подобри. Ден 7: публикувай.";
  const thirtyDayPlan = "30 дни: идея → демо → 20 човека → първи заявки.";
  const nextMove = "Една версия. Един линк. Един тест. Един човек, който реагира.";

  const fullReportText =
    "FULL AI TWIN REPORT — " + name + "\n\n" +
    "Profile: " + profile + "\n\n" +
    "Goal: " + goal + "\n\n" +
    "Future Message:\n" + futureMessage + "\n\n" +
    "Core Strength:\n" + strength + "\n\n" +
    "Hidden Risk:\n" + risk + "\n\n" +
    "Identity Core:\n" + identityCore + "\n\n" +
    "Mind Pattern:\n" + mindPattern + "\n\n" +
    "Emotional Pattern:\n" + emotionalPattern + "\n\n" +
    "Business Mode:\n" + businessPattern + "\n\n" +
    "Money Pattern:\n" + moneyPattern + "\n\n" +
    "Relationship Mode:\n" + relationshipPattern + "\n\n" +
    "Shadow Pattern:\n" + shadowPattern + "\n\n" +
    "7-Day Plan:\n" + plan + "\n\n" +
    "30-Day Upgrade:\n" + thirtyDayPlan + "\n\n" +
    "Next Move:\n" + nextMove;

  return {
    name,
    profile,
    goal,
    mainTrait,
    secondTrait,
    code: input.code || null,
    futureMessage,
    strength,
    risk,
    plan,
    nextMove,
    identityCore,
    mindPattern,
    emotionalPattern,
    businessPattern,
    moneyPattern,
    relationshipPattern,
    shadowPattern,
    thirtyDayPlan,
    fullReportText,
    generatedAt: now(),
    version: APP_VERSION
  };
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
      "/landing",
      "/payment-success",
      "/payment-cancel",
      "/test",
      "/privacy",
      "/terms",
      "/disclaimer",
      "/api/health",
      "/api/payment-config",
      "/api/public-config",
      "/api/event",
      "/api/profile",
      "/api/lead",
      "/api/payment-request",
      "/api/checkout",
      "/api/full-report",
      "/api/unlock",
      "/api/admin/data",
      "/api/admin/metrics",
      "/api/admin/code",
      "/api/admin/email",
      "/api/admin/payment-confirm",
      "/api/admin/auto-code",
      "/api/webhook/payment",
      "/api/webhook/gumroad",
      "/api/webhook/stripe"
    ],
    time: now()
  });
}

async function handlePaymentConfig(req, res) {
  const fullLink =
    process.env.PAYMENT_LINK_FULL_TWIN ||
    process.env.STRIPE_PAYMENT_LINK_FULL_TWIN ||
    process.env.GUMROAD_PAYMENT_LINK_FULL_TWIN ||
    process.env.REVOLUT_PAYMENT_LINK_FULL_TWIN ||
    "";

  const deepLink =
    process.env.PAYMENT_LINK_DEEP_TWIN ||
    process.env.STRIPE_PAYMENT_LINK_DEEP_TWIN ||
    process.env.GUMROAD_PAYMENT_LINK_DEEP_TWIN ||
    process.env.REVOLUT_PAYMENT_LINK_DEEP_TWIN ||
    "";

  sendJson(res, 200, {
    ok: true,
    version: APP_VERSION,
    autoUnlock20Eur: true,
    paymentLinks: {
      fullTwinConfigured: Boolean(fullLink),
      deepTwinConfigured: Boolean(deepLink),
      fullTwinUrl: fullLink || null,
      deepTwinUrl: deepLink || null
    },
    webhooks: {
      genericWebhookConfigured: Boolean(process.env.PAYMENT_WEBHOOK_SECRET || ""),
      gumroadWebhookConfigured: Boolean(process.env.GUMROAD_WEBHOOK_SECRET || ""),
      stripeWebhookConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET || ""),
      genericWebhookUrl: "https://soulflame-twins.vercel.app/api/webhook/payment",
      gumroadWebhookUrl: "https://soulflame-twins.vercel.app/api/webhook/gumroad",
      stripeWebhookUrl: "https://soulflame-twins.vercel.app/api/webhook/stripe"
    },
    email: {
      resendConfigured: Boolean(process.env.RESEND_API_KEY || ""),
      from: process.env.EMAIL_FROM || "SoulFlame <onboarding@resend.dev>"
    },
    redirectUrls: {
      successUrl: "https://soulflame-twins.vercel.app/payment-success",
      cancelUrl: "https://soulflame-twins.vercel.app/payment-cancel",
      landingUrl: "https://soulflame-twins.vercel.app/landing"
    },
    requiredForFullAutomatic: [
      "Fixed 20 EUR payment link",
      "Provider webhook to /api/webhook/gumroad or /api/webhook/stripe",
      "RESEND_API_KEY for automatic email code delivery"
    ],
    envNeededIfMissing: {
      paymentLink: fullLink ? [] : ["PAYMENT_LINK_FULL_TWIN"],
      gumroadWebhook: process.env.GUMROAD_WEBHOOK_SECRET ? [] : ["GUMROAD_WEBHOOK_SECRET"],
      genericWebhook: process.env.PAYMENT_WEBHOOK_SECRET ? [] : ["PAYMENT_WEBHOOK_SECRET"],
      stripeWebhook: process.env.STRIPE_WEBHOOK_SECRET ? [] : ["STRIPE_WEBHOOK_SECRET"],
      email: process.env.RESEND_API_KEY ? [] : ["RESEND_API_KEY", "EMAIL_FROM"]
    },
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
    activeDataMode: supabaseConfigured() ? "supabase" : "missing_supabase_env",
    prices: {
      mini: "0 EUR",
      full: "20 EUR",
      deep: "49 EUR"
    },
    time: now()
  });
}

async function handleClientEvent(req, res) {
  const body = await readBody(req);

  await insertEvent(body.type || "client_event", {
    page: body.page || "",
    referrer: body.referrer || "",
    payload: body.payload || {},
    userAgent: req.headers["user-agent"] || "",
    createdAt: now(),
    source: "client"
  });

  sendJson(res, 200, { ok: true, saved: "event", time: now() });
}

async function handleProfile(req, res) {
  const body = await readBody(req);
  const row = profileRow(body);

  const inserted = await supabaseWriteWithFallback("profiles", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: row
  });

  await insertEvent("profile_created", { profileId: row.id, name: row.name, contact: row.contact });

  sendJson(res, 200, { ok: true, saved: "profile", activeDataMode: "supabase", id: row.id, inserted });
}

async function handleLead(req, res) {
  const body = await readBody(req);
  const row = leadRow(body);

  const inserted = await supabaseWriteWithFallback("leads", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: row
  });

  await insertEvent("lead_created", { leadId: row.id, offer: row.offer, name: row.name });

  sendJson(res, 200, { ok: true, saved: "lead", id: row.id, inserted });
}

async function handlePaymentRequest(req, res) {
  const body = await readBody(req);
  const row = paymentRow(body);

  const inserted = await supabaseWriteWithFallback("payments", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: row
  });

  await insertEvent("payment_requested", { paymentId: row.id, offer: row.offer, amount: row.amount, contact: row.contact });

  sendJson(res, 200, {
    ok: true,
    saved: "payment-request",
    payment: Array.isArray(inserted) ? inserted[0] : inserted,
    message: "Payment request created."
  });
}

async function handleCheckout(req, res) {
  const body = await readBody(req);

  const offer = body.offer || "Full AI Twin by SoulFlame";
  const amount = body.amount || "20.00 EUR";
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

  const selectedLink = String(offer).toLowerCase().includes("deep") ? deepTwinLink : fullTwinLink;

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
      createdAt: now(),
      autoUnlockRule: "provider webhook paid >= 20 EUR"
    }
  };

  const row = paymentRow(paymentBody);

  const inserted = await supabaseWriteWithFallback("payments", {
    method: "POST",
    headers: { Prefer: "return=representation" },
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
    autoUnlock20Eur: true,
    message: selectedLink
      ? "Checkout created. Open paymentUrl to pay. Auto code requires provider webhook."
      : "Checkout created, but no PAYMENT_LINK_FULL_TWIN configured."
  });
}

async function handleFullReport(req, res) {
  const body = await readBody(req);
  const report = buildDeepFullTwinReport(body);

  await insertEvent("full_report_generated", {
    name: report.name,
    profile: report.profile,
    mainTrait: report.mainTrait,
    secondTrait: report.secondTrait
  });

  sendJson(res, 200, { ok: true, saved: "full-report", version: APP_VERSION, report });
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

async function handleAdminEmail(req, res) {
  if (!requireAdmin(req, res)) return;

  const body = await readBody(req);
  const to = String(body.to || "").trim();
  const subject = String(body.subject || "SoulFlame AI Twin").trim();
  const message = String(body.message || body.body || "").trim();

  if (!to) return sendJson(res, 400, { ok: false, error: "Recipient required." });
  if (!message) return sendJson(res, 400, { ok: false, error: "Message required." });

  const result = await sendAutomaticCodeEmail(to, body.code || "MANUAL", {
    manualMessage: message,
    manualSubject: subject,
    source: "admin_email"
  });

  if (result.mode === "manual_copy" || result.mode === "no_valid_email") {
    result.subject = subject;
    result.message = message;
  }

  sendJson(res, 200, Object.assign({ ok: true }, result));
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

  const inserted = await supabaseWriteWithFallback("unlock_codes", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: row
  });

  await insertEvent("code_generated", { code, offer: row.offer, paymentId: row.payment_id });

  sendJson(res, 200, {
    ok: true,
    code,
    row: Array.isArray(inserted) ? inserted[0] : inserted,
    deliveryText: "Твоят Full AI Twin код е: " + code
  });
}

async function handleAdminAutoCode(req, res) {
  if (!requireAdmin(req, res)) return;

  const body = await readBody(req);

  const result = await autoCreatePaidUnlockCode(Object.assign({}, body, {
    source: "admin_auto_code",
    method: body.method || "admin_auto_code",
    amount: body.amount || "20.00 EUR",
    currency: "EUR",
    status: "paid"
  }));

  sendJson(res, 200, Object.assign({ ok: true, mode: "admin_auto_code" }, result));
}

async function handleUnlock(req, res) {
  const body = await readBody(req);
  const submittedCode = String(body.code || "").trim().toUpperCase();

  if (!submittedCode) return sendJson(res, 400, { ok: false, error: "Missing unlock code." });

  const rows = await supabaseRequest("unlock_codes", {
    method: "GET",
    query: "?code=eq." + encodeURIComponent(submittedCode) + "&select=*"
  });

  if (!Array.isArray(rows) || rows.length === 0) {
    return sendJson(res, 404, { ok: false, error: "Кодът не съществува." });
  }

  const current = rows[0];

  if (current.status === "used") {
    return sendJson(res, 409, { ok: false, error: "Този код вече е използван.", code: current });
  }

  const updated = await supabaseWriteWithFallback("unlock_codes", {
    method: "PATCH",
    query: "?id=eq." + encodeURIComponent(current.id),
    headers: { Prefer: "return=representation" },
    body: {
      status: "used",
      used_at: now(),
      used_by: body.user || null,
      profile_id: body.profileId || null
    }
  });

  await insertEvent("code_used", { code: submittedCode, profileId: body.profileId || null });

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

  if (!paymentId) return sendJson(res, 400, { ok: false, error: "paymentId required." });

  const payment = await findPayment(paymentId);
  if (!payment) return sendJson(res, 404, { ok: false, error: "Payment not found." });

  const result = await autoCreatePaidUnlockCode({
    paymentId,
    offer: payment.offer,
    amount: payment.amount || "20.00 EUR",
    currency: "EUR",
    name: payment.name,
    contact: payment.contact,
    profile: payment.profile,
    scores: payment.scores || {},
    method: "admin_confirm",
    source: "admin_payment_confirm",
    raw: { payment },
    status: "paid"
  });

  sendJson(res, 200, { ok: true, payment: result.payment, code: result.codeRow, deliveryText: result.deliveryText, emailDelivery: result.emailDelivery });
}

async function handleGenericPaymentWebhook(req, res) {
  const raw = await readRawBody(req);
  const parsedUrl = new URL(req.url, "http://localhost");

  const expectedSecret = process.env.PAYMENT_WEBHOOK_SECRET || "";
  const incomingSecret =
    String(req.headers["x-webhook-secret"] || "").trim() ||
    parsedUrl.searchParams.get("secret") ||
    "";

  if (expectedSecret && incomingSecret !== expectedSecret) {
    return sendJson(res, 401, { ok: false, error: "Invalid generic webhook secret." });
  }

  let body = {};
  const contentType = String(req.headers["content-type"] || "");

  if (contentType.includes("application/x-www-form-urlencoded")) {
    body = parseForm(raw);
  } else {
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      body = { raw };
    }
  }

  if (!isTwentyEurPaid(body)) {
    await insertEvent("payment_webhook_ignored_not_20_eur", { body, amount: parseAmountToNumber(body), status: body.status || "" });

    return sendJson(res, 200, {
      ok: true,
      ignored: true,
      reason: "Payment is not paid/completed or amount is under 20 EUR.",
      parsedAmount: parseAmountToNumber(body),
      currency: normalizeCurrency(body.currency || body.currency_code || "EUR")
    });
  }

  const result = await autoCreatePaidUnlockCode({
    paymentId: body.paymentId || body.payment_id || null,
    name: extractCustomerName(body),
    contact: extractCustomerEmail(body),
    email: extractCustomerEmail(body),
    offer: body.offer || body.product_name || "Full AI Twin by SoulFlame",
    amount: parseAmountToNumber(body).toFixed(2) + " EUR",
    currency: "EUR",
    method: body.provider || "generic_webhook",
    provider: body.provider || "generic_webhook",
    externalId: body.externalId || body.id || body.sale_id || body.payment_intent || "",
    raw: body,
    source: "generic_payment_webhook",
    status: "paid"
  });

  sendJson(res, 200, Object.assign({ ok: true, webhook: "generic_payment", autoUnlock20Eur: true }, result));
}

async function handleGumroadWebhook(req, res) {
  const raw = await readRawBody(req);
  const parsedUrl = new URL(req.url, "http://localhost");

  const expectedSecret = process.env.GUMROAD_WEBHOOK_SECRET || "";
  const incomingSecret =
    String(req.headers["x-webhook-secret"] || "").trim() ||
    parsedUrl.searchParams.get("secret") ||
    "";

  if (expectedSecret && incomingSecret !== expectedSecret) {
    return sendJson(res, 401, { ok: false, error: "Invalid Gumroad webhook secret." });
  }

  const contentType = String(req.headers["content-type"] || "");
  let body = {};

  if (contentType.includes("application/x-www-form-urlencoded")) {
    body = parseForm(raw);
  } else {
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      body = parseForm(raw);
    }
  }

  const gumroadBody = Object.assign({}, body, {
    status: body.status || "paid",
    currency: body.currency || body.currency_code || "EUR",
    amount:
      body.amount ||
      body.price ||
      body.formatted_price ||
      (body.price_cents ? (Number(body.price_cents) / 100).toFixed(2) : "")
  });

  if (!isTwentyEurPaid(gumroadBody)) {
    await insertEvent("gumroad_webhook_ignored_not_20_eur", { body: gumroadBody, parsedAmount: parseAmountToNumber(gumroadBody) });

    return sendJson(res, 200, {
      ok: true,
      ignored: true,
      webhook: "gumroad",
      reason: "Gumroad sale is not at least 20 EUR.",
      parsedAmount: parseAmountToNumber(gumroadBody),
      currency: normalizeCurrency(gumroadBody.currency || "EUR")
    });
  }

  const result = await autoCreatePaidUnlockCode({
    paymentId: gumroadBody.sale_id || gumroadBody.id || null,
    name: extractCustomerName(gumroadBody),
    contact: extractCustomerEmail(gumroadBody),
    email: extractCustomerEmail(gumroadBody),
    offer: gumroadBody.product_name || gumroadBody.product || "Full AI Twin by SoulFlame",
    amount: parseAmountToNumber(gumroadBody).toFixed(2) + " EUR",
    currency: "EUR",
    method: "gumroad_webhook",
    provider: "gumroad",
    externalId: gumroadBody.sale_id || gumroadBody.id || "",
    raw: gumroadBody,
    source: "gumroad_webhook",
    status: "paid"
  });

  sendJson(res, 200, Object.assign({ ok: true, webhook: "gumroad", autoUnlock20Eur: true }, result));
}

async function handleStripeWebhook(req, res) {
  const raw = await readRawBody(req);
  const secret = process.env.STRIPE_WEBHOOK_SECRET || "";
  const signature = req.headers["stripe-signature"] || "";

  if (secret && !verifyStripeSignature(raw, signature, secret)) {
    return sendJson(res, 401, { ok: false, error: "Invalid Stripe signature." });
  }

  let event = {};

  try {
    event = JSON.parse(raw);
  } catch {
    return sendJson(res, 400, { ok: false, error: "Invalid Stripe JSON." });
  }

  const type = event.type || "";
  const acceptedTypes = ["checkout.session.completed", "payment_intent.succeeded"];

  if (!acceptedTypes.includes(type)) {
    await insertEvent("stripe_webhook_ignored", { type, eventId: event.id || "" });
    return sendJson(res, 200, { ok: true, ignored: true, type });
  }

  const obj = event.data && event.data.object ? event.data.object : {};
  const metadata = obj.metadata || {};
  const customerDetails = obj.customer_details || {};

  const amountTotal = obj.amount_total || obj.amount_received || 0;
  const currency = normalizeCurrency(obj.currency || "EUR");
  const amount = Number(amountTotal) / 100;

  if (!(amount >= 20 && currency === "EUR")) {
    await insertEvent("stripe_webhook_ignored_not_20_eur", { amount, currency, type });

    return sendJson(res, 200, {
      ok: true,
      ignored: true,
      reason: "Stripe payment is under 20 EUR or currency is not EUR.",
      amount,
      currency
    });
  }

  const result = await autoCreatePaidUnlockCode({
    name: customerDetails.name || metadata.name || "",
    contact: customerDetails.email || obj.receipt_email || metadata.contact || metadata.email || "",
    email: customerDetails.email || obj.receipt_email || metadata.email || "",
    offer: metadata.offer || "Full AI Twin by SoulFlame",
    amount: amount.toFixed(2) + " EUR",
    currency: "EUR",
    method: "stripe_webhook",
    provider: "stripe",
    externalId: obj.id || event.id || "",
    raw: event,
    source: "stripe_webhook",
    status: "paid"
  });

  sendJson(res, 200, Object.assign({ ok: true, webhook: "stripe", stripeEvent: event.id || "", autoUnlock20Eur: true }, result));
}

async function appHandler(req, res) {
  try {
    const parsed = new URL(req.url, "http://localhost");
    const pathName = parsed.pathname;

    if (req.method === "OPTIONS") return sendJson(res, 200, { ok: true });

    if (req.method === "GET" && pathName === "/") return sendHtml(res, INLINE_INDEX_HTML);
    if (req.method === "GET" && pathName === "/admin") return sendHtml(res, INLINE_ADMIN_HTML);
    if (req.method === "GET" && pathName === "/landing") return sendHtml(res, INLINE_LANDING_HTML);
    if (req.method === "GET" && pathName === "/payment-success") return sendHtml(res, INLINE_PAYMENT_SUCCESS_HTML);
    if (req.method === "GET" && pathName === "/payment-cancel") return sendHtml(res, INLINE_PAYMENT_CANCEL_HTML);
    if (req.method === "GET" && pathName === "/test") return sendHtml(res, INLINE_TEST_HTML);
    if (req.method === "GET" && pathName === "/privacy") return sendHtml(res, INLINE_PRIVACY_HTML);
    if (req.method === "GET" && pathName === "/terms") return sendHtml(res, INLINE_TERMS_HTML);
    if (req.method === "GET" && pathName === "/disclaimer") return sendHtml(res, INLINE_DISCLAIMER_HTML);

    if (req.method === "GET" && pathName === "/api/health") return await handleHealth(req, res);
    if (req.method === "GET" && pathName === "/api/payment-config") return await handlePaymentConfig(req, res);
    if (req.method === "GET" && pathName === "/api/public-config") return await handlePublicConfig(req, res);
    if (req.method === "GET" && (pathName === "/api/data" || pathName === "/api/admin/data")) return await handleAdminData(req, res);
    if (req.method === "GET" && pathName === "/api/admin/metrics") return await handleAdminMetrics(req, res);

    if (req.method === "POST" && pathName === "/api/event") return await handleClientEvent(req, res);
    if (req.method === "POST" && pathName === "/api/profile") return await handleProfile(req, res);
    if (req.method === "POST" && pathName === "/api/lead") return await handleLead(req, res);
    if (req.method === "POST" && pathName === "/api/payment-request") return await handlePaymentRequest(req, res);
    if (req.method === "POST" && pathName === "/api/checkout") return await handleCheckout(req, res);
    if (req.method === "POST" && pathName === "/api/full-report") return await handleFullReport(req, res);
    if (req.method === "POST" && pathName === "/api/unlock") return await handleUnlock(req, res);

    if (req.method === "POST" && pathName === "/api/admin/email") return await handleAdminEmail(req, res);
    if (req.method === "POST" && (pathName === "/api/code" || pathName === "/api/admin/code")) return await handleAdminCode(req, res);
    if (req.method === "POST" && pathName === "/api/admin/auto-code") return await handleAdminAutoCode(req, res);
    if (req.method === "POST" && (pathName === "/api/payment-confirm" || pathName === "/api/admin/payment-confirm")) return await handlePaymentConfirm(req, res);

    if (req.method === "POST" && pathName === "/api/webhook/payment") return await handleGenericPaymentWebhook(req, res);
    if (req.method === "POST" && pathName === "/api/webhook/gumroad") return await handleGumroadWebhook(req, res);
    if (req.method === "POST" && pathName === "/api/webhook/stripe") return await handleStripeWebhook(req, res);

    return sendText(res, 404, "Not found");
  } catch (error) {
    return sendJson(res, 500, {
      ok: false,
      error: error.message,
      version: APP_VERSION,
      activeDataMode: supabaseConfigured() ? "supabase" : "missing_supabase_env",
      warning: "V50 caught error safely."
    });
  }
}

if (process.env.VERCEL) {
  module.exports = appHandler;
} else {
  const server = http.createServer(appHandler);
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
}