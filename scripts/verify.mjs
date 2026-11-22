import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
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
assert.ok(!json.includes('C:\\\\Users\\\\'));
assert.ok(!json.includes('C:/Users/'));
const p=.5,a=p*.75,b=(1-p)*.5;
assert.equal(a/(a+b),.6);
console.log(`PASS: 20 chapters; 195 unique, aligned bilingual guides; 70 source exercises; ${checks} valid concept checks; source-page mappings, assets and cookie reference calculation.`);
