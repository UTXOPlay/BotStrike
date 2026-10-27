use botstrike_engine::{Config, Game, Input, Rules, HZ, MAX_TICKS};
use serde_json::json;
fn main() {
    let rules = Rules::load();
    for map in 0..3 {
        for difficulty in 0..3 {
            for mode in ["deathmatch", "demolition"] {
                let config = Config {
                    map,
                    mode: mode.into(),
                    heroes: [0, 1, 2, 3, 4, 5, 0, 1, 2, 3],
                    bots: [true; 10],
                    difficulty,
                    seed: std::env::var("BOTSTRIKE_BENCH_SEED")
                        .ok()
                        .and_then(|v| v.parse().ok())
                        .unwrap_or(2050),
                };
                let mut g = Game::new(config, &rules).unwrap();
                let (mut shots, mut hits, mut kills, mut plants, mut defuses) = (0, 0, 0, 0, 0);
                let mut movement = 0.;
                let (mut stationary, mut sampled) = (0, 0);
                let mut last: Vec<_> = g.players.iter().map(|p| p.position).collect();
                for _ in 0..MAX_TICKS {
                    g.step([Input::default(); 10], &rules).unwrap();
                    for e in &g.events {
                        match e.kind.as_str() {
                            "shot" => shots += 1,
                            "hit" | "headshot" => hits += 1,
                            "kill" => kills += 1,
                            "planted" => plants += 1,
                            "defused" => defuses += 1,
                            _ => (),
                        }
                    }
                    if g.tick % HZ == 0 && g.phase == "live" {
                        for (p, old) in g.players.iter().zip(last.iter()) {
                            if p.alive {
                                sampled += 1;
                                let distance = ((p.position[0] - old[0]).powi(2)
                                    + (p.position[2] - old[2]).powi(2))
                                .sqrt();
                                movement += distance;
                                if distance < 10. {
                                    stationary += 1;
                                }
                            }
                        }
                        last = g.players.iter().map(|p| p.position).collect();
                    }
                    if g.phase == "finished" {
                        break;
                    }
                }
                println!(
                    "{}",
                    json!({"map":map,"difficulty":difficulty,"mode":mode,"seconds":g.tick as f64/64.,"score":g.score,"completed":g.phase=="finished","shots":shots,"hitEvents":hits,"kills":kills,"plants":plants,"defuses":defuses,"stationarySamples":stationary,"samples":sampled,"meanDistancePerSample":movement/(sampled.max(1) as f64)})
                );
            }
        }
    }
}
