(function(){
 const root=document.documentElement;
 const themeButton=document.querySelector('[data-theme-toggle]');
 const themeKey='studio-reel-theme-override';
 function automaticTheme(now){const hour=now.getHours();return hour>=19||hour<7?'dark':'light'}
 function nextBoundary(now){const next=new Date(now);if(now.getHours()>=19){next.setDate(next.getDate()+1);next.setHours(7,0,0,0)}else if(now.getHours()<7){next.setHours(7,0,0,0)}else{next.setHours(19,0,0,0)}return next.getTime()}
 function themeChoice(now){try{const choice=JSON.parse(localStorage.getItem(themeKey));if(choice&&choice.expires>now.getTime()&&(choice.theme==='light'||choice.theme==='dark'))return choice.theme}catch(e){}return automaticTheme(now)}
 function setTheme(theme){root.dataset.theme=theme;themeButton.setAttribute('aria-label','Switch to '+(theme==='dark'?'light':'dark')+' theme');themeButton.title='Switch theme until the next scheduled change';document.querySelector('meta[name="theme-color"]').setAttribute('content',theme==='dark'?'#131515':'#fffafb')}
 function refreshTheme(){setTheme(themeChoice(new Date()))}
 refreshTheme();
 themeButton.addEventListener('click',function(){const now=new Date(),next=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem(themeKey,JSON.stringify({theme:next,expires:nextBoundary(now)}))}catch(e){}setTheme(next)});
 window.setInterval(refreshTheme,60000);
 document.addEventListener('visibilitychange',function(){if(!document.hidden)refreshTheme()});
 window.addEventListener('focus',refreshTheme);
 const menuButton=document.querySelector('[data-menu-toggle]');
 const nav=document.getElementById('site-navigation');
 function closeMenu(){nav.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='Menu'}
 menuButton.addEventListener('click',function(){const open=nav.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'Close':'Menu'});
 nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeMenu)});
 document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu()});
 document.querySelectorAll('[data-reel-limit]').forEach(function(section){
   const limit=Number(section.dataset.reelLimit)||10;
   const entries=[...section.querySelectorAll('.reel-item')];
   const button=section.querySelector('[data-show-more]');
   if(!button||entries.length<=limit)return;
   entries.slice(limit).forEach(function(item){item.hidden=true});
   button.hidden=false;
   button.addEventListener('click',function(){
     const expanding=button.getAttribute('aria-expanded')!=='true';
     entries.slice(limit).forEach(function(item){item.hidden=!expanding});
     button.setAttribute('aria-expanded',String(expanding));
     button.textContent=expanding?button.dataset.lessLabel:button.dataset.moreLabel;
   });
 });
 const emailButton=document.querySelector('[data-copy-email]');
 const copyStatus=document.querySelector('[data-copy-status]');
 let copyTimer;
 async function copyEmail(value){
   if(navigator.clipboard&&navigator.clipboard.writeText){try{await navigator.clipboard.writeText(value);return}catch(e){}}
   const field=document.createElement('textarea');field.value=value;field.setAttribute('readonly','');field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();const copied=document.execCommand('copy');field.remove();if(!copied)throw new Error('Copy failed');
 }
 if(emailButton){emailButton.addEventListener('click',async function(){try{await copyEmail(emailButton.dataset.copyEmail);copyStatus.textContent='Copied';clearTimeout(copyTimer);copyTimer=setTimeout(function(){copyStatus.textContent=''},2500)}catch(e){copyStatus.textContent='Could not copy. Please select the email address.'}})}
 const topButton=document.querySelector('[data-back-to-top]');
 if(topButton){
   function updateTop(){const visible=window.scrollY>Math.max(600,window.innerHeight*.8);topButton.classList.toggle('is-visible',visible);topButton.tabIndex=visible?0:-1;topButton.setAttribute('aria-hidden',String(!visible))}
   topButton.addEventListener('click',function(){window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});
   window.addEventListener('scroll',updateTop,{passive:true});updateTop();
 }
 const header=document.querySelector('.site-header');
 let lastScroll=window.scrollY;
 function updateHeader(){
   const y=window.scrollY;
   header.classList.toggle('is-scrolled',y>140);
   if(y<30||nav.classList.contains('is-open')||header.contains(document.activeElement))header.classList.remove('is-hidden');
   else if(y>lastScroll)header.classList.add('is-hidden');
   else if(y<lastScroll)header.classList.remove('is-hidden');
   lastScroll=y;
 }
 window.addEventListener('scroll',updateHeader,{passive:true});
 menuButton.addEventListener('click',function(){header.classList.remove('is-hidden')});
 updateHeader();

 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
 const projectVideos=document.querySelectorAll('.reel-figure video');
 if(projectVideos.length){
   const observer=new IntersectionObserver(function(entries){
     entries.forEach(function(entry){
       const video=entry.target;
       if(reduceMotion.matches||!entry.isIntersecting){video.pause();return}
       video.play().catch(function(){});
     });
   },{threshold:.2});
   projectVideos.forEach(function(video){
     if(reduceMotion.matches){video.autoplay=false;video.pause();video.currentTime=0}
     observer.observe(video);
   });
 }

})();