(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector("[data-theme-toggle]");
  const themeKey = "studio-reel-theme-override";
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

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

  const choices = {
    once: {
      title: "One-time payment",
      copy: "Pay only for the 845 remaining words and finish this document.",
      price: "£3.38",
      billing: "pay once"
    },
    plan: {
      title: "Annual plan",
      copy: "Finish this document, then use the 180,000-word allowance for translations throughout the year.",
      price: "£95.88",
      billing: "billed once a year"
    }
  };
  const tabs = [...document.querySelectorAll("[data-choice]")];
  const panel = document.querySelector("#choice-detail");
  function selectChoice(name, moveFocus = false) {
    const choice = choices[name];
    if (!choice) return;
    tabs.forEach((tab) => {
      const selected = tab.dataset.choice === name;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && moveFocus) tab.focus();
    });
    panel.setAttribute("aria-labelledby", tabs.find((tab) => tab.dataset.choice === name).id);
    panel.querySelector("[data-choice-title]").textContent = choice.title;
    panel.querySelector("[data-choice-copy]").textContent = choice.copy;
    panel.querySelector("[data-choice-price]").innerHTML = choice.price + " <span>" + choice.billing + "</span>";
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectChoice(tab.dataset.choice));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const target = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 :
        (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      selectChoice(tabs[target].dataset.choice, true);
    });
  });
  selectChoice("once");

  const videos = [...document.querySelectorAll(".case-video")];
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
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

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
  topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: motionPreference.matches ? "auto" : "smooth" }));
  window.addEventListener("scroll", updateTop, { passive: true });
  window.addEventListener("resize", updateTop);
  updateTop();

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
  menuButton.addEventListener("click", () => header.classList.remove("is-hidden"));
  updateHeader();
})();
