// Capture the mixer result once, then restore before the next mixer evaluation.
// Every procedural layer shares this baseline, including arms, legs and inertia.
export class BonePose{
 constructor(bones){this.bones=[...new Set(Object.values(bones))];this.values=new Float64Array(this.bones.length*7);this.ready=false;}
 capture(){let i=0;for(const b of this.bones){b.quaternion.normalize();this.values[i++]=b.position.x;this.values[i++]=b.position.y;this.values[i++]=b.position.z;this.values[i++]=b.quaternion.x;this.values[i++]=b.quaternion.y;this.values[i++]=b.quaternion.z;this.values[i++]=b.quaternion.w;}this.ready=true;}
 restore(){if(!this.ready)return;let i=0;for(const b of this.bones){b.position.set(this.values[i++],this.values[i++],this.values[i++]);b.quaternion.set(this.values[i++],this.values[i++],this.values[i++],this.values[i++]);}this.ready=false;}
}
