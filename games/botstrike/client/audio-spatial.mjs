// Client virtual sources use only an authorized coarse bearing. Their unit
// radius is synthetic: it never reconstructs a hidden player's coordinates.
export const wrapAngle=value=>Math.atan2(Math.sin(value),Math.cos(value));
export function authorizedSound(spatial={},yaw=0){
 spatial=spatial&&typeof spatial==='object'?spatial:{};
 const bearing=Number.isFinite(spatial.bearing)?wrapAngle(spatial.bearing):null;
 return {bearing,angle:bearing===null?null:wrapAngle(bearing+yaw),pan:Math.max(-1,Math.min(1,Number.isFinite(spatial.pan)?spatial.pan:0)),level:Math.max(0,Math.min(1.2,Number.isFinite(spatial.level)?spatial.level:1)),muffled:spatial.muffled===true};
}
export function softCeiling(size=4097){
 const curve=new Float32Array(size);
 for(let i=0;i<size;i++){
  const x=2*i/(size-1)-1,a=Math.abs(x),t=Math.max(0,(a-.9)/.1);
  curve[i]=Math.sign(x)*(a<=.9?a:.9+.1*(t-.5*t*t));
 }
 return curve;
}
export function soundRoute(context,spatial,{yaw=0,experimentalHrtf=false}={}){
 const cue=authorizedSound(spatial,yaw),filter=context.createBiquadFilter(),gain=context.createGain();
 let panner,hrtf=false;
 if(experimentalHrtf&&cue.angle!==null&&typeof context.createPanner==='function'){
  try{panner=context.createPanner();panner.panningModel='HRTF';panner.distanceModel='inverse';panner.refDistance=1;panner.rolloffFactor=0;hrtf=panner.panningModel==='HRTF'&&[panner.positionX,panner.positionY,panner.positionZ].every(p=>typeof p?.setValueAtTime==='function'&&typeof p?.setTargetAtTime==='function');if(!hrtf){panner.disconnect();panner=null;}}catch{panner?.disconnect();panner=null;}
 }
 panner??=typeof context.createStereoPanner==='function'?context.createStereoPanner():context.createGain();const mono=!hrtf&&!panner.pan;if(mono)panner.gain.value=Math.SQRT1_2;filter.type='lowpass';filter.frequency.value=cue.muffled?900:12000;gain.gain.value=cue.level;
 function orient(value,initial=false){
  const angle=cue.bearing===null?null:wrapAngle(cue.bearing+value),at=context.currentTime;
  const set=(param,v)=>initial?param.setValueAtTime(v,at):param.setTargetAtTime(v,at,.012);
  if(hrtf){set(panner.positionX,Math.sin(angle));set(panner.positionY,0);set(panner.positionZ,-Math.cos(angle));}
  else if(!mono)set(panner.pan,angle===null?cue.pan:Math.sin(angle));
 }
 orient(yaw,true);filter.connect(gain).connect(panner);
 return {input:filter,output:panner,gain,hrtf,mono,orient,bearing:cue.bearing,disconnect(){filter.disconnect();gain.disconnect();panner.disconnect();}};
}
