# Network quality checkpoint

This branch is based on `codex/botstrike-tactical-core` / PR #46 at
`01dee05170c84c3e5d4fde9887c2d10282229f21`. It addresses measurement, input
freshness, recovery and inspection work for #30, #12 and #26. Those issues remain
open. No production rollout, capacity certification or human acceptance follows
from the engineering results below.

The [redacted D2 evidence checkpoint](acceptance/network-quality-D2.json) records
the immutable image/tree, per-case outcomes and independent replay supplement.
It deliberately keeps network and issue acceptance false.

The current follow-up replaces receipt-v1 recovery with envelope version 2 and
an explicit, controller-bound Native application acknowledgement. The previous
`last_seq >= neutralSeq` check could accept an AI sequence before a fresh neutral
human input had executed. The new service pairs the final dispatched input with
its Native frame; the client requires an exact actually sent sequence in its
current context. Initial ownership and a new room also require their own neutral
barrier. Stale-action recovery clears held intent and requires explicit Resume.
See `input-delivery-protocol.md` for the wire contract and compatibility policy.

## Prior immutable candidate C

These results bind receipt-v1 candidate C, source tree
`0c84e3631f322798dee2309f7b1b270d926fc1ca`, application image
`sha256:baa5709dcc6ac92ae1caa4be7e842177cc393be278e0a70f3baeca554a181965`.
They are retained evidence and do **not** validate the subsequent version 2 code.

- The pinned Bookworm build passed 378 unit and 24 host checks. Native model
  SHA-256 stayed `4cb119b7638d14fb08cafad9905e9d8bc808d04b233e8d0c4599e6cd79e4ed49`;
  the portable profile stayed
  `c5a72be9466ddd4efa23aa6574541714c8112510ba7f2d7008dd0849f8a9925d`.
  Ten exact retained engine/profile pairs were preserved.
- Ten continuous automated WS controllers completed an 18-round Tactical match,
  13:5 over 95,739 Native ticks, with all configured bots false. Captured, rebuilt
  source and retained-engine state hashes and complete replay traces matched;
  the Myelin signature verified. This is local automated play, not ten humans or
  an impaired-network completion. Omitted ray details do not count as ray coverage.
- Fourteen operations stages exercised drain/seal, current plus nine historical
  profile restore, durable career recovery, verification failures, restart,
  retention and fixed-source rollback. A separate actual 64 KiB career-storage
  tmpfs produced ENOSPC, protected the verified source, and recovered exactly once
  after space was freed. An earlier host EDQUOT failure remains a failed run.
- Actual Store/fullscreen/input checks covered the six required viewport sizes,
  portrait blocking and held-input clearing, exit/re-entry without replacing the
  game instance, controller ownership, privacy and diagnostics. A real 4K/DPR1
  frame was reviewed. Physical notches, touchpads and physical gamepads were not
  established by browser emulation. The Store outage trial passed its then-current
  checks; it does not remove the subsequently discovered recovery flaw.
- The complete 31-case TCP impairment matrix finished with **12 passes and 19
  failures**, no pending or unsupported cases, and complete lossless captures.
  Thirty Casual cases compared 130,913 captured runtime states with exact source
  and retained replay. Four cases each had one unconfirmed shutdown tail frame,
  recorded separately. The failed Tactical case was independently replayed later:
  all 7,495 actual/source/retained states matched. It was cancelled, not a sealed
  complete match, and its original failed classification remains unchanged.

Matrix failures included real resync/availability problems, an input-pulse
navigation problem, recovery-marker analysis errors, and the actual premature
recovery bug. Preview equipment/throw-mode configuration was also incorrectly
classified as an action by one analyser. The Tactical expired-receipt assertion
observed `unknown`, not `expired`; it remains failed. A new negative fixture must
freeze an actually acknowledged receipt, retain its owner/life and challenge
context, then independently establish expiration. No threshold was widened and
no failed steady-state case was rescued by automatically pressing Resume.

