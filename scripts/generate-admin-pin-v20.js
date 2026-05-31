const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const envPath = path.join(ROOT, ".env");

function makePin() {
  return "SF-ADMIN-" + crypto.randomBytes(8).toString("hex").toUpperCase();
}

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, "", "utf8");
}

let content = fs.readFileSync(envPath, "utf8");
const pin = makePin();

if (content.match(/^ECHO_ADMIN_PIN=/m)) {
  content = content.replace(/^ECHO_ADMIN_PIN=.*$/m, "ECHO_ADMIN_PIN=" + pin);
} else {
  content += "\nECHO_ADMIN_PIN=" + pin;
}

fs.writeFileSync(envPath, content, "utf8");

console.log("");
console.log("New Admin PIN generated and saved:");
console.log(pin);
console.log("");
