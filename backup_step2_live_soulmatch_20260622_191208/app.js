const conversations = [
  { name: "Anna", message: "Your match is 94% 🔥", badge: 2, active: true },
  { name: "Mira", message: "Искам да пробвам Echo Test", badge: 1, active: false },
  { name: "Victoria", message: "Looks interesting!", badge: 0, active: false },
  { name: "SoulMatch AI", message: "Daily question is ready", badge: 3, active: false },
  { name: "Test Room", message: "MVP chat is working", badge: 0, active: false },
  { name: "New Match", message: "88% values match", badge: 1, active: false }
];

const conversationList = document.getElementById("conversationList");
const chatTitle = document.getElementById("chatTitle");
const chatBody = document.getElementById("chatBody");

function renderConversations() {
  conversationList.innerHTML = conversations.map((item, index) => `
    <div class="conversation-item ${item.active ? "active" : ""}" onclick="openConversation(${index})">
      <div class="avatar">${item.name[0]}</div>
      <div>
        <h4>${item.name}</h4>
        <p>${item.message}</p>
      </div>
      ${item.badge > 0 ? `<div class="badge">${item.badge}</div>` : `<div></div>`}
    </div>
  `).join("");
}

function openConversation(index) {
  conversations.forEach(item => item.active = false);
  conversations[index].active = true;
  chatTitle.textContent = conversations[index].name;
  renderConversations();
}

renderConversations();

document.querySelectorAll(".menu-btn").forEach(button => {
  button.addEventListener("click", () => {
    const page = button.dataset.page;

    document.querySelectorAll(".menu-btn").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".page").forEach(section => section.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(page).classList.add("active");
  });
});

const openMenu = document.getElementById("openMenu");
const sidebar = document.querySelector(".sidebar");

if (openMenu) {
  openMenu.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}

const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");

messageForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = messageInput.value.trim();
  if (!text) return;

  const message = document.createElement("div");
  message.className = "msg me";
  message.innerHTML = `
    <div>
      <div class="bubble">${escapeHtml(text)}</div>
      <span>now</span>
    </div>
  `;

  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
  messageInput.value = "";

  setTimeout(() => {
    const reply = document.createElement("div");
    reply.className = "msg other";
    reply.innerHTML = `
      <div class="avatar small">🔥</div>
      <div>
        <div class="bubble">SoulMatch AI: следващата стъпка е реален backend — users, profiles, friend requests, messages и matches.</div>
        <span>now</span>
      </div>
    `;

    chatBody.appendChild(reply);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 550);
});

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function(match) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[match];
  });
}

function calculateEcho() {
  const result = document.getElementById("echoResult");
  result.style.display = "block";
  result.innerHTML = `
    <strong>Echo Profile:</strong> Deep Connector 🔥<br>
    <strong>Compatibility potential:</strong> 87%<br>
    <strong>Core values:</strong> loyalty, depth, emotional clarity<br>
    <strong>Next:</strong> добави още daily questions за по-точен matching.
  `;
}

function saveProfile() {
  const profile = {
    name: document.getElementById("nameInput").value || "Dimitar",
    age: document.getElementById("ageInput").value || "",
    city: document.getElementById("cityInput").value || "",
    bio: document.getElementById("bioInput").value || ""
  };

  localStorage.setItem("soulmatch_profile", JSON.stringify(profile));
  document.getElementById("miniName").textContent = profile.name;

  const result = document.getElementById("profileResult");
  result.style.display = "block";
  result.innerHTML = `
    <strong>Profile saved locally.</strong><br>
    Име: ${escapeHtml(profile.name)}<br>
    Следваща стъпка: login + database в Supabase.
  `;
}

function loadProfile() {
  const saved = localStorage.getItem("soulmatch_profile");
  if (!saved) return;

  const profile = JSON.parse(saved);

  document.getElementById("nameInput").value = profile.name || "";
  document.getElementById("ageInput").value = profile.age || "";
  document.getElementById("cityInput").value = profile.city || "";
  document.getElementById("bioInput").value = profile.bio || "";
  document.getElementById("miniName").textContent = profile.name || "Dimitar";
}

loadProfile();
