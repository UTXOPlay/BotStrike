# Component resource sampling

`botstrike-service/quality-resources.mjs` measures the runtime Node process,
an explicitly identified separate shared gateway Node process, native simulation
and replay-recorder process families. It changes no
native input, state, result, engine bytes or replay/export contract.

```js
const resources = new RuntimeResourceSampler({
  intervalMs: 1000,
  onSample(name, value, detail) {
    if (value === null) return; // availability remains in resources.snapshot()
    if (detail.kind === 'counter') quality.record(name, value);
    else if (detail.kind === 'gauge') quality.gauge(name, value);
    else if (detail.kind === 'sample') quality.sample(name, value);
  },
});
await resources.ready;
resources.track('native', simulationChild.pid);
resources.track('verifier', recorderChildPidFromWorker);
resources.track('gateway', explicitlyConfiguredGatewayPid); // optional; exact PID only
// On the matching child exit:
resources.untrack('native', simulationChild.pid);
const privateResourceReport = resources.snapshot();
await resources.close();
```

`track` and `untrack` are synchronous and return whether the request was
accepted. Role and PID validation, conflicting roles and the root ceiling are
explicit. The identity read begins asynchronously at track time. `sampleNow`
returns a promise and coalesces with an in-flight sample; periodic sampling
skips overlapping intervals and counts those skips. `close` cancels the timer,
disables the event-loop monitor, waits for pending sampling/identity reads and
releases maps. No synchronous filesystem calls are used.

## What each component means

- The compatibility-named `host` component and `hostNodeCpuPercent` refer to the
  runtime Node process, not the distinct `host/start.mjs` gateway process. Runtime
  CPU uses `process.cpuUsage()` divided by measured monotonic wall time.
  This is **whole Node process CPU including worker threads**, including replay
  JSON processing in `seal-worker.mjs`. It must not be called pure main-thread
  CPU or moved into the native/verifier totals. One full core is 100%; aggregate
  process use can exceed that value. Host RSS uses `process.memoryUsage().rss`.
- Optional `gateway` CPU/RSS uses only the explicitly registered gateway PID and
  its original `/proc` start identity. It never recursively adopts descendants;
  the runtime, native engines, verifier/replay children and other gateway children
  cannot inflate that process's sample. `gatewayNodeCpuPercent` and
  `gatewayRssBytes` describe the **shared gateway Node process**, not per-game
  attributed cost. One gateway root is allowed, counts against the total root
  bound, cannot reuse another role's root PID and cannot identify the runtime
  process itself. The separate native/verifier family algorithm excludes this
  exact PID and does not traverse through it as a family ancestor.
- Event-loop scheduling uses `monitorEventLoopDelay` on the **main thread**.
  Its nanosecond histogram is converted to milliseconds and retains count,
  p50, p95 and maximum in `host.eventLoopDelayMs`. Histogram p95 is not emitted
  as a raw `hostEventLoopDelayMs` observation. A separate
  `hostEventLoopWindowP95Ms` observation and `hostEventLoopSamples` counter keep
  the reporting-window percentile and original count explicit in history.
- Native simulation CPU/RSS covers tracked `botstrike-engine` roots and their
  observed descendants. Recorder CPU/RSS covers tracked `myelin-botstrike`
  recorder roots and their observed descendants, including the engine processes
  they execute while replaying. No process is counted in both roles.
- Linux child CPU uses cumulative `/proc/<pid>/stat` user/system ticks. The
  sampler obtains actual `getconf CLK_TCK` and `getconf PAGESIZE`; it does not
  assume 100 ticks or 4 KiB pages. CPU uses tick differences divided by the
  actual interval. RSS uses observed resident pages times the actual page size.

`seal-worker.mjs` reports only private internal process lifecycle messages:
`{type:'quality_process',event:'spawn'|'exit',role:'verifier',pid}`. The parent
must demultiplex these from final `{proof}` / `{error}` messages. The final
proof/error format and signed replay/export bytes remain unchanged. Process
messages are not sent to players or written into the native tape.

## Attribution and missing data

PID identity includes `/proc` start time. A recycled PID cannot inherit an old
role or produce a spurious CPU delta. New processes begin with an identity
baseline; when `/proc/uptime` establishes that a descendant was born since the
last sample, its current ticks can be included in that interval. Otherwise its
first CPU interval is `null` with `cpuReason='warming_up'`.

The scanner resolves descendants from actual parent PID chains and retains
already observed children across reparenting after a recorder exits. The exit
interval is marked `process_exit_sampling_gap`: final ticks after the most
recent sample are unknown, so that interval is not presented as a complete
zero/low CPU measurement. Once the known surviving children have a complete
next interval, their role's CPU is available again. A process family explicitly
containing no tracked or surviving observed processes can report genuine zero.

Unsupported platforms, unavailable system constants, permission/read failures,
PID identity changes and inventory capacity failures yield `null` child
measurements with a fixed reason. An unreadable/incomplete family is never
represented by a successful zero. After a failed inventory, CPU baselines reset
so the next successful sample cannot divide several seconds of ticks by one
second. Error messages, paths and arbitrary labels are not exported.

Gateway registration is optional and must use the launcher's explicit actual
gateway PID, for example the private `BOTSTRIKE_GATEWAY_PID` handoff supplied when
that launcher opts into BotStrike transport instrumentation. Do not infer it from
`process.ppid`: the parent could be a shell, supervisor, test driver or another
runtime. A remotely configured runtime or a different PID namespace may not be
able to observe the gateway at all. No supplied PID gives
`gateway_not_supplied`, with null CPU/RSS and unknown process count. Removed,
missing, unreadable, exited or reused gateway identities also never become a
successful zero. A PID unreadable at registration remains unbound until an
explicit untrack/retrack; a later transient read failure clears its CPU baseline
and requires another warm-up interval when readability returns. Exact gateway
reads do not depend on an unrelated complete `/proc` descendant inventory.

The broad/private metrics snapshot exposes gateway counts, availability and fixed
reasons only, never the configured raw PID, parent PID or process start identity.
The PID handoff is operator configuration, not a browser-controlled report field.

## Bounds and evidence limits

Defaults are one-second sampling, 32 tracked roots, at most 4,096 inventoried
processes and 16 concurrent asynchronous stat reads. All are bounded and
configurable. The report states interval, limits, observed process counts,
unavailable reasons, warm-up processes, missed-process counts and skipped
intervals. The report contains no player identifiers, credentials, positions or
raw process IDs.

All CPU/RSS and event-loop values are **sampled intervals or sampled peaks**.
Short-lived children that appear and disappear between scans, and peaks between
samples, may be missed. This is not lifetime process accounting, a maximum
allocation proof, physical input latency, thermal profiling or a quiet-host
performance acceptance. Linux proc visibility restrictions can also limit what
families can be established. Keep those limitations in exported reports.

Run `node --test tests/botstrike-quality-resources.test.mjs`. The suite checks
non-default clock/page constants, stat names containing parentheses, family
separation, start-time PID reuse, orphan attribution, missing intervals,
permissions/unsupported systems/capacity and close behavior. A Linux-only
integration test additionally spawns actual simulation-role and recorder-role
Node processes, with a CPU-active recorder descendant, and samples real `/proc`
families using the host's actual `getconf` values. Those actors validate the
sampler; they are not an accepted game/server load benchmark.
