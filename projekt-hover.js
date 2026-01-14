(() => {
  function init() {
    const desktopReal =
      matchMedia("(hover: hover)").matches &&
      matchMedia("(pointer: fine)").matches &&
      matchMedia("(min-width: 992px)").matches;

    if (!desktopReal) return;

    const cards = document.querySelectorAll(".projekt-item-wrapper");
    if (!cards.length) {
      console.warn("[projekt-hover] .projekt-item-wrapper not found");
      return;
    }

    cards.forEach((wrap) => {
      const tags = wrap.querySelectorAll(".tag-item");
      // pre-set stagger delays
      tags.forEach((tag, i) => {
        tag.style.transitionDelay = `${i * 70}ms`;
      });

      wrap.addEventListener("mouseenter", () => {
        wrap.classList.add("is-hover");
      });

      wrap.addEventListener("mouseleave", () => {
        wrap.classList.remove("is-hover");

        // reset delays to avoid weird reverse queue
        tags.forEach((tag) => (tag.style.transitionDelay = "0ms"));
        requestAnimationFrame(() => {
          tags.forEach((tag, i) => {
            tag.style.transitionDelay = `${i * 70}ms`;
          });
        });
      });
    });

    console.log("[projekt-hover] init OK", cards.length);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  // Webflow
  window.Webflow = window.Webflow || [];
  window.Webflow.push(init);
})();
