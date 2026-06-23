const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const bottomDrawer = document.getElementById("bottomDrawer");
const overlay = document.getElementById("overlay");
const modulePreview = document.getElementById("modulePreview");
const drawerHint = document.getElementById("drawerHint");
const centerBrand = document.getElementById("centerBrand");

function pageKey() {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  return file.replace(".html", "") || "index";
}

function storageKey() {
  return "sf_chat_" + pageKey();
}

const optionData = {
  "EchoProfile": {
    title: "EchoProfile",
    body: "Първата реална стъпка. Echo задава въпроси, прави scoring и създава психологически отпечатък за AI Twin."
  },
  "AI Twin": {
    title: "AI Twin",
    body: "Дигиталният двойник използва EchoProfile, памет, стил, глас и поведение, за да отговаря като лична AI версия."
  },
  "Future Twin": {
    title: "Future Twin",
    body: "Симулира твоя бъдеща версия: ти след 1 година, 5 години или ако продължиш по текущия път."
  },
  "Memory": {
    title: "Memory",
    body: "Лична памет: важни факти, цели, страхове, стил на писане, решения и история на разговорите."
  },
  "SoulMatch": {
    title: "SoulMatch",
    body: "Сравнява EchoProfile между хора и показва съвместимост, риск, динамика и потенциал."
  },
  "AR EchoCard": {
    title: "AR EchoCard",
    body: "AR визитка/карта, през която човек може да покаже своя AI Twin пред други хора."
  },
  "Settings": {
    title: "Settings",
    body: "Настройки за privacy, език, стил, API режим, изтриване на памет и контрол на личните данни."
  }
};

function updateCenterBrand() {
  if (!centerBrand) return;

  const messages = Array.from(document.querySelectorAll(".message"));
  const hasUser = messages.some(m => m.classList.contains("user"));

  if (messages.length > 1 || hasUser) {
    centerBrand.classList.add("hidden");
  } else {
    centerBrand.classList.remove("hidden");
  }
}

function toggleDrawer(forceState) {
  if (!bottomDrawer || !overlay) return;

  const shouldOpen = typeof forceState === "boolean"
    ? forceState
    : !bottomDrawer.classList.contains("open");

  if (shouldOpen) {
    bottomDrawer.classList.add("open");
    overlay.classList.add("open");
    if (drawerHint) drawerHint.textContent = "затвори";
  } else {
    bottomDrawer.classList.remove("open");
    overlay.classList.remove("open");
    if (drawerHint) drawerHint.textContent = "плъзни / натисни";
  }
}

function addMessage(role, text) {
  if (!chatBox) return;

  const message = document.createElement("div");
  message.className = `message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role === "user" ? "U" : "E";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  message.appendChild(avatar);
  message.appendChild(bubble);
  chatBox.appendChild(message);

  chatBox.scrollTop = chatBox.scrollHeight;
  saveChat();
  updateCenterBrand();
}

function sendMessage() {
  if (!chatInput) return;

  const text = chatInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  chatInput.value = "";

  setTimeout(() => {
    addMessage("assistant", demoReply(text));
  }, 350);
}

function demoReply(text) {
  const t = text.toLowerCase();
  const page = pageKey();

  if (t.includes("profile") || t.includes("profil") || t.includes("профил")) {
    return "EchoProfile е ядрото. Ще ти задам въпроси, ще извадя психологически модел и от него ще се роди AI Twin.";
  }

  if (t.includes("future") || t.includes("бъде") || t.includes("budesht")) {
    return "Future Twin режим: мога да симулирам твоя бъдеща версия и да ти покажа накъде водят сегашните избори.";
  }

  if (t.includes("memory") || t.includes("памет") || t.includes("pamet")) {
    return "Memory режим: пълната версия ще пази важните факти за човека в защитена база, не в браузъра.";
  }

  if (t.includes("soulmatch") || t.includes("match")) {
    return "SoulMatch ще използва EchoProfile, за да сравнява хора по емоционална динамика, стил и съвместимост.";
  }

  if (page === "ai-twin") {
    return "AI Twin демо: следващият слой е GPT API по модели, памет и стил на човека.";
  }

  return "Разбрах. Това е демо отговор. Следващата стъпка е GPT API layer за AI Twin страницата.";
}

function clearChat() {
  localStorage.removeItem(storageKey());

  if (!chatBox) return;

  const firstBubble = document.querySelector(".message.assistant .bubble");
  const firstText = firstBubble
    ? firstBubble.textContent.trim()
    : "Здравей. Аз съм Echo — AI Twin слой на SoulFlame.";

  chatBox.innerHTML = "";
  addMessage("assistant", firstText);
  updateCenterBrand();
}

function saveChat() {
  if (!chatBox) return;

  const messages = [];
  document.querySelectorAll(".message").forEach(m => {
    messages.push({
      role: m.classList.contains("user") ? "user" : "assistant",
      text: m.querySelector(".bubble").innerText
    });
  });

  localStorage.setItem(storageKey(), JSON.stringify(messages));
}

function loadChat() {
  const saved = localStorage.getItem(storageKey());

  if (!saved) {
    updateCenterBrand();
    return;
  }

  try {
    const messages = JSON.parse(saved);
    chatBox.innerHTML = "";

    messages.forEach(m => {
      const message = document.createElement("div");
      message.className = `message ${m.role}`;

      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.textContent = m.role === "user" ? "U" : "E";

      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.textContent = m.text;

      message.appendChild(avatar);
      message.appendChild(bubble);
      chatBox.appendChild(message);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
    updateCenterBrand();
  } catch (e) {
    console.warn("Chat load error", e);
    updateCenterBrand();
  }
}

function openOption(name) {
  const data = optionData[name];
  if (!data || !modulePreview) return;

  modulePreview.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.body}</p>
  `;

  addMessage("assistant", `${data.title}: ${data.body}`);
}

if (chatInput) {
  chatInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}

loadChat();
