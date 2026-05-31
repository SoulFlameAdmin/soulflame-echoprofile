const questions = [
  { text: "Често ли усещаш, че мислиш различно от хората около теб?", yes: { vision: 2, logic: 1 }, no: { social: 1 } },
  { text: "Имаш ли силно желание да създадеш нещо голямо, което да остане след теб?", yes: { vision: 3, action: 1 }, no: { emotion: 1 } },
  { text: "По-лесно ли усещаш емоциите на хората, отколкото те ги казват с думи?", yes: { emotion: 3 }, no: { logic: 1 } },
  { text: "Когато имаш идея, веднага ли започваш да виждаш система около нея?", yes: { vision: 2, logic: 2 }, no: { social: 1 } },
  { text: "Понякога ли се чувстваш сякаш си създаден за нещо по-голямо?", yes: { vision: 3, emotion: 1 }, no: { logic: 1 } },
  { text: "В спор предпочиташ ли истината, дори да звучи директно?", yes: { logic: 3 }, no: { emotion: 1, social: 1 } },
  { text: "Можеш ли бързо да усетиш дали даден човек е истински или фалшив?", yes: { emotion: 2, logic: 1 }, no: { social: 1 } },
  { text: "Имаш ли много идеи, но понякога ти е трудно да избереш първата стъпка?", yes: { vision: 2, emotion: 1 }, no: { action: 2 } },
  { text: "Когато видиш проблем, веднага ли търсиш начин да го превърнеш в продукт?", yes: { vision: 2, logic: 2, action: 1 }, no: { emotion: 1 } },
  { text: "Вярваш ли, че човек може да стане много повече от това, което е сега?", yes: { vision: 2, emotion: 2 }, no: { logic: 1 } },
  { text: "Когато си под напрежение, започваш ли да мислиш още по-бързо?", yes: { logic: 2, vision: 1 }, no: { emotion: 1, social: 1 } },
  { text: "Имаш ли нужда идеите ти да имат смисъл, не просто да носят пари?", yes: { emotion: 2, vision: 1 }, no: { logic: 2 } },
  { text: "Лесно ли убеждаваш хората, когато вярваш в нещо?", yes: { social: 3, vision: 1 }, no: { logic: 1 } },
  { text: "Обичаш ли да създаваш неща, които изглеждат невъзможни за другите?", yes: { vision: 3, logic: 1 }, no: { social: 1 } },
  { text: "Понякога ли усещаш, че хората не разбират мащаба на мисленето ти?", yes: { vision: 2, emotion: 1 }, no: { social: 1 } },
  { text: "Когато видиш нова технология, веднага ли мислиш как да я превърнеш в бизнес?", yes: { vision: 2, logic: 2 }, no: { emotion: 1 } },
  { text: "Предпочиташ ли малък, но реален старт пред голям план без действие?", yes: { action: 3, logic: 1 }, no: { vision: 2 } },
  { text: "Искаш ли системата да те води, вместо всеки ден да решаваш от нулата?", yes: { logic: 2, action: 1 }, no: { social: 1 } },
  { text: "Имаш ли усещане, че личността ти може да стане продукт или AI модел?", yes: { vision: 3, emotion: 1 }, no: { logic: 1 } },
  { text: "Би ли използвал AI профил, който ти казва следващия най-умен ход?", yes: { logic: 2, vision: 2 }, no: { emotion: 1 } },
  { text: "Когато започнеш нещо, можеш ли да го довършиш без да смениш посоката?", yes: { action: 3, logic: 1 }, no: { vision: 1, emotion: 1 } },
  { text: "Хората често ли идват при теб за съвет, идея или посока?", yes: { social: 2, emotion: 1 }, no: { logic: 1 } },
  { text: "По-силен ли си, когато имаш ясна мисия?", yes: { vision: 2, action: 2 }, no: { emotion: 1 } },
  { text: "Би ли платил за дълбок AI анализ, ако ти даде реална посока?", yes: { action: 2, logic: 1 }, no: { emotion: 1 } }
];

const OWNER_EMAIL = "stere0metal360@gmail.com";

const screens = ["landingScreen", "leadScreen", "quizScreen", "resultScreen", "pricingScreen", "adminScreen"];

let currentQuestion = 0;
let finalText = "";
let premiumText = "";
let lastResult = null;

let user = {
  name: "",
  contact: "",
  goal: "",
  age: ""
};

let scores = {
  vision: 0,
  emotion: 0,
  logic: 0,
  social: 0,
  action: 0
};

