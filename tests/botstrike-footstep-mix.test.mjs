import test from 'node:test';
import assert from 'node:assert/strict';
import {createAudio} from '../games/botstrike/client/audio.mjs';

test('nearby steps cannot interrupt the local cadence and remain quieter',()=>{
 const originalAudio=globalThis.AudioContext,originalPerformance=globalThis.performance;
 let now=1000,context;
 class Node{connect(){return this}disconnect(){}}
 const param=()=>({value:0,setValueAtTime(v){this.value=v},setTargetAtTime(v){this.value=v},linearRampToValueAtTime(v){this.value=v},cancelScheduledValues(){}});
 class FakeAudioContext{
  constructor(){this.sampleRate=48000;this.currentTime=0;this.state='running';this.destination=new Node();this.started=[];this.gains=[];context=this;}
  createBuffer(channels,length,rate){return {duration:length/rate,length,copyToChannel(){}}}
  createBufferSource(){const source=new Node();source.start=()=>this.started.push({duration:source.buffer.duration,level:this.gains.at(-1).gain.value});source.stop=()=>source.onended?.();return source}
  createGain(){const gain=new Node();gain.gain=param();this.gains.push(gain);return gain}
  createBiquadFilter(){const filter=new Node();filter.frequency=param();return filter}
  createStereoPanner(){const pan=new Node();pan.pan=param();return pan}
  createWaveShaper(){return new Node()}
  close(){return Promise.resolve()}
 }
 try{
  globalThis.AudioContext=FakeAudioContext;globalThis.performance={now:()=>now};
  const audio=createAudio(()=>({sound:true,volume:.6}));
  audio.cue('step',{source:5,self:false,level:1});
  now+=10;audio.cue('step',{source:0,self:true,level:1});
  now+=10;audio.cue('step',{source:6,self:false,level:1});
  now+=180;audio.cue('step',{source:0,self:true,level:1});
  now+=60;audio.cue('step',{source:0,self:true,level:1});
  assert.deepEqual(context.started.map(({duration})=>Number(duration.toFixed(3))),[.11,.11,.125,.125,.11]);
  assert.deepEqual(context.started.map(({level})=>level),[.3,.6,.3,.6,.6]);
  audio.dispose();
 }finally{globalThis.AudioContext=originalAudio;globalThis.performance=originalPerformance}
});
