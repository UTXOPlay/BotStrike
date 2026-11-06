//! Recorded, solo, unranked training. No browser scores or positions are inputs.
use crate::{Game, Input, Rules, HZ, ITEMS, MAX_TICKS};
use serde::{Deserialize, Serialize};

pub const DISTANCES: [f64; 4] = [100., 600., 1500., 3000.];
pub const IMPACT_LIMIT: usize = 128;
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Config {
    pub drill: u8,
    pub distance: u8,
    pub target_hero: usize,
    pub moving: bool,
    pub combat_map: usize,
    #[serde(default)]
    pub armor: u8,
}
impl Config {
    pub fn valid(&self) -> bool {
        self.drill < 8
            && self.distance < 4
            && self.target_hero < 6
            && self.combat_map < 3
            && self.armor < 3
    }
}
#[derive(Clone, Serialize, Deserialize)]
pub struct Impact {
    pub tick: u32,
    pub shot: u32,
    pub weapon: usize,
    pub point: [f64; 3],
    pub target: Option<usize>,
    pub head: bool,
    pub health_damage: i32,
}
#[derive(Clone, Serialize, Deserialize)]
pub struct Report {
    pub attempt: u32,
    pub settings: Config,
    pub owner_hero: usize,
    pub ticks: u32,
    pub shots: u32,
    pub hits: u32,
    pub headshots: u32,
    pub damage: u32,
    pub kills: u32,
    pub movement_errors: u32,
    pub scope_errors: u32,
    pub outcome: Option<String>,
}
#[derive(Clone, Serialize, Deserialize)]
pub struct State {
    pub settings: Config,
    pub seed: u32,
    pub attempt: u32,
    pub episode_tick: u32,
    pub shots: u32,
    pub hits: u32,
    pub headshots: u32,
    pub damage: u32,
    pub kills: u32,
    pub movement_errors: u32,
    pub scope_errors: u32,
    pub last_spread: f64,
    pub active_slots: [bool; 10],
    pub outcome: Option<String>,
    pub impacts: Vec<Impact>,
    pub last_throw: Option<crate::Utility>,
    pub preview: Vec<[f64; 3]>,
    pub preview_tick: u32,
    pub preview_kind: usize,
    pub preview_mode: u8,
    pub preview_release: Option<crate::Utility>,
    pub last_throw_mode: u8,
    pub last_throw_tick: u32,
    pub reports: Vec<Report>,
    last_command: u8,
}
impl State {
    pub fn new(settings: Config, seed: u32) -> Self {
        Self {
            settings,
            seed,
            attempt: 0,
            episode_tick: 0,
            shots: 0,
            hits: 0,
            headshots: 0,
            damage: 0,
            kills: 0,
            movement_errors: 0,
            scope_errors: 0,
            last_spread: 0.,
            active_slots: [false; 10],
            outcome: None,
            impacts: vec![],
            last_throw: None,
            preview: vec![],
            preview_tick: 0,
            preview_kind: 3,
            preview_mode: 0,
            preview_release: None,
            last_throw_mode: 0,
            last_throw_tick: 0,
            reports: vec![],
            last_command: 0,
        }
    }
}

fn archive(s: &mut State, hero: usize) {
    if s.episode_tick == 0 || s.reports.last().is_some_and(|r| r.attempt == s.attempt) {
        return;
    }
    if s.reports.len() == 12 {
        s.reports.remove(0);
    }
    s.reports.push(Report {
        attempt: s.attempt,
        settings: s.settings.clone(),
        owner_hero: hero,
        ticks: s.episode_tick,
        shots: s.shots,
        hits: s.hits,
        headshots: s.headshots,
        damage: s.damage,
        kills: s.kills,
        movement_errors: s.movement_errors,
        scope_errors: s.scope_errors,
        outcome: s.outcome.clone(),
    });
}

