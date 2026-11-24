// Source ranges are checked offline against both unchanged source/translation hashes.
const unwrap=raw=>raw.replace(/([A-Za-z])\u2010\s*\n\s*([a-z])/g,'$1$2').replace(/[ \t]*\n[ \t]*/g,' ').trim();
const normalized=raw=>raw.replace(/^\s*(?:```|~~~)[^\n]*$/gm,'').replace(/[^\p{L}\p{N}]/gu,'').toLowerCase();

export function englishBlock(raw,kind,escape){
 if(kind==='code'||kind==='equation')return `<pre class="parallel-source-code"><code>${escape(raw.trim())}</code></pre>`;
 if(kind==='heading')return `<h3>${escape(unwrap(raw))}</h3>`;
 if(kind==='list'){
  const items=raw.trim().split(/\n(?=\s*(?:[•●]|\d+\.)\s*)/).map(part=>part.replace(/^\s*(?:[•●]|\d+\.)\s*/,''));
  const tag=/^\s*\d+\./.test(raw)?'ol':'ul';
  return `<${tag}>${items.map(item=>`<li>${escape(unwrap(item))}</li>`).join('')}</${tag}>`;
 }
 const body=`<p>${escape(unwrap(raw))}</p>`;
 return kind==='blockquote'?`<blockquote>${body}</blockquote>`:body;
}

export function alignedReading(item,{mode,escape,markdown}){
 if(!item.parallel?.segments?.length)return null;
 return item.parallel.segments.map((segment,index)=>{
  const chinese=item.zhMarkdown.slice(segment.zhStart,segment.zhEnd);
  const english=item.en.slice(segment.enStart,segment.enEnd);
  const original=segment.enBlocks.map(([start,end,kind])=>englishBlock(item.en.slice(start,end),kind,escape)).join('');
  const anchor=`data-block-id="literal-${index}" data-pair-id="${escape(item.id)}-p${index+1}"`;
  if(mode==='zh')return `<div class="literal-segment" ${anchor} lang="zh-Hant">${markdown(chinese)}</div>`;
  if(mode==='en')return `<div class="literal-segment parallel-original" ${anchor} lang="en">${original}</div>`;
  const sharedEquation=segment.kindZh==='equation'&&segment.enBlocks.every(block=>block[2]==='equation');
  const sharedCode=segment.kindZh==='code'&&segment.enBlocks.every(block=>block[2]==='code')&&normalized(english)===normalized(chinese);
  if(sharedEquation||sharedCode){
   return `<section class="literal-segment translation-pair pair-shared" ${anchor}><div class="pair-language">${sharedEquation?'原書公式 · Shared equation':'原書程式碼與輸出 · Shared code & output'}</div><div class="parallel-shared">${markdown(chinese)}</div></section>`;
  }
  return `<section class="literal-segment translation-pair" ${anchor}><div class="parallel-original" lang="en"><div class="pair-language">英文原文 <span>EN</span></div>${original}</div><div class="parallel-chinese" lang="zh-Hant"><div class="pair-language">中文翻譯 <span>繁體中文</span></div>${markdown(chinese)}</div></section>`;
 }).join('');
}
