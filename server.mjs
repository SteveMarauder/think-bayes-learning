import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.pdf':'application/pdf','.txt':'text/plain; charset=utf-8','.wasm':'application/wasm','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'};
http.createServer((req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  let name=decodeURIComponent(url.pathname).replace(/^\/+/, '');
  if(!name)name='index.html';
  const file=path.resolve(root,name);
  if(!file.startsWith(root+path.sep)||name.split(/[\\/]/).some(p=>p.startsWith('.'))){res.writeHead(403).end();return;}
  const st=fs.statSync(file);if(!st.isFile()){res.writeHead(404).end();return;}
  const headers={'Content-Type':mime[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'};
  const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if(range){const start=Number(range[1]),end=Math.min(st.size-1,range[2]?Number(range[2]):st.size-1);if(start>=st.size||start>end){res.writeHead(416,{'Content-Range':`bytes */${st.size}`}).end();return;}res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${st.size}`,'Content-Length':end-start+1});if(req.method==='HEAD')res.end();else fs.createReadStream(file,{start,end}).pipe(res);}
  else{res.writeHead(200,{...headers,'Content-Length':st.size});if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);}
 }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
