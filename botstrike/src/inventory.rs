//! Tactical inventory transactions. Casual salvage retains its original behavior.
use crate::{DroppedWeapon, Game, Player, Rules, HZ, WEAPONS};
pub(super) const DROP_CAPACITY: usize = 32;
pub(super) fn select(p: &mut Player, weapon: usize) {
    p.weapon = weapon;
    p.reload = 0;
    p.burst_remaining = 0;
    p.fire_wait = 10;
    p.scoped = false;
    p.weapon_recoil = Default::default();
}
fn remove(p: &mut Player, weapon: usize) {
    p.owned[weapon] = false;
    p.ammo[weapon] = 0;
    p.reserve[weapon] = 0;
    let next = p.owned.iter().position(|&owned| owned).unwrap_or(0);
    select(p, next);
}
impl Game {
    fn inventory_drop(&self, slot: usize, weapon: usize) -> DroppedWeapon {
        let p = &self.players[slot];
        DroppedWeapon {
            // Two slots can die on the same tick; both carried guns need distinct IDs.
            id: self.tick * 128 + slot as u32 * WEAPONS as u32 + weapon as u32,
            weapon,
            team: p.team,
            position: [p.position[0], 0., p.position[2]],
            ammo: p.ammo[weapon],
            reserve: p.reserve[weapon],
            expires: self.tick + HZ * 30,
        }
    }
    fn replacement(&self, slot: usize, weapon: usize) -> Option<usize> {
        self.players[slot]
            .owned
            .iter()
            .enumerate()
            .find(|&(index, owned)| *owned && index != weapon && (index == 0) == (weapon == 0))
            .map(|(index, _)| index)
    }
    pub(super) fn buy_tactical_weapon(&mut self, slot: usize, weapon: usize, rules: &Rules) {
        let p = &self.players[slot];
        if weapon == 0 || p.owned[weapon] || p.credits < rules.weapons[weapon].cost {
            return;
        }
        let old = self.replacement(slot, weapon);
        if old.is_some() && self.drops.len() >= DROP_CAPACITY {
            return;
        }
        if let Some(old) = old {
            let drop = self.inventory_drop(slot, old);
            self.drops.push(drop);
            remove(&mut self.players[slot], old);
        }
        let p = &mut self.players[slot];
        p.owned[weapon] = true;
        p.ammo[weapon] = rules.weapons[weapon].magazine;
        p.reserve[weapon] = rules.weapons[weapon].reserve;
        p.credits -= rules.weapons[weapon].cost;
        select(p, weapon);
        self.event("buy", Some(slot), None, weapon as i32);
    }
    pub(super) fn drop_tactical_weapon(&mut self, slot: usize) {
        let p = &self.players[slot];
        if !p.alive
            || !matches!(self.phase.as_str(), "buy" | "live")
            || !p.owned[p.weapon]
            || self.drops.len() >= DROP_CAPACITY
        {
            return;
        }
        let weapon = p.weapon;
        let drop = self.inventory_drop(slot, weapon);
        self.drops.push(drop);
        remove(&mut self.players[slot], weapon);
        self.event("gun_drop", Some(slot), None, weapon as i32);
    }
    pub(super) fn release_tactical_inventory(&mut self, slot: usize) {
        for weapon in 0..WEAPONS {
            if !self.players[slot].owned[weapon] {
                continue;
            }
            if self.drops.len() >= DROP_CAPACITY {
                self.drops.remove(0);
            }
            let drop = self.inventory_drop(slot, weapon);
            self.drops.push(drop);
            remove(&mut self.players[slot], weapon);
        }
    }
    pub(super) fn recover_tactical_weapon(&mut self, slot: usize, index: usize, rules: &Rules) {
        let mut drop = self.drops.remove(index);
        let weapon = drop.weapon;
        if self.players[slot].owned[weapon] {
            let p = &mut self.players[slot];
            let amount =
                (rules.weapons[weapon].reserve - p.reserve[weapon]).min(drop.ammo + drop.reserve);
            p.reserve[weapon] += amount;
            // Consume reserve first; the surviving world's loaded magazine remains explicit.
            let reserve = amount.min(drop.reserve);
            drop.reserve -= reserve;
            drop.ammo -= amount - reserve;
            if drop.ammo + drop.reserve > 0 {
                self.drops.insert(index, drop);
            }
            self.event("ammo_pickup", Some(slot), None, weapon as i32);
        } else {
            // Removing the recovered object first guarantees space for the displaced gun.
            if let Some(old) = self.replacement(slot, weapon) {
                let old_drop = self.inventory_drop(slot, old);
                self.drops.push(old_drop);
                remove(&mut self.players[slot], old);
            }
            let p = &mut self.players[slot];
            p.owned[weapon] = true;
            p.ammo[weapon] = drop.ammo;
            p.reserve[weapon] = drop.reserve;
            select(p, weapon);
            self.event("gun_pickup", Some(slot), None, weapon as i32);
        }
    }
}
