(()=>{
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const progress=document.getElementById("scrollProgress");
  function updateProgress(){
    if(!progress)return;
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,scrollY/max)):0})`;
  }
  updateProgress(); addEventListener("scroll",updateProgress,{passive:true}); addEventListener("resize",updateProgress);

  const targets=[...document.querySelectorAll(".principle-grid article,.work-card,.timeline article,.cap-grid article,.ecosystem-grid>div,.quote-card")];
  targets.forEach(x=>x.classList.add("reveal"));
  if(!reduce && "IntersectionObserver" in window){
    const obs=new IntersectionObserver((entries,o)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");o.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -35px 0px"});
    targets.forEach(x=>obs.observe(x));
  }else targets.forEach(x=>x.classList.add("visible"));

  const count=document.querySelector('[data-count="3"]');
  if(count && !reduce){
    count.textContent="0+";
    const start=performance.now();
    const run=now=>{
      const t=Math.min(1,(now-start)/800); const v=Math.round(3*(1-Math.pow(1-t,3)));
      count.textContent=v+"+";
      if(t<1)requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }

  // light hero parallax only on desktop
  const hero=document.querySelector(".hero-visual");
  const img=document.querySelector(".hero-visual img");
  if(hero&&img&&matchMedia("(hover:hover) and (pointer:fine)").matches&&!reduce){
    hero.addEventListener("pointermove",e=>{
      const r=hero.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5; const y=(e.clientY-r.top)/r.height-.5;
      img.style.transform=`scale(1.025) translate(${x*8}px,${y*5}px)`;
    });
    hero.addEventListener("pointerleave",()=>img.style.transform="");
  }
})();