class LocalDataAdapter {
  constructor(fs, path, dataDir) {
    this.fs = fs;
    this.path = path;
    this.dataDir = dataDir;

    this.files = {
      profiles: this.path.join(this.dataDir, "profiles.json"),
      leads: this.path.join(this.dataDir, "leads.json"),
      codes: this.path.join(this.dataDir, "codes.json"),
      payments: this.path.join(this.dataDir, "payments.json"),
      events: this.path.join(this.dataDir, "events.json")
    };

    this.ensure();
  }

  ensure() {
    if (!this.fs.existsSync(this.dataDir)) {
      this.fs.mkdirSync(this.dataDir, { recursive: true });
    }

    Object.values(this.files).forEach(file => {
      if (!this.fs.existsSync(file)) {
        this.fs.writeFileSync(file, "[]", "utf8");
      }
    });
  }

  read(name) {
    try {
      return JSON.parse(this.fs.readFileSync(this.files[name], "utf8") || "[]");
    } catch {
      return [];
    }
  }

  write(name, data) {
    this.fs.writeFileSync(this.files[name], JSON.stringify(data, null, 2), "utf8");
  }

  push(name, item) {
    const data = this.read(name);
    data.push(item);
    this.write(name, data);
    return data;
  }

  all() {
    return {
      profiles: this.read("profiles"),
      leads: this.read("leads"),
      codes: this.read("codes"),
      payments: this.read("payments"),
      events: this.read("events")
    };
  }

  clear() {
    Object.keys(this.files).forEach(name => {
      this.write(name, []);
    });
  }
}

module.exports = { LocalDataAdapter };
