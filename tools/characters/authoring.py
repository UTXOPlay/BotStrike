"""BotStrike role equipment and skeletal motion authoring.
Imported by rig-pack.py; see assets/characters/README.md for reproduction.
Blender Z-up/+Y forward -> glTF Y-up/-Z forward. Rigid armor weights preserve
hard surfaces; articulated knees, ankles, elbows and wrists remain independent.
"""
import bpy, math, os, sys, json, random, argparse
import numpy as np
from mathutils import Vector, Quaternion
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
NAMES=['VECTOR','PATCH','BASTION','SPECTRE','GLITCH','FORGE']
COLORS=[(0.08,.58,.68),(.67,.76,.70),(.68,.39,.055),(.28,.12,.48),(.63,.065,.30),(.77,.25,.045)]
LIGHTS=[(.06,.8,1),(.09,1,.47),(1,.47,.03),(.63,.17,1),(1,.05,.45),(1,.27,.025)]

def material(name,color,metal=.7,rough=.37,glow=0,texture=False):
 m=bpy.data.materials.new(name);m.use_nodes=True;n=m.node_tree.nodes.get('Principled BSDF');n.inputs['Base Color'].default_value=(*color,1);n.inputs['Metallic'].default_value=metal;n.inputs['Roughness'].default_value=rough
 if glow:n.inputs['Emission Color'].default_value=(*color,1);n.inputs['Emission Strength'].default_value=glow
 if texture:
  rng=np.random.default_rng(2050);s=512;yy,xx=np.mgrid[0:s,0:s];grain=np.clip(rng.normal(.86,.045,(s,s)),.6,1);pixels=np.zeros((s,s,4),dtype=np.float32);blotch=.80+.20*np.sin(xx*.031+np.sin(yy*.027)*2)*np.cos(yy*.039);pixels[:,:,:3]=np.array(color)[None,None,:]*(grain*blotch)[:,:,None];pixels[:,:,3]=1
  # Fine machining scratches, paint chips on panel edges, sparse exposed alloy.
  edge=np.minimum.reduce([xx,yy,s-1-xx,s-1-yy]);chips=(edge<rng.uniform(0,8,(s,s)))&(rng.random((s,s))>.46)
  pixels[chips,:3]=np.array([.33,.37,.40])*rng.uniform(.6,1.2,(chips.sum(),1))
  for _ in range(35):
   x,y=rng.integers(6,s-6,2);r=int(rng.integers(1,5));patch=(xx-x)**2+(yy-y)**2<r*r;pixels[patch,:3]*=.13
  # A diagonal industrial marking, small enough not to dominate close-ups.
  stripe=(xx>s*.77)&(xx<s*.84)&(yy>s*.73)&(yy<s*.93);pixels[stripe,:3]*=.20
  for _ in range(120):
   x,y=rng.integers(0,s,2);length=int(rng.integers(2,22));pixels[y:y+1,x:min(s,x+length),:3]*=.35
  image=bpy.data.images.new(name+'-wear',width=s,height=s,alpha=True);image.pixels.foreach_set(pixels.ravel());image.pack();t=m.node_tree.nodes.new('ShaderNodeTexImage');t.image=image;m.node_tree.links.new(t.outputs['Color'],n.inputs['Base Color'])
 return m

parts=[];rig=None

def finish(obj,bone,mat,bevel=0):
 bpy.context.view_layer.objects.active=obj;obj.select_set(True)
 if bevel:
  mod=obj.modifiers.new('Machined edge radius','BEVEL');mod.width=bevel;mod.segments=2;bpy.ops.object.modifier_apply(modifier=mod.name)
 # Smooth small cylinders, but keep faceted armor faces and geometric bevels.
 for face in obj.data.polygons:face.use_smooth=False
 obj.data.materials.append(mat)
 # Dominant-axis planar UV for each component makes edge wear follow panels.
 if not obj.data.uv_layers:obj.data.uv_layers.new(name='UVMap')
 uv=obj.data.uv_layers.active.data;coords=np.array([v.co[:] for v in obj.data.vertices]);lo=coords.min(0);extent=np.maximum(coords.max(0)-lo,.001)
 for poly in obj.data.polygons:
  axes=[i for i in range(3) if i!=int(np.argmax(np.abs(poly.normal[:])))];
  for li in poly.loop_indices:
   v=obj.data.vertices[obj.data.loops[li].vertex_index].co;uv[li].uv=tuple((v[a]-lo[a])/extent[a] for a in axes)
 group=obj.vertex_groups.new(name=bone);group.add(list(range(len(obj.data.vertices))),1,'REPLACE');obj.parent=rig;arm=obj.modifiers.new('Chassis skeleton','ARMATURE');arm.object=rig;parts.append(obj);obj.select_set(False);return obj

