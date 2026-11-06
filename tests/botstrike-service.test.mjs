import {test} from 'node:test';
import assert from 'node:assert/strict';
import {safeInput,neutral,pack,practiceOptions} from '../botstrike-service/server.mjs';
test('network controls cannot set authority, purchases or hero attributes',()=>{const value=safeInput({...neutral(),takeover:true,buy:4,hero:5,health:999,bots:false});assert.equal(value.takeover,undefined);assert.equal(value.buy,undefined);assert.equal(value.hero,undefined);assert.equal(value.health,undefined);});
test('reject malformed or unbounded network controls',()=>{for(const mutation of [{seq:-1},{x:NaN},{y:2},{yaw:4},{pitch:2},{fire:1},{item:12},{weapon:12}])assert.throws(()=>safeInput({...neutral(),...mutation}));});
test('training selects only bounded solo settings and packs its recorded command',()=>{
 const b={kind:'practice',map:1,drill:2};
 assert.deepEqual(practiceOptions(b),{drill:2,distance:1,target_hero:0,moving:false,combat_map:1,armor:0});
 assert.equal(practiceOptions({kind:'practice'}),null);
 for(const change of [{kind:'public'},{drill:-1},{drill:8},{distance:4},{targetHero:6},{armor:3},{moving:1}])assert.throws(()=>practiceOptions({...b,...change}));
 for(const practice of [-1,9,1.5,'1'])assert.throws(()=>safeInput({...neutral(),practice}));
 const input=safeInput({...neutral(),practice:7,score:999,position:[0,0,0]});
 assert.equal(input.score,undefined);assert.equal(input.position,undefined);
 const packed=pack({...input,takeover:true});assert.equal(packed.length,12);assert.equal(packed[11],7);
});
test('compact tapes preserve controls and keep bots implicit',()=>{assert.equal(pack(neutral()),null);assert.deepEqual(pack({...neutral(),seq:12,takeover:true,x:.5,yaw:1.23456789,fire:true,ability:true,weapon:2,buy:7,hero:3,item:2}),[12,.5,0,1.234568,0,289,2,7,3,2,null]);const worst=Array.from({length:10},()=>pack({...neutral(),seq:4294967295,takeover:true,x:-.123456,y:-.123456,yaw:-3.123456,pitch:-1.123456,weapon:11,buy:23,hero:5,item:11,view_tick:230387,throw_mode:2,practice:8,preview_item:11,drop:true,action_life:31,fire:true,reload:true,walk:true,crouch:true,jump:true,ability:true,interact:true,scope:true}));assert.ok(Buffer.byteLength(JSON.stringify({inputs:worst})+'\n')*230400<194_000_000);});

test('replay profile and hex export budgets cover the entire bounded tape',async()=>{const {readFileSync}=await import('node:fs');const profile=readFileSync(new URL('../botstrike-myelin/src/session.rs',import.meta.url),'utf8');const limit=Number(profile.match(/max_frame_input_bytes: ([\d_]+)/)[1].replaceAll('_',''));const configBytes=16384,frame=JSON.stringify({inputs:Array.from({length:10},()=>pack({...neutral(),seq:4294967295,takeover:true,x:-.123456,y:-.123456,yaw:-3.123456,pitch:-1.123456,weapon:11,buy:23,hero:5,item:11,view_tick:230387,throw_mode:2,practice:8,preview_item:11,drop:true,action_life:31,fire:true,reload:true,walk:true,crouch:true,jump:true,ability:true,interact:true,scope:true}))})+'\n';const worstAction=Buffer.byteLength(JSON.stringify(frame))*230400+configBytes;assert.ok(worstAction<limit);assert.ok(limit*2+1000000<400000000);});

test('release mode is bounded, recorded in compact tapes and cannot smuggle a launch vector',()=>{
 for(const throw_mode of [-1,3,1.2,'2'])assert.throws(()=>safeInput({...neutral(),throw_mode}));
 const safe=safeInput({...neutral(),throw_mode:2,launch:[999,999,999],throw_velocity:[999,999,999]});assert.equal(safe.launch,undefined);assert.equal(safe.throw_velocity,undefined);
 const tape=pack({...safe,takeover:true});assert.equal(tape.length,13);assert.equal(tape[11],0);assert.equal(tape[12],2);
});

test('preview selection and throw mode share a bounded tape word without adding a trusted launch vector',()=>{for(const preview_item of [-1,12,1.5])assert.throws(()=>safeInput({...neutral(),preview_item}));const p=pack({...neutral(),takeover:true,throw_mode:2,preview_item:11,drop:true,action_life:31,fire:true,reload:true,walk:true,crouch:true,jump:true,ability:true,interact:true,scope:true});assert.equal(p.length,13);assert.equal(p[12],35);});
