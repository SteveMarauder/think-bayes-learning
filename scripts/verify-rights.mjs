import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {licensesPage,usageNotice,lessonReferences} from '../rights.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const inventory=JSON.parse(fs.readFileSync(path.join(root,'rights-manifest.json'),'utf8'));
const files=dir=>fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(`${dir}/${e.name}`):[`${dir}/${e.name}`]);
const digest=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
assert.deepEqual(inventory.assets.map(a=>a.path).sort(),files('assets').sort(),'Every media/provenance file needs an inventory entry.');
for(const a of inventory.assets)assert.equal(digest(a.path),a.sha256,a.path);
const covered=new Set();
for(const lib of inventory.libraries){
 for(const p of lib.noticePaths)assert.ok(fs.statSync(path.join(root,p)).size>500,p);
 for(const f of lib.files){assert.equal(digest(f.path),f.sha256,f.path);covered.add(f.path);}
}
for(const p of files('vendor').filter(p=>/\.(?:js|mjs|css|ttf|woff2?)$/.test(p)))assert.ok(covered.has(p),`Uninventoried third-party runtime/font: ${p}`);
assert.match(fs.readFileSync(path.join(root,'vendor/KATEX-FONTS-OFL.txt'),'utf8'),/SIL OPEN FONT LICENSE Version 1\.1/);
assert.equal(inventory.sourceBook.license,'CC-BY-NC-SA-4.0');
assert.equal(inventory.thirdPartyReview.status,'not-independently-cleared');
assert.ok(inventory.references.length>100);
for(const r of inventory.references){assert.ok(r.pdfPage>=1&&r.pdfPage<=338);assert.ok(['http:','https:'].includes(new URL(r.url).protocol));}
for(const mode of ['zh','en','ja','both']){
 const html=licensesPage(mode,inventory);
 assert.ok(!html.includes('undefined'));
 for(const m of html.matchAll(/href="\.\/([^"#]+)(?:#[^"]*)?"/g))assert.ok(fs.existsSync(path.join(root,m[1])),m[1]);
 assert.ok(usageNotice(mode,{lesson:{printPage:44,printEnd:46}}).includes('#/licenses'));
 assert.ok(lessonReferences(mode,{printPage:44,printEnd:46},inventory).includes('https://oreil.ly/'));
}
console.log(`PASS: ${inventory.assets.length} media/provenance files and ${covered.size} third-party runtime/font files match recorded hashes; license documents cover all bundled files; ${inventory.references.length} source references; four reading modes render with valid local license links.`);
