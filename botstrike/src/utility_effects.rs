//! Bound effect durations. Cover/team decisions remain in the native game step.
use serde::Deserialize;
pub fn distance(a: [f64; 3], b: [f64; 3]) -> f64 {
    (0..3).map(|i| (a[i] - b[i]).powi(2)).sum::<f64>().sqrt()
}
#[derive(Clone, Deserialize)]
pub struct Profile {
    pub flash_radius: f64,
    pub flash_front_ticks: u32,
    pub flash_back_ticks: u32,
    pub emp_radius: f64,
    pub emp_ticks: u32,
    pub fragment_radius: f64,
    pub scan_radius: f64,
    pub scan_reveal_ticks: u32,
    pub repair_radius: f64,
    pub repair_per_second: i32,
}
impl Profile {
    pub fn flash_ticks(&self, distance: f64, facing_dot: f64) -> u32 {
        if distance >= self.flash_radius {
            return 0;
        }
        let facing = (facing_dot.clamp(-1., 1.) + 1.) * 0.5;
        let facing = facing * facing * (3. - 2. * facing);
        let ticks = self.flash_back_ticks as f64
            + (self.flash_front_ticks - self.flash_back_ticks) as f64 * facing;
        (ticks * (1. - distance.max(0.) / self.flash_radius)).ceil() as u32
    }
}

#[cfg(test)]
mod tests {
    use crate::Rules;
    #[test]
    fn flash_distance_and_facing_are_monotonic_bounded_and_open_at_range() {
        let r = Rules::load();
        let p = &r.utility_effects;
        assert_eq!(p.flash_ticks(0., 1.), 192);
        assert_eq!(p.flash_ticks(0., -1.), 32);
        assert_eq!(p.flash_ticks(p.flash_radius, 1.), 0);
        assert_eq!(p.flash_ticks(p.flash_radius + 1., 1.), 0);
        assert_eq!(p.flash_ticks(0., 0.), 112);
        for angle in -100..=100 {
            let mut previous = p.flash_front_ticks;
            for distance in 0..=650 {
                let value = p.flash_ticks(distance as f64, angle as f64 / 100.);
                assert!(value <= previous && value <= 192);
                previous = value;
            }
        }
        for distance in [0., 1., 200., 649., 650.] {
            let mut previous = 0;
            for angle in -100..=100 {
                let value = p.flash_ticks(distance, angle as f64 / 100.);
                assert!(value >= previous);
                previous = value;
            }
        }
        assert!(
            (p.flash_ticks(100., 0.00001) as i32 - p.flash_ticks(100., -0.00001) as i32).abs() <= 1
        );
    }
}
