# Input delivery protocol

This is a service envelope policy. It changes neither Native rules nor Native
`Config`/`Input`, signed profiles, retained exports, or replay interpretation.
Myelin verifies the exact recorded off-chain host replay. A receipt proves that
a cooperating client returned state bytes; it does not prove a rendered pose,
human attention, or a human source for an input.

Every WebSocket `control` message advertises
`inputProtocol: {version: 1, maxAgeMs: 400}`. A controller's `state` message carries
an outer `delivery: {version: 1, nonce}` once its room has a Native state and life.
Other connections receive `delivery: null`. The nonce is a random 16-byte value,
belongs to that socket's control epoch, room, and Native life, and is kept in a
bounded 24-entry store. A successful state-send callback marks that receipt
written. Merely generating a state or writing an inner proxy stream does not
establish client receipt.

The client echoes the exact outer delivery object on every input:

```json
{"type":"input","room":"<room>","delivery":{"version":1,"nonce":"<nonce>"},"input":{"seq":1,"...":"normal input fields"}}
```

The authenticated `POST /api/action` purchase body also carries outer `delivery`,
alongside `type: "buy"`, `controlToken`, and the existing purchase/life fields.
The owner token alone cannot authorize a purchase. Native phase, life, and
`action_life` checks continue to apply. Spectating, hero selection, readiness,
and the existing two-second idle takeover policy retain their previous rules.

An input ACK must identify a written, current-generation receipt. Its absolute
deadline is **400 ms after the runtime issued the state**, measured with the
runtime monotonic clock. Arrival time, reusing a nonce, and ACKing later receipts
cannot extend that deadline. The service retains the exact nonce, deadline, and
generation with accepted controls and purchases and checks them again before
Native delivery. `seen` uses the same monotonic clock; initial and released
slots have `seen = -Infinity`, so startup cannot appear to have fresh controls.
Rejecting an incoming envelope does not advance the input sequence, renew
`seen`, or replace held inputs, pulses, or pending weapon requests.

Each latched edge, equipment request, or practice command also retains its own
original ticket and source sequence. A later neutral packet, another field's
update, or a same-owner claim cannot replace that field's deadline. Selection
checks every individual pulse and includes its ticket in the final recording
freshness recheck. Owner/life/reset/release/practice transitions clear matching
value and provenance together. A still-fresh short Use remains latched once
across a following neutral packet; an expired one never borrows that packet's
newer receipt.

`viewTick` is clamped to explicitly ACKed same-owner/room/life snapshot endpoints,
and to the existing Native rewind limit of 12 ticks. A single ACK grants that
endpoint alone. A second ACK can establish the interval between them. Written
but unacknowledged snapshots grant no interval. `ViewHistory` remains available
for transport statistics and grants no input authority.

Expired and unknown receipts always reject the input, revoke any expired
application ticket, and request a fresh state at most once per socket per 250 ms.
They also send the following recovery notification when a movement, held
control, pulse, weapon request, practice command, or purchase was discarded:

```json
{"type":"input_resync","code":"stale_delivery","error":"Input delivery expired. Refreshing controls; online match continues."}
```

The recovery notification has an independent 250-ms limiter, so an idle refresh
cannot suppress a subsequent action failure. The fresh-state limiter and normal
snapshot broadcasts continue to provide receipts. Sequence, aim, view tick,
life, preview equipment, and throw-mode configuration alone do not interrupt
play when they expire. They still grant no new sequence, `seen` renewal, ACK
history, purchase, or Native action, and the full recording freshness check still
neutralizes expired preview/mode fields. Old owner, room, life, or generation
receipts are dropped with a limited fresh state; they do not force the client
into a menu on every respawn. Changing ownership or context revokes outstanding
tickets and delayed write callbacks. Disconnect and explicit ownership reset
also revoke the control epoch.

Missing delivery and unsupported versions identify an incompatible cached
client. The socket is quarantined until reload: its control is released, it
receives `control` with `active: false` followed by
`Client update required. Reload this page; online match continues.`, subsequent
state messages are suppressed, and `claim` repeats the update error. The room
and Native process continue. There is no direct-runtime compatibility bypass.

