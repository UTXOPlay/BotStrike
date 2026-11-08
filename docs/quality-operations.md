# Disposable operations rehearsal

See [service objectives and operator response](quality-service-objectives.md)
for integrity gates, alert actions and the limits of the current baselines.

## Candidate image construction

`deploy/Dockerfile.network-quality` overlays the service/UI on the retained
portable application pair. Pass the inspected immutable base image ID and the
complete candidate Git tree OID as `APPLICATION_IMAGE` and `SOURCE_REVISION`.
Create the build context with `git archive` of that exact tree, rather than a
mutable working directory. The image source kind is `git_tree`; this does not
assert that a signed commit or production rollout already exists.

The validation stage runs all Node and host tests, including the historical
rollback import regression. Before building, run
`node tools/prepare-quality-validation-git.mjs` in the local repository, then
copy its reported `directory` into the archive context as `validation-git`.
The tool exports only the exact rollback commit and its complete tree/blob
objects, verifies their manifest, hashes and Git integrity, excludes parent
history/remotes/hooks, and leaves HEAD unborn. The Dockerfile verifies the
fixture again. Validation then exports the exact 21 historical service/shared/spec
files into `build-validation/network-quality/rollback-source`. Its manifest binds
commit `01dee05170c84c3e5d4fde9887c2d10282229f21`, tree
`49a9a37472f893d9e6a4dacbf5a6ddc30e593cdc`, every original Git blob OID, file
SHA-256 and byte length. Runtime independently checks the fixed complete
historical file/blob set, hashes and absence of links or extra files; unknown
refs and damaged bundles cannot fall back to Git. Only validation receives Git
objects. The final image keeps the plain bundle and asserts no `.git`, object
fixture, Git executable or Cargo. No fake HEAD or main-repository mount is used.

`BOTSTRIKE_OPS_REQUIRE_BUNDLE=1` is set during the full validation suite and in
the final image. The regression executes the real historical import with Git
unavailable. The full drill still starts the original historical service against
the cold-restored data and exact native pair. Development checkouts without a
bundle retain the fixed-ref Git extraction path; a present but invalid bundle
always fails closed. The build binding includes the bundle manifest and file
hashes.

The tested independent Rust inspector is copied into
`/app/tools/network-audit-inspector`, outside `release`; it never replaces the
engine. `binding.networkAuditInspector` records `file`, `sha256`, `sourceFile`,
`sourceSha256`, `mode: frame-hashes` and `productionEngineReplaced: false`.
It accepts lossless private Native lines and emits full-state hashes without
Cargo in the runtime. `binding.validationDrivers` maps the baked
`tests/botstrike-tactical-active-flow.mjs` to its SHA-256; this is a private test
driver, not a production engine or Native profile change.

Current ops provenance never reads Git HEAD. Image `BOTSTRIKE_SOURCE_REVISION`
and `BOTSTRIKE_SOURCE_KIND=git_tree` must exactly match the build binding;
service/driver inventories and retained Native bytes are checked. A missing
guard or dirty source produces unknown quality provenance plus actual source
hashes. The image ID is explicitly launcher-supplied: the report does not claim
that an environment variable independently proves container identity. The
launcher must retain matching external `docker inspect` evidence. Rollback
records its historical commit and bundle separately and keeps its quality
image ID unknown, since the old fixture is not the candidate's baked service.

Keep the source archive/tree, offline fixture manifest, build log, inspected
image ID and image validation reports as private build evidence. The retained
engine/profile guard is mandatory. A successful build does not replace the
network matrix, Store/browser, operational or human acceptance gates below.

Run `node tools/botstrike-quality-ops-drill.mjs --preflight` to inspect the exact
artifact prerequisites without launching a match. Run the same command without
`--preflight` for the full one-shot local rehearsal. The command prints its final
status and private report path. A preflight result is not an operations pass.

The tool always allocates a fresh mode-0700 `mkdtemp` root below the system temp
directory. It accepts no production URL, existing data directory, container name,
SSH target or deployment destination. Runtime listeners bind ephemeral loopback
ports with fresh synthetic authentication secrets sent over private Node IPC.
All mutations, backup/restore copies, failures and rollback state stay below the
owned root. The source release directory is read-only. Current and retained native
executables are launched serially; the complete command uses one runtime/native
chain at a time. Coordinate with other native experiments before starting it.

## What a successful run establishes

