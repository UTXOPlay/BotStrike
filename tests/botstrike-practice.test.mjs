import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {CareerStore,trackHumanFrame} from '../botstrike-service/career.mjs';
import {matchResults} from '../games/botstrike/client/post-match.mjs';
import {practiceSummary} from '../games/botstrike/client/practice.mjs';
test('training cannot create career stats even on verified/recovered results',async()=>{
 const directory=await mkdtemp(path.join(tmpdir(),'botstrike-training-career-'));
 try{
  const id='a'.repeat(64),room={id:'0'.repeat(24),config:{mode:'practice'},controlled:[id],status:'finished',proof:{verified:true},members:[id],participants:{[id]:{ticks:100,kills:50,damage:9999,lastTick:100,team:0}},state:{tick:100,winner:0,phase:'finished',config:{mode:'practice'},events:[{kind:'kill',actor:0,target:5}],players:[{slot:0,team:0}]}};
  const before=structuredClone(room.participants);trackHumanFrame(room,room.state);assert.deepEqual(room.participants,before);
  const career=new CareerStore(directory);await career.commit(room);const result=await career.view(id);assert.equal(result.matches,0);assert.equal(result.kills,0);assert.deepEqual(result.history,[]);
  assert.equal(matchResults({...room,slot:0}),null);
 }finally{await rm(directory,{recursive:true,force:true});}
});
test('practice metrics name shotgun impacts separately from fired rounds',()=>{
 const value=practiceSummary({shots:1,hits:6,headshots:2,damage:55,kills:0,movement_errors:1,scope_errors:0,settings:{drill:0}});
 assert.match(value,/1 rounds/);assert.match(value,/6 damaging impacts/);assert.match(value,/55 HP/);
});
