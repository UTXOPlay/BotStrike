//! Offline route measurement against the native library. No live-room access,
//! state teleportation, balance edits, or application-engine rebuild is needed.
use botstrike_engine::{constrain, ray_box, sight, Config, Game, Input, Map, Rules, HZ, SPEC};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::{
    collections::{HashMap, VecDeque},
    fs::OpenOptions,
    io::{self, Read, Write},
};
type Point = [f64; 3];
fn distance(a: Point, b: Point) -> f64 {
    (a[0] - b[0]).hypot(a[2] - b[2])
}
#[derive(Deserialize, Serialize, Clone)]
#[serde(deny_unknown_fields)]
struct Anchor {
    id: String,
    name: String,
    position: Point,
}
#[derive(Deserialize, Serialize, Clone)]
#[serde(deny_unknown_fields)]
struct Case {
    id: String,
    slot: usize,
    hero: usize,
    weapon: usize,
    pace: String,
    prelude: Vec<String>,
    via: Vec<String>,
    trace: bool,
    #[serde(default)]
    dash: bool,
}
#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
struct Request {
    map: usize,
    anchors: Vec<Anchor>,
    cases: Vec<Case>,
    #[serde(default)]
    tape_case: Option<usize>,
}
#[derive(Clone, Serialize)]
struct Frame {
    tick: u32,
    position: Point,
    yaw: f64,
    stance: f64,
}
#[derive(Serialize)]
struct Measurement {
    case: Case,
    reached: bool,
    reason: Option<String>,
    prelude_ticks: u32,
    start_position: Point,
    site_entry_ticks: Option<u32>,
    arrival_ticks: u32,
    settled_ticks: u32,
    distance: f64,
    stalled_ticks: u32,
    dash_activations: u32,
    final_position: Point,
    waypoints: Vec<Point>,
    trace: Vec<Frame>,
}

