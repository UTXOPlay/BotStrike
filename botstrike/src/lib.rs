use serde::{Deserialize, Serialize};
pub const HZ: u32 = 64;
pub const WEAPONS: usize = 12;
pub const ITEMS: usize = 12;
pub const MAX_TICKS: u32 = HZ * 3600;
pub const SPEC: &str = include_str!("../spec.json");
#[derive(Clone, Deserialize)]
pub struct Hero {
    pub health: i32,
    pub armor: i32,
    pub speed: f64,
    pub cooldown: u32,
}
#[derive(Clone, Deserialize)]
pub struct Weapon {
    pub cost: i32,
    pub damage: i32,
    pub magazine: u32,
    pub reserve: u32,
    pub interval: u32,
    pub reload: u32,
    pub range: f64,
    pub spread: f64,
    pub pellets: u32,
    pub scoped: bool,
    pub burst: u8,
    pub burst_interval: u32,
    pub pierce: f64,
    pub effect: String,
    pub mobility: f64,
    pub splash: f64,
}
#[derive(Clone, Deserialize)]
pub struct Item {
    pub cost: i32,
    pub capacity: u8,
    pub activation: String,
}
#[derive(Clone, Serialize, Deserialize)]
pub struct Obstacle {
    pub min: [f64; 3],
    pub max: [f64; 3],
    pub kind: String,
}
#[derive(Clone, Deserialize)]
pub struct Map {
    pub id: String,
    pub extent: f64,
    pub obstacles: Vec<Obstacle>,
    pub spawns: Vec<Vec<[f64; 3]>>,
    pub sites: Vec<[f64; 3]>,
}
#[derive(Clone, Deserialize)]
pub struct Rules {
    pub heroes: Vec<Hero>,
    pub weapons: Vec<Weapon>,
    pub items: Vec<Item>,
    pub maps: Vec<Map>,
}
impl Rules {
    pub fn load() -> Self {
        serde_json::from_str(SPEC).unwrap()
    }
}
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Config {
    pub map: usize,
    pub mode: String,
    pub heroes: [usize; 10],
    pub bots: [bool; 10],
    pub difficulty: u8,
    pub seed: u32,
}
impl Config {
    pub fn validate(&self) -> Result<(), String> {
        if self.map >= 3
            || !matches!(self.mode.as_str(), "deathmatch" | "demolition")
            || self.heroes.iter().any(|&h| h >= 6)
            || self.difficulty > 2
        {
            return Err("Invalid match configuration".into());
        }
        Ok(())
    }
}
#[derive(Clone, Copy, Debug, Default, Serialize, Deserialize)]
#[serde(default, deny_unknown_fields)]
pub struct Input {
    pub seq: u32,
    // Server-bounded render tick, recorded verbatim for deterministic replay.
    pub view_tick: Option<u32>,
    // Set by the authenticated room service, never copied from a browser packet.
    pub takeover: bool,
    pub x: f64,
    pub y: f64,
    pub yaw: f64,
    pub pitch: f64,
    pub fire: bool,
    pub reload: bool,
    pub walk: bool,
    pub crouch: bool,
    pub jump: bool,
    pub ability: bool,
    pub interact: bool,
    pub scope: bool,
    pub weapon: Option<usize>,
    pub buy: Option<usize>,
    pub hero: Option<usize>,
    pub item: u8,
}
impl Input {
    pub fn validate(&self) -> bool {
        [self.x, self.y, self.yaw, self.pitch]
            .iter()
            .all(|x| x.is_finite())
            && self.x.abs() <= 1.
            && self.y.abs() <= 1.
            && self.yaw.abs() <= 3.142
            && self.pitch.abs() <= 1.5
            && self.weapon.map_or(true, |v| v < WEAPONS)
            && self.buy.map_or(true, |v| v < WEAPONS + ITEMS)
            && self.hero.map_or(true, |v| v < 6)
            && (self.item as usize) < ITEMS
    }
}
#[derive(Clone, Serialize, Deserialize)]
pub struct Player {
    pub slot: usize,
    pub team: usize,
    pub hero: usize,
    pub position: [f64; 3],
    pub velocity: [f64; 3],
    pub yaw: f64,
    pub pitch: f64,
    pub health: i32,
    pub armor: i32,
    pub alive: bool,
    pub crouch: bool,
    pub scoped: bool,
    pub weapon: usize,
    pub owned: [bool; WEAPONS],
    pub ammo: [u32; WEAPONS],
    pub reserve: [u32; WEAPONS],
    pub reload: u32,
    pub fire_wait: u32,
    pub burst_remaining: u8,
    pub overclock: u32,
    pub recoil: f64,
    pub credits: i32,
    pub kills: u32,
    pub deaths: u32,
    pub assists: u32,
    pub damage: u32,
    pub shots: u32,
    pub respawn: u32,
    pub protection: u32,
    pub skill_wait: u32,
    pub effect: u32,
    pub disabled: u32,
    pub revealed: u32,
    pub flash: u32,
    pub items: [u8; ITEMS],
    pub item_wait: u32,
    pub last_seq: u32,
    pub skill_held: bool,
    pub jump_held: bool,
    pub item_held: u8,
    pub attackers: [u32; 10],
    pub life: u32,
    pub ai_target: Option<usize>,
    pub ai_since: u32,
    pub ai_goal: usize,
    pub ai_path: Vec<[f64; 3]>,
}
#[derive(Clone, Serialize, Deserialize)]
pub struct Utility {
    pub kind: u8,
    pub owner: usize,
    pub position: [f64; 3],
    pub velocity: [f64; 3],
    pub fuse: u32,
    pub life: u32,
}
#[derive(Clone, Serialize, Deserialize)]
pub struct Objective {
    pub carrier: Option<usize>,
    pub position: [f64; 3],
    pub planted: bool,
    pub site: Option<usize>,
    pub fuse: u32,
    pub progress: u32,
    pub actor: Option<usize>,
}
#[derive(Clone, Serialize, Deserialize)]
pub struct Event {
    pub kind: String,
    pub actor: Option<usize>,
    pub target: Option<usize>,
    pub value: i32,
}
pub const MAX_REWIND: u32 = 13; // 203 ms at 64 Hz.
#[derive(Clone)]
struct HitPose { position: [f64; 3], crouch: bool, alive: bool, life: u32 }
#[derive(Clone, Serialize, Deserialize)]
pub struct Game {
    pub config: Config,
    pub tick: u32,
    pub phase: String,
    pub phase_ticks: u32,
    pub round: u32,
    pub score: [u32; 2],
    pub attacker: usize,
    pub winner: Option<usize>,
    pub players: Vec<Player>,
    pub objective: Objective,
    pub utilities: Vec<Utility>,
    pub events: Vec<Event>,
    pub random: u32,
    #[serde(skip)]
    history: std::collections::VecDeque<(u32, Vec<HitPose>)>,
}
fn dist(a: [f64; 3], b: [f64; 3]) -> f64 {
    ((a[0] - b[0]).powi(2) + (a[2] - b[2]).powi(2)).sqrt()
}
fn dec(v: &mut u32) {
    *v = v.saturating_sub(1)
}
fn rand(seed: &mut u32) -> f64 {
    *seed = seed.wrapping_mul(1664525).wrapping_add(1013904223);
    *seed as f64 / u32::MAX as f64
}
pub fn constrain(p: &mut [f64; 3], map: &Map) {
    for o in &map.obstacles {
        if p[1] >= o.max[1] {
            continue;
        }
        let lo = [o.min[0] - 18., o.min[2] - 18.];
        let hi = [o.max[0] + 18., o.max[2] + 18.];
        if p[0] > lo[0] && p[0] < hi[0] && p[2] > lo[1] && p[2] < hi[1] {
            let ds = [p[0] - lo[0], hi[0] - p[0], p[2] - lo[1], hi[1] - p[2]];
            let mut best = 0;
            for i in 1..4 {
                if ds[i] < ds[best] {
                    best = i
                }
            }
            match best {
                0 => p[0] = lo[0],
                1 => p[0] = hi[0],
                2 => p[2] = lo[1],
                _ => p[2] = hi[1],
            }
        }
    }
    p[0] = p[0].clamp(-map.extent + 20., map.extent - 20.);
    p[2] = p[2].clamp(-map.extent + 20., map.extent - 20.);
}
// Slab intersection returns the nearest nonnegative world-space distance.
pub fn ray_box(origin: [f64; 3], dir: [f64; 3], min: [f64; 3], max: [f64; 3]) -> Option<f64> {
    let (mut near, mut far) = (0f64, 1e9f64);
    for a in 0..3 {
        if dir[a].abs() < 1e-9 {
            if origin[a] < min[a] || origin[a] > max[a] {
                return None;
            }
        } else {
            let mut x = (min[a] - origin[a]) / dir[a];
            let mut y = (max[a] - origin[a]) / dir[a];
            if x > y {
                std::mem::swap(&mut x, &mut y)
            }
            near = near.max(x);
            far = far.min(y);
            if near > far {
                return None;
            }
        }
    }
    Some(near)
}
fn direction(yaw: f64, pitch: f64) -> [f64; 3] {
    [
        -yaw.sin() * pitch.cos(),
        pitch.sin(),
        -yaw.cos() * pitch.cos(),
    ]
}
fn eye(p: &Player) -> [f64; 3] {
    [
        p.position[0],
        p.position[1] + if p.crouch { 37. } else { 56. },
        p.position[2],
    ]
}
impl Game {
    pub fn new(config: Config, rules: &Rules) -> Result<Self, String> {
        config.validate()?;
        let mut g = Self {
            history: std::collections::VecDeque::new(),
            random: config.seed,
            config,
            tick: 0,
            phase: "buy".into(),
            phase_ticks: 0,
            round: 1,
            score: [0, 0],
            attacker: 0,
            winner: None,
            players: vec![],
            objective: Objective {
                carrier: None,
                position: [0.; 3],
                planted: false,
                site: None,
                fuse: 0,
                progress: 0,
                actor: None,
            },
            utilities: vec![],
            events: vec![],
        };
        for slot in 0..10 {
            g.players.push(Player {
                slot,
                team: slot / 5,
                hero: g.config.heroes[slot],
                position: [0.; 3],
                velocity: [0.; 3],
                yaw: 0.,
                pitch: 0.,
                health: 0,
                armor: 0,
                alive: false,
                crouch: false,
                scoped: false,
                weapon: 0,
                owned: [false; WEAPONS],
                ammo: [0; WEAPONS],
                reserve: [0; WEAPONS],
                reload: 0,
                fire_wait: 0,
                burst_remaining: 0,
                overclock: 0,
                recoil: 0.,
                credits: 800,
                kills: 0,
                deaths: 0,
                assists: 0,
                damage: 0,
                shots: 0,
                respawn: 0,
                protection: 0,
                skill_wait: 0,
                effect: 0,
                disabled: 0,
                revealed: 0,
                flash: 0,
                items: [0; ITEMS],
                item_wait: 0,
                last_seq: 0,
                skill_held: false,
                jump_held: false,
                item_held: 0,
                attackers: [0; 10],
                life: 0,
                ai_target: None,
                ai_since: 0,
                ai_goal: slot,
                ai_path: vec![],
            });
        }
        g.start_round(rules);
        Ok(g)
    }
    fn event(&mut self, kind: &str, actor: Option<usize>, target: Option<usize>, value: i32) {
        self.events.push(Event {
            kind: kind.into(),
            actor,
            target,
            value,
        });
    }
    fn spawn(&mut self, slot: usize, rules: &Rules, reset_loadout: bool) {
        let p = &mut self.players[slot];
        let h = &rules.heroes[p.hero];
        let map = &rules.maps[self.config.map];
        let side = if self.attacker == 0 {
            p.team
        } else {
            1 - p.team
        };
        p.position = map.spawns[side][slot % 5];
        p.yaw = if side == 0 { 0. } else { std::f64::consts::PI };
        p.pitch = 0.;
        p.velocity = [0.; 3];
        p.health = h.health;
        p.armor = if reset_loadout {
            h.armor
        } else {
            p.armor.max(h.armor)
        };
        p.life += 1;
        p.ai_target = None;
        p.ai_since = self.tick;
        p.alive = true;
        p.crouch = false;
        p.scoped = false;
        p.respawn = 0;
        p.protection = if self.config.mode == "deathmatch" {
            HZ * 2
        } else {
            0
        };
        p.reload = 0;
        p.fire_wait = 0;
        p.burst_remaining = 0;
        p.overclock = 0;
        p.recoil = 0.;
        p.skill_wait = 0;
        p.disabled = 0;
        p.effect = 0;
        p.flash = 0;
        p.revealed = 0;
        p.attackers = [0; 10];
        p.skill_held = false;
        p.jump_held = false;
        p.item_held = 0;
        if reset_loadout {
            p.owned = [false; WEAPONS];
            p.owned[0] = true;
            p.weapon = 0;
            p.items = [0; ITEMS];
            if self.config.mode == "deathmatch" {
                p.owned = [true; WEAPONS];
                p.weapon = 2;
                p.items = [1; ITEMS];
            }
        }
        for w in 0..WEAPONS {
            p.ammo[w] = rules.weapons[w].magazine;
            p.reserve[w] = rules.weapons[w].reserve;
        }
    }
    fn start_round(&mut self, rules: &Rules) {
        if self.round == 13 {
            self.attacker = 1;
            for p in &mut self.players {
                p.credits = 800;
                p.alive = false;
            }
        }
        self.utilities.clear();
        self.phase = if self.config.mode == "deathmatch" {
            "live"
        } else {
            "buy"
        }
        .into();
        self.phase_ticks = if self.config.mode == "deathmatch" {
            HZ * 360
        } else {
            HZ * 12
        };
        for slot in 0..10 {
            let reset = !self.players[slot].alive;
            self.spawn(slot, rules, reset);
        }
        let carrier = self
            .players
            .iter()
            .find(|p| p.team == self.attacker)
            .unwrap()
            .slot;
        self.objective = Objective {
            carrier: Some(carrier),
            position: self.players[carrier].position,
            planted: false,
            site: None,
            fuse: 0,
            progress: 0,
            actor: None,
        };
        self.event("round", None, None, self.round as i32);
    }
    fn end_round(&mut self, winner: usize, reason: &str) {
        self.score[winner] += 1;
        self.event(reason, None, None, winner as i32);
        for p in &mut self.players {
            p.credits = (p.credits + if p.team == winner { 3250 } else { 1900 }).min(16000)
        }
        if self.score[winner] >= 13 || self.round >= 25 {
            self.phase = "finished".into();
            self.winner = Some(winner)
        } else {
            self.phase = "round_end".into();
            self.phase_ticks = HZ * 5;
        }
    }
    fn buy(&mut self, slot: usize, item: usize, rules: &Rules) {
        if self.phase != "buy" || !self.players[slot].alive {
            return;
        }
        let p = &mut self.players[slot];
        let gear = item.saturating_sub(WEAPONS);
        let price = if item < WEAPONS {
            rules.weapons[item].cost
        } else if gear < ITEMS {
            rules.items[gear].cost
        } else {
            return;
        };
        if p.credits < price {
            return;
        }
        if item < WEAPONS {
            if p.owned[item] {
                return;
            }
            p.owned[item] = true;
            p.weapon = item;
            p.burst_remaining = 0;
            p.reload = 0;
            p.ammo[item] = rules.weapons[item].magazine;
            p.reserve[item] = rules.weapons[item].reserve;
        } else if gear == 0 {
            if p.armor >= 100 {
                return;
            }
            p.armor = 100;
        } else {
            if p.items[gear] >= rules.items[gear].capacity {
                return;
            }
            p.items[gear] += 1;
        }
        p.credits -= price;
        self.event("buy", Some(slot), None, item as i32);
    }
    fn hurt(&mut self, target: usize, attacker: usize, damage: i32, head: bool) {
        self.hurt_piercing(target, attacker, damage, head, 0.);
    }
    fn hurt_piercing(
        &mut self,
        target: usize,
        attacker: usize,
        damage: i32,
        head: bool,
        pierce: f64,
    ) {
        if !self.players[target].alive
            || self.players[target].protection > 0
            || self.players[target].team == self.players[attacker].team
        {
            return;
        }
        let p = &mut self.players[target];
        let mut amount = damage.max(1);
        if p.hero == 2 && p.effect > 0 {
            amount = (amount + 1) / 2
        }
        let absorbed = ((amount as f64 * 0.5 * (1. - pierce.clamp(0., 1.))) as i32).min(p.armor);
        p.armor -= absorbed;
        amount -= absorbed;
        let actual = amount.min(p.health);
        p.health = (p.health - amount).max(0);
        p.attackers[attacker] += actual as u32;
        self.players[attacker].damage += actual as u32;
        self.event(
            if head { "headshot" } else { "hit" },
            Some(attacker),
            Some(target),
            actual,
        );
        if self.players[target].health == 0 {
            self.players[target].alive = false;
            self.players[target].deaths += 1;
            self.players[target].respawn = HZ * 4;
            self.players[target].velocity = [0.; 3];
            self.players[attacker].kills += 1;
            self.players[attacker].credits = (self.players[attacker].credits + 300).min(16000);
            for a in 0..10 {
                if a != attacker && self.players[target].attackers[a] >= 25 {
                    self.players[a].assists += 1
                }
            }
            if self.objective.carrier == Some(target) {
                self.objective.carrier = None;
                self.objective.position = self.players[target].position;
            }
            if self.config.mode == "deathmatch" {
                self.score[self.players[attacker].team] += 1;
            }
            self.event(
                "kill",
                Some(attacker),
                Some(target),
                self.players[attacker].weapon as i32,
            );
        }
    }
    fn skill(&mut self, slot: usize, rules: &Rules, input: &Input) {
        let p = &self.players[slot];
        if p.skill_wait > 0 || p.disabled > 0 || !p.alive {
            return;
        }
        let team = p.team;
        let pos = p.position;
        let hero = p.hero;
        self.players[slot].skill_wait = rules.heroes[hero].cooldown * HZ;
        match hero {
            0 => {
                let (yaw, x, y) = (input.yaw, input.x, input.y);
                let norm = x.hypot(y);
                let (x, y) = if norm < 0.1 {
                    (0., 1.)
                } else {
                    (x / norm, y / norm)
                };
                for _ in 0..24 {
                    self.players[slot].position[0] += (-yaw.sin() * y + yaw.cos() * x) * 9.;
                    self.players[slot].position[2] += (-yaw.cos() * y - yaw.sin() * x) * 9.;
                    constrain(
                        &mut self.players[slot].position,
                        &rules.maps[self.config.map],
                    );
                }
            }
            1 => {
                for p in &mut self.players {
                    if p.alive && p.team == team && dist(pos, p.position) < 340. {
                        p.health = (p.health + 45).min(rules.heroes[p.hero].health);
                    }
                }
            }
            2 => self.players[slot].effect = HZ * 5,
            3 => {
                for p in &mut self.players {
                    if p.alive && p.team != team && dist(pos, p.position) < 1000. {
                        p.revealed = HZ * 4
                    }
                }
            }
            4 => {
                for p in &mut self.players {
                    if p.alive && p.team != team && dist(pos, p.position) < 460. {
                        p.disabled = HZ * 6;
                        p.effect = 0;
                        p.overclock = 0;
                    }
                }
            }
            _ => self.players[slot].effect = HZ * 5,
        };
        self.event("skill", Some(slot), None, hero as i32);
    }
    fn fire(&mut self, slot: usize, rules: &Rules, view_tick: Option<u32>) {
        let poses = view_tick.filter(|&tick| tick <= self.tick && self.tick - tick <= MAX_REWIND)
            .and_then(|tick| self.history.iter().find(|(t, _)| *t == tick))
            .map(|(_, poses)| poses.clone());
        let p = &mut self.players[slot];
        let w = &rules.weapons[p.weapon];
        if p.fire_wait > 0 || p.reload > 0 || p.ammo[p.weapon] == 0 {
            return;
        }
        p.ammo[p.weapon] -= 1;
        p.shots += 1;
        p.protection = 0;
        p.burst_remaining = if p.burst_remaining == 0 {
            w.burst.saturating_sub(1)
        } else {
            p.burst_remaining - 1
        };
        let interval = if p.burst_remaining > 0 {
            w.burst_interval
        } else {
            w.interval
        };
        p.fire_wait = if (p.hero == 5 && p.effect > 0) || p.overclock > 0 {
            (interval * 2 / 3).max(1)
        } else {
            interval
        };
        let weapon = p.weapon;
        let origin = eye(p);
        let aim = [p.yaw, p.pitch];
        let moving = p.velocity[0].hypot(p.velocity[2]) > 40.;
        let spread = w.spread
            * (if p.crouch { 0.65 } else { 1. })
            * (if w.scoped && !p.scoped { 12. } else { 1. })
            * (if moving { 2.5 } else { 1. })
            * (if (p.hero == 5 && p.effect > 0) || p.overclock > 0 {
                1.5
            } else {
                1.
            })
            + p.recoil;
        let team = p.team;
        p.recoil = (p.recoil + 0.25).min(3.);
        let pellets = w.pellets;
        self.event("shot", Some(slot), None, weapon as i32);
        for _ in 0..pellets {
            let angle = (rand(&mut self.random) - 0.5) * spread.to_radians();
            let pitch = aim[1] + (rand(&mut self.random) - 0.5) * spread.to_radians();
            let dir = direction(aim[0] + angle, pitch);
            let mut nearest = 4000.;
            for o in &rules.maps[self.config.map].obstacles {
                if let Some(t) = ray_box(origin, dir, o.min, o.max) {
                    if t < nearest {
                        nearest = t
                    }
                }
            }
            let mut hit = None;
            let mut head = false;
            for p in &self.players {
                if !p.alive || p.team == team {
                    continue;
                }
                let past = poses.as_ref().map(|poses| &poses[p.slot]);
                // Never hit a different life after a respawn or rewind through death.
                if past.is_some_and(|pose| !pose.alive || pose.life != p.life) { continue; }
                let position = past.map_or(p.position, |pose| pose.position);
                let crouch = past.map_or(p.crouch, |pose| pose.crouch);
                let height = if crouch { 47. } else { 70. };
                if let Some(t) = ray_box(
                    origin,
                    dir,
                    [position[0] - 18., position[1], position[2] - 18.],
                    [
                        position[0] + 18.,
                        position[1] + height,
                        position[2] + 18.,
                    ],
                ) {
                    if t < nearest {
                        nearest = t;
                        hit = Some(p.slot);
                        head = origin[1] + dir[1] * t > position[1] + height - 16.;
                    }
                }
            }
            if let Some(target) = hit {
                let falloff = (1. - (nearest - w.range).max(0.) / 5000.).max(0.55);
                let before = self.players[target].health;
                self.hurt_piercing(
                    target,
                    slot,
                    (w.damage as f64 * falloff * if head { 2.5 } else { 1. }) as i32,
                    head,
                    w.pierce,
                );
                if self.players[target].health < before {
                    match w.effect.as_str() {
                        "emp" => {
                            self.players[target].disabled = HZ;
                            self.players[target].effect = 0;
                            self.players[target].overclock = 0;
                        }
                        "mark" => self.players[target].revealed = HZ * 2,
                        "siphon" => {
                            let heal = (before - self.players[target].health).min(6);
                            self.players[slot].health = (self.players[slot].health + heal)
                                .min(rules.heroes[self.players[slot].hero].health);
                        }
                        _ => {}
                    }
                }
            }
            if w.splash > 0. && nearest < 4000. {
                // Stop just short of the hit surface so a wall shields its far side.
                let impact = [
                    origin[0] + dir[0] * (nearest - 0.5).max(0.),
                    origin[1] + dir[1] * (nearest - 0.5).max(0.),
                    origin[2] + dir[2] * (nearest - 0.5).max(0.),
                ];
                for target in 0..10 {
                    if Some(target) == hit {
                        continue;
                    }
                    let to = eye(&self.players[target]);
                    let distance = ((to[0] - impact[0]).powi(2)
                        + (to[1] - impact[1]).powi(2)
                        + (to[2] - impact[2]).powi(2))
                    .sqrt();
                    if distance >= w.splash {
                        continue;
                    }
                    let ray = [
                        (to[0] - impact[0]) / distance.max(1.),
                        (to[1] - impact[1]) / distance.max(1.),
                        (to[2] - impact[2]) / distance.max(1.),
                    ];
                    if rules.maps[self.config.map]
                        .obstacles
                        .iter()
                        .any(|o| ray_box(impact, ray, o.min, o.max).is_some_and(|t| t < distance))
                    {
                        continue;
                    }
                    self.hurt(
                        target,
                        slot,
                        (35. * (1. - distance / w.splash)) as i32,
                        false,
                    );
                }
                self.event("plasma", Some(slot), hit, weapon as i32);
            }
        }
    }
    fn use_item(&mut self, slot: usize, item: usize, rules: &Rules) {
        if item == 0
            || item >= ITEMS
            || !self.players[slot].alive
            || self.players[slot].items[item] == 0
            || self.players[slot].item_wait > 0
        {
            return;
        }
        let p = &mut self.players[slot];
        if rules.items[item].activation == "throw" {
            if self.utilities.len() >= 40 {
                return;
            }
            let d = direction(p.yaw, p.pitch);
            self.utilities.push(Utility {
                kind: item as u8,
                owner: slot,
                position: eye(p),
                velocity: [d[0] * 600., d[1] * 600. + 160., d[2] * 600.],
                fuse: if matches!(item, 5 | 10) { HZ } else { HZ * 2 },
                life: match item {
                    2 => HZ * 14,
                    5 | 10 => HZ * 8,
                    _ => 0,
                },
            });
        } else {
            match item {
                6 => {
                    let max = rules.heroes[p.hero].health;
                    if p.health >= max {
                        return;
                    }
                    p.health = (p.health + 45).min(max);
                }
                7 => {
                    if p.armor >= 100 {
                        return;
                    }
                    p.armor = (p.armor + 40).min(100);
                }
                8 => {
                    if p.skill_wait == 0 && p.fire_wait == 0 {
                        return;
                    }
                    p.skill_wait = p.skill_wait.saturating_sub(HZ * 4);
                    p.fire_wait = 0;
                }
                9 => {
                    if p.disabled > 0 || p.overclock > 0 {
                        return;
                    }
                    p.overclock = HZ * 4;
                }
                11 => {
                    if !(0..WEAPONS).any(|w| p.owned[w] && p.reserve[w] < rules.weapons[w].reserve)
                    {
                        return;
                    }
                    for w in 0..WEAPONS {
                        if p.owned[w] {
                            p.reserve[w] = (p.reserve[w] + rules.weapons[w].reserve / 2)
                                .min(rules.weapons[w].reserve);
                        }
                    }
                }
                _ => return,
            }
        }
        p.items[item] -= 1;
        p.item_wait = HZ;
        self.event("item", Some(slot), None, item as i32);
    }
    fn utilities(&mut self, rules: &Rules) {
        let mut explosions = vec![];
        for u in &mut self.utilities {
            if u.fuse > 0 {
                u.velocity[1] -= 500. / HZ as f64;
                for a in 0..3 {
                    u.position[a] += u.velocity[a] / HZ as f64
                }
                let before = u.position;
                constrain(&mut u.position, &rules.maps[self.config.map]);
                if before[0] != u.position[0] {
                    u.velocity[0] *= -0.5
                }
                if before[2] != u.position[2] {
                    u.velocity[2] *= -0.5
                }
                if u.position[1] < 8. {
                    u.position[1] = 8.;
                    u.velocity[1] = u.velocity[1].abs() * 0.4;
                    u.velocity[0] *= 0.85;
                    u.velocity[2] *= 0.85
                }
                dec(&mut u.fuse);
                if u.fuse == 0 {
                    explosions.push(u.clone())
                }
            } else {
                dec(&mut u.life)
            }
        }
        for u in explosions {
            self.event("utility", Some(u.owner), None, u.kind as i32);
            if matches!(u.kind, 2 | 5 | 10) {
                continue;
            }
            for slot in 0..10 {
                let d = dist(u.position, self.players[slot].position);
                let max = if u.kind == 1 {
                    650.
                } else if u.kind == 4 {
                    350.
                } else {
                    260.
                };
                if d > max || !self.players[slot].alive {
                    continue;
                }
                let origin = eye(&self.players[slot]);
                let length = ((origin[0] - u.position[0]).powi(2)
                    + (origin[1] - u.position[1]).powi(2)
                    + (origin[2] - u.position[2]).powi(2))
                .sqrt();
                let dir = [
                    (u.position[0] - origin[0]) / length.max(1.),
                    (u.position[1] - origin[1]) / length.max(1.),
                    (u.position[2] - origin[2]) / length.max(1.),
                ];
                if rules.maps[self.config.map]
                    .obstacles
                    .iter()
                    .any(|o| ray_box(origin, dir, o.min, o.max).is_some_and(|t| t < length))
                {
                    continue;
                }
                if u.kind == 1 {
                    let facing = direction(self.players[slot].yaw, self.players[slot].pitch);
                    let dot = facing.iter().zip(dir).map(|(a, b)| a * b).sum::<f64>();
                    self.players[slot].flash = if dot > 0. { HZ * 3 } else { HZ / 2 };
                } else if u.kind == 4 {
                    if self.players[slot].team != self.players[u.owner].team
                        && self.players[slot].protection == 0
                    {
                        self.players[slot].disabled = HZ * 5;
                        self.players[slot].effect = 0;
                        self.players[slot].overclock = 0;
                    }
                } else {
                    self.hurt(slot, u.owner, (95. * (1. - d / max)) as i32, false);
                }
            }
        }
        for field in &self.utilities {
            if field.fuse > 0 || field.life == 0 {
                continue;
            }
            let team = self.players[field.owner].team;
            for p in &mut self.players {
                if !p.alive {
                    continue;
                }
                let distance = dist(field.position, p.position);
                if field.kind == 5 && p.team != team && distance < 450. {
                    p.revealed = HZ / 2;
                }
                if field.kind == 10 && p.team == team && distance < 220. && self.tick % HZ == 0 {
                    p.health = (p.health + 8).min(rules.heroes[p.hero].health);
                }
            }
        }
        self.utilities.retain(|u| u.fuse > 0 || u.life > 0);
    }
    pub fn step(&mut self, inputs: [Input; 10], rules: &Rules) -> Result<(), String> {
        if self.phase == "finished" {
            return Err("Input after completed match".into());
        }
        if inputs.iter().any(|i| !i.validate()) {
            return Err("Invalid controls".into());
        }
        self.history.push_back((self.tick, self.players.iter().map(|p| HitPose {
            position: p.position, crouch: p.crouch, alive: p.alive, life: p.life,
        }).collect()));
        while self.history.len() > MAX_REWIND as usize + 1 { self.history.pop_front(); }
        self.events.clear();
        self.tick += 1;
        if self.tick > MAX_TICKS {
            return Err("Match exceeds time limit".into());
        }
        let mut effective = inputs;
        for slot in 0..10 {
            if self.config.bots[slot] && !inputs[slot].takeover {
                effective[slot] = self.bot(slot, rules);
            }
        }
        if self.phase == "round_end" {
            dec(&mut self.phase_ticks);
            if self.phase_ticks == 0 {
                self.round += 1;
                self.start_round(rules)
            }
            return Ok(());
        }
        for (slot, input) in effective.iter().enumerate() {
            if let Some(item) = input.buy {
                self.buy(slot, item, rules)
            }
            let p = &mut self.players[slot];
            if let Some(hero) = input.hero {
                if (self.phase == "buy" || !p.alive) && p.hero != hero {
                    p.hero = hero;
                    if p.alive {
                        p.health = rules.heroes[hero].health;
                        p.armor = p.armor.max(rules.heroes[hero].armor);
                    }
                }
            }
            p.last_seq = input.seq;
            p.yaw = input.yaw;
            p.pitch = input.pitch;
            if !p.alive {
                if self.config.mode == "deathmatch" {
                    dec(&mut p.respawn);
                    if p.respawn == 0 {
                        self.spawn(slot, rules, true);
                        self.event("respawn", Some(slot), None, 0);
                    }
                }
                continue;
            }
            if self.phase == "buy" {
                continue;
            }
            for v in [
                &mut p.protection,
                &mut p.fire_wait,
                &mut p.skill_wait,
                &mut p.disabled,
                &mut p.effect,
                &mut p.revealed,
                &mut p.flash,
                &mut p.item_wait,
                &mut p.overclock,
            ] {
                dec(v)
            }
            p.recoil = (p.recoil - 0.035).max(0.);
            if p.reload > 0 {
                dec(&mut p.reload);
                if p.reload == 0 {
                    let amount = (rules.weapons[p.weapon].magazine - p.ammo[p.weapon])
                        .min(p.reserve[p.weapon]);
                    p.ammo[p.weapon] += amount;
                    p.reserve[p.weapon] -= amount;
                }
            }
            if let Some(w) = input.weapon {
                if p.owned[w] && w != p.weapon {
                    p.weapon = w;
                    p.reload = 0;
                    p.burst_remaining = 0;
                    p.fire_wait = 10;
                    p.recoil = 0.;
                }
            }
            p.crouch = input.crouch;
            p.scoped = input.scope && rules.weapons[p.weapon].scoped;
            let length = input.x.hypot(input.y).max(1.);
            let speed = rules.heroes[p.hero].speed
                * rules.weapons[p.weapon].mobility
                * if p.crouch {
                    0.45
                } else if input.walk || p.scoped {
                    0.55
                } else {
                    1.
                };
            p.velocity[0] =
                (-input.yaw.sin() * input.y + input.yaw.cos() * input.x) / length * speed;
            p.velocity[2] =
                (-input.yaw.cos() * input.y - input.yaw.sin() * input.x) / length * speed;
            if input.jump && !p.jump_held && p.position[1] <= 0. {
                p.velocity[1] = 220.
            }
            p.jump_held = input.jump;
            p.velocity[1] -= 600. / HZ as f64;
            for a in 0..3 {
                p.position[a] += p.velocity[a] / HZ as f64;
            }
            if p.position[1] < 0. {
                p.position[1] = 0.;
                p.velocity[1] = 0.;
            }
            constrain(&mut p.position, &rules.maps[self.config.map]);
            let cast = input.ability && !p.skill_held;
            p.skill_held = input.ability;
            if input.reload
                && p.reload == 0
                && p.ammo[p.weapon] < rules.weapons[p.weapon].magazine
                && p.reserve[p.weapon] > 0
            {
                p.reload = rules.weapons[p.weapon].reload;
                p.burst_remaining = 0;
            }
            let deploy = input.item > 0 && p.item_held != input.item;
            p.item_held = input.item;
            if deploy {
                self.use_item(slot, input.item as usize, rules);
            }
            if cast {
                self.skill(slot, rules, input)
            }
            if input.fire || self.players[slot].burst_remaining > 0 {
                self.fire(slot, rules, input.view_tick)
            }
        }
        if self.phase == "buy" {
            dec(&mut self.phase_ticks);
            if self.phase_ticks == 0 {
                self.phase = "live".into();
                self.phase_ticks = HZ * 100;
            }
            return Ok(());
        }
        self.utilities(rules);
        dec(&mut self.phase_ticks);
        if self.config.mode == "deathmatch" {
            if self.score.iter().any(|&s| s >= 50) || self.phase_ticks == 0 {
                self.phase = "finished".into();
                self.winner = if self.score[0] == self.score[1] {
                    None
                } else {
                    Some(usize::from(self.score[1] > self.score[0]))
                };
                self.event("match_end", None, None, 0);
            }
        } else {
            self.objective_step(&effective, rules);
        }
        if self.tick == MAX_TICKS {
            self.phase = "finished".into();
            self.winner = if self.score[0] == self.score[1] {
                None
            } else {
                Some(usize::from(self.score[1] > self.score[0]))
            };
        }
        Ok(())
    }
    fn objective_step(&mut self, inputs: &[Input; 10], rules: &Rules) {
        let map = &rules.maps[self.config.map];
        if let Some(slot) = self.objective.carrier {
            self.objective.position = self.players[slot].position;
        }
        if self.objective.carrier.is_none() && !self.objective.planted {
            for p in &self.players {
                if p.alive
                    && p.team == self.attacker
                    && dist(p.position, self.objective.position) < 55.
                {
                    self.objective.carrier = Some(p.slot);
                    self.event("pickup", Some(p.slot), None, 0);
                    break;
                }
            }
        }
        let mut actor = None;
        let mut site = None;
        if self.objective.planted {
            dec(&mut self.objective.fuse);
            if self.objective.fuse == 0 {
                self.end_round(self.attacker, "detonation");
                return;
            }
            actor = self
                .players
                .iter()
                .find(|p| {
                    p.alive
                        && p.team != self.attacker
                        && inputs[p.slot].interact
                        && !inputs[p.slot].fire
                        && !inputs[p.slot].jump
                        && p.position[1] <= 0.01
                        && p.velocity[0].hypot(p.velocity[2]) < 5.
                        && dist(p.position, self.objective.position) < 95.
                })
                .map(|p| p.slot);
        } else if let Some(slot) = self.objective.carrier {
            if inputs[slot].interact
                && !inputs[slot].fire
                && !inputs[slot].jump
                && self.players[slot].position[1] <= 0.01
                && self.players[slot].velocity[0].hypot(self.players[slot].velocity[2]) < 5.
            {
                site = map
                    .sites
                    .iter()
                    .position(|&s| dist(s, self.players[slot].position) < 125.);
                if site.is_some() {
                    actor = Some(slot)
                }
            }
        }
        if actor.is_some() && actor == self.objective.actor {
            self.objective.progress += 1
        } else {
            self.objective.actor = actor;
            self.objective.progress = 0;
        }
        if let Some(slot) = actor {
            let required = if self.objective.planted {
                HZ * 7
            } else {
                HZ * 3
            };
            if self.objective.progress >= required {
                self.players[slot].credits = (self.players[slot].credits + 300).min(16000);
                if self.objective.planted {
                    self.end_round(1 - self.attacker, "defused");
                    return;
                } else {
                    self.objective.planted = true;
                    self.objective.carrier = None;
                    self.objective.site = site;
                    self.objective.fuse = HZ * 40;
                    self.objective.progress = 0;
                    self.objective.actor = None;
                    self.event("planted", Some(slot), None, site.unwrap() as i32);
                }
            }
        }
        let alive = [
            self.players
                .iter()
                .filter(|p| p.alive && p.team == 0)
                .count(),
            self.players
                .iter()
                .filter(|p| p.alive && p.team == 1)
                .count(),
        ];
        if alive[1 - self.attacker] == 0 {
            self.end_round(self.attacker, "elimination")
        } else if !self.objective.planted && (alive[self.attacker] == 0 || self.phase_ticks == 0) {
            self.end_round(
                1 - self.attacker,
                if self.phase_ticks == 0 {
                    "time"
                } else {
                    "elimination"
                },
            )
        }
    }
    fn bot(&mut self, slot: usize, rules: &Rules) -> Input {
        let p = &self.players[slot];
        let mut input = Input {
            seq: self.tick,
            yaw: p.yaw,
            pitch: 0.,
            ..Input::default()
        };
        if !p.alive {
            return input;
        }
        if self.phase == "buy" {
            input.buy = if !p.owned[2] && p.credits >= rules.weapons[2].cost {
                Some(2)
            } else if !p.owned[1] && p.credits >= rules.weapons[1].cost {
                Some(1)
            } else if p.armor < 100 && p.credits >= 650 {
                Some(WEAPONS)
            } else {
                [6, 4, 2].into_iter().find(|&item| p.items[item] == 0 && p.credits >= rules.items[item].cost)
                    .map(|item| WEAPONS + item)
            };
            return input;
        }
        if self.config.mode == "deathmatch" {
            input.weapon = Some([1, 2, 7, 3, 8, 5, 6, 9, 10, 11][slot]);
        }
        let map = &rules.maps[self.config.map];
        let target = self
            .players
            .iter()
            .filter(|q| q.team != p.team && q.alive)
            .min_by(|a, b| dist(p.position, a.position).total_cmp(&dist(p.position, b.position)))
            .map(|q| q.slot);
        let mut goal = map.sites[slot % 2];
        let mut enemy_visible = false;
        if let Some(other) = target {
            let q = &self.players[other];
            let o = eye(p);
            let end = eye(q);
            let length =
                ((end[0] - o[0]).powi(2) + (end[1] - o[1]).powi(2) + (end[2] - o[2]).powi(2))
                    .sqrt().max(0.001);
            let dir = [
                (end[0] - o[0]) / length,
                (end[1] - o[1]) / length,
                (end[2] - o[2]) / length,
            ];
            let smoke = self
                .utilities
                .iter()
                .any(|u| u.kind == 2 && u.fuse == 0 && segment_near(o, end, u.position, 175.));
            enemy_visible = p.flash == 0
                && !smoke
                && !map
                    .obstacles
                    .iter()
                    .any(|b| ray_box(o, dir, b.min, b.max).is_some_and(|d| d < length));
            if self.config.mode == "deathmatch" || enemy_visible {
                goal = q.position
            }
            if enemy_visible {
                let error = [0.10, 0.035, 0.009][self.config.difficulty as usize];
                input.yaw = (-(end[0] - o[0])).atan2(-(end[2] - o[2]))
                    + ((self.tick / 8 + slot as u32 * 37) as f64 * 0.7).sin() * error;
                let turn = [3., 5., 7.][self.config.difficulty as usize] / HZ as f64;
                let difference = (input.yaw - p.yaw).sin().atan2((input.yaw - p.yaw).cos());
                input.yaw = p.yaw + difference.clamp(-turn, turn);
                input.yaw = input.yaw.sin().atan2(input.yaw.cos());
                let target_pitch = ((end[1] - o[1]) / length).clamp(-1., 1.).asin();
                input.pitch = p.pitch + (target_pitch - p.pitch).clamp(-turn, turn);
                input.fire = p.ai_target == Some(other)
                    && self.tick.saturating_sub(p.ai_since) >= [20, 14, 9][self.config.difficulty as usize]
                    && (self.tick + slot as u32 * 11) % 64 > [24, 12, 4][self.config.difficulty as usize]
                    && length < 2400.;
                input.scope = rules.weapons[p.weapon].scoped;
                input.ability = match p.hero {
                    0 => p.health < 40,
                    1 => {
                        p.health < rules.heroes[p.hero].health - 20
                            || self.players.iter().any(|q| {
                                q.team == p.team
                                    && q.alive
                                    && q.health < 50
                                    && dist(q.position, p.position) < 340.
                            })
                    }
                    _ => length < if p.hero == 4 { 430. } else { 900. },
                };
                if length < 650. {
                    input.x = if (self.tick / (HZ * 2) + slot as u32) % 2 == 0 {
                        0.7
                    } else {
                        -0.7
                    };
                    input.y = if length < 250. { -0.4 } else { 0. };
                }
            }
        }
        if self.config.mode == "demolition" {
            if self.objective.planted {
                goal = self.objective.position;
                if p.team != self.attacker && dist(p.position, goal) < 90. {
                    input.interact = true;
                    input.x = 0.;
                    input.y = 0.;
                }
            } else if self.objective.carrier == Some(slot) {
                goal = map.sites[slot % 2];
                if dist(p.position, goal) < 115. {
                    input.interact = true;
                    input.x = 0.;
                    input.y = 0.;
                }
            } else if self.objective.carrier.is_none() && p.team == self.attacker {
                goal = self.objective.position;
            }
        }
        input.reload = p.ammo[p.weapon] == 0 || (p.ammo[p.weapon] < 8 && !enemy_visible);
        if !input.interact
            && (!enemy_visible
                || target.is_some_and(|q| dist(p.position, self.players[q].position) > 650.))
        {
            if self.players[slot].ai_path.is_empty() || self.tick % HZ == slot as u32 {
                self.players[slot].ai_path = route(map, self.players[slot].position, goal);
            }
            while self.players[slot]
                .ai_path
                .first()
                .is_some_and(|&q| dist(q, self.players[slot].position) < 45.)
            {
                self.players[slot].ai_path.remove(0);
            }
            let waypoint = self.players[slot].ai_path.first().copied().unwrap_or(goal);
            let dx = waypoint[0] - self.players[slot].position[0];
            let dz = waypoint[2] - self.players[slot].position[2];
            let len = dx.hypot(dz).max(1.);
            if !enemy_visible {
                input.yaw = (-dx).atan2(-dz);
                input.y = 1.
            } else {
                input.x = (dx * input.yaw.cos() - dz * input.yaw.sin()) / len;
                input.y = (-dx * input.yaw.sin() - dz * input.yaw.cos()) / len;
            }
        }
        let p = &self.players[slot];
        if !input.interact && p.item_wait == 0 {
            if p.health < rules.heroes[p.hero].health - 30 && p.items[6] > 0 {
                input.item = 6;
            } else if p.armor < 30 && p.items[7] > 0 {
                input.item = 7;
            } else if enemy_visible && self.tick % (HZ * 4) == slot as u32 && p.items[4] > 0 {
                input.item = 4;
            }
        }
        if input.interact {
            input.fire = false;
            input.jump = false;
        }
        let acquired = if enemy_visible { target } else { None };
        if self.players[slot].ai_target != acquired {
            self.players[slot].ai_target = acquired;
            self.players[slot].ai_since = self.tick;
        }
        input
    }
}
fn segment_near(a: [f64; 3], b: [f64; 3], point: [f64; 3], radius: f64) -> bool {
    let dx = b[0] - a[0];
    let dz = b[2] - a[2];
    let t = (((point[0] - a[0]) * dx + (point[2] - a[2]) * dz) / (dx * dx + dz * dz).max(1.))
        .clamp(0., 1.);
    dist([a[0] + dx * t, 0., a[2] + dz * t], point) < radius
}
// A bounded four-neighbour grid routes bots around collision geometry.
pub fn route(map: &Map, start: [f64; 3], goal: [f64; 3]) -> Vec<[f64; 3]> {
    let cell = 80.;
    let n = (map.extent * 2. / cell).ceil() as usize;
    let point = |i: usize| {
        [
            -map.extent + (i % n) as f64 * cell + cell / 2.,
            0.,
            -map.extent + (i / n) as f64 * cell + cell / 2.,
        ]
    };
    let index = |p: [f64; 3]| {
        let x = ((p[0] + map.extent) / cell)
            .floor()
            .clamp(0., (n - 1) as f64) as usize;
        let y = ((p[2] + map.extent) / cell)
            .floor()
            .clamp(0., (n - 1) as f64) as usize;
        y * n + x
    };
    let mut walkable = vec![true; n * n];
    for (i, free) in walkable.iter_mut().enumerate() {
        let p = point(i);
        *free = !map.obstacles.iter().any(|o| {
            p[0] > o.min[0] - 25.
                && p[0] < o.max[0] + 25.
                && p[2] > o.min[2] - 25.
                && p[2] < o.max[2] + 25.
        });
    }
    let begin = index(start);
    let end = index(goal);
    walkable[begin] = true;
    let mut previous = vec![usize::MAX; n * n];
    let mut queue = std::collections::VecDeque::new();
    queue.push_back(begin);
    previous[begin] = begin;
    let mut closest = begin;
    while let Some(i) = queue.pop_front() {
        if dist(point(i), goal) < dist(point(closest), goal) {
            closest = i
        }
        if i == end {
            closest = i;
            break;
        }
        let x = i % n;
        let y = i / n;
        for next in [
            if x > 0 { Some(i - 1) } else { None },
            if x + 1 < n { Some(i + 1) } else { None },
            if y > 0 { Some(i - n) } else { None },
            if y + 1 < n { Some(i + n) } else { None },
        ]
        .into_iter()
        .flatten()
        {
            if walkable[next] && previous[next] == usize::MAX {
                previous[next] = i;
                queue.push_back(next)
            }
        }
    }
    let mut path = vec![];
    let mut cur = closest;
    while cur != begin {
        path.push(point(cur));
        cur = previous[cur];
    }
    path.reverse();
    path
}

