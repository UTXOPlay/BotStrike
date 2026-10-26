# BotStrike release procedure

Build the portable engine before its exact-bound Myelin adapter. Run native rules, service, complete signed replay, movement, browser and artwork checks. Publish to the independent UTXOPlay/BotStrike repository. The developer is Arthur Zhang and publisher UTXOPlay Labs.

Use a new private service `myelin-botstrike`, fresh data at `/data/utxoplay/shared/botstrike-2050`, a generated stable runtime token, and the `utxoplay-games` network. Stage the image with disposable data first. The store only proxies the independent game service.

Reconcile the latest deployed store revision before rollout. Back up its SQLite directory coherently; retain the previous image and Compose configuration for rollback. For a game-only release, recreate only the game service. Preserve all other games, including Prism gesture controls and Block Party.

After BotStrike passes production acceptance, archive the retired game's source refs, data and exact verifier offline, remove its public service/route and delete the explicitly retired GitHub fork. Do not reinterpret historical signed saves with BotStrike rules. Archive retention is not a public product dependency.

The bounded 180 MB tape needs a 184 MB frame envelope and up to 400 MB hex-export allowance. Production uses a 256 MB temporary filesystem and a 4 GiB container memory ceiling, with replay jobs serialized. Replay temporary files use the persistent match directory rather than the small temporary filesystem. The current six-minute, ten-human-seat fixture exercises a 15.3 MB tape and 30.7 MB signed export.

## Production acceptance — 2026-10-26

BotStrike is live at https://store.utxoplay.io/games/botstrike/. The independent UTXOPlay/BotStrike repository is not a fork. The explicitly retired UTXOPlay/myelin-openstrike repository now returns 404, its public game route returns 404, and both historical containers were removed after offline source/data/image/verifier backup validation. Original signed saves remain bound to their original verifier.

The public gateway passed all six required viewports, native input and touch firing/aiming. An actual production match export was verified in the running final game container. The final public asset hashes match this source. See `acceptance/production.json` and `acceptance/arsenal-native.json` for bounded evidence. Store account data was backed up before each store replacement.

## Store launcher acceptance

The direct game URL is insufficient as a launch check. An independent game must report `utxoplay:load` to the same-origin parent with the exact `launch` attempt, monotonic progress and all four completed steps. BotStrike reports readiness only after artwork decoding, renderer initialization, the first live session state and two animation frames. Startup failures remain visible with the store's retry action.

Run `tests/botstrike-store-launch.mjs` against `STORE_URL` (defaults to production), with `PLAYWRIGHT_ENTRY` and `CHROMIUM_PATH` where needed. It opens the store card, checks the overlay disappears and the iframe becomes interactive, enters/leaves a practice match, checks all six required viewport sizes, and injects a mobile script failure before retrying with a new launch attempt. `STORAGE_STATE` accepts a private Playwright session file to reuse a disposable guest and avoid exhausting the daily guest-creation limit; `MOBILE_ONLY=1` reruns the mobile case. `LOCAL_WEB` can serve a candidate's static files through the actual store parent before rollout. Never use `LOCAL_WEB` for final production acceptance. `EXPECT_BROKEN=1` documents the original missing-handshake regression.

For a browser-only change, retain the exact native engine/adapter pair and the game data volume. Recreate only the game service. The launcher fix uses `/data/utxoplay/releases/20261026-botstrike-launch-12cc6cb/game.compose.json`; the previous `/data/utxoplay/releases/20261026-botstrike-0.34.0/game.compose.json` retains image `94678f2` for rollback.

## Mobile fullscreen and icon controls — 2026-10-26

Image `myelin-botstrike:9f31867` enforces landscape and requires fullscreen entry on capable mobile browsers. Controls use local Lucide SVG icons, split thumb zones and an armory-based equipment picker. Production store-iframe acceptance covers fullscreen, rotation, three landscape sizes, control separation, icon rendering and simultaneous touch inputs acknowledged by the native service. See `acceptance/mobile-fullscreen.json` and `mobile-controls.md` for evidence and platform limits. The exact native pair and store image are unchanged.

Current game Compose: `/data/utxoplay/releases/20261026-botstrike-mobile-9f31867/game.compose.json`. Rollback Compose: `/data/utxoplay/releases/20261026-botstrike-launch-12cc6cb/game.compose.json`. Both retain the same private environment and game data volume.

## Responsiveness — 2026-10-26

Image `myelin-botstrike:2161113` replaces continuous stale-snapshot attraction with acknowledged-input prediction, coalesces input reporting at up to 60 Hz, adds immediate local firing feedback, batches mobile materials, adapts resolution using elapsed frame time and avoids repeated weapon/resize rebuilds. Browser presentation changes leave the exact native engine and adapter unchanged.

Production touch/fullscreen/rotation acceptance passed. In the same SwiftShader software-rendering setup, median frame time changed from approximately 567 ms to 83 ms, with independent transport RTT approximately 39 ms and native updates approximately 64 Hz. Separate live matches have different AI positions, and these measurements do not represent physical-phone FPS. Detailed evidence is in `acceptance/responsiveness.json`; implementation and regression rationale are in `responsiveness.md`.

