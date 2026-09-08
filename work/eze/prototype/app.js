const images = {
  iphone11Pro: 'https://wallpapers.com/images/hd/iphone-11-pro-midnight-green-png-61-yl7dgfsyqq9vtp46.png',
  iphoneXr: 'https://www.pngall.com/wp-content/uploads/15/iPhone-Xr-Transparent.png',
  iphone12ProMax: 'https://thedevicedepot.com/cdn/shop/products/apple-iphone-12-pro-max-graphite.png?v=1712768063&width=1200',
  iphone11: 'https://pngimg.com/uploads/iphone_11/iphone_11_PNG20.png',
  galaxyS21: 'https://t-mobile.scene7.com/is/image/Tmusprod/fg-samsung_galaxy_s21-5G-phantom-gray-nologo-5%3A1-to-1-ratio?dpr=off&fmt=png-alpha&ts=1678466226752',
  ipadPro: 'assets/products/ipad-pro-12-9.png',
  ipadAir: 'https://www.pngkey.com/png/full/516-5167430_ipad-air-gold.png',
  macbookAir: 'https://www.mpstore.ro/media/photos/2022/04/20/123075-80049-13-1.png',
  appleWatchSeries6: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6139/6139702_sd.jpg',
  appleWatchSe: 'https://i5.walmartimages.com/seo/Apple-Watch-SE-GPS-40mm-Silver-Aluminum-Case-with-White-Sport-Band-Regular_0b7a1711-e07a-4a36-9e12-64b2861a1121.aeefe874266e2acfcb1c7af9fe685edf.jpeg',
  galaxyWatch4: 'https://cdn.mafrservices.com/sys-master-root/h2b/ha1/16780689113118/1825527_main.jpg',
  airpodsPro: 'assets/products/airpods-pro.png',
  applePencil: 'assets/products/apple-pencil.png',
  powercore: 'https://cdn.shopify.com/s/files/1/0595/4034/0926/products/A1263021.jpg?v=1654744958',
  airpods3: 'https://mdriveasia.com/cdn/shop/products/AirPods_3rd-Gen_Hero_Screen__USEN_1024x1024.png?v=1659006848'
};

const products = [
  { id: 1, name: 'iPhone 11 Pro', details: '64GB · Unlocked · Midnight Green', category: 'Mobile Devices', grade: 'A1', carrier: 'Unlocked', storage: '64GB', price: 480, quantity: 71, image: images.iphone11Pro },
  { id: 2, name: 'iPhone XR', details: '128GB · Unlocked · Black', category: 'Mobile Devices', grade: 'A2', carrier: 'Unlocked', storage: '128GB', price: 350, quantity: 92, image: images.iphoneXr },
  { id: 3, name: 'iPhone 12 Pro Max', details: '256GB · Unlocked · Graphite', category: 'Mobile Devices', grade: 'A1', carrier: 'Unlocked', storage: '256GB', price: 610, quantity: 34, image: images.iphone12ProMax },
  { id: 4, name: 'iPhone 11', details: '128GB · Verizon · Purple', category: 'Mobile Devices', grade: 'B1', carrier: 'Verizon', storage: '128GB', price: 295, quantity: 118, image: images.iphone11 },
  { id: 5, name: 'Samsung Galaxy S21', details: '128GB · Unlocked · Phantom Gray', category: 'Mobile Devices', grade: 'A2', carrier: 'Unlocked', storage: '128GB', price: 395, quantity: 64, image: images.galaxyS21 },
  { id: 6, name: 'iPad Pro 12.9 inch', details: '256GB · WiFi · Space Gray', category: 'Tablets', grade: 'A1', carrier: 'WiFi', storage: '256GB', price: 535, quantity: 24, image: images.ipadPro },
  { id: 7, name: 'iPad Air', details: '64GB · WiFi · Gold', category: 'Tablets', grade: 'B1', carrier: 'WiFi', storage: '64GB', price: 325, quantity: 41, image: images.ipadAir },
  { id: 8, name: 'MacBook Air', details: '256GB · M1 · Space Gray', category: 'Laptops', grade: 'A2', carrier: 'N/A', storage: '256GB', price: 590, quantity: 16, image: images.macbookAir },
  { id: 9, name: 'Apple Watch Series 6', details: '44mm · GPS · Space Gray', category: 'Smartwatches', grade: 'A1', carrier: 'N/A', storage: '32GB', price: 235, quantity: 43, image: images.appleWatchSeries6 },
  { id: 10, name: 'Apple Watch SE', details: '40mm · GPS · Silver', category: 'Smartwatches', grade: 'A2', carrier: 'N/A', storage: '32GB', price: 180, quantity: 57, image: images.appleWatchSe },
  { id: 11, name: 'Samsung Galaxy Watch 4', details: '40mm · GPS · Black', category: 'Smartwatches', grade: 'A2', carrier: 'Unlocked', storage: '16GB', price: 165, quantity: 72, image: images.galaxyWatch4 },
  { id: 12, name: 'AirPods Pro', details: '2nd Generation · White', category: 'Accessories', grade: 'A1', carrier: 'Bluetooth', storage: 'N/A', price: 155, quantity: 86, image: images.airpodsPro },
  { id: 13, name: 'Apple Pencil', details: '2nd Generation · White', category: 'Accessories', grade: 'A1', carrier: 'Bluetooth', storage: 'N/A', price: 64, quantity: 120, image: images.applePencil },
  { id: 14, name: 'Anker PowerCore 10000', details: '10000mAh · White', category: 'Accessories', grade: 'A1', carrier: 'N/A', storage: 'N/A', price: 42, quantity: 200, image: images.powercore },
  { id: 15, name: 'AirPods 3rd Generation', details: 'White · Lightning Case', category: 'Accessories', grade: 'A2', carrier: 'Bluetooth', storage: 'N/A', price: 120, quantity: 99, image: images.airpods3 }
];

const categories = [
  ['All Products', 'All'], ['Mobile Devices', 'Mobile Devices'], ['Tablets', 'Tablets'], ['Laptops', 'Laptops'], ['Smartwatches', 'Smartwatches'], ['Accessories', 'Accessories']
];
const state = {
  view: 'shop', viewMode: 'grid', category: 'All', grade: [], carrier: [], storage: [], price: [], query: '', sort: 'featured',
  cart: [], watchlist: [], selectedProduct: products[0], detailQuantity: 1, detailCondition: 'New',
  checkoutShipping: 'standard', checkoutPayment: 'card', completedOrder: null, savedCard: null, checkoutContext: null,
  checkoutDeliveryMode: 'single',
  checkoutAddresses: [{ id: 'address-1', contact: '', company: '', street: '', city: '', region: '', postalCode: '', country: 'United States' }],
  checkoutAllocations: { 'address-1': {} },
  accountTab: 'overview', accountExpandedOrder: null, accountAddressFormOpen: false,
  accountAddressDraft: { label: '', contact: '', company: '', street: '', city: '', region: '', postalCode: '', country: 'United States' },
  accountAddresses: [
    { id: 'saved-address-1', label: 'Main warehouse', contact: 'Receiving team', company: 'Buyer warehouse', street: '1200 Commerce Street', city: 'Dallas', region: 'Texas', postalCode: '75201', country: 'United States', isDefault: true },
    { id: 'saved-address-2', label: 'West coast warehouse', contact: 'Receiving team', company: 'Buyer warehouse', street: '400 Market Street', city: 'San Francisco', region: 'California', postalCode: '94105', country: 'United States', isDefault: false }
  ],
  orders: [
    { id: 'EZ-10432', date: 'Sep 4, 2026', status: 'In transit', total: 21450, deliveryCount: 2, tracking: 'TRK-349210', items: [{ productId: 2, quantity: 50 }, { productId: 6, quantity: 8 }] },
    { id: 'EZ-10387', date: 'Aug 29, 2026', status: 'Delivered', total: 12600, deliveryCount: 1, tracking: 'TRK-348805', items: [{ productId: 4, quantity: 40 }, { productId: 13, quantity: 12 }] }
  ],
  bidDraft: null,
  bids: [{ id: 'BR-1048', productId: 2, quantity: 50, maximumPrice: 355, matchPrice: 350, expiry: 'Payment due today', created: 'Today', status: 'Matched' }]
};
const content = document.querySelector('#content');
const drawer = document.querySelector('#cart-drawer');
const cartCount = document.querySelector('#cart-count');
const watchlistCount = document.querySelector('#watchlist-count');
const toast = document.querySelector('#toast');

function initialiseCaseStudyScreen() {
  const screen = new URLSearchParams(window.location.search).get('screen');
  if (screen === 'detail') {
    state.selectedProduct = products[1];
    state.detailQuantity = 50;
    state.detailCondition = state.selectedProduct.grade;
    state.view = 'detail';
  }
  if (screen === 'checkout') {
    state.cart = [{ product: products[1], quantity: 50 }];
    state.checkoutAddresses = [{ id: 'address-1', contact: 'Receiving team', company: 'Buyer warehouse', street: '1200 Commerce Street', city: 'Dallas', region: 'Texas', postalCode: '75201', country: 'United States' }];
    state.checkoutAllocations = { 'address-1': { [products[1].id]: 50 } };
    state.view = 'checkout';
  }
  if (screen === 'account') state.view = 'account';
}

