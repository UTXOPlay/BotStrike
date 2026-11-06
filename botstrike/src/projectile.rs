//! Fixed-step projectile rules shared by live releases and native practice preview.
use crate::{dec, direction, eye, recoil, Map, Player, Utility, HZ};
use serde::Deserialize;
#[derive(Clone, Deserialize)]
pub struct Mode {
    pub id: String,
    pub speed: f64,
    pub lift: f64,
}
#[derive(Clone, Deserialize)]
pub struct Profile {
    pub modes: Vec<Mode>,
    pub gravity: f64,
    pub radius: f64,
    pub inherit_velocity: f64,
    pub wall_restitution: f64,
    pub floor_restitution: f64,
    pub floor_friction: f64,
    pub settle_vertical_speed: f64,
    pub stop_horizontal_speed: f64,
    pub max_contacts: usize,
}
pub fn throw(p: &Player, item: usize, profile: &Profile) -> Utility {
    let aim = recoil::aim(p.yaw, p.pitch, p.weapon_recoil.aim_punch);
    let d = direction(aim[0], aim[1]);
    let mode = &profile.modes[p.throw_mode as usize];
    Utility {
        kind: item as u8,
        owner: p.slot,
        position: eye(p),
        velocity: std::array::from_fn(|i| {
            d[i] * mode.speed
                + p.velocity[i] * profile.inherit_velocity
                + if i == 1 { mode.lift } else { 0. }
        }),
        fuse: if matches!(item, 5 | 10) { HZ } else { HZ * 2 },
        life: match item {
            2 => HZ * 14,
            5 | 10 => HZ * 8,
            _ => 0,
        },
    }
}
#[derive(Clone, Copy)]
struct Hit {
    time: f64,
    axis: usize,
    normal: f64,
    correct: Option<f64>,
}
fn earlier(best: &mut Option<Hit>, hit: Hit) {
    if best.is_none_or(|old| hit.time < old.time - 1e-10) {
        *best = Some(hit);
    }
}
fn box_hit(o: [f64; 3], v: [f64; 3], lo: [f64; 3], hi: [f64; 3], remaining: f64) -> Option<Hit> {
    if (0..3).all(|a| o[a] > lo[a] + 1e-7 && o[a] < hi[a] - 1e-7) {
        let mut nearest = (f64::INFINITY, 0, -1., 0.);
        for a in 0..3 {
            for (distance, normal, face) in [(o[a] - lo[a], -1., lo[a]), (hi[a] - o[a], 1., hi[a])]
            {
                if distance < nearest.0 {
                    nearest = (distance, a, normal, face);
                }
            }
        }
        return Some(Hit {
            time: 0.,
            axis: nearest.1,
            normal: nearest.2,
            correct: Some(nearest.3),
        });
    }
    let (mut near, mut far, mut axis, mut normal) = (f64::NEG_INFINITY, remaining, 0, 0.);
    for a in 0..3 {
        if v[a].abs() < 1e-10 {
            if o[a] < lo[a] || o[a] > hi[a] {
                return None;
            }
        } else {
            let (mut t1, mut t2) = ((lo[a] - o[a]) / v[a], (hi[a] - o[a]) / v[a]);
            let n = if v[a] > 0. { -1. } else { 1. };
            if t1 > t2 {
                std::mem::swap(&mut t1, &mut t2);
            }
            if t1 > near {
                near = t1;
                axis = a;
                normal = n;
            }
            far = far.min(t2);
            if near > far {
                return None;
            }
        }
    }
    if near >= -1e-10 && near <= remaining && far >= 0. {
        Some(Hit {
            time: near.max(0.),
            axis,
            normal,
            correct: None,
        })
    } else {
        None
    }
}
pub fn advance(u: &mut Utility, map: &Map, p: &Profile) {
    if u.fuse == 0 {
        return;
    }
    u.velocity[1] -= p.gravity / HZ as f64;
    let limit = map.extent - p.radius;
    // Release states come from collision-constrained players. Clamp old/explicit
    // probe starts too, without allowing an unbounded penetration-recovery loop.
    for a in [0, 2] {
        let before = u.position[a];
        u.position[a] = before.clamp(-limit, limit);
        if before != u.position[a] && u.velocity[a] * before > 0. {
            u.velocity[a] *= -p.wall_restitution;
        }
    }
    if u.position[1] < p.radius {
        u.position[1] = p.radius;
        if u.velocity[1] < 0. {
            u.velocity[1] *= -p.floor_restitution;
        }
    }
    let mut remaining = 1. / HZ as f64;
    for _ in 0..p.max_contacts {
        if remaining <= 1e-10 {
            break;
        }
        let mut hit = None;
        if u.velocity[1] < -1e-10 {
            let t = (p.radius - u.position[1]) / u.velocity[1];
            if t >= 0. && t <= remaining {
                earlier(
                    &mut hit,
                    Hit {
                        time: t,
                        axis: 1,
                        normal: 1.,
                        correct: None,
                    },
                );
            }
        }
        for a in [0, 2] {
            if u.velocity[a].abs() > 1e-10 {
                let normal = if u.velocity[a] > 0. { -1. } else { 1. };
                let boundary = -normal * limit;
                let t = (boundary - u.position[a]) / u.velocity[a];
                if t >= 0. && t <= remaining {
                    earlier(
                        &mut hit,
                        Hit {
                            time: t,
                            axis: a,
                            normal,
                            correct: None,
                        },
                    );
                }
            }
        }
        for obstacle in &map.obstacles {
            let lo = obstacle.min.map(|v| v - p.radius);
            let hi = obstacle.max.map(|v| v + p.radius);
            if let Some(h) = box_hit(u.position, u.velocity, lo, hi, remaining) {
                earlier(&mut hit, h);
            }
        }
        let dt = hit.map_or(remaining, |h| h.time);
        for a in 0..3 {
            u.position[a] += u.velocity[a] * dt;
        }
        remaining -= dt;
        let Some(h) = hit else {
            break;
        };
        if let Some(face) = h.correct {
            u.position[h.axis] = face;
        }
        u.position[h.axis] += h.normal * 1e-6;
        let floor = h.axis == 1 && h.normal > 0. && u.position[1] <= p.radius + 1e-4;
        if u.velocity[h.axis] * h.normal < 0. {
            u.velocity[h.axis] *= -if floor {
                p.floor_restitution
            } else {
                p.wall_restitution
            };
        }
        if floor {
            u.velocity[0] *= p.floor_friction;
            u.velocity[2] *= p.floor_friction;
            if u.velocity[1].abs() < p.settle_vertical_speed {
                u.velocity[1] = 0.;
            }
            if u.velocity[0].hypot(u.velocity[2]) < p.stop_horizontal_speed {
                u.velocity[0] = 0.;
                u.velocity[2] = 0.;
            }
        }
    }
    dec(&mut u.fuse);
}
pub fn preview(mut u: Utility, map: &Map, p: &Profile) -> Vec<[f64; 3]> {
    let mut points = vec![u.position];
    for tick in 1..=HZ * 2 {
        advance(&mut u, map, p);
        if tick % 2 == 0 || u.fuse == 0 {
            points.push(u.position);
        }
        if u.fuse == 0 {
            break;
        }
    }
    points
}

