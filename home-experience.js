import {betaDensity,betaQuantile} from './visual-math.js?v=7';

// A fixed teaching sequence, not a real experiment or the book's data.
export const DEMO_OBSERVATIONS=Array.from({length:40},(_,i)=>(i*17%40)<26?1:0);
export function evidenceState(count){
 const n=Math.max(0,Math.min(40,Math.round(Number(count)||0)));
 const heads=DEMO_OBSERVATIONS.slice(0,n).reduce((sum,value)=>sum+value,0),tails=n-heads;
 const a=heads+1,b=tails+1;
 return {n,heads,tails,a,b,mean:a/(a+b),low:betaQuantile(.05,a,b),high:betaQuantile(.95,a,b)};
}
const pick=(mode,zh,en,ja)=>mode==='en'?en:mode==='ja'?ja:zh;
function probabilityLandscape(){
 const ridges=Array.from({length:29},(_,i)=>{
  const state=evidenceState(Math.round(i/28*40)),base=400-i*9;
  const points=Array.from({length:181},(_,j)=>{const x=j/180;return `${j?'L':'M'}${(24+i*4+x*430).toFixed(2)} ${(base-betaDensity(x,state.a,state.b)*24).toFixed(2)}`;}).join('');
  return `<path style="--ridge:${i}" d="${points}"/>`;
 }).reverse().join('');
 return `<div class="probability-landscape" aria-hidden="true"><svg viewBox="0 0 600 430"><g>${ridges}</g><path class="landscape-floor" d="M24 401L456 401L568 135M24 401L136 135"/></svg><span>THE SHAPE OF A CHANGING BELIEF</span></div>`;
}
export function probabilityHero(mode='zh'){
 const tr=(...words)=>pick(mode,...words);
 return `<section class="probability-hero" aria-labelledby="probability-title">
 <div class="probability-masthead"><span>UPDATING BELIEFS</span><a href="#book-source">Think Bayes · Allen B. Downey</a></div>
 <div class="probability-intro">${probabilityLandscape()}<div class="probability-heading"><p class="probability-kicker">${tr('讓信念，隨證據更新。','Let evidence update your beliefs.','証拠とともに、信念を更新する。')}</p><h1 id="probability-title">${tr('不確定之中，<br><em>看見規律之美。</em>','In uncertainty,<br><em>find a beautiful order.</em>','不確かさの中に、<br><em>美しい法則を見る。</em>')}</h1></div><div class="probability-invitation"><p>${tr('每一筆證據，都讓世界清晰一點。<br>從一條曲線開始，學會用貝氏的眼光思考。','Every observation brings the world into focus.<br>Start with a curve. Learn to think in Bayes.','証拠がひとつ増えるたび、世界が少し鮮明になる。<br>一本の曲線から、ベイズの思考を学ぼう。')}</p><div class="probability-actions"><a class="primary-button" href="#/map">${tr('展開學習旅程','Explore the learning map','学びの旅を始める')}</a><a class="probability-source-link" href="#book-source">${tr('原書與作者','The book & author','原書と著者')}</a></div></div></div>
 <div class="evidence-experiment" data-evidence-experiment>
 <div class="evidence-topline"><span>${tr('一個信念，如何隨證據改變','HOW EVIDENCE SHAPES A BELIEF','証拠が、信念を変えていく')}</span><span class="evidence-model">Beta(1, 1) × ${tr('硬幣擲出結果','coin observations','コインの観測結果')}</span></div>
 <div class="evidence-stage"><div class="evidence-number"><span>${tr('後驗平均值','POSTERIOR MEAN','事後平均')}</span><strong data-evidence-mean>0.500</strong><small>θ · ${tr('未知的正面機率','unknown chance of heads','未知の表の確率')}</small><div class="evidence-equation" aria-label="${tr('後驗與先驗乘以似然成正比','Posterior is proportional to prior times likelihood','事後分布は事前分布と尤度の積に比例')}" >p(θ | D) <span>∝</span><br>p(D | θ) p(θ)</div></div>
 <div class="evidence-plot"><svg class="evidence-svg" viewBox="0 0 820 355" role="img" aria-labelledby="evidence-chart-title evidence-chart-description"><title id="evidence-chart-title">${tr('硬幣正面機率的貝氏更新','Bayesian updating of a coin’s chance of heads','コインの表の確率をベイズ更新')}</title><desc id="evidence-chart-description">${tr('均勻先驗與固定教學序列的後驗機率密度。橫軸是正面機率，縱軸是密度；曲線下的總面積為一。','Uniform prior and posterior densities for a fixed teaching sequence. The horizontal axis is the chance of heads; the vertical axis is density. Total area under each curve is one.','一様な事前分布と、固定の学習用データによる事後確率密度。横軸は表の確率、縦軸は密度。各曲線の下の面積は1です。')}</desc>
 <defs><linearGradient id="evidence-area-gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--brand)" stop-opacity=".30"/><stop offset="1" stop-color="var(--brand)" stop-opacity=".015"/></linearGradient></defs>
 <g class="evidence-grid" aria-hidden="true">${[0,2,4,6].map(y=>`<path d="M42 ${278-y*36}H790"/><text x="27" y="${283-y*36}" text-anchor="end">${y}</text>`).join('')}${[0,.25,.5,.75,1].map(x=>`<path d="M${42+x*748} 40V278"/><text x="${42+x*748}" y="303" text-anchor="middle">${x}</text>`).join('')}<text class="evidence-axis-label" x="42" y="23">${tr('機率密度','Probability density','確率密度')}</text><text class="evidence-axis-label" x="790" y="350" text-anchor="end">θ · ${tr('正面機率','Chance of heads','表の確率')}</text></g>
 <g class="evidence-history" aria-hidden="true"></g><path class="evidence-area" fill="url(#evidence-area-gradient)"/><path class="evidence-prior" d="M42 242H790"/><path class="evidence-interval"/><path class="evidence-posterior"/><line class="evidence-mean-line" x1="416" x2="416" y1="278" y2="242"/><circle class="evidence-mean-dot" cx="416" cy="242" r="4.5"/>
 </svg><div class="evidence-legend"><span><i class="prior-swatch"></i>${tr('起初的均勻先驗','Initial uniform prior','最初の一様な事前分布')}</span><span><i class="posterior-swatch"></i>${tr('證據更新後的分布','Updated distribution','更新後の分布')}</span><span><i class="interval-swatch"></i>${tr('90% 可信區間','90% credible interval','90%信用区間')}</span></div></div></div>
 <div class="evidence-controls"><button class="evidence-play" type="button" aria-pressed="false" data-evidence-play>${tr('播放更新','Play updates','更新を再生')}</button><label class="evidence-slider-label" for="evidence-count">${tr('證據筆數','Observations','観測数')} <output for="evidence-count" data-evidence-count>0 / 40</output><input id="evidence-count" type="range" min="0" max="40" value="0" step="1"></label><div class="evidence-outcomes"><span><b data-evidence-heads>0</b> ${tr('正面','heads','表')}</span><span><b data-evidence-tails>0</b> ${tr('反面','tails','裏')}</span></div></div>
 <div class="evidence-sequence" aria-label="${tr('固定教學序列：實心為正面，空心為反面','Fixed teaching sequence: filled is heads, outlined is tails','固定の学習用データ：塗りつぶしは表、輪郭は裏')}">${DEMO_OBSERVATIONS.map((value,i)=>`<span class="${value?'coin-head':'coin-tail'}" data-coin="${i}" aria-hidden="true"></span>`).join('')}</div>
 <p class="evidence-description" data-evidence-description aria-live="off"></p><p class="evidence-note">${tr('本站互動示範，非原書數據。假設每次擲出相互獨立，且正面機率固定；40 筆固定序列含 26 次正面。密度高度不等於機率，機率由面積表示。','Site-authored demo, not book data. Independent tosses with a fixed chance of heads; the fixed 40-toss sequence has 26 heads. Density height is not probability: probability is area.','本サイト独自のデモで、原書のデータではありません。各試行は独立で表の確率は一定と仮定。固定の40回の系列に表は26回。密度の高さは確率ではなく、確率は面積で表します。')}</p>
 </div><div class="probability-colophon"><span>20 ${tr('章','CHAPTERS','章')} / 195 ${tr('小節','SECTIONS','節')}</span><span>${tr('從直覺，到公式，再到理解。','FROM INTUITION, TO EQUATIONS, TO UNDERSTANDING.','直感から数式へ、そして理解へ。')}</span><span>中文 · ENGLISH · 日本語</span></div>
 </section>`;
}

