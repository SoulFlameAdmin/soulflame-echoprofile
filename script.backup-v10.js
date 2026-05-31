const OWNER_EMAIL = "stere0metal360@gmail.com";
const FULL_UNLOCK_CODE = "FULL999";

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

const screens = ["landingScreen", "leadScreen", "quizScreen", "resultScreen", "pricingScreen", "adminScreen", "clientReportScreen"];

let currentQuestion = 0;
let finalText = "";
let fullText = "";
let clientReportText = "";
let currentModalText = "";
let lastResult = null;
let adminProfiles = [];
let adminLeads = [];

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
    loadBackendData();
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
  fullText = "";
  clientReportText = "";
  lastResult = null;
  scores = { vision: 0, emotion: 0, logic: 0, social: 0, action: 0 };

  document.getElementById("fullEchoBox").classList.add("hidden");
  document.getElementById("fullLockBox").classList.remove("hidden");
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

function getSortedTraits(scoreObj = scores) {
  return Object.keys(scoreObj).sort((a, b) => Number(scoreObj[b] || 0) - Number(scoreObj[a] || 0));
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
      shadow: "живееш твърде много в бъдещето и понякога изпускаш първата земна стъпка"
    },
    emotion: {
      archetype: "Емпатичният радар",
      power: "усещаш скритите емоции, мотиви и напрежения",
      risk: "можеш да попиваш чужда енергия и да губиш фокус",
      business: "психологически тестове, консултации, съдържание, връзки, комуникация",
      match: "партньор, който е честен, стабилен и не играе емоционални игри",
      firstMove: "превърни интуицията си в метод, въпросник или услуга",
      shadow: "усещаш твърде много, но не винаги поставяш ясни граници"
    },
    logic: {
      archetype: "Стратегът",
      power: "режеш хаоса и виждаш структурата зад проблема",
      risk: "можеш да анализираш прекалено дълго и да забавиш старта",
      business: "SaaS, автоматизации, CRM, scoring системи, бизнес инструменти",
      match: "партньор, който уважава истината и не се плаши от директност",
      firstMove: "създай система с правила, която избира следващата стъпка вместо теб",
      shadow: "чакаш идеална логика, преди да действаш"
    },
    social: {
      archetype: "Свързващият магнит",
      power: "можеш да свързваш хора, идеи и възможности",
      risk: "можеш да зависиш от чужда реакция и одобрение",
      business: "общности, B2B партньорства, посредничество, продажби, платформи",
      match: "партньор, който те подкрепя социално, но не те размива",
      firstMove: "използвай комуникацията си за 10 реални разговора с потенциални клиенти",
      shadow: "даваш на хората прекалено голяма власт над собствената си посока"
    },
    action: {
      archetype: "Реализаторът",
      power: "можеш да превърнеш идея в реално действие",
      risk: "можеш да тръгнеш твърде бързо без достатъчно стратегия",
      business: "MVP услуги, локални бизнес решения, агенция, прототипи, продажби",
      match: "партньор, който не те спира, но ти помага да мислиш два хода напред",
      firstMove: "пусни първата версия, вземи обратна връзка и подобри продукта",
      shadow: "действаш бързо, но понякога без достатъчно дълбока система"
    }
  };

  return data[trait];
}

function getPercent(scoreObj) {
  const total = Object.values(scoreObj).reduce((sum, value) => sum + Number(value || 0), 0) || 1;
  const percent = {};
  Object.keys(scoreObj).forEach(key => {
    percent[key] = Math.round((Number(scoreObj[key] || 0) / total) * 100);
  });
  return percent;
}

