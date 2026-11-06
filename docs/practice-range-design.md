# Authoritative practice range implementation plan (#10)

Status: implemented local candidate (model `c388f9609a838…`), not deployed to production or human accepted. Evidence: `acceptance/practice-range/candidate.json`.
The gunplay/head-calibration checkpoint and its verifier bytes must remain
retained before changing the native configuration/input schema again.

Use a recorded `Config.practice: Option<PracticeConfig>` and a native
`mode: "practice"`; validate that they occur together. Normal public/private
matches cannot enable training through an input packet. A service-created solo
practice room owns slot 0, rejects joins and never commits career/rank/reward
results. Preserve the current bot-match option separately. Old signed production
profiles keep their exact existing verifiers.

Add one dedicated native practice map (combat queues still admit only the three
combat maps). The range should fit 100/600/1500/3000-root-unit target distances,
with no opaque debug collision overrides. `PracticeConfig` selects only bounded
drill/distance/target-chassis indices, never arbitrary positions or stats.

Native practice state should contain attempt number, seed, episode tick, drill,
selected distance/chassis, target motion toggle, native shot/hit/headshot/kill/
damage metrics and bounded shot/throw traces. Keep every trace/state vector
bounded. Target/reset decisions are native; the browser never submits a score,
hit, position, impact or successful drill claim. Expose own/training target
information only; public live matches never receive training traces.

Implement stationary/moving targets and recoil-wall, burst recovery,
stop-and-shoot and scope drills first. Then add curated pre-aim, retake and
clutch scenarios, using recorded native target movement/AI and collision.
Use the same twelve weapons/armor/effects as live rules. Explicit practice
supplies are native-only and do not remove reload timing or change live rules.

Record bounded input commands for reset, finish, next distance/chassis/drill,
target motion and exact rethrow. Validate room control and practice mode in the
service, gate them again natively, and retain short presses across ticks without
duplicating a held action. Packed tape encoding and input/schema binding must
change together. Resets retain the global replay tick but reset the episode seed
and trial state, increment life identity and clear held inputs/old effects and
traces. Match/room/map/visibility resets must not revive stale pose or feedback.

Refactor projectile advancement into a shared native function before exposing
trajectory preview. Preview/rethrow must use the same collision, gravity,
bounce, fuse and motion-inheritance function as the actual throw. Cache/restrict
preview updates, cap sample counts and identify its acknowledged native tick.
#15 can then extend this same contract to multiple throw strengths/modes without
a second browser-only physics formula. Preserve utility inventory consumption,
release/cancel/focus/rotation semantics and the existing world object budget.

The game-owned HUD should show a drill instruction, authoritative metrics,
reset/settings/rethrow/finish controls and an optional native recoil/throw trace.
Keep it inside the picture, accessible at all six sizes with landscape mobile
gating, the shared Store fullscreen entry policy and no outer toolbar/frame.
Retain keyboard/mouse, touch and gamepad controls. Explain that this is unranked
practice and that the server keeps running while menu/rotation blocks control.

A completed training attempt/session may export an explicitly labelled signed
host replay, with no career/reward effect. Require exact native replay, tamper
rejection, fixed-seed reset equivalence, source-derived metrics, public-room
rejection of training commands and all input/resize/fullscreen checks before
rollout. Human learning/feel/comprehension comparisons remain real gates; unit
fixtures cannot supply them.


## Candidate behavior and remaining gates

The candidate includes all eight drill types, all twelve live weapons, the four
native range distances, target chassis/armor/motion controls, fixed-seed reset,
128 native impacts, an 8 Hz/65-point native throw preview, exact last-release
rethrow and a bounded list of twelve native attempt reports. A 180-second
baseline/repeat protocol is visible in the drill menu; partial attempts are
labelled. The report preserves the settings used by that attempt before any
settings change. No browser score or arbitrary target/throw coordinates are
accepted. Retake success requires actual native defuse rather than kills alone.

50 native tests pass, including all 24 drill/map combinations, fixed seed/reset
identity, bounded original-setting reports, actual utility/preview point equality
and retake scoring. The service flow verifies signed practice and combat replays,
rejects result tampering, forbids joins/practice controls in normal rooms and
leaves career totals unchanged. Both complete flows also pass inside the
Bookworm image. All 6,048 portable damage-guide cases match the workstation.

Browser fixtures await resolved conditions explicitly. Six viewport checks,
mouse/touch and controller API start/reset/leave, portrait gating and fullscreen
exit preserving the instance pass. The mobile practice controls are checked not
to cover health/armor. Software rendering at desktop DPR 0.5/mobile DPR 1 is a
functional check; it does not establish laptop/mobile performance or real
controller usability. Real feel, learning/comprehension measurements and
approved flagship-map exercises remain open acceptance work.

All five retained production profiles now also pass saved-export routing in the
Bookworm candidate. Two saved tapes contain substantial takeover movement and
firing; their counts/hashes are recorded in `acceptance/practice-range/production-history.json`.
These are production provenance checks, not human-input attestations. Private
exports are kept outside the repository.
