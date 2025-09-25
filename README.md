# 🌐 Browser Terminal

A modern, full-stack web-based SSH terminal client that enables secure connections to remote servers through your browser. This is a full stack application with React and Node.js, built with NestJS, Socket.IO, and xterm.js for a seamless terminal experience.

## 🚀 Features

- **SSH Terminal**: Connect to remote servers through your browser
- **Real-time Communication**: Socket.IO powered terminal interface
- **Theme Support**: Multiple terminal themes with xterm.js addons
- **Authentication**: Username/password and SSH key support
- **Responsive Design**: Works on desktop and mobile devices
- **Docker Ready**: Single image deployment with Nginx reverse proxy
- **Hot Reload**: Development environment with live code updates

## 🏗️ Architecture

**Monorepo Structure:**

- `apps/api` - NestJS backend with Socket.IO and SSH2
- `apps/client` - React frontend with xterm.js terminal
- Single Docker image with Nginx reverse proxy for production
- Docker Compose setup for local development

## 🛠️ Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, xterm.js  
**Backend:** NestJS, Socket.IO, ssh2, Node.js 22+  
**DevOps:** Docker, pnpm, Turborepo, Nginx

## 🚀 Quick Start

### Using Docker Hub Image (Recommended)

```bash
# Run the complete application with a single command
docker run -p 8080:80 -p 8081:8081 kzamanbd/terminal:latest
```

- **Client Application**: `http://localhost:8080`
- **API Server**: `http://localhost:8081`
- **Health Check**: `http://localhost:8080/health`

### Local Development

1. **Clone and install**

   ```bash
   git clone <repository-url>
   cd browser-terminal
   pnpm install
   ```

2. **Start development servers**

   ```bash
   # Option 1: Direct development (recommended)
   pnpm dev    # Start both API (8081) and client (5173)
   
   # Option 2: Docker Compose development
   pnpm docker:up     # Start with Docker Compose
   ```

3. **Access the application**

   - **Client**: `http://localhost:5173` (Vite dev server)
   - **API**: `http://localhost:8081` (NestJS server)
   - **Health Check**: `http://localhost:8081/health`

## 🐳 Docker Development

The project includes a complete Docker Compose setup for local development with hot reload:

```bash
# Start development environment
docker-compose up --build

# Start in background
docker-compose up -d --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

**Development Services:**

- **API**: `http://localhost:8081` (NestJS with watch mode)
- **Client**: `http://localhost:5173` (Vite dev server)
- **Health Check**: `http://localhost:8081/health`

## 🚀 Usage

1. **Connect to SSH Server**
   - Enter server details (host, port, username)
   - Provide authentication (password or SSH key)
   - Click connect to start terminal session

2. **Use the Terminal**
   - Execute commands as in a regular terminal
   - Switch themes and customize experience
   - Real-time output with Socket.IO

## 📋 Scripts

### Root Level Scripts

- `pnpm dev` - Start development servers (API + Client)
- `pnpm build` - Build for production
- `pnpm lint` - Run linting
- `pnpm format` - Format code with Prettier
- `pnpm docker:up` - Start with Docker Compose
- `pnpm docker:down` - Stop Docker Compose services
- `pnpm docker:build` - Build and push to Docker Hub

### API Scripts (`apps/api`)

- `pnpm dev` - Start with watch mode
- `pnpm start` - Start production build
- `pnpm build` - Build for production
- `pnpm test` - Run tests

### Client Scripts (`apps/client`)

- `pnpm dev` - Start Vite dev server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🐳 Docker Hub

**Image:** `kzamanbd/terminal:latest`

### Production Deployment

```bash
# Run in production (single container)
docker run -d \
  --name browser-terminal \
  -p 80:80 \
  -p 8081:8081 \
  kzamanbd/terminal:latest

# With custom ports
docker run -d \
  --name browser-terminal \
  -p 8080:80 \
  -p 8081:8081 \
  kzamanbd/terminal:latest
```

### Build and Push

```bash
# Build and push new version
./scripts/docker-build-push.sh v1.0.0

# Or use npm script
pnpm docker:build
```

### Production Features

- **Single Image**: Contains both API and client
- **Nginx Reverse Proxy**: Serves client and proxies API requests
- **Health Monitoring**: Built-in health check endpoint
- **Optimized Build**: Multi-stage Docker build for minimal size
- **Process Management**: Uses tini for proper signal handling

## 🚀 Deployment Guide

### Docker Compose Deployment

Create a `docker-compose.prod.yml` file:

```yaml
services:
  browser-terminal:
    image: kzamanbd/terminal:latest
    container_name: browser-terminal
    restart: unless-stopped
    ports:
      - "80:80"      # Client (nginx)
      - "8081:8081"  # API (direct access)
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

Deploy with:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes Deployment

Create `k8s-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: browser-terminal
spec:
  replicas: 2
  selector:
    matchLabels:
      app: browser-terminal
  template:
    metadata:
      labels:
        app: browser-terminal
    spec:
      containers:
      - name: browser-terminal
        image: kzamanbd/terminal:latest
        ports:
        - containerPort: 80
        - containerPort: 8081
        env:
        - name: NODE_ENV
          value: "production"
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: browser-terminal-service
spec:
  selector:
    app: browser-terminal
  ports:
    - name: http
      port: 80
      targetPort: 80
    - name: api
      port: 8081
      targetPort: 8081
  type: LoadBalancer
```

Deploy with:

```bash
kubectl apply -f k8s-deployment.yaml
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | API server port | `8081` |

### Health Checks

The application provides health check endpoints:

- **Client Health**: `GET /health` - Returns "healthy"
- **API Health**: `GET /health` - Returns `{"status":"ok"}`

### Monitoring

Monitor your deployment:

```bash
# Check container health
docker ps
docker logs browser-terminal

# Check API health
curl http://localhost:8081/health

# Check client health
curl http://localhost/health
```

## 🔧 Troubleshooting

### Common Issues

1. **Port Conflicts**

   ```bash
   # Check what's using the ports
   lsof -i :80
   lsof -i :8081
   
   # Use different ports
   docker run -p 8080:80 -p 8081:8081 kzamanbd/terminal:latest
   ```

2. **Container Won't Start**

   ```bash
   # Check logs
   docker logs browser-terminal
   
   # Check container status
   docker ps -a
   ```

3. **API Not Responding**

   ```bash
   # Test API directly
   curl http://localhost:8081
   
   # Check if container is running
   docker exec -it browser-terminal ps aux
   ```

4. **Client Not Loading**

   ```bash
   # Check nginx status
   docker exec -it browser-terminal nginx -t
   
   # Check if files are served
   curl -I http://localhost
   ```

### Development Issues

1. **Dependencies Not Installing**

   ```bash
   # Clear Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

2. **Hot Reload Not Working**

   ```bash
   # Ensure volume mounts are correct
   docker-compose config
   
   # Check file permissions
   docker-compose exec api ls -la /app/apps/api
   ```

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 👨‍💻 Author

Kamruzzaman
