import assert from 'node:assert/strict';
import {DEMO_OBSERVATIONS,evidenceState} from '../home-experience.js';
import {betaDensity,betaCdf} from '../visual-math.js';

assert.equal(DEMO_OBSERVATIONS.length,40);
assert.equal(DEMO_OBSERVATIONS.reduce((sum,value)=>sum+value,0),26);
for(let n=0;n<=40;n++){
 const s=evidenceState(n);
 assert.equal(s.a+s.b,n+2);
 assert.equal(s.heads+s.tails,n);
 assert.equal(s.a,1+DEMO_OBSERVATIONS.slice(0,n).filter(Boolean).length);
 assert.ok(s.low<s.mean&&s.mean<s.high);
 assert.ok(Math.abs(betaCdf(s.high,s.a,s.b)-betaCdf(s.low,s.a,s.b)-.9)<1e-10);
 let area=0,peak=0;const steps=10000;
 for(let i=0;i<=steps;i++){
  const density=betaDensity(i/steps,s.a,s.b);
  assert.ok(Number.isFinite(density)&&density>=0);
  peak=Math.max(peak,density);area+=density*((i===0||i===steps)?0.5:1)/steps;
 }
 assert.ok(Math.abs(area-1)<2e-7,`n=${n}: area=${area}`);
 assert.ok(peak<6.6,`n=${n}: curve exceeds the shared chart scale`);
}
assert.equal(evidenceState(-5).n,0);
assert.equal(evidenceState(99).n,40);
assert.equal(evidenceState(40).mean,27/42);
console.log('PASS: all 41 coin-update states have normalized densities, exact conjugate parameters, 90% interval mass and a shared unclipped chart scale.');
