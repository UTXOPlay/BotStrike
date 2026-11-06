import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {publicState,canSee,utilityVisible} from '../botstrike-service/visibility.mjs';
import {feedbackFor} from '../botstrike-service/feedback.mjs';
import {SnapshotBuffer} from '../games/botstrike/client/snapshots.mjs';
import {signalVisible} from '../games/botstrike/client/team-signals.mjs';
import {assistTarget} from '../games/botstrike/client/aim-assist.mjs';
import {flashPresentation} from '../games/botstrike/client/perception.mjs';
const profile=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url))).hit_regions;
const player=(slot,team,position)=>({slot,team,alive:true,position,velocity:[0,0,0],yaw:0,pitch:0,stance:0,flash:0,revealed:0});
function fixture(){return {config:{map:0,mode:'demolition'},players:[player(0,0,[0,0,0]),player(1,1,[0,0,-400]),player(2,0,[500,0,0])],utilities:[],events:[]};}
const wall={min:[-1000,-1000,-200],max:[1000,1000,-190]},rules=obstacles=>({maps:[{obstacles}],hit_regions:profile});
const throwable=(owner=1)=>({kind:3,owner,position:[0,56,-400],velocity:[123,45,67],fuse:100,life:1});

test('hidden enemy projectiles are absent; visible objects never identify their owner or inherited velocity',()=>{
 const s=fixture();s.utilities=[throwable()];const original=structuredClone(s);
 assert.deepEqual(publicState(s,0,rules([wall])).utilities,[]);
 assert.deepEqual(publicState(s,0,rules([])).utilities,[{kind:3,position:[0,56,-400],fuse:100,life:1}]);
 assert.deepEqual(s,original,'public projection cannot edit private replay state');
 s.utilities[0].owner=0;const own=publicState(s,0,rules([wall])).utilities[0];assert.equal(own.owner,0);assert.deepEqual(own.velocity,[123,45,67]);
 own.position[0]=999;assert.equal(s.utilities[0].position[0],0);
});

test('deployed smoke uses its visible volume, including near edges and the inside',()=>{
 const s=fixture(),smoke={...throwable(),kind:2,fuse:0,life:64};s.utilities=[smoke];
 const narrow={min:[-40,-1000,-200],max:[40,1000,-190]};
 assert.equal(utilityVisible(s,s.players[0],smoke,rules([narrow]).maps[0]),true,'visible edge with occluded center');
 assert.equal(utilityVisible(s,s.players[0],smoke,rules([wall]).maps[0]),false,'fully occluded volume');
 s.players[0].position=[0,0,-400];assert.equal(utilityVisible(s,s.players[0],smoke,rules([]).maps[0]),true);
 s.players[0].flash=1;assert.equal(utilityVisible(s,s.players[0],smoke,rules([]).maps[0]),false);
});

test('objective hides carrier, actor, progress and dropped location until legitimately disclosed',()=>{
 const s=fixture();s.objective={carrier:1,actor:1,progress:100,position:[0,0,-400],planted:false,fuse:0,site:null};
 let view=publicState(s,0,rules([wall]));assert.equal(view.objective.carrier,null);assert.equal(view.objective.actor,null);assert.equal(view.objective.progress,0);assert.equal(view.objective.position,null);
 view=publicState(s,0,rules([]));assert.equal(view.objective.carrier,1);assert.equal(view.objective.actor,1);assert.equal(view.objective.progress,100);
 s.objective={...s.objective,carrier:null,actor:null,progress:0};assert.equal(publicState(s,0,rules([wall])).objective.position,null);
 s.objective.planted=true;s.objective.actor=1;s.objective.progress=100;s.objective.fuse=999;s.objective.site=0;
 view=publicState(s,0,rules([wall]));assert.deepEqual(view.objective.position,[0,0,-400]);assert.equal(view.objective.fuse,999);assert.equal(view.objective.actor,null);assert.equal(view.objective.progress,0);
});

test('plant announcement remains global without revealing the hidden planter',()=>{
 const s=fixture(),event={kind:'planted',actor:1,value:0,id:'10:0',tick:10};
 const out=feedbackFor([event],s,0,rules([wall]));assert.equal(out.length,1);assert.equal(out[0].actor,undefined);assert.equal(out[0].value,0);assert.equal(event.actor,1);
});

