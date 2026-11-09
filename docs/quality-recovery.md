# Career recovery and replay retention

The network-quality candidate preserves a completed match's attribution source
until all eligible account aggregates and the room commit marker are durable.
This is service storage work for #30/#26. It changes neither native gameplay nor
the V5 input/result, exact application profile, old exports, or verifier routing.
Myelin remains off-chain host replay, without human-input attestation.

## Server integration contract

`CareerStore(data, {onAlert?, io?})` keeps the existing `commit(room)`, `read(id)`
and `view(id)` entry points. `commit()` rejects if any eligible account could not
be committed; it still attempts the other eligible accounts. Its fulfilled
result has `status: 'committed' | 'skipped'`, `applied` and `alreadyApplied`.
Do not mark a failed commit successful. `view()` does not expose the internal
application ledger. A malformed existing account record is an error, never a
request to replace the account with zero counters.

`await career.recover()` serializes the entire scan/apply/mark sequence with live
commits and returns:

```js
{
  scanComplete: true, // false: room enumeration failed; protection is incomplete
  complete: false,    // false: at least one unresolved recovery failure
  scanned: 4,        // recognized room directories inspected
  recovered: 2,      // pending room markers durably completed, not account count
  pending: 1,        // protectedRooms.size, including corrupt/ambiguous sources
  protectedRooms: new Set(['0123456789abcdef01234567']),
  alerts: [{source: 'career', stage: 'account-write', code: 'ENOSPC', roomId: '0123456789abcdef01234567'}]
}
```

Integrate one maintenance cycle in this order:

```js
const recovery = await career.recover();
recordRecoverySummary(recovery);
if (!recovery.scanComplete) return; // no deletion with incomplete coverage
const protectedRooms = new Set([...activeRoomIds, ...recovery.protectedRooms]);
const removed = await pruneReplays(data, {
  days: retentionDays,
  protectedRooms,
  onAlert: recordStorageAlert,
});
```

One damaged room does not require retaining all unrelated completed recordings:
when enumeration succeeds, its known ID is protected and other safe records may
expire. `pruneReplays()` retains the existing removed-ID array return type. It
also independently refuses eligible uncommitted career sources, so omitting a
known protection set cannot erase those pending records. The caller must still
merge the recovery set: a room already marked committed can be protected by an
audit discovering missing or corrupt account data.

Both callbacks are synchronous diagnostic observers. Alerts use `source`,
`stage`, `code` and optional `roomId`; no account ID, raw filesystem path,
credential, recorded input or unsanitized exception message is included. An
observer failure does not abort storage recovery. The default observer writes a
bounded-field error message to stderr. Metric labels should use only source,
stage and code; do not label metrics with room IDs. `alerts` reports the current
pass, not a durable event journal; a persistent monitoring layer owns delivery
and deduplication. The optional `io` overrides filesystem operations for fault
tests and is not a browser/configuration input.

## Commit and recovery behavior

Account aggregates remain version 1: one application per room ID, the existing
win/loss/draw/left rule, human-frame-only K/D/damage/ticks, and the latest fifty
history entries. All room IDs stay in `applied`, including those no longer in
the short history. Practice and Tactical Playtest never gain career attribution;
legacy recordings without participant attribution are not backfilled.

For an attributed finished verified room, the source shape and the existing
career record/ledger are validated before update. Each account update writes a
new mode-0600 exclusive temporary file, syncs it, atomically renames it and syncs
the containing directory. Account-directory creation is synced through its
parent. Failure after one account succeeds is not rolled back: its application
marker prevents duplication while other accounts retry. A retry also syncs an
already-applied file and directory before treating it as durable.

Only after all accounts succeed does recovery atomically publish
`careerCommitted: true`. It applies the original room atime/mtime to the temporary
file before rename, then syncs the file/directory. A timestamp or room-marker
write failure leaves the room protected and retryable. A crash after a rename
but before its response is safe to repeat: recovery validates/reuses the
application ledger rather than adding statistics again. Temporary filenames
are unique and never read as authoritative records; unrelated crash leftovers
are not used to infer successful writes.

Recovery also audits attributed rooms already marked committed. A missing,
malformed or inconsistent account ledger at this point is ambiguous: it may
reflect operator deletion or damage rather than a missed write. The source is
protected and an alert is emitted; the service does not guess that aggregate
counters should be added again. Restore or reconcile from a coherent trusted
backup before retrying. Keep the damaged files and source until repair succeeds;
replacing an aggregate with an empty object is not repair.

Retention never converts a malformed room or account reference into an expired
record. It validates account reference IDs before constructing a child path and
uses only an actual `ENOENT` to conclude a target room is absent. `EACCES`, I/O
errors and nonregular/symlink targets retain the reference and emit an alert.
Normal recognized directory entries, regular metadata files and private
filesystem ownership remain required. Active rooms are protected by the caller;
old interrupted on-disk rooms can still expire after the existing retention
interval. Account aggregates are not replay-retention targets.

This is a single-writer private-data-directory protocol, matching the existing
runtime ownership. It does not add a multiprocess/distributed lock, repair
arbitrary post-retention data loss, establish cloud-volume power-loss guarantees,
or treat host metadata as human attestation. Directory/file sync errors remain
failures rather than assumed durability. The automated fixtures inject failures
at actual filesystem boundaries; they do not claim a physical ENOSPC/power-cut
experiment or real-network quality acceptance.

## Reproducible evidence

Run `node --test tests/botstrike-quality-recovery.test.mjs`. It uses disposable
real directories, fresh `CareerStore` instances after failures, actual persisted
JSON/mtime checks, and the real retention function. A separate fixture starts two
fresh Node processes after a partial ENOSPC commit: the first recovers/prunes,
the second confirms the same career totals after the source has expired. Cases cover:

- Partial temporary-file ENOSPC, other-account success, recovery-set protection,
  retention's independent pending-source guard, repeated/concurrent recovery,
  restart deduplication, and eventual room/reference expiry.
- Direct live `commit()` rejection without poisoning the serial queue; account
  directory ENOSPC; room rename/timestamp failure; post-rename directory sync
  failure and idempotent retry.
- Malformed source JSON, source/directory ID mismatch, invalid attribution/result,
  malformed and valid-JSON-but-corrupt career ledgers, missing committed accounts,
  conflicting committed markers, missing room metadata and unsafe symlinks.
- Whole-scan EACCES (skip deletion), target-room stat EACCES (retain account
  reference), corrupt/path-invalid references, and later successful cleanup.
- Unchanged practice/tactical exclusions, legacy no-backfill behavior, the
  version-1 latest-fifty history and outcome rules.

The existing career/exclusion regressions are
`node --test tests/botstrike-design.test.mjs tests/botstrike-practice.test.mjs`.
Runtime/metrics integration and the wider transport/network acceptance are
separate work in this candidate; these storage fixtures do not complete #12/#26.
