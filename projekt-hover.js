
document.addEventListener("DOMContentLoaded", function () {

    const isDesktop = window.matchMedia("(min-width: 992px)").matches;
    if (!isDesktop) return; // 🛑 NO animaciones fuera de desktop

    const items = document.querySelectorAll(".projekte-item");

    items.forEach((item) => {
        const img = item.querySelector(".u-img-main-list");
        const src = img ? (img.currentSrc || img.src) : null;

        /* === IMAGEN FLOTANTE === */
        const hoverDiv = document.createElement("div");
        hoverDiv.classList.add("aniamation-card-hover");
        document.body.appendChild(hoverDiv);

        let mx = 0, my = 0, px = 0, py = 0;
        let follow = false;

        gsap.ticker.add(() => {
            if (!follow) return;
            px += (mx - px) * 0.18;
            py += (my - py) * 0.18;
            gsap.set(hoverDiv, { x: px + 20, y: py });
        });

        /* === FRANJA NARANJA === */
        const wrapper = item.querySelector(".card-projekte-list");

        if (wrapper) {
            const band = document.createElement("div");
            band.classList.add("hover-band");
            wrapper.prepend(band);

            item.addEventListener("mouseenter", () => {
                band.style.transform = "translateY(0%)";
            });

            item.addEventListener("mouseleave", () => {
                band.style.transform = "translateY(100%)";
            });
        }

        /* === ENTER === */
        item.addEventListener("mouseenter", (e) => {
            if (src) hoverDiv.style.backgroundImage = `url("${src}")`;

            follow = true;
            mx = e.clientX;
            my = e.clientY;
            px = mx;
            py = my;

            gsap.set(hoverDiv, { x: mx, y: my });
            gsap.to(hoverDiv, { opacity: 1, duration: 0.18 });
        });

        /* === MOVE === */
        item.addEventListener("mousemove", (e) => {
            mx = e.clientX;
            my = e.clientY;
        });

        /* === LEAVE === */
        item.addEventListener("mouseleave", () => {
            follow = false;
            gsap.to(hoverDiv, { opacity: 0, duration: 0.15 });
        });

        document.addEventListener("mousemove", (e) => {
            if (!e.target.closest(".projekte-item")) {
                follow = false;
                gsap.to(hoverDiv, { opacity: 0, duration: 0.15 });
            }
        });
    });
});
</script>



<script>
document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------------------
       DETECTAR touch / mouse REAL
    ---------------------------------------- */
    const isTouchDevice =
        window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0;

    const width = window.innerWidth;

    /* ---------------------------------------
       ELEMENTOS
    ---------------------------------------- */
    const wrapList = document.querySelector(".layout-list-desktop");
    const wrapGrid = document.querySelector(".layout-grid-mobile");
    const toggleWrapper = document.querySelector(".view-toggle-wrapper");
    const buttons = document.querySelectorAll(".view-btn");

    /* ---------------------------------------
       LÓGICA DE DESKTOP REAL
       SOLO aquí mostramos los botones
    ---------------------------------------- */
    if (!isTouchDevice && width >= 1200) {

        // Mostrar botones
        toggleWrapper.style.display = "block";

        // Mostrar LIST por defecto
        wrapList.style.display = "block";
        wrapGrid.style.display = "none";

        buttons.forEach((btn) => {
            btn.addEventListener("click", () => {

                buttons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const view = btn.dataset.view;

                if (view === "list") {
                    wrapList.style.display = "block";
                    wrapGrid.style.display = "none";
                } else {
                    wrapList.style.display = "none";
                    wrapGrid.style.display = "block";
                }
            });
        });

        return; // seguimos con animaciones en desktop
    }

    /* ---------------------------------------
       SI NO ES DESKTOP CON MOUSE → GRID
    ---------------------------------------- */
    wrapList.style.display = "none";
    wrapGrid.style.display = "block";
    toggleWrapper.style.display = "none";
});