## Recording boundary

Each new tape is opened exclusively with append semantics. The service writes
one prospective frame, then rechecks all action-bearing selected tickets after
the asynchronous recording operation. If a selected ticket expired or its
context changed, the service truncates only that frame's still-unsent tail and
rewrites it with the affected slot's controls and purchase neutralized. Sequence,
aim, takeover, and permitted delayed hero selection are preserved. Other slots
retain their controls. A newly arrived input is retained for the next frame.

Each rewrite neutralizes at least one additional slot. Ten slots therefore need
at most eleven writes. The final `native_input` diagnostic and Native stdin
receive the same final packed line, with no asynchronous gap after the final
freshness check. `r.bytes` counts only this line. Truncate/write errors or a
10-second recording timeout fail the room without issuing a verified result.
A timed-out writer retains its descriptor until it settles, preventing reuse
against another room; that pending room also consumes room capacity. Shutdown
does not present an incomplete tape as a completed verified replay.

## Diagnostics and verification

`/api/quality.sampling` describes the monotonic input-age sample, absolute
receipt deadline, and explicit ACK history. Fixed counters include
`inputDeliveryRejected`, `inputDeliveryExpired`, `inputDeliveryUnknown`,
`inputDeliveryContextRejected`, `inputClientUpdateRequired`, and
`inputRecordingRewrites`. They contain no nonce or per-player metric label.
The private observer emits `input_arrival` only after admission, with
`accepted: true` and receipt timing/generation metadata. Rejections emit
`input_rejected` with fixed `reason` and `stage` values (`arrival`, `native_step`,
or `buy`); raw nonces are never emitted.

Successful HTTP purchase admission emits private `purchase_arrival` with a
room-local increasing `requestId`, slot, item, life, issued/deadline monotonic
timestamps, generation and `accepted:true`. The final `native_input` diagnostic
adds `purchaseTickets` only for final packed slots that actually contain a buy,
using the matching captured request ID and timing context. A purchase removed by
the unsent-tail rewrite has no application ticket; its rejection can carry that
request ID. Rejected HTTP requests do not acquire an ID. These observer-only
fields never enter the wire input, Native input, tape or public metrics. Existing
same-slot queued-purchase replacement semantics remain unchanged, so admission
alone does not prove a purchase was dispatched or accepted by Native rules.

Final `native_input.pulseTickets` lists only applied latches with
`{slot, field, sourceSeq, issuedAt, deadlineAt, generation, life}`. Correlate them
with the original source input admission, independently of the final packed
input's sequence. A neutralized slot has no applied pulse tickets. These private
fields contain no nonce, account, or control token and never enter the tape.

The receipt unit fixtures cover exact-nonce eviction, same-deadline collisions,
the 400-ms boundary, clock regression, explicit ACK endpoints, bounded storage,
and owner/room/life callback revocation. Real service fixtures use actual
WebSockets and the release Native engine to cover old held inputs, late high
sequences, quarantine/reload, cross-owner purchases, and slow recording across
the deadline. The slow-recording fixture compares every resulting tape frame
against live Native output and an exact release-engine replay. Accelerated
fixture tick clocks are test scheduling aids, not internet latency measurements
or hardware acceptance evidence.

`tests/botstrike-delivery-recovery.test.mjs` separately verifies that idle
preview/mode expiration does not cause a recovery menu, late neutral packets
cannot acquire sequence/arrival/history authority, a following action failure
still notifies within the idle refresh window, and both held-action expiration
and slow configuration-only recording preserve the strict Native safety gate.

`tests/botstrike-pulse-delivery.test.mjs` reproduces a gated Native step with an
old pulse admitted just before its deadline and a newer same-owner neutral
packet. It verifies per-field rejection without an old Native shot, fresh short
Use retention, and a selected pulse expiring during recording while its neutral
base remains fresh. The original failing diagnostic in private artifact
`pulse-provenance-VOKIE6` remains a reproduced failure; later protected runs do
not relabel it.
