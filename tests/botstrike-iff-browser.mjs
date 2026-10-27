import {build} from 'esbuild';
import {mkdtemp,readFile,mkdir,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createServer} from 'node:http';
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const dir=await mkdtemp(join(tmpdir(),'botstrike-art-')),out=process.env.ART_OUTPUT||dir;await mkdir(out,{recursive:true});
await build({entryPoints:['tools/botstrike-iff-preview.mjs'],bundle:true,format:'esm',outfile:join(dir,'preview.js')});
const js=await readFile(join(dir,'preview.js'));
const server=createServer(async(req,res)=>{res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");if(/^\/models\/(?:[a-z]+\.glb|textures\/[a-z0-9-]+\.webp)$/.test(req.url)){res.setHeader('Content-Type',req.url.endsWith('.webp')?'image/webp':'model/gltf-binary');return res.end(await readFile('games/botstrike/web'+req.url));}res.setHeader('Content-Type',req.url==='/preview.js'?'text/javascript':'text/html');res.end(req.url==='/preview.js'?js:'<!doctype html><html><style>html,body{margin:0;background:#09121d}canvas{display:block;width:100vw;height:100vh}</style><canvas></canvas><script type="module" src="/preview.js"></script></html>')});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']}),page=await browser.newPage(),errors=[],results=[];page.on('pageerror',e=>{errors.push(e.message);console.error(e.message)});page.setDefaultTimeout(60000);
try{
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.waitForFunction(()=>window.artReady);
 for(const [width,height]of [[1920,1080],[2560,1080],[2560,1440],[3840,2160],[390,844],[844,390]]){
  await page.setViewportSize({width,height});const r=await page.evaluate(()=>renderIFF());assert.equal(r.markers.length,2);assert.ok(r.markers.every(s=>s.depthTest));assert.ok(r.backing<=2560*1440);results.push({width,height,...r});await page.screenshot({path:join(out,`${width}x${height}.png`)});
 }
 const normal=await page.evaluate(()=>renderIFF()),reverse=await page.evaluate(()=>renderIFF({reverse:true}));assert.notEqual(normal.markers[0].color,reverse.markers[0].color);assert.equal(normal.markers[0].color,reverse.markers[1].color);
 assert.equal((await page.evaluate(()=>renderIFF({hidden:true}))).markers.length,1);
 assert.equal((await page.evaluate(()=>renderIFF({dead:true}))).markers.length,1);
 assert.equal((await page.evaluate(()=>renderIFF({smoke:true}))).markers.length,0);
 const scoped=await page.evaluate(()=>renderIFF({scoped:true}));assert.ok(scoped.markers[0].size<normal.markers[0].size);await page.screenshot({path:join(out,'scope.png')});
 assert.deepEqual(errors,[]);await writeFile(join(out,'results.json'),JSON.stringify(results,null,2));console.log('IFF: six viewports, relation reversal, hidden/dead/smoke suppression and scope scaling passed');
}finally{await browser.close();server.close()}
