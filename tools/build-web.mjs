import {cpSync,mkdirSync,rmSync} from 'node:fs';
await import('./build-botstrike.mjs');
rmSync('dist',{recursive:true,force:true});mkdirSync('dist/botstrike',{recursive:true});cpSync('games/botstrike/web','dist/botstrike',{recursive:true});cpSync('public','dist/botstrike/_shared',{recursive:true});console.log('Built standalone BotStrike');
