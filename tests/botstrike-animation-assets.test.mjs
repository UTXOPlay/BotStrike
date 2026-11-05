import test from 'node:test';
import {auditCharacters} from '../tools/characters/audit-assets.mjs';
test('six licensed rigs retain topology, finite normalized clips and neutral transition endpoints',async()=>{await auditCharacters();});