function money(value) { return `$${value.toLocaleString('en-US')}.00`; }
function cartTotal() { return state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0); }
function allocationFor(addressId) {
  if (!state.checkoutAllocations[addressId]) state.checkoutAllocations[addressId] = {};
  return state.checkoutAllocations[addressId];
}
function ensureCheckoutDeliveryState() {
  if (!state.checkoutAddresses.length) state.checkoutAddresses = [{ id: 'address-1', contact: '', company: '', street: '', city: '', region: '', postalCode: '', country: 'United States' }];
  const addressIds = new Set(state.checkoutAddresses.map(address => address.id));
  Object.keys(state.checkoutAllocations).forEach(addressId => { if (!addressIds.has(addressId)) delete state.checkoutAllocations[addressId]; });
  state.checkoutAddresses.forEach(address => allocationFor(address.id));
  state.cart.forEach(item => {
    const quantities = state.checkoutAddresses.map(address => Math.max(0, Number(allocationFor(address.id)[item.product.id]) || 0));
    let assigned = quantities.reduce((sum, quantity) => sum + quantity, 0);
    if (assigned < item.quantity) {
      const primaryAllocation = allocationFor(state.checkoutAddresses[0].id);
      primaryAllocation[item.product.id] = (Number(primaryAllocation[item.product.id]) || 0) + item.quantity - assigned;
      assigned = item.quantity;
    }
    if (assigned > item.quantity) {
      let excess = assigned - item.quantity;
      [...state.checkoutAddresses].reverse().forEach(address => {
        if (!excess) return;
        const allocations = allocationFor(address.id);
        const quantity = Math.max(0, Number(allocations[item.product.id]) || 0);
        const removed = Math.min(quantity, excess);
        allocations[item.product.id] = quantity - removed;
        excess -= removed;
      });
    }
  });
}
function allocatedQuantity(addressId) {
  return state.cart.reduce((sum, item) => sum + (Number(allocationFor(addressId)[item.product.id]) || 0), 0);
}
function deliveryAddresses() {
  ensureCheckoutDeliveryState();
  if (state.checkoutDeliveryMode === 'single') return state.checkoutAddresses.slice(0, 1);
  const assigned = state.checkoutAddresses.filter(address => allocatedQuantity(address.id) > 0);
  return assigned.length ? assigned : state.checkoutAddresses.slice(0, 1);
}
function shippingEstimate() {
  const baseRate = state.checkoutShipping === 'express' ? 65 : state.checkoutShipping === 'pickup' ? 0 : 35;
  return baseRate * deliveryAddresses().length;
}
function orderTotal() { return cartTotal() + shippingEstimate(); }
function paymentMarks() {
  return `<div class="payment-marks" aria-label="Accepted payment methods">
    <span class="payment-brand"><img src="assets/visa.svg" alt="Visa" /></span>
    <span class="payment-brand"><img src="assets/mastercard.svg" alt="Mastercard" /></span>
    <span class="payment-brand"><img src="assets/american-express.svg" alt="American Express" /></span>
    <span class="payment-brand payment-wire"><i class="ph ph-bank"></i> Wire</span>
  </div>`;
}

function matchingProducts() {
  const query = state.query.toLowerCase();
  const matched = products.filter(product => {
    const category = state.category === 'All' || product.category === state.category;
    const grade = !state.grade.length || state.grade.includes(product.grade);
    const carrier = !state.carrier.length || state.carrier.includes(product.carrier);
    const storage = !state.storage.length || state.storage.includes(product.storage);
    const price = !state.price.length || state.price.some(range => {
      if (range === 'Under $400') return product.price < 400;
      if (range === '$400 to $600') return product.price >= 400 && product.price <= 600;
      return product.price > 600;
    });
    const text = `${product.name} ${product.details}`.toLowerCase().includes(query);
    return category && grade && carrier && storage && price && text;
  });
  const sorters = {
    featured: () => 0,
    model: (a, b) => a.name.localeCompare(b.name),
    grade: (a, b) => a.grade.localeCompare(b.grade),
    carrier: (a, b) => a.carrier.localeCompare(b.carrier),
    storage: (a, b) => a.storage.localeCompare(b.storage),
    priceLow: (a, b) => a.price - b.price,
    priceHigh: (a, b) => b.price - a.price,
    available: (a, b) => b.quantity - a.quantity
  };
  return state.sort === 'featured' ? matched : [...matched].sort(sorters[state.sort]);
}

function productById(id) {
  return products.find(product => product.id === Number(id));
}

function marketSnapshot(product) {
  const roundToFive = value => Math.max(5, Math.round(value / 5) * 5);
  const lowestAsk = product.price;
  const highestBid = roundToFive(product.price * 0.93);
  return {
    lowestAsk,
    highestBid,
    spread: lowestAsk - highestBid,
    rangeLow: roundToFive(product.price * 0.84),
    rangeHigh: roundToFive(product.price * 1.06)
  };
}

function startBid(productId) {
  const product = productId ? productById(productId) : state.selectedProduct || products[0];
  if (!product) return;
  state.selectedProduct = product;
  state.bidDraft = {
    productId: product.id,
    quantity: productId ? Math.max(1, state.detailQuantity) : 50,
    maximumPrice: Math.max(1, Math.round(product.price * 0.92)),
    expiry: '7 days'
  };
  goTo('bid');
}

function renderShop() {
  document.title = 'Eze | Shop';
  const result = matchingProducts();
  const categoryLabel = categories.find(([, value]) => value === state.category)?.[0] || 'All Products';
  const shopCopy = state.category === 'All'
    ? { title: 'Products in Bulk', description: 'Shop wholesale electronics in bulk.' }
    : { title: state.category, description: `Shop wholesale ${state.category.toLowerCase()} in bulk.` };
  const viewContent = state.viewMode === 'grid'
    ? `<div class="product-grid">${result.length ? result.map(productCardMarkup).join('') : emptyMarkup()}</div>`
    : `<div class="inventory-table"><div class="table-head"><button>Device <i class="ph ph-caret-down"></i></button><button>Grade</button><button>Carrier</button><button>Storage</button><button>Lowest ask <i class="ph ph-caret-down"></i></button><button>Availability</button><span></span></div>${result.length ? result.map(productRowMarkup).join('') : emptyMarkup()}</div>`;

  content.innerHTML = `<section class="shop-page">
    <div class="breadcrumbs"><button data-reset-category>Shop</button><i class="ph ph-caret-right"></i><span>${categoryLabel}</span></div>
    <div class="shop-heading"><div><h1>${shopCopy.title}</h1><p>${shopCopy.description}</p></div><div class="view-controls" aria-label="Product view"><button class="${state.viewMode === 'grid' ? 'is-selected' : ''}" data-view-mode="grid" aria-label="Grid view" aria-pressed="${state.viewMode === 'grid'}"><i class="ph ph-squares-four"></i></button><button class="${state.viewMode === 'list' ? 'is-selected' : ''}" data-view-mode="list" aria-label="List view" aria-pressed="${state.viewMode === 'list'}"><i class="ph ph-list"></i></button></div></div>
    <div class="buy-request"><i class="ph ph-magnifying-glass-plus"></i><div class="buy-request-copy"><strong>Can’t find the devices you need?</strong><span>Create a Buy Request and let sellers come to you.</span></div><button data-open-bid>Post a Buy Request</button></div>
    <div class="shop-layout">
      <aside class="category-rail"><h2>Categories</h2>${categoryMarkup()}</aside>
      <section class="inventory">
        <div class="inventory-top"><h2>${state.category === 'All' ? 'Shop Products' : state.category}</h2><div class="inventory-tools"><span>${result.length} products</span><label class="sort-control">Sort<select id="sort-products" aria-label="Sort products"><option value="featured" ${state.sort === 'featured' ? 'selected' : ''}>Featured</option><option value="model" ${state.sort === 'model' ? 'selected' : ''}>Model: A to Z</option><option value="grade" ${state.sort === 'grade' ? 'selected' : ''}>Grade</option><option value="carrier" ${state.sort === 'carrier' ? 'selected' : ''}>Carrier</option><option value="storage" ${state.sort === 'storage' ? 'selected' : ''}>Storage</option><option value="priceLow" ${state.sort === 'priceLow' ? 'selected' : ''}>Lowest ask</option><option value="priceHigh" ${state.sort === 'priceHigh' ? 'selected' : ''}>Highest ask</option><option value="available" ${state.sort === 'available' ? 'selected' : ''}>Most available</option></select></label></div></div>
        <div class="filters">${filterMarkup('Grade', 'grade', ['A1', 'A2', 'B1', 'B2'])}${filterMarkup('Carrier', 'carrier', ['Unlocked', 'AT&T', 'Verizon', 'T-Mobile', 'WiFi'])}${filterMarkup('Storage', 'storage', ['32GB', '64GB', '128GB', '256GB'])}${filterMarkup('Price', 'price', ['Under $400', '$400 to $600', 'Over $600'])}</div>
        ${viewContent}
        <div class="inventory-footer"><span>Showing ${result.length} of ${products.length} products</span><div class="pagination"><button class="is-selected">1</button><button>2</button><button aria-label="Next page"><i class="ph ph-caret-right"></i></button></div></div>
      </section>
    </div>
  </section>`;
  bindSearch();
}

function categoryMarkup() {
  return `${categories.map(([label, value], index) => `${index === 4 ? '<div class="category-separator"></div>' : ''}<button class="${state.category === value ? 'is-selected' : ''}" data-category="${value}">${label}<span>${countFor(value)}</span></button>`).join('')}`;
}

function countFor(category) { return category === 'All' ? products.length : products.filter(product => product.category === category).length || ''; }

function filterMarkup(label, key, options) {
  const count = state[key]?.length || 0;
  return `<div class="filter"><button class="filter-trigger ${count ? 'has-selection' : ''}" data-filter-toggle="${key}">${count ? `${label} (${count})` : label} <i class="ph ph-caret-down"></i></button><div class="filter-popover"><input class="filter-search" placeholder="Search..." /><label><input type="checkbox" data-filter-all="${key}" ${count === 0 ? 'checked' : ''} /> Select All</label>${options.map(option => `<label><input type="checkbox" data-filter-option="${key}" value="${option}" ${state[key].includes(option) ? 'checked' : ''} /> ${option}</label>`).join('')}<div class="filter-actions"><button data-filter-clear="${key}">Clear</button><button data-filter-close="${key}">Apply</button></div></div></div>`;
}

function productRowMarkup(product) {
  return `<article class="inventory-row"><button class="device-cell detail-link" data-product="${product.id}" aria-label="View ${product.name}"><span class="device-image"><img src="${product.image}" alt="${product.name}" /></span><span><h3>${product.name}</h3><p>${product.details}</p></span></button><div class="cell"><span class="grade">${product.grade}</span></div><div class="cell">${product.carrier}</div><div class="cell">${product.storage}</div><div class="cell price">${money(product.price)}<small>per device</small></div><div class="cell available">${product.quantity} in stock</div><div class="list-actions"><button class="bid-button" data-open-bid="${product.id}">Bid</button><button class="add-button" data-add="${product.id}" aria-label="Add ${product.name} to cart"><i class="ph ph-plus"></i></button></div></article>`;
}