function generateMiniReport(profile) {
  const scoreObj = profile?.scores || scores;
  const userData = profile?.user || user;
  const sorted = getSortedTraits(scoreObj);
  const mainTrait = profile?.mainTrait || sorted[0];
  const secondTrait = profile?.secondTrait || sorted[1];
  const percent = getPercent(scoreObj);

  const main = getTraitData(mainTrait);
  const second = getTraitData(secondTrait);

  return `MINI ECHO REPORT

Име: ${userData.name}
Контакт: ${userData.contact}
Цел: ${userData.goal}
Възраст: ${userData.age}

Основен Echo тип: ${getTraitName(mainTrait)} — ${main.archetype}
Втори слой: ${getTraitName(secondTrait)} — ${second.archetype}

Разпределение:
Визия: ${scoreObj.vision} точки / ${percent.vision}%
Емоция: ${scoreObj.emotion} точки / ${percent.emotion}%
Логика: ${scoreObj.logic} точки / ${percent.logic}%
Социалност: ${scoreObj.social} точки / ${percent.social}%
Действие: ${scoreObj.action} точки / ${percent.action}%

Ядро:
Ти ${main.power}. Вторият ти слой добавя: ${second.power}.

Основна сила:
Твоят профил показва активен вътрешен модел за посока, реакция и потенциал.

Основен риск:
${main.risk}.

Бизнес посока:
${main.business}.

SoulMatch посока:
${main.match}.

Следващ ход:
${main.firstMove}.

Mini заключение:
Това е базовият ти профил. Full Echo отключва блокажи, връзки, бизнес стратегия, 30-дневен план и AI Twin база.`;
}

function generateFullReport(profile) {
  const scoreObj = profile?.scores || scores;
  const userData = profile?.user || user;
  const sorted = getSortedTraits(scoreObj);
  const mainTrait = profile?.mainTrait || sorted[0];
  const secondTrait = profile?.secondTrait || sorted[1];
  const weakestTrait = sorted[sorted.length - 1];
  const percent = getPercent(scoreObj);

  const main = getTraitData(mainTrait);
  const second = getTraitData(secondTrait);
  const weak = getTraitData(weakestTrait);

  return `FULL AI ECHO ANALYSIS
SoulFlame EchoProfile V10

Име: ${userData.name}
Контакт: ${userData.contact}
Цел: ${userData.goal}
Възраст: ${userData.age}

ОСНОВЕН ECHO ТИП:
${getTraitName(mainTrait)} — ${main.archetype}

ВТОРИ СЛОЙ:
${getTraitName(secondTrait)} — ${second.archetype}

НАЙ-СЛАБ СЛОЙ:
${getTraitName(weakestTrait)} — ${weak.archetype}

ТОЧКИ:
Визия: ${scoreObj.vision} / ${percent.vision}%
Емоция: ${scoreObj.emotion} / ${percent.emotion}%
Логика: ${scoreObj.logic} / ${percent.logic}%
Социалност: ${scoreObj.social} / ${percent.social}%
Действие: ${scoreObj.action} / ${percent.action}%

1. ДЪЛБОКО ЯДРО НА ЛИЧНОСТТА
Твоят водещ модел е ${main.archetype}. Това означава, че най-силно функционираш чрез способността да ${main.power}.
Вторият слой — ${second.archetype} — добавя допълнителна сила: ${second.power}.

Ти не си един тип. Ти си комбинация от водеща енергия и вторичен механизъм.
Първият слой показва как тръгваш. Вторият показва как се стабилизираш или усложняваш.

2. ОСНОВНА СИЛА
${main.power}.
Тази сила може да стане продукт, услуга, връзка, бизнес позиция или личен метод.

3. СКРИТ БЛОКАЖ
${main.shadow}.
Това е мястото, където най-голямата ти сила може да се превърне в слабост, ако няма система.

4. НАЙ-СЛАБ СЛОЙ
Най-слабият слой е ${weak.archetype}. Това не значи, че го нямаш. Значи, че трябва да го тренираш съзнателно.
Ако го развиеш, профилът ти става по-балансиран и по-опасно ефективен.

5. БИЗНЕС ПОСОКА
${main.business}.

Най-добрата бизнес логика за теб:
- не започвай с огромна система
- започни с малък продукт
- вземи обратна връзка
- превърни го в повторима оферта
- после го автоматизирай

6. ВРЪЗКИ И ПАРТНЬОРСТВО
Най-подходящият партньорски тип за теб е: ${main.match}.
Ако си с човек, който атакува основната ти сила, ще губиш енергия.
Ако си с човек, който я стабилизира, ще растеш по-бързо.

7. ПСИХОЛОГИЧЕСКИ РИСК
${main.risk}.
Рискът не е враг. Той е сигнал къде трябва да сложиш структура.

8. 7-ДНЕВЕН ПЛАН
Ден 1: избери една конкретна посока.
Ден 2: напиши кратка оферта с ясен резултат.
Ден 3: покажи я на 5 реални човека.
Ден 4: събери реакциите без да спориш.
Ден 5: подобри офертата.
Ден 6: направи първа продажба, заявка или тест.
Ден 7: запиши какво работи и го превърни в система.

9. 30-ДНЕВНА СТРАТЕГИЯ
Седмица 1: диагностика и фокус.
Седмица 2: MVP или мини оферта.
Седмица 3: 20 реални разговора.
Седмица 4: продажба, подобрение, повторение.

10. AI TWIN БАЗА
Този Echo профил може да стане първи слой за AI Twin.
За пълен AI Twin ще трябват:
- стил на писане
- глас
- снимки/визия
- лични правила
- ценности
- решения в реални ситуации
- типични реакции
- граници и цели

11. FINAL VERDICT
Твоят най-силен ход не е просто да се разбереш.
Твоят най-силен ход е да превърнеш себе си в система:
как мислиш, как избираш, как продаваш, как обичаш и как действаш.

ALIEN LOGIC:
Човекът не е статична личност. Човекът е динамична програма от вероятности.
EchoProfile не те описва. EchoProfile започва да те картографира.`;
}