1. Every current/retained engine and verifier in `release/verifiers.json` exists,
   is a regular file, stays within the release tree, and matches its SHA-256.
   Changed/missing bytes, duplicate names and escaping paths fail before matches.
2. An actual `createBotStrike` runtime process runs two authenticated automated
   combat clients with eight native bots through a complete match and successful
   seal. The clients continuously submit movement/fire inputs. Each pilot's
   progress requires a canonical controller-only `inputAck` for an exact input
   in its bounded 256-entry known-sent map, in the same owner/room/life context.
   Its ACK tick must follow the send-time Native tick and not exceed the snapshot
   tick; ACK sequence must equal that snapshot's Native sequence. Owner/control,
   resync, room/life change and socket close clear pending proof. Scalar Native
   `last_seq` remains separately labelled diagnostic data and never authorizes
   progress. The current envelope must advertise receipt protocol v2; neither a
   missing wire ACK nor an AI sequence collision counts. The pre-close pilot
   evidence and human-frame career attribution are checked. These clients are
   not humans. Historical rollback remains a separate read-only HTTP exercise;
   it does not silently downgrade the current pilots to an older protocol.
3. The private drain endpoint is requested while that match is running. New match
   creation is rejected; the existing match completes; running/waiting/sealing
   occupancy reaches zero and private `pendingIO` is zero with `drainReady:true`
   before the runtime process is closed and backed up. Rooms-only responses do
   not authorize a backup.
4. A fresh synthetic complete match/export is produced on every original retained
   engine/verifier pair using the existing
   `tests/botstrike-historical-profiles.mjs` fixture algorithm. It is a no-AI,
   six-minute native-tick deathmatch fixture, not a past production human save.
   No old tape or signed export is rewritten or fed to the latest rules.
5. With the runtime stopped, its complete private data, copied exact artifacts and
   current/retained exports are copied into a cold backup. Regular-file SHA-256
   inventories verify each copy. Restoring into separate directories produces the
   same file bytes and preserves recording timestamps. Every restored export is
   dispatched to the matching original verifier; newer profiles must reject older
   ones before the matching pair accepts them.
6. A fresh runtime process reopens the restored current data and exposes the same
   verified room/export and version-1 career. Repeated maintenance recovery does
   not duplicate results. A separate disposable recovery clone deliberately removes
   derived aggregates and clears the host metadata marker; the signed tape/export
   stay byte-identical. An explicit ENOSPC filesystem-boundary injection blocks
   the career update, retention protects its only source, a healthy retry applies
   it once, and eventual expiry keeps the account aggregate intact.
7. A second complete real native match runs with an intentionally unavailable
   verifier executable. The room fails sealing, has no verified proof, rejects
   export, and records the failure. A separately tampered result is rejected by
   the valid exact verifier, distinguishing launch failure from replay mismatch.
8. A runtime process is stopped with an unfinished real native match, then a new
   process reopens the same isolated data. Startup marks that room interrupted and
   rejects export. This exercises unfinished-state startup recovery after a normal
   process stop, not a claimed hard-kill/power-loss crash test.
9. The verified historical baseline `01dee05` is materialized under the owned temp
   root. Its original service implementation starts a separate process using the
   backed-up private data and the identical exact V5 native pair. It exposes the
   same career and verified result/export. This rehearses an actual application
   code rollback rather than merely restarting the new service. It does not run
   an old native profile against a newer save or modify another game/container.
10. Final checks reject source/artifact drift during the run. A run with changed
    inputs is development evidence, not the final release acceptance artifact.

## Evidence and measurement boundaries

`report.json` records the artifact hashes, current service-source hashes,
immutable rollback revision, stage assertions, fixture origin/profile, copy
inventory digests, result status and limitations. It links raw resource windows,
the private quality response and runtime diagnostic JSONL. Native input tapes,
match actions and original signed exports remain in the private data trees.
The compact native-frame trace retains tick/phase/score/acknowledged sequence;
it does not duplicate the full native state for every tick. Input-arrival,
snapshot-write and seal lifecycle events retain their diagnostic boundaries.

