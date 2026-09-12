document.addEventListener("DOMContentLoaded",()=>{
  const year=document.getElementById("year"); if(year) year.textContent=new Date().getFullYear();

  const button=document.getElementById("menuButton");
  const drawer=document.getElementById("mobileDrawer");
  const backdrop=document.getElementById("drawerBackdrop");
  const close=document.getElementById("drawerClose");

  function setDrawer(open){
    drawer?.classList.toggle("open",open);
    backdrop?.classList.toggle("open",open);
    drawer?.setAttribute("aria-hidden",String(!open));
    backdrop?.setAttribute("aria-hidden",String(!open));
    button?.setAttribute("aria-expanded",String(open));
    button?.setAttribute("aria-label",open?"Close navigation":"Open navigation");
    document.body.classList.toggle("drawer-open",open);
  }

  button?.addEventListener("click",()=>setDrawer(!drawer.classList.contains("open")));
  close?.addEventListener("click",()=>setDrawer(false));
  backdrop?.addEventListener("click",()=>setDrawer(false));
  drawer?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setDrawer(false)));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")setDrawer(false)});
  window.addEventListener("resize",()=>{if(innerWidth>980)setDrawer(false)});

  // Active desktop navigation
  const navLinks=[...document.querySelectorAll('.desktop-nav a[href^="#"]')];
  const sections=navLinks.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if("IntersectionObserver" in window){
    const navObs=new IntersectionObserver(entries=>{
      const active=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!active)return;
      navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${active.target.id}`));
    },{rootMargin:"-25% 0px -60% 0px",threshold:[0,.2,.5]});
    sections.forEach(s=>navObs.observe(s));
  }
});