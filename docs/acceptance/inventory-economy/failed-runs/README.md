# Failed validation attempts

These are not passing or human evidence.

- `container-sync-verification.txt`: the full container tactical match reached verification/tamper checks, then the first career GET failed with ECONNRESET. The test synchronously ran the large native verification while hosting its own HTTP server. The next run uses asynchronous child processes so HTTP and connection timers can progress. The corrected asynchronous container run passed all verification, tamper and career assertions; see `../bookworm/tactical-flow.json`.
- `zero-size-reticle-assertion.txt`: Playwright visibility treats the zero-width/height reticle container as invisible even when its overflow children paint. The successful desktop run checks the computed display rule instead.
- `mobile-viewport-screenshot-reset.txt`: an ordinary Playwright screenshot restored the original portrait viewport after CDP rotation. The successful touch run uses the existing `resizeMobile`/`screenshotMobile` helpers throughout.

The successful desktop/touch measurements and local native/protocol receipts are stored separately. Container completion is recorded only after its successful terminal result.

- `image-touch-before-active-wait.txt`: first final-image touch recovery timed out; the native tape contained the drop but no interact action. The test did not wait for the UI to enter active gameplay after closing the armory. It now waits for `data-playing=true` and the closed armory before its native/live and touch checks. See the final-image touch rerun measurements. This is not proof of physical touch reliability or behavior under long browser stalls.
