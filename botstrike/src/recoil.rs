//! Authoritative gun recoil. Pattern offsets and dispersion are separate.
//! Units: pattern/caps/recovery/spread in degrees, aim_punch in radians, time in ticks.
use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize)]
pub struct Profile {
    pub pattern: Vec<[f64; 2]>,
    pub cap: [f64; 2],
    pub recovery_delay: u32,
    pub recovery_short: f64,
    pub recovery_long: f64,
    pub long_burst: u32,
    pub spread_per_shot: f64,
    pub spread_cap: f64,
    pub spread_recovery: f64,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize, PartialEq)]
pub struct State {
    pub recoil: f64,
    pub aim_punch: [f64; 2],
    pub recoil_index: u32,
    pub recoil_idle: u32,
}
impl State {
    pub fn recover(&mut self, p: &Profile) {
        self.recoil_idle = self.recoil_idle.saturating_add(1);
        if self.recoil_idle <= p.recovery_delay {
            return;
        }
        let speed = if self.recoil_index >= p.long_burst {
            p.recovery_long
        } else {
            p.recovery_short
        };
        let length = self.aim_punch[0].hypot(self.aim_punch[1]);
        let step = speed.to_radians() / crate::HZ as f64;
        let scale = if length > step {
            (length - step) / length
        } else {
            0.
        };
        for a in &mut self.aim_punch {
            *a *= scale;
        }
        self.recoil = (self.recoil - p.spread_recovery / crate::HZ as f64).max(0.);
        if self.aim_punch == [0.; 2] && self.recoil == 0. {
            self.recoil_index = 0;
        }
    }
    /// Applied after a round leaves the barrel: the first shot starts at base aim.
    /// A long spray repeats the final authored delta, within the explicit caps.
    pub fn shot(&mut self, p: &Profile) {
        let delta = p.pattern[(self.recoil_index as usize).min(p.pattern.len() - 1)];
        for a in 0..2 {
            let cap = p.cap[a].to_radians();
            self.aim_punch[a] = (self.aim_punch[a] + delta[a].to_radians()).clamp(-cap, cap);
        }
        self.recoil = (self.recoil + p.spread_per_shot).min(p.spread_cap);
        self.recoil_index = self.recoil_index.saturating_add(1);
        self.recoil_idle = 0;
    }
}

/// The same central ray is drawn by the camera and used before seeded dispersion.
pub fn aim(yaw: f64, pitch: f64, punch: [f64; 2]) -> [f64; 2] {
    [yaw + punch[0], (pitch + punch[1]).clamp(-1.5, 1.5)]
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn all_profiles_are_finite_bounded_and_recover_to_a_fresh_first_shot() {
        for w in crate::Rules::load().weapons {
            let p = &w.recoil;
            assert!(!p.pattern.is_empty());
            assert!(p.pattern.iter().flatten().all(|v| v.is_finite()));
            assert!(p.cap.iter().all(|&v| v > 0. && v < 30.));
            assert!(p.recovery_short > 0. && p.recovery_long > 0.);
            let mut s = State::default();
            for _ in 0..2000 {
                s.shot(p);
                assert!(s
                    .aim_punch
                    .iter()
                    .enumerate()
                    .all(|(a, v)| v.abs() <= p.cap[a].to_radians()));
                assert!(s.recoil <= p.spread_cap);
            }
            for _ in 0..crate::HZ * 15 {
                s.recover(p);
            }
            assert_eq!(s.aim_punch, [0.; 2]);
            assert_eq!(s.recoil, 0.);
            assert_eq!(s.recoil_index, 0);
            s.shot(p);
            let mut fresh = State::default();
            fresh.shot(p);
            assert_eq!(s, fresh);
        }
    }
    #[test]
    fn deliberate_compensation_removes_pattern_but_not_seeded_dispersion() {
        for w in crate::Rules::load().weapons {
            let mut s = State::default();
            let mut uncompensated = 0.;
            let mut compensated = 0.;
            let mut random = 2050;
            for _ in 0..w.magazine {
                let noise = (crate::rand(&mut random) - 0.5) * (w.spread + s.recoil).to_radians();
                let no = aim(0., 0., s.aim_punch);
                let yes = aim(-s.aim_punch[0], -s.aim_punch[1], s.aim_punch);
                uncompensated += no[0].powi(2) + (no[1] + noise).powi(2);
                compensated += yes[0].powi(2) + (yes[1] + noise).powi(2);
                s.shot(&w.recoil);
            }
            assert!(
                compensated < uncompensated,
                "compensation must improve each weapon"
            );
            assert!(compensated > 0., "random dispersion must remain");
        }
    }
}