function showPage(id) {
  screens.forEach(screen => document.getElementById(screen).classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  if (id === "adminScreen") {
    renderAdmin();
  }
}

function showAdmin() {
  showPage("adminScreen");
}

function startTest() {
  const name = document.getElementById("userName").value.trim();
  const contact = document.getElementById("userContact").value.trim();
  const goal = document.getElementById("userGoal").value;
  const age = document.getElementById("userAge").value;

  if (!name) {
    alert("Въведи име, за да създадем Echo профил.");
    return;
  }

  user = {
    name,
    contact: contact || "няма въведен контакт",
    goal,
    age
  };

  currentQuestion = 0;
  finalText = "";
  premiumText = "";
  lastResult = null;
  scores = { vision: 0, emotion: 0, logic: 0, social: 0, action: 0 };

  document.getElementById("premiumPreview").classList.add("hidden");
  document.getElementById("lockedPreview").classList.remove("hidden");
  document.getElementById("unlockStatus").textContent = "";
  document.getElementById("copyStatus").textContent = "";

  showPage("quizScreen");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];

  document.getElementById("questionText").textContent = q.text;
  document.getElementById("counter").textContent = `Въпрос ${currentQuestion + 1} от ${questions.length}`;

  const progress = (currentQuestion / questions.length) * 100;
  document.getElementById("progressBar").style.width = `${progress}%`;
}

function answerQuestion(answer) {
  const q = questions[currentQuestion];
  const points = q[answer];

  Object.keys(points).forEach(key => {
    scores[key] += points[key];
  });

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function getSortedTraits() {
  return Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
}

function getTraitName(trait) {
  const names = {
    vision: "Визионерски",
    emotion: "Емоционално-интуитивен",
    logic: "Стратегически",
    social: "Социално-свързващ",
    action: "Действащ реализатор"
  };

  return names[trait] || trait;
}

function getTraitData(trait) {
  const data = {
    vision: {
      archetype: "Визионерът",
      power: "виждаш бъдещи възможности преди повечето хора",
      risk: "можеш да се разпиляваш между много идеи",
      business: "AI продукти, AR решения, платформи, личен бранд, визионерски проекти",
      match: "партньор, който ти дава структура, спокойствие и реални действия",
      firstMove: "избери една идея и направи малък работещ MVP",
      shadow: "най-голямата ти сянка е да живееш в бъдещето, без да заковеш първото действие днес"
    },
    emotion: {
      archetype: "Емпатичният радар",
      power: "усещаш скритите емоции, мотиви и напрежения",
      risk: "можеш да попиваш чужда енергия и да губиш фокус",
      business: "психологически тестове, консултации, съдържание, връзки, комуникация",
      match: "партньор, който е честен, стабилен и не играе емоционални игри",
      firstMove: "превърни интуицията си в метод, въпросник или услуга",
      shadow: "най-голямата ти сянка е да усещаш твърде много, но да не поставяш ясни граници"
    },
    logic: {
      archetype: "Стратегът",
      power: "режеш хаоса и виждаш структурата зад проблема",
      risk: "можеш да анализираш прекалено дълго и да забавиш старта",
      business: "SaaS, автоматизации, CRM, scoring системи, бизнес инструменти",
      match: "партньор, който уважава истината и не се плаши от директност",
      firstMove: "създай система с правила, която избира следващата стъпка вместо теб",
      shadow: "най-голямата ти сянка е да чакаш идеална логика преди да действаш"
    },
    social: {
      archetype: "Свързващият магнит",
      power: "можеш да свързваш хора, идеи и възможности",
      risk: "можеш да зависиш от чужда реакция и одобрение",
      business: "общности, B2B партньорства, посредничество, продажби, платформи",
      match: "партньор, който те подкрепя социално, но не те размива",
      firstMove: "използвай комуникацията си за 10 реални разговора с потенциални клиенти",
      shadow: "най-голямата ти сянка е да дадеш на хората власт над собствената ти посока"
    },
    action: {
      archetype: "Реализаторът",
      power: "можеш да превърнеш идея в реално действие",
      risk: "можеш да тръгнеш твърде бързо без достатъчно стратегия",
      business: "MVP услуги, локални бизнес решения, агенция, прототипи, продажби",
      match: "партньор, който не те спира, но ти помага да мислиш два хода напред",
      firstMove: "пусни първата версия, вземи обратна връзка и подобри продукта",
      shadow: "най-голямата ти сянка е да действаш бързо, но без достатъчно дълбока система"
    }
  };

  return data[trait];
}

function generateMiniReport(mainTrait, secondTrait) {
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);

  const percent = {};
  Object.keys(scores).forEach(key => {
    percent[key] = Math.round((scores[key] / total) * 100);
  });

  const main = getTraitData(mainTrait);
  const second = getTraitData(secondTrait);

  return `Име: ${user.name}
Контакт: ${user.contact}
Цел: ${user.goal}
Възраст: ${user.age}

Основен Echo тип: ${getTraitName(mainTrait)} — ${main.archetype}
Втори слой: ${getTraitName(secondTrait)} — ${second.archetype}

Разпределение:
Визия: ${scores.vision} точки / ${percent.vision}%
Емоция: ${scores.emotion} точки / ${percent.emotion}%
Логика: ${scores.logic} точки / ${percent.logic}%
Социалност: ${scores.social} точки / ${percent.social}%
Действие: ${scores.action} точки / ${percent.action}%

Ядро на личността:
Ти ${main.power}. Вторият ти слой показва, че също имаш силен елемент на: ${second.power}.

Основна сила:
Твоят профил показва, че имаш активен вътрешен модел за посока, реакция и потенциал.

Основен риск:
${main.risk}.

Бизнес посока:
${main.business}.

SoulMatch посока:
Най-подходящият партньорски тип за теб е ${main.match}.

Най-умен следващ ход:
${main.firstMove}.

Mini Echo заключение:
Това е базовият ти профил. Пълният Deep Echo Blueprint може да изкара по-дълбоки блокажи, любовен стил, 30-дневна стратегия и AI Twin база.`;
}

