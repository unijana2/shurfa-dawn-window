/* Shurfa — accessible navigation enhancement, no dependencies */
(function(){
'use strict';
function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
ready(function(){
const doc=document,root=doc.documentElement;
const progress=doc.createElement('div');progress.className='shurfa-progress';progress.setAttribute('aria-hidden','true');
const bar=doc.createElement('div');bar.className='shurfa-progress-bar';progress.appendChild(bar);doc.body.appendChild(progress);
const drawer=doc.createElement('aside');drawer.className='shurfa-drawer';drawer.id='shurfa-chapters';drawer.setAttribute('aria-label','فصول تقرير شرفة');drawer.setAttribute('aria-hidden','true');drawer.innerHTML='<button class="shurfa-close" type="button">إغلاق ×</button><h2>رحلة شُرفة</h2><nav aria-label="الانتقال بين أقسام التقرير"></nav>';doc.body.appendChild(drawer);
const scrim=doc.createElement('div');scrim.className='shurfa-scrim';doc.body.appendChild(scrim);
const tools=doc.createElement('div');tools.className='shurfa-tools';
const menu=doc.createElement('button');menu.className='shurfa-tool';menu.type='button';menu.textContent='☰ فصول التقرير';menu.setAttribute('aria-controls','shurfa-chapters');menu.setAttribute('aria-expanded','false');
const top=doc.createElement('button');top.className='shurfa-tool';top.type='button';top.textContent='↑ العودة للبداية';top.setAttribute('aria-label','العودة إلى بداية التقرير');tools.append(menu,top);doc.body.appendChild(tools);
const headings=Array.from(doc.querySelectorAll('h2,h3')).filter(el=>{const t=el.textContent.replace(/\s+/g,' ').trim();return t.length>2&&t.length<80&&el.getClientRects().length});
const used=new Set();headings.forEach((h,i)=>{if(used.has(h.textContent.trim()))return;used.add(h.textContent.trim());if(!h.id)h.id='shurfa-section-'+i;const a=doc.createElement('a');a.href='#'+h.id;a.textContent=h.textContent.replace(/\s+/g,' ').trim();drawer.querySelector('nav').appendChild(a)});
let lastFocus=null;
function toggle(open){drawer.dataset.open=String(open);scrim.dataset.open=String(open);drawer.setAttribute('aria-hidden',String(!open));menu.setAttribute('aria-expanded',String(open));if('inert' in drawer)drawer.inert=!open;if(open){lastFocus=doc.activeElement;drawer.querySelector('button').focus()}else if(lastFocus&&lastFocus.focus){lastFocus.focus()}}
if('inert' in drawer)drawer.inert=true;
menu.addEventListener('click',()=>toggle(true));drawer.querySelector('.shurfa-close').addEventListener('click',()=>toggle(false));scrim.addEventListener('click',()=>toggle(false));
drawer.querySelector('nav').addEventListener('click',e=>{if(e.target.closest('a'))toggle(false)});
doc.addEventListener('keydown',e=>{if(drawer.dataset.open!=='true')return;if(e.key==='Escape')toggle(false);if(e.key==='Tab'){const f=Array.from(drawer.querySelectorAll('button,a')).filter(x=>x.offsetParent!==null);if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&doc.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&doc.activeElement===last){e.preventDefault();first.focus()}}});
top.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
let scheduled=false;function update(){const h=root.scrollHeight-innerHeight;const p=h>0?Math.min(1,Math.max(0,scrollY/h)):0;bar.style.transform='scaleX('+p+')';top.hidden=scrollY<innerHeight*.7;scheduled=false}
function onScroll(){if(!scheduled){scheduled=true;requestAnimationFrame(update)}}window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll,{passive:true});update();
});
})();