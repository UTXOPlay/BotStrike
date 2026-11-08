import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {movementKeys,visibleAim,verifyControlledTape} from '../tools/network-fairness-scenarios.mjs';
test('normal keyboard navigation uses the native world/local direction convention from either spawn facing',()=>{
 assert.deepEqual(movementKeys(0,1,0),['KeyD']);assert.deepEqual(movementKeys(0,0,-1),['KeyW']);assert.deepEqual(movementKeys(Math.PI,1,0),['KeyA']);assert.deepEqual(movementKeys(Math.PI,0,1,{walk:true}),['KeyW','ShiftLeft']);assert.deepEqual(movementKeys(Math.PI/2,-1,0),['KeyW']);assert.deepEqual(movementKeys(0,0,0),[]);
});
test('synthetic packed-log validation distinguishes bots-capable configuration from actual per-tick takeover',async t=>{
 const directory=mkdtempSync(path.join(tmpdir(),'fairness-takeover-test-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));const file=path.join(directory,'tape.jsonl'),header={config:{bots:Array(10).fill(true)}},inputs=()=>Array.from({length:10},()=>[0,0,0,0,0,256]),first=inputs();first[0][5]=0;writeFileSync(file,[header,{inputs:first},{inputs:inputs()},{inputs:inputs()}].map(JSON.stringify).join('\n')+'\n',{mode:0o600});const result=await verifyControlledTape(file,{fromTick:2,toTick:3});assert.equal(result.checkedNativeFrames,2);assert.equal(result.allBotsCapableSeatsTakenOver,true);assert.ok(result.headerBotsCapable.every(Boolean));await assert.rejects(verifyControlledTape(file,{fromTick:1,toTick:3}),/takeover bit 256/);await assert.rejects(verifyControlledTape(file,{fromTick:2,toTick:4}),/interval must be complete/);
});
test('aim geometry is derived only from a visible presented target and the actual camera eye',()=>{
 const frame={renderTick:99.25,viewTick:99,camera:{position:[-100,56,600],yaw:0,pitch:0},players:[{slot:5,alive:true,position:[-100,0,240],stance:0}]};const result=visibleAim(frame,5);assert.equal(Math.abs(result.yaw),0);assert.equal(result.pitch,Math.atan2(-12,360));assert.deepEqual(result.eye,[-100,56,600]);assert.deepEqual(result.point,[-100,44,240]);assert.equal(result.renderTick,99.25);assert.throws(()=>visibleAim({...frame,players:[]},5),/currently authorized visible/);assert.throws(()=>visibleAim({...frame,players:[{...frame.players[0],alive:false}]},5),/currently authorized visible/);
});
