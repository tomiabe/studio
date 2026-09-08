(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  function mountIcons() {
    if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  }

  function automaticTheme() {
    const hour = new Date().getHours();
    return hour >= 7 && hour < 19 ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    const toggle = $('[data-theme-toggle]');
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    toggle.setAttribute('title', `Switch to ${nextTheme} theme`);
    toggle.innerHTML = `<i data-lucide="${theme === 'dark' ? 'sun-medium' : 'moon'}" aria-hidden="true"></i>`;
    mountIcons();
  }

  function bindTheme() {
    applyTheme(automaticTheme());
    $('[data-theme-toggle]').addEventListener('click', () => {
      applyTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }

  function observeNavigation() {
    const links = $$('.case-navigation a');
    const sections = links.map((link) => $(link.getAttribute('href'))).filter(Boolean);
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
      if (!current) return;

      links.forEach((link) => {
        const selected = link.getAttribute('href') === `#${current.target.id}`;
        if (selected) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-42% 0px -48% 0px', threshold: [0.01, 0.2] });

    sections.forEach((section) => observer.observe(section));
  }

  function bindPrototypeScrollPassthrough() {
    window.addEventListener('message', (event) => {
      const message = event.data;
      if (!message || message.source !== 'eze-prototype' || message.type !== 'scroll-parent') return;
      const deltaY = Number(message.deltaY);
      if (!Number.isFinite(deltaY)) return;
      window.scrollBy({ top: deltaY, behavior: 'auto' });
    });
  }

  function drawWorkCardShader(canvas) {
    const context = canvas.getContext('2d');
    const container = canvas.parentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shaderColors = ['#ffeee3', '#001a3b'].map(hexToRgb);
    const pointer = { x: -1000, y: -1000, active: false };
    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    function resize() {
      const bounds = container.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw(0);
    }

    function draw(time) {
      context.clearRect(0, 0, width, height);
      const spacing = Math.max(10, Math.min(16, Math.floor(width / 31)));
      const wave = reducedMotion ? 0 : time * 0.001;

      for (let y = 0; y < height + spacing; y += spacing) {
        for (let x = 0; x < width + spacing; x += spacing) {
          const distance = Math.sqrt((x - pointer.x) ** 2 + (y - pointer.y) ** 2);
          const influence = pointer.active ? Math.max(0, 1 - distance / 230) : 0;
          const noise = Math.sin(x * 0.075 + y * 0.05 + wave) + Math.cos(y * 0.1 - wave * 0.8);
          const active = noise > 0.56 - influence * 0.48;
          if (!active) continue;
          const size = 1.3 + influence * 3.6 + Math.max(0, noise - 0.7) * 1.4;
          const alpha = 0.2 + influence * 0.68;
          const color = shaderColors[Math.abs(Math.floor((x + y) / spacing)) % shaderColors.length];
          context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
          context.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }

      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    }

    container.addEventListener('pointermove', (event) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    });
    container.addEventListener('pointerleave', () => { pointer.active = false; });
    new ResizeObserver(resize).observe(container);
    resize();
    draw();

    window.addEventListener('pagehide', () => {
      if (frame) window.cancelAnimationFrame(frame);
    }, { once: true });
  }

  function hexToRgb(hex) {
    const value = hex.replace('#', '');
    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16)
    };
  }

  bindTheme();
  observeNavigation();
  bindPrototypeScrollPassthrough();
  drawWorkCardShader($('[data-eze-work-card-canvas]'));
  mountIcons();
})();
