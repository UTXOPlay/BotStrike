# Neon Docks flagship candidate (#14)

Status: **baseline investigation and presentation fix; not an accepted map**.
Human participants: **0**. The requested ten-human demolition study is pending.
The competitive decision gate in #4 is still open; this report does not approve
a competitive queue, new balance numbers or a different round format.

The selected layout is Neon Docks from merged main
`0d8b15130c70ac1f203d0e985d32aca542ddafdb`. Its map object is unchanged, with
canonical sorted-JSON SHA-256
`31c9e2124710e7d895df0fb67498a57264be29cee3d68287f2be4bcb058845bf`.
The measured native candidate is `botstrike-2050-tactical-v4`, model
`881347ed6ce9294c91f9bb82c010b06a2302c769fd2810aef4f910b95dd888a5`.
Evidence is under `acceptance/flagship-map/`; raw synthetic authority keys,
complete tapes and saved production exports are not checked into this directory.

## Reproduce and inspect

Run `npm run audit:map`. The command prints a fresh output directory containing
the bounded request, measured report, complete representative tape, signed
export and verification summary. It builds an **analysis example**, not a new
application engine. Existing engine/verifier hashes are checked before and after.

Set `MAP_AUDIT_REPORT` to that directory's `report.json` and run `npm run dev:map`.
Open the printed loopback URL. The full-viewport plan shows native solids/heights,
relay zones, proposed callouts, planned waypoints, recorded native positions and
standing/crouched sightline samples. Use the tick slider for stored traces; other
cases explicitly show only their planned waypoints. Filtering and PNG export are
local. The server has no live-room or write endpoint.

`deploy/Dockerfile.map-audit` builds the analysis tool on Bookworm while reusing
the exact retained application image. Run it with a writable **bind-mounted**
`/work/output` to retain the report/session after the container exits; run without
network access. Its `APPLICATION_IMAGE` must match the report's native model.
The current analysis image is
`sha256:ab51b5cff0f15ff3f2c86d11e7a1e277e496d0810412bcea243941294afde791`.

## Measurement contract

The 484 deterministic configurations comprise:

- 360 spawn-to-site runs: six chassis × three weapons × ten spawn slots × two sites.
- 48 walk/crouch runs: six chassis × two role-side slots × two sites × two paces.
- 72 rotations/lurks/retakes/retreats: twelve routes × six chassis.
- Four additional Vector dash runs, each with one accepted native dash.

Every position comes from `Game::step`. There is no position injection or
teleport. Site-to-site/retreat cases walk the recorded prelude from a real spawn,
stop, then start their measurement clock. The fixture uses deathmatch supplies
so each selected weapon is legally owned; movement/collision constants are shared
with demolition. It is not a demolition purchase sequence or an economy test.
Other seats are idle, bots are disabled, and there is no incoming fire, reaction
time, network delay or player-body collision in these measurements.

The planner uses a conservative 50-unit grid, eight extra units of obstacle
clearance, four-unit segment samples and a five-unit waypoint tolerance. It
slows for corners and brakes to a full stop. Routes are reproducible references,
not proven fastest paths or a model of skilled human route choice.

Zone time is the first native tick within the actual horizontal 125-unit relay
radius. Pad time reaches the named endpoint; stopped time includes complete
braking. A's marker center lies on a cover edge, so its legal pad is 50 units east
of the marker. B's pad is at its marker center. Treat these as distinct stations;
do not mistake an unreachable marker center for a failed route.

All **484/484 configurations reached**, with zero stalled ticks. All case
measurements, 528 stance-pair queries and 144 contact-pair results are identical
between the local and portable builds, including stored positions. One complete
representative 23,040-tick match has matching state **and per-frame trace hashes**
against each build's exact application engine; signing, verification and result
tamper rejection pass. These are synthetic inputs, not human attestation.

## Timing observations

Fastest zone entry in seconds, out of five spawn slots per role, running with
ION-5 and no ability:

| Chassis | A attack | A defense | B attack | B defense |
| --- | ---: | ---: | ---: | ---: |
| VECTOR | 6.000 | 5.031 | 4.984 | 6.125 |
| PATCH | 7.203 | 6.219 | 6.172 | 7.484 |
| BASTION | 8.281 | 7.234 | 7.172 | 8.641 |
| SPECTRE | 6.453 | 5.453 | 5.406 | 6.625 |
| GLITCH | 6.734 | 5.766 | 5.719 | 6.953 |
| FORGE | 7.484 | 6.484 | 6.422 | 7.781 |

These are configuration counts, not five independent people. The source-derived
table and all weapon/pace rows are in `fastest-zone-table.md` and `timings.json`.
Spawn side 0 is the attacker role and side 1 the defender role; native halftime
swaps the teams occupying those role-side spawns.

