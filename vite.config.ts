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
  preview: {
    host: true,
    port: 9000
  },
  resolve: {
      alias: {
          '@': path.resolve(__dirname, "./src")
      }
  }
})
