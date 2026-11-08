import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {CareerStore} from '../botstrike-service/career.mjs';
import {pruneReplays} from '../botstrike-service/retention.mjs';

const DAY=86400000,now=1800000000000,old=now-40*DAY;
const run=promisify(execFile);
const accounts=['a','b','c'].map(c=>c.repeat(64)),roomId='d'.repeat(24);
const failure=code=>Object.assign(Error('Injected filesystem failure'),{code});
function source(id=roomId){return{id,kind:'public',config:{mode:'deathmatch',map:0,difficulty:1},status:'finished',proof:{verified:true},created:old-100000,finishedAt:old,members:accounts.slice(0,2),state:{tick:4096,winner:0,score:[50,30]},participants:Object.fromEntries(accounts.map((id,i)=>[id,{ticks:100,lastTick:4096,kills:i+1,deaths:i,damage:25*(i+1),team:i%2}]))};}
async function fixture(t,room=source()){
 const data=await fs.mkdtemp(path.join(tmpdir(),'botstrike-quality-recovery-'));t.after(()=>fs.rm(data,{recursive:true,force:true}));
 const directory=path.join(data,'rooms',room.id),file=path.join(directory,'room.json');
 await fs.mkdir(directory,{recursive:true});await fs.mkdir(path.join(data,'accounts'));
 await fs.writeFile(file,JSON.stringify(room));await fs.utimes(file,old/1000,old/1000);
 const reference=path.join(data,'accounts',accounts[0]+'.json');await fs.writeFile(reference,JSON.stringify({room:room.id}));await fs.utimes(reference,old/1000,old/1000);
 return{data,file,directory,reference,room,alerts:[]};
}
const careerFile=(data,id)=>path.join(data,'careers',id+'.json');
const json=async file=>JSON.parse(await fs.readFile(file,'utf8'));
async function exists(file){try{await fs.lstat(file);return true;}catch(error){if(error.code==='ENOENT')return false;throw error;}}
const store=(f,io={})=>new CareerStore(f.data,{io,onAlert:alert=>f.alerts.push(alert)});
async function prune(f,report,io={}){
 // This is the server integration contract: a failed whole-directory scan
 // cannot yield a complete protection set, so no deletion may run that cycle.
 if(report&&!report.scanComplete)return[];
 return pruneReplays(f.data,{now,days:30,protectedRooms:report?.protectedRooms,onAlert:alert=>f.alerts.push(alert),io});
}
async function assertOnce(f){
 const current=store(f);
 for(const [i,id]of accounts.entries()){
  const value=await current.view(id);assert.equal(value.version,1);assert.equal(value.matches,1);assert.equal(value.kills,i+1);assert.equal(value.damage,25*(i+1));assert.equal(value.history.length,1);
  assert.equal(value.history[0].outcome,i===2?'left':i===0?'win':'loss');
 }
}

test('partial ENOSPC commits other accounts, retains the sole source, and restart recovery/prune applies each once',async t=>{
 const f=await fixture(t);let failedWrites=0;
 const io={open:async(file,...args)=>{
  const handle=await fs.open(file,...args);
  if(file.startsWith(careerFile(f.data,accounts[1])+'.tmp-'))return{
   writeFile:async()=>{failedWrites++;await handle.writeFile('{"version":');throw failure('ENOSPC');},
   sync:()=>handle.sync(),close:()=>handle.close()
  };
  return handle;
 }};
 const first=await store(f,io).recover();assert.equal(failedWrites,1);assert.equal(first.scanComplete,true);assert.equal(first.complete,false);assert.equal(first.pending,1);assert.deepEqual([...first.protectedRooms],[roomId]);
 assert.ok(first.alerts.some(a=>a.stage==='account-write'&&a.code==='ENOSPC'));assert.equal(first.recovered,0);
 assert.equal((await json(careerFile(f.data,accounts[0]))).matches,1);assert.equal((await json(careerFile(f.data,accounts[2]))).matches,1);assert.equal(await exists(careerFile(f.data,accounts[1])),false);
 const before=await fs.readFile(careerFile(f.data,accounts[0]),'utf8');assert.equal((await json(f.file)).careerCommitted,undefined);
 assert.deepEqual(await prune(f,first),[]);assert.equal(await exists(f.file),true);assert.equal(await exists(f.reference),true);
 // Independent retention also fails closed if an integration omits the set.
 assert.deepEqual(await prune(f),[]);assert.ok(f.alerts.some(a=>a.source==='retention'&&a.code==='CAREER_PENDING'));
 assert.deepEqual((await fs.readdir(path.join(f.data,'careers'))).sort(),[accounts[0]+'.json',accounts[2]+'.json']);
 const restarted=store(f),[second,third]=await Promise.all([restarted.recover(),restarted.recover()]);
 assert.equal(second.complete,true);assert.equal(second.recovered,1);assert.equal(third.recovered,0);assert.equal(third.complete,true);
 assert.equal(await fs.readFile(careerFile(f.data,accounts[0]),'utf8'),before);await assertOnce(f);
 assert.ok(Math.abs((await fs.stat(f.file)).mtimeMs-old)<1,'recovery preserves recording age');
 assert.deepEqual(await prune(f,second),[roomId]);assert.equal(await exists(f.directory),false);assert.equal(await exists(f.reference),false);
 assert.equal((await store(f).recover()).complete,true);await assertOnce(f);
});

