# Multi-stage build for Client
FROM node:22-alpine AS base

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./

# Copy client package.json
COPY apps/client/package.json ./apps/client/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Development stage
FROM base AS development
WORKDIR /app
COPY . .
# Ensure all dependencies are installed including dev dependencies
RUN pnpm install --frozen-lockfile
EXPOSE 5173
CMD ["pnpm", "--filter", "ssh-client", "dev", "--host", "0.0.0.0"]

# Build stage
FROM base AS build
WORKDIR /app
COPY . .
RUN pnpm --filter ssh-client build

# Production stage
FROM nginx:alpine AS production

# Copy custom nginx config
COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=build /app/apps/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
