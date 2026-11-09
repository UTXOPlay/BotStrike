# Private quality history

`botstrike-service/quality.mjs` records operational observations. It does not
change simulation, recorded controls, score, replay verification or the exact
native application profile. The game service must keep reports and collection
behind its runtime-token boundary. Never forward this store's report through
the public game host without a separately reviewed, restricted contract.

## Integration API

```js
const quality = new QualityStore({
  directory: path.join(data, 'quality'),
  provenance: {sourceRevision, imageId, nativeProfile},
});
await quality.ready; // asynchronous startup read; instrumentation may start earlier
quality.record('matchCompleted', 1, {cohort: 'public'});
quality.sample('socketRttMs', heartbeatRoundTrip, {cohort: 'public'});
quality.gauge('sealBacklog', queuedPlusRunningJobs);
quality.alert('career_recovery_failed');
quality.alert('career_recovery_failed', {active: false});
const report = quality.snapshot({windowMs: 300000, includeHistory: true});
const health = await quality.flush();
await quality.close();
```

`record`, `sample`, `gauge`, `alert`, `snapshot` and `health` do no filesystem
I/O. Observation calls return `false` for a closed store, invalid value, unknown
metric/cohort, extra labels or exhausted series capacity. A zero counter delta
is an accepted no-op. Invalid observations are counted without retaining their
name, value or labels. An explicit reporting-window error throws; disk errors
do not escape `flush` into match simulation.

The exported `QUALITY_METRICS` catalog binds each metric to its component,
kind, unit, trust and observation unit. Only the six fixed cohorts `all`,
`public`, `private`, `practice`, `tactical` and `casual` are accepted. There are
no arbitrary tags. Recording one event in two cohorts is two intentional
series observations; do not sum overlapping cohorts into an overall rate.
Callers must not pass accounts, room identifiers, IP addresses, tokens,
coordinates, raw errors or hidden state. Source revision, image content digest
and native profile are operator-supplied release metadata, never client labels.
Malformed or absent provenance becomes `unknown`, with an explicit warning.

## Component boundaries

| Series | Component and meaning |
| --- | --- |
| `inputAgeMs` | Runtime receipt to tick application. It cannot measure client-to-server transit without additional trusted timing. |
| `snapshotDeliveryIntervalMs`, `snapshotQueueBytes` | Successful socket enqueue interval and JS WebSocket buffered bytes at the enqueue attempt. Neither proves that a browser received or displayed the snapshot; kernel/TCP queues are separate. |
| `nativeTickProcessingMs`, `nativeTickOverrunMs` | Parent-observed command-write to frame response, and deadline lateness. Pipe/I/O/scheduling are included; these are not pure native CPU measurements. |
| `sealQueueAgeMs`, `sealDurationMs`, `sealBacklog` | Completed-match queue wait, worker duration through success/failure, queued plus running jobs. Worker duration includes replay I/O. |
| `socketRttMs`, `socketJitterMs`, `reconnectGapMs` | Server heartbeat RTT, absolute consecutive-RTT change, and last departure to first returning socket. Exclude duplicate-tab handoff from reconnects. RTT still includes peer scheduling. |
| `hostEventLoopWindowP95Ms`, `hostNodeCpuPercent`, `hostRssBytes` | Runtime Node event-loop observation-window p95 and resources, including runtime worker threads. Exclude a separate gateway Node process. CPU is percent of one core and can exceed 100%; RSS is sampled, not a proven maximum. |
| `gatewayNodeCpuPercent`, `gatewayRssBytes` | Shared gateway Node process at the explicitly configured PID only; never recursively include runtime/native/verifier descendants. Not per-game attributable cost. Missing/unreadable gateway measurements are null with a reason. |
| `nativeCpuPercent`, `nativeRssBytes` | Simulation children combined; exclude Node and verifier children. |
| `verifierCpuPercent`, `verifierRssBytes` | Verifier children combined; exclude Node and simulation. |
| `client*WindowP95*` | **Untrusted reported-window p95** observations. A histogram here describes the distribution of window p95 values, never the distribution of original individual delays. |
| `client*Samples` | Separate sum of the original sample `n` from each accepted, non-overlapping client report. These counts remain untrusted. |
| `clientAckSkipped`, `clientAckUnmatched`, `clientPendingExpired`, `clientDisconnects`, `clientPredictionSnaps` | Untrusted per-interval client event counts, not server-confirmed events. |
| Earlier short `client*` sample names | Reserved for actual individual observations if later collected; they are separate from window-p95 series. Their source remains untrusted. |

`clientInterpolationAgeWindowP95Ticks` uses native **ticks**, correction uses
**world units**, and the other report-window percentiles use milliseconds.
The client report boundary validates its version, fixed keys, counts, ranges,
window length (at most 60 seconds), rate and current controller before calling
this module. Reports from a controller without a room are intentionally allowed
under `all`. The shipping client sends opted-in summaries only while its
controlled match is running and the page is visible. Roomless reports do not
become `public` or `tactical` samples. In-room reports use the
entitled current room's fixed cohort. Sharing is off by default in the browser.
Do not feed an interval's p95 into the raw delay metric.
Cross-process `performance.now()` values are different clocks: the caller must
measure a local interval or state its clock-alignment method.

