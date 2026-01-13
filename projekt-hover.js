(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const isDesktop = window.matchMedia("(min-width: 992px)").matches;
    if (!isDesktop) return;

    // Requiere GSAP (si no está, desactiva solo la parte del floating image)
    const hasGSAP = typeof window.gsap !== "undefined";

    const items = document.querySelectorAll(".projekt-item, .projekte-item");

    items.forEach((card) => {
      // Normaliza: queremos tratarlo como .projekt-item
      card.classList.add("projekt-item");

      // Trigger: preferimos .link-hover si existe, si no usamos el card
      const trigger = card.previousElementSibling?.classList?.contains("link-hover")
        ? card.previousElementSibling
        : (card.querySelector(".link-hover") || card);

      // Hover band injection (optional)
      const wrapper = card.querySelector(".card-projekte-list");
      if (wrapper && !wrapper.querySelector(".hover-band")) {
        const band = document.createElement("div");
        band.className = "hover-band";
        wrapper.prepend(band);
      }

      // Floating image (optional)
      let hoverDiv = null;
      let mx = 0, my = 0, px = 0, py = 0;
      let follow = false;

      if (hasGSAP) {
        hoverDiv = document.createElement("div");
        hoverDiv.className = "aniamation-card-hover";
        document.body.appendChild(hoverDiv);

        // pick image source
        const img = card.querySelector(".u-img-main-list, img");
        const src = img ? (img.currentSrc || img.src) : null;

        if (src) hoverDiv.style.backgroundImage = `url("${src}")`;

        gsap.ticker.add(() => {
          if (!follow) return;
          px += (mx - px) * 0.18;
          py += (my - py) * 0.18;
          gsap.set(hoverDiv, { x: px + 20, y: py });
        });

        // update image if it changes (rare)
        card.addEventListener("mouseenter", () => {
          const img2 = card.querySelector(".u-img-main-list, img");
          const src2 = img2 ? (img2.currentSrc || img2.src) : null;
          if (src2) hoverDiv.style.backgroundImage = `url("${src2}")`;
        });
      }

      function onEnter(e) {
        card.classList.add("is-hover");

        if (hasGSAP && hoverDiv) {
          follow = true;
          mx = e.clientX; my = e.clientY;
          px = mx; py = my;
          gsap.set(hoverDiv, { x: mx, y: my });
          gsap.to(hoverDiv, { opacity: 1, duration: 0.18, overwrite: true });
        }
      }

      function onMove(e) {
        mx = e.clientX;
        my = e.clientY;
      }

      function onLeave() {
        card.classList.remove("is-hover");

        if (hasGSAP && hoverDiv) {
          follow = false;
          gsap.to(hoverDiv, { opacity: 0, duration: 0.15, overwrite: true });
        }
      }

      trigger.addEventListener("mouseenter", onEnter);
      trigger.addEventListener("mousemove", onMove);
      trigger.addEventListener("mouseleave", onLeave);
    });

    // Safety: if mouse leaves all cards, hide floating image(s)
    if (hasGSAP) {
      document.addEventListener("mousemove", (e) => {
        if (!e.target.closest(".projekt-item")) {
          document.querySelectorAll(".aniamation-card-hover").forEach((el) => {
            gsap.to(el, { opacity: 0, duration: 0.15, overwrite: true });
          });
        }
      });
    }
  });
})();
