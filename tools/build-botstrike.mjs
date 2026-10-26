import {build} from 'esbuild';
import {copyFileSync} from 'node:fs';
await build({entryPoints:['games/botstrike/client/main.mjs'],bundle:true,minify:true,format:'esm',target:'es2022',outfile:'games/botstrike/web/app.js',legalComments:'eof'});
copyFileSync('botstrike/spec.json','games/botstrike/web/spec.json');
