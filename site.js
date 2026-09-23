(function(){
  var nav=document.querySelector('.site-nav');
  var hero=document.querySelector('.hero-card');
  if(!nav||!hero) return;
  var last=0;
  addEventListener('scroll',function(){
    var y=scrollY, heroH=hero.offsetHeight;
    if(y>heroH*0.6){
      nav.classList.add('fixed');
      if(y>last){nav.classList.add('hidden')}else{nav.classList.remove('hidden')}
    }else{
      nav.classList.remove('fixed');nav.classList.remove('hidden');
    }
    last=y;
  },{passive:true});
})();

(function(){
  var sec=document.getElementById('how-it-works'); if(!sec) return;
  var lines=sec.querySelectorAll('.curve-line');
  var drinkPath=sec.querySelector('.curve-line.drink'), qPath=sec.querySelector('.curve-line.q');
  var clipRect=sec.querySelector('#curveClip rect');
  var dotDrink=sec.querySelector('.curve-dot.drink'), dotQ=sec.querySelector('.curve-dot.q');
  var notes=sec.querySelectorAll('.curve-note'), axis=sec.querySelectorAll('.curve-axis span'), nums=sec.querySelectorAll('.curve-nums div');
  var drinkLen=drinkPath.getTotalLength(), qLen=qPath.getTotalLength();

  function place(dot,path,len,t){
    var pt=path.getPointAtLength(len*t);
    dot.style.left=(pt.x/10)+'%'; dot.style.top=(pt.y/4)+'%';
  }
  function render(p){
    /* p is scroll progress 0..1, t is how much of the day has been drawn */
    var t=Math.min(1,Math.max(0,(p-0.06)/0.78));
    for(var i=0;i<lines.length;i++) lines[i].style.strokeDashoffset=1-t;
    clipRect.setAttribute('width',1000*t);
    place(dotDrink,drinkPath,drinkLen,t); place(dotQ,qPath,qLen,t);
    dotDrink.classList.toggle('on',t>0); dotQ.classList.toggle('on',t>0);
    for(i=0;i<notes.length;i++) notes[i].classList.toggle('on',t>=parseFloat(notes[i].dataset.at));
    for(i=0;i<axis.length;i++) axis[i].classList.toggle('on',t>=parseFloat(axis[i].dataset.x));
    for(i=0;i<nums.length;i++) nums[i].classList.toggle('on',p>=0.86+i*0.04);
  }

  if(matchMedia('(prefers-reduced-motion: reduce)').matches){
    render(1); return;
  }

  sec.classList.add('js');
  var target=0,cur=0,raf=null;
  function measure(){
    var total=sec.offsetHeight-innerHeight; if(total<=0){target=1}
    else{target=Math.min(1,Math.max(0,-sec.getBoundingClientRect().top/total))}
    if(!raf) raf=requestAnimationFrame(tick);
  }
  function tick(){
    cur+=(target-cur)*0.14;
    if(Math.abs(target-cur)<0.0004){cur=target;raf=null}else{raf=requestAnimationFrame(tick)}
    render(cur);
  }
  addEventListener('scroll',measure,{passive:true});
  addEventListener('resize',measure);
  measure();
})();

