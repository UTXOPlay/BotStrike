"""Rig licensed Sotudios meshes, retain real PBR maps and attach BotStrike clips.
Source URL/license/checksum are recorded in assets/characters/vendor.json.
"""
import sys,os,json,math,hashlib,bpy,importlib.util,argparse
import numpy as np
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('chassis_tools',Path(__file__).with_name('authoring.py'));helpers=importlib.util.module_from_spec(spec);spec.loader.exec_module(helpers)
parser=argparse.ArgumentParser();parser.add_argument('--source',required=True);parser.add_argument('--hero',type=int,default=2);parser.add_argument('--static',action='store_true');args=parser.parse_args(sys.argv[sys.argv.index('--')+1:]);hero=args.hero
source_names=['aero','cap','titan','vision','crimson','maul'];source=Path(args.source)/'characters'/source_names[hero];name=helpers.NAMES[hero]
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.fbx(filepath=str(source/(source_names[hero]+'.fbx')))
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH'];bpy.ops.object.select_all(action='DESELECT')
for o in meshes:o.select_set(True)
bpy.context.view_layer.objects.active=meshes[0];bpy.ops.object.join();obj=bpy.context.object;obj.name=name+'_Armor';bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
coords=np.array([v.co[:] for v in obj.data.vertices]);lo=coords.min(0);hi=coords.max(0);scale=1.94/(hi[2]-lo[2]);
for v in obj.data.vertices:v.co=(v.co-Vector(((hi[0]+lo[0])/2,(hi[1]+lo[1])/2,lo[2])))*scale
# Source models face -Y; turn into Blender +Y / glTF -Z.
obj.rotation_euler.z=math.pi;bpy.ops.object.transform_apply(location=False,rotation=True,scale=False)
material=bpy.data.materials.new(name+' PBR');material.use_nodes=True;n=material.node_tree.nodes;links=material.node_tree.links;bsdf=n.get('Principled BSDF')
for channel,slot in [('basecolor','Base Color'),('roughness','Roughness'),('metallic','Metallic'),('normal','Normal')]:
 image=bpy.data.images.load(str(source/'textures-1024'/(source_names[hero]+'_'+channel+'.png')))
 if channel!='basecolor':image.colorspace_settings.name='Non-Color'
 image.pack();tex=n.new('ShaderNodeTexImage');tex.image=image
 if channel=='normal':normal=n.new('ShaderNodeNormalMap');normal.inputs['Strength'].default_value=.75;links.new(tex.outputs['Color'],normal.inputs['Color']);links.new(normal.outputs['Normal'],bsdf.inputs[slot])
 else:links.new(tex.outputs['Color'],bsdf.inputs[slot])
obj.data.materials.clear();obj.data.materials.append(material)
obj.data.validate(clean_customdata=False);obj.data.update()
for face in obj.data.polygons:face.use_smooth=True
# Game silhouette LOD; retains source UVs and normals while bounding triangles.
mod=obj.modifiers.new('Gameplay geometry budget','DECIMATE');mod.ratio=.55;mod.use_collapse_triangulate=True;bpy.ops.object.modifier_apply(modifier=mod.name);obj.data.validate(clean_customdata=False);obj.data.update()
# Separate the free-hanging arms by mesh connectivity below the rib cage.
# Coordinate-only thresholds incorrectly bind wide thigh armor to a hand.
adj=[[] for v in obj.data.vertices]
for edge in obj.data.edges:
 a,b=edge.vertices
 if obj.data.vertices[a].co.z<1.25 and obj.data.vertices[b].co.z<1.25:adj[a].append(b);adj[b].append(a)
seen=set();arm_vertices=set();arm_components=[]
for v in obj.data.vertices:
 if v.index in seen or v.co.z>=1.25:continue
 comp=[];stack=[v.index];seen.add(v.index)
 while stack:
  i=stack.pop();comp.append(i)
  for j in adj[i]:
   if j not in seen:seen.add(j);stack.append(j)
 co=np.array([obj.data.vertices[i].co[:] for i in comp]);center=co.mean(0)
 if abs(center[0])>.30 and co[:,2].min()>.40:
  arm_vertices.update(comp)
  if len(comp)>80 and co[:,2].max()>1.20:arm_components.append(co)
