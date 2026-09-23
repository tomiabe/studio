document.addEventListener('DOMContentLoaded', () => {
  const shellScript = [...document.scripts].find(script => script.src.includes('shared-shell.js'));
  const projectRoot = new URL('./', shellScript?.src || window.location.href);
  const projectUrl = path => new URL(path, projectRoot).href;
  const path = window.location.pathname;
  const usesPublicNavigation = !path.includes('/trips/') && !path.includes('/checkout/');
  const tripPathIsActive = path.includes('/explore/') || path.includes('/stay/') || path.includes('/experience/');
  const navigationMarkup = `<a class="${tripPathIsActive ? 'active' : ''}" href="${projectUrl('explore/')}">Plan your trip</a>
    <div class="nav-dropdown"><button type="button" aria-expanded="false">About Fairbnb <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button><div class="nav-dropdown-menu"><a href="${projectUrl('about/')}" data-prototype-page="About Fairbnb">About the cooperative</a><a href="${projectUrl('how-it-works/')}" data-prototype-page="How Fairbnb works">How Fairbnb works</a><a href="${projectUrl('manifesto/')}" data-prototype-page="Our manifesto">Our manifesto</a><a href="${projectUrl('local-groups/')}" data-prototype-page="Local groups">Local groups</a><a href="${projectUrl('journal/')}" data-prototype-page="Journal">Journal</a></div></div>
    <div class="nav-dropdown"><button type="button" aria-expanded="false">Get involved <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button><div class="nav-dropdown-menu"><a href="${projectUrl('?participate=1')}">Offer a fair stay</a><a href="${projectUrl('?participate=1')}">Host an experience</a><a href="${projectUrl('?participate=1')}">Become a local scout</a><a href="${projectUrl('?participate=1')}">Start a local group</a></div></div>`;
  const desktopNavigation = document.querySelector('.global-header .desktop-nav');
  if (desktopNavigation && usesPublicNavigation) desktopNavigation.innerHTML = navigationMarkup;

  const mobileNavigation = document.querySelector('.global-header .mobile-nav');
  if (mobileNavigation && usesPublicNavigation) {
    mobileNavigation.querySelectorAll('.mobile-nav-group').forEach(group => group.remove());
    mobileNavigation.insertAdjacentHTML('afterbegin', `<div class="mobile-nav-group"><h2>Plan your trip</h2><a href="${projectUrl('explore/')}">Explore destinations</a><a href="${projectUrl('explore/?view=stays')}">Stays</a><a href="${projectUrl('explore/?view=experiences')}">Experiences</a></div><div class="mobile-nav-group"><h2>About Fairbnb</h2><a href="${projectUrl('about/')}" data-prototype-page="About Fairbnb">About the cooperative</a><a href="${projectUrl('how-it-works/')}" data-prototype-page="How Fairbnb works">How Fairbnb works</a><a href="${projectUrl('manifesto/')}" data-prototype-page="Our manifesto">Our manifesto</a><a href="${projectUrl('local-groups/')}" data-prototype-page="Local groups">Local groups</a><a href="${projectUrl('journal/')}" data-prototype-page="Journal">Journal</a></div><div class="mobile-nav-group"><h2>Get involved</h2><a href="${projectUrl('?participate=1')}">Offer a fair stay</a><a href="${projectUrl('?participate=1')}">Host an experience</a><a href="${projectUrl('?participate=1')}">Become a local scout</a><a href="${projectUrl('?participate=1')}">Start a local group</a></div>`);
  }

  const closeNavigationDropdowns = () => {
    document.querySelectorAll('.nav-dropdown.open').forEach(dropdown => {
      dropdown.classList.remove('open');
      dropdown.querySelector(':scope > button')?.setAttribute('aria-expanded', 'false');
    });
  };
  document.querySelectorAll('.nav-dropdown > button').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation();
      const dropdown = button.closest('.nav-dropdown');
      const opening = !dropdown.classList.contains('open');
      closeNavigationDropdowns();
      dropdown.classList.toggle('open', opening);
      button.setAttribute('aria-expanded', String(opening));
    });
  });
  document.addEventListener('click', closeNavigationDropdowns);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeNavigationDropdowns();
  });

  let localeMenu;
  let localeTrigger;
  const localeOptions = {
    NGN: { label: '🇬🇧 · ₦', name: 'Nigerian naira', symbol: '₦' },
    EUR: { label: '🇬🇧 · €', name: 'Euro', symbol: '€' },
    GBP: { label: '🇬🇧 · £', name: 'Pound sterling', symbol: '£' }
  };

  function closeLocaleMenu(restoreFocus = true) {
    if (!localeMenu?.open) return;
    localeMenu.close();
    if (restoreFocus) localeTrigger?.focus();
  }

  function updateLocaleSelection(value) {
    const normalizedValue = localeOptions[value] ? value : value?.split(' · ').at(-1);
    if (!localeOptions[normalizedValue]) return;
    document.querySelectorAll('.locale-label').forEach(label => { label.textContent = localeOptions[normalizedValue].label; });
    window.localStorage.setItem('fairbnb-locale', normalizedValue);
    localeMenu?.querySelectorAll('[data-locale-value]').forEach(option => {
      const selected = option.dataset.localeValue === normalizedValue;
      option.setAttribute('aria-checked', String(selected));
      option.querySelector('i').hidden = !selected;
    });
  }

  function openLocaleMenu(trigger) {
    localeTrigger = trigger;
    if (!localeMenu) {
      localeMenu = document.createElement('dialog');
      localeMenu.className = 'locale-menu';
      localeMenu.setAttribute('aria-label', 'Choose language and currency');
      localeMenu.innerHTML = '<div class="locale-menu-header"><h2>Language and currency</h2><button type="button" data-close-locale aria-label="Close language and currency"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></div><div class="active-language"><span aria-hidden="true">🇬🇧</span><span><strong>English</strong><small>Active language</small></span><i class="fa-solid fa-check" aria-hidden="true"></i></div><p>Choose the currency used for prices.</p><div role="radiogroup" aria-label="Currency"><button type="button" role="radio" data-locale-value="NGN"><span><strong>Nigerian naira</strong><small>₦</small></span><i class="fa-solid fa-check" aria-hidden="true"></i></button><button type="button" role="radio" data-locale-value="EUR"><span><strong>Euro</strong><small>€</small></span><i class="fa-solid fa-check" aria-hidden="true"></i></button><button type="button" role="radio" data-locale-value="GBP"><span><strong>Pound sterling</strong><small>£</small></span><i class="fa-solid fa-check" aria-hidden="true"></i></button></div>';
      document.body.append(localeMenu);
      localeMenu.querySelectorAll('[data-locale-value]').forEach(option => {
        option.addEventListener('click', () => {
          updateLocaleSelection(option.dataset.localeValue);
          closeLocaleMenu();
        });
      });
      localeMenu.querySelector('[data-close-locale]').addEventListener('click', () => closeLocaleMenu());
      localeMenu.addEventListener('click', event => {
        if (event.target === localeMenu) closeLocaleMenu();
      });
      localeMenu.addEventListener('cancel', event => {
        event.preventDefault();
        closeLocaleMenu();
      });
    }
    if (localeMenu.open) {
      closeLocaleMenu();
      return;
    }
    const currentValue = window.localStorage.getItem('fairbnb-locale') || 'NGN';
    updateLocaleSelection(currentValue);
    localeMenu.showModal();
    localeMenu.querySelector('[aria-checked="true"]')?.focus();
  }

  updateLocaleSelection(window.localStorage.getItem('fairbnb-locale') || 'NGN');

  document.querySelectorAll('[data-language-toggle]').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation();
      openLocaleMenu(event.currentTarget);
    });
  });

  const view = new URLSearchParams(window.location.search).get('view');
  let activeSection = '';
  if (path.includes('/stay/')) activeSection = 'stays';
  else if (path.includes('/experience/')) activeSection = 'experiences';
  else if (path.includes('/explore/')) activeSection = view === 'stays' || view === 'experiences' ? view : 'destinations';

  if (activeSection) {
    document.querySelectorAll('[data-nav-section]').forEach(link => {
      link.classList.toggle('active', link.dataset.navSection === activeSection);
    });
  }

  let shellToast;
  let shellToastTimer;
  function showShellToast(message) {
    if (!shellToast) {
      shellToast = document.createElement('div');
      shellToast.className = 'shell-toast';
      shellToast.setAttribute('role', 'status');
      shellToast.setAttribute('aria-live', 'polite');
      document.body.append(shellToast);
    }
    shellToast.textContent = message;
    shellToast.hidden = false;
    window.clearTimeout(shellToastTimer);
    shellToastTimer = window.setTimeout(() => { shellToast.hidden = true; }, 4200);
  }

  document.querySelectorAll('[data-prototype-page]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      showShellToast('This page is part of the full Fairbnb platform. Explore Stays, Experiences or Destinations instead.');
    });
  });

});