(function(){
  /* touch devices: first tap opens the tile's hover state, tapping the pill follows the link */
  if(!matchMedia('(hover: none)').matches) return;
  var tiles=Array.prototype.slice.call(document.querySelectorAll('.tile.swap'));
  function closeAll(except){tiles.forEach(function(t){if(t!==except)t.classList.remove('is-open')})}
  tiles.forEach(function(t){
    t.addEventListener('click',function(e){
      if(e.target.closest('.buy')) return;
      var open=t.classList.contains('is-open');
      closeAll(t); t.classList.toggle('is-open',!open);
    });
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.tile.swap')) closeAll()});
})();

(function(){
  /* product page: flavor takeover, gallery, plan toggle, quantity, sticky buy bar */
  var stage=document.querySelector('.pdp-stage'); if(!stage) return;
  var chips=stage.querySelectorAll('.chips button');
  var main=stage.querySelector('.gallery .main img');
  var thumbs=stage.querySelectorAll('.gallery .thumbs button');
  var title=stage.querySelector('h1'), outcome=stage.querySelector('.outcome'), desc=stage.querySelector('.desc');
  var chosen=stage.querySelector('.flavors h4 span');
  var bar=document.querySelector('.buy-bar');

  function swapMain(src){
    if(main.getAttribute('src')===src) return;
    main.classList.add('fade');
    setTimeout(function(){main.setAttribute('src',src);main.onload=function(){main.classList.remove('fade')}},220);
  }
  function selectThumb(btn){
    for(var i=0;i<thumbs.length;i++) thumbs[i].classList.toggle('on',thumbs[i]===btn);
    swapMain(btn.dataset.full);
  }
  thumbs.forEach(function(t){t.addEventListener('click',function(){selectThumb(t)})});

  chips.forEach(function(c){
    c.addEventListener('click',function(){
      chips.forEach(function(x){x.classList.toggle('on',x===c)});
      stage.style.setProperty('--accent',c.dataset.accent);
      stage.style.setProperty('--tint',c.dataset.tint);
      title.innerHTML=c.dataset.title;
      outcome.innerHTML=c.dataset.outcome;
      desc.innerHTML=c.dataset.desc;
      chosen.textContent=c.dataset.name;
      thumbs[0].dataset.full=c.dataset.pack; thumbs[0].querySelector('img').src=c.dataset.pack;
      thumbs[1].dataset.full=c.dataset.inside; thumbs[1].querySelector('img').src=c.dataset.inside;
      selectThumb(thumbs[0]);
      if(bar) bar.querySelector('.who b').textContent=c.dataset.name;
      var tn=document.querySelector('.taste .tnotes'), tl=document.querySelector('.taste .notes h4 span');
      if(tn&&c.dataset.notes){tn.innerHTML=c.dataset.notes; tl.textContent=c.dataset.name}
      document.title='quantum, '+c.dataset.name;
    });
  });

  var plans=stage.querySelectorAll('.plan label');
  plans.forEach(function(l){l.addEventListener('click',function(){plans.forEach(function(x){x.classList.toggle('on',x===l)})})});

  var out=stage.querySelector('.qty-box output');
  stage.querySelectorAll('.qty-box button').forEach(function(b){
    b.addEventListener('click',function(){
      var n=parseInt(out.value||out.textContent,10)+(b.dataset.step==='-'?-1:1);
      out.textContent=Math.max(1,n);
    });
  });

  if(bar){
    var panel=stage.querySelector('.buy-panel');
    addEventListener('scroll',function(){
      bar.classList.toggle('show',panel.getBoundingClientRect().bottom<0);
    },{passive:true});
  }
})();

(function(){
  /* ingredient flex: one row open at a time */
  var rows=document.querySelectorAll('.ingredients details'); if(!rows.length) return;
  rows.forEach(function(d){
    d.addEventListener('toggle',function(){
      if(d.open) rows.forEach(function(o){if(o!==d) o.open=false});
    });
  });
})();

(function(){
  /* moment selector tabs */
  var wrap=document.querySelector('.moments'); if(!wrap) return;
  var tabs=wrap.querySelectorAll('.moment-tabs button');
  var img=wrap.querySelector('.pic img'), when=wrap.querySelector('.when'), h3=wrap.querySelector('.copy h3'), p=wrap.querySelector('.copy p');
  tabs.forEach(function(t){
    t.addEventListener('click',function(){
      if(t.classList.contains('on')) return;
      tabs.forEach(function(x){x.classList.toggle('on',x===t)});
      img.classList.add('fade');
      setTimeout(function(){
        img.setAttribute('src',t.dataset.img);
        when.textContent=t.dataset.when; h3.textContent=t.dataset.title; p.textContent=t.dataset.line;
        img.onload=function(){img.classList.remove('fade')};
      },260);
    });
  });
})();

(function(){
  /* subscribe reprise: jump to the plan toggle with subscribe selected */
  var go=document.querySelector('.subscribe .add'); if(!go) return;
  go.addEventListener('click',function(e){
    e.preventDefault();
    var plans=document.querySelectorAll('.plan label');
    plans.forEach(function(l,i){l.classList.toggle('on',i===1); var r=l.querySelector('input'); if(r) r.checked=(i===1)});
    var panel=document.querySelector('.buy-panel');
    window.scrollTo({top:panel.offsetTop-80,behavior:'smooth'});
  });
})();

(function(){
  /* faq: one open at a time */
  var rows=document.querySelectorAll('.faq details'); if(!rows.length) return;
  rows.forEach(function(d){d.addEventListener('toggle',function(){if(d.open) rows.forEach(function(o){if(o!==d) o.open=false})})});
})();

(function(){
  /* hero slider: slow crossfade, pauses on hover, static under reduced motion */
  var wrap=document.querySelector('.hero-slides'); if(!wrap) return;
  var slides=wrap.querySelectorAll('img'), dots=document.querySelectorAll('.hero-dots button');
  if(slides.length<2) return;
  var i=0,timer=null,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function show(n){
    i=(n+slides.length)%slides.length;
    slides.forEach(function(s,k){s.classList.toggle('on',k===i)});
    dots.forEach(function(d,k){d.classList.toggle('on',k===i)});
  }
  function start(){ if(reduce||timer) return; timer=setInterval(function(){show(i+1)},5600); }
  function stop(){ clearInterval(timer); timer=null; }
  dots.forEach(function(d,k){d.addEventListener('click',function(){show(k);stop();start()})});
  var hero=wrap.parentNode;
  hero.addEventListener('mouseenter',stop); hero.addEventListener('mouseleave',start);
  document.addEventListener('visibilitychange',function(){document.hidden?stop():start()});
  start();
})();
