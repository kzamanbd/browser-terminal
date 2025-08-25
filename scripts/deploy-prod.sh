#!/bin/bash

# Production Deployment Script
set -e

# Configuration
DOCKER_HUB_USERNAME="kzamanbd"
PROJECT_NAME="web-terminal"
VERSION=${1:-"latest"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Deploying ${PROJECT_NAME} in production mode${NC}"

# Pull latest images
echo -e "${YELLOW}Pulling latest images...${NC}"
docker pull ${DOCKER_HUB_USERNAME}/${PROJECT_NAME}-api:${VERSION}
docker pull ${DOCKER_HUB_USERNAME}/${PROJECT_NAME}-client:${VERSION}

# Stop existing containers if running
echo -e "${YELLOW}Stopping existing containers...${NC}"
docker-compose -f docker-compose.prod.yml down || true

# Start production services
echo -e "${YELLOW}Starting production services...${NC}"
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
echo -e "${YELLOW}Waiting for services to be healthy...${NC}"
sleep 10

# Check service status
echo -e "${GREEN}Checking service status...${NC}"
docker-compose -f docker-compose.prod.yml ps

echo -e "${GREEN}🎉 Production deployment completed!${NC}"
echo -e "${GREEN}Your application is now running at:${NC}"
echo -e "  - Frontend: http://localhost"
echo -e "  - API: http://localhost/api"
echo -e "  - Health: http://localhost/health"