Current game Compose: `/data/utxoplay/releases/20261026-botstrike-performance-2161113/game.compose.json`. Rollback: `/data/utxoplay/releases/20261026-botstrike-mobile-9f31867/game.compose.json`. Store and other game services were not recreated.

## Network and replay reliability — 2026-10-27

Version 1.1.0 uses a new exact native profile for up to 13 ticks of historical target hit poses and reaction-limited bots. Accepted view ticks are bounded and written to the signed tape. Remote characters interpolate 32 Hz snapshots behind a 4-tick render buffer; local prediction remains immediate. Hidden enemy poses (including a carried objective) are removed from per-account snapshots. This reduces position disclosure; it is not a guarantee against client-side aim automation.

Async partial-write-safe recording isolates room I/O errors. Native stdin backpressure delays the next tick instead of failing a match. Replay JSON and recording run in a serialized worker. Exports stream through the service and host. The authenticated account determines host request quotas, without trusting arbitrary forwarding headers. Public matchmaking waits ten seconds and avoids automatic late joins after the first minute.

Recordings expire after the user-selected 30 days; active and sealing rooms are protected. Health probes reach the private runtime. Operators can inspect private `/api/metrics`, then use `/api/admin/drain` and wait for running/waiting/sealing counts to reach zero before stopping the game. Keep the previous image, Compose file and coherent data backup. Do not replace the store or other game containers.

The image retains both the current portable pair and exact arsenal-v2 binaries. `node tools/verify-export.mjs FILE` verifies with a matching profile and fails on corruption or unknown profiles. `release/verifiers.json` records their hashes. Never rebuild an old binary and assume its profile matches an existing signed save.

Final production image `myelin-botstrike:1.1.0-network-v3-r1` is healthy. Source commit `0824e8e`; deployment Compose `/data/utxoplay/releases/20261027-botstrike-network-v3-r1/game.compose.json`, with the previous Compose and coherent game-data backup beside it. The previous service had no active engine/verifier or waiting lobby at switch time. Both rollouts targeted only BotStrike. The first before/after container check passed; final acceptance observed a separate concurrent Block Party update. The store and remaining container IDs stayed unchanged. Public JavaScript bytes match the release build; actual store launcher, retry and six viewport checks passed. Both a new production export and an old arsenal-v2 export passed independent verification inside the released container. See [acceptance evidence](acceptance/network-v3.json).

The final browser patch ignores delayed snapshots for departed rooms until an explicit rejoin. The production mobile test injects an old snapshot after leaving and checks it cannot restore the departed room. Rotation assertions wait for packets sent after the portrait gate, excluding controls already in flight before the rotation. Final mobile acceptance passed simultaneous native movement/aim/fire, icon layout, portrait input release, armory, scoreboard and fullscreen re-entry. The final replacement used the new drain endpoint and waited for zero active/waiting/sealing rooms; the native pair/profile is unchanged from the first 1.1.0 release.

## Combat feedback, controls and career — 2026-10-27

Version 1.2.0 implements spatial gunfire/steps/reload/ability cues, directional damage and death source, distinct headshots/kills, spread visualization, relay progress and result banners, effect timers and optional vibration. It adds persistent key/mouse rebinding (default crouch F), ADS scaling and inversion, volume/brightness/reticle preferences, accessible armory/scoreboard focus, native-phase hero selection, and teammate spectator switching. The spectator camera hides the viewed chassis to prevent its body obstructing the camera. The final patch also releases a held scoreboard when a remapped mouse button is released.

Sound cues contain coarse bearing and volume with obstacle attenuation, not hidden positions. Short event windows and per-connection cursors retain events between snapshots without replaying duplicates. The host records human-controlled frames for career K/D, W/L and recent 50 matches; AI cover is excluded. Legacy matches are not backfilled. Career persistence is atomic and idempotent, survives recording expiration, and recovery preserves the recording timestamp. Leaving/no recent human input produces no win/loss. The export action is explicitly a signed match download, not a video player.

Final source implementation: `8345b15` (main implementation `c2c7b3b`). Final image: `myelin-botstrike:1.2.0-design-r1`. Compose: `/data/utxoplay/releases/20261027-botstrike-design-1.2.0-r1/game.compose.json`. That directory retains rollback Compose and a coherent pre-switch data backup. Both switches drained to zero active/waiting/sealing rooms and zero verifier jobs; neither recreated other game or store containers.

The native engine, verifier and `network-v3` application profile remain byte-for-byte unchanged. No weapon/hero values, score target or economy changes are bundled. Current and arsenal-v2 exports both independently verify in the final container. A new production match with career attribution also independently verifies. Recordings still expire after 30 days; career aggregates and recent history persist separately.

Validation: 31 unit/service tests and four host tests; native complete-match/tamper rejection in local and candidate-container runs; six viewport checks; actual store launcher/retry; mobile fullscreen/rotation/three landscape layouts and native simultaneous touch; persisted settings, remapped keyboard crouch and mouse scoreboard hold/release, native inverted ADS, queued hero change, focus/Escape, populated career endpoint and feedback UI. Rare hit/death presentation cases use synthetic WebSocket events; real native input and signed-match checks remain separate. Browser checks use Chromium software rendering and do not establish physical-phone frame rate. See [bounded acceptance evidence](acceptance/design-1.2.0.json).
