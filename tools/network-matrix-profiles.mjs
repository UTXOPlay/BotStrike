import assert from 'node:assert/strict';
import {normalizeDirection} from './network-lab.mjs';
export const MATRIX_VERSION=3;
export const MATRIX_BUDGET_BYTES=4*1024**3;
export const MATRIX_MIN_FREE_BYTES=2*1024**3;
export const MATRIX_DEFAULT_ROOT='/home/arthur/.codex/artifacts/botstrike-network-20261108';
const profile=(upstream={},downstream={})=>({upstream:normalizeDirection(upstream),downstream:normalizeDirection(downstream)});
export function networkMatrixCases({seed=20261108}={}){
 assert.ok(Number.isInteger(seed)&&seed>0&&seed<0xffffffff-1000);const cases=[];
 function add(id,settings={}){const index=cases.length,baseSeed=seed+index*4;cases.push({id,seed:baseSeed,kind:'combat',roles:['A','B'],profiles:{A:profile({seed:baseSeed},{seed:baseSeed+1}),B:profile({seed:baseSeed+2},{seed:baseSeed+3}),C:profile()},settleMs:2000,scenario:'arc-movement-cover',availability:'must_execute_under_profile',...settings});}
 for(const rtt of [0,50,100,180])for(const loss of [0,1,3]){
  const n=cases.length,b=seed+n*4,d=i=>({delayMs:rtt/2,lossPct:loss,seed:b+i});add(`rtt-${rtt}-loss-${loss}`,{requestedRttMs:rtt,packetLossPct:loss,profiles:{A:profile(d(0),d(1)),B:profile(d(2),d(3)),C:profile()}});
 }
 for(const actor of ['A','B'])for(const direction of ['both','upstream','downstream']){const delay=direction==='both'?90:180,p={};for(const a of ['A','B'])p[a]=profile(a===actor&&(direction==='both'||direction==='upstream')?{delayMs:delay,seed:seed+cases.length*4}:{},a===actor&&(direction==='both'||direction==='downstream')?{delayMs:delay,seed:seed+cases.length*4+1}:{});p.C=profile();add(`asymmetric-${actor.toLowerCase()}-${direction}-180`,{profiles:p,highLatencyActor:actor,asymmetricDirection:direction});}
 add('jitter-normal-100',{profiles:{A:profile({delayMs:50,jitterMs:20,seed:seed+100},{delayMs:50,jitterMs:20,seed:seed+101}),B:profile({delayMs:50,jitterMs:20,seed:seed+102},{delayMs:50,jitterMs:20,seed:seed+103}),C:profile()}});
 add('jitter-policy-edge-180',{profiles:{A:profile({delayMs:90,jitterMs:60,seed:seed+110},{delayMs:90,jitterMs:60,seed:seed+111}),B:profile(),C:profile()},thresholdInvestigation:true});
 add('gem-burst-a',{profiles:{A:profile({delayMs:25,burstLoss:{p:2,r:25,badLoss:100,goodLoss:0},seed:seed+120},{delayMs:25,seed:seed+121}),B:profile(),C:profile()}});
 add('bandwidth-uplink-128',{profiles:{A:profile({bandwidthKbit:128,seed:seed+130},{bandwidthKbit:1024,seed:seed+131}),B:profile(),C:profile()}});
 add('bandwidth-downlink-256',{profiles:{A:profile({bandwidthKbit:512,seed:seed+140},{bandwidthKbit:256,seed:seed+141}),B:profile(),C:profile()},thresholdInvestigation:true});
 add('outage-upstream-short',{kind:'outage',availability:'fault_then_bounded_recovery',fault:{actor:'A',direction:'upstream',durationMs:1000,recoveryBandwidthKbit:128,recoveryMs:4000},settleMs:500});
 add('outage-both-short',{kind:'outage',availability:'fault_then_bounded_recovery',fault:{actor:'A',direction:'both',durationMs:3000,recoveryMs:1000},settleMs:500});
 add('outage-heartbeat-long',{kind:'outage',availability:'fault_then_bounded_recovery',fault:{actor:'A',direction:'both',durationMs:12000,recoveryMs:1000,requiresSocketReconnect:true},settleMs:500});
 add('network-interface-change',{kind:'network-change',availability:'fault_then_bounded_recovery',fault:{actor:'A',durationMs:1000,requiresNewIp:true},settleMs:500});
 add('suspended-tab',{kind:'suspend',availability:'fault_then_bounded_recovery',fault:{actor:'A',durationMs:3000},settleMs:500});
 add('render-30-cpu-4x',{kind:'render',cpuRate:4,renderFps:30,profiles:{A:profile({delayMs:25},{delayMs:25}),B:profile(),C:profile()}});
 add('arsenal-life-multiple',{kind:'arsenal',scenario:'arc-ion-rail-death-new-life-multiple',availability:'must_execute_under_profile'});
 add('tactical-recovery-no-ai',{kind:'tactical',roles:['T0','T1'],scenario:'ten-node-tactical-outage-claim-life-buy-leave-capacity',availability:'fault_then_bounded_recovery',mandatory:true});
 add('stance-boundary-low-high',{kind:'stance-boundary',scenario:'target-stance-transition-original-render-native-ray-role-swap',highLatencyActor:'B',requestedRttMs:{A:0,B:180},profiles:{A:profile(),B:profile({delayMs:90,seed:seed+180},{delayMs:90,seed:seed+181}),C:profile()}});
 const peekSeed=seed+cases.length*4;add('peek-boundary-low-high',{kind:'peek-boundary',scenario:'target-cover-peek-original-render-native-ray-role-swap',highLatencyActor:'B',requestedRttMs:{A:0,B:180},profiles:{A:profile({seed:peekSeed},{seed:peekSeed+1}),B:profile({delayMs:90,seed:peekSeed+2},{delayMs:90,seed:peekSeed+3}),C:profile()}});
 assert.equal(new Set(cases.map(c=>c.id)).size,cases.length);return cases.map(row=>Object.freeze(row));
}
export function selectMatrixCases(catalog,ids){
 if(ids===undefined||ids.length===0)return catalog;
 assert.ok(Array.isArray(ids)&&ids.length<=64&&ids.every(id=>typeof id==='string'));assert.equal(new Set(ids).size,ids.length,'Duplicate case selection');const selected=ids.map(id=>catalog.find(row=>row.id===id));assert.ok(selected.every(Boolean),'Unknown matrix case');return selected;
}
export function matrixResultStatus({failures=[],unsupported=[]}={}){return failures.length?'failed':unsupported.length?'unsupported':'passed';}
export function reusableMatrixCases(report,binding){
 assert.equal(report?.schemaVersion,MATRIX_VERSION,'Unsupported resume report');assert.deepEqual(report.binding,binding,'Resume requires identical immutable image/source/tool/seed/catalog binding');
 return new Map((report.cases||[]).filter(row=>row.status==='passed').map(row=>[row.id,row]));
}
