const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const EXPORT_DIR = path.join(ROOT, "exports");

if (!fs.existsSync(EXPORT_DIR)) {
  fs.mkdirSync(EXPORT_DIR, { recursive: true });
}

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8") || "[]");
  } catch {
    return [];
  }
}

const data = {
  exportedAt: new Date().toISOString(),
  format: "V16_CLOUD_READY_EXPORT",
  profiles: readJSON(path.join(DATA_DIR, "profiles.json")),
  leads: readJSON(path.join(DATA_DIR, "leads.json")),
  payments: readJSON(path.join(DATA_DIR, "payments.json")),
  unlock_codes: readJSON(path.join(DATA_DIR, "codes.json")),
  events: readJSON(path.join(DATA_DIR, "events.json"))
};

const filename = `cloud-ready-export-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
const outputPath = path.join(EXPORT_DIR, filename);

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf8");

console.log("");
console.log("Cloud-ready export created:");
console.log(outputPath);
console.log("");
