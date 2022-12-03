FROM node:18-alpine as base
WORKDIR /app

FROM base as pnpm-base
COPY ./package.json ./

RUN corepack enable

# fetch
FROM pnpm-base as deps
COPY pnpm-lock.yaml ./
RUN pnpm fetch

# install & build
FROM pnpm-base as builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm install -r --offline

# RUN cd ./apps/next && npm run build

# setup runnable environment
FROM base as runner

CMD ["pnpm", "dev"]

# COPY --from=builder /app/apps/next/.next/standalone ./
# COPY --from=builder /app/apps/next/public ./apps/next/public
# COPY --from=builder /app/apps/next/.next/static ./apps/next/.next/static
# COPY ./apps/next/entrypoint.sh ./apps/next/

# # to inject env variables in runtime. currently not possible in nextjs standalone mode
# RUN apk add --no-cache --upgrade bash
# RUN apk add --no-cache --upgrade grep
# RUN apk add --no-cache --upgrade sed
# RUN ["chmod", "+x", "./apps/next/entrypoint.sh"]
# ENTRYPOINT ["./apps/next/entrypoint.sh"]

# EXPOSE 80
# ENV PORT 80
# CMD ["node", "apps/next/server.js"]