pub fn reset(g: &mut Game, rules: &Rules, hero: Option<usize>) {
    let mode = g.players[0].throw_mode;
    let mut state = g.practice.take().expect("practice state");
    archive(&mut state, g.players[0].hero);
    state.attempt += 1;
    state.episode_tick = 0;
    state.shots = 0;
    state.hits = 0;
    state.headshots = 0;
    state.damage = 0;
    state.kills = 0;
    state.movement_errors = 0;
    state.scope_errors = 0;
    state.outcome = None;
    state.last_spread = 0.;
    state.impacts.clear();
    state.last_throw = None;
    state.preview.clear();
    state.preview_release = None;
    state.active_slots = [false; 10];
    state.active_slots[0] = true;
    g.random = state.seed;
    g.config.map = if state.settings.drill < 5 {
        3
    } else {
        state.settings.combat_map
    };
    g.phase = "live".into();
    g.phase_ticks = MAX_TICKS;
    g.winner = None;
    g.score = [0, 0];
    g.attacker = 0;
    g.utilities.clear();
    g.drops.clear();
    g.history.clear();
    if let Some(hero) = hero {
        g.players[0].hero = hero;
    }
    for slot in 0..10 {
        g.spawn(slot, rules, true);
        let p = &mut g.players[slot];
        p.velocity = [0.; 3];
        p.protection = 0;
        p.credits = 0;
        p.shots = 0;
        p.damage = 0;
        p.kills = 0;
        p.deaths = 0;
        p.assists = 0;
        p.alive = slot == 0 || slot >= 5;
        state.active_slots[slot] = p.alive;
        p.respawn = MAX_TICKS;
        if slot >= 5 {
            p.hero = state.settings.target_hero;
            p.health = rules.heroes[p.hero].health;
            p.armor = match state.settings.armor {
                0 => rules.heroes[p.hero].armor,
                1 => 0,
                _ => 100,
            };
            p.weapon = 2;
        }
    }
    if state.settings.drill < 5 {
        for slot in 6..10 {
            g.players[slot].alive = false;
            state.active_slots[slot] = false;
        }
        g.players[0].position = [0., 0., -1450. + DISTANCES[state.settings.distance as usize]];
        g.players[0].yaw = 0.;
        g.players[0].pitch = 0.;
        g.players[5].position = [0., 0., -1450.];
        g.players[5].yaw = std::f64::consts::PI;
        if state.settings.drill == 1 {
            g.players[5].alive = false;
            state.active_slots[5] = false;
            g.players[0].position[2] = -1580. + DISTANCES[state.settings.distance as usize];
        }
        if state.settings.drill == 3 {
            g.players[0].weapon = 3;
        }
    }
    if state.settings.drill >= 5 {
        let map = &rules.maps[g.config.map];
        let site = map.sites[0];
        let path = crate::route(map, g.players[0].position, site);
        if state.settings.drill == 6 {
            let index = path.len().saturating_sub(6);
            if let Some(position) = path.get(index) {
                g.players[0].position = *position;
            }
        }
        for slot in 5..10 {
            let position = if state.settings.drill == 5 {
                path.get((path.len().saturating_sub(1)) * (slot - 4) / 6)
                    .copied()
                    .unwrap_or(map.spawns[1][(slot - 5) % map.spawns[1].len()])
            } else {
                let angle = (slot - 5) as f64 * std::f64::consts::TAU / 5.;
                [
                    site[0] + angle.sin() * 180.,
                    0.,
                    site[2] + angle.cos() * 180.,
                ]
            };
            let mut position = position;
            crate::constrain(&mut position, map);
            g.players[slot].position = position;
            let d = [
                g.players[0].position[0] - position[0],
                g.players[0].position[2] - position[2],
            ];
            g.players[slot].yaw = (-d[0]).atan2(-d[1]);
        }
        let d = [
            site[0] - g.players[0].position[0],
            site[2] - g.players[0].position[2],
        ];
        g.players[0].yaw = (-d[0]).atan2(-d[1]);
    }
    g.objective.planted = false;
    g.objective.carrier = None;
    g.objective.actor = None;
    g.objective.progress = 0;
    if state.settings.drill == 6 {
        g.attacker = 1;
        g.objective.planted = true;
        g.objective.site = Some(0);
        g.objective.position = rules.maps[g.config.map].sites[0];
        g.objective.fuse = HZ * 90;
    } else if state.settings.drill == 7 {
        g.attacker = 0;
        g.objective.carrier = Some(0);
    }
    g.players[0].throw_mode = mode;
    g.practice = Some(state);
    g.event(
        "practice_reset",
        Some(0),
        None,
        g.practice.as_ref().unwrap().attempt as i32,
    );
}

