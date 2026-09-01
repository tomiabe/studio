(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reducedMotion.matches || !window.Lenis) return;

  const lenis = new window.Lenis({
    autoRaf: true,
    duration: 1.05,
    easing: (progress) => Math.min(1, 1.001 - Math.pow(2, -10 * progress)),
    smoothWheel: true,
    syncTouch: false
  });

  const syncScrollState = () => {
    const overlayOpen = document.body.classList.contains('menu-open') || document.body.classList.contains('drawer-open');
    if (overlayOpen) lenis.stop();
    else lenis.start();
  };

  const observer = new MutationObserver(syncScrollState);
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) lenis.stop();
    else lenis.start();
  });
  window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
})();
