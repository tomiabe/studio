(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const sequence = (round, day, files) => files.map((file) => ({ file, round, day }));
  const assets = [
    ...sequence("round-1", "monday", [
      "monday-13.jpg", "monday-24.jpg", "monday-25.jpg", "monday-26.jpg", "monday-27.jpg",
      "monday-28.jpg", "monday-29.jpg", "monday-30.jpg", "monday-31.jpg", "monday-14.jpg",
      "monday-15.jpg", "monday-16.jpg", "monday-17.jpg", "monday-18.jpg", "monday-19.jpg",
      "monday-20.jpg", "monday-21.jpg", "monday-22.jpg", "monday-23.jpg"
    ]),
    ...sequence("round-1", "wednesday", [
      "wednesday-video-designs-32.jpg", "wednesday-video-designs-33.jpg", "wednesday-video-designs-34.jpg",
      "wednesday-video-designs-35.jpg", "wednesday-video-designs-36.jpg", "wednesday-video-designs-37.jpg",
      "wednesday-video-designs-38.jpg"
    ]),
    ...sequence("round-1", "friday", [
      "friday-01.jpg", "friday-05.jpg", "friday-02.jpg", "friday-06.jpg", "friday-07.jpg",
      "friday-08.jpg", "friday-09.jpg", "friday-10.jpg", "friday-11.jpg", "friday-12.jpg",
      "friday-04.jpg", "friday-03.jpg"
    ]),
    ...sequence("round-2", "monday", [
      "monday-06.jpg", "monday-07.jpg", "monday-08.jpg", "monday-09.jpg", "monday-10.jpg",
      "monday-11.jpg", "monday-12.jpg"
    ]),
    ...sequence("round-2", "wednesday", [
      "wednesday-15.jpg", "wednesday-16.jpg", "wednesday-13.jpg", "wednesday-14.jpg"
    ]),
    ...sequence("round-2", "friday", [
      "friday-04.jpg", "friday-01.jpg", "friday-05.jpg", "friday-02.jpg", "friday-03.jpg"
    ])
  ];

  const gallery = $("[data-asset-gallery]");
  const lightbox = $("[data-lightbox]");
  const lightboxImage = $("[data-lightbox-image]");
  const lightboxCaption = $("[data-lightbox-caption]");
  let visibleAssets = assets;
  let activeIndex = 0;

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

  function hexToRgb(hex) {
    const value = hex.replace("#", "");
    return {
      r: Number.parseInt(value.slice(0, 2), 16),
      g: Number.parseInt(value.slice(2, 4), 16),
      b: Number.parseInt(value.slice(4, 6), 16)
    };
  }

  function drawSignalField(canvas) {
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const container = canvas.parentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = ["#00303f", "#d9dede"].map(hexToRgb);
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

  function renderGallery(filter = "all") {
    visibleAssets = assets.filter((asset) => filter === "all" || asset.round === filter || asset.day === filter);
    gallery.innerHTML = visibleAssets.map((asset, index) => {
      return `<figure class="asset-tile" data-asset-index="${index}"><img src="../../assets/work/translayte-creative/${asset.round}/${asset.file}" alt="Translayte campaign design" loading="lazy" /></figure>`;
    }).join("");

    $$("[data-asset-index]", gallery).forEach((tile) => {
      tile.addEventListener("click", () => openLightbox(Number(tile.dataset.assetIndex)));
    });
  }

  function openLightbox(index) {
    activeIndex = index;
    const asset = visibleAssets[activeIndex];
    if (!asset) return;
    lightboxImage.src = `../../assets/work/translayte-creative/${asset.round}/${asset.file}`;
    lightboxImage.alt = "Translayte campaign design";
    lightboxCaption.textContent = `${activeIndex + 1} of ${visibleAssets.length}`;
    lightbox.hidden = false;
    document.body.classList.add("drawer-open");
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("drawer-open");
  }

  function stepLightbox(direction) {
    const nextIndex = (activeIndex + direction + visibleAssets.length) % visibleAssets.length;
    openLightbox(nextIndex);
  }

  function bindEvents() {
    applyTheme(getAutomaticTheme());
    $("[data-theme-toggle]").addEventListener("click", () => {
      applyTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
    });

    $$("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        $$("[data-filter]").forEach((item) => {
          const selected = item === button;
          item.classList.toggle("is-active", selected);
          item.setAttribute("aria-pressed", String(selected));
        });
        renderGallery(button.dataset.filter);
      });
    });

    $("[data-lightbox-close]").addEventListener("click", closeLightbox);
    $("[data-lightbox-previous]").addEventListener("click", () => stepLightbox(-1));
    $("[data-lightbox-next]").addEventListener("click", () => stepLightbox(1));
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (lightbox.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") stepLightbox(-1);
      if (event.key === "ArrowRight") stepLightbox(1);
    });
  }

  renderGallery();
  bindEvents();
  drawSignalField($('[data-creative-signal-canvas]'));
})();