/// Returns true if the tick ends after a command or completed trial review.
pub fn before_step(g: &mut Game, inputs: &mut [Input; 10], r: &Rules) -> bool {
    let Some(s) = g.practice.as_mut() else {
        return false;
    };
    let command = if inputs[0].takeover {
        inputs[0].practice
    } else {
        0
    };
    let edge = command > 0 && command != s.last_command;
    s.last_command = command;
    if edge {
        if command != 7 {
            archive(s, g.players[0].hero);
        }
        match command {
            1 => {}
            2 => {
                archive(s, g.players[0].hero);
                g.phase = "finished".into();
                g.winner = None;
                g.event("match_end", None, None, 0);
                return true;
            }
            3 => s.settings.distance = (s.settings.distance + 1) % 4,
            4 => s.settings.target_hero = (s.settings.target_hero + 1) % 6,
            5 => s.settings.moving = !s.settings.moving,
            6 => s.settings.drill = (s.settings.drill + 1) % 8,
            8 => s.settings.armor = (s.settings.armor + 1) % 3,
            7 => {
                if g.utilities.len() < 40 && s.outcome.is_none() && g.players[0].alive {
                    if let Some(mut u) = s.last_throw.clone() {
                        crate::projectile::advance(&mut u, &r.maps[g.config.map], &r.projectile);
                        g.utilities.push(u);
                        g.event("item", Some(0), None, 0);
                    }
                }
                return true;
            }
            _ => unreachable!(),
        }
        let hero = inputs[0].hero;
        let seq = inputs[0].seq;
        reset(g, r, hero);
        inputs[0] = Input {
            seq,
            takeover: true,
            yaw: g.players[0].yaw,
            pitch: g.players[0].pitch,
            ..Input::default()
        };
        g.players[0].last_seq = seq;
        // A reset is a control boundary, not the first simulated trial tick.
        // Held fire/movement on its packet cannot alter the fresh attempt.
        return true;
    }
    g.practice.as_ref().is_some_and(|s| s.outcome.is_some())
}

pub fn control(g: &mut Game, slot: usize, r: &Rules, input: Input) -> Input {
    let s = g.practice.as_ref().unwrap();
    if slot == 0 {
        return if input.takeover {
            input
        } else {
            Input {
                yaw: g.players[0].yaw,
                pitch: g.players[0].pitch,
                ..Input::default()
            }
        };
    }
    if slot < 5 || !g.players[slot].alive || s.outcome.is_some() {
        return Input::default();
    }
    if s.settings.drill >= 6 {
        return g.bot(slot, r);
    }
    let x = if (s.settings.moving || s.settings.drill == 4) && slot == 5 {
        if (s.episode_tick / (HZ * 2)) % 2 == 0 {
            0.45
        } else {
            -0.45
        }
    } else {
        0.
    };
    Input {
        x,
        yaw: g.players[slot].yaw,
        ..Input::default()
    }
}

