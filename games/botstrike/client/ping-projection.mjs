import {Raycaster,Vector2,Vector3} from 'three';
import {rayTerrain,radarPoint} from '../../../shared/ping-geometry.mjs';
import {visibilitySamples} from '../../../shared/sight-geometry.mjs';
const ray=new Raycaster(),ndc=new Vector2(),point=new Vector3();
export function pointerTerrain(camera,map,rect,x,y){
 if(rect.width<=0||rect.height<=0||x<rect.left||x>rect.left+rect.width||y<rect.top||y>rect.top+rect.height)return null;
 camera.updateMatrixWorld();ndc.set((x-rect.left)/rect.width*2-1,1-(y-rect.top)/rect.height*2);ray.setFromCamera(ndc,camera);
 return rayTerrain(map,ray.ray.origin.toArray(),ray.ray.direction.toArray());
}
export function projectPing(camera,rect,position){
 camera.updateMatrixWorld();point.fromArray(position).project(camera);if(point.z< -1||point.z>1||Math.abs(point.x)>1||Math.abs(point.y)>1)return null;
 return [rect.left+(point.x+1)*rect.width/2,rect.top+(1-point.y)*rect.height/2];
}
export function pointerRadar(map,backingSize,rect,x,y){return rect.width>0&&rect.height>0?radarPoint(map,backingSize,(x-rect.left)*backingSize/rect.width,(y-rect.top)*backingSize/rect.height):null;}
export function pickableEnemy(player,team,camera,rect,profile){
 if(!player.alive||player.team===team||player.hidden||!player.position)return false;
 // Native disclosure can include poses around the viewer for interpolation.
 // The menu must not become an automatic list of opponents behind the camera.
 return player.revealed>0||player.optical!==false&&visibilitySamples(player,profile).some(p=>projectPing(camera,rect,p)!==null);
}
