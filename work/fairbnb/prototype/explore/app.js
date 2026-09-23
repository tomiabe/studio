document.addEventListener('DOMContentLoaded', () => {
  const cityData = {
    barcelona: { label: 'Barcelona, Spain', short: 'Barcelona', country: 'Spain', description: 'Stay in neighbourhood homes, spend time with local makers and see what your visit supports before you book.', stays: 21, experiences: 17, areas: ['Gràcia', 'Poblenou', 'Sant Antoni'], experienceNames: ['Shape a piece of Gràcia with Marta', 'Cook a Catalan table with Júlia', 'Walk the cooperative city with Marc'], project: 'Gràcia Community Space', purpose: 'Shared activities and practical support shaped with local residents.', projectCopy: 'neighbourhood connection through the selected Barcelona project', hero: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1500&q=88', alt: 'Barcelona viewed across the city' },
    bologna: { label: 'Bologna, Italy', short: 'Bologna', country: 'Italy', description: 'Find portico homes, cook with neighbourhood hosts and support practical food access in the city.', stays: 24, experiences: 15, areas: ['Santo Stefano', 'Saragozza', 'Bolognina'], experienceNames: ['Make fresh pasta around the family table', 'Shop the Quadrilatero with Lucia', 'Discover Bologna by bicycle with Enrico'], project: 'Bologna Solidarity Kitchen', purpose: 'Fresh meals and shared tables for neighbours who need them.', projectCopy: 'neighbourhood food access through the selected Bologna project', hero: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1500&q=88', alt: 'Bologna seen across its historic rooftops' },
    venice: { label: 'Venice, Italy', short: 'Venice', country: 'Italy', description: 'Stay beyond the busiest routes, meet working artisans and help Venice remain a living city.', stays: 18, experiences: 12, areas: ['Cannaregio', 'Castello', 'Dorsoduro'], experienceNames: ['Bind a travel journal in Cannaregio', 'Row the quiet canals with a resident', 'Meet the makers of Castello'], project: 'Living Venice Fund', purpose: 'Resident-led work that protects everyday neighbourhood life.', projectCopy: 'resident-led work helping Venice remain a living city', hero: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1500&q=88', alt: 'A quiet canal running through Venice' },
    porto: { label: 'Porto, Portugal', short: 'Porto', country: 'Portugal', description: 'Choose family homes, spend a morning at the market and support food shared locally.', stays: 16, experiences: 10, areas: ['Cedofeita', 'Bonfim', 'Foz do Douro'], experienceNames: ['A morning in the neighbourhood market', 'Cook a northern Portuguese lunch', 'Walk Porto with a local architect'], project: 'REFOOD Foz do Douro', purpose: 'Rescuing good food and sharing meals within the neighbourhood.', projectCopy: 'local food rescue through the selected Porto project', hero: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1500&q=88', alt: 'Porto overlooking the Douro river' },
    florence: { label: 'Florence, Italy', short: 'Florence', country: 'Italy', description: 'Stay in Oltrarno, enter working studios and support new paths into traditional craft.', stays: 16, experiences: 9, areas: ['Oltrarno', 'Santa Croce', 'San Frediano'], experienceNames: ['Marble paper with an Oltrarno artisan', 'Draw Florence with a local illustrator', 'Visit family workshops across the Arno'], project: 'Oltrarno Apprentice Fund', purpose: 'Practical routes into traditional craft for young local people.', projectCopy: 'local craft apprenticeships through the selected Florence project', hero: 'https://images.unsplash.com/photo-1705184001001-d47f4a4884a3?auto=format&fit=crop&w=1500&q=88', alt: 'Florence and its historic centre' },
    rome: { label: 'Rome, Italy', short: 'Rome', country: 'Italy', description: 'Find a resident home, share the rhythm of local markets and support neighbourhood space.', stays: 27, experiences: 18, areas: ['Testaccio', 'Garbatella', 'San Lorenzo'], experienceNames: ['Testaccio market with a local cook', 'Walk modern Rome with an architect', 'Make a Roman lunch with neighbours'], project: 'Shared Courtyard Rome', purpose: 'Creating welcoming common space for neighbourhood residents.', projectCopy: 'shared neighbourhood space through the selected Rome project', hero: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1500&q=88', alt: 'The Colosseum and surrounding streets in Rome' },
    valencia: { label: 'Valencia, Spain', short: 'Valencia', country: 'Spain', description: 'Stay near everyday neighbourhood life, meet ceramic makers and support stronger local connections.', stays: 14, experiences: 8, areas: ['El Cabanyal', 'Ruzafa', 'Orriols'], experienceNames: ['Make ceramics in a neighbourhood studio', 'Cycle the old river with Ana', 'Cook paella with a family host'], project: 'Orriols Convive', purpose: 'Activities that build trust and connection across the neighbourhood.', projectCopy: 'neighbourhood connection through the selected Valencia project', hero: 'https://images.unsplash.com/photo-1599302592205-d7d683c83eea?auto=format&fit=crop&w=1500&q=88', alt: 'Valencia in warm evening light' },
    amsterdam: { label: 'Amsterdam, Netherlands', short: 'Amsterdam', country: 'Netherlands', description: 'Choose a locally responsible stay, meet residents and support shared green space across the IJ.', stays: 12, experiences: 11, areas: ['Amsterdam North', 'De Pijp', 'Oost'], experienceNames: ['Cycle the north with a resident guide', 'Cook Surinamese food with a local host', 'Photograph Amsterdam beyond the centre'], project: 'Amsterdam North Community Garden', purpose: 'Shared growing space and neighbourhood activities across the IJ.', projectCopy: 'shared green space through the selected Amsterdam project', hero: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1500&q=88', alt: 'Canal houses and bicycles in Amsterdam' }
  };

  const stayImages = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600566752229-250ed79470f8?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1100&q=88'
  ];
  const experienceImages = [
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1538384690625-e2e7bcf9e402?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1100&q=88',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1100&q=88'
  ];
  const stayDescriptors = [
    'Light-filled resident home', 'Quiet apartment near the square', 'Neighbourhood home with a terrace', 'Restored local flat',
    'Sunny resident apartment', 'Calm home near the market', 'Simple city base with a balcony', 'Family home with a reading room',
    'Courtyard apartment for slow mornings', 'Compact home beside the old streets', 'Airy flat with a shared garden', 'Resident loft near independent shops',
    'Two-bedroom home on a quiet lane', 'Bright apartment with a work corner', 'Top-floor home with city views', 'Ground-floor home with step-free access',
    'Character apartment near local cafés', 'Peaceful home with a sunny kitchen', 'Spacious resident flat for families', 'Thoughtful city home close to transit'
  ];
  const experienceDescriptors = [
    'Meet neighbourhood makers', 'Cook a local table', 'Walk with a resident architect', 'Shape clay in a working studio',
    'Explore the morning market', 'Learn a family recipe', 'Cycle beyond the centre', 'Visit independent workshops',
    'Photograph everyday street life', 'Taste the city with a food historian', 'Print a keepsake with a local artist', 'Join a neighbourhood garden morning',
    'Discover small galleries with a curator', 'Bake with a family-run kitchen', 'Sketch local architecture outdoors', 'Meet craftspeople behind the storefronts',
    'Share a seasonal lunch with residents', 'Follow the city through its music', 'Learn traditional techniques by hand', 'Walk a quieter route with a local guide'
  ];
  const params = new URLSearchParams(window.location.search);
  const normalize = value => String(value || '').toLowerCase().split(',')[0].trim().replace(/\s+/g, '-');
  let activeCity = cityData[normalize(params.get('city'))] ? normalize(params.get('city')) : 'barcelona';
  let selectedStay = null;
  let selectedExperience = null;
  let activeView = ['stays', 'experiences'].includes(params.get('view')) ? params.get('view') : 'all';
  let activeLayout = 'grid';
  let sortMode = 'recommended';
  const visibleCounts = { stays: 8, experiences: 8 };
  let toastTimer;

  const destinationInput = document.getElementById('destination-input');
  const checkin = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');
  const guestCount = document.getElementById('guest-count');
  const detailDialog = document.getElementById('detail-dialog');
  const filterSelections = new Set();
  const priceLimits = { stay: 220, experience: 120 };
  const savedItems = new Set();
  let filterScope = 'shared';
  const filterGroups = [
    { title: 'Booking preferences', scope: 'shared', choices: [['available', 'Available for my dates'], ['free-cancel', 'Free cancellation'], ['accessible', 'Step-free access'], ['instant', 'Instant confirmation']] },
    { title: 'Guest rating', scope: 'shared', group: 'rating', choices: [['rating-48', '4.8 and above'], ['rating-45', '4.5 and above']] },
    { title: 'Neighbourhood', scope: 'shared', group: 'area', choices: [] },
    { title: 'Type of stay', scope: 'stay', group: 'stay-type', choices: [['entire', 'Entire home'], ['private-room', 'Private room']] },
    { title: 'Bedrooms', scope: 'stay', group: 'bedrooms', choices: [['bedroom-1', '1 bedroom'], ['bedroom-2', '2 bedrooms'], ['bedroom-3', '3 or more bedrooms']] },
    { title: 'Home facilities', scope: 'stay', choices: [['kitchen', 'Kitchen'], ['workspace', 'Dedicated workspace'], ['air-conditioning', 'Air conditioning'], ['washer', 'Washing machine']] },
    { title: 'What you would like to do', scope: 'experience', group: 'category', choices: [['craft', 'Arts and crafts'], ['food', 'Food and cooking'], ['culture', 'Culture and neighbourhoods'], ['outdoors', 'Outdoors and cycling']] },
    { title: 'Duration', scope: 'experience', group: 'duration', choices: [['duration-short', 'Up to 2 hours'], ['duration-medium', 'Over 2 to 3 hours'], ['duration-long', 'More than 3 hours']] },
    { title: 'Time of day', scope: 'experience', group: 'time', choices: [['morning', 'Morning: before 12 pm'], ['afternoon', 'Afternoon: 12 to 5 pm'], ['evening', 'Evening: after 5 pm']] },
    { title: 'Group setting', scope: 'experience', group: 'group-size', choices: [['intimate', 'Up to 6 people'], ['larger-group', '7 to 10 people'], ['private-group', 'Private group available']] },
    { title: 'Hosted in', scope: 'experience', group: 'language', choices: [['english', 'English'], ['local-language', 'Local language'], ['french', 'French']] }
  ];
  const tripBuilder = document.getElementById('trip-builder');
  const tripLauncher = document.getElementById('trip-launcher');
  const tripScrim = document.getElementById('trip-scrim');

  if (params.get('checkin')) checkin.value = params.get('checkin');
  if (params.get('checkout')) checkout.value = params.get('checkout');
  if (params.get('guests') && [...guestCount.options].some(option => option.value === params.get('guests'))) guestCount.value = params.get('guests');

  function makeStayData(city) {
    return Array.from({ length: 20 }, (_, index) => {
      const area = city.areas[index % city.areas.length];
      const bedrooms = index === 12 ? 2 : 1 + (index % 3);
      const capacity = 2 + (index % 5);
      const price = 86 + ((index * 17) % 112);
      const rating = 4.72 + ((index * 3) % 25) / 100;
      return {
        id: `stay-${index}`, type: 'stay', place: `${area}, ${city.short}`, title: stayDescriptors[index],
        detail: `${bedrooms} bedroom${bedrooms === 1 ? '' : 's'} · ${capacity} guests · ${index % 4 === 1 ? 'Private room' : 'Entire home'}`, capacity, price, rating: rating.toFixed(2), reviews: 24 + index * 7, image: stayImages[index],
        tags: [
          `bedroom-${bedrooms}`, ...(rating >= 4.8 ? ['rating-48'] : []), 'rating-45',
          index % 4 === 1 ? 'private-room' : 'entire', 'community', 'resident-host', 'one-home', 'local-verified', `area-${normalize(area)}`,
          ...(index % 3 === 0 ? ['instant'] : []), ...(index % 4 === 0 || index === 15 ? ['accessible'] : []), ...(index % 2 === 0 ? ['free-cancel', 'workspace'] : []),
          ...(index % 3 !== 1 ? ['kitchen'] : []), ...(index % 3 === 1 ? ['air-conditioning'] : []), ...(index % 4 === 2 ? ['washer'] : []), ...(rating >= 4.8 ? ['high-rating'] : [])
        ]
      };
    });
  }

  function makeExperienceData(city) {
    return Array.from({ length: 20 }, (_, index) => {
      const area = city.areas[index % city.areas.length];
      const title = index < city.experienceNames.length ? city.experienceNames[index] : experienceDescriptors[index];
      const capacity = 5 + (index % 5);
      const price = 38 + ((index * 11) % 78);
      const rating = 4.78 + ((index * 4) % 20) / 100;
      const duration = 1.5 + (index % 5) * .5;
      const categories = ['craft', 'food', 'culture', 'craft', 'food', 'food', 'outdoors', 'craft', 'culture', 'food', 'craft', 'outdoors', 'culture', 'food', 'craft', 'craft', 'food', 'culture', 'craft', 'culture'];
      const time = ['morning', 'afternoon', 'evening'][index % 3];
      return {
        id: `experience-${index}`, type: 'experience', place: `${area}, ${city.short}`, title, detail: `${duration} hours · Up to ${capacity} people · ${time.charAt(0).toUpperCase() + time.slice(1)}`, capacity, price, rating: rating.toFixed(2), reviews: 18 + index * 6, image: experienceImages[index],
        tags: [categories[index], duration <= 2 ? 'duration-short' : duration <= 3 ? 'duration-medium' : 'duration-long', time, capacity <= 6 ? 'intimate' : 'larger-group', ...(index % 3 === 0 ? ['private-group'] : []), 'english', 'local-language', ...(index % 4 === 0 ? ['french'] : []), ...(rating >= 4.8 ? ['rating-48'] : []), 'rating-45', 'small-group', 'community', 'local-verified', `area-${normalize(area)}`, ...(index % 3 === 0 ? ['instant'] : []), ...(index % 5 === 0 ? ['accessible'] : []), ...(index % 2 === 1 ? ['free-cancel'] : []), ...(rating >= 4.8 ? ['high-rating'] : [])]
      };
    });
  }

  function tripContext() {
    const start = new Date(`${checkin.value}T12:00:00`);
    const end = new Date(`${checkout.value}T12:00:00`);
    const valid = Boolean(checkin.value && checkout.value && end > start);
    return { start, end, valid, nights: valid ? Math.round((end - start) / 86400000) : 0, guests: Number(guestCount.value) };
  }

  function itemAvailability(item) {
    const context = tripContext();
    if (!context.valid) return { available:false, label:'Choose valid dates' };
    if (context.guests > item.capacity) return { available:false, label:`${item.type === 'stay' ? 'Sleeps' : 'Group of'} up to ${item.capacity}` };
    const index = Number(item.id.split('-')[1]);
    const unavailable = item.type === 'stay' ? (context.start.getUTCDate() + index) % 5 === 0 : (context.start.getDay() + index * 2) % 7 === 1;
    return { available:!unavailable, label:unavailable ? 'Unavailable for these dates' : 'Available for your dates' };
  }

  function cardMarkup(item) {
    const context = tripContext();
    const availability = itemAvailability(item);
    const total = item.type === 'stay' ? item.price * context.nights : item.price * context.guests;
    const unitLabel = item.type === 'stay' ? 'per night' : 'per person';
    const totalText = context.valid
      ? item.type === 'stay'
        ? `€${total} total for ${context.nights} night${context.nights === 1 ? '' : 's'}`
        : `€${total} total for ${context.guests} guest${context.guests === 1 ? '' : 's'}`
      : 'Choose dates to see your total';
    const contribution = context.valid ? total * .075 : item.price * .075;
    const selected = item.id === (item.type === 'stay' ? selectedStay?.id : selectedExperience?.id);
    const buttonText = selected ? 'Added' : item.type === 'stay' ? 'Add stay' : 'Add experience';
    const availabilityLabel = availability.available ? 'Available' : availability.label === 'Choose valid dates' ? 'Check dates' : 'Unavailable';
    return `<article class="listing-card${availability.available ? '' : ' unavailable'}" data-card-id="${item.id}" data-type="${item.type}" data-price="${item.price}" data-tags="${item.tags.join(' ')}">
      <button class="listing-image" type="button" data-detail="${item.id}" aria-label="View ${item.title}"><img src="${item.image}" alt="${item.title}" loading="lazy"></button>
      <button class="favourite-button" type="button" aria-pressed="${savedItems.has(item.id)}" aria-label="Save ${item.title}"><i class="fa-${savedItems.has(item.id) ? 'solid' : 'regular'} fa-heart" aria-hidden="true"></i></button>
      <div class="listing-body"><div class="listing-topline"><p class="listing-meta"><i class="${item.type === 'stay' ? 'fa-solid fa-house' : 'fa-solid fa-compass'}" aria-hidden="true"></i>${item.place}</p><p class="card-availability ${availability.available ? 'available' : 'unavailable'}" aria-label="${availability.label}"><i class="fa-solid fa-${availability.available ? 'circle-check' : 'calendar-xmark'}" aria-hidden="true"></i>${availabilityLabel}</p></div><h3><button class="card-title-button" type="button" data-detail="${item.id}">${item.title}</button></h3><p class="listing-detail">${item.detail}</p><p class="card-impact"><i class="fa-solid fa-seedling" aria-hidden="true"></i>€${contribution.toFixed(2)} estimated community contribution</p><div class="card-footer"><span class="price"><span class="unit-price"><strong>€${item.price}</strong> ${unitLabel}</span><small class="trip-price">${totalText}</small></span><div class="card-action"><span class="rating"><i class="fa-solid fa-star" aria-hidden="true"></i>${item.rating} · ${item.reviews} reviews</span><button class="add-button${selected ? ' selected' : ''}" type="button" data-add="${item.id}"${availability.available ? '' : ' disabled'}>${buttonText}</button></div></div></div>
    </article>`;
  }

  function allItems() {
    const city = cityData[activeCity];
    return [...makeStayData(city), ...makeExperienceData(city)];
  }

  function matchesFilters(item) {
    if (item.price > priceLimits[item.type]) return false;
    return filterGroups.filter(group => group.scope === 'shared' || group.scope === item.type).every(group => {
      const selected = group.choices.filter(([key]) => filterSelections.has(key));
      if (!selected.length) return true;
      const matches = ([key]) => key === 'available' ? itemAvailability(item).available : item.tags.includes(key);
      return group.group ? selected.some(matches) : selected.every(matches);
    });
  }

  function renderCards() {
    const city = cityData[activeCity];
    const sortItems = items => [...items].sort((a, b) => {
      if (sortMode === 'price') return a.price - b.price;
      if (sortMode === 'price-high') return b.price - a.price;
      if (sortMode === 'rating') return Number(b.rating) - Number(a.rating);
      if (sortMode === 'newest') return Number(b.id.split('-')[1]) - Number(a.id.split('-')[1]);
      return Number(itemAvailability(b).available) - Number(itemAvailability(a).available) || Number(b.rating) - Number(a.rating);
    });
    let totalMatches = 0;
    ['stay', 'experience'].forEach(type => {
      const items = type === 'stay' ? makeStayData(city) : makeExperienceData(city);
      const matches = sortItems(items.filter(matchesFilters));
      const plural = type === 'stay' ? 'stays' : 'experiences';
      if (activeView === 'all' || activeView === plural) totalMatches += matches.length;
      document.getElementById(type + '-grid').innerHTML = matches.slice(0, visibleCounts[plural]).map(cardMarkup).join('');
      const loader = document.querySelector('[data-load-more="' + plural + '"]');
      loader.hidden = visibleCounts[plural] >= matches.length;
      loader.textContent = 'Show ' + Math.min(8, matches.length - visibleCounts[plural]) + ' more ' + plural;
      document.getElementById(type + '-empty').hidden = matches.length > 0;
      document.getElementById(type + '-results-title').textContent = type === 'stay'
        ? matches.length + ' ' + (matches.length === 1 ? 'place' : 'places') + ' to stay in ' + city.short
        : matches.length + ' local ' + (matches.length === 1 ? 'experience' : 'experiences') + ' in ' + city.short;
      const available = matches.filter(item => itemAvailability(item).available).length;
      document.getElementById(type + '-results-summary').textContent = !tripContext().valid
        ? 'Choose valid dates to see availability.'
        : type === 'stay'
          ? available + ' available for your dates. Resident homes, with room for local life.'
          : available + ' available for your group. Meet the people who know this city.';
    });
    document.getElementById('filter-apply').textContent = 'Show ' + totalMatches + ' results';
    document.getElementById('map-summary-title').textContent = totalMatches + ' matching results in ' + city.short;
    bindCards();
    updateFilterSummary();
    updateSearchContext();
  }

  function updateSearchContext() {
    const context = tripContext();
    const status = document.getElementById('search-context');
    status.classList.toggle('invalid', !context.valid);
    if (!context.valid) {
      status.innerHTML = '<strong>Check your dates</strong><span>Check-out must be after check-in.</span>';
      return;
    }
    const formatDate = value => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(new Date(value + 'T12:00:00'));
    status.innerHTML = '<div><i class="fa-solid fa-calendar-days" aria-hidden="true"></i><strong>' + formatDate(checkin.value) + ' to ' + formatDate(checkout.value) + '<span class="search-year"> ' + context.start.getFullYear() + '</span></strong></div><span class="search-nights"><i class="fa-solid fa-bed" aria-hidden="true"></i>' + context.nights + ' nights</span><div><i class="fa-solid fa-user-group" aria-hidden="true"></i><strong>' + context.guests + (context.guests === 1 ? ' guest' : ' guests') + '</strong></div><button type="button" id="edit-search" aria-label="Edit dates and guests">Edit</button>';
    document.getElementById('edit-search').addEventListener('click', () => {
      document.getElementById('compact-search').scrollIntoView({block: 'center'});
      checkin.focus({preventScroll: true});
    });
  }

  function renderFilterPanel() {
    const areaGroup = filterGroups.find(group => group.group === 'area');
    areaGroup.choices = cityData[activeCity].areas.map(area => ['area-' + normalize(area), area]);
    const language = {Spain:'Spanish', Italy:'Italian', Portugal:'Portuguese', Netherlands:'Dutch'}[cityData[activeCity].country];
    filterGroups.find(group => group.group === 'language').choices[1][1] = language;
    const scopes = activeView === 'all' ? ['shared', 'stay', 'experience'] : ['shared', activeView === 'stays' ? 'stay' : 'experience'];
    if (!scopes.includes(filterScope)) filterScope = scopes[0];
    const labels = {shared:'Shared', stay:'Stays', experience:'Experiences'};
    document.getElementById('filter-scope-note').textContent = activeView === 'all' ? 'Shared preferences apply to both.' : 'Preferences for ' + activeView + '.';
    let markup = '<div class="filter-scope" role="group" aria-label="Filter category">' + scopes.map(scope => '<button type="button" data-filter-scope="' + scope + '" aria-pressed="' + (filterScope === scope) + '">' + labels[scope] + '</button>').join('') + '</div>';
    scopes.forEach(scope => {
      markup += '<div data-scope-panel="' + scope + '"' + (filterScope === scope ? '' : ' hidden') + '>';
      if (scope !== 'shared') markup += '<section class="filter-section"><h3>' + (scope === 'stay' ? 'Nightly budget' : 'Budget per person') + '</h3><div class="budget-label"><span>Up to</span><strong id="price-output-' + scope + '">€' + priceLimits[scope] + '</strong></div><input class="price-slider" data-budget="' + scope + '" type="range" min="30" max="' + (scope === 'stay' ? 220 : 120) + '" step="10" value="' + priceLimits[scope] + '" aria-label="' + (scope === 'stay' ? 'Maximum nightly price' : 'Maximum experience price per person') + '"></section>';
      markup += filterGroups.filter(group => group.scope === scope).map(group => '<section class="filter-section"><h3>' + group.title + '</h3>' + group.choices.map(([key,label]) => '<button type="button" data-filter="' + key + '" aria-pressed="' + filterSelections.has(key) + '"><span>' + label + '</span><i class="fa-solid fa-check" aria-hidden="true"></i></button>').join('') + '</section>').join('');
      markup += '</div>';
    });
    document.getElementById('filter-sections').innerHTML = markup;
  }

  function updateFilterSummary() {
    const scopes = activeView === 'all' ? ['shared','stay','experience'] : ['shared', activeView === 'stays' ? 'stay' : 'experience'];
    const chips = [];
    filterGroups.filter(group => scopes.includes(group.scope)).forEach(group => group.choices.forEach(([key,label]) => {
      if (filterSelections.has(key)) chips.push({key,label:(activeView === 'all' && group.scope !== 'shared' ? (group.scope === 'stay' ? 'Stays: ' : 'Experiences: ') : '') + label});
    }));
    ['stay','experience'].forEach(type => {
      if (scopes.includes(type) && priceLimits[type] < (type === 'stay' ? 220 : 120)) chips.push({key:'budget-' + type,label:'Up to €' + priceLimits[type] + (type === 'stay' ? '/night' : '/person')});
    });
    const summary = document.getElementById('active-filters');
    summary.hidden = !chips.length;
    summary.innerHTML = chips.map(chip => '<button type="button" data-remove-filter="' + chip.key + '" aria-label="Remove filter: ' + chip.label + '">' + chip.label + '<i class="fa-solid fa-xmark" aria-hidden="true"></i></button>').join('');
    document.getElementById('clear-filters').hidden = !chips.length;
    document.getElementById('filter-count').textContent = String(chips.length);
    document.getElementById('filter-count').hidden = !chips.length;
  }

  function updateDestination() {
    const city = cityData[activeCity];
    destinationInput.value = city.label;
    document.title = `Explore ${city.short} | Fairbnb.coop`;
    document.getElementById('project-description').textContent = `Half of Fairbnb's platform fee can support ${city.projectCopy}.`;
    document.getElementById('project-name').textContent = city.project;
    document.getElementById('project-purpose').textContent = city.purpose;
    document.querySelector('.trip-builder header p').textContent = `Your ${city.short} trip`;
    document.getElementById('map-summary-title').textContent = `40 places across ${city.short}`;
    document.querySelector('.map-canvas').setAttribute('aria-label', `Interactive prototype map showing stays and experiences around ${city.short}`);
    document.getElementById('builder-project').textContent = `For ${city.project}`;
    renderFilterPanel();
    selectedStay = null;
    selectedExperience = null;
    visibleCounts.stays = 8;
    visibleCounts.experiences = 8;
    renderCards();
    updateBuilder();
  }

  function bindCards() {
    document.querySelectorAll('.favourite-button').forEach(button => button.addEventListener('click', () => {
      const saved = button.getAttribute('aria-pressed') === 'true';
      const id = button.closest('[data-card-id]').dataset.cardId;
      saved ? savedItems.delete(id) : savedItems.add(id);
      button.setAttribute('aria-pressed', String(!saved));
      button.innerHTML = `<i class="fa-${saved ? 'regular' : 'solid'} fa-heart" aria-hidden="true"></i>`;
    }));
    document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => selectItem(button.dataset.add)));
    document.querySelectorAll('[data-detail]').forEach(button => button.addEventListener('click', () => showDetail(button.dataset.detail)));
  }

  function selectItem(id) {
    const item = allItems().find(entry => entry.id === id);
    if (!item || !itemAvailability(item).available) return;
    if (item.type === 'stay') selectedStay = selectedStay?.id === id ? null : item;
    else selectedExperience = selectedExperience?.id === id ? null : item;
    document.querySelectorAll(`[data-add^="${item.type}"]`).forEach(button => {
      const selected = button.dataset.add === (item.type === 'stay' ? selectedStay?.id : selectedExperience?.id);
      button.classList.toggle('selected', selected);
      button.textContent = selected ? 'Added' : item.type === 'stay' ? 'Add stay' : 'Add experience';
    });
    updateBuilder();
  }

  function updateBuilder() {
    const context = tripContext();
    const nights = context.nights;
    const guests = context.guests;
    const stayTotal = selectedStay ? selectedStay.price * nights : 0;
    const experienceTotal = selectedExperience ? selectedExperience.price * guests : 0;
    const total = stayTotal + experienceTotal;
    const impact = total * .075;
    const stayStep = document.getElementById('trip-stay');
    const experienceStep = document.getElementById('trip-experience');
    stayStep.querySelector('strong').textContent = selectedStay ? selectedStay.title : 'Add a place to stay';
    stayStep.querySelector(':scope > div > span').textContent = selectedStay ? `${nights} nights · €${stayTotal}` : 'Choose from the results';
    experienceStep.querySelector('strong').textContent = selectedExperience ? selectedExperience.title : 'Add something local';
    experienceStep.querySelector(':scope > div > span').textContent = selectedExperience ? `${guests} guests · €${experienceTotal}` : 'Choose from the results';
    document.getElementById('builder-total').textContent = `€${total}`;
    document.getElementById('builder-impact').textContent = total ? `€${impact.toFixed(2)} for the project` : 'Calculated as you build';
    const itemCount = Number(Boolean(selectedStay)) + Number(Boolean(selectedExperience));
    document.getElementById('trip-count').textContent = String(itemCount);
    document.getElementById('trip-launcher-total').textContent = total ? `€${total}` : 'Build';
    document.getElementById('trip-continue').disabled = !selectedStay && !selectedExperience;
    document.getElementById('trip-helper').innerHTML = total
      ? '<i class="fa-solid fa-lock" aria-hidden="true"></i>Nothing is charged yet.'
      : '<i class="fa-solid fa-circle-info" aria-hidden="true"></i>Choose a stay or experience to continue.';
  }

  function showDetail(id) {
    const item = allItems().find(entry => entry.id === id);
    if (!item) return;
    if (item.type === 'stay') {
      const nextParams = new URLSearchParams({ city: activeCity, listing: id, checkin: checkin.value, checkout: checkout.value, guests: guestCount.value });
      window.location.href = `../stay/?${nextParams}`;
      return;
    }
    const nextParams = new URLSearchParams({ city: activeCity, experience: id, checkin: checkin.value, guests: guestCount.value });
    window.location.href = `../experience/?${nextParams}`;
  }

  function setView(view) {
    activeView = view;
    filterScope = view === 'all' ? 'shared' : view === 'stays' ? 'stay' : 'experience';
    document.querySelectorAll('[data-view]').forEach(button => {
      const selected = button.dataset.view === view;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    document.querySelectorAll('[data-section]').forEach(section => { section.hidden = view !== 'all' && section.dataset.section !== view; });
    document.getElementById('experience-results-title').setAttribute('aria-level', view === 'experiences' ? '1' : '2');
    document.getElementById('local-prompt').hidden = view !== 'all';
    document.getElementById('project-section').hidden = view !== 'all';
    const next = new URLSearchParams(window.location.search);
    next.set('view', view);
    window.history.replaceState({}, '', '?' + next);
    renderFilterPanel();
    renderCards();
  }

  function setLayout(layout) {
    activeLayout = layout;
    document.getElementById('mobile-view-select').value = layout;
    const layoutRoot = document.querySelector('.results-layout');
    layoutRoot.classList.toggle('list-mode', layout === 'list');
    layoutRoot.classList.toggle('map-mode', layout === 'map');
    document.querySelectorAll('[data-layout]').forEach(button => {
      const selected = button.dataset.layout === layout;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    document.getElementById('map-panel').hidden = layout !== 'map';
  }

  function applyFilters() {
    visibleCounts.stays = 8;
    visibleCounts.experiences = 8;
    renderCards();
  }

  function openTripBuilder() {
    tripBuilder.classList.add('open');
    tripBuilder.setAttribute('aria-hidden', 'false');
    tripLauncher.setAttribute('aria-expanded', 'true');
    tripScrim.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('trip-close').focus();
  }

  function closeTripBuilder() {
    tripBuilder.classList.remove('open');
    tripBuilder.setAttribute('aria-hidden', 'true');
    tripLauncher.setAttribute('aria-expanded', 'false');
    tripScrim.hidden = true;
    document.body.style.overflow = '';
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 2400);
  }

  document.getElementById('compact-search').addEventListener('submit', event => {
    event.preventDefault();
    const key = normalize(destinationInput.value);
    if (!cityData[key]) { showToast('Choose one of the Fairbnb destinations shown in the search list.'); destinationInput.focus(); return; }
    if (!tripContext().valid) { updateSearchContext(); showToast('Choose a check-out date after your check-in date.'); return; }
    activeCity = key;
    const nextParams = new URLSearchParams({ city: key, checkin: checkin.value, checkout: checkout.value, guests: guestCount.value, view: activeView });
    window.history.replaceState({}, '', `?${nextParams}`);
    updateDestination();
  });
  [checkin, checkout, guestCount].forEach(control => control.addEventListener('change', () => {
    selectedStay = null;
    selectedExperience = null;
    const next = new URLSearchParams(window.location.search);
    next.set('checkin', checkin.value);
    next.set('checkout', checkout.value);
    next.set('guests', guestCount.value);
    window.history.replaceState({}, '', '?' + next);
    renderCards();
    updateBuilder();
  }));
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
  document.querySelectorAll('[data-layout]').forEach(button => button.addEventListener('click', () => setLayout(button.dataset.layout)));
  document.getElementById('mobile-view-select').addEventListener('change', event => setLayout(event.target.value));
  document.querySelector('.result-tabs').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...document.querySelectorAll('[data-view]')];
    const index = tabs.indexOf(document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].click();
    tabs[next].focus();
  });
  document.querySelectorAll('[data-sort]').forEach(select => select.addEventListener('change', event => { sortMode = event.currentTarget.value; document.querySelectorAll('[data-sort]').forEach(control => { control.value = sortMode; }); renderCards(); }));
  document.querySelectorAll('[data-load-more]').forEach(button => button.addEventListener('click', () => {
    const type = button.dataset.loadMore;
    visibleCounts[type] = Math.min(20, visibleCounts[type] + 8);
    renderCards();
  }));
  document.getElementById('filter-sections').addEventListener('click', event => {
    const scopeButton = event.target.closest('[data-filter-scope]');
    if (scopeButton) { filterScope = scopeButton.dataset.filterScope; renderFilterPanel(); return; }
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    const key = button.dataset.filter;
    filterSelections.has(key) ? filterSelections.delete(key) : filterSelections.add(key);
    button.setAttribute('aria-pressed', String(filterSelections.has(key)));
    applyFilters();
  });
  document.getElementById('filter-sections').addEventListener('input', event => {
    const type = event.target.dataset.budget;
    if (!type) return;
    priceLimits[type] = Number(event.target.value);
    document.getElementById('price-output-' + type).textContent = '€' + priceLimits[type];
    applyFilters();
  });
  function clearFilters(type) {
    filterGroups.filter(group => !type || group.scope === 'shared' || group.scope === type).forEach(group => group.choices.forEach(([key]) => filterSelections.delete(key)));
    if (!type || type === 'stay') priceLimits.stay = 220;
    if (!type || type === 'experience') priceLimits.experience = 120;
    renderFilterPanel();
    applyFilters();
  }
  document.getElementById('clear-filters').addEventListener('click', () => clearFilters());
  document.querySelectorAll('[data-clear-type]').forEach(button => button.addEventListener('click', () => clearFilters(button.dataset.clearType)));
  document.getElementById('active-filters').addEventListener('click', event => {
    const button = event.target.closest('[data-remove-filter]');
    if (!button) return;
    const key = button.dataset.removeFilter;
    if (key.startsWith('budget-')) { const type = key.slice(7); priceLimits[type] = type === 'stay' ? 220 : 120; }
    else filterSelections.delete(key);
    renderFilterPanel();
    applyFilters();
  });
  document.querySelector('[data-show-experiences]').addEventListener('click', () => { setView('experiences'); document.getElementById('experience-results').scrollIntoView({ behavior: 'smooth' }); });
  document.querySelectorAll('[data-jump]').forEach(button => button.addEventListener('click', () => {
    closeTripBuilder();
    setView(button.dataset.jump);
    document.getElementById(`${button.dataset.jump === 'stays' ? 'stay' : 'experience'}-results`).scrollIntoView({ behavior: 'smooth' });
  }));
  const filterPanel = document.getElementById('filter-panel');
  const filterScrim = document.getElementById('filter-scrim');
  const filterToggle = document.getElementById('filter-toggle');
  const closeFilters = () => {
    filterPanel.classList.remove('open');
    filterScrim.hidden = true;
    filterToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    filterToggle.focus({preventScroll:true});
  };
  filterToggle.addEventListener('click', () => {
    filterPanel.classList.add('open');
    filterScrim.hidden = false;
    filterToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.getElementById('filter-close').focus({preventScroll:true});
  });
  document.getElementById('filter-close').addEventListener('click', closeFilters);
  document.getElementById('filter-apply').addEventListener('click', closeFilters);
  filterScrim.addEventListener('click', closeFilters);
  tripLauncher.addEventListener('click', openTripBuilder);
  document.getElementById('trip-close').addEventListener('click', closeTripBuilder);
  tripScrim.addEventListener('click', closeTripBuilder);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && tripBuilder.classList.contains('open')) closeTripBuilder();
    if (event.key === 'Escape' && filterPanel.classList.contains('open')) closeFilters();
    const panel = tripBuilder.classList.contains('open') ? tripBuilder : filterPanel.classList.contains('open') ? filterPanel : null;
    if (event.key === 'Tab' && panel) {
      const focusable = [...panel.querySelectorAll('button:not(:disabled), input, select, a[href]')].filter(el => el.getClientRects().length && !el.closest('[hidden]'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  document.querySelectorAll('.map-zoom button').forEach(button => button.addEventListener('click', () => showToast('Map scale updated.')));
  document.querySelectorAll('.map-price, .map-experience').forEach(button => button.addEventListener('click', () => showToast('The matching result is highlighted in the list.')));
  document.getElementById('dialog-add').addEventListener('click', event => { selectItem(event.currentTarget.dataset.dialogAdd); detailDialog.close(); });
  document.querySelector('.dialog-close').addEventListener('click', () => detailDialog.close());
  detailDialog.addEventListener('click', event => { if (event.target === detailDialog) detailDialog.close(); });
  document.getElementById('trip-continue').addEventListener('click', () => {
    const checkoutParams = new URLSearchParams({ city: activeCity, checkin: checkin.value, checkout: checkout.value, guests: guestCount.value });
    if (selectedStay) checkoutParams.set('stay', selectedStay.id);
    if (selectedExperience) {
      checkoutParams.set('experience', selectedExperience.id);
      checkoutParams.set('experienceDate', checkin.value);
      checkoutParams.set('time', '10:00');
    }
    window.location.href = `../checkout/?${checkoutParams}`;
  });
  document.getElementById('menu-button').addEventListener('click', event => {
    const nav = document.getElementById('mobile-nav');
    const open = nav.hidden;
    nav.hidden = !open;
    event.currentTarget.setAttribute('aria-expanded', String(open));
    event.currentTarget.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    event.currentTarget.innerHTML = `<i class="fa-solid fa-${open ? 'xmark' : 'bars'}" aria-hidden="true"></i>`;
  });

  updateDestination();
  if (params.get('stay')) selectedStay = makeStayData(cityData[activeCity]).find(item => item.id === params.get('stay')) || null;
  if (params.get('experience')) selectedExperience = makeExperienceData(cityData[activeCity]).find(item => item.id === params.get('experience')) || null;
  if (selectedStay || selectedExperience) {
    renderCards();
    updateBuilder();
  }
  setView(activeView);
  setLayout(activeLayout);
});
