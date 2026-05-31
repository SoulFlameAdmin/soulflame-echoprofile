const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const mustExist = [
  ".gitignore",
  ".vercelignore",
  "vercel.json",
  ".env.vercel.example",
  "docs/vercel/V23_ENV_VARIABLES.md",
  "docs/vercel/V23_DEPLOY_CHECKLIST.md",
  "security/V23_SECURITY_LOCK.md",
  "docs/V24_REAL_VERCEL_API_MIGRATION.md",
  "api/health.js",
  "api/profile.js",
  "api/_shared/admin.js",
  "api/_shared/response.js",
  "api/_shared/system.js"
];

const mustNotDeploy = [
  ".env",
  "private",
  "data",
  "backups",
  "exports"
];

let ok = true;

console.log("");
console.log("V23 Vercel Prep Preflight");
console.log("");

for (const rel of mustExist) {
  const exists = fs.existsSync(path.join(ROOT, rel));
  console.log((exists ? "OK   " : "MISS ") + rel);
  if (!exists) ok = false;
}

console.log("");
console.log("Protected paths check:");
console.log("");

const gitignore = fs.existsSync(path.join(ROOT, ".gitignore"))
  ? fs.readFileSync(path.join(ROOT, ".gitignore"), "utf8")
  : "";

const vercelignore = fs.existsSync(path.join(ROOT, ".vercelignore"))
  ? fs.readFileSync(path.join(ROOT, ".vercelignore"), "utf8")
  : "";

for (const rel of mustNotDeploy) {
  const inGit = gitignore.includes(rel);
  const inVercel = vercelignore.includes(rel);
  console.log(`${rel}: gitignore=${inGit ? "OK" : "MISS"} vercelignore=${inVercel ? "OK" : "MISS"}`);
  if (!inGit || !inVercel) ok = false;
}

console.log("");

if (ok) {
  console.log("V23 prep passed.");
} else {
  console.log("V23 prep has missing items.");
  process.exit(1);
}
