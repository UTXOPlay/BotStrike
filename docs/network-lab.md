# Isolated receiver-ingress network lab

`tools/network-lab.mjs` owns one unique Docker bridge, a server namespace helper,
a separate nonroot application sharing that namespace, and three independent
proxy namespaces A/B/C. It creates only fresh mode-0700 temporary data. It never
queries all running containers, connects to production, runs Docker prune, or
removes an object by a broad name/label search. Cleanup uses only the exact IDs
returned during this manager instance's creation and rechecks their ownership
label. The development transport smoke starts no Native game match.

```js
import {createNetworkLab} from './tools/network-lab.mjs';
const lab = await createNetworkLab({
  applicationImage: 'botstrike:interface-v5-20261107-v3',
  toolImage: 'botstrike:netem-tools-20261108',
  devSource: process.cwd(), // optional read-only development bind, not immutable acceptance
  runtimeConfig: {runtimeCommand: ['node', 'tools/start-network-runtime.mjs']},
  runtimeEnv: {BOTSTRIKE_SOURCE_REVISION: exactSourceRevision},
});
try {
  const proxy = lab.actors.A.proxyUrl; // Playwright HTTP proxy; keep real origin below
  const raw = lab.actors.A.tcpUrl;     // Node HTTP/WS with explicit Host/Origin
  await lab.shape('A', {
    upstream: {delayMs: 40, jitterMs: 5, lossPct: 1, bandwidthKbit: 512, seed: 100},
    downstream: {delayMs: 60, jitterMs: 8, bandwidthKbit: 1024, seed: 101},
  });
  await lab.outage('A', {direction: 'both'}); // real kernel 100% packet loss
  const during = await lab.stats();
  await lab.restore('A'); // restore the profile saved before its first outage
} finally {
  await lab.close();
}
```

The fixed application origin is `http://botstrike.localhost:8080`. Playwright can
use each actor's HTTP/CONNECT `proxyUrl` while navigating to that origin. The raw
TCP endpoint preserves application byte streams unchanged; a Node HTTP/WS driver
must keep `Host: botstrike.localhost:8080` and the fixed Origin instead of treating
the random localhost port as a different game origin. No WebSocket frames,
authentication payloads or native commands are delayed or synthesized in JS.
The optional HTTP adapter validates one fixed destination, normalizes proxy HTTP
headers, then tunnels upgraded/CONNECT streams. All delay/loss happens in tc.

## Kernel topology and profiles

- Server `eth0` ingress matches each actor proxy's distinct source IP and TCP
  destination port 8080, then redirects it into `ifbuA`, `ifbuB` or `ifbuC`.
- Each proxy `eth0` ingress matches server source IP/TCP source port 8080 and
  redirects into that proxy's `ifbdA`, `ifbdB` or `ifbdC`.
- Netem root qdiscs live on the receiving IFBs. Upstream is actor→server;
  downstream is server→actor. TCP handshake, ACKs, retransmissions, HTTP and WS
  bytes sharing that flow are all subject to those kernel conditions.
- `shape(actor, profile)` replaces both directions; omitted directions revert to
  clean defaults. Queue limits default to 1000 packets and are explicitly bounded.
  Delay/jitter are milliseconds; optional bandwidth is kilobits/second; random
  loss is a packet percentage. Jitter requires a positive base delay.
- `burstLoss: {p, r, badLoss, goodLoss}` maps directly to netem Gilbert-Elliott
  `loss gemodel P R 1-H 1-K`, expressed as percentages. It is mutually exclusive
  with nonzero random `lossPct`. The requested seed is sent to actual netem.
- `outage()` can affect upstream, downstream or both. Repeated outages retain
  the original restoration profile. `stats().profiles` is the configured profile;
  `stats().outages` states overridden directions and raw qdisc data is authoritative.
  Replacing qdiscs may reset queues: profile-transition traffic must be separated
  from settled-case acceptance measurements.

A fixed seed pins the qdisc PRNG configuration, not identical application timing
or identical TCP packetization across runs. It does not establish one-way delay,
internet realism, human control quality or competitive fairness by itself.

## Ownership, application and bounds

The application runs normal `node host/start.mjs` and its private child runtime,
with user `1000:1000`, 2 CPUs, 4 GiB memory, 256 PIDs, read-only root filesystem,
all capabilities dropped, no-new-privileges and a bounded 256 MiB `/tmp` tmpfs.
It has no published host port. Only the namespace helpers/proxies receive
NET_ADMIN. Proxies are separately limited to 0.5 CPU, 128 MiB, 64 PIDs, 64 clients,
128 total sockets and 64 in-flight HTTP requests; the namespace holder is bounded
to 0.25 CPU, 96 MiB and 32 PIDs. Proxy and raw ports are randomly published only
on 127.0.0.1. The dedicated bridge is unique to this run. It is not Docker's
`--internal` mode, because that mode does not supply the required published port
mappings on this daemon; this is not a claim of a general internet firewall.
All proxies have a fixed server destination, and the tool contacts no external
service.

`devSource` read-only binds the game's host/service/dist/shared/tools/spec paths
into the application. It is useful for development, but host edits remain visible:
record exact source hashes and use a built immutable application image for final
acceptance. `imageBindings` records image IDs as well as caller references.

