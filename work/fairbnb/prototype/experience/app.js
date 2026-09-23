document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const profiles = {
    'marta-ceramics': {
      city: 'barcelona', cityLabel: 'Barcelona', area: 'Gràcia, Barcelona', category: 'Pottery', title: 'Shape a piece of Gràcia with Marta', description: "Spend an unhurried afternoon learning the foundations of hand-built ceramics in Marta's working neighbourhood studio.", host: 'Marta', hostLine: 'Marta, ceramic artist and Gràcia resident', image: '../assets/marta-ceramic-host.jpg', imageAlt: 'Marta in her pottery studio', caption: "Marta's studio in Gràcia", duration: '2 hours', durationNote: 'Time to make without rushing', capacity: 'Up to 5 people', capacityNote: 'A small working table', languages: 'English, Spanish, Catalan', languageNote: 'Choose what feels easiest', access: 'Step-free studio', accessNote: 'Accessible entrance and bathroom', aboutTitle: 'Make something that carries the place home.', about: ["Marta opens the studio she shares with three other makers. You will begin with local clay, learn how to shape and join it by hand, then finish one small piece with slips prepared in the studio.", 'No previous experience is needed. Marta keeps the group small enough to help each person properly. Your finished piece is fired after the session and can be collected or posted to you.'], steps: [['Meet over coffee', 'Get to know the studio, the neighbourhood and what you would like to make.'], ['Learn the clay', 'Prepare your material and practise the three hand-building techniques Marta uses most.'], ['Shape your piece', 'Make, refine and decorate one object with direct guidance when you need it.'], ['Leave it for firing', 'Marta finishes the firing and arranges collection or delivery after the workshop.']], included: [['fa-mug-hot', 'Coffee, tea and water'], ['fa-hand', 'Clay and studio tools'], ['fa-fire-flame-simple', 'Glazing and firing'], ['fa-box', 'Local collection or paid postage']], hostMeta: 'Experience host since 2020 · Identity checked', hostBio: 'I started working with clay after moving into Gràcia. The studio is where I learned from other makers, and now I enjoy giving visitors enough time to understand the material rather than racing towards a perfect object.', project: 'Gràcia Community Space', projectPurpose: 'Shared activities and practical support shaped with local residents.', impactTitle: 'This afternoon also supports Gràcia.', meeting: 'A working studio near Plaça de la Virreina in Gràcia. The exact door and arrival notes are shared after booking.', transit: '7 minutes from Fontana metro', meetingLabel: 'Plaça de la Virreina', price: 48, rating: '4.88', reviews: 21
    },
    'lucia-cooking': {
      city: 'bologna', cityLabel: 'Bologna', area: 'Santo Stefano, Bologna', category: 'Cooking', title: 'Make fresh pasta around the family table', description: "Shop for a few ingredients, learn Lucia's family pasta method and share the meal around her neighbourhood table.", host: 'Lucia', hostLine: 'Lucia, home cook and Bologna resident', image: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1500&q=88', imageAlt: 'Lucia preparing food in her kitchen', caption: "Lucia's kitchen in Santo Stefano", duration: '3 hours', durationNote: 'Market, cooking and lunch', capacity: 'Up to 6 people', capacityNote: 'One shared kitchen table', languages: 'English, Italian', languageNote: 'Recipes are easy to follow', access: 'Second-floor home', accessNote: 'Lift available in the building', aboutTitle: 'Cook the Bologna Lucia knows.', about: ['Lucia begins with the ingredients she buys each week, then shows you how flour and eggs become a smooth pasta dough by hand.', 'This is a shared meal rather than a formal class. You will shape tagliatelle, help finish the sauce and sit down together when everything is ready.'], steps: [['Meet at the market', 'Choose a few seasonal ingredients and hear how Lucia shops for her family.'], ['Make the dough', 'Mix, knead and rest the pasta dough at the kitchen table.'], ['Shape the pasta', 'Roll and cut fresh tagliatelle with guidance from Lucia.'], ['Share lunch', 'Finish the sauce, set the table and enjoy what you made together.']], included: [['fa-basket-shopping', 'Market ingredients'], ['fa-utensils', 'Pasta tools and apron'], ['fa-wine-glass', 'Lunch and local drink'], ['fa-file-lines', 'Lucia’s written recipe']], hostMeta: 'Experience host since 2019 · Identity checked', hostBio: 'I learned these recipes from my mother and grandmother. I enjoy showing visitors the everyday Bologna behind the restaurant menus, with enough time to cook properly and talk.', project: 'Bologna Solidarity Kitchen', projectPurpose: 'Fresh meals and shared tables for neighbours who need them.', impactTitle: 'This table also supports Bologna.', meeting: 'Meet Lucia near the Santo Stefano market. The exact meeting point and her home address are shared after booking.', transit: '8 minutes from Piazza Maggiore', meetingLabel: 'Santo Stefano', price: 68, rating: '4.92', reviews: 38
    },
    'cannaregio-bookbinding': {
      city: 'venice', cityLabel: 'Venice', area: 'Cannaregio, Venice', category: 'Bookbinding', title: 'Bind a travel journal in Cannaregio', description: "Learn the quiet craft of folding, stitching and finishing a journal in Giulia's working Cannaregio atelier.", host: 'Giulia', hostLine: 'Giulia, bookbinder and Cannaregio resident', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1500&q=88', imageAlt: 'Handmade books on a bookbinder work table', caption: "Giulia's atelier in Cannaregio", duration: '2.5 hours', durationNote: 'From folded paper to finished book', capacity: 'Up to 4 people', capacityNote: 'A small atelier table', languages: 'English, Italian', languageNote: 'Demonstration is hands-on', access: 'One entrance step', accessNote: 'Portable ramp available', aboutTitle: 'Make a book slowly, by hand.', about: ['Giulia introduces the papers, thread and tools used in her small atelier, then helps you build a journal from the first fold to the final cover.', 'You will leave with a useful object made in Venice and a clearer view of the working crafts that still belong to the city.'], steps: [['Choose your materials', 'Pair the paper, thread and cover cloth for your journal.'], ['Fold and prepare', 'Create the signatures and mark a clean sewing pattern.'], ['Stitch the binding', 'Learn a strong exposed stitch with Giulia beside you.'], ['Finish the cover', 'Trim, press and personalise the book before taking it home.']], included: [['fa-book-open', 'Paper and cover materials'], ['fa-scissors', 'Atelier tools'], ['fa-mug-hot', 'Coffee or tea'], ['fa-box', 'Protective travel sleeve']], hostMeta: 'Experience host since 2018 · Identity checked', hostBio: 'I trained in paper conservation before opening this atelier. Teaching small groups helps keep the craft visible and lets visitors understand Venice as a working city.', project: 'Living Venice Fund', projectPurpose: 'Resident-led work that protects everyday neighbourhood life.', impactTitle: 'This workshop also supports living Venice.', meeting: 'A bookbinding atelier on a quiet Cannaregio fondamenta. The exact door is shared after booking.', transit: '10 minutes from Venezia Santa Lucia', meetingLabel: 'Cannaregio', price: 62, rating: '4.94', reviews: 29
    },
    'local-ceramics': {
      city: 'valencia', cityLabel: 'Valencia', area: 'El Cabanyal, Valencia', category: 'Ceramics', title: 'Handmade ceramics with a local studio', description: "Work with Valencian clay and surface patterns in Carmen's light-filled neighbourhood ceramics studio.", host: 'Carmen', hostLine: 'Carmen, ceramic artist and El Cabanyal resident', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1500&q=88', imageAlt: 'Hands shaping clay in a ceramics studio', caption: "Carmen's studio in El Cabanyal", duration: '3 hours', durationNote: 'Shape, decorate and finish', capacity: 'Up to 5 people', capacityNote: 'One shared work table', languages: 'English, Spanish', languageNote: 'Visual guidance throughout', access: 'Step-free studio', accessNote: 'Accessible entrance and bathroom', aboutTitle: 'See Valencia through clay and pattern.', about: ['Carmen shares the ceramic forms and colours she sees across Valencia, then helps you turn those references into a small hand-built piece.', 'The group stays small, so there is time to understand the material and finish something personal without rushing the process.'], steps: [['Look around the studio', 'Choose a local shape, tile or colour as the starting point for your piece.'], ['Prepare the clay', 'Learn how to wedge and shape the material by hand.'], ['Build and decorate', 'Form one object and apply slips using Carmen’s studio patterns.'], ['Arrange the firing', 'Leave the piece for firing and choose collection or delivery.']], included: [['fa-hand', 'Clay and studio tools'], ['fa-palette', 'Slips and colour materials'], ['fa-mug-hot', 'Tea and water'], ['fa-fire-flame-simple', 'Glazing and firing']], hostMeta: 'Experience host since 2021 · Identity checked', hostBio: 'I grew up around the ceramic surfaces of Valencia. My studio brings those references into everyday objects, and I like helping visitors notice the craft without copying a souvenir.', project: 'Orriols Convive', projectPurpose: 'Activities that build trust and connection across the neighbourhood.', impactTitle: 'This studio time also supports Valencia.', meeting: 'A working ceramics studio near the market in El Cabanyal. The exact door is shared after booking.', transit: '6 minutes from Cabanyal station', meetingLabel: 'El Cabanyal', price: 52, rating: '4.90', reviews: 24
    }
  };
  const cityDefaultProfiles = { barcelona: 'marta-ceramics', bologna: 'lucia-cooking', venice: 'cannaregio-bookbinding', valencia: 'local-ceramics' };
  const requestedProfile = params.get('experience');
  const profile = profiles[requestedProfile] || profiles[cityDefaultProfiles[params.get('city')]] || profiles['marta-ceramics'];
  const date = document.getElementById('experience-date');
  const guests = document.getElementById('experience-guests');
  const form = document.getElementById('experience-form');
  const availability = document.getElementById('availability');
  const bookingButton = document.getElementById('booking-button');
  let toastTimer;

  function applyProfile() {
    document.title = `${profile.title} | Fairbnb.coop`;
    const breadcrumbLinks = document.querySelectorAll('.breadcrumbs a');
    breadcrumbLinks[1].textContent = `${profile.cityLabel} experiences`;
    breadcrumbLinks[1].href = `../explore/?city=${profile.city}&view=experiences`;
    document.querySelector('.breadcrumbs span').textContent = profile.category;
    document.querySelector('.experience-hero h1').textContent = profile.title;
    const ratingParts = document.querySelectorAll('.rating-line span');
    document.querySelector('.rating-line strong').textContent = profile.rating;
    ratingParts[0].textContent = `${profile.reviews} reviews`;
    ratingParts[1].textContent = profile.area;
    document.querySelector('.hero-description').textContent = profile.description;
    document.querySelector('.host-line img').src = profile.image;
    document.querySelector('.host-line img').alt = profile.imageAlt;
    document.querySelector('.host-line strong').textContent = profile.hostLine;
    document.querySelector('.hero-image img').src = profile.image;
    document.querySelector('.hero-image img').alt = profile.imageAlt;
    document.querySelector('.hero-image figcaption').textContent = profile.caption;
    const facts = document.querySelectorAll('.facts-grid article');
    [[profile.duration, profile.durationNote], [profile.capacity, profile.capacityNote], [profile.languages, profile.languageNote], [profile.access, profile.accessNote]].forEach((content, index) => {
      facts[index].querySelector('strong').textContent = content[0];
      facts[index].querySelector('span').textContent = content[1];
    });
    document.querySelector('.about-section h2').textContent = profile.aboutTitle;
    document.querySelectorAll('.about-section p').forEach((paragraph, index) => { paragraph.textContent = profile.about[index]; });
    document.querySelectorAll('.plan-section li').forEach((step, index) => {
      step.querySelector('h3').textContent = profile.steps[index][0];
      step.querySelector('p').textContent = profile.steps[index][1];
    });
    document.querySelector('.included-section > div').innerHTML = profile.included.map(item => `<span><i class="fa-solid ${item[0]}" aria-hidden="true"></i>${item[1]}</span>`).join('');
    const hostSection = document.querySelector('.host-section');
    hostSection.querySelector('img').src = profile.image;
    hostSection.querySelector('img').alt = profile.imageAlt;
    hostSection.querySelector('h2').textContent = `Meet ${profile.host}`;
    const hostParagraphs = hostSection.querySelectorAll('p');
    hostParagraphs[0].textContent = profile.hostMeta;
    hostParagraphs[1].textContent = profile.hostBio;
    document.getElementById('message-host').textContent = `Message ${profile.host}`;
    document.querySelector('.impact-copy h2').textContent = profile.impactTitle;
    document.querySelector('.impact-evidence h3').textContent = profile.project;
    document.querySelector('.impact-evidence h3 + p').textContent = profile.projectPurpose;
    const meeting = document.querySelector('.meeting-section');
    meeting.querySelector('div > p').textContent = profile.meeting;
    meeting.querySelector('div > p + p').innerHTML = `<i class="fa-solid fa-train-subway" aria-hidden="true"></i>${profile.transit}`;
    meeting.querySelector('.place-label').textContent = profile.meetingLabel;
    const bookingHeader = document.querySelector('.booking-card > header');
    bookingHeader.querySelector('p strong').textContent = `€${profile.price}`;
    bookingHeader.querySelector('span').innerHTML = `<i class="fa-solid fa-star" aria-hidden="true"></i>${profile.rating} · ${profile.reviews} reviews`;
  }

  applyProfile();

  if (params.get('experienceDate')) date.value = params.get('experienceDate');
  else if (params.get('date')) date.value = params.get('date');
  else if (params.get('checkin')) date.value = params.get('checkin');
  if (params.get('guests') && ['1', '2', '3', '4', '5'].includes(params.get('guests'))) guests.value = params.get('guests');

  function selectedTime() {
    return form.querySelector('input[name="time"]:checked').value;
  }

  function availabilityState() {
    if (!date.value) return { available: false, message: 'Choose a date to see available sessions.' };
    const chosen = new Date(`${date.value}T12:00:00`);
    const weekday = chosen.getDay();
    const time = selectedTime();
    if (weekday === 1) return { available: false, message: 'This experience is not available on Mondays.' };
    if (time === '18:00' && (weekday === 0 || weekday === 6)) return { available: false, message: 'The evening session is unavailable on weekends.' };
    const remaining = time === '10:00' ? 5 : time === '15:00' ? 3 : 2;
    if (Number(guests.value) > remaining) return { available: false, message: `Only ${remaining} place${remaining === 1 ? '' : 's'} remain at ${time}.` };
    return { available: true, message: `${remaining} places available at ${time}` };
  }

  function updateBooking() {
    const count = Number(guests.value);
    const subtotal = profile.price * count;
    const fee = subtotal * 0.15;
    const impact = fee / 2;
    const state = availabilityState();
    document.getElementById('guest-price-line').textContent = `€${profile.price} × ${count} guest${count === 1 ? '' : 's'}`;
    document.getElementById('experience-subtotal').textContent = `€${subtotal.toFixed(0)}`;
    document.getElementById('experience-fee').textContent = `€${fee.toFixed(2)}`;
    document.getElementById('experience-total').textContent = `€${(subtotal + fee).toFixed(2)}`;
    document.getElementById('impact-value').textContent = `€${impact.toFixed(2)}`;
    document.getElementById('booking-impact').textContent = `€${impact.toFixed(2)} supports ${profile.project}`;
    availability.classList.toggle('available', state.available);
    availability.classList.toggle('unavailable', !state.available);
    availability.innerHTML = `<i class="fa-solid fa-${state.available ? 'circle-check' : 'calendar-xmark'}" aria-hidden="true"></i><span>${state.message}</span>`;
    bookingButton.disabled = !state.available;
    bookingButton.textContent = state.available ? 'Add to your trip' : 'Choose another session';
    const checkoutDate = new Date(`${date.value}T12:00:00`);
    checkoutDate.setDate(checkoutDate.getDate() + 3);
    const checkoutValue = Number.isNaN(checkoutDate.getTime()) ? '' : checkoutDate.toISOString().slice(0, 10);
    const stayParams = new URLSearchParams({ city: profile.city, view: 'stays', experience: requestedProfile || cityDefaultProfiles[profile.city], experienceDate: date.value, time: selectedTime(), checkin: date.value, checkout: checkoutValue, guests: guests.value });
    document.getElementById('stay-prompt-link').href = `../explore/?${stayParams}`;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2400);
  }

  [date, guests, ...form.querySelectorAll('input[name="time"]')].forEach(control => control.addEventListener('change', updateBooking));

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!availabilityState().available) return;
    const checkoutParams = new URLSearchParams({ city: profile.city, experience: requestedProfile || cityDefaultProfiles[profile.city], experienceDate: date.value, time: selectedTime(), guests: guests.value });
    if (params.get('stay')) checkoutParams.set('stay', params.get('stay'));
    if (params.get('checkin')) checkoutParams.set('checkin', params.get('checkin'));
    if (params.get('checkout')) checkoutParams.set('checkout', params.get('checkout'));
    bookingButton.disabled = true;
    bookingButton.setAttribute('aria-busy', 'true');
    bookingButton.textContent = 'Opening your trip';
    requestAnimationFrame(() => {
      window.location.href = `../checkout/?${checkoutParams}`;
    });
  });

  document.getElementById('save-button').addEventListener('click', event => {
    const saved = event.currentTarget.getAttribute('aria-pressed') !== 'true';
    event.currentTarget.setAttribute('aria-pressed', String(saved));
    event.currentTarget.innerHTML = `<i class="fa-${saved ? 'solid' : 'regular'} fa-heart" aria-hidden="true"></i>${saved ? 'Saved' : 'Save'}`;
  });

  document.getElementById('share-button').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied.');
    } catch (error) {
      showToast('This experience is ready to share.');
    }
  });

  document.getElementById('message-host').addEventListener('click', () => showToast(`${profile.host} usually replies within a day.`));

  document.getElementById('menu-button').addEventListener('click', event => {
    const nav = document.getElementById('mobile-nav');
    const open = nav.hidden;
    nav.hidden = !open;
    event.currentTarget.setAttribute('aria-expanded', String(open));
    event.currentTarget.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    event.currentTarget.innerHTML = `<i class="fa-solid fa-${open ? 'xmark' : 'bars'}" aria-hidden="true"></i>`;
  });

  updateBooking();
});
