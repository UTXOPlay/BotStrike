# Private real TCP matrix

`tools/run-network-matrix.mjs` is an opt-in automated engineering driver. It runs
real application HTTP/WS bytes through owned Docker receiver-ingress IFB/netem,
two independent Chrome processes, and eight independent Node actors. It does not
add an input bypass, assign a pose/HP/RNG, alter the Native profile, or count
client muzzle flashes as hits. Import and `--list` start no container or match.

Current reports use schema 3 and explicitly bind envelope protocol 2 / input ACK
version 1. A v1 application image is ineligible. Source binding includes the
shared InputDelivery module imported by Node actors, in addition to the other
driver/helper files. Schema-2 C-image reports and later host-only navigation
rechecks remain historical evidence; they are never rewritten or resumed as v3.

```sh
node tools/run-network-matrix.mjs --list
node tools/run-network-matrix.mjs --application-image sha256:EXACT_IMAGE_ID --case rtt-0-loss-0
node tools/run-network-matrix.mjs --application-image sha256:EXACT_IMAGE_ID --case rtt-50-loss-1,asymmetric-b-upstream-180
node tools/run-network-matrix.mjs --application-image sha256:EXACT_IMAGE_ID --resume-from /PRIVATE/OWNED/network-matrix-OLD/matrix.json
```

Omit `--case` for the complete catalog. `--seed` pins its recorded netem seeds;
`--tool-image`, `--artifacts-root` and `--out` select explicit tool/artifact
locations. The default artifact base is
`/home/arthur/.codex/artifacts/botstrike-network-20261108`, with a new private
owned subdirectory per invocation. `--out` must name a new directory. The lab
manager also supports `artifactsRoot` / `labRootBase` or
`BOTSTRIKE_NETWORK_LAB_ROOT`; ordinary manager users retain the temporary-dir
fallback. Do not delete another run's data to make room for this matrix.

For development, supply `--dev-source /ABSOLUTE/BotStrike` as well as the explicit
application image. This binds host files read-only and labels the report mutable
DEV. A passing DEV run cannot supply final immutable-image acceptance. The driver
resolves image references once to immutable Docker IDs and passes those IDs to
every case. It compares actual in-container Native engine/verifier/spec hashes
with the retained exact local pair before any source-native oracle claim.

## Default cases and actions

The default catalog contains 31 cases:

- Twelve RTT 0/50/100/180 ms × packet loss 0/1/3 percent combinations. The RTT
  request is split equally between upstream/downstream; each browser shoots in
  both shooter/target roles.
- A-high/B-low and B-high/A-low 180 ms cases, separately symmetric and
  upstream-only/downstream-only.
- Normal jitter and an explicit 180 ms policy-edge jitter investigation;
  Gilbert-Elliott burst loss; 128 Kbit/s uplink and 256 Kbit/s downlink.
- A one-second upstream outage with a 128 Kbit/s recovery backlog, three-second
  bidirectional outage, and twelve-second outage crossing heartbeat expiry.
- Actual owned-container bridge disconnect/reconnect with a different bridge IP;
  a real frozen/thawed renderer using CDP lifecycle; a 30 FPS preference with
  fourfold CDP CPU slowdown; and ARC/ION/RAIL, multiple-target and real death/
  new-life controls.
- Mandatory ten-controller Tactical outage/ownership/life/purchase/departure
  recovery. Full Tactical match completion and sealing remain a separate
  mandatory open gate.

Every browser case first navigates with zero shaping along known production map
waypoints. It then applies the requested profile and performs real ARC trigger
press/release in A/B roles, crouch/stand, jump, reversal, target retreat behind
existing cover, an actual cover shot, and peek markers. The arsenal case moves
an additional Node target through normal controls, exercises ION and RAIL, and
waits for actual Native death, a different life, and fresh positive control.
Movement/stance markers prove those controls and observed states; they do not
claim that every posture transition also contains a ray-audited shot.

Slots are resolved from the real balanced join: A=0, B=5, Node actors in join
order occupy 1,6,2,7,3,8,4,9. The second enemy is resolved by actual slot 6, not
by an actor name suggesting that slot. Public self poses guide navigation; only
currently authorized rendered target poses or declared public map anchors guide
browser aim. Full private Native state is read after capture for audit only.

