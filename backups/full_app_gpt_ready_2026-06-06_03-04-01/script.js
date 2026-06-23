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

  if (page === "ai-twin") {
    return "AI Twin демо: следващият слой е GPT API по модели + памет + EchoProfile контекст.";
  }

  if (page === "echoprofile") {
    return "EchoProfile демо: тук ще започне въпросникът и scoring логиката.";
  }

  if (page === "future-twin") {
    return "Future Twin демо: тук ще симулираме бъдеща версия на човека.";
  }

  if (page === "memory") {
    return "Memory демо: тук ще се пазят важните факти и стилът на човека.";
  }

  if (t.includes("profile") || t.includes("profil") || t.includes("профил")) {
    return "EchoProfile е ядрото. Ще извадим психологически модел и от него ще се роди AI Twin.";
  }

  return "Разбрах. Това е демо отговор. Следващият слой е GPT API за AI Twin.";
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
      text: m.querySelector(".bubble").innerText
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