test('snapshot and animation feedback share authored head visibility samples',()=>{
 const s=fixture();s.players[1].position=[0,0,-200];const map={obstacles:[{min:[-1000,0,-180],max:[1000,69,-175]}]};
 assert.equal(canSee(s,s.players[0],s.players[1],map),false);
 assert.equal(canSee(s,s.players[0],s.players[1],map,profile),true);
 assert.equal(publicState(s,0,{maps:[map],hit_regions:profile}).players[1].hidden,false);
 const event={kind:'shot',actor:1,value:0,id:'10:0',tick:10};assert.ok(feedbackFor([event],s,0,{maps:[map],hit_regions:profile}).some(e=>e.kind==='motion'));
});

test('dead seats follow living squad views and cannot use enemy or dead views, including revealed targets',()=>{
 const s=fixture();s.players[0].alive=false;s.players[2].position=[0,0,-300];s.utilities=[throwable()];
 assert.equal(publicState(s,0,rules([wall]),2).utilities.length,1);
 s.players[2].alive=false;s.players[1].revealed=10;
 const view=publicState(s,0,rules([]),1);assert.equal(view.players[1].hidden,true);assert.deepEqual(view.utilities,[]);
 assert.deepEqual(feedbackFor([{kind:'shot',actor:1,value:0,id:'10:0',tick:10}],s,0,rules([]),1),[]);
});

test('radio reveal exposes location without optical pose, motion, IFF, assistance or objective interactions',()=>{
 const s=fixture();s.players[0].flash=100;s.players[1].revealed=64;s.phase='live';s.objective={carrier:1,actor:1,progress:50,position:[0,0,-400],planted:false};
 const v=publicState(s,0,rules([wall])),enemy=v.players[1];assert.equal(enemy.hidden,false);assert.equal(enemy.optical,false);assert.deepEqual(enemy.position,[0,0,-400]);
 for(const key of ['velocity','yaw','pitch','weapon','health','armor','reload','effect','disabled'])assert.equal(enemy[key],undefined,key);
 assert.equal(v.objective.actor,null);assert.equal(v.objective.progress,0);assert.equal(v.objective.carrier,null);
 assert.ok(feedbackFor([{kind:'shot',actor:1,value:2,id:'1:0',tick:1}],s,0,rules([wall])).every(e=>e.kind!=='motion'));
 // Even an unobstructed client fixture cannot treat radio-only data as optics.
 v.players[0].flash=0;assert.equal(assistTarget(v,0,0,0,{obstacles:[]}),null);assert.equal(signalVisible(enemy,v.players[0],[0,56,0],{obstacles:[]}),false);
 const buffer=new SnapshotBuffer();v.tick=10;buffer.push(v,0);const next=structuredClone(v);next.tick=12;next.players[1]={...s.players[1],optical:true,hidden:false};buffer.push(next,31.25);
 const shown=buffer.sample(80,0).players[1];assert.equal(shown.yaw,0);assert.ok(Number.isFinite(shown.pitch),'a radio-to-optical transition never interpolates missing pose');
});

test('world audio and personal damage point to impact rather than hidden owner and never disclose the precise origin',()=>{
 const s=fixture(),event={kind:'utility',actor:1,value:3,id:'1:0',tick:1,origin:[-100,56,0]};
 const cue=feedbackFor([event],s,0,rules([]))[0];assert.equal(cue.bearing,-Math.PI/2);assert.equal(cue.actor,undefined);assert.equal(cue.origin,undefined);assert.equal(cue.position,undefined);
 const hit=feedbackFor([{...event,kind:'hit',target:0,value:20}],s,0,rules([])).find(e=>e.kind==='hit');assert.equal(hit.bearing,-Math.PI/2);assert.equal(hit.origin,undefined);
 const kill=feedbackFor([{...event,kind:'kill',target:0}],s,0,rules([])).find(e=>e.kind==='kill');assert.equal(kill.origin,undefined);
 assert.deepEqual(feedbackFor([{...event,origin:[0,1500,0]}],s,0,rules([])),[],'audibility range includes vertical distance');
});

test('flash is equally opaque in reduced motion and follows the authorized living spectator',()=>{
 const s=fixture();s.players[0].flash=1;
 assert.equal(flashPresentation(s,0,null,false).opacity,'1');assert.equal(flashPresentation(s,0,null,true).opacity,'1');
 s.players[0].alive=false;s.players[2].flash=128;const disclosed=publicState(s,0,rules([]),2);assert.equal(disclosed.players[2].flash,128);assert.equal(disclosed.players[1].flash,undefined);
 assert.equal(flashPresentation(disclosed,0,1,true).text,'OPTICS JAMMED · 2.0s');
 s.players[2].alive=false;assert.equal(flashPresentation(s,0,1,false).opacity,'0');
});
