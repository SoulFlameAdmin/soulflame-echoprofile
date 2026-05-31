const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const requiredFiles = [
  "index.html",
  "style.css",
  "script.js",
  "server.js",
  ".env",
  ".env.production.example",
  "v17-addon.js",
  "v17-addon.css",
  "security/SECURITY_CHECKLIST.md",
  "docs/API_ROUTE_MAP.md",
  "docs/V17_DEPLOY_PREP.md",
  "docs/V18_SUPABASE_REAL_SETUP.md"
];

const missing = [];

for (const file of requiredFiles) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) missing.push(file);
}

if (missing.length) {
  console.log("Missing files:");
  missing.forEach(file => console.log("- " + file));
  process.exit(1);
}

console.log("V17 production prep check passed.");
