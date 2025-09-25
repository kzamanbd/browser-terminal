# SSH API Backend

NestJS backend for Browser Terminal - handles SSH connections and real-time terminal communication.

## 🚀 Features

- **SSH Gateway**: WebSocket-based SSH connection management
- **Real-time Communication**: Socket.IO for terminal I/O
- **Authentication**: Username/password and SSH key support
- **Health Monitoring**: Built-in health check endpoints

## 🛠️ Tech Stack

- NestJS framework
- Socket.IO for WebSocket communication
- ssh2 library for SSH connections
- TypeScript
- Jest for testing

## 📦 Scripts

```bash
# Development
npm run dev          # Start with watch mode
npm run start        # Start production build

# Testing
npm run test         # Unit tests
npm run test:e2e     # End-to-end tests
npm run test:cov     # Test coverage

# Building
npm run build        # Build for production
```

## 🔧 Environment Variables

- `PORT` - API server port (default: 8081)
- `NODE_ENV` - Environment (development/production)

## 🏗️ Architecture

```md
src/
├── ssh/             # SSH gateway and handlers
├── app.controller.ts # Main controller
├── app.service.ts   # Application service
├── app.module.ts    # Root module
└── main.ts         # Application entry point
```

## 📝 License

MIT License
