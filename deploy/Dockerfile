FROM node:22-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends libstdc++6 zlib1g && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund
COPY dist ./dist
COPY host ./host
COPY game-host.json ./game-host.json
COPY botstrike-service ./botstrike-service
COPY botstrike/spec.json ./botstrike/spec.json
COPY release/botstrike-engine release/myelin-botstrike ./release/
RUN mkdir /app/data && chown node:node /app/data
USER node
ENV NODE_ENV=production BIND=0.0.0.0 WEB_PORT=8080 DATA_DIR=/app/data
EXPOSE 8080
CMD ["node","host/start.mjs"]
