const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const VERSION = 'V71_LOGIN_BUTTON_WORKS';

function send(res, status, body, type='text/html; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
}
function json(res, status, data) {
  send(res, status, JSON.stringify(data, null, 2), 'application/json; charset=utf-8');
}
function readBody(req) {
  return new Promise(resolve => {
    let b = '';
    req.on('data', c => b += c);
    req.on('end', () => { try { resolve(b ? JSON.parse(b) : {}); } catch { resolve({}); } });
  });
}

function css() {
  return `<style id="sf-v71-css">
#choiceScreen,#choiceScreen *,#loginScreen,#loginScreen *{filter:none!important}
#choiceScreen,#loginScreen{background:radial-gradient(circle at 14% 8%,rgba(124,60,255,.34),transparent 18rem),radial-gradient(circle at 92% 74%,rgba(0,234,255,.20),transparent 20rem),linear-gradient(135deg,#02030a,#070817 52%,#0d1434)!important;color:#fff!important}
#choiceScreen{min-height:100svh!important;padding:24px 14px 18px!important;place-items:start center!important;overflow-y:auto!important}
#choiceScreen .onboardShell{width:100%!important;max-width:430px!important;gap:16px!important}
#choiceScreen .soulLogo,#loginScreen .soulLogo{background:radial-gradient(circle at 30% 24%,#fff,transparent 15%),linear-gradient(135deg,#00eaff,#7c3cff,#ff4ff3)!important;box-shadow:0 0 44px rgba(124,60,255,.48),0 0 70px rgba(0,234,255,.16)!important}
#choiceScreen .onboardBrand h1,#loginScreen .loginCard h2{background:linear-gradient(90deg,#00eaff,#8bb7ff,#7c3cff,#ff4ff3,#00eaff)!important;background-size:240% 100%!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}
#choiceScreen .choiceGrid{grid-template-columns:1fr!important;gap:12px!important;margin-top:4px!important}
#choiceScreen .choiceBox{min-height:172px!important;border-radius:28px!important;padding:21px!important;background:radial-gradient(circle at 17% 12%,rgba(0,234,255,.24),transparent 36%),radial-gradient(circle at 93% 88%,rgba(124,60,255,.32),transparent 35%),linear-gradient(180deg,rgba(255,255,255,.095),rgba(255,255,255,.030))!important;border:1px solid rgba(0,234,255,.26)!important;box-shadow:0 24px 76px rgba(0,0,0,.52),0 0 34px rgba(0,234,255,.08)!important}
#choiceScreen .choiceBox:nth-child(2){background:radial-gradient(circle at 17% 12%,rgba(255,79,243,.28),transparent 36%),radial-gradient(circle at 93% 88%,rgba(0,234,255,.22),transparent 35%),linear-gradient(180deg,rgba(255,255,255,.095),rgba(255,255,255,.030))!important;border-color:rgba(255,79,243,.30)!important}
#choiceScreen .choiceBox small{margin-bottom:24px!important;font-size:11.5px!important;letter-spacing:1.9px!important;color:#00eaff!important}
#choiceScreen .choiceBox h2{font-size:clamp(34px,10vw,43px)!important;margin:0 0 8px!important;color:#fff!important}
#choiceScreen .choiceBox p{font-size:15.5px!important;line-height:1.45!important;color:#d7defc!important;max-width:292px!important}
#loginScreen{min-height:100svh!important;padding:18px 14px!important;display:grid!important;place-items:center!important;overflow:hidden!important}
#loginScreen .loginCard{width:min(390px,calc(100vw - 28px))!important;border-radius:30px!important;padding:24px 20px 22px!important;margin:0 auto!important;background:radial-gradient(circle at 18% 12%,rgba(124,60,255,.25),transparent 34%),radial-gradient(circle at 94% 88%,rgba(0,234,255,.17),transparent 35%),linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.03))!important;border:1px solid rgba(0,234,255,.23)!important;box-shadow:0 24px 78px rgba(0,0,0,.55),0 0 38px rgba(124,60,255,.13)!important}
#loginScreen .loginFields input{height:58px!important;border-radius:18px!important;padding:0 15px!important;background:rgba(0,0,0,.46)!important;border:1px solid rgba(0,234,255,.18)!important;color:#fff!important;outline:none!important}
#loginScreen .loginBtn{height:58px!important;margin-top:14px!important;border-radius:18px!important;background:linear-gradient(135deg,#7c3cff,#3f8dff,#ff4ff3)!important;color:#fff!important;box-shadow:0 18px 46px rgba(124,60,255,.34)!important}
</style>`;
}

