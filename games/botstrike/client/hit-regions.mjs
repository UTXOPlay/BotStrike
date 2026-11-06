import spec from '../../../botstrike/spec.json' with {type:'json'};
import {hitVolumes as volumes} from '../../../shared/hit-volumes.mjs';
export const hitVolumes=(position,stance,look=[0,0],profile=spec.hit_regions)=>volumes(position,stance,look,profile);