# Coordinates measured on normalized source meshes; bones keep common +Y axes
# so authored clip rotations operate consistently across chassis proportions.
if len(arm_components)<2:raise RuntimeError('Arm segmentation needs manual review for '+name)
arm_cloud=np.concatenate(arm_components);wrist_z=float(arm_cloud[:,2].min())+.18;elbow_z=(1.48+wrist_z)*.5
wrist=float(np.median(np.abs(arm_cloud[arm_cloud[:,2]<wrist_z+.05,0])));elbow=float(np.median(np.abs(arm_cloud[np.abs(arm_cloud[:,2]-elbow_z)<.08,0])));shoulder=float(np.median(np.abs(arm_cloud[arm_cloud[:,2]>1.20,0])))*.84
print('MEASURED_JOINTS',name,shoulder,elbow,wrist,elbow_z,wrist_z,flush=True)
bones={'root':((0,0,0),None),'hips':((0,0,.92),'root'),'spine':((0,0,1.10),'hips'),'chest':((0,0,1.43),'spine'),'neck':((0,0,1.66),'chest'),'head':((0,0,1.76),'neck')}
segments={}
for side,sg in [('L',-1),('R',1)]:
 bones.update({f'upper_arm.{side}':((sg*shoulder,0,1.48),'chest'),f'forearm.{side}':((sg*elbow,0,elbow_z),f'upper_arm.{side}'),f'hand.{side}':((sg*wrist,.01,wrist_z),f'forearm.{side}'),f'thigh.{side}':((sg*.14,0,.91),'hips'),f'shin.{side}':((sg*.17,0,.52),f'thigh.{side}'),f'foot.{side}':((sg*.19,0,.14),f'shin.{side}')})
 segments.update({f'upper_arm.{side}':(bones[f'upper_arm.{side}'][0],bones[f'forearm.{side}'][0]),f'forearm.{side}':(bones[f'forearm.{side}'][0],bones[f'hand.{side}'][0]),f'hand.{side}':(bones[f'hand.{side}'][0],(sg*(wrist+.015),.02,wrist_z-.18)),f'thigh.{side}':(bones[f'thigh.{side}'][0],bones[f'shin.{side}'][0]),f'shin.{side}':(bones[f'shin.{side}'][0],bones[f'foot.{side}'][0]),f'foot.{side}':(bones[f'foot.{side}'][0],(sg*.19,.20,.06))})
bones['weapon']=((wrist,.06,wrist_z),'hand.R')
data=bpy.data.armatures.new(name+'_Skeleton');rig=bpy.data.objects.new(name+'_Rig',data);bpy.context.collection.objects.link(rig);bpy.context.view_layer.objects.active=rig;rig.select_set(True);obj.select_set(False);bpy.ops.object.mode_set(mode='EDIT')
for bone_name,(pos,parent) in bones.items():
 bone=data.edit_bones.new(bone_name);bone.head=pos;bone.tail=Vector(pos)+Vector((0,.12,0))
 if parent:bone.parent=data.edit_bones[parent]
bpy.ops.object.mode_set(mode='OBJECT')
# Curl the originally open fingers around the combat grip. This changes only
# hand geometry, preserving the wrist pivots and the source texture coordinates.
for v in obj.data.vertices:
 if v.index in arm_vertices and v.co.z<wrist_z-.07:
  knuckle=wrist_z-.07;distance=knuckle-v.co.z;angle=min(2.05,distance/.12*2.05);v.co.y+=.058*(1-math.cos(angle));v.co.z=knuckle-.058*math.sin(angle)
obj.data.update()
# Region-constrained skinning prevents an adjacent arm influencing rib plates.
# Most hard plates carry a single weight; narrow joint bands blend two bones.
for bone_name in bones:obj.vertex_groups.new(name=bone_name)
def assign(v,weights):
 for bone,weight in weights:
  if weight>0:obj.vertex_groups[bone].add([v.index],weight,'REPLACE')
def blend_at(v,threshold,lower,upper,width=.035):
 w=max(0,min(1,(v.co.z-threshold)/(width*2)+.5));assign(v,[(lower,1-w),(upper,w)])
for v in obj.data.vertices:
 x,y,z=v.co;side='R' if x>0 else 'L';ax=abs(x)
 arm_boundary=shoulder*.88
 if (v.index in arm_vertices) or (z>=1.25 and z<1.64 and ax>arm_boundary):
  if z>elbow_z+.05:assign(v,[(f'upper_arm.{side}',1)])
  elif z>elbow_z-.05:blend_at(v,elbow_z,f'forearm.{side}',f'upper_arm.{side}',.05)
  elif z>wrist_z+.05:assign(v,[(f'forearm.{side}',1)])
  elif z>wrist_z-.05:blend_at(v,wrist_z,f'hand.{side}',f'forearm.{side}',.05)
  else:assign(v,[(f'hand.{side}',1)])
 elif z<.90:
  if z<.10:assign(v,[(f'foot.{side}',1)])
  elif z<.18:blend_at(v,.14,f'foot.{side}',f'shin.{side}',.04)
  elif z<.48:assign(v,[(f'shin.{side}',1)])
  elif z<.56:blend_at(v,.52,f'shin.{side}',f'thigh.{side}',.04)
  else:assign(v,[(f'thigh.{side}',1)])
 elif z<1.06:assign(v,[('hips',1)])
 elif z<1.14:blend_at(v,1.10,'hips','spine',.04)
 elif z<1.27:assign(v,[('spine',1)])
 elif z<1.35:blend_at(v,1.31,'spine','chest',.04)
 elif z<1.64:assign(v,[('chest',1)])
 elif z<1.70:blend_at(v,1.67,'neck','head',.03)
 else:assign(v,[('head',1)])
