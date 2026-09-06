(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const growthStages = {
    free: {
      position: "Acquisition",
      title: "Make the first task useful",
      copy: "The free document translation experience lowers the commitment needed to try Translayte. Clear file guidance, language selection, and privacy reassurance help new customers begin with fewer unanswered questions.",
      signal: "Document uploaded",
      measure: "Upload completed"
    },
    quote: {
      position: "Activation",
      title: "Show value before asking for an account",
      copy: "The quote confirms the detected language, document type, word count, delivery expectation, and price. Registration follows this useful result, so the customer understands why an account is needed.",
      signal: "Quote reviewed",
      measure: "Account created after quote"
    },
    limit: {
      position: "Conversion",
      title: "Turn a limit into a recoverable decision",
      copy: "When the included free allowance ends, the completed translation stays saved. Customers can buy the exact remaining words or compare an annual plan without losing the progress they already made.",
      signal: "Free allowance reached",
      measure: "Paid continuation"
    },
    review: {
      position: "Expansion",
      title: "Offer confidence when the document creates risk",
      copy: "Human review appears after the automatic result. The product explains the difference between proofreading, professional review, and specialist review using accuracy, context, delivery time, and intended use.",
      signal: "Translation completed",
      measure: "Review selected"
    },
    return: {
      position: "Retention",
      title: "Give customers a reason to come back",
      copy: "The document workspace makes finished translations, incomplete work, review status, and available credits easy to find. A one-time task becomes a service customers can return to with confidence.",
      signal: "Document saved",
      measure: "Returning document opened"
    }
  };

  function mountIcons() {
    if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.75 } });
  }

  function getAutomaticTheme() {
    const hour = new Date().getHours();
    return hour >= 7 && hour < 19 ? "light" : "dark";
  }

  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    const nextTheme = theme === "dark" ? "light" : "dark";
    const toggle = $("[data-theme-toggle]");
    toggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
    toggle.setAttribute("title", `Switch to ${nextTheme} theme`);
    toggle.innerHTML = `<i data-lucide="${theme === "dark" ? "sun-medium" : "moon"}" aria-hidden="true"></i>`;
    mountIcons();
  }

  function bindTheme() {
    applyTheme(getAutomaticTheme());
    $("[data-theme-toggle]").addEventListener("click", () => {
      applyTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  function selectGrowthStage(stageId) {
    const stage = growthStages[stageId];
    if (!stage) return;

    $$("[data-growth-step]").forEach((button) => {
      const selected = button.dataset.growthStep === stageId;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    $("[data-growth-position]").textContent = stage.position;
    $("[data-growth-title]").textContent = stage.title;
    $("[data-growth-copy]").textContent = stage.copy;
    $("[data-growth-signal]").textContent = stage.signal;
    $("[data-growth-measure]").textContent = stage.measure;
  }

  function bindGrowthMap() {
    $$("[data-growth-step]").forEach((button) => {
      button.addEventListener("click", () => selectGrowthStage(button.dataset.growthStep));
    });
  }

  function prototypeUrl(screen) {
    return screen === "start" ? "prototype/" : `prototype/?screen=${encodeURIComponent(screen)}`;
  }

  function bindPrototypeViews() {
    const frame = $("[data-prototype-frame]");
    const shell = $("[data-prototype-shell]");

    $$("[data-prototype-screen]").forEach((button) => {
      button.addEventListener("click", () => {
        const screen = button.dataset.prototypeScreen;
        $$("[data-prototype-screen]").forEach((item) => {
          item.setAttribute("aria-pressed", String(item === button));
        });
        shell.setAttribute("aria-busy", "true");
        frame.src = prototypeUrl(screen);
      });
    });

    frame.addEventListener("load", () => shell.setAttribute("aria-busy", "false"));
  }

  function hexToRgb(hex) {
    const value = hex.replace("#", "");
    return {
      r: Number.parseInt(value.slice(0, 2), 16),
      g: Number.parseInt(value.slice(2, 4), 16),
      b: Number.parseInt(value.slice(4, 6), 16)
    };
  }

  function drawSignalField(canvas) {
    const context = canvas.getContext("2d");
    const container = canvas.parentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = ["#dcae1d", "#d9dede"].map(hexToRgb);
    const pointer = { x: -1000, y: -1000, active: false };
    let frame = 0;
    let width = 0;
    let height = 0;

    function render(time = 0) {
      context.clearRect(0, 0, width, height);
      const spacing = Math.max(10, Math.min(17, Math.floor(width / 55)));
      const wave = reducedMotion ? 0 : time * 0.001;

      for (let y = 0; y < height + spacing; y += spacing) {
        for (let x = 0; x < width + spacing; x += spacing) {
          const distanceX = x - pointer.x;
          const distanceY = y - pointer.y;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          const influence = pointer.active ? Math.max(0, 1 - distance / 245) : 0;
          const noise = Math.sin(x * 0.075 + y * 0.05 + wave) + Math.cos(y * 0.1 - wave * 0.8);
          if (noise <= 0.56 - influence * 0.48) continue;

          const size = 1.2 + influence * 4 + Math.max(0, noise - 0.7) * 1.5;
          const alpha = 0.2 + influence * 0.72;
          const color = colors[Math.abs(Math.floor((x + y) / spacing)) % colors.length];
          context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
          context.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }

      if (!reducedMotion) frame = window.requestAnimationFrame(render);
    }

    function resize() {
      const bounds = container.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (reducedMotion) render();
    }

    container.addEventListener("pointermove", (event) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    });
    container.addEventListener("pointerleave", () => {
      pointer.active = false;
    });

    new ResizeObserver(resize).observe(container);
    resize();
    render();

    window.addEventListener("pagehide", () => {
      if (frame) window.cancelAnimationFrame(frame);
    }, { once: true });
  }

  function observeNavigation() {
    const links = $$(".case-navigation a");
    const sections = links.map((link) => $(link.getAttribute("href"))).filter(Boolean);
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;

      links.forEach((link) => {
        const selected = link.getAttribute("href") === `#${current.target.id}`;
        if (selected) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-42% 0px -48% 0px", threshold: [0.01, 0.2] });

    sections.forEach((section) => observer.observe(section));
  }

  bindTheme();
  bindGrowthMap();
  bindPrototypeViews();
  drawSignalField($("[data-case-signal-canvas]"));
  observeNavigation();
  mountIcons();
})();
