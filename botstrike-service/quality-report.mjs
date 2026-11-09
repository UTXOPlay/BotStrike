const metricMap={appRttMs:['clientAppRttWindowP95Ms','clientAppRttSamples',60000],inputAckMs:['clientInputAckWindowP95Ms','clientInputAckSamples',60000],snapshotGapMs:['clientSnapshotGapWindowP95Ms','clientSnapshotGapSamples',60000],snapshotAgeMs:['clientSnapshotAgeWindowP95Ms','clientSnapshotAgeSamples',60000],interpolationAgeTicks:['clientInterpolationAgeWindowP95Ticks','clientInterpolationAgeSamples',4096],predictionCorrectionUnits:['clientCorrectionWindowP95Units','clientCorrectionSamples',100000],renderFrameMs:['clientFrameWindowP95Ms','clientFrameSamples',60000],mainThreadLongTaskMs:['clientSchedulingWindowP95Ms','clientSchedulingSamples',60000]};
const countMap={ackSkipped:'clientAckSkipped',ackUnmatched:'clientAckUnmatched',pendingExpired:'clientPendingExpired',disconnects:'clientDisconnects',predictionSnaps:'clientPredictionSnaps'};
const object=value=>value&&typeof value==='object'&&!Array.isArray(value);
const exact=(value,keys)=>object(value)&&Object.keys(value).length===keys.length&&keys.every(key=>Object.hasOwn(value,key));
export function validateQualityReport(value){
 if(!exact(value,['type','version','windowMs','metrics','counts'])||value.type!=='quality'||value.version!==1||!Number.isFinite(value.windowMs)||value.windowMs<0||value.windowMs>60000||!exact(value.metrics,Object.keys(metricMap))||!exact(value.counts,Object.keys(countMap)))throw Error('Invalid quality summary');
 for(const [name,[,,max]]of Object.entries(metricMap)){
  const row=value.metrics[name];if(row===null)continue;
  if(!exact(row,['n','p50','p95','max'])||!Number.isInteger(row.n)||row.n<1||row.n>4096||!['p50','p95','max'].every(key=>Number.isFinite(row[key])&&row[key]>=0&&row[key]<=max)||row.p50>row.p95||row.p95>row.max)throw Error('Invalid quality summary');
 }
 if(!Object.values(value.counts).every(n=>Number.isSafeInteger(n)&&n>=0&&n<=1000000))throw Error('Invalid quality summary');
 return value;
}
export function ingestQualityReport(store,value,options){
 const report=validateQualityReport(value);
 for(const [field,[name,count]]of Object.entries(metricMap)){const row=report.metrics[field];if(row){store.sample(name,row.p95,options);store.record(count,row.n,options);}}
 for(const [field,name]of Object.entries(countMap))store.record(name,report.counts[field],options);
 return true;
}

// A bounded two-report burst tolerates TCP head-of-line bunching; average
// admission remains one summary per 15 seconds. This has no input authority.
export function takeQualityReport(socket,now){
 const state=socket.qualityRate??={tokens:2,at:now};
 const elapsed=Math.max(0,now-state.at);state.tokens=Math.min(2,state.tokens+elapsed/15000);state.at=now;
 if(state.tokens<1)return false;state.tokens--;return true;
}

// Independent diagnostic admission: two reports may bunch, then one refills per
// five-second host heartbeat. Dropped diagnostics never spend combat budget.
export function takeGatewayReport(socket,now){
 const state=socket.gatewayQualityRate??={tokens:2,at:now};
 const elapsed=Math.max(0,now-state.at);state.tokens=Math.min(2,state.tokens+elapsed/5000);state.at=now;
 if(state.tokens<1)return false;state.tokens--;return true;
}

export function ingestGatewayReport(store,value,options){
 if(!exact(value,['type','version','rttMs','jitterMs','upstreamQueueBytes','downstreamQueueBytes'])||value.type!=='host_quality'||value.version!==1||!Number.isFinite(value.rttMs)||value.rttMs<0||value.rttMs>86400000||value.jitterMs!==null&&(!Number.isFinite(value.jitterMs)||value.jitterMs<0||value.jitterMs>86400000)||!['upstreamQueueBytes','downstreamQueueBytes'].every(key=>Number.isSafeInteger(value[key])&&value[key]>=0&&value[key]<=2**40))throw Error('Invalid gateway summary');
 store.sample('gatewayExternalRttMs',value.rttMs,options);if(value.jitterMs!==null)store.sample('gatewayExternalJitterMs',value.jitterMs,options);store.sample('gatewayUpstreamQueueBytes',value.upstreamQueueBytes,options);store.sample('gatewayDownstreamQueueBytes',value.downstreamQueueBytes,options);store.record('gatewayReports',1,options);
 return true;
}
