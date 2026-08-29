(() => {
  'use strict';

  const data = window.STUDIO_DATA;
  if (!data) return;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const icon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const escapeHTML = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const workPalette = [
    { bg: '#153c37', accent: '#7de2d1', text: '#fffafb', line: 'rgba(255,250,251,.22)' },
    { bg: '#2b2c28', accent: '#339989', text: '#fffafb', line: 'rgba(255,250,251,.18)' },
    { bg: '#123d47', accent: '#7de2d1', text: '#fffafb', line: 'rgba(255,250,251,.2)' },
    { bg: '#5e5434', accent: '#d8e879', text: '#fffafb', line: 'rgba(255,250,251,.22)' },
    { bg: '#274a43', accent: '#b6f2e8', text: '#fffafb', line: 'rgba(255,250,251,.2)' },
    { bg: '#164a5a', accent: '#8de7d8', text: '#fffafb', line: 'rgba(255,250,251,.2)' },
    { bg: '#46583e', accent: '#d7ee8f', text: '#fffafb', line: 'rgba(255,250,251,.2)' }
  ];

  const projectSymbols = {
    polish: 'P',
    'substack-direct-subscribe': '@',
    'substack-direct-subscribe-wp': 'W',
    'wp-snippets': '{}',
    acquario: 'A',
    jtf23: 'J',
    nairawatch: 'N',
    'nigeria-embassy': 'E',
    'smart-expense': '$',
    'sound-atlas': 'S',
    'urban-climate-signals': 'U',
    webhunt: 'W',
    zonify: 'Z'
  };

  const state = {
    filter: 'All',
    drawerItem: null,
    lastFocusedElement: null,
    testimonialsExpanded: false
  };

  function mountIcons() {
    if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  }

  function setText(selector, value) {
    const element = $(selector);
    if (element) element.textContent = value;
  }

  function anchor(link, className, label, extra = '') {
    return `<a class="${className}" href="${escapeHTML(link)}" ${extra}>${escapeHTML(label)} ${icon('arrow-up-right')}</a>`;
  }

  function renderNavigation() {
    const links = data.site.navigation.map((item) => (
      `<a class="nav-link" href="${escapeHTML(item.href)}" data-nav-link="${escapeHTML(item.href)}">${escapeHTML(item.label)}</a>`
    )).join('');
    $('[data-nav]').innerHTML = links;
    $('[data-mobile-nav]').innerHTML = links;
  }

  function renderHero() {
    setText('[data-hero-title]', data.site.hero.title);
    setText('[data-hero-description]', data.site.hero.description);
    $('[data-hero-actions]').innerHTML = [
      anchor(data.site.hero.primaryCta.href, 'button-link', data.site.hero.primaryCta.label),
      anchor(data.site.hero.secondaryCta.href, 'button-link secondary', data.site.hero.secondaryCta.label)
    ].join('');
  }

  function renderIntroduction() {
    setText('[data-intro-title]', data.site.introduction.title);
    setText('[data-intro-text]', data.site.introduction.text);
  }

  function renderSectionCopy() {
    const sections = data.site.sections;
    setText('[data-work-title]', sections.work.title);
    setText('[data-work-description]', sections.work.description);
    setText('[data-projects-title]', sections.projects.title);
    setText('[data-projects-description]', sections.projects.description);
    setText('[data-signals-title]', sections.signals.title);
    setText('[data-signals-description]', sections.signals.description);
    setText('[data-approach-title]', sections.approach.title);
    setText('[data-approach-description]', sections.approach.description);
    setText('[data-practice-title]', sections.practice.title);
    setText('[data-practice-description]', sections.practice.description);
  }

  function itemCategories(item) {
    return Array.isArray(item.categories) ? item.categories.join(' / ') : '';
  }

  function isDrawerItem(item, type) {
    if (type === 'work') return !item.link;
    if (type === 'signal') return item.directLink !== true;
    return Boolean(item.details?.length || item.content) && item.directLink !== true;
  }

  function workVisual(item) {
    const image = item.image
      ? `<img src="${escapeHTML(item.image)}" alt="" loading="lazy" decoding="async">`
      : '';
    return `<div class="work-visual" aria-hidden="true">${image}<span class="work-image-overlay"></span></div>`;
  }

  function workCard(item, index) {
    const palette = workPalette[index % workPalette.length];
    const style = `--card-bg:${palette.bg};--card-accent:${palette.accent};--card-text:${palette.text};--card-line:${palette.line};`;
    const drawer = isDrawerItem(item, 'work');
    const attributes = drawer
      ? `href="#${escapeHTML(item.id)}" data-open-item="${escapeHTML(item.id)}" data-item-type="work"`
      : `href="${escapeHTML(item.link)}" target="_blank" rel="noreferrer"`;
    const action = drawer ? 'Read the engagement' : 'Visit project';
    return `
      <a class="work-card ${index === 0 || index === 4 ? 'work-card--large' : ''} work-card--variant-${index % 5}" style="${style}" ${attributes}>
        ${workVisual(item)}
        <span class="work-card-content">
          <span class="work-card-meta"><span>${escapeHTML(item.year || '')}</span><span>${escapeHTML(item.role || itemCategories(item))}</span></span>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.description || item.shortDescription || '')}</p>
          <span class="card-action">${action} ${icon(drawer ? 'move-right' : 'arrow-up-right')}</span>
        </span>
      </a>`;
  }

  function renderFilters() {
    const categories = [...new Set(data.work.flatMap((item) => item.categories || []))];
    $('[data-work-filters]').innerHTML = ['All', ...categories].map((category) => (
      `<button class="filter-button" type="button" data-filter="${escapeHTML(category)}" aria-pressed="${category === state.filter}">${escapeHTML(category)}</button>`
    )).join('');
  }

  function renderWork() {
    const filtered = state.filter === 'All'
      ? data.work
      : data.work.filter((item) => (item.categories || []).includes(state.filter));
    $('[data-work-grid]').innerHTML = filtered.map(workCard).join('');
    mountIcons();
  }

  function projectCard(item) {
    const drawer = isDrawerItem(item, 'project');
    const attributes = drawer
      ? `href="#${escapeHTML(item.id)}" data-open-item="${escapeHTML(item.id)}" data-item-type="project"`
      : `href="${escapeHTML(item.link || '#')}" target="_blank" rel="noreferrer"`;
    const action = drawer ? 'Open notes' : 'Visit project';
    return `
      <a class="project-card" ${attributes}>
        <span class="project-symbol" aria-hidden="true">${escapeHTML(projectSymbols[item.id] || item.title.slice(0, 1))}</span>
        <span>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.description || item.shortDescription || '')}</p>
        </span>
        <span class="project-card-footer"><span>${escapeHTML(item.year || itemCategories(item))}</span>${icon(drawer ? 'move-right' : 'arrow-up-right')}<span class="sr-only">${action}</span></span>
      </a>`;
  }

  function renderProjects() {
    $('[data-project-grid]').innerHTML = data.projects.map(projectCard).join('');
  }

  function parseDate(value) {
    const parsed = Date.parse(value || '');
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  function signalCard(item) {
    const drawer = isDrawerItem(item, 'signal');
    const attributes = drawer
      ? `href="#${escapeHTML(item.id)}" data-open-item="${escapeHTML(item.id)}" data-item-type="signal"`
      : `href="${escapeHTML(item.link || '#')}" target="_blank" rel="noreferrer"`;
    const action = drawer ? 'Read signal' : (item.ctaLabel || 'Open link');
    return `
      <a class="signal-item" ${attributes}>
        <span class="signal-date">${escapeHTML(item.date || '')}</span>
        <span class="signal-main"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description || '')}</p></span>
        <span class="signal-link">${escapeHTML(action)} ${icon(drawer ? 'move-right' : 'arrow-up-right')}</span>
      </a>`;
  }

  function renderSignals() {
    const latest = [...data.updates]
      .sort((a, b) => parseDate(b.date) - parseDate(a.date))
      .slice(0, 6);
    $('[data-signals-list]').innerHTML = latest.map(signalCard).join('');
  }

  function renderApproach() {
    $('[data-process-list]').innerHTML = data.site.process.map((step) => `
      <li class="process-item">
        <span class="process-icon">${icon(step.icon)}</span>
        <h3>${escapeHTML(step.title)}</h3>
        <p>${escapeHTML(step.description)}</p>
      </li>`).join('');
    const operating = data.site.operatingModels;
    $('[data-operating-models]').innerHTML = `
      <div class="operating-models-intro">
        <h3>${escapeHTML(operating.title)}</h3>
        <p>${escapeHTML(operating.description)}</p>
      </div>
      <div class="operating-model-grid">
        ${operating.items.map((model) => `
          <article class="operating-model">
            <span>${icon(model.icon)}</span>
            <h4>${escapeHTML(model.title)}</h4>
            <p>${escapeHTML(model.description)}</p>
          </article>`).join('')}
      </div>`;
  }

  function renderPractice() {
    $('[data-focus-grid]').innerHTML = data.site.focusAreas.map((area) => `
      <article class="focus-item">
        ${icon(area.icon)}
        <div>
          <h3>${escapeHTML(area.title)}</h3>
          ${area.description ? `<p>${escapeHTML(area.description)}</p>` : ''}
        </div>
      </article>`).join('');
    $('[data-profile-image]').src = data.site.profile.image;
    setText('[data-profile-title]', data.site.profile.title);
    $('[data-profile-body]').innerHTML = data.site.profile.body
      .split('\n\n')
      .map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`)
      .join('');
  }

  function renderPublicEngagements() {
    const publicEngagements = data.site.publicEngagements;
    setText('[data-public-title]', publicEngagements.title);
    setText('[data-public-description]', publicEngagements.description);
    $('[data-public-grid]').innerHTML = publicEngagements.items.map((item) => {
      const cta = item.link
        ? `<a class="public-card-link" href="${escapeHTML(item.link)}" target="_blank" rel="noreferrer">${escapeHTML(item.ctaLabel || 'Learn more')} ${icon('arrow-up-right')}</a>`
        : '';
      return `
        <article class="public-card">
          <span class="public-card-icon">${icon(item.icon)}</span>
          <div class="public-card-meta"><span>${escapeHTML(item.year)}</span><span>${escapeHTML(item.role)}</span></div>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.description)}</p>
          ${cta}
        </article>`;
    }).join('');
  }

  function shuffledTestimonials() {
    const testimonials = data.site.testimonials.items;
    const storageKey = 'tomiabe-studio-testimonial-order';
    let order = null;
    try {
      order = JSON.parse(sessionStorage.getItem(storageKey));
    } catch (_) {
      order = null;
    }

    const validOrder = Array.isArray(order)
      && order.length === testimonials.length
      && order.every((index) => Number.isInteger(index) && index >= 0 && index < testimonials.length);
    if (!validOrder) {
      order = testimonials.map((_, index) => index);
      for (let index = order.length - 1; index > 0; index -= 1) {
        const randomValue = window.crypto?.getRandomValues
          ? window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296
          : Math.random();
        const swapIndex = Math.floor(randomValue * (index + 1));
        [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
      }
      try { sessionStorage.setItem(storageKey, JSON.stringify(order)); } catch (_) { /* Session storage can be unavailable. */ }
    }
    return order.map((index) => testimonials[index]);
  }

  function testimonialCard(testimonial) {
    return `
      <figure class="testimonial-card">
        <blockquote>${escapeHTML(testimonial.quote)}</blockquote>
        <figcaption>
          <strong>${escapeHTML(testimonial.name)}</strong>
          <span>${escapeHTML(testimonial.role)}, ${escapeHTML(testimonial.company)}</span>
        </figcaption>
      </figure>`;
  }

  function renderTestimonials() {
    const testimonials = data.site.testimonials;
    setText('[data-testimonials-title]', testimonials.title);
    setText('[data-testimonials-description]', testimonials.description);
    const ordered = shuffledTestimonials();
    const visible = state.testimonialsExpanded ? ordered : ordered.slice(0, testimonials.initialCount);
    $('[data-testimonial-grid]').innerHTML = visible.map(testimonialCard).join('');
    const toggle = $('[data-toggle-testimonials]');
    const hasMore = ordered.length > testimonials.initialCount;
    toggle.hidden = !hasMore;
    toggle.setAttribute('aria-expanded', String(state.testimonialsExpanded));
    toggle.innerHTML = `${escapeHTML(state.testimonialsExpanded ? testimonials.showLessLabel : testimonials.showAllLabel)} ${icon(state.testimonialsExpanded ? 'arrow-up' : 'arrow-down')}`;
  }

  function renderContactAndFooter() {
    setText('[data-contact-title]', data.site.contact.title);
    setText('[data-contact-description]', data.site.contact.description);
    const email = $('[data-contact-email]');
    email.href = `mailto:${data.site.contact.email}`;
    email.innerHTML = `${escapeHTML(data.site.contact.email)} ${icon('arrow-up-right')}`;
    setText('[data-contact-location]', data.site.contact.location);
    setText('[data-footer]', data.site.footer);
    $('[data-social-links]').innerHTML = data.site.social.map((social) => (
      `<a href="${escapeHTML(social.url)}" target="_blank" rel="noreferrer">${escapeHTML(social.label)}</a>`
    )).join('');
  }

  function findItem(id, type) {
    const collection = type === 'work' ? data.work : type === 'project' ? data.projects : data.updates;
    return collection.find((item) => item.id === id);
  }

  function drawerMarkup(item) {
    const meta = [item.year || item.date, item.role || itemCategories(item)].filter(Boolean);
    const details = Array.isArray(item.details) ? item.details.map((detail) => `
      <article class="drawer-detail">
        <h3>${escapeHTML(detail.heading)}</h3>
        <p>${escapeHTML(detail.text || '')}</p>
      </article>`).join('') : '';
    const content = item.content ? `<div class="drawer-rich-content">${item.content}</div>` : '';
    const cta = item.link ? `<a class="drawer-cta" href="${escapeHTML(item.link)}" target="_blank" rel="noreferrer">${escapeHTML(item.ctaLabel || 'Visit project')} ${icon('arrow-up-right')}</a>` : '';
    return `
      <div class="drawer-meta">${meta.map((entry) => `<span>${escapeHTML(entry)}</span>`).join('')}</div>
      <h2 id="drawer-title">${escapeHTML(item.title)}</h2>
      <p class="drawer-lead">${escapeHTML(item.description || item.shortDescription || '')}</p>
      ${details ? `<div class="drawer-details">${details}</div>` : ''}
      ${content}
      ${cta}`;
  }

  function openDrawer(item) {
    const drawer = $('[data-drawer]');
    state.drawerItem = item;
    state.lastFocusedElement = document.activeElement;
    $('[data-drawer-content]').innerHTML = drawerMarkup(item);
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    mountIcons();
    window.setTimeout(() => $('[data-close-drawer]').focus(), 40);
  }

  function closeDrawer() {
    const drawer = $('[data-drawer]');
    if (!drawer.classList.contains('is-open')) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
    state.drawerItem = null;
    if (state.lastFocusedElement) state.lastFocusedElement.focus();
  }

  function bindInteractions() {
    document.addEventListener('click', (event) => {
      const filter = event.target.closest('[data-filter]');
      if (filter) {
        state.filter = filter.dataset.filter;
        renderFilters();
        renderWork();
        return;
      }

      const openTarget = event.target.closest('[data-open-item]');
      if (openTarget) {
        event.preventDefault();
        const item = findItem(openTarget.dataset.openItem, openTarget.dataset.itemType);
        if (item) openDrawer(item);
        return;
      }

      if (event.target.closest('[data-close-drawer]')) closeDrawer();

      if (event.target.closest('[data-toggle-testimonials]')) {
        state.testimonialsExpanded = !state.testimonialsExpanded;
        renderTestimonials();
        mountIcons();
      }

      const navTarget = event.target.closest('.mobile-menu a[href^="#"]');
      if (navTarget) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeDrawer();
        closeMenu();
      }
    });

    $('[data-menu-toggle]').addEventListener('click', () => {
      const menu = $('[data-mobile-menu]');
      const isOpen = !menu.hasAttribute('hidden');
      if (isOpen) closeMenu();
      else openMenu();
    });

    $('[data-theme-toggle]').addEventListener('click', toggleTheme);
  }

  function openMenu() {
    const menu = $('[data-mobile-menu]');
    menu.removeAttribute('hidden');
    document.body.classList.add('menu-open');
    $('[data-menu-toggle]').setAttribute('aria-expanded', 'true');
    $('[data-menu-toggle]').setAttribute('aria-label', 'Close navigation');
    $('[data-menu-toggle]').innerHTML = icon('x');
    mountIcons();
  }

  function closeMenu() {
    const menu = $('[data-mobile-menu]');
    if (menu.hasAttribute('hidden')) return;
    menu.setAttribute('hidden', '');
    document.body.classList.remove('menu-open');
    $('[data-menu-toggle]').setAttribute('aria-expanded', 'false');
    $('[data-menu-toggle]').setAttribute('aria-label', 'Open navigation');
    $('[data-menu-toggle]').innerHTML = icon('menu');
    mountIcons();
  }

  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    const next = theme === 'dark' ? 'light' : 'dark';
    const toggle = $('[data-theme-toggle]');
    toggle.setAttribute('aria-label', `Switch to ${next} theme`);
    toggle.setAttribute('title', `Switch to ${next} theme`);
    toggle.innerHTML = icon(theme === 'dark' ? 'sun-medium' : 'moon');
    try { localStorage.setItem('tomiabe-studio-theme', theme); } catch (_) { /* Storage can be unavailable. */ }
    mountIcons();
  }

  function toggleTheme() {
    applyTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
  }

  function restoreTheme() {
    let saved = 'dark';
    try { saved = localStorage.getItem('tomiabe-studio-theme') || saved; } catch (_) { /* Use the default theme. */ }
    applyTheme(saved === 'light' ? 'light' : 'dark');
  }

  function observeNavigation() {
    const sections = $$('main section[id]');
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = `#${visible.target.id}`;
      $$('[data-nav-link]').forEach((link) => {
        link.setAttribute('aria-current', String(link.dataset.navLink === id));
      });
    }, { rootMargin: '-42% 0px -48% 0px', threshold: [0.01, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
  }

  function drawSignalField(canvas) {
    const context = canvas.getContext('2d');
    const container = canvas.parentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influence = pointer.active ? Math.max(0, 1 - distance / 220) : 0;
          const noise = Math.sin(x * 0.075 + y * 0.05 + wave) + Math.cos(y * 0.1 - wave * 0.8);
          const active = noise > 0.56 - influence * 0.48;
          if (!active) continue;
          const size = 1.3 + influence * 3.6 + Math.max(0, noise - 0.7) * 1.4;
          const alpha = 0.2 + influence * 0.68;
          context.fillStyle = `rgba(125, 226, 209, ${alpha})`;
          context.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
      if (!reducedMotion) {
        frame = requestAnimationFrame(draw);
      }
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

    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }

  function initSignalFields() {
    $$('[data-signal-canvas]').forEach(drawSignalField);
  }

  function render() {
    renderNavigation();
    renderHero();
    renderIntroduction();
    renderSectionCopy();
    renderFilters();
    renderWork();
    renderProjects();
    renderSignals();
    renderApproach();
    renderPractice();
    renderPublicEngagements();
    renderTestimonials();
    renderContactAndFooter();
    restoreTheme();
    mountIcons();
    bindInteractions();
    observeNavigation();
    initSignalFields();
  }

  render();
})();
