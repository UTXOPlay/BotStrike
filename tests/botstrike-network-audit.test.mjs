import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,stat} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {runNetworkAudit,compareNetworkHashes} from '../tools/run-network-audit.mjs';
import {recordNetworkFixture} from '../tools/network-audit-fixtures.mjs';
import {modelDigest} from '../tools/damage-contract-source.mjs';
const exec=promisify(execFile),MODEL='4cb119b7638d14fb08cafad9905e9d8bc808d04b233e8d0c4599e6cd79e4ed49';

test('source-native shot witness matches every exact release frame on normal production controls',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'botstrike-network-audit-test-'));
 const fixture=await recordNetworkFixture(path.join(dir,'fixture.jsonl'));
 const {out,report}=await runNetworkAudit({tape:path.join(dir,'fixture.jsonl'),out:path.join(dir,'audit'),ticks:fixture.labels.map(l=>l.tick)});
 assert.equal(report.sourceNativeWitness,true);assert.equal(report.provenance.modelSha256,MODEL);assert.equal(modelDigest(),MODEL);
 assert.equal(report.provenance.retainedProfileSha256,'c5a72be9466ddd4efa23aa6574541714c8112510ba7f2d7008dd0849f8a9925d');
 assert.equal(report.agreement.allFrameStateHashesMatched,true);assert.equal(report.agreement.traceHashMatched,true);assert.equal(report.agreement.finalStateHashMatched,true);assert.equal(report.agreement.comparedTicks,fixture.ticks);assert.ok(report.agreement.selectedTicks.every(t=>t.matched));
 assert.equal(report.source.trace_hash,fixture.result.trace_hash);assert.equal(report.source.state_hash,fixture.result.state_hash);assert.equal(report.source.omittedDetailFrames,0);assert.equal(report.source.rejectedWitnesses,0);
 const frames=(await readFile(path.join(out,'timeline.jsonl'),'utf8')).trim().split('\n').map(JSON.parse),at=name=>frames.find(f=>f.tick===fixture.labels.find(l=>l.name===name).tick),witness=name=>at(name).witness;
 for(const f of frames){assert.equal(f.witness.available,true);assert.equal(f.witness.rng.matched,true);assert.equal(f.witness.damageAgrees,true);assert.equal(f.witness.rng.draws,2);assert.ok(f.witness.rewindTick===null||f.tick-f.witness.rewindTick<=13);}
 assert.deepEqual([...new Set(frames.map(f=>f.witness.weapon))].sort(),[0,2,3]);assert.deepEqual([...new Set(frames.filter(f=>f.witness.damageEvents.length).map(f=>f.witness.weapon))].sort(),[0,2,3],'each audited weapon has a real native damage event, not only a miss');
 const crouch=witness('ion-crouch-transition').preShot,stand=witness('ion-stand-transition').preShot;
 assert.equal(crouch.crouch,true);assert.equal(stand.crouch,false);assert.ok(crouch.pose.stance>0&&crouch.pose.stance<1);assert.ok(stand.pose.stance>crouch.pose.stance&&stand.pose.stance<1);
 const jump=witness('rail-jump').preShot;assert.ok(jump.pose.position[1]>0&&jump.pose.velocity[1]>0&&jump.accuracyMultiplier>1);
 const reverse=at('ion-counter-strafe');assert.equal(reverse.controls[0].x,-1);assert.ok(reverse.witness.preShot.pose.velocity[0]>0&&reverse.witness.preShot.pose.velocity[0]<305,'first reversing frame keeps damped positive native momentum');assert.ok(reverse.witness.preShot.accuracyMultiplier>1);
 const cover=witness('front-cover-blocks-target').ray;assert.equal(cover.winner,'cover');assert.equal(cover.target,null);assert.ok(cover.candidates.find(c=>c.slot===5).intersection.distance>cover.distance);assert.deepEqual(witness('front-cover-blocks-target').damageEvents,[]);
 const exposed=witness('current-pose-slot-order');assert.equal(exposed.ray.winner,'player');assert.equal(exposed.ray.target,5);assert.equal(exposed.rewindTick,null);assert.ok(exposed.ray.candidates.find(c=>c.slot===5).pose.position[0]<at('current-pose-slot-order').authoritativePoses[5].position[0],'later slot is hit at its pre-movement pose, not frame-end pose');
 const peek=witness('peek-and-multiple-target-nearest');assert.equal(peek.ray.target,5);assert.equal(at('peek-and-multiple-target-nearest').tick-peek.rewindTick,7,'production frame advances tick before exact history lookup');const hits=peek.ray.candidates.filter(c=>c.eligible&&c.intersection);assert.ok(hits.length>=2);assert.ok(hits.find(c=>c.slot===6).intersection.distance>peek.ray.distance);assert.ok(peek.ray.coverOrGroundDistance>peek.ray.distance,'cover behind target cannot steal the nearer hit');assert.ok(at('peek-and-multiple-target-nearest').events.some(e=>e.kind==='kill'&&e.target===5));assert.equal(peek.damageEvents.length,1,'native kill repeats damage accounting; count the primary hit once');
 const respawn=witness('old-dead-history-isolated-from-new-life').ray.candidates.find(c=>c.slot===5);assert.equal(respawn.currentAlive,true);assert.equal(respawn.historicalAlive,false);assert.equal(respawn.eligible,false);assert.notEqual(respawn.currentLife,respawn.historicalLife);
 for(const frame of frames)for(const candidate of frame.witness.ray.candidates){assert.equal(candidate.currentPose.life,candidate.currentLife);assert.equal(candidate.currentPose.alive,candidate.currentAlive);assert.deepEqual(candidate.pose,candidate.historicalPose??candidate.currentPose);}
 const currentTarget=exposed.ray.candidates.find(c=>c.slot===5);assert.equal(currentTarget.historicalPose,null);assert.deepEqual(currentTarget.currentPose,currentTarget.pose);assert.ok(currentTarget.currentPose.position[0]<at('current-pose-slot-order').authoritativePoses[5].position[0],'current-at-fire serialization must retain slot-loop order rather than substitute frame-end pose');
 assert.equal(respawn.currentPose.life,respawn.currentLife);assert.equal(respawn.historicalPose.life,respawn.historicalLife);assert.equal(respawn.historicalPose.alive,false);
 assert.equal((await stat(out)).mode&0o777,0o700);for(const file of ['timeline.jsonl','source-hashes.jsonl','exact-hashes.jsonl','report.json'])assert.equal((await stat(path.join(out,file))).mode&0o777,0o600);
 assert.equal(fixture.synthetic,true);assert.equal(fixture.humanParticipants,0);
});

