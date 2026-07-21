import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Enable Rollup vendor chunk splitting for optimal caching and reduced initial bundle parse time
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three'],
          'motion-vendor': ['framer-motion', 'gsap'],
          'lucide-icons': ['lucide-react'],
        },
      },
    },
    // Minification and target settings for sub-50ms execution performance
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
  },
});