test('failed room metadata rename leaves all career markers idempotent until restart repairs the room marker',async t=>{
 const f=await fixture(t),original=await fs.readFile(f.file,'utf8');
 const first=await store(f,{rename:async(from,to)=>{if(to===f.file)throw failure('EIO');return fs.rename(from,to);}}).recover();
 assert.equal(first.complete,false);assert.ok(first.alerts.some(a=>a.stage==='room-mark'&&a.code==='EIO'));await assertOnce(f);
 assert.equal(await fs.readFile(f.file,'utf8'),original);assert.deepEqual(await prune(f,first),[]);
 assert.deepEqual((await fs.readdir(f.directory)).sort(),['room.json']);
 const result=await store(f).recover();assert.equal(result.complete,true);assert.equal(result.recovered,1);await assertOnce(f);
 assert.deepEqual(await prune(f,result),[roomId]);await assertOnce(f);
});

test('the live commit API reports partial failure, remains usable, and recovery marks the durable room once',async t=>{
 const f=await fixture(t);let blocked=true;
 const current=store(f,{open:async(file,...args)=>{if(blocked&&file.startsWith(careerFile(f.data,accounts[1])+'.tmp-'))throw failure('ENOSPC');return fs.open(file,...args);}});
 await assert.rejects(current.commit(f.room),error=>error instanceof AggregateError&&error.code==='CAREER_INCOMPLETE'&&error.partial.applied===2);
 assert.ok(f.alerts.some(a=>a.code==='ENOSPC'));assert.equal((await current.view(accounts[0])).matches,1);assert.equal((await current.view(accounts[1])).matches,0);
 assert.deepEqual(await prune(f),[]);blocked=false;const result=await current.recover();assert.equal(result.complete,true);await assertOnce(f);assert.deepEqual(await prune(f,result),[roomId]);
});

test('new Node processes recover, prune and restart from a partial commit with no in-memory protection or ledger state',async t=>{
 const f=await fixture(t);
 const report=await store(f,{open:async(file,...args)=>{if(file.startsWith(careerFile(f.data,accounts[1])+'.tmp-'))throw failure('ENOSPC');return fs.open(file,...args);}}).recover();assert.equal(report.complete,false);assert.deepEqual(await prune(f,report),[]);
 const script=`
  import {CareerStore} from ${JSON.stringify(new URL('../botstrike-service/career.mjs',import.meta.url).href)};
  import {pruneReplays} from ${JSON.stringify(new URL('../botstrike-service/retention.mjs',import.meta.url).href)};
  const [data,clock,ids]=process.argv.slice(1),alerts=[];
  const career=new CareerStore(data,{onAlert:a=>alerts.push(a)}),report=await career.recover();
  const removed=report.scanComplete?await pruneReplays(data,{now:Number(clock),days:30,protectedRooms:report.protectedRooms,onAlert:a=>alerts.push(a)}):[];
  const views=await Promise.all(JSON.parse(ids).map(id=>career.view(id)));
  process.stdout.write(JSON.stringify({report:{...report,protectedRooms:[...report.protectedRooms]},removed,views,alerts}));
 `;
 const restart=async()=>{const result=await run(process.execPath,['--input-type=module','-e',script,f.data,String(now),JSON.stringify(accounts)],{timeout:10000});assert.equal(result.stderr,'');return JSON.parse(result.stdout);};
 const second=await restart();assert.equal(second.report.complete,true);assert.equal(second.report.recovered,1);assert.deepEqual(second.removed,[roomId]);assert.deepEqual(second.views.map(v=>v.matches),[1,1,1]);assert.deepEqual(second.views.map(v=>v.kills),[1,2,3]);assert.equal(await exists(f.directory),false);assert.equal(await exists(f.reference),false);
 const third=await restart();assert.equal(third.report.complete,true);assert.equal(third.report.recovered,0);assert.deepEqual(third.removed,[]);assert.deepEqual(third.views,second.views);
});

