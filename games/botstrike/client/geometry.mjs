import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
export function mergeParts(parts){
 const expanded=parts.map(geometry=>geometry.index?geometry.toNonIndexed():geometry);
 const result=mergeGeometries(expanded,false);
 expanded.forEach((geometry,index)=>{if(geometry!==parts[index])geometry.dispose()});
 if(!result)throw new Error('Incompatible BotStrike mesh attributes');
 return result;
}
