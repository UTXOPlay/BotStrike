import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {MovementAudioClock} from '../botstrike-service/movement-audio.mjs';
import {frameEvents,feedbackFor} from '../botstrike-service/feedback.mjs';
import {publicState} from '../botstrike-service/visibility.mjs';
import {SnapshotBuffer} from '../games/botstrike/client/snapshots.mjs';
import {LocomotionBlend} from '../games/botstrike/client/locomotion-blend.mjs';
import {groundSurfaceLayout,groundSurfaceAt} from '../shared/ground-surfaces.mjs';
import {makeFootstepSample} from '../games/botstrike/client/footstep-sound.mjs';
import {makeFootstepSample as frozen} from '../tools/audio-baseline-v5/footstep-sound.mjs';
import {gaitGeometry} from '../shared/gait-geometry.mjs';import {createHash} from 'node:crypto';
const spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url)));
const player=(slot=0,team=0)=>({slot,team,hero:0,weapon:2,position:[0,0,0],velocity:[0,0,0],yaw:0,pitch:0,life:1,alive:true,stance:0,reload:0,owned:Array(12).fill(true)});
const state=(players=[player()])=>({tick:0,phase:'live',config:{map:0},players,events:[],utilities:[]});
test('service gait dimensions remain bound to measured production chassis assets',()=>{
 const receipt=JSON.parse(readFileSync(new URL('../docs/acceptance/arsenal-audio/gait-calibration.json',import.meta.url)));assert.deepEqual(gaitGeometry,receipt.geometry);
 for(const name of ['vector','patch','bastion','spectre','glitch','forge']){const file='/models/'+name+'.glb';assert.equal(createHash('sha256').update(readFileSync(new URL('../games/botstrike/web'+file,import.meta.url))).digest('hex'),receipt.manifest.sha256[file]);}
});
test('every chassis, weapon and travel direction has one trusted half-cycle event; quiet movement stays quiet',()=>{
 for(let hero=0;hero<6;hero++)for(let weapon=0;weapon<12;weapon++)for(const side of [0,.7071067811865476,1]){
  const s=state(),p=s.players[0],clock=new MovementAudioClock();p.hero=hero;p.weapon=weapon;const speed=spec.heroes[hero].speed*spec.weapons[weapon].mobility;
  p.velocity=[speed*side,0,-speed*Math.sqrt(1-side*side)];let steps=0,previousPhase=null;
  for(let tick=1;tick<=256;tick++){const previous=structuredClone(s);s.tick=tick;const events=frameEvents(s,previous,spec,clock),g=clock.view()[0];
   if(previousPhase!==null)assert.equal(events.filter(e=>e.kind==='step').length,Number(Math.floor(g.phase*2)>Math.floor(previousPhase*2)));
   assert.ok(g.cycleDuration>=.18&&g.cycleDuration<=1.25);assert.ok(g.duty>0&&g.duty<=.54);previousPhase=g.phase;steps+=events.filter(e=>e.kind==='step').length;
   assert.deepEqual(clock.advance(s,previous,spec),[],'duplicate tick cannot replay contact');
  }
  assert.ok(steps>=8&&steps<=32);
 }
});
test('landing has one event; new life, native gaps and map changes cannot replay old contacts',()=>{
 const s=state(),clock=new MovementAudioClock();s.players[0].position[1]=20;clock.advance(s,null,spec);const previous=structuredClone(s);s.tick++;s.players[0].position[1]=0;
 assert.deepEqual(clock.advance(s,previous,spec),[{kind:'land',actor:0,value:0}]);assert.deepEqual(clock.advance(s,previous,spec),[]);
 const old=structuredClone(s);s.tick++;s.players[0].life++;old.players[0].position[1]=20;assert.deepEqual(clock.advance(s,old,spec),[]);
 s.tick+=50;s.config.map=1;clock.advance(s,s,spec);assert.equal(clock.view()[0].tick,s.tick);assert.equal(clock.entries.size,1);
});
test('surface samples are original, distinct, deterministic and match the exact public flat rectangles',()=>{
 for(const rate of [44100,48000])for(const kind of ['step0','step1','land']){const a=[0,1,2].map(surface=>makeFootstepSample(kind,rate,surface));assert.deepEqual(a[0],frozen(kind,rate));for(const [surface,b]of a.entries()){assert.ok(b.every(v=>Number.isFinite(v)&&Math.abs(v)<=.801));assert.deepEqual(b,makeFootstepSample(kind,rate,surface));}assert.notDeepEqual(a[0],a[1]);assert.notDeepEqual(a[1],a[2]);}
 for(const [id,map]of spec.maps.entries()){const {patches,base}=groundSurfaceLayout(map,id);assert.equal(groundSurfaceAt(map,id,[0,0,0]),base);for(const p of patches){const point=[(p.min[0]+p.max[0])/2,0,(p.min[1]+p.max[1])/2];const matches=patches.filter(r=>point[0]>=r.min[0]&&point[0]<=r.max[0]&&point[2]>=r.min[1]&&point[2]<=r.max[1]);assert.equal(groundSurfaceAt(map,id,point),matches.at(-1).surface);}}
});
test('gait phase is only projected with entitled poses; hidden audible steps retain the coarse field allowlist',()=>{
 const s=state([player(),player(1,1)]),clock=new MovementAudioClock();s.players[1].position=[0,0,-300];s.players[1].velocity=[0,0,-250];
 const rules={...spec,maps:[{...spec.maps[0],obstacles:[{min:[-1000,0,-200],max:[1000,300,-190]}]}]};clock.advance(s,null,rules);
 const view=publicState(s,0,rules,null,clock.view());assert.ok(view.players[0].gait);assert.equal(view.players[1].gait,undefined);s.players[1].revealed=100;assert.equal(publicState(s,0,rules,null,clock.view()).players[1].gait,undefined);
 const cue=feedbackFor([{id:'1:0',tick:1,kind:'step',actor:1,value:2,phase:987}],s,0,rules).find(e=>e.kind==='step');assert.deepEqual(Object.keys(cue).sort(),['id','tick','kind','value','self','bearing','level','muffled'].sort());assert.equal(cue.value,2);
 s.players[1].team=0;assert.ok(publicState(s,0,rules,null,clock.view()).players[1].gait);
});
test('snapshot gait interpolation crosses wrapped cycles without backward jumps; life and phase boundaries reset',()=>{
 const buffer=new SnapshotBuffer(),s=state([player(),player(1,0)]),gait=(phase,tick,life=1)=>({phase,tick,life,cycleDuration:.26,duty:.25});s.tick=10;s.players[1].gait=gait(.95,10);buffer.push(structuredClone(s),0);s.tick=14;s.players[1].gait=gait(1.19,14);buffer.push(structuredClone(s),62.5);
 const p=buffer.sample(93.75,0).players[1];assert.ok(Math.abs(p.gait.phase-1.07)<1e-10);
 const blend=new LocomotionBlend(),motion={speed:250,runSpeed:250,forward:250,side:0,grounded:true};for(const fps of [30,60,120]){blend.update(motion,1/fps,{contactPhase:p.gait.phase,cycleDuration:p.gait.cycleDuration});assert.ok(Math.abs(blend.phase-.07)<1e-10);}
 s.tick=18;s.players[1].life=2;s.players[1].gait=gait(.28,18,2);buffer.push(structuredClone(s),125);assert.equal(buffer.sample(125,0).players[1].gait.life,2);
});
