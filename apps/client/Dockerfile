FROM node:alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update

RUN npm i -g pnpm
RUN npm i -g turbo

FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=client --docker

FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install the deps needed to build the target
RUN corepack enable
RUN pnpm install

FROM installer AS builder
WORKDIR /app

# COPY --from=installer ./app/ /app
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
# RUN pnpm turbo run build --filter=web...
CMD ["turbo", "run", "dev", "--filter=client"]

# FROM base AS runner
# WORKDIR /app

# # Don't run production as root
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

# COPY --from=builder /app/apps/web/next.config.js .
# COPY --from=builder /app/apps/web/package.json .

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

# CMD node apps/web/server.js
