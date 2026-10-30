(() => {
  const DURATION = { image: 7000, mosaic: 9000, statement: 6000, video: 15000 };
  const HOLD_DELAY = 180;
  const SWIPE_DISTANCE = 50;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stage = document.querySelector('[data-story]');
  const $ = selector => stage.querySelector(selector);
  const media = $('[data-story-media]');
  const progress = $('[data-story-progress]');
  const caption = $('[data-story-caption]');
  const toggleButton = $('[data-story-toggle]');
  const liveButton = $('[data-story-live]');
  const linkButton = $('[data-story-link]');
  const liveLayer = $('[data-story-live-layer]');
  const iframe = $('[data-story-iframe]');
  const tabs = $('[data-story-tabs]');
  const strip = $('[data-story-strip]');
  const sheet = document.querySelector('[data-story-sheet]');

  let reels = [];
  let stories = [];
  let storyIndex = 0;
  let frameIndex = 0;
  let elapsed = 0;
  let duration = DURATION.image;
  let lastTick = 0;
  let video = null;
  const pauses = new Set();

  const icons = () => window.lucide?.createIcons();
  const story = () => stories[storyIndex];
  const frame = () => story().frames[frameIndex];
  const thumbOf = item => {
    const first = item.frames.find(f => f.src || f.poster);
    return item.thumb || (first && (first.type === 'video' ? first.poster : first.src));
  };

  function el(tag, props = {}, children = []) {
    const node = Object.assign(document.createElement(tag), props);
    children.forEach(child => node.append(child));
    return node;
  }

  function setPause(reason, on) {
    if (on) pauses.add(reason); else pauses.delete(reason);
    const paused = pauses.size > 0;
    stage.classList.toggle('is-paused', paused);
    if (video) {
      if (paused) video.pause();
      else video.play().catch(() => {});
    }
    const userPaused = pauses.has('user');
    toggleButton.setAttribute('aria-label', userPaused ? 'Play' : 'Pause');
    toggleButton.innerHTML = `<i data-lucide="${userPaused ? 'play' : 'pause'}" aria-hidden="true"></i>`;
    icons();
  }

  function preload(src) {
    if (src) new Image().src = src;
  }

  function preloadNext() {
    const next = story().frames[frameIndex + 1] || stories[(storyIndex + 1) % stories.length].frames[0];
    preload(next.type === 'video' ? next.poster : next.src);
    next.srcs?.slice(0, 8).forEach(preload);
  }

  function buildMedia(item) {
    const node = el('div', { className: `story-frame${item.fit === 'contain' ? ' fit-contain' : ''}` });
    node.style.setProperty('--dur', `${duration}ms`);
    if (item.pos) node.style.setProperty('--pos', item.pos);
    const backdropSrc = item.type === 'video' ? item.poster : item.src || item.srcs?.[0];
    if (backdropSrc) node.append(el('img', { className: 'story-backdrop', src: backdropSrc, alt: '' }));
    const fg = el('div', { className: 'story-fg' });

    if (item.type === 'video') {
      const clip = el('video', { src: item.src, poster: item.poster || '', muted: true, playsInline: true, preload: 'auto', ariaLabel: item.alt || '' });
      clip.setAttribute('muted', '');
      clip.setAttribute('playsinline', '');
      clip.addEventListener('loadedmetadata', () => {
        if (video === clip) duration = Math.min(clip.duration * 1000, item.max || DURATION.video);
      });
      clip.addEventListener('error', () => { if (video === clip) video = null; });
      video = clip;
      fg.append(clip);
    } else if (item.type === 'mosaic') {
      const track = el('div', { className: 'story-mosaic-track' }, item.srcs.concat(item.srcs).map(src => el('img', { src, alt: '', decoding: 'async' })));
      fg.append(el('div', { className: 'story-mosaic', role: 'img', ariaLabel: item.alt || '' }, [track]));
    } else if (item.type === 'statement') {
      const icon = el('i');
      icon.setAttribute('data-lucide', item.icon || 'sparkles');
      icon.setAttribute('aria-hidden', 'true');
      fg.append(el('div', { className: 'story-statement' }, [icon]));
    } else {
      fg.append(el('img', { src: item.src, alt: item.alt || '', decoding: 'async' }));
    }
    node.append(fg);
    return node;
  }

  function renderFrame(index) {
    closeLive(false);
    frameIndex = index;
    elapsed = 0;
    video = null;
    const item = frame();
    duration = item.duration || DURATION[item.type] || DURATION.image;

    [...progress.children].forEach((segment, i) => {
      segment.firstChild.style.transform = `scaleX(${i < index ? 1 : 0})`;
    });

    const previous = [...media.children];
    const next = buildMedia(item);
    media.append(next);
    icons();
    const reveal = () => requestAnimationFrame(() => {
      next.classList.add('is-in');
      setTimeout(() => previous.forEach(node => node.remove()), 500);
    });
    const firstImage = next.querySelector('.story-fg img, .story-backdrop');
    if (firstImage && !firstImage.complete) {
      firstImage.addEventListener('load', reveal, { once: true });
      firstImage.addEventListener('error', reveal, { once: true });
    } else reveal();

    caption.classList.add('is-changing');
    requestAnimationFrame(() => {
      $('[data-story-kicker]').textContent = [story().frames.length > 1 ? `${index + 1} / ${story().frames.length}` : '', item.kicker].filter(Boolean).join('  ·  ');
      $('[data-story-text]').textContent = item.caption || '';
      requestAnimationFrame(() => caption.classList.remove('is-changing'));
    });
    liveButton.hidden = !item.live;

    setPause('user', pauses.has('user'));
    preloadNext();
  }

  function renderStory(index, startFrame = 0) {
    storyIndex = (index + stories.length) % stories.length;
    const current = story();

    progress.replaceChildren(...current.frames.map(() => el('span', {}, [el('i')])));
    $('[data-story-avatar]').src = thumbOf(current) || '/favicon.png';
    $('[data-story-title]').textContent = current.title;
    $('[data-story-sub]').textContent = [current.label, current.year].filter(Boolean).join('  ·  ');
    linkButton.href = current.link;
    linkButton.firstElementChild.textContent = current.linkLabel || 'Visit';
    linkButton.hidden = !current.link;

    [...tabs.children].forEach(tab => {
      const selected = tab.dataset.reel === current.reel.id;
      tab.setAttribute('aria-selected', String(selected));
      tab.querySelector('small').textContent = selected ? `${current.reelIndex + 1}/${current.reel.stories.length}` : '';
    });
    renderStrip();

    if (location.hash.slice(1) !== current.id) history.replaceState(null, '', `#${current.id}`);
    renderFrame(Math.min(startFrame, current.frames.length - 1));
  }

  function renderStrip() {
    const current = story();
    strip.replaceChildren(...current.reel.stories.map(item => {
      const thumb = thumbOf(item);
      const button = el('button', { type: 'button', title: item.title, ariaLabel: `Play ${item.title}` }, [thumb ? el('img', { src: thumb, alt: '', loading: 'lazy' }) : el('span', { textContent: item.title[0] })]);
      if (item === current) button.setAttribute('aria-current', 'true');
      button.addEventListener('click', () => renderStory(stories.indexOf(item)));
      return button;
    }));
    strip.querySelector('[aria-current]')?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  function next() {
    if (frameIndex < story().frames.length - 1) renderFrame(frameIndex + 1);
    else renderStory(storyIndex + 1);
  }

  function prev() {
    if (frameIndex > 0) renderFrame(frameIndex - 1);
    else renderStory(storyIndex - 1);
  }

  function tick(now) {
    const delta = lastTick ? now - lastTick : 0;
    lastTick = now;
    if (stories.length && pauses.size === 0) {
      if (video) {
        if (video.readyState >= 2) elapsed = video.currentTime * 1000;
        if (video.ended) elapsed = duration;
      } else elapsed += delta;
      const segment = progress.children[frameIndex]?.firstChild;
      if (segment) segment.style.transform = `scaleX(${Math.min(elapsed / duration, 1)})`;
      if (elapsed >= duration) next();
    }
    requestAnimationFrame(tick);
  }

  function openLive() {
    const item = frame();
    if (!item.live) return;
    iframe.src = item.live;
    $('[data-story-live-title]').textContent = `${story().title}, live`;
    $('[data-story-live-open]').href = item.live;
    liveLayer.hidden = false;
    setPause('live', true);
    icons();
    $('[data-story-live-close]').focus();
  }

  function closeLive(focus = true) {
    if (liveLayer.hidden) return;
    liveLayer.hidden = true;
    iframe.src = 'about:blank';
    setPause('live', false);
    if (focus) liveButton.focus();
  }

  function openSheet() {
    const current = story();
    sheet.querySelector('[data-sheet-label]').textContent = [current.label, current.reel.label].join('  ·  ');
    sheet.querySelector('[data-sheet-title]').textContent = current.title;
    sheet.querySelector('[data-sheet-summary]').textContent = current.summary || '';
    const facts = [['Role', current.role], ['Period', current.year], ['Focus', current.focus]].filter(([, value]) => value);
    sheet.querySelector('[data-sheet-facts]').replaceChildren(...facts.map(([term, value]) => el('div', {}, [el('dt', { textContent: term }), el('dd', { textContent: value })])));
    const links = [];
    const link = (href, label, external) => {
      const a = el('a', { className: 'inline-link', href, innerHTML: `${label} <i data-lucide="${external ? 'arrow-up-right' : 'arrow-right'}" aria-hidden="true"></i>` });
      if (external) Object.assign(a, { target: '_blank', rel: 'noopener noreferrer' });
      links.push(a);
    };
    if (current.page) link(current.page, current.pageLabel || 'Read more', false);
    const live = current.frames.find(f => f.live)?.live;
    if (live && live.startsWith('/')) link(live, 'Open the working prototype', false);
    if (current.link) link(current.link, current.linkLabel || 'Visit', true);
    sheet.querySelector('[data-sheet-links]').replaceChildren(...links);
    icons();
    setPause('sheet', true);
    sheet.showModal();
  }

  sheet.addEventListener('close', () => setPause('sheet', false));
  sheet.addEventListener('click', event => { if (event.target === sheet) sheet.close(); });
  sheet.querySelector('[data-story-sheet-close]').addEventListener('click', () => sheet.close());

  function buildIndex() {
    const container = document.querySelector('[data-story-index]');
    container.replaceChildren(...reels.flatMap(reel => [
      el('h3', { textContent: reel.label }),
      el('ul', { className: 'story-index-list' }, reel.stories.map(item => {
        const thumb = thumbOf(item);
        const arrow = el('i');
        arrow.setAttribute('data-lucide', 'play');
        arrow.setAttribute('aria-hidden', 'true');
        const button = el('button', { type: 'button' }, [
          el('span', { className: 'story-index-thumb' }, thumb ? [el('img', { src: thumb, alt: '', loading: 'lazy' })] : []),
          el('span', {}, [el('strong', { textContent: item.title }), el('small', { textContent: [item.label, item.year].filter(Boolean).join('  ·  ') })]),
          el('p', { textContent: item.summary || '' }),
          arrow
        ]);
        button.addEventListener('click', () => {
          renderStory(stories.indexOf(item));
          window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
          stage.focus({ preventScroll: true });
        });
        return el('li', {}, [button]);
      }))
    ]));
  }

  function buildTabs() {
    tabs.replaceChildren(...reels.map(reel => {
      const tab = el('button', { type: 'button', role: 'tab' }, [reel.label, el('small')]);
      tab.dataset.reel = reel.id;
      tab.addEventListener('click', () => renderStory(stories.indexOf(reel.stories[0])));
      return tab;
    }));
  }

  // Tap left third to go back, elsewhere to advance; press and hold to pause; swipe between stories.
  const tap = $('[data-story-tap]');
  let pointer = null;
  tap.addEventListener('pointerdown', event => {
    pointer = { x: event.clientX, y: event.clientY, held: false };
    pointer.timer = setTimeout(() => { pointer.held = true; setPause('hold', true); }, HOLD_DELAY);
  });
  const endPointer = event => {
    if (!pointer) return;
    clearTimeout(pointer.timer);
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    if (pointer.held) setPause('hold', false);
    if (event.type === 'pointerup') {
      if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) renderStory(storyIndex + (dx < 0 ? 1 : -1));
      else if (dy < -SWIPE_DISTANCE && Math.abs(dy) > Math.abs(dx)) openSheet();
      else if (!pointer.held) {
        const rect = stage.getBoundingClientRect();
        if (event.clientX - rect.left < rect.width / 3) prev(); else next();
      }
    }
    pointer = null;
  };
  tap.addEventListener('pointerup', endPointer);
  tap.addEventListener('pointercancel', endPointer);
  tap.addEventListener('contextmenu', event => event.preventDefault());

  $('[data-story-prev]').addEventListener('click', prev);
  $('[data-story-next]').addEventListener('click', next);
  toggleButton.addEventListener('click', () => setPause('user', !pauses.has('user')));
  liveButton.addEventListener('click', openLive);
  $('[data-story-live-close]').addEventListener('click', () => closeLive());
  $('[data-story-more]').addEventListener('click', openSheet);

  document.addEventListener('keydown', event => {
    if (sheet.open || !liveLayer.hidden && event.key !== 'Escape') return;
    if (stage.getBoundingClientRect().bottom < innerHeight / 2) return;
    if (event.target.closest('input, textarea, select, iframe')) return;
    const actions = {
      ArrowRight: next,
      ArrowLeft: prev,
      ArrowDown: () => renderStory(storyIndex + 1),
      ArrowUp: () => renderStory(storyIndex - 1),
      ' ': () => setPause('user', !pauses.has('user')),
      k: () => setPause('user', !pauses.has('user')),
      i: openSheet,
      Escape: () => closeLive()
    };
    const action = actions[event.key];
    if (!action || (event.target.closest('button, a') && (event.key === ' ' || event.key === 'Enter'))) return;
    event.preventDefault();
    action();
  });

  window.addEventListener('hashchange', () => {
    const target = stories.findIndex(item => item.id === location.hash.slice(1));
    if (target >= 0 && target !== storyIndex) renderStory(target);
  });

  document.addEventListener('visibilitychange', () => setPause('hidden', document.hidden));
  new IntersectionObserver(([entry]) => setPause('offscreen', !entry.isIntersecting), { threshold: 0.4 }).observe(stage);

  stage.tabIndex = -1;

  fetch('/content/stories.json')
    .then(response => response.json())
    .then(data => {
      reels = data.reels;
      stories = reels.flatMap(reel => reel.stories.map((item, reelIndex) => Object.assign(item, { reel, reelIndex })));
      buildTabs();
      buildIndex();
      const fromHash = stories.findIndex(item => item.id === location.hash.slice(1));
      if (reduceMotion) setPause('user', true);
      renderStory(Math.max(fromHash, 0));
      if (!reduceMotion) {
        const hint = $('[data-story-hint]');
        hint.hidden = false;
        hint.addEventListener('animationend', () => { hint.hidden = true; }, { once: true });
      }
      icons();
      requestAnimationFrame(tick);
    });

  window.addEventListener('load', icons);
})();
