import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {MovementAudioClock} from '../botstrike-service/movement-audio.mjs';
import {feedbackFor,frameEvents} from '../botstrike-service/feedback.mjs';
const spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url)));
const player=(slot,team,pos)=>({slot,team,hero:0,weapon:2,position:pos,velocity:[0,0,0],stance:0,yaw:0,pitch:0,alive:true,life:1,flash:0,revealed:0,reload:0});
function fixture(){return {tick:7,phase:'live',config:{map:0,mode:'demolition'},players:[player(0,0,[0,0,0]),player(1,1,[0,0,-400]),player(2,0,[500,0,0])],utilities:[],events:[]};}
const wall={min:[-1000,-1000,-200],max:[1000,1000,-190]},rules=obstacles=>({...spec,maps:[{obstacles}]});
const shot={id:'7:0',tick:7,kind:'shot',actor:1,value:2};
test('audible wire fields form a strict coarse allowlist under unrelated private event metadata',()=>{
 const s=fixture(),event={...shot,origin:[0,56,-400],position:[9,8,7],velocity:[1,2,3],privateActor:1,secret:{health:999}};
 const cue=feedbackFor([event],s,0,rules([wall])).find(e=>e.kind==='shot');
 assert.deepEqual(Object.keys(cue).sort(),['id','tick','kind','value','self','bearing','level','muffled'].sort());
 assert.equal(cue.actor,undefined);assert.equal(cue.origin,undefined);assert.equal(cue.position,undefined);assert.equal(cue.secret,undefined);
 assert.ok(Number.isInteger(cue.bearing/(Math.PI/4)));assert.equal(cue.muffled,true);
});
test('smoke, flash and radio reveal do not alter the audible permission or reveal its owner',()=>{
 const s=fixture(),r=rules([wall]),base=feedbackFor([shot],s,0,r).find(e=>e.kind==='shot');
 for(const state of [()=>s.players[0].flash=128,()=>s.players[1].revealed=128,()=>s.utilities=[{kind:2,fuse:0,life:128,owner:1,position:[0,56,-150]}]]){state();const cue=feedbackFor([shot],s,0,r).find(e=>e.kind==='shot');assert.deepEqual(cue,base);}
});
test('sound range uses three dimensions and the selected authorized living listener',()=>{
 const s=fixture();s.players[1].position=[0,0,-1301];assert.equal(feedbackFor([shot],s,0,rules([])).filter(e=>e.kind==='shot').length,0);
 s.players[1].position=[0,1301,0];assert.equal(feedbackFor([shot],s,0,rules([])).filter(e=>e.kind==='shot').length,0);
 s.players[0].alive=false;s.players[1].position=[500,0,-100];s.players[2].position=[500,0,0];
 const allowed=feedbackFor([shot],s,0,rules([]),2).find(e=>e.kind==='shot');assert.equal(allowed.bearing,0);
 assert.deepEqual(feedbackFor([shot],s,0,rules([]),1).filter(e=>e.kind==='shot'),[allowed]);
 s.players[2].alive=false;assert.deepEqual(feedbackFor([shot],s,0,rules([]),1),[]);
});
test('native movement-derived running audibility preserves quiet crouch, low speed and airborne states',()=>{
 const count=modify=>{const s=fixture(),p=s.players[0],clock=new MovementAudioClock();p.velocity=[spec.heroes[p.hero].speed*.8,0,0];modify(p);let total=0;for(let tick=0;tick<128;tick++){const previous=structuredClone(s);s.tick=tick;total+=frameEvents(s,previous,spec,clock).filter(e=>e.kind==='step').length;}return total;};
 assert.ok(count(()=>{})>2);
 for(const modify of [p=>p.crouch=true,p=>p.velocity[0]=spec.heroes[0].speed*.55,p=>p.position[1]=5])assert.equal(count(modify),0);
});
