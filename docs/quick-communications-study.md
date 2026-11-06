# Quick communication candidate (#28)

This is an authenticated squad metadata and presentation change. It does not
change native movement, aim, damage, input packing, match phases, inventory or
replay rules. Native V5 and the historical verifier pairs remain the deployment
boundary. Human agreement on callouts and the team coordination exercise remain
open; the user has no ten-person cohort available.

## Names, reports and entitlement

The twelve proposed Neon Docks names retain #14's anchor coordinates: Attack
Spawn, Defense Spawn, A/B Plant Pad, West/East Lane, South/North/West/East Mid and
A/B Approach. They appear in the location HUD, location picker and reports. IDs
are separate from English labels for future localization. Other combat maps use
scaled provisional areas; training uses Firing/Near/Mid/Far/Long Lane names.
These names are proposed, not human-agreed map acceptance.

The six commands are enemy, rotate, hold, utility ready, objective and help;
a neutral location mark is also available. A terrain enemy report says "Enemy
report" and attaches no opponent identity. An explicit opponent choice snapshots
the current authorized native position and life, marked LAST SEEN. It never
tracks later hidden movement. The service rechecks sight/reveal from the living
pilot or authorized living squad spectator. The UI additionally excludes poses
behind the render camera unless the native state explicitly reveals them.

Terrain targeting uses the first public native hull/floor intersection of the
inverse render-camera ray, without testing hidden players. Radar input inverts
the same 240-unit backing transform as its drawing, including actual CSS content
bounds. Roof/wall surfaces are valid; a point under the interior of cover is not.
The selected location picker provides a non-pointer alternative. FOV, camera
translation/roll and supported elevated views use the actual render camera.

## Ownership and bounded delivery

Only the authenticated active controller socket with its current token, room,
map and life may send. Client sender/team/expiry/label fields are rejected.
Communication uses its own metadata packet and does not cause an extra native
pose snapshot or alter recorded controls. Immediate delivery reaches the sender's
team; mute preference acknowledgements reach only that recipient.

Identifiers use team-local sequences. Recipient revisions depend only on the
recipient's entitled projection. Enemy pings cannot advance another team's
sequence, revision, notification cadence or quota bookkeeping capacity.

The token bucket admits three reports then one per 1.5 seconds. There are at most
three active reports per sender, 30 room entries and 32 recent quota records per
team. Reports expire after five monotonic seconds or 320 native ticks. Life,
membership and socket disconnection invalidate reports; reconnect does not reset
the send quota. Match mute suppresses that pilot's existing and future reports
and survives an ordinary same-room reconnect. It is not a cross-match account
block or a chat-history feature.

The inbox rejects older revisions/ticks, consumes the initial session snapshot,
does not extend TTL on repeated snapshots, and remembers removed/expired IDs.
Fresh reports in the initial boundary tick remain distinguishable by revision
and ID. Disconnect, rematch and round boundaries clear the appropriate context.

## Inputs and presentation

V opens the compact command menu; middle mouse sends a neutral terrain mark
without opening a menu, dropping mouse capture or clearing held movement/fire.
Existing saved bindings are retained, assigning unused communication bindings
when their defaults collide. The command buttons also support 1–6, normal focus
navigation and touch. A standard controller opens with D-pad right, navigates
the menu, confirms with A and closes with B. Confirmation is consumed rather
than becoming a native jump.

Opening/closing the command menu clears held controls. Long key repeats and
browser shortcut modifiers cannot dispatch communication commands. The local input menu does not pause the
server match; this is stated in the menu. Radar access is temporarily restored
when the compact training layout otherwise hides it. The communication button
sits beside the radar or in the safe corner, avoiding training controls. The
overlay remains within the game viewport, with safe insets, 44 px controls and
larger text/controls on large displays. Reports use glyphs plus text and do not
require sound. Rendering is bounded to six world labels, four feed rows and a
240×240 radar overlay; static map labels are reused within a frame.

The existing portrait rotation gate, gesture-based shared fullscreen entry,
fullscreen reentry and opaque Store sandbox are retained. The same mobile game
instance survives rotation. The independent projection audit can run in portrait
because it is a development geometry fixture, not a Store game launch.

## Engineering evidence and remaining acceptance

`docs/acceptance/quick-comms/` records the source/image binding and checks:

- Service unit tests cover sender spoofing, unauthorized targets, reveal and
  spectator context, private/team-local revisions, independent team quota
  capacity, flood control, mute, wall/tick expiry and disconnection.
- The actual native three-client flow covers same-team delivery, no enemy packet,
  passive-tab/stale-token rejection, mute privacy and reconnect. Communication
  metadata is absent from the native input tape. These are controlled clients,
  not three human participants.
- A real WebGL fixture compares 288 actual browser pointer events against native
  hull mesh ray hits at all six sizes, four FOVs and three eye heights. Maximum
  projected screen error is below 1.5e-10 CSS pixels in the measured fixture.
- Shipping UI checks cover four desktop sizes, mobile landscape, portrait
  blocking/instance preservation, held-input cleanup and controller confirmation.
  Real touch event coordinates are used when checking the inverse transform;
  the touch driver quantizes its requested coordinates slightly.
- Full build checks and the portable native flow are recorded by
  `deploy/Dockerfile.comms-metadata`, which retains the #25 V5 image's native and
  historical verification artifacts. Only explicit web/service/shared metadata
  copies and a validation receipt are added. The integrated audio metadata also
places a same-tick replenishment close before that actor's held shot while
preserving native shot/hit order. Local firing remains predicted; acknowledged
mechanism cues still need end-to-end latency/listening review.

Browser reproduction: `node tests/botstrike-comms-browser.mjs`, optionally with
`COMMS_COHORT=desktop`, `mobile` or `controller`; set STORE_URL to the intended
candidate. `node tests/botstrike-ping-projection-browser.mjs` is isolated from live
matches. `node tests/botstrike-comms-flow.mjs` uses a temporary authenticated
service and the exact selected native binaries. Browser commands use the recorded
Playwright/Chromium paths. Failed runs are retained: late resize/menu handling,
live API observation after an ephemeral report expired, and expected-vs-actual
touch driver coordinate precision. A heavily loaded software-rendering run is
not physical-device performance evidence.

The same immutable candidate is now staged on the deployment server in an
operator-only isolated container. `acceptance/remote-tactical-preview/` records
the transferred layer/config/file binding, fresh data/secrets/cookie namespace,
internal network, remote native communication and signed practice flows, and
six-viewport UI checks over an SSH tunnel. All 38 pre-existing containers retain
their IDs/images. It adds no public cohort route and does not replace production;
see `BOTSTRIKE-RELEASE.md` for access and the two observed Docker image IDs.

Do not close #28 from these checks. A human squad must agree on the area names
and complete entry, rotation and retake tasks using quick communication alone.
Record completion time, mistaken locations, command/target confusion and input
device, including color-vision and hearing accessibility feedback. Current human
sample size is zero. No signed commit, push or production deployment is claimed.
Myelin remains off-chain host replay verification, not CKB settlement or proof of
human-generated inputs or communication intent.
