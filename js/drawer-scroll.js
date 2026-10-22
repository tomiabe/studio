window.initStudioDrawerScroll = function (dialog) {
  if (!globalThis.Lenis || !dialog) return null;

  let viewport = dialog.querySelector('.drawer-scroll-area');
  let content = viewport?.querySelector('.drawer-scroll-content');
  if (!viewport) {
    viewport = document.createElement('div');
    viewport.className = 'drawer-scroll-area';
    content = document.createElement('div');
    content.className = 'drawer-scroll-content';
    while (dialog.firstChild) content.append(dialog.firstChild);
    viewport.append(content);
    dialog.append(viewport);
  }

  const lenis = new Lenis({
    wrapper: viewport,
    content,
    eventsTarget: viewport,
    autoRaf: true,
    anchors: true,
    stopInertiaOnNavigate: true
  });
  lenis.stop();

  const controller = {
    start() {
      requestAnimationFrame(() => {
        lenis.resize();
        lenis.start();
      });
    },
    stop() {
      lenis.stop();
    }
  };

  dialog.addEventListener('close', controller.stop);
  return controller;
};

window.studioDrawerScrolls = new Map(
  [...document.querySelectorAll('.work-drawer')].map(dialog => [dialog, window.initStudioDrawerScroll(dialog)])
);
