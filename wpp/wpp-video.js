(function () {
  const videos = document.querySelectorAll('[data-play-in-view]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!videos.length) return;

  if (!('IntersectionObserver' in window) || reducedMotion.matches) {
    videos.forEach((video) => {
      video.controls = true;
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && !reducedMotion.matches && document.visibilityState === 'visible') {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.2 });

  videos.forEach((video) => observer.observe(video));

  document.addEventListener('visibilitychange', () => {
    videos.forEach((video) => {
      if (document.hidden) {
        video.pause();
        return;
      }

      const bounds = video.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        video.play().catch(() => {});
      }
    });
  });
})();
