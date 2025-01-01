import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@root': path.resolve(__dirname, 'src/root'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
});
