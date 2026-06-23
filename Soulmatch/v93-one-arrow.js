(function () {
  "use strict";

  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return Array.from(document.querySelectorAll(s)); }

  function fixArrow() {
    const arrows = qsa(".drawer-toggle");

    arrows.forEach((btn, index) => {
      if (index > 0) {
        btn.classList.add("v93-duplicate-arrow");
        return;
      }

      btn.classList.remove("v93-duplicate-arrow");
      btn.id = "drawerToggle";
      btn.innerHTML = "";
      btn.textContent = "";
      btn.setAttribute("aria-label", document.body.classList.contains("drawer-open") ? "Close menu" : "Open menu");
      btn.setAttribute("title", document.body.classList.contains("drawer-open") ? "Close menu" : "Open menu");
    });
  }

  document.addEventListener("click", function () {
    setTimeout(fixArrow, 10);
    setTimeout(fixArrow, 120);
  }, true);

  const observer = new MutationObserver(fixArrow);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"]
  });

  fixArrow();
  setInterval(fixArrow, 700);

  window.SoulFlameV93OneArrow = { fixArrow };
})();