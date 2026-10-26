import {build} from 'esbuild';
import {mkdtemp,readFile,mkdir,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createServer} from 'node:http';
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const dir=await mkdtemp(join(tmpdir(),'botstrike-art-')),out=process.env.ART_OUTPUT||dir;await mkdir(out,{recursive:true});
await build({entryPoints:['tools/botstrike-art-preview.mjs'],bundle:true,format:'esm',outfile:join(dir,'preview.js')});
const js=await readFile(join(dir,'preview.js'));
const server=createServer((req,res)=>{res.setHeader('Content-Type',req.url==='/preview.js'?'text/javascript':'text/html');res.end(req.url==='/preview.js'?js:'<!doctype html><html><style>html,body{margin:0;background:#09121d}canvas{display:block;width:100vw;height:100vh}</style><canvas></canvas><script type="module" src="/preview.js"></script></html>')});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']}),page=await browser.newPage(),errors=[],results=[];page.on('pageerror',e=>errors.push(e.message));
try{await page.goto(`http://127.0.0.1:${server.address().port}`);await page.waitForFunction(()=>window.artReady);
 for(let hero=0;hero<6;hero++){await page.setViewportSize({width:720,height:900});const result=await page.evaluate(hero=>renderHero(hero),hero);await page.screenshot({path:join(out,`hero-${hero}.png`)});assert.ok(result.calls<50);assert.ok(result.triangles<100000);results.push({hero,...result});console.log('hero',hero,result)}
 for(const kind of ['weapon','equipment'])for(let index=0;index<12;index++){await page.setViewportSize({width:640,height:360});const result=await page.evaluate(([k,i])=>renderArsenal(k,i),[kind,index]);await page.screenshot({path:join(out,`${kind}-${index}.png`)});assert.ok(result.calls<30);results.push({kind,index,...result});}
 await page.setViewportSize({width:1920,height:1080});const lineup=await page.evaluate(()=>renderLineup());await page.screenshot({path:join(out,'lineup.png')});results.push({lineup});
 for(let map=0;map<3;map++){const result=await page.evaluate(map=>renderMap(map),map);await page.screenshot({path:join(out,`map-${map}.png`)});assert.ok(result.calls<220);results.push({map,...result});console.log('map',map,result)}
 const memory=await page.evaluate(()=>checkMapResources());assert.equal(memory.after.textures,memory.before.textures,'map switching releases textures');assert.equal(memory.after.geometries,memory.before.geometries,'map switching releases geometry');results.push({memory});assert.deepEqual(errors,[]);await writeFile(join(out,'results.json'),JSON.stringify(results,null,2));console.log('Art evidence:',out);
}finally{await browser.close();server.close()}
