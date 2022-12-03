FROM node:18-alpine as base
WORKDIR /app

FROM base as pnpm-base

COPY ./package.json ./
RUN corepack enable 

FROM pnpm-base as deps

COPY  pnpm-lock.yaml ./
RUN pnpm fetch

FROM pnpm-base as builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm install -r --frozen-lockfile
# RUN pnpm build

FROM base as runner
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/auth/node_modules ./apps/auth/node_modules



CMD [ "pnpm", "start" ]