const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  toggle.textContent = open ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();


// Draggable client portfolio carousel with keyboard and arrow controls.
document.querySelectorAll('.client-carousel').forEach(carousel => {
  const track=carousel.querySelector('.client-track');
  const prev=carousel.querySelector('.prev');
  const next=carousel.querySelector('.next');
  const step=()=>Math.max(260,Math.round(track.clientWidth*.78));
  prev.addEventListener('click',()=>track.scrollBy({left:-step(),behavior:'smooth'}));
  next.addEventListener('click',()=>track.scrollBy({left:step(),behavior:'smooth'}));
  let down=false,startX=0,scrollLeft=0;
  track.addEventListener('pointerdown',e=>{if(e.target.closest('a')) return;down=true;startX=e.clientX;scrollLeft=track.scrollLeft;track.classList.add('dragging');track.setPointerCapture(e.pointerId);});
  track.addEventListener('pointermove',e=>{if(!down)return;track.scrollLeft=scrollLeft-(e.clientX-startX);});
  const stop=()=>{down=false;track.classList.remove('dragging');};
  track.addEventListener('pointerup',stop);track.addEventListener('pointercancel',stop);track.addEventListener('lostpointercapture',stop);
  track.addEventListener('keydown',e=>{if(e.key==='ArrowRight')track.scrollBy({left:step(),behavior:'smooth'});if(e.key==='ArrowLeft')track.scrollBy({left:-step(),behavior:'smooth'});});
});
// Deter casual image saving via context menu and drag. This cannot prevent screenshots or developer-tools access.
document.addEventListener('contextmenu',e=>{if(e.target.closest('img,.brand-logo'))e.preventDefault();});
document.addEventListener('dragstart',e=>{if(e.target.closest('img'))e.preventDefault();});
document.querySelectorAll('img').forEach(img=>{img.draggable=false;img.setAttribute('draggable','false');});
