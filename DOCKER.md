# Docker Deployment Guide

This guide covers how to build, push, and deploy the Browser Terminal application using Docker and Docker Hub.

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Docker Hub account
- Git repository access

### Development

```bash
# Start development environment
npm run docker:dev
# or
docker-compose up --build
```

### Production Deployment

```bash
# Deploy from Docker Hub images
npm run docker:deploy
# or
./scripts/deploy-prod.sh
```

## Docker Hub Images

The application consists of two main Docker images:

- **API**: `kzamanbd/web-terminal-api:latest`
- **Client**: `kzamanbd/web-terminal-client:latest`

## Building and Pushing Images

### Manual Build and Push

```bash
# Build and push all images
npm run docker:build

# Build and push with specific version
npm run docker:build:version v1.0.0
# or
./scripts/docker-build-push.sh v1.0.0
```

### Automated CI/CD

The project includes GitHub Actions workflow (`.github/workflows/docker-build.yml`) that automatically:

- Builds Docker images on push to main/master
- Pushes images to Docker Hub
- Tags images with version numbers and latest

#### Setup GitHub Actions

1. Add `DOCKER_HUB_TOKEN` secret to your GitHub repository:
   - Go to GitHub Repository Settings → Secrets and Variables → Actions
   - Add new secret: `DOCKER_HUB_TOKEN` with your Docker Hub access token

2. Update Docker Hub username in workflow file if needed

## Production Deployment using Docker Compose

### Using Docker Compose

```bash
# Start production services
docker-compose -f docker-compose.prod.yml up -d

# Stop production services
docker-compose -f docker-compose.prod.yml down

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Using npm scripts

```bash
# Start production deployment
npm run docker:prod

# Stop production deployment
npm run docker:stop:prod
```

## Environment Configuration

### Development with Docker Compose

- Uses `docker-compose.yml`
- Mounts source code for hot reload
- Exposes individual service ports

### Production

- Uses `docker-compose.prod.yml`
- Uses pre-built Docker Hub images
- Routes traffic through Nginx reverse proxy
- Includes health checks

## Service Endpoints

- Client: <http://localhost:5173>
- API: <http://localhost:8081>
- Direct service access

- Application: <http://localhost> (port 80)
- API: <http://localhost/api>
- Health Check: <http://localhost/health>
- All traffic routed through Nginx

## Customization

### Docker Hub Configuration

Update the following files with your Docker Hub username:

- `scripts/docker-build-push.sh`
- `scripts/deploy-prod.sh`
- `docker-compose.prod.yml`
- `.github/workflows/docker-build.yml`

### Environment Variables

Modify environment files as needed:

- `.env.development` - Development configuration
- `.env.production` - Production configuration

## Troubleshooting

### Common Issues

1. **Port conflicts**

   ```bash
   # Check if ports are in use
   lsof -i :80 -i :8081 -i :5173
   ```

2. **Docker build failures**

   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

3. **Permission issues with scripts**

   ```bash
   # Make scripts executable
   chmod +x scripts/*.sh
   ```

4. **Container health check failures**

   ```bash
   # Check container logs
   docker-compose -f docker-compose.prod.yml logs
   
   # Check individual container
   docker logs web-terminal-api-prod
   ```

## Monitoring

### Health Checks

- API health: `curl http://localhost:8081/health`
- Nginx health: `curl http://localhost/health`

### Container Status

```bash
# Check running containers
docker-compose -f docker-compose.prod.yml ps

# View resource usage
docker stats
```

## Security Considerations

- Use environment variables for sensitive configuration
- Enable SSL/TLS in production (mount certificates in nginx service)
- Use Docker secrets for production passwords
- Regularly update base images for security patches

## Scaling

For horizontal scaling, consider:

- Using Docker Swarm or Kubernetes
- Load balancing multiple API instances
- Separating static assets to CDN
- Using managed database services
