# Private browser actors for the network lab

`tools/network-browser-actors.mjs` supplies actual Playwright Chromium actors for
the future kernel TCP impairment matrix. It does not itself shape traffic, omit
WebSocket messages, inject Native state or establish network acceptance. Do not
modify staged production/client files to drive scenarios.

Each actor has a separate Chromium process and a separate guest context. The
context proxy is explicitly `http://127.0.0.1:<actor port>` with Chromium bypass
rule `<-loopback>`, and every game request uses the fixed common origin
`http://botstrike.localhost:8080`. The host must be configured for that actual
origin. Rewriting a different Origin header would not validate this topology.
Launch and join while unshaped if startup assets are outside the scenario; record
the later `tc` transition separately.

```js
import {createBrowserActors} from '../tools/network-browser-actors.mjs';
const lab = await createBrowserActors({
  directory: '/tmp/private-lab/browser-actors', // owned 0700, no existing A/B files
  actors: [{id: 'A', proxyPort: 18081}, {id: 'B', proxyPort: 18082}],
  renderFps: 30,
  gpuMode: 'hardware', // strict actual game-canvas renderer verification
  executablePath: '/opt/google/chrome/chrome',
});
try {
  const {A, B} = lab.actors;
  const room = await A.action('private', {
    ruleset: 'tactical', mode: 'demolition', map: 0, hero: 0,
  });
  await B.action('join', {room: room.id, hero: 0});
  await B.waitRoom(room => room?.slot === 5);
  // Driver joins C accounts in actual balanced slots 1,6,2,7,3,8,4,9.
  await A.action('ready', {ready: true});
  await B.action('ready', {ready: true});
  await A.action('start');
  await B.action('resume');
  await Promise.all([A.capturePointer(), B.capturePointer()]);
  const mark = await A.mark('peek-start');
  await A.key('KeyD', 'down');
  const input = await A.waitInput(row => row.input.x > 0, {afterIndex: mark.index});
  const shown = await B.waitPresentation(row => row.players.some(p => p.slot === 0));
  await A.key('KeyD', 'up');
  await A.aim(12, -2); // actual mouse movement; does not press FIRE
  await A.waitRoom(room => room?.state.players[room.slot].last_seq >= input.input.seq);
  // Record `shown` against the separate authorized runtime observer and exact tape.
  await lab.flush();
} finally {
  await lab.close();
}
```

## API and observations

- `action`: `private`, `join`, `ready`, `start`, `resume`, `menu`, `leave`, `buy`.
  These operate real game UI, including its existing controller-token handling.
  `private` accepts the existing `ruleset/mode/map/hero/difficulty` choices.
  `join` requires the full private code. `buy` is for an unowned catalog item;
  existing weapon hotkeys equip owned weapons. Leaving does not silently steal
  control from another tab.
- `room({refresh: false})` returns a copy of the latest received authorized public
  room, including its invite ID/config/slot/roster and Native public state. It is
  kept only in memory. `refresh: true` fetches the existing public state endpoint
  through the browser's actual proxy path. `waitRoom(predicate)` polls the cache,
  avoiding extra HTTP traffic in every scenario tick. Closing an actor cancels
  input, presentation and room waits before stale cached data can satisfy them.
- `key(code, 'down'|'up'|'press')`, `mouse(button, state)`, `aim(dx,dy,{steps})`
  deliver real browser input. `capturePointer()` uses the existing menu/resume
  user gesture and consumes held controls, so run it between trials. `aim` requires
  actual pointer lock by default. It records trusted canvas mouse events and checks
  their net movement against each dispatched integer delta (1.01 CSS pixel
  rounding tolerance); original fractional intent is recorded separately. The
  Resume gesture clicks an explicit integer viewport point so a locator border
  offset cannot corrupt the driver’s pointer anchor;
  an inverse warp or absent delivery fails as an automation capability issue. Its explicit `scopeDrag:true` fallback holds the
  actual right/scope button, which changes scoped input while dragging; it never
  silently fires to acquire mouse control.
- A touch actor is explicitly created with `touch:true`. `touch(type, points)`
  and `rotate(width,height)` use supported CDP device/input APIs; the game's own
  fullscreen/rotation gate remains responsible for clearing held controls.
