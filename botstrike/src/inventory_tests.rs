use crate::*;
fn fixture() -> (Rules, Game) {
    let mut rules = Rules::load();
    rules.maps[0].obstacles.clear();
    let mut game = Game::new(
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
    // Deterministic isolated transaction fixture; all actors remain alive so a
    // native round cannot end incidentally during the inventory assertions.
    game.objective.carrier = Some(4);
    for p in &mut game.players {
        p.credits = 16000;
        p.position = [1000. + p.slot as f64 * 100., 0., 1000.];
    }
    (rules, game)
}
fn controls(g: &Game) -> [Input; 10] {
    std::array::from_fn(|slot| Input {
        takeover: true,
        action_life: Some(g.players[slot].life as u8),
        ..Default::default()
    })
}
fn invariant(g: &Game, r: &Rules) {
    assert!(g.drops.len() <= inventory::DROP_CAPACITY);
    for p in &g.players {
        assert!(p.owned[1..].iter().filter(|&&owned| owned).count() <= 1);
        assert!(p.owned[p.weapon] || !p.owned.iter().any(|&owned| owned));
        for w in 0..WEAPONS {
            assert!(p.ammo[w] <= r.weapons[w].magazine);
            assert!(p.reserve[w] <= r.weapons[w].reserve);
            if !p.owned[w] {
                assert_eq!((p.ammo[w], p.reserve[w]), (0, 0));
            }
        }
    }
}
fn ammunition(g: &Game) -> u64 {
    g.players
        .iter()
        .flat_map(|p| p.ammo.iter().chain(p.reserve.iter()))
        .map(|&v| v as u64)
        .sum::<u64>()
        + g.drops
            .iter()
            .map(|d| (d.ammo + d.reserve) as u64)
            .sum::<u64>()
}
fn drop_for(g: &Game, slot: usize, weapon: usize) -> DroppedWeapon {
    DroppedWeapon {
        id: 90000 + weapon as u32,
        weapon,
        team: 0,
        position: g.players[slot].position,
        ammo: 3,
        reserve: 7,
        expires: g.tick + HZ * 30,
    }
}
#[test]
fn tactical_configuration_is_explicit_private_human_demolition_shape() {
    let (_, g) = fixture();
    assert!(g.config.validate().is_ok());
    let mut c = g.config.clone();
    c.mode = "deathmatch".into();
    assert!(c.validate().is_err());
    c = g.config.clone();
    c.bots[9] = true;
    assert!(c.validate().is_err());
    c = g.config.clone();
    c.heroes[4] = c.heroes[0];
    assert!(c.validate().is_err());
    c = g.config.clone();
    c.ruleset = Ruleset::Casual;
    let mut old = serde_json::to_value(&c).unwrap();
    assert!(old.get("ruleset").is_none());
    assert_eq!(
        serde_json::from_value::<Config>(old.clone())
            .unwrap()
            .ruleset,
        Ruleset::Casual
    );
    old["ruleset"] = serde_json::json!("ranked");
    assert!(serde_json::from_value::<Config>(old).is_err());
}
#[test]
fn tactical_buy_replaces_only_primary_and_cannot_mint_free_arc() {
    let (r, mut g) = fixture();
    g.buy(0, 2, &r);
    g.players[0].ammo[2] = 7;
    g.players[0].reserve[2] = 42;
    let credits = g.players[0].credits;
    g.buy(0, 3, &r);
    assert_eq!(g.players[0].credits, credits - r.weapons[3].cost);
    assert!(g.players[0].owned[0] && g.players[0].owned[3]);
    assert!(!g.players[0].owned[2]);
    assert_eq!(
        (g.drops[0].weapon, g.drops[0].ammo, g.drops[0].reserve),
        (2, 7, 42)
    );
    let before = serde_json::to_value(&g).unwrap();
    g.buy(0, 3, &r);
    assert_eq!(serde_json::to_value(&g).unwrap(), before);
    inventory::select(&mut g.players[0], 0);
    g.drop_tactical_weapon(0);
    let before = ammunition(&g);
    g.buy(0, 0, &r);
    assert!(!g.players[0].owned[0]);
    assert_eq!(ammunition(&g), before);
    g.spawn(0, &r, false);
    assert!(!g.players[0].owned[0]);
    invariant(&g, &r);
}
#[test]
fn tactical_drop_edges_life_authority_and_unarmed_controls_are_native() {
    let (r, mut g) = fixture();
    let original = g.players[0].life;
    for bad in [None, Some(0), Some(32)] {
        assert!(
            !Input {
                action_life: bad,
                ..Default::default()
            }
            .validate()
                || bad.is_none()
        );
    }
    let mut i = controls(&g);
    i[0].drop = true;
    i[0].action_life = None;
    g.step(i, &r).unwrap();
    assert!(g.drops.is_empty());
    i = controls(&g);
    i[0].drop = true;
    i[0].takeover = false;
    g.step(i, &r).unwrap();
    assert!(g.drops.is_empty());
    i = controls(&g);
    i[0].drop = true;
    i[0].interact = true;
    g.step(i, &r).unwrap();
    assert!(g.drops.is_empty());
    g.step(controls(&g), &r).unwrap();
    i = controls(&g);
    i[0].drop = true;
    g.step(i, &r).unwrap();
    assert_eq!(g.drops.len(), 1);
    assert!(!g.players[0].owned.iter().any(|&v| v));
    let total = ammunition(&g);
    g.step(i, &r).unwrap();
    assert_eq!(g.drops.len(), 1);
    assert_eq!(ammunition(&g), total);
    g.phase = "live".into();
    i[0].fire = true;
    i[0].reload = true;
    i[0].scope = true;
    g.step(i, &r).unwrap();
    assert_eq!(g.players[0].shots, 0);
    assert_eq!(g.players[0].reload, 0);
    assert!(!g.players[0].scoped);
    g.spawn(0, &r, true);
    assert_eq!(g.players[0].life, original + 1);
    i[0].action_life = Some(original as u8);
    i[0].buy = Some(2);
    i[0].hero = Some(5);
    g.phase = "buy".into();
    g.step(i, &r).unwrap();
    assert!(g.players[0].owned[0]);
    assert!(!g.players[0].owned[2]);
    assert_eq!(g.players[0].hero, 0);
    invariant(&g, &r);
}
#[test]
fn full_pool_rejects_buy_and_drop_but_pickup_replacement_is_atomic() {
    let (r, mut g) = fixture();
    g.buy(0, 2, &r);
    for k in 0..inventory::DROP_CAPACITY {
        let mut d = drop_for(&g, 0, 3);
        d.id = k as u32;
        g.drops.push(d);
    }
    let before = serde_json::to_value(&g).unwrap();
    g.buy(0, 4, &r);
    g.drop_tactical_weapon(0);
    assert_eq!(serde_json::to_value(&g).unwrap(), before);
    let total = ammunition(&g);
    g.recover_tactical_weapon(0, 0, &r);
    assert_eq!(g.drops.len(), inventory::DROP_CAPACITY);
    assert!(g.players[0].owned[3]);
    assert!(!g.players[0].owned[2]);
    assert_eq!(ammunition(&g), total);
    invariant(&g, &r);
}
#[test]
fn same_gun_recovery_preserves_every_untransferred_round() {
    let (r, mut g) = fixture();
    g.buy(0, 2, &r);
    g.players[0].reserve[2] = r.weapons[2].reserve - 2;
    g.drops.push(drop_for(&g, 0, 2));
    let total = ammunition(&g);
    g.recover_tactical_weapon(0, 0, &r);
    assert_eq!(ammunition(&g), total);
    assert_eq!((g.drops[0].ammo, g.drops[0].reserve), (3, 5));
    g.players[0].reserve[2] -= 8;
    g.recover_tactical_weapon(0, 0, &r);
    assert!(g.drops.is_empty());
    invariant(&g, &r);
}
#[test]
fn actual_pickup_obeys_objective_cover_reach_height_and_slot_order() {
    let (mut r, mut g) = fixture();
    g.phase = "live".into();
    g.players[1].position = g.players[0].position;
    let d = drop_for(&g, 0, 2);
    g.drops.push(d);
    let mut pressed = [false; 10];
    pressed[0] = true;
    pressed[1] = true;
    g.objective.carrier = None;
    g.objective.position = g.players[0].position;
    g.pickup_drops(&pressed, &r);
    assert_eq!(g.drops.len(), 1, "ground relay takes priority");
    g.objective.carrier = Some(4);
    let pos = g.players[0].position;
    r.maps[0].obstacles.push(Obstacle {
        min: [pos[0] - 20., 20., pos[2] - 20.],
        max: [pos[0] + 20., 35., pos[2] + 20.],
        kind: "cover".into(),
    });
    g.pickup_drops(&pressed, &r);
    assert_eq!(g.drops.len(), 1, "blocked vertical reach");
    r.maps[0].obstacles.clear();
    for p in &mut g.players[..2] {
        p.position[1] = 41.;
    }
    g.pickup_drops(&pressed, &r);
    assert_eq!(g.drops.len(), 1);
    for p in &mut g.players[..2] {
        p.position[1] = 0.;
        p.position[0] += 60.;
    }
    g.pickup_drops(&pressed, &r);
    assert_eq!(g.drops.len(), 1);
    for p in &mut g.players[..2] {
        p.position[0] -= 60.;
    }
    let total = ammunition(&g);
    g.pickup_drops(&pressed, &r);
    assert!(g.players[0].owned[2]);
    assert!(!g.players[1].owned[2]);
    assert_eq!(ammunition(&g), total);
    invariant(&g, &r);
}
#[test]
fn death_releases_both_slots_exactly_once_with_bounded_unique_world_objects() {
    let (r, mut g) = fixture();
    g.buy(0, 2, &r);
    g.players[0].ammo[2] = 0;
    g.players[0].reserve[2] = 0;
    let total = ammunition(&g);
    g.hurt_with_source(0, 5, 9999, false, 1., DamageSource::Other, &r);
    assert_eq!(g.drops.len(), 2);
    assert_ne!(g.drops[0].id, g.drops[1].id);
    assert_eq!(ammunition(&g), total);
    assert!(!g.players[0].owned.iter().any(|&v| v));
    g.hurt_with_source(0, 5, 9999, false, 1., DamageSource::Other, &r);
    assert_eq!(g.drops.len(), 2);
    invariant(&g, &r);
    for slot in 1..10 {
        g.buy(slot, slot % 11 + 1, &r);
        g.release_tactical_inventory(slot);
    }
    assert!(g.drops.len() <= inventory::DROP_CAPACITY);
    let ids: std::collections::HashSet<_> = g.drops.iter().map(|d| d.id).collect();
    assert_eq!(ids.len(), g.drops.len());
    g.tick += HZ * 30;
    g.step(controls(&g), &r).unwrap();
    assert!(g.drops.is_empty());
}
#[test]
fn repeated_gift_recover_cycles_conserve_ammunition_and_native_replay_state() {
    let (r, mut g) = fixture();
    g.buy(0, 2, &r);
    g.buy(1, 3, &r);
    let total = ammunition(&g);
    let mut other = g.clone();
    for n in 0..500 {
        for game in [&mut g, &mut other] {
            let slot = n % 2;
            game.tick += 1;
            game.drop_tactical_weapon(slot);
            if !game.drops.is_empty() {
                game.recover_tactical_weapon(1 - slot, 0, &r);
            }
            invariant(game, &r);
            assert_eq!(ammunition(game), total);
        }
        assert_eq!(
            serde_json::to_value(&g).unwrap(),
            serde_json::to_value(&other).unwrap()
        );
    }
}

#[test]
fn casual_hero_switches_cannot_restore_health_armor_cooldown_or_inventory() {
    let (r, g) = fixture();
    for old in 0..6 {
        for new in 0..6 {
            let mut c = g.config.clone();
            c.ruleset = Ruleset::Casual;
            c.heroes[0] = old;
            let mut game = Game::new(c, &r).unwrap();
            game.players[0].health = 31;
            game.players[0].armor = 7;
            game.players[0].skill_wait = 91;
            let owned = game.players[0].owned;
            let items = game.players[0].items;
            let mut i = [Input::default(); 10];
            i[0].hero = Some(new);
            game.step(i, &r).unwrap();
            assert_eq!(game.players[0].hero, new);
            assert_eq!(game.players[0].health, 31);
            assert_eq!(game.players[0].armor, 7);
            assert_eq!(game.players[0].skill_wait, 91);
            assert_eq!(game.players[0].owned, owned);
            assert_eq!(game.players[0].items, items);
        }
    }
}
