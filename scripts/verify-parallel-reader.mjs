import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {alignedReading,englishBlock} from '../parallel-reader.js';
const digest=s=>crypto.createHash('sha256').update(s).digest('hex');
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let sections=0,pairs=0;
for(let chapter=1;chapter<=20;chapter++){
 const items=JSON.parse(fs.readFileSync(new URL(`../translations/ch${String(chapter).padStart(2,'0')}.json`,import.meta.url),'utf8'));
 for(const item of items){
  const alignment=item.parallel;assert.equal(alignment.version,1,item.id);
  assert.equal(digest(item.en),alignment.sourceHash);assert.equal(alignment.sourceHash,item.sourceHash);
  assert.equal(digest(item.zhMarkdown),alignment.translationHash);
  let e=0,z=0;
  for(const s of alignment.segments){
   assert.equal(s.enStart,e,item.id);assert.equal(s.zhStart,z,item.id);
   assert.ok(s.enEnd>s.enStart&&s.zhEnd>s.zhStart,item.id);
   let blockEnd=s.enStart;
   for(const [start,end,kind] of s.enBlocks){assert.equal(start,blockEnd,item.id);assert.ok(end>start);assert.ok(['paragraph','heading','blockquote','list','equation','code'].includes(kind));blockEnd=end;}
   assert.equal(blockEnd,s.enEnd,item.id);e=s.enEnd;z=s.zhEnd;pairs++;
  }
  assert.equal(e,item.en.length,item.id);assert.equal(z,item.zhMarkdown.length,item.id);
  assert.equal(alignment.segments.map(s=>item.en.slice(s.enStart,s.enEnd)).join(''),item.en);
  assert.equal(alignment.segments.map(s=>item.zhMarkdown.slice(s.zhStart,s.zhEnd)).join(''),item.zhMarkdown);
  for(const mode of ['zh','en','both']){
   const html=alignedReading(item,{mode,escape,markdown:escape});
   assert.equal((html.match(/data-pair-id=/g)||[]).length,alignment.segments.length,item.id);
   if(mode==='both')assert.equal((html.match(/class="literal-segment translation-pair/g)||[]).length,alignment.segments.length,item.id);
  }
  sections++;
 }
}
assert.equal(sections,195);
assert.ok(englishBlock('<img src=x onerror=alert(1)>','paragraph',escape).includes('&lt;img'));
assert.ok(!englishBlock('<script>alert(1)</script>','code',escape).includes('<script>'));
assert.ok(englishBlock('proba‐\nbility','paragraph',escape).includes('probability'));
console.log(`PASS: ${sections} complete sections; ${pairs} contiguous source/translation pairs, matching hashes, no dropped/duplicate text, stable anchors in three modes and escaped source HTML.`);
