import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {modelDigest} from './damage-contract-source.mjs';
const binding=JSON.parse(readFileSync('presentation-binding.json'));
const sha=file=>createHash('sha256').update(readFileSync(file)).digest('hex');
if(modelDigest()!==binding.modelSha256||JSON.parse(readFileSync('bound-damage.json')).model_sha256!==binding.modelSha256)throw Error('Native model changed; use the full rules release workflow');
for(const [file,hash]of Object.entries(binding.pair))if(sha('release/'+file)!==hash)throw Error('Retained application bytes differ: '+file);
for(const [file,hash]of Object.entries(binding.sourceSha256))if(sha(file)!==hash)throw Error('Non-presentation source changed: '+file);
console.log('Exact native, adapter and backend binding preserved.');
