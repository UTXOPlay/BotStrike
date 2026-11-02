# Hybrid character animation

This PR implements phases 0–3 of the [359-line proposal](hybrid-animation-proposal.md) as one change. See the [requirement ledger](hybrid-animation-requirements.md) for the remaining acceptance gates. Native simulation, input, camera look, hit volumes, firing/reload timing and the exact Myelin profile are unchanged. Myelin provides off-chain host replay verification.

## Runtime composition

`AnimationMotion` reads world velocity, acceleration, local direction, yaw/pitch rate, grounded/crouched state and life/map history. The continuous lower-body blend shares one normalized gait clock across forward, backward, lateral and crouched clips. A calibrated stride plan sets cadence from leg length, speed and stance duty; the spatial swing trajectory compensates root travel. Lateral stride is limited by actual foot spacing, and changes in stride approach their target over 60 ms. It does not filter movement or aiming.

`FootIK` calibrates the actual fully weighted mesh sole once per chassis. Each foot owns a world-space stance anchor, swing trajectory and analytic two-bone leg solver. The solver preserves bone translations and lengths, bounds knee bend to 0.08–2.7 radians, and uses a consistent forward knee pole. A visual pelvis adjustment is bounded to seven native units and uses the minimum drop required by actual support targets, with anticipation before the next plant and recovery toward the authored pose. Swing excursions are shortened at the reach limit instead of lifting the whole flat foot to compensate. Feasible contacts are measured independently using post-skinning sole vertices; tests require meaningful support coverage as well as error within two native units. Air, full-body actions, discontinuities, excessive turn and unreachable targets release anchors. A standing foot can replant after an 80 ms recovery; moving feet wait for their next swing boundary.

`AnimationSprings` adds critically damped acceleration/braking lean, turn lag, landing compression, recoil, readiness and first-person sway. `PoseInertia` retains bounded outgoing body pose and velocity through discrete action transitions. Six cosmetic profiles make the chassis recover at different rates. Neither mechanism changes rules, authoritative state or camera input. Reduced motion clears optional springs, inertia, turn warp and transition overlays while retaining aim, action cues and essential foot/grip constraints.

Every actor restores its unmodified mixer pose before the next update. Pelvis orientation is bounded and counter-rotated at the spine; the final head/chest offsets follow aim. Hand targets use constrained two-bone arm IK. A small shared translation fits the rigid weapon within both arms' reach without changing its aim or bone lengths. The support hand follows the front grip, pump or magazine, with intentional release during equipment and interaction. Reload animation follows the authoritative weapon duration; hit and landing cues preserve active reloads. Life-tagged feedback can arrive before a respawn sample without losing its first shot or replaying an old life's event.

The existing licensed Blender pipeline now authors 34 clips per chassis: the original 25 plus start, brake, left/right pivot, left/right reversal pivot, hard landing, crouch entry and weapon readiness. Runtime transition masks contain body tracks only and have neutral endpoints. Meshes, weights, materials and the 19-bone topology are preserved. Rest translation/scale tracks are omitted from runtime mixing; static render transforms are cached and only the skeleton and moving weapon parts are refreshed during animation.

## Reproduce and inspect

```sh
npm ci
npm run dev:motion
# http://127.0.0.1:4173/
```

The development lab is absent from `dist`. Its immutable baseline uses both runtime code and GLBs from main commit `0c2c5f91712e69661b4cd2cc9326f21b58375208`; it does not reuse the candidate's upper-body or grip implementation. Both modes receive identical fixtures and camera settings. Controls select all six chassis, all twelve weapons, ten-rig lineup or front/side/back/sole/first-person views, 30/60/120 fps and reduced motion. Contact diagnostics show actual anchors, sole samples, release states, local velocity/facing, blend weights, springs and pose inertia. Green marks anchors, white marks solved soles and orange joins the sole to its target. Baseline stance estimates are explicitly labelled.

For a physical Android Chrome review on the same network:

```sh
MOTION_LAB_LAN=1 PORT=4173 npm run dev:motion
```

