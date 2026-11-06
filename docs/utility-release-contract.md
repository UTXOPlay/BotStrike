# Utility release and sight contract (#15, #23, foundation for #16)

Status: unreleased `botstrike-2050-tactical-v3` candidate. No human usability,
120 FPS physical rendering or flagship-map acceptance is claimed.
Evidence: `acceptance/utility-release/candidate.json`.

## Authoritative release

| Persistent mode | Forward speed | Upward bias |
| --- | ---: | ---: |
| Standard | 600 | 160 |
| Short | 280 | 100 |
| Lob | 820 | 200 |

Values use native distance/time units. The release uses the current native eye
height (56 − 19 × stance), punched/clamped view direction, and the full current
native player velocity, including running, dash and jump/fall velocity. The
browser cannot submit a launch position, velocity, impact or score. Self-use
equipment ignores the mode. The selector is persistent in the game-owned armory;
choose it first, then press equipment once. No left/right mouse chord is needed.

A release occurs on a new equipment press, subject to native inventory, alive
state, cooldown and the 40-object world budget. Holding a button or changing
mode while it is held does not repeat consumption. A press rejected by native
cooldown is not a queued future release. Menu/focus/rotation/control changes clear
held actions. Already released objects continue on the server after disconnect.

Standard releases retain a 128-tick fuse for flash/smoke/frag/EMP; scanner and
repair-field releases use 64 ticks. The first flight step happens on the release
tick. Practice rethrow copies the previous native origin/velocity/fuse and takes
that same first step; it requires a live, uncompleted trial. It does not use the
new camera pose or pretend to be a new competitive score.

## Collision and preview

Physics runs at 64 Hz with gravity 500, a radius-8 axis-aligned swept envelope,
wall/ceiling restitution 0.5, floor restitution 0.4 and floor friction 0.85.
The swept envelope is a conservative AABB expansion, not an exact rounded-sphere
corner solver. Floor contact settles vertical speeds below 20 and horizontal
speeds below 5. Native map boxes include elevated undersides in the sweep;
world boundaries and the floor are explicit. Each step resolves at most four
contacts. Remaining motion at that budget is discarded at the last safe contact,
not advanced through an unchecked wall. Initial-overlap handling is bounded.
Projectiles do not bounce off player bodies or other projectiles; fuse effects
are separate native rules.

Practice previews use this same native integrator, with at most 65 points and
updates every eight native ticks. The recorded preview release/mode/tick identify
the confirmed pose; moving or aiming afterward can change the actual release.
Persistent selected equipment is recorded independently of its press, so scanner
and repair-field previews use their shorter fuse before throwing. Self-use
selection clears the trajectory. The browser only displays native points.

Gun and cosmetic tracer rays now stop on the native y=0 ground plane as well as
cover. This changes floor impacts and ground-targeted splash behavior, so it is
part of the new profile. Earlier signed games keep their exact prior binaries.

Smoke perception now uses the same 3D segment/sphere geometry in native AI,
service disclosure, IFF and aim assistance. A tangent is open; positive-life,
deployed smoke blocks. Its radius remains 175. Rendering uses both sphere faces
and keeps its opacity until expiry rather than becoming visually clear while
the rule still blocks. Service visibility samples the authored rotated head box
and body capsule; camera, service, IFF, assistance and pickup eyes use continuous
stance. Team/reveal/flash disclosure policy is distinct from geometric overlap.

## Replay, examples and limits

The compact input word carries bounded mode/preview selection; practice commands
remain independently gated to the owner's solo room. Normal and legacy compact
forms have explicit decoders. Native input limits, service tape limits and the
application profile changed together: tape cap 190 MB, profile input cap 196 MB,
worker/export cap 400 MB. A conservative full-duration/full-seat packet budget
fits those bounds. That is not a worst-case memory/capacity load-test result.

The release image retains the five exact production verifier pairs plus the two
portable gunplay/training preview pairs, checked against their recorded hashes.
Old saves route to the matching verifier; the new profile rejects old rules.
Myelin proves off-chain host replay, not CKB settlement or human input.

`acceptance/utility-release/lineups.json` records three **provisional reference
throws**, one per mode, from the Neon Docks spawn facing A. To reproduce them:

1. Choose Neon Docks and start the solo Pre-aim Route drill.
2. Select smoke and a mode in the armory, then reset the attempt.
3. Resume without changing aim or moving; release the selected equipment once.
4. Review the native trace or repeat with Rethrow Last.

The record includes the quantized release yaw, exact native pose/velocity,
landing, fuse and profile. These are collision/reproducibility references, not
optimized tactical placements or approved flagship-map lineups. Map playtests and
paired entry/retake exercises still need to determine useful placements.

56 native tests and 154 current-source JS tests pass; the latter include six
disclosure fixtures, four input-boundary cases and three frame-scheduler cases. Native fixtures cover thin walls, ceilings,
corners, bounds, rest and held-mode changes. The 810 release cases cover three
modes × five motion states × six throwable types × three pitches × three maps.
The sight/eye comparison covers 2,004 fixtures. Nine observed service releases
match 792 local and 866 Bookworm trajectory snapshots, including mid-flight
reconnection. Complete practice/combat signed replays and result-tamper rejection
pass in both builds. All 6,048 damage rows agree across those builds.

The service cadence test follows the browser's 60 Hz transport cap: requests at
30/60/120 use effective packet rates 30/60/60. It does not establish physical
120 FPS rendering. Browser checks cover all six viewports, keyboard/touch mode
selection and controller-API selection of every mode followed by one-button
release without duplication. Held keyboard autorepeat, controller confirmation/held-button and stick-neutral
boundaries are covered by unit/browser checks. Real hardware and the complete
rotation/focus cancellation stress set remain acceptance work.

The client now offers 30/60/120 FPS limits, defaulting to 60. A live getter changes
only draw scheduling; simulation remains 64 Hz and transport remains capped at
60 Hz. Controlled 240 Hz RAF fixtures verify all draw schedules and hidden-tab
suspension. Adaptive resolution respects sub-unit DPR caps and does not mistake
a selected 30 FPS limit for overload. The actual headless browser measured
29/30/30, 61/60/59 and 61/61/60 FPS respectively at 844×390, DPR 0.25 with software
WebGL. **The 120 FPS assertion failed and remains an unmet gate.** No physical
high-refresh display or full-resolution performance acceptance is claimed.

## Disclosure boundary (#16 foundation)

Own and squad objects retain precise team-radio state. Enemy objects require a
living, unflashed authorized viewer; disclosure tests center, nearest surface and
26 sphere directions (radius 8 in flight, 175/450/220 for deployed smoke/scan/repair).
Inside a deployed volume is visible. Smoke tests ignore the candidate volume
itself but respect other smoke and solid cover. Visible enemy objects contain
only kind/position/fuse/life, never owner or inherited velocity. The 28-ray method
is bounded sampling, not exact continuous occlusion; thin multi-wall apertures
remain a reference-camera acceptance concern. Private native/replay state is
unchanged.

Unplanted carrier identity/position, dropped relay position and actor/progress
require team/visibility entitlement. Planted location/site/fuse remain public;
a plant/defuse announcement omits an unseen enemy actor. Snapshot and motion
feedback share the authored hit profile. A dead seat follows a living teammate,
refuses enemy viewpoints and receives no enemy view/audio once the squad is dead.
Existing team/reveal radio entitlement remains explicit: reveal can disclose a
player through walls/smoke or during flash; it does not authorize aim assistance
or IFF through cover. Full flash/scan/EMP/repair interaction and impact-origin
audio work remains #16/#24 scope. Do not close #15/#16/#23 from these fixtures.