The service runs in its own Node process. Its compatibility-named `host` Node
CPU/RSS excludes the parent operations driver and automatic clients, includes
runtime worker threads, and reports runtime main-thread event-loop delay
separately. These existing operations windows are not measurements of a separate
production gateway process. Optional explicitly registered gateway CPU/RSS is a
different exact-PID component; missing registration stays unknown and is not
backfilled into earlier operations reports. Native simulation and
verifier/replay descendant process families have separate CPU/RSS observations.
The sampler reports warmup/missed/unsupported intervals as unavailable; absent
samples are not converted to zero. Sampled maxima are not lifetime or physical
allocation peaks. Private diagnostic capture and frequent sampling add overhead.
These local accelerated numbers do not certify physical-device FPS, input latency,
network fairness, public capacity or a quiet production host.

Simulation remains 64 Hz with unchanged exact native rules; only the host's wall
clock scheduling uses `tickMs: 0` to complete fixtures faster. The report labels
this explicitly. Historical fixtures use their own recorded immutable pairs.
Coherent backup is made only after drain and process shutdown; copying an active
RocksDB/room directory is not an equivalent backup procedure.

Private `/api/health`, `/api/metrics`, and `/api/admin/drain` report a fixed
`pendingIO` count and `drainReady`. Readiness requires no waiting/running/sealing
rooms and no unsettled recording promises. A failed room with a timed-out but
unsettled writer still occupies capacity and remains protected from retention.
When drain is requested, that failure activates `drain_blocked` until the write
settles. An ordinary live match finishing during drain does not activate that
warning. The listener `ok` flag and public host health retain their existing
meaning; neither is a backup-readiness signal. The operations tool checks the
explicit private drain fields before its cold backup stage.

`tests/botstrike-pending-recording.test.mjs` exercises the actual 10-second
recording watchdog with a release Native process and delayed filesystem-boundary
write: failure stays unverified, old source/account files survive pruning while
pending, capacity remains occupied, and settlement clears the drain barrier
before eventual retention and restart. Its waiting-lobby fixture checks that
normal drain occupancy is not mislabeled as blocked I/O.

The whole private artifact root contains synthetic authentication/account state
and per-session signing keys. Do not commit or publish it wholesale. Review and
export only the report, required redacted diagnostics and artifact hash records.
No production account, token, historical production export or other container is
read or compared. Missing production historical saves are represented honestly by
fresh exact-engine synthetic fixtures, not invented human evidence.

## Failures and remaining gates

The full run fails when an expected invariant or exact artifact check fails and
leaves its report/data for diagnosis. `status: failed` and `status: preflight_only`
never count as accepted operations evidence. The tool does not modify deployment
configuration, issue comments, repositories, native source, signed old exports,
production data or any container.

ENOSPC here is an explicit filesystem injection. The storage fault suite in
`tests/botstrike-quality-recovery.test.mjs` adds partial-account writes, malformed
files, metadata rename/timestamp failures, directory sync errors, restart
idempotence and unsafe-reference cases. A bounded private-container real-full-disk
run remains separate evidence. A real hard crash, physical host durability,
production historical-save restore and deployment/rollback need their own scoped
operator evidence. The local rehearsal does not close real-internet or human gates
for #12/#26 or replace production rollout approval.

Helper guard tests run with
`node --test tests/botstrike-quality-ops.test.mjs`; these tests do not launch native
matches. The complete opt-in tool supplies the operations integration evidence.

## Normal host/start Docker deployment rehearsal

`tools/botstrike-host-deployment-rehearsal.mjs` is a separate **external host QA**
runner. The preceding drill starts an isolated runtime with accelerated wall-clock
scheduling; this runner preserves the image's default `node host/start.mjs`, its
normal runtime child command and `1000/64` ms scheduling. Native rules/profile
are unchanged. It accepts only its fixed D2 candidate and fixed base image IDs,
verifies their actual runtime source closures against the recorded Git tree and
`01dee05`, and never mounts application source into a running container.

Run it from the real local repository with Node dependencies, Docker access on
the local Unix socket, both source references available, and the two immutable
images already present. Supply an explicitly approved, passed operations-fixture
directory containing the original current and nine retained exports. The report
SHA and every original export SHA must match; missing or damaged fixtures fail.
For the recorded acceptance, the approved report SHA is
`4b1e1e1e86d23be48b7bb3e24246a8bb13070bee56ad8bc2b406717deebfff5e`.
Keep its directory and all run output private. Use an owned HOME evidence root
and temp directory; coordinate the exclusive Native lane before `--run`:

