const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const envPath = path.join(ROOT, ".env");
const privateDir = path.join(ROOT, "private");

if (!fs.existsSync(privateDir)) {
  fs.mkdirSync(privateDir, { recursive: true });
}

function makePin() {
  return "SF-ADMIN-" + crypto.randomBytes(10).toString("hex").toUpperCase();
}

let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
const pin = makePin();

if (content.match(/^ECHO_ADMIN_PIN=/m)) {
  content = content.replace(/^ECHO_ADMIN_PIN=.*$/m, "ECHO_ADMIN_PIN=" + pin);
} else {
  content += "\nECHO_ADMIN_PIN=" + pin;
}

fs.writeFileSync(envPath, content, "utf8");

fs.writeFileSync(
  path.join(privateDir, "v21-admin-pin.txt"),
  "V21 NEW ADMIN PIN\n\n" + pin + "\n\nDo not share this publicly.\n",
  "utf8"
);

console.log("");
console.log("New Admin PIN:");
console.log(pin);
console.log("");
console.log("Saved to private/v21-admin-pin.txt");
console.log("");
