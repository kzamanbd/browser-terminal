# Multi-stage build for API
FROM node:22-alpine AS base

# Install pnpm and curl for healthcheck
RUN npm install -g pnpm && apk add --no-cache curl

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./

# Copy API package.json
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Development stage
FROM base AS development
WORKDIR /app
COPY . .
# Ensure all dependencies are installed including dev dependencies
RUN pnpm install --frozen-lockfile
EXPOSE 8081
CMD ["pnpm", "--filter", "ssh-api", "dev"]

# Build stage
FROM base AS build
WORKDIR /app
COPY . .
RUN pnpm --filter ssh-api build

# Production stage
FROM node:22-alpine AS production

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy workspace files for production dependencies
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY apps/api/package.json ./apps/api/

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application
COPY --from=build /app/apps/api/dist ./apps/api/dist

EXPOSE 8081

CMD ["node", "apps/api/dist/main.js"]
