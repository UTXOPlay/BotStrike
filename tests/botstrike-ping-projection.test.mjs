import test from 'node:test';import assert from 'node:assert/strict';import {PerspectiveCamera} from 'three';import {pointerTerrain,projectPing,pointerRadar,pickableEnemy} from '../games/botstrike/client/ping-projection.mjs';import {radarProject} from '../shared/ping-geometry.mjs';
test('render-camera inverse and radar inverse survive all six viewports, FOV, translation and camera roll',()=>{
 const map={extent:2000,obstacles:[]};for(const [width,height]of [[1920,1080],[2560,1080],[2560,1440],[3840,2160],[390,844],[844,390]])for(const fov of [20,38,80,110])for(const eyeY of [56,200,500]){
  const camera=new PerspectiveCamera(fov,width/height,1,10000);camera.position.set(120,eyeY,400);camera.lookAt(0,0,0);camera.rotateZ(.012);camera.updateMatrixWorld();const rect={left:17,top:23,width,height};
  for(const [u,v]of [[.5,.5],[.3,.7],[.7,.7]]){const screen=[rect.left+width*u,rect.top+height*v],p=pointerTerrain(camera,map,rect,...screen);if(!p)continue;const back=projectPing(camera,rect,p);assert.ok(back&&back.every((n,i)=>Math.abs(n-screen[i])<1e-7));}
  const radarRect={left:31,top:47,width:160,height:160},p=[-123.25,0,356.75],xy=radarProject(map,240,p),back=pointerRadar(map,240,radarRect,radarRect.left+xy[0]*160/240,radarRect.top+xy[1]*160/240);assert.ok(back.every((n,i)=>Math.abs(n-p[i])<1e-7));
 }
});
test('enemy choices require an on-screen entitled pose or an explicit native reveal',()=>{
 const camera=new PerspectiveCamera(80,16/9,1,10000);camera.position.set(0,56,0);camera.lookAt(0,56,-100);camera.updateMatrixWorld();const rect={left:0,top:0,width:1920,height:1080},p={position:[0,0,-300],yaw:0,pitch:0,stance:0,alive:true,team:1,hidden:false,optical:true};
 assert.equal(pickableEnemy(p,0,camera,rect),true);p.position[2]=300;assert.equal(pickableEnemy(p,0,camera,rect),false);p.revealed=64;assert.equal(pickableEnemy(p,0,camera,rect),true);p.hidden=true;assert.equal(pickableEnemy(p,0,camera,rect),false);assert.equal(pickableEnemy({...p,hidden:true,get position(){throw Error('Hidden position was read')}},0,camera,rect),false);
});
