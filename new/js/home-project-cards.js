(function(){
  const brandColors={
    susinsight:'#2e6f5b','whats-poppin':'#FFFF43',wecollect:'#4747d6',zeproc:'#1a37a6',translayte:'#00303f',fairbnb:'#00b351',eze:'#1269da',
    canvas:'#0B0B0D',polish:'#212529','sound-atlas':'#2d353c','urban-climate':'#46351f',zonify:'#171b22',
    'nigeria-embassy':'#3b4f57','smart-expense':'#4c3d64',nairawatch:'#101529',jtf23:'#701b24',acquario:'#1b283c',webhunt:'#173333'
  };
  const cards=[...document.querySelectorAll('#work-items .reel-item, #projects-items .reel-item')];

  cards.forEach(function(card,index){
    const summary=card.querySelector('.reel-detail summary');
    const figure=card.querySelector('.reel-figure');
    const expanded=card.querySelector('.reel-expanded');
    if(!summary||!figure||!expanded)return;

    const meta=summary.querySelector('.reel-meta');
    const caption=summary.querySelector('.reel-caption');
    const image=figure.querySelector('img,video');
    const projectId=card.id;
    const panelId='card-details-'+projectId;
    card.classList.add('project-card');
    card.style.setProperty('--brand',brandColors[projectId]||'#29332e');
    card.style.setProperty('--card-order',String(index));

    const toggle=document.createElement('button');
    toggle.type='button';
    toggle.className='project-toggle';
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-controls',panelId);

    const visual=document.createElement('span');
    visual.className='reel-figure project-visual';
    if(image){
      image.classList.add('project-art');
      image.removeAttribute('width');
      image.removeAttribute('height');
      visual.appendChild(image);
    }

    const copy=document.createElement('span');
    copy.className='project-copy reel-detail';
    if(meta){
      const cardMeta=meta.cloneNode(true);
      cardMeta.className='project-meta reel-meta';
      copy.appendChild(cardMeta);
    }
    if(caption){
      const title=caption.querySelector('strong');
      const description=caption.querySelector('span');
      const cardTitle=document.createElement('span');
      cardTitle.className='project-title';
      cardTitle.textContent=title?title.textContent.trim():projectId;
      copy.appendChild(cardTitle);
      if(description){
        const cardSummary=document.createElement('span');
        cardSummary.className='project-summary';
        cardSummary.textContent=description.textContent.trim();
        copy.appendChild(cardSummary);
      }
    }

    const role=expanded.querySelector('.reel-role');
    if(role){
      const roleText=role.cloneNode(true);
      roleText.querySelectorAll('span').forEach(function(label){label.remove()});
      const roleLine=document.createElement('span');
      roleLine.className='project-role';
      roleLine.textContent=roleText.textContent.trim();
      copy.appendChild(roleLine);
      role.remove();
    }

    const action=document.createElement('span');
    action.className='project-action';
    action.innerHTML='<span class="more-label">More information</span><span class="less-label">Less information</span>';
    copy.appendChild(action);
    toggle.append(visual,copy);

    const panel=document.createElement('div');
    panel.className='project-more';
    panel.id=panelId;
    panel.setAttribute('aria-hidden','true');
    panel.inert=true;
    const inner=document.createElement('div');
    inner.className='project-more-inner reel-expanded';
    const links=[...expanded.querySelectorAll(':scope > a')];
    const linksWrap=document.createElement('div');
    linksWrap.className='project-links';
    links.forEach(function(link){linksWrap.appendChild(link)});
    while(expanded.firstChild)inner.appendChild(expanded.firstChild);
    if(linksWrap.childElementCount)inner.appendChild(linksWrap);
    panel.appendChild(inner);

    const oldFigure=card.querySelector(':scope > .reel-figure');
    const oldDetails=card.querySelector(':scope > .reel-detail');
    oldFigure.remove();
    oldDetails.remove();
    card.replaceChildren(toggle,panel);
  });

  cards.forEach(function(card){
    const trigger=card.querySelector('.project-toggle');
    const panel=card.querySelector('.project-more');
    if(!trigger||!panel)return;

    trigger.addEventListener('click',function(){
      const opening=!card.classList.contains('is-open');
      cards.forEach(function(item){
        const itemTrigger=item.querySelector('.project-toggle');
        const itemPanel=item.querySelector('.project-more');
        const active=item===card&&opening;
        if(item===card&&!opening&&(item.matches(':hover')||item.contains(document.activeElement)))item.classList.add('is-hover-suppressed');
        if(active)item.classList.remove('is-hover-suppressed');
        item.classList.toggle('is-open',active);
        item.classList.toggle('is-active',active);
        itemTrigger.setAttribute('aria-expanded',String(active));
        itemPanel.setAttribute('aria-hidden',String(!active));
        itemPanel.inert=!active;
      });
    });

    card.addEventListener('pointerleave',function(){
      if(!card.contains(document.activeElement))card.classList.remove('is-hover-suppressed');
    });
    trigger.addEventListener('blur',function(){
      if(!card.matches(':hover'))card.classList.remove('is-hover-suppressed');
    });
  });
})();
