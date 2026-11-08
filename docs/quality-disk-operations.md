# Bounded career-filesystem exhaustion drill

`tools/botstrike-quality-disk-drill.mjs` exercises a real Linux tmpfs `ENOSPC`
against `CareerStore`'s actual aggregate directory, `/app/data/careers`. It does
not inject filesystem methods or errors. It does not fill the host filesystem,
simulate a power loss, test production saves, or certify a deployment.

The default source is the existing successful synthetic operations rehearsal
`/tmp/botstrike-quality-ops-xoAg8l`. That old rehearsal supplies signed fixture
bytes and attribution; it is not current-source operations acceptance. The
tool accepts only a private owned `/tmp/botstrike-quality-ops-*` root with its
32-byte `.ops-drill-owner`, successful report, synthetic active-client origin,
original current-profile export hash, exact pair hashes and career ledger. A
URL, SSH destination, production data path, arbitrary artifact directory or
foreign container ID is not an accepted option.

New runs allocate mode-0700 `disk-drill-*` directories below
`/home/arthur/.codex/artifacts/botstrike-network-20261108`. The complete source
data inventory and recorded export are checked before and after the run. Only
the new **synthetic repair clone** has its derived ledger cleared and
`careerCommitted` reset to false. Original tape, signed export, source metadata
and source ledger remain unchanged. The clone preserves original signed input
copies in its private evidence directory before its eventual retention test.

```sh
# Guard/clone/image-inspection only; does not run a container, verifier or Native.
node tools/botstrike-quality-disk-drill.mjs --preflight --prototype

# Schedule this actual exact-verifier/Native replay with other Native suites.
node tools/botstrike-quality-disk-drill.mjs --prototype

# Final immutable image must already contain this tool and matching modules.
BOTSTRIKE_DISK_APPLICATION_IMAGE=sha256:<local-image-id> node tools/botstrike-quality-disk-drill.mjs
```

Prototype mode binds only this checkout's service and tools directories read
only. Its report sets `developmentBind:true` and never claims immutable-image
acceptance. Immutable mode has no source bind, records the inspected image ID
and revision label, and compares the worker's tool/career/retention file hashes
with the initiating source. It does not pull an image or contact a registry.

The exported API is
`runDiskDrill({sourceRoot, applicationImage, devSource: null|checkout,
preflightOnly: false})`, returning `{root, reportFile, report}`. The CLI exposes
only `--preflight` and `--prototype`; the image can be selected through
`BOTSTRIKE_DISK_APPLICATION_IMAGE`. `preflight_only` is not a disk-drill pass.

The owned container uses the inspected immutable image ID, `--network none`,
read-only root filesystem, dropped capabilities, no-new-privileges, user
1000:1000, two CPUs, 4 GiB memory and 128 PIDs. Its only writable bind is the
owned clone. Docker mounts a separate 64-KiB uid-1000 mode-0700 tmpfs at the
actual aggregate directory; the worker checks the kernel mount information,
tmpfs magic, size, UID and capability state. A separate bounded `/tmp` supports
the exact verifier. Cleanup verifies the run label of its captured container
ID and never enumerates or removes other containers.

The worker first verifies the recorded signed export with the original image
engine/verifier pair, checking both binary hashes against the original ops
report and preserving profile `c5a72be9…9925d`. It then fills the career tmpfs
until an actual write returns `ENOSPC`. Recovery must fail with an `ENOSPC`
alert, protect the only source and leave its commit marker false. Evaluating
retention forty days ahead must keep that source. This is an explicit retention
evaluation clock, not an OS clock change.

After unlinking the filler, recovery must commit once, a fresh store's repeated
recovery must apply zero further results, and every account ledger must equal
the original synthetic ledger. Tape/export/action byte hashes must still match.
Retention can then remove the old cloned source while the aggregate survives.
Because tmpfs is ephemeral, the worker copies the recovered ledger into owned
evidence before exit; after container removal the controller cold-copies those
same bytes into the clone's now-unmounted aggregate directory. The report makes
that transfer explicit and does not imply that tmpfs survives a restart.

`tests/botstrike-quality-disk.test.mjs` checks source ownership/lineage, export
and profile binding, path/link rejection and sandbox construction without
starting Docker, Native or verification. A real worker report with
`status:"passed"` is required for the bounded-ENOSPC result, and an additional
no-bind run is required for immutable-image acceptance.

The 2026-11-08 prototype completed in private artifact root
`/home/arthur/.codex/artifacts/botstrike-network-20261108/disk-drill-Ww0fDL`.
Its report records `status:passed`, `developmentBind:true`,
`immutableImageAcceptance:false`, actual 65,536-byte filler exhaustion with zero
available tmpfs blocks and two kernel `ENOSPC` account-write alerts. Recovery
applied one room, repeated recovery applied zero, forty-day retention kept the
source while blocked and removed it after repair, and both career files survived.
Original source inventory and signed-file hashes remained unchanged. Raw exact
verification and container captures are retained privately; the captured owned
container was removed. This prototype does not replace the required final
immutable-image run.
