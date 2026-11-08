# Network quality checkpoint

This increment is based on `codex/botstrike-tactical-core` / PR #46 at
`01dee05170c84c3e5d4fde9887c2d10282229f21`. It provides measurement, input delivery
freshness, recovery protection and private inspection tools for issues #30, #12 and #26. It does not
close those issues or certify network fairness, production capacity or a rollout.

The runtime stores bounded, private, fixed-catalog quality metrics with explicit
source/image/profile generations. Browser summary sharing is opt-in and contains
scalar diagnostics only. Runtime peer RTT, authenticated gateway outer RTT and
browser application RTT are different measurements. Resource sampling separates
runtime Node, optional explicitly registered gateway Node, Native simulation and
verifier process families; unavailable observations stay unknown.

Career recovery now protects the last verified source when persistence fails.
Retention also checks that protection independently. The private operations tool
rehearses drain, complete sealing, current and retained-profile backup/restore,
restart, failed verification, retention/recovery faults and application rollback
using disposable synthetic data. See `quality-operations.md` for the evidence
boundaries, including accelerated wall-clock scheduling and injected faults. The
separate disk drill exercises real ENOSPC in an owned bounded tmpfs; its mutable
development result still requires an immutable-image rerun.

The Native fairness inspector replays the unchanged production tape against both
the source inspector and the retained exact engine. It compares every state hash
and the complete trace before admitting a source witness. Its geometric witness
has an explicit supported subset; unsupported shots remain unavailable. Native
rules, packed controls, model digest and retained engine/profile bytes are
unchanged. Myelin remains off-chain host replay.

Versioned outer delivery receipts now require browser acknowledgement and expire
400 ms after runtime issuance. Ownership, room, life and each latched action's
original receipt are checked before admission and again after asynchronous tape
writes. Receipts do not prove which pixels a player saw. Expired actions enter
neutral recovery; cached clients without the protocol must reload. The browser
presentation subscription and private raw Native observer provide correlation
points, not a completed fairness acceptance result. Raw Native lines preserve
signed zero for exact all-state hashing. No new public endpoint exposes hidden state.

Development evidence includes matched real TCP outage trials (obsolete controls
rejected with positive fresh-input recovery), cached-client compatibility, a
two-browser/eight-client baseline and one zero-impairment matrix case. The latter
matched 4,194 Native state hashes and complete traces, with six original pulse
tickets and three available ray witnesses. These are automated local results,
not immutable-image or human acceptance. The Tactical flow also completed a
signed 186,880-tick replay, but disconnects its clients before timer completion;
it does not prove continuously controlled full-match play.

## Remaining acceptance work

- Run the complete 31-case matrix with actual TCP ingress impairment, packet-level delay, jitter, random and
  burst loss, bandwidth limits, outages and network changes; record actual kernel
  counters. JavaScript message omission is not TCP packet loss.
- Correlate actual browser presentation, input arrival/admission, Native tape,
  shots and damage for symmetric/asymmetric RTT and low-FPS trials. In particular,
  test stale TCP-buffered controls after an outage on the final immutable image.
- Complete ten-controlled-seat Tactical rounds, ownership/reconnect/new-life/
  purchase/capacity checks and exact replay/sealing under those impairments.
- Bind final acceptance evidence to the final immutable application image,
  source revision and exact retained profiles. Mutable local development runs do
  not supply this gate.
- Run the final real Store proxy/fullscreen/input-mapping and delivery-recovery
  browser fixtures at all six required sizes; newly added fixtures are pending.
- Retain real-internet, physical device/refresh-rate and human peek/cover/strafe
  judgments as separate gates. Automated browsers are not human participants.

Existing PR #46 human, listening and map gates are unaffected. This checkpoint
does not merge either branch or deploy to production.
