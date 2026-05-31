const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const checks = [
  ["index.html", "file"],
  ["privacy.html", "file"],
  ["terms.html", "file"],
  ["payment.html", "file"],
  ["supabase-activation.html", "file"],
  ["deploy-command-center.html", "file"],
  ["production-blockers.html", "file"],
  ["cloud/supabase/schema.sql", "file"],
  ["cloud/supabase/verify_tables.sql", "file"],
  ["cloud/supabase/policies_draft.sql", "file"],
  ["cloud/supabase/test_seed.sql", "file"],
  ["docs/V20_SUPABASE_ACTIVATION_RUNBOOK.md", "file"],
  ["docs/V20_VERCEL_DEPLOYMENT_RUNBOOK.md", "file"],
  ["launch/PRODUCTION_BUILD_CHECKLIST.md", "file"],
  ["launch/PRODUCTION_BLOCKERS.md", "file"],
  ["security/V20_CLOUD_SAFETY_LOCK.md", "file"],
  ["api", "dir"],
  ["api/admin", "dir"],
  ["frontend_public", "dir"]
];

let ok = true;

console.log("");
console.log("V20 Launch Readiness Report");
console.log("");

for (const [rel, type] of checks) {
  const full = path.join(ROOT, rel);
  const exists = fs.existsSync(full);
  const goodType = exists && (type === "dir" ? fs.statSync(full).isDirectory() : fs.statSync(full).isFile());

  if (!goodType) ok = false;

  console.log((goodType ? "OK   " : "MISS ") + rel);
}

console.log("");
console.log(ok ? "V20 readiness files are present." : "Some V20 files are missing.");
console.log("");

process.exit(ok ? 0 : 1);
