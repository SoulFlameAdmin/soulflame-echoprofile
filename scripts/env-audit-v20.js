const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const envPath = path.join(ROOT, ".env");

function parseEnv() {
  const env = {};
  if (!fs.existsSync(envPath)) return env;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    env[trimmed.slice(0, index)] = trimmed.slice(index + 1);
  }

  return env;
}

const env = parseEnv();

const checks = [
  ["PORT", Boolean(env.PORT)],
  ["APP_MODE", Boolean(env.APP_MODE)],
  ["DATA_MODE", Boolean(env.DATA_MODE)],
  ["OWNER_EMAIL", Boolean(env.OWNER_EMAIL)],
  ["ECHO_ADMIN_PIN", Boolean(env.ECHO_ADMIN_PIN)],
  ["APP_VERSION", Boolean(env.APP_VERSION)],
  ["SUPABASE_URL", Boolean(env.SUPABASE_URL)],
  ["SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY", Boolean(env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY)]
];

console.log("");
console.log("V20 ENV Audit");
console.log("");

for (const [name, ok] of checks) {
  console.log((ok ? "OK   " : "MISS ") + name);
}

if (env.ECHO_ADMIN_PIN === "ECHO-ADMIN-999") {
  console.log("");
  console.log("WARNING: Default admin PIN is still active.");
}

console.log("");