```sh
BOTSTRIKE_NETWORK_LAB_ROOT="$PRIVATE_EVIDENCE_ROOT" \
HOST_REHEARSAL_FIXTURES="$APPROVED_OPS_FIXTURE_DIRECTORY" \
HOST_REHEARSAL_FIXTURE_REPORT_SHA256="$APPROVED_OPS_REPORT_SHA256" \
TMPDIR="$OWNED_HOME_TMPDIR" \
node tools/botstrike-host-deployment-rehearsal.mjs --run
```

The runner creates fresh synthetic secrets/guest cookies, an owned ordinary
bridge with loopback-only published ports, and individually labelled containers.
It checks actual port publication, not just requested bindings. A separate
sentinel preserves its HTTP identity, process/container lifecycle and zero
restart count throughout the game-container replacements. Only exact owned IDs
are stopped/removed. Application limits are two CPUs, 4 GiB and 256 PIDs, with a
read-only root, bounded temporary filesystem and owned writable data directory.
Temporary secret files are deleted;
a cleanup or diagnostic failure cannot produce a passed run.

The accepted run completed these stages:

- Generation A: two software-controlled guest pilots and eight AI seats completed
  a normally scheduled 23,040-tick Casual match, sealed it and verified the
  unchanged profile. All 12,119 observed controller ACKs joined their exact taped
  tick, original payload and view tick; 12,117 were active ACKs. Public guest
  authentication and the ordinary host HTTP/WebSocket proxy were used.
- Live drain rejected new creation/join, let the match finish, then required zero
  waiting/running/sealing rooms, `pendingIO:0`, `sealingJobs:0` and explicit
  `drainReady:true`. Cold backup followed confirmed stop. Stop timing must remain
  strictly below 2,900 ms, excluding this host's three-second child-kill fallback.
- Generation B: a new D2 container reopened persistent data with the same guest
  identities, unchanged career/finished export and no duplicate career award.
  Eleven exports were verified using ten exact pairs: the approved current plus
  nine retained fixtures, and the newly completed current export. A distinct new
  match proved fresh neutral and active ACKs, then was explicitly left/cancelled;
  this startup probe is not a second full sealed match. B drained/stopped before
  the latest coherent backup was copied for backout.
- Generation C: the actual fixed base image, with its independently checked
  `01dee05` source closure, read that latest backup with the same guests, career
  and finished export. The same eleven exports dispatched to their exact pairs.
  Old-base `pendingIO/drainReady` are unsupported, not fabricated as zero; no new
  live match or coherent-backup claim is made on that old implementation.

Actual A/B/C stop times were 192.197/182.492/177.718 ms. The sentinel passed 386
observations with zero restarts. External terminal inspection confirmed all six
owned containers and the owned network gone. The accepted run also retained
normal-clock running, steady, sealing and post-seal scalar quality/resource
windows. Their source/image/profile provenance is bound to the actual D2 guard;
the launcher supplies the validated existing profile as operator metadata.
Earlier samples with unknown profile provenance remain unknown. Runtime, gateway,
Native and verifier components retain their distinct measurement boundaries;
clients and this QA driver are outside the application resource limit. These
windows do not establish a capacity SLO, browser FPS or physical latency.

The final host driver is post-build SHA
`a9c1faf434aab08d0dead2ee0ee86103da160fdb89241467a9e3f7f5dc092eb7`;
its 23 focused pure checks and integration receipt are separate from D2's baked
CI totals. See `normalHostExercise` in
[the redacted D2 checkpoint](acceptance/network-quality-D2.json) for receipt
digests. Private input journals retain bounded sent/context/ACK evidence without
cookies, control tokens or receipt nonces. Historical ACKs remain valid only at
their already joined tick; later life-fence neutral fallback creates no new ACK
or active credit. All active payload/view checks remain literal.

The original internal-network attempt remains failed before Native: this local
Docker configuration retained requested bindings but did not publish a host
port. A controlled sentinel probe recorded the difference. Two subsequent
complete-A attempts remain failed at over-strict audit contracts for life-fence
neutralisation and prior historical ACKs. Their original exits/receipts were not
rewritten; independent guard reanalysis is separately labelled. The successful
full chain used fresh identities and the final reviewed guard.

This is disposable local standalone-host orchestration, not a production rollout,
Parent Store deployment, no-downtime migration, human/WAN/physical-device or
capacity acceptance. Retained exports are original-engine synthetic fixtures,
not historical customer saves. Run the lightweight guard tests with
`node --test tests/botstrike-host-deployment-rehearsal.test.mjs`; they do not start
Docker or Native. Full integration remains explicitly opt-in.
