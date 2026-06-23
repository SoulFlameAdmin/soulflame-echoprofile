(function () {
  "use strict";

  function allArrows() {
    const list = Array.from(document.querySelectorAll("#drawerToggle, .drawer-toggle"));
    return Array.from(new Set(list));
  }

  function fixArrow() {
    const arrows = allArrows();

    arrows.forEach(function (btn, index) {
      if (index > 0) {
        btn.classList.add("v97-duplicate-arrow");
        return;
      }

      btn.classList.remove("v97-duplicate-arrow");
      btn.id = "drawerToggle";
      btn.classList.add("drawer-toggle");

      while (btn.firstChild) {
        btn.removeChild(btn.firstChild);
      }

      btn.textContent = "";

      const open = document.body.classList.contains("drawer-open");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      btn.setAttribute("title", open ? "Close menu" : "Open menu");
    });
  }

  document.addEventListener("click", function () {
    setTimeout(fixArrow, 1);
    setTimeout(fixArrow, 50);
    setTimeout(fixArrow, 150);
  }, true);

  const observer = new MutationObserver(function () {
    fixArrow();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"]
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fixArrow);
  } else {
    fixArrow();
  }

  setInterval(fixArrow, 400);

  window.SoulFlameV97PureArrow = { fixArrow: fixArrow };
})();