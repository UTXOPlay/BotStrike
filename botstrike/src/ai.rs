//! Deterministic tactical decisions. Perception is visibility/reveal based;
//! hidden live enemy positions never become navigation destinations.
use super::*;

fn sight(game: &Game, p: &Player, q: &Player, map: &Map) -> bool {
    if p.flash > 0 || !q.alive || p.team == q.team {
        return false;
    }
    let a = eye(p);
    let b = eye(q);
    let length = dist(a, b).max(0.001);
    let dir = [
        (b[0] - a[0]) / length,
        (b[1] - a[1]) / length,
        (b[2] - a[2]) / length,
    ];
    length < 2600.
        && !map
            .obstacles
            .iter()
            .any(|o| ray_box(a, dir, o.min, o.max).is_some_and(|d| d < length))
        && !game
            .utilities
            .iter()
            .any(|u| u.kind == 2 && u.fuse == 0 && segment_near(a, b, u.position, 175.))
}
fn free(map: &Map, p: [f64; 3]) -> bool {
    p[0].abs() < map.extent - 28.
        && p[2].abs() < map.extent - 28.
        && !map.obstacles.iter().any(|o| {
            p[0] > o.min[0] - 25.
                && p[0] < o.max[0] + 25.
                && p[2] > o.min[2] - 25.
                && p[2] < o.max[2] + 25.
        })
}
fn clear_walk(map: &Map, a: [f64; 3], b: [f64; 3]) -> bool {
    (1..=6).all(|i| {
        let t = i as f64 / 6.;
        free(
            map,
            [a[0] + (b[0] - a[0]) * t, 0., a[2] + (b[2] - a[2]) * t],
        )
    })
}
fn cover(map: &Map, position: [f64; 3], threat: [f64; 3]) -> Option<[f64; 3]> {
    let mut best = None;
    let mut cost = f64::INFINITY;
    for o in &map.obstacles {
        for x in [o.min[0] - 65., o.max[0] + 65.] {
            for z in [o.min[2] - 65., o.max[2] + 65.] {
                let point = [x, 0., z];
                let distance = dist(position, point);
                if distance > 550. || distance < 35. || !free(map, point) {
                    continue;
                }
                let a = [x, 56., z];
                let b = [threat[0], 56., threat[2]];
                let length = dist(a, b).max(1.);
                let dir = [(b[0] - a[0]) / length, 0., (b[2] - a[2]) / length];
                if !map
                    .obstacles
                    .iter()
                    .any(|wall| ray_box(a, dir, wall.min, wall.max).is_some_and(|d| d < length))
                {
                    continue;
                }
                let score = distance
                    + if clear_walk(map, position, point) {
                        0.
                    } else {
                        180.
                    };
                if score < cost {
                    cost = score;
                    best = Some(point);
                }
            }
        }
    }
    best
}

