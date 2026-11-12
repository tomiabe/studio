(function(){
  const gallery=document.querySelector('.creative-gallery-track');
  const grid=gallery&&gallery.querySelector('.creative-gallery-grid');
  if(grid){const copy=grid.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.querySelectorAll('img').forEach(function(img){img.alt='';img.loading='lazy'});gallery.append(copy)}
  const topButton=document.querySelector('[data-back-to-top]');
  if(topButton){const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');function update(){const visible=window.scrollY>Math.max(600,window.innerHeight*.8);topButton.classList.toggle('is-visible',visible);topButton.tabIndex=visible?0:-1;topButton.setAttribute('aria-hidden',String(!visible))}topButton.addEventListener('click',function(){if(window.Lenis&&!reduce.matches)window.Lenis.scrollTo(0);else window.scrollTo({top:0,behavior:reduce.matches?'auto':'smooth'})});window.addEventListener('scroll',update,{passive:true});update()}
})();
