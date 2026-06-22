const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const VERSION = 'V77_SOULMATCH_MAIN_CLEAN_SERVER';

function send(res, status, body, type = 'text/html; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function json(res, status, data) {
  send(res, status, JSON.stringify(data, null, 2), 'application/json; charset=utf-8');
}

function readBody(req) {
  return new Promise(resolve => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.html') return 'text/html; charset=utf-8';
  if (ext === '.css') return 'text/css; charset=utf-8';
  if (ext === '.js') return 'application/javascript; charset=utf-8';
  if (ext === '.json') return 'application/json; charset=utf-8';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.webp') return 'image/webp';

  return 'application/octet-stream';
}

function sendFile(res, filePath) {
  if (!fs.existsSync(filePath)) {
    return json(res, 404, {
      ok: false,
      error: 'File not found',
      file: filePath,
      version: VERSION
    });
  }

  send(res, 200, fs.readFileSync(filePath), contentType(filePath));
}

function sendIndex(res) {
  const filePath = path.join(__dirname, 'index.html');

  if (!fs.existsSync(filePath)) {
    return json(res, 404, {
      ok: false,
      error: 'index.html not found',
      version: VERSION
    });
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Remove old grayscale debug style if it exists.
  html = html.replace(/<style id="bwChoiceScreenOnly">[\s\S]*?<\/style>/g, '');

  return send(res, 200, html);
}

function sendSoulmatch(res) {
  const filePath = path.join(__dirname, 'Soulmatch', 'index.html');

  if (!fs.existsSync(filePath)) {
    return send(res, 200, '<!doctype html><html><body style="background:#050611;color:white;font-family:Arial;padding:30px"><h1>SoulMatch folder is missing</h1><p>Upload Soulmatch/index.html, style.css and app.js.</p></body></html>');
  }

  let html = fs.readFileSync(filePath, 'utf8');
  html = html.replace(/href="style\.css"/g, 'href="/Soulmatch/style.css"');
  html = html.replace(/src="app\.js"/g, 'src="/Soulmatch/app.js"');

  return send(res, 200, html);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
    return sendIndex(res);
  }

  if (req.method === 'GET' && (url.pathname === '/soulmatch' || url.pathname === '/soulmatch/')) {
    return sendSoulmatch(res);
  }

  if (req.method === 'GET' && url.pathname.startsWith('/Soulmatch/')) {
    const rel = url.pathname.replace(/^\/Soulmatch\//, '').replace(/\.\./g, '');
    return sendFile(res, path.join(__dirname, 'Soulmatch', rel));
  }

  if (req.method === 'GET' && (url.pathname === '/ai-twin' || url.pathname === '/ai-twin.html')) {
    return sendFile(res, path.join(__dirname, 'ai-twin.html'));
  }

  if (req.method === 'GET' && (url.pathname === '/admin' || url.pathname === '/admin.html')) {
    return sendFile(res, path.join(__dirname, 'admin.html'));
  }

  if (req.method === 'GET' && (url.pathname === '/landing' || url.pathname === '/landing.html')) {
    return sendFile(res, path.join(__dirname, 'landing.html'));
  }

  if (req.method === 'GET' && url.pathname === '/health') {
    return json(res, 200, {
      ok: true,
      version: VERSION
    });
  }

  if (req.method === 'POST' && url.pathname === '/api/event') {
    return json(res, 200, {
      ok: true,
      received: await readBody(req),
      version: VERSION
    });
  }

  if (req.method === 'POST' && url.pathname === '/api/profile') {
    return json(res, 200, {
      ok: true,
      saved: true,
      received: await readBody(req),
      version: VERSION
    });
  }

  if (req.method === 'POST' && url.pathname === '/api/checkout') {
    return json(res, 200, {
      ok: true,
      amount: '20.00 EUR',
      provider: 'manual',
      version: VERSION
    });
  }

  if (req.method === 'POST' && url.pathname === '/api/unlock') {
    return json(res, 200, {
      ok: true,
      unlocked: true,
      version: VERSION
    });
  }

  if (req.method === 'POST' && url.pathname === '/api/full-report') {
    return json(res, 200, {
      ok: true,
      report: 'FULL AI TWIN REPORT',
      version: VERSION
    });
  }

  return json(res, 404, {
    ok: false,
    path: url.pathname,
    version: VERSION
  });
});

server.listen(PORT, () => {
  console.log('SoulFlame running: http://localhost:' + PORT + ' ' + VERSION);
});
