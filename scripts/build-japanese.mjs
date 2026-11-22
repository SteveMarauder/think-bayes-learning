import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);
const read=name=>JSON.parse(fs.readFileSync(new URL(name,root),'utf8').replace(/^\uFEFF/,''));
const source=read('content.json'),phrases={},names={},coverage=[],conflicts=[];
const add=(en,ja,where)=>{
 assert.equal(typeof ja,'string',`${where}: missing Japanese`);assert.ok(ja.trim(),where);
 if(phrases[en]&&phrases[en]!==ja)conflicts.push({en,first:phrases[en],other:ja,where});
 else phrases[en]=ja;
};
let quizCount=0,guideCount=0,conceptCount=0;
for(const chapter of source.chapters){
 const suffix=String(chapter.id).padStart(2,'0'),translated=read(`translations/ja/ch${suffix}.json`),original=read(`translations/ch${suffix}.json`),locale=read(`locales/ja/chapters/ch${suffix}.json`);
 assert.equal(locale.chapter.id,chapter.id);names[`chapter-${chapter.id}`]=locale.chapter.titleJa;add(chapter.titleEn,locale.chapter.titleJa,`Chapter ${chapter.id}`);
 assert.deepEqual(translated.map(x=>x.id),chapter.sectionIds,'Japanese book TOC coverage');
 assert.deepEqual(locale.lessons.map(x=>x.id),chapter.sectionIds,'Japanese guide TOC coverage');
 let characters=0;
 for(let i=0;i<translated.length;i++){
  const item=translated[i],en=original[i];assert.equal(item.sourceHash,en.sourceHash,item.id);
  assert.equal(crypto.createHash('sha256').update(en.en).digest('hex'),item.sourceHash);
  assert.ok(item.jaMarkdown.length>en.en.length*.25,`${item.id}: translation suspiciously short`);
  assert.equal(item.jaMarkdown.split('```').length%2,1,`${item.id}: unclosed code fence`);
  assert.ok(/[\u3040-\u30ff]/.test(item.jaMarkdown),`${item.id}: not Japanese`);
  assert.ok(!/TODO|翻訳待ち|翻譯待補|translation pending/i.test(item.jaMarkdown),item.id);
  const fixedBlocks=md=>(md.match(/```[\s\S]*?```/g)||[]);
  const originalBlocks=fixedBlocks(en.zhMarkdown),japaneseBlocks=fixedBlocks(item.jaMarkdown);
  assert.equal(japaneseBlocks.length,originalBlocks.length,`${item.id}: code block count`);
  originalBlocks.forEach((raw,n)=>{
   if(/^```text\n/.test(raw)&&/[\u3400-\u9fff]/u.test(raw)){
    const numbers=code=>code.match(/[+-]?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi)||[];
    assert.deepEqual(numbers(japaneseBlocks[n]),numbers(raw),`${item.id}: translated table values changed`);
   }else assert.equal(japaneseBlocks[n],raw,`${item.id}: code/output changed`);
  });
  const equations=md=>(md.replace(/```[\s\S]*?```/g,'').match(/\$\$[\s\S]*?\$\$|\$[^\n$]+?\$/g)||[]).filter(raw=>!/[\u3040-\u30ff\u3400-\u9fff]/u.test(raw)||raw.includes('\\text'));
  assert.deepEqual(equations(item.jaMarkdown),equations(en.zhMarkdown),`${item.id}: math changed`);
  characters+=item.jaMarkdown.length;
  const lesson=source.lessons.find(x=>x.id===item.id),ja=locale.lessons[i];
  names[item.id]=ja.titleJa;add(lesson.titleEn,ja.titleJa,item.id);assert.deepEqual(ja.blocks.map(b=>b.id),lesson.blocks.map(b=>b.id),item.id);
  lesson.blocks.forEach((block,n)=>add(block.en,ja.blocks[n].ja,`${item.id}/${block.id}`));
  add(lesson.example.en,ja.example.ja,`${item.id}/example`);guideCount++;
  if(lesson.reviewNote)add(lesson.reviewNote.en,ja.reviewNote?.ja,`${item.id}/review`);
  assert.deepEqual(ja.quiz.map(q=>q.id),lesson.quiz.map(q=>q.id),item.id);
  lesson.quiz.forEach((q,n)=>{
   const jq=ja.quiz[n];add(q.question.en,jq.question.ja,`${item.id}/${q.id}/question`);
   add(q.explanation.en,jq.explanation.ja,`${item.id}/${q.id}/explanation`);
   assert.deepEqual(jq.options.map(o=>o.id),q.options.map(o=>o.id),item.id);
   q.options.forEach((option,j)=>add(option.en,jq.options[j].ja,`${item.id}/${q.id}/${option.id}`));quizCount++;
  });
 }
 const concepts=source.concepts.filter(c=>c.chapter===chapter.id);assert.deepEqual(locale.concepts.map(c=>c.id),concepts.map(c=>c.id));
 concepts.forEach((concept,i)=>{names[concept.id]=locale.concepts[i].titleJa;add(concept.titleEn,locale.concepts[i].titleJa,concept.id);add(concept.definitionEn,locale.concepts[i].definitionJa,concept.id);conceptCount++;});
 coverage.push({chapter:chapter.id,sections:translated.length,japaneseCharacters:characters});
}
assert.equal(guideCount,195);assert.equal(quizCount,177);assert.equal(conceptCount,36);
fs.mkdirSync(new URL('locales/',root),{recursive:true});
fs.writeFileSync(new URL('locales/ja.json',root),JSON.stringify({language:'ja',status:'complete-draft',guides:guideCount,checks:quizCount,concepts:conceptCount,names,phrases},null,2)+'\n');
fs.writeFileSync(new URL('translations/ja/manifest.json',root),JSON.stringify({language:'ja',status:'complete-draft',authorReviewed:false,source:'Supplied 2021 second-edition PDF, printed pages 1–304; hashes match the existing extracted English sections.',sections:195,chapters:coverage,license:'CC BY-NC-SA-4.0'},null,2)+'\n');
console.log(`PASS: 195 Japanese paragraph translations, 195 guides, 177 checks, 36 concepts; exact source hashes, code/output and math preserved. ${Object.keys(phrases).length} locale phrases.`);
if(conflicts.length)console.log(JSON.stringify({sharedPhraseVariants:conflicts},null,2));