pub fn after_step(g: &mut Game, r: &Rules, inputs: &[Input; 10]) {
    let Some(mut s) = g.practice.take() else {
        return;
    };
    s.episode_tick += 1;
    let p = &mut g.players[0];
    // Infinite supplies are an explicit recorded practice rule. Magazine/reload
    // timing and the live item/field object limits still apply.
    p.reserve = std::array::from_fn(|i| r.weapons[i].reserve);
    for item in 1..ITEMS {
        p.items[item] = p.items[item].max(1);
    }
    if !p.alive {
        s.outcome = Some("failed".into());
    }
    if s.settings.drill < 5 && s.settings.drill != 1 && !g.players[5].alive {
        if g.players[5].respawn > HZ * 2 {
            g.players[5].respawn = HZ * 2;
        }
        g.players[5].respawn = g.players[5].respawn.saturating_sub(1);
        if g.players[5].respawn == 0 {
            g.spawn(5, r, true);
            g.players[5].hero = s.settings.target_hero;
            g.players[5].health = r.heroes[s.settings.target_hero].health;
            g.players[5].armor = match s.settings.armor {
                0 => r.heroes[s.settings.target_hero].armor,
                1 => 0,
                _ => 100,
            };
            g.players[5].position = [0., 0., -1450.];
            g.players[5].protection = 0;
            g.players[5].weapon = 2;
        }
    }
    if s.settings.drill == 5 && g.players[5..].iter().all(|p| !p.alive) {
        s.outcome = Some("success".into());
    }
    s.damage = g.players[0].damage;
    s.kills = g.players[0].kills;
    s.shots = g.players[0].shots;
    let tactical = s.settings.drill >= 6;
    if s.episode_tick % 8 == 0 && g.players[0].alive {
        let kind = if inputs[0].preview_item > 0 {
            inputs[0].preview_item as usize
        } else if inputs[0].item > 0 {
            inputs[0].item as usize
        } else {
            s.preview_kind
        };
        s.preview_kind = kind;
        s.preview_tick = g.tick;
        if r.items[kind].activation != "throw" {
            s.preview.clear();
            s.preview_release = None;
        } else {
            let release = crate::projectile::throw(&g.players[0], kind, &r.projectile);
            s.preview_release = Some(release.clone());
            s.preview_mode = g.players[0].throw_mode;
            s.preview = crate::projectile::preview(release, &r.maps[g.config.map], &r.projectile);
        }
    }
    g.practice = Some(s);
    if tactical && g.phase == "live" {
        let before_score = g.score;
        g.objective_step(inputs, r);
        if g.phase != "live" {
            let won = g.score[0] > before_score[0];
            g.practice.as_mut().unwrap().outcome =
                Some(if won { "success" } else { "failed" }.into());
            g.phase = "live".into();
        }
    }
    if g.practice.as_ref().unwrap().episode_tick >= HZ * 180 {
        g.practice.as_mut().unwrap().outcome = Some("timeout".into());
    }
}

