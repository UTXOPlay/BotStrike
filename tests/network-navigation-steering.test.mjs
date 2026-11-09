import test from 'node:test';
import assert from 'node:assert/strict';
import {cardinalSteering,navigationPathClear,planTwoLegSteering} from '../tools/network-navigation-steering.mjs';
const open={extent:1200,obstacles:[]},distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
const move=(p,choice,length)=>{const local={KeyW:[0,1],KeyD:[1,0],KeyS:[0,-1],KeyA:[-1,0]}[choice.key],yaw=choice.yaw;return[p[0]+(-Math.sin(yaw)*local[1]+Math.cos(yaw)*local[0])*length,p[1]+(-Math.cos(yaw)*local[1]-Math.sin(yaw)*local[0])*length];};
test('two-leg geometry escapes a fixed-step axis counterexample using actual cardinal/yaw directions',()=>{
 const from=[103.6868,241],goal=[100,240],step=7.91015625,initial=distance(from,goal);
 assert.ok(step>2*initial);assert.ok(step-initial>initial,'No single equal-length heading can improve this pose');
 const plan=planTwoLegSteering({from,goal,step,map:open,yaw:0});assert.ok(plan);
 const actual=move(from,plan.steering,step);assert.ok(distance(actual,plan.via)<1e-10);assert.ok(distance(actual,goal)>initial);
 const closure=cardinalSteering(actual,goal,plan.steering.yaw),end=move(actual,closure,step);assert.ok(distance(end,goal)<1e-10);
 assert.ok(Math.abs(plan.steering.turn)<=Math.PI/4);assert.ok(Math.abs(closure.turn)<=Math.PI/4);
});
test('cardinal choice wraps the real mouse turn and preserves Native world/local transforms',()=>{
 for(const yaw of [-Math.PI+.001,-1,0,.8,Math.PI-.001])for(const goal of [[1,0],[0,1],[-1,0],[0,-1],[1,1]]){
  const choice=cardinalSteering([0,0],goal,yaw),end=move([0,0],choice,Math.hypot(...goal));
  assert.ok(distance(end,goal)<1e-10);assert.ok(Math.abs(choice.turn)<=Math.PI/4+1e-12);
 }
 assert.equal(cardinalSteering([0,0],[0,0],0),null);
});
test('clearance checks segment interiors with Native18-unit obstacle inflation',()=>{
 const map={extent:200,obstacles:[{min:[-1,0,-1],max:[1,10,1]}]};
 assert.equal(navigationPathClear(map,[[-20,0],[20,0]],[0,0]),false);
 assert.equal(navigationPathClear(map,[[-20,19],[20,19]],[0,19]),false,'Conservative boundary contact is blocked');
 assert.equal(navigationPathClear(map,[[-20,19.01],[20,19.01]],[0,19.01]),true);
});
test('either blocked leg rejects that triangle side and both blocked sides reject the maneuver',()=>{
 const from=[0,0],goal=[6,0],step=8;
 const upper={min:[2,0,24],max:[4,10,25]},lower={min:[2,0,-25],max:[4,10,-24]};
 const one=planTwoLegSteering({from,goal,step,map:{...open,obstacles:[upper]},yaw:0});assert.ok(one);assert.ok(one.via[1]<0);
 assert.equal(planTwoLegSteering({from,goal,step,map:{...open,obstacles:[upper,lower]},yaw:0}),null);
 // The first leg is clear; only via→goal crosses this expanded box.
 const secondLeg={extent:200,obstacles:[{min:[24,0,-9],max:[25,10,-8]}]};
 assert.equal(navigationPathClear(secondLeg,[[0,0],[0,10],[10,10]],[5,5]),false);
});
test('world inset20, grounded-only and fixed20-unit goal envelope fail closed',()=>{
 assert.equal(navigationPathClear({extent:40,obstacles:[]},[[19,0],[21,0]],[20,0]),false);
 assert.equal(navigationPathClear(open,[[0,0],[20.01,0]],[0,0]),false);
 assert.equal(navigationPathClear(open,[[0,0],[21,0]],[0,0],{envelope:21}),false);
 assert.equal(navigationPathClear(open,[[0,0],[1,0]],[0,0],{groundY:.01}),false);
 assert.equal(planTwoLegSteering({from:[0,0],goal:[6,0],step:16,map:open,yaw:0}),null);
 assert.equal(planTwoLegSteering({from:[0,0],goal:[6,0],step:8,map:open,yaw:0,tolerance:NaN}),null);
});