function generatePremiumReport(mainTrait, secondTrait) {
  const main = getTraitData(mainTrait);
  const second = getTraitData(secondTrait);

  return `DEEP ECHO BLUEPRINT — PREVIEW

1. Дълбока структура:
Твоят основен модел е ${main.archetype}. Това означава, че водещата ти сила е: ${main.power}.
Вторият слой е ${second.archetype}, което добавя допълнителна енергия: ${second.power}.

2. Скрит блокаж:
${main.shadow}.

3. Любовен стил:
Ти имаш нужда от ${main.match}. Ако си с човек, който постоянно те обърква, забавя или те кара да се съмняваш в себе си, системата ти започва да губи посока.

4. Бизнес роля:
Най-силната ти бизнес посока е: ${main.business}.
Ти не трябва просто да работиш. Трябва да влезеш в роля, в която личността ти става актив.

5. 30-дневна стратегия:
Седмица 1: изчисти една посока.
Седмица 2: направи малък продукт или оферта.
Седмица 3: покажи го на реални хора.
Седмица 4: вземи пари, обратна връзка или доказателство.

6. AI Twin база:
Този профил може да стане първи слой за AI Twin, който отговаря, мисли и предлага следващи ходове според твоя Echo модел.

7. Alien Logic:
Ти не си просто човек с характер. Ти си динамична система от сигнали, реакции, намерения и вероятности. EchoProfile не те описва. EchoProfile започва да те картографира.`;
}

function showResult() {
  showPage("resultScreen");

  document.getElementById("visionScore").textContent = scores.vision;
  document.getElementById("emotionScore").textContent = scores.emotion;
  document.getElementById("logicScore").textContent = scores.logic;
  document.getElementById("socialScore").textContent = scores.social;
  document.getElementById("actionScore").textContent = scores.action;

  const sorted = getSortedTraits();
  const mainTrait = sorted[0];
  const secondTrait = sorted[1];

  const title = `${getTraitName(mainTrait)} Echo профил`;
  finalText = generateMiniReport(mainTrait, secondTrait);
  premiumText = generatePremiumReport(mainTrait, secondTrait);

  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultIntro").textContent = `${user.name}, системата изчисли твоя Mini Echo модел.`;
  document.getElementById("finalReport").textContent = finalText;
  document.getElementById("premiumReport").textContent = premiumText;

  lastResult = {
    id: Date.now(),
    date: new Date().toLocaleString("bg-BG"),
    user: { ...user },
    scores: { ...scores },
    mainTrait,
    secondTrait,
    profile: title,
    report: finalText,
    premiumPreview: premiumText
  };

  const results = getResults();
  results.push(lastResult);
  localStorage.setItem("echoResultsV5", JSON.stringify(results));
}

