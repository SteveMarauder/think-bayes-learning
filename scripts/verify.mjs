import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'content.json'),'utf8'));
assert.equal(data.chapters.length,20);
assert.equal(data.lessons.length,195);
assert.equal(data.exercises.length,70);
assert.equal(new Set(data.lessons.map(l=>l.id)).size,195);
let checks=0;
for(const chapter of data.chapters){
 assert.ok(chapter.titleZh&&chapter.titleEn);
 const expected=data.lessons.filter(l=>l.chapter===chapter.id).map(l=>l.id);
 assert.deepEqual(chapter.sectionIds,expected);
}
for(const l of data.lessons){
 assert.ok(l.titleZh&&l.titleEn);
 assert.equal(l.pdfPage,l.printPage+16);
 assert.ok(l.pdfEnd>=l.pdfPage&&l.pdfEnd<=320);
 assert.ok(l.blocks.length>=2);
 assert.equal(new Set(l.blocks.map(b=>b.id)).size,l.blocks.length);
 for(const b of [...l.blocks,l.example])assert.ok(b.zh?.trim()&&b.en?.trim(),`${l.id}: missing aligned language`);
 assert.equal(new Set(l.quiz.map(q=>q.id)).size,l.quiz.length);
 if(l.kind!=='exercise_index')assert.ok(l.quiz.length>=1,`${l.id}: missing concept check`);
 for(const q of l.quiz){
  checks++;
  assert.ok(q.question.zh&&q.question.en&&q.explanation.zh&&q.explanation.en);
  assert.ok(q.options.length>=3);
  assert.equal(new Set(q.options.map(o=>o.id)).size,q.options.length);
  assert.ok(q.options.some(o=>o.id===q.correct));
  for(const o of q.options)assert.ok(o.zh&&o.en);
 }
}
for(const c of data.concepts)assert.ok(data.lessons.some(l=>l.id===c.lessonId));
for(const f of data.figures){assert.ok(fs.existsSync(path.join(root,f.file)));for(const id of f.lessonIds)assert.ok(data.lessons.some(l=>l.id===id));}
for(const file of ['index.html','app.js','styles.css','vendor/pdf.mjs','vendor/pdf.worker.mjs','assets/think-bayes-2e.pdf','LICENSE','CONTENT-LICENSE.txt'])assert.ok(fs.statSync(path.join(root,file)).size>0,file);
const json=JSON.stringify(data);
assert.equal(data.translation.status,'complete-draft');
assert.equal(data.translation.translatedSections,195);
assert.equal(data.translation.coverage.length,20);
const translationIds=new Set();
for(const chapter of data.chapters){
 const translated=JSON.parse(fs.readFileSync(path.join(root,`translations/ch${String(chapter.id).padStart(2,'0')}.json`),'utf8'));
 assert.deepEqual(translated.map(x=>x.id),chapter.sectionIds);
 for(const item of translated){
  assert.ok(!translationIds.has(item.id));translationIds.add(item.id);
  assert.equal(crypto.createHash('sha256').update(item.en).digest('hex'),item.sourceHash,`${item.id}: source mismatch`);
  assert.ok(item.zhMarkdown.length>item.en.length*.2,`${item.id}: translation unexpectedly short`);
  assert.equal(item.zhMarkdown.split('```').length%2,1,`${item.id}: code fence not closed`);
 }
}
assert.equal(translationIds.size,195);
for(const file of ['tech.css','vendor/marked.umd.js','vendor/purify.min.js','vendor/katex/katex.min.js','vendor/katex/katex.min.css','translations/manifest.json'])assert.ok(fs.statSync(path.join(root,file)).size>0,file);
assert.ok(!json.includes('C:\\\\Users\\\\'));
assert.ok(!json.includes('C:/Users/'));
const p=.5,a=p*.75,b=(1-p)*.5;
assert.equal(a/(a+b),.6);
console.log(`PASS: 20 chapters; 195 full-section translations matched to source hashes; 195 supplementary guides; 70 source exercises; ${checks} valid concept checks; local assets and source-page mappings.`);
