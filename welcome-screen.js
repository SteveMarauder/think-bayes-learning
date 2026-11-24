const words=(mode,zh,en,ja)=>mode==='en'?en:mode==='ja'?ja:zh;
const sun='<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>';
const moon='<path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z"/>';
const svg=path=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">${path}</svg>`;
let manuallyPaused=false;

export function welcomeScreen(mode='zh',theme='dark'){
 const t=(...items)=>words(mode,...items);
 return `<section class="welcome-screen" aria-labelledby="welcome-title">
 <div class="welcome-art" aria-hidden="true"><picture><source srcset="./assets/welcome/belief-sculpture.webp" type="image/webp"><img src="./assets/welcome/belief-sculpture.jpg" width="1672" height="941" fetchpriority="high" decoding="async" alt=""></picture></div>
 <canvas class="welcome-particles" aria-hidden="true"></canvas><div class="welcome-vignette" aria-hidden="true"></div>
 <header class="welcome-header"><a class="welcome-wordmark" href="#/" aria-label="信念更新中 · Updating Beliefs"><svg viewBox="0 0 44 44" fill="none" aria-hidden="true"><circle cx="22" cy="22" r="20"/><path d="M7 28c8 0 7-16 15-16s7 16 15 16M9 32h26"/><circle cx="22" cy="12" r="2"/></svg><span>UPDATING<br>BELIEFS<span class="welcome-wordmark-zh">信念更新中</span></span></a>
 <div class="welcome-tools"><div class="welcome-language" role="group" aria-label="${t('閱讀語言','Reading language','表示言語')}">${[['zh','中文'],['en','EN'],['ja','日本語']].map(([value,label])=>`<button type="button" data-mode="${value}" aria-pressed="${value===(mode==='both'?'zh':mode)}">${label}</button>`).join('')}</div><div class="welcome-theme" role="group" aria-label="${t('外觀主題','Color theme','配色テーマ')}">${['light','dark'].map(value=>`<button type="button" data-theme-choice="${value}" aria-pressed="${theme===value}" title="${value==='light'?t('明亮模式','Light mode','ライトモード'):t('暗色模式','Dark mode','ダークモード')}" aria-label="${value==='light'?t('明亮模式','Light mode','ライトモード'):t('暗色模式','Dark mode','ダークモード')}">${svg(value==='light'?sun:moon)}</button>`).join('')}</div></div></header>
 <div class="welcome-content"><p class="welcome-eyebrow"><span></span>${t('一段貝氏統計的探索旅程','A JOURNEY INTO BAYESIAN THINKING','ベイズ統計をめぐる、学びの旅')}</p><h1 id="welcome-title">${t('信念<br><em>更新中</em>','Updating<br><em>Beliefs.</em>','信念、<br><em>更新中。</em>')}</h1><p class="welcome-english">${mode==='en'?'信念更新中':'UPDATING BELIEFS'}</p><p class="welcome-deck">${t('世界充滿不確定。<br>讓每一筆證據，帶你更接近理解。','A world of uncertainty.<br>Every piece of evidence brings us closer to understanding.','世界は、不確かさに満ちている。<br>ひとつの証拠が、理解を深めていく。')}</p><div class="welcome-actions"><a class="welcome-enter" href="#/map"><span>${t('進入學習','Enter the experience','学びを始める')}</span><span class="welcome-enter-symbol" aria-hidden="true"><i></i></span></a><a class="welcome-source" href="#book-source">${t('原書與作者','The book & author','原書と著者')}</a></div><p class="welcome-course-meta">20 ${t('章','chapters','章')}<span>·</span>195 ${t('小節','sections','節')}<span>·</span>${t('中・英・日','Chinese · English · Japanese','中国語・英語・日本語')}</p></div>
 <div class="welcome-art-caption" aria-hidden="true"><span class="welcome-caption-line"></span><p>${t('從不確定，<br>凝聚成理解。','Uncertainty,<br>taking shape.','不確かさが、<br>理解へと形を変える。')}</p><small>${t('先驗 · 證據 · 後驗','PRIOR · EVIDENCE · POSTERIOR','事前分布 · 証拠 · 事後分布')}</small></div>
 <footer class="welcome-footer"><div class="welcome-equation"><span>p(H | D) <b>∝</b> p(D | H) p(H)</span><small>${t('讓信念，隨證據更新。','Let evidence update your beliefs.','証拠とともに、信念を更新する。')}</small></div><div class="welcome-credit"><span>${t('以 Allen B. Downey 的 Think Bayes 為基礎','Based on Think Bayes by Allen B. Downey','Allen B. Downey 著 Think Bayes に基づく')}</span><span class="welcome-purpose">${t('免費・非商業・個人學習專案；非官方伴讀。','Free, noncommercial personal learning project; unofficial companion.','無料・非営利の個人学習プロジェクト。非公式の伴読サイト。')}</span><a href="#/licenses">${t('資料出處與授權','Sources & license','出典とライセンス')}</a></div><button class="welcome-motion" type="button" aria-pressed="false">${svg('<path d="M9 5v14M15 5v14"/>')}<span></span></button></footer>
 </section>`;
}

