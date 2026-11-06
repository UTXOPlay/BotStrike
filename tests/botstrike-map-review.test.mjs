import test from 'node:test';
import assert from 'node:assert/strict';
import {mapTransform,mapToScreen,screenToMap} from '../tools/map-review-transform.mjs';
test('map review preserves square geometry and inverts pointer mapping across all six viewports',()=>{
 for(const [width,height]of [[1920,1080],[2560,1080],[2560,1440],[3840,2160],[390,844],[844,390]]){
  const t=mapTransform(width,height,1200);
  for(const point of [[-1200,0,-1200],[1200,0,1200],[-730,0,-680],[760,0,650],[0,0,0]]){
   const pixel=mapToScreen(point,t),back=screenToMap(pixel,t);assert.ok(back.every((v,i)=>Math.abs(v-point[i])<1e-9));assert.ok(pixel[0]>=0&&pixel[0]<=width&&pixel[1]>=0&&pixel[1]<=height);
  }
  assert.ok(Math.abs((mapToScreen([100,0,0],t)[0]-t.x)-(mapToScreen([0,0,100],t)[1]-t.y))<1e-10);
 }
});
