/* Tomi Abe Studio one-pager (top nav, 3-col sections, side drawer). */
'use strict';

/* ── Helpers ── */
const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ── Icons (lucide paths) ── */
const ICONS = {
  arrowUpRight: '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowUp: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sunrise: '<path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>',
  monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  xLogo: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  layout: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
  chartColumn: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
};
function icon(name, size) {
  const s = size || 16;
  const fill = name === 'xLogo' ? 'currentColor' : 'none';
  const stroke = name === 'xLogo' ? 'none' : 'currentColor';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

/* ── State ── */
function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
}
function saveLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}

const state = {
  theme: loadLS('tomi_theme', 'system'),
  activeTheme: 'noon',
  copied: false,
  linkCopied: false,
  currentTime: new Date(),
  filters: { work: 'All', projects: 'All', updates: 'All' },
  drawerOpen: false,
  currentItem: null,
};

const data = { settings: {}, home: {}, info: {}, work: [], projects: [], updates: [], testimonials: [] };

if (new URLSearchParams(location.search).get('fx') === 'grid') document.body.classList.add('fx-grid');

/* ── Data (embedded bundle from build-data.js into js/data.js) ── */
function loadData() {
  const raw = window.SITE_DATA || {};
  data.settings = raw.settings || {};
  data.home = raw.home || {};
  data.info = raw.info || {};
  data.testimonials = raw.testimonials || [];

  const byOrder = (a, b) => (a.order ?? 99) - (b.order ?? 99);
  data.work = (raw.work || []).filter((p) => p.visible !== false).sort(byOrder);
  data.projects = (raw.projects || []).filter((p) => p.visible !== false).sort(byOrder);
  data.updates = (raw.updates || []).filter((u) => u.visible !== false).sort(byOrder);

  applyCmsTheme();
}

/* ── CMS overrides ── */
function applyCmsTheme() {
  const themeData = data.settings.themeColors;
  if (themeData && themeData.noon && themeData.noon.bg) {
    const old = document.getElementById('cms-theme-vars');
    if (old) old.remove();
    const style = document.createElement('style');
    style.id = 'cms-theme-vars';
    style.textContent = `
      :root { --theme-bg: ${themeData.noon.bg}; --theme-fg: ${themeData.noon.fg}; --theme-muted: ${themeData.noon.muted}; --theme-border: ${themeData.noon.border}; }
      .theme-morning { --theme-bg: ${themeData.morning.bg}; --theme-fg: ${themeData.morning.fg}; --theme-muted: ${themeData.morning.muted}; --theme-border: ${themeData.morning.border}; }
      .theme-noon { --theme-bg: ${themeData.noon.bg}; --theme-fg: ${themeData.noon.fg}; --theme-muted: ${themeData.noon.muted}; --theme-border: ${themeData.noon.border}; }
      .theme-night { --theme-bg: ${themeData.night?.bg || '#09090b'}; --theme-fg: ${themeData.night?.fg || '#fafafa'}; --theme-muted: ${themeData.night?.muted || '#a1a1aa'}; --theme-border: ${themeData.night?.border || '#27272a'}; }
    `;
    document.head.appendChild(style);
  }
}

/* ── Theme ── */
let themeInterval = null;
function applyTheme(mode) {
  let resolved;
  if (mode === 'system') {
    const h = new Date().getHours();
    resolved = (h >= 18 || h < 6) ? 'night' : (h < 12 ? 'morning' : 'noon');
  } else {
    resolved = mode;
  }
  state.activeTheme = resolved;
  const root = document.documentElement;
  root.classList.remove('theme-morning', 'theme-noon', 'theme-night');
  root.classList.add('theme-' + resolved);

  if (themeInterval) { clearInterval(themeInterval); themeInterval = null; }
  if (mode === 'system') themeInterval = setInterval(() => applyTheme('system'), 60000);
  updateChrome();
  window.dispatchEvent(new CustomEvent('tomi-theme-change'));
}

function setTheme(mode) {
  state.theme = mode;
  saveLS('tomi_theme', mode);
  applyTheme(mode);
}

/* ── Clock ── */
let clockInterval = null;
function formatClock(d) {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZoneName: 'short' });
}
function startClock() {
  if (clockInterval) return;
  const els = $$('.clock');
  const tick = () => { state.currentTime = new Date(); const t = formatClock(state.currentTime); els.forEach((el) => { el.textContent = t; }); };
  tick();
  clockInterval = setInterval(tick, 1000);
}

