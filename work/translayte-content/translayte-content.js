(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const imageSequence = (round, files) => files.map((file) => ({ kind: "image", round, file }));
  const videoMedia = (file, poster, title, duration) => ({ kind: "video", file, poster, title, duration });

  const storySets = [
    {
      number: "01",
      label: "A familiar opening",
      title: "Start with the life around the document",
      copy: "Travel preparation gave the work an easy, human entry point. The story moved from everyday practical advice to the certified documents that can make an international move possible.",
      role: "Awareness",
      action: "Make the need feel familiar",
      media: imageSequence("round-1", [
        "monday-13.jpg", "monday-14.jpg", "monday-15.jpg", "monday-16.jpg", "monday-17.jpg",
        "monday-18.jpg", "monday-19.jpg", "monday-20.jpg", "monday-21.jpg", "monday-22.jpg",
        "monday-23.jpg", "monday-24.jpg", "monday-25.jpg", "monday-26.jpg", "monday-27.jpg",
        "monday-28.jpg", "monday-29.jpg", "monday-30.jpg", "monday-31.jpg"
      ])
    },
    {
      number: "02",
      label: "Clarity before commitment",
      title: "Answer the doubts before they become blockers",
      copy: "The educational sequence made a specialist service easier to approach by answering the questions people carry into a quote, from machine translation myths to the different names used for certified work around the world.",
      role: "Education",
      action: "Build confidence through clarity",
      media: [
        ...imageSequence("round-2", [
          "monday-06.jpg", "monday-07.jpg", "monday-08.jpg", "monday-09.jpg", "monday-10.jpg",
          "monday-11.jpg", "monday-12.jpg"
        ]),
        ...imageSequence("round-1", [
          "wednesday-video-designs-32.jpg", "wednesday-video-designs-33.jpg", "wednesday-video-designs-34.jpg",
          "wednesday-video-designs-35.jpg", "wednesday-video-designs-36.jpg", "wednesday-video-designs-37.jpg",
          "wednesday-video-designs-38.jpg"
        ])
      ]
    },
    {
      number: "03",
      label: "A clear next step",
      title: "Turn official requirements into something people can act on",
      copy: "The final story set explained certified translation, legalisation, and apostille in practical terms, then pointed towards Translayte when the paperwork became consequential.",
      role: "Conversion",
      action: "Move from understanding to action",
      media: [
        ...imageSequence("round-2", [
          "wednesday-13.jpg", "wednesday-14.jpg", "wednesday-15.jpg", "wednesday-16.jpg",
        ]),
        ...imageSequence("round-1", [
          "friday-01.jpg", "friday-02.jpg", "friday-03.jpg", "friday-04.jpg", "friday-05.jpg",
          "friday-06.jpg", "friday-07.jpg", "friday-08.jpg", "friday-09.jpg", "friday-10.jpg",
          "friday-11.jpg", "friday-12.jpg"
        ]),
        ...imageSequence("round-2", [
          "friday-01.jpg", "friday-02.jpg", "friday-03.jpg", "friday-04.jpg", "friday-05.jpg"
        ])
      ],
      videos: [
        videoMedia("translayte-legalisation.mp4", "round-1/wednesday-video-designs-32.jpg", "Let's bust some myths about certified translations", "35 seconds"),
        videoMedia("translayte-legalisation-short.mp4", "round-2/wednesday-16.jpg", "Why do you need legalisation?", "20 seconds")
      ]
    }
  ];

  const dayOrder = { monday: 1, wednesday: 2, friday: 3 };
  const assets = storySets.flatMap((story) => story.media
    .filter((media) => media.kind === "image")
    .map((media) => ({ ...media, set: `set-${Number(story.number)}` })))
    .sort((a, b) => {
      const setDifference = Number(a.set.slice(4)) - Number(b.set.slice(4));
      if (setDifference) return setDifference;
      const aDay = a.file.split("-")[0];
      const bDay = b.file.split("-")[0];
      const dayDifference = (dayOrder[aDay] || 99) - (dayOrder[bDay] || 99);
      if (dayDifference) return dayDifference;
      const aNumber = Number(a.file.match(/(\d+)\.jpg$/)?.[1] || 0);
      const bNumber = Number(b.file.match(/(\d+)\.jpg$/)?.[1] || 0);
      return aNumber - bNumber;
    });

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

  function mediaPath(media) {
    if (media.kind === "video") return `../../assets/work/translayte-creative/video/${media.file}`;
    return `../../assets/work/translayte-creative/${media.round}/${media.file}`;
  }

  function renderStorySets() {
    const container = $("[data-story-sets]");
    if (!container) return;

    container.innerHTML = storySets.map((story, storyIndex) => `
      <article class="story-set ${storyIndex % 2 ? "story-set-reverse" : ""}" data-story-set>
        <div class="story-set-copy">
          <span class="story-set-label">${story.number} / ${story.label}</span>
          <h3>${story.title}</h3>
          <p>${story.copy}</p>
          <dl class="story-set-facts">
            <div><dt>Role</dt><dd>${story.role}</dd></div>
            <div><dt>Designed to</dt><dd>${story.action}</dd></div>
          </dl>
        </div>
        <div class="story-carousel" data-story-carousel data-story-index="${storyIndex}" aria-label="${story.title}">
          <div class="story-slides">
            ${story.media.map((media, mediaIndex) => media.kind === "video" ? `
              <figure class="story-slide ${mediaIndex === 0 ? "is-active" : ""}" data-story-slide="${mediaIndex}" ${mediaIndex === 0 ? "" : "hidden"}>
                <div class="story-video-frame">
                  <video controls muted loop playsinline preload="metadata" poster="../../assets/work/translayte-creative/${media.poster}" aria-label="${media.title}" data-story-video>
                    <source src="${mediaPath(media)}" type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                  <span class="story-video-label"><i data-lucide="play" aria-hidden="true"></i>${media.duration}</span>
                </div>
                <figcaption>${media.title}</figcaption>
              </figure>
            ` : `
              <figure class="story-slide ${mediaIndex === 0 ? "is-active" : ""}" data-story-slide="${mediaIndex}" ${mediaIndex === 0 ? "" : "hidden"}>
                <button type="button" class="story-image-button" data-story-image="${storyIndex}:${mediaIndex}" aria-label="Open visual ${mediaIndex + 1} of ${story.media.length}">
                  <img src="${mediaPath(media)}" alt="${story.title}" loading="${mediaIndex === 0 ? "eager" : "lazy"}" />
                </button>
              </figure>
            `).join("")}
          </div>
          <div class="story-carousel-controls">
            <button type="button" class="story-carousel-button" data-story-previous aria-label="Previous visual"><i data-lucide="arrow-left" aria-hidden="true"></i></button>
            <span class="story-carousel-count"><span data-story-current>01</span> / ${String(story.media.length).padStart(2, "0")}</span>
            <button type="button" class="story-carousel-button" data-story-next aria-label="Next visual"><i data-lucide="arrow-right" aria-hidden="true"></i></button>
          </div>
        </div>
      </article>
    `).join("");

    mountIcons();
  }

  function renderGallery(filter = "all") {
    visibleAssets = assets.filter((asset) => filter === "all" || asset.set === filter);
    gallery.innerHTML = visibleAssets.map((asset, index) => {
      return `<figure class="asset-tile" data-asset-index="${index}"><img src="${mediaPath(asset)}" alt="Translayte content visual" loading="lazy" /></figure>`;
    }).join("");

    $$('[data-asset-index]', gallery).forEach((tile) => {
      tile.addEventListener("click", () => openLightbox(Number(tile.dataset.assetIndex)));
    });
  }

  function setStorySlide(carousel, nextIndex) {
    const slides = $$('[data-story-slide]', carousel);
    const current = Math.max(0, Math.min(nextIndex, slides.length - 1));
    slides.forEach((slide, index) => {
      const active = index === current;
      slide.classList.toggle("is-active", active);
      slide.hidden = !active;
      const video = $("video", slide);
      if (video) {
        if (active && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.play().catch(() => {});
        else video.pause();
      }
    });
    $("[data-story-current]", carousel).textContent = String(current + 1).padStart(2, "0");
    carousel.dataset.activeSlide = String(current);
  }

  function bindStoryCarousels() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    $$('[data-story-carousel]').forEach((carousel) => {
      const slides = $$('[data-story-slide]', carousel);
      let timer;
      const advance = (direction = 1) => {
        const current = Number(carousel.dataset.activeSlide || 0);
        setStorySlide(carousel, (current + direction + slides.length) % slides.length);
      };
      const stop = () => {
        if (timer) window.clearInterval(timer);
      };
      const start = () => {
        if (!reducedMotion && !timer) timer = window.setInterval(() => advance(), 4200);
      };

      $("[data-story-previous]", carousel).addEventListener("click", () => { stop(); advance(-1); start(); });
      $("[data-story-next]", carousel).addEventListener("click", () => { stop(); advance(); start(); });
      carousel.addEventListener("mouseenter", stop);
      carousel.addEventListener("mouseleave", start);
      carousel.addEventListener("focusin", stop);
      carousel.addEventListener("focusout", (event) => {
        if (!carousel.contains(event.relatedTarget)) start();
      });
      $$('[data-story-image]', carousel).forEach((button) => {
        button.addEventListener("click", () => {
          const [, mediaIndex] = button.dataset.storyImage.split(":").map(Number);
          const story = storySets[Number(carousel.dataset.storyIndex)];
          const imageMedia = story.media[mediaIndex];
          visibleAssets = [imageMedia, ...story.media.filter((media) => media.kind === "image" && media !== imageMedia)];
          openLightbox(0);
        });
      });
      setStorySlide(carousel, 0);
      start();
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

  renderStorySets();
  renderGallery();
  bindStoryCarousels();
  bindEvents();
  drawSignalField($('[data-creative-signal-canvas]'));
})();
