(() => {
  document.addEventListener("DOMContentLoaded", () => {

    if (!window.matchMedia("(min-width: 992px)").matches) return;

    const hasGSAP = typeof window.gsap !== "undefined";
    const items = document.querySelectorAll(".projekt-item");

    items.forEach((card) => {

      /* ---------- INJECT WAVE ---------- */
      const wrapper = card.querySelector(".card-projekte-list");
      if (wrapper && !wrapper.querySelector(".hover-band")) {
        const band = document.createElement("div");
        band.className = "hover-band";
        wrapper.prepend(band);
      }

      /* ---------- TRIGGER ---------- */
      const trigger =
        card.querySelector(".card-link-wrapp") ||
        card.querySelector(".card-projekte-list-link") ||
        card;

      /* ---------- FLOATING IMAGE ---------- */
      let hoverDiv, follow = false;
      let mx = 0, my = 0, px = 0, py = 0;

      if (hasGSAP) {
        hoverDiv = document.createElement("div");
        hoverDiv.className = "aniamation-card-hover";
        document.body.appendChild(hoverDiv);

        const img = card.querySelector("img");
        if (img) hoverDiv.style.backgroundImage = `url("${img.src}")`;

        gsap.ticker.add(() => {
          if (!follow) return;
          px += (mx - px) * 0.18;
          py += (my - py) * 0.18;
          gsap.set(hoverDiv, { x: px + 24, y: py });
        });
      }

      /* ---------- EVENTS ---------- */
      trigger.addEventListener("mouseenter", (e) => {
        card.classList.add("is-hover");

        if (hasGSAP && hoverDiv) {
          follow = true;
          mx = e.clientX; my = e.clientY;
          px = mx; py = my;
          gsap.set(hoverDiv, { x: mx, y: my });
          gsap.to(hoverDiv, { opacity: 1, duration: 0.18 });
        }
      });

      trigger.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
      });

      trigger.addEventListener("mouseleave", () => {
        card.classList.remove("is-hover");

        if (hasGSAP && hoverDiv) {
          follow = false;
          gsap.to(hoverDiv, { opacity: 0, duration: 0.15 });
        }
      });
    });
  });
})();