The manager creates private `data/network-diagnostics/` and its
`.network-lab-owner` marker, then sets
`BOTSTRIKE_NETWORK_LAB_DIR=/app/data/network-diagnostics`. `runtimeConfig` can
select the private capture wrapper. The runtime/session secrets are fresh and
stored only in a mode-0600 env file. `lab.runtimeToken` is a non-enumerable private
helper value for the driver; do not log it. `lab.inspect()` redacts token, secret,
password and private-key env values before returning container configurations.
Returned topology objects are copies; mutating them cannot redirect manager
operations at another container.

`createNetworkLab()` waits for the real app/runtime health response through C
before returning. No quality or raw-state endpoint is added to public hosting.
The manager's stats use `tc -s -j qdisc`, ingress filters, `ss -tin`, `nstat -az`
and bounded proxy counters. They are saved under its private evidence directory.

Cleanup first gives the owned application `docker stop --time 5`, then removes
only its recorded containers/network. It records capture finalization separately:
a manifest still `capturing`, damaged, dropped, errored or missing when required
is invalid evidence, even when Docker cleanup itself succeeded. Resource cleanup
success never upgrades an incomplete private capture to a pass. Cleanup can retry
its own failed removals and never scans for foreign runs.

## Reproducible checks

- `node --test tests/network-lab.test.mjs tests/network-proxy.test.mjs` validates
  bounded/typed shaper arguments, model exclusivity, initial raw HTTP bytes,
  preserved Origin/Host, binary WS round-trip and fixed-authority CONNECT behavior.
- `node tools/network-lab.mjs --smoke` creates and cleans an actual isolated Docker
  topology. It exercises asymmetric IFB delay/jitter/rate/seed, random and burst
  configuration, 100% A outage/restoration and unaffected C control traffic.
  It is a kernel transport/topology smoke, with no Native game match, and not
  final immutable-image, internet, hardware or #12/#26 acceptance.

## Profile transitions

Each direction receives a fresh qdisc handle at a profile boundary. Reusing a
netem handle can retain an unspecified rate or loss-model attribute; a new handle
resets the complete configuration. This atomic replacement discards any packets
still queued in the previous qdisc and restarts its counters. Transitions are
recorded in `evidence/shaping-transitions.json` and are outside steady-condition
measurement windows. Capture counters before replacing a profile; do not compare
new-generation counters as if they were cumulative or describe a transition as
lossless. The owned lab accepts at most 4,096 shaping-direction transitions.

## Artifact placement and actual interface changes

`createNetworkLab({artifactsRoot, minFreeBytes})` (alias `labRootBase`) selects a
private artifact base; `BOTSTRIKE_NETWORK_LAB_ROOT` supplies a default, otherwise
ordinary labs retain `tmpdir()`. An insufficient filesystem reserve fails before
Docker creation. The matrix sets a home-backed artifact base and its own aggregate
budget; the manager does not delete old runs or automatically truncate evidence.

`changeNetwork('A', {holdMs: 1000})` disconnects only this run's proxy A from this
run's Docker bridge. It temporarily creates a labeled owned address reservation
to retain the old IP, reconnects A with a genuinely different IP, reads the actual
interface name/index, updates only A's receiver ingress and the server's matching
source-IP flower, and reapplies A's saved upstream/downstream profile. It never
manually closes a browser/Node WebSocket. It records old/new IP/interface, owned
reservation ID, raw counters before/after and qdisc reset generations. At most
eight changes are accepted. Reservations enter normal exact-ID cleanup.

Proxy ports are chosen from explicitly reserved loopback ports and then recorded
as fixed Docker publishes. This is necessary because this daemon reallocates
`127.0.0.1::PORT` random publishes after its final bridge is detached. Reconnect
must retain both client endpoint ports; any change fails the operation. The
reservation sockets are released immediately before Docker start, so a competing
foreign bind makes start fail rather than redirect clients to a different port.
The getter `lab.actors` returns copies reflecting current actual bridge IPs.

A successful manager topology change is not a successful application recovery.
The matrix separately requires fresh receipt/neutral/positive Native control.
`artifactInventory()` hashes actual retained Native and runtime/bundle artifacts
inside the application, and records sizes, before/after a case. See
[the matrix contract](network-matrix.md) for immutable image, privacy and remaining
human/physical gates.

## Quality provenance

Before application start, a labeled, network-disabled, read-only short Node
container hashes the actual image's retained engine/verifier/spec and reads its
build guard. It starts no Native simulation. These hashes must match the recorded
exact `c5a72b…` profile and its bound artifact pair. The application and tools
subsequently start by the inspected immutable IDs, even when the caller supplied
a tag. Environment overrides cannot substitute an image/profile identity.

For an immutable application, `BOTSTRIKE_IMAGE_ID` is the actual inspected ID.
A bound source additionally requires the image's source revision ENV, OCI
revision label, `io.utxoplay.source-kind=git_tree`, and the protected-file build
guard to agree, including the unchanged model and portable profile. An older
image without this guard remains source-unbound; the final immutable matrix
refuses it before starting a match. `imageBindings.qualityProvenance` records this
classification and the guard digest.

With `devSource`, source revision and image ID are forced to `unknown` in the
runtime, clearing inherited base-image metadata. QualityStore
`provenanceBound` therefore stays false. The base image's ID does not describe
mounted code. The DEV matrix separately hashes every mounted file/asset for
resume integrity, and the mounted spec must still match the exact Native pair.
