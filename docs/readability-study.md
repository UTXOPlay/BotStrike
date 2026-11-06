# Recognition and cover validation (#23)

Status: development task and sampled geometry audit. Human participants: **0**.
No recognition, physical-device or competitive-readability acceptance is claimed.
The fixed gunplay/practice preview remains separate from this development task.

Run `npm run dev:recognition` and open the printed loopback URL. The tool serves
only an allowlist of bundled code, six chassis, textures, spec and offline engine
state templates. It has no production room, career, input or write endpoint.
Responses remain in the browser until explicitly downloaded as JSON. Use an
anonymous session code; publish aggregate results rather than identifying data.

## Task and measurements

Each session has 72 deterministically shuffled trials (seed 2050), covering each
chassis × ally/enemy × combat-map combination twice. Distance (300/600/1200),
brightness, nominal render scale, motion, smoke condition, FOV and visual filter
vary across that fractional schedule. This covers the stated factors; it is not
a full factorial experiment or a causal estimate of every interaction.

The scene uses the candidate character/environment renderer and an engine-created
state template. Camera/actor locations are repositioned offline along native-box
clear lanes. Moving actors use the existing fixed-step motion predictor. This is
an unsigned visual experiment, not a replay oracle or a live disclosure test.
The manifest records the exact engine, bundle/spec/template/model/texture hashes.

After four warm-up frames, the participant has three seconds to answer ally,
enemy or cannot identify. Keyboard A/E/N, touch and controller D-pad responses
are supported without chords. The same glyph shapes are shown before the task;
answers do not reveal correctness during it. Fully hidden negative controls
deliberately omit the actor; they must not be confused with testing actual ally
disclosure through live smoke. Edge smoke uses the candidate rendering/policy.

Raw rows include the complete condition, response/input, time, declared cohort,
CSS viewport, actual backing resolution, reduced-motion suppression and frame
measurements. Timeout responses remain in the accuracy denominator. Resizing,
rotation, focus loss, context loss, manual pause and render gaps over 250 ms
invalidate the active trial and pause the task. Invalid counts remain visible;
they are excluded from accuracy and reaction-time summaries. Correct-only median
and p95 reaction times are explicitly labelled and reported beside sample counts
and timeouts. Empty groups have null accuracy rather than an invented zero/pass.

Collect separate mouse, touchpad, touch and controller cohorts at the six required
viewports, recording actual hardware and the task manifest. Compare a fixed
baseline and candidate, counterbalance their order, and report participant counts
as well as trial counts. Do not interpret repeated answers from one participant
as independent people. Review low-accuracy conditions before changing materials,
glyphs or effects; retain raw/invalid trials and the exact source/artifact pair.

The visual filters use linear-RGB Machado matrices at severity 1.0, plus normal
and grayscale conditions. The tritan transform is a tritanomaly approximation.
The implementation is traceable to the [Colour matrix dataset](https://github.com/colour-science/colour/blob/develop/colour/blindness/datasets/machado2010.py)
and its [model documentation](https://colour.readthedocs.io/en/master/_modules/colour/blindness/machado2009.html).
These simulations do not replace testing with affected players.

## Surface and cosmetic contract

| Surface | Gameplay meaning | Presentation constraint |
| --- | --- | --- |
| Ground | Native movement floor y=0 | Flat; painted seams/zones add no steps or obstacles. |
| Native obstacle AABB | Solid movement/shot cover | The opaque core agrees with its box; small cladding must not imply a traversable opening. |
| Playfield perimeter | Native movement boundary | Exterior docks/skyline are inaccessible scenery, with the boundary visibly closed. |
| Armor-piercing weapon | Reduced armor absorption | No supported gun penetrates solid cover; avoid a wall-penetration visual promise. |
| Decorative equipment/chassis parts | Visual identity | Keep the native hit-region core and readable glyph clear; do not change apparent target size, visibility or team meaning for cosmetics. |
| Smoke/flash/reveal | Timed information effects | Rendering, disclosure, assistance and AI need the same declared geometry/expiry policy. |

The current IFF uses shield/chevrons versus split brackets/diamond, alongside
color. It rejects hidden/dead/self actors and requires a clear body sight line
rather than merely an overhead badge clearing cover. Spectator/disclosure and
smoke/flash restrictions must remain intact. Color-only recoloring is not enough
to establish recognition; the real task results are still required.

## Evidence and unresolved consistency

`acceptance/readability/cover-audit.json` compares 24 walkable origins per combat
map, standing/jump eye elevations, four headings and horizontal/downward rays.
All 1,152 sampled mesh comparisons agree with native obstacle boxes plus the
movement floor plane within 3 native units. Exterior scenery is excluded. This
does not prove every edge, angle, decorative gap or movement sweep. It also does
not add a ground-plane bullet impact to the native firing implementation.

The audit selects the scenery by its floor envelope, not the earlier relay prop;
a synthetic regression fixture guards that distinction. The three schedule/
summary/lane tests and automated keyboard/touch/controller, rotation, pause and
export checks pass. Automated answer files are explicitly non-human evidence.
Desktop/mobile GPU budgets and human recognition remain unverified here.

The consistency review identified work for the next bound rules slice:

- The V3 candidate unifies smoke on the 3D native/service/browser segment-sphere
  contract (2,004 cross-language fixtures), continuous stance eyes and authored
  head/body disclosure samples. Native gun/tracer rays now stop on y=0. Those are
  versioned gameplay changes; the earlier cover audit remains a sampled baseline.
- Enemy utility snapshots now omit hidden projectiles and strip thrower identity
  and velocity from visible objects. Deployed volumes use 28 bounded sample rays,
  including their near surface and edges. This fixes the tested center-occluded
  smoke reference; it is not an exact proof for every tiny multi-wall aperture.
- Snapshot and event-motion authorization use the same hit profile. Hidden
  objective actors/progress and unplanted carrier/drop coordinates are redacted.
  Dead seats without a living squad viewpoint receive no enemy view or audio.
- These changes have automated fixtures, not current human recognition results.
  Refresh the offline task's frozen renderer manifest before collecting a new
  cohort; do not relabel prior V2 task exports as V3 measurements.

Do not close #23 until the remaining policy, human recognition and actual-device
gates have their own version-bound evidence.

## V4 critical sightline follow-up

The flagship investigation adds 7,392 native reference rays from twelve named
anchors and four observer/target stance pairs. It found 30 grazing-distance
mismatches missed by the earlier cardinal sample. Side ribs/panels protruded
slightly beyond native boxes; decorative planter cavities also lacked an opaque
full-box core. Cover decorations are now confined to their native solid and use
cached coplanar depth-biased materials, including separate mobile decal batches.
Desktop and touch each report zero critical-ray mismatches within the declared
three-unit tolerance, plus zero mismatches in the earlier 1,152-ray sample.
See `flagship-map-study.md` and `acceptance/flagship-map/` for before/after records.
This strengthens sampled geometry evidence; human recognition and pixel-level
visibility acceptance remain open. The live offline recognition server must use
its new frozen manifest when collecting a new cohort; do not relabel old exports.
