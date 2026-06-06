const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const bottomDrawer = document.getElementById("bottomDrawer");
const overlay = document.getElementById("overlay");
const modulePreview = document.getElementById("modulePreview");
const drawerHint = document.getElementById("drawerHint");
const centerBrand = document.getElementById("centerBrand");
const modelSelect = document.getElementById("modelSelect");

function pageKey() {
  const fromBody = document.body?.dataset?.page;
  if (fromBody) return fromBody;

  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  return file.replace(".html", "") || "index";
}

function storageKey() {
  return "sf_chat_" + pageKey();
}

function isFileMode() {
  return location.protocol === "file:";
}

function getSelectedModel() {
  if (modelSelect && modelSelect.value) return modelSelect.value;
  return localStorage.getItem("sf_selected_model") || "gpt-4o-mini";
}

if (modelSelect) {
  const savedModel = localStorage.getItem("sf_selected_model");
  if (savedModel) modelSelect.value = savedModel;

  modelSelect.addEventListener("change", () => {
    localStorage.setItem("sf_selected_model", modelSelect.value);
    addMessage("assistant", "Model switched to: " + modelSelect.value);
  });
}

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

  return message;
}

function setMessageText(messageEl, text) {
  const bubble = messageEl?.querySelector(".bubble");
  if (bubble) bubble.textContent = text;
  saveChat();
}

async function sendMessage() {
  if (!chatInput) return;

  const text = chatInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  chatInput.value = "";

  const loading = addMessage("assistant", "Echo мисли...");

  try {
    const reply = await getAssistantReply(text);
    setMessageText(loading, reply);
  } catch (err) {
    console.error(err);
    setMessageText(
      loading,
      "API грешка или липсва OPENAI_API_KEY. На localhost/file режим работя като демо. На Vercel сложи OPENAI_API_KEY в Environment Variables."
    );
  }
}

async function getAssistantReply(text) {
  const page = pageKey();

  if (isFileMode()) {
    return demoReply(text);
  }

  if (page !== "ai-twin") {
    return demoReply(text);
  }

  const history = getChatHistoryForApi();

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      page,
      model: getSelectedModel(),
      message: text,
      history
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "API request failed");
  }

  return data.reply || demoReply(text);
}

function getChatHistoryForApi() {
  const messages = [];

  document.querySelectorAll(".message").forEach(m => {
    const role = m.classList.contains("user") ? "user" : "assistant";
    const text = m.querySelector(".bubble")?.innerText || "";
    if (text && text !== "Echo мисли...") {
      messages.push({ role, content: text });
    }
  });

  return messages.slice(-12);
}

function demoReply(text) {
  const t = text.toLowerCase();
  const page = pageKey();

  if (page === "ai-twin") {
    return "AI Twin демо: GPT API endpoint вече е подготвен. Качи във Vercel, сложи OPENAI_API_KEY и този чат ще говори през избрания модел.";
  }

  if (page === "echoprofile") {
    return "EchoProfile демо: тук ще започне въпросникът и scoring логиката.";
  }

  if (page === "future-twin") {
    return "Future Twin демо: тук ще симулираме бъдеща версия на човека.";
  }

  if (page === "memory") {
    return "Memory демо: тук ще пазим важните факти и стила на човека.";
  }

  if (page === "soulmatch") {
    return "SoulMatch демо: тук ще сравняваме EchoProfile между хора.";
  }

  if (t.includes("profile") || t.includes("profil") || t.includes("профил")) {
    return "EchoProfile е ядрото. Ще извадим психологически модел и от него ще се роди AI Twin.";
  }

  return "Разбрах. Това е демо отговор. Истинският GPT API е включен за AI Twin страницата след добавяне на OPENAI_API_KEY.";
}

function clearChat() {
  localStorage.removeItem(storageKey());

  if (!chatBox) return;

  const initialBubble = document.querySelector(".message.assistant .bubble");
  const initialText = initialBubble
    ? initialBubble.textContent.trim()
    : "Здравей. Аз съм Echo.";

  chatBox.innerHTML = "";
  addMessage("assistant", initialText);
  updateCenterBrand();
}

function saveChat() {
  if (!chatBox) return;

  const messages = [];

  document.querySelectorAll(".message").forEach(m => {
    messages.push({
      role: m.classList.contains("user") ? "user" : "assistant",
      text: m.querySelector(".bubble")?.innerText || ""
    });
  });

  localStorage.setItem(storageKey(), JSON.stringify(messages));
}

function loadChat() {
  if (!chatBox) return;

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

if (chatInput) {
  chatInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") sendMessage();
  });
}

loadChat();
