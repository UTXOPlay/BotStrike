# Tactical-core candidate contract

This is an **unreleased implementation candidate**, based on animation PR #2
(merged as `0d8b151`). Production still runs the animation accepted by the
maintainer, browser source `646ec4c`, with `botstrike-2050-salvage-v1` rules.
The November 6 animation acceptance does not approve the new gunplay parameters.
The [completion ledger](tactical-core-completion.md) retains every requested
issue, including its human/device gates.

## Gun recoil (#6)

`botstrike/spec.json` contains explicit profiles for all twelve weapons. Pattern
entries are **per-round yaw/pitch impulses in degrees**, applied after the round
leaves the barrel. The first round begins at base aim. The final authored delta
repeats on longer sprays within separate yaw/pitch caps. Native state stores the
resulting aim punch in radians. Seeded random dispersion remains separate.

Each profile declares its recovery delay, short/long-burst recovery rates,
long-burst threshold, extra dispersion per round, cap and recovery rate. These
values are tuning hypotheses, not a claim of human-validated weapon balance.
Recovery runs at 64 Hz; a fully recovered gun returns to pattern index zero.
Reload recovers naturally. Switching, salvage equip and a new life clear recoil;
burst interruption and overclock use the existing native weapon timing rules.

The central native ray is base input plus aim punch, clamped to the supported
pitch interval. The camera draws that same direction, including in reduced
motion. Decorative viewmodel springs remain separate; the former cosmetic
camera pitch kick was removed because it displaced the view from the central
ray. The browser predicts gun ticks and replays unacknowledged controls, then
reconciles every field from native snapshots. Shot ordinals prevent duplicate
predicted presentation across snapshot replays. Muzzle/audio prediction does
not confirm a hit: hit markers still require authorized native hit events.

The automated suite compares 440 ticks for every chassis/weapon combination,
including fire/release/recovery/reload/switch. It also checks burst and both
fire-rate effects, single-click retention, replay deduplication and render-rate
independence. The native compensation experiment shares seeded random noise
between trials: compensation improves error while dispersion remains nonzero.
Controlled human ARC-9/ION-5/RAIL-LANCE comparisons remain required.

## Movement and precision (#7)

Movement parameters share the spec between Rust and browser prediction:

| Quantity | Candidate value |
| --- | --- |
| Ground acceleration | 1,900 native units/s² |
| No-input ground braking | 1,700 units/s² |
| Intentional reversal | 2,800 units/s² |
| Air steering acceleration | 250 units/s²; no-input air motion retains momentum |
| Full-precision speed threshold | 12% of chassis speed × weapon mobility |
| Full-speed spread multiplier | 2.5, reached by a continuous smooth curve |
| Airborne spread multiplier | 5 × the speed-dependent multiplier |
| Landing/dash precision recovery | 18 ticks; initial additional multiplier 1.25 |
| Crouch / walk or scoped speed | Existing 0.45 / 0.55 multipliers |
| Jump / gravity | Existing 220 units/s / 600 units/s² |

Input is normalized before applying the target speed. A bounded vector step
approaches it; a diagonal cannot add speed. Collision removes blocked velocity
components. The current world has a flat native floor, not a new ceiling/step
solver. Dash retains its collision-substepped displacement and now incurs a
precision recovery window. Presentation inertia never changes these values.

Browser motion integrates the same fixed native ticks, carrying fractional time
between render frames. Native/browser tests compare every tick in 216 fixtures
(three maps × six chassis × twelve weapons), plus 30/60/120 Hz and jitter,
held jump, collision, landing and 0/80/180 ms network/prediction checks.
The HUD reports movement, landing, recoil recovery, scope readiness and base
spread. Its reticle uses the same speed/air/landing/recoil contract with local
presentation prediction. Human comparison to the immediate baseline is open;
this candidate must not become the production default merely on numeric tests.

## Native regions and stance (#8)

A calibrated oriented head box and vertical body capsule replace the old single rectangular body/head test.
All six chassis use the same declared gameplay hull; ornamental shell parts,
weapons and procedural limbs do not acquire extra hit regions.

| Standing / fully crouched | Standing | Crouched |
| --- | --- | --- |
| Neutral head center height | 64.95 | 46.8 |
| Head center local depth | 0.13 | 5.5 |
| Head half-extents (X / Y / Z) | 8.5 / 6.25 / 7.5 | 8.5 / 6.25 / 7.5 |
| Body capsule lower / upper center heights | 18 / 43 | 15 / 28 |
| Body capsule radius | 18 | 15 |
| Eye height | 56 | 37 |

Stance approaches its target at the previous visual response time (0.07 s), now
on native ticks, snapping within 1e-6. Region parameters and eye height follow
that continuous authoritative amount. Remote snapshots interpolate it; the
character evaluator and local camera consume it rather than inventing a second
crouch clock. The group weight uses the native amount directly; it does not add a second smoothing delay. A visual audit found that the previous 47-unit crouched bound missed the helmet, so the new box follows measured head-core height/depth and the shared chest/head pitch coefficients. These authored constants remain independent of per-frame skinning. The history stores position, stance, yaw/pitch, alive and life identity;
rewind cannot hit a different life or rewind through death. Existing current-map
cover keeps precedence, including equal-distance boundaries. Armor piercing
still does **not** penetrate walls.

