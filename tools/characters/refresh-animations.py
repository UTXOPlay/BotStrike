"""Rebuild clips on the checked-in, licensed rig; no vendor re-download needed.

blender --background assets/characters/source/vector.blend \
  --python tools/characters/refresh-animations.py -- --hero 0
Then run externalize-textures.py. The mesh, weights and materials are preserved.
"""
import argparse,sys,importlib.util,json,hashlib
from pathlib import Path
import bpy

ROOT=Path(__file__).resolve().parents[2]
parser=argparse.ArgumentParser();parser.add_argument('--hero',type=int,required=True)
args=parser.parse_args(sys.argv[sys.argv.index('--')+1:]);hero=args.hero
spec=importlib.util.spec_from_file_location('chassis_authoring',Path(__file__).with_name('authoring.py'))
authoring=importlib.util.module_from_spec(spec);spec.loader.exec_module(authoring)
name=authoring.NAMES[hero].lower();rig=next(o for o in bpy.context.scene.objects if o.type=='ARMATURE')
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH' and any(m.type=='ARMATURE' and m.object==rig for m in o.modifiers)]
if len(meshes)!=1:raise RuntimeError('Expected one licensed skinned chassis')
mesh=meshes[0]
topology=(len(mesh.data.vertices),len(mesh.data.polygons),len(rig.data.bones))
rig.animation_data_clear()
for action in list(bpy.data.actions):bpy.data.actions.remove(action)
authoring.animate(rig,hero)
for b in rig.pose.bones:b.rotation_euler=(0,0,0);b.location=(0,0,0)
rig.animation_data.action=None;bpy.context.scene.frame_set(0)
if topology!=(len(mesh.data.vertices),len(mesh.data.polygons),len(rig.data.bones)):raise RuntimeError('Animation refresh changed rig topology')
bpy.ops.object.select_all(action='DESELECT');mesh.select_set(True);rig.select_set(True);bpy.context.view_layer.objects.active=rig
bpy.context.preferences.filepaths.save_version=0
blend=ROOT/'assets/characters/source'/(name+'.blend');out=ROOT/'games/botstrike/web/models'/(name+'.glb')
bpy.ops.wm.save_as_mainfile(filepath=str(blend))
bpy.ops.export_scene.gltf(filepath=str(out),export_format='GLB',use_selection=True,export_animations=True,export_animation_mode='ACTIONS',export_frame_step=2,export_image_format='WEBP',export_image_quality=90,export_skins=True,export_yup=True,export_extras=True,export_meshopt_compression_enable=True)
print('REFRESHED_ANIMATIONS '+json.dumps({'hero':name,'clips':len(bpy.data.actions),'topology':topology,'glbBytes':out.stat().st_size,'authoringSha256':hashlib.sha256(Path(authoring.__file__).read_bytes()).hexdigest()}),flush=True)
