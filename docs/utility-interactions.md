# Utility information and counterplay candidate (#16)

Unreleased `botstrike-2050-tactical-v4`; model source
`881347ed6ce9294c91f9bb82c010b06a2302c769fd2810aef4f910b95dd888a5`.
This is an implementation contract and automated evidence, not a balance or
human-exercise acceptance. The fixed V2 human preview and V3 validation image
remain separate. Historical binaries are retained, never rebuilt as old rules.

## Native interaction matrix

Time is at 64 Hz. Unless a row says eye, radial distances use player feet and the
actual field/blast center in three dimensions. Radial boundaries are open.
Durations never grow from overlapping short applications: a new flash, EMP or
reveal uses `max(existing, new)`. Dead players are not affected.

| System | Range and duration | Team, cover and interactions | Available response |
| --- | --- | --- | --- |
| Carbon veil | Radius 175; 896 deployed ticks (14s) | Optical rays through the sphere are blocked for either squad. A tangent is open. No bullet, fragment, flash or radio-scan shielding; no dynamic holes or grenade clearing. | Wait, take another line, or use bounded radio reveal. |
| Photon flash | Eye-to-blast range <650; 0–192 ticks | Both squads, including protected spawns. Solid cover blocks; smoke does not. Uses the punched native view direction. Looking away and distance reduce duration continuously before tick rounding. | Turn away, increase distance, or break the solid line. |
| Fragment | Range <260; instant on fuse expiry | Enemy damage falls from 95 before shield/armor accounting; cover blocks. No self/friendly damage. Damage is at least 1 strictly inside the radius; zero at/outside it. | Move away or put solid cover between feet/eye and blast as appropriate. |
| EMP capsule | Range <350; up to 320 ticks (5s) | Enemies only, solid-cover and spawn-protection aware. Clears temporary shield/overdrive and redline; stops future hero skill activation. Does not prevent moving, shooting, using most items, healing, or existing deployed fields. | Cover, spacing, wait, then re-activate a skill. |
| Echo beacon | Sphere <450; 512 deployed ticks (8s); mark refreshed to at least 32 ticks | Enemies only; cover/smoke/protection do not block radio detection. A longer hero/weapon mark is not shortened. Existing field continues after owner's EMP/death. | Leave the sphere; allow the 0.5s tail to expire, or wait for field expiry. |
| Repair swarm | Sphere <220; 512 deployed ticks; +8 HP at global one-second ticks | Allies only, capped at hero max HP; cover/smoke/owner EMP/death do not stop an existing field. Overlapping fields heal at most once per player per tick. Does not restore armor or revive. | Deny the position with damage/angles; a lethal hit resolves before a later heal. |
| Aegis shield | 320 ticks (5s), self | Halves incoming enemy damage, rounded up before armor. EMP removes it; flash/reveal are not damage and bypass it. | EMP, focus fire, or wait out the shield. |
| Medic pulse | Sphere <340; instant +45 HP | Allies, including self; through cover, capped HP. EMP blocks activation, not healing that already happened. | Split threats or burst damage; no revive. |
| Network scan | Sphere <1000; mark at least 256 ticks (4s) | Enemies through cover/smoke, including protected spawns. EMP blocks a new activation but does not erase existing marks. | Hold cover, wait for expiry, then reposition. |
| Hero EMP burst | Sphere <460; disable at least 384 ticks (6s) | Enemy skills/shield/overdrive/redline; through cover and spawn protection, unlike the capsule. Existing fields/marks persist. | Space beyond the radius or wait; cover alone is insufficient. |
| Weapon EMP / mark | Actual hostile HP damage; 64 / 128 ticks | Cannot apply through an invulnerable/friendly hit. Preserves a longer disable/mark. EMP also clears shield/overdrive/redline. | Cover and avoid repeated confirmed hits. |
| Forge / redline | Self 320 / 256 ticks | Faster firing with wider spread; EMP removes them. Redline cannot activate while disabled. They do not reduce enemy visibility or change hit volumes. | Cover, exploit spread at distance, EMP, or wait. |

Repair kits heal 45 HP (no revive); armor patches add up to 40 armor (cap 100).
Coolant subtracts up to four seconds of skill cooldown and clears fire wait; it
does not remove EMP or reload. Supply restores owned-weapon reserves, not the
loaded magazine. Native inventory, cooldown and held-press edges still apply.