async function showResult() {
  showPage("resultScreen");

  document.getElementById("visionScore").textContent = scores.vision;
  document.getElementById("emotionScore").textContent = scores.emotion;
  document.getElementById("logicScore").textContent = scores.logic;
  document.getElementById("socialScore").textContent = scores.social;
  document.getElementById("actionScore").textContent = scores.action;

  const sorted = getSortedTraits(scores);
  const mainTrait = sorted[0];
  const secondTrait = sorted[1];

  const title = `${getTraitName(mainTrait)} Echo профил`;

  lastResult = {
    id: Date.now(),
    date: new Date().toLocaleString("bg-BG"),
    user: { ...user },
    scores: { ...scores },
    mainTrait,
    secondTrait,
    profile: title
  };

  finalText = generateMiniReport(lastResult);
  fullText = generateFullReport(lastResult);

  lastResult.report = finalText;
  lastResult.fullReport = fullText;

  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultIntro").textContent = `${user.name}, системата изчисли твоя Mini Echo модел.`;
  document.getElementById("finalReport").textContent = finalText;
  document.getElementById("fullEchoReport").textContent = fullText;

  await saveProfileToServer(lastResult);
}

function unlockFullEcho() {
  const code = document.getElementById("fullUnlockCode").value.trim();

  if (code === FULL_UNLOCK_CODE) {
    document.getElementById("fullEchoBox").classList.remove("hidden");
    document.getElementById("fullLockBox").classList.add("hidden");
    document.getElementById("unlockStatus").textContent = "";
    return;
  }

  document.getElementById("unlockStatus").textContent = "Грешен код.";
}

function openClientReportFromCurrent() {
  if (!lastResult) return;
  const report = fullText || generateFullReport(lastResult);
  openClientReport(lastResult, report);
}

function printClientReportFromCurrent() {
  openClientReportFromCurrent();
  setTimeout(() => window.print(), 300);
}

function openClientReport(profile, report) {
  clientReportText = report || profile.fullReport || generateFullReport(profile);
  document.getElementById("clientReportTitle").textContent = profile.profile || "Full Echo Report";
  document.getElementById("clientReportText").textContent = clientReportText;
  showPage("clientReportScreen");
}

function copyClientReport() {
  copyText(clientReportText);
  alert("Client Report е копиран.");
}

function downloadClientReport() {
  downloadFile("client-full-echo-report.txt", clientReportText, "text/plain");
}

function copyFullReport() {
  copyText(fullText);
  document.getElementById("copyStatus").textContent = "Full докладът е копиран.";
}

