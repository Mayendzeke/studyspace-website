(() => {
  const splash = document.getElementById("splash");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hideSplash = () => window.setTimeout(() => splash?.classList.add("hide"), reducedMotion ? 80 : 1250);
  if (sessionStorage.getItem("studyspace-welcomed")) hideSplash();
  else { hideSplash(); sessionStorage.setItem("studyspace-welcomed", "1"); }

  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  menuToggle?.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  mobileNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), {threshold: .12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const backTop = document.getElementById("backTop");
  const updateScroll = () => backTop?.classList.toggle("visible", window.scrollY > 550);
  window.addEventListener("scroll", updateScroll, {passive:true});
  updateScroll();
  backTop?.addEventListener("click", () => window.scrollTo({top:0,behavior:reducedMotion?"auto":"smooth"}));
  document.getElementById("year").textContent = new Date().getFullYear();

  const glow = document.getElementById("cursorGlow");
  if (glow && window.matchMedia("(hover:hover) and (pointer:fine)").matches && !reducedMotion) {
    document.addEventListener("pointermove", event => {
      glow.style.left = event.clientX + "px";
      glow.style.top = event.clientY + "px";
      glow.style.opacity = ".9";
    }, {passive:true});
    document.addEventListener("pointerleave", () => glow.style.opacity = "0");
  }

  document.querySelectorAll(".feature-card,.contact-link,.button").forEach(el => {
    el.addEventListener("pointermove", event => {
      if (event.pointerType === "touch" || reducedMotion) return;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      el.style.setProperty("--shine-x", (x * 30) + "px");
      el.style.setProperty("--shine-y", (y * 30) + "px");
    }, {passive:true});
  });
})();