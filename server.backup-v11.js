const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = 3000;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");

const files = {
  profiles: path.join(DATA_DIR, "profiles.json"),
  leads: path.join(DATA_DIR, "leads.json"),
  codes: path.join(DATA_DIR, "codes.json")
};

function ensureFiles() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  Object.values(files).forEach(file => {
    if (!fs.existsSync(file)) fs.writeFileSync(file, "[]", "utf8");
  });
}

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8") || "[]");
  } catch {
    return [];
  }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

function sendJSON(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });

  res.end(JSON.stringify(data, null, 2));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();

      if (body.length > 2000000) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon"
  };

  return types[ext] || "application/octet-stream";
}

function serveStatic(req, res) {
  let requested = decodeURIComponent(req.url.split("?")[0]);

  if (requested === "/") {
    requested = "/index.html";
  }

  const safePath = path.normalize(requested).replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": getMime(filePath) });
  fs.createReadStream(filePath).pipe(res);
}

function makeUnlockCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  function part(length) {
    let value = "";

    for (let i = 0; i < length; i++) {
      value += alphabet[crypto.randomInt(0, alphabet.length)];
    }

    return value;
  }

  return `ECHO-${part(4)}-${part(4)}`;
}

ensureFiles();

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJSON(res, 200, { ok: true });
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/api/health")) {
    sendJSON(res, 200, {
      ok: true,
      app: "SoulFlame EchoProfile V11 One-Time Unlock Codes",
      time: new Date().toISOString()
    });
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/api/data")) {
    sendJSON(res, 200, {
      profiles: readJSON(files.profiles),
      leads: readJSON(files.leads),
      codes: readJSON(files.codes)
    });
    return;
  }

  if (req.method === "POST" && req.url.startsWith("/api/profile")) {
    try {
      const profile = await parseBody(req);
      const profiles = readJSON(files.profiles);

      profiles.push({
        ...profile,
        serverSavedAt: new Date().toISOString()
      });

      writeJSON(files.profiles, profiles);

      sendJSON(res, 200, {
        ok: true,
        saved: "profile",
        total: profiles.length
      });
    } catch (error) {
      sendJSON(res, 400, { ok: false, error: error.message });
    }

    return;
  }

  if (req.method === "POST" && req.url.startsWith("/api/lead")) {
    try {
      const lead = await parseBody(req);
      const leads = readJSON(files.leads);

      leads.push({
        ...lead,
        serverSavedAt: new Date().toISOString()
      });

      writeJSON(files.leads, leads);

      sendJSON(res, 200, {
        ok: true,
        saved: "lead",
        total: leads.length
      });
    } catch (error) {
      sendJSON(res, 400, { ok: false, error: error.message });
    }

    return;
  }

  if (req.method === "POST" && req.url.startsWith("/api/code")) {
    try {
      const body = await parseBody(req);
      const codes = readJSON(files.codes);

      let code = makeUnlockCode();

      while (codes.some(item => item.code === code)) {
        code = makeUnlockCode();
      }

      const newCode = {
        id: Date.now(),
        code,
        status: "unused",
        offer: body.offer || "Full AI Echo",
        note: body.note || "",
        createdAt: new Date().toISOString(),
        usedAt: null,
        usedBy: null,
        profileId: null
      };

      codes.push(newCode);
      writeJSON(files.codes, codes);

      sendJSON(res, 200, {
        ok: true,
        code: newCode
      });
    } catch (error) {
      sendJSON(res, 400, { ok: false, error: error.message });
    }

    return;
  }

  if (req.method === "POST" && req.url.startsWith("/api/unlock")) {
    try {
      const body = await parseBody(req);
      const submittedCode = String(body.code || "").trim().toUpperCase();
      const codes = readJSON(files.codes);

      const found = codes.find(item => item.code === submittedCode);

      if (!found) {
        sendJSON(res, 404, {
          ok: false,
          error: "Кодът не съществува."
        });
        return;
      }

      if (found.status === "used") {
        sendJSON(res, 409, {
          ok: false,
          error: "Този код вече е използван.",
          code: found
        });
        return;
      }

      found.status = "used";
      found.usedAt = new Date().toISOString();
      found.usedBy = body.user || null;
      found.profileId = body.profileId || null;

      writeJSON(files.codes, codes);

      sendJSON(res, 200, {
        ok: true,
        unlocked: true,
        code: found
      });
    } catch (error) {
      sendJSON(res, 400, { ok: false, error: error.message });
    }

    return;
  }

  if (req.method === "DELETE" && req.url.startsWith("/api/data")) {
    writeJSON(files.profiles, []);
    writeJSON(files.leads, []);
    writeJSON(files.codes, []);

    sendJSON(res, 200, {
      ok: true,
      cleared: true
    });

    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log("");
  console.log("SoulFlame EchoProfile V11 is running.");
  console.log("Open: http://localhost:" + PORT);
  console.log("Profiles: " + files.profiles);
  console.log("Leads: " + files.leads);
  console.log("Codes: " + files.codes);
  console.log("");
});