def box(name,pos,size,bone,mat,bevel=.012,rot=(0,0,0)):
 bpy.ops.mesh.primitive_cube_add(size=1,location=pos);o=bpy.context.object;o.name=name;o.scale=size;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.rotation_euler=rot;return finish(o,bone,mat,bevel)

def shell(name,pos,w,h,d,bone,mat,taper=.72,slant=.02):
 # Eight-sided shield section with a tapered waist and projecting central face.
 outline=[(-w*.34,-h/2),(w*.34,-h/2),(w/2,-h*.26),(w/2,h*.22),(w*.32,h/2),(-w*.32,h/2),(-w/2,h*.22),(-w/2,-h*.26)]
 verts=[]
 for layer in [0,1]:
  for x,z in outline:
   waist=taper+(1-taper)*(z/h+.5);verts.append((x*waist,(d/2 if layer else -d/2)+(slant*z/h if layer else 0),z))
 for x,z in outline:
  waist=taper+(1-taper)*(z/h+.5);verts.append((x*waist*.78,d/2+.018+slant*z/h,z*.80))
 faces=[tuple(reversed(range(8))),tuple(range(16,24))]+[(i,(i+1)%8,(i+1)%8+8,i+8) for i in range(8)]+[(i+8,(i+1)%8+8,(i+1)%8+16,i+16) for i in range(8)]
 mesh=bpy.data.meshes.new(name);mesh.from_pydata(verts,[],faces);mesh.update();o=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(o);o.location=pos;return finish(o,bone,mat,.008)

def cylinder(name,a,b,r,bone,mat,vertices=12,r2=None):
 v=Vector(b)-Vector(a);bpy.ops.mesh.primitive_cone_add(vertices=vertices,radius1=r,radius2=r if r2 is None else r2,depth=v.length,location=(Vector(a)+Vector(b))/2);o=bpy.context.object;o.name=name;o.rotation_mode='QUATERNION';o.rotation_quaternion=v.to_track_quat('Z','Y');return finish(o,bone,mat,.003 if r>.025 else 0)

def ball(name,pos,r,bone,mat):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=12,ring_count=8,radius=r,location=pos);o=bpy.context.object;o.name=name;return finish(o,bone,mat)

def hose(name,points,r,bone,mat):
 for i,(a,b) in enumerate(zip(points,points[1:])):cylinder(name+str(i),a,b,r,bone,mat,8)