The browser cohort uses full Chrome, a verified hardware WebGL renderer, a
1280×720 CSS viewport, requested DPR 0.5 and a 30 FPS cap. Actual browser version,
launch flags, canvas backing size, GPU parameters, focus/visibility and measured
callback intervals are recorded. CPU slowdown is a browser scheduling fixture,
not simulated packet delay. The low-FPS case must observe at least twenty raw
render intervals with median at least 25 ms; choosing a preference alone cannot
pass it. This bounded backing cohort is not a 1080p/4K physical display result.

## Admission, recovery and Tactical assertions

The receipt limit remains the existing absolute 400 ms from issued state. Arrival
of a newer sequence or another ACK does not extend it. The analysis correlates
actual Native packed movement/actions with the accepted WS receipt's original
deadline and rejected reasons. It checks all captured active-control frames, not
only selected screenshots. Latched actions additionally require each final
`pulseTickets` field's original `sourceSeq`, receipt generation and absolute
deadline to match its original `input_arrival`; a newer neutral packed sequence
cannot lend its deadline. Missing pulse-origin observations fail current cases.
Fire witnesses join browser input using the original fire source sequence even
when the final packed sequence is a later neutral. HTTP purchases use their own successful
`purchase_arrival` request ID and final `native_input.purchaseTickets`, including
item/life/generation/issuedAt/deadlineAt, and a matching Native `buy` event. A WS
ACK is not substituted for a purchase ticket; an HTTP 200 alone is not proof of
a Native purchase. Existing same-slot pending-purchase overwrite semantics are
preserved.

Fault cases request release of movement/fire during the actual impairment,
require a fresh post-recovery neutral input with a Native ACK, reject replayed
old held controls, then require a deliberate new positive movement with a
Native ACK. Heartbeat outage requires an actual new socket generation. Any
necessary Resume is an explicit recorded post-recovery user action, after the
neutral recovery ACK; steady-profile pauses are failures. Frozen-tab release is
labeled as driver keyup intent until the renderer actually thaws. The overall
recovery observation budget is sixty seconds; this is a fixture timeout, not a
competitive-play latency promise. The 400 ms authority boundary is unchanged.

Recovery selects a real post-restoration sent neutral sequence whose public
`state.inputAck` names that exact sequence, tick and life. The ACK must match the
current socket, controller, room, life and proof epoch, including a fence after
same-socket resync. `last_seq >= requested` and AI progression never establish
application. The private `input_ack` observation is independently joined to the
fresh base receipt, final packed input and exact Native frame. A preview/throw
selection in packed field 12 is configuration; with no item/action it does not
make a neutral input active. Real movement, modifiers, fire, item, weapon,
purchase and practice controls retain their action classification.

New browser matrix runs also enable the local recovery observer. Fault recovery
requires an original paused-neutral send after a fresh page-clock restoration
barrier, a local epoch newer than the unpaused fault baseline, and an exact-byte
CDP join to the same public ACK. A new page read immediately before manual Resume
must still show that current paused epoch. A delayed CDP callback cannot move an
old send past restoration; a same-socket local watchdog trip invalidates earlier
proof even without a service resync. Normal unpaused shot-release ACKs use their
existing action checks and cannot substitute for this paused recovery barrier.
Missing diagnostics, stale proof or observer overflow fails the new recovery
check. Source binding includes the observer and recovery helper; old C/D2 reports
remain historical and cannot be resumed under this changed binding. This is a
host-observer correction, with no application, wire or Native-rule change.

The Tactical case creates a normal private demolition lobby, selects unique
heroes within each team, joins ten authenticated Node controllers and readies
all ten. It hard-asserts the actual Native header has ten `bots=false` values.
It first freezes the private receipt used by an input already proven applied by
an exact ACK. WS input continues with new receipts for an unshaped 600 ms wait;
the recorded new-challenge count must stay below 24. The same-context HTTP buy
must then produce an actual `expired` receipt rejection. This is separate from
the outage's obsolete purchase, whose `unknown` or `expired` rejection is
recorded without substituting for the strict known-receipt expiry test. Neither
opaque freeze handles nor traces expose the raw nonce, owner token or cookie.
It also checks a successful fresh purchase with Native event, duplicate socket/explicit claim revoking the
old owner, positive control by the new owner, normal round/new-life transition,
old-life purchase rejection, another actual fresh purchase, ten explicit leaves,
a real incomplete-room cancellation and capacity release. Four additional normal
Node guests probe capacity without starting another Native match: three keep
waiting lobbies, a fourth must receive actual capacity rejection before the ten
Tactical departures and then create a replacement lobby after cancellation.
The result distinguishes these four probe guests from the ten match controllers;
this is one concrete capacity boundary, not unrestricted multi-room stress. Cancellation must not produce a verified
incomplete match. Complete Tactical match/sealing is reported `mandatory_open`.