function unlockPremiumPreview() {
  const code = document.getElementById("unlockCode").value.trim();

  if (code === "ECHO999") {
    document.getElementById("premiumPreview").classList.remove("hidden");
    document.getElementById("lockedPreview").classList.add("hidden");
    document.getElementById("unlockStatus").textContent = "";
    return;
  }

  document.getElementById("unlockStatus").textContent = "Грешен код.";
}

function buildLeadMessage(offer) {
  return `Здравей, искам ${offer}.

Данни:
Име: ${user.name || "няма"}
Контакт: ${user.contact || "няма"}
Цел: ${user.goal || "няма"}
Възраст: ${user.age || "няма"}

Echo резултат:
Профил: ${lastResult ? lastResult.profile : "няма направен тест"}

Точки:
Визия: ${scores.vision}
Емоция: ${scores.emotion}
Логика: ${scores.logic}
Социалност: ${scores.social}
Действие: ${scores.action}

Искам да получа пълен AI Echo анализ от SoulFlame.`;
}

function saveLeadLocal(offer) {
  const lead = {
    id: Date.now(),
    date: new Date().toLocaleString("bg-BG"),
    offer,
    user: { ...user },
    scores: { ...scores },
    profile: lastResult ? lastResult.profile : "няма направен тест"
  };

  const leads = getLeads();
  leads.push(lead);
  localStorage.setItem("echoLeadsV5", JSON.stringify(leads));

  return lead;
}

function sendRequestEmail(offer) {
  saveLeadLocal(offer);

  const message = buildLeadMessage(offer);
  copyText(message);

  const subject = encodeURIComponent("EchoProfile заявка: " + offer);
  const body = encodeURIComponent(message);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(OWNER_EMAIL)}&su=${subject}&body=${body}`;

  window.open(gmailUrl, "_blank");

  alert("Заявката е запазена, копирана и отворена в Gmail. Клиентът трябва само да натисне Send.");
}

function saveInterest(offer) {
  saveLeadLocal(offer);

  const msg = buildLeadMessage(offer);
  copyText(msg);

  alert("Заявката е запазена локално и текстът е копиран.");
}

function copyClientMessage() {
  const message = `Здравей! Създадохме EchoProfile — кратък AI психологически профил, който показва как мислиш, усещаш, решаваш и каква посока ти пасва.

Можеш да направиш безплатен Mini Echo профил, а ако искаш по-дълбок анализ, има Full AI Echo анализ с характер, връзки, бизнес посока и следващ ход.

