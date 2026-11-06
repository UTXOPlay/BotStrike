import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
import {identityLabels,identityPlan,identityCues,identitySummary} from '../tools/arsenal-listening-protocol.mjs';
import {startArsenalListeningLab} from '../tools/serve-arsenal-listening-lab.mjs';
test('identity tasks fully balance classes and eight conditions, counterbalance outputs, and keep nuisance factors matched across outputs',()=>{
 const canonical=t=>[t.family,t.target,t.range,t.muffled,t.dense,t.weapon,t.contact].join(':');
 for(const seed of [0,1,2,3,2050,0xffffffff]){
  const p=identityPlan(seed,{paired:true});assert.equal(p.length,320);assert.equal(new Set(p.map(t=>t.id)).size,320);assert.deepEqual(identityPlan(seed,{paired:true}),p);
  assert.equal(p[0].output,seed%2?'headphones':'speakers');
  for(const block of [0,1]){
   const rows=p.filter(t=>t.block===block);assert.equal(rows.length,160);
   for(const [family,labels]of Object.entries(identityLabels))for(let target=0;target<labels.length;target++){
    const cells=rows.filter(t=>t.family===family&&t.target===target);assert.equal(cells.length,8);assert.equal(new Set(cells.map(t=>[t.range,t.muffled,t.dense].join(':'))).size,8);
    if(family==='action')assert.equal(new Set(cells.map(t=>t.weapon)).size,8);
   }
   for(let context=0;context<8;context++){
    // A target class must not be predictable from a different mechanism or
    // step/landing variant assigned only to that class.
    assert.equal(new Set(rows.filter(t=>t.family==='action'&&t.context===context).map(t=>t.weapon)).size,1);
    assert.equal(new Set(rows.filter(t=>t.family==='surface'&&t.context===context).map(t=>t.contact)).size,1);
   }
  }
  assert.deepEqual(p.filter(t=>t.block===0).map(canonical).sort(),p.filter(t=>t.block===1).map(canonical).sort());
 }
 for(const output of ['headphones','speakers','mono'])assert.ok(identityPlan(5,{output}).every(t=>t.output===output));
 assert.throws(()=>identityPlan(5,{output:'invalid'}));
 const spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url),'utf8'));assert.deepEqual(identityLabels.weapon,spec.weapons.map(w=>w.name));
});
test('recognition targets stay centred and dense distractors use other families, with the same cues at each output',()=>{
 for(const t of identityPlan()){
  const cues=identityCues(t),target=cues.filter(c=>c.target),side=cues.filter(c=>!c.target);
  assert.equal(target.length,t.family==='action'?2:3);assert.equal(side.length,t.dense?2:0);
  for(const c of target){assert.equal(c.spatial.bearing,0);assert.equal(c.spatial.level,(t.range==='far'?.3:1)*(t.muffled?.35:1));assert.equal(c.spatial.muffled,t.muffled);}
  assert.ok(side.every(c=>Math.abs(c.spatial.bearing)>1));
  const forbidden=t.family==='weapon'?['shot']:t.family==='surface'?['step','land']:['reload','reload_feed','reload_close','equip','empty'];
  assert.ok(side.every(c=>!forbidden.includes(c.kind)));assert.ok(cues.every((c,i)=>!i||c.ms>=cues[i-1].ms));
 }
});
test('identity report keeps wrong, unsure, timed-out and interrupted observations separate and makes no human or hardware claim',()=>{
 const trial=identityPlan()[0],n=identityLabels[trial.family].length;
 const r={automated:true,rows:[{trial,valid:true,answer:trial.target,reactionMs:1200},{trial,valid:true,answer:(trial.target+1)%n,reactionMs:1300},{trial,valid:true,answer:null,timeout:true,reactionMs:15000},{trial,valid:false,reason:'hidden'}]};
 const s=identitySummary(r),g=Object.values(s.groups)[0];assert.equal(s.invalid,1);assert.equal(g.n,3);assert.equal(g.correct,1);assert.equal(g.unsure,1);assert.equal(g.timeouts,1);assert.equal(g.confusion[trial.target][n],1);assert.match(s.evidence,/zero human/);assert.equal(g.reactionMs.length,3);
 assert.match(identitySummary({...r,automated:false}).evidence,/SELF-REPORTED/);
});
test('identity lab serves frozen in-memory source-bound artifacts, rejects writes and exposes no live match or filesystem routes',async()=>{
 const server=await startArsenalListeningLab();try{
  const base='http://127.0.0.1:'+server.address().port,m=await(await fetch(base+'/manifest.json')).json(),bundle=await(await fetch(base+'/identity.js')).arrayBuffer();
  assert.equal(m.humanObservations,0);assert.equal(m.liveMatchData,false);assert.equal(m.nativeRulesUnchanged,true);assert.equal(m.bundleSha256,createHash('sha256').update(Buffer.from(bundle)).digest('hex'));
  for(const [file,sha]of Object.entries(m.sha256))assert.equal(createHash('sha256').update(await readFile(file)).digest('hex'),sha);
  assert.ok(Object.hasOwn(m.sha256,'games/botstrike/client/shot-sound.mjs'));assert.ok(Object.hasOwn(m.sha256,'games/botstrike/client/footstep-sound.mjs'));assert.ok(Object.hasOwn(m.sha256,'games/botstrike/client/weapon-action-sound.mjs'));
  for(const path of ['/api/state','/.git/config','/botstrike/spec.json','/../package.json','/report'])assert.equal((await fetch(base+path)).status,404);
  assert.equal((await fetch(base,{method:'POST',body:'{}'})).status,405);assert.match((await fetch(base)).headers.get('content-security-policy'),/form-action 'none'/);
 }finally{await new Promise(resolve=>server.close(resolve));}
});
