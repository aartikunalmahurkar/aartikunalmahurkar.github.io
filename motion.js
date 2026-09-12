(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  document.documentElement.classList.add("motion-ready");

  // Page progress bar
  const progress = document.createElement("div");
  progress.className = "page-progress";
  document.body.appendChild(progress);

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progress.style.transform = `scaleX(${value})`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  // Scroll reveal
  const revealSelectors = [
    ".section-label",
    ".kicker",
    ".signal-grid article",
    ".principles > div",
    ".work-card",
    ".lens-stage",
    ".artifact-card",
    ".timeline article",
    ".cap-grid article",
    ".education-grid article",
    ".signature-points p",
    ".contact-card"
  ];

  const revealTargets = [...document.querySelectorAll(revealSelectors.join(","))];
  revealTargets.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", `${(index % 4) * 55}ms`);
  });

  if (!reduce && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("revealed"));
  }

  // Active nav state
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => {
        link.classList.toggle("active-section", link.getAttribute("href") === `#${visible.target.id}`);
      });
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0, .2, .5] });
    sections.forEach(section => navObserver.observe(section));
  }

  // Hero photo and floating cards get subtle parallax on desktop
  if (finePointer && !reduce) {
    const hero = document.querySelector(".hero-visual");
    const portrait = document.querySelector(".portrait-shell");
    const floaters = [...document.querySelectorAll(".floating-card")];

    if (hero && portrait) {
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        portrait.style.transform = `translate3d(${x * 10}px, ${y * 6}px, 0)`;
        floaters.forEach((card, i) => {
          const depth = 10 + (i * 4);
          card.style.transform = `translate3d(${x * depth}px, ${y * depth * .7}px, 0)`;
        });
      });
      hero.addEventListener("pointerleave", () => {
        portrait.style.transform = "";
        floaters.forEach(card => card.style.transform = "");
      });
    }

    // Premium tilt on work cards
    document.querySelectorAll(".work-card").forEach(card => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${-y * 3.2}deg) rotateY(${x * 4.2}deg) translateY(-5px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  // Animate the Aarti OS panel when role switches
  document.querySelectorAll(".lens-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const stage = document.querySelector(".lens-stage");
      if (!stage) return;
      stage.classList.remove("panel-swap");
      void stage.offsetWidth;
      stage.classList.add("panel-swap");
    });
  });

  // Subtle magnetic CTA effect on desktop
  if (finePointer && !reduce) {
    document.querySelectorAll(".btn.primary, .btn.accent, .header-cta").forEach(btn => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * .05}px, ${y * .07}px) translateY(-2px)`;
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.transform = "";
      });
    });
  }

  // Soft numeric count-up where numbers exist
  const animateNumber = (el) => {
    const original = el.textContent.trim();
    const match = original.match(/^(\d+)(\+?)$/);
    if (!match || el.dataset.animated) return;
    el.dataset.animated = "1";
    const target = Number(match[1]);
    const suffix = match[2] || "";
    const start = performance.now();
    const duration = 800;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = original;
    };
    requestAnimationFrame(step);
  };

  const numberEls = document.querySelectorAll(".hero-signals b");
  if (!reduce && "IntersectionObserver" in window) {
    const nObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateNumber(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: .8 });
    numberEls.forEach(el => nObs.observe(el));
  }
})();