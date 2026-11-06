const defaultSelector='button,a[href],input,select,textarea,summary';

// Layout boxes alone are insufficient: Chromium can retain boxes for content
// inside a closed <details>. Scope and native disabled/inert semantics apply to
// both keyboard dialog traversal and controller focus navigation.
export function isMenuControlVisible(element,root){
 if(!element||!root?.contains?.(element)||!element.isConnected||typeof element.getClientRects!=='function')return false;
 if(element.closest('[hidden],[inert],[aria-disabled="true"]')||element.matches(':disabled,[disabled]'))return false;
 const view=element.ownerDocument?.defaultView;
 if(!view||view.getComputedStyle(element).visibility!=='visible'||!element.getClientRects().length)return false;
 for(let ancestor=element.parentElement;ancestor;ancestor=ancestor.parentElement){
  if(ancestor.tagName!=='DETAILS'||ancestor.open)continue;
  const summary=[...ancestor.children].find(child=>child.tagName==='SUMMARY');
  // The first direct summary and its own interactive descendants stay visible
  // while closed. Content summaries nested below it do not gain an exception.
  if(!summary||!summary.contains(element))return false;
 }
 return true;
}

export function menuControls(root,selector=defaultSelector){
 return root?.querySelectorAll?[...root.querySelectorAll(selector)].filter(element=>isMenuControlVisible(element,root)):[];
}