/* ── Render fragments ── */
function socialLinksHTML() {
  const map = { LinkedIn: 'linkedin', Twitter: 'xLogo', Instagram: 'instagram', Github: 'github' };
  return (data.settings.socialLinks || [])
    .map((l) => {
      const iconName = map[l.name];
      if (!iconName) return '';
      return `<a class="social-link" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${icon(iconName, 16)}</a>`;
    })
    .join('');
}

function avatarHTML(t) {
  if (t.avatar) return `<img class="avatar" src="${esc(img(t.avatar))}" alt="${esc(t.name)}" referrerpolicy="no-referrer" />`;
  const initials = t.name.split(' ').map((n) => n[0]).join('');
  return `<div class="avatar-fallback"><span>${esc(initials)}</span></div>`;
}

/* ── Detail media fragments ── */
function linkBar(href, label) {
  if (!href) return '';
  return `<div class="link-bar"><a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)} ${icon('arrowUpRight', 12)}</a></div>`;
}

function brandIdentityHTML(images) {
  const palette = [
    { name: 'brand-primary', hex: '#3A8B72' },
    { name: 'brand-dark', hex: '#2E6F5B' },
    { name: 'brand-light', hex: '#F9FFE3' },
    { name: 'brand-soft', hex: '#91C3B3' },
  ];
  return `
    <div class="bi-box">
      ${images && images.length >= 2 ? `
        <div class="bi-logos">
          <div class="bi-logo-tile" style="background-color:#FFFFFF"><img src="${esc(img(images[0]))}" alt="Susinsight logo (light background)" referrerpolicy="no-referrer" /></div>
          <div class="bi-logo-tile" style="background-color:#2E6F5B"><img src="${esc(img(images[1]))}" alt="Susinsight logo (dark background)" referrerpolicy="no-referrer" /></div>
        </div>` : ''}
      <div>
        <p class="bi-label">Color Palette</p>
        <div class="bi-palette">
          ${palette.map((c) => `
            <div class="bi-swatch">
              <div class="bi-swatch-color" style="background-color:${c.hex}"></div>
              <span class="bi-swatch-hex">${c.hex}</span>
              <span class="bi-swatch-name">${c.name}</span>
            </div>`).join('')}
        </div>
      </div>
      <div>
        <p class="bi-label">Typography</p>
        <div class="bi-types">
          <div class="bi-type-card">
            <p class="bi-type-label">Headings</p>
            <p class="bi-type-sample" style="font-family:'Bricolage Grotesque', serif">Bricolage Grotesque</p>
            <p class="bi-type-note">Semibold · 48px-20px scale</p>
          </div>
          <div class="bi-type-card">
            <p class="bi-type-label">Body</p>
            <p class="bi-type-sample" style="font-family:'Manrope', sans-serif">Manrope</p>
            <p class="bi-type-note">Regular · 16px / 14px / 12px</p>
          </div>
        </div>
      </div>
    </div>`;
}

function creativeFeedHTML(images, link, linkLabel) {
  const feed = (key) => `<div class="feed-grid">${images.map((src, i) =>
    `<img src="${esc(img(src))}" alt="" referrerpolicy="no-referrer" loading="lazy" data-feed="${key}-${i}" />`).join('')}</div>`;
  return `
    <div class="media-box">
      <div class="feed-mask-vertical" style="max-height:420px">
        <div class="animate-scroll-up">
          ${feed('v')}
          ${feed('d')}
        </div>
      </div>
      ${linkBar(link, linkLabel || 'Visit')}
    </div>`;
}

function designSystemHTML() {
  return `
    <div class="media-box">
      <img src="images/work/Susinsight/design-system.png" alt="Susinsight Design System" referrerpolicy="no-referrer" />
      <div class="link-bar"><a href="https://susinsight.com/design-system" target="_blank" rel="noopener noreferrer">Open Full Design System ${icon('arrowUpRight', 12)}</a></div>
    </div>`;
}

function faderHTML(images, alt) {
  return `
    <div class="fader" data-images="${esc(JSON.stringify(images))}" data-alt="${esc(alt)}">
      <img class="fader-anchor" src="${esc(img(images[0]))}" alt="" referrerpolicy="no-referrer" />
      ${images.map((src, i) =>
        `<img class="fader-layer" src="${esc(img(src))}" alt="${esc(alt)}" referrerpolicy="no-referrer" style="opacity:${i === 0 ? 1 : 0}" />`).join('')}
    </div>`;
}

