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
