import {QUALITY_REPORT_MS,QUALITY_WINDOW_MS,qualityMetrics} from './connection-quality.mjs';

const labels={
 appRttMs:['App ping round trip','Includes socket round trip and browser/server scheduling.'],
 inputAckMs:['Input → Native ACK observed','Send to the first received snapshot with that exact last_seq. Includes both directions, host ticks and scheduling.'],
 snapshotGapMs:['New snapshot arrival gap','Time between received snapshots whose Native tick advances. This is not a packet-loss percentage.'],
 snapshotAgeMs:['Snapshot not updated for','Elapsed local time since the newest advancing snapshot arrived.'],
 interpolationAgeTicks:['Remote interpolation age','Latest received tick minus the tick actually selected for rendering. Native ticks, not milliseconds.'],
 predictionCorrectionUnits:['Prediction correction','Local prediction error at reconciliation, before smoothing or a teleport snap. World units.'],
 renderFrameMs:['Game draw interval','Real intervals between game draw callbacks, including the frame cap and browser scheduling. Not GPU time or physical input latency.'],
 mainThreadLongTaskMs:['Main-thread long task','Browser-reported tasks of at least 50 ms; unavailable where the Long Tasks API is unsupported.'],
};
const format=(value,key)=>value===null?'—':`${value>=qualityMetrics[key]?'≥ ':''}${value.toFixed(key==='predictionCorrectionUnits'||key==='interpolationAgeTicks'?2:1)}${key==='interpolationAgeTicks'?' ticks':key==='predictionCorrectionUnits'?' units':' ms'}`;

export function installQualityPanel({before,sampler,onSummary=()=>false,now=()=>performance.now()}={}){
 const panel=document.createElement('details');panel.id='quality-panel';panel.className='quality-panel';
 panel.innerHTML='<summary>CONNECTION &amp; FRAME QUALITY</summary><p>Recent local observations: up to 60 seconds and 4096 samples per measurement. Values at the diagnostic limit show ≥. These estimates separate connection symptoms from game drawing; they do not measure one-way network or physical display latency.</p><p id="quality-live"></p><div class="quality-columns" aria-hidden="true"><span>MEASUREMENT</span><span>MEDIAN / P95</span><span>SAMPLES</span></div><dl id="quality-metrics"></dl><p id="quality-counts"></p><label class="quality-share"><input id="quality-share" type="checkbox"> Share anonymous quality summaries for this tab</label><p class="quality-note">Sharing starts off. When enabled, only bounded, non-overlapping summaries are sent every 15 seconds while this tab controls a running match. No account identifiers, coordinates or raw events are included. Diagnostic reports never determine hits, rewards or results.</p><div class="quality-actions"><button id="quality-export" type="button">EXPORT LOCAL TRACE</button><button id="quality-clear" type="button">CLEAR LOCAL SAMPLES</button></div><p id="quality-status" role="status">Local only · sharing off</p>';
 before.before(panel);
 const list=panel.querySelector('#quality-metrics'),rows=new Map();
 for(const [key,[label,hint]]of Object.entries(labels)){
  const row=document.createElement('div');row.className='quality-metric';row.dataset.metric=key;const term=document.createElement('dt');term.textContent=label;const note=document.createElement('small');note.textContent=hint;term.append(note);const value=document.createElement('dd');value.className='quality-value';const count=document.createElement('dd');count.className='quality-samples';row.append(term,value,count);list.append(row);rows.set(key,{value,count});
 }
 const share=panel.querySelector('#quality-share'),status=panel.querySelector('#quality-status');let lastUpdate=-Infinity,nextReport=Infinity,disposed=false;
 function update(at=now(),force=false){
  if(disposed)return;
  if(share.checked&&at>=nextReport){
   const report=sampler.report(at);let sent=false;try{sent=onSummary(report)===true;}catch{}
   if(sent){sampler.commitReport(at);status.textContent='Anonymous summary sent · local trace stays on this device';nextReport=at+QUALITY_REPORT_MS;}else nextReport=at+1000;
  }
  if(!force&&(!panel.open||at-lastUpdate<500))return;lastUpdate=at;
  const summary=sampler.read(at),live=summary.live;
  panel.querySelector('#quality-live').textContent=!live.connected?'Socket disconnected. Online matches continue; reconnecting does not rewind the match.':!live.running?'No running match samples now. Recent local observations remain until they expire.':`Socket connected · newest snapshot ${live.latestSnapshotAgeMs===null?'not received yet':format(live.latestSnapshotAgeMs,'snapshotAgeMs')+' ago'} · ${live.pendingInputs} inputs awaiting observation`;
  for(const [key,row]of rows){const metric=summary.metrics[key];row.value.textContent=metric?format(metric.p50,key)+' / '+format(metric.p95,key):key==='mainThreadLongTaskMs'&&!live.longTaskSupported?'Unavailable':'—';row.value.setAttribute('aria-label',metric?`Median ${format(metric.p50,key)}; 95th percentile ${format(metric.p95,key)}`:row.value.textContent);row.count.textContent=metric?String(metric.n):'0';row.count.setAttribute('aria-label',`${metric?.n??0} samples`);}
  const c=summary.counts;panel.querySelector('#quality-counts').textContent=`Observed window: ${(summary.windowMs/1000).toFixed(1)}s · ACK-skipped ${c.ackSkipped} · unmatched ${c.ackUnmatched} · expired tracking ${c.pendingExpired} · reconnect interruptions ${c.disconnects} · prediction snaps ${c.predictionSnaps}. A skipped sequence is not proof it executed.`;
 }
 share.onchange=()=>{const at=now();sampler.beginReport(at);nextReport=share.checked?at+QUALITY_REPORT_MS:Infinity;status.textContent=share.checked?'Sharing enabled for this tab · first summary after 15 seconds':'Local only · sharing off';};
 panel.querySelector('#quality-clear').onclick=()=>{const at=now();sampler.clear(at);nextReport=share.checked?at+QUALITY_REPORT_MS:Infinity;status.textContent='Local samples cleared'+(share.checked?' · sharing remains enabled':' · sharing off');update(at,true);};
 panel.querySelector('#quality-export').onclick=()=>{
  const trace=sampler.trace(),url=URL.createObjectURL(new Blob([JSON.stringify(trace,null,2)],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download='botstrike-client-quality.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent=`Exported local trace · at most ${QUALITY_WINDOW_MS/1000}s and ${trace.limits.traceEvents} scalar events · no player coordinates`;
 };
 panel.ontoggle=()=>update(now(),true);update(now(),true);
 return {panel,update,dispose(){disposed=true;share.checked=false;panel.remove();}};
}