A navigation-helper follow-up on C passed RTT100/loss0 with the original goal,
2-unit tolerance and timeout; RTT50/loss3 encountered an actual resync before
navigation. Those two selected trials do not replace the original 31-case matrix
or establish version 2 acceptance. Source-mounted version 2 browser compatibility
checks are likewise development evidence until repeated against a frozen image.

## Immutable candidate D2

Receipt version 2 binds source tree
`839bdb9c5b9783cba6885f441b0729baa982b5c8` to application image
`sha256:09eadfd30a716fefd53a35b35362bad0831d0fc8cd1c46cc1e81a020553dd3d9`.
Its Bookworm build passed 423 unit and 24 host checks without skips or failures.
Actual-image inspection matched the archived source and build guard, preserved
all 21 release files byte-for-byte and mode-for-mode, and retained all ten exact
engine/profile pairs. The Native model and portable profile above are unchanged.
The signed commit `d776050` records the earlier C checkpoint, not this D2 tree.

- The healthy ten-controller Tactical exercise completed 13 rounds, 13:0, over
  30,643 ticks. Every actual/source-built/retained state hash, full replay trace,
  final state and spec matched, and the signed export verified. All ten sockets
  stayed open to completion, with at least 1,395 distinct active applications per
  seat and no resync or unexpected close. This automated strategy is not a map
  balance or human-match result.
- A separate full Tactical exercise applied a real 1,002.53 ms loopback TCP
  blackhole, with 231 kernel drops and 53 retransmissions. Software held intent
  was released 670.65 ms after the cut. All ten fresh neutral proofs matched
  actual Native tick 1,895; a second explicit software signal introduced new
  intent. The complete 32,203-tick match then sealed, with every actual/source/
  retained state, trace, final state and signature verified. Actual restore-start
  was audited with a bounded backlog and ongoing checks; no released old action
  passed the check. The 400 ms freshness, 2-second activity and 20-second recovery
  limits were not widened. This is one shared-kernel cohort, not independent WAN
  fairness, physical input or a human Resume gesture.
- Fourteen operations stages passed with current plus nine historical exact-pair
  restore, drain with zero pending I/O, fixed `01dee05` source backout, durable
  career recovery and protection. Both software pilots had 1,469 verified
  known-sent acknowledgements. A separate real 65,536-byte career tmpfs produced
  ENOSPC, protected the only old verified source, committed once after recovery
  and stayed idempotent. The original HOME source and an independent 795,725,105
  byte snapshot matched before and after the disk drill. These are disposable
  data and bounded component measurements, not production capacity certification.
- Four-way cached-client/legacy-server compatibility, same-socket new-room
  neutral gating, two-way tab ownership, browser diagnostics and communications
  passed against the immutable application. Actual Store launch/fullscreen/
  rotation/input-mapping checks covered all six required sizes. True 4K/DPR1
  screenshots were reviewed without a layout blocker. Physical touchpads,
  notches, refresh-rate and gamepad hardware remain separate gates.
- The Store recovery trial applied a real 1,078 ms TCP outage with ten kernel
  drops. Its first neutral proof was retained as history; after reconnect, a new
  current-socket neutral proof preceded one trusted software Resume gesture and
  new movement. All 1,037 raw Native frames were retained without drops; no old
  held or expired action was observed. The same iframe, room and sandbox
  attributes survived. This does not establish opaque browser-game sandbox or
  human-input acceptance.

The fault host runner, Store multi-barrier selector and matrix analyser received
separately hashed host-only corrections after the immutable application build.
They do not change D2 application, Native, profile or replay bytes. Their own
focused checks and actual-run identities are separate from the build's 423/24
counts. Namespace IDs alone are not clock identity: the external fault runner
verifies actual zero monotonic/boottime offsets and live host-bracketed samples
before changing any qdisc. Earlier precondition failures remain failed records.
The original Store trial whose marker crossed a reconnect remains failed, too.