For Spectre/ION-5, full-stop A times are 6.953–7.500s for attackers and
5.812–6.719s for defenders. B times are 5.938–6.844s and 7.141–7.656s respectively.
Fastest zone access gives defenders about 1.000s at A and attackers about 1.219s
at B. Spawn-slot spread reaches about 0.906s. This merits review with role/hero
assignment and real defensive holds; it is not evidence that either side must
win. Planting takes additional native time, and utility/aim choices are absent.

Representative Spectre route times, ending at rest:

| Route | Seconds | Review question |
| --- | ---: | --- |
| A → B through mid | 8.812 | Can a defender communicate and rotate before the plant/retake window closes? |
| A → B outer | 11.156 | Does the alternative offer enough angle isolation for its added time? |
| B → A through mid | 9.984 | Is north-mid exposure an understandable tradeoff? |
| B → A outer | 13.750 | Is the outer route a useful save/flank rather than a needless detour? |
| A approach → west lane → attack spawn | 7.000 | Can an entry retreat without crossing an unavoidable held line? |
| B approach → east lane → defense spawn | 7.188 | Is a failed retake's exit readable and reachable? |
| A lurk via west / approach / north mid | 11.312 | Does the route create a distinct useful angle? |
| B lurk via south/east mid and east lane | 16.156 | Does this long flank contribute before the round resolves? |
| A retake via north mid / approach | 8.453 | Can information and flash entry address the held angles? |
| B retake via east lane / approach | 7.719 | Can the retake survive the open approach? |

The four Vector dash cases save 0.703–0.719s against their matched running cases.
This measures this controller and clear-path release state, not unrestricted
dash benefit or hero balance.

## Contact and angle exposure

There are 144 paired route combinations: the ten direct spawn routes per role
plus the two traced lurk/retake variants per role. Contact uses all 14 authored
head/body samples and native cover intersection. The earlier arrival holds its
last measured pose. Geometry yields potential contact in 90 pairs; the reference
camera yields contact in 88. The latter uses vertical FOV 80, aspect 16:9, near
0.5 and far 9000. Independent `THREE.PerspectiveCamera` projection reproduces all
288 directional first-camera timestamps exactly.

The earliest reference-camera opportunity occurs at tick 19 (0.296875s), about
2672 units apart: attacker spawn slot 2 going to B versus defender slot 5 going
to A. The reverse direction first sees at tick 24. This is scripted optical
opportunity; it is not human identification, reaction, a measured hit or network
peeker advantage. Review long sightlines and startup protection before accepting
the map, including whether a player can act before becoming exposed.

Standing anchor exposure below is sampled against the other named anchors,
not a count of actual opponents. Partial samples matter at cover edges.

| Proposed callout | Clear sampled approaches | Counterplay / fallback to exercise |
| --- | --- | --- |
| Attack Spawn | B pad, south mid, B approach | Check the long B line; leave the spawn instead of relying on it as a safe reset. |
| Defense Spawn | A pad, north mid | Review the long A hold and the east-lane exit. |
| A Plant Pad | Defense spawn, north/west mid, A approach | Use the adjacent cargo as cover, isolate a line with smoke, retreat toward A approach/north mid. |
| B Plant Pad | Attack spawn, south/east mid, B approach | Review wide crossfire exposure; isolate entry and retain the east-lane fallback. |
| West Lane | East mid | The service/cargo solids isolate several lines; test a deliberate peek and the return to attack spawn. |
| East Lane | North/west mid; 13/14 toward A approach | Test the cross-map angle and retreat to defense spawn. |
| South Mid | Attack spawn, B pad/approach | Test spacing and smoke isolation before committing to B. |
| North Mid | Defense spawn, A pad, east lane; 6/14 toward A approach | Review the partial edge peek, scan and fallback toward defense spawn. |
| West Mid | A pad, east lane | Test the rotation crossfire and return through A approach. |
| East Mid | B pad, west lane; 13/14 toward B approach | Test whether the alternate B angle justifies exposing west lane. |
| A Approach | A pad/east lane; 6/14 toward north mid | Pair flash/turn-away/solid-cover responses; exercise the measured west retreat. |
| B Approach | Attack spawn, B pad, south mid; 13/14 toward east mid | Pair smoke/scan responses and preserve a retreat through east lane. |

All twelve IDs/coordinates are in `tools/map-audit-protocol.mjs`. Names are
proposed stable English callouts; human review and #28 communication integration
remain open. These observations do not assert that all useful corners have been
reviewed or that every proposed response already works in human play.

## Geometry and presentation decision log

