# BotStrike character assets

The six playable chassis adapt the Humanoid Robot Pack by Sotudios under CC BY 4.0. See `vendor.json` for the download URL, SHA-256 and exact character mapping, and `licenses/` for the supplied license and provenance. Attribution also appears in the game menu.

The source meshes retain their normal, metallic, roughness and worn paint maps. BotStrike adds role colors and equipment, a measured 19-bone skeleton, connectivity-based arm weights, solved weapon grips, and 37 authored animation clips. The additions cover nine start/brake/pivot/landing/crouch/weapon-ready transitions and three crouched-death variants. The `.blend` sources are editable; the GLBs are the actual runtime assets, using Meshopt geometry and external 1024px WebP textures. Same-origin texture URLs satisfy the store gateway CSP without requiring blob URLs. The native hit volumes and gameplay rules are independent of render meshes.

## Reproduction

Use Blender 5.2.2 LTS and Python with Pillow and NumPy. Download the archive in `vendor.json`, verify its SHA-256, and extract it outside the repository. Then run:

```sh
python3 tools/characters/prepare-textures.py /path/to/humanoid-robot-pack-v1.0.0
for hero in 0 1 2 3 4 5; do
  blender --background --python tools/characters/rig-pack.py -- --source /path/to/humanoid-robot-pack-v1.0.0 --hero "$hero"
done
python3 tools/characters/externalize-textures.py
npm run build
```

`tools/characters/authoring.py` contains the equipment geometry and pose curves. `games/botstrike/client/characters.mjs` blends locomotion and upper-body action tracks, plays full-body death/reboot clips, and extracts the same skinned arms for first-person rendering. Bone weights are shared, not duplicated procedural imitations. The renderer shares geometry and textures between independently cloned skeletons.

To regenerate animation on the checked-in rigs without rebuilding or downloading the licensed meshes:

```sh
for hero in 0 1 2 3 4 5; do
  name=$(printf '%s\n' vector patch bastion spectre glitch forge | sed -n "$((hero+1))p")
  blender --background "assets/characters/source/$name.blend" --python tools/characters/refresh-animations.py -- --hero "$hero"
done
python3 tools/characters/externalize-textures.py
node tools/characters/audit-assets.mjs
npm run build
```

The audit decodes the runtime Meshopt buffers, checks 19-bone topology and unchanged vertex/index counts against the frozen baseline, and verifies finite/unit transforms, gait loops and neutral body transition endpoints. Refreshing and re-exporting all six checked-in rigs with Blender 5.2.2 LTS produced identical externalized GLB bytes. `.blend` serialization itself is not claimed to be byte-identical.

`baseline/` contains the six original 25-clip GLBs from main commit `0c2c5f91712e69661b4cd2cc9326f21b58375208`, solely for the development A/B lab. These retain the same license and attribution and are not deployed. Runtime code for that baseline is frozen separately in `tools/motion-baseline/characters.mjs`.

Use `tests/botstrike-art.mjs` to render the real armed models and environment. Use `tools/characters/check-preview.mjs` for individual clip inspection; set `HERO`, `ART_OUTPUT`, `PLAYWRIGHT_ENTRY` and `CHROMIUM_PATH` as needed. These harnesses are development-only and are not included in the deployment.
