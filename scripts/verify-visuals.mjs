import assert from 'node:assert/strict';
import fs from 'node:fs';
import {VISUALS,renderVisual,visualGallery,visualForLesson} from '../concept-visuals.js';
import {BAYES_COOKIE,JOINT_PROBABILITIES,betaDensity,betaCdf,betaQuantile,makeMetropolisDemo} from '../visual-math.js';
const data=JSON.parse(fs.readFileSync(new URL('../content.json',import.meta.url)));
assert.equal(VISUALS.length,8);assert.equal(new Set(VISUALS.map(v=>v.id)).size,8);
for(const v of VISUALS){
 for(const id of v.lessons)assert.ok(data.lessons.some(l=>l.id===id));
 for(const field of ['title','summary','note'])assert.ok(v[field].length===3&&v[field].every(s=>s.trim()));
 for(const mode of ['zh','en','ja','both']){
  const html=renderVisual(v.id,mode);assert.ok(html.includes(`data-visual="${v.id}"`));assert.ok(!/undefined|NaN/.test(html));
 }
 if(v.image){assert.ok(fs.statSync(new URL(`../assets/visuals/${v.image}`,import.meta.url)).size>1000);assert.equal(v.alt.length,3);}
}
assert.equal(visualForLesson('TB2-CH02-S01').id,'cookies');assert.equal(visualForLesson('TB2-CH20-S10'),undefined);
for(const mode of ['zh','en','ja'])assert.equal((visualGallery(mode).match(/class="visual-gallery-card"/g)||[]).length,8);
const weights=BAYES_COOKIE.prior.map((p,i)=>p*BAYES_COOKIE.likelihood[i]),z=weights.reduce((a,b)=>a+b);
assert.ok(Math.abs(weights[0]/z-.6)<1e-12);assert.ok(Math.abs(BAYES_COOKIE.posterior.reduce((a,b)=>a+b)-1)<1e-12);
assert.ok(Math.abs(JOINT_PROBABILITIES.flat().reduce((a,b)=>a+b)-1)<1e-12);
let densityArea=0;const steps=10000;
for(let i=1;i<=steps;i++)densityArea+=(betaDensity((i-1)/steps)+betaDensity(i/steps))/(2*steps);
assert.ok(Math.abs(densityArea-1)<1e-7);
const lo=betaQuantile(.05),hi=betaQuantile(.95);
assert.ok(lo<hi&&lo>0&&hi<1);assert.ok(Math.abs(betaCdf(hi)-betaCdf(lo)-.9)<1e-12);
assert.ok(lo>.43&&lo<.44&&hi>.86&&hi<.87);
const chain=makeMetropolisDemo();assert.equal(chain.draws.length,1000);assert.equal(chain.bins.reduce((a,b)=>a+b),1000);
assert.ok(chain.accepted>0&&chain.accepted<chain.iterations);
const mean=chain.draws.reduce((a,b)=>a+b)/1000,variance=chain.draws.reduce((a,b)=>a+(b-mean)**2)/1000;
assert.ok(Math.abs(mean)<.15&&variance>.8&&variance<1.3,'Fixed-seed example must reasonably represent its stated target');
console.log('PASS: 8 trilingual visual guides, source links and images; normalized Bayesian weights/joint table/Beta density, 90% interval and actual Metropolis draws.');
