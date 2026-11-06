//! Stable native regions independent of decorative bones and animation rate.
//! A calibrated oriented head box and vertical body capsule; nearest surface wins.
use serde::{Deserialize, Serialize};
#[derive(Clone, Deserialize)]
pub struct Stance {
    pub head_y: f64,
    pub head_z: f64,
    pub head_half_extents: [f64; 3],
    pub body_lower: f64,
    pub body_upper: f64,
    pub body_radius: f64,
}
#[derive(Clone, Deserialize)]
pub struct Profile {
    pub standing: Stance,
    pub crouched: Stance,
    pub pitch_chest: f64,
    pub pitch_head: f64,
    pub neck_length: f64,
    pub head_center_up: f64,
    pub head_center_z: f64,
}
#[derive(Debug, Serialize)]
pub struct Volumes {
    pub head: [f64; 3],
    pub head_half_extents: [f64; 3],
    pub head_yaw: f64,
    pub head_pitch: f64,
    pub lower: [f64; 3],
    pub upper: [f64; 3],
    pub body_radius: f64,
}
#[derive(Clone, Copy, Debug, PartialEq, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum Region {
    Head,
    Body,
}
#[derive(Debug, Serialize)]
pub struct Hit {
    pub distance: f64,
    pub region: Region,
}
impl Profile {
    pub fn volumes(&self, position: [f64; 3], stance: f64, look: [f64; 2]) -> Volumes {
        let t = stance.clamp(0., 1.);
        let lerp = |a: f64, b: f64| a + (b - a) * t;
        let point = |height| [position[0], position[1] + height, position[2]];
        let chest = look[1] * self.pitch_chest;
        let pitch = look[1] * self.pitch_head;
        let dy = self.neck_length * (chest.cos() - 1.) + self.head_center_up * (pitch.cos() - 1.)
            - self.head_center_z * pitch.sin();
        let dz = self.neck_length * chest.sin()
            + self.head_center_up * pitch.sin()
            + self.head_center_z * (pitch.cos() - 1.);
        let z = lerp(self.standing.head_z, self.crouched.head_z) + dz;
        Volumes {
            head: [
                position[0] + look[0].sin() * z,
                position[1] + lerp(self.standing.head_y, self.crouched.head_y) + dy,
                position[2] + look[0].cos() * z,
            ],
            head_half_extents: std::array::from_fn(|i| {
                lerp(
                    self.standing.head_half_extents[i],
                    self.crouched.head_half_extents[i],
                )
            }),
            head_yaw: look[0],
            head_pitch: pitch,
            lower: point(lerp(self.standing.body_lower, self.crouched.body_lower)),
            upper: point(lerp(self.standing.body_upper, self.crouched.body_upper)),
            body_radius: lerp(self.standing.body_radius, self.crouched.body_radius),
        }
    }
    pub fn intersect(
        &self,
        origin: [f64; 3],
        direction: [f64; 3],
        position: [f64; 3],
        stance: f64,
        look: [f64; 2],
    ) -> Option<Hit> {
        if !origin
            .iter()
            .chain(direction.iter())
            .chain(position.iter())
            .chain(look.iter())
            .all(|v| v.is_finite())
            || !stance.is_finite()
            || direction.iter().map(|v| v * v).sum::<f64>() < 1e-20
        {
            return None;
        }
        let v = self.volumes(position, stance, look);
        let inverse = |q: [f64; 3]| {
            let x = v.head_yaw.cos() * q[0] - v.head_yaw.sin() * q[2];
            let z = v.head_yaw.sin() * q[0] + v.head_yaw.cos() * q[2];
            [
                x,
                v.head_pitch.cos() * q[1] + v.head_pitch.sin() * z,
                -v.head_pitch.sin() * q[1] + v.head_pitch.cos() * z,
            ]
        };
        let head = crate::ray_box(
            inverse(std::array::from_fn(|i| origin[i] - v.head[i])),
            inverse(direction),
            v.head_half_extents.map(|x| -x),
            v.head_half_extents,
        );
        let body = capsule(origin, direction, v.lower, v.upper, v.body_radius);
        // Equal distances, including an origin inside both regions, resolve to body.
        match (head, body) {
            (Some(h), Some(b)) if h < b => Some(Hit {
                distance: h,
                region: Region::Head,
            }),
            (_, Some(b)) => Some(Hit {
                distance: b,
                region: Region::Body,
            }),
            (Some(h), None) => Some(Hit {
                distance: h,
                region: Region::Head,
            }),
            _ => None,
        }
    }
}
fn sphere(o: [f64; 3], d: [f64; 3], c: [f64; 3], r: f64) -> Option<f64> {
    let q = [o[0] - c[0], o[1] - c[1], o[2] - c[2]];
    let a = d.iter().map(|v| v * v).sum::<f64>();
    if a < 1e-20 {
        return None;
    }
    let c = q.iter().map(|v| v * v).sum::<f64>() - r * r;
    if c <= 0. {
        return Some(0.);
    }
    let b = q.iter().zip(d).map(|(v, d)| v * d).sum::<f64>();
    let determinant = b * b - a * c;
    if determinant < 0. {
        return None;
    }
    let t = (-b - determinant.sqrt()) / a;
    (t >= 0.).then_some(t)
}
fn capsule(o: [f64; 3], d: [f64; 3], lo: [f64; 3], hi: [f64; 3], r: f64) -> Option<f64> {
    let axis = o[1].clamp(lo[1], hi[1]);
    let q = [o[0] - lo[0], o[1] - axis, o[2] - lo[2]];
    if d.iter().map(|v| v * v).sum::<f64>() < 1e-20 {
        return None;
    }
    if q.iter().map(|v| v * v).sum::<f64>() <= r * r {
        return Some(0.);
    }
    let mut nearest = [sphere(o, d, lo, r), sphere(o, d, hi, r)]
        .into_iter()
        .flatten()
        .reduce(f64::min);
    let a = d[0] * d[0] + d[2] * d[2];
    if a > 1e-20 {
        let x = o[0] - lo[0];
        let z = o[2] - lo[2];
        let b = x * d[0] + z * d[2];
        let c = x * x + z * z - r * r;
        let determinant = b * b - a * c;
        if determinant >= 0. {
            for t in [(-b - determinant.sqrt()) / a, (-b + determinant.sqrt()) / a] {
                let y = o[1] + t * d[1];
                if t >= 0. && y >= lo[1] && y <= hi[1] {
                    nearest = Some(nearest.map_or(t, |old| old.min(t)));
                }
            }
        }
    }
    nearest
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn region_boundaries_grazes_vertical_and_inside_rays_are_unambiguous() {
        let r = crate::Rules::load();
        let p = &r.hit_regions;
        for stance in [0., 0.25, 0.5, 0.75, 1.] {
            let v = p.volumes([0.; 3], stance, [0.; 2]);
            let origin = [0., v.head[1], 100.];
            let h = p
                .intersect(origin, [0., 0., -1.], [0.; 3], stance, [0.; 2])
                .unwrap();
            assert_eq!(h.region, Region::Head);
            assert!((h.distance - (100. - v.head[2] - v.head_half_extents[2])).abs() < 1e-10);
            let b = p
                .intersect(
                    [0., v.lower[1], 100.],
                    [0., 0., -1.],
                    [0.; 3],
                    stance,
                    [0.; 2],
                )
                .unwrap();
            assert_eq!(b.region, Region::Body);
            assert!((b.distance - (100. - v.body_radius)).abs() < 1e-10);
            assert_eq!(
                p.intersect(
                    [v.head_half_extents[0], v.head[1], 100.],
                    [0., 0., -1.],
                    [0.; 3],
                    stance,
                    [0.; 2]
                )
                .unwrap()
                .region,
                Region::Head
            );
            assert!(p
                .intersect(
                    [v.body_radius + 0.01, 20., 100.],
                    [0., 0., -1.],
                    [0.; 3],
                    stance,
                    [0.; 2]
                )
                .is_none());
            assert_eq!(
                p.intersect(v.head, [0., 1., 0.], [0.; 3], stance, [0.; 2])
                    .unwrap()
                    .distance,
                0.
            );
            assert_eq!(
                p.intersect([0., v.lower[1], 0.], [0., 1., 0.], [0.; 3], stance, [0.; 2])
                    .unwrap()
                    .region,
                Region::Body
            );
            assert!(p
                .intersect([0., 100., 0.], [0., 1., 0.], [0.; 3], stance, [0.; 2])
                .is_none());
            assert!(p
                .intersect([0.; 3], [0.; 3], [0.; 3], stance, [0.; 2])
                .is_none());
        }
    }
    #[test]
    fn head_box_inverse_matches_rotated_fixture_rays_at_extreme_look_angles() {
        let r = crate::Rules::load();
        let p = &r.hit_regions;
        for yaw in [-3.14, -1.7, 0., 1.7, 3.14] {
            for pitch in [-1.5, -0.8, 0., 0.8, 1.5] {
                for stance in [0., 0.3, 1.] {
                    let v = p.volumes([100., 20., -300.], stance, [yaw, pitch]);
                    let phi = v.head_pitch;
                    let local = [0., phi.cos(), phi.sin()];
                    let back = [
                        yaw.cos() * local[0] + yaw.sin() * local[2],
                        local[1],
                        -yaw.sin() * local[0] + yaw.cos() * local[2],
                    ];
                    let origin = std::array::from_fn(|i| v.head[i] + back[i] * 100.);
                    let d = back.map(|x| -x);
                    let hit = p
                        .intersect(origin, d, [100., 20., -300.], stance, [yaw, pitch])
                        .unwrap();
                    assert_eq!(hit.region, Region::Head);
                    assert!((hit.distance - (100. - v.head_half_extents[1])).abs() < 1e-8);
                }
            }
        }
    }
}
