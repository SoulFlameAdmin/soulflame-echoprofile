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

  async read(name) {
    try {
      return JSON.parse(this.fs.readFileSync(this.files[name], "utf8") || "[]");
    } catch {
      return [];
    }
  }

  async write(name, data) {
    this.fs.writeFileSync(this.files[name], JSON.stringify(data, null, 2), "utf8");
  }

  async push(name, item) {
    const data = await this.read(name);
    data.push(item);
    await this.write(name, data);
    return data;
  }

  async all() {
    return {
      profiles: await this.read("profiles"),
      leads: await this.read("leads"),
      codes: await this.read("codes"),
      payments: await this.read("payments"),
      events: await this.read("events")
    };
  }

  async clear() {
    for (const name of Object.keys(this.files)) {
      await this.write(name, []);
    }
  }
}

module.exports = { LocalDataAdapter };