obj.parent=rig;mod=obj.modifiers.new('Chassis skin','ARMATURE');mod.object=rig
# Role silhouettes and equipment follow the established BotStrike key art.
helpers.rig=rig;helpers.parts=[]
alloy=helpers.material('Role equipment titanium',(.12,.16,.20),.78,.4)
ceramic=helpers.material('Role equipment ceramic',(.72,.81,.79),.4,.4)
paint=helpers.material('Role equipment paint',helpers.COLORS[hero],.65,.42)
glow=helpers.material('Role optics',helpers.LIGHTS[hero],.25,.3,1.1)
if hero==0:
 for sg in [-1,1]:
  helpers.shell('Vector swept stabilizer',(sg*.34,-.15,1.62),.08,.27,.04,'chest',alloy,.3)
  helpers.box('Vector stabilizer light',(sg*.34,-.12,1.65),(.014,.008,.16),'chest',glow,.003)
elif hero==1:
 helpers.shell('Patch white breastplate',(0,.14,1.40),.26,.19,.025,'chest',ceramic,.85)
 helpers.box('Medic vertical',(0,.176,1.40),(.035,.008,.12),'chest',glow,.003)
 helpers.box('Medic horizontal',(0,.177,1.40),(.10,.008,.035),'chest',glow,.003)
 for sg in [-1,1]:
  helpers.cylinder('Medical backpack', (sg*.15,-.21,1.10),(sg*.15,-.21,1.58),.07,'chest',alloy,16)
  helpers.cylinder('Medical reservoir',(sg*.15,-.21,1.24),(sg*.15,-.21,1.42),.073,'chest',glow,16)
elif hero==2:
 for sg in [-1,1]:
  helpers.hose('Bastion shoulder conduit',[(sg*.13,-.13,1.56),(sg*.20,-.16,1.67),(sg*.33,-.10,1.63)],.018,'chest',alloy)
elif hero==3:
 helpers.cylinder('Spectre optic housing',(-.045,.12,1.79),(-.045,.18,1.79),.052,'head',alloy,20)
 helpers.cylinder('Spectre optic lens',(-.045,.18,1.79),(-.045,.184,1.79),.037,'head',glow,20)
 helpers.cylinder('Recon mast',(-.23,-.15,1.40),(-.23,-.15,1.94),.014,'chest',alloy)
 helpers.box('Recon receiver',(-.23,-.15,1.80),(.055,.05,.17),'chest',paint,.008)
elif hero==4:
 for sg in [-1,1]:
  helpers.cylinder('Glitch antenna',(sg*.12,0,1.83),(sg*.17,0,2.12),.012,'head',alloy)
  helpers.cylinder('Glitch antenna tip',(sg*.16,0,2.04),(sg*.17,0,2.12),.014,'head',glow)
elif hero==5:
 for sg in [-1,1]:
  helpers.cylinder('Forge reactor canister',(sg*.16,-.23,1.02),(sg*.16,-.23,1.62),.085,'chest',alloy,16)
  for z in [1.07,1.23,1.39,1.57]:helpers.cylinder('Forge reactor collar',(sg*.16,-.23,z-.016),(sg*.16,-.23,z+.016),.096,'chest',glow if z==1.39 else paint,16)
  helpers.hose('Forge fuel line',[(sg*.16,-.23,1.02),(sg*.25,-.15,.96),(sg*.23,-.08,1.14)],.018,'chest',alloy)
bpy.ops.object.select_all(action='DESELECT');obj.select_set(True)
for part in helpers.parts:part.select_set(True)
bpy.context.view_layer.objects.active=obj;bpy.ops.object.join();obj.data.validate(clean_customdata=False);obj.data.update()
rig['asset_credit']='Humanoid Robot Pack by Sotudios · CC BY 4.0; BotStrike rig, animation and role equipment by Arthur Zhang'
rig['asset_source']='https://sotudios.com/Assets/Humanoid-RobotPack/'
if not args.static:helpers.animate(rig,hero)
for bone in rig.pose.bones:bone.rotation_euler=(0,0,0);bone.location=(0,0,0)
if rig.animation_data:rig.animation_data.action=None
bpy.context.scene.frame_set(0);bpy.ops.object.select_all(action='DESELECT');obj.select_set(True);rig.select_set(True);bpy.context.view_layer.objects.active=rig
out=ROOT/'games/botstrike/web/models';out.mkdir(exist_ok=True,parents=True)
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'assets/characters/source'/(name.lower()+'.blend')))
bpy.ops.export_scene.gltf(filepath=str(out/(name.lower()+'.glb')),export_format='GLB',use_selection=True,export_animations=not args.static,export_animation_mode='ACTIONS',export_frame_step=2,export_image_format='WEBP',export_image_quality=90,export_skins=True,export_yup=True,export_extras=True,export_meshopt_compression_enable=True)
print('RIGGED_ASSET '+json.dumps({'name':name,'source':source_names[hero],'vertices':len(obj.data.vertices),'triangles':sum(len(p.vertices)-2 for p in obj.data.polygons),'bones':len(bones),'bytes':(out/(name.lower()+'.glb')).stat().st_size}),flush=True)