test('post-rename directory sync failure is reported, and retry syncs existing application markers without adding again',async t=>{
 const f=await fixture(t);let failed=false;
 const first=await store(f,{open:async(file,...args)=>{if(file===path.join(f.data,'careers')&&args[0]==='r'&&!failed){failed=true;throw failure('EIO');}return fs.open(file,...args);}}).recover();
 assert.equal(first.complete,false);assert.ok(first.alerts.some(a=>a.code==='EIO'));assert.equal((await json(careerFile(f.data,accounts[0]))).matches,1);
 assert.deepEqual(await prune(f,first),[]);
 const result=await store(f).recover();assert.equal(result.complete,true);await assertOnce(f);assert.deepEqual(await prune(f,result),[roomId]);
});

test('room timestamp failure cannot publish its committed marker or refresh retention age',async t=>{
 const f=await fixture(t);
 const first=await store(f,{open:async(file,...args)=>{
  const handle=await fs.open(file,...args);if(!file.startsWith(f.file+'.tmp-'))return handle;
  return{writeFile:bytes=>handle.writeFile(bytes),utimes:async()=>{throw failure('ENOSPC');},sync:()=>handle.sync(),close:()=>handle.close()};
 }}).recover();
 assert.equal(first.complete,false);assert.equal((await json(f.file)).careerCommitted,undefined);assert.ok(Math.abs((await fs.stat(f.file)).mtimeMs-old)<1);
 assert.deepEqual(await prune(f,first),[]);const result=await store(f).recover();assert.equal(result.complete,true);await assertOnce(f);assert.deepEqual(await prune(f,result),[roomId]);
});

test('malformed source JSON, mismatched identity and damaged attribution remain available for repair',async t=>{
 for(const [label,damage]of [
  ['json',()=>'{broken'],
  ['identity',room=>JSON.stringify({...room,id:'e'.repeat(24)})],
  ['attribution',room=>JSON.stringify({...room,participants:{[accounts[0]]:{...room.participants[accounts[0]],kills:-1}}})],
  ['result',room=>JSON.stringify({...room,state:{...room.state,score:null}})]
 ])await t.test(label,async sub=>{
  const f=await fixture(sub),broken=damage(f.room);await fs.writeFile(f.file,broken);await fs.utimes(f.file,old/1000,old/1000);
  const result=await store(f).recover();assert.equal(result.complete,false);assert.equal(result.pending,1);assert.ok(result.alerts.some(a=>a.code==='INVALID_DATA'));
  assert.deepEqual(await prune(f,result),[]);assert.deepEqual(await prune(f),[]);assert.equal(await fs.readFile(f.file,'utf8'),broken);assert.equal(await exists(path.join(f.data,'careers')),false);
  await fs.writeFile(f.file,JSON.stringify(f.room));await fs.utimes(f.file,old/1000,old/1000);const repaired=await store(f).recover();assert.equal(repaired.complete,true);await assertOnce(f);assert.deepEqual(await prune(f,repaired),[roomId]);
 });
});

