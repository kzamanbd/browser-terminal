# 🌐 Web SSH Terminal

A modern, full-stack web-based SSH terminal client that enables secure connections to remote servers through your browser. Built with React, NestJS, Socket.IO, and xterm.js for a seamless terminal experience.

## 🚀 Features

### Core Functionality

- **SSH Connection Management**: Connect to remote servers using SSH credentials
- **Real-time Terminal**: Interactive terminal interface with full SSH session support
- **Command Execution**: Execute commands on remote servers with real-time output
- **Session Persistence**: Maintain SSH sessions throughout your browser session
- **Error Handling**: Comprehensive error messages and connection status feedback

### User Experience

- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Theme Support**: Multiple terminal themes for personalized experience
- **Terminal Addons**: Enhanced functionality with search, web links, and Unicode support
- **Keyboard Shortcuts**: Full terminal keyboard support and shortcuts
- **Auto-resize**: Terminal automatically adjusts to window size changes

### Security & Reliability

- **Secure Connections**: All SSH connections are handled server-side for security
- **Authentication Support**: Username/password and SSH key authentication
- **Connection Monitoring**: Real-time connection status and health monitoring
- **Error Recovery**: Automatic reconnection attempts and graceful error handling

## 🏗️ Architecture

This is a monorepo application with the following structure:

### Frontend (`apps/client`)

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and builds
- **Styling**: Tailwind CSS with custom components
- **Terminal**: xterm.js with multiple addons for enhanced functionality
- **State Management**: React hooks and context
- **Routing**: React Router DOM for navigation

### Backend (`apps/api`)

- **Framework**: NestJS with TypeScript
- **WebSocket**: Socket.IO for real-time communication
- **SSH Client**: ssh2 library for SSH connections
- **Testing**: Jest for unit and e2e testing

### Infrastructure

- **Package Manager**: pnpm with workspace support
- **Build System**: Turborepo for efficient monorepo builds
- **Containerization**: Docker with multi-stage builds
- **Deployment**: Docker Compose for development and production
- **Reverse Proxy**: Nginx for production deployment

## 🛠️ Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- xterm.js & addons
- Socket.IO Client
- React Router DOM
- Headless UI

### Backend

- NestJS
- TypeScript
- Socket.IO
- ssh2
- Node.js 18+

### Development & Deployment

- pnpm (Package Manager)
- Turborepo (Build System)
- Docker & Docker Compose
- Nginx
- ESLint & Prettier

## 📦 Installation

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- Docker (for containerized development)

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd browser-terminal
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development servers**

   ```bash
   pnpm dev
   ```

   This will start both the API server (port 8081) and client development server (port 5173).

### Docker Development

1. **Start with Docker Compose**

   ```bash
   pnpm docker:dev
   # or
   docker-compose up --build
   ```

2. **Stop the services**

   ```bash
   pnpm docker:stop
   ```

## 🚀 Usage

1. **Access the Application**
   - Development: `http://localhost:5173`
   - Production: Configure your domain in nginx

2. **Connect to SSH Server**
   - Enter your SSH server details (host, port, username)
   - Provide authentication (password or SSH key)
   - Click connect to establish the session

3. **Use the Terminal**
   - Execute commands as you would in a regular terminal
   - Use keyboard shortcuts and terminal features
   - Switch themes and customize your experience

## 📋 Available Scripts

### Root Level

- `pnpm dev` - Start both API and client in development mode
- `pnpm build` - Build both applications for production
- `pnpm lint` - Run linting across all packages
- `pnpm format` - Format code with Prettier

### Docker Commands

- `pnpm docker:dev` - Start development environment with Docker
- `pnpm docker:prod` - Start production environment
- `pnpm docker:build` - Build and push Docker images
- `pnpm docker:deploy` - Deploy to production

## 🔧 Configuration

### Environment Variables

Configure the following environment variables:

**API (`apps/api`)**

- `PORT` - API server port (default: 8081)
- `NODE_ENV` - Environment (development/production)

**Client (`apps/client`)**

- `VITE_API_URL` - API server URL for WebSocket connections

### Docker Configuration

- `docker-compose.yml` - Development environment
- `docker-compose.prod.yml` - Production environment
- `nginx.conf` - Nginx configuration for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Kamruzzaman

## 🔗 Related Technologies

- [NestJS](https://nestjs.com/) - Backend framework
- [React](https://reactjs.org/) - Frontend framework
- [xterm.js](https://xtermjs.org/) - Terminal emulator
- [Socket.IO](https://socket.io/) - Real-time communication
- [ssh2](https://github.com/mscdex/ssh2) - SSH client library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
