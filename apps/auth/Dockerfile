FROM node:16-alpine as base
WORKDIR /app

# pnpm-base
FROM base as pnpm-base
RUN npm i -g pnpm
RUN npm i -g ts-node

# fetch
FROM pnpm-base as deps
COPY ./pnpm-lock.yaml ./
RUN pnpm fetch

# install & build
FROM pnpm-base as builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .


RUN pnpm install -r --frozen-lockfile

FROM base as runner
COPY . .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/auth/node_modules ./apps/auth/node_modules

CMD ["npm", "run", "dev"]

