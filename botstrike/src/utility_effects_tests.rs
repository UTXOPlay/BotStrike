use crate::{Config, Game, Input, Rules, Utility, HZ};
fn fixture() -> (Rules, Game) {
    let mut r = Rules::load();
    r.maps[0].obstacles.clear();
    let mut g = Game::new(
        Config {
            map: 0,
            mode: "deathmatch".into(),
            ruleset: Default::default(),
            heroes: [0, 1, 2, 3, 4, 5, 0, 1, 2, 3],
            bots: [false; 10],
            difficulty: 1,
            seed: 2050,
            practice: None,
        },
        &r,
    )
    .unwrap();
    g.phase = "live".into();
    g.phase_ticks = HZ * 100;
    for p in &mut g.players {
        p.alive = false;
        p.respawn = HZ * 100;
        p.protection = 0;
        p.position = [0.; 3];
    }
    g.players[0].alive = true;
    g.players[5].alive = true;
    (r, g)
}
fn detonate(kind: u8, position: [f64; 3]) -> Utility {
    Utility {
        kind,
        owner: 0,
        position,
        velocity: [0., 500. / HZ as f64, 0.],
        fuse: 1,
        life: 0,
    }
}
#[test]
fn flash_affects_both_teams_and_protection_but_never_shortens_an_existing_flash() {
    let (r, mut g) = fixture();
    g.players[5].yaw = std::f64::consts::PI;
    g.players[0].protection = HZ;
    g.players[0].flash = 180;
    g.utilities.push(detonate(1, [0., 56., -100.]));
    g.utilities(&r);
    assert_eq!(g.players[0].flash, 180);
    assert_eq!(g.players[5].flash, r.utility_effects.flash_ticks(100., -1.));
    assert_eq!(g.events.last().unwrap().origin, Some([0., 56., -100.]));
    for _ in 0..180 {
        g.step([Input::default(); 10], &r).unwrap();
    }
    assert_eq!(g.players[0].flash, 0);
    assert_eq!(g.players[5].flash, 0);
}
#[test]
fn solid_cover_blocks_flash_but_smoke_is_not_a_flash_shield() {
    let (mut r, mut g) = fixture();
    r.maps[0].obstacles.push(crate::Obstacle {
        min: [-100., 0., -60.],
        max: [100., 100., -40.],
        kind: "cover".into(),
    });
    g.utilities.push(detonate(1, [0., 56., -100.]));
    g.utilities(&r);
    assert_eq!(g.players[0].flash, 0);
    r.maps[0].obstacles.clear();
    g.utilities.push(Utility {
        kind: 2,
        owner: 0,
        position: [0., 56., -50.],
        velocity: [0.; 3],
        fuse: 0,
        life: 100,
    });
    g.utilities.push(detonate(1, [0., 56., -100.]));
    g.utilities(&r);
    assert!(g.players[0].flash > 0);
}
#[test]
fn emp_is_enemy_only_protection_aware_and_cannot_shorten_disable() {
    let (r, mut g) = fixture();
    g.players[0].effect = 500;
    g.players[5].effect = 500;
    g.players[5].overclock = 500;
    g.players[5].disabled = 400;
    g.utilities.push(detonate(4, [0., 8., 0.]));
    g.utilities(&r);
    assert_eq!(g.players[0].effect, 500);
    assert_eq!(g.players[5].effect, 0);
    assert_eq!(g.players[5].overclock, 0);
    assert_eq!(g.players[5].disabled, 400);
    g.players[5].protection = 1;
    g.players[5].disabled = 0;
    g.players[5].effect = 100;
    g.utilities.push(detonate(4, [0., 8., 0.]));
    g.utilities(&r);
    assert_eq!(g.players[5].disabled, 0);
    assert_eq!(g.players[5].effect, 100);
    g.players[5].protection = 0;
    g.players[5].position = [r.utility_effects.emp_radius, 8., 0.];
    g.utilities.push(detonate(4, [0., 8., 0.]));
    g.utilities(&r);
    assert_eq!(g.players[5].disabled, 0);
    g.players[5].position = [0.; 3];
    g.utilities.push(detonate(4, [0., 8., 0.]));
    g.utilities(&r);
    assert_eq!(g.players[5].disabled, r.utility_effects.emp_ticks);
    for _ in 0..r.utility_effects.emp_ticks {
        g.step([Input::default(); 10], &r).unwrap();
    }
    assert_eq!(g.players[5].disabled, 0);
}
#[test]
fn fields_are_spherical_team_specific_ignore_cover_and_expire_before_applying_at_zero() {
    let (mut r, mut g) = fixture();
    g.tick = HZ;
    r.maps[0].obstacles.push(crate::Obstacle {
        min: [-10., -1000., -1000.],
        max: [10., 1000., 1000.],
        kind: "cover".into(),
    });
    g.players[0].position = [100., 0., 0.];
    g.players[0].health = 40;
    g.players[0].disabled = 500;
    g.players[5].position = [-100., 0., 0.];
    g.players[5].health = 40;
    g.players[5].revealed = 300;
    for kind in [5, 10] {
        g.utilities.push(Utility {
            kind,
            owner: 0,
            position: [0.; 3],
            velocity: [0.; 3],
            fuse: 0,
            life: 2,
        });
    }
    g.utilities(&r);
    assert_eq!(g.players[0].health, 48);
    assert_eq!(g.players[5].health, 40);
    assert_eq!(g.players[0].revealed, 0);
    assert_eq!(g.players[5].revealed, 300);
    g.players[5].revealed = 0;
    g.utilities(&r);
    assert!(g.utilities.is_empty());
    assert_eq!(g.players[0].health, 48);
    assert_eq!(g.players[5].revealed, 0);
    g.utilities.push(Utility {
        kind: 5,
        owner: 0,
        position: [0.; 3],
        velocity: [0.; 3],
        fuse: 0,
        life: 10,
    });
    g.players[5].position = [0., r.utility_effects.scan_radius, 0.];
    g.utilities(&r);
    assert_eq!(g.players[5].revealed, 0);
    g.players[5].position[1] -= 0.001;
    g.utilities(&r);
    assert_eq!(g.players[5].revealed, r.utility_effects.scan_reveal_ticks);
    g.utilities.clear();
    g.utilities.push(Utility {
        kind: 10,
        owner: 0,
        position: [0.; 3],
        velocity: [0.; 3],
        fuse: 0,
        life: 10,
    });
    g.players[0].position = [0., r.utility_effects.repair_radius, 0.];
    g.utilities(&r);
    assert_eq!(g.players[0].health, 48);
    g.players[0].position[1] -= 0.001;
    g.utilities(&r);
    assert_eq!(g.players[0].health, 56);
}
#[test]
fn blast_events_record_the_world_origin_and_friendly_damage_is_zero() {
    let (r, mut g) = fixture();
    g.players[0].position = [0., 0., 100.];
    g.players[5].position = [0., 0., -100.];
    g.players[5].armor = 0;
    let origin = [0., 8., 0.];
    g.utilities.push(detonate(3, origin));
    let own_hp = g.players[0].health;
    g.utilities(&r);
    assert_eq!(g.players[0].health, own_hp);
    assert!(g.players[5].health < r.heroes[g.players[5].hero].health);
    assert!(g
        .events
        .iter()
        .filter(|e| e.kind == "utility" || e.kind == "hit")
        .all(|e| e.origin == Some(origin)));
    assert!(g.events.iter().any(|e| e.kind == "hit"));
}

#[test]
fn overlapping_repairs_do_not_stack_and_fragment_radius_is_open_in_three_dimensions() {
    let (r, mut g) = fixture();
    g.tick = HZ;
    g.players[0].health = 40;
    for _ in 0..3 {
        g.utilities.push(Utility {
            kind: 10,
            owner: 0,
            position: [0.; 3],
            velocity: [0.; 3],
            fuse: 0,
            life: 10,
        });
    }
    g.utilities(&r);
    assert_eq!(g.players[0].health, 48);
    g.utilities.clear();
    g.players[5].position = [0., r.utility_effects.fragment_radius + 8., 0.];
    g.players[5].armor = 0;
    let hp = g.players[5].health;
    g.utilities.push(detonate(3, [0., 8., 0.]));
    g.utilities(&r);
    assert_eq!(g.players[5].health, hp);
    g.players[5].position[1] -= 0.001;
    g.utilities.push(detonate(3, [0., 8., 0.]));
    g.utilities(&r);
    assert!(g.players[5].health < hp);
}