pub fn shot(g: &mut Game, slot: usize, weapon: usize, spread: f64, r: &Rules) {
    if slot != 0 {
        return;
    }
    let p = &g.players[0];
    let speed = p.velocity[0].hypot(p.velocity[2]);
    let moving = speed
        > r.heroes[p.hero].speed * r.weapons[weapon].mobility * r.movement.accurate_speed_fraction
        || p.position[1] > 0.
        || p.landing > 0;
    if let Some(s) = g.practice.as_mut() {
        s.shots = p.shots;
        s.last_spread = spread;
        if moving {
            s.movement_errors += 1;
        }
        if s.settings.drill == 3 && !p.scoped {
            s.scope_errors += 1;
        }
    }
}
pub fn impact(
    g: &mut Game,
    slot: usize,
    weapon: usize,
    point: [f64; 3],
    target: Option<usize>,
    head: bool,
    damage: i32,
) {
    if slot != 0 {
        return;
    }
    if let Some(s) = g.practice.as_mut() {
        if damage > 0 {
            s.hits += 1;
            s.damage += damage as u32;
            if head {
                s.headshots += 1;
            }
        }
        if s.impacts.len() == IMPACT_LIMIT {
            s.impacts.remove(0);
        }
        s.impacts.push(Impact {
            tick: s.episode_tick,
            shot: s.shots,
            weapon,
            point,
            target,
            head,
            health_damage: damage,
        });
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn range() -> (Rules, Game) {
        let r = Rules::load();
        let g = Game::new(
            crate::Config {
                map: 3,
                mode: "practice".into(),
                ruleset: Default::default(),
                heroes: [0; 10],
                bots: [true; 10],
                difficulty: 1,
                seed: 2050,
                practice: Some(Config {
                    drill: 0,
                    distance: 1,
                    target_hero: 2,
                    moving: false,
                    combat_map: 0,
                    armor: 0,
                }),
            },
            &r,
        )
        .unwrap();
        (r, g)
    }
    fn command(value: u8) -> [Input; 10] {
        let mut a = [Input::default(); 10];
        a[0] = Input {
            seq: 77,
            takeover: true,
            practice: value,
            fire: true,
            x: 1.,
            ..Input::default()
        };
        a
    }
    #[test]
    fn only_recorded_practice_configuration_enables_resets_and_free_supplies() {
        let (r, mut g) = range();
        assert_eq!(g.phase, "live");
        assert!(g.players[0].owned.iter().all(|v| *v));
        assert!(g.players[1..5].iter().all(|p| !p.alive));
        assert!(g.players[6..].iter().all(|p| !p.alive));
        let mut bad = g.config.clone();
        bad.mode = "deathmatch".into();
        bad.map = 0;
        assert!(Game::new(bad, &r).is_err());
        let mut normal = g.config.clone();
        normal.mode = "deathmatch".into();
        normal.map = 0;
        normal.practice = None;
        let mut normal = Game::new(normal, &r).unwrap();
        assert!(normal.step(command(1), &r).is_err());
        let start = g.players[0].position;
        g.step(command(1), &r).unwrap();
        assert_eq!(g.players[0].position, start);
        assert_eq!(g.players[0].shots, 0);
        assert_eq!(g.practice.as_ref().unwrap().episode_tick, 0);
        assert_eq!(g.players[0].last_seq, 77);
        let attempt = g.practice.as_ref().unwrap().attempt;
        g.step(command(1), &r).unwrap();
        assert_eq!(
            g.practice.as_ref().unwrap().attempt,
            attempt,
            "holding reset must not repeat it"
        );
    }
    fn trial(g: &mut Game, r: &Rules) -> String {
        for seq in 0..200 {
            let mut a = [Input::default(); 10];
            a[0] = Input {
                seq,
                takeover: true,
                fire: true,
                weapon: Some(2),
                reload: g.players[0].ammo[2] == 0,
                ..Input::default()
            };
            g.step(a, r).unwrap();
        }
        let s = g.practice.as_ref().unwrap();
        serde_json::to_string(&serde_json::json!({"shots":s.shots,"hits":s.hits,"head":s.headshots,"damage":s.damage,"kills":s.kills,"impacts":s.impacts})).unwrap()
    }
    #[test]
    fn fixed_seed_reset_repeats_real_native_impacts_and_trial_statistics() {
        let (r, mut g) = range();
        let first = trial(&mut g, &r);
        g.step(command(1), &r).unwrap();
        let second = trial(&mut g, &r);
        assert_eq!(first, second);
        assert!(g.practice.as_ref().unwrap().hits > 0);
        assert!(g.practice.as_ref().unwrap().impacts.len() <= IMPACT_LIMIT);
    }
    #[test]
    fn settings_are_bounded_and_finish_is_an_explicit_unranked_session_end() {
        let (r, mut g) = range();
        g.step(command(8), &r).unwrap();
        assert_eq!(g.players[5].armor, 0);
        g.step(command(0), &r).unwrap();
        g.step(command(8), &r).unwrap();
        assert_eq!(g.players[5].armor, 100);
        g.step(command(0), &r).unwrap();
        g.step(command(2), &r).unwrap();
        assert_eq!(g.phase, "finished");
        assert_eq!(g.winner, None);
        assert_eq!(g.config.mode, "practice");
        let mut bad = g.config.clone();
        bad.practice.as_mut().unwrap().drill = 8;
        assert!(Game::new(bad, &r).is_err());
    }
    #[test]
    fn preview_and_exact_rethrow_follow_the_actual_live_projectile() {
        let (r, mut g) = range();
        let mut a = [Input::default(); 10];
        a[0] = Input {
            takeover: true,
            item: 3,
            pitch: 0.4,
            ..Input::default()
        };
        g.step(a, &r).unwrap();
        let original = g.practice.as_ref().unwrap().last_throw.clone().unwrap();
        let points =
            crate::projectile::preview(original.clone(), &r.maps[g.config.map], &r.projectile);
        assert_eq!(points.len(), 65);
        assert_eq!(g.utilities[0].fuse, original.fuse - 1);
        for tick in 2..original.fuse {
            g.step([Input::default(); 10], &r).unwrap();
            if tick % 2 == 0 {
                assert_eq!(g.utilities[0].position, points[(tick / 2) as usize]);
            }
        }
        g.step([Input::default(); 10], &r).unwrap();
        assert!(g.utilities.is_empty());
        g.step(command(7), &r).unwrap();
        let mut advanced = original.clone();
        crate::projectile::advance(&mut advanced, &r.maps[g.config.map], &r.projectile);
        assert_eq!(
            serde_json::to_value(&g.utilities[0]).unwrap(),
            serde_json::to_value(&advanced).unwrap()
        );
    }
    #[test]
    fn retake_requires_defuse_and_uses_round_score_for_its_outcome() {
        let (r, mut g) = range();
        g.practice.as_mut().unwrap().settings.drill = 6;
        reset(&mut g, &r, None);
        for slot in 5..10 {
            g.players[slot].alive = false;
        }
        g.players[0].position = g.objective.position;
        g.step([Input::default(); 10], &r).unwrap();
        assert!(
            g.practice.as_ref().unwrap().outcome.is_none(),
            "kills alone cannot win a retake"
        );
        let mut a = [Input::default(); 10];
        a[0] = Input {
            takeover: true,
            interact: true,
            ..Input::default()
        };
        for _ in 0..HZ * 7 + 2 {
            g.step(a, &r).unwrap();
        }
        assert_eq!(
            g.practice.as_ref().unwrap().outcome.as_deref(),
            Some("success")
        );
        assert_eq!(g.phase, "live");
        assert_eq!(g.winner, None, "practice is not a competitive match win");
    }
    #[test]
    fn archived_trial_keeps_original_settings_and_is_bounded() {
        let (r, mut g) = range();
        let mut count = 0;
        for _ in 0..15 {
            g.step(command(0), &r).unwrap();
            let old = g.practice.as_ref().unwrap().settings.distance;
            g.step(command(3), &r).unwrap();
            let s = g.practice.as_ref().unwrap();
            assert_eq!(s.reports.last().unwrap().settings.distance, old);
            assert!(s.reports.len() <= 12);
            count += 1;
        }
        assert_eq!(count, 15);
        assert_eq!(g.practice.as_ref().unwrap().reports.len(), 12);
    }
    #[test]
    fn every_drill_on_each_combat_map_resets_deterministically() {
        let (r, initial) = range();
        for map in 0..3 {
            for drill in 0..8 {
                let mut config = initial.config.clone();
                let settings = config.practice.as_mut().unwrap();
                settings.drill = drill;
                settings.combat_map = map;
                let mut g = Game::new(config, &r).unwrap();
                let positions = g.players.iter().map(|p| p.position).collect::<Vec<_>>();
                for _ in 0..180 {
                    g.step([Input::default(); 10], &r).unwrap();
                }
                g.step(command(1), &r).unwrap();
                assert_eq!(
                    positions,
                    g.players.iter().map(|p| p.position).collect::<Vec<_>>()
                );
                assert_eq!(g.config.map, if drill < 5 { 3 } else { map });
                assert_eq!(g.players[0].shots, 0);
            }
        }
    }
    #[test]
    fn selected_equipment_previews_before_release_and_self_use_clears_the_trace() {
        let (r, mut g) = range();
        let mut a = [Input::default(); 10];
        a[0] = Input {
            takeover: true,
            throw_mode: 2,
            preview_item: 5,
            ..Input::default()
        };
        for _ in 0..8 {
            g.step(a, &r).unwrap();
        }
        let s = g.practice.as_ref().unwrap();
        assert_eq!(s.preview_kind, 5);
        assert_eq!(s.preview_mode, 2);
        assert_eq!(s.preview.len(), 33);
        assert!(s.last_throw.is_none());
        assert!(g.utilities.is_empty());
        a[0].preview_item = 6;
        for _ in 0..8 {
            g.step(a, &r).unwrap();
        }
        let s = g.practice.as_ref().unwrap();
        assert!(s.preview.is_empty());
        assert!(s.preview_release.is_none());
    }
    #[test]
    fn downwards_shots_record_the_native_floor_impact() {
        let (r, mut g) = range();
        g.players[0].weapon = 2;
        let mut a = [Input::default(); 10];
        a[0] = Input {
            takeover: true,
            fire: true,
            pitch: -1.5,
            ..Input::default()
        };
        g.step(a, &r).unwrap();
        let impacts = &g.practice.as_ref().unwrap().impacts;
        assert_eq!(impacts.len(), 1);
        assert!(impacts[0].point[1].abs() < 1e-8);
        assert_eq!(impacts[0].health_damage, 0);
    }
}
