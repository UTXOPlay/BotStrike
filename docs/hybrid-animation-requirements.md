# Hybrid animation completion ledger

Scope: the complete [user proposal](hybrid-animation-proposal.md), phases 0–3,
in PR #2. The original recommendation to split the work is superseded by the
user's instruction to complete it as one large PR. No native rules change.

An implementation, an automated check, a rendered comparison and a human/device
acceptance are different evidence. A row remains open until its own gate passes.

The [strict-audit follow-up](animation-audit-follow-up.md) qualifies the earlier
passes: F01 now has a verified automated correction, while corpse reconstruction,
cover interaction, jump reconstruction, walking support coverage and current
hardware/human acceptance remain open. Audit IDs and this ledger's IDs differ.

| ID | Requirement | Authoritative evidence required | Current status |
| --- | --- | --- | --- |
| A01 | Native position, velocity, collision, inputs, shot direction/timing, hit registration and exact replay profile unchanged | Source diff; native/browser trajectories; complete signed replay and tamper rejection | Pass: unchanged native/spec/input/profile source; 20,477-tick signed native match and tamper rejection; final browser acknowledged-input check |
| A02 | Full viewport, six sizes, inverse input mapping, mobile landscape/fullscreen policy | Actual game browser/input tests, not only the lab | Pass: final actual-game six-size/input/touch/portrait checks; shared Store fullscreen policy and opaque sandbox unchanged |
| M01 | Continuous forward/back/diagonal/lateral/crouch weights and synchronized gait phase | Property checks and all-six-chassis sequence captures | Implemented; 48 ten-rig fixtures including native-speed walk/run transitions; shared first/third-person phase across 144 hero/weapon/view cases; artistic acceptance under H03 |
| M02 | Bounded spatial stride and orientation warping | Measured sole trajectories, leg reach and twist bounds | Implemented; calibrated cadence, bounded direction/pelvis warp and constrained reach; actual sole/lane tests |
| M03 | Acceleration, braking, turning and landing weight transfer without delayed controls | Motion fixtures and pose/velocity traces; unchanged inputs/camera | Implemented; start/brake/pivot/landing overlays and bounded springs; audit F01 correction passes 360 interruption cases plus composition/lifecycle regressions; human control-feel review open |
| F01 | Calibrated stance/swing and flat-ground sole targets | Actual mesh sole samples and contact-state traces | Pass numerically: six mesh calibrations, eighteen original walk/run/crouch cases and 96 native-speed directional gait cases; source/stride review images retained |
| F02 | Constrained two-bone leg IK, no overextension or unstable knee flips | Solver property checks plus actual six rigs | Pass: 1,000 transformed solver targets plus all six real rigs, fixed lengths and finite normalized transforms |
| F03 | World-space support-foot locking, feasible contact error <= 2 native units | Independent post-skinning sole error and anchor drift, meaningful contact coverage | Scheduled-contact error passes; meaningful quiet-walk support coverage remains open under audit F05. Feasible/scheduled percentages alone do not measure missing support intervals |
| F04 | Release on air, death, respawn, map/room, visibility, gap, correction, abrupt pivot and unreachable target | Explicit lifecycle/reach cases; no stale anchors on re-entry | Release/reset safety passes, including twelve rerun view/chassis cases; same-life corpse/jump pose identity remains open under audit F02/F04. The earlier 1,200-cycle evidence checks finite/stale state rather than reconstruction identity |
| S01 | Critically damped additive inertia and outgoing-pose transition recovery | 30/60/120 and jitter traces, bounded offsets, settling and repeated resets | Pass numerically: exact-spring 30/60/120 checks, twenty-four jitter/reduced fixtures, bounded outgoing-pose inertia and repeated resets |
| S02 | Distinct visual profiles for all six chassis | Profile definitions and identical-input comparison | Implemented: six frozen visual profiles; same-input all-six walking and transition sheets; human acceptance open |
| C01 | Continuous chest/head aim with upper/lower composition | Aim and root invariants at extreme pitch/yaw and locomotion | Pass numerically: composed extreme yaw/pitch and unchanged root/player state; see composition traces |
| C02 | Stable hand/weapon contacts through fire, reload, sprint, crouch and equipment | Post-pose contact distances for all six chassis and all twelve weapons in both views | Pass: 144 cases, six chassis × twelve weapons × two views, including moving/airborne reload and fire; independent post-pose grip markers |
| C03 | Separate first-person sway, immediate fire, damped recovery and sprint-to-aim | First-person motion captures; authoritative aim/camera invariant | Implemented: separate viewmodel response, fresh-life/same-frame equip-fire impulses and recovery; paired first-person captures; human feel open |
| C04 | Preserve combat priorities, hit response, reload/interaction and death/reboot | Existing tests plus combined motion/event sequences | Pass numerically: combined hit/fire/reload, interaction, equipment, death/reboot and life-tagged feedback checks |
| P01 | Necessary start/stop, pivot, hard-land, crouch and weapon-ready clips | Reproducible Blender sources, manifest, source/runtime playback and visual review | Implemented: 37 clips × six editable rigs; nine added transitions and three crouched-death variants, 162 source-pose renders and deterministic GLB re-export |
| P02 | Review foot contact, joint constraints, grip, loops, licensing and reproducibility | Asset checks, captures, unchanged licensed provenance and deterministic exporter | Pass structural checks: real Meshopt decode, unchanged topology/weights/textures, loops, endpoints and licensed provenance; human clipping review remains open |
| D01 | Development-only velocity/facing/weights/real foot contact debug view | Interactive lab with contact anchors, sole samples, reach/release reasons and spring state | Implemented: real world anchors/post-skinning soles/release states plus weights, facing, velocity, springs and inertia; lab excluded from dist |
| D02 | Identical inputs/camera before-after evidence and visible-defect record | Immutable main 0c2c5f9 runtime/assets and paired clips | Pass reproducibility: frozen main 0c2c5f9 code + six GLBs, SHA-256 manifests and paired identical-input/camera clips; failed user reviews recorded |
| T01 | All eight required gameplay-like sequences across all six chassis and ten visible rigs | Full fixture matrix at 30/60/120 and jitter, plus real native-state playback | Pass automated fixtures: eight required sequences plus walk/run and three posture sequences × 30/60/120 + jitter/reduced = 48, ten rigs spanning six chassis; actual native-state browser test |
| T02 | No accumulated offsets, NaNs, unreachable locked feet or excessive joint twists | Long runs, repeated life/map/room/visibility resets and finite/bounds checks | Pass: 144 composition cases, 28,800 lifecycle frames / 1,200 cycles, finite/bend/wrist/repeatable-pose checks |
| T03 | Reduced motion preserves essential pose/contact and disables optional motion | Full matrix with reduced motion; visual and numeric evidence | Pass numerical matrix: all twelve scenarios with jitter + reduced motion; optional offsets cleared, essential aim/contact retained; human review open |
| H01 | Ten-rig baseline on representative physical desktop and mobile hardware | Exported device/GPU/CPU, frame pacing, animation CPU, input/interaction timing and thermal-duration evidence | Open: archived physical Intel desktop runs cover earlier builds; the current correction needs matched sustained measurements, and Android Chrome device/model/thermal evidence remains missing |
| H02 | Explicit animation CPU budget and no material frame/input regression | Budgets derived from those device baselines and matched A/B runs | Open: desktop/mobile animation CPU p95 budgets remain 1/2 ms. The archived posture short run measured 1.1 ms CPU p95 (fails 1 ms) and 21.5 ms RAF p95 (passes its matched 22.66 ms short-run gate). The older long-run frame gate was a separate 20.3 ms reference. Current source needs sustained matched desktop/mobile measurement; software-rendered fixture timings do not close this gate |
| H03 | Human quality/playtest acceptance | Recorded review of knee/weapon clipping, continuity and perceived control responsiveness | Partial human acceptance: after two failed reviews, the user reports the listed toe-out, high rear-foot lift and knee-popping issues are no longer present; broader clipping/control-feel review remains open |

Completion requires evidence for every row, with open external acceptance kept
visible rather than inferred from software-rendered test passes.

The walk/run follow-up was included in runtime `989a634` and has its own [comparison](walk-run-transitions.md) and [evidence record](acceptance/hybrid-animation/walk-run-transitions.json). Earlier human gait acceptance is scoped to the previously reviewed build; the new transitions still need human playtesting.

The [posture follow-up](posture-transitions.md) adds 48 collapse/interruption cases, six airborne deaths and 96 crouch/jump configurations, including actual-ground landing, shared first/third-person crouch timing, dead-map/visibility resets and fresh-life fire. New human review remains open.