function downloadFullReport() {
  downloadFile("full-ai-echo-analysis.txt", fullText, "text/plain");
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

async function saveLeadLocal(offer) {
  const lead = {
    id: Date.now(),
    date: new Date().toLocaleString("bg-BG"),
    offer,
    user: { ...user },
    scores: { ...scores },
    profile: lastResult ? lastResult.profile : "няма направен тест"
  };

  await saveLeadToServer(lead);
  return lead;
}

async function sendRequestEmail(offer) {
  await saveLeadLocal(offer);

  const message = buildLeadMessage(offer);
  copyText(message);

  const subject = encodeURIComponent("EchoProfile заявка: " + offer);
  const body = encodeURIComponent(message);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(OWNER_EMAIL)}&su=${subject}&body=${body}`;

  window.open(gmailUrl, "_blank");
  alert("Заявката е записана, копирана и отворена в Gmail.");
}

async function copyRequestOnly(offer) {
  await saveLeadLocal(offer);
  copyText(buildLeadMessage(offer));
  alert("Заявката е копирана и записана.");
}

function copyClientMessage() {
  const message = `Здравей! Създадохме EchoProfile — AI психологически профил, който показва как мислиш, усещаш, решаваш и каква посока ти пасва.

Mini Echo е безплатен. Full Echo дава пълен анализ: характер, връзки, бизнес посока, блокажи и 30-дневен план.

SoulFlame EchoProfile — първа стъпка към личен AI Twin.`;

  copyText(message);
  document.getElementById("copyStatus").textContent = "Клиентският текст е копиран.";
}

function copyResult() {
  copyText(finalText);
  document.getElementById("copyStatus").textContent = "Mini докладът е копиран.";
}

function downloadTextReport() {
  downloadFile(`Mini-Echo-${safeFileName(user.name)}.txt`, finalText, "text/plain");
}

function restartTest() {
  document.getElementById("copyStatus").textContent = "";
  showPage("leadScreen");
}

async function saveProfileToServer(profile) {
  try {
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead)
    });
    return await response.json();
  } catch (error) {
    console.warn("Lead backend save failed:", error);
    return null;
  }
}

async function loadBackendData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();

    adminProfiles = Array.isArray(data.profiles) ? data.profiles : [];
    adminLeads = Array.isArray(data.leads) ? data.leads : [];

    renderAdminStats();
    renderAdminTables();
  } catch {
    alert("Backend не е активен. Отвори сайта през http://localhost:3000");
  }
}

function renderAdminStats() {
  document.getElementById("totalProfiles").textContent = adminProfiles.length;
  document.getElementById("totalLeads").textContent = adminLeads.length;
  document.getElementById("statVision").textContent = adminProfiles.filter(r => r.mainTrait === "vision").length;
  document.getElementById("statLogic").textContent = adminProfiles.filter(r => r.mainTrait === "logic").length;
  document.getElementById("statAction").textContent = adminProfiles.filter(r => r.mainTrait === "action").length;
}

function renderAdminTables() {
  const search = (document.getElementById("adminSearch")?.value || "").toLowerCase();
  const trait = document.getElementById("adminTraitFilter")?.value || "all";

  const filteredProfiles = adminProfiles.filter(item => {
    const haystack = [
      item.date,
      item.user?.name,
      item.user?.contact,
      item.user?.goal,
      item.profile,
      item.mainTrait
    ].join(" ").toLowerCase();

    const matchesSearch = haystack.includes(search);
    const matchesTrait = trait === "all" || item.mainTrait === trait;

    return matchesSearch && matchesTrait;
  });

  const profilesTable = document.getElementById("profilesTable");
  profilesTable.innerHTML = "";

  if (filteredProfiles.length === 0) {
    profilesTable.innerHTML = `<tr><td colspan="7" class="empty-row">Няма намерени профили.</td></tr>`;
  } else {
    filteredProfiles.slice().reverse().forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHTML(item.date || item.serverSavedAt || "")}</td>
        <td><strong>${escapeHTML(item.user?.name || "")}</strong></td>
        <td>${escapeHTML(item.user?.contact || "")}</td>
        <td>${escapeHTML(item.user?.goal || "")}</td>
        <td><span class="pill">${escapeHTML(item.profile || "")}</span></td>
        <td>
          V:${item.scores?.vision ?? 0}
          E:${item.scores?.emotion ?? 0}
          L:${item.scores?.logic ?? 0}
          S:${item.scores?.social ?? 0}
          A:${item.scores?.action ?? 0}
        </td>
        <td>
          <div class="row-actions">
            <button class="mini-action" onclick="openMiniReport(${Number(item.id)})">Mini</button>
            <button class="mini-action" onclick="openFullReport(${Number(item.id)})">Full</button>
            <button class="mini-action" onclick="openClientReportById(${Number(item.id)})">Client</button>
          </div>
        </td>
      `;
      profilesTable.appendChild(tr);
    });
  }

  const filteredLeads = adminLeads.filter(item => {
    const haystack = [
      item.date,
      item.offer,
      item.user?.name,
      item.user?.contact,
      item.profile
    ].join(" ").toLowerCase();

    return haystack.includes(search);
  });

  const leadsTable = document.getElementById("leadsTable");
  leadsTable.innerHTML = "";

  if (filteredLeads.length === 0) {
    leadsTable.innerHTML = `<tr><td colspan="5" class="empty-row">Няма намерени заявки.</td></tr>`;
  } else {
    filteredLeads.slice().reverse().forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHTML(item.date || item.serverSavedAt || "")}</td>
        <td><strong>${escapeHTML(item.offer || "")}</strong></td>
        <td>${escapeHTML(item.user?.name || "")}</td>
        <td>${escapeHTML(item.user?.contact || "")}</td>
        <td><span class="pill">${escapeHTML(item.profile || "")}</span></td>
      `;
      leadsTable.appendChild(tr);
    });
  }
}

function findProfile(id) {
  return adminProfiles.find(profile => Number(profile.id) === Number(id));
}

function openMiniReport(id) {
  const item = findProfile(id);
  if (!item) return;

  currentModalText = item.report || generateMiniReport(item);
  document.getElementById("modalTitle").textContent = item.profile || "Mini Echo";
  document.getElementById("modalReport").textContent = currentModalText;
  document.getElementById("reportModal").classList.remove("hidden");
}

function openFullReport(id) {
  const item = findProfile(id);
  if (!item) return;

  currentModalText = item.fullReport || generateFullReport(item);
  document.getElementById("modalTitle").textContent = "Full AI Echo Analysis";
  document.getElementById("modalReport").textContent = currentModalText;
  document.getElementById("reportModal").classList.remove("hidden");
}

function openClientReportById(id) {
  const item = findProfile(id);
  if (!item) return;

  const report = item.fullReport || generateFullReport(item);
  openClientReport(item, report);
}

function closeModal() {
  document.getElementById("reportModal").classList.add("hidden");
}

function copyModalReport() {
  const text = document.getElementById("modalReport").textContent || currentModalText || "";
  copyText(text);
  alert("Докладът е копиран.");
}

function downloadModalReport() {
  const text = document.getElementById("modalReport").textContent || currentModalText || "";
  downloadFile("echo-report.txt", text, "text/plain");
}

function exportJSON() {
  downloadFile("echoprofile-v10-data.json", JSON.stringify({
    profiles: adminProfiles,
    leads: adminLeads
  }, null, 2), "application/json");
}

function exportCSV() {
  if (adminProfiles.length === 0) {
    alert("Няма профили за CSV export.");
    return;
  }

  const header = ["date", "name", "contact", "goal", "age", "profile", "vision", "emotion", "logic", "social", "action"];
  const rows = adminProfiles.map(r => [
    r.date || r.serverSavedAt || "",
    r.user?.name || "",
    r.user?.contact || "",
    r.user?.goal || "",
    r.user?.age || "",
    r.profile || "",
    r.scores?.vision ?? 0,
    r.scores?.emotion ?? 0,
    r.scores?.logic ?? 0,
    r.scores?.social ?? 0,
    r.scores?.action ?? 0
  ]);

  const csv = [header, ...rows]
    .map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\n");

  downloadFile("echoprofile-v10-results.csv", csv, "text/csv");
}

async function clearAll() {
  const ok = confirm("Да изтрия ли всички backend профили и заявки?");
  if (!ok) return;

  try {
    await fetch("/api/data", { method: "DELETE" });
    await loadBackendData();
    alert("Всички данни са изчистени.");
  } catch {
    alert("Не успях да изчистя backend данните.");
  }
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
