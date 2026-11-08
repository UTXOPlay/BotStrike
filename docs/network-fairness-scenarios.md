# Controlled browser fairness scenarios

`tools/network-fairness-scenarios.mjs` is a normal-input scenario controller for
the isolated network lab. Its first run is a zero-shaping development baseline,
not a human encounter, impairment threshold, immutable-image gate or claim that
issues #12/#26 are complete. It never writes a player pose, HP, RNG, Native input
state, game-private window variable or visibility result.

`setupControlledBaseline({browserActors,nodeActors,mark})` creates private casual
deathmatch on existing map 0 through A's real UI. Browser B joins next into slot
5; eight independent C-proxy Node accounts then follow the actual team-balancing
order 1,6,2,7,3,8,4,9. All ten seats must be connected and non-bots before A starts. Node
actors retain neutral normal-control input. Browser public settings fix the
baseline to sensitivity 1, invert off, aim assistance off, FOV 80 and ARC unscoped.
The normal casual tape header remains bots-capable. This is never described as
`bots:false`: `verifyControlledTape` checks real packed takeover bit 256 for every
bots-capable seat at every tick in the selected baseline interval. Passive warmup
is excluded from that interval; this is not a whole-match no-AI claim.

`moveBrowser(actor, [[x,z],...], options)` reads only that actor's own authorized
Native public pose. Before each segment it uses real mouse feedback to align the actual camera to
world yaw/pitch zero and requires corresponding Native acknowledgement. It then
converts world directions into real WASD/Shift events and uses normal F crouch
near a waypoint. Each pulse is anchored to a new observed nonzero WebSocket
send with the intended direction/modifiers. It releases movement, selects only
a neutral send observed after the explicit keyup anchor, and waits for public
sequence/stop feedback before the next decision. Near-target extra hold starts
at zero and adapts from actual stopped public displacement: a zero-motion pulse
grows gradually and an overshoot shortens the next one. Original targets,
tolerance 2, 30-second segment timeout and five-second no-progress boundary are
unchanged. Original modifiers are restored and confirmation or cleanup failure
is recorded. This navigation feedback is not a private Native application proof;
the v3 matrix separately requires explicit input ACKs and exact replay.
Private pulse markers retain down/send/keyup/stop indexes, observed send time,
sequence and public displacement. Marker I/O runs after movement release so it
cannot extend a short hold. No private capture is read to steer.
Blockage, death, lack of progress or timeout fails explicitly. Current routes:

- A: `[-100,1050]` → `[-100,600]`.
- B: `[400,-1050]` → `[400,240]` → `[-100,240]`.

`aimVisible(actor, targetSlot)` reads only the latest actual presentation
subscription's visible player pose and actual camera eye/yaw/pitch. It converts
the error into real mouse movements, then requires observed camera convergence.
No hidden public-state target or runtime observer target is used to aim. Pointer
lock comes from the real menu/resume gesture; acquiring it does not fire a shot.

`runFairnessScenarios({browserActors:{A,B},nodeActors,mark})` prepares the lobby if
A has no room, then runs the routes and one actual ARC pulse. It correlates the
sent `seq/viewTick`, observed Native `last_seq` and shot counter, and asserts one
shot for this unshaped baseline. It records crouch/stand transitions, airborne
jump, reversal request/settle, and B retreating to `[100,240]` behind existing
cover and returning to peek. Rendered target presence is recorded without
inventing a hit/cover verdict. C6 second-target routing remains later work.
Before the first baseline marker, the actors passively warm up for four seconds.
The controller never automatically resumes a paused client. Mid-scenario receipt
recovery, lost focus/visibility or inactive controls fails explicitly.

Markers contain driver wall/monotonic clocks, last observed Native tick, and
per-actor trace indexes. They are correlation anchors, not a claim that the
observed tick is the exact subsequent shot tick. Match the actual fire sequence
against the private runtime's `native_input/native_frame` events and the recorded
Native tape; use the exact retained engine and independently agreeing source
oracle for authoritative geometry and damage interpretation.

To create an independent disposable baseline:

```sh
node tools/network-fairness-scenarios.mjs --baseline
```

The wrapper requests the original desktop 1280×720 profile, DPR .5, a 30 FPS
public render cap, and strict verified hardware GPU rendering. Initial coarse
media remains false, binding the unchanged scene branch to 1024² shadow maps.
System full Chrome is preferred because the tested headless shell emits
cancelling pointer-lock warps; every aim still validates actual trusted deltas. Actual canvas backing sizes are read from each rendered
window, not assumed from DPR or presented as physical device performance.
It uses `createNetworkLab({devSource, runtimeConfig:{runtimeCommand:
['node','tools/start-network-runtime.mjs']}})`, two browser processes, eight Node
actors through C, and one Native room. It records initial/final kernel counters,
bounded private browser/Node captures and the private runtime observer. It leaves
through the existing APIs, closes its own browsers and removes only its owned
lab objects. The private `fairness-baseline.json` links the room's `tape.jsonl`.
The wrapper does not itself mark oracle agreement or final signed match status.
Mutable-source drift, capture drops/errors or unexpected hidden/unfocused
actors invalidate a trial. Do not start while the root is rebuilding its bound
`dist` directory or changing the service/client receipt protocol.

Pure direction/visible-aim helpers are covered by
`node --test tests/network-fairness-scenarios.test.mjs`; those geometry checks
are not Native or network evidence. A complete baseline receipt is required
before adding symmetric/asymmetric impairment trials.
