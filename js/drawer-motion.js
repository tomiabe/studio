const drawerMotionDuration = 380;
const reduceDrawerMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

window.studioDrawerMotion = {
  open(drawer) {
    drawer.classList.remove('is-visible');
    drawer.showModal();

    if (reduceDrawerMotion.matches) {
      drawer.classList.add('is-visible');
      return;
    }

    requestAnimationFrame(() => requestAnimationFrame(() => drawer.classList.add('is-visible')));
  },

  close(drawer) {
    if (!drawer.open || drawer.dataset.closing === 'true') return;

    if (reduceDrawerMotion.matches) {
      drawer.close();
      return;
    }

    drawer.dataset.closing = 'true';
    drawer.classList.remove('is-visible');

    let timer;
    const finish = () => {
      clearTimeout(timer);
      drawer.removeEventListener('transitionend', onTransitionEnd);
      delete drawer.dataset.closing;
      if (drawer.open) drawer.close();
    };
    const onTransitionEnd = event => {
      if (event.target === drawer && event.propertyName === 'transform') finish();
    };

    drawer.addEventListener('transitionend', onTransitionEnd);
    timer = setTimeout(finish, drawerMotionDuration + 80);
  }
};
