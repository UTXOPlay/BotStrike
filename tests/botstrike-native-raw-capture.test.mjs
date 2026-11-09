// Actual service Native output, lossless private JSONL, full-field Rust hashes.
// No zero normalization, epsilon or field omission is allowed.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {buildNetworkAudit} from '../tools/run-network-audit.mjs';
import {observerFixture,until} from './botstrike-observer-fixture.mjs';
function command(file,args,input){return new Promise((resolve,reject)=>{
 const child=spawn(file,args,{stdio:['pipe','pipe','pipe']}),output=[];let bytes=0,error='';const timer=setTimeout(()=>child.kill('SIGKILL'),10000);
 child.stdout.on('data',chunk=>{bytes+=chunk.length;if(bytes>4*1024**2)child.kill('SIGKILL');else output.push(chunk);});child.stderr.on('data',chunk=>{if(error.length<8192)error+=chunk;});child.once('error',reject);child.once('close',code=>{clearTimeout(timer);code===0?resolve(Buffer.concat(output).toString()):reject(Error('Exact capture command failed: '+error));});child.stdin.on('error',()=>{});child.stdin.end(input);
});}
function negativeZero(value){if(typeof value==='number')return Object.is(value,-0);return value&&typeof value==='object'&&Object.values(value).some(negativeZero);}
test('original Native rawLine survives capture JSON and exactly hashes every Game field including negative zero; legacy capture is rejected',async()=>{
 const binary=await buildNetworkAudit(),f=await observerFixture();
 try{
  await until(()=>f.events.filter(event=>event.type==='native_frame').length>=3);await f.stop();
  const frames=f.events.filter(event=>event.type==='native_frame').slice(0,3);assert.ok(frames.some(event=>negativeZero(event.state)),'in-process JSON.parse retains Native negative zero');
  assert.ok(frames.some(event=>/-0\.0/.test(event.rawLine)));const encoded=frames.map(event=>JSON.stringify({type:'native_frame',rawLine:event.rawLine})).join('\n')+'\n';
  const legacy=frames.map(event=>JSON.stringify({type:'native_frame',state:event.state})).join('\n')+'\n';assert.equal(legacy.split('\n').filter(Boolean).map(JSON.parse).some(event=>negativeZero(event.state)),false,'the old capture format loses the sign before hashing');
  const tape=(await readFile(path.join(f.data,'rooms',f.room.id,'tape.jsonl'),'utf8')).split('\n').slice(0,4).join('\n')+'\n',exactOutput=await command(path.resolve('release/botstrike-engine'),[],tape);
  const exact=(await command(binary,['hash-states'],exactOutput)).trim().split('\n').map(JSON.parse).filter(row=>!row.result),captured=(await command(binary,['frame-hashes'],encoded)).trim().split('\n').map(JSON.parse);
  assert.equal(captured.length,3);assert.deepEqual(captured,exact,'all serialized Game fields, not a selected pose subset, equal exact release output');await assert.rejects(command(binary,['frame-hashes'],legacy),/RAW_FRAME_REQUIRED/);
 }finally{await f.cleanup();}
});
