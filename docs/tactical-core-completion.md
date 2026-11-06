# Tactical-core completion ledger

Scope: all eighteen user-requested issues, in the requested dependency order. This ledger does not reduce a human/device gate to a synthetic test.

Baseline: animation candidate `52d7701`; native rule version `botstrike-2050-salvage-v1`. The maintainer accepted the currently deployed animation behavior on 2026-11-06 after reviewing stop/turn/crouch/jump/death/reload and contact behavior. Existing performance work remains advisory/deferred under the recorded November 5 policy.

| Issue | Scope | Current state |
| --- | --- | --- |
| [#21](https://github.com/UTXOPlay/BotStrike/issues/21) | [P1] Align first-person weapon motion, ADS and feedback with authoritative firing | Closed after PR #2 merge `0d8b151` and the November 6 maintainer acceptance |
| [#22](https://github.com/UTXOPlay/BotStrike/issues/22) | [P1] Calibrate sole contacts and implement bounded stance-aware foot IK | Closed after PR #2 merge `0d8b151` and the November 6 maintainer acceptance |
| [#33](https://github.com/UTXOPlay/BotStrike/issues/33) | [P2] Add bounded stop, pivot and landing pose transitions | Closed after PR #2 merge `0d8b151` and the November 6 maintainer acceptance |
| [#6](https://github.com/UTXOPlay/BotStrike/issues/6) | [P0] Build learnable per-weapon recoil and accuracy recovery models | Implemented candidate; automated verification recorded below; representative human practice comparison and approval remain open |
| [#7](https://github.com/UTXOPlay/BotStrike/issues/7) | [P0] Define acceleration, stopping and airborne accuracy as a coherent movement model | Implemented candidate; all-map/chassis/weapon tick agreement passes; controlled human comparison remains open |
| [#8](https://github.com/UTXOPlay/BotStrike/issues/8) | [P0] Make head and body hit volumes precise, inspectable and visually consistent | Calibrated native head box/body capsule/stance-and-look history and offline/lab inspector implemented; six-silhouette and ambiguous-shot review remain open |
| [#9](https://github.com/UTXOPlay/BotStrike/issues/9) | [P0] Publish and validate damage, armor and time-to-kill contracts | Native 6,048-case matrix, armory guide and personal damage accounting implemented; practice integration and human comprehension remain open |
| [#10](https://github.com/UTXOPlay/BotStrike/issues/10) | [P0] Create an authoritative practice range with repeatable gun and utility drills | Open |
| [#23](https://github.com/UTXOPlay/BotStrike/issues/23) | [P1] Make team identity, cover and effects readable across combat conditions | Open |
| [#15](https://github.com/UTXOPlay/BotStrike/issues/15) | [P1] Make utility throws reproducible across throw modes and player motion | Open |
| [#16](https://github.com/UTXOPlay/BotStrike/issues/16) | [P1] Validate smoke, flash and ability counterplay as a tactical information system | Open |
| [#14](https://github.com/UTXOPlay/BotStrike/issues/14) | [P1] Validate one flagship demolition map through timed routes and human 5v5 playtests | Open |
| [#17](https://github.com/UTXOPlay/BotStrike/issues/17) | [P1] Define competitive weapon slots, salvage replacement and teammate drops | Open |
| [#18](https://github.com/UTXOPlay/BotStrike/issues/18) | [P1] Make round economy, loss recovery and saving decisions meaningful | Open |
| [#20](https://github.com/UTXOPlay/BotStrike/issues/20) | [P1] Validate hero gunplay, selection rules and ability counterplay with human data | Open |
| [#24](https://github.com/UTXOPlay/BotStrike/issues/24) | [P1] Improve spatial audio without disclosing hidden opponent state | Open |
| [#25](https://github.com/UTXOPlay/BotStrike/issues/25) | [P1] Give the full arsenal and movement surfaces distinct synchronized sound | Open |
| [#28](https://github.com/UTXOPlay/BotStrike/issues/28) | [P1] Add map callouts, tactical pings and accessible quick communication | Open |

## Issue #21: [P1] Align first-person weapon motion, ADS and feedback with authoritative firing

### Required scope
- Author a coherent visual response for the representative sidearm/rifle/sniper, then the full arsenal: draw, switch, recoil, recovery, reload, scope and supported interruptions.
- Bind pose timing to authoritative weapon state and approved recoil semantics; distinguish aim/camera state, cosmetic sway and weapon-model motion.
- Preserve trigger/support-hand and magazine contact across all chassis, including rapid direction changes, crouch, hit reactions and equipment use.
- Offer reduced-motion behavior that retains essential timing cues without unnecessary shake or delayed controls.

### Acceptance
- [x] Reference captures show shot/reload/equip/ADS events aligned with native acknowledgements and explain which effects are locally predicted.
- [x] No cosmetic offset changes native shot direction, collision, fire rate, camera input response or hit confirmation.
- [x] All six chassis pass grip/contact and repeated-reset checks across the supported weapons and interruptions.
- [x] Near-plane, scope and arm clipping are reviewed at all required aspect ratios and FOV settings.
- [x] Human A/B reviewers assess responsiveness and readability separately from decorative motion.

### Required validation
- Extend reload, pump, FPS and scoped browser checks, then capture identical-input before/after sequences.
- Measure cost within the physical-device frame budget; retain reduced-motion and immersive-input regression coverage.

Evidence: merged PR #2 (`0d8b151`); runtime `646ec4c`; maintainer acceptance on 2026-11-06 (“已看过，当前动画可接受”). See the version-bound human acceptance record, audit-deployment record and hybrid requirement ledger. H01/H02 physical performance is deferred to #11 under the maintainer-approved advisory policy and is not reported as passed. Future tactical changes are outside this acceptance.

## Issue #22: [P1] Calibrate sole contacts and implement bounded stance-aware foot IK

### Required scope
- Coordinate this work in PR #2 or an explicitly agreed continuation without narrowing its current scope; calibrate actual sole contacts and stance/swing intervals for all six rigs.
- Capture bounded support targets during feasible stance and solve constrained two-bone legs with stable knee direction and reach limits; release rather than overextend.
- Release/reinitialize constraints on jump, fall, death/respawn, large corrections, map/room changes, hiding, unreachable targets and abrupt pivots.
- Coordinate spatial stride adaptation and footstep presentation with authorized movement/audio events, without feeding pose offsets into simulation.

### Acceptance
- [x] A contact report distinguishes sole-to-support error, world drift and phase estimates; it documents character scale and feasible stance intervals.
- [x] The provisional target of at most 2 native world units is tested on calibrated feasible intervals, with explicit exclusions and failure rates rather than a blanket pass.
- [x] No accumulated offsets, NaN transforms, knee flips, overextension or persistent weapon-hand separation occur across all chassis and lifecycle fixtures.
- [x] Identical-input captures cover starts/stops/reversals/circles/turns/fire/jump/crouch/reload at 30/60/120 fps and jitter, with ten rigs and reduced motion.
- [x] Physical-device profiling and human comparison demonstrate acceptable cost and visible improvement before enabling the solver by default.

### Required validation
- Extend the draft motion lab with calibrated sole/contact measurements and adversarial lifecycle fixtures.
- Run existing gait/hit/reload regressions and compare target-hardware frame-time distributions.

Evidence: merged PR #2 (`0d8b151`); runtime `646ec4c`; maintainer acceptance on 2026-11-06 (“已看过，当前动画可接受”). See the version-bound human acceptance record, audit-deployment record and hybrid requirement ledger. H01/H02 physical performance is deferred to #11 under the maintainer-approved advisory policy and is not reported as passed. Future tactical changes are outside this acceptance.

## Issue #33: [P2] Add bounded stop, pivot and landing pose transitions

### Required scope
- Identify visible discontinuities from repeatable baseline captures before adding motion; select a small set of useful stop, reversal, 90/180-degree pivot and landing transitions.
- Prototype bounded additive springs/inertial offsets with declared damping and limits; author new clips only where procedural correction is insufficient.
- Keep aim, gun grips and foot constraints coherent; define reset/release rules for full-body actions and network corrections.
- Tune chassis-specific visual weight/response without changing hero speed, damage or control timing; retain a restrained reduced-motion path.

### Acceptance
- [x] Every added offset has a bound, decay and lifecycle reset, with repeated-action tests showing no drift.
- [x] Rapid reversal/turn-fire/jump-land-crouch/reload sequences remain finite and readable on all six chassis.
- [x] IK constraints release safely when an approved pivot or landing makes support infeasible.
- [x] Before/after recordings use identical inputs/camera, and human reviewers report improved transitions without slower-feeling control.
- [x] Ten-rig hardware profiling meets the previously established animation/frame budget.

### Required validation
- Reuse the accepted motion lab at 30/60/120 fps, irregular steps and reduced motion.
- Verify no native state/input/weapon timing changes and no regressions in upper-body hit/fire priority.

Evidence: merged PR #2 (`0d8b151`); runtime `646ec4c`; maintainer acceptance on 2026-11-06 (“已看过，当前动画可接受”). See the version-bound human acceptance record, audit-deployment record and hybrid requirement ledger. H01/H02 physical performance is deferred to #11 under the maintainer-approved advisory policy and is not reported as passed. Future tactical changes are outside this acceptance.

## Issue #6: [P0] Build learnable per-weapon recoil and accuracy recovery models

### Required scope
- Specify recoil displacement separately from random dispersion, viewmodel recoil and camera feedback; identify which components a player can compensate through input.
- Start with ARC-9, ION-5 and RAIL-LANCE as representative sidearm/rifle/sniper profiles; define tapping, short-burst, sustained fire and recovery behavior before extending to all twelve weapons.
- Implement deterministic native shot sequencing, interruption/reset rules and interactions with crouch, movement, scope, reload, weapon switching and overclock effects.
- Update the browser reticle and immediate feedback to describe the authoritative model without granting the browser authority over damage or hits.

### Acceptance
- [ ] Reviewed parameter tables and repeatable shot traces show each representative weapon's trajectory, dispersion and recovery over time.
- [ ] The same recorded inputs and seed produce the same native shot results; changing render FPS does not change the native sequence.
- [ ] Short bursts and full sprays have intentionally tested tradeoffs; deliberate compensation improves the fixed practice task without removing declared random dispersion.
- [ ] Reload, switch, death, respawn, burst continuation and skill effects have explicit reset/continuation tests.
- [ ] Only server-confirmed hits produce hit confirmation; predicted muzzle/audio effects remain distinguishable from confirmed damage.
- [ ] After the three-weapon vertical slice, all twelve weapon definitions have explicit approved recoil/recovery behavior before this arsenal-wide issue closes.

### Required validation
- Add native shot/recovery fixtures and browser reticle checks, then run exact-profile complete replay and tamper rejection.
- Attach human comparisons on the three representative weapons, controlling map, distance, input device and target behavior.

Evidence and remaining gates: see [the tactical candidate contract](tactical-core-contract.md) for implemented #6–#9 behavior and the current acceptance record; unimplemented/human requirements remain unchecked.

## Issue #7: [P0] Define acceleration, stopping and airborne accuracy as a coherent movement model

### Required scope
- Define acceleration, friction/deceleration, reversal, walk/crouch/scope speed and any air-control limits; test whether the change improves control rather than only adding sluggishness.
- Specify how speed and takeoff/landing affect accuracy and when precision recovers, coordinated with weapon recovery.
- Implement native movement first and update browser prediction with identical constants and edge semantics; keep presentation inertia separate.
- Cover hero speed differences, heavy-weapon mobility, dash, collision contact, low ceilings if supported and held-jump edges.

### Acceptance
- [ ] Velocity and accuracy traces for start/stop/reverse/diagonal/jump/land are documented and deterministic.
- [ ] Native and browser trajectories agree across all maps/heroes and representative weapon/input combinations, including irregular render steps.
- [ ] A player can identify when a precision shot is available from consistent reticle/feedback; no animation delays authoritative stopping or aim.
- [ ] Collisions, boundaries, dash and reconnect corrections do not inject speed, duplicate jumps or bypass movement limits.
- [ ] Human comparisons report stop precision and perceived responsiveness against the existing immediate model.

### Required validation
- Extend actual-native movement trajectories, prediction and jump tests; exercise asymmetric latency and low render FPS.
- Use a small controlled playtest before making the new model the default.

Evidence and remaining gates: see [the candidate contract](tactical-core-contract.md) and current acceptance record. Implemented automated checks do not close the unchecked human/remaining scope requirements.

## Issue #8: [P0] Make head and body hit volumes precise, inspectable and visually consistent

### Required scope
- Define a bounded native head/torso model, with limb regions only if their gameplay value justifies the complexity. Document the intended relationship to all six visual silhouettes.
- Provide development-only ray, region and rewind visualization using authorized data; never disclose hidden opponent volumes in the shipped live client.
- Extend historical pose records only with the authoritative state the chosen model actually requires; keep death/life isolation and cover precedence.
- Validate crouch transitions, pitch/yaw extremes, peeks, jump/landing and procedural pose offsets against the native volumes.

### Acceptance
- [ ] Reference shots identify the same region from native hit results and the diagnostic overlay at declared boundary tolerances.
- [ ] No frame-by-frame client skeleton or visual IK result becomes authoritative input.
- [ ] Boundary, grazing, overlapping target/cover, zero-distance and stance-change cases have deterministic tests.
- [ ] Rewind never hits a new life, a dead historical target or through blocking geometry.
- [ ] Silhouette review covers all six chassis, standing/crouched/moving poses and relevant camera angles with documented remaining mismatch.

### Required validation
- Add region/ray and historical-pose fixtures, then run native/browser diagnostic alignment and signed replay verification.
- Have human reviewers inspect ambiguous shots using the same source tick and renderer transform.

Evidence and remaining gates: see [the candidate contract](tactical-core-contract.md) and current acceptance record. Implemented automated checks do not close the unchecked human/remaining scope requirements.

## Issue #9: [P0] Publish and validate damage, armor and time-to-kill contracts

### Required scope
- Generate a source-derived matrix for all weapons against all six chassis: head/body, armor states, relevant distance bands and active defensive/offensive effects.
- Report damage per shot, rounds to kill, ideal time to kill and uncertainty due to dispersion; distinguish first-shot latency, fire interval and reload effects.
- Review outliers with the competitive contract and tune only with an explicit rationale; explain breakpoints in the armory/practice UI.
- Keep authoritative actual-health damage, armor consumption and visible feedback consistent, including assists, healing, splash and overkill.

### Acceptance
- [ ] Generated examples match real native firing/hurt results at armor depletion, range thresholds and rounding boundaries.
- [ ] The table identifies intentional one-shot and multi-shot cases rather than assuming all headshots must kill every hero.
- [ ] Tests cover shield/EMP/overclock/siphon interactions, burst/pellet aggregation, protection and friendly-target rules.
- [ ] Any numerical tuning is reviewed separately from the explanatory UI and is bound to a new native profile.
- [ ] Practice/death explanations accurately identify the factors that caused a surprising damage or kill result.

### Required validation
- Use deterministic native scenarios as the oracle rather than a second hand-maintained spreadsheet formula.
- Attach human comprehension checks and regenerate the matrix in verification when relevant parameters change.

Evidence and remaining gates: see [the candidate contract](tactical-core-contract.md) and current acceptance record. Implemented automated checks do not close the unchecked human/remaining scope requirements.

## Issue #10: [P0] Create an authoritative practice range with repeatable gun and utility drills

### Required scope
- Deliver a first slice for one sidearm, rifle and sniper: fixed/moving targets, distance selection, recoil trace, burst recovery, stop-and-shoot and scoped drills.
- Add resettable utility throws, trajectory review/rethrow and then pre-aim/retake/clutch exercises on approved maps.
- Use the native engine as the hit/movement oracle; decide whether existing configurations suffice or a new recorded training configuration/profile is required.
- Separate unranked practice resets, infinite supplies or instructional overlays from live competitive endpoints and statistics.

### Acceptance
- [ ] A drill can be restarted with the same seed, targets and native rules, and its score can be reproduced from authoritative events.
- [ ] Targets, hit regions, recoil and accuracy indicators match the corresponding native ruleset.
- [ ] A baseline and repeated-training protocol measures improvement without silently changing drill difficulty.
- [ ] Practice shortcuts cannot enter public/ranked rooms, generate competitive rewards or disclose hidden live players.
- [ ] Mouse, touch and controller players can start, repeat and leave a drill without controls outside the game scene.

### Required validation
- Test native drill scoring/reset isolation and browser input mapping; attach example recordings for gun and throw drills.
- Keep development-only visualization clearly labeled; a local preview is not a signed competitive score.

Evidence: pending; record exact artifact/revision/command or human result for every criterion.

## Issue #23: [P1] Make team identity, cover and effects readable across combat conditions

### Required scope
- Test ally/enemy recognition across all six chassis, background materials, brightness, distance, motion, smoke and low render scales.
- Establish consistent visual semantics for solid/walkable/penetrable/decorative surfaces and match those semantics to native geometry.
- Adjust local team material cues, contrast, silhouettes, effect density and icon shapes; avoid through-wall outlines or labels that reveal hidden enemies.
- Define accessibility and future-cosmetic constraints so skins, colors and effects do not alter competitive visibility or apparent hit regions.

### Acceptance
- [ ] A repeatable recognition task reports accuracy/time by condition and input/display cohort with stated sample sizes.
- [ ] Team recognition remains possible without relying only on hue, and low-quality modes preserve critical silhouette/cover information.
- [ ] IFF/labels/effects respect service visibility and spectator restrictions, including smoke, flash and hidden actors.
- [ ] Rendered collision/cover cues agree with native movement and ray behavior at representative edges and sightlines.
- [ ] All required viewports/FOVs keep HUD controls and combat information legible inside the scene.

### Required validation
- Extend IFF/HUD/readability browser checks and conduct human recognition sessions.
- Capture static and moving examples at native desktop/mobile budgets and simulated color-vision conditions.

Evidence: pending; record exact artifact/revision/command or human result for every criterion.

## Issue #15: [P1] Make utility throws reproducible across throw modes and player motion

### Required scope
- Define a small, usable set of throw strengths and release semantics for mouse, touch and controller; include running/jumping throws and player velocity inheritance if accepted.
- Specify deterministic collision, ground/ceiling bounce, rest behavior, fuse start and deploy timing; distinguish throwable equipment from self-use items.
- Expose a matching practice preview/rethrow path without trusting browser impact calculations.
- Bound active utilities and collision work and preserve authoritative inventory consumption and held-button edge behavior.

### Acceptance
- [ ] A fixed native release state produces the same trajectory and detonation tick at 30/60/120 render FPS and after reconnect.
- [ ] Reference throws cover stationary/run/jump, strength variants, corners, floor, ceilings and map boundaries.
- [ ] The preview and authoritative landing agree to a declared tolerance and identify the exact rules/map version.
- [ ] Input cancellation, rotation/menu/focus loss, repeated packets and changing equipment cannot duplicate or lose an authorized throw.
- [ ] All input devices can express the supported throws without mandatory multi-button combinations that exclude touchpad users.

### Required validation
- Add native projectile fixtures and browser release/acknowledgement tests, plus complete profile-bound replay.
- Publish a small set of reproducible practice lineups on the flagship map.

Evidence: pending; record exact artifact/revision/command or human result for every criterion.

## Issue #16: [P1] Validate smoke, flash and ability counterplay as a tactical information system

### Required scope
- Write an interaction matrix for smoke, flash, reveal/scan, EMP, shields, repair fields and damage; specify duration, range, line of sight and team effects.
- Review flash falloff/facing transitions, smoke edge/inside behavior and any area-denial equivalent needed for entry and retake tactics.
- Align native effects, service visibility/audibility, AI perception and rendered volumes; do not import CS2 dynamic-smoke expectations into the CS:GO comparison.
- Create paired attacker/defender exercises that demonstrate information gain, line isolation, entry and a fair counter-action.

### Acceptance
- [ ] Every supported interaction has an explicit outcome, bounded duration and deterministic boundary/expiry tests.
- [ ] An occluded, flashed or smoke-hidden enemy is disclosed only under the accepted visibility/reveal policy, including spectator views and reconnect.
- [ ] The visible effect boundary and native/service decision agree in reference camera positions and low-quality rendering.
- [ ] Human exercises demonstrate at least one understandable response to each strong utility/ability combination.
- [ ] Balance changes update their native profile and do not redefine old replay outcomes.

### Required validation
- Extend utility/visibility/feedback tests and record native-backed entry/retake exercises on the flagship map.
- Review team interactions explicitly rather than assuming either universal friendly effects or universal immunity.

Evidence: pending; record exact artifact/revision/command or human result for every criterion.

## Issue #14: [P1] Validate one flagship demolition map through timed routes and human 5v5 playtests

### Required scope
- Select one map and record spawn-to-contact/site timings, A/B rotations, lurk/flank routes, retreat options, sightlines and simultaneous angle exposure.
- Build a graybox review layer aligned with native collision/shot geometry and define stable callout names.
- Evaluate smoke/flash/scan/dash entry, holds, retakes and saves with ten human players; vary side, skill cohort and hero composition.
- Tune geometry incrementally and preserve before/after map versions and comparable replays. Use findings before expanding all three maps.

### Acceptance
- [ ] A timing/sightline report explains intended attacker/defender opportunities and documents problematic spawn or peeker advantages.
- [ ] Each important position has reviewed exposure, counterplay, fallback and utility interactions.
- [ ] Rendered cover and native movement, ray blocking, smoke disclosure and bot routing agree.
- [ ] Human evidence is stratified by side, player skill, hero and weapon with sample sizes and uncertainty; bot-only win rates are not the acceptance result.
- [ ] The accepted map revision includes reproducible fixtures and a decision log for each material layout change.

### Required validation
- Run route/collision/visibility tests plus scheduled human 5v5 sessions and replay review.
- Apply map version/profile compatibility gates; old signed matches must keep their original map geometry.

Evidence: pending; record exact artifact/revision/command or human result for every criterion.

## Issue #17: [P1] Define competitive weapon slots, salvage replacement and teammate drops

### Required scope
- Choose competitive primary/secondary/gear/melee slots and carry limits under the ruleset contract; preserve the current multi-gun experience in modes where it remains intentional.
- Define pickup replacement, explicit drop/gifting, ammunition recovery, reserve ownership, death drops, despawn and round persistence.
- Coordinate selection shortcuts and touch/controller inventory UX so slot changes are obvious and reversible only where rules permit.
- Specify blocked/occupied pickup and objective priority; prevent repeated-input, stale-life and simultaneous-claim duplication.

### Acceptance
- [ ] The design explains the opportunity cost of carrying a weapon and identifies which existing modes/rules are changed.
- [ ] A native invariant proves no slot overflow, duplicate gun/ammo creation, unauthorized pickup or reserve-cap bypass.
- [ ] Plant/defuse priority, cover checks, reach, expiry and bounded world drops remain tested.
- [ ] Human teammates can perform the approved drop/recovery flow, and all input methods show which weapon will be replaced.
- [ ] Existing salvage-v1 exports continue to verify under their original engine/profile and are never interpreted using slot rules.

### Required validation
- Extend salvage, economy and browser armory/pickup tests; include simultaneous claims and switching during reload.
- Record complete matches for both retained casual inventory and the new competitive ruleset.

Evidence: pending; record exact artifact/revision/command or human result for every criterion.

## Issue #18: [P1] Make round economy, loss recovery and saving decisions meaningful

### Required scope
- Model several consecutive rounds of wins/losses, force buys, partial buys, saves, deaths and objective outcomes using the accepted inventory and damage contracts.
- Define any loss-streak recovery, weapon-specific rewards, objective awards, side-specific access, armor/gear pricing and ammunition resupply policy.
- Show team purchasing readiness and personal next-round options using only information teammates are entitled to share.
- Keep casual deathmatch supplies distinct from competitive economic stakes and avoid rewarding AI-controlled contributions as human performance.

### Acceptance
- [ ] A reviewed round-by-round economy model explains viable buy/save choices and identifies unrecoverable or dominant purchase loops.
- [ ] Native tests cover caps, streak reset/decay, round/half reset, survival/death, disconnects and rejected/repeated purchases.
- [ ] Prices and rewards are taken from the versioned source of truth, and the UI explains the actual next-round consequence.
- [ ] Ten-human sessions exercise poor/rich teams and show understandable comeback and saving opportunities without assuming exact CS:GO prices.
- [ ] Historical exports retain their original economy and verifier; no old career entry is recomputed under the new rules.

### Required validation
- Use deterministic multi-round fixtures, armory/ownership browser checks and complete signed matches.
- Publish purchase/outcome distributions and sample sizes from the flagship-map playtest.

Evidence: pending; record exact artifact/revision/command or human result for every criterion.

## Issue #20: [P1] Validate hero gunplay, selection rules and ability counterplay with human data

### Required scope
- Document each hero's intended gunplay role, mechanical strengths, readable weaknesses and counters; settle duplication, selection and change windows under the competitive contract.
- Analyze damage breakpoints and map timings before changing attributes. Include shield/EMP, heal/siphon, reveal/smoke and speed/weapon interactions.
- Run matched human sessions across sides, skill cohorts and compositions; distinguish pick-rate effects from skill and map confounding.
- Tune in small versioned batches; retain an intentional casual experience rather than erasing the hero identity to mimic CS:GO.

### Acceptance
- [ ] A matchup/composition report includes sample sizes, player-skill controls and uncertainty, with no mandatory exact-50-percent claim.
- [ ] Each strong ability has a teachable counter, appropriate tell and a defined effect on a gunfight.
- [ ] Selection and respawn/buy-time changes do not grant duplicate healing, armor, cooldown or inventory benefits outside the accepted rules.
- [ ] Native scenarios cover all six heroes and important interacting effects, and human reviewers can explain surprising outcomes.
- [ ] Every balance change is tied to a hypothesis, observed result, version and rollback plan.

### Required validation
- Combine authoritative scenario tests with replay-reviewed human 5v5 and controlled duels.
- Keep bot-only acceptance useful for regression but separate from the human balance decision.

Evidence: pending; record exact artifact/revision/command or human result for every criterion.

## Issue #24: [P1] Improve spatial audio without disclosing hidden opponent state

### Required scope
- Measure current direction/distance identification using headphones and speakers before choosing a spatial rendering approach.
- Evaluate HRTF or other spatialization using server-authorized audible virtual sources; define permitted direction/distance/elevation precision rather than transmitting full hidden player state.
- Improve attenuation and occlusion transitions with bounded voice counts, clear priority and spectator-listener semantics.
- Support device limitations and accessible level settings without changing which events the player is entitled to hear.

### Acceptance
- [ ] Human tests report front/back, direction, distance and any supported elevation identification against the baseline.
- [ ] Wire-payload tests prove unauthorized coordinates/actor identities are absent and out-of-range/inaudible events remain filtered.
- [ ] Occlusion/smoke/flash/reveal and teammate spectator transitions follow a documented information policy.
- [ ] Multiple nearby shots/steps retain useful cues without clipping, runaway allocations or exceeding the accepted audio budget.
- [ ] Browser audio suspension/resume, volume persistence and headphone/speaker fallback remain functional.

### Required validation
- Extend feedback privacy/deduplication tests and perform listening tests on physical output devices.
- Attach implementation-independent listening tasks and measurements; stereo panning alone is not described as complete HRTF.

Evidence: pending; record exact artifact/revision/command or human result for every criterion.

## Issue #25: [P1] Give the full arsenal and movement surfaces distinct synchronized sound

### Required scope
- Define recognizable firing, burst, reload, equip and empty cues for all twelve weapons, including near/far and occluded variations where useful.
- Add justified movement-surface/material identities and preserve the gameplay distinction between audible running and quiet walking/crouching.
- Align visible step/landing and weapon actions with existing authorized event timing; coordinate contact calibration without granting client poses authority over audibility.
- Keep original/licensed asset provenance, loudness headroom, bounded sample memory and predictable voice prioritization.

### Acceptance
- [ ] Blind listening tasks can distinguish the intended core weapon/action classes at relevant distances and mix densities.
- [ ] Rapid/burst fire and reload interruptions do not duplicate, truncate incorrectly or drift from authoritative event order.
- [ ] Step cadence is plausible across hero speeds and gait changes, while hidden-source disclosure remains coarse/authorized.
- [ ] Many nearby actors cannot starve local essential cues or cause clipping/unbounded voices.
- [ ] Speaker/headphone and reduced-motion/low-quality combinations are reviewed, with clear accessible volume controls.

### Required validation
- Extend shot/impact/footstep sample, mix and browser event tests; include duplicate snapshots and reconnect.
- Measure audio CPU/memory and publish listening evidence rather than relying only on waveform tests.

Evidence: pending; record exact artifact/revision/command or human result for every criterion.

## Issue #28: [P1] Add map callouts, tactical pings and accessible quick communication

### Required scope
- Define concise localized-ready English callouts and a small communication wheel for enemy seen, rotate, hold, utility ready, objective and help.
- Support world/terrain pings, radar projection and teammate-spectator context using the exact inverse rendering transform and authorized map state.
- Only attach an enemy identity/position when the sender is entitled to see/reveal it; a terrain ping must not claim automatic enemy knowledge.
- Add rate limits, expiry, mute/block behavior and keyboard/touch/controller access without requiring voice.

### Acceptance
- [ ] Every important flagship-map area has an agreed name visible in relevant HUD/map contexts.
- [ ] Pings project to the intended world location after resize, FOV changes and supported elevation changes.
- [ ] Server validation prevents spoofing another sender, cross-team delivery, hidden-target attachment and unbounded spam.
- [ ] Expired, stale-room or disconnected-session messages cannot reappear after reconnect or rematch.
- [ ] A short human team exercise can coordinate entry/rotation/retake using quick communication alone, including color-vision/hearing accessibility needs.

### Required validation
- Add service disclosure/rate-limit tests and browser pointer/radar mapping at all required viewports.
- Record human task completion and communication confusion rather than measuring only button clicks.

Evidence: pending; record exact artifact/revision/command or human result for every criterion.
