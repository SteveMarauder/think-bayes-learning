import {BAYES_COOKIE,JOINT_PROBABILITIES,betaDensity,betaCdf,betaQuantile,makeMetropolisDemo} from './visual-math.js?v=6';
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tr=(values,mode)=>values[mode==='en'?1:mode==='ja'?2:0];
export const VISUALS=[
 {id:'cookies',lessons:['TB2-CH02-S01'],image:'cookie-bowls.png',title:['從餅乾比例，看見證據的方向','See the evidence in two bowls of cookies','クッキーの割合から証拠の向きを見る'],summary:['等機率先選一個碗；香草餅乾在碗 1 更常見，因此看到香草會提高碗 1 的後驗機率。','Both bowls start equally likely. Vanilla is more common in Bowl 1, so seeing vanilla raises its posterior probability.','最初はどちらのボウルも同確率です。バニラはボウル1に多いので、バニラを観測するとボウル1の事後確率が高まります。'],alt:['左碗三個香草圖示、一個巧克力；右碗各兩個。每個圖示代表原題十片餅乾。','Left: three vanilla icons and one chocolate; right: two of each. Each icon represents ten cookies in the original problem.','左はバニラ3個とチョコ1個、右は各2個の図示。1個の図示は原題のクッキー10枚を表します。'],note:['原題兩碗各有 40 片，圖中每個餅乾代表 10 片。等機率選碗、隨機取一片並觀察到香草後：P(碗 1 | 香草) = 0.375 / 0.625 = 60%，不是 75%。','The original bowls contain 40 cookies each; each icon represents 10 cookies. With equal bowl selection and a random cookie, observing vanilla gives P(Bowl 1 | vanilla) = 0.375 / 0.625 = 60%, not 75%.','原題では各ボウルに40枚あり、図示1個は10枚を表します。ボウルを等確率で選び、無作為に取ったクッキーがバニラなら、P(ボウル1 | バニラ) = 0.375 / 0.625 = 60%です。75%ではありません。']},
 {id:'updating',lessons:['TB2-CH02-S02','TB2-CH02-S03'],title:['貝氏更新，是重新分配權重','Bayesian updating reallocates the weights','ベイズ更新は重みの再配分'],summary:['先驗乘上概似，再把所有假設的權重一起正規化。','Multiply each prior by its likelihood, then normalize across the hypotheses.','事前確率に尤度を掛け、仮説全体で重みを正規化します。'],note:['沿用餅乾問題：概似 75% 與 50% 分別以不同的碗為條件，因此不需要相加為 100%。相乘後得到 37.5% 與 25%；除以共同總和 62.5%，才得到後驗 60% 與 40%。','In the cookie problem, the 75% and 50% likelihoods condition on different bowls and need not sum to 100%. The weighted values are 37.5% and 25%. Dividing by their shared total, 62.5%, yields posterior probabilities of 60% and 40%.','クッキー問題の尤度75%と50%は、異なるボウルを条件としているので合計100%である必要はありません。重み37.5%と25%を共通の合計62.5%で割ると、事後確率60%と40%になります。']},
 {id:'monty',lessons:['TB2-CH02-S05'],image:'monty-doors.png',title:['門被打開，資訊也跟著改變','An opened door carries information','扉が開くと情報が増える'],summary:['關鍵不只是少了一扇門，而是主持人知道答案，且依固定規則揭曉。','The key is not merely one fewer door: the host knows the answer and reveals a goat under a specified rule.','単に扉が一つ減るのではなく、答えを知る司会者が決まった規則でヤギを見せることが重要です。'],alt:['三扇門：左門以紅框標出原選擇，中門打開露出山羊，右門關閉可供換選。','Three doors: the red-framed left door is the initial choice; the middle door reveals a goat; the right door remains closed.','3枚の扉。赤枠の左が最初の選択、中央は開いてヤギが見え、右は閉じています。'],note:['假設車原先等機率在三門後，主持人知道車位，必開未選的羊門、總提供換門，且有兩個羊門可開時等機率選擇。原選擇中車的機率是 1/3；始終換門的勝率是 2/3。圖中只是其中一個揭曉情境。','Assume the car is equally likely behind each door; the informed host always opens an unchosen goat door, always offers a switch, and chooses equally when two goat doors are available. Staying wins with probability 1/3; always switching wins with probability 2/3. The picture shows one possible reveal.','車の位置は3枚の扉で等確率とします。司会者は車の位置を知り、未選択のヤギの扉を必ず開け、常に変更を提案し、開けられるヤギの扉が2枚なら等確率で選びます。変更しなければ勝率1/3、必ず変更すれば2/3です。図は一つの公開例です。']},
 {id:'prior-posterior',lessons:['TB2-CH04-S03','TB2-CH04-S05'],title:['用資料把先驗更新為後驗','Watch data turn a prior into a posterior','データで事前分布を事後分布へ'],summary:['虛線是看資料前的分布，紅線是更新後的分布；曲線下面積才是機率。','The dashed curve is the prior; the red curve is the posterior. Probability comes from area under a curve.','破線は事前分布、赤線は更新後の事後分布です。確率は曲線の下の面積で表されます。'],note:['本站示例：10 次條件獨立、成功機率固定為 p 的擲幣，得到 7 次正面、3 次反面。均勻先驗 Beta(1,1) 更新為 Beta(8,4)。這是教學用資料，原書 Euro 案例仍以原文為準。','Site example: ten conditionally independent flips with a fixed success probability p produce seven heads and three tails. A uniform Beta(1,1) prior becomes Beta(8,4). These are illustrative data, separate from the book’s Euro example.','本サイトの例：成功確率pが一定の条件付き独立な10回の投げで、表7回・裏3回を観測します。一様なBeta(1,1)事前分布はBeta(8,4)になります。原書のユーロ硬貨問題とは別の教材用データです。']},
 {id:'credible-interval',lessons:['TB2-CH05-S04'],title:['可信區間，是後驗機率的面積','A credible interval contains posterior probability','信用区間は事後確率を含む区間'],summary:['陰影區域是中間 90% 的後驗機率，兩端各留下 5%。','The shaded interval contains the middle 90% of posterior probability, leaving 5% in each tail.','陰影の区間は中央の事後確率90%を含み、両端に5%ずつ残します。'],note:['沿用本站 Beta(8,4) 示例，使用等尾 90% 可信區間。在這個模型、先驗與資料下，未知比例 p 位於區間中的後驗機率為 90%。這不是對所有先驗、所有模型都相同的區間。','For the site’s Beta(8,4) example, this is an equal-tailed 90% credible interval. Conditional on this model, prior and data, the posterior probability that p lies inside is 90%. Other priors or models can yield other intervals.','本サイトのBeta(8,4)例における両側等裾の90%信用区間です。このモデル・事前分布・データを条件とすると、pが区間内にある事後確率は90%です。事前分布やモデルが異なれば区間も変わり得ます。']},
 {id:'joint',lessons:['TB2-CH11-S03','TB2-CH11-S04','TB2-CH11-S07'],title:['把聯合分布，沿著一個方向加總','Read joint probabilities, then sum a margin','同時分布を読み、一方向に足す'],summary:['每格是一對 X、Y 值的機率。加總一整列或欄，就得到一個變數的邊際分布。','Each cell gives the probability of a pair of X and Y values. Summing a row or column gives a marginal distribution.','各マスはXとYの値の組の確率です。行または列を足すと、一つの変数の周辺分布になります。'],note:['本站示例：九格總和為 1，右側為 Y 的邊際，下方為 X 的邊際。中心格 P(X=2,Y=2)=0.30；兩個邊際的乘積為 0.50×0.50=0.25，因此本例不獨立，不能用邊際相乘重建聯合分布。','Site example: the nine cells sum to 1. The right margin gives Y; the bottom margin gives X. The center has P(X=2,Y=2)=0.30, but the product of marginals is 0.50×0.50=0.25. This example is dependent; multiplying marginals cannot reconstruct the joint.','本サイトの例：9マスの合計は1です。右端はY、下端はXの周辺分布です。中央のP(X=2,Y=2)=0.30に対し、周辺の積は0.50×0.50=0.25なので、この例は独立ではありません。周辺の積で同時分布を再構成することはできません。']},
 {id:'recapture',lessons:['TB2-CH15-S01','TB2-CH15-S06'],image:'tagged-fish.png',title:['從樣本中的標記比例，推想整個族群','Use marked proportions to reason about population size','標識の割合から母集団の大きさを考える'],summary:['第一次標記，再次抽樣；重複捕到多少已標記個體，提供總數的線索。','Mark an initial sample, then sample again. The number of marked recaptures carries information about the total population.','最初の標本に標識を付け、もう一度抽出します。再び捕まった標識個体の数が、全体の数の手掛かりになります。'],alt:['兩尾魚的科學插圖；左魚帶有紅色標記，右魚沒有標記。魚不是按抽樣數量繪製。','Two scientific fish illustrations: the left fish carries a red tag and the right is unmarked. They are not a count of the samples.','魚2匹の科学イラスト。左には赤い標識があり、右にはありません。図の匹数は標本数を表していません。'],note:['本站魚群例子：先標記 20 尾，再隨機抽 10 尾，其中 4 尾已標記，簡單比例估計為 N≈20×10/4=50。這只是 Lincoln–Petersen 的直覺起點，不是貝氏後驗或不確定區間。需假設族群封閉、充分混合、標記不脫落且捕獲機會可比；原書另以完整機率模型推論。','Site fish example: mark 20 fish, then randomly sample 10 and find 4 tagged fish. The simple proportional estimate is N≈20×10/4=50. This is a Lincoln–Petersen intuition, not a Bayesian posterior or uncertainty interval. It assumes a closed, well-mixed population, retained tags and comparable capture chances; the book develops probability models.','本サイトの魚の例：20匹に標識を付け、次に無作為に10匹を捕ると4匹に標識があります。単純な比率推定はN≈20×10/4=50です。これはLincoln–Petersen法の直感的な出発点であり、ベイズ事後分布や不確実性区間ではありません。閉鎖母集団、十分な混合、標識の保持、比較可能な捕獲機会を仮定し、原書では確率モデルで推論します。']},
 {id:'mcmc',lessons:['TB2-CH19-S06'],title:['讓抽樣的足跡，描出目標分布','Let a sampling trace describe a target distribution','サンプリングの軌跡で目標分布を描く'],summary:['左邊看鏈如何移動，右邊看累積樣本的分布。相鄰樣本往往有相關性。','The left shows movement of the chain; the right shows the accumulated sample distribution. Adjacent draws are often correlated.','左は連鎖の移動、右は蓄積した標本の分布です。隣接する標本にはしばしば相関があります。'],note:['本站固定種子的 Metropolis 教學模擬，以 N(0,1) 為目標：1,200 步排除前 200 步，右圖使用保留的 1,000 個樣本，左圖顯示其中前 80 步。這不是原書模型的結果，也不能只憑圖形相似判定已收斂；仍須檢查多鏈、混合與有效樣本數等診斷。','Site Metropolis simulation with a fixed seed and N(0,1) target: discard the first 200 of 1,200 steps. The histogram uses 1,000 retained draws; the trace shows their first 80. This is not a book-model result. Visual resemblance alone does not establish convergence; check multiple chains, mixing and effective sample size.','本サイトの固定シードによるMetropolis教材用シミュレーションで、目標はN(0,1)です。1,200ステップの最初の200を除き、右は残る1,000標本、左はその最初の80ステップを示します。原書モデルの結果ではありません。見た目だけで収束は判断できず、複数連鎖、混合、有効標本数などの診断が必要です。']}
];
export const visualForLesson=id=>VISUALS.find(v=>v.lessons.includes(id));
const svgText=(x,y,text,size=14,anchor='start',color='#202124')=>`<text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}" fill="${color}">${esc(text)}</text>`;
const svgFrame=(label,body,height=300)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 ${height}" role="img" aria-label="${esc(label)}" style="font-family:system-ui,sans-serif;background:white">${body}</svg>`;
function posteriorChart(mode,interval=false){
 const x=p=>55+p*510,y=d=>220-d*48;
 const points=Array.from({length:201},(_,i)=>{const p=i/200;return [x(p),y(betaDensity(p))];});
 const path=points.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ');
 let body=`<path d="M55 30V220H565" fill="none" stroke="#7a7d82"/>`;
 for(const v of [1,2,3])body+=`<path d="M55 ${y(v)}H565" stroke="#eee"/>`+svgText(42,y(v)+4,String(v),12,'end');
 for(const p of [0,.25,.5,.75,1])body+=svgText(x(p),244,String(p),13,'middle');
 body+=svgText(310,285,tr(['未知比例 p','Unknown proportion p','未知の割合 p'],mode),14,'middle');
 body+=svgText(55,20,tr(['機率密度','Probability density','確率密度'],mode));
 if(interval){
  const lo=betaQuantile(.05),hi=betaQuantile(.95),inside=points.filter(([px])=>px>x(lo)&&px<x(hi));
  body+=`<path d="M${x(lo)} 220 L${x(lo)} ${y(betaDensity(lo))} ${inside.map(p=>`L${p[0]},${p[1]}`).join(' ')} L${x(hi)} ${y(betaDensity(hi))} L${x(hi)} 220Z" fill="#ae252a" opacity=".22"/>`;
  for(const v of [lo,hi])body+=`<path d="M${x(v)} 220V${y(betaDensity(v))}" stroke="#ae252a" stroke-dasharray="4 4"/>`;
  body+=svgText(310,53,'90%',24,'middle','#ae252a');
  body+=svgText(x(lo)-10,200,'5%',14,'end');body+=svgText(x(hi)+10,200,'5%',14);
  body+=svgText(310,266,`${lo.toFixed(3)} ≤ p ≤ ${hi.toFixed(3)}`,14,'middle','#ae252a');
 }else{
  body+=`<path d="M55 ${y(1)}H565" stroke="#64676d" stroke-width="2" stroke-dasharray="6 5"/>`;
  body+=svgText(77,y(1)-12,tr(['先驗 Beta(1,1)','Prior Beta(1,1)','事前 Beta(1,1)'],mode),14);
  body+=svgText(395,55,tr(['後驗 Beta(8,4)','Posterior Beta(8,4)','事後 Beta(8,4)'],mode),14,'middle','#ae252a');
 }
 body+=`<path d="${path}" fill="none" stroke="#ae252a" stroke-width="3"/>`;
 return svgFrame(tr(VISUALS.find(v=>v.id===(interval?'credible-interval':'prior-posterior')).title,mode),body);
}
function updateFlow(mode){
 const names=[['先驗','Prior','事前'],['概似','Likelihood','尤度'],['未正規化權重','Unnormalized','未正規化の重み'],['後驗','Posterior','事後']],values=[BAYES_COOKIE.prior,BAYES_COOKIE.likelihood,BAYES_COOKIE.weight,BAYES_COOKIE.posterior];
 return `<div class="visual-flow">${names.map((name,i)=>`<div class="visual-flow-step"><strong>${tr(name,mode)}</strong><span>${(values[i][0]*100).toFixed(1)}% / ${(values[i][1]*100).toFixed(1)}%</span><div class="two-weights"><i style="width:${values[i][0]*100}%"></i><i style="width:${values[i][1]*100}%"></i></div><small>${tr(i===0?['兩碗各半','Equal bowl probabilities','両ボウル同確率']:i===1?['給定各碗的香草比例','Vanilla given each bowl','各ボウルでのバニラ割合']:i===2?['各自相乘','Multiply per hypothesis','仮説ごとに掛ける']:['除以權重總和','Divide by total weight','重みの合計で割る'],mode)}</small></div>`).join('')}</div><div class="visual-flow-key"><span>${tr(['第一個數字／紅色：碗 1','First value / red: Bowl 1','第1値／赤：ボウル1'],mode)}</span><span>${tr(['第二個數字／藍色：碗 2','Second value / blue: Bowl 2','第2値／青：ボウル2'],mode)}</span></div>`;
}
function jointChart(mode){
 const rows=JOINT_PROBABILITIES,rowSums=rows.map(row=>row.reduce((a,b)=>a+b,0)),cols=rows[0].map((_,j)=>rows.reduce((a,r)=>a+r[j],0));let body='';
 body+=svgText(270,24,tr(['X 的可能值','Values of X','Xの値'],mode),14,'middle');body+=svgText(494,24,tr(['Y 的邊際','Y margin','Yの周辺'],mode),14,'middle');
 for(let j=0;j<3;j++)body+=svgText(175+j*90,51,String(j+1),14,'middle');
 for(let i=0;i<3;i++){
  body+=svgText(83,96+i*61,`Y=${i+1}`,14,'middle');
  for(let j=0;j<3;j++){const v=rows[i][j];body+=`<rect x="${130+j*90}" y="${64+i*61}" width="90" height="61" fill="#ae252a" fill-opacity="${.08+v*.65}" stroke="#dcdde0"/>`+svgText(175+j*90,101+i*61,v.toFixed(2),17,'middle');}
  body+=svgText(494,101+i*61,rowSums[i].toFixed(2),17,'middle','#245da8');
 }
 body+=svgText(83,273,tr(['X 邊際','X margin','X周辺'],mode),13,'middle');
 for(let j=0;j<3;j++)body+=svgText(175+j*90,273,cols[j].toFixed(2),17,'middle','#245da8');body+=svgText(494,273,'Σ = 1',15,'middle');
 return svgFrame(tr(VISUALS.find(v=>v.id==='joint').title,mode),body,304);
}
const chainDemo=makeMetropolisDemo();
function mcmcChart(mode){
 const y=v=>165-v*20,trace=chainDemo.draws.slice(0,80),density=v=>Math.exp(-v*v/2)/Math.sqrt(2*Math.PI);let body='';
 body+=svgText(160,29,tr(['連鎖軌跡：前 80 個保留樣本','Trace: first 80 retained draws','軌跡：最初の80標本'],mode),13,'middle');
 body+=svgText(457,29,tr(['1,000 個樣本與目標密度','1,000 draws and target density','1,000標本と目標密度'],mode),13,'middle');
 body+=`<path d="M45 65V265H275M330 265H580" fill="none" stroke="#7a7d82"/><path d="M45 ${y(0)}H275" stroke="#ddd" stroke-dasharray="3 3"/>`;
 body+=`<path d="${trace.map((v,i)=>`${i?'L':'M'}${45+i*230/79},${y(v)}`).join(' ')}" fill="none" stroke="#245da8" stroke-width="1.6"/>`;
 for(const v of [-5,0,5])body+=svgText(36,y(v)+4,String(v),12,'end');
 const bx=v=>330+(v+5)/10*250,by=d=>265-d*410;
 chainDemo.bins.forEach((count,i)=>{const v=chainDemo.minimum+i*chainDemo.binWidth,h=count/(chainDemo.draws.length*chainDemo.binWidth)*410;body+=`<rect x="${bx(v)}" y="${265-h}" width="${250/chainDemo.bins.length-1}" height="${h}" fill="#b35b5f" opacity=".5"/>`;});
 body+=`<path d="${Array.from({length:101},(_,i)=>{const v=-5+i*.1;return `${i?'L':'M'}${bx(v)},${by(density(v))}`;}).join(' ')}" fill="none" stroke="#246644" stroke-width="2"/>`;
 body+=svgText(45,286,'1',12);body+=svgText(275,286,'80',12,'end');body+=svgText(160,308,tr(['保留後的步數','Retained step','保持後のステップ'],mode),13,'middle');
 for(const v of [-5,0,5])body+=svgText(bx(v),286,String(v),12,'middle');body+=svgText(457,308,'N(0,1)',13,'middle','#246644');
 return svgFrame(tr(VISUALS.find(v=>v.id==='mcmc').title,mode),body,326);
}
function visualGraphic(v,mode){
 if(v.image)return `<img src="./assets/visuals/${v.image}" alt="${esc(tr(v.alt,mode))}" loading="lazy" decoding="async" width="${v.id==='recapture'?2172:1774}" height="${v.id==='recapture'?724:887}">`;
 if(v.id==='updating')return updateFlow(mode);
 if(v.id==='joint')return jointChart(mode);
 if(v.id==='mcmc')return mcmcChart(mode);
 return posteriorChart(mode,v.id==='credible-interval');
}
function caseLabels(v,mode){
 if(v.id==='cookies')return `<div class="visual-object-labels"><span>${tr(['碗 1：30 香草／10 巧克力','Bowl 1: 30 vanilla / 10 chocolate','ボウル1：バニラ30／チョコ10'],mode)}</span><span>${tr(['碗 2：20 香草／20 巧克力','Bowl 2: 20 vanilla / 20 chocolate','ボウル2：バニラ20／チョコ20'],mode)}</span></div><div class="visual-takeaway">${tr(['看到香草後：碗 1 為 60%，碗 2 為 40%','After vanilla: Bowl 1 = 60%, Bowl 2 = 40%','バニラの観測後：ボウル1は60%、ボウル2は40%'],mode)}</div>`;
 if(v.id==='monty')return `<div class="visual-object-labels three"><span>${tr(['1｜原先選擇','1 | Initial choice','1｜最初の選択'],mode)}</span><span>${tr(['2｜主持人揭曉','2 | Host reveals','2｜司会者が公開'],mode)}</span><span>${tr(['3｜可選擇換門','3 | May switch here','3｜変更できる扉'],mode)}</span></div><div class="visual-takeaway">${tr(['總是保留：1/3　總是換門：2/3','Always stay: 1/3 · Always switch: 2/3','必ず維持：1/3　必ず変更：2/3'],mode)}</div>`;
 if(v.id==='recapture')return `<div class="visual-object-labels"><span>${tr(['帶標記的個體','A tagged individual','標識個体'],mode)}</span><span>${tr(['未標記的個體','An unmarked individual','標識のない個体'],mode)}</span></div><div class="visual-takeaway">M = 20 · n = 10 · k = 4 · N ≈ M × n / k = 50</div>`;
 return '';
}
export function renderVisual(id,mode='zh',{enlarge=true}={}){
 const v=VISUALS.find(v=>v.id===id);if(!v)return '';
 return `<figure id="visual-${v.id}" class="concept-visual" data-visual="${v.id}" data-block-id="visual-${v.id}"><div class="concept-visual-heading"><div><span class="visual-kicker">${tr(['概念圖解 · 本站補充','VISUAL GUIDE · SITE SUPPLEMENT','概念図解 · 本サイトの補足'],mode)}</span><h2>${esc(tr(v.title,mode))}</h2></div>${enlarge?`<button class="visual-enlarge secondary-button" data-enlarge-visual="${v.id}" aria-label="${esc(tr(['放大圖解：','Enlarge illustration: ','図解を拡大：'],mode)+tr(v.title,mode))}">${tr(['放大','Enlarge','拡大'],mode)}</button>`:''}</div><p class="visual-summary">${esc(tr(v.summary,mode))}</p><div class="concept-graphic ${v.image?'illustrated-case':''}">${visualGraphic(v,mode)}${caseLabels(v,mode)}</div>${!v.image&&v.id!=='updating'?`<p class="visual-scroll-hint">${tr(['可左右滑動圖表，或按「放大」查看。','Scroll the chart sideways, or choose Enlarge.','図を横にスクロールするか、「拡大」を選んでください。'],mode)}</p>`:''}<figcaption>${esc(tr(v.note,mode))}${mode==='both'?`<p lang="en">${esc(v.summary[1])} ${esc(v.note[1])}</p>`:''}<span class="visual-source">${tr(v.image?['本站 AI 輔助插圖與解說；不是原書圖表。','Site AI-assisted illustration and explanation; not an original book figure.','本サイトのAI支援イラストと解説です。原書の図表ではありません。']:['本站教學示意，數值依標示模型計算；不是原書圖表。','Site teaching diagram, calculated from the stated model; not an original book figure.','記載モデルに基づいて計算した本サイトの教材図であり、原書の図表ではありません。'],mode)}</span></figcaption></figure>`;
}
export function visualGallery(mode='zh'){
 return `<div class="page visual-gallery"><header class="page-heading"><p class="eyebrow">SEE THE IDEA</p><h1>${tr(['先看圖，建立一點直覺。','See the idea before the equation.','まず図で、直感をつかむ。'],mode)}</h1><p>${tr(['八個案例與概念圖解。每張圖都有條件、圖說與原書小節入口；圖解是補充，完整譯文與原書仍保留。','Eight case and concept visuals, each with its assumptions, explanation and a link to the source section. These supplement the full translations and original book.','8つの事例・概念図解です。前提、解説、対応する原書の節への入口があり、全文翻訳と原書を補足します。'],mode)}</p></header><div class="visual-gallery-grid">${VISUALS.map(v=>`<a class="visual-gallery-card" href="#/lesson/${v.lessons[0]}"><div class="visual-thumb">${visualGraphic(v,mode)}</div><h2>${esc(tr(v.title,mode))}</h2><p>${esc(tr(v.summary,mode))}</p><span>${tr(['前往圖解與原書小節','Open visual and book section','図解と原書の節へ'],mode)}</span></a>`).join('')}</div></div>`;
}
