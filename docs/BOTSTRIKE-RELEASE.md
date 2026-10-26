# BotStrike release procedure

Build the portable engine before its exact-bound Myelin adapter. Run native rules, service, complete signed replay, movement, browser and artwork checks. Publish to the independent UTXOPlay/BotStrike repository. The developer is Arthur Zhang and publisher UTXOPlay Labs.

Use a new private service `myelin-botstrike`, fresh data at `/data/utxoplay/shared/botstrike-2050`, a generated stable runtime token, and the `utxoplay-games` network. Stage the image with disposable data first. The store only proxies the independent game service.

Reconcile the latest deployed store revision before rollout. Back up its SQLite directory coherently; retain the previous image and Compose configuration for rollback. Recreate only the store and the new game service. Preserve all other games, including Prism gesture controls and Block Party.

After BotStrike passes production acceptance, archive the retired game's source refs, data and exact verifier offline, remove its public service/route and delete the explicitly retired GitHub fork. Do not reinterpret historical signed saves with BotStrike rules. Archive retention is not a public product dependency.

The bounded 160 MB tape needs a 176 MB frame envelope and up to 400 MB hex-export allowance. Production uses a 256 MB temporary filesystem and a 4 GiB container memory ceiling, with replay jobs serialized. The six-minute, ten-human-seat fixture exercises a 14 MB tape and 28 MB signed export.

## Production acceptance — 2026-10-26

BotStrike is live at https://store.utxoplay.io/games/botstrike/. The independent UTXOPlay/BotStrike repository is not a fork. The explicitly retired UTXOPlay/myelin-openstrike repository now returns 404, its public game route returns 404, and both historical containers were removed after offline source/data/image/verifier backup validation. Original signed saves remain bound to their original verifier.

The public gateway passed all six required viewports, native input and touch firing/aiming. An actual production match export was verified in the running final game container. The final public asset hashes match this source. See `acceptance/production.json` and `acceptance/arsenal-native.json` for bounded evidence. Store account data was backed up before each store replacement.