function scrollImageHTML(d, item) {
  const href = d.link || item.link;
  return `
    <div class="media-box">
      <div class="feed-mask-vertical" style="max-height:420px">
        <div class="animate-scroll-up">
          <img src="${esc(img(d.image))}" alt="${esc(d.heading)}" referrerpolicy="no-referrer" />
          <img src="${esc(img(d.image))}" alt="" referrerpolicy="no-referrer" />
        </div>
      </div>
      ${linkBar(href, d.linkLabel || data.settings.uiLabels?.visitProject || 'Visit')}
    </div>`;
}

function imageHTML(d, item) {
  const href = d.link || item.link;
  const hasLink = d.link !== '' && !!href;
  return `
    <div class="media-box">
      <img src="${esc(img(d.image))}" alt="${esc(d.heading)}" referrerpolicy="no-referrer" />
      ${hasLink ? linkBar(href, d.linkLabel || data.settings.uiLabels?.visitProject || 'Visit') : ''}
    </div>`;
}

function detailMediaHTML(d, item) {
  if (d.type === 'brand-identity') return brandIdentityHTML(d.images);
  if (d.type === 'creative-feed') return creativeFeedHTML(d.images || [], d.link, d.linkLabel);
  if (d.type === 'design-system') return designSystemHTML();
  if (d.images) return faderHTML(d.images, d.heading);
  if (d.image && d.scroll) return scrollImageHTML(d, item);
  if (d.image) return imageHTML(d, item);
  return '';
}

/* ── Hero ── */
function renderHero() {
  const { hero, labels } = data.home;
  const headline = (hero && hero.headline) || '<p>Turning complex systems into clear products, brands, and stories.</p>';
  const description = (hero && hero.description) || '';
  const cta = (labels && labels.heroCta) || "Let's Work";
  $('#hero-content').innerHTML = `
    <h1 class="hero-title">${headline}</h1>
    <div class="hero-desc">${description}</div>
    <div class="hero-actions">
      <button class="hero-cta" data-nav="contact">${esc(cta)} ${icon('arrowRight', 16)}</button>
    </div>`;
}

/* ── Section grids + filters ── */
function catFilters(section) {
  if (section === 'updates') {
    return ['All', ...[...new Set(data.updates.map((u) => (u.date || '').match(/\d{4}/)?.[0]).filter(Boolean))].sort((a, b) => b - a)];
  }
  const pool = section === 'work' ? data.work : data.projects;
  return ['All', ...new Set(pool.flatMap((p) => p.categories || []))];
}

/* Image paths in the data are already relative to the site root (images/…). */
const img = (p) => p;