export function mountProbabilityHero(root,mode='zh'){
 const host=root.querySelector('[data-evidence-experiment]');
 if(!host)return ()=>{};
 const tr=(...words)=>pick(mode,...words),find=selector=>host.querySelector(selector);
 const slider=find('#evidence-count'),play=find('[data-evidence-play]'),svg=find('.evidence-svg');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const points=Array.from({length:241},(_,i)=>i/240);
 const states=Array.from({length:41},(_,i)=>evidenceState(i));
 const curves=states.map(s=>points.map(x=>betaDensity(x,s.a,s.b)));
 const X=x=>42+x*748,Y=y=>278-y*36;
 const line=values=>values.map((y,i)=>`${i?'L':'M'}${X(points[i]).toFixed(2)} ${Y(y).toFixed(2)}`).join('');
 let n=0,playing=!reduced.matches,visible=true,disposed=false,raf=0,lastStep=0,drawn=curves[0],from=drawn,start=0;
 function paint(values){
  const s=states[n],d=line(values);
  find('.evidence-posterior').setAttribute('d',d);
  find('.evidence-area').setAttribute('d',`${d}L790 278L42 278Z`);
  const areaPoints=[s.low,...points.filter(x=>x>s.low&&x<s.high),s.high];
  find('.evidence-interval').setAttribute('d',`M${X(s.low)} 278${areaPoints.map(x=>`L${X(x).toFixed(2)} ${Y(betaDensity(x,s.a,s.b)).toFixed(2)}`).join('')}L${X(s.high)} 278Z`);
  const x=X(s.mean),y=Y(betaDensity(s.mean,s.a,s.b));
  find('.evidence-mean-line').setAttribute('x1',x);find('.evidence-mean-line').setAttribute('x2',x);find('.evidence-mean-line').setAttribute('y2',y);
  find('.evidence-mean-dot').setAttribute('cx',x);find('.evidence-mean-dot').setAttribute('cy',y);
  drawn=values;
 }
 function updateLabels(){
  const s=states[n];slider.value=n;
  find('[data-evidence-count]').textContent=`${n} / 40`;
  find('[data-evidence-mean]').textContent=s.mean.toFixed(3);
  find('[data-evidence-heads]').textContent=s.heads;find('[data-evidence-tails]').textContent=s.tails;
  find('[data-evidence-description]').textContent=tr(`從 Beta(1, 1) 出發，${n} 筆證據後為 Beta(${s.a}, ${s.b})；90% 可信區間 ${s.low.toFixed(3)}–${s.high.toFixed(3)}。`,`Starting from Beta(1, 1), ${n} observations give Beta(${s.a}, ${s.b}); 90% credible interval ${s.low.toFixed(3)}–${s.high.toFixed(3)}.`,`Beta(1, 1) から、${n} 回の観測で Beta(${s.a}, ${s.b}) へ。90%信用区間は ${s.low.toFixed(3)}–${s.high.toFixed(3)}。`);
  host.querySelectorAll('[data-coin]').forEach((coin,i)=>coin.classList.toggle('observed',i<n));
  find('.evidence-history').innerHTML=Array.from({length:Math.floor(n/4)},(_,i)=>(i+1)*4).filter(i=>i<n).map(i=>`<path d="${line(curves[i])}"/>`).join('');
  play.textContent=playing?tr('暫停更新','Pause updates','更新を一時停止'):n===40?tr('重新播放','Replay updates','もう一度再生'):tr('播放更新','Play updates','更新を再生');
  play.setAttribute('aria-pressed',String(playing));
 }
 function setCount(value,now=performance.now()){
  n=value;from=drawn;start=now;updateLabels();
  if(reduced.matches)paint(curves[n]);
 }
 function loop(now){
  if(disposed)return;
  if(playing&&visible&&!document.hidden){
   if(!lastStep)lastStep=now;
   if(now-lastStep>=850){lastStep=now;if(n<40)setCount(n+1,now);if(n===40){playing=false;updateLabels();}}
  }else lastStep=0;
  if(start){const t=reduced.matches?1:Math.min(1,(now-start)/360),eased=1-(1-t)**3;paint(curves[n].map((v,i)=>from[i]+(v-from[i])*eased));if(t===1)start=0;}
  // Schedule only during playback or interpolation; an idle home uses no frame loop.
  raf=(playing&&visible&&!document.hidden)||start?requestAnimationFrame(loop):0;
 }
 function wake(){if(!raf&&!disposed)raf=requestAnimationFrame(loop);}
 function onPlay(){playing=!playing;if(playing&&n===40)setCount(0);lastStep=0;updateLabels();wake();}
 function onInput(){playing=false;setCount(Number(slider.value));wake();}
 function onVisibility(){lastStep=0;if(!document.hidden)wake();}
 function onReduced(){if(reduced.matches){playing=false;paint(curves[n]);start=0;updateLabels();}wake();}
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;lastStep=0;if(visible)wake();},{threshold:.05});
 const resizeObserver=new ResizeObserver(()=>{
  const width=svg.getBoundingClientRect().width;
  if(width>0)svg.querySelectorAll('.evidence-grid text').forEach(label=>label.style.fontSize=`${Math.max(14,12*820/width)}px`);
 });
 resizeObserver.observe(svg);
 observer.observe(host);play.addEventListener('click',onPlay);slider.addEventListener('input',onInput);document.addEventListener('visibilitychange',onVisibility);reduced.addEventListener('change',onReduced);
 paint(curves[0]);updateLabels();wake();
 return ()=>{disposed=true;cancelAnimationFrame(raf);observer.disconnect();resizeObserver.disconnect();play.removeEventListener('click',onPlay);slider.removeEventListener('input',onInput);document.removeEventListener('visibilitychange',onVisibility);reduced.removeEventListener('change',onReduced);};
}
