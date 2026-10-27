import * as THREE from 'three';
import {blocked,smoke} from './aim-assist.mjs';

export const signalColors={ally:'#69efff',enemy:'#ffae67'};
// The same IFF glyph is used in world space, on the radar and in the HUD.
export const signalPaths={
 ally:'M5 4H19V12L12 20L5 12Z M8 9L12 13L16 9 M8 13L12 17L16 13',
 enemy:'M9 3L3 9V15L9 21 M15 3L21 9V15L15 21 M12 7L17 12L12 17L7 12Z',
};
export function signalSvg(relation){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"><path d="${signalPaths[relation]}"/></svg>`;}
export function drawSignal(ctx,relation,x,y,size){
 ctx.save();ctx.translate(x-size/2,y-size/2);ctx.scale(size/24,size/24);
 const path=new Path2D(signalPaths[relation]);ctx.lineJoin='miter';ctx.strokeStyle='#07151f';ctx.lineWidth=4.5;ctx.stroke(path);ctx.strokeStyle=signalColors[relation];ctx.lineWidth=1.8;ctx.stroke(path);ctx.restore();
}
export function signalVisible(player,viewer,eye,map,utilities=[]){
 if(!viewer?.alive||viewer.flash>0||!player?.alive||player.hidden||!player.position||player.slot===viewer.slot)return false;
 const target=[player.position[0],player.position[1]+(player.crouch?32:52),player.position[2]];
 return !map.obstacles.some(box=>blocked(eye,target,box))&&!utilities.some(u=>smoke(eye,target,u));
}
export function createTeamSignals(scene,count=10){
 const materials=Object.fromEntries(Object.keys(signalColors).map(relation=>{
  const canvas=document.createElement('canvas');canvas.width=canvas.height=128;
  drawSignal(canvas.getContext('2d'),relation,64,64,112);
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;
  return [relation,new THREE.SpriteMaterial({map,transparent:true,depthTest:true,depthWrite:false,toneMapped:false,fog:false})];
 }));
 const sprites=Array.from({length:count},(_,slot)=>{const sprite=new THREE.Sprite(materials.ally);sprite.name=`iff-${slot}`;sprite.visible=false;scene.add(sprite);return sprite;});
 const cameraSpace=new THREE.Vector3();
 function hide(){for(const sprite of sprites)sprite.visible=false;}
 function update(state,viewer,camera,height,active,map){
  hide();if(!active||!viewer)return;
  camera.updateMatrixWorld();const eye=camera.position.toArray();
  const pixels=Math.max(20,Math.min(36,height*.023));
  for(const player of state.players){
   const sprite=sprites[player.slot];if(!sprite||!signalVisible(player,viewer,eye,map,state.utilities))continue;
   sprite.position.fromArray(player.position);sprite.position.y+=player.crouch?57:85;
   cameraSpace.copy(sprite.position).applyMatrix4(camera.matrixWorldInverse);const depth=-cameraSpace.z;if(depth<=camera.near)continue;
   // Bounded screen size, including scoped views; no billboard growth near the camera.
   const size=pixels*2*depth*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))/height;
   sprite.scale.set(size,size,1);sprite.material=materials[player.team===viewer.team?'ally':'enemy'];sprite.visible=true;
  }
 }
 function dispose(){for(const sprite of sprites)scene.remove(sprite);for(const m of Object.values(materials)){m.map.dispose();m.dispose();}}
 return{update,hide,dispose};
}