The opt-in LAN mode prints a random URL prefix, serves an in-memory snapshot of the bundle/assets and accepts bounded same-origin measurement JSON into `/tmp/botstrike-device-measurements`. Default serving remains loopback only. Keep the phone in landscape. Fullscreen is requested by a button; unsupported browsers retain manual rotation and Home Screen guidance. Hidden/rotated pages abort measurements.

“Measure A/B” warms both modes and alternates baseline/candidate/candidate/baseline, with contact diagnostics disabled and ten visible rigs. Download the JSON afterward. It includes exact asset fingerprints, browser/GPU, viewport/backing size, per-frame animation CPU and RAF intervals. RAF runs at the display's rate with elapsed-time animation; the interactive FPS selector does not throttle this benchmark. CPU timing excludes fixture construction, validation and contact diagnostics. The headful driver also records aggregate host CPU load, load averages and thermal endpoints; contention is flagged for review and never overrides failed budgets. Frame CPU includes scene drawing but is not GPU completion time. Pointer dispatch-to-next-RAF observations are labelled separately; they are not end-to-end input latency.

```sh
node tools/benchmark-botstrike-hardware.mjs
# Real headful Chrome and hardware GPU required. BENCH_SECONDS/BENCH_ROUNDS extend duration.
ART_OUTPUT=/tmp/botstrike-motion MOTION_SCENARIO=circle node tools/capture-botstrike-motion.mjs
```

The capture command produces fixed-step A/B video. It measures visual continuity, not real-time performance. `PLAYWRIGHT_ENTRY` and `CHROMIUM_PATH` can select installed browser tooling.

## Verification

```sh
npm test
npm run test:host
npm run build
npm run test:motion-browser
node tests/botstrike-animation-composition.mjs
node tests/botstrike-gait-browser.mjs
node tests/botstrike-foot-gait-browser.mjs
node tests/botstrike-animation-stability.mjs
node tools/check-botstrike-walk.mjs
RELOAD_ONLY=1 node tests/botstrike-art.mjs
npm run test:botstrike-native
node tools/characters/audit-assets.mjs
```

The composition matrix covers all six chassis × twelve weapons × first/third person, including rapid yaw/pitch changes, moving reloads, hit/reload priority, firing, crouching and equipment. Lifecycle cases cover old-life events, respawn first fire, room/visibility/gap/correction/map resets, air release, pivot release, unreachable contacts and replanting. Solver properties cover transformed chains, unreachable/singular targets, fixed segment lengths, normalized finite quaternions, repeated pose restoration, spring rate independence and bounded inertia. Asset checks decode the real Meshopt data and compare all mesh indices and attributes, including skin joints/weights, against the frozen baseline, then verify all 34 clips, quaternion normalization, loop seams, neutral body transition endpoints and same-origin textures.

The final full-game browser check passed native joining and acknowledged movement/skill input, all six required sizes, the portrait gate and touch fire-plus-aim. A complete 20,477-tick native match passed signed export verification and tamper rejection with the unchanged release/profile pair. Shared Store fullscreen policy and opaque sandbox code are unchanged. Physical Android measurements and human evaluation of continuity, knee/weapon clipping and control feel remain explicit acceptance gates; see the acceptance report for the latest desktop budget result. The PR stays draft until the ledger is satisfied.


## Gait review and corrections

The first Android visual review failed: the user reported toe-out and an excessive backward foot lift, then confirmed toe-out remained after an initial correction. Those reviews remain failures in the acceptance record.

