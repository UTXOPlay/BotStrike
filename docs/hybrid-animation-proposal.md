## Summary

BotStrike already has a solid foundation for character animation: six rigged robots, 19-bone skeletons, 25 animation clips per chassis, upper/lower-body blending, and procedural weapon grips.

I believe we can achieve substantially more natural, agile and AAA-inspired combat animation **without motion capture, switching engines, or building hundreds of bespoke animations**.

The proposed approach is a **hybrid animation system**: preserve the existing authored animations, blend them continuously according to actual movement, and apply procedural corrections for turning, braking, foot contact, aiming and recoil.

The guiding principle is simple:

> **The game decides where the robot moves. The animation decides how that movement should look.**

The goal is not to add visual complexity for its own sake, but to make our robots feel responsive, physically convincing and distinctly mechanical during fast-paced FPS combat.

## 1. Where we are today

The existing animation pipeline already provides:

- Six rigged and skinned character models.
- 25 animation clips per chassis.
- Three.js AnimationMixer and cross-fading.
- Separate upper- and lower-body animation layers.
- Gait phase preservation during certain transitions.
- Procedural arm IK for weapon handling.
- Shooting, reloading, jumping, landing and hit reactions.

Relevant sources:

- [Character runtime](https://github.com/UTXOPlay/BotStrike/blob/main/games/botstrike/client/characters.mjs)
- [Animation authoring](https://github.com/UTXOPlay/BotStrike/blob/main/tools/characters/authoring.py)
- [Character asset documentation](https://github.com/UTXOPlay/BotStrike/blob/main/assets/characters/README.md)

The limitation is not necessarily the number of clips.

Currently, many locomotion animations are generated from periodic mathematical curves, and the runtime selects between discrete states such as running, walking, backpedalling and strafing.

This works for basic movement, but it does not fully account for the physical relationships between consecutive actions.

Consider a robot sprinting forwards, immediately reversing direction, turning 180 degrees and opening fire.

Each individual animation might be acceptable. The problem lies in **how the body transitions between them**.

A believable animation system needs to represent not only the current action, but also movement direction, acceleration, changing support feet and residual motion.

## 2. What we want to achieve

| Gameplay situation | Expected visual behaviour |
|---|---|
| Diagonal sprinting | Legs follow travel direction while the upper body maintains aim |
| Sudden reversal | Short braking and recovery motion without delaying gameplay |
| Fast 90°/180° turn | Readable pivot, weight transfer and torso counter-rotation |
| Continuous circle-strafing | Smooth directional gait without abrupt animation switching |
| Jumping and landing | Correct anticipation, landing compression and recovery |
| Shooting while moving | Stable weapon grip and responsive recoil |
| Crouching during combat | Natural posture change while preserving control responsiveness |

The quality target should be observable and measurable. “AAA-like” is an artistic ambition, not a substitute for concrete acceptance criteria.

## 3. The proposed methodology

### 3.1 Separate gameplay simulation from visual motion

This is the most important architectural constraint.

BotStrike already uses a Rust-authoritative simulation at 64 Hz, with Myelin providing off-chain deterministic replay verification.

We should preserve this design completely.

The native simulation continues to determine:

- Position and velocity.
- Collision and hit capsules.
- Player inputs and movement rules.
- Weapon behaviour and shot direction.
- Combat state and replay verification.

The animation system receives this state and synthesises a visual pose. It must never feed skeletal positions or visual offsets back into authoritative gameplay.

This allows us to experiment with sophisticated animation without compromising network consistency, competitive fairness or deterministic replay.

### 3.2 Introduce continuous locomotion blending

**Problem:** the current approach chooses an animation from a collection of discrete movement states.

**Solution:** use a two-dimensional locomotion blend space driven by forward and sideways velocity in the character's local coordinate frame.

Rather than deciding that a robot is simply “strafing right”, the system can understand that it is travelling 60% forwards and 40% right.

Its locomotion pose is then synthesised from compatible source animations.

We should initially reuse the existing forward, backward, strafe, idle, walk/run and crouch clips.

The implementation must also synchronise their gait phases. Blending incompatible left-foot and right-foot support phases can produce worse results than the original system.

**Expected result:** characters can move diagonally, reverse and circle-strafe while aiming without visibly jumping between unrelated leg poses.

### 3.3 Add orientation and stride warping

**Problem:** a forward-running animation does not necessarily match the character's actual movement vector.

**Solution:** procedurally adapt stride direction, stride length and lower-body orientation according to actual velocity.

For example, if the robot is aiming north but moving north-east, the legs should reflect the movement direction while the torso and weapon continue to face the target.

We can also introduce bounded acceleration-based leaning and hip/chest counter-rotation.

These corrections must respect anatomical or mechanical joint limits. If a correction requires excessive twisting, it is better to transition to a suitable directional or pivot animation.

Importantly, **visual inertia must not become gameplay inertia**.

The player's movement remains immediately responsive. Only the visible pose communicates acceleration, mass and momentum.

### 3.4 Add stance-aware foot locking and leg IK

This is particularly important for eliminating the characteristic “sliding feet” of procedural animation.

A foot has two broad states:

- **Stance:** the foot is supporting the body and should remain relatively stable against the ground.
- **Swing:** the foot is moving towards its next placement.

During a stance interval, the animation system captures a world-space contact target and uses constrained two-bone IK to adjust the thigh and shin towards that target.

During swing, the foot is released and allowed to move.

Start with the existing flat-ground maps. We do not need a general-purpose terrain adaptation system before the game contains relevant sloped playable surfaces.

Foot constraints must be released when necessary, including:

- Jumping or leaving the ground.
- Death and respawn.
- Large authoritative position corrections.
- Map changes.
- Unreachable leg targets or abrupt pivots.

The solver must not overextend limbs, produce unstable knee configurations or force both feet to remain planted indefinitely.

**Expected result:** footsteps appear grounded rather than floating or skating across the floor.

### 3.5 Introduce pose inertialisation

Traditional animation cross-fading blends between poses, but may still abruptly change joint velocities.

Inertialisation addresses the transition itself.

Instead of simply fading the old pose into the new one, the system preserves a controlled amount of the outgoing motion and allows it to decay.

A practical implementation can start with critically damped additive springs for the hips, chest, shoulders and selected mechanical components.

We do not initially need a complex full-body physics model.

The intended effect is controlled residual movement, not excessive wobbling.

Different chassis can also have different visual profiles:

- VECTOR: sharp acceleration and fast recovery.
- BASTION: heavier, more deliberate secondary motion.
- SPECTRE: restrained, precise movement.
- Other chassis: individual tuning consistent with their design.

These differences remain cosmetic unless separately introduced through explicit native gameplay changes.

### 3.6 Improve upper-body aiming and weapon response

For an FPS, perceived animation quality depends heavily on the weapon and hands.

We should retain the existing upper/lower-body blending and arm-grip IK, then enhance:

- Continuous chest and head aiming offsets.
- Stable hand-to-weapon constraints.
- Weapon sway during movement.
- Immediate firing response.
- Damped recoil recovery.
- Sprint-to-aim transitions.
- Better coordination between reloading and locomotion.

**The camera and actual aim direction must remain responsive.**

We should not introduce noticeable mouse-input latency or change the authoritative firing direction to accommodate animation.

First-person and third-person presentation should be tuned separately, even when sharing the same underlying rig.

Reduced-motion preferences must also be respected.

### 3.7 Improve source clips only where necessary

Procedural correction is excellent for responsiveness and continuity, but cannot manufacture every important action detail from an inadequate source clip.

After improving runtime blending, we should identify missing animations from actual gameplay footage.

Likely candidates include:

- Sprint starts and braking steps.
- Directional acceleration.
- 90° and 180° pivots.
- Hard landing recovery.
- Moving crouch transitions.
- Weapon-ready transitions.

These can be produced through keyframe animation, procedural authoring or offline AI/physics-assisted animation tools.

**No motion capture is required.**

We should prefer a small collection of carefully reviewed, reusable animations over a large collection of inconsistent clips.

The existing Blender/Python asset pipeline can remain the source of truth.

Any generated animation must be reviewed for foot contact, joint constraints, weapon grips, loop continuity, licensing and reproducibility.

A large motion-matching database or runtime neural animation model should not be the starting point. Those approaches would add considerable complexity before we have demonstrated the benefits of simpler methods.

## 4. Proposed implementation architecture

The system can be organised into independent responsibilities.

| Module | Responsibility |
|---|---|
| `animation-motion.mjs` | Convert player state into continuous local velocity, acceleration and turning signals |
| `locomotion-blend.mjs` | Directional blending, gait phase and stride correction |
| `foot-ik.mjs` | Contact tracking and constrained leg IK |
| `animation-springs.mjs` | Additive inertia and visual recoil recovery |
| `characters.mjs` | Integrate the animation layers using the existing rig and mixer |
| `scene.mjs` | Supply render state without changing gameplay authority |
| `authoring.py` | Improve and generate missing source animation clips |

These are suggested boundaries, not a requirement to create every module immediately.

The processing order should be explicit:

1. Extract render-only movement signals.
2. Restore any previous temporary bone corrections.
3. Evaluate and blend base animations.
4. Apply orientation, stride and inertial corrections.
5. Resolve foot contacts and leg IK.
6. Apply aiming and combat corrections.
7. Resolve final hand/weapon contacts.
8. Render the resulting pose.

Where necessary, the precise ordering of combat overlays and IK can be refined during implementation.

We must ensure procedural bone offsets do not accumulate across frames. All visual state, including foot anchors and springs, should reset cleanly after respawn, map changes and significant network corrections.

## 5. Incremental implementation plan

### Phase 0 — Instrumentation and baseline

Before changing behaviour, make the current system measurable.

- [ ] Introduce a development-only motion debug view showing velocity, facing direction, gait weights and foot contact state.
- [ ] Capture repeatable movement sequences using identical input and camera configurations.
- [ ] Establish animation CPU and frame-pacing baselines on representative desktop and mobile hardware.
- [ ] Document the most visible animation defects.

**Deliverable:** a reproducible comparison environment.

### Phase 1 — Continuous locomotion

The highest-value initial implementation.

- [ ] Replace discrete directional selection with continuous locomotion weights.
- [ ] Synchronise compatible gait cycles.
- [ ] Improve forward, backward, diagonal and lateral transitions.
- [ ] Add bounded orientation and stride corrections.
- [ ] Preserve existing combat animations.

**Deliverable:** fluid multidirectional movement without requiring new animation assets.

### Phase 2 — Ground contact

- [ ] Define foot stance/swing intervals.
- [ ] Implement constrained two-bone leg IK.
- [ ] Introduce support-foot locking and safe release.
- [ ] Handle turns, jumps, crouching and respawns.
- [ ] Validate all six chassis.

**Deliverable:** grounded foot movement with substantially reduced skating.

### Phase 3 — Combat animation polish

- [ ] Introduce inertialised or spring-assisted pose transitions.
- [ ] Improve aiming and upper/lower-body composition.
- [ ] Refine first-person weapon sway and recoil recovery.
- [ ] Add selected transition animations where clearly beneficial.
- [ ] Tune visual motion profiles for individual chassis.

**Deliverable:** natural transitions between sprinting, aiming, firing, reloading and evasive movement.

## 6. Acceptance criteria

The system must be evaluated under real gameplay-like sequences, not only isolated animation previews.

### Required movement tests

Test each of the following across all six chassis:

1. Idle → sprint → immediate stop → reversal.
2. Forward sprint → diagonal movement → circle-strafe.
3. Sprint → 90°/180° turn → fire.
4. Sprint → jump → land → crouch → fire.
5. Reload while moving and changing direction.
6. Take damage → use equipment → die → respawn.
7. Repeat with irregular frame timing and network corrections.
8. Repeat with ten simultaneously visible characters.

### Gameplay and correctness

- [ ] Native movement and collision remain unchanged.
- [ ] No changes to input latency, shot direction, hit registration or weapon timing.
- [ ] Existing native/Myelin replay verification tests pass.
- [ ] Animation changes remain presentation-only and require no new native application profile.
- [ ] No accumulated skeletal offsets, invalid transforms or unreachable locked feet.
- [ ] No persistent weapon/hand separation.
- [ ] Correct behaviour after respawn, teleport-like corrections and map changes.
- [ ] Reduced-motion preferences remain supported.

### Animation quality

- [ ] Transitions remain visually continuous under rapid direction changes.
- [ ] Planted feet exhibit minimal drift when the support constraint is feasible.
- [ ] A provisional contact-error target is at most **2 native world units** during a feasible stance interval, subject to validation against actual character scale.
- [ ] No obvious knee popping, excessive limb twisting or recurrent weapon clipping.
- [ ] Before/after recordings use identical input and camera conditions.
- [ ] Behaviour is stable at 30, 60 and 120 fps and under irregular frame steps.

### Performance

- [ ] Profile ten animated rigs on actual target hardware.
- [ ] Establish an explicit animation CPU budget after the baseline measurements.
- [ ] Avoid unnecessary per-frame allocations and expensive general-purpose solvers.
- [ ] No material regression in frame pacing or input responsiveness.

Human playtesting is essential. The goal is for movement to look more natural **without players perceiving their controls as slower or less precise**.

## 7. Non-goals

This proposal does not require:

- Switching to Unreal Engine or Unity.
- Replacing the Three.js rendering stack.
- Rewriting Rust movement or Myelin verification.
- Full-body physics simulation or ragdolls.
- Runtime neural animation inference.
- Mandatory external AI services.
- A large motion-matching framework at this stage.
- Artificial movement or aiming delays.

These could be considered independently in the future, but should not complicate the initial implementation.

## 8. Recommended first PR

Start with **Phase 0 instrumentation and Phase 1 continuous directional blending**, using the animation assets already present in the repository.

Foot IK, inertialisation and additional source clips should follow as separate, reviewable changes.

This gives us a straightforward way to measure whether each technique actually improves the game, rather than introducing multiple sophisticated systems at once.

The objective is not simply to have more animations. It is to build a coherent motion synthesis pipeline that allows movement, aiming and combat to coexist naturally.

**Keep the simulation deterministic, the controls immediate, and the animation expressive.**