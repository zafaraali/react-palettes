import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: /node_modules/
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/@emoji-mart/data/')) return 'emoji-data';
          if (id.includes('/node_modules/react-color/')) return 'color-picker';
        }
      }
    }
  },
  test: {
    include: ['src/**/*.test.js'],
    setupFiles: ['./src/testSetup.js'],
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost/'
      }
    }
  }
});