// A conservative 50-unit planning grid, with 8 extra units of edge clearance.
// Native Game::step still decides every measured position and collision.
struct Navigator<'a> {
    map: &'a Map,
    n: usize,
    points: Vec<Point>,
    free: Vec<bool>,
    cache: HashMap<String, Option<Vec<Point>>>,
}
impl<'a> Navigator<'a> {
    fn new(map: &'a Map) -> Self {
        let n = ((map.extent * 2. - 100.) / 50.).floor() as usize + 1;
        let points = (0..n * n)
            .map(|i| {
                [
                    -map.extent + 50. + (i % n) as f64 * 50.,
                    0.,
                    -map.extent + 50. + (i / n) as f64 * 50.,
                ]
            })
            .collect::<Vec<_>>();
        let mut nav = Self {
            map,
            n,
            points,
            free: vec![],
            cache: HashMap::new(),
        };
        nav.free = nav.points.iter().map(|p| nav.clear(*p)).collect();
        nav
    }
    fn clear(&self, p: Point) -> bool {
        for x in [-8., 0., 8.] {
            for z in [-8., 0., 8.] {
                let before = [p[0] + x, 0., p[2] + z];
                let mut after = before;
                constrain(&mut after, self.map);
                if distance(before, after) > 1e-8 {
                    return false;
                }
            }
        }
        true
    }
    fn segment(&self, a: Point, b: Point) -> bool {
        let count = (distance(a, b) / 4.).ceil().max(1.) as usize;
        (0..=count).all(|i| {
            self.clear(std::array::from_fn(|j| {
                a[j] + (b[j] - a[j]) * i as f64 / count as f64
            }))
        })
    }
    fn nearest(&self, p: Point) -> Option<usize> {
        let mut indices = (0..self.points.len())
            .filter(|i| self.free[*i])
            .collect::<Vec<_>>();
        indices
            .sort_by(|a, b| distance(p, self.points[*a]).total_cmp(&distance(p, self.points[*b])));
        indices
            .into_iter()
            .take(128)
            .find(|i| self.segment(p, self.points[*i]))
    }
    fn route(&mut self, a: Point, b: Point) -> Option<Vec<Point>> {
        let key = format!("{:?}/{:?}", a, b);
        if let Some(path) = self.cache.get(&key) {
            return path.clone();
        }
        let result = self.plan(a, b);
        self.cache.insert(key, result.clone());
        result
    }
    fn plan(&self, a: Point, b: Point) -> Option<Vec<Point>> {
        if self.segment(a, b) {
            return Some(vec![b]);
        }
        let start = self.nearest(a)?;
        let end = self.nearest(b)?;
        let mut previous = vec![usize::MAX; self.points.len()];
        let mut queue = VecDeque::from([start]);
        previous[start] = start;
        while let Some(i) = queue.pop_front() {
            if i == end {
                break;
            }
            for (dx, dz) in [(0, 1), (1, 0), (0, -1), (-1, 0)] {
                let x = (i % self.n) as i32 + dx;
                let z = (i / self.n) as i32 + dz;
                if x < 0 || z < 0 || x >= self.n as i32 || z >= self.n as i32 {
                    continue;
                }
                let j = z as usize * self.n + x as usize;
                if previous[j] == usize::MAX
                    && self.free[j]
                    && self.segment(self.points[i], self.points[j])
                {
                    previous[j] = i;
                    queue.push_back(j);
                }
            }
        }
        if previous[end] == usize::MAX {
            return None;
        }
        let mut raw = vec![b];
        let mut node = end;
        loop {
            raw.push(self.points[node]);
            if node == start {
                break;
            }
            node = previous[node];
        }
        raw.reverse();
        let mut result = vec![];
        let mut from = a;
        let mut index = 0;
        while index < raw.len() {
            let mut far = index;
            for j in (index..raw.len()).rev() {
                if self.segment(from, raw[j]) {
                    far = j;
                    break;
                }
            }
            result.push(raw[far]);
            from = raw[far];
            index = far + 1;
        }
        Some(result)
    }
}
struct Recorder {
    file: std::fs::File,
    hash: blake3::Hasher,
    neutral: Vec<u8>,
}
impl Recorder {
    fn new(path: &str, g: &Game) -> Result<Self, Box<dyn std::error::Error>> {
        let mut file = OpenOptions::new().write(true).create_new(true).open(path)?;
        writeln!(file, "{}", json!({"config":g.config}))?;
        let mut hash = blake3::Hasher::new();
        hash.update(SPEC.as_bytes());
        hash.update(&serde_json::to_vec(&g.config)?);
        Ok(Self {
            file,
            hash,
            neutral: serde_json::to_vec(&Input::default())?,
        })
    }
    fn step(&mut self, g: &Game, inputs: [Input; 10]) -> Result<(), Box<dyn std::error::Error>> {
        let compact = inputs.map(|v| {
            if serde_json::to_vec(&v).unwrap() == self.neutral {
                None
            } else {
                Some(v)
            }
        });
        writeln!(self.file, "{}", json!({"inputs":compact}))?;
        self.hash.update(&serde_json::to_vec(g)?);
        Ok(())
    }
}
fn step(
    g: &mut Game,
    input: Input,
    slot: usize,
    r: &Rules,
    record: &mut Option<Recorder>,
) -> Result<(), Box<dyn std::error::Error>> {
    let mut inputs = [Input::default(); 10];
    inputs[slot] = input;
    g.step(inputs, r)?;
    if let Some(rec) = record {
        rec.step(g, inputs)?;
    }
    Ok(())
}
fn follow(
    g: &mut Game,
    r: &Rules,
    case: &Case,
    path: &[Point],
    record: &mut Option<Recorder>,
    trace: &mut Vec<Frame>,
    base: u32,
) -> Result<(bool, f64, u32, u32, Option<u32>), Box<dyn std::error::Error>> {
    let slot = case.slot;
    let site = match case.via.last().map(String::as_str) {
        Some("a_pad") => Some(r.maps[g.config.map].sites[0]),
        Some("b_pad") => Some(r.maps[g.config.map].sites[1]),
        _ => None,
    };
    let mut entry = site
        .filter(|s| distance(g.players[slot].position, *s) < 125.)
        .map(|_| g.tick - base);
    let mut travelled = 0.;
    let mut stalled = 0;
    let mut dash = 0;
    let mut used_dash = false;
    let limit = g.tick + HZ * 160;
    for goal in path {
        while distance(g.players[slot].position, *goal) > 5. {
            if g.tick >= limit || g.phase != "live" {
                return Ok((false, travelled, stalled, dash, entry));
            }
            let p = &g.players[slot];
            let d = distance(p.position, *goal);
            let dx = goal[0] - p.position[0];
            let dz = goal[2] - p.position[2];
            let top = r.heroes[case.hero].speed
                * r.weapons[case.weapon].mobility
                * match case.pace.as_str() {
                    "walk" => 0.55,
                    "crouch" => 0.45,
                    _ => 1.,
                };
            let fraction = (2. * r.movement.braking * (d - 3.).max(0.)).sqrt().min(top) / top;
            let ability = case.dash && !used_dash && d > 300.;
            if ability {
                used_dash = true;
            }
            let input = Input {
                seq: g.tick + 1,
                takeover: true,
                y: fraction,
                yaw: (-dx).atan2(-dz),
                weapon: Some(case.weapon),
                walk: case.pace == "walk",
                crouch: case.pace == "crouch",
                ability,
                ..Input::default()
            };
            let old = p.position;
            step(g, input, slot, r, record)?;
            if entry.is_none() && site.is_some_and(|s| distance(g.players[slot].position, s) < 125.)
            {
                entry = Some(g.tick - base);
            }
            let moved = distance(old, g.players[slot].position);
            travelled += moved;
            if moved < 0.01 {
                stalled += 1;
            }
            dash += g
                .events
                .iter()
                .filter(|e| e.kind == "skill" && e.actor == Some(slot) && e.value == 0)
                .count() as u32;
            if case.trace {
                let p = &g.players[slot];
                trace.push(Frame {
                    tick: g.tick - base,
                    position: p.position,
                    yaw: p.yaw,
                    stance: p.stance,
                });
            }
        }
    }
    Ok((true, travelled, stalled, dash, entry))
}
fn settle(
    g: &mut Game,
    r: &Rules,
    case: &Case,
    record: &mut Option<Recorder>,
    mut trace: Option<(&mut Vec<Frame>, u32)>,
) -> Result<(), Box<dyn std::error::Error>> {
    for _ in 0..HZ {
        let p = &g.players[case.slot];
        if p.velocity[0].hypot(p.velocity[2]) < 0.000001 {
            return Ok(());
        }
        let input = Input {
            seq: g.tick + 1,
            takeover: true,
            yaw: p.yaw,
            weapon: Some(case.weapon),
            crouch: case.pace == "crouch",
            ..Input::default()
        };
        step(g, input, case.slot, r, record)?;
        if let Some((frames, base)) = trace.as_mut() {
            let p = &g.players[case.slot];
            frames.push(Frame {
                tick: g.tick - *base,
                position: p.position,
                yaw: p.yaw,
                stance: p.stance,
            });
        }
    }
    Err("Route controller did not settle".into())
}
fn line(r: &Rules, map: &Map, a: Point, astance: f64, b: Point, bstance: f64) -> Value {
    let eye = [a[0], a[1] + sight::eye_height(astance), a[2]];
    let yaw = (-(a[0] - b[0])).atan2(-(a[2] - b[2]));
    let samples = r.hit_regions.visibility_samples(b, bstance, [yaw, 0.]);
    let mut clear = 0;
    let mut rays = vec![];
    for target in samples {
        let delta = std::array::from_fn::<_, 3, _>(|i| target[i] - eye[i]);
        let length = delta.iter().map(|v| v * v).sum::<f64>().sqrt();
        let dir = delta.map(|v| v / length.max(1e-9));
        let hit = map
            .obstacles
            .iter()
            .enumerate()
            .filter_map(|(i, o)| {
                ray_box(eye, dir, o.min, o.max)
                    .filter(|v| *v < length)
                    .map(|v| (i, v))
            })
            .min_by(|a, b| a.1.total_cmp(&b.1));
        let visible = !map
            .obstacles
            .iter()
            .any(|o| sight::intersects_box(eye, target, o));
        if visible {
            clear += 1;
        }
        rays.push(json!({"target":target,"visible":visible,"firstCover":hit.map(|v|v.0),"shotDistance":hit.map(|v|v.1)}));
    }
    json!({"clearSamples":clear,"samples":rays})
}
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut input = String::new();
    io::stdin().take(1_000_001).read_to_string(&mut input)?;
    if input.len() > 1_000_000 {
        return Err("Audit request too large".into());
    }
    let req: Request = serde_json::from_str(&input)?;
    if req.tape_case.is_some_and(|i| i >= req.cases.len())
        || req.cases.iter().filter(|c| c.trace).count() > 40
    {
        return Err("Audit trace bounds".into());
    }
    let r = Rules::load();
    if req.map >= 3 || req.anchors.len() > 24 || req.cases.len() > 512 || req.cases.is_empty() {
        return Err("Audit bounds".into());
    }
    let anchors = req
        .anchors
        .iter()
        .map(|a| (a.id.clone(), a.position))
        .collect::<HashMap<_, _>>();
    if anchors.len() != req.anchors.len()
        || req.anchors.iter().any(|a| {
            a.id.len() > 48
                || a.name.len() > 64
                || !a.position.iter().all(|v| v.is_finite() && v.abs() <= 5000.)
                || a.position[1] != 0.
        })
    {
        return Err("Invalid anchors".into());
    }
    let map = &r.maps[req.map];
    let mut nav = Navigator::new(map);
    let tape = std::env::args().nth(1);
    let mut measurements = vec![];
    let mut proof = None;
    for (index, case) in req.cases.iter().enumerate() {
        if case.slot >= 10
            || case.hero >= 6
            || case.weapon >= 12
            || (case.dash && case.hero != 0)
            || !matches!(case.pace.as_str(), "run" | "walk" | "crouch")
            || case.prelude.len() > 8
            || case.via.is_empty()
            || case.via.len() > 8
            || case.id.len() > 80
            || case
                .prelude
                .iter()
                .chain(&case.via)
                .any(|id| !anchors.contains_key(id))
        {
            return Err("Invalid route case".into());
        }
        let mut heroes = [0; 10];
        heroes[case.slot] = case.hero;
        let config = Config {
            map: req.map,
            mode: "deathmatch".into(),
            ruleset: Default::default(),
            heroes,
            bots: [false; 10],
            difficulty: 1,
            seed: 2050,
            practice: None,
        };
        let mut g = Game::new(config, &r)?;
        let mut record = if req.tape_case == Some(index) {
            Some(Recorder::new(
                tape.as_deref().ok_or("Missing new tape path")?,
                &g,
            )?)
        } else {
            None
        };
        let mut reason = None;
        for id in &case.prelude {
            if let Some(path) = nav.route(g.players[case.slot].position, anchors[id]) {
                let (ok, _, _, _, _) = follow(
                    &mut g,
                    &r,
                    &Case {
                        trace: false,
                        dash: false,
                        ..case.clone()
                    },
                    &path,
                    &mut record,
                    &mut vec![],
                    0,
                )?;
                if !ok {
                    reason = Some("Prelude controller limit".to_string());
                    break;
                }
            } else {
                reason = Some(format!("No conservative prelude route to {id}"));
                break;
            }
        }
        settle(&mut g, &r, case, &mut record, None)?;
        let base = g.tick;
        let start_position = g.players[case.slot].position;
        let mut site_entry_ticks = None;
        let mut trace = vec![];
        let p = &g.players[case.slot];
        if case.trace {
            trace.push(Frame {
                tick: 0,
                position: p.position,
                yaw: p.yaw,
                stance: p.stance,
            });
        }
        let (mut travelled, mut stalled, mut dash) = (0., 0, 0);
        let mut waypoints = vec![];
        if reason.is_none() {
            for id in &case.via {
                if let Some(path) = nav.route(g.players[case.slot].position, anchors[id]) {
                    waypoints.extend(&path);
                    let (ok, d, s, a, entry) =
                        follow(&mut g, &r, case, &path, &mut record, &mut trace, base)?;
                    if site_entry_ticks.is_none() {
                        site_entry_ticks = entry;
                    }
                    travelled += d;
                    stalled += s;
                    dash += a;
                    if !ok {
                        reason = Some("Measured controller limit".into());
                        break;
                    }
                } else {
                    reason = Some(format!("No conservative measured route to {id}"));
                    break;
                }
            }
        }
        let arrival = g.tick - base;
        settle(
            &mut g,
            &r,
            case,
            &mut record,
            case.trace.then_some((&mut trace, base)),
        )?;
        measurements.push(Measurement {
            case: case.clone(),
            reached: reason.is_none(),
            reason,
            prelude_ticks: base,
            start_position,
            site_entry_ticks,
            arrival_ticks: arrival,
            settled_ticks: g.tick - base,
            distance: travelled,
            stalled_ticks: stalled,
            dash_activations: dash,
            final_position: g.players[case.slot].position,
            waypoints,
            trace,
        });
        if let Some(mut rec) = record {
            while g.phase != "finished" {
                let inputs = [Input::default(); 10];
                g.step(inputs, &r)?;
                rec.step(&g, inputs)?;
            }
            rec.file.flush()?;
            proof = Some(
                json!({"case":case.id,"ticks":g.tick,"score":g.score,"state_hash":blake3::hash(&serde_json::to_vec(&g)?).to_hex().to_string(),"trace_hash":rec.hash.finalize().to_hex().to_string()}),
            );
        }
    }
    let mut visibility = vec![];
    for a in &req.anchors {
        for b in &req.anchors {
            if a.id == b.id {
                continue;
            }
            for ast in [0., 1.] {
                for bst in [0., 1.] {
                    visibility.push(json!({"from":a.id,"to":b.id,"observerStance":ast,"targetStance":bst,"line":line(&r,map,a.position,ast,b.position,bst)}));
                }
            }
        }
    }
    let baseline = measurements
        .iter()
        .filter(|m| {
            m.reached
                && m.case.trace
                && m.case.prelude.is_empty()
                && !m.case.dash
                && m.case.hero == 3
                && m.case.weapon == 2
                && m.case.pace == "run"
        })
        .collect::<Vec<_>>();
    let visible = |observer: &Frame, target: &Frame, fov: bool| {
        let eye = [
            observer.position[0],
            observer.position[1] + sight::eye_height(observer.stance),
            observer.position[2],
        ];
        r.hit_regions
            .visibility_samples(target.position, target.stance, [target.yaw, 0.])
            .iter()
            .any(|p| {
                let delta = std::array::from_fn::<_, 3, _>(|i| p[i] - eye[i]);
                let forward = -delta[0] * observer.yaw.sin() - delta[2] * observer.yaw.cos();
                let right = delta[0] * observer.yaw.cos() - delta[2] * observer.yaw.sin();
                let tangent = (40_f64.to_radians()).tan();
                (!fov
                    || forward >= 0.5
                        && forward <= 9000.
                        && right.abs() <= forward * tangent * 16. / 9.
                        && delta[1].abs() <= forward * tangent)
                    && !map
                        .obstacles
                        .iter()
                        .any(|o| sight::intersects_box(eye, *p, o))
            })
    };
    let mut contacts = vec![];
    for a in baseline.iter().filter(|m| m.case.slot < 5) {
        for b in baseline.iter().filter(|m| m.case.slot >= 5) {
            let (mut ab, mut ba, mut af, mut bf) = (None, None, None, None);
            let mut first_geometry = None;
            let mut first_camera = None;
            for tick in 0..a.trace.len().max(b.trace.len()) {
                let x = &a.trace[tick.min(a.trace.len() - 1)];
                let y = &b.trace[tick.min(b.trace.len() - 1)];
                if ab.is_none() && visible(x, y, false) {
                    ab = Some(tick);
                }
                if ba.is_none() && visible(y, x, false) {
                    ba = Some(tick);
                }
                if af.is_none() && visible(x, y, true) {
                    af = Some(tick);
                }
                if bf.is_none() && visible(y, x, true) {
                    bf = Some(tick);
                }
                if first_geometry.is_none() && (ab.is_some() || ba.is_some()) {
                    first_geometry = Some(
                        json!({"tick":tick,"attacker":x,"defender":y,"distance":distance(x.position,y.position)}),
                    );
                }
                if first_camera.is_none() && (af.is_some() || bf.is_some()) {
                    first_camera = Some(
                        json!({"tick":tick,"attacker":x,"defender":y,"distance":distance(x.position,y.position)}),
                    );
                }
                if ab.is_some() && ba.is_some() && af.is_some() && bf.is_some() {
                    break;
                }
            }
            contacts.push(json!({"attackerRoute":a.case.id,"defenderRoute":b.case.id,"attackerOpticalTick":ab,"defenderOpticalTick":ba,"attackerCameraTick":af,"defenderCameraTick":bf,"firstGeometry":first_geometry,"firstCamera":first_camera,"reference":"native 14-point cover LOS; reference camera vertical FOV80, aspect16:9, no reaction/latency; earlier arrival holds final measured pose"}));
        }
    }
    println!(
        "{}",
        json!({"version":r.version,"map":map.id,"hz":HZ,"planner":{"grid":50,"extraClearance":8,"segmentStep":4,"waypointTolerance":5,"optimal":false},"anchors":req.anchors,"cases":measurements,"visibility":visibility,"recordedCase":proof,"contacts":contacts,"limitations":["Offline native movement in a deathmatch supply fixture; not a human demolition match or economic purchase sequence.","All other actors are idle. No network latency, aim reaction, body blocking or human tactical choice is measured.","Conservative sampled-grid routes and this follower are reproducibility references, not proven fastest routes."]})
    );
    Ok(())
}
