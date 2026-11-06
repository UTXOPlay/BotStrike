import test from 'node:test';import assert from 'node:assert/strict';
import {InputBoundary} from '../games/botstrike/client/input-boundary.mjs';
const pad=()=>({buttons:Array(17).fill(false),held:{jump:false,utility:false},move:{x:0,y:0},look:{x:0,y:0},pressed:[],released:[],navigation:null});
test('a held keyboard control cannot restart from autorepeat across a menu or mode change',()=>{
 const gate=new InputBoundary();gate.clear(new Set(['KeyG']));assert.equal(gate.key('KeyG',true),false);gate.clear(new Set());assert.equal(gate.key('KeyG',true),false);gate.release('KeyG');assert.equal(gate.key('KeyG',false),true);
});
test('a fresh physical press recovers even when the keyup happened outside the page',()=>{const gate=new InputBoundary();gate.clear(new Set(['KeyW']));assert.equal(gate.key('KeyW',false),true);assert.equal(gate.key('KeyW',true),true);});
test('controller confirm cannot become a jump, or a held utility become another release, on resume',()=>{
 const gate=new InputBoundary(),held=pad();held.buttons[0]=held.buttons[13]=true;held.held={jump:true,utility:true};held.pressed=[0,13];held.navigation='down';gate.clear([],held);
 const filtered=gate.gamepad(held);assert.equal(filtered.held.jump,false);assert.equal(filtered.held.utility,false);assert.deepEqual(filtered.pressed,[]);assert.equal(filtered.navigation,null);assert.equal(held.held.jump,true,'do not corrupt the tracker input');
 gate.gamepad(pad());assert.equal(gate.gamepad(held).held.utility,true);assert.deepEqual(gate.gamepad(held).pressed,[0,13]);
});
test('sticks held across a boundary must center before they move or aim again',()=>{
 const gate=new InputBoundary(),held=pad();held.move={x:.8,y:0};held.look={x:0,y:.6};gate.clear([],held);assert.deepEqual(gate.gamepad(held).move,{x:0,y:0});assert.deepEqual(gate.gamepad(held).look,{x:0,y:0});gate.gamepad(pad());assert.deepEqual(gate.gamepad(held).move,held.move);assert.deepEqual(gate.gamepad(held).look,held.look);
});
