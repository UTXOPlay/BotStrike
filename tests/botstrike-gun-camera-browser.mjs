// Real WebGL camera, real native recoil states; no production debug endpoint.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {build} from 'esbuild';
const {chromium}=await import(process.env.PLAYWRIGHT_ENTRY||'playwright');
const config={map:1,mode:'deathmatch',heroes:Array(10).fill(0),bots:Array(10).fill(false),difficulty:1,seed:2050};
function nativeState(weapon){
 const input=JSON.stringify({config})+'\n'+Array.from({length:26},(_,i)=>JSON.stringify({inputs:[{seq:i+1,yaw:.2,pitch:.1,fire:true,weapon,scope:weapon===3},...Array(9).fill(null)]})).join('\n')+'\n';
 const frames=execFileSync(process.env.BOTSTRIKE_TEST_ENGINE||'release/botstrike-engine',[],{input,maxBuffer:12e6}).toString().trim().split('\n').map(JSON.parse).filter(v=>v.type==='frame');
 const state=frames[20].state;assert.ok(state.players[0].aim_punch[1]>0);return state;
}
const states=[nativeState(2),nativeState(3)];
const bundle=await build({stdin:{contents:`import {createWorld} from './games/botstrike/client/scene.mjs';import spec from './botstrike/spec.json';import {Vector3} from 'three';
const world=createWorld(document.querySelector('canvas'),spec);world.resolution(.5);
globalThis.gunCameraReady=world.preload().then(()=>true);
globalThis.cameraSample=({state,reduced,pitch,scope})=>{const p=state.players[0];p.scoped=scope;world.resize(80);world.shoot(0,p,1000);world.frame(state,0,1001,1/60,{active:true,yaw:p.yaw,pitch,local:p.position,punch:p.aim_punch,reduced});const dir=world.camera.getWorldDirection(new Vector3()).toArray();return {dir,backing:[world.renderer.domElement.width,world.renderer.domElement.height],fov:world.camera.fov,aspect:world.camera.aspect};};`,resolveDir:process.cwd()},bundle:true,format:'esm',write:false});
const server=createServer(async(req,res)=>{
 try{if(req.url==='/'){res.setHeader('Content-Type','text/html');res.end('<style>html,body{margin:0;overflow:hidden}canvas{width:100vw;height:100vh}</style><canvas></canvas><script type="module" src="/camera.js"></script>');return;}
 if(req.url==='/camera.js'){res.setHeader('Content-Type','text/javascript');res.end(bundle.outputFiles[0].contents);return;}
 const url=new URL(req.url,'http://localhost');if(!/^\/models\/[a-z0-9/.-]+$/.test(url.pathname)||url.pathname.includes('..')){res.writeHead(404).end();return;}
 res.end(await readFile('games/botstrike/web'+url.pathname));}catch{res.writeHead(404).end();}
});await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader']}),page=await browser.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(180000);const measurements=[];
try{
 await page.goto('http://127.0.0.1:'+server.address().port);await page.evaluate(()=>gunCameraReady);
 for(const [width,height]of [[1920,1080],[2560,1080],[2560,1440],[3840,2160],[390,844],[844,390]]){
  await page.setViewportSize({width,height});
  for(const reduced of [false,true])for(const scope of [false,true])for(const pitch of [.1,1.49,-1.49]){
   const state=states[Number(scope)],result=await page.evaluate(arg=>globalThis.cameraSample(arg),{state:structuredClone(state),reduced,pitch,scope});
   const yaw=state.players[0].yaw+state.players[0].aim_punch[0],up=Math.max(-1.5,Math.min(1.5,pitch+state.players[0].aim_punch[1]));
   const expected=[-Math.sin(yaw)*Math.cos(up),Math.sin(up),-Math.cos(yaw)*Math.cos(up)];
   const error=Math.hypot(...result.dir.map((v,a)=>v-expected[a]));assert.ok(error<1e-12,JSON.stringify({width,height,reduced,scope,pitch,error}));
   assert.equal(result.aspect,width/height);assert.ok(result.backing[0]*result.backing[1]<=2560*1440);
   measurements.push({width,height,reduced,scope,pitch,error,...result});
  }
 }
 assert.deepEqual(errors,[]);const out=process.env.ART_OUTPUT||'/tmp/botstrike-tactical-camera';await mkdir(out,{recursive:true});await writeFile(out+'/measurements.json',JSON.stringify({nativeTick:states[0].tick,measurements},null,2));
 console.log(JSON.stringify({cases:measurements.length,maxDirectionError:Math.max(...measurements.map(m=>m.error)),out}));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
