#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
export CARGO_TARGET_DIR="${CARGO_TARGET_DIR:-$PWD/target-botstrike}"
cargo build --release --locked --manifest-path botstrike/Cargo.toml
mkdir -p release
cp "$CARGO_TARGET_DIR/release/botstrike-engine" release/botstrike-engine
# Exact engine bytes are embedded in the new application profile.
cargo build --release --locked --manifest-path botstrike-myelin/Cargo.toml
cp "$CARGO_TARGET_DIR/release/myelin-botstrike" release/myelin-botstrike
