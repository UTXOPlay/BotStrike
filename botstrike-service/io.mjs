import {write as fsWrite} from 'node:fs';
export function writeAll(fd,line,write=fsWrite){
 const bytes=Buffer.from(line);
 return new Promise((resolve,reject)=>{
  let offset=0;
  function next(){write(fd,bytes,offset,bytes.length-offset,null,(error,count)=>{
   if(error)return reject(error);if(!count)return reject(Error('Recording write made no progress'));
   offset+=count;if(offset===bytes.length)resolve();else next();
  });}next();
 });
}
