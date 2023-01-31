FROM node:alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update

RUN npm i -g pnpm
RUN npm i -g turbo

FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=tickets --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install the deps needed to build the target
RUN corepack enable
RUN pnpm install

# Build the project and its dependencies
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
# RUN turbo build --filter=api...
# RUN turbo dev --filter=tickets...

CMD ["turbo", "run", "dev", "--filter=tickets"]


# FROM base AS runner
# WORKDIR /app

# RUN addgroup --system --gid 1001 expressjs
# RUN adduser --system --uid 1001 expressjs
# USER expressjs
# COPY --from=installer /app .

# CMD node apps/api/dist/index.js
