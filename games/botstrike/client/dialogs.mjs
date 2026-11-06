import {isMenuControlVisible,menuControls} from './menu-focus.mjs';
export function installDialogs(ids){
 let previous=null,current=null;
 const update=()=>{const next=ids.map(id=>document.getElementById(id)).find(el=>!el.hidden);
  for(const id of ['panel','hud','touch'])document.getElementById(id).inert=!!next;
  if(next&&next!==current){previous=document.activeElement;current=next;menuControls(next)[0]?.focus({preventScroll:true});}
  else if(!next&&current){current=null;if(isMenuControlVisible(previous,document))previous.focus({preventScroll:true});previous=null;}
 };
 const observer=new MutationObserver(update);for(const id of ids){const el=document.getElementById(id);el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');observer.observe(el,{attributes:true,attributeFilter:['hidden']});}
 const key=event=>{if(!current)return;if(event.code==='Escape'){event.preventDefault();event.stopImmediatePropagation();current.querySelector('.close')?.click();return;}if(event.code!=='Tab')return;event.preventDefault();event.stopImmediatePropagation();const nodes=menuControls(current);if(!nodes.length)return;const index=nodes.indexOf(document.activeElement);nodes[(index+(event.shiftKey?-1:1)+nodes.length)%nodes.length].focus();};
 addEventListener('keydown',key,true);return()=>{observer.disconnect();removeEventListener('keydown',key,true);};
}