The remaining catalog contains match/input/snapshot/replay/recovery counters,
queue wait, occupancy and disk gauges. A gauge's `staleAfterRestart` flag stays
true until the new process samples it; persisted occupancy is not live truth.
Historical generations retain their own provenance rather than being merged
into a new build's statistics.

`health().clock` (also in `snapshot().health.clock`) discloses the raw observed
wall clock, effective timestamp, restored persisted floor and backward skew.
The last valid snapshot's `savedAt` is a lower bound across restarts, so a wall
clock rollback cannot rewrite valid history into an unreadable earlier snapshot.
While raw wall time is behind that floor, effective timestamps, query windows
and retention stop advancing and health is `degraded`; capacity limits still
apply. Observations in this interval share the clamped logical time. Their real
elapsed time and UTC placement are unknown, not reconstructed or claimed to be
the effective timestamp. Normal advancement resumes when wall time catches up.

## Windows, counts and capacity

The default is 24-hour retention, 60-second buckets, 512 fixed metric/cohort/
generation series, 8,192 total buckets, four release generations and a 4 MiB
serialized snapshot. Configured limits are range checked. Retention and
capacity are independent: a report may retain less than 24 hours when the
capacity ceiling is reached. Oldest buckets are evicted first; a new generation
can replace an older generation's series at the series ceiling. Rejection and
eviction counts plus `quality_capacity` make those gaps visible.

A rolling query includes buckets intersecting the requested time range. Counts
can therefore include up to one bucket of leading overhang, explicitly stated
in `window.semantics`, `firstBucketAt`, `bucketMs` and each history point.
Samples retain count, sum, minimum, maximum and a fixed histogram for **every
accepted observation**. They do not keep only the newest 256 inputs and call
that a long-term percentile. `observations` is the included count; histogram
quantiles report lower/upper bin bounds, with `p50`/`p95`/`p99` as upper-bound
convenience fields. These are not exact sorted-sample percentiles. Gauge means
are means of observations, not time-weighted occupancy.

The snapshot describes the component, trust, unit and observation unit on every
series. `includeHistory` returns bounded bucket data for a private report or
dashboard; separate queries provide short and long windows. No Internet SLO or
latency alert threshold is invented by the store. Those require measured
baselines and an operator decision.

## Persistence, recovery and alert response

Default periodic flushes run every ten seconds, asynchronously. Concurrent
flushes coalesce into one writer. New observations during an in-flight flush
remain dirty; `close` drains them after rejecting new observations. The module
requires one store owner per directory; multiple containers/processes must not
share a quality directory as concurrent writers. The module
uses private-mode temporary files and atomic replacement, retaining the prior
valid complete snapshot as `quality.previous.json`. At most two complete files
and two fixed temporary files exist; peak file content is bounded by four times
`maxBytes`. Temporary files are not recovery sources.

A checksum and strict schema validate complete snapshots. Startup rejects a
truncated, corrupt, oversized, symlink or incompatible-schema primary and tries
the previous complete snapshot. `quality_recovered_backup` exposes that the
newest flush may be missing; observations are never reconstructed or invented.
If both complete generations are unusable, collection starts empty with
`historyLost=true` and `quality_history_unavailable`. The operator must retain
that discontinuity in longitudinal reports. Changing bucket width requires an
explicit migration/export or a new directory; it is not silently reinterpreted.

Flush failures retain in-memory observations and the previous disk snapshot.
Health reports a fixed safe error code, persistent failure count and active
`quality_write_failed`; it never returns raw filesystem paths or error text.
A successful retry resolves transient read/write/recovery alerts. Capacity
loss and history discontinuities remain visible. Operational alert codes also
include `career_recovery_failed`, `retention_failed`, `sealing_failed`,
`recording_failed`, `native_stalled`, `storage_low` and `drain_blocked` for the
service's actual boundaries. An alert's first/latest times, activation count
and resolution time persist.

`health().ok` means that observation storage has loaded, has no unrecoverable
history discontinuity and has no active error-severity alert. It is **not** a
claim that a match/native service/network is healthy. Backward clock skew or an active warning makes
`status='degraded'` while `ok` can remain true. A disk-write failure requires the
operator to inspect the private error code, restore writable capacity, retry
flush and verify a new process can read it. Career/retention alerts require
their own successful repair and explicit resolution at the service boundary.

Atomic replacement protects ordinary process interruption; there is no
synchronous filesystem flush on the event loop and no power-loss durability
claim. A crash can lose observations since the most recent successful flush;
corrupt-primary fallback can additionally lose that newest flush. Independent
coherent game-data backup/restore, retained exact verifier checks and sustained
active-input/sealing/network acceptance remain required outside this module.

Run `node --test tests/botstrike-quality-store.test.mjs` for rolling/count,
provenance, restart/stale-gauge, startup-race, privacy/cardinality, capacity,
write/rename failure, truncation/checksum/schema and concurrent-close checks.

`node --test tests/botstrike-quality-service.test.mjs` exercises actual runtime
HTTP/WebSocket boundaries and native processes: private reports/public-host
denial, persistence across service restart, schema/controller admission and a
real 15-second rate refill, unaffected accepted native inputs, controller
written-history/life/room boundaries, ten automated Tactical departures and a
small explicitly finished signed practice replay. Delayed/failed WebSocket
send callbacks in its history test are labeled unit fault injection; they are
not real TCP packet-loss shaping or human network-fairness acceptance. The
practice replay also verifies that private recorder PID messages cannot be
mistaken for the worker's final proof.
