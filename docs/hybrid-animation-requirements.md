# Hybrid animation completion ledger

Scope: the complete [user proposal](hybrid-animation-proposal.md), phases 0–3,
in PR #2. The original recommendation to split the work is superseded by the
user's instruction to complete it as one large PR. No native rules change.

An implementation, an automated check, a rendered comparison and a human/device
acceptance are different evidence. A row remains open until its own gate passes.

The [strict-audit follow-up](animation-audit-follow-up.md) qualifies the earlier
passes: F01–F05 now have verified automated corrections. The maintainer accepted the current deployed animation on November 6; see the
[version-bound human record](acceptance/hybrid-animation/human-acceptance.json). Dedicated performance optimization/physical profiling are deferred
under the [maintainer-approved advisory policy](acceptance/hybrid-animation/performance-policy.json). Audit IDs and this ledger's IDs differ.

| ID | Requirement | Authoritative evidence required | Current status |
| --- | --- | --- | --- |
| A01 | Native position, velocity, collision, inputs, shot direction/timing, hit registration and exact replay profile unchanged | Source diff; native/browser trajectories; complete signed replay and tamper rejection | Pass: unchanged native/spec/input/profile source and production bytes; latest staged image completes a 22,930-tick signed native match, rejects tampering and verifies four historical profiles. Public browser acknowledgement and controlled CSS-delta/native mapping are recorded in audit-deployment.json |
| A02 | Full viewport, six sizes, inverse input mapping, mobile landscape/fullscreen policy | Actual game browser/input tests, not only the lab | Pass: final actual-game six-size/input/touch/portrait checks; shared Store fullscreen policy and opaque sandbox unchanged |
| M01 | Continuous forward/back/diagonal/lateral/crouch weights and synchronized gait phase | Property checks and all-six-chassis sequence captures | Implemented; 48 ten-rig fixtures including native-speed walk/run transitions; shared first/third-person phase across 144 hero/weapon/view cases; artistic acceptance under H03 |
| M02 | Bounded spatial stride and orientation warping | Measured sole trajectories, leg reach and twist bounds | Implemented; calibrated cadence, bounded direction/pelvis warp and constrained reach; actual sole/lane tests |
| M03 | Acceleration, braking, turning and landing weight transfer without delayed controls | Motion fixtures and pose/velocity traces; unchanged inputs/camera | Implemented; start/brake/pivot/landing overlays and bounded springs; audit F01 correction passes 360 interruption cases plus composition/lifecycle regressions; human control-feel accepted for current runtime under H03 |
| F01 | Calibrated stance/swing and flat-ground sole targets | Actual mesh sole samples and contact-state traces | Pass numerically: six mesh calibrations, eighteen original walk/run/crouch cases and 96 native-speed directional gait cases; source/stride review images retained |
| F02 | Constrained two-bone leg IK, no overextension or unstable knee flips | Solver property checks plus actual six rigs | Pass: 1,000 transformed solver targets plus all six real rigs, fixed lengths and finite normalized transforms |
| F03 | World-space support-foot locking, feasible contact error <= 2 native units | Independent post-skinning sole error and anchor drift, meaningful contact coverage | Pass numerically under audit F05: 420 fixtures include 372 walking-family cases with no unsupported steady samples, independent skinned error/drift, sampled sole-lane clearance and 72 style-change probes. Scheduled feasibility, actual support, double support, stance duration and unlocked near-floor movement are reported separately; human gait accepted for current runtime under H03 |
| F04 | Release on air, death, respawn, map/room, visibility, gap, correction, abrupt pivot and unreachable target | Explicit lifecycle/reach cases; no stale anchors on re-entry | Release/reset safety passes. Audit F02 covers 168 corpse cases and 1,200 returns; audit F04 adds 2,880 same-time airborne invalidations, 576 longer gaps, 144 first observations and 72 lifecycle cases using real native snapshots. Full body/hand pose, blend and current clip clocks are checked; unseen input histories remain qualified |
| S01 | Critically damped additive inertia and outgoing-pose transition recovery | 30/60/120 and jitter traces, bounded offsets, settling and repeated resets | Pass numerically: exact-spring 30/60/120 checks, twenty-four jitter/reduced fixtures, bounded outgoing-pose inertia and repeated resets |
| S02 | Distinct visual profiles for all six chassis | Profile definitions and identical-input comparison | Implemented: six frozen visual profiles; same-input all-six walking and transition sheets; human acceptance recorded under H03 |
| C01 | Continuous chest/head aim with upper/lower composition | Aim and root invariants at extreme pitch/yaw and locomotion | Pass numerically: composed extreme yaw/pitch and unchanged root/player state; see composition traces |
| C02 | Stable hand/weapon contacts through fire, reload, sprint, crouch and equipment | Post-pose contact distances for all six chassis and all twelve weapons in both views | Pass: 144 cases, six chassis × twelve weapons × two views, including moving/airborne reload and fire; independent post-pose grip markers |
| C03 | Separate first-person sway, immediate fire, damped recovery and sprint-to-aim | First-person motion captures; authoritative aim/camera invariant | Implemented: separate viewmodel response, fresh-life/same-frame equip-fire impulses and recovery; paired first-person captures; human feel accepted under H03 |
| C04 | Preserve combat priorities, hit response, reload/interaction and death/reboot | Existing tests plus combined motion/event sequences | Pass numerically: combined hit/fire/reload, interaction, equipment, death/reboot and life-tagged feedback checks |
| P01 | Necessary start/stop, pivot, hard-land, crouch and weapon-ready clips | Reproducible Blender sources, manifest, source/runtime playback and visual review | Implemented: 37 clips × six editable rigs; nine added transitions and three crouched-death variants, 162 source-pose renders and deterministic GLB re-export |
| P02 | Review foot contact, joint constraints, grip, loops, licensing and reproducibility | Asset checks, captures, unchanged licensed provenance and deterministic exporter | Pass structural checks: real Meshopt decode, unchanged topology/weights/textures, loops, endpoints and licensed provenance; human clipping accepted under H03 |
| D01 | Development-only velocity/facing/weights/real foot contact debug view | Interactive lab with contact anchors, sole samples, reach/release reasons and spring state | Implemented: real world anchors/post-skinning soles/release states plus weights, facing, velocity, springs and inertia; lab excluded from dist |
| D02 | Identical inputs/camera before-after evidence and visible-defect record | Immutable main 0c2c5f9 runtime/assets and paired clips | Pass reproducibility: frozen main 0c2c5f9 code + six GLBs, SHA-256 manifests and paired identical-input/camera clips; failed user reviews recorded |
| T01 | All eight required gameplay-like sequences across all six chassis and ten visible rigs | Full fixture matrix at 30/60/120 and jitter, plus real native-state playback | Pass automated fixtures: eight required sequences plus walk/run and three posture sequences × 30/60/120 + jitter/reduced = 48, ten rigs spanning six chassis; actual native-state browser test |
| T02 | No accumulated offsets, NaNs, unreachable locked feet or excessive joint twists | Long runs, repeated life/map/room/visibility resets and finite/bounds checks | Pass: 144 composition cases, 28,800 lifecycle frames / 1,200 cycles, finite/bend/wrist/repeatable-pose checks |
| T03 | Reduced motion preserves essential pose/contact and disables optional motion | Full matrix with reduced motion; visual and numeric evidence | Pass numerical matrix: all twelve scenarios with jitter + reduced motion; optional offsets cleared, essential aim/contact retained; human acceptance recorded under H03 |
| H01 | Ten-rig baseline on representative physical desktop and mobile hardware | Exported device/GPU/CPU, frame pacing, animation CPU, input/interaction timing and thermal-duration evidence | Deferred by maintainer: dedicated quiet-host desktop and named-Android thermal measurements belong to the later performance pass. Current timing is diagnostic on the shared laptop with Cargo builds; functional mobile checks and human quality review remain separate |
| H02 | Explicit animation CPU budget and no material frame/input regression | Budgets derived from those device baselines and matched A/B runs | Advisory for this PR: legacy desktop/mobile 1/2 ms CPU and matched frame references are diagnostic, not merge blockers. Dedicated optimization is deferred. Historical target results remain unchanged; an advisory result is not a performance pass. Reproducible game-induced freezes/crashes and unbounded work still require correction |
| H03 | Human quality/playtest acceptance | Recorded review of knee/weapon clipping, continuity and perceived control responsiveness | Accepted by maintainer on 2026-11-06 for deployed browser `646ec4c`: “已看过，当前动画可接受”, in response to the explicit stop/turn/crouch/jump/death/reload/contact review request. See the version-bound record; future changes are not pre-approved |

