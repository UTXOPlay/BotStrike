# syntax=docker/dockerfile:1
ARG RUST_IMAGE=rust:1.97.1-bookworm
ARG NODE_IMAGE=node:22-bookworm-slim

# Compile on the same libc generation as the runtime. Host-built adapters can
# require a newer GLIBC and must never be copied into a Bookworm release.
FROM ${RUST_IMAGE} AS native
RUN apt-get update && apt-get install -y --no-install-recommends clang libclang-dev cmake pkg-config protobuf-compiler zlib1g-dev && rm -rf /var/lib/apt/lists/*
WORKDIR /src
ENV CARGO_TARGET_DIR=/build-target CARGO_BUILD_JOBS=2
COPY botstrike ./botstrike
COPY botstrike-myelin ./botstrike-myelin
COPY scripts/build-botstrike.sh ./scripts/build-botstrike.sh
RUN --mount=type=cache,target=/usr/local/cargo/registry --mount=type=cache,target=/usr/local/cargo/git --mount=type=cache,target=/build-target \
    bash scripts/build-botstrike.sh && cargo test --release --locked --manifest-path botstrike/Cargo.toml -- --test-threads=2

FROM ${NODE_IMAGE} AS validation
RUN apt-get update && apt-get install -y --no-install-recommends libstdc++6 zlib1g && rm -rf /var/lib/apt/lists/*
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund
COPY botstrike ./botstrike
COPY botstrike-service ./botstrike-service
COPY botstrike-myelin/src/session.rs ./botstrike-myelin/src/session.rs
COPY games ./games
COPY shared ./shared
COPY public ./public
COPY host ./host
COPY game-host.json ./game-host.json
COPY tools ./tools
COPY tests ./tests
COPY docs/acceptance/salvage-pr1.json ./docs/acceptance/salvage-pr1.json
COPY docs/acceptance/tactical-core/preview-verifiers.json ./docs/acceptance/tactical-core/preview-verifiers.json
COPY --from=native /src/release ./release
# Historical pairs come from recorded production artifacts, never a rebuild.
# Development checkpoints and local baselines are deliberately excluded.
COPY release/legacy ./release/legacy
RUN node tools/generate-damage-contract.mjs --engine=/src/release/botstrike-engine && node tools/verifier-manifest.mjs && npm run build
RUN mkdir build-validation && node --test tests/botstrike-recoil.test.mjs tests/botstrike-motion.test.mjs tests/botstrike-hit-regions.test.mjs tests/botstrike-damage-contract.test.mjs tests/botstrike-design.test.mjs tests/botstrike-prediction.test.mjs tests/botstrike-accuracy-state.test.mjs tests/botstrike-service.test.mjs tests/botstrike-practice.test.mjs tests/botstrike-sight-geometry.test.mjs tests/botstrike-projectile-contract.test.mjs tests/botstrike-input-boundary.test.mjs tests/botstrike-render-scheduling.test.mjs tests/botstrike-disclosure.test.mjs tests/botstrike-tactical.test.mjs tests/botstrike-cover-decoration.test.mjs tests/botstrike-cover-readability.test.mjs > build-validation/native-browser-contracts.tap || { cat build-validation/native-browser-contracts.tap; exit 1; }
RUN npm run test:host > build-validation/host.tap || { cat build-validation/host.tap; exit 1; }
RUN node tests/botstrike-native-flow.mjs > build-validation/native-flow.json
RUN node tests/botstrike-practice-flow.mjs > build-validation/practice-flow.json
RUN node tests/botstrike-utility-flow.mjs > build-validation/utility-flow.json
RUN node tests/botstrike-tactical-flow.mjs > build-validation/tactical-flow.json

FROM ${NODE_IMAGE}
RUN apt-get update && apt-get install -y --no-install-recommends libstdc++6 zlib1g && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund
COPY --from=validation /src/dist ./dist
COPY host ./host
COPY shared ./shared
COPY game-host.json ./game-host.json
COPY botstrike-service ./botstrike-service
COPY botstrike/spec.json ./botstrike/spec.json
COPY --from=validation /src/release ./release
COPY --from=validation /src/build-validation ./build-validation
COPY tools/verify-export.mjs ./tools/verify-export.mjs
RUN mkdir /app/data && chown node:node /app/data
USER node
ENV NODE_ENV=production BIND=0.0.0.0 WEB_PORT=8080 DATA_DIR=/app/data
EXPOSE 8080
CMD ["node","host/start.mjs"]