function productCardMarkup(product) {
  return `<article class="product-card"><button class="product-card-image detail-link" data-product="${product.id}" aria-label="View ${product.name}"><img src="${product.image}" alt="${product.name}" /></button><div class="product-card-body"><div class="product-card-meta"><span class="grade">${product.grade}</span><span class="available">${product.quantity} in stock</span></div><button class="product-card-name detail-link" data-product="${product.id}"><h3>${product.name}</h3><p>${product.details}</p></button><div class="product-card-foot"><div><strong>${money(product.price)}</strong><span>Lowest ask</span></div><div class="card-actions"><button class="bid-button" data-open-bid="${product.id}">Bid</button><button class="add-button" data-add="${product.id}" aria-label="Add ${product.name} to cart"><i class="ph ph-plus"></i></button></div></div></div></article>`;
}

function emptyMarkup() { return `<div class="empty-results"><i class="ph ph-magnifying-glass"></i><strong>No products found</strong><span>Try another search or clear your filters.</span><button data-clear-all>Clear all filters</button></div>`; }

function bindSearch() {
  const input = document.querySelector('#site-search');
  input.value = state.query;
  input.addEventListener('input', event => { state.query = event.target.value; render(); });
}

function marketContextMarkup(product) {
  const market = marketSnapshot(product);
  return `<section class="market-context"><div class="market-context-heading"><div><h2>Market data</h2><p>Current pricing for this device and specification.</p></div><span><i class="ph-fill ph-circle"></i> Updated today</span></div><div class="market-stat-grid"><div><span>Best seller ask</span><strong>${money(market.lowestAsk)}</strong></div><div><span>Best buyer bid</span><strong>${money(market.highestBid)}</strong></div><div><span>7 day range</span><strong>${money(market.rangeLow)} to ${money(market.rangeHigh)}</strong></div></div><div class="market-bars" aria-label="Seven day market activity"><span style="--bar: 38%"></span><span style="--bar: 52%"></span><span style="--bar: 44%"></span><span style="--bar: 68%"></span><span style="--bar: 57%"></span><span style="--bar: 76%"></span><span style="--bar: 63%"></span></div><p class="market-caption">There is a ${money(market.spread)} gap between the best buyer bid and seller ask. A Buy Request at or above the best ask can match immediately.</p></section>`;
}

function productDetailsMarkup(product) {
  const reference = `EZE-${String(product.id).padStart(4, '0')}`;
  return `<section class="product-details-area" aria-label="Detailed product information"><div class="product-details-heading"><div><h2>Product details</h2><p>Information to review before adding this device to your order.</p></div><span>Reference ${reference}</span></div><section class="product-details-panel specifications-panel"><h3>Device specifications</h3><dl class="product-specifications"><div><dt>Model</dt><dd>${product.name}</dd></div><div><dt>Configuration</dt><dd>${product.details}</dd></div><div><dt>Category</dt><dd>${product.category}</dd></div><div><dt>Listing condition</dt><dd>${product.grade}</dd></div></dl></section><div class="product-details-grid"><section class="product-details-panel condition-panel"><div class="details-panel-heading"><span class="condition-grade">${product.grade}</span><div><h3>Condition and testing</h3><p>Each unit is graded against the listed condition standard before fulfilment.</p></div></div><ul><li><i class="ph ph-check" aria-hidden="true"></i><span>Cosmetic condition aligns with the listed grade.</span></li><li><i class="ph ph-check" aria-hidden="true"></i><span>Core device functions are checked before fulfilment.</span></li><li><i class="ph ph-check" aria-hidden="true"></i><span>Use a Buy Request if you need another condition or quantity.</span></li></ul></section><section class="product-details-panel fulfilment-panel"><h3>Inventory and fulfilment</h3><dl><div><dt>Available now</dt><dd>${product.quantity} devices</dd></div><div><dt>Order format</dt><dd>Priced per device</dd></div><div><dt>Shipping</dt><dd>Calculated by delivery address</dd></div><div><dt>Order changes</dt><dd>Review in Cart before payment</dd></div></dl><div class="fulfilment-note"><i class="ph ph-info"></i><p>For alternative quantities or pricing, create a Buy Request from this product.</p></div></section></div></section>`;
}

function renderDetail() {
  const product = state.selectedProduct;
  const total = product.price * state.detailQuantity;
  const watched = state.watchlist.includes(product.id);
  document.title = `Eze | ${product.name}`;
  content.innerHTML = `<section class="shop-page detail-page">
    <div class="breadcrumbs"><button data-back-shop>Shop</button><i class="ph ph-caret-right"></i><span>${product.name}</span></div>
    <div class="detail-layout">
      <section class="detail-gallery"><div class="image-stage"><img src="${product.image}" alt="${product.name}" /><button class="rotate-device"><i class="ph ph-arrows-clockwise"></i><span>360°</span></button></div><div class="thumbnail-row"><button class="is-active"><img src="${product.image}" alt="" /></button><button><img src="${product.image}" alt="" /></button></div></section>
      <section class="detail-information"><div class="detail-title-row"><div><h1>${product.name}</h1><p>${product.details}</p></div><button class="watch-button ${watched ? 'is-watched' : ''}" data-watch="${product.id}" aria-pressed="${watched}"><i class="${watched ? 'ph-fill' : 'ph'} ph-heart"></i> ${watched ? 'Added to watchlist' : 'Add to watchlist'}</button></div><div class="detail-purchase"><div class="detail-select-wrap"><label>Condition</label><button class="detail-select" data-condition-menu>${state.detailCondition}<i class="ph ph-caret-down"></i></button><div class="condition-menu">${[product.grade, 'A1', 'A2', 'B1'].filter((condition, index, values) => values.indexOf(condition) === index).map(condition => `<button data-condition="${condition}">${condition}</button>`).join('')}</div></div><div class="detail-price"><span>Lowest ask</span><strong>${money(product.price)}</strong></div></div>
        ${marketContextMarkup(product)}
        <div class="detail-divider"></div><section class="information-section"><h2>Listing details</h2><dl><div><dt>Grade</dt><dd>${product.grade}</dd></div><div><dt>Carrier</dt><dd>${product.carrier}</dd></div><div><dt>Storage</dt><dd>${product.storage}</dd></div><div><dt>Available</dt><dd>${product.quantity} devices</dd></div></dl></section>
        <section class="information-section"><h2>We Accept:</h2>${paymentMarks()}</section>
        <section class="information-section"><h2>Shipping Location</h2><button class="shipping-location"><i class="ph ph-map-pin"></i><span>Shipping within the United States</span><i class="ph ph-caret-down"></i></button></section>
        <section class="order-panel"><div class="quantity-control"><span>Quantity</span><div><button data-detail-quantity="-1" aria-label="Decrease quantity">−</button><b>${state.detailQuantity}</b><button data-detail-quantity="1" aria-label="Increase quantity">+</button></div></div><div class="detail-total"><span>Total</span><strong>${money(total)}</strong></div><div class="detail-purchase-actions"><button class="add-cart-large" data-buy-now="${product.id}">Buy now</button><button class="place-bid" data-open-bid="${product.id}">Place a bid</button></div></section>
      </section>
    </div>
    ${productDetailsMarkup(product)}
  </section>`;
}

function renderBidForm() {
  const draft = state.bidDraft || { productId: products[0].id, quantity: 50, maximumPrice: Math.round(products[0].price * 0.92), expiry: '7 days' };
  const product = productById(draft.productId) || products[0];
  const market = marketSnapshot(product);
  const requestTotal = draft.quantity * draft.maximumPrice;
  document.title = 'Eze | Create Buy Request';
  content.innerHTML = `<section class="shop-page bid-page">
    <div class="breadcrumbs"><button data-back-shop>Shop</button><i class="ph ph-caret-right"></i><span>Create Buy Request</span></div>
    <div class="bid-page-heading"><div><h1>Create Buy Request</h1><p>Set the device, quantity, and maximum unit price you are ready to pay.</p></div><button class="continue-shopping" data-back-shop><i class="ph ph-arrow-left"></i> Back to Shop</button></div>
    <div class="bid-layout">
      <section class="bid-form-card">
        <div class="bid-card-heading"><span><i class="ph ph-handshake"></i></span><div><h2>What are you looking for?</h2><p>Your request is automatically matched when a seller meets your maximum price.</p></div></div>
        <div class="bid-form">
          <label class="form-span">Device<select id="bid-product">${products.map(item => `<option value="${item.id}" ${item.id === product.id ? 'selected' : ''}>${item.name} · ${item.details}</option>`).join('')}</select></label>
          <label>Condition<select id="bid-condition"><option>New</option><option selected>${product.grade}</option><option>B1</option></select></label>
          <label>Carrier<select id="bid-carrier"><option selected>${product.carrier}</option><option>Unlocked</option><option>Verizon</option><option>WiFi</option></select></label>
          <label>Quantity<input id="bid-quantity" type="number" min="1" value="${draft.quantity}" inputmode="numeric" /></label>
          <label>Maximum unit price<input id="bid-price" type="number" min="1" value="${draft.maximumPrice}" inputmode="decimal" /></label>
          <label class="form-span">Request expires<select id="bid-expiry"><option ${draft.expiry === '3 days' ? 'selected' : ''}>3 days</option><option ${draft.expiry === '7 days' ? 'selected' : ''}>7 days</option><option ${draft.expiry === '14 days' ? 'selected' : ''}>14 days</option></select></label>
        </div>
        <div class="bid-commitment"><i class="ph ph-info"></i><p>A match at or below your maximum price is a purchase commitment. You will be asked to complete payment when your request is matched.</p></div>
        <button class="submit-bid" data-submit-bid>Submit Buy Request</button>
      </section>
      <aside class="bid-request-summary">
        <h2>Your request</h2>
        <div class="bid-product-preview"><img src="${product.image}" alt="${product.name}" /><div><strong>${product.name}</strong><span>${product.details}</span></div></div>
        <dl><div><dt>Quantity</dt><dd id="bid-summary-quantity">${draft.quantity} devices</dd></div><div><dt>Maximum unit price</dt><dd id="bid-summary-price">${money(draft.maximumPrice)}</dd></div><div><dt>Maximum request value</dt><dd id="bid-summary-total">${money(requestTotal)}</dd></div></dl>
        <div class="bid-market-note"><span>Market reference</span><strong>Best seller ask ${money(market.lowestAsk)}</strong><p>Best buyer bid is ${money(market.highestBid)} per device.</p></div>
        <div class="bid-steps"><h3>What happens next</h3><ol><li>Your Buy Request is visible to matching sellers.</li><li>Eze matches your request with an eligible seller ask.</li><li>Review the match and complete payment.</li></ol></div>
      </aside>
    </div>
  </section>`;
}