Inspection against the [official Three.js character blending example](https://threejs.org/examples/webgl_animation_skinning_blending.html) and [Epic stride/pelvis warping guidance](https://dev.epicgames.com/documentation/en-us/unreal-engine/pose-warping-in-unreal-engine) exposed three errors in our implementation:

- A wide bind pose supplied the walking foot lanes. Forward steps now follow the visible upper-thigh/hip width; lateral travel and crouching can widen the stance independently.
- Sole PCA was treated as the visible toe direction. Calibration now uses real toe and heel vertex landmarks, with independent post-skinning measurement. Foot yaw is corrected around world up, preserving a flat sole.
- A worst-case stride reach calculation lowered the pelvis throughout the cycle. The solver now adjusts only for actual support reach and recovers as that requirement falls. Ordinary walking has lower clearance than running, and an unreachable swing shortens horizontally.

The [front](assets/botstrike/walk-review/front-sheet.jpg), [side](assets/botstrike/walk-review/side-sheet.jpg) and [feet](assets/botstrike/walk-review/feet-sheet.jpg) sheets contain eight consecutive samples per chassis during steady walking. The eighteen walk/run/crouch checks measure actual toe/heel direction, sole clearance, foot-lane width and pelvis recovery. These checks caught the wide-stance and constant-crouch regressions; they do not establish overall artistic or control-feel acceptance. On 2026-11-02 the user reported that the listed toe-out, high rear-foot lift and knee-popping issues were no longer present; broader human review remains open. Reference assets were used only for analysis and are not redistributed.

See [production references and decisions](animation-production-cases.md) for the Gears of War 4, Fortnite, For Honor and VALORANT sources and the measured follow-up work.


## Follow-up: avoid repeated weapon traversal

IK now refreshes the weapon root and contact frames it needs; static weapon meshes receive their final matrices during drawing. The six-character/twelve-weapon/two-view matrix retains the same sampled poses and hand positions as `c978ba4` at 1,728 sampled times. The development-only structural probe counts 31% fewer matrix multiplications in actor updates over 120 frames with ten characters. Drawing is outside that count.

The paired short hardware run observed animation CPU p95 of 1.6 ms before and 1.2 ms after this revision. The 1 ms gate remains unmet in that run, and a prior candidate showed no stable improvement. Both raw reports and pose traces are retained in [the work-reduction record](acceptance/hybrid-animation/weapon-transform-work.json). This follow-up is not deployed; the production release record still describes `f952afd`.

For a character-only work comparison, set `MOTION_LAB_REFERENCE=c978ba4` when starting the lab or hardware driver. The server rejects additional changes to other client modules, models or dependency versions. It identifies that reference and its asset prefix in the manifest. In the lab console, `motionLab.matrixWork({mode:'baseline',scenario:'circle'})` and the corresponding `candidate` call count structural work; they are not timing measurements. `POSE_REFERENCE` on the composition test compares against an exported pose trace with a `1e-8` bound.

## Follow-up: consistent walk/run decisions

Body blending, foot support/clearance and weapon readiness now share a visual run amount based on velocity relative to the current hero/weapon speed range. First person uses the continuous lower-body blend and the same stride planner as third person, while excluding invisible leg tracks. Changing gait preserves phase. See the [walk/run comparison and decisions](walk-run-transitions.md), [fixed-step review clips](assets/botstrike/walk-run/README.md) and [test evidence](acceptance/hybrid-animation/walk-run-transitions.json).

The new checks cover 144 character/weapon/view combinations through walk/run/scope/crouch/stop, 96 directional foot cases at native walk/run speeds, 36 ten-rig fixtures and 18 jitter/reduced fixtures. All 144 combinations retain identical first/third-person phase; the directional cases retain feasible planned contacts and low walking clearance. The actual game also passed acknowledged native movement/skill, touch fire+aim and six-size checks. An earlier concurrent software-browser attempt failed after the test player died during resize; both logs are retained.

The current short physical-GPU run was contended: animation CPU p95 was 1.2 ms baseline and 2.1 ms candidate, exceeding the 1 ms gate. The 35.8/25.0 ms RAF observations do not replace the earlier 20.3 ms frame limit or establish an FPS improvement. The candidate remains undeployed and the PR remains draft. The previous character-only reference mode correctly rejects this broader follow-up because several client modules changed; the lab's normal original-main baseline remains usable. The earlier zero-pose-delta claim belongs only to the transform-work optimization, not to these intentional gait changes.
