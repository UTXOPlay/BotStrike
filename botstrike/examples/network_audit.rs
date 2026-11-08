//! Private offline inspector. The original production Game is never mutated by
//! inspection. This example is deliberately outside the application model digest.
use botstrike_engine::{
    movement, ray_box, recoil, sight, Config, Game, Input, Player, Rules, MAX_TICKS, SPEC,
};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::{
    collections::{BTreeSet, VecDeque},
    fs::{self, File, OpenOptions},
    io::{self, BufRead, BufReader, BufWriter, Write},
    path::Path,
};

type Error = Box<dyn std::error::Error>;
const MAX_DETAILS: usize = 4096;
const MAX_FILE: u64 = 194_000_000;
#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
struct Header {
    config: Config,
}
#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
struct Step {
    inputs: [Option<WireInput>; 10],
}
#[derive(Deserialize)]
#[serde(untagged)]
enum WireInput {
    Object(Input),
    Packed(Vec<Value>),
}
impl WireInput {
    // Same 11/12/13-element wire forms as production main.rs. Game::step is
    // still the authority for control validation, bounds and ruleset filtering.
    fn unpack(self) -> Result<Input, Error> {
        match self {
            Self::Object(input) => Ok(input),
            Self::Packed(mut v) => {
                if !(11..=13).contains(&v.len()) {
                    return Err("Invalid packed input length".into());
                }
                let utility = if v.len() == 13 {
                    serde_json::from_value::<u8>(v.pop().unwrap())?
                } else {
                    0
                };
                let practice = if v.len() == 12 {
                    serde_json::from_value::<u8>(v.pop().unwrap())?
                } else {
                    0
                };
                let (seq, x, y, yaw, pitch, bits, weapon, buy, hero, item, view_tick): (
                    u32,
                    f64,
                    f64,
                    f64,
                    f64,
                    u16,
                    Option<usize>,
                    Option<usize>,
                    Option<usize>,
                    u8,
                    Option<u32>,
                ) = serde_json::from_value(Value::Array(v))?;
                Ok(Input {
                    seq,
                    x,
                    y,
                    yaw,
                    pitch,
                    view_tick,
                    weapon,
                    buy,
                    hero,
                    item,
                    practice,
                    fire: bits & 1 != 0,
                    reload: bits & 2 != 0,
                    walk: bits & 4 != 0,
                    crouch: bits & 8 != 0,
                    jump: bits & 16 != 0,
                    ability: bits & 32 != 0,
                    interact: bits & 64 != 0,
                    scope: bits & 128 != 0,
                    takeover: bits & 256 != 0,
                    drop: bits & 512 != 0,
                    action_life: if bits >> 10 == 0 {
                        None
                    } else {
                        Some((bits >> 10) as u8)
                    },
                    throw_mode: utility % 3,
                    preview_item: utility / 3,
                })
            }
        }
    }
}
#[derive(Clone, Serialize)]
struct Pose {
    slot: usize,
    team: usize,
    position: [f64; 3],
    velocity: [f64; 3],
    stance: f64,
    look: [f64; 2],
    alive: bool,
    life: u32,
    protection: u32,
    health: i32,
    armor: i32,
}
impl From<&Player> for Pose {
    fn from(p: &Player) -> Self {
        Self {
            slot: p.slot,
            team: p.team,
            position: p.position,
            velocity: p.velocity,
            stance: p.stance,
            look: [p.yaw, p.pitch],
            alive: p.alive,
            life: p.life,
            protection: p.protection,
            health: p.health,
            armor: p.armor,
        }
    }
}
type History = VecDeque<(u32, Vec<Pose>)>;
fn lcg(random: &mut u32) -> f64 {
    *random = random.wrapping_mul(1664525).wrapping_add(1013904223);
    *random as f64 / u32::MAX as f64
}
fn direction(yaw: f64, pitch: f64) -> [f64; 3] {
    [
        -yaw.sin() * pitch.cos(),
        pitch.sin(),
        -yaw.cos() * pitch.cos(),
    ]
}
fn selected_history<'a>(
    tick: u32,
    view: Option<u32>,
    history: &'a History,
) -> Option<&'a (u32, Vec<Pose>)> {
    view.filter(|v| *v <= tick && tick - *v <= 13)
        .and_then(|v| history.iter().find(|h| h.0 == v))
}
fn ray(
    r: &Rules,
    map: usize,
    origin: [f64; 3],
    dir: [f64; 3],
    team: usize,
    current: &[Pose],
    past: Option<&Vec<Pose>>,
) -> Value {
    let ground = if dir[1] < 0. {
        (-origin[1] / dir[1]).clamp(0., 4000.)
    } else {
        4000.
    };
    let mut nearest = ground;
    let mut cover = None;
    let mut covers = vec![];
    for (index, o) in r.maps[map].obstacles.iter().enumerate() {
        if let Some(distance) = ray_box(origin, dir, o.min, o.max) {
            covers.push(json!({"index":index,"distance":distance}));
            if distance < nearest {
                nearest = distance;
                cover = Some(index);
            }
        }
    }
    let first_cover_distance = nearest;
    let mut target = None;
    let mut region = None;
    let mut candidates = vec![];
    for p in current {
        if p.team == team {
            continue;
        }
        let old = past.map(|poses| &poses[p.slot]);
        let eligible = p.alive && !old.is_some_and(|pose| !pose.alive || pose.life != p.life);
        let pose = old.unwrap_or(p);
        let h = r
            .hit_regions
            .intersect(origin, dir, pose.position, pose.stance, pose.look);
        candidates.push(json!({"slot":p.slot,"currentLife":p.life,"historicalLife":old.map(|v|v.life),"currentAlive":p.alive,"historicalAlive":old.map(|v|v.alive),"eligible":eligible,"pose":pose,"intersection":h}));
        if eligible {
            if let Some(h) = h {
                if h.distance < nearest {
                    nearest = h.distance;
                    target = Some(p.slot);
                    region = Some(h.region);
                }
            }
        }
    }
    json!({"origin":origin,"direction":dir,"groundOrRangeDistance":ground,"covers":covers,"firstCover":cover,"coverOrGroundDistance":first_cover_distance,"candidates":candidates,"target":target,"region":region,"distance":nearest,"winner":if target.is_some(){"player"}else if cover.is_some(){"cover"}else{"ground_or_range"}})
}
fn bot_branch_slots(bots: &[bool; 10], inputs: &[Input; 10]) -> Vec<usize> {
    // Match Game::step's exact non-practice dispatch predicate. This proves
    // only that this frame bypasses AI, not that earlier frames or the match do.
    (0..10)
        .filter(|slot| bots[*slot] && !inputs[*slot].takeover)
        .collect()
}
fn hero_inputs_are_noops(before: &Game, inputs: &[Input; 10]) -> bool {
    // Game::step's only assignment for an input hero requires both
    // (phase == "buy" || !player.alive) AND player.hero != requested hero.
    // Equality therefore cannot assign hero or clamp HP, even for a dead
    // player about to respawn. Practice/AI/nonlive guards remain separate.
    // Conservatively reject differing selections even when live/alive would
    // ignore them. Never strip a hero field from the real or quiet input.
    inputs.iter().enumerate().all(|(slot, input)| {
        input.hero.is_none_or(|hero| hero == before.players[slot].hero)
    })
}
fn witness(
    before: &Game,
    after: &Game,
    inputs: [Input; 10],
    r: &Rules,
    history: &History,
) -> Result<Value, Error> {
    let shots = after
        .events
        .iter()
        .filter(|e| e.kind == "shot")
        .collect::<Vec<_>>();
    let unavailable = |reason| json!({"available":false,"reason":reason});
    if shots.len() != 1 {
        return Ok(unavailable("requires_exactly_one_native_shot_event"));
    }
    let actor = shots[0].actor.ok_or("Native shot without actor")?;
    let weapon = shots[0].value as usize;
    if ![0, 2, 3].contains(&weapon) {
        return Ok(unavailable("weapon_not_audited"));
    }
    if before.practice.is_some() {
        return Ok(unavailable("practice_control_not_reconstructed"));
    }
    let bot_slots_without_takeover = bot_branch_slots(&before.config.bots, &inputs);
    if !bot_slots_without_takeover.is_empty() {
        return Ok(
            json!({"available":false,"reason":"bot_control_not_overridden","botSlotsWithoutTakeover":bot_slots_without_takeover,"controlScope":"this_frame_only"}),
        );
    }
    if before.phase != "live"
        || !before.utilities.is_empty()
        || !hero_inputs_are_noops(before, &inputs)
        || inputs.iter().any(|i| {
            i.ability
                || i.item > 0
                || i.interact
                || i.drop
                || i.buy.is_some()
                || i.practice > 0
        })
    {
        return Ok(unavailable("side_effect_or_nonlive_frame"));
    }
    if before
        .players
        .iter()
        .enumerate()
        .any(|(s, p)| s != actor && (p.burst_remaining > 0 || inputs[s].fire))
    {
        return Ok(unavailable(
            "another_actor_requests_fire_or_has_pending_burst",
        ));
    }
    let mut quiet = before.clone();
    // Only this counterfactual clone is edited, including a burst which would
    // otherwise keep firing even when fire=false. The original history is kept.
    quiet.players[actor].burst_remaining = 0;
    let mut quiet_inputs = inputs;
    quiet_inputs[actor].fire = false;
    quiet.step(quiet_inputs, r)?;
    if quiet.phase != before.phase || quiet.events.iter().any(|e| e.damage.is_some()) {
        return Ok(unavailable(
            "counterfactual_has_post_shot_phase_or_damage_side_effect",
        ));
    }
    if quiet.random != before.random {
        return Ok(unavailable("counterfactual_consumed_rng"));
    }
    let p = &quiet.players[actor];
    if p.weapon != weapon
        || !p.alive
        || p.life != before.players[actor].life
        || p.position != after.players[actor].position
        || p.velocity != after.players[actor].velocity
        || p.stance != after.players[actor].stance
    {
        return Ok(unavailable("counterfactual_pose_not_equivalent"));
    }
    let w = &r.weapons[weapon];
    if w.pellets != 1 || w.splash > 0. {
        return Ok(unavailable("requires_single_pellet_without_splash"));
    }
    let aim = recoil::aim(p.yaw, p.pitch, p.weapon_recoil.aim_punch);
    let accuracy = movement::accuracy(
        p.velocity[0].hypot(p.velocity[2]),
        r.heroes[p.hero].speed * w.mobility,
        p.position[1] > 0.,
        p.landing,
        &r.movement,
    );
    let spread = w.spread
        * if p.crouch { 0.65 } else { 1. }
        * if w.scoped && !p.scoped { 12. } else { 1. }
        * accuracy
        * if p.hero == 5 && (p.effect > 0 || p.overclock > 0) {
            1.5
        } else {
            1.
        }
        + p.weapon_recoil.recoil;
    let origin = [
        p.position[0],
        p.position[1] + sight::eye_height(p.stance),
        p.position[2],
    ];
    let mut random = before.random;
    let offset = (lcg(&mut random) - 0.5) * spread.to_radians();
    let pitch = aim[1] + (lcg(&mut random) - 0.5) * spread.to_radians();
    // Native fire occurs inside the slot loop. Earlier slots have moved; later
    // slots have not. Using whole-frame end poses would be a false oracle.
    let current = before
        .players
        .iter()
        .enumerate()
        .map(|(s, v)| Pose::from(if s <= actor { &quiet.players[s] } else { v }))
        .collect::<Vec<_>>();
    let past = selected_history(after.tick, inputs[actor].view_tick, history);
    let ray = ray(
        r,
        before.config.map,
        origin,
        direction(aim[0] + offset, pitch),
        p.team,
        &current,
        past.map(|v| &v.1),
    );
    let target = ray["target"].as_u64().map(|v| v as usize);
    let raw = target.map(|_| {
        (w.damage as f64
            * (1. - (ray["distance"].as_f64().unwrap() - w.range).max(0.) / 5000.).max(0.55)
            * if ray["region"] == "head" { 2.5 } else { 1. }) as i32
    });
    let damage = after
        .events
        .iter()
        .filter(|e| {
            e.actor == Some(actor)
                && matches!(e.kind.as_str(), "hit" | "headshot")
                && e.damage.is_some()
        })
        .collect::<Vec<_>>();
    let expected_damage = target.filter(|s| current[*s].protection == 0);
    let damage_agrees = match expected_damage {
        Some(s) => {
            damage.len() == 1
                && damage[0].target == Some(s)
                && damage[0].origin == Some(origin)
                && damage[0].damage.as_ref().map(|v| v.raw) == raw
                && damage[0].kind
                    == if ray["region"] == "head" {
                        "headshot"
                    } else {
                        "hit"
                    }
        }
        None => damage.is_empty(),
    };
    Ok(
        json!({"available":true,"actor":actor,"weapon":weapon,"seq":inputs[actor].seq,"tapeViewTick":inputs[actor].view_tick,"rewindTick":past.map(|v|v.0),"viewTickMeaning":"value already admitted in production tape; service admission is external evidence","controlProvenance":{"scope":"this_frame_only_not_match_or_human","botsCapableSlots":(0..10).filter(|slot|before.config.bots[*slot]).collect::<Vec<_>>(),"takeoverSlots":(0..10).filter(|slot|inputs[*slot].takeover).collect::<Vec<_>>(),"noOpHeroSlots":(0..10).filter(|slot|inputs[*slot].hero.is_some()).collect::<Vec<_>>(),"nativeAiBranchUsed":false},"preShot":{"pose":{"slot":p.slot,"team":p.team,"position":p.position,"velocity":p.velocity,"stance":p.stance,"look":[p.yaw,p.pitch],"alive":p.alive,"life":p.life},"crouch":p.crouch,"scoped":p.scoped,"landing":p.landing,"aim":aim,"accuracyMultiplier":accuracy,"spreadDegrees":spread,"recoil":p.weapon_recoil},"rng":{"before":before.random,"replayedTail":random,"actualTail":after.random,"matched":random==after.random,"draws":2},"ray":ray,"expectedRawDamage":raw,"damageEvents":damage,"damageAgrees":damage_agrees,"authority":"shot and damage events come from unchanged Game::step; reconstructed ray is accepted only with RNG and native-event agreement"}),
    )
}
fn create(path: &Path) -> Result<BufWriter<File>, Error> {
    let mut opt = OpenOptions::new();
    opt.write(true).create_new(true);
    #[cfg(unix)]
    {
        use std::os::unix::fs::OpenOptionsExt;
        opt.mode(0o600);
    }
    Ok(BufWriter::new(opt.open(path)?))
}
fn bounded_line(reader: &mut impl BufRead, limit: usize) -> Result<Option<String>, Error> {
    let mut bytes = Vec::new();
    use std::io::Read;
    let n = reader
        .take((limit + 2) as u64)
        .read_until(b'\n', &mut bytes)?;
    if n == 0 {
        return Ok(None);
    }
    if n > limit + 1 || bytes.strip_suffix(b"\n").unwrap_or(&bytes).len() > limit {
        return Err("Line limit".into());
    }
    Ok(Some(String::from_utf8(bytes)?))
}
fn inspect(tape: &Path, out: &Path, ticks: BTreeSet<u32>) -> Result<Value, Error> {
    if fs::metadata(tape)?.len() > MAX_FILE || ticks.len() > MAX_DETAILS {
        return Err("Audit bounds".into());
    }
    let mut reader = BufReader::new(File::open(tape)?);
    let header: Header =
        serde_json::from_str(&bounded_line(&mut reader, 4096)?.ok_or("Missing config")?)?;
    let r = Rules::load();
    let mut game = Game::new(header.config, &r)?;
    let mut hash = blake3::Hasher::new();
    hash.update(SPEC.as_bytes());
    hash.update(&serde_json::to_vec(&game.config)?);
    let mut hashes = create(&out.join("source-hashes.jsonl"))?;
    let mut timeline = create(&out.join("timeline.jsonl"))?;
    let mut history = History::new();
    let mut details = 0usize;
    let mut omitted = 0usize;
    let mut shots = 0usize;
    let mut available = 0usize;
    let mut rejected = 0usize;
    while let Some(line) = bounded_line(&mut reader, 8192)? {
        if game.tick >= MAX_TICKS {
            return Err("Too many ticks".into());
        }
        let step: Step = serde_json::from_str(&line)?;
        let mut inputs = [Input::default(); 10];
        for (slot, input) in step.inputs.into_iter().enumerate() {
            inputs[slot] = input
                .map(WireInput::unpack)
                .transpose()?
                .unwrap_or_default();
        }
        history.push_back((game.tick, game.players.iter().map(Pose::from).collect()));
        while history.len() > 14 {
            history.pop_front();
        }
        let before = game.clone();
        game.step(inputs, &r)?;
        let bytes = serde_json::to_vec(&game)?;
        hash.update(&bytes);
        writeln!(
            hashes,
            "{}",
            json!({"tick":game.tick,"stateHash":blake3::hash(&bytes).to_hex().to_string()})
        )?;
        let fired = game.events.iter().any(|e| e.kind == "shot");
        shots += game.events.iter().filter(|e| e.kind == "shot").count();
        if fired || ticks.contains(&game.tick) {
            if details >= MAX_DETAILS {
                omitted += 1;
                continue;
            }
            let witness = if fired {
                witness(&before, &game, inputs, &r, &history)?
            } else {
                json!({"available":false,"reason":"no_native_shot"})
            };
            if witness["available"] == true {
                available += 1;
                if witness["rng"]["matched"] != true || witness["damageAgrees"] != true {
                    rejected += 1;
                }
            }
            writeln!(
                timeline,
                "{}",
                json!({"tick":game.tick,"phase":game.phase,"controls":inputs.iter().enumerate().map(|(slot,i)|json!({"slot":slot,"seq":i.seq,"tapeViewTick":i.view_tick,"takeover":i.takeover,"actionLife":i.action_life,"hero":i.hero,"buy":i.buy,"fire":i.fire,"x":i.x,"y":i.y,"crouch":i.crouch,"jump":i.jump})).collect::<Vec<_>>(),"authoritativePoses":game.players.iter().map(Pose::from).collect::<Vec<_>>(),"events":game.events,"witness":witness})
            )?;
            details += 1;
        }
    }
    if game.tick == 0 {
        return Err("Empty tape".into());
    }
    hashes.flush()?;
    timeline.flush()?;
    Ok(
        json!({"schema":1,"ticks":game.tick,"completed":game.phase=="finished","trace_hash":hash.finalize().to_hex().to_string(),"state_hash":blake3::hash(&serde_json::to_vec(&game)?).to_hex().to_string(),"shots":shots,"detailedFrames":details,"omittedDetailFrames":omitted,"availableWitnesses":available,"rejectedWitnesses":rejected,"maxDetailedFrames":MAX_DETAILS,"historyPoses":14}),
    )
}
fn hash_states() -> Result<(), Error> {
    let mut reader = io::stdin().lock();
    let mut out = BufWriter::new(io::stdout());
    let mut hash = blake3::Hasher::new();
    hash.update(SPEC.as_bytes());
    let mut count = 0u32;
    let mut started = false;
    while let Some(line) = bounded_line(&mut reader, 1_048_576)? {
        let mut v: Value = serde_json::from_str(&line)?;
        match v["type"].as_str() {
            Some("ready") => {
                if started {
                    return Err("Repeated ready".into());
                }
                let g: Game = serde_json::from_value(v["state"].take())?;
                hash.update(&serde_json::to_vec(&g.config)?);
                started = true;
            }
            Some("frame") => {
                if !started || count >= MAX_TICKS {
                    return Err("Frame bounds".into());
                }
                let g: Game = serde_json::from_value(v["state"].take())?;
                if g.tick != count + 1 {
                    return Err("Nonconsecutive engine frame".into());
                }
                count += 1;
                let bytes = serde_json::to_vec(&g)?;
                hash.update(&bytes);
                writeln!(
                    out,
                    "{}",
                    json!({"tick":g.tick,"stateHash":blake3::hash(&bytes).to_hex().to_string()})
                )?;
            }
            Some("result") => {
                let result = &v["result"];
                if count == 0
                    || result["ticks"] != count
                    || result["trace_hash"] != hash.finalize().to_hex().to_string()
                {
                    return Err("Engine result does not match reserialized frame trace".into());
                }
                writeln!(out, "{}", json!({"result":result}))?;
                out.flush()?;
                return Ok(());
            }
            _ => return Err("Unexpected engine message".into()),
        }
    }
    Err("Missing engine result".into())
}
// Hash the actual private runtime's unchanged Game states with the exact same
// serializer. Partial-room tails are compared as an explicitly bounded prefix;
// this mode does not invent a completed result or a full-trace agreement.
fn hash_runtime_frames() -> Result<(), Error> {
    let mut reader = io::stdin().lock();
    let mut out = BufWriter::new(io::stdout());
    let mut count = 0;
    while let Some(line) = bounded_line(&mut reader, 1_048_576)? {
        let mut value: Value = serde_json::from_str(&line)?;
        if value["type"] != "native_frame" || count >= MAX_TICKS {
            return Err("Invalid runtime frame stream".into());
        }
        let raw = value["rawLine"].as_str().ok_or("RAW_FRAME_REQUIRED: legacy parsed-state capture is not lossless")?;
        let mut native: Value = serde_json::from_str(raw)?;
        if native["type"] != "frame" {
            return Err("Expected original Native frame line".into());
        }
        let game: Game = serde_json::from_value(native["state"].take())?;
        if game.tick != count + 1 {
            return Err("Nonconsecutive runtime frames".into());
        }
        count += 1;
        writeln!(
            out,
            "{}",
            json!({"tick":game.tick,"stateHash":blake3::hash(&serde_json::to_vec(&game)?).to_hex().to_string()})
        )?;
    }
    if count == 0 {
        return Err("No runtime frames".into());
    }
    out.flush()?;
    Ok(())
}
fn main() -> Result<(), Error> {
    let args = std::env::args().collect::<Vec<_>>();
    if args.get(1).map(String::as_str) == Some("hash-states") {
        return hash_states();
    }
    if args.get(1).map(String::as_str) == Some("frame-hashes") {
        return hash_runtime_frames();
    }
    if args.len() < 3 || args.len() > 4 {
        return Err("Usage: network_audit TAPE EXISTING_NEW_OUTPUT_DIR [comma-separated ticks] | hash-states".into());
    }
    let ticks = if let Some(v) = args.get(3) {
        v.split(',')
            .filter(|v| !v.is_empty())
            .map(str::parse)
            .collect::<Result<BTreeSet<u32>, _>>()?
    } else {
        BTreeSet::new()
    };
    println!(
        "{}",
        inspect(Path::new(&args[1]), Path::new(&args[2]), ticks)?
    );
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    fn pose(slot: usize, x: f64, z: f64, life: u32) -> Pose {
        Pose {
            slot,
            team: 1,
            position: [x, 0., z],
            velocity: [0.; 3],
            stance: 0.,
            look: [0.; 2],
            alive: true,
            life,
            protection: 0,
            health: 100,
            armor: 0,
        }
    }
    #[test]
    fn native_geometry_cover_nearest_target_and_life_guards() {
        let mut r = Rules::load();
        let origin = [0., 56., 300.];
        let dir = [0., 0., -1.];
        let mut current = vec![pose(0, 0., 0., 2), pose(1, 0., -100., 1)];
        // Synthetic geometry probe only; this does not claim a replay or net test.
        r.maps[0].obstacles = vec![botstrike_engine::Obstacle {
            min: [-20., 0., 100.],
            max: [20., 100., 150.],
            kind: "probe".into(),
        }];
        assert_eq!(
            ray(&r, 0, origin, dir, 0, &current, None)["winner"],
            "cover"
        );
        r.maps[0].obstacles[0].min[2] = -200.;
        r.maps[0].obstacles[0].max[2] = -150.;
        assert_eq!(ray(&r, 0, origin, dir, 0, &current, None)["target"], 0);
        let mut old = current.clone();
        old[0].life = 1;
        assert_eq!(
            ray(&r, 0, origin, dir, 0, &current, Some(&old))["target"],
            1
        );
        old[1].alive = false;
        assert_eq!(
            ray(&r, 0, origin, dir, 0, &current, Some(&old))["winner"],
            "cover"
        );
        current[0].alive = false;
        assert_ne!(ray(&r, 0, origin, dir, 0, &current, None)["target"], 0);
    }
    #[test]
    fn every_bots_capable_slot_must_bypass_the_native_ai_branch() {
        let mut bots = [true; 10];
        let mut inputs = [Input {
            takeover: true,
            ..Input::default()
        }; 10];
        assert!(bot_branch_slots(&bots, &inputs).is_empty());
        for slot in 0..10 {
            inputs[slot].takeover = false;
            assert_eq!(bot_branch_slots(&bots, &inputs), vec![slot]);
            bots[slot] = false;
            assert!(bot_branch_slots(&bots, &inputs).is_empty());
            bots[slot] = true;
            inputs[slot].takeover = true;
        }
    }
    #[test]
    fn same_hero_is_full_step_noop_for_live_buy_and_respawning_players() {
        let rules: Rules = serde_json::from_str(SPEC).unwrap();
        for phase in ["live", "buy"] {
            for dead_slot in [None, Some(5)] {
                let config: Config = serde_json::from_value(json!({"map":0,"mode":"deathmatch","heroes":[0,1,2,3,4,5,0,1,2,3],"bots":vec![false;10],"difficulty":1,"seed":42})).unwrap();
                let mut before = Game::new(config, &rules).unwrap();
                before.phase = phase.into();
                before.phase_ticks = 64;
                if let Some(slot) = dead_slot {
                    before.players[slot].alive = false;
                    before.players[slot].health = 0;
                    before.players[slot].respawn = 1;
                }
                let inputs = std::array::from_fn(|slot| Input {
                    takeover: true,
                    hero: Some(before.players[slot].hero),
                    ..Input::default()
                });
                assert!(hero_inputs_are_noops(&before, &inputs));
                let mut changed = inputs;
                changed[5].hero = Some((before.players[5].hero + 1) % 6);
                assert!(!hero_inputs_are_noops(&before, &changed));
                let mut without_hero = inputs;
                for input in &mut without_hero {
                    input.hero = None;
                }
                let mut repeated = before.clone();
                let mut absent = before.clone();
                repeated.step(inputs, &rules).unwrap();
                absent.step(without_hero, &rules).unwrap();
                assert_eq!(serde_json::to_vec(&repeated).unwrap(), serde_json::to_vec(&absent).unwrap());
            }
        }
    }
    #[test]
    fn rewind_has_exact_tick_and_13_tick_boundary() {
        let h = VecDeque::from([(10, vec![]), (11, vec![])]);
        assert_eq!(selected_history(23, Some(10), &h).unwrap().0, 10);
        assert!(selected_history(24, Some(10), &h).is_none());
        assert!(selected_history(23, Some(12), &h).is_none());
        assert!(selected_history(23, Some(24), &h).is_none());
    }
    #[test]
    fn packed_forms_and_reserved_action_life_match_production() {
        for (tail, practice, mode, preview) in [("", 0, 0, 0), (",8", 8, 0, 0), (",8,35", 8, 2, 11)]
        {
            let v: WireInput =
                serde_json::from_str(&format!("[1,0,0,0,0,32767,2,4,5,3,4{}]", tail)).unwrap();
            let i = v.unpack().unwrap();
            assert_eq!(i.action_life, Some(31));
            assert!(i.fire && i.jump && i.takeover && i.drop);
            assert_eq!(
                (i.practice, i.throw_mode, i.preview_item),
                (practice, mode, preview)
            );
            assert!(i.validate());
        }
        let i: WireInput = serde_json::from_str("[1,0,0,0,0,32768,null,null,null,0,null]").unwrap();
        assert!(!i.unpack().unwrap().validate());
    }
}
