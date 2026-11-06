# Tactical interface verification — 2026-11-07

The final UI candidate is `botstrike:interface-v5-20261107-v3`, image
`de2b4bfc2ffdcb9607d7594fc825deb5a956478d735fb1fd208c5b45ab0f5631`.
It overlays the bound Tactical V5 application without changing native rules,
the portable profile or historical verifiers. See [candidate.json](candidate.json)
for source hashes and [checks.json](checks.json) for final process outcomes.

| Check | Result | Evidence |
| --- | --- | --- |
| JavaScript / host checks inside the image build | 217 / 4 passed | [unit.tap](unit.tap), [host.tap](host.tap) |
| Independent image and live QA container audit | 27 inherited layers; 113 protected files unchanged; 10 verifier pairs retained | [image-integrity.json](image-integrity.json) |
| Required viewport layout and real purchase/reset/drill flow | Six sizes, 15 results, no page errors, exit 0 | [layout.json](layout.json), [layout.log](layout.log) |
| Communication projection, keyboard, touch and controller | Six sizes, exact 1e-7 inverse checks, no page errors, exit 0 | [comms.json](comms.json), [comms-process.json](comms-process.json) |
| Solo training lifecycle and authoritative commands | No page errors, exit 0 | [practice.json](practice.json), [practice-process.json](practice-process.json) |
| Ten controlled Tactical clients, desktop | Ready progress, own-squad budget, drop/recovery and Use release, exit 0 | [tactical-desktop.json](tactical-desktop.json) |
| Ten controlled Tactical clients, touch | Safe insets, separate armory/comms targets, Native recovery and Use release, exit 0 | [tactical-touch.json](tactical-touch.json) |
| Shared dialog focus fixture | Closed-details contents excluded; summaries, Tab and valid return focus retained | [menu-focus.json](menu-focus.json) |
| Actual-image visual review | Seven DPR1 captures, no page errors, exit 0 | [visuals.json](visuals.json), [screenshots](screenshots) |

The six CSS viewports are 1920×1080, 2560×1080, 2560×1440,
3840×2160, 390×844 portrait and 844×390 landscape. Portrait uses the
game-owned rotation gate. Desktop automation uses DPR 0.5; separate visual
captures and mobile checks use DPR 1. Mobile checks also emulate CSS safe
insets without changing the viewport or input transform. The Tactical touch
Use probe briefly slows the browser CPU by a factor of eight and records real
pointer events, sent inputs, Native recovery and the subsequent release.

All browser clients are automated, with **zero human participants**. Software
rendering and CPU throttling are not physical performance or latency acceptance.
Native rooms and API/socket state are real; the standalone focus fixture has no
Native room. Its DOM-only sentinels are explicitly identified in the receipts.

[build-sources.json](build-sources.json) is the exact build-time snapshot;
[browser-harness.json](browser-harness.json) fingerprints the final harnesses.
The image recipe retains the portable damage oracle/header from the bound
application. A workstation-header mismatch was rejected rather than weakening
the guard. Earlier image failures, the old-report-ID fixture error, an
orientation-event fixture race, preview Origin misconfiguration and an earlier
wrapper exit 143 remain under [failed-runs](failed-runs). V2 results remain under
[prior-candidate-v2](prior-candidate-v2); they are not the final V3 checks.
The earlier Use diagnostic passed and observed a narrow 100ms scheduling margin;
it did not directly reproduce the missing-Use incident. The final client retains
one Use press until actual send and clears it at existing cancellation/lifecycle
boundaries.

The full earlier Use observation is archived as `.json.gz`; its uncompressed
hash is in [artifact-storage.json](artifact-storage.json). That file also records
whitespace-only normalization of archived text logs; original local captures
remain available. Runtime sources and test receipts keep their recorded hashes.

The fresh review instance at `http://127.0.0.1:19925/games/botstrike/` uses the
same immutable image, independent empty review data and no web bind mount.
[review-preflight.json](review-preflight.json) records its matching Origin,
guest authentication and real Native socket handshake. QA containers were
stopped after verification; their data and receipts were retained.

The original human, ruleset, map, audio and device obligations remain open in
[the Tactical completion ledger](../../tactical-core-completion.md). This UI
delivery does not accept those gates or replace production.