The flash curve uses `f=(clamp(dot,-1,1)+1)/2`, `s=f²(3−2f)` and
`ceil((32+160s)×(1−distance/650))`. At/above range it is zero. Zero-distance
detonation counts as facing forward. Front/rear maxima remain 3s/0.5s; the old
abrupt 90-degree and range cliffs are removed. This is provisional numerical
tuning; human comparison is required before calling it balanced.

New V4 gameplay changes also replace XZ-only ability/field/blast range checks
with the stated 3D ranges, stop short reapplications from cancelling stronger
effects, use authored hit samples for AI optical cover, and cap overlapping
repair. V3 signed outcomes retain the prior behavior.

## Entitlement and presentation

Squad radio, optical sight and sound are distinct. Team state remains shared.
An enemy radio mark exposes position and mark duration, not velocity, pose,
weapon, health, armor, reload or active-effect details. It cannot create a
world character, IFF glyph, motion event or aim assistance through smoke/cover or
during flash. The radar remains usable during optical jamming. AI may update
navigation memory from a live mark; it needs optical sight to acquire/fire.
After mark expiry it retains only bounded last-seen memory, not live tracking.

Native AI and service optical cover use the same 14 authored head/body samples;
501 transformed fixtures compare every point. AI keeps its explicit difficulty
range and 140-degree perception cone; the service is an authorization boundary,
not a claim that bots and camera FOVs are identical.

Flash fully obstructs the world for its native duration. Reduced motion uses a
dark static obstruction with the same information loss; ordinary mode uses a
light static obstruction. Both keep HUD and controls available. Effects follow
the authorized living spectator, never a dead seat's stale flash timer.
Scanner and repair rendering now use spheres matching native ranges, replacing
flat discs. Reference-camera and real low-quality perceptual review is pending.

V3 utility/objective redaction remains, with one refinement: a radio location
does not authorize enemy objective-carrier or interaction details. Enemy volume
visibility still uses 28 bounded sample rays; it is not continuous occlusion
proof for arbitrary narrow apertures.

Native events record private impact origins for utility/plasma and damage.
Audio uses the actual world source, including vertical range and solid-cover
attenuation; the client receives only eight-sector bearing, three distance bands
and a muffled flag. Exact origins are stripped from personal/global feedback as
well. Explosion events no longer trigger a throw animation on the remote owner.
Full audio/footstep/mix acceptance remains #24/#25.

## Exercises and remaining acceptance

Use a fixed map/rules/profile and paired attacker/defender roles; exchange roles
and preserve signed tapes. Do not count automated inputs as human participants.

| Pair task | Attacker action | Defender response to test | Record |
| --- | --- | --- | --- |
| Isolate a line | Smoke a site approach | Change angle or wait; compare scanned and unscanned cases | Correctly identify which line is obscured and when it reopens. |
| Entry flash | Throw a flash before crossing | Turn away vs solid cover vs smoke alone | Flash duration, exposure and explanation of the result. |
| Smoke + beacon | Scan a smoked lane | Exit detection radius and re-enter after expiry | Radar-only mark, mark tail and no optical body/assistance. |
| Shield + EMP | Hold an angle with shield | Capsule from clear line; repeat behind cover and with hero burst | Explain shield removal and the cover/protection differences. |
| Repair hold | Deploy one then overlapping fields | Alternate angle/burst or deny the position with a fragment | Healing ticks, no overlap multiplication, understandable lethal damage. |
| Retake | Mix one information and one disruption tool | Defend using spacing, cover and cooldown timing | Objective outcome and a response each participant can explain. |

Current human participants/exercise results: **0**. No flagship layout is yet
approved by the requested human 5v5 study. The exercise protocol is ready;
scheduled recruitment and completed human evidence remain acceptance work.
Evidence: `acceptance/utility-interactions/candidate.json`. Both local and portable
builds pass complete combat/practice replay and result-tamper checks; nine release
trials match 825/870 trajectory observations. There are 65 native, 157 JS and four
host checks. The final fixed image passes all six viewports, native-backed
smoke→scan radio-only rendering and ordinary/reduced-motion flash checks. Five
saved production exports and eight retained-profile synthetic matches verify;
the new profile rejects the old rules. These are automated, not human inputs.

Deployed effect meshes share one 32×16 sphere in the bounded 40-object pool. The
facet-plane audit measures less than 1% geometric radial underfill (see
`effect-boundary.json`); pixel coverage/opacity and human interpretation still
need reference-camera acceptance. No 120 FPS or physical-device acceptance is
claimed. V3 evidence remains under its own exact source/image records.