export function mountWelcome(root,{mode='zh',onTheme,onLanguage}){
 const screen=root.querySelector('.welcome-screen');if(!screen)return ()=>{};
 const t=(...items)=>words(mode,...items),canvas=screen.querySelector('canvas'),context=canvas.getContext('2d');
 const media=matchMedia('(prefers-reduced-motion: reduce)'),motion=screen.querySelector('.welcome-motion');
 let width=0,height=0,frame=0,lastPaint=0,phase=0,disposed=false,visible=true,entryTimer;
 const paused=()=>manuallyPaused||media.matches;
 const showMotion=()=>{
  screen.classList.toggle('welcome--paused',paused());
  motion.setAttribute('aria-pressed',String(paused()));
  motion.disabled=media.matches;
  motion.querySelector('span').textContent=media.matches?t('已減少動態','Reduced motion','動きを軽減中'):paused()?t('播放動畫','Play motion','アニメーションを再生'):t('暫停動畫','Pause motion','アニメーションを停止');
  motion.querySelector('svg').innerHTML=paused()?'<path d="m9 5 10 7-10 7z"/>':'<path d="M9 5v14M15 5v14"/>';
 };
 function paint(now){
  frame=0;if(disposed||paused()||document.hidden||!visible)return;
  frame=requestAnimationFrame(paint);
  if(now-lastPaint<32)return;
  const delta=Math.min(40,now-lastPaint||32);lastPaint=now;phase+=delta*.000065;
  if(!context)return;
  context.clearRect(0,0,width,height);
  const dark=document.documentElement.dataset.theme==='dark',count=width<720?34:74;
  context.fillStyle=dark?'rgba(255,219,207,.62)':'rgba(126,38,44,.45)';
  for(let i=0;i<count;i++){
   const progress=(i/count+phase*(.35+(i%3)*.12))%1;
   const strand=i%4,angle=progress*Math.PI*2;
   const cx=width*(width<720?.58:.73),cy=height*(width<720?.49:.46);
   const rx=width*(width<720?.38:.30),ry=height*(.12+strand*.035);
   const x=cx+Math.cos(angle)*rx,y=cy+Math.sin(angle)*ry+Math.cos(angle*2+strand)*28;
   const radius=.65+(i%4)*.25;
   context.globalAlpha=.2+.8*Math.sin(progress*Math.PI);
   context.beginPath();context.arc(x,y,radius,0,Math.PI*2);context.fill();
  }
  context.globalAlpha=1;
 }
 function wake(){if(!frame&&!disposed&&!paused()&&!document.hidden&&visible)frame=requestAnimationFrame(paint);}
 function stop(){cancelAnimationFrame(frame);frame=0;lastPaint=0;}
 function resize(){
  const box=screen.getBoundingClientRect();width=box.width;height=box.height;
  const ratio=Math.min(devicePixelRatio||1,1.5);
  canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
  context?.setTransform(ratio,0,0,ratio,0,0);wake();
 }
 function toggle(){manuallyPaused=!paused();showMotion();if(paused())stop();else wake();}
 function visibility(){if(document.hidden)stop();else wake();}
 function preference(){showMotion();if(paused())stop();else wake();}
 function point(event){if(paused())return;const box=screen.getBoundingClientRect();screen.style.setProperty('--look-x',`${((event.clientX-box.left)/box.width-.5)*18}px`);screen.style.setProperty('--look-y',`${((event.clientY-box.top)/box.height-.5)*12}px`);}
 function leave(){screen.style.setProperty('--look-x','0px');screen.style.setProperty('--look-y','0px');}
 const entry=screen.querySelector('.welcome-enter');
 function enter(event){
  if(media.matches||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  event.preventDefault();if(entryTimer)return;
  screen.classList.add('welcome--leaving');stop();
  entryTimer=setTimeout(()=>{location.hash=entry.hash;},320);
 }
 entry.addEventListener('click',enter);
 const bindings=[];
 screen.querySelectorAll('[data-theme-choice]').forEach(button=>{const handler=()=>onTheme(button.dataset.themeChoice);button.addEventListener('click',handler);bindings.push([button,handler]);});
 screen.querySelectorAll('[data-mode]').forEach(button=>{const handler=()=>onLanguage(button.dataset.mode);button.addEventListener('click',handler);bindings.push([button,handler]);});
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(screen);
 const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else stop();});intersection.observe(screen);
 motion.addEventListener('click',toggle);document.addEventListener('visibilitychange',visibility);media.addEventListener('change',preference);
 screen.addEventListener('pointermove',point,{passive:true});screen.addEventListener('pointerleave',leave);
 showMotion();resize();wake();
 return ()=>{disposed=true;stop();clearTimeout(entryTimer);entry.removeEventListener('click',enter);resizeObserver.disconnect();intersection.disconnect();motion.removeEventListener('click',toggle);document.removeEventListener('visibilitychange',visibility);media.removeEventListener('change',preference);screen.removeEventListener('pointermove',point);screen.removeEventListener('pointerleave',leave);bindings.forEach(([element,handler])=>element.removeEventListener('click',handler));};
}
