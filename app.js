const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const PORT = process.env.PORT || 3000;
const VERSION = 'V69_FIRST_PAGE_PHONE_PERFECT';
function send(res, status, body, type='text/html; charset=utf-8') { res.writeHead(status, {'Content-Type':type,'Cache-Control':'no-store'}); res.end(body); }
function json(res, status, data) { send(res, status, JSON.stringify(data,null,2), 'application/json; charset=utf-8'); }
function readBody(req){ return new Promise(resolve=>{let b=''; req.on('data',c=>b+=c); req.on('end',()=>{try{resolve(b?JSON.parse(b):{})}catch{resolve({})}});}); }
function id(p){ return p + '_' + crypto.randomBytes(8).toString('hex'); }
function firstPageStyle(){ return `
<style id="firstPagePhonePerfect">
#choiceScreen,#choiceScreen *{filter:none!important}
#choiceScreen{min-height:100svh!important;background:radial-gradient(circle at 16% 8%,rgba(124,60,255,.34),transparent 20rem),radial-gradient(circle at 92% 72%,rgba(0,234,255,.20),transparent 22rem),radial-gradient(circle at 50% 18%,rgba(255,79,243,.14),transparent 18rem),linear-gradient(135deg,#02030a,#070817 52%,#0d1434)!important;color:#fff!important;padding:24px 14px 18px!important;place-items:start center!important;overflow-y:auto!important}
#choiceScreen::before{opacity:.42!important;background-size:38px 38px!important}
#choiceScreen .onboardShell{width:100%!important;max-width:430px!important;gap:16px!important}
#choiceScreen .onboardBrand{gap:9px!important;padding-top:2px!important}
#choiceScreen .soulLogo{width:62px!important;height:62px!important;border-radius:22px!important;background:radial-gradient(circle at 30% 24%,#fff,transparent 15%),linear-gradient(135deg,#00eaff,#7c3cff,#ff4ff3)!important;box-shadow:0 0 44px rgba(124,60,255,.48),0 0 70px rgba(0,234,255,.16)!important;animation:firstLogo 4.8s ease-in-out infinite, hue 7s linear infinite!important}
#choiceScreen .onboardBrand h1{font-size:clamp(42px,13vw,58px)!important;line-height:.9!important;letter-spacing:-2.4px!important;background:linear-gradient(90deg,#00eaff,#8bb7ff,#7c3cff,#ff4ff3,#00eaff)!important;background-size:240% 100%!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;animation:flowText 5.4s ease-in-out infinite,floatSoft 4.4s ease-in-out infinite!important;text-shadow:0 0 30px rgba(124,60,255,.18)!important}
#choiceScreen .onboardBrand p{font-size:15.5px!important;line-height:1.34!important;color:#dbe4ff!important;max-width:320px!important;margin:0 auto!important}
#choiceScreen .choiceGrid{grid-template-columns:1fr!important;gap:12px!important;margin-top:4px!important}
#choiceScreen .choiceBox{min-height:172px!important;border-radius:28px!important;padding:21px 21px 19px!important;background:radial-gradient(circle at 17% 12%,rgba(0,234,255,.24),transparent 36%),radial-gradient(circle at 93% 88%,rgba(124,60,255,.32),transparent 35%),linear-gradient(180deg,rgba(255,255,255,.095),rgba(255,255,255,.030))!important;border:1px solid rgba(0,234,255,.26)!important;box-shadow:0 24px 76px rgba(0,0,0,.52),0 0 34px rgba(0,234,255,.08),inset 0 0 0 1px rgba(255,255,255,.035)!important;animation:cardIn .55s ease both,cardFloat 6s ease-in-out infinite!important}
#choiceScreen .choiceBox:nth-child(2){background:radial-gradient(circle at 17% 12%,rgba(255,79,243,.28),transparent 36%),radial-gradient(circle at 93% 88%,rgba(0,234,255,.22),transparent 35%),linear-gradient(180deg,rgba(255,255,255,.095),rgba(255,255,255,.030))!important;border-color:rgba(255,79,243,.30)!important;animation-delay:.08s,.9s!important}
#choiceScreen .choiceBox::after{width:154px!important;height:154px!important;right:-54px!important;bottom:-58px!important;background:linear-gradient(135deg,rgba(124,60,255,.34),rgba(0,234,255,.18),rgba(255,79,243,.25))!important;filter:blur(5px)!important}
#choiceScreen .choiceBox small{margin-bottom:24px!important;font-size:11.5px!important;letter-spacing:1.9px!important;background:linear-gradient(90deg,#00eaff,#8bb7ff,#ff4ff3,#00eaff)!important;background-size:220% 100%!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;animation:flowText 4.5s ease-in-out infinite!important}
#choiceScreen .choiceBox h2{font-size:clamp(34px,10vw,43px)!important;line-height:.95!important;letter-spacing:-1.6px!important;margin:0 0 8px!important;color:#fff!important;text-shadow:0 0 24px rgba(0,234,255,.10)!important}
#choiceScreen .choiceBox p{font-size:15.5px!important;line-height:1.45!important;color:#d7defc!important;max-width:292px!important}
@media(max-width:380px){#choiceScreen{padding-top:18px!important}#choiceScreen .onboardShell{gap:13px!important}#choiceScreen .soulLogo{width:54px!important;height:54px!important}#choiceScreen .onboardBrand h1{font-size:39px!important}#choiceScreen .onboardBrand p{font-size:14px!important}#choiceScreen .choiceBox{min-height:154px!important;padding:18px!important;border-radius:25px!important}#choiceScreen .choiceBox small{margin-bottom:18px!important;font-size:10.5px!important}#choiceScreen .choiceBox h2{font-size:33px!important}#choiceScreen .choiceBox p{font-size:14px!important;line-height:1.4!important}}
@keyframes flowText{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}@keyframes cardIn{from{opacity:0;transform:translateY(16px) scale(.985);filter:blur(8px)}to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}@keyframes cardFloat{0%,100%{translate:0 0}50%{translate:0 -6px}}@keyframes floatSoft{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}@keyframes firstLogo{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-7px) rotate(2deg)}}@keyframes hue{0%{filter:hue-rotate(0)}100%{filter:hue-rotate(360deg)}}
</style>`; }
function index(){
  let html = fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
  html = html.replace('window.addEventListener("load", bootIfLogged);', 'window.addEventListener("load", function(){ showOnly("choiceScreen"); });');
  html = html.replace('</head>', firstPageStyle() + '\n</head>');
  return html;
}
const server = http.createServer(async (req,res)=>{
  const u = new URL(req.url,'http://x');
  if(req.method==='GET' && (u.pathname==='/' || u.pathname==='/index.html')) return send(res,200,index());
  if(req.method==='GET' && u.pathname==='/soulmatch') return send(res,200,'<!doctype html><html><body style="background:#050611;color:white;font-family:Arial"><a href="/">Back</a><h1>SoulMatch by SoulFlame</h1></body></html>');
  if(req.method==='GET' && u.pathname==='/admin') return send(res,200,'<!doctype html><html><body style="background:#050611;color:white;font-family:Arial"><h1>Admin</h1><p>'+VERSION+'</p></body></html>');
  if(req.method==='GET' && u.pathname==='/landing') return send(res,200,'<!doctype html><html><body style="background:#050611;color:white;font-family:Arial"><h1>Landing</h1></body></html>');
  if(req.method==='POST' && u.pathname==='/api/event') return json(res,200,{ok:true,version:VERSION});
  if(req.method==='POST' && u.pathname==='/api/profile') return json(res,200,{ok:true,id:id('profile'),saved:true,received:await readBody(req),version:VERSION});
  if(req.method==='POST' && u.pathname==='/api/checkout') return json(res,200,{ok:true,checkoutId:id('checkout'),amount:'20.00 EUR',version:VERSION});
  if(req.method==='POST' && u.pathname==='/api/unlock') return json(res,200,{ok:true,unlocked:true,version:VERSION});
  if(req.method==='POST' && u.pathname==='/api/full-report') return json(res,200,{ok:true,reportId:id('report'),report:'FULL AI TWIN REPORT',version:VERSION});
  return json(res,404,{ok:false,path:u.pathname,version:VERSION});
});
server.listen(PORT,()=>console.log('SoulFlame '+VERSION));
