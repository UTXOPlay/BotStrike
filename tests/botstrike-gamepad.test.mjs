import test from 'node:test';
import assert from 'node:assert/strict';
import {GamepadTracker,decodeGamepad,standardGamepad,stick} from '../games/botstrike/client/gamepad.mjs';

function pad({axes=[0,0,0,0],pressed=[],index=0,mapping='standard',connected=true}={}){
 return{axes,index,mapping,connected,buttons:Array.from({length:17},(_,i)=>({pressed:pressed.includes(i),value:pressed.includes(i)?1:0}))};
}

test('standard gamepads are selected without accepting unknown layouts',()=>{
 assert.equal(standardGamepad([null,pad({mapping:''}),pad({index:1})]).index,1);
 assert.equal(standardGamepad([pad({connected:false})]),null);
 assert.equal(standardGamepad([]),null);
});

test('sticks suppress drift and preserve direction after the dead zone',()=>{
 assert.deepEqual(stick(.1,-.1),{x:0,y:0});
 assert.ok(stick(.75,0).x>.6);
 assert.ok(Math.abs(stick(.6,.6).x-stick(.6,.6).y)<1e-10);
 assert.ok(Math.abs(Math.hypot(stick(1,1).x,stick(1,1).y)-1)<1e-10);
 assert.deepEqual(stick(NaN,1),{x:0,y:0});
});

test('standard controls map to existing native input fields',()=>{
 const state=decodeGamepad(pad({axes:[.8,-1,.5,-.5],pressed:[0,3,6,7,10,11,13]}));
 assert.ok(state.move.x>0&&state.move.y>0&&state.look.x>0&&state.look.y<0);
 assert.deepEqual(state.held,{jump:true,crouch:false,reload:false,skill:true,scope:true,fire:true,walk:true,interact:true,utility:true});
});

test('button edges, navigation repeat and disconnect clear held input',()=>{
 const tracker=new GamepadTracker(),up=pad({axes:[0,-1,0,0],pressed:[7]});
 let state=tracker.update([up],0);
 assert.deepEqual(state.pressed,[7]);assert.equal(state.navigation,'up');
 state=tracker.update([up],100);assert.deepEqual(state.pressed,[]);assert.equal(state.navigation,null);
 state=tracker.update([up],300);assert.equal(state.navigation,'up');
 state=tracker.update([pad()],320);assert.deepEqual(state.released,[7]);
 state=tracker.update([],340);assert.equal(state.disconnected,true);assert.deepEqual(state.held,{});
 state=tracker.update([up],360);assert.deepEqual(state.pressed,[7]);
});
