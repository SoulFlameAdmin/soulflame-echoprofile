const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const required = [
  ".env",
  "private/v21-admin-pin.txt",
  "security/V21_ADMIN_SECURITY.md",
  "docs/V21_SUPABASE_KEYS_GUIDE.md",
  "docs/V22_REAL_SUPABASE_ACTIVATION.md",
  "admin-security.html",
  "supabase-keys.html",
  "v21-addon.js",
  "v21-addon.css"
];

let ok = true;

console.log("");
console.log("V21 LOCAL TEST");
console.log("");

for (const file of required) {
  const full = path.join(ROOT, file);
  const exists = fs.existsSync(full);

  if (!exists) ok = false;

  console.log((exists ? "OK   " : "MISS ") + file);
}

console.log("");
console.log(ok ? "V21 local files OK." : "V21 local files missing.");
console.log("");

process.exit(ok ? 0 : 1);
