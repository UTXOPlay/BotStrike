# Arsenal and surface audio candidate (#25)

This candidate implements twelve original procedural shot identities, five
mechanism cues per weapon, and metal/concrete/tile footsteps and landings. It is
an automated engineering milestone. Blind weapon/action/surface recognition,
speaker/headphone review and physical-device performance remain unaccepted.
The user is temporarily unavailable for listening; no replacement participant
or listening result is inferred.

## Event and disclosure contracts

Native shot events and existing local weapon prediction retain their original
64 Hz ordering, burst intervals, ammunition and recoil. Mechanism events read
trusted successive native frames: reload start; feed at 82% of the native reload
duration; close only after actual replenishment (including a held shot spending
the newly inserted round); and owned weapon switches. Cancellation, death and
life changes cannot schedule a future feed/close. Empty clicks are local intent
edges, once per pull, including held fire across weapon changes. They assert no
native shot, damage or ammunition mutation.

`MovementAudioClock` reads native velocity, yaw, stance and grounded state using
the same pure stride planner as the renderer. Six static chassis measurements
are bound to the production GLB hashes in `gait-calibration.json`. A step enters
one of the alternating sole support intervals. Running retains the existing
speed > 70% of hero/weapon running speed requirement; walking, crouching and air
movement stay quiet. A landing is a same-life native ground transition.

Service gait phase/cycle/duty metadata is sent only with self, squad or optically
entitled poses. Radio-only revelation and hidden enemies receive no gait phase.
Hidden audio still carries only id, tick, kind, value, self, coarse bearing,
three distance levels and occlusion. For contacts, value is one of three public
surface classes. It carries no actor, exact position, foot side or stable source
handle. The classes intentionally recur across broad public areas.

Remote gait phases interpolate without wrapping backwards on the existing
four-tick render timeline. Anonymous remote contact cues wait for that timeline,
with a 48-event bound and expiry after eight native ticks or 500 ms. Listener,
room, life, hidden-page and mute transitions clear queued contacts. There is no
client pose authority over server audibility. Local gait extrapolation is capped
at four ticks; network jitter and physical output latency still need listening
review.

## Visible surfaces and sound ownership

`shared/ground-surfaces.mjs` supplies both flat ground decals and service material
classification. Metal remains the dock/reactor base; the skyline base uses tile;
spawn aprons use concrete; objective pads use the map's concrete/tile treatment;
the practice floor uses concrete. All new surfaces are planes at y=0 with depth
offset, with no raised steps, collision, elevation or navigation changes. The
new textures preserve the original scenery random sequence.

Every waveform is generated from authored deterministic code, with no imported
recordings. The original five shots and three metal footfalls remain
byte-identical to the frozen V5 baseline at 44.1/48 kHz. New shot identities are
single shots; HELIX's native three-shot burst supplies its rhythm without baking
an extra burst into each sample.

The graph retains the 32 allocated-voice limit, 24-remote ceiling, reserved local
essential capacity and output ceiling from #24. Twelve shot, three impact and
nine contact buffers are bounded; mechanism buffers are lazy, at most 60. The
fully populated 48 kHz cache measures 84 buffers / 1,925,820 bytes. Stereo remains
the default. Experimental HRTF is not accepted by these checks.

## Reproduction and evidence

The concrete receipt set is `docs/acceptance/arsenal-audio/`:

- `image-build.txt`: 191 JavaScript checks, four host checks and the exact native
  binding guard in `deploy/Dockerfile.audio-metadata`.
- `gait-browser.json`: 36 actual skinned-mesh cases: six chassis × 30/60/120 Hz ×
  normal/reduced motion. The running/walking/strafe/crouch/jump/land fixture matches
  492 audible contacts to support phases; maximum sampled sole-vertex height is
  0.111 native units. Native-like trusted frame fixtures are distinct from live
  engine coverage. Reported frame costs use software rendering, not hardware
  performance acceptance.
- `audio-browser.json`: 12 offline cases at 44.1/48 kHz, actual browser voice/mute/
  suspend/disposal checks, full 84-buffer pressure, independent essential cues,
  and the shipping feedback consumer's duplicate/skipped/life/reconnect/contact
  timeline checks. Cache generation time is reported, not interpreted as an
  end-to-end physical audio latency result.
- `image-game-shots.txt`: the actual retained native engine and shipping game
  start all twelve exact sampled weapons, alternating contacts and landing,
  plus body/head/damage feedback. Gait metadata entitlement is checked in native
  public snapshots. Death during a live bot match requires a fresh-life equip;
  the harness retains the original readiness requirements.
- `settings-browser.json`: four desktop sizes and both mobile orientations,
  independent levels, persistence, 44 px controls and shared immersive gate.