#[cfg(test)]
mod tests {
    use super::*;
    fn setup(mode: &str) -> (Rules, Game) {
        let r = Rules::load();
        let g = Game::new(
            Config {
                map: 0,
                mode: mode.into(),
                heroes: [0, 1, 2, 3, 4, 5, 0, 1, 2, 3],
                bots: [false; 10],
                difficulty: 1,
                seed: 2050,
            },
            &r,
        )
        .unwrap();
        (r, g)
    }
    fn neutral() -> [Input; 10] {
        [Input::default(); 10]
    }
    fn combat(g: &mut Game) {
        g.phase = "live".into();
        g.phase_ticks = HZ * 100;
        for p in &mut g.players {
            p.protection = 0;
        }
        g.players[0].position = [-1100., 0., 300.];
        g.players[5].position = [-1100., 0., 100.];
    }
    #[test]
    fn configurations_and_inputs_are_bounded() {
        let (r, mut g) = setup("deathmatch");
        let mut c = g.config.clone();
        c.heroes[5] = 6;
        assert!(Game::new(c, &r).is_err());
        let mut i = neutral();
        i[0].x = f64::NAN;
        assert!(g.step(i, &r).is_err());
        i[0] = Input {
            weapon: Some(WEAPONS),
            ..Input::default()
        };
        assert!(g.step(i, &r).is_err());
    }
    #[test]
    fn all_maps_have_routes_between_both_spawns_and_both_sites() {
        let r = Rules::load();
        for m in &r.maps {
            for team in &m.spawns {
                for &spawn in team {
                    for &site in &m.sites {
                        let path = route(m, spawn, site);
                        assert!(!path.is_empty(), "{} missing route", m.id);
                        assert!(
                            dist(*path.last().unwrap(), site) < 120.,
                            "{} unreachable objective",
                            m.id
                        );
                        for point in path {
                            let mut clamped = point;
                            constrain(&mut clamped, m);
                            assert_eq!(point, clamped);
                        }
                    }
                }
            }
        }
    }
    #[test]
    fn collision_and_normalized_movement_preserve_world_bounds() {
        let (r, mut g) = setup("deathmatch");
        let initial = g.players[0].position;
        let mut i = neutral();
        i[0].x = 1.;
        i[0].y = 1.;
        g.step(i, &r).unwrap();
        assert!(
            (dist(initial, g.players[0].position) - r.heroes[0].speed / HZ as f64).abs() < 1e-8
        );
        for _ in 0..2000 {
            g.step(i, &r).unwrap();
        }
        assert!(g.players[0].position.iter().all(|v| v.is_finite()));
        assert!(g.players[0].position[0].abs() < r.maps[0].extent);
    }
    #[test]
    fn respawn_is_delayed_protected_and_scored() {
        let (r, mut g) = setup("deathmatch");
        combat(&mut g);
        g.hurt(5, 0, 1000, false);
        assert!(!g.players[5].alive);
        assert_eq!(g.players[0].kills, 1);
        assert_eq!(g.score, [1, 0]);
        for _ in 0..HZ * 4 - 1 {
            g.step(neutral(), &r).unwrap();
            assert!(!g.players[5].alive);
        }
        g.step(neutral(), &r).unwrap();
        assert!(g.players[5].alive);
        let hp = g.players[5].health;
        g.hurt(5, 0, 1000, false);
        assert_eq!(g.players[5].health, hp);
    }
    #[test]
    fn hero_skills_have_distinct_effects_and_cooldowns() {
        let (r, mut g) = setup("deathmatch");
        combat(&mut g);
        let before = g.players[0].position;
        g.skill(0, &r, &Input::default());
        assert!(dist(before, g.players[0].position) > 200.);
        let after = g.players[0].position;
        g.skill(0, &r, &Input::default());
        assert_eq!(after, g.players[0].position);
        g.players[1].position = g.players[0].position;
        g.players[0].health = 30;
        g.skill(1, &r, &Input::default());
        assert_eq!(g.players[0].health, 75);
        g.skill(2, &r, &Input::default());
        assert!(g.players[2].effect > 0);
        g.players[3].position = g.players[5].position;
        g.skill(3, &r, &Input::default());
        assert!(g.players[5].revealed > 0);
        g.players[4].position = g.players[5].position;
        g.players[5].effect = 100;
        g.skill(4, &r, &Input::default());
        assert!(g.players[5].disabled > 0);
        assert_eq!(g.players[5].effect, 0);
        g.skill(5, &r, &Input::default());
        assert_eq!(g.players[5].effect, 0);
        g.players[5].disabled = 0;
        g.skill(5, &r, &Input::default());
        assert!(g.players[5].effect > 0);
    }
    #[test]
    fn fire_reload_armor_and_cover_are_authoritative() {
        let (r, mut g) = setup("deathmatch");
        combat(&mut g);
        g.players[0].weapon = 3;
        g.players[0].scoped = true;
        g.players[0].yaw = 0.;
        let hp = g.players[5].health;
        g.fire(0, &r, None);
        assert!(g.players[5].health < hp);
        let ammo = g.players[0].ammo[3];
        g.fire(0, &r, None);
        assert_eq!(g.players[0].ammo[3], ammo);
        let mut i = neutral();
        i[0].reload = true;
        for _ in 0..r.weapons[3].reload + 1 {
            g.step(i, &r).unwrap()
        }
        assert_eq!(g.players[0].ammo[3], r.weapons[3].magazine);
        let o = &r.maps[0].obstacles[0];
        g.players[0].position = [(o.min[0] + o.max[0]) / 2., 0., o.max[2] + 100.];
        g.players[5].position = [g.players[0].position[0], 0., o.min[2] - 100.];
        g.players[0].fire_wait = 0;
        let hp = g.players[5].health;
        g.fire(0, &r, None);
        assert_eq!(g.players[5].health, hp);
    }
    #[test]
    fn purchases_require_buy_phase_and_real_credits() {
        let (r, mut g) = setup("demolition");
        g.buy(0, 2, &r);
        assert!(!g.players[0].owned[2]);
        g.players[0].credits = 4000;
        g.buy(0, 2, &r);
        assert_eq!(g.players[0].credits, 1300);
        assert!(g.players[0].owned[2]);
        g.buy(0, 2, &r);
        assert_eq!(g.players[0].credits, 1300);
        g.phase = "live".into();
        g.buy(0, WEAPONS, &r);
        assert_eq!(g.players[0].credits, 1300);
    }
    #[test]
    fn plant_defuse_and_detonation_have_distinct_outcomes() {
        let (r, mut g) = setup("demolition");
        combat(&mut g);
        g.players[0].position = r.maps[0].sites[0];
        g.objective.carrier = Some(0);
        let mut i = neutral();
        i[0].interact = true;
        for _ in 0..HZ * 3 + 1 {
            g.step(i, &r).unwrap()
        }
        assert!(g.objective.planted);
        g.players[5].position = g.objective.position;
        i[5].interact = true;
        for _ in 0..HZ * 7 + 1 {
            g.step(i, &r).unwrap()
        }
        assert_eq!(g.score, [0, 1]);
        assert_eq!(g.phase, "round_end");
        let (_, mut g) = setup("demolition");
        combat(&mut g);
        g.objective.planted = true;
        g.objective.carrier = None;
        g.objective.fuse = 1;
        g.step(neutral(), &r).unwrap();
        assert_eq!(g.score, [1, 0]);
        assert!(g.events.iter().any(|e| e.kind == "detonation"));
    }
    #[test]
    fn relay_action_is_interrupted_by_movement_fire_and_jump() {
        let (r, mut g) = setup("demolition");
        combat(&mut g);
        g.players[0].position = r.maps[0].sites[0];
        g.objective.carrier = Some(0);
        let mut input = neutral();
        input[0].interact = true;
        for _ in 0..10 {
            g.step(input, &r).unwrap();
        }
        assert!(g.objective.progress > 0);
        input[0].x = 1.;
        g.step(input, &r).unwrap();
        assert_eq!(g.objective.progress, 0);
        input[0].x = 0.;
        for _ in 0..10 {
            g.step(input, &r).unwrap();
        }
        assert!(g.objective.progress > 0);
        input[0].fire = true;
        g.step(input, &r).unwrap();
        assert_eq!(g.objective.actor, None);
        input[0].fire = false;
        input[0].jump = true;
        g.step(input, &r).unwrap();
        assert_eq!(g.objective.actor, None);
        assert!(!g.objective.planted);
    }
    #[test]
    fn demolition_respawns_next_round_and_switches_sides() {
        let (r, mut g) = setup("demolition");
        combat(&mut g);
        g.hurt(5, 0, 1000, false);
        for _ in 0..HZ * 5 {
            g.step(neutral(), &r).unwrap()
        }
        assert!(!g.players[5].alive);
        g.end_round(0, "test");
        for _ in 0..HZ * 5 {
            g.step(neutral(), &r).unwrap()
        }
        assert!(g.players[5].alive);
        assert_eq!(g.phase, "buy");
        g.round = 13;
        g.start_round(&r);
        assert_eq!(g.attacker, 1);
        assert_eq!(g.players[0].credits, 800);
        assert_eq!(g.players[0].position, r.maps[0].spawns[1][0]);
    }
    #[test]
    fn utility_inventory_is_consumed_once_and_smoke_expires() {
        let (r, mut g) = setup("deathmatch");
        combat(&mut g);
        let mut i = neutral();
        i[0].item = 2;
        for _ in 0..HZ * 3 {
            g.step(i, &r).unwrap()
        }
        assert_eq!(g.players[0].items[2], 0);
        assert_eq!(g.utilities.len(), 1);
        assert_eq!(g.utilities[0].fuse, 0);
        for _ in 0..HZ * 15 {
            g.step(neutral(), &r).unwrap()
        }
        assert!(g.utilities.is_empty());
    }
    #[test]
    fn arsenal_economy_caps_and_live_phase_are_authoritative() {
        let (r, mut g) = setup("demolition");
        for weapon in 1..WEAPONS {
            g.players[0].credits = 16000;
            g.buy(0, weapon, &r);
            assert!(g.players[0].owned[weapon]);
            assert_eq!(g.players[0].weapon, weapon);
            assert_eq!(g.players[0].credits, 16000 - r.weapons[weapon].cost);
            let credits = g.players[0].credits;
            g.buy(0, weapon, &r);
            assert_eq!(g.players[0].credits, credits);
        }
        for item in 1..ITEMS {
            g.players[0].credits = 16000;
            for _ in 0..r.items[item].capacity {
                g.buy(0, WEAPONS + item, &r);
            }
            let credits = g.players[0].credits;
            g.buy(0, WEAPONS + item, &r);
            assert_eq!(g.players[0].items[item], r.items[item].capacity);
            assert_eq!(g.players[0].credits, credits);
        }
        combat(&mut g);
        g.players[0].armor = 0;
        let credits = g.players[0].credits;
        g.buy(0, WEAPONS, &r);
        assert_eq!(g.players[0].armor, 0);
        assert_eq!(g.players[0].credits, credits);
    }
    #[test]
    fn repair_power_and_coolant_have_bounded_native_effects() {
        let (r, mut g) = setup("deathmatch");
        combat(&mut g);
        g.use_item(0, 6, &r);
        assert_eq!(g.players[0].items[6], 1, "full health preserves injector");
        g.players[0].health = 20;
        g.use_item(0, 6, &r);
        assert_eq!(g.players[0].health, 65);
        assert_eq!(g.players[0].items[6], 0);
        g.players[0].item_wait = 0;
        g.players[0].armor = 80;
        g.use_item(0, 7, &r);
        assert_eq!(g.players[0].armor, 100);
        g.players[0].item_wait = 0;
        g.players[0].skill_wait = HZ * 8;
        g.players[0].fire_wait = 20;
        g.use_item(0, 8, &r);
        assert_eq!(g.players[0].skill_wait, HZ * 4);
        assert_eq!(g.players[0].fire_wait, 0);
        g.players[0].item_wait = 0;
        g.use_item(0, 11, &r);
        assert_eq!(g.players[0].items[11], 1);
        g.players[0].reserve[7] = 0;
        g.use_item(0, 11, &r);
        assert_eq!(g.players[0].reserve[7], r.weapons[7].reserve / 2);
        g.players[0].item_wait = 0;
        g.players[0].disabled = HZ;
        g.use_item(0, 9, &r);
        assert_eq!(g.players[0].overclock, 0);
        assert_eq!(g.players[0].items[9], 1);
        g.players[0].disabled = 0;
        g.use_item(0, 9, &r);
        assert_eq!(g.players[0].overclock, HZ * 4);
    }
    #[test]
    fn burst_finishes_after_trigger_release_and_switch_cancels_it() {
        let (r, mut g) = setup("deathmatch");
        combat(&mut g);
        g.players[0].weapon = 5;
        let mut input = neutral();
        input[0].fire = true;
        g.step(input, &r).unwrap();
        input[0].fire = false;
        for _ in 0..25 {
            g.step(input, &r).unwrap();
        }
        assert_eq!(g.players[0].shots, 3);
        assert_eq!(g.players[0].ammo[5], r.weapons[5].magazine - 3);
        g.players[0].fire_wait = 0;
        input[0].fire = true;
        g.step(input, &r).unwrap();
        input[0].fire = false;
        input[0].weapon = Some(2);
        g.step(input, &r).unwrap();
        assert_eq!(g.players[0].burst_remaining, 0);
    }
    #[test]
    fn special_rounds_apply_only_after_valid_enemy_damage() {
        for weapon in [8, 9, 10] {
            let (mut r, mut g) = setup("deathmatch");
            combat(&mut g);
            r.weapons[weapon].spread = 0.;
            g.players[0].weapon = weapon;
            g.players[0].yaw = 0.;
            g.players[0].pitch = -0.08;
            g.players[0].health = 40;
            g.players[5].overclock = HZ * 4;
            g.fire(0, &r, None);
            assert!(g.players[5].health < r.heroes[g.players[5].hero].health);
            if weapon == 8 {
                assert_eq!(g.players[5].disabled, HZ);
                assert_eq!(g.players[5].overclock, 0);
            }
            if weapon == 9 {
                assert_eq!(g.players[5].revealed, HZ * 2);
            }
            if weapon == 10 {
                assert_eq!(g.players[0].health, 46);
            }
            g.players[5].disabled = 0;
            g.players[5].revealed = 0;
            g.players[5].protection = HZ;
            g.players[0].health = 40;
            g.players[0].fire_wait = 0;
            g.fire(0, &r, None);
            assert_eq!(g.players[5].disabled, 0);
            assert_eq!(g.players[5].revealed, 0);
            assert_eq!(g.players[0].health, 40);
        }
    }
    #[test]
    fn fields_and_emp_respect_team_and_expire() {
        let (r, mut g) = setup("deathmatch");
        combat(&mut g);
        g.tick = HZ;
        g.players[0].health = 40;
        g.players[5].health = 40;
        for kind in [5, 10] {
            g.utilities.push(Utility {
                kind,
                owner: 0,
                position: [-1100., 8., 200.],
                velocity: [0.; 3],
                fuse: 0,
                life: HZ * 8,
            });
        }
        g.utilities(&r);
        assert_eq!(g.players[0].health, 48);
        assert_eq!(g.players[5].health, 40);
        assert_eq!(g.players[5].revealed, HZ / 2);
        assert_eq!(g.players[0].revealed, 0);
        g.players[5].overclock = HZ;
        g.utilities.push(Utility {
            kind: 4,
            owner: 0,
            position: [-1100., 30., 200.],
            velocity: [0.; 3],
            fuse: 1,
            life: 0,
        });
        g.utilities(&r);
        assert_eq!(g.players[5].disabled, HZ * 5);
        assert_eq!(g.players[5].overclock, 0);
        assert_eq!(g.players[0].disabled, 0);
        for _ in 0..HZ * 8 {
            g.utilities(&r);
        }
        assert!(g.utilities.is_empty());
    }
    #[test]
    fn deterministic_bot_matches_complete_on_every_map() {
        let r = Rules::load();
        for map in 0..3 {
            for mode in ["deathmatch", "demolition"] {
                let c = Config {
                    map,
                    mode: mode.into(),
                    heroes: [0, 1, 2, 3, 4, 5, 0, 1, 2, 3],
                    bots: [true; 10],
                    difficulty: 1,
                    seed: 2050,
                };
                let mut g = Game::new(c.clone(), &r).unwrap();
                let mut other = Game::new(c, &r).unwrap();
                for _ in 0..MAX_TICKS {
                    g.step(neutral(), &r).unwrap();
                    other.step(neutral(), &r).unwrap();
                    if g.tick % 1000 == 0 {
                        assert_eq!(
                            serde_json::to_vec(&g).unwrap(),
                            serde_json::to_vec(&other).unwrap()
                        )
                    }
                    if g.phase == "finished" {
                        break;
                    }
                }
                assert_eq!(g.phase, "finished");
                assert!(
                    g.players.iter().map(|p| p.kills).sum::<u32>() > 0,
                    "{map} {mode}: bots never fought"
                );
                assert_eq!(
                    serde_json::to_vec(&g).unwrap(),
                    serde_json::to_vec(&other).unwrap()
                );
                eprintln!("map {map} {mode}: ticks={} score={:?}", g.tick, g.score);
            }
        }
    }
    #[test]
    fn bounded_rewind_hits_the_rendered_pose_but_never_a_new_life_or_through_cover() {
        let (mut rules, mut game) = setup("deathmatch");
        rules.maps[0].obstacles.clear(); rules.weapons[0].spread = 0.;
        combat(&mut game); game.tick = 100;
        for p in &mut game.players { if p.slot != 0 && p.slot != 5 { p.alive = false; } }
        game.players[0].weapon = 0; game.players[0].yaw = 0.; game.players[0].pitch = 0.;
        let poses: Vec<HitPose> = game.players.iter().map(|p| HitPose { position:p.position,crouch:p.crouch,alive:p.alive,life:p.life }).collect();
        game.history.push_back((94, poses));
        game.players[5].position[0] += 100.;
        let health = game.players[5].health;
        let mut without = game.clone(); without.fire(0,&rules,None); assert_eq!(without.players[5].health,health);
        let mut with = game.clone(); with.fire(0,&rules,Some(94)); assert!(with.players[5].health < health);
        for requested in [0,86,101,u32::MAX] { let mut invalid = game.clone(); invalid.fire(0,&rules,Some(requested)); assert_eq!(invalid.players[5].health,health); }
        let mut respawned = game.clone(); respawned.players[5].life += 1; respawned.fire(0,&rules,Some(94)); assert_eq!(respawned.players[5].health,health);
        rules.maps[0].obstacles.push(Obstacle { min:[-1150.,0.,180.],max:[-1050.,100.,220.],kind:"wall".into() });
        game.fire(0,&rules,Some(94)); assert_eq!(game.players[5].health,health);
    }
    #[test]
    fn bots_wait_to_react_and_coincident_eyes_never_generate_nan() {
        let (mut rules,mut game)=setup("deathmatch"); rules.maps[0].obstacles.clear(); combat(&mut game);
        game.tick=20; let first=game.bot(0,&rules); assert!(!first.fire); assert!(first.validate());
        for elapsed in 1..14 { game.tick=20+elapsed; assert!(!game.bot(0,&rules).fire); }
        game.players[5].position=game.players[0].position;
        for tick in 40..100 {game.tick=tick;assert!(game.bot(0,&rules).validate());}
    }

}
