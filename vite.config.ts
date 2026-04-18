import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";

export default defineConfig({
  plugins: [
      react(),
      tailwindcss()
  ],
  test: {
      globals: true,
      environment: 'jsdom',
  },
  server: {
    proxy: {
      '/api/chesshub-core/v1': {
        target: 'http://chesshub-core:8080',
        changeOrigin: true,
      }
    }
  },
  preview: {
    allowedHosts: ['chesshub.app', 'www.chesshub.app'],
    host: true,
    port: 9000
  },
  resolve: {
      alias: {
          '@': path.resolve(__dirname, "./src")
      }
  },
    allowedHosts: ['chesshub.app', 'www.chesshub.app']
})
