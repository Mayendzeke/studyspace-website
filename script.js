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
  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const subject = encodeURIComponent("Study Space website enquiry — " + data.get("role"));
    const body = encodeURIComponent(
      "Name: " + data.get("name") + "\nEmail: " + data.get("email") +
      "\nRole: " + data.get("role") + "\n\n" + data.get("message")
    );
    window.location.href = "mailto:ayandaagustozwane@gmail.com?subject=" + subject + "&body=" + body;
  });


/* Scroll progress, gentle card depth and network recovery feedback. */
(() => {
  const progress = document.getElementById("scrollProgress");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const updateProgress = () => {
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollable * 100)) : 0;
    progress.style.width = percent + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  updateProgress();

  if (!reducedMotion && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    document.querySelectorAll(".feature-card,.price-card,.testimonial-card").forEach(card => {
      card.addEventListener("pointermove", event => {
        if (event.pointerType === "touch") return;
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        card.style.transform = "perspective(950px) rotateX(" + (y * -4) + "deg) rotateY(" + (x * 4) + "deg) translateY(-3px)";
      }, { passive: true });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  const status = document.getElementById("connectionStatus");
  let recoveryTimer;
  const showConnection = online => {
    if (!status) return;
    window.clearTimeout(recoveryTimer);
    status.className = online ? "is-visible is-online" : "is-visible is-offline";
    status.innerHTML = online
      ? '<span class="connection-symbol" aria-hidden="true">✓</span><span><strong>Back online. Nice comeback!</strong><small>Your connection is back. You can keep exploring.</small></span>'
      : '<span class="connection-symbol" aria-hidden="true">⌁</span><span><strong>Connection lost — tiny study break.</strong><small>The internet stepped out. Reconnect to continue using online features.</small></span>';
    status.setAttribute("aria-live", "polite");
    if (online) recoveryTimer = window.setTimeout(() => { status.className = ""; }, 3800);
  };
  window.addEventListener("offline", () => showConnection(false));
  window.addEventListener("online", () => showConnection(true));
  if (!navigator.onLine) showConnection(false);
})();
