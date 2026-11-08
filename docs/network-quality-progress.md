# Network quality checkpoint

This branch is based on `codex/botstrike-tactical-core` / PR #46 at
`01dee05170c84c3e5d4fde9887c2d10282229f21`. It addresses measurement, input
freshness, recovery and inspection work for #30, #12 and #26. Those issues remain
open. No production rollout, capacity certification or human acceptance follows
from the engineering results below.

The current follow-up replaces receipt-v1 recovery with envelope version 2 and
an explicit, controller-bound Native application acknowledgement. The previous
`last_seq >= neutralSeq` check could accept an AI sequence before a fresh neutral
human input had executed. The new service pairs the final dispatched input with
its Native frame; the client requires an exact actually sent sequence in its
current context. Initial ownership and a new room also require their own neutral
barrier. Stale-action recovery clears held intent and requires explicit Resume.
See `input-delivery-protocol.md` for the wire contract and compatibility policy.

## Prior immutable candidate C

These results bind receipt-v1 candidate C, source tree
`0c84e3631f322798dee2309f7b1b270d926fc1ca`, application image
`sha256:baa5709dcc6ac92ae1caa4be7e842177cc393be278e0a70f3baeca554a181965`.
They are retained evidence and do **not** validate the subsequent version 2 code.

- The pinned Bookworm build passed 378 unit and 24 host checks. Native model
  SHA-256 stayed `4cb119b7638d14fb08cafad9905e9d8bc808d04b233e8d0c4599e6cd79e4ed49`;
  the portable profile stayed
  `c5a72be9466ddd4efa23aa6574541714c8112510ba7f2d7008dd0849f8a9925d`.
  Ten exact retained engine/profile pairs were preserved.
- Ten continuous automated WS controllers completed an 18-round Tactical match,
  13:5 over 95,739 Native ticks, with all configured bots false. Captured, rebuilt
  source and retained-engine state hashes and complete replay traces matched;
  the Myelin signature verified. This is local automated play, not ten humans or
  an impaired-network completion. Omitted ray details do not count as ray coverage.
- Fourteen operations stages exercised drain/seal, current plus nine historical
  profile restore, durable career recovery, verification failures, restart,
  retention and fixed-source rollback. A separate actual 64 KiB career-storage
  tmpfs produced ENOSPC, protected the verified source, and recovered exactly once
  after space was freed. An earlier host EDQUOT failure remains a failed run.
- Actual Store/fullscreen/input checks covered the six required viewport sizes,
  portrait blocking and held-input clearing, exit/re-entry without replacing the
  game instance, controller ownership, privacy and diagnostics. A real 4K/DPR1
  frame was reviewed. Physical notches, touchpads and physical gamepads were not
  established by browser emulation. The Store outage trial passed its then-current
  checks; it does not remove the subsequently discovered recovery flaw.
- The complete 31-case TCP impairment matrix finished with **12 passes and 19
  failures**, no pending or unsupported cases, and complete lossless captures.
  Thirty Casual cases compared 130,913 captured runtime states with exact source
  and retained replay. Four cases each had one unconfirmed shutdown tail frame,
  recorded separately. The failed Tactical case was independently replayed later:
  all 7,495 actual/source/retained states matched. It was cancelled, not a sealed
  complete match, and its original failed classification remains unchanged.

Matrix failures included real resync/availability problems, an input-pulse
navigation problem, recovery-marker analysis errors, and the actual premature
recovery bug. Preview equipment/throw-mode configuration was also incorrectly
classified as an action by one analyser. The Tactical expired-receipt assertion
observed `unknown`, not `expired`; it remains failed. A new negative fixture must
freeze an actually acknowledged receipt, retain its owner/life and challenge
context, then independently establish expiration. No threshold was widened and
no failed steady-state case was rescued by automatically pressing Resume.

A navigation-helper follow-up on C passed RTT100/loss0 with the original goal,
2-unit tolerance and timeout; RTT50/loss3 encountered an actual resync before
navigation. Those two selected trials do not replace the original 31-case matrix
or establish version 2 acceptance. Source-mounted version 2 browser compatibility
checks are likewise development evidence until repeated against a frozen image.

## Remaining acceptance work

- Freeze and build version 2 with exact source/image/profile binding; run the full
  unit/host checks and preserve the unchanged Native rules and retained pairs.
- Re-run all 31 impairment cases with exact public application ACKs, independent
  same-tick private Native proof, corrected navigation and the rigorous purchase
  expiration test. Retain failures and actual kernel counters.
- Complete an actual TCP-fault/release/fresh-neutral/new-intent sequence with all
  ten continuously controlled Tactical slots, then finish, seal and compare every
  state against both source and retained replay. A same-namespace cohort is not
  independent A/B WAN fairness or a human recovery trial.
- Re-run final immutable Store delivery/fullscreen/input mapping and all six
  viewport checks, compatibility, operations/restore/rollback and real ENOSPC as
  required by the changed service/client paths. Prior C results remain distinct.
- Document the measured transport envelope and availability limits. Keep real
  internet, physical input/refresh-rate and human peek/cover/strafe/listening/map
  judgments separate. Automated browsers are not human participants.

Metrics remain bounded, private and source/image/profile bound. Browser sharing
is opt-in and scalar-only. Runtime peer RTT, gateway outer RTT and browser app RTT
are different observations. Unknown process/resource measurements stay unknown.
Private raw captures can contain hidden Native state and synthetic credentials;
only reviewed, redacted summaries belong in public issues or PRs. Myelin remains
verification of the exact recorded off-chain host replay, not CKB settlement.
