import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
const start=fileURLToPath(new URL('./start.mjs',import.meta.url));
test('only an explicitly instrumented launcher hands its own PID to the runtime; inherited PID spoof is removed',async t=>{
 for(const enabled of [true,false,'true',undefined])await t.test(String(enabled),async sub=>{
  const directory=await mkdtemp(path.join(tmpdir(),'botstrike-host-pid-')),output=path.join(directory,'runtime.json'),runtime=path.join(directory,'runtime.mjs'),config=path.join(directory,'config.json');
  await writeFile(runtime,`import {writeFileSync} from 'node:fs';writeFileSync(${JSON.stringify(output)},JSON.stringify({gateway:process.env.BOTSTRIKE_GATEWAY_PID,parent:process.ppid}));setInterval(()=>{},1000);`);
  await writeFile(config,JSON.stringify({name:'gateway-pid-fixture',port:0,runtimePort:0,...(enabled===undefined?{}:{transportQuality:enabled}),games:[{id:'botstrike',webRoot:directory,runtimePath:'',socket:true}],runtimeCommand:[process.execPath,runtime]}));
  const env={...process.env,GAME_HOST_CONFIG:config,RUNTIME_TOKEN:'gateway-launch-fixture-private-'.repeat(2),BOTSTRIKE_GATEWAY_PID:'2147483000',WEB_PORT:'0',RUNTIME_PORT:'0'};delete env.RUNTIME_URL;delete env.RUNTIME_BINARY;
  const child=spawn(process.execPath,[start],{env,stdio:['ignore','ignore','pipe']});let stderr='';child.stderr.on('data',b=>stderr+=b);
  sub.after(async()=>{if(child.exitCode===null&&child.signalCode===null){const done=once(child,'exit');child.kill('SIGTERM');await done;}await rm(directory,{recursive:true,force:true});});
  let record;const end=Date.now()+10000;while(Date.now()<end){try{record=JSON.parse(await readFile(output,'utf8'));break;}catch(error){if(error.code!=='ENOENT')throw error;}if(child.exitCode!==null)throw Error(stderr||'Launcher exited');await new Promise(resolve=>setTimeout(resolve,10));}
  assert.ok(record,'runtime fixture started');assert.equal(record.parent,child.pid);assert.equal(record.gateway,enabled===true?String(child.pid):undefined);assert.notEqual(record.gateway,'2147483000');
 });
});

async function shutdownFixture(t,{body='',external=false,missing=false}={}){
 const directory=await mkdtemp(path.join(tmpdir(),'botstrike-host-stop-')),ready=path.join(directory,'ready.json'),done=path.join(directory,'done.json'),runtime=path.join(directory,'runtime.mjs'),config=path.join(directory,'config.json');
 await writeFile(runtime,`import {writeFileSync} from 'node:fs';const ready=${JSON.stringify(ready)},done=${JSON.stringify(done)};${body}`);
 await writeFile(config,JSON.stringify({name:'shutdown-fixture',port:0,runtimePort:0,games:[{id:'botstrike',webRoot:directory,runtimePath:'',socket:true}],runtimeCommand:missing?['/no/such/botstrike-runtime-executable']:[process.execPath,runtime]}));
 const env={...process.env,GAME_HOST_CONFIG:config,RUNTIME_TOKEN:'shutdown-fixture-private-token-'.repeat(2),WEB_PORT:'0',RUNTIME_PORT:'0'};delete env.RUNTIME_URL;delete env.RUNTIME_BINARY;if(external)env.RUNTIME_URL='http://127.0.0.1:1';
 const child=spawn(process.execPath,[start],{env,stdio:['ignore','pipe','pipe']});let stdout='',stderr='';child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);const exited=new Promise(resolve=>child.once('exit',(code,signal)=>resolve({code,signal})));
 t.after(async()=>{if(child.exitCode===null&&child.signalCode===null){child.kill('SIGTERM');await exited;}await rm(directory,{recursive:true,force:true});});
 async function waitReady(){const end=Date.now()+5000;while(Date.now()<end){if(external&&stdout.includes('shutdown-fixture:'))return;try{return JSON.parse(await readFile(ready,'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}if(child.exitCode!==null)throw Error(stderr||'Host exited before ready');await new Promise(resolve=>setTimeout(resolve,5));}throw Error('Fake runtime startup timeout');}
 return{child,exited,waitReady,done,ready};
}

test('host waits for asynchronous runtime SIGTERM finalization and repeated stop signals do not interrupt it',async t=>{
 const f=await shutdownFixture(t,{body:`let signals=0;process.on('SIGTERM',()=>{signals++;setTimeout(()=>{writeFileSync(done,JSON.stringify({signals,finished:true}));process.exit(0);},180);});writeFileSync(ready,'{}');setInterval(()=>{},1000);`});
 await f.waitReady();const started=Date.now();f.child.kill('SIGTERM');await new Promise(resolve=>setTimeout(resolve,20));f.child.kill('SIGTERM');const exit=await f.exited;
 assert.equal(exit.code,0);assert.deepEqual(JSON.parse(await readFile(f.done,'utf8')),{signals:1,finished:true});assert.ok(Date.now()-started>=150,'parent cannot exit before the child finishes its async write');
});

test('already-exited runtime, spawn failure and external runtime stop without waiting for a nonexistent child',async t=>{
 await t.test('already exited',async sub=>{const f=await shutdownFixture(sub,{body:`writeFileSync(ready,'{}');process.exit(7);`});assert.equal((await f.exited).code,7);});
 await t.test('spawn failed',async sub=>{const f=await shutdownFixture(sub,{missing:true});const started=Date.now();assert.equal((await f.exited).code,1);assert.ok(Date.now()-started<2000,'ENOENT child has no exit event to await');});
 await t.test('external runtime',async sub=>{const f=await shutdownFixture(sub,{external:true,body:`throw Error('External mode must not spawn this child');`});await f.waitReady();f.child.kill('SIGTERM');assert.equal((await f.exited).code,0);await assert.rejects(readFile(f.ready,'utf8'),{code:'ENOENT'});});
});

test('a runtime ignoring SIGTERM remains bounded by the existing three-second SIGKILL deadline',async t=>{
 const f=await shutdownFixture(t,{body:`process.on('SIGTERM',()=>{});writeFileSync(ready,'{}');setInterval(()=>{},1000);`});await f.waitReady();const started=Date.now();f.child.kill('SIGTERM');assert.equal((await f.exited).code,0);const elapsed=Date.now()-started;assert.ok(elapsed>=2700&&elapsed<5000,'three-second cap is retained: '+elapsed);
});
