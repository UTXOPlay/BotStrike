# Native network fairness inspector

`node tools/run-network-audit.mjs --tape /private/room.jsonl --out /private/NEW-audit --ticks 1675,1753`

Run from the repository root. `--out` must be new; without it a new private temporary directory is created. The runner compiles only `botstrike/examples/network_audit.rs`, with `--release --locked`, into `/tmp/botstrike-network-audit-target` (override with `--target-dir`). It never builds into or overwrites `release`. New example/Node inspection code is excluded from the native model digest. No HTTP endpoint, live-room access, game field, rule, profile or signed-save interpretation is added.

The fixed production source model is `4cb119b7638d14fb08cafad9905e9d8bc808d04b233e8d0c4599e6cd79e4ed49`; retained portable profile is `c5a72be9466ddd4efa23aa6574541714c8112510ba7f2d7008dd0849f8a9925d`. The runner checks the exact retained `release/botstrike-engine` and `release/myelin-botstrike` bytes against the existing `bound-application.json` pair and checks the exact engine spec. It does not produce or verify a new signed match. Myelin remains off-chain host replay, not CKB settlement.

## Input and output contract

Input is the actual production tape, unchanged: first JSONL line `{config: <production Config>}`, then `{inputs: [null | Input object | packed tuple; 10]}`. Packed tuple lengths 11, 12 and 13 use precisely production bits, optional practice byte and utility byte (`throw_mode = byte % 3`, `preview_item = byte / 3`). Invalid controls still fail unchanged `Game::step`; the inspector never sanitizes or rewrites them. Limits match production: 194,000,000 tape bytes, 4,096 header bytes, 8,192 frame bytes, 230,400 ticks. Empty tapes fail. Only actual `Game::new(config)` and `Game::step(inputs)` evolve the original replay; no state injection, teleports or HP edits occur.

The runner exports `runNetworkAudit({tape, out, ticks = [], targetDir}) -> Promise<{out, report}>`. `ticks` contains at most 4,096 integer ticks. It writes:

| File | Meaning |
| --- | --- |
| `report.json` | Bounded counts, exact agreement gates, limitations and provenance. |
| `source-hashes.jsonl` | Every source-native post-step `{tick, stateHash}`. |
| `exact-hashes.jsonl` | Every retained-engine `{tick, stateHash}`, followed by its actual `{result}`. |
| `timeline.jsonl` | Selected frames and observed shot frames, at most 4,096, with raw tape seq/view tick, authoritative poses/life, all native events and optional ray witness. |

All files are private 0600 under a 0700 output directory. **The timeline includes hidden enemy positions and must stay in private lab artifacts.** It is unsuitable for public client diagnostics. Stdout is one small summary, not a dump of a match. The report contains no tape path, account or token. The production tape is fingerprinted before and after inspection; source/model/artifact changes abort.

`sourceNativeReplayMatched` requires every tick's exact state hash, final state hash, full trace hash and spec to agree. The exact retained engine is run on the same complete tape. Its frame stream is deserialized with `float_roundtrip`, reserialized using the native `Game` field order, then BLAKE3-hashed. That stream's computed full trace must equal the retained engine's own `trace_hash`; an incompatible serializer or floating point round-trip fails. Source replay and exact engine streams must match **without tolerance**. A cross-build float difference is a failed gate with first mismatch evidence, never a permitted epsilon.

`sourceNativeWitness` additionally requires the runner's own source build, no rejected ray witnesses, no omitted detail frames and no out-of-range selected ticks. A caller-supplied `--binary` is useful for investigation but is explicitly unattested and cannot produce this success flag. Unavailable ray witnesses remain unavailable even when replay matches; a matching replay alone is not fairness acceptance. The runner exits nonzero on a failed gate and leaves its private report for inspection.

Private live `native_frame` observations include `rawLine`, the exact original
engine line, alongside an in-process parsed `state`. Capture schema 2 stores the
raw line without a duplicate parsed state. Rust `frame-hashes` requires that raw
line, deserializes its Native frame directly, and hashes every Game field.
State-only legacy captures fail explicitly with `RAW_FRAME_REQUIRED`; JavaScript
JSON reserialization loses the sign of negative zero and cannot provide that
strict evidence. Latest-state convenience snapshots remain explicitly labeled
JavaScript numeric projections. The actual service regression in
`tests/botstrike-native-raw-capture.test.mjs` preserves original negative zero
through capture JSON and compares every field with the exact retained engine;
it also asserts rejection of the old format. No tolerance or normalization is
used, and the wire state, tape, Native rules and application profile are unchanged.

## Shot witness and authority

