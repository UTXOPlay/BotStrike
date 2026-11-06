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
export function installPractice({selection,roomInfo,hud,onLaunch,onCommand,onMenu,spec}){
 const launch=document.createElement('div');launch.className='practice-launch';
 launch.innerHTML='<label>SOLO TRAINING<select id="practice-drill"></select></label><button id="training-start">ENTER TRAINING ↗</button><small>Unranked · no career, wins or rewards. Bot matches remain available separately.</small>';
 const choices=launch.querySelector('select');drills.forEach(([name],i)=>choices.add(new Option(name,String(i))));
 launch.querySelector('button').onclick=()=>onLaunch(Number(choices.value));selection.append(launch);
 const panel=document.createElement('section');panel.id='practice-panel';panel.hidden=true;
 panel.innerHTML='<h3>SOLO TRAINING · UNRANKED</h3><p class="practice-instruction"></p><p class="practice-metrics" role="status"></p><div class="practice-actions"></div><p class="practice-settings"></p><details><summary>BASELINE &amp; REPEATED ATTEMPTS</summary><p>For a repeatable comparison, use the same chassis, drill, target, distance, armor, weapons, throw mode and input device. Play one full 180-second trial, reset without changing settings, and repeat twice. Compare equal-duration attempts; interruptions and changed settings invalidate an improvement claim. For recoil wall practice, compare the native marks as well as these counters.</p><ol class="practice-reports"></ol></details><p>Reset repeats the same seed and clears held controls. Supplies refill; magazine and reload rules remain live. The server keeps running while menus or rotation block control. Finish to download a signed practice replay; practice never changes your career.</p>';
 const actions=panel.querySelector('.practice-actions');
 for(const [command,label] of [[1,'RESET ATTEMPT'],[3,'NEXT DISTANCE'],[4,'NEXT TARGET'],[8,'NEXT ARMOR'],[5,'TOGGLE TARGET MOTION'],[6,'NEXT DRILL'],[7,'RETHROW LAST'],[2,'FINISH SESSION']]){
  const b=document.createElement('button');b.textContent=label;b.dataset.command=command;b.onclick=()=>onCommand(command);actions.append(b);
 }
 roomInfo.querySelector('.room-actions').before(panel);
 const card=document.createElement('div');card.id='practice-hud';card.hidden=true;
 card.innerHTML='<b></b><small></small><div><button>RESET</button><button>DRILL MENU</button></div>';
 const buttons=card.querySelectorAll('button');buttons[0].onclick=()=>onCommand(1);buttons[1].onclick=onMenu;hud.append(card);
 return {update(room,canControl){
  const s=room?.state?.practice;panel.hidden=!s;card.hidden=!s||room.status!=='running';
  document.documentElement.dataset.practice=String(!!s);
  if(!s)return;
  const [name,instruction]=drills[s.settings.drill],summary=practiceSummary(s);
  panel.querySelector('.practice-instruction').textContent=`${name} · ${instruction}`;
  panel.querySelector('.practice-metrics').textContent=`Attempt ${s.attempt} · ${s.outcome||'in progress'} · ${summary}`;
  const equipment=spec.items[s.preview_kind],preview=equipment.activation==='throw'?`${equipment.name} / ${spec.projectile.modes[s.preview_mode||0].id}`:`${equipment.name} is self-use; no trajectory`;
  panel.querySelector('.practice-settings').textContent=`${[100,600,1500,3000][s.settings.distance]} root units · ${spec.heroes[s.settings.target_hero].name} · armor ${['chassis stock','none','100'][s.settings.armor]} · motion ${s.settings.moving?'on':'off'} · ${preview}. Preview follows the confirmed pose; changing aim or movement may change the next release. Rethrow repeats the previous origin and velocity. Rules ${spec.version.replace('botstrike-2050-','')} / ${spec.maps[room.state.config.map].name}.`;

  for(const b of actions.children)b.disabled=!canControl||room.status!=='running'||Number(b.dataset.command)===7&&(!s.last_throw||!!s.outcome||!room.state.players[room.slot].alive);
  const reports=panel.querySelector('.practice-reports');reports.replaceChildren(...s.reports.map(r=>{const item=document.createElement('li');item.textContent=`Attempt ${r.attempt} · ${drills[r.settings.drill][0]} · ${(r.ticks/64).toFixed(1)}s · ${r.shots} rounds / ${r.hits} impacts / ${r.damage} HP · ${r.movement_errors} moving shots · ${r.outcome||'reset early'}`;return item;}));
  buttons[0].disabled=!canControl;card.querySelector('b').textContent=`${name.toUpperCase()} · ${s.outcome||'UNRANKED'}`;card.querySelector('small').textContent=summary;
 }};
}