Current animation acceptance requires evidence for the non-deferred rows.
H01/H02 are recorded for the later performance pass under the advisory policy;
they do not block this PR. Human acceptance is recorded separately from software-rendered test passes.

The walk/run follow-up was included in runtime `989a634` and has its own [comparison](walk-run-transitions.md) and [evidence record](acceptance/hybrid-animation/walk-run-transitions.json). Earlier human gait acceptance is scoped to the previously reviewed build; these transitions are included in the November 6 acceptance.

The [posture follow-up](posture-transitions.md) adds 48 collapse/interruption cases, six airborne deaths and 96 crouch/jump configurations, including actual-ground landing, shared first/third-person crouch timing, dead-map/visibility resets and fresh-life fire. The November 6 human acceptance includes these changes.

Audit F03 adds clearance against the three current maps' native collision boxes.
Its separate evidence covers 9,180 standing settled poses and 288 targeted falls,
including crouched variants, corners, narrow corridors and a synthetic drop
above cover. Skin-weight hulls constrain the cosmetic model; native state stays
unchanged. This does not add articulated ragdoll dynamics or establish human
acceptance. See the [F03 explanation and paired clips](animation-audit-follow-up.md#f03-give-an-authored-fall-room-to-fit).

The [November 5 release record](acceptance/hybrid-animation/audit-deployment.json)
binds the F01–F05 browser rollout to its staging/native/historical checks, public
asset hashes and Store input/fullscreen/resize checks. The deployed browser
source is `646ec4c`; subsequent documentation/test-only commits do not change
that runtime. Human acceptance was recorded on November 6; dedicated performance
work remains deferred under the existing advisory policy.
