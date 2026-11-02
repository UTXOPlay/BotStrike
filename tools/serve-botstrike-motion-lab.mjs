import {build} from 'esbuild';
import {readFile,mkdir,writeFile,readdir} from 'node:fs/promises';
import {createServer} from 'node:http';
import {pathToFileURL} from 'node:url';
import {createHash,randomBytes} from 'node:crypto';
import {networkInterfaces} from 'node:os';

const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>BotStrike motion lab</title>
<style>html,body{margin:0;background:#101c29;overflow:hidden;color:#e0f4ff;font:clamp(12px,.85vw,22px) monospace}canvas{display:block;width:100vw;height:100vh}aside{position:fixed;top:max(10px,env(safe-area-inset-top));left:max(10px,env(safe-area-inset-left));right:max(10px,env(safe-area-inset-right));pointer-events:none}nav,pre{width:fit-content;max-width:100%;box-sizing:border-box;background:#091622e8;padding:10px;border-radius:5px;white-space:pre-wrap;overflow-wrap:anywhere}nav{display:flex;flex-wrap:wrap;gap:8px;pointer-events:auto}select,button{font:inherit;background:#203d50;color:inherit;padding:6px;border:1px solid #557485}pre{line-height:1.5}label{display:flex;align-items:center}@media(max-height:450px){pre{font-size:11px;line-height:1.2;margin:5px 0;padding:5px}}</style>
<style>#rotate{display:none}#toggle-controls,#measure,#download{pointer-events:auto}.folded nav,.folded pre{display:none}@media(pointer:coarse){nav{max-height:36vh;overflow:auto}#measure-status{background:#091622e8}}@media(pointer:coarse) and (orientation:portrait){#rotate{position:fixed;inset:0;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;background:#101c29}aside{display:none}}</style><canvas></canvas><section id="rotate" role="dialog" aria-label="Landscape required"><h1>Turn to landscape</h1><p>Rotate your phone sideways to review the motion.</p><p>Measurements stop if you rotate or hide this page.</p></section><aside><button id="toggle-controls">Controls / diagnostics</button><button id="measure">Measure A/B</button><button id="download" disabled>Download measurements</button><nav><select id="mode" aria-label="Animation mode"><option>candidate</option><option>baseline</option></select><select id="scenario" aria-label="Movement sequence"></select><select id="hero" aria-label="Chassis"><option value="mixed">All chassis</option></select><select id="weapon" aria-label="Weapon"></select><select id="view" aria-label="Camera"><option value="lineup">Ten-rig lineup</option><option value="front">Front</option><option value="side">Side</option><option value="back">Back</option><option value="feet">Feet</option><option value="first-person">First person</option></select><select id="count" aria-label="Visible rigs"><option>10</option><option>6</option><option>1</option></select><select id="fps" aria-label="Frame rate"><option>60</option><option>30</option><option>120</option></select><label><input id="reduced" type="checkbox">Reduced motion</label><label><input id="diagnostics" type="checkbox" checked>Contact diagnostics</label><button id="play">Play / pause</button><button id="restart">Restart</button><button id="fullscreen">Fullscreen</button></nav><pre id="debug">Loading motion lab…</pre><p id="measure-status" aria-live="polite"></p></aside><script type="module" src="./lab.js"></script></html>`;
export async function startMotionLab(port=0,{lan=false,output='/tmp/botstrike-device-measurements',previous=null}={}){
 const entries=Array.isArray(previous)?previous:previous?[previous]:[];
 if(entries.some(value=>!/^[a-f0-9]{36}$/.test(value)))throw Error('Invalid previous lab entry');
 const bundle=await build({entryPoints:['tools/botstrike-motion-lab.mjs'],bundle:true,format:'esm',write:false});
 const prefix=lan?'/'+randomBytes(18).toString('hex'):'',files=new Map([['/lab.js',bundle.outputFiles[0].contents]]);
 for(const name of ['vector','patch','bastion','spectre','glitch','forge'])for(const baseline of [false,true]){
  const key=(baseline?'/baseline':'')+'/models/'+name+'.glb';files.set(key,await readFile(baseline?'assets/characters/baseline/'+name+'.glb':'games/botstrike/web/models/'+name+'.glb'));
 }
 for(const name of await readdir('games/botstrike/web/models/textures'))if(/^[a-z0-9-]+\.webp$/.test(name))files.set('/models/textures/'+name,await readFile('games/botstrike/web/models/textures/'+name));
 const manifest={baselineCommit:'0c2c5f91712e69661b4cd2cc9326f21b58375208',sha256:Object.fromEntries([...files].map(([name,data])=>[name,createHash('sha256').update(data).digest('hex')]))};
 const server=createServer(async(req,res)=>{
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
  try{
   const path=new URL(req.url,'http://localhost').pathname;
   if(lan&&req.method==='GET'&&entries.some(value=>path==='/'+value+'/')){res.writeHead(302,{Location:prefix+'/'});res.end();return;}
   if(prefix&&!path.startsWith(prefix+'/')){res.statusCode=404;res.end();return;}
   const route=path.slice(prefix.length);
   if(req.method==='POST'&&route==='/measurements'){
    // A bounded same-origin sink for this temporary lab, never a production API.
    if(req.headers.origin!==`http://${req.headers.host}`){res.statusCode=403;res.end();return;}
    let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>2_000_000){res.statusCode=413;res.end();return;}}
    const report=JSON.parse(body);if(report.schema!==1||!report.device||!Array.isArray(report.runs)){res.statusCode=400;res.end();return;}
    const name=Date.now()+'-'+randomBytes(6).toString('hex')+'.json';await mkdir(output,{recursive:true});await writeFile(output+'/'+name,JSON.stringify(report,null,2));
    res.setHeader('Content-Type','application/json');res.end(JSON.stringify({name}));
   }
   else if(req.method!=='GET'){res.statusCode=405;res.end();}
   else if(route==='/manifest.json'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify(manifest));}
   else if(files.has(route)){res.setHeader('Content-Type',route.endsWith('.js')?'text/javascript':route.endsWith('.webp')?'image/webp':'model/gltf-binary');res.end(files.get(route));}
   else if(route==='/'){res.setHeader('Content-Type','text/html');res.end(html);}
   else{res.statusCode=404;res.end();}
  }catch{res.statusCode=404;res.end();}
 });
 await new Promise(resolve=>server.listen(port,lan?'0.0.0.0':'127.0.0.1',resolve));server.labPrefix=prefix;return server;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const lan=process.env.MOTION_LAB_LAN==='1',server=await startMotionLab(Number(process.env.PORT||4173),{lan,previous:process.env.MOTION_LAB_PREVIOUS?.split(',')||[]});
 const addresses=lan?Object.values(networkInterfaces()).flat().filter(a=>a.family==='IPv4'&&!a.internal).map(a=>a.address):['127.0.0.1'];
 for(const address of addresses)console.log(`Motion lab: http://${address}:${server.address().port}${server.labPrefix}/`);
}