The first D2 matrix run was stopped after three completed failed cases and one
in-flight case when the analyser was shown to reject valid floating-point
`issuedAt + 400` deadlines and conservative non-neutral ACKs for an original
no-op weapon request. Corrections preserve the exact deadline construction and
original-intent-plus-final-packed neutral rule, without an epsilon or longer
lease. Independent reanalysis used new output directories; original reports,
archives and failed classifications were not edited. The new full 31-case run
with the corrected, separately bound host analyser completed with **12 passes,
19 failures, zero unsupported and zero pending cases**. Its final matrix SHA-256
is `eba9deb0774d9ea18eb3a5e8b1a27ed644a622083442f0302eee136d85099ec7`.
The driver exited with status 1, as expected for failed assertions; the original
failed classifications remain intact. All 31 owned container/network cohorts,
browser profiles and the driver were confirmed gone, and the 16 bound runtime
source files stayed unchanged.

The run captured 159,767 Native frames without capture loss. Thirty cases
confirmed 154,625 actual/source/retained frame hashes and complete tape replay;
seven unsent shutdown-tail frames are explicitly unconfirmed. The remaining
5,142-frame render/CPU case exited its checks before replay. A separate
independent audit verified all twelve original archives, all 5,142 actual/source/
retained frame hashes, trace/final/spec and its two available shot witnesses,
with no additional tail. Its completion receipt SHA-256 is
`bf00145853f6109ef838836be5b3aebd0172e6578e3a32b9735d1bc1b190ee60`.
All 159,767 captured frames therefore have exact replay evidence across the
original reports and independent supplement. The original failed render case,
its missing replay field and all original files remain unchanged.

Passing cases included the full required ARC/ION/RAIL and new-life action
catalog, with six available shot witnesses matching RNG and Native damage;
actual three-second bidirectional outage recovery; real bridge IP change;
and the Tactical expiry/ownership/life/purchase/departure/capacity sequence.
The latter held an actually acknowledged same-context receipt for 601 ms with
nine new challenges and observed a real expired HTTP rejection. Its separate
obsolete outage purchase was classified independently. That matrix case ends
by cancellation; the complete Tactical match/sealing evidence is supplied by
the separate immutable D2 exercises above.

Failures include actual pauses, exact-ACK observation timeouts, route failures,
missing takeover and unmet action/measurement prerequisites. Four navigation
failures occurred before shaping. Another case changed qdiscs but failed to
sample the settled condition before its requested long outage was triggered.
Two cases failed while reading TCP state; matching daemon time windows contain
OCI `procReady not received` errors. That association is temporal, without an
independently bound ExecID, and the precise PID/OOM cause is unknown. The suspended-tab case
did execute its neutral/manual/new-intent recovery, but its later observation
error keeps the whole case failed. These are not evidence that every requested
fault occurred or that every failure was caused by transport.

One alleged three-shot ARC outcome was independently shown to use HELIX-3:
the three actual frames had controller takeover and the original three-round,
four-tick burst semantics. The fixture's expected ARC assumption had become
stale. The earlier missing-takeover interval remains a separate failure; neither
that interval nor a missing first-sequence witness proves those three shots were
AI-origin or a duplicated input. No Native firing rule was changed.

No competitive network envelope or Internet SLO follows from this run. A
separate live/alive browser interval with fresh states but about three seconds
without a new matched controller ACK exposes a client control-status gap that
requires a client follow-up; D2 results cannot validate that future candidate.

## Remaining acceptance work

- Inspect the failed conditions, kernel counters and authoritative/rendered
  action timelines. Keep original failures and unconfirmed shutdown tails
  explicit. Address the demonstrated client control-status gap as a separately
  built and verified candidate.
- Finish the supported transport envelope and failed-condition analysis.
  [Service objectives](quality-service-objectives.md) documents integrity
  objectives, operator actions, the interim preview WebSocket decision and
  measured normal-clock engineering budgets. The private offline reporter has
  17 pure checks and actual unknown/bound-snapshot checks; those component
  budgets do not establish an Internet or competitive-play SLO.