Casual configuration remains bots-capable. Native only skips its AI branch for
a configured bot slot on a frame with real packed takeover bit 256. Every combat
measurement interval must contain every frame and all bots-capable seats must
have that bit. Warmup and fault gaps are reported separately, including the
number of AI-eligible frames; they do not establish global no-AI gameplay.

## Evidence and verdicts

Each owned case keeps raw tc qdiscs/filters, `nstat`, `ss`, requested profiles,
seeds, transition generations, browser traces, Node traces, private runtime
observations and the actual production-format tape. Profile replacements discard
queued packets and reset counters. Samples are captured before reset as well as
after restoration; counters from different qdisc handles are not cumulative.
Configured packet loss without any observed real netem drop fails the case.
A fixed netem seed does not freeze TCP packetization or application timing.

Browser raw ephemeral subscriber samples supply n/p50/p95/p99/max for application
RTT, exact matched-sequence input ACK latency, snapshot delivery gap/age,
interpolation age, prediction correction, actual draw callback interval and main
thread long tasks. A sample is one original observation, never a report-window
percentile inserted as raw latency. Action correlation records CDP sent input,
same-socket/owner/room/life exact explicit ACK observation, the exact recorded authorized
aim presentation, and render observations drained after sending. Buffered drain
order does not prove that a callback occurred after the send. A gesture's fire
source sequence and a later exact release/stop ACK sequence are distinguished;
an unobserved requested sequence is never described as applied. CDP observation elapsed
wall time is an estimate, not one-way transit or exact JS latency. A rendered
client sequence is a request observation, not a Native ACK. Full browser clock
evaluation brackets and raw source traces remain available privately.

Every tape is replayed by unchanged `Game::new`/`step` and the retained exact
`release/botstrike-engine`. All per-frame source/exact state hashes and full tape
trace/final hash must match. The inspector also hashes every actual captured
runtime Native state using the same Rust serializer and the original engine
`rawLine`, never a JS parse/stringify of its state; that consecutive prefix
must match replay through every measured case tick. Legacy captures lacking
original lines remain ineligible for exact state proof;
`JSON.stringify` loses Native negative zero. A possible unsent shutdown
tape tail is counted explicitly and cannot support measured gameplay claims.
Ray witnesses retain their conservative support: isolated ARC/ION/RAIL shots,
actual RNG-tail and Native damage-event agreement, no unaudited side effects,
and all configured bot slots taken over on that shot frame. Required action
shots with unavailable witnesses fail coverage rather than count as audited.
Client cosmetics never substitute for Native shot/hit/death/buy events.

Case status is `passed`, `failed`, or `unsupported`. Missing implementation,
failed controls/ACKs, expired authority, broken routes, missing artifacts, dropped
capture, hash mismatch and unavailable required shot witnesses are failures.
An actually unavailable lifecycle API is explicitly unsupported, which keeps the
matrix non-green. Policy-edge profiles are allowed to fail; the tool does not
reclassify them as supported competitive conditions. A partial selection remains
`incomplete` while default cases are pending.

`matrix.json` contains only an auth-free/pose-free resumable summary, with exact
application/tool IDs, source-file hashes (all mounted files/assets in DEV), catalog/seed and private evidence paths.
Detailed `matrix-case.json` and raw traces remain private. An integrity manifest
hashes all private case sources; resume rechecks the case metadata, manifest and
every raw file. It reuses only passed cases at the identical complete binding.
Any source, image, tool or seed change requires fresh evidence. Failed and
unsupported cases run again; unrelated owned data is never removed.

Each run and its resumed roots share a 4 GiB aggregate cap and reserve at least
2 GiB free filesystem space. The driver checks before cases and every two seconds,
rejects symlinks, bounds individual artifacts to 512 MiB, limits reports to 8 MiB,
and reserves 64 MiB of the aggregate budget for orderly cleanup. Each case has a
five-minute action timeout; individual tools and replay have their own finite
limits. Artifact exhaustion fails, retains existing source evidence, and stops
the matrix. Capture drops are invalid evidence, not log rotation or success.
Docker cleanup is restricted to created IDs with matching ownership labels.

