use crate::*;
fn fixture() -> (Rules, Game) {
    let rules = Rules::load();
    let g = Game::new(
        Config {
            map: 0,
            mode: "demolition".into(),
            ruleset: Ruleset::Tactical,
            heroes: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4],
            bots: [false; 10],
            difficulty: 1,
            seed: 2050,
            practice: None,
        },
        &rules,
    )
    .unwrap();
    (rules, g)
}
#[test]
fn loss_recovery_is_capped_resets_on_win_and_is_paid_once_to_all_reserved_seats() {
    let (r, mut g) = fixture();
    for p in &mut g.players {
        p.credits = 0;
    }
    let mut expected = 0;
    for loss in [1900, 2200, 2500, 2800, 3100, 3100] {
        g.phase = "live".into();
        g.end_round(1, "timeout", &r);
        expected += loss;
        assert_eq!(g.players[0].credits, expected.min(r.economy.cap));
        assert_eq!(g.players[4].credits, g.players[0].credits);
        let before = g.players[0].credits;
        g.end_round(1, "timeout", &r);
        assert_eq!(g.players[0].credits, before);
    }
    assert_eq!(g.loss_streak, [5, 0]);
    g.phase = "live".into();
    g.players[0].alive = false;
    g.end_round(0, "elimination", &r);
    assert_eq!(g.loss_streak, [0, 1]);
    assert_eq!(g.players[0].credits, 16000);
    g.phase = "live".into();
    g.players[0].credits = 0;
    g.end_round(1, "timeout", &r);
    assert_eq!(g.players[0].credits, 1900);
}
#[test]
fn lost_attack_plant_award_and_fatal_source_rewards_are_explicit() {
    let (r, mut g) = fixture();
    for p in &mut g.players {
        p.credits = 0;
    }
    g.objective.planted = true;
    g.end_round(1, "defused", &r);
    assert_eq!(g.players[0].credits, 2100);
    assert_eq!(g.players[5].credits, 3250);
    for source in [
        DamageSource::Weapon(1),
        DamageSource::Splash(3),
        DamageSource::Utility(3),
        DamageSource::Other,
    ] {
        g.players[0].credits = 0;
        g.players[5].alive = true;
        g.players[5].health = 1;
        g.players[5].protection = 0;
        let expected = match source {
            DamageSource::Weapon(1) => 600,
            DamageSource::Splash(3) => 100,
            _ => 200,
        };
        // Current held gun deliberately differs from fatal projectile's recorded source.
        g.players[0].weapon = 0;
        g.hurt_with_source(5, 0, 10, false, 1., source, &r);
        assert_eq!(g.players[0].credits, expected);
        g.hurt_with_source(5, 0, 10, false, 1., DamageSource::Weapon(4), &r);
        assert_eq!(g.players[0].credits, expected);
    }
    g.players[1].protection = 0;
    let before = g.players[0].credits;
    g.hurt_with_source(1, 0, 9999, false, 1., DamageSource::Weapon(4), &r);
    assert_eq!(g.players[0].credits, before);
}
#[test]
fn survivor_death_half_supplies_and_rejected_purchases_follow_distinct_rules() {
    let (r, mut g) = fixture();
    assert!(g.players.iter().all(|p| p.credits == 800 && p.armor == 0));
    g.players[0].credits = 16000;
    g.buy(0, 2, &r);
    g.buy(0, WEAPONS, &r);
    g.players[0].armor = 43;
    g.players[0].items[2] = 1;
    g.players[0].ammo[2] = 3;
    g.players[0].reserve[2] = 4;
    let credits = g.players[0].credits;
    g.buy(0, 2, &r);
    assert_eq!(g.players[0].credits, credits);
    g.round = 2;
    g.start_round(&r);
    assert_eq!(g.players[0].armor, 43);
    assert_eq!(g.players[0].ammo[2], 30);
    assert_eq!(g.players[0].reserve[2], 90);
    assert_eq!(g.players[0].items[2], 1);
    for w in 1..WEAPONS {
        if w != 2 {
            assert_eq!((g.players[0].ammo[w], g.players[0].reserve[w]), (0, 0));
        }
    }
    g.players[0].alive = false;
    g.round = 3;
    g.start_round(&r);
    assert_eq!(g.players[0].armor, 0);
    assert!(!g.players[0].owned[2]);
    assert!(g.players[0].owned[0]);
    assert_eq!(g.players[0].items, [0; ITEMS]);
    assert_eq!(g.players[0].credits, credits);
    g.loss_streak = [4, 2];
    g.round = 13;
    g.start_round(&r);
    assert_eq!(g.attacker, 1);
    assert_eq!(g.loss_streak, [0, 0]);
    assert!(g
        .players
        .iter()
        .all(|p| p.credits == 800 && p.armor == 0 && p.owned[0]));
}