function sortedUpdates() {
  return [...data.updates].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function filteredFor(section) {
  const f = state.filters[section];
  if (section === 'updates') {
    const items = sortedUpdates();
    return f === 'All' ? items : items.filter((u) => (u.date || '').includes(f));
  }
  const pool = section === 'work' ? data.work : data.projects;
  return f === 'All' ? pool : pool.filter((p) => (p.categories || []).includes(f));
}

function workCardHTML(p) {
  return `
    <button class="card" data-open="${esc(p.id)}">
      ${p.image ? `<div class="card-image"><img src="${esc(img(p.image))}" alt="${esc(p.title)}" referrerpolicy="no-referrer" loading="lazy" /></div>` : ''}
      <h3 class="card-title">${esc(p.title)}</h3>
      <p class="card-desc">${esc(p.shortDescription || p.description)}</p>
    </button>`;
}

function cssCoverHTML(item, context) {
  if (!item.cssCover) return '';
  const coverMeta = {
    polish: { mark: ['UI', 'Score'], word: 'polish', symbol: '_' },
    'substack-direct': { mark: ['Email', 'Browser'], word: 'Direct', symbol: '@' },
    'substack-wp': { mark: ['WP', 'Block'], word: 'Plugin', symbol: 'WP' },
    'wp-snippets': { mark: ['PHP', 'Snippets'], word: 'Library', symbol: '{}' },
  };
  const meta = coverMeta[item.cssCover] || { mark: ['Studio', 'Update'], word: item.id, symbol: '*' };
  return `
    <div class="css-cover css-cover-${esc(item.cssCover)} ${context === 'card' ? 'css-cover-card' : 'css-cover-detail'}" aria-label="${esc(item.title)} featured cover">
      <div class="css-cover-grid"></div>
      <div class="css-cover-band css-cover-band-a"></div>
      <div class="css-cover-band css-cover-band-b"></div>
      <div class="css-cover-orbit css-cover-orbit-a"></div>
      <div class="css-cover-orbit css-cover-orbit-b"></div>
      <div class="css-cover-symbol">${esc(meta.symbol)}</div>
      <div class="css-cover-mark">
        <span>${esc(meta.mark[0])}</span>
        <span>${esc(meta.mark[1])}</span>
      </div>
      <div class="css-cover-word">${esc(meta.word)}</div>
    </div>`;
}

function updateCoverHTML(u, context) {
  if (u.cssCover) return cssCoverHTML(u, context);
  if (!u.image) return '';
  const cardClass = context === 'card' ? 'card-image update-card-image' : 'detail-image-wrap';
  const imgClass = context === 'card' ? '' : 'detail-image';
  return `<div class="${cardClass}"><img class="${imgClass}" src="${esc(img(u.image))}" alt="${esc(u.title)}" referrerpolicy="no-referrer" loading="lazy" /></div>`;
}

function updateCardHTML(u) {
  return `
    <button class="update-card" data-open="${esc(u.id)}">
      ${updateCoverHTML(u, 'card')}
      <p class="update-card-date">${esc(u.date)}</p>
      <h3 class="update-card-title">${esc(u.title)}</h3>
      <p class="update-card-desc">${esc(u.description)}</p>
    </button>`;
}

function renderGrid(section) {
  const grid = $('#' + section + '-grid');
  if (!grid) return;
  if (section === 'updates') {
    grid.innerHTML = filteredFor(section).map(updateCardHTML).join('');
  } else {
    grid.innerHTML = filteredFor(section).map(workCardHTML).join('');
  }
}

function renderFilters(section) {
  const row = $('#' + section + '-filters');
  if (!row) return;
  row.innerHTML = catFilters(section).map((c) => `
    <button class="filter-pill ${state.filters[section] === c ? 'active' : ''}" data-section="${esc(section)}" data-filter="${esc(c)}">${esc(c)}</button>`).join('');
}

/* ── Info (2 col) ── */
function renderInfo() {
  const { about, operatingModels, focusAreas, speaking } = data.info;
  const vis = data.settings.visibility || {};
  const showOperating = vis.operatingModel !== false && operatingModels && operatingModels.length;
  const showFocus = vis.focusAreas !== false && focusAreas && focusAreas.length;
  const showSpeaking = vis.speaking !== false && speaking;
  const showTestimonials = vis.testimonials !== false && data.testimonials.length;

  const blocks = [];
  if (showOperating) {
    blocks.push(`
      <div class="info-block">
        <h3 class="info-block-title">Operating Model</h3>
        <div class="block-grid info-cols-3">
          ${operatingModels.map((m) => `
            <div class="row-block">
              <h4 class="row-title">${esc(m.title)}</h4>
              <p class="row-text">${esc(m.description)}</p>
            </div>`).join('')}
        </div>
      </div>`);
  }
  if (showFocus) {
    blocks.push(`
      <div class="info-block">
        <h3 class="info-block-title">Focus Areas</h3>
        <div class="block-grid info-cols-2">
          ${focusAreas.map((f) => `
            <div class="row-block">
              ${f.icon ? `<div class="focus-icon">${icon(f.icon, 18)}</div>` : ''}
              <h4 class="row-title">${esc(f.title)}</h4>
              <p class="row-text">${esc(f.description)}</p>
            </div>`).join('')}
        </div>
      </div>`);
  }
  if (showSpeaking) {
    blocks.push(`
      <div class="info-block">
        <h3 class="info-block-title">Speaking & Mentorship</h3>
        <p class="speaking-desc">${esc(speaking.description)}</p>
        <div class="block-grid info-cols-2">
          ${(speaking.engagements || []).map((e) => `
            <div class="row-block">
              <h4 class="row-title">${esc(e.title)}</h4>
              <p class="speaking-meta"><span class="speaking-role">${esc(e.role)}</span> <span class="speaking-year">· ${esc(e.year)}</span></p>
              <p class="speaking-desc-item">${esc(e.description)}</p>
              ${e.link ? `
                <a class="inline-link" href="${esc(e.link)}" target="_blank" rel="noopener noreferrer">${esc(e.ctaLabel || 'Learn more')} ${icon('arrowUpRight', 16)}</a>` : ''}
            </div>`).join('')}
        </div>
      </div>`);
  }
  if (showTestimonials) {
    blocks.push(`
      <div class="info-block">
        <h3 class="info-block-title">Testimonials</h3>
        <div class="block-grid info-cols-2">
          ${data.testimonials.map((t) => `
            <div class="testimonial-card">
              <p class="testimonial-quote">"${esc(t.quote)}"</p>
              <div class="testimonial-footer">
                ${avatarHTML(t)}
                <div>
                  <p class="testimonial-name">${esc(t.name)}</p>
                  <p class="testimonial-role">${esc(t.role)}, ${esc(t.company)}</p>
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>`);
  }

  $('#info-grid').innerHTML = `
    <div class="info-hero">
      <div class="info-photo">
        ${about.imageUrl ? `<img class="about-avatar" src="${esc(img(about.imageUrl))}" alt="${esc(about.name)}" referrerpolicy="no-referrer" />` : ''}
        <h2 class="about-name">${esc(about.name)}</h2>
        <p class="about-role">${esc(about.role)}</p>
      </div>
      <div class="info-about">
        <p class="about-bio">${esc(about.bio)}</p>
      </div>
    </div>
    <div class="info-blocks">${blocks.join('')}</div>`;
}

/* ── Contact (2 col) ── */
function renderContact() {
  const contact = data.info.contact || {};
  const email = contact.email || 'studio@tomiabe.com';
  const items = [
    { title: 'Project inquiries', desc: 'Brand, product, or digital system work across any stage or market.' },
    { title: 'Speaking & training', desc: 'Talks, workshops, and facilitation on design, AI, and systems thinking.' },
    { title: 'Collaborations', desc: 'Independent projects, research, and creative partnerships.' },
    { title: 'Mentorship', desc: 'Through <a class="text-link" href="https://mentorcruise.com/mentor/tomiabe/" target="_blank" rel="noopener noreferrer">MentorCruise</a> or direct inquiry.' },
  ];
  $('#contact-grid').innerHTML = `
    <div class="contact-head">
      <h2 class="contact-title">Contact</h2>
      <p class="contact-desc">Typically responds within 1-3 business days. Reach out for any of the following.</p>
    </div>
    <div class="contact-left">
      <button class="email-btn" data-copy-email>${esc(email)} <span id="contact-email-icon">${icon('copy', 16)}</span></button>
      <p class="contact-time"><span class="clock" id="clock"></span></p>
      <div class="socials">${socialLinksHTML()}</div>
    </div>
    <div class="contact-right">
      <div class="contact-items">
        ${items.map((item) => `
          <div class="contact-item">
            <p class="contact-item-title">${esc(item.title)}</p>
            <p class="contact-item-desc">${item.desc}</p>
          </div>`).join('')}
      </div>
    </div>`;
}

/* ── Drawer ── */
function drawerURLFor(item) {
  let kind = null;
  if (data.work.some((i) => i.id === item.id)) kind = 'work';
  else if (data.projects.some((i) => i.id === item.id)) kind = 'projects';
  else if (data.updates.some((i) => i.id === item.id)) kind = 'updates';
  return kind ? '#/' + kind + '/' + item.id : null;
}

function itemIdFromHash(h) {
  const m = String(h || '').match(/^#\/(?:work|projects|updates)\/([^/?#]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

function setDrawerHash(url) {
  try { history.replaceState(null, '', url || location.pathname + location.search); }
  catch (e) { try { location.hash = url || ''; } catch (e2) {} }
}

function itemDetailHTML(item) {
  const meta = [];
  if (item.role) meta.push(esc(item.role));
  if (item.year) meta.push(esc(item.year));
  const metaHTML = meta.length ? `<p class="detail-meta">${meta.join(' · ')}</p>` : '';
  const visitLabel = data.settings.uiLabels?.visitProject || 'Visit';
  return `
    <div class="drawer-inner">
      <h2 class="detail-title">${esc(item.title)}</h2>
      ${item.shortDescription ? `<p class="detail-sub">${esc(item.shortDescription)}</p>` : ''}
      ${metaHTML}
      ${(item.categories || []).length ? `
        <div class="cat-row">${item.categories.map((c) => `<span class="category-pill">${esc(c)}</span>`).join('')}</div>` : ''}
      ${item.image ? `
        <div class="detail-image-wrap"><img class="detail-image" src="${esc(img(item.image))}" alt="${esc(item.title)}" referrerpolicy="no-referrer" /></div>` : ''}
      <p class="detail-desc">${esc(item.description)}</p>
      ${(item.details || []).map((d) => `
        <div class="detail-block">
          <h3 class="detail-block-heading">${esc(d.heading)}</h3>
          ${detailMediaHTML(d, item)}
          <p class="detail-block-text">${esc(d.text)}</p>
        </div>`).join('')}
      ${item.link ? `
        <a class="detail-link" href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">${esc(visitLabel)} ${icon('arrowUpRight', 16)}</a>` : ''}
    </div>`;
}

function updateDetailHTML(u) {
  const updateLink = u.link || u.ctaLink;
  return `
    <div class="drawer-inner">
      <p class="update-detail-date">${esc(u.date)}</p>
      <h2 class="detail-title">${esc(u.title)}</h2>
      ${updateCoverHTML(u, 'detail')}
      <p class="detail-desc">${esc(u.description)}</p>
      ${u.content ? `<div class="update-body">${u.content}</div>` : ''}
      ${updateLink ? `
        <a class="detail-link" href="${esc(updateLink)}" target="_blank" rel="noopener noreferrer">${esc(u.ctaLabel || 'Read more')} ${icon('arrowUpRight', 16)}</a>` : ''}
    </div>`;
}

function clearFaders() {
  $$('.fader').forEach((el) => { if (el.__timer) clearInterval(el.__timer); });
}

function initFaders() {
  $$('.fader').forEach((el) => {
    let images;
    try { images = JSON.parse(el.dataset.images || '[]'); } catch (e) { images = []; }
    if (images.length < 2) return;
    const layers = $$('img.fader-layer', el);
    let index = 0;
    el.__timer = setInterval(() => {
      index = (index + 1) % images.length;
      layers.forEach((img, i) => { img.style.opacity = i === index ? '1' : '0'; });
    }, 4000);
  });
}

function openDrawer(id) {
  const pool = [...data.work, ...data.projects, ...data.updates];
  const item = pool.find((i) => i.id === id);
  if (!item) return;
  const isUpdate = data.updates.some((u) => u.id === id);
  $('#drawer-body').innerHTML = isUpdate ? updateDetailHTML(item) : itemDetailHTML(item);
  $('#drawer').classList.add('open');
  $('#drawer').setAttribute('aria-hidden', 'false');
  state.drawerOpen = true;
  state.currentItem = item;
  $('#drawer-body').scrollTop = 0;
  const url = drawerURLFor(item);
  if (url) setDrawerHash(url);
  state.linkCopied = false;
  updateDrawerLinkIcon();
  document.body.style.overflow = 'hidden';
  initFaders();
}

function closeDrawer() {
  if (!state.drawerOpen) return;
  clearFaders();
  $('#drawer').classList.remove('open');
  $('#drawer').setAttribute('aria-hidden', 'true');
  state.drawerOpen = false;
  state.currentItem = null;
  setDrawerHash(null);
  document.body.style.overflow = '';
}

/* ── Copy drawer link ── */
let linkCopiedTimer = null;
function updateDrawerLinkIcon() {
  const btn = $('#drawer-copy-link');
  if (!btn) return;
  btn.innerHTML = state.linkCopied ? icon('check', 20) : icon('link', 20);
  btn.classList.toggle('copied', state.linkCopied);
}
function handleCopyDrawerLink() {
  const item = state.currentItem;
  if (!item) return;
  const url = drawerURLFor(item);
  if (!url) return;
  const full = location.href.split('#')[0] + url;
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(full).catch(() => {});
  state.linkCopied = true;
  updateDrawerLinkIcon();
  if (linkCopiedTimer) clearTimeout(linkCopiedTimer);
  linkCopiedTimer = setTimeout(() => { state.linkCopied = false; updateDrawerLinkIcon(); }, 2000);
}

/* ── Mobile menu ── */
function setMobileMenu(open) {
  const wrap = $('#mobile-menu');
  if (!wrap) return;
  wrap.classList.toggle('open', open);
  wrap.setAttribute('aria-hidden', open ? 'false' : 'true');
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) updateChrome();
}

/* ── Nav / scroll ── */
function scrollToSection(key) {
  if (key === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const el = document.getElementById(key);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 16;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
  setMobileMenu(false);
}

let currentSection = 'home';
function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;
  btn.innerHTML = icon('arrowUp', 18);
  const onScroll = () => btn.classList.toggle('show', window.scrollY > 400);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
function updateNavActive() {
  $$('.nav-link').forEach((el) => {
    el.classList.toggle('active', el.dataset.nav === currentSection);
  });
}
function initScrollSpy() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { currentSection = entry.target.id; updateNavActive(); }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  ['home', 'work', 'projects', 'updates', 'info', 'contact'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/* ── Copy email ── */
let copyTimer = null;
function handleCopyEmail() {
  const email = data.info.contact?.email || 'studio@tomiabe.com';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).catch(() => {});
  }
  state.copied = true;
  updateChrome();
  if (copyTimer) clearTimeout(copyTimer);
  copyTimer = setTimeout(() => { state.copied = false; updateChrome(); }, 2000);
}

/* ── Chrome (nav active, theme, email) ── */
function updateChrome() {
  $$('.theme-btn').forEach((el) => {
    el.classList.toggle('active', el.dataset.theme === state.theme);
  });
  const menuEmail = $('#menu-email');
  if (menuEmail) menuEmail.textContent = data.info.contact?.email || 'studio@tomiabe.com';
  const menuIcon = $('#menu-copy-icon');
  if (menuIcon) menuIcon.innerHTML = state.copied ? `<span class="copy-ok">${icon('check', 12)}</span>` : `<span class="copy-hint">${icon('copy', 12)}</span>`;
  const contactIcon = $('#contact-email-icon');
  if (contactIcon) {
    contactIcon.innerHTML = state.copied ? `<span class="copy-ok">${icon('check', 16)}</span>` : icon('copy', 16);
  }
}

/* ── Event delegation ── */
document.addEventListener('click', (e) => {
  const navBtn = e.target.closest('[data-nav]');
  if (navBtn) {
    scrollToSection(navBtn.dataset.nav);
    return;
  }

  const openBtn = e.target.closest('[data-open]');
  if (openBtn) {
    openDrawer(openBtn.dataset.open);
    return;
  }

  const filterBtn = e.target.closest('[data-filter]');
  if (filterBtn) {
    state.filters[filterBtn.dataset.section] = filterBtn.dataset.filter;
    renderFilters(filterBtn.dataset.section);
    renderGrid(filterBtn.dataset.section);
    return;
  }

  const copyBtn = e.target.closest('[data-copy-email]');
  if (copyBtn) {
    handleCopyEmail();
    return;
  }

  const copyLinkBtn = e.target.closest('[data-copy-drawer-link]');
  if (copyLinkBtn) {
    handleCopyDrawerLink();
    return;
  }

  const themeBtn = e.target.closest('[data-theme]');
  if (themeBtn) {
    setTheme(themeBtn.dataset.theme);
    return;
  }

  const openMenu = e.target.closest('[data-open-menu]');
  if (openMenu) {
    setMobileMenu(true);
    return;
  }

  const closeMenu = e.target.closest('[data-close-menu]');
  if (closeMenu) {
    setMobileMenu(false);
    return;
  }

  const closeDrawerBtn = e.target.closest('[data-close-drawer]');
  if (closeDrawerBtn) {
    closeDrawer();
    return;
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (state.drawerOpen) closeDrawer();
    else setMobileMenu(false);
  }
});

window.addEventListener('hashchange', () => {
  const id = itemIdFromHash(location.hash);
  if (id) {
    if (!(state.drawerOpen && state.currentItem && state.currentItem.id === id)) openDrawer(id);
  } else if (state.drawerOpen) {
    closeDrawer();
  }
});


/* ── Dither background ── */
function parseCanvasColor(value) {
  const probe = document.createElement('span');
  probe.style.color = value;
  document.body.appendChild(probe);
  const rgb = getComputedStyle(probe).color.match(/\d+(?:\.\d+)?/g).map(Number).slice(0, 3);
  probe.remove();
  return rgb;
}

function rgba(rgb, alpha) {
  return 'rgba(' + rgb.join(',') + ',' + alpha + ')';
}

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function initDitherFields() {
  const canvases = $$('[data-dither-field]');
  if (!canvases.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  canvases.forEach((canvas) => {
    const ctx = canvas.getContext('2d');
    const parent = canvas.closest('.has-dither') || canvas.parentElement;
    const isHero = canvas.classList.contains('dither-canvas-hero');
    const isInfo = canvas.classList.contains('dither-canvas-info');
    const isFooter = canvas.classList.contains('dither-canvas-footer');
    const pointer = { x: 0.5, y: 0.35, tx: 0.5, ty: 0.35, active: false };
    let time = 0;
    let lastFrame = 0;

    function fit() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return rect;
    }

    function updatePointer(event) {
      const rect = parent.getBoundingClientRect();
      pointer.tx = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      pointer.ty = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      pointer.active = true;
    }

    function leavePointer() {
      pointer.tx = 0.5;
      pointer.ty = 0.35;
      pointer.active = false;
    }

    function draw(now) {
      if (now && now - lastFrame < 42) {
        requestAnimationFrame(draw);
        return;
      }
      lastFrame = now || 0;

      const rect = fit();
      const fg = parseCanvasColor(cssVar('--theme-fg'));
      const muted = parseCanvasColor(cssVar('--theme-muted'));
      const gap = window.innerWidth < 768 ? 7 : (isHero ? 5 : 6);
      const strength = isHero ? 0.42 : (isInfo ? 0.3 : (isFooter ? 0.28 : 0.34));
      const size = isHero ? 1.95 : (isInfo ? 1.55 : 1.65);

      pointer.x += (pointer.tx - pointer.x) * 0.07;
      pointer.y += (pointer.ty - pointer.y) * 0.07;
      if (!reduceMotion) time += 0.008;

      ctx.clearRect(0, 0, rect.width, rect.height);

      const glow = ctx.createRadialGradient(rect.width * pointer.x, rect.height * pointer.y, 0, rect.width * pointer.x, rect.height * pointer.y, rect.width * 0.45);
      glow.addColorStop(0, rgba(muted, pointer.active ? 0.08 : 0.045));
      glow.addColorStop(1, rgba(muted, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, rect.width, rect.height);

      for (let y = 0; y < rect.height; y += gap) {
        for (let x = 0; x < rect.width; x += gap) {
          const nx = x / rect.width - pointer.x;
          const ny = y / rect.height - pointer.y;
          const wave = Math.sin(nx * 13 + time) + Math.cos(ny * 17 - time * 1.15);
          const falloff = Math.max(0, 1 - Math.sqrt(nx * nx + ny * ny) * 1.5);
          const alpha = Math.max(0, (wave * 0.5 + 0.5) * falloff * strength);
          if (alpha > 0.012) {
            ctx.fillStyle = rgba(fg, alpha);
            ctx.fillRect(x, y, size, size);
          }
        }
      }

      if (!reduceMotion) requestAnimationFrame(draw);
    }

    if (!reduceMotion) {
      parent.addEventListener('pointermove', updatePointer, { passive: true });
      parent.addEventListener('pointerleave', leavePointer);
    }
    window.addEventListener('resize', () => draw(performance.now()), { passive: true });
    window.addEventListener('tomi-theme-change', () => draw(performance.now()));
    draw(0);
  });
}

/* ── Init ── */
function init() {
  loadData();
  renderHero();
  const labels = data.home.labels || {};
  const setTitle = (id, label) => { const el = $('#' + id + ' .section-title'); if (el && label) el.textContent = label; };
  setTitle('work', labels.workSectionHeading);
  setTitle('updates', labels.updatesSectionHeading);
  setTitle('info', labels.infoSectionHeading);
  renderFilters('work');
  renderFilters('projects');
  renderFilters('updates');
  renderGrid('work');
  renderGrid('projects');
  renderGrid('updates');
  renderInfo();
  renderContact();

  const socialsMenu = $('#socials-menu');
  if (socialsMenu) socialsMenu.innerHTML = socialLinksHTML();
  const closeBtns = $$('.menu-close, .drawer-close');
  closeBtns.forEach((btn) => { btn.innerHTML = icon('x', 20); });
  updateDrawerLinkIcon();
  const themeIcons = { morning: 'sunrise', noon: 'sun', night: 'moon', system: 'monitor' };
  $$('.theme-btn').forEach((btn) => { btn.innerHTML = icon(themeIcons[btn.dataset.theme] || 'sun', 16); });

  const previewTheme = new URLSearchParams(location.search).get('theme');
  const initialTheme = ['morning', 'noon', 'night', 'system'].includes(previewTheme) ? previewTheme : state.theme;
  state.theme = initialTheme;
  applyTheme(initialTheme);
  startClock();
  initScrollSpy();
  initBackToTop();
  initDitherFields();

  const deepId = itemIdFromHash(location.hash);
  if (deepId) openDrawer(deepId);

  const loading = $('#loading');
  if (loading) loading.classList.add('hidden');
}

init();