Every reported `shot`, `hit`, `headshot`, `kill` and damage accounting event originates in the original unchanged Native simulation. A reconstructed ray is supporting evidence, accepted only when its RNG tail and primary Native damage event (target, head/body kind, raw damage and exact origin) agree. Native kill events repeat damage accounting; they are retained in `events` and are not counted as another hit.

An available ray witness is deliberately limited to exactly one Native shot event in a frame, ARC (0), ION (2) or RAIL (3), one pellet, no splash, no AI dispatch/practice controls in that frame, live phase, no active utility, and no ability/item/interact/drop/buy action or changing hero selection. Native `Game::step` selects AI only when `config.bots[slot] && !inputs[slot].takeover` outside practice. Therefore every bots-capable slot must have an actual `takeover: true` input in the inspected frame; one missing takeover makes the witness unavailable. The original config and tape are never rewritten. Another actor requesting fire or retaining a burst also makes it unavailable. Other frames still retain authoritative events. They must not be relabelled covered ray cases.

Real service inputs repeat the selected hero. A `Some(hero)` is allowed only when
it exactly equals that slot's pre-step `Player.hero`. The Native hero assignment
and HP-cap branch requires `(phase == "buy" || !alive) && current_hero != hero`;
equality therefore executes neither mutation, including a dead slot about to
respawn. The Rust regression compares the entire serialized post-step Game with
the corresponding hero-absent Game in live/buy and alive/respawn cases. Nonlive
frames remain unsupported, as do different hero values even where Native would
ignore a live/alive selection. Real and quiet-clone inputs keep their original
hero fields. `controlProvenance.noOpHeroSlots` records the no-op selections, and
timeline controls retain original hero/buy values. RNG-tail, damage-event,
counterfactual, every-frame hash, full trace, final-state and model/profile gates
are unchanged.

Casual rooms can have `config.bots` all true while all ten authenticated controller inputs override AI on a particular frame. A human-looking roster does not change that Native configuration. `controlProvenance` reports bots-capable slots, actual takeover slots and the strictly frame-local AI bypass conclusion. It does not establish that earlier frames, outages or the entire match ran without AI, nor that a human generated any input. Ten-controlled-seat Tactical acceptance with its actual bots-false configuration remains a separate required validation.

The inspector clones the pre-step `Game`, disables that actor's fire and cancels its pending burst **only on the clone**, and steps the same other inputs. This yields actual Native movement, stance, landing, recoil recovery and scope state before that isolated shot. RNG consumption by the no-fire clone or unequal shooter movement/life rejects the witness. It uses public Native `sight::eye_height`, `recoil::aim`, `movement::accuracy`, `ray_box` and `hit_regions.intersect`; no JS damage or rendering formula is an authority. Public `Game.random` is replayed with production's wrapping LCG, exactly two draws, then compared with the real post-step RNG.

Native fires inside its per-slot movement loop. For an unrewound ray, earlier slots already moved and later slots have not; the witness uses those exact mixed-time poses rather than all final frame poses. Historical poses are retained externally before each real step, with the same 14-pose storage and exact tick lookup/13-tick age cap as Native. Dead historical poses and a different historical life cannot hit a current new life. `tapeViewTick` is the value already admitted into the tape; `rewindTick` is the exact Native history tick actually used, or null for current pose fallback. Neither field proves which tick the server delivered to a socket or which interpolated pose the browser displayed.

The ray includes Native origin/aim/spread/accuracy, every map-cover intersection, ground/range limit, enemy eligibility and hit-region intersections, nearest winner and predicted raw damage. Cover has priority at equal distance; a strictly nearer enemy wins over cover behind it. Actual Native damage events decide what happened, including armor/shield/protection and kill accounting. A geometric candidate protected at shot time can have no damage event.

## Automated evidence and remaining gates

`node --test tests/botstrike-network-audit.test.mjs` records ordinary packed controls through the **exact retained engine**, then independently replays the resulting production tape through the source inspector and retained engine again. The deterministic controller walks actors through existing Neon Docks geometry; it never edits Game state. The 2,104-tick fixture covers ARC/ION/RAIL, peek and retreat into cover, real crouch/stand transitions, Native jump and first reversal momentum, front cover, cover behind two eligible enemy intersections, nearest target, Native kill/respawn and dead/different-life isolation. The accepted rewind age is seven ticks because production advances the frame tick before lookup. Geometric Rust probes separately cover the exact 13-tick boundary, absent tick fallback, packed forms and front/back cover/life guards; their synthetic geometry is labelled and is not a production replay.