/// Bounded, offline release fixtures; never exposed by the room service.
pub fn probes() -> Result<(), Box<dyn std::error::Error>> {
    use std::io::{self, BufRead, Write};
    #[derive(serde::Deserialize)]
    #[serde(deny_unknown_fields)]
    struct Probe {
        map: usize,
        mode: u8,
        kind: usize,
        position: [f64; 3],
        velocity: [f64; 3],
        yaw: f64,
        pitch: f64,
        stance: f64,
    }
    let r = crate::Rules::load();
    let mut g = crate::Game::new(
        crate::Config {
            map: 0,
            mode: "deathmatch".into(),
            ruleset: Default::default(),
            heroes: [0; 10],
            bots: [false; 10],
            difficulty: 1,
            seed: 2050,
            practice: None,
        },
        &r,
    )?;
    let mut out = io::BufWriter::new(io::stdout());
    for (index, line) in io::stdin().lock().lines().enumerate() {
        let line = line?;
        if index >= 1000 || line.len() > 4096 {
            return Err("Projectile probe limit".into());
        }
        let p: Probe = serde_json::from_str(&line)?;
        if p.map >= r.maps.len()
            || p.mode >= 3
            || p.kind >= r.items.len()
            || r.items[p.kind].activation != "throw"
            || !p
                .position
                .iter()
                .all(|v| v.is_finite() && v.abs() <= 10000.)
            || !p.velocity.iter().all(|v| v.is_finite() && v.abs() <= 5000.)
            || !p.yaw.is_finite()
            || p.yaw.abs() > 3.142
            || !p.pitch.is_finite()
            || p.pitch.abs() > 1.5
            || !p.stance.is_finite()
            || !(0. ..=1.).contains(&p.stance)
        {
            return Err("Invalid projectile probe".into());
        }
        let player = &mut g.players[0];
        player.position = p.position;
        player.velocity = p.velocity;
        player.yaw = p.yaw;
        player.pitch = p.pitch;
        player.stance = p.stance;
        player.throw_mode = p.mode;
        let initial = throw(player, p.kind, &r.projectile);
        let sampled = preview(initial.clone(), &r.maps[p.map], &r.projectile);
        let mut u = initial.clone();
        let mut points = vec![u.position];
        for _ in 0..initial.fuse {
            advance(&mut u, &r.maps[p.map], &r.projectile);
            points.push(u.position);
        }
        writeln!(
            out,
            "{}",
            serde_json::json!({"version":r.version,"initial":initial,"points":points,"preview":sampled,"detonation_tick":initial.fuse})
        )?;
    }
    out.flush()?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    fn map() -> Map {
        Map {
            id: "fixture".into(),
            extent: 1000.,
            obstacles: vec![],
            spawns: vec![vec![[0.; 3]]; 2],
            sites: vec![[0.; 3]; 2],
        }
    }
    fn utility(position: [f64; 3], velocity: [f64; 3]) -> Utility {
        Utility {
            kind: 3,
            owner: 0,
            position,
            velocity,
            fuse: 128,
            life: 0,
        }
    }
    #[test]
    fn swept_contacts_stop_tunneling_through_thin_walls_and_ceilings() {
        let r = crate::Rules::load();
        let mut m = map();
        m.obstacles.push(crate::Obstacle {
            min: [50., 0., -100.],
            max: [52., 200., 100.],
            kind: "thin".into(),
        });
        let mut u = utility([0., 56., 0.], [64000., 0., 0.]);
        advance(&mut u, &m, &r.projectile);
        assert!(u.position[0] < 42.);
        assert!(u.velocity[0] < 0.);
        assert_eq!(u.fuse, 127);
        m.obstacles = vec![crate::Obstacle {
            min: [-100., 90., -100.],
            max: [100., 100., 100.],
            kind: "ceiling".into(),
        }];
        let mut u = utility([0., 56., 0.], [0., 2000., 0.]);
        advance(&mut u, &m, &r.projectile);
        assert!(u.position[1] < 82.00001);
        assert!(u.velocity[1] < 0.);
    }
    #[test]
    fn corner_floor_rest_and_world_boundary_have_bounded_finite_contacts() {
        let r = crate::Rules::load();
        let mut m = map();
        m.obstacles = vec![
            crate::Obstacle {
                min: [50., 0., -100.],
                max: [52., 200., 100.],
                kind: "wall".into(),
            },
            crate::Obstacle {
                min: [-100., 0., 50.],
                max: [100., 200., 52.],
                kind: "wall".into(),
            },
        ];
        let mut u = utility([0., 56., 0.], [6400., 0., 6400.]);
        advance(&mut u, &m, &r.projectile);
        assert!(u.position[0] < 42.00001 && u.position[2] < 42.00001);
        assert!(u.velocity[0] < 0. && u.velocity[2] < 0.);
        let mut u = utility([990., 8., 990.], [2000., 0., 2000.]);
        for _ in 0..128 {
            advance(&mut u, &map(), &r.projectile);
            assert!(u.position.iter().all(|v| v.is_finite()));
            assert!(u.position[0].abs() <= 992.00001 && u.position[2].abs() <= 992.00001);
            assert!(u.position[1] >= 8.);
        }
        let mut u = utility([0., 8., 0.], [3., 0., 0.]);
        for _ in 0..100 {
            advance(&mut u, &map(), &r.projectile);
        }
        assert!(u.position[1] - 8. < 1e-4);
        assert_eq!(u.velocity, [0.; 3]);
    }
    #[test]
    fn release_modes_inherit_actual_motion_and_held_mode_changes_do_not_duplicate_items() {
        let r = crate::Rules::load();
        let mut g = crate::Game::new(
            crate::Config {
                map: 0,
                mode: "deathmatch".into(),
                ruleset: Default::default(),
                heroes: [0; 10],
                bots: [false; 10],
                difficulty: 1,
                seed: 2050,
                practice: None,
            },
            &r,
        )
        .unwrap();
        let p = &mut g.players[0];
        p.velocity = [100., 200., -50.];
        p.yaw = 0.;
        p.pitch = 0.;
        for mode in 0..3 {
            p.throw_mode = mode;
            let u = throw(p, 3, &r.projectile);
            assert_eq!(
                u.velocity,
                [
                    100.,
                    200. + r.projectile.modes[mode as usize].lift,
                    -50. - r.projectile.modes[mode as usize].speed
                ]
            );
        }
        g.players[0].items[3] = 2;
        let mut a = [crate::Input::default(); 10];
        a[0] = crate::Input {
            takeover: true,
            item: 3,
            throw_mode: 2,
            ..crate::Input::default()
        };
        g.step(a, &r).unwrap();
        let remaining = g.players[0].items[3];
        for _ in 0..80 {
            a[0].throw_mode = 1;
            g.step(a, &r).unwrap();
        }
        assert_eq!(remaining, 1);
        assert_eq!(g.players[0].items[3], remaining);
        assert_eq!(g.utilities.len(), 1);
        a[0].throw_mode = 3;
        assert!(g.step(a, &r).is_err());
    }
}
