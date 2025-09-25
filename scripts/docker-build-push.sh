#!/bin/bash

# Docker Hub Build and Push Script for Browser Terminal (single image)
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

echo -e "${GREEN}🐳 Building and pushing single Docker image for ${PROJECT_NAME}${NC}"
echo -e "${YELLOW}Version: ${VERSION}${NC}"

# Function to build and push image
build_and_push() {
    local image_name="${DOCKER_HUB_USERNAME}/${PROJECT_NAME}"

    echo -e "${YELLOW}Building single image (client + api) for current platform only (faster)...${NC}"
    
    # Use default docker builder for single platform (much faster)
    docker build \
        --file Dockerfile \
        --tag ${image_name}:${VERSION} \
        --tag ${image_name}:latest \
        --progress=plain \
        .

    echo -e "${YELLOW}Pushing to Docker Hub...${NC}"
    docker push ${image_name}:${VERSION}
    docker push ${image_name}:latest

    echo -e "${GREEN}✅ Successfully built and pushed ${image_name} for current platform${NC}"
    
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

# Build and push single image
build_and_push

echo -e "${GREEN}🎉 All images have been successfully built and pushed!${NC}"
echo -e "${GREEN}You can now use this image in production:${NC}"
echo -e "  - ${DOCKER_HUB_USERNAME}/${PROJECT_NAME}:${VERSION}"
echo ""
echo -e "${YELLOW}To deploy in production, run:${NC}"
echo -e "  docker run -p 80:80 ${DOCKER_HUB_USERNAME}/${PROJECT_NAME}:${VERSION}"
echo ""
echo -e "${YELLOW}Usage:${NC}"
echo -e "  $0 [version] [multi-platform]"
echo -e "  $0 latest true   # Multi-platform build (slower)"
echo -e "  $0 latest false  # Single platform build (faster)"
