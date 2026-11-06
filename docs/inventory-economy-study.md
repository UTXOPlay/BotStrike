# Inventory and economy candidate (#17, #18, #20)

Status: private, unranked V5 implementation candidate, **not human-accepted**.
The concrete proposed rules and hypothesis are in `competitive-ruleset.md`.
Production remains the accepted PR #2 animation composition. Do not close the
three issues or call this an approved competitive ruleset from automated evidence.

## Changes and opportunity costs

Tactical Playtest is explicitly private demolition, ten connected READY humans,
no bots or new-account late join, one chassis per squad locked after start, one
primary plus ARC. Casual preserves its multi-gun inventory and AI cover. Both
new V5 casual and tactical reject hero switching as a source of healing/armor;
36 ordered chassis changes verify health, armor, cooldown, guns and items.

A replacement puts the old primary and its exact ammunition into the world.
Dropping the last gun leaves empty hands: ability/equipment remain usable, gun
fire/reload/optic do not. A gifted ARC cannot be reissued by a free buy or a
surviving round restart. Death/half resets deliberately issue ARC. No new damaging
melee is invented. Tactical world budget is 32 drops for 30 seconds/round reset;
casual retains eight drops and its original salvage policy.

A full pool rejects a buy requiring displacement and explicit drop without any
mutation. A pickup consumes its source before inserting a displaced gun. Same
weapon recovery transfers only reserve capacity and leaves unused ammunition in
the world. Native slot order resolves simultaneous claims. Gun actions carry the
observed life in the signed tape; queued pulses and HTTP buys cannot authorize
old-life actions. Native reach/cover/height and relay/plant/defuse priority remain.

## Automated evidence and its boundaries

Commands and receipts are collected in `acceptance/inventory-economy/`.
The portable V5 image is `sha256:dae1966422e99b9e97f1d99ebb13e739af402479565c626b525dd652ede9eca5`,
profile `c5a72be9466ddd4efa23aa6574541714c8112510ba7f2d7008dd0849f8a9925d`.
The Bookworm runtime passed all four signed-match/tamper flows and 66 selected
contracts plus four host tests; local full suites passed 77 native library tests,
one wire test and 164 JavaScript tests. All 6,048 native damage rows match across
local/portable builds. Local and image desktop/touch captures are kept separately.
Native assertions cover full-pool rejection/atomic replacement, exact ammunition,
500 repeated gift/recovery transactions in two equal deterministic states,
life/authority/held edges, unarmed controls, objective/cover/reach/height,
simultaneous claims, expiry, both death slots and source reward selection.
These are executable invariants over specified scenarios, not a formal proof of
all possible gameplay histories.

Economy scenarios cover six consecutive losses, tier cap, win reset, one payment
per round, income for all reserved seats, planted losing attackers, actual fatal
weapon/splash/utility source, credit cap, duplicate buy rejection, armor/gear and
owned-ammunition survival, death reset and halftime. Proposed numbers remain
source-derived and provisional. Native tests do not establish that saving or
comebacks are enjoyable, viable across human skill levels, or free of dominant
strategies. A reviewed force/partial/save distribution report is still required.
`conditional-budget-model.json` contains 16 source-derived purchase-policy blocks
of six rounds each. Wins, survival and planting are stated inputs, not predicted
outcomes; no human performance or Native replay claim is attached to that model.
Reproduce it with `node tools/economy-model.mjs <output.json>`.

Protocol tests use **ten automated authenticated clients, zero human
participants**. They exercise READY invalidation, unique/locked chassis, no AI,
short drop pulses, stale life, empty hands, rejection of free ARC, life-bound
purchase, reserved idle reconnect, enemy-budget privacy, full signed match,
tamper rejection and zero career matches. A separate complete casual match must
continue to sign and preserve career accounting.

Browser captures use software-rendered Chromium; desktop DPR .5 and mobile DPR 1.
They verify common replacement/slot labels, keyboard/touch armory drop, native
recovery and private squad forecasts, wide viewport reach, rotation/fullscreen
policy. An emulated controller is not a physical controller acceptance gate.
Any failed infrastructure or assertion run is retained separately from successful
measurements; it must not be counted as human or device evidence.

New V5 profiles bind the changed native input/state rules and exact engine bytes.
All nine previous production/preview verifier pairs are retained, including V4;
new-profile rejection and exact historical routing are tested. Synthetic retained
matches are clearly distinguished from the saved production exports. Myelin
provides off-chain host replay verification, not CKB settlement.

## Human study still required

Use the ten-person map study roster and privacy-preserving participant IDs. For
keyboard/mouse, touch and a real controller, observe each actor dropping ARC and
a primary, exchanging with a teammate, recovering ammunition with a full reserve,
replacing while reloading, and choosing objective use beside a gun. Before the
transaction ask which gun is replaced and whether any credit/ammunition is minted;
record the answer and actual outcome, with mistakes and retry time.

For poor/rich/partial/force/save scenarios, record all ten authorized squad
budgets, purchases, saved weapons/armor/gear, winner, objective events, kills by
source and next-round budgets. Counterbalance starting sides and at least the
four composition/map blocks described in `flagship-map-study.md`. Record device,
assistance, measured network, experience cohort, sample sizes and uncertainty.
Control for player skill and map before attributing outcomes to a hero. Ask
participants to explain shield/EMP, repair/siphon, reveal/smoke and mobility
interactions using the existing native utility/damage/route studies.

Each proposed numeric change needs a stated hypothesis, observed result, exact
new rules/profile/image and rollback image. No numerical hero tuning or closure
is justified by bot results. Physical input, human comprehension, economy review
and the ten-human match gates remain open.
