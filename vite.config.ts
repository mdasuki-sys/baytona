import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    // IMPORTANT: GitHub Pages base path (repo name)
    base: '/baytona/',

    plugins: [react()],

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
  };
});
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    // IMPORTANT: GitHub Pages base path (repo name)
    base: '/baytona/',

    plugins: [react()],

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
  };
});