- Exercise actual normal `host/start.mjs` container drain, cold backup,
  recreation and fixed-image read backout, with an independent unrelated-service
  sentinel. The component-level code-backout drill above does not prove that
  deployment sequence.
- Review and commit the final host-only tool fixes and redacted evidence; keep
  their identity distinct from the immutable application build.
- Obtain the human A/B encounters required by #12. Keep real-internet, physical
  input/refresh-rate and human peek/cover/strafe/listening/map judgments separate.
  Automated browsers are not human participants. PR #46 remains a separate draft.

Metrics remain bounded, private and source/image/profile bound. Browser sharing
is opt-in and scalar-only. Runtime peer RTT, gateway outer RTT and browser app RTT
are different observations. Unknown process/resource measurements stay unknown.
Private raw captures can contain hidden Native state and synthetic credentials;
only reviewed, redacted summaries belong in public issues or PRs. Myelin remains
verification of the exact recorded off-chain host replay, not CKB settlement.

## D3 immutable candidate: targeted watchdog acceptance pending

The client watchdog is now in immutable D3 image
`sha256:ffdbcf9311ec578d3a9b136f195fe660efc8c0ec33497f6adf4443ef994152a4`,
source tree `ebd18edf00215059768bf306a0ec9cf70b6213fe`. Its local state-age
and scheduler-gap limits are 400 ms; the live/alive exact-ACK limit is 1,000 ms
from the acknowledged input's **original send time**. A trip clears held intent,
forces neutral and requires fresh proof followed by manual Resume. These client
pause policies do not change Native rules or extend the server receipt lease.

The image build passed 502 unit and 24 host checks. Actual-image checks preserved
105 protected files, all 21 release files (184,371,322 bytes and original modes),
ten exact engine/verifier pairs and the D2 Native model/profile. The original
static-audit process remains exit 1 because its cleanup text guard rejected a
lower-case absence message. The actual JSON checks passed; an independent
specific-container supplement confirmed both owned inspection containers gone.
The original failed audit was not rewritten as exit 0.

Four immutable-image compatibility modes passed with driver exit 0: legacy
server, cached receipt-v1 client, receipt-v1 server and cached client. All 24 owned
containers, four networks and browser processes were confirmed gone.

The Store recovery trial also exited 0. It applied an actual 1,076 ms TCP
blackhole with nine kernel drops. A **local recovery-epoch barrier**, rather than
requiring a server `input_resync`, fenced old evidence. Fresh current-context
neutral ACK preceded one trusted manual Resume and new movement. All 999 raw
Native frames were retained without capture loss, expired control or obsolete
held-input frames. The same iframe, room and sandbox attributes survived; this
is not opaque browser-game sandbox acceptance or a no-AI claim.

Those browser runs used separately hashed, post-build host observers. The
recorded revision passed 47 pure checks, separately from the image's 502/24.
Later host-only overflow counterexamples retained their original two failures
among 15 checks; the minimal fixture correction then passed 49 related pure
checks. The completed Store run did not reach that overflow boundary and was not
rewritten or presented as an overflow rerun. The subsequent full repository unit
run passed 531 checks, with zero failures or skips. This external host-follow-up
result is separate from the image-baked 502/24 checks. Local proof supplements
the wire ACK and changes no server protocol.

A separate legacy-server follow-up exited 0 using the exact D3 client bundle
against the fixed legacy server. One synchronous 800 ms browser task, **not a
network fault**, exercised held-intent clearing, local pause while the match
continued, fresh legacy state, manual Resume and observed new movement. Legacy
has no exact applied-input ACK; that fallback observation does not satisfy the
receipt-v2 targeted checks. Its six owned containers, network and browsers were
confirmed gone. The earlier four-mode receipts remain unchanged.

