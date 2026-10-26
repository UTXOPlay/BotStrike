import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,mkdir,rm,utimes} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {readFileSync} from 'node:fs';
import {publicState} from '../botstrike-service/visibility.mjs';
import {feedbackFor,frameEvents,collectFeedback} from '../botstrike-service/feedback.mjs';
import {trackHumanFrame,CareerStore} from '../botstrike-service/career.mjs';
import {pruneReplays} from '../botstrike-service/retention.mjs';
import {loadPreferences,rebind,bindings,aimScale,spreadDegrees,FeedbackCursor} from '../games/botstrike/client/preferences.mjs';
const spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url)));
const p=(slot,pos)=>({slot,team:slot<5?0:1,position:pos,velocity:[0,0,0],alive:true,hero:0,weapon:0,crouch:false,reload:0,yaw:0,flash:0});
const state=()=>({tick:22,phase:'live',config:{map:0},players:Array.from({length:10},(_,i)=>p(i,[i<5?0:300,0,0])),events:[],utilities:[]});
test('controls avoid browser modifiers, swap conflicts and preserve validated preferences',()=>{
 const prefs=loadPreferences({ads:99,volume:-1,brightness:1.2,invertY:true});assert.equal(prefs.bindings.crouch,'KeyF');assert.equal(prefs.ads,1.5);assert.equal(prefs.volume,0);assert.equal(prefs.invertY,true);assert.equal(loadPreferences(null).fov,80);
 const mapped=rebind(bindings,'crouch','KeyR');assert.equal(mapped.crouch,'KeyR');assert.equal(mapped.reload,'KeyF');assert.deepEqual(loadPreferences({bindings:mapped}).bindings,mapped);
 for(const key of ['ControlLeft','ControlRight','AltLeft','MetaLeft','Escape'])assert.throws(()=>rebind(bindings,'crouch',key));
 assert.ok(aimScale(prefs,true)<aimScale(prefs,false));
});
test('reticle follows native spread multipliers without modifying aim',()=>{
 const player={crouch:false,scoped:false,velocity:[0,0,0],hero:0,effect:0,overclock:0,recoil:.5},w={spread:2,scoped:true};assert.equal(spreadDegrees(player,w),24.5);player.scoped=true;player.crouch=true;player.velocity=[200,0,0];assert.equal(spreadDegrees(player,w),2*.65*2.5+.5);
});
test('sound discloses coarse direction and loudness, never hidden coordinates or distant shots',()=>{
 const s=state(),rules={...spec,maps:[{obstacles:[{min:[100,0,-100],max:[200,100,100]}]}]},shot={kind:'shot',actor:5,value:2,id:'22:0',tick:22};
 const cues=feedbackFor([shot],s,0,rules);assert.equal(cues.length,1);assert.equal(cues[0].muffled,true);assert.equal(cues[0].level,.35);assert.equal(cues[0].bearing,Math.PI/2);assert.equal(cues[0].actor,undefined);assert.equal(cues[0].position,undefined);
 s.players[5].position=[2000,0,0];assert.deepEqual(feedbackFor([shot],s,0,rules),[]);
 const damage=feedbackFor([{kind:'hit',actor:5,target:0,value:16,id:'22:1',tick:22}],s,0,rules)[0];assert.equal(damage.bearing,Math.PI/2);assert.equal(damage.position,undefined);
 assert.deepEqual(feedbackFor([{kind:'hit',actor:5,target:1,value:16}],s,0,rules),[]);
});
test('footsteps respect walk/crouch and reload/landing only occur on transitions',()=>{
 const before=state(),after=structuredClone(before);after.players[0].velocity=[250,0,0];after.players[0].reload=80;assert.ok(frameEvents(after,before,spec).some(e=>e.kind==='step'));assert.ok(frameEvents(after,before,spec).some(e=>e.kind==='reload'));
 after.players[0].velocity=[120,0,0];assert.ok(!frameEvents(after,before,spec).some(e=>e.kind==='step'));after.players[0].velocity=[250,0,0];after.players[0].crouch=true;assert.ok(!frameEvents(after,before,spec).some(e=>e.kind==='step'));
 before.players[0].reload=90;assert.ok(!frameEvents(after,before,spec).some(e=>e.kind==='reload'));before.players[0].position[1]=5;assert.ok(frameEvents(after,before,spec).some(e=>e.kind==='land'));
});
test('events survive skipped snapshots but repeated state responses never play them twice',()=>{
 const s=state(),room={members:['a'.repeat(64),...Array.from({length:9},(_,i)=>'bot-'+i)],state:s};s.events=[{kind:'shot',actor:5,value:0}];collectFeedback(room,null,spec);s.tick++;s.events=[];collectFeedback(room,null,spec);
 const events=room.feedback.get(room.members[0]);assert.equal(events.length,1);const cursor=new FeedbackCursor();assert.equal(cursor.consume(events,s.tick).length,1);assert.equal(cursor.consume(events,s.tick).length,0);assert.equal(new FeedbackCursor().consume(events,200).length,0);
});
test('career excludes AI takeover, commits once, recovers and survives recording expiration',async()=>{
 const data=await mkdtemp(path.join(tmpdir(),'botstrike-career-')),account='a'.repeat(64),other='b'.repeat(64),id='c'.repeat(24);
 try{await mkdir(path.join(data,'rooms',id),{recursive:true});await mkdir(path.join(data,'accounts'));const s=state(),room={id,config:{map:0,mode:'deathmatch',difficulty:1},kind:'public',members:[account],controlled:[account],state:s};
 s.events=[{kind:'hit',actor:0,target:5,value:25},{kind:'kill',actor:0,target:5}];trackHumanFrame(room,s);room.controlled=[];trackHumanFrame(room,s);assert.equal(room.participants[account].kills,1);assert.equal(room.participants[account].damage,25);
 room.controlled=[null,null,null,null,null,other];s.events=[{kind:'kill',actor:0,target:5}];trackHumanFrame(room,s);assert.equal(room.participants[other].deaths,1);assert.equal(room.participants[account].kills,1);
 const store=new CareerStore(data);await store.commit(room);assert.equal((await store.view(account)).matches,0);
 room.status='finished';room.proof={verified:true};room.finishedAt=Date.now()-31*86400000;s.winner=0;s.score=[50,30];await writeFile(path.join(data,'rooms',id,'room.json'),JSON.stringify(room));await store.commit(room);await store.commit(room);
 const view=await store.view(account);assert.equal(view.matches,1);assert.equal(view.wins,1);assert.equal(view.kills,1);assert.equal(view.applied,undefined);assert.equal((await store.view(other)).history[0].outcome,'left');
 await utimes(path.join(data,'rooms',id,'room.json'),room.finishedAt/1000,room.finishedAt/1000);const recovered=new CareerStore(data);await recovered.recover();assert.equal((await recovered.view(account)).kills,1);
 assert.deepEqual(await pruneReplays(data),[id]);assert.equal((await recovered.view(account)).kills,1);
 }finally{await rm(data,{recursive:true,force:true});}
});

test('spectator disclosure follows a living teammate and refuses an enemy viewpoint',()=>{
 const s=state(),rules={...spec,maps:[{obstacles:[{min:[100,0,-500],max:[200,100,500]}]}]};s.players[0].alive=false;s.players[2].position=[300,0,0];s.players[5].position=[300,0,-100];
 assert.equal(publicState(s,0,rules).players[5].position,null);assert.equal(publicState(s,0,rules,5).players[5].position,null);assert.deepEqual(publicState(s,0,rules,2).players[5].position,[300,0,-100]);
 s.players[2].alive=false;assert.equal(publicState(s,0,rules,2).players[5].position,null);
});
