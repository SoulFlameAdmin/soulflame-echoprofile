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
  ["APP_VERSION", env.APP_VERSION],
  ["APP_MODE", env.APP_MODE],
  ["DATA_MODE", env.DATA_MODE],
  ["OWNER_EMAIL", env.OWNER_EMAIL],
  ["ECHO_ADMIN_PIN", env.ECHO_ADMIN_PIN],
  ["SUPABASE_URL", env.SUPABASE_URL],
  ["SUPABASE_ANON_KEY", env.SUPABASE_ANON_KEY],
  ["SUPABASE_SERVICE_ROLE_KEY", env.SUPABASE_SERVICE_ROLE_KEY]
];

console.log("");
console.log("V21 ENV AUDIT");
console.log("");

for (const [key, value] of checks) {
  const ok = Boolean(String(value || "").trim());
  console.log((ok ? "OK   " : "MISS ") + key);
}

if (env.ECHO_ADMIN_PIN === "ECHO-ADMIN-999") {
  console.log("");
  console.log("WARNING: Default admin PIN still active.");
} else {
  console.log("");
  console.log("Admin PIN is no longer default.");
}

console.log("");
