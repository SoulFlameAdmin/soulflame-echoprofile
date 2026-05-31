const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const OUT_DIR = path.join(ROOT, "exports", "v20_clean_launch_export");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function read(name) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), "utf8") || "[]");
  } catch {
    return [];
  }
}

const exportData = {
  exportedAt: new Date().toISOString(),
  version: "V20_SUPABASE_ACTIVATION_COMMAND_CENTER",
  profiles: read("profiles.json"),
  leads: read("leads.json"),
  payments: read("payments.json"),
  unlock_codes: read("codes.json"),
  events: read("events.json")
};

fs.writeFileSync(path.join(OUT_DIR, "launch-export.json"), JSON.stringify(exportData, null, 2), "utf8");
fs.writeFileSync(path.join(OUT_DIR, "README.txt"), "Clean V20 launch export. Do not publish this folder publicly.", "utf8");

console.log("");
console.log("Clean launch export created:");
console.log(OUT_DIR);
console.log("");