function bidRowMarkup(bid) {
  const product = productById(bid.productId);
  const matched = bid.status === 'Matched';
  const completed = bid.status === 'Completed';
  const statusClass = matched ? 'is-matched' : completed ? 'is-completed' : 'is-active';
  return `<article class="bid-row"><div class="bid-device"><img src="${product.image}" alt="${product.name}" /><div><strong>${product.name}</strong><span>${product.details}</span><small>${bid.id} · Created ${bid.created}</small></div></div><div><span class="bid-label">Quantity</span><strong>${bid.quantity} devices</strong></div><div><span class="bid-label">Your maximum</span><strong>${money(bid.maximumPrice)}</strong></div><div><span class="bid-label">Status</span><span class="bid-status ${statusClass}"><i class="ph-fill ph-circle"></i> ${bid.status}</span><small>${bid.expiry}</small></div><div class="bid-row-actions">${matched ? `<button class="review-match" data-review-bid="${bid.id}">Review and pay</button>` : `<button class="view-device" data-product="${product.id}">View device</button>`}</div></article>`;
}

function renderBids() {
  const activeCount = state.bids.filter(bid => bid.status === 'Active').length;
  const matchedCount = state.bids.filter(bid => bid.status === 'Matched').length;
  document.title = 'Eze | Buy Requests';
  content.innerHTML = `<section class="shop-page bids-page">
    <div class="breadcrumbs"><button data-back-shop>Shop</button><i class="ph ph-caret-right"></i><span>Buy Requests</span></div>
    <div class="bid-page-heading"><div><h1>Buy Requests</h1><p>Track your requests and complete payment when a match is ready.</p></div><button class="create-bid" data-open-bid><i class="ph ph-plus"></i> Create Buy Request</button></div>
    <div class="bid-overview"><div><span>Active requests</span><strong>${activeCount}</strong><small>Waiting for a matching seller ask</small></div><div><span>Matched requests</span><strong>${matchedCount}</strong><small>Ready for payment</small></div><div><span>How matching works</span><p>Seller asks at or below your maximum price are matched automatically.</p></div></div>
    <section class="bid-list"><div class="bid-list-header"><h2>Buy Requests</h2><span>${state.bids.length} request${state.bids.length === 1 ? '' : 's'}</span></div><div class="bid-list-labels"><span>Device</span><span>Quantity</span><span>Your maximum</span><span>Status</span><span></span></div>${state.bids.map(bidRowMarkup).join('')}</section>
    <section class="bid-help"><i class="ph ph-chart-line-up"></i><div><h2>Set a price with confidence</h2><p>Open any product to compare the best seller ask, best buyer bid, and recent market range before creating a Buy Request.</p></div><button data-go-shop>Browse products</button></section>
  </section>`;
}

function renderWatchlist() {
  const savedProducts = products.filter(product => state.watchlist.includes(product.id));
  content.innerHTML = `<section class="shop-page watchlist-page">
    <div class="breadcrumbs"><button data-back-shop>Shop</button><i class="ph ph-caret-right"></i><span>Watchlist</span></div>
    <div class="cart-page-heading"><div><h1>Watchlist</h1><p>${savedProducts.length ? `${savedProducts.length} saved device${savedProducts.length === 1 ? '' : 's'}.` : 'Save devices to keep them close.'}</p></div><button class="continue-shopping" data-back-shop><i class="ph ph-arrow-left"></i> Continue Shopping</button></div>
    ${savedProducts.length ? `<div class="product-grid watchlist-grid">${savedProducts.map(product => `<article class="product-card"><button class="product-card-image detail-link" data-product="${product.id}" aria-label="View ${product.name}"><img src="${product.image}" alt="${product.name}" /></button><div class="product-card-body"><div class="product-card-meta"><span class="grade">${product.grade}</span><button class="watchlist-remove" data-watch="${product.id}" aria-label="Remove ${product.name} from watchlist"><i class="ph-fill ph-heart"></i> Saved</button></div><button class="product-card-name detail-link" data-product="${product.id}"><h3>${product.name}</h3><p>${product.details}</p></button><div class="product-card-foot"><div><strong>${money(product.price)}</strong><span>per device</span></div><button class="add-button" data-add="${product.id}" aria-label="Add ${product.name} to cart"><i class="ph ph-plus"></i></button></div></div></article>`).join('')}</div>` : `<section class="empty-cart-page"><i class="ph ph-heart"></i><h2>Your watchlist is empty</h2><p>Save a device from its product page to find it here.</p><button data-back-shop>Continue Shopping</button></section>`}
  </section>`;
}

function checkoutProgressMarkup(activeStep) {
  const steps = [{ id: 'cart', label: 'Cart' }, { id: 'checkout', label: 'Checkout' }, { id: 'confirmation', label: 'Confirmation' }];
  const activeIndex = steps.findIndex(step => step.id === activeStep);
  return `<nav class="checkout-progress" aria-label="Order progress">${steps.map((step, index) => {
    const isComplete = index < activeIndex;
    const isActive = index === activeIndex;
    const canReturn = step.id === 'cart' && activeIndex > 0;
    return `<button class="checkout-progress-step ${isActive ? 'is-active' : ''} ${isComplete ? 'is-complete' : ''}" ${canReturn ? 'data-go-cart' : ''} ${!canReturn && !isActive ? 'disabled' : ''} ${isActive ? 'aria-current="step"' : ''}><span>${isComplete ? '<i class="ph ph-check"></i>' : index + 1}</span><strong>${step.label}</strong></button>${index < steps.length - 1 ? `<span class="checkout-progress-line ${isComplete ? 'is-complete' : ''}"></span>` : ''}`;
  }).join('')}</nav>`;
}

function renderCart() {
  const total = cartTotal();
  const itemCount = state.cart.reduce((count, item) => count + item.quantity, 0);
  content.innerHTML = `<section class="shop-page cart-page">
    <div class="breadcrumbs"><button data-back-shop>Shop</button><i class="ph ph-caret-right"></i><span>Cart</span></div>
    <div class="cart-page-heading"><div><h1>Cart</h1><p>${itemCount ? `${itemCount} device${itemCount === 1 ? '' : 's'} ready for checkout.` : 'Your cart is empty.'}</p></div><button class="continue-shopping" data-back-shop><i class="ph ph-arrow-left"></i> Continue Shopping</button></div>
    ${checkoutProgressMarkup('cart')}
    ${state.cart.length ? `<div class="cart-page-layout"><section class="cart-page-items"><div class="cart-page-labels"><span>Device</span><span>Unit price</span><span>Quantity</span><span>Total</span><span></span></div>${state.cart.map(cartPageItemMarkup).join('')}<section class="shipping-note"><i class="ph ph-truck"></i><div><strong>Shipping is calculated at checkout</strong><p>Select your shipping location before placing the order.</p></div></section></section><aside class="cart-order-summary"><h2>Order Summary</h2><div><span>Subtotal</span><strong>${money(total)}</strong></div><div><span>Shipping</span><span>Calculated at checkout</span></div><div class="order-total"><span>Order total</span><strong>${money(total)}</strong></div><button class="checkout-button" data-proceed-checkout>Proceed to Checkout</button><p>Payment is processed securely.</p>${paymentMarks()}</aside></div>` : `<section class="empty-cart-page"><i class="ph ph-shopping-cart"></i><h2>Your cart is empty</h2><p>Add devices from Products in Bulk when you are ready.</p><button data-back-shop>Continue Shopping</button></section>`}
  </section>`;
}

function cartPageItemMarkup(item) {
  const total = item.product.price * item.quantity;
  return `<article class="cart-page-item"><button class="cart-product detail-link" data-product="${item.product.id}" aria-label="View ${item.product.name}"><span class="device-image"><img src="${item.product.image}" alt="${item.product.name}" /></span><span><strong>${item.product.name}</strong><small>${item.product.details}</small><span class="grade">${item.product.grade}</span></span></button><span class="cart-unit-price">${money(item.product.price)}</span><div class="cart-quantity"><button data-cart-quantity="-1" data-cart-product="${item.product.id}" aria-label="Decrease ${item.product.name}">−</button><b>${item.quantity}</b><button data-cart-quantity="1" data-cart-product="${item.product.id}" aria-label="Increase ${item.product.name}">+</button></div><strong class="cart-line-total">${money(total)}</strong><button class="remove-cart-item" data-remove="${item.product.id}" aria-label="Remove ${item.product.name}"><i class="ph ph-trash"></i></button></article>`;
}

