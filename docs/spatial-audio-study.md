# Spatial audio baseline and study (#24 / #25)

Status: frozen baseline plus a private presentation candidate. No physical
listening observations have been collected, and no spatial renderer has been
selected from human evidence. The retained V5 inventory/economy image preserves
the old baseline; the separate audio image changes only its presentation layer.

The service's authorized remote cues contain eight-sector world bearings, three
loudness bands and a solid-cover muffled flag. Distance includes height, but no
height classification is transmitted. Step/land range is 600 units and other
movement/weapon cues 1300. Smoke/flash/radio reveal do not themselves block sound;
a dead seat listens only from an authorized living teammate. Without such a
viewpoint it receives no hostile cues. Native event origins remain private.

Playback converts the authorized bearing and current listener yaw to a sine
stereo pan. This loses front/back distinctions; it is not HRTF. Sample playback
uses a 900/12000 Hz muffled/open low-pass and hard event gain changes. Synthesized
pulses instead lower their pitch when muffled. There is no accepted elevation
renderer or continuous path occlusion. These limitations are test hypotheses,
not grounds to send exact hidden positions to the browser.

Current resource policy caps voices at 32 with admission by arrival order. There
is no reserved local-essential budget or stealing priority. Remote steps have a
140 ms global gate; step actors also have a 240 ms gate, and anonymous remote
cues share the fallback actor key. This can collapse multiple hidden footsteps.
Five weapons have authored procedural samples; seven use oscillator cues. Shared
metal-like step/landing synthesis does not establish map material identity.
These are candidates for #24/#25 regression fixtures and controlled mix tasks.

Before choosing a new renderer, use balanced randomized baseline trials on real
headphones and stereo speakers. Record anonymous participant/device/OS/browser,
hearing/accessibility preferences, known output mode, gain and room conditions.
Do not infer output mode from a browser label. Test eight directions, the three
permitted distance bands, clear/muffled conditions and single/multiple sources.
Use the same source content and level policy in baseline and candidate blocks.
Ask front/back, direction and distance separately; unsupported baseline elevation
must be reported as unsupported, not scored as a missing response.

Include listening while turning, authorized teammate spectator switches,
smoke/flash/reveal transitions and a complete audio suspend/resume/volume cycle.
Record per-condition confusion matrices, response time, confidence, missing
cohorts and sample sizes. Include essential local reload/empty/damage cues under
nearby automatic/burst fire. A shader/low-quality setting or reduced-motion choice
must not silently remove authorized sound. Human blind weapon/action-class tasks
and physical output evidence remain separate from waveform differences.

Implementation gates: strict allowed wire fields and out-of-range rejection;
bounded voice/sample memory with local priorities; no duplicate reconnect events;
clean disconnect/suspend/resume; renderer fallback, accessible level controls,
and measured headroom/CPU. A future virtual source must use only permitted
coarse direction/range/elevation bins and cannot recreate a hidden actor's exact
position or stable identity. Any additional precision needs an explicit policy
and disclosure tests. Cosmetic audio work must retain the exact V5 native pair.


## Candidate and measured software evidence

The frozen baseline is `tools/audio-baseline-v5/`; its manifest binds the four
original source files to inventory image `dae1966422e99b9e97f1d99ebb13e739af402479565c626b525dd652ede9eca5`.
The candidate is `8b31fe878288e7c92615feedc20363162fedb46a577ec4d3e62dd1b865849673`.
All 19 base layers are retained, with one new dist layer. Engine/verifier bytes,
backend and native model remain bound; the application profile stays
`c5a72be9466ddd4efa23aa6574541714c8112510ba7f2d7008dd0849f8a9925d`.
Myelin still verifies off-chain host replay, not physical listening or CKB settlement.

