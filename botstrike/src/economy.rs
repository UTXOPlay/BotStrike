//! Separate provisional economy for the private Tactical Playtest.
use crate::{DamageSource, Game, Rules, Ruleset, WEAPONS};
use serde::Deserialize;
#[derive(Clone, Deserialize)]
pub struct Profile {
    pub start: i32,
    pub cap: i32,
    pub win: i32,
    pub loss: [i32; 5],
    pub planted_loss: i32,
    pub objective_actor: i32,
    pub weapon_kill: [i32; WEAPONS],
    pub utility_kill: i32,
}
impl Game {
    pub(super) fn credit(&mut self, slot: usize, amount: i32, rules: &Rules) {
        let cap = if self.config.ruleset == Ruleset::Tactical {
            rules.economy.cap
        } else {
            16000
        };
        self.players[slot].credits = (self.players[slot].credits + amount).min(cap);
    }
    pub(super) fn round_income(&mut self, winner: usize, rules: &Rules) {
        if self.config.ruleset == Ruleset::Tactical {
            let loser = 1 - winner;
            self.loss_streak[winner] = 0;
            self.loss_streak[loser] =
                (self.loss_streak[loser] + 1).min(rules.economy.loss.len() as u8);
            let loss = rules.economy.loss[self.loss_streak[loser] as usize - 1];
            for slot in 0..self.players.len() {
                let team = self.players[slot].team;
                let amount = if team == winner {
                    rules.economy.win
                } else {
                    loss + if team == self.attacker && self.objective.planted {
                        rules.economy.planted_loss
                    } else {
                        0
                    }
                };
                self.credit(slot, amount, rules);
            }
        } else {
            for p in &mut self.players {
                p.credits = (p.credits + if p.team == winner { 3250 } else { 1900 }).min(16000);
            }
        }
    }
    pub(super) fn kill_income(&mut self, slot: usize, source: &DamageSource, rules: &Rules) {
        if self.config.mode == "practice" {
            return;
        }
        let amount = if self.config.ruleset == Ruleset::Tactical {
            match source {
                DamageSource::Weapon(w) | DamageSource::Splash(w) => rules.economy.weapon_kill[*w],
                DamageSource::Utility(_) | DamageSource::Other => rules.economy.utility_kill,
            }
        } else {
            300
        };
        self.credit(slot, amount, rules);
    }
}
