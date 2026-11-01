import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {shotTrailEnd} from '../games/botstrike/client/shot-trail.mjs';

const spec=JSON.parse(readFileSync(new URL('../botstrike/spec.json',import.meta.url)));

test('tracers stop at the first native obstacle surface',()=>{
 for(const map of spec.maps){
  const box=map.obstacles[0],y=(box.min[1]+box.max[1])/2,z=(box.min[2]+box.max[2])/2;
  const from=[box.min[0]-100,y,z];
  assert.equal(shotTrailEnd(from,[1,0,0],[box]),100);
  assert.equal(shotTrailEnd(from,[1,0,0],[box],70),70);
  assert.equal(shotTrailEnd(from,[0,0,1],[box]),245);
  assert.equal(shotTrailEnd([box.min[0]+1,y,z],[1,0,0],[box]),0);
 }
});

test('the nearest cover wins regardless of obstacle order',()=>{
 const near={min:[20,0,-10],max:[30,80,10]},far={min:[80,0,-10],max:[90,80,10]};
 assert.equal(shotTrailEnd([0,56,0],[1,0,0],[far,near]),20);
 assert.equal(shotTrailEnd([0,56,0],[1,0,0],[near,far]),20);
 assert.equal(shotTrailEnd([0,56,0],[-1,0,0],[near,far]),245);
});