- `bound-application.json`: all 23 retained release/spec/guide files match the
  #24 image byte-for-byte; all 20 base layers remain. Native V5 model/profile,
  engine/adapter pair and all historical verifiers are preserved. The three
  final copy layers replace only the web bundle and explicitly listed service/
  shared metadata modules.
- `failed-runs/`: test-fixture missing DOM nodes and concurrent live readiness
  timeout, retained alongside the corrected, passing checks.

Commands: `npm test`, `npm run test:host`,
`node tests/botstrike-gait-audio-browser.mjs`,
`node tests/botstrike-audio-browser.mjs`,
`STORE_URL=http://127.0.0.1:19913 node tests/botstrike-shot-audio-browser.mjs`,
and `node tests/botstrike-audio-settings-browser.mjs` with that same STORE_URL.
Browser commands use the recorded Playwright/Chromium installation. Build from
the frozen context with `docker build --network=host -f
deploy/Dockerfile.audio-metadata -t botstrike:arsenal-v5-4cb119b7 CONTEXT`.

## Remaining acceptance

The separate local identity study is prepared in
`tools/serve-arsenal-listening-lab.mjs` (run from the repository root with
`node tools/serve-arsenal-listening-lab.mjs`, loopback port 19917). It does not
replace the existing #24 direction/range study on 19906. Twelve weapon labels,
five mechanical action labels and three materials each appear in all eight
near/far × clear/muffled × sparse/dense conditions: 160 trials per output.
Optional paired headphone/speaker blocks use participant-code counterbalancing,
repeat identical conditions and require a fresh physical-output confirmation at
the boundary. Mono is an actual output configuration reported by the listener,
not a claim that this study forces the browser graph to mono. Practice references
and volume are recorded; volume and references lock when the study begins.

The target remains centred, with other sound families as side distractors in
dense trials. Fixed isolated repetitions remove native weapon cadence as a clue.
Mechanical actions use fractional weapon variants, and surface trials use
fractional step/landing variants. Within a context, every action class uses the
same weapon and every material uses the same contact kind, so these nuisance
factors do not identify the target class. This design does not fully cross all sixty
mechanisms or establish recognition in live rapid fire. It also does not measure
gait synchrony, network delay, physical audio latency, HRTF, elevation or hardware
CPU. Those existing acceptance obligations remain separate.

The study serves an in-memory bundle and SHA-256 manifest of every imported
source plus the weapon specification, checks that names match native weapons,
and exposes only read-only allowlisted routes. Anonymous JSON downloads remain
on the participant's device; no report-upload endpoint or live match API exists.
Reports preserve interruptions, scheduling/source-admission failures, timeouts,
unsure answers, confidence, reaction times and per-condition confusion matrices.
The final confusion column is unsure; rows are intended classes and columns are
responses. Timings start at trial activation, before the first scheduled sound.
There is no automatic perceptual pass threshold or issue-closing decision.
Reviewers must record their criterion and physical cohort before assessing data.
Automated QA is explicitly labelled zero human observations, including when its
script checks a known answer. A self-reported physical-output checkbox is not
independent human verification.

`acceptance/arsenal-audio/identity-study/` retains the served manifest, five-file
tool/test source binding, seven protocol/server checks, browser measurements and
the compressed **automated** response export. The actual browser completes all
160 single-output trials, exercises all three families at all six viewport
sizes (18 layout cases), the real 15-second timeout, deliberate pause/resize
invalidations, download equality and two emulated touch orientations. It also
checks that a paired session refuses the wrong starting output. Full paired
completion and physical output switching are not browser acceptance claims.
Run `node --test tests/botstrike-arsenal-listening.test.mjs
tests/botstrike-audio-listening.test.mjs` and
`node tests/botstrike-arsenal-listening-browser.mjs` with the recorded
Playwright/Chromium installation. The tool leaves all 30 integrated runtime
source hashes, the Native V5 model/profile and the local game image unchanged.

Do not close #25 from waveform hashes or simulated contacts. Collect blind core
weapon/action/surface recognition at near/far and occluded distances, in sparse
and dense mixes, with counterbalanced headphone/speaker tasks. Review real
reload interruptions and walking/running contacts under network jitter, low
quality and reduced motion. Record confusion, completion time, output device and
physical CPU/latency; report failed trials as well as successes. Current human
sample size is zero. The #24 spatial listening study remains separately open.

This candidate is local and unpublished. Signed commit/push and production
deployment have not occurred. Myelin continues to provide off-chain host replay
verification, not CKB settlement or evidence that a human generated the inputs.

The subsequent #28 integration candidate also corrects service cue ordering when
a reload finishes and a held shot occurs in the same tick. Its regression check
requires reload_close before that actor's shot, without reordering native events.
The frozen #25 image above remains a historical engineering checkpoint; use the
newer integrated candidate for further acceptance. Local predicted firing versus
acknowledged mechanism timing still requires physical/network listening review.
