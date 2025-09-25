#!/bin/bash

# Docker Hub Build and Push Script for Browser Terminal
set -e

# Configuration
DOCKER_HUB_USERNAME="kzamanbd"
PROJECT_NAME="terminal"
VERSION=${1:-"latest"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🐳 Building and pushing Docker images for ${PROJECT_NAME}${NC}"
echo -e "${YELLOW}Version: ${VERSION}${NC}"

# Function to build and push image
build_and_push() {
    local service=$1
    local dockerfile_path=$2
    local image_name="${DOCKER_HUB_USERNAME}/${PROJECT_NAME}-${service}"
    
    echo -e "${YELLOW}Building ${service} image for multiple platforms...${NC}"
    
    # Create and use buildx builder if not exists
    if ! docker buildx ls | grep -q "multiplatform-builder"; then
        docker buildx create --name multiplatform-builder --use
    else
        docker buildx use multiplatform-builder
    fi
    
    # Build and push multi-platform image
    docker buildx build \
        --file ${dockerfile_path} \
        --target production \
        --platform linux/amd64,linux/arm64 \
        --tag ${image_name}:${VERSION} \
        --tag ${image_name}:latest \
        --push \
        .
    
    echo -e "${GREEN}✅ Successfully built and pushed ${image_name} for multiple platforms${NC}"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Login to Docker Hub (if not already logged in)
echo -e "${YELLOW}Checking Docker Hub authentication...${NC}"
if ! docker info | grep -q "Username"; then
    echo -e "${YELLOW}Please login to Docker Hub:${NC}"
    docker login
fi

# Build and push API image
build_and_push "api" "apps/api/Dockerfile"

# Build and push Client image
build_and_push "client" "apps/client/Dockerfile"

echo -e "${GREEN}🎉 All images have been successfully built and pushed!${NC}"
echo -e "${GREEN}You can now use these images in production:${NC}"
echo -e "  - ${DOCKER_HUB_USERNAME}/${PROJECT_NAME}-api:${VERSION}"
echo -e "  - ${DOCKER_HUB_USERNAME}/${PROJECT_NAME}-client:${VERSION}"
echo ""
echo -e "${YELLOW}To deploy in production, run:${NC}"
echo -e "  docker-compose -f docker-compose.prod.yml up -d"