test('Rust oracle probes cover nearest/behind, exact rewind bounds and packed forms without changing source model',async()=>{
 const result=await exec('cargo',['test','--locked','--release','--manifest-path','botstrike/Cargo.toml','--example','network_audit','--target-dir',path.join(tmpdir(),'botstrike-network-audit-target')],{timeout:60000,maxBuffer:65536});
 assert.match(result.stdout,/test result: ok\. \d+ passed; 0 failed/);assert.match(result.stdout,/same_hero_is_full_step_noop_for_live_buy_and_respawning_players.*ok/);assert.equal(modelDigest(),MODEL);
});

test('hash comparison reports the first mismatch and missing source frames; it never tolerates float differences',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'botstrike-network-hash-test-')),source=path.join(dir,'source'),exact=path.join(dir,'exact');
 await writeFile(source,'{"tick":1,"stateHash":"same"}\n{"tick":2,"stateHash":"source"}\n');
 await writeFile(exact,'{"tick":1,"stateHash":"same"}\n{"tick":2,"stateHash":"exact"}\n{"tick":3,"stateHash":"extra"}\n{"result":{"ticks":3}}\n');
 const result=await compareNetworkHashes(source,exact,new Set([1,2,3]));assert.equal(result.firstMismatch.tick,2);assert.equal(result.firstMismatch.source.stateHash,'source');assert.equal(result.firstMismatch.exact.stateHash,'exact');assert.deepEqual(result.selected.map(s=>s.matched),[true,false,false]);assert.equal(result.count,3);
});

test('unsupported simultaneous shooters retain authoritative events and explicitly withhold ray witnesses',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'botstrike-network-multi-test-')),config={map:0,mode:'deathmatch',heroes:Array(10).fill(0),bots:Array(10).fill(false),difficulty:1,seed:42};
 const inputs=Array(10).fill(null);for(const slot of [0,1])inputs[slot]=[1,0,0,0,0.5,257,null,null,null,0,null];
 const tape=path.join(dir,'tape');await writeFile(tape,JSON.stringify({config})+'\n'+JSON.stringify({inputs})+'\n');
 const {out,report}=await runNetworkAudit({tape,out:path.join(dir,'audit')});assert.equal(report.source.shots,2);assert.equal(report.source.availableWitnesses,0);assert.equal(report.agreement.allFrameStateHashesMatched,true);
 const frame=JSON.parse((await readFile(path.join(out,'timeline.jsonl'),'utf8')).trim());assert.equal(frame.events.filter(e=>e.kind==='shot').length,2);assert.equal(frame.witness.available,false);assert.match(frame.witness.reason,/exactly_one_native_shot/);
});

