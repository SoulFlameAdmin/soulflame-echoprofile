(function () {
  const V17_VERSION = "V17_DEPLOY_PREP_BUSINESS_HARDENING";

  function q(selector) {
    return document.querySelector(selector);
  }

  function qa(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  function safeText(value) {
    return String(value ?? "");
  }

  function htmlEscape(value) {
    return safeText(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function copyV17(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () {
        fallbackCopyV17(text);
      });
    } else {
      fallbackCopyV17(text);
    }
  }

  function fallbackCopyV17(text) {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
  }

  function insertClientPrivacyAndConsent() {
    const leadScreen = q("#leadScreen");
    if (!leadScreen || q("#v17ConsentBox")) return;

    const formGrid = leadScreen.querySelector(".form-grid");
    if (!formGrid) return;

    const box = document.createElement("div");
    box.id = "v17ConsentBox";
    box.className = "v17-consent-box";
    box.innerHTML = `
      <h3>Поверителност и съгласие</h3>
      <p>
        Данните се използват само за EchoProfile анализ, заявка за Full Echo и отключване с код.
        Това не е медицинска диагноза.
      </p>
      <label class="v17-consent-line">
        <input type="checkbox" id="dataConsent" />
        <span>Съгласен съм данните ми да се използват за изготвяне на EchoProfile анализ.</span>
      </label>
    `;

    formGrid.insertAdjacentElement("afterend", box);
  }

  function wrapStartTestWithConsent() {
    if (window.__v17StartWrapped) return;
    if (typeof window.startTest !== "function") return;

    const originalStartTest = window.startTest;

    window.startTest = function () {
      const consent = q("#dataConsent");

      if (consent && !consent.checked) {
        alert("Първо отбележи съгласието за използване на данните.");
        return;
      }

      return originalStartTest();
    };

    window.__v17StartWrapped = true;
  }

  function insertPaymentMethods() {
    const pricingScreen = q("#pricingScreen");
    if (!pricingScreen || q("#v17PaymentMethods")) return;

    const box = document.createElement("div");
    box.id = "v17PaymentMethods";
    box.className = "payment-methods-panel";
    box.innerHTML = `
      <div class="result-label">Payment Methods</div>
      <h2>Методи за плащане</h2>
      <p>В тази версия плащането е manual. След потвърждение админът генерира еднократен код.</p>
      <div class="payment-method-grid">
        <div>Manual</div>
        <div>Revolut — бъдещо</div>
        <div>PayPal — бъдещо</div>
        <div>Stripe — бъдещо</div>
        <div>Bank Transfer — бъдещо</div>
      </div>
    `;

    pricingScreen.appendChild(box);
  }

  function insertBetterPaymentInstructions() {
    const resultScreen = q("#resultScreen");
    if (!resultScreen || q("#v17PaymentInstructions")) return;

    const fullLock = q("#fullLockBox");

    const box = document.createElement("div");
    box.id = "v17PaymentInstructions";
    box.className = "v17-instruction-panel";
    box.innerHTML = `
      <h3>Път до Full Echo</h3>
      <ol>
        <li>Направи Mini Echo профил.</li>
        <li>Натисни „Заяви плащане и код“.</li>
        <li>Изпрати плащане по уговорения manual начин.</li>
        <li>След потвърждение получаваш еднократен код.</li>
        <li>Въвеждаш кода и отключваш Full Echo.</li>
      </ol>
    `;

    if (fullLock) fullLock.insertAdjacentElement("beforebegin", box);
    else resultScreen.appendChild(box);
  }

  async function loadSystemStatus() {
    try {
      const response = await fetch("/api/health");
      return await response.json();
    } catch {
      return {
        ok: false,
        version: V17_VERSION,
        activeDataMode: "unknown",
        warnings: ["Backend health check failed."]
      };
    }
  }

  async function insertAdminModeBadge() {
    const adminScreen = q("#adminScreen");
    if (!adminScreen || q("#v17AdminBadge")) return;

    const status = await loadSystemStatus();

    const warningParts = [];

    if (status.adminSecurityWarning) warningParts.push(status.adminSecurityWarning);
    if (Array.isArray(status.warnings)) warningParts.push(...status.warnings);

    const box = document.createElement("div");
    box.id = "v17AdminBadge";
    box.className = "admin-mode-badge";
    box.innerHTML = `
      <div>
        <span class="result-label">System Status</span>
        <h3>${htmlEscape(status.version || V17_VERSION)}</h3>
        <p>
          Mode: <strong>${htmlEscape(status.appMode || "local")}</strong> |
          Data: <strong>${htmlEscape(status.activeDataMode || "local")}</strong> |
          Uptime: <strong>${htmlEscape(status.uptimeSeconds || "0")}s</strong>
        </p>
        ${warningParts.length ? `<div class="v17-warning">${htmlEscape(warningParts.join(" | "))}</div>` : `<div class="v17-ok">No critical warnings in local mode.</div>`}
      </div>
    `;

    const adminHead = adminScreen.querySelector(".admin-head");
    if (adminHead) adminHead.insertAdjacentElement("afterend", box);
    else adminScreen.prepend(box);
  }

  function insertEventsFilter() {
    const eventsTable = q("#eventsTable");
    if (!eventsTable || q("#eventTypeFilter")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "events-filter";
    wrapper.innerHTML = `
      <select id="eventTypeFilter" onchange="if (typeof renderEventsTable === 'function') renderEventsTable();">
        <option value="all">Всички събития</option>
        <option value="profile_created">profile_created</option>
        <option value="payment_requested">payment_requested</option>
        <option value="payment_confirmed">payment_confirmed</option>
        <option value="code_generated">code_generated</option>
        <option value="code_used">code_used</option>
        <option value="lead_created">lead_created</option>
        <option value="data_cleared">data_cleared</option>
      </select>
    `;

    const tableWrap = eventsTable.closest(".table-wrap");
    if (tableWrap) tableWrap.insertAdjacentElement("beforebegin", wrapper);
  }

  function wrapRenderEventsTable() {
    if (window.__v17EventsWrapped) return;
    if (typeof window.renderEventsTable !== "function") return;

    window.renderEventsTable = function () {
      const table = q("#eventsTable");
      if (!table) return;

      const selected = q("#eventTypeFilter")?.value || "all";
      const source = Array.isArray(window.adminEvents) ? window.adminEvents : [];

      const filtered = selected === "all"
        ? source
        : source.filter(function (item) { return item.type === selected; });

      table.innerHTML = "";

      if (!filtered.length) {
        table.innerHTML = `<tr><td colspan="3" class="empty-row">Няма събития за този филтър.</td></tr>`;
        return;
      }

      filtered.slice().reverse().slice(0, 80).forEach(function (item) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${htmlEscape(item.createdAt || "")}</td>
          <td><strong>${htmlEscape(item.type || "")}</strong></td>
          <td>${htmlEscape(JSON.stringify(item.payload || {}))}</td>
        `;
        table.appendChild(tr);
      });
    };

    window.__v17EventsWrapped = true;
  }

  function insertBetterMetricsPanel() {
    const adminScreen = q("#adminScreen");
    if (!adminScreen || q("#v17BetterMetrics")) return;

    const box = document.createElement("div");
    box.id = "v17BetterMetrics";
    box.className = "v17-metrics-panel";
    box.innerHTML = `
      <div><span>Conversion</span><strong id="v17Conversion">0%</strong></div>
      <div><span>Pending</span><strong id="v17Pending">0</strong></div>
      <div><span>Paid</span><strong id="v17Paid">0</strong></div>
      <div><span>Unused Codes</span><strong id="v17UnusedCodes">0</strong></div>
      <div><span>Used Codes</span><strong id="v17UsedCodes">0</strong></div>
    `;

    const stats = adminScreen.querySelector(".stats-grid");
    if (stats) stats.insertAdjacentElement("afterend", box);
  }

  function updateBetterMetrics() {
    try {
      const profiles = Array.isArray(window.adminProfiles) ? window.adminProfiles.length : 0;
      const payments = Array.isArray(window.adminPayments) ? window.adminPayments : [];
      const codes = Array.isArray(window.adminCodes) ? window.adminCodes : [];

      const paid = payments.filter(function (p) { return p.status === "paid"; }).length;
      const pending = payments.filter(function (p) { return p.status === "pending"; }).length;
      const usedCodes = codes.filter(function (c) { return c.status === "used"; }).length;
      const unusedCodes = codes.filter(function (c) { return c.status === "unused"; }).length;
      const conversion = profiles ? Math.round((paid / profiles) * 100) : 0;

      if (q("#v17Conversion")) q("#v17Conversion").textContent = conversion + "%";
      if (q("#v17Pending")) q("#v17Pending").textContent = pending;
      if (q("#v17Paid")) q("#v17Paid").textContent = paid;
      if (q("#v17UnusedCodes")) q("#v17UnusedCodes").textContent = unusedCodes;
      if (q("#v17UsedCodes")) q("#v17UsedCodes").textContent = usedCodes;
    } catch {}
  }

  function wrapLoadBackendDataForV17() {
    if (window.__v17LoadWrapped) return;
    if (typeof window.loadBackendData !== "function") return;

    const original = window.loadBackendData;

    window.loadBackendData = async function () {
      const result = await original.apply(this, arguments);

      insertAdminModeBadge();
      insertEventsFilter();
      insertBetterMetricsPanel();
      updateBetterMetrics();

      if (typeof window.renderEventsTable === "function") {
        window.renderEventsTable();
      }

      return result;
    };

    window.__v17LoadWrapped = true;
  }

  function enhanceAdminCopyButtons() {
    document.addEventListener("click", function (event) {
      const target = event.target;

      if (!target || !target.matches("[data-v17-copy]")) return;

      const value = target.getAttribute("data-v17-copy") || "";
      copyV17(value);
      alert("Копирано.");
    });
  }

  function addCopyHelpersToTables() {
    setInterval(function () {
      qa("#profilesTable tr").forEach(function (row) {
        if (row.getAttribute("data-v17-enhanced")) return;

        const cells = row.querySelectorAll("td");
        if (cells.length < 3) return;

        const contact = cells[2]?.textContent?.trim();
        if (!contact) return;

        const btn = document.createElement("button");
        btn.className = "mini-action";
        btn.textContent = "Copy contact";
        btn.setAttribute("data-v17-copy", contact);

        const actionCell = cells[cells.length - 1];
        actionCell.appendChild(btn);

        row.setAttribute("data-v17-enhanced", "1");
      });

      qa("#paymentsTable tr").forEach(function (row) {
        if (row.getAttribute("data-v17-enhanced")) return;

        const cells = row.querySelectorAll("td");
        if (cells.length < 6) return;

        const offer = cells[1]?.textContent?.trim();
        const amount = cells[2]?.textContent?.trim();
        const name = cells[3]?.textContent?.trim();
        const contact = cells[4]?.textContent?.trim();
        const code = cells[5]?.textContent?.trim();

        const message = `SoulFlame EchoProfile\nОферта: ${offer}\nСума: ${amount}\nИме: ${name}\nКонтакт: ${contact}\nКод: ${code}`;

        const btn = document.createElement("button");
        btn.className = "mini-action";
        btn.textContent = "Copy payment";
        btn.setAttribute("data-v17-copy", message);

        const actionCell = cells[cells.length - 1];
        actionCell.appendChild(btn);

        row.setAttribute("data-v17-enhanced", "1");
      });
    }, 1200);
  }

  function cleanerClientModeText() {
    const hero = q(".hero-text p");
    if (hero && hero.textContent.includes("Database Engine")) {
      hero.textContent = "EchoProfile създава личен Mini Echo профил, а Full Echo се отключва с еднократен код след заявка. Това е първата версия на реална AI психологическа услуга от SoulFlame.";
    }
  }

  function addV17FooterBadge() {
    if (q("#v17FooterBadge")) return;

    const badge = document.createElement("div");
    badge.id = "v17FooterBadge";
    badge.className = "v17-footer-badge";
    badge.textContent = "V17 Online Deploy Prep + Business Hardening";

    document.body.appendChild(badge);
  }

  function bootV17() {
    insertClientPrivacyAndConsent();
    wrapStartTestWithConsent();
    insertPaymentMethods();
    insertBetterPaymentInstructions();
    wrapRenderEventsTable();
    wrapLoadBackendDataForV17();
    enhanceAdminCopyButtons();
    addCopyHelpersToTables();
    cleanerClientModeText();
    addV17FooterBadge();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootV17);
  } else {
    bootV17();
  }
})();