- `gamepad({axes,buttons,connected})` and `gamepadTap(index)` simulate the standard
  navigator Gamepad API, then use the production game's polling and Native input
  path. They do not prove a physical controller. No game-private input variables
  or Native state are assigned.
- `setRenderFps(30|60|120)` uses an existing real render setting and may enter and
  leave the menu. `cpuThrottle(rate)` uses CDP CPU throttling, where 1 restores the
  baseline. Neither requested caps nor CPU throttle factors claim actual FPS;
  actual draw intervals come from the diagnostic subscription.
- `lastPresentation`, `lastInput`, `lastSnapshot`, `events(kind)`,
  `waitPresentation(predicate,{afterIndex,timeout})` and
  `waitInput(predicate,{afterIndex,timeout})` return bounded copies. Input rows
  contain `.input.seq/.input.viewTick` from actual sent WebSocket frames.
  Presentation rows contain the actual `.camera` eye/orientation/FOV, `.local`,
  authorized visible `.players`, floating `.renderTick`, protocol `.viewTick`,
  and `.window` geometry/backing size/visibility/focus/pointer lock. Native public
  snapshots record exact `last_seq` and visible poses. Old-socket observations
  remain labeled with their generation but cannot replace the active cache.
- `sample()` includes current read-only quality, bounded recent observations,
  real window state, errors and drop counts. `clock()` brackets a browser
  `performance.now()/timeOrigin/Date.now()` read with driver clocks. Presentation
  `atMs` is the browser's actual draw-callback entry; `animationAtMs` is the RAF
  time that selected its unchanged rendered timeline. Node observation times
  reflect CDP delivery/drain, not browser packet arrival. Clock brackets are not
  synchronized clocks and cannot establish one-way latency.

## Explicit rendering capability

The default installed executable is the full system Chrome when available, then
the installed headless shell. `gpuMode:'hardware'` adds `--enable-gpu`, reads the
actual game canvas `WEBGL_debug_renderer_info`, and rejects software or unknown
renderers. No renderer string is overridden. `gpuMode:'software'` is a separate
explicit cohort and must observe a known software renderer. Receipts and samples
record actual Chrome version, renderer, launch arguments and canvas backing.

The pure HTML `tools/network-pointerlock-probe.mjs` uses a real gesture and native
Pointer Lock API, then observes trusted browser mouse events. On this machine,
headless-shell Chrome 156 emitted cancelling inverse cursor warps. Full system
Chrome 157 preserved the requested accumulated mouse deltas at DPR .5 and 1.
This is an automation capability difference, not evidence of a game transform
error. The actor validates movement again inside the real game rather than
assuming all Chrome versions share that result.

## Private evidence and limits

Trace directories must be owned 0700; new JSONL and receipt files are 0600 and
refuse an existing actor trace. Each actor retains at most 512 recent rows per
kind, the browser capture queue holds 512 events, each JSONL line is at most
64 KiB, and the file stops at its configured bound (64 MiB by default, at most
256 MiB). Receipts state bytes, SHA-256, errors, capture drops and write drops.
**Any drop, persistence error or unexpected hidden/unfocused actor invalidates
an acceptance trial.** Earlier trace evidence is never rotated away silently.

No account, cookie or controller token is written to traces. Private invite IDs
stay in the in-memory room API; traces use per-actor room generations. The explicit
`saveSession(file)` writes guest account/cookie material to a separate 0600 file
only when requested. Never publish that credential file. Browser detailed poses
are already authorized player-visible data and remain only in these private lab
files; they are not added to production diagnostic exports or shared metrics.

`--smoke` uses the two proxy ports from `ACTOR_A_PROXY_PORT` and
`ACTOR_B_PROXY_PORT`, with `NETWORK_ACTOR_ARTIFACTS` pointing at a private directory.
It starts one casual room, checks real input/render observations and concurrent
visibility/focus, then leaves through UI and closes its own processes. It is a
software functional smoke with zero humans, not a ten-controlled-seat Tactical,
TCP impairment, final-image, physical-device or internet acceptance result.
