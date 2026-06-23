(function(){
  "use strict";
  function qs(s){return document.querySelector(s)}
  function qsa(s){return Array.from(document.querySelectorAll(s))}
  function isAI(){return Boolean(qs("#aitwin.page.active")||qs(".menu-btn.active[data-page='aitwin'],[data-page='aitwin'].active"))}
  function ensure(){
    if(!qs(".sf-v83-backdrop")){const b=document.createElement("div");b.className="sf-v83-backdrop";b.onclick=close;document.body.appendChild(b)}
    if(!qs(".sf-v83-edge")){const e=document.createElement("button");e.className="sf-v83-edge";e.textContent="▶";e.onclick=toggle;document.body.appendChild(e)}
    if(!qs(".sf-v83-drawer")){
      const d=document.createElement("aside");d.className="sf-v83-drawer";d.innerHTML=`
        <div class="sf-v83-head"><div class="sf-v83-brand"><div class="sf-v83-logo">🔥</div><div><strong>SoulFlame</strong><small>CMD Twin Tree</small></div></div><button class="sf-v83-close">×</button></div>
        <div class="sf-v83-tree">
          <div class="sf-v83-root">SoulFlame\\</div>
          <div class="sf-v83-section">├─ SoulMatch\\</div>
          <button class="sf-v83-line" data-action="page" data-page="chat">│  ├─ 💬 Messages</button>
          <button class="sf-v83-line" data-action="page" data-page="matches">│  ├─ ❤️ Matches</button>
          <button class="sf-v83-line" data-action="page" data-page="aitwin">│  ├─ 🤖 AI Twin</button>
          <button class="sf-v83-line" data-action="page" data-page="profile">│  ├─ 🧍 Profile</button>
          <button class="sf-v83-line" data-action="page" data-page="daily">│  └─ 🔥 Daily</button>
          <div class="sf-v83-section">├─ AI Echo\\</div>
          <button class="sf-v83-line" data-action="echo" data-panel="profilePanel">│  ├─ 👤 Profile</button>
          <button class="sf-v83-line" data-action="echo" data-panel="echoPanel">│  ├─ 🧠 EchoProfile</button>
          <button class="sf-v83-line" data-action="echo" data-panel="chatPanel">│  └─ 💬 GPT Chat</button>
          <div class="sf-v83-section">├─ User\\</div>
          <button class="sf-v83-line" data-action="echo" data-panel="userPanel">│  ├─ 🧩 Connectors</button>
          <button class="sf-v83-line" data-action="echo" data-panel="userPanel">│  ├─ 🤝 Twin+</button>
          <button class="sf-v83-line" data-action="open" data-url="/api/health">│  └─ /api/health</button>
          <div class="sf-v83-section sf-v83-admin">└─ ADMIN\\ 🔒</div>
          <button class="sf-v83-line sf-v83-admin" data-action="admin">   ├─ Unlock Admin Panel</button>
          <button class="sf-v83-line sf-v83-admin" data-action="echo" data-panel="adminPanel">   ├─ All Twins</button>
          <button class="sf-v83-line sf-v83-admin" data-action="echo" data-panel="adminPanel">   └─ Bugs / Commands / Errors</button>
        </div>`;
      document.body.appendChild(d);
      d.querySelector(".sf-v83-close").onclick=close;
      d.querySelectorAll("[data-action]").forEach(btn=>btn.onclick=()=>handle(btn));
    }
  }
  function open(){if(!isAI())return;ensure();document.body.classList.add("sf-v83-drawer-open");arrow()}
  function close(){document.body.classList.remove("sf-v83-drawer-open");arrow()}
  function toggle(){document.body.classList.contains("sf-v83-drawer-open")?close():open()}
  function arrow(){const e=qs(".sf-v83-edge");if(e)e.textContent=document.body.classList.contains("sf-v83-drawer-open")?"◀":"▶"}
  function update(){ensure();const ai=isAI();document.body.classList.toggle("sf-v83-ai-active",ai);document.body.classList.toggle("sf-ai-twin-host",ai);if(!ai)close();arrow();let st=qs(".sf-v78-status");if(!st){st=document.createElement("div");st.className="sf-v78-status";document.body.appendChild(st)}st.textContent=ai?"SoulFlame V83 - Twin Tree":"SoulFlame V83 - SoulMatch"}
  function clickPage(p){const b=qs('[data-page="'+p+'"]');if(b)b.click();setTimeout(update,120)}
  function sendPanel(panel){clickPage("aitwin");setTimeout(()=>{const f=qs("#sfAiEchoFrame");if(f&&f.contentWindow)f.contentWindow.postMessage({type:"AI_ECHO_OPEN_PANEL",panel},"*")},260)}
  function handle(btn){qsa(".sf-v83-line").forEach(x=>x.classList.remove("active"));btn.classList.add("active");const a=btn.dataset.action;if(a==="page"){clickPage(btn.dataset.page);close()}if(a==="echo"){sendPanel(btn.dataset.panel);close()}if(a==="open"){window.open(btn.dataset.url,"_blank");close()}if(a==="admin"){sendPanel("adminPanel");close()}}
  function bind(){qsa(".menu-btn,.nav-item,[data-page]").forEach(btn=>{if(btn.dataset.v83Bound)return;btn.dataset.v83Bound="1";btn.addEventListener("click",()=>{close();setTimeout(update,80);setTimeout(update,240)},true)})}
  window.addEventListener("message",e=>{const d=e.data;if(!d||typeof d!=="object")return;if(d.type==="SOULMATCH_TOGGLE_DRAWER")toggle();if(d.type==="SOULMATCH_OPEN_DRAWER")open();if(d.type==="SOULMATCH_CLOSE_DRAWER")close()});
  document.addEventListener("click",()=>{setTimeout(bind,40);setTimeout(update,90)},true);
  window.addEventListener("resize",()=>setTimeout(update,90));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>{ensure();bind();update();setInterval(update,1000)});else{ensure();bind();update();setInterval(update,1000)}
  window.SoulFlameV83={open,close,toggle,update};
})();