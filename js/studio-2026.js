const root = document.documentElement;
const heroImage = document.querySelector('[data-hero-image]');
const heroImages = [
  { src: '/assets/media/hero-adrien-olichon.jpg', alt: 'Curving dark architectural structure' },
  { src: '/assets/media/hero-ellen-qin.jpg', alt: 'Pattern of overlapping white spheres' },
  { src: '/assets/media/hero-pawel-czerwinski.jpg', alt: 'Layers of translucent white paper' },
  { src: '/assets/media/hero-visax.jpg', alt: 'Fine diagonal lines on a dark surface' }
];
let heroIndex = Math.floor(Math.random() * heroImages.length);
try {
  const previousIndex = Number.parseInt(sessionStorage.getItem('studio-hero-index'), 10);
  if (previousIndex >= 0 && previousIndex < heroImages.length) {
    heroIndex = (previousIndex + 1) % heroImages.length;
  }
  sessionStorage.setItem('studio-hero-index', String(heroIndex));
} catch {
  // Browsers that block session storage still get one image per page load.
}
heroImage.alt = heroImages[heroIndex].alt;
heroImage.addEventListener('load', () => heroImage.classList.add('is-ready'), { once: true });
heroImage.src = heroImages[heroIndex].src;
if (heroImage.complete && heroImage.naturalWidth > 0) heroImage.classList.add('is-ready');

const themeButton = document.querySelector('[data-theme-toggle]');
const savedTheme = localStorage.getItem('studio-theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

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
document.querySelector('[data-year]').textContent = new Date().getFullYear();

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
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

const workToggle = document.querySelector('[data-work-toggle]');
const extraWork = document.querySelectorAll('[data-extra-work]');
workToggle.addEventListener('click', () => {
  const expanded = workToggle.getAttribute('aria-expanded') !== 'true';
  extraWork.forEach(item => { item.hidden = !expanded; });
  workToggle.setAttribute('aria-expanded', String(expanded));
  workToggle.textContent = expanded ? 'Show less work' : 'Show more work';
});

const filterButtons = document.querySelectorAll('[data-filter]');
const projectItems = document.querySelectorAll('[data-project-id]');
const projectToggle = document.querySelector('[data-project-toggle]');
let activeCategory = 'all';
let showAllProjects = false;

function updateProjects() {
  projectItems.forEach(item => {
    const matches = activeCategory === 'all' || item.dataset.category === activeCategory;
    const collapsedExtra = activeCategory === 'all' && !showAllProjects && item.hasAttribute('data-extra-project');
    item.hidden = !matches || collapsedExtra;
  });
  projectToggle.parentElement.hidden = activeCategory !== 'all';
  projectToggle.setAttribute('aria-expanded', String(showAllProjects));
  projectToggle.textContent = showAllProjects ? 'Show fewer projects' : 'Show more projects';
}

filterButtons.forEach(button => button.addEventListener('click', () => {
  activeCategory = button.dataset.filter;
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  updateProjects();
}));

projectToggle.addEventListener('click', () => {
  showAllProjects = !showAllProjects;
  updateProjects();
});

if (window.lucide) window.lucide.createIcons();
