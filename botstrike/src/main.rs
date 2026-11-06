use botstrike_engine::{Config, Game, Input, Rules, MAX_TICKS, SPEC};
use serde::Deserialize;
use serde_json::json;
use std::{
    fs,
    io::{self, BufRead, Write},
};
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
// Offline developer inspector. It consumes explicit fixtures, has no room
// access and is never exposed as a game-service/HTTP endpoint.
#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
struct HitProbe {
    origin: [f64; 3],
    direction: [f64; 3],
    position: [f64; 3],
    stance: f64,
    #[serde(default)]
    yaw: f64,
    #[serde(default)]
    pitch: f64,
}
fn hit_probes() -> Result<(), Box<dyn std::error::Error>> {
    let rules = Rules::load();
    let mut out = io::BufWriter::new(io::stdout());
    for (index, line) in io::stdin().lock().lines().enumerate() {
        let line = line?;
        if index >= 10000 || line.len() > 4096 {
            return Err("Probe limit".into());
        }
        let p: HitProbe = serde_json::from_str(&line)?;
        let norm = p.direction.iter().map(|v| v * v).sum::<f64>().sqrt();
        if !p
            .origin
            .iter()
            .chain(p.position.iter())
            .chain(p.direction.iter())
            .all(|v| v.is_finite() && v.abs() <= 100000.)
            || !p.yaw.is_finite()
            || p.yaw.abs() > 3.142
            || !p.pitch.is_finite()
            || p.pitch.abs() > 1.5
            || !p.stance.is_finite()
            || !(0. ..=1.).contains(&p.stance)
            || norm < 1e-10
        {
            return Err("Invalid hit probe".into());
        }
        let direction = p.direction.map(|v| v / norm);
        writeln!(
            out,
            "{}",
            json!({"samples":rules.hit_regions.visibility_samples(p.position,p.stance,[p.yaw,p.pitch]),"version":rules.version,"volumes":rules.hit_regions.volumes(p.position,p.stance,[p.yaw,p.pitch]),"hit":rules.hit_regions.intersect(p.origin,direction,p.position,p.stance,[p.yaw,p.pitch])})
        )?;
    }
    out.flush()?;
    Ok(())
}
// Compact tape form bounds long 5v5 recordings without reducing tick rate.
#[derive(Deserialize)]
#[serde(untagged)]
enum WireInput {
    Object(Input),
    Utility(
        (
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
            u8,
            u8,
        ),
    ),
    Packed(
        (
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
        ),
    ),
    Practice(
        (
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
            u8,
        ),
    ),
}
impl WireInput {
    fn unpack(self) -> Input {
        match self {
            Self::Object(input) => input,
            Self::Utility((
                seq,
                x,
                y,
                yaw,
                pitch,
                bits,
                weapon,
                buy,
                hero,
                item,
                view_tick,
                practice,
                throw_mode,
            )) => {
                let mut input = Self::Practice((
                    seq, x, y, yaw, pitch, bits, weapon, buy, hero, item, view_tick, practice,
                ))
                .unpack();
                input.throw_mode = throw_mode % 3;
                input.preview_item = throw_mode / 3;
                input
            }
            Self::Practice((
                seq,
                x,
                y,
                yaw,
                pitch,
                bits,
                weapon,
                buy,
                hero,
                item,
                view_tick,
                practice,
            )) => {
                let mut input = Self::Packed((
                    seq, x, y, yaw, pitch, bits, weapon, buy, hero, item, view_tick,
                ))
                .unpack();
                input.practice = practice;
                input
            }
            Self::Packed((seq, x, y, yaw, pitch, bits, weapon, buy, hero, item, view_tick)) => {
                Input {
                    seq,
                    view_tick,
                    x,
                    y,
                    yaw,
                    pitch,
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
                    weapon,
                    buy,
                    hero,
                    item,
                    practice: 0,
                    throw_mode: 0,
                    preview_item: 0,
                }
            }
        }
    }
}
fn run() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<_> = std::env::args().collect();
    if args.get(1).map(String::as_str) == Some("damage-matrix") {
        let rules = Rules::load();
        println!(
            "{}",
            json!({"schema":1,"version":rules.version,"tick_rate":64,"ideal_hits":true,"rows":botstrike_engine::damage_contract::matrix(&rules)?})
        );
        return Ok(());
    }
    if args.get(1).map(String::as_str) == Some("projectile-probe") {
        return botstrike_engine::projectile::probes();
    }
    if args.get(1).map(String::as_str) == Some("sight-probe") {
        return botstrike_engine::sight::probes();
    }
    if args.get(1).map(String::as_str) == Some("hit-probe") {
        return hit_probes();
    }
    if args.get(1).map(String::as_str) == Some("spec") {
        println!("{SPEC}");
        return Ok(());
    }
    let replay = args.get(1).map(String::as_str) == Some("replay");
    let reader: Box<dyn BufRead> = if replay {
        let path = args.get(2).ok_or("Missing tape")?;
        if fs::metadata(path)?.len() > 194_000_000 {
            return Err("Tape too large".into());
        }
        Box::new(io::BufReader::new(fs::File::open(path)?))
    } else {
        Box::new(io::BufReader::new(io::stdin()))
    };
    let mut lines = reader.lines();
    let first = lines.next().ok_or("Missing match configuration")??;
    if first.len() > 4096 {
        return Err("Header too large".into());
    }
    let header: Header = serde_json::from_str(&first)?;
    let rules = Rules::load();
    let mut game = Game::new(header.config, &rules)?;
    let mut hash = blake3::Hasher::new();
    hash.update(SPEC.as_bytes());
    hash.update(&serde_json::to_vec(&game.config)?);
    let mut output = io::BufWriter::new(io::stdout());
    if !replay {
        writeln!(output, "{}", json!({"type":"ready","state":game}))?;
        output.flush()?;
    }
    for line in lines {
        let line = line?;
        if line.len() > 8192 {
            return Err("Frame too large".into());
        }
        if game.tick >= MAX_TICKS {
            return Err("Too many ticks".into());
        }
        let step: Step = serde_json::from_str(&line)?;
        game.step(
            step.inputs
                .map(|v| v.map(WireInput::unpack).unwrap_or_default()),
            &rules,
        )?;
        hash.update(&serde_json::to_vec(&game)?);
        if !replay {
            writeln!(output, "{}", json!({"type":"frame","state":game}))?;
            output.flush()?;
        }
    }
    if game.tick == 0 {
        return Err("Empty match".into());
    }
    let result = json!({"version":rules.version,"ticks":game.tick,"completed":game.phase=="finished","winner":game.winner,"score":game.score,"trace_hash":hash.finalize().to_hex().to_string(),"state_hash":blake3::hash(&serde_json::to_vec(&game)?).to_hex().to_string(),"players":game.players.iter().map(|p|json!({"slot":p.slot,"hero":p.hero,"kills":p.kills,"deaths":p.deaths,"assists":p.assists,"damage":p.damage,"shots":p.shots})).collect::<Vec<_>>()});
    if replay {
        writeln!(output, "{result}")?
    } else {
        writeln!(output, "{}", json!({"type":"result","result":result}))?
    }
    output.flush()?;
    Ok(())
}
fn main() {
    if let Err(error) = run() {
        eprintln!("{error}");
        std::process::exit(1)
    }
}

#[cfg(test)]
mod wire_tests {
    use super::*;
    #[test]
    fn tactical_flags_roundtrip_and_reserved_high_bit_is_rejected() {
        let input: WireInput = serde_json::from_str("[1,0,0,0,0,32767,2,4,5,3,4]").unwrap();
        let input = input.unpack();
        assert!(input.validate());
        assert!(input.takeover && input.drop && input.fire && input.scope);
        assert_eq!(input.action_life, Some(31));
        let reserved: WireInput =
            serde_json::from_str("[1,0,0,0,0,32768,null,null,null,0,null]").unwrap();
        assert!(!reserved.unpack().validate());
    }
}
