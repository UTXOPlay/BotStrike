import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,statSync,rmSync,mkdirSync,chmodSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {ActorTrace,publicSnapshot,NetworkBrowserActor,NETWORK_GAME_ORIGIN,classifyWebGLRenderer,browserRuntimePaths} from '../tools/network-browser-actors.mjs';

test('private actor trace is bounded, refuses overwrite and records truncation without dropping old evidence',t=>{
 const directory=mkdtempSync(path.join(tmpdir(),'network-browser-actors-test-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));const trace=new ActorTrace(directory,'A',{maxBytes:4096});const first={kind:'input',data:{input:{seq:1,viewTick:5,yaw:.1}}};assert.equal(trace.append(first),true);for(let i=0;i<100;i++)trace.append({kind:'presentation',data:{index:i,padding:'x'.repeat(100)}});const before=readFileSync(trace.file),receipt=trace.close({humanParticipants:0});assert.ok(receipt.bytes<=4096);assert.ok(receipt.dropped>0);assert.equal(receipt.persistenceError,null);assert.equal(receipt.sha256,createHash('sha256').update(before).digest('hex'));assert.deepEqual(JSON.parse(before.toString().split('\n')[0]),first);assert.equal(statSync(directory).mode&0o777,0o700);assert.equal(statSync(trace.file).mode&0o777,0o600);assert.equal(statSync(trace.receiptFile).mode&0o777,0o600);assert.throws(()=>new ActorTrace(directory,'A'),/EEXIST/);assert.throws(()=>new ActorTrace(directory,'../escape'),/actor ID/);
 const publicDirectory=path.join(directory,'public');mkdirSync(publicDirectory);chmodSync(publicDirectory,0o755);assert.throws(()=>new ActorTrace(publicDirectory,'B'),/private directory/);
});
test('public snapshot recording strips credentials and hidden poses while keeping exact own Native acknowledgements',()=>{
 const player={slot:0,life:2,alive:true,team:0,position:[1,2,3],velocity:[4,5,6],last_seq:35,yaw:.1,pitch:.2,account:'SECRET_ACCOUNT',token:'SECRET_TOKEN'},room={id:'private-invite-code',slot:0,status:'running',state:{tick:100,phase:'live',round:2,config:{mode:'demolition',map:0},players:[player,{...player,slot:5,hidden:true},{...player,slot:6,optical:false},{...player,slot:7,position:[7,8,9]}]},feedback:[{id:1,tick:100,kind:'hit',actor:0,target:7,value:20,account:'SECRET_ACCOUNT'}]};
 const result=publicSnapshot(room);assert.deepEqual(result.players.map(player=>player.slot),[0,7]);assert.equal(result.players[0].last_seq,35);assert.deepEqual(result.players[0].position,[1,2,3]);const json=JSON.stringify(result);for(const secret of ['SECRET_ACCOUNT','SECRET_TOKEN','private-invite-code'])assert.equal(json.includes(secret),false);assert.equal(result.events[0].kind,'hit');assert.deepEqual(publicSnapshot(null),{status:null,slot:null,tick:null});
});
test('old socket observations remain traceable but cannot replace the active room or ownership cache',t=>{
 const directory=mkdtempSync(path.join(tmpdir(),'network-browser-actors-sockets-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));const trace=new ActorTrace(directory,'B'),page={setDefaultTimeout(){},on(){}},actor=new NetworkBrowserActor('B',null,null,page,trace),fake=()=>{const handlers=new Map();return {url:()=>NETWORK_GAME_ORIGIN.replace(/^http/,'ws')+'/games/botstrike/api/socket',on:(name,fn)=>handlers.set(name,fn),receive:value=>handlers.get('framereceived')({payload:JSON.stringify(value)}),send:value=>handlers.get('framesent')({payload:JSON.stringify(value)})};};
 const a=fake(),b=fake();actor.watchSocket(a);a.receive({type:'state',room:{id:'first',slot:0,status:'waiting'}});actor.watchSocket(b);b.receive({type:'state',room:{id:'second',slot:5,status:'waiting'}});b.receive({type:'control',active:true,nextSeq:10,token:'DO_NOT_RECORD'});a.receive({type:'control',active:false,nextSeq:0,token:'DO_NOT_RECORD'});a.receive({type:'state',room:{id:'first',slot:0,status:'waiting'}});assert.equal(actor.currentRoom.id,'second');assert.equal(actor.control.active,true);assert.equal(actor.lastSnapshot.currentSocket,false);a.send({type:'input',room:'first',controlToken:'DO_NOT_RECORD',input:{seq:3,viewTick:20,yaw:.5}});assert.equal(actor.lastInput.roomGeneration,1);assert.equal(actor.roomGeneration,2);trace.close();assert.equal(readFileSync(trace.file,'utf8').includes('DO_NOT_RECORD'),false);
});

test('hardware capability rejects absent or software renderer evidence',()=>{
 assert.equal(classifyWebGLRenderer(null),'unknown');assert.equal(classifyWebGLRenderer({unmaskedRenderer:'ANGLE (Intel, Mesa Intel Iris Xe, OpenGL ES 3.2)'}),'hardware');for(const name of ['SwiftShader','llvmpipe','softpipe','software rasterizer'])assert.equal(classifyWebGLRenderer({unmaskedRenderer:name}),'software');assert.equal(classifyWebGLRenderer({unmaskedRenderer:'unrecognized vendor'}),'unknown');
});
test('closed actors cancel input, presentation and room waits before reading stale cache',async()=>{
 const actor=Object.create(NetworkBrowserActor.prototype);Object.assign(actor,{id:'A',closed:true,closing:false,timeout:1000,recent:new Map(),currentRoom:{status:'running'}});actor.drain=()=>{throw Error('closed capture must not be read');};
 await assert.rejects(actor.waitInput(()=>true),/actor is closed/);await assert.rejects(actor.waitPresentation(()=>true),/actor is closed/);await assert.rejects(actor.waitRoom(()=>true),/actor is closed/);actor.closed=false;actor.closing=true;await assert.rejects(actor.waitRoom(()=>true),/actor is closed/);
});

test('runtime paths resolve without launching and read current environment overrides on each call',t=>{
 const original={playwright:process.env.PLAYWRIGHT_ENTRY,chromium:process.env.CHROMIUM_PATH};t.after(()=>{for(const [name,value]of [['PLAYWRIGHT_ENTRY',original.playwright],['CHROMIUM_PATH',original.chromium]]){if(value===undefined)delete process.env[name];else process.env[name]=value;}});
 delete process.env.PLAYWRIGHT_ENTRY;delete process.env.CHROMIUM_PATH;const defaults=browserRuntimePaths();assert.equal(typeof defaults.playwrightEntry,'string');assert.ok(defaults.playwrightEntry.length>0);assert.ok(defaults.executablePath===undefined||typeof defaults.executablePath==='string');
 process.env.PLAYWRIGHT_ENTRY='/private/nonexistent/playwright/index.mjs';process.env.CHROMIUM_PATH='/private/nonexistent/chrome';assert.deepEqual(browserRuntimePaths(),{playwrightEntry:process.env.PLAYWRIGHT_ENTRY,executablePath:process.env.CHROMIUM_PATH});
 process.env.PLAYWRIGHT_ENTRY='';process.env.CHROMIUM_PATH='';assert.deepEqual(browserRuntimePaths(),defaults);
});
