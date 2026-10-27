export const defaults={keyboardLayout:'qwerty',aimAssist:0,sensitivity:1,ads:.65,fov:80,volume:.6,brightness:1,crosshair:1,crosshairColor:'#68e8ff',sound:true,motion:true,invertY:false,haptics:false,touch:false};
export const bindings={forward:'KeyW',back:'KeyS',left:'KeyA',right:'KeyD',fire:'Mouse0',scope:'Mouse2',reload:'KeyR',skill:'KeyQ',use:'KeyE',walk:'ShiftLeft',crouch:'KeyF',jump:'Space',armory:'KeyB',scoreboard:'Tab',previous:'BracketLeft',next:'BracketRight',flash:'KeyZ',smoke:'KeyX',grenade:'KeyC',utility:'KeyG',...Object.fromEntries(['Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal'].map((key,i)=>['weapon'+i,key]))};
export const actionNames={forward:'Move forward',back:'Move backward',left:'Move left',right:'Move right',fire:'Fire',scope:'Aim down sights',reload:'Reload',skill:'Hero skill',use:'Plant / defuse',walk:'Walk quietly',crouch:'Crouch',jump:'Jump',armory:'Armory',scoreboard:'Scoreboard',previous:'Previous weapon',next:'Next weapon',flash:'Flash',smoke:'Smoke',grenade:'Fragment',utility:'Selected equipment'};
// Character labels follow the selected OS layout; controls retain physical
// positions, so switching layouts never moves the movement cluster or custom keys.
const colemak=Object.fromEntries([..."QWERTYUIOPASDFGHJKL;ZXCVBNM"].map((key,i)=>[key===';'?'Semicolon':'Key'+key,[..."QWFPGJLUY;ARSTDHNEIOZXCVBKM"][i]]));
const punctuation={Semicolon:';',Quote:"'",Backquote:'`',Backslash:'\\',Comma:',',Period:'.',Slash:'/',IntlBackslash:'\\'};
export function keyName(code,layout='qwerty'){
 if(code.startsWith('Mouse'))return ['Mouse left','Mouse middle','Mouse right'][Number(code.slice(5))];
 if(layout==='colemak'&&colemak[code])return colemak[code];
 return punctuation[code]||code.replace(/^Key|^Digit/,'').replace('BracketLeft','[').replace('BracketRight',']').replace('Minus','−').replace('Equal','=');
}
export function validBinding(code){return /^(Key[A-Z]|Digit[0-9]|Arrow(Up|Down|Left|Right)|Shift(Left|Right)|Space|Tab|Bracket(Left|Right)|Minus|Equal|Semicolon|Quote|Backquote|Backslash|IntlBackslash|Comma|Period|Slash|Mouse[012])$/.test(code);}
export function loadPreferences(raw={},touch=false){
 raw=raw&&typeof raw==='object'?raw:{};
 const p={...defaults,touch,aimAssist:touch?1:0,bindings:{...bindings}};if(['qwerty','colemak'].includes(raw.keyboardLayout))p.keyboardLayout=raw.keyboardLayout;
 for(const k of ['sound','motion','invertY','haptics','touch'])if(typeof raw[k]==='boolean')p[k]=raw[k];
 for(const [k,min,max]of [['aimAssist',0,2],['sensitivity',.4,2.5],['ads',.2,1.5],['fov',65,95],['volume',0,1],['brightness',.7,1.5],['crosshair',.7,1.8]])if(Number.isFinite(raw[k]))p[k]=Math.max(min,Math.min(max,raw[k]));
 if(/^#[a-fA-F0-9]{6}$/.test(raw.crosshairColor))p.crosshairColor=raw.crosshairColor;
 const candidate=raw.bindings;if(candidate&&Object.keys(bindings).every(a=>validBinding(candidate[a]))&&new Set(Object.values(candidate)).size===Object.keys(bindings).length)p.bindings={...candidate};
 return p;
}
export function rebind(map,action,code){
 if(!(action in bindings)||!validBinding(code))throw Error('Use a letter, number, arrow, Shift, Space, Tab or mouse button. Ctrl, Alt, Meta and browser shortcuts are reserved.');
 const next={...map},other=Object.keys(next).find(a=>next[a]===code);if(other)next[other]=next[action];next[action]=code;return next;
}
export const scopeFov=weapon=>weapon?.id==='rail'?20:38;
export function aimScale(p,scoped,weapon){return p.sensitivity*.0025*(scoped?p.ads*Math.tan(scopeFov(weapon)*Math.PI/360)/Math.tan(p.fov*Math.PI/360):1);}
export function spreadDegrees(player,weapon){return weapon.spread*(player.crouch?.65:1)*(weapon.scoped&&!player.scoped?12:1)*(Math.hypot(player.velocity[0],player.velocity[2])>40?2.5:1)*((player.hero===5&&player.effect>0)||player.overclock>0?1.5:1)+(player.recoil||0);}
export class FeedbackCursor{
 constructor(){this.seen=new Set();}
 consume(events,tick){const fresh=[];for(const e of events||[]){if(this.seen.has(e.id))continue;this.seen.add(e.id);if(tick-e.tick<=128)fresh.push(e);}if(this.seen.size>1024)this.seen=new Set([...this.seen].slice(-512));return fresh;}
}
