# Service objectives and operator response

These objectives apply to the service and its recorded replay. They do not
certify Internet fairness, physical input latency or a supported competitive
network envelope. The latter still requires the complete matrix and human A/B
encounters in #12/#26. A failed case stays failed, including a failure before
network shaping; a single successful case does not establish a supported RTT.

## Integrity and recovery objectives

| Objective | Signal and alert | Operator response |
| --- | --- | --- |
| Zero verified incomplete or mismatched replays | `recordingFailures`, `sealFailures`; `recording_failed`, `sealing_failed` | Keep the result unverified and reject export. Preserve the original tape and exact engine/verifier/profile. Check storage or verifier failure before retrying; never substitute the newest rules for the recorded pair. |
| Zero silently lost or duplicate completed career commits | `careerRecoveryFailures`; `career_recovery_failed` | Protect the verified source from retention. Restore writable storage, run recovery, and verify the application ledger and career change exactly once before releasing that source. |
| Zero backups authorized with live work or pending recording I/O | Private `draining`, `drainReady`, `pendingIO`, room counts and sealing jobs; `drain_blocked` | Block new matches, let existing matches finish, require modern readiness and zero pending work, stop the process normally, then copy the cold data and verify the inventory. A rooms-only health response cannot authorize a backup. |
| Explicit failure when recording storage is unavailable | `recording_failed`, `storage_low`, career/retention alerts | Stop admitting new matches under the existing 2 GiB available-space boundary. Preserve live and uncommitted sources. Free capacity and verify recovery; do not prune a protected source to clear the warning. |
| Explicit Native failure instead of a fabricated result | `native_stalled` and an interrupted/failed room | The existing 10-second response watchdog fails the match. Preserve evidence and investigate the Native child, pipe, scheduler and storage separately. This watchdog is an incident boundary, not an acceptable tick-latency target. |
| No silently missing quality history | `quality_write_failed`, `quality_history_unavailable`, `quality_capacity`, provenance/clock health | Retain the gap in reports. Restore writable capacity and verify a fresh process reads the new snapshot. Report missing generations, capacity eviction and backward-clock intervals; do not fill them with zeros. |

