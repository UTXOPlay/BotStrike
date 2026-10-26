# BotStrike / 2050

An independent, native-authoritative 5v5 robot tactical FPS in a neon industrial city. Six heroes, three maps, team deathmatch and relay demolition. Developed by **Arthur Zhang**, published by **UTXOPlay Labs**, with independent source and history. The store is a separate project; this game runs without a store checkout.

Myelin provides **off-chain host-signed native replay**, not CKB settlement. A signed export proves deterministic host replay under its exact application profile; it does not prove that human clients are honest or that inputs were independently attested.

## Play and build

Node 22.23+, Rust 1.97.1, Clang/libclang, C/C++ tooling, CMake, pkg-config and protobuf compiler are needed for a source build.

```sh
npm ci
npm run build:native
npm run build
npm test
npm run test:host
RUNTIME_TOKEN=<stable-random-secret-at-least-32-characters> npm start
```

Open `http://127.0.0.1:8890/games/botstrike/`. The standalone host issues a signed guest cookie. Use `WEB_PORT`, `GAME_ORIGIN` and `DATA_DIR` to configure serving and persistent match storage. Preserve `DATA_DIR` and the runtime/session secrets across restarts. Native services bind to loopback. Store integration uses private authenticated `X-Runtime-Token` / `X-UTXOPlay-Account` requests and WebSockets.

Choose a chassis and operation, then solo practice, public matchmaking or a private lobby. Private lobbies have an invite code and host start button. AI fills the remaining seats. Disconnected pilots receive AI cover and can reconnect to their seat. The service bounds simultaneous live matches to four by default and serializes replay sealing.

## Operations

- **Team Deathmatch:** five versus five, first to 50 or six minutes. Reboot after four seconds; two seconds of protection ends when firing.
- **Relay Demolition:** first to 13 rounds; swap attack/defense after round 12. Buy time 12 seconds, live round 100 seconds, round transition five seconds. Plant for three seconds or defuse for seven while stationary and grounded; moving, firing or jumping interrupts progress. Planted relay detonates after 40 seconds. Eliminated pilots return next round. Purchases, credits and inventory are native-authoritative.
- **Neon Docks, Skyline Array, Reactor Nine:** distinct native map layouts, two relay sites, cover and spawns, with freight port, antenna complex and reactor scenery respectively.

| Hero | HP / armor | Speed | Skill |
| --- | --- | --- | --- |
| VECTOR | 90 / 25 | 305 | Kinetic dash, 8 s cooldown |
| PATCH | 110 / 35 | 245 | Nearby repair pulse, 18 s |
| BASTION | 140 / 70 | 210 | Five seconds of half damage, 22 s |
| SPECTRE | 95 / 30 | 280 | Four-second enemy radar reveal, 20 s |
| GLITCH | 100 / 40 | 265 | Six-second EMP disable, 18 s |
| FORGE | 120 / 45 | 235 | Five-second faster fire with increased spread, 24 s |

Twelve weapons: ARC-9, NEEDLE, ION-5, RAIL-LANCE, SCATTER, HELIX-3, AURORA, KRAKEN-90, NULLIFIER, ECHO-MK2, SIPHON and QUASAR. Burst fire, armor penetration, EMP suppression, radar marking, nanite healing and plasma splash are native-authoritative. Heavy weapons trade mobility for sustained fire.

Twelve equipment systems: composite plating, photon flash, carbon veil, shard cluster, blackout capsule, echo beacon, nanite injector, armor patch, cryo cell, redline chip, repair swarm and capacitor pack. Buy within credit/carry limits during demolition preparation. Use the field loadout to equip owned weapons or deploy equipment during combat. Deathmatch supplies the full arsenal each respawn. See `botstrike/spec.json` for exact values.

Desktop: WASD, mouse aim, click fire, R reload, Q skill, E use, B armory/loadout, 1–0 / minus / equals or mouse wheel weapons, Z/X/C throwables, G selected equipment, Shift walk, F crouch, Space jump, right-click sniper scope, Tab scoreboard. Touch: left thumb movement, right-side aiming, drag the fire icon while holding it to aim and shoot. Menus and controls remain inside the game scene.

## Combat feedback and preferences

Version 1.2.0 adds bounded positional gunfire, running footsteps, reload and ability cues; distinct headshot/kill confirmation; directional damage, death source, active-effect timers, dynamic accuracy reticle, and relay progress/results. Running is audible; walking and crouching are quiet. Audio sends eight-sector bearings and coarse volume with wall attenuation, never hidden enemy coordinates. Event IDs prevent duplicate playback across snapshots and reconnects.

