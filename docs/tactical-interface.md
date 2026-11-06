# Tactical interface refinement

This is a presentation and interaction refinement on the Tactical V5 branch.
It retains the native model, exact portable engine/profile and historical
verifiers. It does not establish human map, balance, listening or hardware
acceptance for the underlying tactical candidate.

## References and interpretation

- [Counter-Strike 2 buying update](https://store.steampowered.com/news/app/730/view/3702568031467145905): compare purchases together and make their consequences legible. BotStrike shows source prices, ownership, real remaining ammunition, credit shortfalls and the same-slot replacement consequence. No refund or new inventory rule is introduced.
- [VALORANT Home/Lobby and navigation update](https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-13-06/): keep mode, squad and the next action prominent. The deployment summary, ready-pilot progress and room actions describe existing state; marketing copy leaves the pause/training path.
- [Apex training design](https://www.ea.com/en-gb/playtesting/news/arsenal-season-game-updates): organize around the training goal and a quick feedback/retry cycle. Native counters are presented separately, with setup and attempt history grouped below them.
- [Riot ping guidance](https://support.riotgames.com/en-us/valorant/gameplay/ping-system): separate an immediate mark from deliberate commands. Location and last-seen attachment are distinct; the detailed panel exposes keyboard/controller hints and squad mute context.
- [Apex accessibility guidance](https://www.ea.com/able/resources/apex-legends/pc): preserve readable feedback, explicit labels and input options. BotStrike adds no branded artwork; it retains its own models, glyphs, audio levels and remapping.

These sources inform the hierarchy and interaction decisions. They are not a
claim of feature parity or equivalent usability/performance to those games.

## Changes

The purchase catalog is the main armory area. Persistent phase/budget, current
loadout and category controls precede it; equipment setup, squad forecasts and
damage comparison occupy separate expandable sections. An equipment-setup action
provides direct focus access. The throw selector is anchored to its own armory
label: the prior global selector could insert it into the lobby instead.

Squad budget rows read only the existing entitled team data, use versioned source
prices/rewards and retain the survival/spending assumptions. They never add an
enemy budget, change a buy request or promise a transaction the native service
has not accepted. Tactical chassis hints now describe its actual locked window.

Training orders its objective, native counters, quick reset, setup and history.
Pellet impacts remain distinct from rounds; no fake accuracy percentage is
computed. Ordinary shot counters do not continually interrupt a screen reader.
Attempt/drill/outcome boundaries have a separate announcement, and unchanged
reports retain their nodes. The compact HUD keeps two drill-relevant counters.

The measured baseline training HUD overlapped the radar by 110 CSS pixels at
1920×1080 and crossed the radar at 4K. Its placement now follows the declared
radar footprint; compact mobile placement leaves the vitals, jump/crouch controls
and aiming centre usable. A resize observer positions the desktop weapon rack
above the actual scaled loadout height, outside the render/input timeline.
Mobile training moves vitals beside the movement controls and keeps the compact
counter card higher. Native Retake/Clutch drills now expose their existing Use
action on touch; no drill rule or input field changes.

The mobile communication entry has its own top-row position in both combat and
training. It leaves a gap beside the armory button and retains 12-pixel text;
the first immutable-image Tactical touch run caught an armory interception when
the old radar-relative position was used outside practice.

Touch Use also retains one pending press until an actual input packet encodes
it. The former 100ms local deadline could expire before a delayed transport
sample. A real diagnostic observed an 82.4ms first-send delay and naturally
occurring longer send gaps under software rendering; it did not directly
reproduce the earlier missing-Use event. Prediction reads do not consume the
pending press. Normal release preserves it; cancellation and existing menu,
rotation, connection and life boundaries clear it. A held Use still follows the
physical hold, with no native command, pickup or relay-rule change.

Communication groups location/attachment, commands and squad preferences. Tab
stays inside the dialog even from a select; closed details do not contribute
hidden focus stops. Controller selection avoids native browser popups, and
default crosshair targeting recomputes from the actual render camera. Quick mark
retains held movement and pointer capture. Existing payload validation remains
in the unchanged service.

The arena/backing-resolution/input transforms, mobile landscape/fullscreen gate,
safe insets, reduced-motion behavior and opaque Store sandbox remain the existing
contracts. A consistent text scale also applies to large-display menus.

## Verification and delivery

Receipts belong in `acceptance/tactical-interface/`. The UI image recipe guards
all protected backend/native/shared files and copies only web assets plus its
validation receipts over the bound application. Browser fixtures use actual
native rooms and label controlled clients and software rendering explicitly.
Offline DOM sentinels used for focus checks are identified and removed afterward;
they do not inject native or network state.

`build-sources.json` records the build-time source snapshot. Browser harness
hashes are recorded separately: an initial communication fixture could select an
older, still-valid report from a metadata update. It now excludes reports known
before each mark, while retaining the exact 1e-7 inverse-transform check. Failed
runs are retained with their image identity instead of presented as passes.

The original human acceptance obligations remain open in
`tactical-core-completion.md`. This refinement is reviewed through PR #46 and
does not automatically merge it or replace production.

The final V3 image passed 217 JavaScript checks and four host checks. All final
browser suites exited zero: six-size layout, communications, training and
desktop/touch Tactical flows. Touch Use recovery also passed with browser CPU
throttling and a later neutral input observed. Independent image inspection
retained all 113 protected files and ten verifier pairs. See the
[verification index](acceptance/tactical-interface/README.md) for exact source,
image, process and screenshot receipts and their limitations.