The D3 six-size UI regression failed. Its first attempt supplied the Store outer
page to a standalone fixture and exited before any six-size or Native-input
assertions. With the corrected standalone entry, seven assertion groups completed
across 1920×1080, 2560×1080 and 2560×1440 training/armory views. The run then
exited 1 during 3840×2160 training because the HUD became hidden while a HUD
button was awaited. The failure snapshot had `playing:false`; the screenshot
showed READY/RESUME and a local pause latch. The exact watchdog reason was not
captured, so GPU or network causation is undetermined. The screenshot also showed
the status reason below the first screen. Both failures and the screenshot remain
preserved; each attempt's six owned containers, network and browsers were gone.
This is not a complete six-size pass.

A subsequent UI-only working-tree change moves the existing status message near
Resume, resets menu scroll on reopen and bounds its type size to 12–20 CSS px.
It is reserved for a new D4 candidate, with no wire or Native-rule change; it does
not change D3's failed result or establish a D4 browser pass.

Targeted 800 ms main-thread blocking on the receipt-v2 service and exact-ACK
omission checks are still pending. D3 release/network/issue acceptance remains
false; human A/B, WAN, physical-device and capacity gates are unpassed. D2
evidence and its failed matrix classifications remain unchanged. See the strictly allowlisted
[partial D3 checkpoint](acceptance/network-quality-D3.json) for redacted receipt
digests and the distinction between the original audit failure and its cleanup
supplement.

## Single V3 profiler supplement: diagnostic incomplete

One separately bound profiled navigation supplement used the unchanged D2
image/source. Navigation completed with zero resyncs. All 3,449 captured
actual/source-built/retained state hashes matched, with 3,449 taped frames and
no unconfirmed tail. This was an unfinished navigation diagnostic, not a newly
sealed match. Its original result remains `diagnostic_incomplete`, exit 1.

The CPU profile validated with 79,340 samples and 2,643 nodes. The trace hit its
unchanged 128 MiB (134,217,728-byte) local output cap and retained only an exact
prefix; full-window tracing remained incomplete. Chrome's internal
`dataLossOccurred:false` does not remove that local truncation. The original
failed capture was preserved; no retry, enlarged cap or reduced category set
was used to turn it into a pass.

Observed maximum long tasks were 68 ms and 76 ms for the two browsers. The
820 ms stall did not reproduce. Valid CPU samples and partial trace observations
do not establish a GPU, shader, JavaScript, GC or OS root cause, or an application
optimization. Observer overhead remains part of this diagnostic cohort; owned
resources were cleaned up.

Public evidence identities are limited to redacted digests:

- V3 fixture SHA-256: `4cf7afa9d241fbc98a20a97ad358d2f6cd4f11ec73dcf868858223d034ee42fe`.
- Original summary SHA-256: `18f74a2bb31970372aed713c817fb3d7bc7222fd66d2427ab290f8ffac05ab9a`.
- Independent all-state check SHA-256: `3a58c7919c8b8812c36c3dff466e02d4ebfb00a6cf35f22e3b181e792298e2ef`.
- Truncated trace-prefix SHA-256: `b777dd3f6b3199f1aea0a942fe6844c4f568f8779001d1e40ceae9656a6fdf31`.

Raw traces, hidden state, credentials and private artifact locations remain
private. Neither this supplement nor the D3 work in progress changes any prior
failed classification or establishes human, Internet or capacity acceptance.

## D4 immutable candidate: targeted watchdog and six-size UI checks passed

D4 image `sha256:b4cf84ff1c6f3286346a932021359fc030f6f854ee5a280bad3d49b8a53290fd`
was built from source tree `cb9ab9bc02352763aed9b3302b9a071fa4be3420`.
The existing status message now appears near Resume during a running match,
menu reopen resets scrolling, and status text is bounded to 12–20 CSS px.
No Native rule, model/profile or delivery-protocol change accompanies this UI fix.

The build and static-audit processes both exited 0. The image passed 545 unit
and 24 host checks. Actual-image inspection preserved 105 protected files,
21 release files (184,371,322 bytes and original modes), ten exact retained
engine/verifier pairs and the unchanged Native model/profile. Actual static web
assets also matched the archived source.

