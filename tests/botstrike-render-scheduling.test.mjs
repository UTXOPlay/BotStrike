import test from 'node:test';
import assert from 'node:assert/strict';
import {startRenderLoop,ResolutionBudget} from '../shared/game-performance.mjs';
import {loadPreferences} from '../games/botstrike/client/preferences.mjs';

test('frame limit persists only supported options and preserves existing controls',()=>{
 for(const renderFps of [30,60,120])assert.equal(loadPreferences({renderFps}).renderFps,renderFps);
 for(const renderFps of [0,59,121,'120',null,Infinity])assert.equal(loadPreferences({renderFps}).renderFps,60);
 assert.equal(loadPreferences({keyboardLayout:'colemak',renderFps:120}).keyboardLayout,'colemak');
});

test('resolution never rises above a sub-unit device cap under sustained load',()=>{
 const budget=new ResolutionBudget(.5,.75);
 for(let i=0;i<100;i++)assert.equal(budget.sample(40),.5);
 const capped=new ResolutionBudget(1.5,.75);
 for(let i=0;i<60;i++)capped.sample(1000/30,'auto',1000/30);
 assert.equal(capped.ratio,.75,'intentional 30 FPS pacing is not overload');
});

test('live frame limits schedule distinct 30/60/120 draw cadences, with inactive and visibility gates',t=>{
 let callback,clock=1000,draws=0,limit=30,playing=true;
 const listeners=new Map(),doc={hidden:false,documentElement:{dataset:{}},addEventListener:(k,v)=>listeners.set(k,v),removeEventListener:k=>listeners.delete(k)};
 t.mock.method(performance,'now',()=>clock);
 for(const [key,value]of Object.entries({document:doc,devicePixelRatio:1,requestAnimationFrame:fn=>(callback=fn,1),cancelAnimationFrame:()=>{callback=null},addEventListener:()=>{},removeEventListener:()=>{}})){const original=Object.getOwnPropertyDescriptor(globalThis,key);Object.defineProperty(globalThis,key,{value,configurable:true,writable:true});t.after(()=>original?Object.defineProperty(globalThis,key,original):delete globalThis[key]);}
 const stop=startRenderLoop(()=>draws++,{maxFps:()=>limit,active:()=>playing});
 const advance=()=>{const before=draws;for(let i=0;i<480;i++){clock+=1000/240;const next=callback;callback=null;next?.(clock)}return draws-before};
 for(const value of [30,60,120]){limit=value;assert.ok(Math.abs(advance()-value*2)<=2,`${value} draws per second`)}
 playing=false;assert.ok(Math.abs(advance()-60)<=2);
 doc.hidden=true;listeners.get('visibilitychange')();assert.equal(advance(),0);
 doc.hidden=false;listeners.get('visibilitychange')();playing=true;limit=120;assert.ok(Math.abs(advance()-240)<=2);
 stop();assert.equal(callback,null);assert.equal(listeners.size,0);
});