The automated fixture uses production deathmatch supply with idle nonparticipants and zero humans. A separate one-frame real Native pair keeps the casual config's ten bots flags true: all ten takeover inputs permit a ray witness, while omitting one permits actual AI movement and makes the witness unavailable. Both tapes must still match every exact-release state/trace hash; available rays must still match the LCG tail and Native events. A Rust predicate test checks the guard for each of the ten slots. These are **not** ten-controller Tactical acceptance matches, impairment measurements, or human/physical input/display validation. Source-native agreement must also be run on the private **actual lab production tape**, alongside server admitted-view/write-history evidence, browser rendered-frame/camera/pose evidence, actual TCP/netem behavior and Native shot/damage events. A valid interpolation view tick need not equal a delivered snapshot tick; compare it against the server's admitted interval and exact Native timeline. Retain raw shot-window evidence and label missing/unsupported/omitted frames explicitly.

Real ten-controller Tactical rounds without AI, measured RTT/jitter/loss/queue asymmetry, disconnect/reconnect and replay/career verification, human peek/cover/directional-strafe and latency judgments, and physical mouse/controller/mobile plus monitor/refresh-rate cohorts remain acceptance gates. Green offline fixtures, synthetic network faults or two automated browser contexts cannot close those gates.

The actual automated v8 baseline tape from private lab `botstrike-network-lab-2Nledz`
was inspected without editing its repeated hero fields. The completed diagnostic capture
contained 4,069 frames including cleanup. Source and exact retained Native state
hashes matched on every tape frame, full trace and final state. Its one ARC shot
at tick 3,223 has a valid ray to slot 5 at distance 344.704, before the cover at
1,037.296; rewind tick 3,217, both LCG draws and raw damage 25 agree with the real
Native hit event (armor 12, health 13). Ten same-hero selections are recorded as
no-ops on that shot frame. Private evidence is in
`live-oracle-hero-NAPs4u/audit` below the network artifact root.

An additional comparison with that old capture's JavaScript-reserialized live
states failed at tick 3: Native negative zero was captured as positive zero.
`live-oracle-hero-NAPs4u/live-agreement.json` records the failed gate. The ray and
exact tape replay do not turn this missing lossless live-state evidence into
acceptance. No float tolerance, zero normalization or field omission is allowed;
new live capture must preserve the original Native bytes to satisfy that gate.


## Private selection admission and final lease observations

New opt-in `native_input.viewAdmissionChecks` version 1 records two separate
service boundaries. `selection` brackets the existing `DeliveryReceipts.admit`
call **before the asynchronous tape append**. Its `requestedViewTick` is the
already normalized arrival view, while `admission` retains that actual call's
receipt tick, original issue/deadline, admitted interval, accepted tick and
reason. The original browser request, arrival admission, selection admission,
final packed tuple and Native witness rewind remain separate fields. A changed
packed view alone does not reconstruct an unrecorded admission or its interval.

`checks` brackets the existing ticket checks after recording (`post_record`,
rewrite pass 0–10) and during final base ACK-candidate selection
(`ack_candidate`). Each entry retains only scalar ticket identity, base/pulse
roles, original generation/life/issue/deadline, result and monotonic brackets.
The source fire ticket can differ from the final packed base sequence. A base
and several pulse fields may share one ticket, so repeated checks of that ticket
are valid observations rather than an ambiguous new admission. Failed checks
and `neutralizedSlots` remain visible. Neutral controls may have no post-record
check; the report labels that boundary `not_checked`, and still requires the
base ACK-candidate check when proving an exact target application.

The bounded observation carries `checksComplete: true`, `checksDropped: 0`, at
most 10 selection rows and at most 1,220 check rows (11 recording passes × 10
slots × 11 possible ticket entries, plus 10 ACK candidates). This does not
expand the recording passes, original 400 ms lease, receipt capacity or Native
rewind/history bounds. No nonce, account, owner token or extra wire field is
recorded. It is private runtime evidence and must not be published as client
diagnostics.

`tools/network-shot-boundary-report.mjs` validates any present observation
strictly, joins the selected base and original-fire leases, checks interval
normalization and the final packed view, and preserves the source archive line.
A partial, malformed, dropped, conflicting or wrong-context observation makes
that selected proof unavailable. For legacy captures with the field absent,
the existing atomic-frame/ray result can remain available, while
`selectionAdmission` and `finalFreshness` explicitly remain unavailable. Old
captures are never relabelled as having the new evidence.

The report calls the captured decision `selection_before_recording`.
`atWriteAdmissionRecorded` and `atWriteReadmissionRecordAvailable` stay false:
there is **no second admission at `stdin.write`**. Final freshness refers to the
observed existing lease checks and conservative full check brackets before the
private observer emit. That emit itself precedes `stdin.write`; its callback
cost and the later physical write instant are not covered by this evidence.
This observation does not establish physical display timing, network fairness
acceptance, a new Native rule/profile, or complete issue acceptance.
