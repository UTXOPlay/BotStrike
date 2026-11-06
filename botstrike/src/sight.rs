//! Shared spatial definition for smoke perception. Team/reveal policy is separate.
pub fn eye_height(stance: f64) -> f64 {
    56. - 19. * stance
}
pub fn intersects_box(a: [f64; 3], b: [f64; 3], bounds: &crate::Obstacle) -> bool {
    let (mut lo, mut hi) = (0_f64, 1_f64);
    for axis in 0..3 {
        let d = b[axis] - a[axis];
        if d.abs() < 1e-8 {
            if a[axis] < bounds.min[axis] || a[axis] > bounds.max[axis] {
                return false;
            }
            continue;
        }
        let x = (bounds.min[axis] - a[axis]) / d;
        let y = (bounds.max[axis] - a[axis]) / d;
        lo = lo.max(x.min(y));
        hi = hi.min(x.max(y));
        if lo > hi {
            return false;
        }
    }
    hi > 0.001 && lo < 0.999
}
pub fn smoke_blocks(a: [f64; 3], b: [f64; 3], u: &crate::Utility) -> bool {
    u.kind == 2 && u.fuse == 0 && u.life > 0 && segment_sphere(a, b, u.position, 175.)
}
pub fn segment_sphere(a: [f64; 3], b: [f64; 3], center: [f64; 3], radius: f64) -> bool {
    let d = std::array::from_fn::<_, 3, _>(|i| b[i] - a[i]);
    let length = d.iter().map(|v| v * v).sum::<f64>();
    let t = if length > 0. {
        (d.iter()
            .enumerate()
            .map(|(i, v)| (center[i] - a[i]) * v)
            .sum::<f64>()
            / length)
            .clamp(0., 1.)
    } else {
        0.
    };
    (0..3)
        .map(|i| (a[i] + t * d[i] - center[i]).powi(2))
        .sum::<f64>()
        < radius * radius
}
pub fn probes() -> Result<(), Box<dyn std::error::Error>> {
    use std::io::{self, BufRead, Write};
    #[derive(serde::Deserialize)]
    #[serde(deny_unknown_fields)]
    struct Probe {
        a: [f64; 3],
        b: [f64; 3],
        center: [f64; 3],
        radius: f64,
        stance: f64,
    }
    let mut out = io::BufWriter::new(io::stdout());
    for (index, line) in io::stdin().lock().lines().enumerate() {
        let line = line?;
        if index >= 10000 || line.len() > 4096 {
            return Err("Sight probe limit".into());
        }
        let p: Probe = serde_json::from_str(&line)?;
        if !p
            .a
            .iter()
            .chain(p.b.iter())
            .chain(p.center.iter())
            .all(|v| v.is_finite() && v.abs() <= 100000.)
            || !p.radius.is_finite()
            || p.radius <= 0.
            || p.radius > 10000.
            || !p.stance.is_finite()
            || !(0. ..=1.).contains(&p.stance)
        {
            return Err("Invalid sight probe".into());
        }
        writeln!(
            out,
            "{}",
            serde_json::json!({"blocked":segment_sphere(p.a,p.b,p.center,p.radius),"eye_height":eye_height(p.stance)})
        )?;
    }
    out.flush()?;
    Ok(())
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn smoke_has_height_and_an_exact_open_tangent_boundary() {
        assert!(segment_sphere(
            [-200., 0., 0.],
            [200., 0., 0.],
            [0.; 3],
            175.
        ));
        assert!(!segment_sphere(
            [-200., 176., 0.],
            [200., 176., 0.],
            [0.; 3],
            175.
        ));
        assert!(!segment_sphere(
            [-200., 175., 0.],
            [200., 175., 0.],
            [0.; 3],
            175.
        ));
        assert!(segment_sphere([0.; 3], [0.; 3], [0.; 3], 175.));
        assert!(!segment_sphere(
            [200., 0., 0.],
            [200., 0., 0.],
            [0.; 3],
            175.
        ));
    }
}