The standalone six-size UI suite passed 15 assertion groups at 1920×1080,
2560×1080, 2560×1440, 3840×2160, 390×844 and 844×390. It used a measured
Intel hardware renderer, desktop DPR 0.5 and mobile DPR 1. Independent review of
all 20 PNGs found no layout blocker in the captured states. This was not a Store
entry or physical-device performance test; the desktop 4K CSS viewport was not
a native 4K screenshot-pixel or physical-legibility test.

The final supervised watchdog run confirmed both supervisor and direct Node
exit 0. One case ran an explicit 800 ms browser task after a known-applied
original-neutral baseline. The other omitted client-visible application ACKs
for a fixed 1,600 ms while state delivery continued: the original-send age
reached about 1,008.1 ms after 35 continuous prerequisite states. These were
synthetic client stimuli, not network impairment. Both cases required fresh
current-context neutral proof, one trusted software-generated manual Resume and
an ACK for new active input. Recovery notices were visible and uncovered with
panel scrollTop 0. All 405 actual/source replay frames matched exactly, with
zero unconfirmed tail or capture drops; 12 owned containers, two networks and
all owned Chrome processes were gone.

Earlier targeted attempts remain unchanged. The first failed on a document-start
observer before either intended stimulus; each case still had 21 exact replay
frames. A minimal two-file external-host fix passed 15 pure checks separately
from the image build. The next attempt passed both functional cases over 410
exact frames but its observed command exit was 143 and direct Node exit remained
unknown. It is not credited as exit 0 or attributed to an external cause. The
final independently supervised run supplies the clean-exit evidence without
reclassifying either earlier record.

The [D4 checkpoint](acceptance/network-quality-D4.json) records redacted evidence
digests. D2's failed matrix and D3's failed UI run remain historical results.
Human A/B, public-WAN, physical-device, capacity and competitive gates remain
false; issues #30, #12 and #26 remain open. This is a local engineering checkpoint,
not merge, deployment or full network acceptance.

## D4 host follow-up: current-local-epoch matrix recovery

The matrix recovery selector now uses the same original-send local fence as the
targeted browser observer. It requires a paused neutral send strictly after a
fresh page-clock restoration barrier, a newer local epoch, exact original-byte
CDP matching and the independent public ACK in the current wire context. It
re-reads immediately before one explicit software Resume action and confirms the
same epoch after resuming. Ordinary unpaused shot-release checks are unchanged.
The host binding now includes the recovery helper and its transitive observers.
These host-only changes passed 44 related pure checks, including seven focused
recovery checks; they are not part of D4's image-baked 545/24 counts.

One new immutable-D4 `outage-heartbeat-long` case passed. Its requested 12-second
bidirectional kernel outage reached the actual fault phase, observed 11 upstream
and six downstream drops at the fault-active sample, and recovered through a new
socket, fresh current-epoch neutral proof, explicit software Resume and a new
positive input ACK. All 5,242 captured runtime frames matched source and retained
replay. The tape has one additional unconfirmed shutdown-tail tick, excluded from
gameplay evidence. Capture drops and expired control frames were zero. The case
cancelled without sealing or producing a new signed match export; fault gaps do
not establish globally AI-free play.

The selected case passed while the new catalog remains `incomplete` with 30 cases
pending. Direct Node exited 1 under that existing incomplete-catalog policy; the
supervisor exited 0. All 12 raw archives verified, all 20 bound host sources
stayed unchanged, and the six created containers, owned network and 20 tracked
Chrome processes were gone. The [redacted follow-up checkpoint](acceptance/network-quality-D4-heartbeat.json)
keeps the exact identities and scope separate from D4's earlier targeted runs.
The original D2 heartbeat failure occurred before the requested outage; it and
the historical 12-pass/19-fail matrix remain unchanged. Other failed conditions,
human A/B, WAN, physical-device, capacity and prerequisite gates remain open.