Controls can be rebound, including mouse buttons. The default crouch is F; Ctrl/Alt/Meta are excluded to avoid browser shortcuts. Settings persist volume, ADS sensitivity, Y inversion, brightness, reticle color/size and optional vibration. ADS sensitivity scales with the scoped field of view. Armory and scoreboard trap keyboard focus and close with Escape. A held scoreboard key remains a hold action; opening via its icon allows Tab navigation.

Choose a new chassis in the match menu; native rules apply it during buy time or on reboot. Dead players can switch among living teammates with the spectator icon or left/right arrows. Spectator visibility and audio follow the selected teammate.

Career records start with this release: authenticated-account K/D, wins/losses and the latest 50 completed, verified matches. Only frames actually controlled by a human contribute; AI cover is excluded. Leaving or having no human input in the final 30 seconds gives no win/loss. Existing matches are not backfilled because their human/AI attribution is incomplete. Aggregates and recent history persist separately from recordings, which still expire after 30 days. Guest history depends on keeping the same guest session. Download signed match exports replay evidence for the exact native verifier; it is not a playable video.

This release changes presentation and host metadata only. Deathmatch targets, weapon/hero values, the native engine, exact verifier and signed application profile remain unchanged.

## Source and verification

- `botstrike/`: 64 Hz Rust authority, deterministic bot routing, combat, modes and replay CLI.
- `botstrike-myelin/`: separately named Myelin application with exact embedded engine bytes and configuration/input schema binding.
- `botstrike-service/`: authenticated room membership, live input, reconnect, bounded recording and replay sealing.
- `games/botstrike/client/`: Three.js scene, six original articulated robots, procedural materials, client movement prediction and UI.
- `games/botstrike/web/art/`: cover plus selection previews rendered from the actual gameplay meshes. See [visual provenance](docs/botstrike-art-direction.md).

```sh
cargo test --release --locked --manifest-path botstrike/Cargo.toml
npm run test:botstrike-native
node tests/botstrike-long-replay.mjs
PLAYWRIGHT_ENTRY=/path/to/playwright/index.mjs CHROMIUM_PATH=/path/to/chrome \
  node tests/botstrike-browser.mjs
PLAYWRIGHT_ENTRY=/path/to/playwright/index.mjs CHROMIUM_PATH=/path/to/chrome \
  node tests/botstrike-art.mjs
PLAYWRIGHT_ENTRY=/path/to/playwright/index.mjs CHROMIUM_PATH=/path/to/chrome \
  node tests/botstrike-armory.mjs
```

Browser tests use an isolated host on port 19885 by default (`STORE_URL` overrides it). `PUBLIC_GUEST=1` enables a disposable store guest when testing through the public gateway. Native integration completes a real match, verifies its signed export and rejects a tampered result. Browser prediction is checked against actual Rust movement on every map and hero. Visual acceptance covers six required viewports. Emulator evidence is not a physical-device performance claim.

## Deploy and compatibility

`npm run build:native` must build the engine **before** the verifier: the verifier embeds those exact bytes. Build inside a deployment-compatible Linux environment; a binary linked on a newer glibc workstation may not run in Debian Bookworm.

```sh
npm run build
# release/botstrike-engine and release/myelin-botstrike must already exist.
docker build -f deploy/Dockerfile -t myelin-botstrike:release .
```

Run on the private `utxoplay-games` network with port 8080 inside the container, a new persistent directory and an untracked token. Set the store's `MYELIN_BOTSTRIKE_URL=http://myelin-botstrike:8080` and matching `MYELIN_BOTSTRIKE_TOKEN`. Do not reuse the OpenStrike save directory. See [release procedure](docs/BOTSTRIKE-RELEASE.md).

Current matches use `botstrike-2050-network-v3` with bounded historical hit poses and deterministic AI reaction. Older signed exports retain their original profile; never import them as new matches. Releases include the exact `arsenal-v2` engine/verifier pair under `release/legacy/arsenal-v2`, plus SHA-256 manifest `release/verifiers.json`. Run `node tools/verifier-manifest.mjs` after building a release, then `node tools/verify-export.mjs <export.json>` to dispatch to the matching verifier without changing an export. Source-only builds can verify current matches directly with `release/myelin-botstrike verify`.

Completed recordings expire after **30 days**. Live, waiting and sealing rooms are protected. The runtime checks retention at startup and hourly. Public matchmaking waits up to ten seconds for humans and only auto-joins a running match within its first minute. A suspended client receives AI cover after two seconds without input.

The private authenticated `/api/metrics` endpoint reports room states, disk availability, replay failures and sealing duration. `/health` checks the native room service. Before replacing an already updated service, POST to its private `/api/admin/drain` endpoint, wait for no running/waiting/sealing rooms, and back up the data volume before switching images. Admin endpoints are not forwarded by the game host.
