# Mobile presentation

Mobile BotStrike requires a landscape viewport. Browsers exposing the Fullscreen API require a user tap on the fullscreen icon before the game content becomes interactive. The game requests `navigationUI: hide`, then `screen.orientation.lock('landscape')`. If orientation locking is unsupported, the landscape gate remains until the user rotates. Browsers without Fullscreen API support still require landscape; the website cannot hide browser chrome using an unavailable API.

The store iframe already delegates fullscreen. The game implements this contract independently of the store. Startup readiness continues to report normally so the store loader can reveal the orientation/fullscreen gate. Exiting fullscreen or rotating to portrait makes the game content inert, opens the pause menu, clears held input and releases pointer capture. The online match continues; returning to landscape/fullscreen does not automatically resume firing or movement.

Touch controls use Lucide 0.468.0 SVGs from the existing installed package, embedded locally with licenses retained under `public/licenses/lucide.txt`:

| Action | Icon |
| --- | --- |
| Fire and drag to aim | crosshair |
| Jump / crouch | arrow-up-from-line / arrow-down-to-line |
| Reload / aim down sights | rotate-cw / scan |
| Hero skill / equipment | zap / bomb |
| Switch weapon / interact | arrow-left-right / hand |
| Armory / scoreboard / menu | backpack / list / menu |
| Fullscreen / close | expand / x |

Controls retain accessible names and numeric ammunition, equipment counts and cooldown indicators. Equipment selection is inside the armory. The left thumb owns movement, jump and crouch; the right thumb owns aim, fire and combat actions. HUD information stays along the upper edge, leaving the center clear. Touch targets are at least 44 CSS pixels, with safe-area-aware edge offsets.

`tests/botstrike-mobile.mjs` exercises the actual store iframe with real browser fullscreen, portrait blocking, three landscape sizes, icon rendering, control/HUD separation, simultaneous two-finger move/fire/aim, native input acknowledgement, rotation while holding controls, fullscreen exit/re-entry and armory/scoreboard access. Reuse a disposable session through `STORAGE_STATE` to avoid creating many guest accounts. `LOCAL_WEB` is for candidate acceptance only; omit it for production acceptance.

Version 1.4.0 adds tap-to-toggle sniper optics and visible-target aim assistance (Standard by default, configurable or disabled in Settings). Scope state is released by menus, portrait rotation and fullscreen loss. `tests/botstrike-readability-browser.mjs` checks native scope acknowledgement, both optic labels, a circular lens, preference persistence and rotation release.
