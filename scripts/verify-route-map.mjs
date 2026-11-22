import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildLearningPath} from '../learning-path.js';
import {routeGeometry,wrapMapLabel} from '../route-map.js';
const {chapters,lessons}=JSON.parse(fs.readFileSync(new URL('../content.json',import.meta.url)));
const read=chapters.slice(0,2).flatMap(ch=>ch.sectionIds);
const path=buildLearningPath(chapters,lessons,read,chapters[1].sectionIds.at(-1));
assert.equal(path.next.chapter,3);assert.equal(path.last.chapter,2);
for(const compact of [false,true]){
 const layout=routeGeometry(path.stages,compact);
 assert.deepEqual(layout.nodes.map(n=>n.chapter.id),chapters.map(c=>c.id));
 assert.equal(layout.edges.length,19);
 layout.edges.forEach((edge,i)=>{assert.equal(edge.from,i+1);assert.equal(edge.to,i+2);assert.ok(!edge.d.includes('NaN'));});
 assert.equal(layout.edges[0].complete,true);assert.equal(layout.edges[1].complete,false);
 assert.equal(new Set(layout.nodes.map(n=>`${n.x},${n.y}`)).size,20);
 assert.ok(layout.nodes.every(n=>n.x>=0&&n.x<=layout.width&&n.y>=0&&n.y<=layout.height));
 if(compact)assert.ok(layout.nodes.slice(1).every((n,i)=>n.y>layout.nodes[i].y));
 else assert.ok(layout.nodes.slice(3,8).every((n,i,a)=>!i||n.x<a[i-1].x));
}
for(const title of ['近似ベイズ計算','Minimum, Maximum, and Mixture','最小值、最大值與混合'])assert.equal(wrapMapLabel(title).join('').replace(/\s/g,''),title.replace(/\s/g,''));
console.log('PASS: connected 20-node/19-edge routes, desktop turns, mobile order and distinct current/next/completed chapter states.');
