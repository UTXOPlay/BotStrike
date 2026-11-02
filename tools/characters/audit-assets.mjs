import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {chassisNames,motionNames,transitionNames} from '../../games/botstrike/client/characters.mjs';
const dimensions={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT4:16};
const formats={5120:[1,'getInt8',127],5121:[1,'getUint8',255],5122:[2,'getInt16',32767],5123:[2,'getUint16',65535],5125:[4,'getUint32',4294967295],5126:[4,'getFloat32',1]};
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
function parse(bytes){
 assert.equal(bytes.toString('ascii',0,4),'glTF');assert.equal(bytes.readUInt32LE(8),bytes.length);
 const size=bytes.readUInt32LE(12),doc=JSON.parse(bytes.subarray(20,20+size)),binary=bytes.subarray(28+size),views=new Map(),accessors=new Map();
 const accessor=index=>{
  if(accessors.has(index))return accessors.get(index);
  const a=doc.accessors[index];assert.ok(!a.sparse);
  const v=doc.bufferViews[a.bufferView],compressed=v.extensions?.EXT_meshopt_compression;
  if(!views.has(a.bufferView)){
   let data;
   if(compressed){data=new Uint8Array(compressed.count*compressed.byteStride);MeshoptDecoder.decodeGltfBuffer(data,compressed.count,compressed.byteStride,binary.subarray(compressed.byteOffset,compressed.byteOffset+compressed.byteLength),compressed.mode,compressed.filter);}
   else{assert.equal(v.buffer,0);data=binary.subarray(v.byteOffset||0,(v.byteOffset||0)+v.byteLength);}
   views.set(a.bufferView,new DataView(data.buffer,data.byteOffset,data.byteLength));
  }
  const view=views.get(a.bufferView),[bytes,method,divisor]=formats[a.componentType],width=dimensions[a.type],stride=v.byteStride||compressed?.byteStride||bytes*width,result=[];
  for(let i=0;i<a.count;i++){
   const value=[];for(let j=0;j<width;j++){let n=view[method]((a.byteOffset||0)+i*stride+j*bytes,true);if(a.normalized)n=Math.max(-1,n/divisor);assert.ok(Number.isFinite(n));value.push(n);}result.push(value);
  }
  accessors.set(index,result);return result;
 };
 return {doc,accessor};
}
function distance(a,b,quaternion=false){const direct=Math.hypot(...a.map((v,i)=>v-b[i]));return quaternion?Math.min(direct,Math.hypot(...a.map((v,i)=>v+b[i]))):direct;}
export async function auditCharacters(){
 await MeshoptDecoder.ready;const results=[];
 for(const name of chassisNames){
  const bytes=await readFile('games/botstrike/web/models/'+name+'.glb'),{doc,accessor}=parse(bytes),original=parse(await readFile('assets/characters/baseline/'+name+'.glb')),baseline=original.doc;
  const topology=d=>d.meshes.flatMap(m=>m.primitives.map(p=>({vertices:d.accessors[p.attributes.POSITION].count,indices:d.accessors[p.indices].count})));assert.deepEqual(topology(doc),topology(baseline),name+': geometry topology changed');
  // Animation-only exports must preserve the decoded geometry, not merely
  // accessor counts. This also checks the actual skin joints and weights.
  for(let m=0;m<doc.meshes.length;m++)for(let p=0;p<doc.meshes[m].primitives.length;p++){
   const current=doc.meshes[m].primitives[p],prior=baseline.meshes[m].primitives[p];
   assert.deepEqual(accessor(current.indices),original.accessor(prior.indices),name+': mesh indices changed');
   assert.deepEqual(Object.keys(current.attributes),Object.keys(prior.attributes),name+': mesh attributes changed');
   for(const attribute of Object.keys(current.attributes))assert.deepEqual(accessor(current.attributes[attribute]),original.accessor(prior.attributes[attribute]),name+': '+attribute+' changed');
  }
  assert.equal(doc.skins.length,1);assert.equal(doc.skins[0].joints.length,19);assert.deepEqual(doc.skins[0].joints.map(i=>doc.nodes[i].name),baseline.skins[0].joints.map(i=>baseline.nodes[i].name));
  assert.deepEqual(doc.animations.map(a=>a.name.split('|').at(-1)).sort(),[...motionNames].sort());
  for(const image of doc.images){assert.match(image.uri,/^textures\/[a-z0-9-]+\.webp$/);await readFile('games/botstrike/web/models/'+image.uri);assert.equal(image.bufferView,undefined);}
  const idle=doc.animations.find(a=>a.name.endsWith('|idle')),reference=new Map(idle.channels.map(c=>[c.target.node+':'+c.target.path,accessor(idle.samplers[c.sampler].output)[0]]));
  const clips=[];
  for(const animation of doc.animations){
   const clip=animation.name.split('|').at(-1),loop=['idle','walk','run','backpedal','strafe_left','strafe_right','crouch','crouch_walk','interact','victory','defeat'].includes(clip);let duration=0,maxLoopError=0,maxBodyEndpointError=0;
   for(const channel of animation.channels){
    const sampler=animation.samplers[channel.sampler],times=accessor(sampler.input).flat(),values=accessor(sampler.output),rotation=channel.target.path==='rotation';
    // Blender authors from frame 1; the glTF prefix holds that first pose.
    assert.equal(values.length,times.length);assert.ok(times[0]>=0&&times[0]<=1/30+.0001);assert.ok(times.every((t,i)=>!i||t>times[i-1]));duration=Math.max(duration,times.at(-1));
    if(rotation)for(const q of values)assert.ok(Math.abs(Math.hypot(...q)-1)<.001,`${name}/${clip}: non-unit quaternion`);
    if(loop){const error=distance(values[0],values.at(-1),rotation);maxLoopError=Math.max(maxLoopError,error);assert.ok(error<.001,`${name}/${clip}: loop seam ${error}`);}
    if(transitionNames.includes(clip)&&/^(hips|spine|chest|head)$/.test(doc.nodes[channel.target.node].name))for(const value of [values[0],values.at(-1)]){
     const error=distance(value,reference.get(channel.target.node+':'+channel.target.path),rotation);maxBodyEndpointError=Math.max(maxBodyEndpointError,error);assert.ok(error<.001,`${name}/${clip}: additive endpoint ${error}`);
    }
   }
   assert.ok(duration>0);clips.push({name:clip,duration,maxLoopError,maxBodyEndpointError});
  }
  results.push({name,bytes:bytes.length,sha256:digest(bytes),sourceSha256:digest(await readFile('assets/characters/source/'+name+'.blend')),bones:19,topology:topology(doc),clips});
 }
 return {authoringSha256:digest(await readFile('tools/characters/authoring.py')),characters:results};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)console.log(JSON.stringify(await auditCharacters(),null,2));
