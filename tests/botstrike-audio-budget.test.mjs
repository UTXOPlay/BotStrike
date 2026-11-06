import test from 'node:test';import assert from 'node:assert/strict';
import {AudioBudget} from '../games/botstrike/client/audio-budget.mjs';
import {authorizedSound,softCeiling} from '../games/botstrike/client/audio-spatial.mjs';
function fixture(){let time=0;const budget=new AudioBudget({now:()=>time}),playing=[];
 const request=(remote,priority,label='')=>budget.request({remote,priority,start:ended=>{const v={remote,priority,label,ended,stops:0};playing.push(v);return immediate=>{v.stops++;if(immediate)ended();};}});
 return {budget,playing,request,advance:dt=>time+=dt};}
test('remote overload preserves capacity for eight local cues and bounds pending replacements',()=>{
 const {budget,playing,request}=fixture();for(let i=0;i<100;i++)request(true,1);
 assert.equal(budget.snapshot().voices,24);assert.equal(budget.snapshot().dropped,76);
 for(let i=0;i<8;i++)request(false,2);assert.equal(budget.snapshot().voices,32);
 request(false,3,'damage');assert.equal(budget.snapshot().voices,32,'retiring voice remains counted');assert.equal(budget.snapshot().pending,1);assert.equal(playing[0].stops,1);
 playing[0].ended();assert.equal(budget.snapshot().voices,32);assert.equal(playing.at(-1).label,'damage');
 for(let i=0;i<100;i++)request(false,3);assert.ok(budget.snapshot().pending<=8);assert.equal(budget.snapshot().peakVoices,32);
 budget.reset();assert.equal(budget.snapshot().voices,0);assert.equal(budget.snapshot().pending,0);
});
test('delayed local cues expire and a generation reset cannot replay them later',()=>{
 const {budget,playing,request,advance}=fixture();for(let i=0;i<32;i++)request(false,1);
 request(false,3,'old-hit');advance(81);playing[0].ended();assert.equal(budget.snapshot().expired,1);assert.equal(playing.length,32);
 request(false,3,'pending');budget.reset();for(const voice of playing)voice.ended();assert.equal(budget.snapshot().voices,0);assert.equal(budget.snapshot().pending,0);
});
test('the output ceiling is finite monotone, odd and unity below its soft knee',()=>{
 const curve=softCeiling();assert.equal(curve.length,4097);
 for(let i=0;i<curve.length;i++){const x=2*i/(curve.length-1)-1;assert.ok(Number.isFinite(curve[i])&&Math.abs(curve[i])<=.951);if(i)assert.ok(curve[i]>=curve[i-1]);assert.ok(Math.abs(curve[i]+curve[curve.length-1-i])<1e-7);if(Math.abs(x)<.9)assert.ok(Math.abs(curve[i]-x)<1e-7);}
});
test('virtual sound normalization ignores private coordinates and clamps gain/pan',()=>{
 assert.equal(authorizedSound(null).bearing,null);
 const a=authorizedSound({bearing:Math.PI/2,level:.35,muffled:true,position:[100,200,300],actor:5},-Math.PI/2);
 assert.equal(a.angle,0);assert.equal(a.level,.35);assert.equal(a.position,undefined);assert.equal(a.actor,undefined);
 assert.deepEqual(authorizedSound({bearing:NaN,level:Infinity,pan:4}),{bearing:null,angle:null,pan:1,level:1,muffled:false});
});

test('listener boundaries share squad fallback and discard the previous-viewpoint tick',async()=>{
 const {audioView,AudioViewBoundary}=await import('../games/botstrike/client/audio-view.mjs');
 const r={id:'a',slot:0,spectate:2,state:{tick:100,players:[{slot:0,team:0,alive:true,life:1},{slot:1,team:1,alive:true,life:1},{slot:2,team:0,alive:true,life:4}]}};
 const b=new AudioViewBoundary();assert.equal(b.update(r).slot,0);assert.equal(b.accepts({tick:100}),false);assert.equal(b.accepts({tick:101}),true);
 r.state.tick=110;r.state.players[0].alive=false;assert.equal(b.update(r).slot,2);assert.equal(b.accepts({tick:109}),false);assert.equal(b.accepts({tick:111}),true);
 r.spectate=1;assert.equal(audioView(r).slot,2,'enemy spectating is refused');r.state.players[2].alive=false;assert.equal(b.update(r),null);
 r.id='b';r.state.tick=0;r.state.players[0].alive=true;assert.equal(b.update(r).slot,0);assert.equal(b.accepts({tick:0}),false);
});
test('audio accessibility levels persist independently and do not change control bindings',async()=>{
 const {loadPreferences,bindings}=await import('../games/botstrike/client/preferences.mjs');
 const p=loadPreferences({volume:.4,effectsVolume:0,alertsVolume:.8});assert.equal(p.volume,.4);assert.equal(p.effectsVolume,0);assert.equal(p.alertsVolume,.8);assert.deepEqual(p.bindings,bindings);
 assert.equal(loadPreferences({effectsVolume:-1,alertsVolume:9}).effectsVolume,0);assert.equal(loadPreferences({effectsVolume:-1,alertsVolume:9}).alertsVolume,1);
});