test('corrupt career JSON/schema never resets an aggregate and blocks source expiry until its backup is restored',async t=>{
 for(const [label,damage]of [['json',()=>'{broken'],['schema',value=>JSON.stringify({...value,matches:0})]])await t.test(label,async sub=>{
  const f=await fixture(sub);await store(f).commit(f.room);const file=careerFile(f.data,accounts[1]),backup=await fs.readFile(file,'utf8'),broken=damage(JSON.parse(backup));await fs.writeFile(file,broken);
  const result=await store(f).recover();assert.equal(result.complete,false);assert.ok(result.alerts.some(a=>a.stage==='account-read'&&a.code==='INVALID_DATA'));assert.deepEqual(await prune(f,result),[]);
  assert.equal(await fs.readFile(file,'utf8'),broken);await assert.rejects(store(f).view(accounts[1]),{code:'INVALID_DATA'});
  await fs.writeFile(file,backup);const repaired=await store(f).recover();assert.equal(repaired.complete,true);await assertOnce(f);assert.deepEqual(await prune(f,repaired),[roomId]);
 });
});

test('committed source with missing or damaged account is protected rather than guessed or double credited',async t=>{
 const f=await fixture(t);assert.equal((await store(f).recover()).complete,true);const file=careerFile(f.data,accounts[0]),backup=await fs.readFile(file,'utf8');await fs.unlink(file);
 const missing=await store(f).recover();assert.equal(missing.complete,false);assert.ok(missing.alerts.some(a=>a.code==='ENOENT'));assert.equal(await exists(file),false);assert.deepEqual(await prune(f,missing),[]);
 await fs.writeFile(file,backup);const damaged=JSON.parse(backup);delete damaged.applied[roomId];damaged.matches=0;damaged.wins=0;damaged.history=[];await fs.writeFile(file,JSON.stringify(damaged));
 const inconsistent=await store(f).recover();assert.equal(inconsistent.complete,false);assert.ok(inconsistent.alerts.some(a=>a.code==='INVALID_DATA'));assert.deepEqual(await prune(f,inconsistent),[]);
 await fs.writeFile(file,backup);const repaired=await store(f).recover();assert.equal(repaired.complete,true);await assertOnce(f);assert.deepEqual(await prune(f,repaired),[roomId]);
});

test('a directory scan failure reports incomplete coverage and the maintenance cycle skips deletion',async t=>{
 const f=await fixture(t);const result=await store(f,{readdir:async()=>{throw failure('EACCES');}}).recover();
 assert.equal(result.scanComplete,false);assert.equal(result.complete,false);assert.equal(result.scanned,0);assert.deepEqual(result.alerts,[{source:'career',stage:'scan',code:'EACCES'}]);
 assert.deepEqual(await prune(f,result),[]);assert.equal(await exists(f.file),true);assert.equal(await exists(f.reference),true);
 await assert.rejects(prune(f,undefined,{readdir:async()=>{throw failure('EACCES');}}),{code:'EACCES'});assert.ok(f.alerts.some(a=>a.source==='retention'&&a.stage==='room-scan'));
 const repaired=await store(f).recover();assert.equal(repaired.complete,true);assert.deepEqual(await prune(f,repaired),[roomId]);
});

test('account-directory ENOSPC preserves pending attribution and an independently recoverable next scan',async t=>{
 const f=await fixture(t);const result=await store(f,{mkdir:async()=>{throw failure('ENOSPC');}}).recover();
 assert.equal(result.complete,false);assert.ok(result.alerts.some(a=>a.stage==='account-directory'&&a.code==='ENOSPC'));assert.deepEqual(await prune(f,result),[]);assert.equal((await json(f.file)).careerCommitted,undefined);
 const repaired=await store(f).recover();assert.equal(repaired.complete,true);await assertOnce(f);assert.deepEqual(await prune(f,repaired),[roomId]);
});

