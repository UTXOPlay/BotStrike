# Production animation references and BotStrike decisions

Reviewed on 2026-11-02. These are developer accounts of shipped games. Source facts and our engineering decisions are separated below; studying a technique does not establish equivalent implementation or visual quality.

## Gears of War 4: preserve a decaying pose difference

Microsoft's David Bollo describes using inertialization to reduce simultaneous evaluation of outgoing and incoming animation states in the [GDC 2018 session overview](https://www.gdcvault.com/play/1025165/Inertialization). The public overview was reviewed; the complete talk was not reproduced here.

BotStrike has bounded body-pose recovery, while retaining necessary crossfades. Before replacing more transitions, measure their evaluation cost and verify action priorities. The game's reported performance gains cannot be transferred to this implementation as a numerical claim.

## Fortnite: budget animation work and character parts

Epic's [Animation Budget Allocator documentation](https://dev.epicgames.com/documentation/unreal-engine/animation-budget-allocator?application_version=4.27&lang=en-US) uses Fortnite's multiple character components to explain significance-based updates and interpolation. Its [UE 5.4 release notes](https://www2.unrealengine.com/blog/unreal-engine-5-4-is-now-available?lang=en-US) separately identify shipped Fortnite Motion Matching usage; these are distinct mechanisms.

Our first step is to remove repeated transform work. The current experiment updates only weapon/contact transforms needed by IK, leaving static weapon meshes to drawing. Distance-based throttling remains future work and requires close-enemy and first-person readability checks.

## For Honor: consider trajectory, facing and feet together

Ubisoft La Forge's [DReCon article](https://www.ubisoft.com/en-us/studio/laforge/news/VjEIwquaIyEZZSw5RZI0V/drecon-datadriven-responsive-control-of-physicsbased-characters) includes For Honor Motion Matching examples and describes trajectory, facing and foot-continuity constraints. Its physics/learning controller is research, which is not claimed as a shipped For Honor feature here.

Those constraints help evaluate our existing clips. A larger search system needs suitable motion data and runtime measurements; 34 authored clips do not establish that adopting Motion Matching would improve this game. Gait review remains necessary.

## VALORANT: preserve readable action beats and test perceived speed

[Autodesk's account of Riot senior animator Brendan Russert's SIGGRAPH presentation](https://blogs.autodesk.com/media-and-entertainment/2026/10/20/riot-games-animates-valorant-with-autodesk-maya/) discusses consistent weapon-action timing and examples where changing run-animation rhythm affected perceived speed without changing movement speed.

We therefore keep reload animation aligned with weapon-rule duration and test perceived responsiveness separately. Unchanged simulation inputs and movement speed cannot establish unchanged control feel by themselves.

## Practical order of work

The follow-up [walk/run comparison](walk-run-transitions.md) examines Riot's control settings, Valve's public playback-rate code and Epic's documented speed ranges. It explains the normalized gait mapping now shared by BotStrike's body, feet and first-person response.

The [posture follow-up](posture-transitions.md) adds Valve's shipped CS2 airborne-crouch/IK fixes and Naughty Dog's Uncharted 4 physics-animation overview. It distinguishes those production facts from our authored collapse variants, pose-preserving death blend and bounded cosmetic fall.

| Priority | Work | Required evidence |
| --- | --- | --- |
| Current experiment | Remove repeated whole-weapon matrix traversal | Compare against `c978ba4` across six characters, twelve weapons and both views; sampled pose/contact delta below `1e-8`, plus existing contact and lifecycle checks |
| Current measurements | Separate animation CPU from frame pacing | Matched alternating physical-GPU runs, host-load records and preserved failed reports |
| Next | Locate remaining whole-frame cost | Separate scene matrices, submission, GPU work and display pacing; GPU timing is not yet part of this instrument |
| Acceptance | Android and human review | Physical device identity, A/B data and sustained-run behavior; gait, knee, weapon-clipping and control-feel checks |
| After sufficient evidence | Significance/distance tiers and broader transition changes | Protect near characters and first person, then validate reduced updates/interpolation |

The [requirement ledger](hybrid-animation-requirements.md) remains authoritative. Deployment, numerical correctness and artistic acceptance are separate conclusions.
