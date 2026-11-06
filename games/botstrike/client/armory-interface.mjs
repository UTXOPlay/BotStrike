import {tactical,teamForecastRows} from './tactical-view.mjs';
const setText=(node,value)=>{const text=String(value);if(node.textContent!==text)node.textContent=text;};
export function purchaseHint(entry,player,phase,isTactical){
 if(entry.kind==='weapon'&&player.owned[entry.index])return {state:player.weapon===entry.index?'equipped':'owned',label:player.weapon===entry.index?'Equipped':'Owned',detail:`${player.ammo[entry.index]} in magazine · ${player.reserve[entry.index]} reserve`};
 if(isTactical&&entry.kind==='weapon'&&entry.index===0)return {state:'restricted',label:'Recovery only',detail:'ARC is issued on death or half reset. Pick up a dropped one.'};
 const count=player.items[entry.index]||0,full=entry.kind==='equipment'&&(entry.index===0?player.armor>=100:count>=entry.capacity);
 if(full)return {state:'stocked',label:'Stocked',detail:entry.index===0?'Armor is full':`${count} / ${entry.capacity} carried`};
 if(phase!=='buy')return {state:'field',label:entry.kind==='equipment'&&count>0?'Carried':'Buy phase only',detail:entry.kind==='equipment'&&count>0?`${count} / ${entry.capacity} carried`:'Purchases open next buy phase'};
 const remaining=player.credits-entry.cost;
 return remaining<0?{state:'unaffordable',label:'Insufficient credits',detail:`Need ₡ ${-remaining} more`}:{state:'available',label:'Available',detail:`After purchase: ₡ ${remaining}`};
}
export function installArmoryInterface({menu,spec,entries}){
 const find=id=>menu.querySelector('#'+id),panel=menu.querySelector('.dialog-content'),items=find('buy-items'),tabs=find('armory-tabs'),balance=find('buy-balance'),drop=find('drop-current'),forecast=find('team-economy');
 panel.classList.add('armory-content');
 const header=document.createElement('header');header.className='armory-header';
 const titlebar=document.createElement('div');titlebar.className='armory-titlebar';
 const title=document.createElement('div');title.className='armory-title';title.append(panel.querySelector('.eyebrow'),panel.querySelector('h2'));const headerActions=document.createElement('div');headerActions.className='armory-header-actions';const setupJump=document.createElement('button');setupJump.id='armory-setup-open';setupJump.type='button';setupJump.textContent='EQUIPMENT SETUP';setupJump.setAttribute('aria-controls','armory-equipment');headerActions.append(setupJump,find('buy-close'));titlebar.append(title,headerActions);
 const kit=document.createElement('div');kit.className='armory-kit';kit.setAttribute('aria-label','Current loadout');
 const slots=Array.from({length:2},()=>{const cell=document.createElement('div');cell.className='armory-slot';cell.innerHTML='<small></small><b></b>';kit.append(cell);return cell;});kit.append(drop);
 header.append(titlebar,balance,kit,tabs);panel.prepend(header);
 const workspace=document.createElement('div');workspace.className='armory-workspace';const catalog=document.createElement('div');catalog.className='armory-catalog';catalog.append(items);const tools=document.createElement('aside');tools.className='armory-tools';tools.setAttribute('aria-label','Loadout details');workspace.append(catalog,tools);panel.append(workspace);
 const setup=document.createElement('details');setup.id='armory-equipment';setup.open=true;setup.innerHTML='<summary>Equipment & throw setup</summary><div class="armory-setup"></div>';
 const settings=setup.querySelector('div');for(const node of [...panel.querySelectorAll('.equipment-picker')])settings.append(node);const hint=find('throw-mode-hint');if(hint)settings.append(hint);const guide=panel.querySelector('.utility-guide');if(guide)settings.append(guide);tools.append(setup);
 const squad=document.createElement('details');squad.id='squad-budget';squad.innerHTML='<summary>Squad budget <span>Team only</span></summary>';squad.append(forecast);tools.append(squad);
 const compare=panel.querySelector('.damage-guide');if(compare)tools.append(compare);
 setupJump.onclick=()=>{setup.open=true;setup.querySelector('select')?.focus();};tabs.addEventListener('click',()=>{panel.scrollTop=0;});
 const rows=Array.from({length:5},()=>{const row=document.createElement('div');row.className='economy-row';row.innerHTML='<div><b></b><small></small></div><div><strong></strong><small></small></div>';return row;});
 const assumptions=document.createElement('p');assumptions.className='economy-assumptions';assumptions.textContent='Next round assumes no more spending or actor/kill rewards; planted-loss bonus excluded. Survivors keep gear; deaths reset to ARC. Owned ammunition is resupplied.';
 forecast.replaceChildren(...rows,assumptions);
 const cards=Array.from(items.children).map((card,i)=>{const entry=entries[i],image=card.querySelector('img'),name=card.querySelector('b'),visual=document.createElement('div'),category=document.createElement('span'),title=document.createElement('div'),price=document.createElement('span'),state=document.createElement('span'),detail=document.createElement('small');
  visual.className='armory-visual';category.className='armory-category';category.textContent=entry.category;visual.append(image,category);title.className='armory-card-heading';price.className='armory-price';price.textContent='₡ '+entry.cost;title.append(name,price);state.className='armory-availability';detail.className='armory-consequence';card.prepend(visual,title,state);card.append(detail);return {card,entry,state,detail};
 });
 let economyKey='';
 return {update(room){
  const state=room?.state,player=state?.players[room.slot];if(!player)return;const isTactical=tactical(room),owned=player.owned.flatMap((yes,i)=>yes?[i]:[]),primary=owned.find(i=>i>0);
  const labels=isTactical?['PRIMARY','SIDEARM']:['ACTIVE WEAPON','INVENTORY'];
  const values=isTactical?[primary===undefined?'Empty slot':spec.weapons[primary].name,player.owned[0]?spec.weapons[0].name:'Empty slot']:[player.owned[player.weapon]?spec.weapons[player.weapon].name:'Empty hands',owned.length+' weapons carried'];
  slots.forEach((node,i)=>{setText(node.querySelector('small'),labels[i]);setText(node.querySelector('b'),values[i]);});
  if(!drop.hidden){drop.setAttribute('aria-label',player.owned[player.weapon]?'Drop current weapon: '+spec.weapons[player.weapon].name:'Empty hands');drop.title=drop.getAttribute('aria-label');setText(drop,player.owned[player.weapon]?'DROP CURRENT':'EMPTY HANDS');}
  squad.hidden=!isTactical;forecast.hidden=!isTactical;
  for(const {card,entry,state:badge,detail}of cards){const hint=purchaseHint(entry,player,state.phase,isTactical);card.dataset.availability=hint.state;setText(badge,hint.label);setText(detail,hint.detail);}
  if(isTactical){const model=teamForecastRows(state,room.slot,spec),key=JSON.stringify(model);if(key!==economyKey){economyKey=key;model.forEach((r,i)=>{const row=rows[i];setText(row.querySelector('b'),'PILOT '+(r.slot+1)+(r.slot===room.slot?' · YOU':''));setText(row.querySelector('div>small'),(r.primary<0?'No primary':spec.weapons[r.primary].name)+' · '+r.armor+' armor');setText(row.querySelector('strong'),'₡ '+r.credits);setText(row.querySelector('div:last-child small'),r.halfReset?'HALF RESET ₡ '+r.nextWin:'NEXT WIN ₡ '+r.nextWin+' / LOSS ₡ '+r.nextLoss);});}}
 }};
}