test('damaged/missing room metadata and unsafe symlinks are retained without following them',async t=>{
 const f=await fixture(t);await fs.unlink(f.file);const missing=await store(f).recover();assert.equal(missing.complete,false);assert.ok(missing.alerts.some(a=>a.stage==='room-read'&&a.code==='ENOENT'));assert.deepEqual(await prune(f,missing),[]);
 const outside=path.join(f.data,'sentinel.json');await fs.writeFile(outside,JSON.stringify(f.room));const before=await fs.readFile(outside,'utf8');await fs.symlink(outside,f.file);
 const symlink=await store(f).recover();assert.equal(symlink.complete,false);assert.deepEqual(await prune(f),[]);assert.equal(await fs.readFile(outside,'utf8'),before);
 await fs.unlink(f.file);await fs.writeFile(f.file,before);await fs.utimes(f.file,old/1000,old/1000);
 await fs.mkdir(path.join(f.data,'careers'));await fs.symlink(outside,careerFile(f.data,accounts[0]));const accountLink=await store(f).recover();assert.equal(accountLink.complete,false);assert.ok(accountLink.alerts.some(a=>a.stage==='account-read'&&a.code==='INVALID_DATA'));assert.equal(await fs.readFile(outside,'utf8'),before);assert.deepEqual(await prune(f,accountLink),[]);
});

test('retention preserves corrupt account references and treats only ENOENT as a missing target',async t=>{
 const f=await fixture(t);await store(f).recover();await fs.rm(f.directory,{recursive:true});const files=[];
 for(const [i,bytes]of ['{broken',JSON.stringify({room:'../sentinel'}),JSON.stringify({room:roomId}),JSON.stringify({room:null})].entries()){
  const file=path.join(f.data,'accounts',(i+1).toString(16).repeat(64)+'.json');await fs.writeFile(file,bytes);await fs.utimes(file,old/1000,old/1000);files.push(file);
 }
 const lstat=async file=>{if(file===f.directory)throw failure('EACCES');return fs.lstat(file);};assert.deepEqual(await prune(f,undefined,{lstat}),[]);
 assert.equal(await exists(files[0]),true);assert.equal(await exists(files[1]),true);assert.equal(await exists(files[2]),true);assert.equal(await exists(files[3]),false);assert.equal(await exists(f.reference),true);
 assert.ok(f.alerts.some(a=>a.stage==='account'&&a.code==='INVALID_DATA'));assert.ok(f.alerts.some(a=>a.stage==='account'&&a.code==='EACCES'));
 assert.deepEqual(await prune(f),[]);assert.equal(await exists(files[2]),false);assert.equal(await exists(f.reference),false);assert.equal(await exists(files[0]),true);assert.equal(await exists(files[1]),true);
});

test('practice, tactical and legacy unattributed rooms expire without inventing career entries',async t=>{
 for(const [label,change]of [['practice',room=>{room.config.mode='practice';}],['tactical',room=>{room.config.ruleset='tactical';}],['legacy',room=>{delete room.participants;}]])await t.test(label,async sub=>{
  const room=source();change(room);const f=await fixture(sub,room),result=await store(f).recover();assert.equal(result.complete,true);assert.equal(result.recovered,0);assert.equal(await exists(path.join(f.data,'careers')),false);assert.deepEqual(await prune(f,result),[roomId]);
 });
});

test('v1 aggregates retain the latest fifty results, draw/left rules, and room-level idempotence',async t=>{
 const f=await fixture(t),current=store(f),rooms=Array.from({length:53},(_,i)=>{
  const room=source((i+1).toString(16).padStart(24,'0'));room.finishedAt=old+i*1000;if(i===0)room.state.winner=null;return room;
 });
 for(const room of [...rooms].reverse())await current.commit(room);
 for(const room of rooms)await current.commit(room);
 const restarted=store(f),a=await restarted.view(accounts[0]),b=await restarted.view(accounts[1]),c=await restarted.view(accounts[2]);
 assert.equal(a.version,1);assert.equal(a.matches,53);assert.equal(a.wins,52);assert.equal(a.draws,1);assert.equal(a.kills,53);assert.equal(b.losses,52);assert.equal(b.draws,1);assert.equal(c.wins+c.losses+c.draws,0);
 assert.equal(a.history.length,50);assert.deepEqual(a.history.map(item=>item.id),rooms.slice(3).reverse().map(room=>room.id));assert.equal(c.history[0].outcome,'left');
 const stored=await json(careerFile(f.data,accounts[0]));assert.equal(Object.keys(stored.applied).length,53);
});