def animate(rig,hero):
 fps=30;bpy.context.scene.render.fps=fps;rig.animation_data_create()
 armed={}
 # Solve each chassis's neutral grip from its actual rest bones. Elbows bend
 # outside the torso; wrist targets remain within the articulated reach.
 for side,sg in [('L',-1),('R',1)]:
  upper=rig.data.bones['upper_arm.'+side];fore=rig.data.bones['forearm.'+side];hand=rig.data.bones['hand.'+side]
  a=upper.head_local;b=fore.head_local;c=hand.head_local;u=(b-a).length;v=(c-b).length
  target=Vector((.04 if side=='L' else .12,.48 if side=='L' else .30,1.22));delta=target-a;length=min(delta.length,(u+v)*.96);direction=delta.normalized();target=a+direction*length
  along=(u*u-v*v+length*length)/(2*length);height=math.sqrt(max(0,u*u-along*along));bend=Vector((sg,0,-.4));bend=(bend-direction*bend.dot(direction)).normalized();elbow=a+direction*along+bend*height
  qu=(b-a).rotation_difference(elbow-a);qf=(c-b).rotation_difference(target-elbow);armed['upper_arm.'+side]=qu.to_euler('XYZ');armed['forearm.'+side]=(qu.inverted()@qf).to_euler('XYZ');armed['hand.'+side]=(qf.inverted()@Quaternion(Vector((1,0,0)),.45 if side=='L' else .15)).to_euler('XYZ')
 def pose(kind,t,duration):
  phase=t*math.tau;rots={};locs={};
  def r(b,x=0,y=0,z=0):rots[b]=(x,y,z)
  def l(b,x=0,y=0,z=0):locs[b]=(x,y,z)
  # Relaxed armed stance with asymmetric grip; subtle shoulder/spine weight shift.
  r('spine',.035,0,.018*math.sin(phase));r('chest',-.02,0,.012*math.sin(phase+1));l('hips',0,0,.006*math.sin(phase))
  for side,sign in [('L',-1),('R',1)]:r('upper_arm.'+side,.85,sign*.40,sign*.08);r('forearm.'+side,.66,0,-sign*.14);r('hand.'+side,0,sign*.05,0);r('thigh.'+side,.03,sign*.025,0);r('shin.'+side,-.06,0,0);r('foot.'+side,.03,0,0)
  if kind in ['walk','run','backpedal','strafe_left','strafe_right','crouch_walk']:
   stride=.60 if kind=='run' else .35 if kind!='crouch_walk' else .20;back=-1 if kind=='backpedal' else 1
   for i,(side,sign) in enumerate([('L',-1),('R',1)]):
    a=phase+i*math.pi;s=math.sin(a);r('thigh.'+side,back*stride*s,sign*.025,0);r('shin.'+side,-.10-max(0,-s)*stride*1.4,0,0);r('foot.'+side,.08+max(0,-s)*.20-max(0,s)*.15,0,0)
   l('hips',.012*math.sin(phase),0,.012+abs(math.cos(phase))*(.023 if kind=='run' else .012));r('spine',.11 if kind=='run' else .055,0,.04*math.sin(phase));r('chest',-.025,0,-.04*math.sin(phase+.4));r('head',-.035,0,.018*math.sin(phase+.8))
   if kind.startswith('strafe'):
    direction=1 if kind=='strafe_left' else -1;r('hips',0,0,direction*.12);r('chest',0,0,-direction*.08)
   if kind=='crouch_walk':l('hips',0,-.025,-.34);r('spine',.20,0,.02*math.sin(phase));
  if kind=='crouch' or kind=='crouch_walk':
   l('hips',0,-.08,-.62);r('spine',.24,0,0);r('chest',-.12,0,0)
   for side in ['L','R']:
    old=rots.get('thigh.'+side,(0,0,0));r('thigh.'+side,old[0]+1.55,0,0);r('shin.'+side,-2.40,0,0);r('foot.'+side,.85,0,0)
  # One-shot weights use eased anticipation, action, then recovery; no root travel
  # for jumping because native position owns the capsule.
  bump=math.sin(math.pi*min(1,t))
  if kind=='jump':
   for side in ['L','R']:r('thigh.'+side,.22+.55*bump,0,0);r('shin.'+side,-.4-.65*bump,0,0);r('foot.'+side,.2,0,0)
   r('spine',.1,0,0)
  if kind=='fall':
   r('thigh.L',.35,0,.08);r('thigh.R',-.12,0,-.08);r('shin.L',-.48,0,0);r('shin.R',-.32,0,0)
  if kind=='land':
   l('hips',0,-.03*bump,-.16*bump)
   for side in ['L','R']:r('thigh.'+side,.43*bump,0,0);r('shin.'+side,-.78*bump,0,0);r('foot.'+side,.35*bump,0,0)
   r('spine',.16*bump,0,0)
  if kind=='fire':r('chest',-.10*math.exp(-t*9),0,.025*math.exp(-t*10));r('forearm.R',.66+.10*math.exp(-t*12),0,-.14);r('head',.035*math.exp(-t*8),0,0)
  if kind=='reload':
   w=math.sin(math.pi*t);r('upper_arm.R',.70,.30,-.22*w);r('forearm.R',.7+.3*w,0,-.14-.5*w);r('upper_arm.L',.85-.65*w,-.40-.1*w,.08);r('forearm.L',.66+.55*math.sin(math.pi*t*2),0,.14);r('head',.18*w,0,-.18*w)
  if kind in ['utility','skill']:
   r('upper_arm.L',.85+1.6*bump,-.40,.08-.2*bump);r('forearm.L',.66-.55*bump,0,.14);r('chest',-.04,0,-.16*bump);r('head',0,0,-.10*bump)
  if kind=='equip':
   w=(1-t)**2;r('upper_arm.R',.85-.5*w,.40,.08);r('forearm.R',.66-.25*w,0,-.14);r('upper_arm.L',.85-.5*w,-.40,-.08)
  if kind=='use_item':
   w=math.sin(math.pi*t);r('upper_arm.L',.85+.25*w,-.40+.28*w,-.08);r('forearm.L',.66+.55*w,0,.14);r('head',.12*w,0,0)
  if kind=='interact':
   r('spine',.3,0,0);r('head',.25,0,0);r('upper_arm.L',.9+.08*math.sin(phase*2),-.35,0);r('forearm.L',1.0,0,0);r('hand.L',.1*math.sin(phase*3),0,.1)
  if kind=='hit':r('chest',-.18*bump,.10*bump,-.12*bump);r('head',.16*math.sin(math.pi*min(1,t*1.3)),0,.12*bump);r('spine',-.08*bump,0,0)
  if kind.startswith('death'):
   side=-1 if kind=='death_left' else 1;collapse=min(1,max(0,(t-.08)/.72));ease=collapse*collapse*(3-2*collapse);impact=math.sin(min(1,max(0,(t-.65)/.35))*math.pi)*.045
   l('hips',side*.07*ease,(-.14 if kind=='death_back' else .12)*ease,-.78*ease+impact);r('hips',(-1.37 if kind=='death_back' else -1.45)*ease,side*(.24 if kind=='death_back' else .48)*ease,side*(.12 if kind=='death_back' else .42)*ease)
   r('spine',.18*ease,0,side*.14*ease);r('chest',-.15*ease,0,-side*.20*ease);r('head',.25*ease,side*.12*ease,side*.23*ease)
   for s,sg in [('L',-1),('R',1)]:r('upper_arm.'+s,.85*(1-ease)+.2*ease,sg*(.4+.3*ease),sg*.3*ease);r('forearm.'+s,.66*(1-ease)+.25*ease,0,0);r('thigh.'+s,.45*ease,0,sg*.16*ease);r('shin.'+s,-.82*ease,0,0);r('foot.'+s,.32*ease,0,0)
  if kind=='respawn':
   e=(1-t)**2;l('hips',0,-.05*e,-.50*e);r('spine',.33*e,0,0);r('head',.30*e,0,0)
   for s in ['L','R']:r('thigh.'+s,1.0*e,0,0);r('shin.'+s,-1.50*e,0,0);r('foot.'+s,.5*e,0,0)
  if kind=='victory':r('upper_arm.L',2.45,-.2,0);r('forearm.L',.25+.1*math.sin(phase),0,0);r('head',-.1,0,-.12)
  if kind=='defeat':r('head',.35,0,.06);r('spine',.12,0,0);r('upper_arm.L',.3,-.15,0);r('forearm.L',.25,0,0)
  # Preserve authored action offsets around the solved weapon grip.
  neutral={'upper_arm.L':(.85,-.40,-.08),'upper_arm.R':(.85,.40,.08),'forearm.L':(.66,0,.14),'forearm.R':(.66,0,-.14),'hand.L':(0,-.05,0),'hand.R':(0,.05,0)}
  grip=1 if not kind.startswith('death') else 1-ease
  for bone,base in armed.items():rots[bone]=tuple(rots.get(bone,neutral[bone])[i]+(base[i]-neutral[bone][i])*grip for i in range(3))
  return rots,locs
 clips={'idle':3,'walk':1,'run':.66,'backpedal':1.1,'strafe_left':1,'strafe_right':1,'crouch':2,'crouch_walk':1.2,'jump':.5,'fall':1,'land':.4,'fire':.22,'reload':2.2,'equip':.4,'use_item':1.0,'utility':.8,'skill':1.1,'interact':2,'hit':.38,'death_back':1.4,'death_left':1.4,'death_right':1.4,'respawn':.9,'victory':2,'defeat':2}
 for kind,duration in clips.items():
  action=bpy.data.actions.new(NAMES[hero]+'|'+kind);rig.animation_data.action=action;frames=max(2,round(duration*fps))
  for frame in range(0,frames+1,2):
   t=frame/frames;rots,locs=pose(kind,t,duration)
   for bone in rig.pose.bones:
    bone.rotation_mode='XYZ';bone.rotation_euler=rots.get(bone.name,(0,0,0));bone.location=locs.get(bone.name,(0,0,0));bone.keyframe_insert('rotation_euler',frame=frame+1);bone.keyframe_insert('location',frame=frame+1)
  if kind not in ['jump','fall']:
   root=rig.pose.bones['root'];mesh=next((o for o in rig.children if o.type=='MESH'),None)
   if mesh:
    for frame in range(0,frames+1,2):
     bpy.context.scene.frame_set(frame+1);root.location.z=0;bpy.context.view_layer.update();evaluated=mesh.evaluated_get(bpy.context.evaluated_depsgraph_get());co=np.empty(len(evaluated.data.vertices)*3,dtype=np.float32);evaluated.data.vertices.foreach_get('co',co);lowest=float(co.reshape(-1,3)[:,2].min());root.location.z=-lowest+.003;root.keyframe_insert('location',frame=frame+1)
  action.use_fake_user=True
 for bone in rig.pose.bones:bone.rotation_euler=(0,0,0);bone.location=(0,0,0)
 rig.animation_data.action=None
