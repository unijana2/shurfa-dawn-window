(function(){'use strict';const go=()=>{const $=s=>document.querySelector(s);const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const observe=(els,fn,options={threshold:.22})=>{if(!('IntersectionObserver' in window)){els.forEach(fn);return}const o=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){fn(e.target);o.unobserve(e.target)}}),options);els.forEach(e=>o.observe(e))};
const bulb=$('.idea-bulb');if(bulb){observe([bulb],x=>{x.classList.add('shurfa-ignite');const lit=x.querySelector('.idea-bulb-lit');if(lit){lit.classList.add('is-visible');lit.style.opacity='1'}},{threshold:.6})}
const method=$('.impact-methods');if(method){method.textContent='طرق قياس أثر البرنامج';const notes=document.createElement('div');notes.className='shurfa-methods';['الاستبانات','القياس','الملاحظة'].forEach(t=>{const e=document.createElement('span');e.className='shurfa-method';e.textContent=t;notes.append(e)});method.append(notes)}
observe(Array.from(document.querySelectorAll('.impact-item,.chat-bubble')),e=>{e.classList.add('shurfa-in');if(e.matches('.chat-bubble'))e.classList.add('shurfa-message')},{threshold:.27});
const cover=$('.coverage-inner');if(cover){const decor=document.createElement('div');decor.className='shurfa-stickers';decor.setAttribute('aria-hidden','true');['camera-star.webp','pin.webp','camera-star.webp'].forEach((src,i)=>{const im=document.createElement('img');im.src=src;im.alt='';im.loading='lazy';decor.append(im)});const title=cover.querySelector('.coverage-title');if(title)title.after(decor)}
const out=$('.outputs-stage');if(out){const dec=document.createElement('div');dec.className='shurfa-suitcase-decor';dec.setAttribute('aria-hidden','true');['✦','✉','✧','✦'].forEach(s=>{const el=document.createElement('span');el.textContent=s;dec.append(el)});out.append(dec);const caption=out.querySelector('.suitcase-text');if(caption){const watcher=()=>{const r=caption.getBoundingClientRect();const visible=r.top<innerHeight*.85&&r.bottom>innerHeight*.15;dec.classList.toggle('shurfa-show',visible&&getComputedStyle(caption).opacity>.25)};addEventListener('scroll',watcher,{passive:true});watcher()}}
const exec=$('.exec-section')||$('.exec-inner')||$('.exec-summary');if(exec){const thread=document.createElementNS('http://www.w3.org/2000/svg','svg');thread.setAttribute('viewBox','0 0 720 62');thread.setAttribute('aria-hidden','true');thread.classList.add('shurfa-stitch');const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d','M4 33 C80 6 140 54 213 30 S340 12 396 32 S510 54 566 26 S650 12 716 30');thread.append(path);exec.before(thread);observe([thread],x=>x.classList.add('shurfa-in'))}
};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go,{once:true});else go()})();

/* Scene-specific cinematic dawn: no external assets, progressive enhancement. */
(function(){
'use strict';
function initDawn(){
 const track=document.querySelector('.track');
 const stage=track&&track.querySelector('.stage');
 if(!stage||stage.querySelector('.shurfa-dawn-atmosphere'))return;
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 const layer=document.createElement('div');
 layer.className='shurfa-dawn-atmosphere';
 layer.setAttribute('aria-hidden','true');
 layer.innerHTML='<div class="shurfa-dawn-horizon"></div><div class="shurfa-dawn-rays"></div><div class="shurfa-dawn-grain"></div>';
 for(let i=0;i<14;i++){
  const mote=document.createElement('i');
  mote.className='shurfa-dawn-mote';
  mote.style.setProperty('--mote-x',(9+(i*41)%84)+'%');
  mote.style.setProperty('--mote-y',(24+(i*23)%65)+'%');
  mote.style.setProperty('--mote-size',(i%3+2)+'px');
  mote.style.setProperty('--mote-alpha',(.45+(i%4)*.16).toFixed(2));
  mote.style.setProperty('--mote-duration',(3.8+(i%5)*.9)+'s');
  mote.style.setProperty('--mote-delay',(-i*.43)+'s');
  layer.appendChild(mote);
 }
 // Insert before the original scene so interactive content stays above the light.
 const scene=stage.querySelector('.scene');
 if(scene)stage.insertBefore(layer,scene);else stage.appendChild(layer);
 const caption=document.createElement('span');
 caption.className='shurfa-dawn-caption';caption.textContent='مع كل شروق، تبدأ حكاية';
 caption.setAttribute('aria-hidden','true');stage.appendChild(caption);
 let raf=0;
 function frame(){
  raf=0;
  const bounds=track.getBoundingClientRect();
  const total=Math.max(1,track.offsetHeight-window.innerHeight);
  const p=Math.max(0,Math.min(1,-bounds.top/total));
  stage.style.setProperty('--dawn-reveal',(reduce.matches?.72:Math.min(1,Math.max(0,(p-.08)/.77))).toFixed(3));
 }
 function requestFrame(){if(!raf)raf=requestAnimationFrame(frame)}
 function move(e){
  if(reduce.matches)return;
  const r=stage.getBoundingClientRect();
  if(r.bottom<0||r.top>innerHeight)return;
  const x=((e.clientX-r.left)/r.width-.5)*12;
  const y=((e.clientY-r.top)/r.height-.5)*9;
  stage.style.setProperty('--dawn-drift-x',x.toFixed(1)+'px');
  stage.style.setProperty('--dawn-drift-y',y.toFixed(1)+'px');
 }
 window.addEventListener('scroll',requestFrame,{passive:true});
 window.addEventListener('resize',requestFrame,{passive:true});
 stage.addEventListener('pointermove',move,{passive:true});
 stage.addEventListener('pointerleave',()=>{stage.style.setProperty('--dawn-drift-x','0px');stage.style.setProperty('--dawn-drift-y','0px')});
 if(reduce.addEventListener)reduce.addEventListener('change',requestFrame);
 requestFrame();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initDawn,{once:true});else initDawn();
})();
