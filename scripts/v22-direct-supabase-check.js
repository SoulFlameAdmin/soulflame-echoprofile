const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const envPath = path.join(ROOT, ".env");

function readEnv() {
  const env = {};
  const text = fs.readFileSync(envPath, "utf8").replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();

    env[key] = value;
  }

  return env;
}

async function main() {
  const env = readEnv();

  const url = env.SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = env.SUPABASE_ANON_KEY;
  const key = serviceKey || anonKey;

  console.log("");
  console.log("V22 DIRECT SUPABASE CHECK");
  console.log("");
  console.log("DATA_MODE:", env.DATA_MODE);
  console.log("SUPABASE_URL:", url);
  console.log("ANON_KEY_LENGTH:", (anonKey || "").length);
  console.log("SERVICE_KEY_LENGTH:", (serviceKey || "").length);

  if (env.DATA_MODE !== "supabase") {
    console.log("FAIL: DATA_MODE is not supabase.");
    process.exit(1);
  }

  if (!url || !key) {
    console.log("FAIL: Missing Supabase URL or key.");
    process.exit(1);
  }

  const endpoint = url.replace(/\/$/, "") + "/rest/v1/profiles?select=id&limit=1";

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "apikey": key,
      "Authorization": "Bearer " + key,
      "Content-Type": "application/json"
    }
  });

  const body = await response.text();

  console.log("HTTP:", response.status);

  if (!response.ok) {
    console.log("");
    console.log("SUPABASE ERROR:");
    console.log(body);

    if (
      body.toLowerCase().includes("relation") ||
      body.toLowerCase().includes("does not exist") ||
      body.toLowerCase().includes("schema cache")
    ) {
      console.log("");
      console.log("LIKELY CAUSE: schema.sql is not executed in Supabase SQL Editor.");
    }

    process.exit(2);
  }

  console.log("OK: Supabase connection works.");
  console.log(body);
}

main().catch(error => {
  console.log("FAIL:", error.message);
  process.exit(1);
});
