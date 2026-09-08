(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  function mountIcons() {
    if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  }

  function preferredTheme() {
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

  function observeNavigation() {
    const links = $$('.identity-navigation a');
    const sections = links.map((link) => $(link.getAttribute('href'))).filter(Boolean);
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      links.forEach((link) => {
        if (link.getAttribute('href') === `#${active.target.id}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-42% 0px -48% 0px', threshold: [0.01, 0.2] });

    sections.forEach((section) => observer.observe(section));
  }

  applyTheme(preferredTheme());
  $('[data-theme-toggle]').addEventListener('click', () => {
    applyTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
  });
  observeNavigation();
  mountIcons();
})();
