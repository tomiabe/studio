const root = document.documentElement;
const themeButton = document.querySelector('[data-theme-toggle]');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('studio-theme');

function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
}

setTheme(savedTheme || (systemDark.matches ? 'dark' : 'light'));
themeButton.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('studio-theme', nextTheme);
  setTheme(nextTheme);
});
systemDark.addEventListener('change', event => {
  if (!localStorage.getItem('studio-theme')) setTheme(event.matches ? 'dark' : 'light');
});

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('[data-menu-toggle]');

function closeMenu() {
  header.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
}

menuButton.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
});
document.querySelectorAll('.site-nav a').forEach(link => link.addEventListener('click', closeMenu));

const filters = [...document.querySelectorAll('[data-archive-filter]')];
const entries = [...document.querySelectorAll('[data-archive-item]')];
const emptyState = document.querySelector('[data-archive-empty]');
const params = new URLSearchParams(location.search);
const initialType = params.get('type');
let activeFilter = initialType === 'work' || initialType === 'projects' ? initialType : 'all';

entries.sort((a, b) => Number(b.dataset.year) - Number(a.dataset.year));
entries.forEach(entry => entry.parentElement.append(entry));

function applyFilter(filter, updateUrl = false) {
  activeFilter = filter;
  let visible = 0;
  entries.forEach(entry => {
    const matches = filter === 'all' || entry.dataset.entryType === filter;
    entry.hidden = !matches;
    if (matches) visible += 1;
  });
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.archiveFilter === filter)));
  emptyState.hidden = visible > 0;
  if (updateUrl) {
    const next = new URL(location.href);
    if (filter === 'all') next.searchParams.delete('type');
    else next.searchParams.set('type', filter);
    history.replaceState(null, '', `${next.pathname}${next.search}${next.hash}`);
  }
}

filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.archiveFilter, true)));
applyFilter(activeFilter);

const drawer = document.querySelector('[data-archive-drawer]');
const drawerScroll = window.studioDrawerScrolls?.get(drawer);
let openedFromHistory = false;

function openDrawer(addHistory = true) {
  if (!drawer.open) window.studioDrawerMotion.open(drawer);
  drawerScroll?.start();
  document.body.classList.add('drawer-open');
  if (addHistory && location.hash !== '#ffcc') {
    history.pushState({ archiveDrawer: 'ffcc' }, '', `${location.pathname}${location.search}#ffcc`);
    openedFromHistory = true;
  }
}

function closeDrawer(updateHistory = true) {
  if (drawer.open) window.studioDrawerMotion.close(drawer);
  if (updateHistory && location.hash === '#ffcc') {
    if (openedFromHistory) history.back();
    else history.replaceState(null, '', `${location.pathname}${location.search}`);
  }
  openedFromHistory = false;
}

document.querySelectorAll('[data-drawer-trigger="ffcc"]').forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    openDrawer();
  });
});
document.querySelector('[data-close-drawer]').addEventListener('click', () => closeDrawer());
drawer.addEventListener('close', () => document.body.classList.remove('drawer-open'));
drawer.addEventListener('click', event => {
  if (event.target === drawer) closeDrawer();
});
drawer.addEventListener('cancel', event => {
  event.preventDefault();
  closeDrawer();
});
window.addEventListener('popstate', () => {
  if (location.hash === '#ffcc') openDrawer(false);
  else if (drawer.open) closeDrawer(false);
});
window.addEventListener('hashchange', () => {
  if (location.hash === '#ffcc') openDrawer(false);
  else if (drawer.open) closeDrawer(false);
});
if (location.hash === '#ffcc') openDrawer(false);

document.querySelector('.archive-footer [data-year]').textContent = new Date().getFullYear();
if (globalThis.Lenis) {
  window.studioLenis = new Lenis({ autoRaf: true, anchors: true, prevent: node => Boolean(node.closest?.('.work-drawer')) });
}
if (window.lucide) window.lucide.createIcons();
