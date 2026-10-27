import test from 'node:test';
import assert from 'node:assert/strict';
import {signalVisible} from '../games/botstrike/client/team-signals.mjs';
const viewer={slot:0,team:0,alive:true,flash:0};
const target={slot:5,team:1,alive:true,position:[0,0,-300]};
const eye=[0,56,0],map={obstacles:[]};
test('IFF never identifies hidden, dead, self or smoke-obscured targets',()=>{
 assert.equal(signalVisible(target,viewer,eye,map),true);
 for(const change of [{hidden:true},{alive:false},{position:null},{slot:0}])assert.equal(signalVisible({...target,...change},viewer,eye,map),false);
 assert.equal(signalVisible(target,{...viewer,flash:64},eye,map),false);
 assert.equal(signalVisible(target,{...viewer,alive:false},eye,map),false);
 assert.equal(signalVisible(target,viewer,eye,map,[{kind:2,fuse:0,position:[0,0,-150]}]),false);
 assert.equal(signalVisible(target,viewer,eye,map,[{kind:2,fuse:64,position:[0,0,-150]}]),true);
});
test('IFF requires a visible body even when the overhead badge clears a wall',()=>{
 const cover={obstacles:[{min:[-40,0,-160],max:[40,60,-140]}]};
 assert.equal(signalVisible(target,viewer,eye,cover),false);
 assert.equal(signalVisible({...target,team:0},viewer,eye,cover),false);
 assert.equal(signalVisible({...target,position:[200,0,-300]},viewer,eye,cover),true);
});
