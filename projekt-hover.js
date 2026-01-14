(() => {
  const desktopReal =
    matchMedia("(hover: hover)").matches &&
    matchMedia("(pointer: fine)").matches;

  if (!desktopReal) return;

  document.querySelectorAll(".projekt-item-wrapper").forEach((wrap) => {
    const tags = wrap.querySelectorAll(".tag-item");
    tags.forEach((tag, i) => {
      tag.style.transitionDelay = `${i * 70}ms`;
    });

    wrap.addEventListener("mouseleave", () => {
      // reset delay para que al salir no haga cola rara
      tags.forEach((tag) => (tag.style.transitionDelay = "0ms"));
      // y al entrar otra vez se re-aplica
      requestAnimationFrame(() => {
        tags.forEach((tag, i) => (tag.style.transitionDelay = `${i * 70}ms`));
      });
    });
  });
})();

    
