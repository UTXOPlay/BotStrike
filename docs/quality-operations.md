# Disposable operations rehearsal

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
