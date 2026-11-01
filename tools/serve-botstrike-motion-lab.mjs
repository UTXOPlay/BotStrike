import {build} from 'esbuild';
import {readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {pathToFileURL} from 'node:url';

const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>BotStrike motion lab</title>
<style>html,body{margin:0;background:#101c29;overflow:hidden;color:#e0f4ff;font:clamp(12px,.85vw,22px) monospace}canvas{display:block;width:100vw;height:100vh}aside{position:fixed;top:max(10px,env(safe-area-inset-top));left:max(10px,env(safe-area-inset-left));right:max(10px,env(safe-area-inset-right));pointer-events:none}nav,pre{width:fit-content;max-width:100%;box-sizing:border-box;background:#091622e8;padding:10px;border-radius:5px;white-space:pre-wrap;overflow-wrap:anywhere}nav{display:flex;flex-wrap:wrap;gap:8px;pointer-events:auto}select,button{font:inherit;background:#203d50;color:inherit;padding:6px;border:1px solid #557485}pre{line-height:1.5}label{display:flex;align-items:center}@media(max-height:450px){pre{font-size:11px;line-height:1.2;margin:5px 0;padding:5px}}</style>
<canvas></canvas><aside><nav><select id="mode" aria-label="Animation mode"><option>candidate</option><option>baseline</option></select><select id="scenario" aria-label="Movement sequence"></select><select id="fps" aria-label="Frame rate"><option>60</option><option>30</option><option>120</option></select><label><input id="reduced" type="checkbox">Reduced motion</label><button id="play">Play / pause</button><button id="restart">Restart</button></nav><pre id="debug">Loading motion lab…</pre></aside><script type="module" src="/lab.js"></script></html>`;
export async function startMotionLab(port=0){
 const bundle=await build({entryPoints:['tools/botstrike-motion-lab.mjs'],bundle:true,format:'esm',write:false});
 const server=createServer(async(req,res)=>{
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
  try{
   if(/^\/models\/(?:[a-z]+\.glb|textures\/[a-z0-9-]+\.webp)$/.test(req.url)){res.setHeader('Content-Type',req.url.endsWith('.webp')?'image/webp':'model/gltf-binary');res.end(await readFile('games/botstrike/web'+req.url));}
   else if(req.url==='/lab.js'){res.setHeader('Content-Type','text/javascript');res.end(bundle.outputFiles[0].contents);}
   else if(req.url==='/'){res.setHeader('Content-Type','text/html');res.end(html);}
   else{res.statusCode=404;res.end();}
  }catch{res.statusCode=404;res.end();}
 });
 await new Promise(resolve=>server.listen(port,'127.0.0.1',resolve));return server;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const server=await startMotionLab(Number(process.env.PORT||4173));console.log(`Motion lab: http://127.0.0.1:${server.address().port}`);}
