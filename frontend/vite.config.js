import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: "**/*.jsx",
  })],
  host: true,
  server: {
    port: 3001,
    watch: {
      usePolling: true
    },    
    proxy: {
      '/api': {
        // target: 'http://bbprime-backend:5000', // testing from front end container
        target: 'http://localhost:5000', //testing front end command line start
        changeOrigin: true,
      },
    },
  },
});