## Current gates

Focused helper tests establish bounded profiles, analysis/receipt correlations,
resume privacy/integrity and actual interface-filter planning. The separate
waiting-lobby topology check demonstrated a real IP change, unchanged published
ports and automatic Node socket recovery without starting a Native match. These
checks do not establish that the 31-case engineering matrix has passed.

Even an all-passed engineering matrix keeps `acceptanceComplete:false`,
`networkAcceptance:false` and `humanParticipants:0`. Its cancellation-based
Tactical case requires separate complete ten-controller match/sealing receipts;
immutable D2's independent healthy and fault-completion receipts are recorded in
[network quality progress](network-quality-progress.md). Human A/B peek/cover
latency dispute review, physical mouse/controller/mobile and 60/120/144 Hz
display cohorts, real Internet conditions and the operator's supported-threshold
decision remain separate gates.
Neither #12 nor #26 is closed by generating this tool or by green helper tests.

```sh
node --test tests/network-matrix-profiles.test.mjs tests/network-matrix-analysis.test.mjs tests/network-node-actors.test.mjs tests/network-change-plan.test.mjs tests/network-lab.test.mjs
```

The initial raw-line DEV `rtt-0-loss-0` case completed 4,085 captured Native frames
and tape frames with exact source/retained-engine/runtime hash agreement, no
unconfirmed tail and no capture drop. Its three required ARC gestures produced
three Native shots: A→B, B→A, and production cover priority. All three ray
witnesses had matching RNG tails and Native damage events; every measured combat
frame had ten takeover bits. Nine AI-eligible warmup frames were outside that
window. The report remained `incomplete` with thirty cases pending and quality
source/image provenance explicitly unbound.

That DEV result predates the separate per-action pulse-ticket correction and
the current mandatory `pulseTickets` analysis gate. A
normal-input case does not exercise whether a queued pulse can borrow a newer
neutral receipt. Its passing sequence/receipt analysis must not be used to close
that recovery question. Later server/tool revisions require a new binding and
new evidence; do not relabel this historical case as a newer immutable run.

## Closed raw trace archives (matrix format 2)

The measured 4,194-tick DEV case occupied 126,997,468 bytes. Thirty-one copies
would occupy 3,936,921,508 bytes, leaving only 290,936,924 bytes below the existing
4 GiB budget minus its 64 MiB cleanup reserve. At that case's observed byte rate,
this is approximately 150 additional seconds across the entire catalog. The
mandatory Tactical round transition and impairment/arsenal cases require more
headroom than a repeated zero-impairment projection establishes.

After all owned application/browser/Node writers close and analysis/replay settle,
`network-trace-archive.mjs` serially archives only the case's allowlisted original
runtime, browser, Node and production-tape JSONL files. Derived oracle JSONL stays
unchanged. It never operates on live/changing files or the original directory of
an external case. A successful archive does not change the already measured
samples, input bytes, replay hashes or case verdict.

Each `.jsonl.gz` has a private `.gz.receipt.json` containing original byte count
and SHA-256, compressed byte count and SHA-256, source identity and run ID. The
case's `raw-archives.json` records every completed mapping. The writer fsyncs the
gzip, fully decompresses and hashes it, reads the original again and checks its
hash/stat, publishes the archive and durable receipt, verifies the published
compressed hash, then checks source identity again before unlinking the original
filename. Smaller traces go first to free space before the large runtime trace.
Each pipeline stage has a 64 KiB queue, one file is written at a time, and both
original and compressed files retain the 512 MiB bound. Temporary output must fit
the existing aggregate budget and filesystem reserve; neither limit is raised.

Compression, space, source-change or integrity failure marks the case failed and
retains the affected original filename. Earlier files that already completed
this protocol remain recoverable from their verified gzip/receipt. An interruption
can leave a partial index, a duplicate original/archive, or a staging file; these
states do not count as passed. The tool never overwrites an existing index or
repairs an interrupted case implicitly. Failed/partial cases need inspection and
a fresh owned case for rerun. Their existing bytes remain evidence.

The evidence manifest includes the archive index, individual receipts and every
gzip. Resume requires a complete archive index, rechecks both compressed hashes
and full decompressed original hashes, and rejects an unexpected remaining raw
filename. The matrix binding includes the archival module SHA. Format 2 rejects
older reports; source/image/tool/seed changes continue to invalidate reuse.
Public summaries contain archive counts, byte totals, capture limits and the index
digest, without raw trace objects. Runtime bytes are also bound to the analysis
input hash, tape bytes to the exact replay's tape hash, and browser bytes to the
closed browser trace receipt.

