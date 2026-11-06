import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
import {listeningPlan,listeningSummary} from '../tools/audio-listening-protocol.mjs';
import {startAudioListeningLab} from '../tools/serve-audio-listening-lab.mjs';
test('baseline is frozen and all comparison blocks cover identical coarse conditions',()=>{
 const m=JSON.parse(readFileSync(new URL('../tools/audio-baseline-v5/manifest.json',import.meta.url)));
 for(const [file,hash]of Object.entries(m.sha256))assert.equal(createHash('sha256').update(readFileSync(new URL('../tools/audio-baseline-v5/'+file,import.meta.url))).digest('hex'),hash);
 const key=t=>[t.sector,t.range,t.muffled,t.dense].join(':');
 for(const seed of [1,2,2050,0xffffffff]){const p=listeningPlan(seed,{comparisons:true});assert.equal(p.length,144);assert.equal(p[0].mode,'baseline');
  for(let b=0;b<3;b++){const rows=p.filter(t=>t.block===b);assert.equal(rows.length,48);assert.equal(new Set(rows.map(key)).size,48);assert.equal(rows.filter(t=>t.dense).length,24);assert.deepEqual(rows.map(key).sort(),p.slice(0,48).map(key).sort());}
  assert.deepEqual(listeningPlan(seed,{comparisons:true}),p);
 }
 assert.notEqual(listeningPlan(1,{comparisons:true})[48].mode,listeningPlan(2,{comparisons:true})[48].mode);
});
test('summaries preserve unsure/timeouts and exclude interrupted trials without claiming human observations',()=>{
 const trial=listeningPlan()[0],r={automated:true,metadata:{output:'headphones'},rows:[{trial,valid:false},{trial,valid:true,answer:{sector:null,range:null,frontBack:null,timeout:true},reactionMs:12000}]};
 const s=listeningSummary(r);assert.match(s.evidence,/zero human/);assert.equal(s.invalid,1);assert.equal(s.groups.baseline.n,1);assert.equal(s.groups.baseline.direction[trial.sector][8],1);assert.equal(s.groups.baseline.timedOut,1);
});
test('offline listening server serves an allowlist only and never accepts reports or live game access',async()=>{
 const server=await startAudioListeningLab();try{const base='http://127.0.0.1:'+server.address().port;assert.equal((await fetch(base)).status,200);assert.equal((await fetch(base+'/listening.js')).status,200);
  const m=await(await fetch(base+'/manifest.json')).json();assert.equal(m.liveMatchData,false);assert.equal(m.humanObservations,0);
  for(const path of ['/api/state','/.git/config','/botstrike/spec.json','/../package.json'])assert.equal((await fetch(base+path)).status,404);
  assert.equal((await fetch(base,{method:'POST',body:'{}'})).status,405);
 }finally{await new Promise(resolve=>server.close(resolve));}
});
