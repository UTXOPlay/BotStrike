export const drills=[
 ['Target range','Compare body and head damage. Cycle distance, chassis and armor.'],
 ['Recoil wall','Fire a burst at the wall, recover, then repeat. Marks are native impacts.'],
 ['Stop and shoot','Strafe, release or counter-strafe, then fire when STEADY.'],
 ['Scope discipline','Use your optic and stop before firing. Unscoped shots are counted.'],
 ['Tracking','Follow the moving target while controlling your own movement.'],
 ['Pre-aim route','Clear the five fixed targets along the route toward site A.'],
 ['Retake','Clear site A and hold USE to defuse the planted relay before its timer expires.'],
 ['Clutch','Play alone against five defenders. Eliminate them or plant and defend the relay.']
];
export function practiceSummary(s){
 if(!s)return '';
 return `${s.shots} rounds · ${s.hits} damaging impacts (${s.headshots} head) · ${s.damage} HP · ${s.kills} kills · ${s.movement_errors} moving shots${s.settings.drill===3?' · '+s.scope_errors+' unscoped':''}`;
}
// Impacts can exceed rounds for pellet weapons. These are native counters,
// never a client-derived accuracy percentage or a new training score.
export function practiceHudMetrics(s){
 const impacts={key:'impacts',label:'IMPACTS',value:s.hits};
 const damage={key:'damage',label:'DAMAGE',value:s.damage,unit:'HP'};
 const moving={key:'moving',label:'MOVING SHOTS',value:s.movement_errors};
 if(s.settings.drill===1)return [{key:'rounds',label:'ROUNDS',value:s.shots},moving];
 if(s.settings.drill===2)return [impacts,moving];
 if(s.settings.drill===3)return [impacts,{key:'unscoped',label:'UNSCOPED',value:s.scope_errors}];
 if(s.settings.drill>=5)return [{key:'kills',label:'KILLS',value:s.kills},damage];
 return [damage,impacts];
}
export function practiceAnnouncement(s){
 return `Attempt ${s.attempt}. ${drills[s.settings.drill][0]}. ${s.outcome||'In progress'}.`;
}
export function installPractice({selection,roomInfo,hud,onLaunch,onCommand,onMenu,spec}){
 const launch=document.createElement('div');launch.className='practice-launch';
 launch.innerHTML='<div class="practice-launch-copy"><span class="eyebrow">TRAINING RANGE</span><b>One drill. A repeatable attempt.</b><small>Solo · unranked · no career rewards</small></div><label>CHOOSE A DRILL<select id="practice-drill"></select></label><button id="training-start">ENTER TRAINING ↗</button>';
 const choices=launch.querySelector('select');drills.forEach(([name],i)=>choices.add(new Option(name,String(i))));
 launch.querySelector('button').onclick=()=>onLaunch(Number(choices.value));selection.append(launch);
 const panel=document.createElement('section');panel.id='practice-panel';panel.hidden=true;
 panel.innerHTML='<header class="practice-heading"><div><span class="eyebrow">SOLO TRAINING · UNRANKED</span><h3 class="practice-title"></h3></div><span class="practice-attempt"></span></header><p class="practice-instruction"></p><div class="practice-metrics"><dl class="practice-stat-grid"></dl></div><p class="practice-announcement sr-only" role="status" aria-live="polite" aria-atomic="true"></p><div class="practice-actions practice-retry-actions" aria-label="Repeat this attempt"></div><details class="practice-configuration" open><summary>TARGET &amp; DRILL SETUP</summary><p class="practice-settings"></p><div class="practice-actions practice-config-actions" aria-label="Adjust training setup"></div><p class="practice-preview-note"></p></details><details class="practice-history"><summary>ATTEMPT HISTORY &amp; REPEATED TRAINING</summary><p>Keep the same chassis, drill, target, distance, armor, weapon, throw mode and input device. Complete a 180-second baseline, reset, then repeat twice. Compare equal durations. Changed settings and interrupted attempts do not establish improvement. Recoil wall also needs a comparison of the native marks.</p><ol class="practice-reports"></ol><p class="practice-report-empty">Complete or reset an attempt to record it here.</p></details><div class="practice-session-footer"><p>Reset repeats the seed and refills supplies. The server keeps running in menus. Finish to enable the signed replay download; no career rewards are earned.</p><div class="practice-actions practice-session-actions" aria-label="Session actions"></div></div>';
 const actionButtons=[];
 for(const [command,label,group] of [[1,'RESET ATTEMPT','retry'],[3,'NEXT DISTANCE','config'],[4,'NEXT TARGET','config'],[8,'NEXT ARMOR','config'],[5,'TARGET MOTION','config'],[6,'NEXT DRILL','config'],[7,'RETHROW LAST','config'],[2,'FINISH SESSION','session']]){
  const b=document.createElement('button');b.type='button';b.textContent=label;b.dataset.command=command;if(command===1)b.className='primary';b.onclick=()=>onCommand(command);panel.querySelector('.practice-'+group+'-actions').append(b);actionButtons.push(b);
 }
 roomInfo.querySelector('.room-actions').before(panel);
 const card=document.createElement('div');card.id='practice-hud';card.hidden=true;
 card.innerHTML='<div class="practice-hud-heading"><b></b><span class="practice-hud-attempt"></span></div><dl class="practice-hud-stats" aria-label="Current training counters"></dl><div class="practice-hud-actions"><button type="button">RESET</button><button type="button">DRILL MENU</button></div>';
 const buttons=card.querySelectorAll('button');buttons[0].onclick=()=>onCommand(1);buttons[1].onclick=onMenu;hud.append(card);
 const title=panel.querySelector('.practice-title'),attempt=panel.querySelector('.practice-attempt'),instructionNode=panel.querySelector('.practice-instruction'),announcement=panel.querySelector('.practice-announcement'),stats=panel.querySelector('.practice-stat-grid'),settings=panel.querySelector('.practice-settings'),previewNote=panel.querySelector('.practice-preview-note'),reports=panel.querySelector('.practice-reports'),emptyReports=panel.querySelector('.practice-report-empty'),hudTitle=card.querySelector('b'),hudAttempt=card.querySelector('.practice-hud-attempt'),hudStats=card.querySelector('.practice-hud-stats');
 const text=(node,value)=>{value=String(value);if(node.textContent!==value)node.textContent=value;};
 const settingsText=s=>`${[100,600,1500,3000][s.distance]} units · ${spec.heroes[s.target_hero].name} · ${['Chassis armor','No armor','100 armor'][s.armor]} · Target motion ${s.moving?'on':'off'}`;
 function metricList(root,rows){
  const keys=rows.map(row=>row.key).join('|');
  if(root.dataset.metrics!==keys){root.dataset.metrics=keys;root.replaceChildren(...rows.map(row=>{const cell=document.createElement('div');cell.dataset.metric=row.key;cell.innerHTML='<dt></dt><dd><b></b><small></small></dd>';return cell;}));}
  for(const [i,row]of rows.entries()){const cell=root.children[i];text(cell.querySelector('dt'),row.label);text(cell.querySelector('b'),row.value);text(cell.querySelector('small'),row.unit||'');}
 }
 let reportsKey='',announcementKey='';
 return {update(room,canControl){
  const s=room?.state?.practice;panel.hidden=!s;card.hidden=!s||room.status!=='running';
  document.documentElement.dataset.practice=String(!!s);
  if(!s)return;
  const [name,instruction]=drills[s.settings.drill],outcome=s.outcome||'IN PROGRESS';
  text(title,name);text(instructionNode,instruction);text(attempt,`ATTEMPT ${s.attempt} · ${outcome.toUpperCase()}`);
  const metricRows=[{key:'rounds',label:'ROUNDS',value:s.shots},{key:'impacts',label:'DAMAGING IMPACTS',value:s.hits},{key:'head',label:'HEAD IMPACTS',value:s.headshots},{key:'damage',label:'DAMAGE',value:s.damage,unit:'HP'},{key:'kills',label:'KILLS',value:s.kills},{key:'moving',label:'MOVING SHOTS',value:s.movement_errors}];
  if(s.settings.drill===3)metricRows.push({key:'scope',label:'UNSCOPED SHOTS',value:s.scope_errors});
  metricList(stats,metricRows);metricList(hudStats,practiceHudMetrics(s));
  const announcementContext=room.id+':'+practiceAnnouncement(s);if(announcementContext!==announcementKey){announcementKey=announcementContext;text(announcement,practiceAnnouncement(s));}
  const equipment=spec.items[s.preview_kind],preview=equipment.activation==='throw'?`${equipment.name} / ${spec.projectile.modes[s.preview_mode||0].id}`:`${equipment.name} is self-use; no trajectory`;
  text(settings,settingsText(s.settings));text(previewNote,`${preview}. Preview uses the confirmed pose; rethrow repeats the last origin and velocity. ${spec.maps[room.state.config.map].name} · Rules ${spec.version.replace('botstrike-2050-','')}.`);
  for(const b of actionButtons)b.disabled=!canControl||room.status!=='running'||Number(b.dataset.command)===7&&(!s.last_throw||!!s.outcome||!room.state.players[room.slot].alive);
  const motionButton=actionButtons.find(b=>b.dataset.command==='5');text(motionButton,'TARGET MOTION · '+(s.settings.moving?'ON':'OFF'));motionButton.setAttribute('aria-pressed',String(s.settings.moving));
  const nextReportsKey=JSON.stringify(s.reports);if(nextReportsKey!==reportsKey){reportsKey=nextReportsKey;reports.replaceChildren(...s.reports.map(r=>{const item=document.createElement('li'),heading=document.createElement('b'),result=document.createElement('p'),context=document.createElement('small');heading.textContent=`Attempt ${r.attempt} · ${drills[r.settings.drill][0]} · ${(r.ticks/64).toFixed(1)}s`;result.textContent=`${r.shots} rounds · ${r.hits} damaging impacts · ${r.damage} HP · ${r.movement_errors} moving shots · ${r.outcome||'reset early'}`;context.textContent=settingsText(r.settings);item.append(heading,result,context);return item;}));emptyReports.hidden=s.reports.length>0;}
  buttons[0].disabled=!canControl||room.status!=='running';buttons[1].disabled=!canControl;card.dataset.outcome=s.outcome||'running';text(hudTitle,name.toUpperCase());text(hudAttempt,'#'+s.attempt+(s.outcome?' · '+s.outcome.toUpperCase():''));
 }};
}