For replay, first verify the case with `verifyClosedArchives()`. Restore the
needed file into a **new mode-0700 private directory**, preserving the case:

```sh
gzip -dc /PRIVATE/CASE/data/rooms/ROOM/tape.jsonl.gz > /PRIVATE/NEW_REPLAY/tape.jsonl
sha256sum /PRIVATE/NEW_REPLAY/tape.jsonl
node tools/run-network-audit.mjs --tape /PRIVATE/NEW_REPLAY/tape.jsonl --out /PRIVATE/NEW_AUDIT
```

The restored SHA must equal that entry's `originalSha256` and the original
replay provenance's `tapeSha256`. Restore runtime/browser/Node JSONL the same way
when rerunning their readers. Do not normalize numeric text or line endings;
original Native `-0.0` is preserved byte for byte.

An owned clone of the existing closed DEV case was actually archived without
starting a new browser or Native process: 126,997,468 bytes became 6,246,339 bytes;
its twelve original raw files (124,495,966 bytes) became 3,725,956 gzip bytes. Full
decompression hashes matched every original source file, which remained
unchanged outside the clone. Thirty-one equal-size archived cases project to
193,636,509 bytes. This establishes practical storage headroom for that observed
trace shape, not that all unexecuted cases have passed or have identical sizes.

The private runtime capture entry accepts the strict decimal
`BOTSTRIKE_NETWORK_CAPTURE_MAX_BYTES` override, bounded to 4,096–536,870,912 bytes.
Default capture remains 256 MiB and its queue remains 4 MiB. Only the Tactical
matrix case explicitly requests 512 MiB; the driver asserts the finalized
capture manifest has exactly that requested limit and the unchanged queue.
Other cases assert 256 MiB. In the actual DEV sample, original Native frame lines
averaged 19,180 bytes; all capture events averaged 23,400 bytes per tick and the
95th-percentile tick interval contained 26,738 bytes. A 10,000-tick projection at
that latter rate is 267,380,000 bytes, only about 1 MiB below 256 MiB before
Tactical-specific inventory/configuration/probe overhead. The 512 MiB Tactical
choice remains the v3 bound. A historical C/v1 Tactical recovery capture reached
7,495 Native frames with 116,221,839 runtime bytes and no capture drops; its
strict expiry assertion failed and its replay was not run. It provides size
evidence, not v2 protocol acceptance or a completed Tactical match.
The 4 GiB run cap, 2 GiB reserve, 512 MiB file bound and overflow-fails-evidence
policy remain in force.

## Targeted client recovery checks

`tools/botstrike-watchdog-browser.mjs` runs two short, independent practice
cases against an explicit immutable application image. One injects an 800 ms
browser task after an exact applied neutral baseline. The other omits only
`inputAck` from messages delivered to the app for 1,600 ms while retaining the
original wire observations. These are explicitly synthetic client faults.
Both require a new local pause, visible recovery guidance, a fresh original-send
neutral confirmation, a trusted software Resume click and subsequent new input.
Each captured Native frame is compared with source and retained replay.

Use a new mode-0700 private `qa_dir`, the image's actual source tree, and explicit
local Chrome/Playwright paths. Preparation writes only the host binding; it does
not launch a browser or lab. The application never uses a development source
mount. Host helpers may have separately bound corrections after the image build.

```sh
node tools/botstrike-watchdog-browser.mjs --prepare-binding \
  --image "$qa_image" --source-tree "$qa_tree" --repo "$PWD" \
  --artifacts-base "$qa_dir" --output "$qa_dir/source-binding.json" \
  --chrome "$qa_chrome" --playwright-entry "$qa_playwright_entry"
node tools/botstrike-watchdog-browser.mjs --run \
  --image "$qa_image" --source-tree "$qa_tree" \
  --binding "$qa_dir/source-binding.json"
```

The driver binds actual browser and host source hashes, bounds the two cases and
their captures, and checks exact owned-object cleanup before continuing. Record
the command exit status separately from case status; a completed case receipt
alone does not establish a clean process exit. These checks supplement the full
matrix and do not replace its failed cases, human A/B encounters or physical
device and Internet acceptance.
