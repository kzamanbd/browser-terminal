import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './app')
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'app/main.tsx')
            }
        }
    },
    server: {
        port: 3000
    }
});
