(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const desktopReal =
      window.matchMedia("(min-width: 992px)").matches &&
      window.matchMedia("(hover: hover)").matches &&
      window.matchMedia("(pointer: fine)").matches;

    if (!desktopReal) return;

    const hasGSAP = typeof window.gsap !== "undefined";
    if (!hasGSAP) {
      console.warn("[projekt-hover] GSAP not found. Floating preview disabled.");
    }

    const items = Array.from(document.querySelectorAll(".projekte-item"));
    if (!items.length) return;

    // ===== Floating preview (ONE global) =====
    const hoverDiv = document.createElement("div");
    hoverDiv.className = "aniamation-card-hover";
    document.body.appendChild(hoverDiv);

    let mx = 0, my = 0, px = 0, py = 0;
    let follow = false;

    if (hasGSAP) {
      gsap.ticker.add(() => {
        if (!follow) return;
        px += (mx - px) * 0.18;
        py += (my - py) * 0.18;
        gsap.set(hoverDiv, { x: px + 24, y: py });
      });
    }

    // ===== Helpers =====
    const setPreviewImage = (item) => {
      const img = item.querySelector(".u-img-main-list, img");
      const src = img ? (img.currentSrc || img.src) : "";
      if (src) hoverDiv.style.backgroundImage = `url("${src}")`;
    };

    const showPreview = (e) => {
      if (!hasGSAP) return;
      follow = true;
      mx = e.clientX; my = e.clientY;
      px = mx; py = my;
      gsap.set(hoverDiv, { x: mx, y: my });
      gsap.to(hoverDiv, { opacity: 1, duration: 0.18, overwrite: true });
    };

    const hidePreview = () => {
      if (!hasGSAP) return;
      follow = false;
      gsap.to(hoverDiv, { opacity: 0, duration: 0.15, overwrite: true });
    };

    // ===== Setup each item =====
    items.forEach((item) => {
      // inject band once
      const wrapper = item.querySelector(".card-projekte-list");
      if (wrapper && !wrapper.querySelector(".hover-band")) {
        const band = document.createElement("div");
        band.className = "hover-band";
        wrapper.prepend(band);
      }

      item.addEventListener("mouseenter", (e) => {
        item.classList.add("is-hover");
        setPreviewImage(item);
        showPreview(e);
      });

      item.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
      });

      item.addEventListener("mouseleave", () => {
        item.classList.remove("is-hover");
        hidePreview();
      });
    });

    // Safety: if mouse leaves all cards, hide preview
    document.addEventListener("mousemove", (e) => {
      if (!e.target.closest(".projekte-item")) hidePreview();
    });
  });
})();


