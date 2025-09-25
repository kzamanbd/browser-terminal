# SSH Client Frontend

React frontend for Browser Terminal - web-based SSH terminal interface with xterm.js.

## 🚀 Features

- **Terminal Interface**: xterm.js with multiple addons (fit, search, web-links, unicode11)
- **Theme Support**: Multiple terminal themes for customization
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Communication**: Socket.IO client for terminal I/O
- **Modern UI**: Tailwind CSS with Headless UI components

## 🛠️ Tech Stack

- React 18 with TypeScript
- Vite for fast development and builds
- Tailwind CSS for styling
- xterm.js for terminal emulation
- Socket.IO client
- React Router DOM for navigation
- Headless UI for accessible components

## 📦 Scripts

```bash
# Development
npm run dev          # Start development server
npm run preview      # Preview production build

# Building
npm run build        # Build for production

# Linting
npm run lint         # Run ESLint
```

## 🔧 Environment Variables

- `VITE_API_URL` - API server URL for WebSocket connections
- `VITE_SSH_PASSWORD` - Default SSH password for development (optional)

## 🏗️ Architecture

```md
src/
├── components/      # Reusable UI components
├── hooks/          # Custom React hooks
├── pages/          # Application pages
├── layouts/        # Layout components
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
└── themes.json     # Terminal theme configurations
```

## 📝 License

MIT License
