export const isTactical=room=>room?.config?.ruleset==='tactical';
export function tacticalOptions(b){
 if(b.ruleset!==undefined&&!['casual','tactical'].includes(b.ruleset))throw Error('Choose a valid ruleset');
 if(b.ruleset==='tactical'&&(b.kind!=='private'||b.mode!=='demolition'||b.drill!==undefined))throw Error('Tactical Playtest requires private demolition');
}
export function lobbyHeroes(config,members,slot,hero){
 const heroes=[...config.heroes],start=Math.floor(slot/5)*5;heroes[slot]=hero;
 const humans=[];
 for(let i=start;i<start+5;i++)if(i===slot||!members[i].startsWith('bot-'))humans.push(i);
 const used=new Set();for(const i of humans){if(used.has(heroes[i]))throw Error('This chassis is already selected by your squad');used.add(heroes[i]);}
 for(let i=start;i<start+5;i++)if(!humans.includes(i)){const h=Array.from({length:6},(_,n)=>n).find(n=>!used.has(n));heroes[i]=h;used.add(h);}
 return heroes;
}
export function requireTacticalStart(room,connected){
 if(!isTactical(room))return;
 if(room.kind!=='private'||room.config.mode!=='demolition'||room.members.length!==10||room.members.some(id=>id.startsWith('bot-')||!connected(id)||!room.ready?.[id]))throw Error('Tactical Playtest needs ten connected pilots, all READY');
}
export function bindPurchase(input,purchase,life,tactical){
 if(!tactical){input.buy=purchase;return input;}
 if(purchase.life!==life)return input;
 // A fresh HTTP buy must never bless stale held actions from a previous life.
 if(input.action_life!==life){for(const key of ['fire','reload','jump','ability','interact','scope','drop'])input[key]=false;delete input.weapon;input.item=0;}
 input.buy=purchase.item;input.action_life=life;input.takeover=true;
 return input;
}