impl Game {
    pub(crate) fn bot(&mut self, slot: usize, rules: &Rules) -> Input {
        let p = self.players[slot].clone();
        let map = &rules.maps[self.config.map];
        let mut input = Input {
            seq: self.tick,
            yaw: p.yaw,
            pitch: p.pitch,
            ..Input::default()
        };
        if !p.alive {
            return input;
        }
        if self.phase == "buy" {
            let preferred = [1, 6, 7, 3, 8, 2][p.hero];
            input.buy = if !p.owned[preferred] && p.credits >= rules.weapons[preferred].cost {
                Some(preferred)
            } else if !p.owned[1] && p.credits >= rules.weapons[1].cost {
                Some(1)
            } else if p.armor < rules.heroes[p.hero].armor && p.credits >= rules.items[0].cost {
                Some(WEAPONS)
            } else {
                [2, 6, 4, 1, 3]
                    .into_iter()
                    .find(|&i| p.items[i] == 0 && p.credits >= rules.items[i].cost)
                    .map(|i| WEAPONS + i)
            };
            return input;
        }
        if self.config.mode == "deathmatch" {
            input.weapon = Some([1, 2, 7, 3, 8, 5, 6, 9, 10, 11][slot]);
        }
        // Select among visible threats first. A nearer occluded opponent must
        // not blind the bot to somebody openly shooting it.
        let target = self
            .players
            .iter()
            .filter(|q| sight(self, &p, q, map))
            .min_by(|a, b| {
                let score = |q: &Player| {
                    dist(p.position, q.position)
                        * if p.ai_target == Some(q.slot) {
                            0.75
                        } else {
                            1.
                        }
                };
                score(a).total_cmp(&score(b))
            })
            .map(|q| q.slot);
        let enemy_visible = target.is_some();
        if let Some(other) = target {
            self.players[slot].ai_last_seen = Some(self.players[other].position);
            self.players[slot].ai_seen_tick = self.tick;
        }
        let memory = self.players[slot]
            .ai_last_seen
            .filter(|_| self.tick.saturating_sub(self.players[slot].ai_seen_tick) < HZ * 4);
        if memory.is_none() {
            self.players[slot].ai_last_seen = None;
        }
        let patrol = (slot + self.tick as usize / (HZ as usize * 9)) % 4;
        let mut goal = if self.config.mode == "deathmatch" {
            memory.unwrap_or(if patrol < 2 {
                map.sites[patrol]
            } else {
                map.spawns[1 - p.team][(slot + patrol) % 5]
            })
        } else {
            map.sites[slot % 2]
        };
        let weapon = &rules.weapons[p.weapon];
        let wounded = p.health < rules.heroes[p.hero].health / 3;
        let reloading = p.reload > 0 || p.ammo[p.weapon] == 0;
        let mut retreat = false;
        if let Some(other) = target {
            let q = &self.players[other];
            let a = eye(&p);
            let mut b = eye(q);
            // Track the torso for most engagements; head targeting is deliberate,
            // rather than perfect headshots from every bot on every difficulty.
            if (self.tick / (HZ * 2) + slot as u32) % 5 > self.config.difficulty as u32 {
                b[1] -= 15.;
            }
            let length = dist(a, b).max(0.001);
            let exact_yaw = (-(b[0] - a[0])).atan2(-(b[2] - a[2]));
            let error = [0.095, 0.045, 0.025][self.config.difficulty as usize];
            let desired = exact_yaw + ((self.tick as f64 / 12.) + slot as f64 * 2.3).sin() * error;
            let turn = [3., 5., 7.][self.config.difficulty as usize] / HZ as f64;
            let delta = (desired - p.yaw).sin().atan2((desired - p.yaw).cos());
            input.yaw = p.yaw + delta.clamp(-turn, turn);
            input.yaw = input.yaw.sin().atan2(input.yaw.cos());
            let pitch = ((b[1] - a[1]) / length).clamp(-1., 1.).asin();
            input.pitch = p.pitch + (pitch - p.pitch).clamp(-turn, turn);
            let aligned = (exact_yaw - input.yaw)
                .sin()
                .atan2((exact_yaw - input.yaw).cos())
                .abs()
                < [0.13, 0.075, 0.05][self.config.difficulty as usize]
                && (pitch - input.pitch).abs() < 0.08;
            let friendly_line = self.players.iter().any(|friend| {
                friend.slot != slot
                    && friend.team == p.team
                    && friend.alive
                    && dist(p.position, friend.position) < length
                    && segment_near(a, b, friend.position, 26.)
            });
            let burst = (self.tick + slot as u32 * 13) % 64;
            input.fire = aligned
                && !friendly_line
                && p.ai_target == target
                && self.tick.saturating_sub(p.ai_since)
                    >= [20, 14, 9][self.config.difficulty as usize]
                && burst > [24, 14, 8][self.config.difficulty as usize]
                && length < weapon.range.min(2400.)
                && (!weapon.scoped || p.scoped)
                && (!reloading)
                && !(length > 600. && p.recoil > 1.1);
            input.scope = weapon.scoped;
            let desired_range = if weapon.pellets > 1 {
                240.
            } else if weapon.scoped {
                1000.
            } else {
                weapon.range.min(760.) * 0.65
            };
            goal = q.position;
            if length < desired_range * 0.65 {
                input.y = -0.65;
            } else if length > desired_range * 1.3 {
                input.y = 0.7;
            }
            input.x = if (self.tick / (HZ + slot as u32 * 3) + slot as u32) % 2 == 0 {
                0.6
            } else {
                -0.6
            };
            // Plant feet for deliberate shots at distance instead of always
            // combining maximum movement spread with automatic fire.
            if aligned && length > 400. && input.fire {
                input.x = 0.;
                input.y = 0.;
                input.crouch = !weapon.scoped && self.config.difficulty > 0;
            }
            if wounded || reloading {
                if let Some(safe) = cover(map, p.position, q.position) {
                    goal = safe;
                    retreat = true;
                    input.crouch = false;
                }
            }
            input.ability = match p.hero {
                0 => wounded,
                1 => {
                    p.health < rules.heroes[p.hero].health - 20
                        || self.players.iter().any(|q| {
                            q.team == p.team
                                && q.alive
                                && q.health < 60
                                && dist(p.position, q.position) < 340.
                        })
                }
                2 => length < 900.,
                3 => false,
                4 => length < 430.,
                5 => aligned && length < 900.,
                _ => false,
            };
        } else if p.hero == 1 {
            input.ability = p.health < rules.heroes[p.hero].health - 25
                || self.players.iter().any(|q| {
                    q.team == p.team
                        && q.alive
                        && q.health < 60
                        && dist(p.position, q.position) < 340.
                });
        } else if p.hero == 3 {
            input.ability = memory.is_some() && self.tick % (HZ * 3) == slot as u32;
        }
        let mut objective_move = false;
        if self.config.mode == "demolition" {
            if self.objective.planted {
                let site = self.objective.position;
                if p.team != self.attacker {
                    let defuser = self
                        .players
                        .iter()
                        .filter(|q| q.team == p.team && q.alive)
                        .min_by(|a, b| dist(a.position, site).total_cmp(&dist(b.position, site)))
                        .map(|q| q.slot);
                    if defuser == Some(slot) {
                        goal = site;
                        objective_move = true;
                        if dist(p.position, site) < 90.
                            && (!enemy_visible || self.objective.fuse < HZ * 10)
                        {
                            input.interact = true;
                        }
                    } else {
                        let angle = slot as f64 * 2.4;
                        let hold = [
                            site[0] + angle.cos() * 240.,
                            0.,
                            site[2] + angle.sin() * 240.,
                        ];
                        goal = if free(map, hold) { hold } else { site };
                        objective_move = !enemy_visible;
                    }
                } else if !enemy_visible {
                    let angle = slot as f64 * 2.4;
                    let hold = [
                        site[0] + angle.cos() * 300.,
                        0.,
                        site[2] + angle.sin() * 300.,
                    ];
                    goal = if free(map, hold) { hold } else { site };
                    objective_move = true;
                }
            } else if self.objective.carrier == Some(slot) {
                goal = map.sites[((self.round as usize / 2) + slot) % 2];
                objective_move = !enemy_visible;
                if dist(p.position, goal) < 110. && (!enemy_visible || self.phase_ticks < HZ * 12) {
                    input.interact = true;
                }
            } else if p.team == self.attacker {
                if let Some(carrier) = self.objective.carrier {
                    if !enemy_visible {
                        let leader = self.players[carrier].position;
                        let site = map.sites[((self.round as usize / 2) + carrier) % 2];
                        let distance = dist(leader, site).max(1.);
                        let ahead = if slot % 3 == 0 { -100. } else { 200. };
                        let side = if slot % 2 == 0 { 100. } else { -100. };
                        let dx = (site[0] - leader[0]) / distance;
                        let dz = (site[2] - leader[2]) / distance;
                        let escort = [
                            leader[0] + dx * ahead - dz * side,
                            0.,
                            leader[2] + dz * ahead + dx * side,
                        ];
                        goal = if free(map, escort) { escort } else { site };
                        objective_move = true;
                    }
                } else {
                    goal = self.objective.position;
                    objective_move = true;
                }
            } else if !enemy_visible {
                goal = memory.unwrap_or(map.sites[slot % 2]);
                objective_move = true;
            }
        }
        input.reload =
            p.ammo[p.weapon] == 0 || (p.ammo[p.weapon] < weapon.magazine / 3 && !enemy_visible);
        if !input.interact && (!enemy_visible || retreat || objective_move) {
            let arrival_radius = if self.config.mode == "demolition"
                && p.team == self.attacker
                && !self.objective.planted
                && self.objective.carrier.is_none()
            {
                30.
            } else {
                65.
            };
            if dist(p.position, goal) > arrival_radius {
                let changed = p.ai_destination.is_none_or(|old| dist(old, goal) > 150.);
                if self.players[slot].ai_path.is_empty() || changed || self.tick % HZ == slot as u32
                {
                    self.players[slot].ai_path = route(map, p.position, goal);
                    self.players[slot].ai_destination = Some(goal);
                }
                while self.players[slot]
                    .ai_path
                    .first()
                    .is_some_and(|q| dist(p.position, *q) < 42.)
                {
                    self.players[slot].ai_path.remove(0);
                }
                let waypoint = if clear_walk(map, p.position, goal) {
                    goal
                } else {
                    self.players[slot].ai_path.first().copied().unwrap_or(goal)
                };
                let dx = waypoint[0] - p.position[0];
                let dz = waypoint[2] - p.position[2];
                let length = dx.hypot(dz).max(1.);
                if !enemy_visible {
                    let desired = (-dx).atan2(-dz);
                    let delta = (desired - p.yaw).sin().atan2((desired - p.yaw).cos());
                    input.yaw = p.yaw + delta.clamp(-0.12, 0.12);
                    input.yaw = input.yaw.sin().atan2(input.yaw.cos());
                    input.pitch *= 0.9;
                }
                input.x = (dx * input.yaw.cos() - dz * input.yaw.sin()) / length;
                input.y = (-dx * input.yaw.sin() - dz * input.yaw.cos()) / length;
            } else {
                input.x = 0.;
                input.y = 0.;
            }
        }
        // Short-horizon collision steering and personal space prevent repeated
        // strafing into a wall or bunching all five defenders onto the relay.
        if !input.interact && (input.x.abs() + input.y.abs()) > 0.1 {
            let mut dx = input.x * input.yaw.cos() - input.y * input.yaw.sin();
            let mut dz = -input.x * input.yaw.sin() - input.y * input.yaw.cos();
            for friend in self
                .players
                .iter()
                .filter(|q| q.slot != slot && q.team == p.team && q.alive)
            {
                let d = dist(p.position, friend.position);
                if d > 1. && d < 70. {
                    dx += (p.position[0] - friend.position[0]) / d * 0.3;
                    dz += (p.position[2] - friend.position[2]) / d * 0.3;
                }
            }
            let len = dx.hypot(dz).max(0.01);
            dx /= len;
            dz /= len;
            let angle = dx.atan2(dz);
            let mut found = None;
            for offset in [0., 0.6, -0.6, 1.2, -1.2, 1.9, -1.9] {
                let a = angle + offset;
                let step = [
                    p.position[0] + a.sin() * 65.,
                    0.,
                    p.position[2] + a.cos() * 65.,
                ];
                if clear_walk(map, p.position, step) {
                    found = Some((a.sin(), a.cos()));
                    break;
                }
            }
            if let Some((x, z)) = found {
                input.x = x * input.yaw.cos() - z * input.yaw.sin();
                input.y = -x * input.yaw.sin() - z * input.yaw.cos();
            } else {
                input.x = 0.;
                input.y = 0.;
                self.players[slot].ai_path.clear();
            }
        }
        if p.item_wait == 0 && self.tick % (HZ / 2) == slot as u32 {
            if p.health < rules.heroes[p.hero].health - 30 && p.items[6] > 0 {
                input.item = 6;
            } else if p.armor < 25 && p.items[7] > 0 {
                input.item = 7;
            } else if (retreat || input.interact) && p.items[2] > 0 {
                input.item = 2;
            } else if enemy_visible && input.fire && p.items[4] > 0 {
                input.item = 4;
            } else if enemy_visible && input.fire && p.items[3] > 0 {
                input.item = 3;
            }
        }
        // Skills are edge-triggered. Release between attempts so a bot can
        // activate again after cooldown even while the same threat persists.
        input.ability &= self.tick % (HZ / 2) == slot as u32;
        if input.interact {
            input.x = 0.;
            input.y = 0.;
            input.fire = false;
            input.jump = false;
            input.crouch = false;
            input.reload = false;
        }
        if self.players[slot].ai_target != target {
            self.players[slot].ai_target = target;
            self.players[slot].ai_since = self.tick;
        }
        input
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn arena() -> (Rules, Game) {
        let mut r = Rules::load();
        r.maps[0].obstacles.clear();
        let mut g = Game::new(
            Config {
                map: 0,
                mode: "deathmatch".into(),
                heroes: [0; 10],
                bots: [true; 10],
                difficulty: 1,
                seed: 2050,
            },
            &r,
        )
        .unwrap();
        g.phase = "live".into();
        g.tick = 100;
        for p in &mut g.players {
            p.alive = false;
            p.protection = 0;
        }
        g.players[0].alive = true;
        g.players[0].position = [0., 0., 0.];
        g.players[0].yaw = 0.;
        g.players[5].alive = true;
        g.players[5].position = [0., 0., -300.];
        (r, g)
    }
    #[test]
    fn visible_target_beats_nearer_occluded_target() {
        let (mut r, mut g) = arena();
        g.players[5].position = [100., 0., 0.];
        g.players[6].alive = true;
        g.players[6].position = [0., 0., -500.];
        r.maps[0].obstacles.push(Obstacle {
            min: [40., 0., -40.],
            max: [60., 100., 40.],
            kind: "wall".into(),
        });
        g.bot(0, &r);
        assert_eq!(g.players[0].ai_target, Some(6));
    }
    #[test]
    fn hidden_opponents_do_not_steer_navigation_and_memory_expires() {
        let (mut r, mut g) = arena();
        g.bot(0, &r);
        assert_eq!(g.players[0].ai_last_seen, Some([0., 0., -300.]));
        r.maps[0].obstacles.push(Obstacle {
            min: [-1500., 0., -180.],
            max: [1500., 100., -150.],
            kind: "wall".into(),
        });
        g.tick += 1;
        g.players[5].position = [300., 0., -500.];
        g.bot(0, &r);
        assert_eq!(g.players[0].ai_last_seen, Some([0., 0., -300.]));
        g.tick += HZ * 5;
        g.bot(0, &r);
        assert_eq!(g.players[0].ai_last_seen, None);
        let mut clone = g.clone();
        clone.players[5].position = [-700., 0., -800.];
        assert_eq!(
            serde_json::to_value(g.bot(0, &r)).unwrap(),
            serde_json::to_value(clone.bot(0, &r)).unwrap()
        );
    }
    #[test]
    fn fire_requires_aim_and_a_clear_friendly_line() {
        let (r, mut g) = arena();
        g.players[0].ai_target = Some(5);
        g.players[0].ai_since = 0;
        g.players[0].yaw = std::f64::consts::PI;
        assert!(!g.bot(0, &r).fire);
        g.players[0].yaw = 0.;
        g.players[1].alive = true;
        g.players[1].position = [0., 0., -100.];
        assert!(!g.bot(0, &r).fire);
        g.players[1].position = [100., 0., -100.];
        assert!(g.bot(0, &r).fire);
    }
    #[test]
    fn dropped_relay_is_approached_within_pickup_distance() {
        let (r, mut g) = arena();
        g.config.mode = "demolition".into();
        g.attacker = 0;
        g.phase_ticks = HZ * 100;
        g.players[5].position = [1400., 0., 1400.];
        g.players[0].flash = HZ;
        g.players[5].flash = HZ;
        g.objective.carrier = None;
        g.objective.planted = false;
        g.objective.position = [0., 0., -60.];
        let input = g.bot(0, &r);
        assert!(
            input.y > 0.5,
            "must not stop outside the 55-unit pickup radius"
        );
        for _ in 0..20 {
            g.step([Input::default(); 10], &r).unwrap();
            if g.objective.carrier.is_some() {
                break;
            }
        }
        assert_eq!(g.objective.carrier, Some(0));
    }
    #[test]
    fn sustained_threat_releases_skill_input_between_attempts() {
        let (r, mut g) = arena();
        g.players[0].hero = 2;
        g.tick = 96;
        assert!(g.bot(0, &r).ability);
        g.players[0].skill_held = true;
        g.tick += 1;
        assert!(!g.bot(0, &r).ability);
        g.tick = 128;
        assert!(g.bot(0, &r).ability);
    }

    #[test]
    fn a_single_defuser_works_while_squad_holds_outside_the_objective() {
        let (r, mut g) = arena();
        g.config.mode = "demolition".into();
        g.attacker = 1;
        g.objective.planted = true;
        g.objective.position = [0., 0., 0.];
        g.objective.fuse = HZ * 8;
        g.players[1].alive = true;
        g.players[1].position = [150., 0., 0.];
        let defuse = g.bot(0, &r);
        assert!(defuse.interact);
        assert!(!defuse.fire);
        assert_eq!((defuse.x, defuse.y), (0., 0.));
        assert!(!g.bot(1, &r).interact);
    }
}
