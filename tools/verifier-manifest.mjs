import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const versions=[['network-v3','.'],['arsenal-v2','legacy/arsenal-v2']];
const manifest=versions.map(([name,directory])=>({name,directory,sha256:Object.fromEntries(['botstrike-engine','myelin-botstrike'].map(file=>[file,createHash('sha256').update(readFileSync(new URL('../release/'+directory+'/'+file,import.meta.url))).digest('hex')]))}));
writeFileSync(new URL('../release/verifiers.json',import.meta.url),JSON.stringify(manifest,null,2)+'\n');
