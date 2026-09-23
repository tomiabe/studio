(() => {
  'use strict';

  const mode = new URLSearchParams(window.location.search).get('demo');
  if (!mode) return;

  // The case study presents each prototype inside a fixed viewport. Keep wheel
  // movement contained within that viewport and remove browser chrome from the
  // embedded experience without changing the standalone prototype pages.
  document.documentElement.classList.add('case-demo-embed');
  document.body.classList.add('case-demo-embed');

  const scripts = {
    home: [
      { delay: 1800, selector: '#destination-search', value: 'Barcelona' },
      { delay: 4800, selector: '#search-form .search-button' }
    ],
    explore: [
      { delay: 1800, selector: '[data-view="experiences"]' },
      { delay: 6100, selector: '[data-layout="list"]' },
      { delay: 10600, selector: '#trip-launcher' }
    ],
    checkout: [
      { delay: 1800, selector: '#first-name', value: 'Tomi' },
      { delay: 4300, selector: '#last-name', value: 'Abe' },
      { delay: 6800, selector: '#email', value: 'tomi@example.com' },
      { delay: 9800, selector: '#card-number', value: '4242 4242 4242 4242' },
      { delay: 12300, selector: '#expiry', value: '10 / 28' },
      { delay: 14500, selector: '#terms' }
    ],
    trips: [
      { delay: 1800, selector: '[data-tab="messages"]' },
      { delay: 6100, selector: '[data-conversation="marta"]' },
      { delay: 9000, selector: '#message-input', value: 'Hello Marta, looking forward to the studio.' },
      { delay: 12300, selector: '#message-form button' }
    ]
  };

  if (!scripts[mode]) return;

  let timers = [];
  let repeatTimer;
  let active = false;
  let cursor;

  function notify(type) {
    if (window.parent !== window) window.parent.postMessage({ type: `fairbnb-demo:${type}`, demo: mode }, '*');
  }

  function createCursor() {
    if (cursor) return;
    cursor = document.createElement('span');
    cursor.className = 'case-demo-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.append(cursor);
  }

  function hideCursor() {
    cursor?.classList.remove('is-visible', 'is-pressing');
  }

  function stop(interrupted = false) {
    timers.forEach(timer => window.clearTimeout(timer));
    timers = [];
    window.clearTimeout(repeatTimer);
    repeatTimer = undefined;
    active = false;
    hideCursor();
    if (interrupted) notify('paused');
  }

  function moveTo(target) {
    if (!target || !cursor) return Promise.resolve();
    const scrollRoot = document.scrollingElement;
    const initialBounds = target.getBoundingClientRect();
    const targetTop = Math.max(0, (scrollRoot?.scrollTop || 0) + initialBounds.top - window.innerHeight * 0.43);
    scrollRoot?.scrollTo?.({ top: targetTop, behavior: 'smooth' });
    return new Promise(resolve => {
      window.setTimeout(() => {
        if (!active) return resolve();
        const bounds = target.getBoundingClientRect();
        cursor.style.transform = `translate(${Math.round(bounds.left + bounds.width / 2 - 6)}px, ${Math.round(bounds.top + bounds.height / 2 - 6)}px)`;
        cursor.classList.add('is-visible');
        window.setTimeout(() => {
          cursor?.classList.add('is-pressing');
          window.setTimeout(() => cursor?.classList.remove('is-pressing'), 180);
          resolve();
        }, 560);
      }, 440);
    });
  }

  function typeInto(target, value) {
    target.focus();
    target.value = '';
    [...value].forEach((character, index) => {
      timers.push(window.setTimeout(() => {
        if (!active) return;
        target.value += character;
        target.dispatchEvent(new Event('input', { bubbles: true }));
        if (index === value.length - 1) target.dispatchEvent(new Event('change', { bubbles: true }));
      }, index * 55));
    });
  }

  function runStep(step) {
    const target = document.querySelector(step.selector);
    if (!target) return;
    moveTo(target).then(() => {
      if (!active) return;
      if (step.value) typeInto(target, step.value);
      else target.click();
    });
  }

  function resetDemoState() {
    if (mode === 'explore') {
      document.getElementById('trip-close')?.click();
      document.scrollingElement?.scrollTo({ top: 0, behavior: 'auto' });
    }
  }

  function start() {
    stop();
    resetDemoState();
    active = true;
    createCursor();
    scripts[mode].forEach(step => {
      timers.push(window.setTimeout(() => {
        if (active) runStep(step);
      }, step.delay));
    });
    const endDelay = Math.max(...scripts[mode].map(step => step.delay)) + 1800;
    timers.push(window.setTimeout(() => {
      active = false;
      hideCursor();
      repeatTimer = window.setTimeout(start, 2500);
    }, endDelay));
  }

  const style = document.createElement('style');
  style.textContent = 'html.case-demo-embed,body.case-demo-embed{overscroll-behavior:contain;scrollbar-width:none;-ms-overflow-style:none}html.case-demo-embed::-webkit-scrollbar,body.case-demo-embed::-webkit-scrollbar{width:0;height:0;display:none}.case-demo-cursor{position:fixed;top:0;left:0;z-index:999;width:12px;height:12px;pointer-events:none;opacity:0;border:2px solid #fff;border-radius:50%;background:#00a552;box-shadow:0 0 0 1px rgb(0 0 0 / .14),0 2px 4px rgb(0 0 0 / .2);transform:translate(-48px,-48px);transition:transform .46s cubic-bezier(.2,.72,.28,1),opacity .16s ease}.case-demo-cursor::after{position:absolute;inset:-7px;border:1px solid #00a552;border-radius:inherit;content:"";opacity:0;transform:scale(.65);transition:opacity .14s ease,transform .22s ease}.case-demo-cursor.is-visible{opacity:1}.case-demo-cursor.is-pressing::after{opacity:.72;transform:scale(1)}@media (prefers-reduced-motion:reduce){.case-demo-cursor{transition:none}}';
  document.head.append(style);

  document.addEventListener('wheel', event => {
    const scrollRoot = document.scrollingElement;
    if (!scrollRoot) return;
    const atTop = scrollRoot.scrollTop <= 0;
    const atBottom = Math.ceil(scrollRoot.scrollTop + scrollRoot.clientHeight) >= scrollRoot.scrollHeight;
    if ((event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom)) event.preventDefault();
  }, { passive: false });

  document.addEventListener('pointerdown', event => {
    if (active && !event.target.closest('.case-demo-cursor')) stop(true);
  }, true);
  document.addEventListener('focusin', event => {
    if (active && !event.target.closest('.case-demo-cursor')) stop(true);
  }, true);
  window.addEventListener('message', event => {
    if (event.source === window.parent && event.data?.type === 'fairbnb-demo:start') start();
  });

  if (window.parent !== window) notify('ready');
  else window.setTimeout(start, 500);
})();
