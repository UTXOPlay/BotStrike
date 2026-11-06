use serde::Deserialize;

#[derive(Clone, Deserialize)]
pub struct Profile {
    pub stance_seconds: f64,
    pub acceleration: f64,
    pub braking: f64,
    pub counter_strafe: f64,
    pub air_acceleration: f64,
    pub accurate_speed_fraction: f64,
    pub moving_spread: f64,
    pub airborne_spread: f64,
    pub landing_ticks: u32,
    pub landing_spread: f64,
}

pub fn horizontal(current: [f64; 2], wish: [f64; 2], grounded: bool, p: &Profile) -> [f64; 2] {
    // No-input air motion preserves momentum. Ground braking and intentional
    // reversal are distinct, so a counter-strafe can stop a run more quickly.
    if !grounded && wish == [0.; 2] {
        return current;
    }
    let acceleration = if !grounded {
        p.air_acceleration
    } else if wish == [0.; 2] {
        p.braking
    } else if current[0] * wish[0] + current[1] * wish[1] < 0. {
        p.counter_strafe
    } else {
        p.acceleration
    };
    let delta = [wish[0] - current[0], wish[1] - current[1]];
    let length = delta[0].hypot(delta[1]);
    let step = acceleration / crate::HZ as f64;
    if length <= step {
        return wish;
    }
    [
        current[0] + delta[0] / length * step,
        current[1] + delta[1] / length * step,
    ]
}

pub fn accuracy(speed: f64, running_speed: f64, airborne: bool, landing: u32, p: &Profile) -> f64 {
    let accurate = running_speed * p.accurate_speed_fraction;
    let t = ((speed - accurate) / (running_speed - accurate).max(1.)).clamp(0., 1.);
    let moving = 1. + (p.moving_spread - 1.) * t * t * (3. - 2. * t);
    let landing = 1. + p.landing_spread * (landing as f64 / p.landing_ticks.max(1) as f64).min(1.);
    moving * if airborne { p.airborne_spread } else { landing }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn counter_strafing_stops_faster_without_instant_acceleration_or_diagonal_bonus() {
        let rules = crate::Rules::load();
        let p = &rules.movement;
        let first = horizontal([0.; 2], [305., 305.], true, p);
        assert!((first[0].hypot(first[1]) - p.acceleration / 64.).abs() < 1e-10);
        assert!(first[0].hypot(first[1]) < 305.);
        let stop = |wish| {
            let mut v = [305., 0.];
            for n in 1..=100 {
                v = horizontal(v, wish, true, p);
                if v[0] <= 0. {
                    return n;
                }
            }
            panic!("must stop");
        };
        assert!(stop([-305., 0.]) < stop([0.; 2]));
        assert_eq!(horizontal([200., -20.], [0.; 2], false, p), [200., -20.]);
    }
    #[test]
    fn accuracy_is_continuous_in_speed_and_worse_in_air_and_on_landing() {
        let r = crate::Rules::load();
        let p = &r.movement;
        for hero in &r.heroes {
            for w in &r.weapons {
                let top = hero.speed * w.mobility;
                let mut last = 1.;
                for n in 0..=1000 {
                    let speed = top * n as f64 / 1000.;
                    let a = accuracy(speed, top, false, 0, p);
                    assert!(a >= last && a - last < 0.01);
                    last = a;
                    assert!(accuracy(speed, top, true, 0, p) > a);
                    assert!(accuracy(speed, top, false, p.landing_ticks, p) > a);
                }
                assert_eq!(accuracy(0., top, false, 0, p), 1.);
            }
        }
    }
}

pub fn stance(current: f64, crouch: bool, p: &Profile) -> f64 {
    let target = if crouch { 1. } else { 0. };
    let value =
        current + (target - current) * -(-1. / (crate::HZ as f64 * p.stance_seconds)).exp_m1();
    if (value - target).abs() < 1e-6 {
        target
    } else {
        value
    }
}
