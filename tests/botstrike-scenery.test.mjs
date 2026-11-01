import test from 'node:test';
import assert from 'node:assert/strict';
import {placeSkyline} from '../games/botstrike/client/art-direction.mjs';

test('decorative skyline cannot enter a playable map corner',()=>{
 for(const extent of [1000,1200,1400])for(const width of [110,260])for(const depth of [100,230])for(let i=0;i<62;i++){
  const angle=i*2.39996,r=extent+330+(i%4)*360;
  const [x,z]=placeSkyline(Math.sin(angle)*r,Math.cos(angle)*r,width,depth,extent);
  const outsideX=Math.abs(x)-width/2>=extent+80-1e-8;
  const outsideZ=Math.abs(z)-depth/2>=extent+80-1e-8;
  assert.ok(outsideX||outsideZ,`skyline ${i} overlaps map ${extent}`);
 }
});

test('distant skyline buildings keep their original positions',()=>{
 assert.deepEqual(placeSkyline(2000,300,160,140,1200),[2000,300]);
});