SoulFlame EchoProfile — първа стъпка към личен AI Twin.`;

  copyText(message);
  document.getElementById("copyStatus").textContent = "Клиентският текст е копиран.";
}

function copyResult() {
  copyText(finalText);
  document.getElementById("copyStatus").textContent = "Докладът е копиран.";
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
}

function downloadTextReport() {
  if (!finalText) return;
  downloadFile(`EchoProfile-${safeFileName(user.name)}.txt`, finalText, "text/plain");
}

function restartTest() {
  document.getElementById("copyStatus").textContent = "";
  showPage("leadScreen");
}

function getResults() {
  return JSON.parse(localStorage.getItem("echoResultsV5") || "[]");
}

function getLeads() {
  return JSON.parse(localStorage.getItem("echoLeadsV5") || "[]");
}

function renderAdmin() {
  const results = getResults();
  const leads = getLeads();

  document.getElementById("totalProfiles").textContent = results.length;
  document.getElementById("totalLeads").textContent = leads.length;
  document.getElementById("statVision").textContent = results.filter(r => r.mainTrait === "vision").length;
  document.getElementById("statLogic").textContent = results.filter(r => r.mainTrait === "logic").length;

  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  if (results.length === 0) {
    historyList.innerHTML = `<div class="empty">Още няма направени профили.</div>`;
  } else {
    results.slice().reverse().forEach(r => {
      const card = document.createElement("div");
      card.className = "history-card";
      card.innerHTML = `
        <h3>${escapeHTML(r.user.name)}</h3>
        <p><strong>Дата:</strong> ${escapeHTML(r.date)}</p>
        <p><strong>Контакт:</strong> ${escapeHTML(r.user.contact)}</p>
        <p><strong>Цел:</strong> ${escapeHTML(r.user.goal)}</p>
        <p><strong>Профил:</strong> ${escapeHTML(r.profile)}</p>
        <p><strong>Точки:</strong> Визия ${r.scores.vision} | Емоция ${r.scores.emotion} | Логика ${r.scores.logic} | Социалност ${r.scores.social} | Действие ${r.scores.action}</p>
        <span class="pill">${escapeHTML(r.profile)}</span>
      `;
      historyList.appendChild(card);
    });
  }

  const leadList = document.getElementById("leadList");
  leadList.innerHTML = "";

  if (leads.length === 0) {
    leadList.innerHTML = `<div class="empty">Още няма заявки за платен анализ.</div>`;
  } else {
    leads.slice().reverse().forEach(l => {
      const card = document.createElement("div");
      card.className = "history-card";
      card.innerHTML = `
        <h3>${escapeHTML(l.offer)}</h3>
        <p><strong>Дата:</strong> ${escapeHTML(l.date)}</p>
        <p><strong>Име:</strong> ${escapeHTML(l.user.name || "няма")}</p>
        <p><strong>Контакт:</strong> ${escapeHTML(l.user.contact || "няма")}</p>
        <p><strong>Профил:</strong> ${escapeHTML(l.profile)}</p>
        <span class="pill">Заявка</span>
      `;
      leadList.appendChild(card);
    });
  }
}

function exportJSON() {
  const data = {
    results: getResults(),
    leads: getLeads()
  };

  downloadFile("echoprofile-v5-data.json", JSON.stringify(data, null, 2), "application/json");
}

function exportCSV() {
  const results = getResults();

  if (results.length === 0) {
    alert("Няма профили за CSV export.");
    return;
  }

  const header = ["date", "name", "contact", "goal", "age", "profile", "vision", "emotion", "logic", "social", "action"];
  const rows = results.map(r => [
    r.date,
    r.user.name,
    r.user.contact,
    r.user.goal,
    r.user.age,
    r.profile,
    r.scores.vision,
    r.scores.emotion,
    r.scores.logic,
    r.scores.social,
    r.scores.action
  ]);

  const csv = [header, ...rows]
    .map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\n");

  downloadFile("echoprofile-v5-results.csv", csv, "text/csv");
}

function clearAll() {
  const ok = confirm("Да изтрия ли всички локални профили и заявки?");
  if (!ok) return;

  localStorage.removeItem("echoResultsV5");
  localStorage.removeItem("echoLeadsV5");
  renderAdmin();
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function safeFileName(name) {
  return String(name || "profile").replace(/[^a-zA-Z0-9а-яА-Я-_]/g, "_");
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function openMailtoRequest(offer) {
  saveLeadLocal(offer);

  const message = buildLeadMessage(offer);
  copyText(message);

  const subject = encodeURIComponent("EchoProfile заявка: " + offer);
  const body = encodeURIComponent(message);
  const mailtoUrl = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;

  window.location.href = mailtoUrl;

  alert("Отварям email приложението. Текстът е копиран и заявката е запазена локално.");
}

function copyRequestOnly(offer) {
  saveLeadLocal(offer);

  const message = buildLeadMessage(offer);
  copyText(message);

  alert("Заявката е копирана. Може да се прати във Viber, Instagram, Messenger или имейл.");
}

async function saveProfileToServer(profile) {
  try {
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profile)
    });

    return await response.json();
  } catch (error) {
    console.warn("Profile backend save failed:", error);
    return null;
  }
}

async function saveLeadToServer(lead) {
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(lead)
    });

    return await response.json();
  } catch (error) {
    console.warn("Lead backend save failed:", error);
    return null;
  }
}

async function syncBackendData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();

    if (Array.isArray(data.profiles)) {
      localStorage.setItem("echoResultsV5", JSON.stringify(data.profiles));
    }

    if (Array.isArray(data.leads)) {
      localStorage.setItem("echoLeadsV5", JSON.stringify(data.leads));
    }

    renderAdmin();
    alert("Backend данните са синхронизирани.");
  } catch (error) {
    alert("Не мога да синхронизирам. Увери се, че сайтът е отворен през http://localhost:3000");
  }
}

if (typeof showResult === "function" && !window.__echoBackendShowResultWrapped) {
  const originalShowResult = showResult;

  showResult = function() {
    originalShowResult();

    if (lastResult) {
      saveProfileToServer(lastResult);
    }
  };

  window.__echoBackendShowResultWrapped = true;
}

if (typeof saveLeadLocal === "function" && !window.__echoBackendLeadWrapped) {
  const originalSaveLeadLocal = saveLeadLocal;

  saveLeadLocal = function(offer) {
    const lead = originalSaveLeadLocal(offer);

    if (lead) {
      saveLeadToServer(lead);
    }

    return lead;
  };

  window.__echoBackendLeadWrapped = true;
}
