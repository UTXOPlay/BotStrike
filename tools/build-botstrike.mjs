import {build} from 'esbuild';
import {modelDigest} from './damage-contract-source.mjs';
import {copyFileSync,readFileSync} from 'node:fs';
if(JSON.parse(readFileSync('games/botstrike/web/damage-contract.json')).model_sha256!==modelDigest())throw Error('Damage guide is stale. Run npm run build:damage after native changes.');
await build({entryPoints:['games/botstrike/client/main.mjs'],bundle:true,minify:true,format:'esm',target:'es2022',outfile:'games/botstrike/web/app.js',legalComments:'eof'});
copyFileSync('botstrike/spec.json','games/botstrike/web/spec.json');