Default playback remains stereo. An experiment-only horizontal HRTF route exists
in the listening lab; it uses unit-radius virtual sources from authorized coarse
bearings, zero height, no distance rolloff, and the existing server level. No new
wire coordinates, stable enemy identity or elevation bit is added. Missing HRTF
or panner parameters fall back to stereo, then an equivalent center-level mono
route. Effective fallback modes are recorded separately from HRTF trial results.
The [W3C PannerNode specification](https://www.w3.org/TR/webaudio/#PannerNode)
defines the rendering interface; the [WaveShaperNode specification](https://www.w3.org/TR/webaudio/#WaveShaperNode)
defines the curve mapping used below. API support does not prove physical
front/back identification.

The mixer counts retiring voices in a strict 32-voice budget. Remote events can
use at most 24 slots; higher-priority local feedback can retire lower-priority
voices with a 4 ms fade/5 ms stop. Replacements wait for end rather than exceeding
the allocation cap. At most eight jobs wait, and jobs older than 80 ms expire.
Room/life/authorized-spectator boundaries clear old voices and queued world cues;
the boundary tick is dropped because the unchanged wire has no listener tag.
Turning pans existing authorized tails smoothly. Anonymous footsteps no longer
share a global or fabricated-actor cooldown. The remaining cadence is not yet
calibrated to rendered sole contacts; #25 remains open.

A memoryless ceiling is linear below .9 sample magnitude and bounded at .95,
without a compressor look-ahead or oversampling. This prevents full-scale sample
overshoot in the measured graph; it is **not a measured DAC true-peak guarantee**.
Source admission priority is also **not proof of perceptual unmasking**. Nearby
weapon/step mixes and local essential cues still require the blind physical task.
Occlusion uses the existing per-emission low-pass/level; continuous acoustic-path
tracking and supported elevation are not claimed. Separate persisted weapon/
movement and confirmation/alert levels preserve the existing master setting.

Receipts are in `acceptance/spatial-audio/`. The 44.1/48 kHz coherent-overload
fixture sends 100 remote shot requests followed by local damage/hit. Baseline
admits 32 remote voices, drops both local samples and exceeds full-scale samples;
the candidate admits 24 remote plus both local samples, with no >1 samples. Its
11 buffers occupy 377,508/410,888 bytes, plus the 4,097-entry ceiling and bounded
node/job overhead. A real browser context exercises preemption, anonymous
simultaneous steps, mute, suspend/resume, listener reset and disposal; peak
allocated voices is 32. Offline wall times are recorded, not interpreted as a
physical real-time audio CPU budget.

All 177 JS and four host checks pass in the presentation build. No native rebuild
was performed. Actual game checks retain all five original sampled weapon,
footstep, landing and confirmed impact checks. An initial DPR-1 software-renderer
check timed out at a 1.5-second sample deadline; it is retained. The functional
check now uses DPR .5 and an explicit five-second Node condition, not a latency
claim. New audio sliders have 44 px targets and pass six viewport/persistence
checks. Physical frame/audio latency remains a separate gate.

## Run the implementation-independent listening task

Run `node tools/serve-audio-listening-lab.mjs` and open its loopback URL. Its HTTP
allowlist serves static study content only, with no match API, POST collector or
report upload. Responses stay in the page until the participant downloads JSON.
Start requires a real audio gesture. Record output/device/room preferences and an
anonymous code; do not change gain/output midway. Resize, hidden page, pause or a
scheduling stall invalidates a trial and preserves that failure in the export.

The baseline block has 48 coarse conditions: eight directions, three range bands
and two occlusion states, with 24 deterministic distractor conditions. Optional
candidate-stereo and experimental-HRTF blocks follow it in a counterbalanced
order; the requested renderer name is not shown during trials. Baseline versus
candidate compares whole pipelines. Candidate stereo versus HRTF isolates the
spatial-route difference more closely; mixer changes confound a direct baseline
versus HRTF causal claim. Each target consists of three rifle samples; footsteps
are distractors. Front/back, direction, range and occlusion have separate answers,
including UNSURE, with confidence and submission latency. Submission latency
includes decision and button-entry time; it is not pure auditory reaction time.

Reports contain confusion matrices, invalid/timeout/unknown counts, renderer
fallback and per-trial timing. Automated QA is explicitly zero human observations;
self-reported downloads still need physical/reviewer confirmation. No between-
person confidence interval is inferred from one person's repeated trials. The
current human sample remains zero. Physical headphone/speaker listening, useful
mixing, long-stall behavior, low-quality/reduced-motion cohorts and accepted
real-device CPU/headroom budgets remain gates before closing #24/#25.
