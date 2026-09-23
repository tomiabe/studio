document.addEventListener('DOMContentLoaded', () => {
  const cities = {
    barcelona:{label:'Barcelona',area:'Gràcia',host:'Adriana',price:112,rating:'4.82',reviews:34,project:'Gràcia Community Space',purpose:'Shared activities and practical support shaped with local residents.',experiences:['Shape a piece of Gràcia with Marta','Cook a Catalan table with Júlia','Walk the cooperative city with Marc']},
    bologna:{label:'Bologna',area:'Santo Stefano',host:'Lucia',price:118,rating:'4.91',reviews:48,project:'Bologna Solidarity Kitchen',purpose:'Fresh meals and shared tables for neighbours who need them.',experiences:['Make fresh pasta around the family table','Shop the Quadrilatero with Lucia','Discover Bologna by bicycle with Enrico']},
    venice:{label:'Venice',area:'Cannaregio',host:'Paolo',price:145,rating:'4.88',reviews:39,project:'Living Venice Fund',purpose:'Resident-led work that protects everyday neighbourhood life.',experiences:['Bind a travel journal in Cannaregio','Row the quiet canals with a resident','Meet the makers of Castello']},
    porto:{label:'Porto',area:'Cedofeita',host:'Marta',price:104,rating:'4.86',reviews:51,project:'REFOOD Foz do Douro',purpose:'Rescuing good food and sharing meals within the neighbourhood.',experiences:['A morning in the neighbourhood market','Cook a northern Portuguese lunch','Walk Porto with a local architect']},
    florence:{label:'Florence',area:'Oltrarno',host:'Elena',price:138,rating:'4.93',reviews:29,project:'Oltrarno Apprentice Fund',purpose:'Practical routes into traditional craft for young local people.',experiences:['Marble paper with an Oltrarno artisan','Draw Florence with a local illustrator','Visit family workshops across the Arno']},
    rome:{label:'Rome',area:'Testaccio',host:'Giulia',price:142,rating:'4.89',reviews:62,project:'Shared Courtyard Rome',purpose:'Creating welcoming common space for neighbourhood residents.',experiences:['Testaccio market with a local cook','Walk modern Rome with an architect','Make a Roman lunch with neighbours']},
    valencia:{label:'Valencia',area:'El Cabanyal',host:'Ana',price:108,rating:'4.84',reviews:37,project:'Orriols Convive',purpose:'Activities that build trust and connection across the neighbourhood.',experiences:['Make ceramics in a neighbourhood studio','Cycle the old river with Ana','Cook paella with a family host']},
    amsterdam:{label:'Amsterdam',area:'Amsterdam North',host:'Sanne',price:152,rating:'4.87',reviews:44,project:'Amsterdam North Community Garden',purpose:'Shared growing space and neighbourhood activities across the IJ.',experiences:['Cycle the north with a resident guide','Cook Surinamese food with a local host','Photograph Amsterdam beyond the centre']}
  };
  const gallery = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1500&q=88',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=88',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=88',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=88',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=88'
  ];
  const experienceImages = ['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=88','https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=88','https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=88'];
  const params = new URLSearchParams(window.location.search);
  const cityKey = cities[params.get('city')] ? params.get('city') : 'barcelona';
  const city = cities[cityKey];
  const checkin = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');
  const guests = document.getElementById('guests');
  const galleryDialog = document.getElementById('gallery-dialog');
  let activePhoto = 0;
  let toastTimer;

  if (params.get('checkin')) checkin.value = params.get('checkin');
  if (params.get('checkout')) checkout.value = params.get('checkout');
  if (params.get('guests') && ['1','2'].includes(params.get('guests'))) guests.value = params.get('guests');

  function fillCityContent() {
    const title = `Light-filled resident home in ${city.area}`;
    document.title = `${title} | Fairbnb.coop`;
    document.getElementById('listing-title').textContent = title;
    document.getElementById('breadcrumb-area').textContent = city.area;
    document.getElementById('city-result-link').textContent = city.label;
    document.getElementById('city-result-link').href = `../explore/?city=${cityKey}`;
    document.getElementById('listing-location').textContent = `${city.area}, ${city.label}`;
    document.getElementById('listing-rating').textContent = city.rating;
    document.getElementById('review-count').textContent = `${city.reviews} reviews`;
    document.getElementById('home-summary').textContent = `Entire home hosted by ${city.host}`;
    document.querySelectorAll('.host-avatar').forEach(avatar => {
      const photo = avatar.querySelector('[data-host-photo]');
      const initials = avatar.querySelector('[data-host-initials]');
      const isAdriana = cityKey === 'barcelona';
      photo.hidden = !isAdriana;
      initials.hidden = isAdriana;
      initials.textContent = city.host.slice(0,2).toUpperCase();
      avatar.setAttribute('aria-label', `${city.host}, the resident host`);
    });
    document.querySelector('.host-section h2').textContent = `Meet ${city.host}`;
    document.querySelector('.host-section > div > p').textContent = 'Fairbnb host since 2019 · Identity checked';
    document.getElementById('message-host').textContent = `Message ${city.host}`;
    document.getElementById('project-name').textContent = city.project;
    document.getElementById('project-purpose').textContent = city.purpose;
    document.getElementById('location-copy').textContent = `${city.area}, ${city.label}. The exact address is shared after booking.`;
    document.querySelector('.map-label').textContent = city.area;
    document.getElementById('nightly-price').textContent = `€${city.price}`;
    document.querySelector('.booking-card header > span').innerHTML = `<i class="fa-solid fa-star" aria-hidden="true"></i>${city.rating} · ${city.reviews} reviews`;
    document.getElementById('all-experiences-link').href = `../explore/?city=${cityKey}&view=experiences`;
    document.getElementById('experience-grid').innerHTML = city.experiences.map((name,index) => {
      const experienceParams = new URLSearchParams({ city: cityKey, stay: params.get('listing') || 'stay-0', experience: `experience-${index}`, checkin: checkin.value, checkout: checkout.value, guests: guests.value });
      const experienceUrl = `../experience/?${experienceParams}`;
      return `<article class="experience-card"><a class="experience-image-link" data-experience-link="${index}" href="${experienceUrl}" aria-label="View ${name}"><img src="${experienceImages[index]}" alt="${name}"></a><div><p>${city.label} · ${2 + index * .5} hours</p><h3><a data-experience-link="${index}" href="${experienceUrl}">${name}</a></h3><footer><span>From €${48 + index * 11} per person</span><button type="button" data-add-experience>Add</button></footer></div></article>`;
    }).join('');
  }

  function bookingValues() {
    const start = new Date(checkin.value);
    const end = new Date(checkout.value);
    const nights = Math.max(1, Math.round((end - start) / 86400000) || 1);
    const subtotal = city.price * nights;
    const fee = subtotal * .15;
    const contribution = fee / 2;
    return { nights, subtotal, fee, contribution, total: subtotal + 35 + fee };
  }

  function checkAvailability() {
    const start = new Date(`${checkin.value}T12:00:00`);
    const end = new Date(`${checkout.value}T12:00:00`);
    if (!checkin.value || !checkout.value || end <= start) return { available:false, message:'Check-out must be after check-in.' };
    const blockedStart = new Date('2026-10-24T00:00:00');
    const blockedEnd = new Date('2026-10-28T00:00:00');
    if (cityKey === 'barcelona' && start < blockedEnd && end > blockedStart) return { available:false, message:'This home is unavailable for part of those dates.' };
    const values = bookingValues();
    return { available:true, message:`Available for ${values.nights} night${values.nights === 1 ? '' : 's'} · ${guests.value} guest${guests.value === '1' ? '' : 's'}` };
  }

  function updateBooking() {
    const values = bookingValues();
    const availability = checkAvailability();
    document.getElementById('night-line').textContent = `€${city.price} × ${values.nights} night${values.nights === 1 ? '' : 's'}`;
    document.getElementById('stay-subtotal').textContent = `€${values.subtotal.toFixed(0)}`;
    document.getElementById('platform-fee').textContent = `€${values.fee.toFixed(0)}`;
    document.getElementById('booking-total').textContent = `€${values.total.toFixed(0)}`;
    document.getElementById('project-contribution').textContent = `€${values.contribution.toFixed(2)}`;
    document.getElementById('contribution-note-value').textContent = `€${values.contribution.toFixed(2)} supports ${city.project}`;
    const status = document.getElementById('availability-status');
    status.classList.toggle('available', availability.available);
    status.classList.toggle('unavailable', !availability.available);
    status.innerHTML = `<i class="fa-solid fa-${availability.available ? 'circle-check' : 'calendar-xmark'}" aria-hidden="true"></i><span>${availability.message}</span>`;
    const reserveButton = document.getElementById('reserve-button');
    reserveButton.disabled = !availability.available;
    reserveButton.textContent = availability.available ? 'Request to book' : 'Unavailable for these dates';
    document.querySelectorAll('[data-experience-link]').forEach(link => {
      const experienceParams = new URLSearchParams({ city: cityKey, stay: params.get('listing') || 'stay-0', experience: `experience-${link.dataset.experienceLink}`, checkin: checkin.value, checkout: checkout.value, guests: guests.value });
      link.href = `../experience/?${experienceParams}`;
    });
  }

  function showPhoto(index) {
    activePhoto = (index + gallery.length) % gallery.length;
    document.getElementById('dialog-photo').src = gallery[activePhoto];
    document.getElementById('dialog-photo').alt = `Property photo ${activePhoto + 1}`;
    document.getElementById('photo-count').textContent = `${activePhoto + 1} of ${gallery.length}`;
    if (!galleryDialog.open) galleryDialog.showModal();
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 2500);
  }

  document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => showPhoto(Number(button.dataset.gallery))));
  document.querySelector('.gallery-arrow.previous').addEventListener('click', () => showPhoto(activePhoto - 1));
  document.querySelector('.gallery-arrow.next').addEventListener('click', () => showPhoto(activePhoto + 1));
  galleryDialog.querySelector('.dialog-close').addEventListener('click', () => galleryDialog.close());
  galleryDialog.addEventListener('click', event => { if (event.target === galleryDialog) galleryDialog.close(); });
  document.getElementById('amenities-button').addEventListener('click', () => document.getElementById('amenities-dialog').showModal());
  document.querySelector('.amenities-dialog .dialog-close').addEventListener('click', () => document.getElementById('amenities-dialog').close());
  [checkin, checkout, guests].forEach(control => control.addEventListener('change', updateBooking));
  document.getElementById('booking-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!checkAvailability().available) return;
    const checkoutParams = new URLSearchParams({ city: cityKey, stay: params.get('listing') || 'stay-0', checkin: checkin.value, checkout: checkout.value, guests: guests.value });
    const reserveButton = document.getElementById('reserve-button');
    reserveButton.disabled = true;
    reserveButton.setAttribute('aria-busy', 'true');
    reserveButton.textContent = 'Opening checkout';
    requestAnimationFrame(() => {
      window.location.href = `../checkout/?${checkoutParams}`;
    });
  });
  document.getElementById('save-button').addEventListener('click', event => { const saved = event.currentTarget.getAttribute('aria-pressed') !== 'true'; event.currentTarget.setAttribute('aria-pressed', String(saved)); event.currentTarget.innerHTML = `<i class="fa-${saved ? 'solid' : 'regular'} fa-heart" aria-hidden="true"></i>${saved ? 'Saved' : 'Save'}`; });
  document.getElementById('share-button').addEventListener('click', async () => { try { await navigator.clipboard.writeText(window.location.href); showToast('Link copied.'); } catch (error) { showToast('This stay is ready to share.'); } });
  document.getElementById('message-host').addEventListener('click', () => showToast(`${city.host} usually replies within a day.`));
  document.getElementById('experience-grid').addEventListener('click', event => { const button=event.target.closest('[data-add-experience]'); if(!button)return; const added=!button.classList.contains('added'); button.classList.toggle('added',added); button.textContent=added?'Added':'Add'; showToast(added?'Experience added to this trip.':'Experience removed from this trip.'); });
  document.getElementById('menu-button').addEventListener('click', event => { const nav=document.getElementById('mobile-nav'); const open=nav.hidden; nav.hidden=!open; event.currentTarget.setAttribute('aria-expanded',String(open)); event.currentTarget.setAttribute('aria-label',open?'Close menu':'Open menu'); event.currentTarget.innerHTML=`<i class="fa-solid fa-${open?'xmark':'bars'}" aria-hidden="true"></i>`; });

  fillCityContent();
  updateBooking();
});
