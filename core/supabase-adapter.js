class SupabaseDataAdapter {
  constructor(options) {
    this.url = (options.url || "").replace(/\/$/, "");
    this.key = options.serviceRoleKey || options.anonKey || "";
    this.mode = "supabase";

    this.tables = {
      profiles: "profiles",
      leads: "leads",
      codes: "unlock_codes",
      payments: "payments",
      events: "events"
    };

    if (!this.url || !this.key) {
      throw new Error("Supabase config missing. Required: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY.");
    }
  }

  headers(extra = {}) {
    return {
      "apikey": this.key,
      "Authorization": `Bearer ${this.key}`,
      "Content-Type": "application/json",
      ...extra
    };
  }

  endpoint(name, query = "") {
    const table = this.tables[name];
    if (!table) throw new Error(`Unknown Supabase table: ${name}`);
    return `${this.url}/rest/v1/${table}${query}`;
  }

  toRow(name, item) {
    const base = {
      id: Number(item.id || Date.now()),
      raw: item
    };

    if (name === "profiles") {
      return {
        ...base,
        name: item.user?.name || "",
        contact: item.user?.contact || "",
        goal: item.user?.goal || "",
        age: item.user?.age || "",
        main_trait: item.mainTrait || "",
        second_trait: item.secondTrait || "",
        profile: item.profile || "",
        scores: item.scores || {},
        mini_report: item.report || "",
        full_report: item.fullReport || ""
      };
    }

    if (name === "leads") {
      return {
        ...base,
        offer: item.offer || "",
        name: item.user?.name || "",
        contact: item.user?.contact || "",
        profile: item.profile || "",
        scores: item.scores || {}
      };
    }

    if (name === "payments") {
      return {
        ...base,
        status: item.status || "pending",
        offer: item.offer || "",
        amount: item.amount || "",
        method: item.method || "manual",
        name: item.user?.name || "",
        contact: item.user?.contact || "",
        code: item.code || ""
      };
    }

    if (name === "codes") {
      return {
        ...base,
        code: item.code || "",
        status: item.status || "unused",
        offer: item.offer || "",
        note: item.note || "",
        used_at: item.usedAt || null,
        used_by: item.usedBy || null,
        profile_id: item.profileId || null,
        payment_id: item.paymentId || null
      };
    }

    if (name === "events") {
      return {
        ...base,
        type: item.type || "",
        payload: item.payload || {}
      };
    }

    return base;
  }

  fromRow(row) {
    if (row.raw && typeof row.raw === "object") {
      return {
        ...row.raw,
        id: row.raw.id || row.id
      };
    }

    return row;
  }

  async request(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Supabase error ${response.status}: ${text}`);
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return response.json();
    }

    return null;
  }

  async read(name) {
    const rows = await this.request(this.endpoint(name, "?select=*&order=id.asc"), {
      method: "GET",
      headers: this.headers()
    });

    return Array.isArray(rows) ? rows.map(row => this.fromRow(row)) : [];
  }

  async write(name, data) {
    await this.request(this.endpoint(name, "?id=not.is.null"), {
      method: "DELETE",
      headers: this.headers({ "Prefer": "return=minimal" })
    });

    if (!Array.isArray(data) || data.length === 0) return;

    const rows = data.map(item => this.toRow(name, item));

    await this.request(this.endpoint(name), {
      method: "POST",
      headers: this.headers({ "Prefer": "return=minimal" }),
      body: JSON.stringify(rows)
    });
  }

  async push(name, item) {
    const row = this.toRow(name, item);

    await this.request(this.endpoint(name), {
      method: "POST",
      headers: this.headers({ "Prefer": "return=representation" }),
      body: JSON.stringify(row)
    });

    return this.read(name);
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
    for (const name of Object.keys(this.tables)) {
      await this.write(name, []);
    }
  }
}

module.exports = { SupabaseDataAdapter };