| Decision | Evidence and reason | Rule/profile effect |
| --- | --- | --- |
| Retain existing Neon Docks layout for baseline | Routes and early-contact/site differences need ten-human interpretation before changing lane lengths or cover. | No map/rule change; no accepted map revision is claimed. |
| Confine cover decoration to native boxes | 30 of 7,392 critical rays disagreed by more than the declared 3-unit tolerance. Sub-unit protruding ribs/panels magnified into roughly 3–12 units along grazing rays. | Presentation fix only. |
| Give every solid cover type an opaque native-box core | Decorative planter cavities must not suggest a shot opening inside a native solid. | Presentation fix only. |
| Keep coplanar detail readable | Cached depth-biased materials preserve surface pigment/signs; mobile batching retains a separate decal batch. No extra opaque silhouette extends outside the native box. | Native collision, shots, inventory and signed outcomes unchanged. |

After the fix, desktop and touch batching each have **0 mismatches in 7,392
critical rays**, plus zero mismatches in 1,152 additional sampled rays across all
three combat maps. This is mesh/ray geometry, not pixel recognition or every
possible aperture. The complete 159-test JS suite and four host tests pass in
the presentation build. The fixed game image passes all six viewports, real
native movement/fire paths, landscape/fullscreen entry and instance preservation
after fullscreen exit. Those browser checks use software rendering and are
functional evidence, not physical-device/high-refresh acceptance.

The presentation image
`sha256:115780e4753870d1c2fb7a94203daf2ca6ef7f3b1744b85de9272e60b270bb6a`
preserves all 19 layers of base image `79c5d17e…` and adds one web-content layer.
Its exact native pair and runtime libraries remain unchanged, as does portable
profile `b8efb5123d1dc99dcf7add70c4069f22d4a320378653c5ff67c1c0169a7d9886`.
`Dockerfile.presentation` refuses changed native/adapter/backend sources against
the recorded binding. Production has not received this candidate.

## Human protocol before layout tuning

Recruit ten actual participants with anonymous session IDs. Record observed
participation separately from signed-input verification. Myelin provides
off-chain host replay, not CKB settlement or evidence that a human generated an
input. Synthetic QA and bot rounds do not contribute to human sample sizes.

Before starting, fix the exact rules/profile/image/layout and record input
device, display size/backing resolution, FOV, quality, frame-rate distribution,
self-reported experience and network measurements. Cover the six required
viewport sizes and FOV 65/80/95 across the wider device/readability study; record
which conditions the ten-player session actually includes. Include mouse,
touchpad, touch and controller cohorts where available; a missing cohort remains
missing. Use separate network blocks near baseline, 80–100ms and 150–180ms RTT,
recording actual RTT/jitter/loss rather than lab labels alone.

Use fresh private demolition matches with all ten people connected and ready.
Record each round's side, slot, hero, weapon, purchases, utility, native inputs,
objective result, first encounter, damage and fallback/save decision. Preserve
actual native round format and halftime. Counterbalance initial sides and two
mirrored compositions across four complete matches (ABBA); include all six
chassis across the composition blocks. Record actual weapon choices and economy
instead of granting inventory through an unrecorded override. Short controlled
fixed-weapon tasks can use the existing native practice/deathmatch supply modes,
but their results remain separate from demolition decisions.

Current casual service behavior can cover inactive/disconnected seats with AI.
Audit takeover flags, exclude or mark contaminated intervals, and never describe
such a session as human-only competitive play. Human-only competitive eligibility
and bot participation need the #4/#20 decision and matching implementation.

Run paired entry/hold/retake exercises from `utility-interactions.md`, exchange
attacker/defender roles, and annotate each participant's response/explanation.
For each named anchor, review an exposed angle, a reachable fallback and utility
counter-action. Inspect early long-range contact and spawn-slot order explicitly.
Record attempted saves; economic benefit remains subject to #18's contract.

Exit criteria fixed before collecting outcomes:

- Ten observed people and stated completed round/match counts; no fabricated
  missing devices, skills or network cohorts.
- No unresolved reproducible route/input/cover mismatch or exposure before the
  participant can control the game. Review exact replay/camera ticks for incidents.
- Each anchor and strong utility pairing has a recorded human response and
  explanation; confusion remains a finding requiring an iteration.
- Report per-side/hero/weapon/skill results with denominators and uncertainty.
  Repeated rounds from the same people are not independent participants. A small
  cohort cannot establish broad hero balance or a narrow target win-rate band.
- Make a documented retain/revise decision for the early contact, B timing and
  long-flank findings. Any material layout change needs a new native version,
  exact profile, preserved old verifier bytes and comparable before/after cases.

Only then can an accepted map revision and #14 closure be proposed. Human
recognition, physical input/network evidence and related #4/#9/#10 gates are not
replaced by this automated report.
