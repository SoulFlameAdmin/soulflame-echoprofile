const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const PORT = process.env.PORT || 3000;
const VERSION = 'V68_ONBOARDING_FIRST';
function send(res, status, body, type='text/html; charset=utf-8') { res.writeHead(status, {'Content-Type':type,'Cache-Control':'no-store'}); res.end(body); }
function json(res, status, data) { send(res, status, JSON.stringify(data,null,2), 'application/json; charset=utf-8'); }
function readBody(req){ return new Promise(resolve=>{let b=''; req.on('data',c=>b+=c); req.on('end',()=>{try{resolve(b?JSON.parse(b):{})}catch{resolve({})}});}); }
function id(p){ return p + '_' + crypto.randomBytes(8).toString('hex'); }
function index(){
  let html = fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
  html = html.replace('window.addEventListener("load", bootIfLogged);', 'window.addEventListener("load", function(){ showOnly("choiceScreen"); });');
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
