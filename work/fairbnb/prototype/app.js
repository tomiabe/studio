document.addEventListener('DOMContentLoaded', () => {
  const cityData = {
    bologna: {
      label: 'Bologna, Italy', country: 'Italy', meta: '24 stays · 15 experiences',
      region: 'Emilia-Romagna, Italy', title: 'A slower weekend in Bologna',
      heroImage: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1800&q=88',
      heroAlt: 'Bologna seen across its historic rooftops', heroNote: 'Portico homes, family kitchens and neighbourhood projects in one trip',
      stayName: 'Portico home near Santo Stefano', stayMeta: '2 guests · 5 nights · €575',
      stayImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1100&q=88',
      experienceName: 'Fresh pasta with neighbourhood cooks', experienceMeta: '3 hours · €68 per person',
      experienceImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1100&q=88',
      impact: '€53.33', project: 'Supports neighbourhood food access through a Bologna community project.', total: '€711 total'
    },
    venice: {
      label: 'Venice, Italy', country: 'Italy', meta: '18 stays · 12 experiences',
      region: 'Veneto, Italy', title: 'Venice beyond the busy routes',
      heroImage: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1800&q=88',
      heroAlt: 'A quiet canal running through Venice', heroNote: 'Canal homes, working ateliers and resident-led projects in one place',
      stayName: 'Canal home in Cannaregio', stayMeta: '2 guests · 5 nights · €725',
      stayImage: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1100&q=88',
      experienceName: 'Handbound books in a local atelier', experienceMeta: '2.5 hours · €62 per person',
      experienceImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1100&q=88',
      impact: '€63.68', project: 'Supports a resident-led project helping Venice remain a living city.', total: '€849 total'
    },
    barcelona: {
      label: 'Barcelona, Spain', country: 'Spain', meta: '21 stays · 17 experiences',
      region: 'Catalonia, Spain', title: 'Neighbourhood Barcelona, one day at a time',
      heroImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1800&q=88',
      heroAlt: 'Barcelona viewed across the city', heroNote: 'Gràcia homes, independent makers and neighbourhood connection',
      stayName: 'Light-filled home in Gràcia', stayMeta: '2 guests · 5 nights · €640',
      stayImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1100&q=88',
      experienceName: 'Ceramics and conversation with Marta', experienceMeta: '3 hours · €54 per person',
      experienceImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1100&q=88',
      impact: '€56.10', project: 'Supports community space and neighbourhood connection in Barcelona.', total: '€748 total'
    },
    porto: {
      label: 'Porto, Portugal', country: 'Portugal', meta: '16 stays · 10 experiences',
      region: 'Norte, Portugal', title: 'Meet Porto through its makers',
      heroImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1800&q=88',
      heroAlt: 'Porto overlooking the Douro river', heroNote: 'Family homes, neighbourhood markets and food shared locally',
      stayName: 'Family home above the Douro', stayMeta: '2 guests · 5 nights · €520',
      stayImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1100&q=88',
      experienceName: 'A morning in the neighbourhood market', experienceMeta: '3.5 hours · €59 per person',
      experienceImage: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1100&q=88',
      impact: '€47.85', project: 'Supports REFOOD Foz do Douro and its work against food waste.', total: '€638 total'
    },
    florence: {
      label: 'Florence, Italy', country: 'Italy', meta: '16 stays · 9 experiences',
      region: 'Tuscany, Italy', title: 'Florence through the hands that shape it',
      heroImage: 'https://images.unsplash.com/photo-1705184001001-d47f4a4884a3?auto=format&fit=crop&w=1800&q=88',
      heroAlt: 'Florence and its historic centre', heroNote: 'Oltrarno homes, artisan studios and support for local apprentices',
      stayName: 'Oltrarno home near Santo Spirito', stayMeta: '2 guests · 5 nights · €690',
      stayImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1100&q=88',
      experienceName: 'Paper marbling with a local artisan', experienceMeta: '2 hours · €58 per person',
      experienceImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1100&q=88',
      impact: '€60.45', project: 'Supports new routes into traditional craft for young people in Oltrarno.', total: '€806 total'
    },
    rome: {
      label: 'Rome, Italy', country: 'Italy', meta: '27 stays · 18 experiences',
      region: 'Lazio, Italy', title: 'A neighbourhood rhythm in Rome',
      heroImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1800&q=88',
      heroAlt: 'The Colosseum and surrounding streets in Rome', heroNote: 'Resident homes, local tables and projects that protect daily life',
      stayName: 'Courtyard home in Testaccio', stayMeta: '2 guests · 5 nights · €710',
      stayImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1100&q=88',
      experienceName: 'Testaccio market with a local cook', experienceMeta: '3 hours · €64 per person',
      experienceImage: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1100&q=88',
      impact: '€62.85', project: 'Supports a neighbourhood initiative creating shared space for residents.', total: '€838 total'
    },
    valencia: {
      label: 'Valencia, Spain', country: 'Spain', meta: '14 stays · 8 experiences',
      region: 'Valencian Community, Spain', title: 'Meet Valencia beyond the postcard',
      heroImage: 'https://images.unsplash.com/photo-1599302592205-d7d683c83eea?auto=format&fit=crop&w=1800&q=88',
      heroAlt: 'Valencia in warm evening light', heroNote: 'Neighbourhood stays, ceramic workshops and stronger local connections',
      stayName: 'Neighbourhood home near El Cabanyal', stayMeta: '2 guests · 5 nights · €540',
      stayImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1100&q=88',
      experienceName: 'Handmade ceramics with a local studio', experienceMeta: '3 hours · €52 per person',
      experienceImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1100&q=88',
      impact: '€48.30', project: 'Supports Orriols Convive and its neighbourhood work.', total: '€644 total'
    },
    amsterdam: {
      label: 'Amsterdam, Netherlands', country: 'Netherlands', meta: '12 stays · 11 experiences',
      region: 'North Holland, Netherlands', title: 'Amsterdam with room for local life',
      heroImage: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1800&q=88',
      heroAlt: 'Canal houses and bicycles in Amsterdam', heroNote: 'Canal-side stays, local workshops and shared green spaces',
      stayName: 'Quiet home across the IJ', stayMeta: '2 guests · 5 nights · €760',
      stayImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1100&q=88',
      experienceName: 'Cycle the north with a resident guide', experienceMeta: '3 hours · €57 per person',
      experienceImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1100&q=88',
      impact: '€65.55', project: 'Supports a community gardening project in Amsterdam North.', total: '€874 total'
    }
  };

  const menuButton = document.getElementById('menu-button');
  const mobileNav = document.getElementById('mobile-nav');
  const modeButtons = [...document.querySelectorAll('[data-mode]')];
  const cityButtons = [...document.querySelectorAll('[data-city]')];
  const destinationValue = document.getElementById('destination-select');
  const destinationSearch = document.getElementById('destination-search');
  const destinationResults = document.getElementById('destination-results');
  const guestTrigger = document.getElementById('guests-trigger');
  const guestMenu = document.getElementById('guest-menu');
  const guestSummary = document.getElementById('guest-summary');
  const searchForm = document.getElementById('search-form');
  const detailDialog = document.getElementById('detail-dialog');
  const involvementDialog = document.getElementById('involvement-dialog');
  const loginDialog = document.getElementById('login-dialog');
  const bookingValue = document.getElementById('booking-value');
  const heroImage = document.getElementById('hero-place-image');
  const journeyExperienceRoutes = {
    bologna: 'lucia-cooking',
    venice: 'cannaregio-bookbinding',
    barcelona: 'marta-ceramics',
    valencia: 'local-ceramics'
  };
  let selectedCityKey = destinationValue.value;
  let activeSuggestion = -1;
  let visibleSuggestions = [];
  let heroChangeTimer;
  let adults = 2;
  let children = 0;

  const setExpanded = (button, expanded) => button.setAttribute('aria-expanded', String(expanded));

  function updateHero(cityKey) {
    const city = cityData[cityKey];
    if (!city) return;
    window.clearTimeout(heroChangeTimer);
    heroImage.classList.add('is-changing');
    heroChangeTimer = window.setTimeout(() => {
      heroImage.src = city.heroImage;
      heroImage.alt = city.heroAlt;
      document.getElementById('hero-place-name').textContent = `${city.label.split(',')[0]}, seen locally`;
      document.getElementById('hero-place-note').textContent = city.heroNote;
      heroImage.classList.remove('is-changing');
    }, 100);
  }

  function chooseFreshHero() {
    const keys = Object.keys(cityData);
    let previous = '';
    try { previous = window.sessionStorage.getItem('fairbnb-last-hero') || ''; } catch (error) { previous = ''; }
    const choices = keys.filter(key => key !== previous);
    const chosen = choices[Math.floor(Math.random() * choices.length)] || keys[0];
    try { window.sessionStorage.setItem('fairbnb-last-hero', chosen); } catch (error) { /* Storage can be unavailable. */ }
    updateCity(chosen);
    updateHero(chosen);
  }

  function updateCity(cityKey) {
    const city = cityData[cityKey];
    if (!city) return;
    selectedCityKey = cityKey;
    destinationValue.value = cityKey;
    document.getElementById('journey-region').textContent = city.region;
    document.getElementById('journey-title').textContent = city.title;
    document.getElementById('stay-name').textContent = city.stayName;
    document.getElementById('stay-meta').textContent = city.stayMeta;
    document.getElementById('stay-image').src = city.stayImage;
    document.getElementById('stay-image').alt = city.stayName;
    document.getElementById('experience-name').textContent = city.experienceName;
    document.getElementById('experience-meta').textContent = city.experienceMeta;
    document.getElementById('experience-image').src = city.experienceImage;
    document.getElementById('experience-image').alt = city.experienceName;
    document.getElementById('impact-amount').textContent = city.impact;
    document.getElementById('impact-project').textContent = city.project;
    document.getElementById('trip-total').textContent = city.total;
    document.getElementById('explore-city').textContent = `Explore ${city.label.split(',')[0]}`;
    cityButtons.forEach(item => {
      const selected = item.dataset.city === cityKey;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
  }

  function closeDestinationResults() {
    destinationResults.hidden = true;
    setExpanded(destinationSearch, false);
    destinationSearch.setAttribute('aria-activedescendant', '');
    activeSuggestion = -1;
  }

  function selectDestination(cityKey) {
    const city = cityData[cityKey];
    if (!city) return;
    destinationSearch.value = city.label;
    updateHero(cityKey);
    updateCity(cityKey);
    closeDestinationResults();
  }

  function renderDestinationResults(query = '') {
    const normalized = query.trim().toLowerCase();
    visibleSuggestions = Object.entries(cityData).filter(([, city]) => {
      const haystack = `${city.label} ${city.country} ${city.region}`.toLowerCase();
      return !normalized || haystack.includes(normalized);
    });
    destinationResults.innerHTML = '';
    if (!visibleSuggestions.length) {
      const empty = document.createElement('p');
      empty.className = 'destination-empty';
      empty.textContent = 'That destination is not in this prototype yet. Try Italy, Spain, Portugal or Amsterdam.';
      destinationResults.appendChild(empty);
    } else {
      visibleSuggestions.forEach(([key, city], index) => {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'destination-option';
        option.id = `destination-option-${index}`;
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', 'false');
        option.innerHTML = `<i class="fa-solid fa-location-dot" aria-hidden="true"></i><span><strong>${city.label}</strong><small>${city.region}</small></span><small>${city.meta}</small>`;
        option.addEventListener('click', () => selectDestination(key));
        destinationResults.appendChild(option);
      });
    }
    destinationResults.hidden = false;
    setExpanded(destinationSearch, true);
  }

  function setActiveSuggestion(nextIndex) {
    const options = [...destinationResults.querySelectorAll('[role="option"]')];
    if (!options.length) return;
    activeSuggestion = Math.max(0, Math.min(nextIndex, options.length - 1));
    options.forEach((option, index) => {
      const active = index === activeSuggestion;
      option.classList.toggle('active', active);
      option.setAttribute('aria-selected', String(active));
    });
    destinationSearch.setAttribute('aria-activedescendant', options[activeSuggestion].id);
    options[activeSuggestion].scrollIntoView({ block: 'nearest' });
  }

  menuButton.addEventListener('click', () => {
    const willOpen = mobileNav.hidden;
    mobileNav.hidden = !willOpen;
    setExpanded(menuButton, willOpen);
    menuButton.setAttribute('aria-label', willOpen ? 'Close menu' : 'Open menu');
    menuButton.innerHTML = `<i class="fa-solid fa-${willOpen ? 'xmark' : 'bars'}" aria-hidden="true"></i>`;
  });

  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileNav.hidden = true;
    setExpanded(menuButton, false);
    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  }));

  modeButtons.forEach(button => button.addEventListener('click', () => {
    modeButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    const labels = { stay: 'Search stays', experience: 'Search experiences', both: 'Search stays and experiences' };
    searchForm.querySelector('.search-button span').textContent = labels[button.dataset.mode];
  }));

  destinationSearch.addEventListener('focus', () => renderDestinationResults(destinationSearch.value));
  destinationSearch.addEventListener('input', () => {
    destinationValue.value = '';
    renderDestinationResults(destinationSearch.value);
    const exact = Object.entries(cityData).find(([, city]) => city.label.toLowerCase() === destinationSearch.value.trim().toLowerCase());
    if (exact) selectDestination(exact[0]);
  });
  destinationSearch.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (destinationResults.hidden) renderDestinationResults(destinationSearch.value);
      setActiveSuggestion(activeSuggestion + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveSuggestion(activeSuggestion - 1);
    } else if (event.key === 'Enter' && activeSuggestion >= 0) {
      event.preventDefault();
      selectDestination(visibleSuggestions[activeSuggestion][0]);
    } else if (event.key === 'Escape') {
      closeDestinationResults();
    }
  });

  guestTrigger.addEventListener('click', () => {
    const willOpen = guestMenu.hidden;
    guestMenu.hidden = !willOpen;
    setExpanded(guestTrigger, willOpen);
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('#guests-trigger') && !event.target.closest('#guest-menu')) {
      guestMenu.hidden = true;
      setExpanded(guestTrigger, false);
    }
    if (!event.target.closest('#destination-combobox')) closeDestinationResults();
  });

  document.querySelectorAll('[data-count]').forEach(button => button.addEventListener('click', () => {
    const change = Number(button.dataset.change);
    if (button.dataset.count === 'adults') adults = Math.min(8, Math.max(1, adults + change));
    if (button.dataset.count === 'children') children = Math.min(6, Math.max(0, children + change));
    document.getElementById('adult-count').textContent = adults;
    document.getElementById('child-count').textContent = children;
    const total = adults + children;
    guestSummary.textContent = `${total} guest${total === 1 ? '' : 's'}`;
  }));

  cityButtons.forEach(button => button.addEventListener('click', () => selectDestination(button.dataset.city)));

  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const firstMatch = visibleSuggestions[0];
    if (!destinationValue.value && firstMatch) selectDestination(firstMatch[0]);
    if (!destinationValue.value) {
      destinationSearch.focus();
      renderDestinationResults(destinationSearch.value);
      return;
    }
    updateCity(destinationValue.value);
    const dates = new URLSearchParams({ city: destinationValue.value, checkin: document.getElementById('checkin').value, checkout: document.getElementById('checkout').value, guests: String(adults + children) });
    window.location.href = `explore/?${dates}`;
  });

  function showDetail(type) {
    const city = cityData[selectedCityKey];
    const image = document.getElementById('dialog-image');
    const title = document.getElementById('dialog-title');
    const copy = document.getElementById('dialog-copy');
    const addButton = document.getElementById('dialog-add-button');
    if (type === 'stay') {
      image.src = city.stayImage;
      image.alt = city.stayName;
      title.textContent = city.stayName;
      copy.textContent = `${city.stayMeta}. This home follows the local hosting rules used by the Fairbnb community.`;
      addButton.textContent = 'Keep this stay';
    } else if (type === 'impact') {
      image.src = 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=88';
      image.alt = 'People at a neighbourhood market';
      title.textContent = `${city.impact} stays in the destination`;
      copy.textContent = `${city.project} Half of the platform fee supports the project. The other half runs the cooperative.`;
      addButton.textContent = 'Choose my project';
    } else if (type === 'trip') {
      image.src = city.heroImage;
      image.alt = city.heroAlt;
      title.textContent = city.title;
      copy.textContent = `${city.stayName}, ${city.experienceName}, and ${city.impact} for a local project. Your dates and guest details stay together as you continue.`;
      addButton.textContent = 'Save this trip';
    } else {
      image.src = city.experienceImage;
      image.alt = city.experienceName;
      title.textContent = city.experienceName;
      copy.textContent = `${city.experienceMeta}. Meet a local host and keep the same dates, guests and community contribution as the rest of your trip.`;
      addButton.textContent = 'Keep this experience';
    }
    detailDialog.showModal();
  }

  document.getElementById('stay-selection').addEventListener('click', () => {
    const params = new URLSearchParams({ city: selectedCityKey, listing: 'stay-0', checkin: document.getElementById('checkin').value, checkout: document.getElementById('checkout').value, guests: String(adults + children) });
    window.location.href = `stay/?${params}`;
  });
  document.getElementById('experience-selection').addEventListener('click', () => {
    const route = journeyExperienceRoutes[selectedCityKey];
    const params = new URLSearchParams({ city: selectedCityKey, checkin: document.getElementById('checkin').value, guests: String(adults + children) });
    if (route) {
      params.set('experience', route);
      window.location.href = `experience/?${params}`;
      return;
    }
    params.set('view', 'experiences');
    window.location.href = `explore/?${params}`;
  });
  document.getElementById('impact-details').addEventListener('click', () => showDetail('impact'));
  document.getElementById('build-trip').addEventListener('click', () => {
    const params = new URLSearchParams({ city: selectedCityKey, checkin: document.getElementById('checkin').value, checkout: document.getElementById('checkout').value, guests: String(adults + children) });
    window.location.href = `explore/?${params}`;
  });
  document.getElementById('explore-city').addEventListener('click', () => {
    const dates = new URLSearchParams({ city: selectedCityKey, checkin: document.getElementById('checkin').value, checkout: document.getElementById('checkout').value, guests: String(adults + children) });
    window.location.href = `explore/?${dates}`;
  });
  document.querySelectorAll('[data-open-detail]').forEach(button => button.addEventListener('click', () => showDetail(button.dataset.openDetail)));

  function updateFeeBreakdown() {
    const total = Number(bookingValue.value);
    const fee = total * 0.15;
    const share = fee / 2;
    document.getElementById('booking-value-output').textContent = `€${total}`;
    document.getElementById('platform-fee').textContent = `€${fee.toFixed(2)}`;
    document.getElementById('cooperative-share').textContent = `€${share.toFixed(2)}`;
    document.getElementById('community-share').textContent = `€${share.toFixed(2)}`;
  }
  bookingValue.addEventListener('input', updateFeeBreakdown);

  const projectRows = [...document.querySelectorAll('[data-project]')];
  projectRows.forEach(row => row.addEventListener('click', () => {
    projectRows.forEach(item => {
      const selected = item === row;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.getElementById('project-choice-button').textContent = `${row.querySelector('.project-name').textContent} selected`;
  }));
  document.getElementById('project-choice-button').addEventListener('click', () => document.getElementById('project-list').scrollIntoView({ behavior: 'smooth', block: 'center' }));

  document.querySelectorAll('[data-open-involvement]').forEach(button => button.addEventListener('click', () => {
    mobileNav.hidden = true;
    setExpanded(menuButton, false);
    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    involvementDialog.showModal();
  }));
  function openAuthentication(mode = 'login') {
    const creatingAccount = mode === 'signup';
    loginDialog.querySelector('h2').textContent = creatingAccount ? 'Create your Fairbnb account.' : 'Welcome back.';
    loginDialog.querySelector('.dialog-content > p').textContent = creatingAccount
      ? 'Save trips, keep booking details together and follow the projects your travel supports.'
      : 'Log in to keep your trips, bookings and community contributions together.';
    loginDialog.querySelector('form .primary-button').textContent = creatingAccount ? 'Create account' : 'Continue';
    loginDialog.showModal();
  }

  document.querySelectorAll('[data-open-login]').forEach(button => button.addEventListener('click', () => openAuthentication(button.dataset.authMode || 'login')));
  document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  [detailDialog, involvementDialog, loginDialog].forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
  });
  document.getElementById('dialog-add-button').addEventListener('click', event => {
    event.currentTarget.textContent = 'Added to your trip';
    window.setTimeout(() => detailDialog.close(), 650);
  });
  involvementDialog.querySelectorAll('.role-options button').forEach(button => button.addEventListener('click', () => {
    involvementDialog.querySelectorAll('.role-options button').forEach(item => {
      item.classList.remove('active');
      const helper = item.querySelector('small');
      if (!helper.dataset.original) helper.dataset.original = helper.textContent;
      helper.textContent = helper.dataset.original;
    });
    button.classList.add('active');
    button.querySelector('small').textContent = 'Selected. This prototype would continue to a tailored introduction.';
  }));
  document.getElementById('login-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    document.getElementById('login-message').textContent = 'Ready. The next step would securely verify this address.';
  });
  const requestedParams = new URLSearchParams(window.location.search);
  const requestedAuthMode = requestedParams.get('auth');
  if (requestedAuthMode === 'login' || requestedAuthMode === 'signup') openAuthentication(requestedAuthMode);
  if (requestedParams.has('participate')) involvementDialog.showModal();

  chooseFreshHero();
});
