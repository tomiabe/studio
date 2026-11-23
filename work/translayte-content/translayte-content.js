(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector("[data-theme-toggle]");
  const themeKey = "studio-reel-theme-override";
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

  const lenis = window.Lenis && !motionPreference.matches ? new window.Lenis({
    autoRaf: true,
    anchors: true,
    duration: 1.05,
    easing: (progress) => Math.min(1, 1.001 - Math.pow(2, -10 * progress)),
    smoothWheel: true,
    syncTouch: false,
    stopInertiaOnNavigate: true
  }) : null;
  if (lenis) window.studioLenis = lenis;

  function syncLenisState() {
    if (!lenis) return;
    const overlayOpen = document.body.classList.contains("menu-open") || document.body.classList.contains("drawer-open");
    if (overlayOpen || motionPreference.matches) lenis.stop();
    else lenis.start();
  }
  if (lenis) {
    const bodyObserver = new MutationObserver(syncLenisState);
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    motionPreference.addEventListener("change", syncLenisState);
    window.addEventListener("pagehide", () => bodyObserver.disconnect(), { once: true });
    syncLenisState();
  }

  function automaticTheme(now) {
    const hour = now.getHours();
    return hour >= 19 || hour < 7 ? "dark" : "light";
  }

  function nextBoundary(now) {
    const next = new Date(now);
    if (now.getHours() >= 19) {
      next.setDate(next.getDate() + 1);
      next.setHours(7, 0, 0, 0);
    } else if (now.getHours() < 7) {
      next.setHours(7, 0, 0, 0);
    } else {
      next.setHours(19, 0, 0, 0);
    }
    return next.getTime();
  }

  function themeChoice(now) {
    try {
      const choice = JSON.parse(localStorage.getItem(themeKey));
      if (choice && choice.expires > now.getTime() && ["light", "dark"].includes(choice.theme)) return choice.theme;
    } catch (_) {}
    return automaticTheme(now);
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    themeButton.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " theme");
    themeButton.title = "Switch theme until the next scheduled change";
    document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#131515" : "#fffafb";
  }

  function refreshTheme() { setTheme(themeChoice(new Date())); }
  refreshTheme();
  themeButton.addEventListener("click", () => {
    const now = new Date();
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(themeKey, JSON.stringify({ theme: next, expires: nextBoundary(now) })); } catch (_) {}
    setTheme(next);
  });
  window.setInterval(refreshTheme, 60000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshTheme(); });

  const menuButton = document.querySelector("[data-menu-toggle]");
  const nav = document.getElementById("site-navigation");
  function closeMenu() {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
  }
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "Close" : "Menu";
    if (open) document.querySelector(".site-header").classList.remove("is-hidden");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

  const header = document.querySelector(".site-header");
  let lastScroll = window.scrollY;
  function updateHeader() {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 140);
    if (y < 30 || nav.classList.contains("is-open") || header.contains(document.activeElement)) header.classList.remove("is-hidden");
    else if (y > lastScroll) header.classList.add("is-hidden");
    else if (y < lastScroll) header.classList.remove("is-hidden");
    lastScroll = y;
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  const topButton = document.querySelector("[data-back-to-top]");
  const footer = document.querySelector(".site-footer");
  function updateTop() {
    const visible = window.scrollY > Math.max(600, window.innerHeight * 0.8);
    topButton.classList.toggle("is-visible", visible);
    topButton.tabIndex = visible ? 0 : -1;
    topButton.setAttribute("aria-hidden", String(!visible));
    if (footer) {
      const footerTop = footer.getBoundingClientRect().top;
      topButton.style.bottom = Math.max(22, window.innerHeight - footerTop + 16) + "px";
    }
  }
  topButton.addEventListener("click", () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: motionPreference.matches ? "auto" : "smooth" });
  });
  window.addEventListener("scroll", updateTop, { passive: true });
  window.addEventListener("resize", updateTop);
  updateTop();

  const heroImg = document.querySelector(".hero-image-frame img");
  const heroSources = [
    "../../assets/work/translayte-creative/round-1/monday-13.jpg",
    "../../assets/work/translayte-creative/round-2/monday-06.jpg",
    "../../assets/work/translayte-creative/round-2/wednesday-16.jpg"
  ];
  if (heroImg && heroSources.length > 1) {
    const heroOverlay = document.createElement("img");
    heroOverlay.className = "hero-rotate-image";
    heroOverlay.alt = "";
    heroOverlay.setAttribute("aria-hidden", "true");
    heroImg.parentElement.appendChild(heroOverlay);

    let heroIndex = 0;
    let heroSwapping = false;
    const heroBlocked = () => motionPreference.matches || document.hidden;

    function heroAdvance() {
      if (heroSwapping || heroBlocked()) return;
      heroSwapping = true;
      const nextIndex = (heroIndex + 1) % heroSources.length;
      const nextSrc = heroSources[nextIndex];
      const preload = new Image();
      preload.onload = () => {
        if (heroBlocked()) { heroSwapping = false; return; }
        heroOverlay.src = nextSrc;
        heroOverlay.style.opacity = "1";
        heroImg.style.opacity = "0";
        window.setTimeout(() => {
          heroImg.src = nextSrc;
          heroImg.style.opacity = "1";
          heroOverlay.style.opacity = "0";
          heroIndex = nextIndex;
          heroSwapping = false;
        }, 500);
      };
      preload.onerror = () => { heroSwapping = false; };
      preload.src = nextSrc;
    }

    window.setInterval(() => { if (!heroBlocked()) heroAdvance(); }, 5000);
  }

  const videos = [...document.querySelectorAll(".motion-grid video")];
  const visibleVideos = new Set();
  function syncVideos() {
    videos.forEach((video) => {
      if (motionPreference.matches || document.hidden || !visibleVideos.has(video)) {
        video.pause();
        return;
      }
      video.play().catch(() => {});
    });
  }
  videos.forEach((video) => video.pause());
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleVideos.add(entry.target);
        else visibleVideos.delete(entry.target);
      });
      syncVideos();
    }, { threshold: 0.25 });
    videos.forEach((video) => observer.observe(video));
  } else {
    videos.forEach((video) => visibleVideos.add(video));
    syncVideos();
  }
  motionPreference.addEventListener("change", syncVideos);
  document.addEventListener("visibilitychange", syncVideos);

  const imageSequence = (round, files) => files.map((file) => ({ kind: "image", round, file }));
  const storySets = [
    {
      number: "1",
      media: imageSequence("round-1", [
        "monday-13.jpg", "monday-14.jpg", "monday-15.jpg", "monday-16.jpg", "monday-17.jpg",
        "monday-18.jpg", "monday-19.jpg", "monday-20.jpg", "monday-21.jpg", "monday-22.jpg",
        "monday-23.jpg", "monday-24.jpg", "monday-25.jpg", "monday-26.jpg", "monday-27.jpg",
        "monday-28.jpg", "monday-29.jpg", "monday-30.jpg", "monday-31.jpg"
      ])
    },
    {
      number: "2",
      media: [
        ...imageSequence("round-2", ["monday-06.jpg", "monday-07.jpg", "monday-08.jpg", "monday-09.jpg", "monday-10.jpg", "monday-11.jpg", "monday-12.jpg"]),
        ...imageSequence("round-1", ["wednesday-video-designs-32.jpg", "wednesday-video-designs-33.jpg", "wednesday-video-designs-34.jpg", "wednesday-video-designs-35.jpg", "wednesday-video-designs-36.jpg", "wednesday-video-designs-37.jpg", "wednesday-video-designs-38.jpg"])
      ]
    },
    {
      number: "3",
      media: [
        ...imageSequence("round-2", ["wednesday-13.jpg", "wednesday-14.jpg", "wednesday-15.jpg", "wednesday-16.jpg"]),
        ...imageSequence("round-1", ["friday-01.jpg", "friday-02.jpg", "friday-03.jpg", "friday-04.jpg", "friday-05.jpg", "friday-06.jpg", "friday-07.jpg", "friday-08.jpg", "friday-09.jpg", "friday-10.jpg", "friday-11.jpg", "friday-12.jpg"]),
        ...imageSequence("round-2", ["friday-01.jpg", "friday-02.jpg", "friday-03.jpg", "friday-04.jpg", "friday-05.jpg"])
      ]
    }
  ];

  const dayOrder = { monday: 1, wednesday: 2, friday: 3 };
  const assets = storySets.flatMap((story) => story.media.map((media) => ({ ...media, set: `set-${story.number}` })))
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

  const gallery = document.querySelector("[data-asset-gallery]");
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const lightboxCaption = document.querySelector("[data-lightbox-caption]");
  let visibleAssets = assets;
  let activeIndex = 0;

  function assetPath(asset) {
    return `../../assets/work/translayte-creative/${asset.round}/${asset.file}`;
  }

  const ROTATION_INTERVAL = 4000;
  const ROTATION_FADE = 500;
  const storyImages = [...document.querySelectorAll(".story-visual img[data-story-set]")];

  storyImages.forEach((img, cardIndex) => {
    const story = storySets.find((set) => set.number === img.dataset.storySet);
    if (!story || story.media.length < 2) return;
    const sources = story.media.map(assetPath);
    const overlay = document.createElement("img");
    overlay.className = "story-rotate-image";
    overlay.alt = "";
    overlay.setAttribute("aria-hidden", "true");
    img.parentElement.appendChild(overlay);

    const state = {
      index: Math.max(0, sources.indexOf(img.getAttribute("src"))),
      inView: true,
      interacting: false,
      swapping: false
    };

    const rotationBlocked = () => motionPreference.matches || document.hidden || !lightbox.hidden || !state.inView || state.interacting;
    const rotationPaused = () => rotationBlocked() || state.swapping;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        state.inView = entries[0].isIntersecting;
      }, { threshold: 0.3 });
      observer.observe(img);
    }

    const card = img.closest("article");
    card.addEventListener("mouseenter", () => { state.interacting = true; });
    card.addEventListener("mouseleave", () => { state.interacting = false; });
    card.addEventListener("focusin", () => { state.interacting = true; });
    card.addEventListener("focusout", () => { state.interacting = false; });

    function advance() {
      if (rotationPaused()) return;
      state.swapping = true;
      const nextIndex = (state.index + 1) % sources.length;
      const nextSrc = sources[nextIndex];
      const preload = new Image();
      preload.onload = () => {
        if (rotationBlocked()) {
          state.swapping = false;
          return;
        }
        overlay.src = nextSrc;
        overlay.style.opacity = "1";
        img.style.opacity = "0";
        window.setTimeout(() => {
          img.src = nextSrc;
          img.style.opacity = "1";
          overlay.style.opacity = "0";
          state.index = nextIndex;
          state.swapping = false;
        }, ROTATION_FADE);
      };
      preload.onerror = () => { state.swapping = false; };
      preload.src = nextSrc;
    }

    window.setTimeout(() => {
      advance();
      window.setInterval(advance, ROTATION_INTERVAL);
    }, 1200 * cardIndex);
  });

  function renderGallery(filter = "all") {
    visibleAssets = assets.filter((asset) => filter === "all" || asset.set === filter);
    gallery.innerHTML = visibleAssets.map((asset, index) => `<figure class="asset-tile" data-asset-index="${index}"><img src="${assetPath(asset)}" alt="Translayte campaign visual" loading="lazy"></figure>`).join("");
    gallery.querySelectorAll("[data-asset-index]").forEach((tile) => {
      tile.addEventListener("click", () => openLightbox(Number(tile.dataset.assetIndex)));
    });
  }

  function openLightbox(index) {
    activeIndex = index;
    const asset = visibleAssets[activeIndex];
    if (!asset) return;
    lightboxImage.src = assetPath(asset);
    lightboxImage.alt = "Translayte campaign visual";
    lightboxCaption.textContent = `Visual ${activeIndex + 1} of ${visibleAssets.length}`;
    lightbox.hidden = false;
    document.body.classList.add("drawer-open");
    lightbox.querySelector("[data-lightbox-close]").focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("drawer-open");
  }

  function stepLightbox(direction) {
    openLightbox((activeIndex + direction + visibleAssets.length) % visibleAssets.length);
  }

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      renderGallery(button.dataset.filter);
    });
  });

  document.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);
  document.querySelector("[data-lightbox-previous]").addEventListener("click", () => stepLightbox(-1));
  document.querySelector("[data-lightbox-next]").addEventListener("click", () => stepLightbox(1));
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") stepLightbox(-1);
    if (event.key === "ArrowRight") stepLightbox(1);
  });

  renderGallery();
})();