function escapeAttribute(value) {
  return String(value ?? '').replace(/[&<>"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);
}

function deliveryAddressMarkup(address, index) {
  const value = field => escapeAttribute(address[field]);
  const showRemove = state.checkoutDeliveryMode === 'multiple' && state.checkoutAddresses.length > 1;
  return `<article class="delivery-address"><div class="delivery-address-header"><div><span class="address-index">${state.checkoutDeliveryMode === 'multiple' ? `Address ${index + 1}` : 'Delivery address'}</span><small>${allocatedQuantity(address.id)} unit${allocatedQuantity(address.id) === 1 ? '' : 's'} assigned</small></div>${showRemove ? `<button data-remove-delivery-address="${address.id}">Remove</button>` : ''}</div><div class="checkout-form delivery-address-form"><label>Contact name<input data-address-id="${address.id}" data-address-field="contact" type="text" value="${value('contact')}" placeholder="Full name" autocomplete="name" /></label><label>Company<input data-address-id="${address.id}" data-address-field="company" type="text" value="${value('company')}" placeholder="Company name" autocomplete="organization" /></label><label class="form-span">Street address<input data-address-id="${address.id}" data-address-field="street" type="text" value="${value('street')}" placeholder="Street address" autocomplete="street-address" /></label><label>City<input data-address-id="${address.id}" data-address-field="city" type="text" value="${value('city')}" placeholder="City" autocomplete="address-level2" /></label><label>State<input data-address-id="${address.id}" data-address-field="region" type="text" value="${value('region')}" placeholder="State" autocomplete="address-level1" /></label><label>ZIP code<input data-address-id="${address.id}" data-address-field="postalCode" type="text" value="${value('postalCode')}" placeholder="ZIP code" autocomplete="postal-code" /></label><label>Country<select data-address-id="${address.id}" data-address-field="country" aria-label="Country"><option ${address.country === 'United States' ? 'selected' : ''}>United States</option></select></label></div></article>`;
}

function deliveryAllocationMarkup() {
  if (state.checkoutDeliveryMode !== 'multiple' || state.checkoutAddresses.length < 2) return '';
  const addressCount = deliveryAddresses().length;
  return `<section class="allocation-panel"><div class="allocation-heading"><div><h3>Assign devices to addresses</h3><p>Move units to another address. Delivery is charged only for addresses with assigned devices.</p></div><span>${addressCount} delivery ${addressCount === 1 ? 'address' : 'addresses'}</span></div><div class="allocation-list">${state.cart.map(item => `<article class="allocation-product"><div class="allocation-product-details"><img src="${item.product.image}" alt="${item.product.name}" /><div><strong>${item.product.name}</strong><small>${item.quantity} units to assign</small></div></div><div class="allocation-inputs" style="--address-columns:${state.checkoutAddresses.length}">${state.checkoutAddresses.map((address, index) => `<label><span>Address ${index + 1}</span><div><input data-allocation-address="${address.id}" data-allocation-product="${item.product.id}" type="number" min="0" max="${item.quantity}" value="${Number(allocationFor(address.id)[item.product.id]) || 0}" inputmode="numeric" /><small>units</small></div></label>`).join('')}</div></article>`).join('')}</div></section>`;
}

function renderCheckout() {
  ensureCheckoutDeliveryState();
  const shipping = shippingEstimate();
  const total = orderTotal();
  const isCard = state.checkoutPayment === 'card';
  const savedCard = state.savedCard;
  const visibleAddresses = state.checkoutDeliveryMode === 'multiple' ? state.checkoutAddresses : state.checkoutAddresses.slice(0, 1);
  const addressCount = deliveryAddresses().length;
  const matchedBid = state.checkoutContext?.bidId ? state.bids.find(bid => bid.id === state.checkoutContext.bidId) : null;
  const checkoutTitle = matchedBid ? 'Complete matched request' : 'Complete Order';
  document.title = `Eze | ${checkoutTitle}`;
  const cards = [
    { id: 1, brand: 'Visa', last4: '9012' },
    { id: 2, brand: 'Mastercard', last4: '4444' },
    { id: 3, brand: 'American Express', last4: '8305' }
  ];
  content.innerHTML = `<section class="shop-page checkout-page">
    <div class="breadcrumbs"><button data-go-cart>Cart</button><i class="ph ph-caret-right"></i><span>Checkout</span></div>
    <div class="checkout-heading"><h1>${checkoutTitle}</h1><button data-go-cart><i class="ph ph-arrow-left"></i> Return to Cart</button></div>
    ${checkoutProgressMarkup('checkout')}
    ${matchedBid ? `<div class="matched-checkout-notice"><i class="ph ph-check-circle"></i><span><strong>Your Buy Request was matched.</strong> Complete payment for ${matchedBid.quantity} ${productById(matchedBid.productId).name} devices at ${money(matchedBid.matchPrice)} per device.</span></div>` : ''}
    <div class="checkout-layout"><section class="checkout-steps"><section class="checkout-card"><div class="checkout-card-heading"><span>1</span><h2>Shipping Address</h2></div><p>Choose one destination or split the order between delivery addresses.</p><div class="shipping-mode" role="group" aria-label="Delivery address type"><button class="${state.checkoutDeliveryMode === 'single' ? 'is-selected' : ''}" data-delivery-mode="single"><i class="ph ph-map-pin"></i><span><strong>One address</strong><small>Send every device together</small></span></button><button class="${state.checkoutDeliveryMode === 'multiple' ? 'is-selected' : ''}" data-delivery-mode="multiple"><i class="ph ph-map-pin-line"></i><span><strong>Multiple addresses</strong><small>Split devices by destination</small></span></button></div><div class="delivery-address-list">${visibleAddresses.map(deliveryAddressMarkup).join('')}</div>${state.checkoutDeliveryMode === 'multiple' ? `<button class="add-delivery-address" data-add-delivery-address><i class="ph ph-plus"></i> Add another delivery address</button>` : ''}${deliveryAllocationMarkup()}</section><section class="checkout-card"><div class="checkout-card-heading"><span>2</span><h2>Delivery Method</h2></div><p>${state.checkoutDeliveryMode === 'multiple' ? `Choose one delivery service for ${addressCount} active delivery ${addressCount === 1 ? 'address' : 'addresses'}.` : 'Choose the delivery service that works for this order.'}</p><div class="shipping-options"><button class="shipping-option ${state.checkoutShipping === 'standard' ? 'is-selected' : ''}" data-shipping="standard"><span><strong>Standard shipping</strong><small>3 to 5 business days</small></span><strong>${money(35)} per address</strong></button><button class="shipping-option ${state.checkoutShipping === 'express' ? 'is-selected' : ''}" data-shipping="express"><span><strong>Express shipping</strong><small>1 to 2 business days</small></span><strong>${money(65)} per address</strong></button><button class="shipping-option ${state.checkoutShipping === 'pickup' ? 'is-selected' : ''}" data-shipping="pickup"><span><strong>Pickup in store</strong><small>Collect from our warehouse in 1 to 3 business days</small></span><strong>Free</strong></button></div></section><section class="checkout-card"><div class="checkout-card-heading"><span>3</span><h2>Payment Method</h2></div><p>Choose a payment method for this order.</p><div class="payment-choices"><button class="payment-choice ${isCard ? 'is-selected' : ''}" data-payment="card"><span class="payment-choice-icon"><i class="ph ph-credit-card"></i></span><span><strong>Card</strong><small>Visa, Mastercard, or American Express</small></span></button><button class="payment-choice ${!isCard ? 'is-selected' : ''}" data-payment="wire"><span class="payment-choice-icon"><i class="ph ph-bank"></i></span><span><strong>Wire Transfer</strong><small>Send payment from your bank account</small></span></button></div>${isCard ? `<div class="checkout-form card-form"><label class="form-span">Name on card<input type="text" placeholder="Name on card" autocomplete="cc-name" /></label><label class="form-span">Card number<div class="card-field"><input type="text" inputmode="numeric" placeholder="0000 0000 0000 0000" autocomplete="cc-number" />${paymentMarks()}</div></label><label>Expiration date<input type="text" inputmode="numeric" placeholder="MM / YY" autocomplete="cc-exp" /></label><label>Security code<input type="text" inputmode="numeric" placeholder="CVC" autocomplete="cc-csc" /></label><label class="form-span checkbox-field"><input type="checkbox" /> Save this card for a future order</label>${savedCard ? `<div class="saved-cards"><small style="display:block;margin-bottom:8px;color:#5f6871;font-size:10px">Saved cards</small>${cards.map(card => `<button class="saved-card ${savedCard && savedCard.id === card.id ? 'is-selected' : ''}" data-card-id="${card.id}"><div class="saved-card-brand"><img src="assets/${card.brand.toLowerCase().replace(' ', '-')}.svg" alt="${card.brand}" /></div><div class="saved-card-text"><strong>${card.brand}</strong><span>ending in ${card.last4}</span></div></button>`).join('')}<button class="remove-saved-card" data-remove-card="${savedCard.id}">Remove saved card</button></div>` : ''}</div>` : `<div class="wire-message"><i class="ph ph-bank"></i><div><strong>Pay by wire transfer</strong><p>Bank instructions will be shown after you place the order.</p></div></div>`}</section></section><aside class="cart-order-summary checkout-summary"><h2>Order Summary</h2>${state.cart.map(item => `<div class="checkout-summary-line"><span>${item.product.name} <small>× ${item.quantity}</small></span><strong>${money(item.product.price * item.quantity)}</strong></div>`).join('')}<div><span>Shipping estimate <small>${addressCount} delivery ${addressCount === 1 ? 'address' : 'addresses'}</small></span><strong>${money(shipping)}</strong></div><div class="order-total"><span>Order total</span><strong>${money(total)}</strong></div><button class="checkout-button" data-place-order>Place Order</button><p>By placing your order, you confirm the shipping and payment details above.</p></aside></div>
  </section>`;
}

function renderOrderConfirmation() {
  const total = state.completedOrder?.total ?? orderTotal();
  const deliveryCount = state.completedOrder?.deliveryCount ?? 1;
  document.title = 'Eze | Order Confirmation';
  content.innerHTML = `<section class="shop-page confirmation-page">${checkoutProgressMarkup('confirmation')}<div class="confirmation-card"><span class="confirmation-icon"><i class="ph ph-check"></i></span><h1>Order Submitted</h1><p>Your order is ready for review. We will confirm payment and shipping details for ${deliveryCount} delivery ${deliveryCount === 1 ? 'address' : 'addresses'} before processing it.</p><div class="confirmation-summary"><span>Order total</span><strong>${money(total)}</strong></div><div class="confirmation-actions"><button data-go-account>View order</button><button class="confirmation-secondary" data-back-shop>Continue Shopping</button></div></div></section>`;
}

function orderStatusClass(status) { return status.toLowerCase().replace(/\s+/g, '-'); }
function orderStageIndex(status) { return ({ 'Order received': 0, 'Payment confirmed': 1, 'Preparing shipment': 1, 'In transit': 2, Delivered: 3 })[status] ?? 0; }
function orderItemCount(order) { return order.items.reduce((sum, item) => sum + item.quantity, 0); }
function openOrderCount() { return state.orders.filter(order => order.status !== 'Delivered').length; }

function orderProgressMarkup(order) {
  const stages = ['Order received', 'Payment confirmed', 'In transit', 'Delivered'];
  const activeIndex = orderStageIndex(order.status);
  return `<div class="account-order-progress" aria-label="Delivery status">${stages.map((stage, index) => `<div class="${index <= activeIndex ? 'is-complete' : ''} ${index === activeIndex ? 'is-current' : ''}"><span>${index < activeIndex ? '<i class="ph ph-check"></i>' : index + 1}</span><strong>${stage}</strong></div>`).join('')}</div>`;
}

function accountOrderMarkup(order) {
  const isExpanded = state.accountExpandedOrder === order.id;
  const itemCount = orderItemCount(order);
  return `<article class="account-order-card ${isExpanded ? 'is-expanded' : ''}"><div class="account-order-top"><div><div class="order-reference"><strong>${order.id}</strong><span class="order-status is-${orderStatusClass(order.status)}"><i class="ph-fill ph-circle"></i>${order.status}</span></div><p>Placed ${order.date} · ${itemCount} device${itemCount === 1 ? '' : 's'} · ${order.deliveryCount} delivery ${order.deliveryCount === 1 ? 'address' : 'addresses'}</p></div><strong class="order-amount">${money(order.total)}</strong></div><div class="account-order-meta"><span><i class="ph ph-truck"></i>${order.status === 'Delivered' ? 'Delivered to the selected address' : `Tracking ${order.tracking}`}</span><button data-account-order="${order.id}">${isExpanded ? 'Hide order details' : 'View order details'} <i class="ph ph-caret-${isExpanded ? 'up' : 'down'}"></i></button></div>${isExpanded ? `<div class="account-order-expanded">${orderProgressMarkup(order)}<div class="account-order-items">${order.items.map(item => { const product = productById(item.productId); return `<div><img src="${product.image}" alt="${product.name}" /><span><strong>${product.name}</strong><small>${product.details} · ${item.quantity} units</small></span><b>${money(product.price * item.quantity)}</b></div>`; }).join('')}</div></div>` : ''}</article>`;
}

function accountOverviewMarkup() {
  const activeBids = state.bids.filter(bid => bid.status === 'Active').length;
  const matchedBids = state.bids.filter(bid => bid.status === 'Matched').length;
  return `<div class="account-overview"><div class="account-stat-grid"><button data-account-tab="orders"><span>Open orders</span><strong>${openOrderCount()}</strong><small>Track delivery and payment</small></button><button data-account-tab="bids"><span>Buy Requests</span><strong>${activeBids + matchedBids}</strong><small>${matchedBids ? `${matchedBids} ready for payment` : 'Set your maximum price'}</small></button><button data-account-tab="addresses"><span>Saved addresses</span><strong>${state.accountAddresses.length}</strong><small>Ready for checkout</small></button></div><div class="account-overview-grid"><section class="account-section account-recent-orders"><div class="account-section-heading"><div><h2>Recent orders</h2><p>Review each order and its delivery status.</p></div><button data-account-tab="orders">View all</button></div><div class="account-order-list">${state.orders.slice(0, 2).map(accountOrderMarkup).join('')}</div></section><aside class="account-activity"><section class="account-section"><div class="account-section-heading"><div><h2>Buy Request activity</h2><p>Matches are ready for payment when a seller accepts your price.</p></div><button data-account-tab="bids">View all</button></div><div class="account-bid-summary"><span><i class="ph ph-chart-line-up"></i></span><div><strong>${matchedBids ? 'A request is ready for review' : 'Your requests are being matched'}</strong><p>${matchedBids ? 'Review the matched price and complete payment from Buy Requests.' : `${activeBids} active request${activeBids === 1 ? '' : 's'} waiting for a seller ask.`}</p></div></div></section><section class="account-section account-address-summary"><div class="account-section-heading"><div><h2>Default delivery address</h2><p>Used when you begin a new checkout.</p></div><button data-account-tab="addresses">Manage</button></div>${accountAddressSummaryMarkup(state.accountAddresses.find(address => address.isDefault) || state.accountAddresses[0])}</section></aside></div></div>`;
}

function accountAddressSummaryMarkup(address) {
  if (!address) return `<div class="account-empty-state"><i class="ph ph-map-pin"></i><p>No saved addresses yet.</p></div>`;
  return `<div class="account-address-summary-card"><i class="ph ph-map-pin"></i><div><strong>${address.label}</strong><p>${address.street}, ${address.city}, ${address.region} ${address.postalCode}</p></div></div>`;
}

function accountOrdersMarkup() {
  return `<section class="account-section account-orders-section"><div class="account-section-heading"><div><h2>Orders</h2><p>${state.orders.length} order${state.orders.length === 1 ? '' : 's'} available to review.</p></div></div><div class="account-order-list">${state.orders.map(accountOrderMarkup).join('')}</div></section>`;
}

function accountAddressFormMarkup() {
  const draft = state.accountAddressDraft;
  return `<section class="saved-address-form"><div class="account-section-heading"><div><h2>Add delivery address</h2><p>Save an address for a faster checkout.</p></div><button class="account-text-button" data-cancel-saved-address>Cancel</button></div><div class="checkout-form account-address-form"><label>Address label<input data-account-address-field="label" type="text" value="${escapeAttribute(draft.label)}" placeholder="Warehouse or store" /></label><label>Contact name<input data-account-address-field="contact" type="text" value="${escapeAttribute(draft.contact)}" placeholder="Receiving contact" autocomplete="name" /></label><label>Company<input data-account-address-field="company" type="text" value="${escapeAttribute(draft.company)}" placeholder="Company name" autocomplete="organization" /></label><label class="form-span">Street address<input data-account-address-field="street" type="text" value="${escapeAttribute(draft.street)}" placeholder="Street address" autocomplete="street-address" /></label><label>City<input data-account-address-field="city" type="text" value="${escapeAttribute(draft.city)}" placeholder="City" autocomplete="address-level2" /></label><label>State<input data-account-address-field="region" type="text" value="${escapeAttribute(draft.region)}" placeholder="State" autocomplete="address-level1" /></label><label>ZIP code<input data-account-address-field="postalCode" type="text" value="${escapeAttribute(draft.postalCode)}" placeholder="ZIP code" autocomplete="postal-code" /></label><label>Country<select data-account-address-field="country" aria-label="Country"><option ${draft.country === 'United States' ? 'selected' : ''}>United States</option></select></label></div><button class="save-address-button" data-save-saved-address>Save address</button></section>`;
}

function savedAddressMarkup(address) {
  return `<article class="saved-address-card"><div class="saved-address-card-top"><div><span class="address-card-icon"><i class="ph ph-map-pin"></i></span><div><strong>${address.label}</strong>${address.isDefault ? '<small>Default address</small>' : ''}</div></div>${!address.isDefault ? `<button class="account-text-button" data-set-default-address="${address.id}">Set as default</button>` : ''}</div><p>${address.contact}<br />${address.company}<br />${address.street}<br />${address.city}, ${address.region} ${address.postalCode}<br />${address.country}</p><div class="saved-address-actions"><button data-use-saved-address="${address.id}">Use at checkout</button>${state.accountAddresses.length > 1 ? `<button data-delete-saved-address="${address.id}">Remove</button>` : ''}</div></article>`;
}

function accountAddressesMarkup() {
  return `<section class="account-section account-addresses-section"><div class="account-section-heading"><div><h2>Saved addresses</h2><p>Choose the default address for your next order.</p></div>${!state.accountAddressFormOpen ? `<button class="account-primary-button" data-add-saved-address><i class="ph ph-plus"></i>Add address</button>` : ''}</div>${state.accountAddressFormOpen ? accountAddressFormMarkup() : ''}<div class="saved-address-grid">${state.accountAddresses.map(savedAddressMarkup).join('')}</div></section>`;
}

function accountBidsMarkup() {
  const active = state.bids.filter(bid => bid.status === 'Active').length;
  const matched = state.bids.filter(bid => bid.status === 'Matched').length;
  return `<div class="account-bids"><div class="account-stat-grid account-bid-stats"><div><span>Active requests</span><strong>${active}</strong><small>Waiting for a seller ask</small></div><div><span>Matched requests</span><strong>${matched}</strong><small>Ready for payment</small></div></div><section class="account-section account-buy-requests"><div class="account-section-heading"><div><h2>Buy Requests</h2><p>Manage your maximum prices and matched offers.</p></div></div><div class="bid-list-labels"><span>Device</span><span>Quantity</span><span>Your maximum</span><span>Status</span><span></span></div>${state.bids.map(bidRowMarkup).join('')}</section></div>`;
}

function renderAccount() {
  const panels = { overview: accountOverviewMarkup, orders: accountOrdersMarkup, addresses: accountAddressesMarkup, bids: accountBidsMarkup };
  document.title = 'Eze | Buyer Account';
  content.innerHTML = `<section class="shop-page account-page"><div class="breadcrumbs"><button data-back-shop>Shop</button><i class="ph ph-caret-right"></i><span>Account</span></div><div class="account-page-heading"><div><h1>Buyer account</h1><p>Manage orders, delivery addresses, and Buy Requests.</p></div><button class="create-bid" data-open-bid><i class="ph ph-plus"></i>Create Buy Request</button></div><div class="account-layout"><aside class="account-nav" aria-label="Account sections"><button class="${state.accountTab === 'overview' ? 'is-selected' : ''}" data-account-tab="overview"><i class="ph ph-squares-four"></i>Overview</button><button class="${state.accountTab === 'orders' ? 'is-selected' : ''}" data-account-tab="orders"><i class="ph ph-package"></i>Orders<span>${openOrderCount()}</span></button><button class="${state.accountTab === 'addresses' ? 'is-selected' : ''}" data-account-tab="addresses"><i class="ph ph-map-pin"></i>Addresses<span>${state.accountAddresses.length}</span></button><button class="${state.accountTab === 'bids' ? 'is-selected' : ''}" data-account-tab="bids"><i class="ph ph-chart-line-up"></i>Buy Requests<span>${state.bids.filter(bid => bid.status !== 'Completed').length}</span></button></aside><section class="account-content">${panels[state.accountTab]()}</section></div></section>`;
}

function render() {
  syncHeader();
  if (state.view === 'detail') renderDetail();
  else if (state.view === 'bid') renderBidForm();
  else if (state.view === 'bids') renderBids();
  else if (state.view === 'cart') renderCart();
  else if (state.view === 'checkout') renderCheckout();
  else if (state.view === 'confirmation') renderOrderConfirmation();
  else if (state.view === 'account') renderAccount();
  else if (state.view === 'watchlist') renderWatchlist();
  else renderShop();
  updateWatchlistCount();
}

function updateCartCount() { cartCount.textContent = state.cart.reduce((total, item) => total + item.quantity, 0); }
function updateWatchlistCount() { const count = state.watchlist.length; watchlistCount.textContent = count; watchlistCount.hidden = count === 0; }
function syncHeader() {
  document.querySelector('.nav-shop').classList.toggle('nav-active', ['shop', 'detail', 'cart', 'checkout', 'confirmation', 'watchlist'].includes(state.view));
  document.querySelector('.nav-bids')?.classList.toggle('nav-active', ['bid', 'bids'].includes(state.view));
  document.querySelector('.account-action')?.classList.toggle('is-active', state.view === 'account');
  const accountNotification = document.querySelector('#account-notification');
  const matchedRequestCount = state.bids.filter(bid => bid.status === 'Matched').length;
  if (accountNotification) {
    accountNotification.hidden = matchedRequestCount === 0;
    accountNotification.setAttribute('aria-label', matchedRequestCount === 1 ? 'A matched Buy Request needs payment' : 'Matched Buy Requests need payment');
  }
}
function showToast(message) { toast.textContent = message; toast.classList.add('is-visible'); window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2200); }
function addToCart(id, quantity = 1) { const product = products.find(item => item.id === Number(id)); const current = state.cart.find(item => item.product.id === product.id); if (current) current.quantity += quantity; else state.cart.push({ product, quantity }); state.checkoutContext = null; updateCartCount(); renderDrawer(); if (state.view === 'cart' || state.view === 'checkout') render(); showToast(`${product.name} added to cart.`); }
function changeCartQuantity(id, adjustment) { const item = state.cart.find(entry => entry.product.id === Number(id)); if (!item) return; item.quantity += Number(adjustment); if (item.quantity < 1) state.cart = state.cart.filter(entry => entry !== item); updateCartCount(); renderDrawer(); render(); }
function goTo(view) { state.view = view; drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function submitOrder() {
  ensureCheckoutDeliveryState();
  if (state.checkoutPayment === 'card' && !state.savedCard) {
    state.savedCard = { id: 1, brand: 'Visa', last4: '9012' };
  }
  if (state.checkoutContext?.bidId) {
    const bid = state.bids.find(item => item.id === state.checkoutContext.bidId);
    if (bid) { bid.status = 'Completed'; bid.expiry = 'Paid today'; }
  }
  const completedTotal = orderTotal();
  const completedDeliveryCount = deliveryAddresses().length;
  const completedOrder = {
    id: `EZ-${String(10433 + state.orders.length).padStart(5, '0')}`,
    date: 'Today',
    status: 'Order received',
    total: completedTotal,
    deliveryCount: completedDeliveryCount,
    tracking: 'Tracking assigned after payment review',
    items: state.cart.map(item => ({ productId: item.product.id, quantity: item.quantity }))
  };
  state.orders.unshift(completedOrder);
  state.accountExpandedOrder = completedOrder.id;
  state.completedOrder = { total: completedTotal, deliveryCount: completedDeliveryCount, id: completedOrder.id };
  state.cart = [];
  updateCartCount();
  renderDrawer();
  state.checkoutContext = null;
  goTo('confirmation');
}

function submitBid() {
  const productId = Number(document.querySelector('#bid-product')?.value);
  const quantity = Number(document.querySelector('#bid-quantity')?.value);
  const maximumPrice = Number(document.querySelector('#bid-price')?.value);
  const expiry = document.querySelector('#bid-expiry')?.value;
  const product = productById(productId);
  if (!product || !Number.isFinite(quantity) || quantity < 1 || !Number.isFinite(maximumPrice) || maximumPrice < 1) {
    showToast('Enter a device, quantity, and maximum unit price.');
    return;
  }
  state.bids.unshift({
    id: `BR-${String(1049 + state.bids.length).padStart(4, '0')}`,
    productId: product.id,
    quantity,
    maximumPrice,
    expiry: `Expires in ${expiry}`,
    created: 'Just now',
    status: 'Active'
  });
  state.bidDraft = null;
  state.accountTab = 'bids';
  goTo('account');
  showToast('Buy Request submitted.');
}

function reviewMatchedBid(id) {
  const bid = state.bids.find(item => item.id === id && item.status === 'Matched');
  const product = bid && productById(bid.productId);
  if (!bid || !product) return;
  const current = state.cart.find(item => item.product.id === product.id);
  if (current) current.quantity += bid.quantity;
  else state.cart.push({ product, quantity: bid.quantity });
  state.checkoutContext = { bidId: bid.id };
  updateCartCount();
  renderDrawer();
  goTo('checkout');
}

function renderDrawer() {
  const total = cartTotal();
  drawer.innerHTML = `<header><h2>Your cart</h2><button id="close-cart" aria-label="Close cart"><i class="ph ph-x"></i></button></header><div class="cart-items">${state.cart.length ? state.cart.map(item => `<article class="cart-item"><img src="${item.product.image}" alt="${item.product.name}" /><div><strong>${item.product.name}</strong><span>${item.quantity} unit${item.quantity > 1 ? 's' : ''} · ${money(item.product.price)}</span></div><button data-remove="${item.product.id}" aria-label="Remove ${item.product.name}"><i class="ph ph-trash"></i></button></article>`).join('') : '<p class="empty-cart">Your cart is empty.</p>'}</div>${state.cart.length ? `<div class="cart-summary"><div><span>Subtotal</span><strong>${money(total)}</strong></div><div><span>Shipping</span><span>Calculated at checkout</span></div><button class="checkout-button" data-go-cart>Proceed to checkout</button></div>` : ''}`;
}

function setMobileNav(open) {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('[data-mobile-nav-toggle]');
  if (!header || !toggle) return;
  header.classList.toggle('is-mobile-nav-open', open);
  toggle.setAttribute('aria-expanded', String(open));
}

document.addEventListener('click', event => {
  const mobileNavToggle = event.target.closest('[data-mobile-nav-toggle]');
  if (mobileNavToggle) {
    setMobileNav(mobileNavToggle.getAttribute('aria-expanded') !== 'true');
    return;
  }
  if (event.target.closest('#global-nav button')) setMobileNav(false);
  const category = event.target.closest('[data-category]');
  if (category) { state.category = category.dataset.category; state.view = 'shop'; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  if (event.target.closest('[data-reset-category]')) { state.category = 'All'; state.view = 'shop'; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  if (event.target.closest('[data-go-shop]')) { goTo('shop'); return; }
  if (event.target.closest('[data-go-bids]')) { goTo('bids'); return; }
  if (event.target.closest('#account-button, [data-go-account]')) { goTo('account'); return; }
  const accountTab = event.target.closest('[data-account-tab]');
  if (accountTab) { state.accountTab = accountTab.dataset.accountTab; state.accountAddressFormOpen = false; render(); return; }
  const accountOrder = event.target.closest('[data-account-order]');
  if (accountOrder) { state.accountExpandedOrder = state.accountExpandedOrder === accountOrder.dataset.accountOrder ? null : accountOrder.dataset.accountOrder; render(); return; }
  if (event.target.closest('[data-add-saved-address]')) { state.accountAddressFormOpen = true; state.accountAddressDraft = { label: '', contact: '', company: '', street: '', city: '', region: '', postalCode: '', country: 'United States' }; render(); return; }
  if (event.target.closest('[data-cancel-saved-address]')) { state.accountAddressFormOpen = false; render(); return; }
  if (event.target.closest('[data-save-saved-address]')) {
    const draft = state.accountAddressDraft;
    if (!draft.label.trim() || !draft.street.trim() || !draft.city.trim()) { showToast('Add an address label, street address, and city.'); return; }
    state.accountAddresses.push({ ...draft, id: `saved-address-${Date.now()}`, isDefault: state.accountAddresses.length === 0 });
    state.accountAddressFormOpen = false;
    render();
    showToast('Delivery address saved.');
    return;
  }
  const setDefaultAddress = event.target.closest('[data-set-default-address]');
  if (setDefaultAddress) { state.accountAddresses.forEach(address => { address.isDefault = address.id === setDefaultAddress.dataset.setDefaultAddress; }); render(); showToast('Default delivery address updated.'); return; }
  const deleteSavedAddress = event.target.closest('[data-delete-saved-address]');
  if (deleteSavedAddress) {
    const removedDefault = state.accountAddresses.find(address => address.id === deleteSavedAddress.dataset.deleteSavedAddress)?.isDefault;
    state.accountAddresses = state.accountAddresses.filter(address => address.id !== deleteSavedAddress.dataset.deleteSavedAddress);
    if (removedDefault && state.accountAddresses.length) state.accountAddresses[0].isDefault = true;
    render();
    showToast('Saved address removed.');
    return;
  }
  const useSavedAddress = event.target.closest('[data-use-saved-address]');
  if (useSavedAddress) {
    const savedAddress = state.accountAddresses.find(address => address.id === useSavedAddress.dataset.useSavedAddress);
    if (!savedAddress) return;
    state.checkoutAddresses = [{ ...savedAddress, id: 'address-1' }];
    state.checkoutAllocations = { 'address-1': {} };
    state.checkoutDeliveryMode = 'single';
    if (state.cart.length) { goTo('checkout'); return; }
    showToast('Address will be used in your next checkout.');
    return;
  }
  const openBid = event.target.closest('[data-open-bid]');
  if (openBid) { startBid(openBid.dataset.openBid ? Number(openBid.dataset.openBid) : undefined); return; }
  if (event.target.closest('[data-submit-bid]')) { submitBid(); return; }
  const reviewBid = event.target.closest('[data-review-bid]');
  if (reviewBid) { reviewMatchedBid(reviewBid.dataset.reviewBid); return; }
  if (event.target.closest('[data-sell-interest]')) { showToast('The Sell on Eze flow is the next experience.'); return; }
  const viewMode = event.target.closest('[data-view-mode]');
  if (viewMode) { state.viewMode = viewMode.dataset.viewMode; render(); return; }
  const toggle = event.target.closest('[data-filter-toggle]');
  if (toggle) { const filter = toggle.closest('.filter'); document.querySelectorAll('.filter.is-open').forEach(item => { if (item !== filter) item.classList.remove('is-open'); }); filter.classList.toggle('is-open'); return; }
  const clear = event.target.closest('[data-filter-clear]');
  if (clear) { state[clear.dataset.filterClear] = []; render(); return; }
  const close = event.target.closest('[data-filter-close]');
  if (close) { close.closest('.filter').classList.remove('is-open'); return; }
  const add = event.target.closest('[data-add]');
  if (add) { addToCart(add.dataset.add); return; }
  const product = event.target.closest('[data-product]');
  if (product) { state.selectedProduct = products.find(item => item.id === Number(product.dataset.product)); state.detailQuantity = 1; state.detailCondition = state.selectedProduct.grade; goTo('detail'); return; }
  if (event.target.closest('[data-back-shop]')) { goTo('shop'); return; }
  if (event.target.closest('#watchlist-button, #watchlist-nav')) { goTo('watchlist'); return; }
  const watch = event.target.closest('[data-watch]');
  if (watch) { const id = Number(watch.dataset.watch); const watched = state.watchlist.includes(id); state.watchlist = watched ? state.watchlist.filter(item => item !== id) : [...state.watchlist, id]; updateWatchlistCount(); render(); showToast(watched ? 'Removed from watchlist.' : 'Added to watchlist.'); return; }
  const conditionMenu = event.target.closest('[data-condition-menu]');
  if (conditionMenu) { conditionMenu.closest('.detail-select-wrap').classList.toggle('is-open'); return; }
  const condition = event.target.closest('[data-condition]');
  if (condition) { state.detailCondition = condition.dataset.condition; render(); return; }
  const detailQuantity = event.target.closest('[data-detail-quantity]');
  if (detailQuantity) { state.detailQuantity = Math.max(1, state.detailQuantity + Number(detailQuantity.dataset.detailQuantity)); render(); return; }
  const addQuantity = event.target.closest('[data-add-quantity]');
  if (addQuantity) { addToCart(addQuantity.dataset.addQuantity, state.detailQuantity); return; }
  const buyNow = event.target.closest('[data-buy-now]');
  if (buyNow) { addToCart(buyNow.dataset.buyNow, state.detailQuantity); goTo('cart'); return; }
  if (event.target.closest('#cart-button')) { drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); return; }
  if (event.target.closest('#close-cart')) { drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); return; }
  const cartQuantity = event.target.closest('[data-cart-quantity]');
  if (cartQuantity) { changeCartQuantity(cartQuantity.dataset.cartProduct, cartQuantity.dataset.cartQuantity); return; }
  const deliveryMode = event.target.closest('[data-delivery-mode]');
  if (deliveryMode) {
    ensureCheckoutDeliveryState();
    const nextMode = deliveryMode.dataset.deliveryMode;
    if (nextMode === 'single') {
      const primaryAddress = state.checkoutAddresses[0];
      state.cart.forEach(item => {
        const totalAllocated = state.checkoutAddresses.reduce((sum, address) => sum + (Number(allocationFor(address.id)[item.product.id]) || 0), 0);
        allocationFor(primaryAddress.id)[item.product.id] = totalAllocated;
      });
      state.checkoutAddresses = [primaryAddress];
      state.checkoutAllocations = { [primaryAddress.id]: allocationFor(primaryAddress.id) };
    }
    state.checkoutDeliveryMode = nextMode;
    render();
    return;
  }
  if (event.target.closest('[data-add-delivery-address]')) {
    ensureCheckoutDeliveryState();
    const addressId = `address-${Date.now()}`;
    state.checkoutAddresses.push({ id: addressId, contact: '', company: '', street: '', city: '', region: '', postalCode: '', country: 'United States' });
    allocationFor(addressId);
    state.checkoutDeliveryMode = 'multiple';
    render();
    showToast('Delivery address added. Assign devices to it below.');
    return;
  }
  const removeDeliveryAddress = event.target.closest('[data-remove-delivery-address]');
  if (removeDeliveryAddress) {
    ensureCheckoutDeliveryState();
    const addressId = removeDeliveryAddress.dataset.removeDeliveryAddress;
    if (state.checkoutAddresses.length > 1) {
      const remainingAddress = state.checkoutAddresses.find(address => address.id !== addressId);
      state.cart.forEach(item => {
        allocationFor(remainingAddress.id)[item.product.id] = (Number(allocationFor(remainingAddress.id)[item.product.id]) || 0) + (Number(allocationFor(addressId)[item.product.id]) || 0);
      });
      state.checkoutAddresses = state.checkoutAddresses.filter(address => address.id !== addressId);
      delete state.checkoutAllocations[addressId];
      render();
      showToast('Delivery address removed. Its devices moved to the first address.');
    }
    return;
  }
  const shipping = event.target.closest('[data-shipping]');
  if (shipping) { state.checkoutShipping = shipping.dataset.shipping; render(); return; }
  const payment = event.target.closest('[data-payment]');
  if (payment) { state.checkoutPayment = payment.dataset.payment; render(); return; }
  const card = event.target.closest('[data-card-id]');
  if (card) { const cards = [{ id: 1, brand: 'Visa', last4: '9012' }, { id: 2, brand: 'Mastercard', last4: '4444' }, { id: 3, brand: 'American Express', last4: '8305' }]; state.savedCard = cards.find(item => item.id === Number(card.dataset.cardId)); render(); return; }
  const removeCard = event.target.closest('[data-remove-card]');
  if (removeCard) { state.savedCard = null; render(); return; }
  const remove = event.target.closest('[data-remove]');
  if (remove) { state.cart = state.cart.filter(item => item.product.id !== Number(remove.dataset.remove)); updateCartCount(); renderDrawer(); if (state.view === 'cart' || state.view === 'checkout') render(); return; }
  if (event.target.closest('[data-go-cart]')) { goTo('cart'); return; }
  if (event.target.closest('[data-proceed-checkout]')) { goTo('checkout'); return; }
  if (event.target.closest('[data-place-order]')) { submitOrder(); return; }
  if (event.target.closest('[data-clear-all]')) { state.category = 'All'; state.grade = []; state.carrier = []; state.storage = []; state.price = []; state.query = ''; render(); }
});

document.addEventListener('change', event => {
  const accountAddressField = event.target.closest('[data-account-address-field]');
  if (accountAddressField) { state.accountAddressDraft[accountAddressField.dataset.accountAddressField] = accountAddressField.value; return; }
  const addressField = event.target.closest('[data-address-field]');
  if (addressField) {
    const address = state.checkoutAddresses.find(item => item.id === addressField.dataset.addressId);
    if (address) address[addressField.dataset.addressField] = addressField.value;
    return;
  }
  const allocation = event.target.closest('[data-allocation-address]');
  if (allocation) {
    ensureCheckoutDeliveryState();
    const item = state.cart.find(entry => entry.product.id === Number(allocation.dataset.allocationProduct));
    if (!item) return;
    const addressId = allocation.dataset.allocationAddress;
    const requested = Math.min(item.quantity, Math.max(0, Number(allocation.value) || 0));
    const targetAllocations = allocationFor(addressId);
    const current = Number(targetAllocations[item.product.id]) || 0;
    const adjustment = requested - current;
    targetAllocations[item.product.id] = requested;
    if (adjustment > 0) {
      let unitsToMove = adjustment;
      state.checkoutAddresses.filter(address => address.id !== addressId).reverse().forEach(address => {
        if (!unitsToMove) return;
        const allocations = allocationFor(address.id);
        const available = Number(allocations[item.product.id]) || 0;
        const moved = Math.min(available, unitsToMove);
        allocations[item.product.id] = available - moved;
        unitsToMove -= moved;
      });
    } else if (adjustment < 0) {
      const receivingAddress = state.checkoutAddresses.find(address => address.id !== addressId);
      if (receivingAddress) {
        const allocations = allocationFor(receivingAddress.id);
        allocations[item.product.id] = (Number(allocations[item.product.id]) || 0) + Math.abs(adjustment);
      }
    }
    ensureCheckoutDeliveryState();
    render();
    return;
  }
  const sort = event.target.closest('#sort-products');
  if (sort) { state.sort = sort.value; render(); return; }
  const bidProduct = event.target.closest('#bid-product');
  if (bidProduct) {
    const product = productById(bidProduct.value);
    if (!product) return;
    state.selectedProduct = product;
    state.bidDraft = {
      productId: product.id,
      quantity: Number(document.querySelector('#bid-quantity')?.value) || 50,
      maximumPrice: Math.round(product.price * 0.92),
      expiry: document.querySelector('#bid-expiry')?.value || '7 days'
    };
    render();
    return;
  }
  const option = event.target.closest('[data-filter-option]');
  if (option) { const key = option.dataset.filterOption; state[key] = option.checked ? [...state[key], option.value] : state[key].filter(value => value !== option.value); render(); return; }
  const all = event.target.closest('[data-filter-all]');
  if (all && all.checked) { state[all.dataset.filterAll] = []; render(); }
});

document.addEventListener('input', event => {
  const accountAddressField = event.target.closest('[data-account-address-field]');
  if (accountAddressField) { state.accountAddressDraft[accountAddressField.dataset.accountAddressField] = accountAddressField.value; return; }
  const addressField = event.target.closest('[data-address-field]');
  if (addressField) {
    const address = state.checkoutAddresses.find(item => item.id === addressField.dataset.addressId);
    if (address) address[addressField.dataset.addressField] = addressField.value;
    return;
  }
  if (!event.target.matches('#bid-quantity, #bid-price')) return;
  const quantity = Math.max(1, Number(document.querySelector('#bid-quantity')?.value) || 0);
  const maximumPrice = Math.max(1, Number(document.querySelector('#bid-price')?.value) || 0);
  const quantitySummary = document.querySelector('#bid-summary-quantity');
  const priceSummary = document.querySelector('#bid-summary-price');
  const totalSummary = document.querySelector('#bid-summary-total');
  if (quantitySummary) quantitySummary.textContent = `${quantity} devices`;
  if (priceSummary) priceSummary.textContent = money(maximumPrice);
  if (totalSummary) totalSummary.textContent = money(quantity * maximumPrice);
  state.bidDraft = { ...state.bidDraft, quantity, maximumPrice };
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMobileNav(false);
});

initialiseCaseStudyScreen();
render();
renderDrawer();
