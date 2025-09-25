# syntax=docker/dockerfile:1.7
# Multi-stage build for single image (API + Client)

# Base with pnpm and workspace context
FROM node:22-alpine AS base

RUN npm install -g pnpm@10.10.0
WORKDIR /app

# Copy workspace manifests first for better caching
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/client/package.json ./apps/client/package.json

# Install all deps (prod + dev) with cache mount for pnpm store
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile

# Build stage: build API and Client
FROM base AS build
WORKDIR /app
COPY . .

# Build API and Client
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
  pnpm --filter ssh-api build \
  && pnpm --filter ssh-client build

# Production deps stage: only production deps for the API
FROM node:22-alpine AS api_deps
RUN npm install -g pnpm@10.10.0
WORKDIR /app
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY apps/api/package.json ./apps/api/package.json
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile --prod

# Final runtime: Node + Nginx in one image
FROM node:22-alpine AS runtime

# Install nginx and tini
RUN apk add --no-cache nginx tini

ENV NODE_ENV=production
WORKDIR /app

# Create nginx runtime dirs
RUN mkdir -p /run/nginx /var/log/nginx

# Copy API production node_modules and built dist
COPY --from=api_deps /app/node_modules ./node_modules
COPY --from=api_deps /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist

# Copy built client to nginx html
COPY --from=build /app/apps/client/dist /usr/share/nginx/html

# Copy nginx config and entrypoint
COPY nginx.conf /etc/nginx/nginx.conf
COPY scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80 8081

# Use tini as init, then our entrypoint
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/entrypoint.sh"]