test('bots-capable casual config yields a frame witness only when all ten bot slots have actual takeover inputs',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'botstrike-network-bots-capable-')),config={map:0,mode:'deathmatch',heroes:Array(10).fill(0),bots:Array(10).fill(true),difficulty:1,seed:42},frames=[];
 for(const missingTakeover of [null,9]){
  const inputs=Array.from({length:10},(_,slot)=>[1,0,0,0,.5,(slot===missingTakeover?0:256)|(slot===0?1:0),null,null,0,0,null]);
  const suffix=missingTakeover===null?'all-takeover':'one-ai-slot',tape=path.join(root,suffix+'.jsonl');await writeFile(tape,JSON.stringify({config})+'\n'+JSON.stringify({inputs})+'\n');
  const {out,report}=await runNetworkAudit({tape,out:path.join(root,suffix),ticks:[1]});
  assert.equal(report.agreement.allFrameStateHashesMatched,true);assert.equal(report.agreement.comparedTicks,1);assert.equal(report.agreement.traceHashMatched,true);assert.equal(report.agreement.finalStateHashMatched,true);assert.equal(report.source.rejectedWitnesses,0);assert.equal(report.source.shots,1);
  const frame=JSON.parse((await readFile(path.join(out,'timeline.jsonl'),'utf8')).trim());frames.push(frame);
  assert.deepEqual(JSON.parse((await readFile(tape,'utf8')).split('\n')[0]).config.bots,Array(10).fill(true),'never rewrite the production config to bots=false');
  if(missingTakeover===null){
   assert.equal(report.source.availableWitnesses,1);assert.equal(frame.witness.available,true);assert.equal(frame.witness.rng.matched,true);assert.equal(frame.witness.damageAgrees,true);assert.equal(frame.witness.controlProvenance.nativeAiBranchUsed,false);assert.equal(frame.witness.controlProvenance.scope,'this_frame_only_not_match_or_human');
   assert.deepEqual(frame.witness.controlProvenance.botsCapableSlots,[0,1,2,3,4,5,6,7,8,9]);assert.deepEqual(frame.witness.controlProvenance.takeoverSlots,[0,1,2,3,4,5,6,7,8,9]);
   assert.deepEqual(frame.witness.controlProvenance.noOpHeroSlots,[0,1,2,3,4,5,6,7,8,9]);
  }else{
   assert.equal(report.source.availableWitnesses,0);assert.equal(frame.witness.available,false);assert.equal(frame.witness.reason,'bot_control_not_overridden');assert.deepEqual(frame.witness.botSlotsWithoutTakeover,[9]);assert.equal(frame.controls[9].takeover,false);
  }
 }
 assert.notDeepEqual(frames[1].authoritativePoses[9].position,frames[0].authoritativePoses[9].position,'the omitted takeover actually permits Native AI movement in the real fixture');assert.equal(modelDigest(),MODEL);
});

test('different hero selections and buys remain unsupported even when live Native would ignore their effects',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'botstrike-network-hero-guard-')),config={map:0,mode:'deathmatch',heroes:Array(10).fill(0),bots:Array(10).fill(true),difficulty:1,seed:42};
 for(const kind of ['different-hero','buy']){
  const inputs=Array.from({length:10},(_,slot)=>[1,0,0,0,.5,256|(slot===0?1:0),null,null,0,0,null]);if(kind==='different-hero')inputs[0][8]=1;else inputs[0][7]=0;
  const tape=path.join(root,kind+'.jsonl');await writeFile(tape,JSON.stringify({config})+'\n'+JSON.stringify({inputs})+'\n');const original=await readFile(tape,'utf8');const {out,report}=await runNetworkAudit({tape,out:path.join(root,kind)});
  assert.equal(report.source.shots,1);assert.equal(report.agreement.allFrameStateHashesMatched,true);assert.equal(report.agreement.traceHashMatched,true);assert.equal(report.agreement.finalStateHashMatched,true);assert.equal(report.source.availableWitnesses,0);const frame=JSON.parse((await readFile(path.join(out,'timeline.jsonl'),'utf8')).trim());assert.equal(frame.witness.available,false);assert.equal(frame.witness.reason,'side_effect_or_nonlive_frame');assert.equal(await readFile(tape,'utf8'),original,'the inspector never removes selections or purchases from its tape');
 }
});