The closest oriented-box/capsule surface chooses the region. Equal region distances,
including an origin inside both, resolve to body. The math handles tangents,
parallel and inside rays; a zero/invalid direction is not a shot. The diagnostic
CLI normalizes directions and validates bounded fixtures. A 501-stance/world/angle
transform test compares its volumes to the browser overlay within 1e-9 native units. Another 54 real-rig stance/pitch cases verify the head joint remains inside the declared box, and an independent Three.js raycast agrees with the native head intersection within 1e-6 units. Decorations outside the declared head core remain cosmetic; moving and ambiguous-edge review remains open.

Run `release/botstrike-engine hit-probe` with one JSON object per line containing
`origin`, `direction`, `position`, and `stance`, plus optional bounded `yaw`/`pitch`. It has no room access or HTTP
endpoint. `npm run dev:motion` offers **Native hit regions**, plus `inspectRay`
for an explicit native probe result. This inspector is excluded from the shipped
client. Synthetic lab poses and native snapshots remain identified separately.
Six-silhouette/ambiguous-shot review and extreme-pose captures remain open;
a primitive numeric pass does not establish perfect mesh/hull agreement.

## Damage explanation (#9)

`npm run build:damage` compiles the native engine and generates 6,048 cases by
running the real `Game::step`, fire, damage, armor, effect, reload and reserve
paths. The candidate matrix covers all twelve weapons and six targets, body/head,
no/chassis/100 armor, four root-to-root ranges, BASTION shield where applicable,
and no boost/FORGE five-second overclock/Power Core four-second overclock.
It includes native shield expiration, EMP shield removal after the first hit,
integer rounding, burst/pellet aggregation, earliest empty-magazine reload,
finite reserves and capped actual-health damage. Splash excludes the directly
hit target, as it already does in live rules.

This is an **ideal-hit lower bound**. Recoil and random dispersion are removed
only inside the offline fixture; all pellets land in the selected native region.
First-round latency is excluded; time starts at its first shot. Body samples aim
at the lower capsule center. Range uses player roots, while falloff still uses
the actual surface distance in native firing. Cover, partial pellet hits,
reaction, movement and aiming make real fights take longer. It is not an
estimate of human win rate or a browser-authoritative score.

The armory guide reports whole-round HP lost/armor spent, rounds to kill and
ideal elapsed time for both regions, with explicit reload labels. Head damage
is ×2.5 before range/shield/armor resolution; it does not guarantee a one-shot
kill against every chassis. Native hit/kill events now record actual HP, armor
spent, shield state and the true gun/splash/equipment source. Death explanations
use those confirmed values; an equipped gun is not blamed for a grenade kill.

Raw native events are private replay state and are removed from public
snapshots. Authorized feedback remains the only event channel. Detailed damage
accounting goes only to the attacker/victim, including for globally announced
kills. Other pilots do not receive that private HP/armor accounting.

The generated guide includes exact engine and model-source hashes. Web builds
reject a stale guide after any bound native-source change. The canonical data
is `games/botstrike/web/damage-contract.json`; its compressed evidence copy is
`docs/acceptance/tactical-core/damage-contract.json.gz`. Practice integration,
range-threshold boundary examples and human comprehension checks remain open.
No weapon damage/armor tuning is hidden in the explanatory interface.

## Replay and acceptance

The unreleased native version is `botstrike-2050-tactical-v2`. Myelin binds the
exact compiled engine and the new application/input contract. Five production
pairs—salvage-v1, readability-v5, tactics-v4, network-v3 and arsenal-v2—are
retained byte-for-byte with their recorded hashes. Old signed saves are routed
to their exact verifier, never reinterpreted under the candidate rules.

`tests/botstrike-historical-profiles.mjs` creates fresh synthetic complete matches
on those exact old production binaries, verifies routing and checks that the new
profile rejects them. These are not past human matches. Current native-flow
validation completes a signed match and rejects a modified result. Myelin is
off-chain host replay, not CKB settlement or proof of human input.

Current browser checks distinguish functional CSS/input mapping from hardware
performance. The six-size functional run uses desktop DPR 0.5 at unchanged CSS
viewport sizes and normal mobile emulation. Full-backing interrupted runs remain
retained failures; no desktop/Android performance pass is inferred. The animation
performance deferral in #11 remains explicit. New gameplay/visual/human gates
remain open in their own issues. Nothing in this candidate closes the remaining
training, readability, utility, map, economy, hero, audio or communication work.


The frozen phase-one source (model SHA `e4e83daf03d9…`) was also built and
validated in the production-compatible Bookworm image. Its complete 23,040-tick
native match (48–38), signed replay, tamper rejection and five historical
synthetic exports passed inside the image. The 6,048 damage rows match the local
build. See `acceptance/tactical-core/phase-one-bookworm.json`. This is a local
staging validation; it does not record a production rollout or human gunplay
acceptance. Later training changes have a different source/profile and require
their own portable validation.
