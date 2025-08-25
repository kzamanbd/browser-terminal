#!/bin/bash

# Quick Start Script for Browser Terminal Docker Deployment
# This script provides an interactive menu for common Docker operations

set -e

# Configuration
DOCKER_HUB_USERNAME="kzamanbd"
PROJECT_NAME="web-terminal"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Functions
show_menu() {
    clear
    echo -e "${BLUE}======================================${NC}"
    echo -e "${BLUE}   Browser Terminal Docker Manager   ${NC}"
    echo -e "${BLUE}======================================${NC}"
    echo ""
    echo -e "${GREEN}Development:${NC}"
    echo "1) Start development environment"
    echo "2) Stop development environment"
    echo ""
    echo -e "${GREEN}Production:${NC}"
    echo "3) Build and push images to Docker Hub"
    echo "4) Deploy production from Docker Hub"
    echo "5) Stop production environment"
    echo ""
    echo -e "${GREEN}Utilities:${NC}"
    echo "6) View container logs"
    echo "7) Check container status"
    echo "8) Clean Docker system"
    echo ""
    echo "0) Exit"
    echo ""
}

start_dev() {
    echo -e "${YELLOW}Starting development environment...${NC}"
    docker-compose up --build
}

stop_dev() {
    echo -e "${YELLOW}Stopping development environment...${NC}"
    docker-compose down
    echo -e "${GREEN}Development environment stopped${NC}"
}

build_push() {
    echo -e "${YELLOW}Building and pushing images to Docker Hub...${NC}"
    read -p "Enter version tag (default: latest): " version
    version=${version:-latest}
    ./scripts/docker-build-push.sh "$version"
}

deploy_prod() {
    echo -e "${YELLOW}Deploying production environment...${NC}"
    ./scripts/deploy-prod.sh
}

stop_prod() {
    echo -e "${YELLOW}Stopping production environment...${NC}"
    docker-compose -f docker-compose.prod.yml down
    echo -e "${GREEN}Production environment stopped${NC}"
}

view_logs() {
    echo -e "${YELLOW}Available environments:${NC}"
    echo "1) Development logs"
    echo "2) Production logs"
    read -p "Choose environment (1-2): " env_choice
    
    case $env_choice in
        1)
            docker-compose logs -f
            ;;
        2)
            docker-compose -f docker-compose.prod.yml logs -f
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            ;;
    esac
}

check_status() {
    echo -e "${YELLOW}Container Status:${NC}"
    echo ""
    echo -e "${BLUE}Development:${NC}"
    docker-compose ps || echo "No development containers running"
    echo ""
    echo -e "${BLUE}Production:${NC}"
    docker-compose -f docker-compose.prod.yml ps || echo "No production containers running"
}

clean_docker() {
    echo -e "${YELLOW}This will remove all unused Docker resources${NC}"
    read -p "Are you sure? (y/N): " confirm
    if [[ $confirm =~ ^[Yy]$ ]]; then
        docker system prune -a
        echo -e "${GREEN}Docker system cleaned${NC}"
    fi
}

# Main loop
while true; do
    show_menu
    read -p "Choose an option (0-8): " choice
    
    case $choice in
        1)
            start_dev
            ;;
        2)
            stop_dev
            read -p "Press Enter to continue..."
            ;;
        3)
            build_push
            read -p "Press Enter to continue..."
            ;;
        4)
            deploy_prod
            read -p "Press Enter to continue..."
            ;;
        5)
            stop_prod
            read -p "Press Enter to continue..."
            ;;
        6)
            view_logs
            ;;
        7)
            check_status
            read -p "Press Enter to continue..."
            ;;
        8)
            clean_docker
            read -p "Press Enter to continue..."
            ;;
        0)
            echo -e "${GREEN}Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option. Please try again.${NC}"
            read -p "Press Enter to continue..."
            ;;
    esac
done
