# Quick Setup Guide

## 🚀 Quick Start

### Option 1: Interactive Manager (Recommended)

```bash
./docker-manager.sh
```

### Option 2: Direct Commands

#### Development

```bash
# Start development
npm run docker:dev

# Stop development
npm run docker:stop
```

#### Production

```bash
# Build and push to Docker Hub
npm run docker:build

# Deploy production
npm run docker:deploy

# Stop production
npm run docker:stop:prod
```

## 📋 Prerequisites

1. **Docker & Docker Compose**

   ```bash
   # Install Docker Desktop (macOS/Windows)
   # Or install docker and docker-compose (Linux)
   ```

2. **Docker Hub Account**
   - Sign up at <https://hub.docker.com>
   - Create access token in Account Settings

3. **Update Configuration**
   - Change `kzamanbd` to your Docker Hub username in:
     - `scripts/docker-build-push.sh`
     - `scripts/deploy-prod.sh`
     - `docker-compose.prod.yml`
     - `.github/workflows/docker-build.yml`

## 🔧 First Time Setup

1. **Clone and navigate to project**

   ```bash
   git clone <your-repo>
   cd web-terminal
   ```

2. **Make scripts executable**

   ```bash
   chmod +x scripts/*.sh
   chmod +x docker-manager.sh
   ```

3. **Login to Docker Hub**

   ```bash
   docker login
   ```

4. **Start development**

   ```bash
   ./docker-manager.sh
   # Choose option 1
   ```

## 📦 Docker Hub Images

After building and pushing, your images will be available at:

- `your-username/web-terminal-api:latest`
- `your-username/web-terminal-client:latest`

## 🌐 Access Points

### Development endpoints

- Frontend: <http://localhost:5173>
- API: <http://localhost:8081>

### Production endpoints

- Application: <http://localhost>
- API: <http://localhost/api>
- Health: <http://localhost/health>

## 🔄 CI/CD Setup (Optional)

1. Add secrets to GitHub repository:
   - `DOCKER_HUB_TOKEN`: Your Docker Hub access token

2. The workflow will automatically:
   - Build images on push to main/master
   - Push to Docker Hub with version tags

## 🐛 Troubleshooting

- **Port conflicts**: Check if ports 80, 8081, 5173 are free
- **Permission errors**: Run `chmod +x scripts/*.sh`
- **Build failures**: Try `docker system prune -a` to clean cache
- **Container issues**: Check logs with `docker-compose logs`
