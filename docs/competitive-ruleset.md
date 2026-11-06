# Tactical playtest contract v0.1 (#4, #17, #18, #20)

Status: concrete implementation proposal for an **unranked private playtest**.
Human/map/balance approval is pending. This is not an approved competitive queue.
The user's requested roadmap implementation authorizes preparing the candidate;
automated checks do not establish human acceptance or close the design gate.

BotStrike keeps its six robot heroes, their existing HP/speed/abilities, native
64 Hz simulation, prediction, bounded rewind and exact host replay verification.
It rewards precision/recoil control, stopping, cover/utility timing, team
information and economic choices. Abilities support those decisions; no
unsupported CS:GO parity percentage, MR15/128 Hz requirement or CS2 smoke behavior
is implied. Numerical hero tuning requires the #9/#14/#16 evidence and #20 study.

## Modes and implementation coverage

| Decision | Casual deathmatch / demolition | Tactical Playtest | Authority and work item |
| --- | --- | --- | --- |
| Availability | Existing public, private and solo flows | Explicit private demolition choice; ten connected, ready seats before start; no ranked rewards/career | Service/config/UI: #4/#20 |
| Inventory | Existing twelve-gun ownership | One primary (weapons 1–11), one ARC sidearm (weapon 0); existing equipment capacities | Native + inventory UI: #17 |
| Empty hands / melee | Existing gun experience | Dropping the last gun is legal; empty hands cannot fire/reload. No damaging melee in this slice: none exists today, and adding a new attack needs its own damage/input/animation evidence | Native + presentation: #17 |
| Free ARC | Existing supplies | Issued only on death/half loadout reset, not a free repeat purchase. A survivor who gives it away keeps that consequence | Native: #17/#18 |
| Pickup / gifts | Existing salvage flow | Drop current gun once, then a teammate can recover it; a new gun replaces the same slot. No pickup refund | Native + reach/cover UI: #17 |
| Round format | Existing format | Retain 12-round halftime, first to 13, up to 25 rounds; existing whole-match time bound/draw policy; no new overtime | Native: #4/#18 |
| Friendly effects | Existing hostile-only gun/blast damage; flash affects both squads | Same explicit #16 matrix; no friendly damage and no teammate body collision in this slice | Native: #16/#20 |
| Hero selection | Existing casual selection experience, with exploit fixes tracked in #20 | One of each chassis per squad; chosen in lobby and locked through the match, including halftime. Bot placeholders may be rearranged before humans fill them | Native/service/UI: #20 |
| Input help | Existing opt-in mouse and device defaults | Playtest records each device/assistance setting. Assistance remains limited to authorized optical targets. Client settings are not proof of unaided human input; future queue eligibility must not pretend otherwise | Presentation/service disclosure: #23/#29/#31 |
| Late join / absence | Existing bot cover and late join | No AI control or new-account late join after start. Disconnected seat stays reserved/idle and vulnerable; its owner can reconnect. Match continues, held inputs clear | Native config + service/UI: #4/#20 |
| Economy | Existing casual prices/rewards/supplies | Separate native economy profile below; no recomputed old career results | Native + team UI: #18 |

The initial vertical slice is Neon Docks, ARC-9 / ION-5 / RAIL-LANCE and ten
observed humans. Other existing weapons remain available to study the slot and
economy consequences. Practice stays solo/unranked with its existing drills and
supplies; it does not acquire tactical inventory restrictions implicitly.

## Inventory transactions

Buying or recovering a different primary replaces the existing primary. The old
gun becomes one world drop with its exact magazine/reserve; credits are not
refunded. A pickup removes its source before inserting the replaced gun, so a
full drop pool cannot duplicate or lose either gun. Same-gun recovery transfers
only the reserve room available; any remaining ammunition stays in that drop.
New guns are selected, reload/burst/recoil state resets, and the native ready
delay applies. The other slot survives untouched.

Explicit drop is a life-bound held-button edge, human-controlled only, allowed
during buy/live phases. It fails without changing inventory if the bounded
32-object tactical pool is full. It cannot win over a held objective/use action.
Death releases both carried guns; at the world budget, oldest drops may expire
to make room. Tactical drops last 30 seconds or until round reset. Native slot
order deterministically resolves simultaneous claims; a fresh press and current
life are required. Pickups retain reach, cover, alive/ground-height and objective
priority checks. Unowned guns hold zero ammunition. Round resupply is an explicit
mint for owned weapons, not an accidental effect of giving away a gun.

Keyboard, touch and controller all get a one-action DROP CURRENT control inside
the armory. Before pickup/buy, the UI identifies the slot and weapon to replace.
No mandatory input chord or invented melee action is required.

## Economy candidate

Tactical starts/halftime reset at 800 credits, capped at 16000. Buy time remains
12 seconds. Death resets to ARC with no free armor; survivors retain carried
weapons, remaining armor and equipment. Round reboot restores HP and replenishes
the magazines/reserves of owned weapons only. There is no separate ammo purchase.
Existing item/weapon prices remain source-derived for the first experiment.

Proposed round win award: 3250. Consecutive loss awards:
1900 / 2200 / 2500 / 2800 / 3100, capped at tier five; a win clears that squad's
loss streak and halftime clears both. A planted relay in a lost attacking round
adds 200 per attacker. Existing 300 actor awards for plant/defuse remain explicit.
All reserved seats receive round income, including disconnected/dead seats;
there is no AFK bonus, refund or AI spending. Eligibility/discipline is not
silently inferred from those credit awards.

Proposed kill rewards by weapon: ARC 300, NEEDLE 600, ION 300, RAIL 100,
SCATTER 600, HELIX 300, AURORA 300, KRAKEN 200, NULLIFIER 300, ECHO 200,
SIPHON 300, QUASAR 150; utility kills 200. Friendly/protected/no-damage hits
cannot mint kill money. The fatal native damage source selects the award.

Hypothesis: retaining first-loss 1900 but adding bounded recovery permits a
two-loss save to fund a rifle/armor/utility buy, while force-buy weapons have
different earning potential. Maximum base loss income stays below a win award.
These are provisional values, not a balance verdict. #18 must attach native
multi-round distributions, rejection/cap tests and ten-human poor/rich sessions
before accepting the numbers. Team forecasts expose only entitled squad budgets
and state the survival/next-round assumptions.

## Gates before accepting or expanding

Implementation gates: native slot/ammo conservation and bounded-drop tests;
life/repeated/blocked/objective/simultaneous transactions; casual/tactical
complete signed matches and tamper rejection; exact old-verifier routing; six
viewport/input/rotation/fullscreen paths; source-derived damage/economy forecasts.
No old signed save is interpreted using the new slot/economy rules.

Human gates: follow `flagship-map-study.md` and `utility-interactions.md`; record
ten observed participants, initial-side/composition counterbalance, actual
weapon/skill/device/network cohorts, utility response and drop/recovery
comprehension. Use the six viewport sizes, FOV 65/80/95 and measured baseline,
80–100ms and 150–180ms network blocks where actually available. Report missing
cohorts. No fixed 50% win-rate demand or unstaffed calendar estimate is supplied.

Physical/network gates remain separate from software-rendered QA and bot
regression. Review numerical changes against damage breakpoints and route times;
state hypothesis, outcome, revision and rollback image per batch. Preserve the
casual queue and all exact historical pairs. PR #2 is merged/human-accepted for
animation; prediction, rewind and host replay already exist. The tactical
candidate is new work and is not production-deployed or human-accepted.
