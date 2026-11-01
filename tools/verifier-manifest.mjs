import {existsSync,readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const retained=JSON.parse(readFileSync(new URL('../docs/acceptance/readability-1.4.0.json',import.meta.url))).verifiers;
const versions=[{name:'salvage-v1',directory:'.'},...retained.map(({name,sha256})=>({name,directory:'legacy/'+name,expected:sha256}))];
const manifest=versions.map(({name,directory,expected})=>{
 const sha256=Object.fromEntries(['botstrike-engine','myelin-botstrike'].map(file=>{const artifact=new URL('../release/'+directory+'/'+file,import.meta.url);if(!existsSync(artifact))throw Error('Missing exact verifier artifact: '+name+'/'+file);return [file,createHash('sha256').update(readFileSync(artifact)).digest('hex')];}));
 if(expected&&Object.entries(expected).some(([file,digest])=>sha256[file]!==digest))throw Error('Historical verifier bytes changed: '+name);
 return {name,directory,sha256};
});
writeFileSync(new URL('../release/verifiers.json',import.meta.url),JSON.stringify(manifest,null,2)+'\n');