function script() {
  return `<script id="sf-v71-flow">
(function(){
  function e(id){return document.getElementById(id)}
  function show(id){['choiceScreen','loginScreen','createTwinScreen','createdByScreen','appScreen'].forEach(function(x){var n=e(x);if(!n)return;if(x===id){n.classList.remove('hidden');n.classList.add('fadeIn')}else{n.classList.add('hidden');n.classList.remove('fadeIn','fadeOut')}})}
  window.startTwinIntro=function(){
    var p={type:window.selectedTwinType||'Личен',name:(e('loginName')&&e('loginName').value.trim())||'приятелю',contact:(e('loginContact')&&e('loginContact').value.trim())||'',version:'V71_LOGIN_BUTTON_WORKS'};
    try{localStorage.setItem('soulflame_v56_profile',JSON.stringify(p))}catch(err){}
    show('createTwinScreen');
    setTimeout(function(){show('createdByScreen')},900);
    setTimeout(function(){show('appScreen'); if(typeof bootChat==='function')bootChat(p)},1850);
  };
  window.addEventListener('load',function(){
    setTimeout(function(){
      show('choiceScreen');
      var b=document.querySelector('#loginScreen .loginBtn');
      if(b){b.onclick=function(ev){ev.preventDefault();window.startTwinIntro();};}
      ['loginName','loginContact'].forEach(function(id){var i=e(id);if(i){i.onkeydown=function(ev){if(ev.key==='Enter'){ev.preventDefault();window.startTwinIntro();}}}});
    },120);
  });
})();
</script>`;
}

function index() {
  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  html = html.replace(/<style id="bwChoiceScreenOnly">[\s\S]*?<\/style>/g, '');
  html = html.replace('window.addEventListener("load", bootIfLogged);', 'window.addEventListener("load", function(){ showOnly("choiceScreen"); });');
  html = html.replace('</head>', css() + '\n</head>');
  html = html.replace('</body>', script() + '\n</body>');
  return html;
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  if (req.method === 'GET' && (u.pathname === '/' || u.pathname === '/index.html')) return send(res, 200, index());
  if (req.method === 'GET' && u.pathname === '/soulmatch') return send(res, 200, '<!doctype html><html><body style="background:#050611;color:white;font-family:Arial"><a href="/">Back</a><h1>SoulMatch by SoulFlame</h1></body></html>');
  if (req.method === 'GET' && u.pathname === '/admin') return send(res, 200, '<!doctype html><html><body style="background:#050611;color:white;font-family:Arial"><h1>Admin</h1><p>'+VERSION+'</p></body></html>');
  if (req.method === 'GET' && u.pathname === '/landing') return send(res, 200, '<!doctype html><html><body style="background:#050611;color:white;font-family:Arial"><h1>Landing</h1></body></html>');
  if (req.method === 'POST' && u.pathname === '/api/event') return json(res, 200, {ok:true, version:VERSION});
  if (req.method === 'POST' && u.pathname === '/api/profile') return json(res, 200, {ok:true, saved:true, received:await readBody(req), version:VERSION});
  if (req.method === 'POST' && u.pathname === '/api/checkout') return json(res, 200, {ok:true, amount:'20.00 EUR', version:VERSION});
  if (req.method === 'POST' && u.pathname === '/api/unlock') return json(res, 200, {ok:true, unlocked:true, version:VERSION});
  if (req.method === 'POST' && u.pathname === '/api/full-report') return json(res, 200, {ok:true, report:'FULL AI TWIN REPORT', version:VERSION});
  return json(res, 404, {ok:false, path:u.pathname, version:VERSION});
});
server.listen(PORT, () => console.log('SoulFlame ' + VERSION));