These are zero-error integrity objectives, not estimated availability
percentages. Existing alerts record first/latest activation, count and
resolution. Some failure alerts are intentionally sticky; a recent successful
match does not automatically resolve an earlier recording or sealing incident.
Recheck the actual affected result and recovery boundary before resolution.
The [quality history contract](quality-store-contract.md#persistence-recovery-and-alert-response)
describes corrupt-primary fallback, backup recovery and provenance/history alerts.

The disposable operations and real ENOSPC drills exercise failure, protection
and recovery. Their detailed source/image/profile binding belongs with their
private receipts. A private metrics listener being `ok` is not proof of backup
readiness, a verified match or an end-to-end healthy connection.

## Performance measurements and release decisions

Use one release generation and one non-overlapping cohort per report. Include
the requested window, bucket overhang, counts, unavailable intervals and exact
component boundaries. Never add `all` to its overlapping `private`, `casual` or
`tactical` cohorts. Historical gauges marked stale after restart are not live
occupancy. A reporting-window p95 is not a raw latency sample.

The D2 accelerated operations baseline contains 23,040 parent-observed Native
command-write to frame-response intervals, including pipe and scheduling delay.
Their histogram p95 upper bound was 0.5 ms and observed maximum 0.925 ms. Its
single seal took 1,674 ms. These measurements come from
`tickMs:0`, two automated controllers and eight bots in a disposable 2 CPU /
4 GiB container. Its deadline-overrun and snapshot-interval distributions
describe that accelerated fixture; they cannot set normal 64 Hz targets. One
seal cannot establish a sealing percentile or service availability objective.

The complete D2 TCP matrix is recorded in the
[redacted evidence checkpoint](acceptance/network-quality-D2.json); it remains
12 passes and 19 failures. Record Native command/response time and deadline lateness,
runtime event-loop scheduling, separate gateway/runtime/Native/verifier CPU and
RSS, successful server writes, browser state delivery, validated exact ACKs,
render intervals and long tasks independently. A browser's long task is not
pure packet transit; an inner proxy pong is not browser application RTT. A
missing gateway PID or unavailable process interval stays unknown.

For steady-condition acceptance, require zero unexpected pauses, zero capture
drops, complete exact replay, and every required action's actual application
and hit/miss witness. Outage recovery requires fresh current-context neutral
application followed by explicit new intent, with no released old action.
Keep the existing 400 ms receipt deadline and 2-second Casual activity policy;
neither is a measured competitive latency promise. Do not raise a lease to make
a failing profile pass. Human acceptance and the supported network envelope
remain unestablished while those gates are open.

There is currently no validated Internet latency SLO, room capacity promise or
aggregate competitive success percentage. The known failures prohibit claiming
one from the passing subset.

## Normal-clock engineering budgets

A separate default `host/start.mjs` D2 exercise completed 23,040 ticks in a
2 CPU / 4 GiB container with two automated controllers and eight bots. Its
deduplicated current-generation `all` history contains 23,040 command/response
and deadline-overrun samples. Observed maxima were 1.143 ms and 3.581 ms;
neither distribution had a sample above 16 ms. The 361 event-loop reporting
window p95 values ranged from 20.611 to 21.889 ms, with 17,457 original monitor
samples. The monitor's 20 ms resolution must not be judged against a 16 ms
Native command budget. One seal took 1,793 ms; it supplies no sealing percentile.

These are component measurements from generation A. The complete exercise
remained failed at its later tape-audit precondition, before generation B or
image backout. The original quality snapshot also declared an unknown Native
profile, despite the separate image/export binding. Its unbound declaration is
retained; the reporter below correctly returns `unknown` for it.

The following engineering budgets use the normal-clock measurements and the
64 Hz scheduling budget. They evaluate observations in two complete aligned
minutes, not a long-term availability percentage or a player-latency promise.

| Observation | Budget | Minimum per complete minute |
| --- | --- | --- |
| Native command-write to frame response, including pipe/scheduling | At most 1% strictly above 16 ms | 512 individual observations |
| Native deadline lateness | At most 1% strictly above 32 ms | 512 individual observations |
| Runtime main-thread monitor reporting-window p95 | At most 1% of reporting windows strictly above 32 ms | 10 reporting windows |

Sixteen and thirty-two milliseconds are quantized operating budgets near one
and two Native ticks. They do not change the 15.625 ms simulation cadence or
400 ms input authority. The event-loop denominator is reporting windows, not
original delays; no percentile of those window percentiles is treated as a raw
delay percentile. Resource samples and a single seal remain metadata without
new numerical capacity or sealing objectives.

Run the private, offline report against an original private quality response
captured with `history=1`:

```sh
node tools/quality-objectives-report.mjs --file /PRIVATE/quality-with-history.json
```

The command reads one bounded regular JSON file, makes no network request and
changes no runtime alert. It reports the exact input SHA, covered minutes,
sample counts, histogram boundaries, fixed operator actions and existing active
error alerts. Exit codes are `0` for these snapshot budgets met, `1` for a
breach and `2` for unknown/invalid evidence. Inspect the reported input/window;
an old file is not a current monitor.

Only current-generation `all` series are used. Missing/duplicate buckets,
insufficient samples, rejected/evicted observations, unbound provenance,
backward-clock intervals, incompatible units/trust or active integrity/error
alerts cannot become a passing result. A breach calls for inspection of the
actual affected component and, when necessary, private drain to pause new
admissions while retaining live matches and recordings. It does not justify
changing the Native tick rate, widening input leases or labelling a browser
rendering delay as network transit.

The reporter was checked against both actual histories. The original unbound
generation-A file returns `unknown`. A later bound generation-A file meets the
three budgets over two complete minutes: 7,680 Native response samples, 7,680
lateness samples and 120 event-loop reporting windows, each with zero samples
above its budget. That normal-host exercise still failed its later tape-audit
precondition before generation B; these results do not complete deployment or
backout acceptance. The reporter's 17 pure checks cover boundaries, count/window
integrity, unavailable data, active errors and safe file handling.

The launcher must supply the actual inspected image ID and the Native profile
from the verified image build guard, alongside its baked source revision.
The deployment rehearsal checks the original guard digest, source tree and
retained-pair manifest before setting `BOTSTRIKE_NATIVE_PROFILE`; it separately
compares `BOTSTRIKE_IMAGE_ID` with actual container inspection. Supplied
environment strings or a report's own declarations are not independent proof
of the executing image. Preserve older unknown generations rather than
rewriting them as bound after configuration is corrected.

## Current transport decision

Retain WebSocket for the existing preview while investigating the failed
conditions. Withhold competitive network acceptance. Current evidence includes
a real unshaped browser long task and authoritative receipt expiry, as well as
failures after TCP shaping. Changing transport alone has not been shown to
remove those failures. The exact receipt/ownership/neutral-recovery contract is
required independently of the transport.

A migration needs a reproducible transport-attributed failure, a candidate
that preserves authentication, Store fullscreen/sandbox admission and exact
replay contracts, and comparative results for the same action/fault catalog.
Keep failed profiles and pre-shaping failures distinct in that comparison.
This decision does not declare the current WebSocket implementation accepted
for ranked play, promise that a different transport will cure rendering, or
waive the remaining human and real-Internet gates.
