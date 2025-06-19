import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: Object.assign({
    port: 5173,
    proxy: {
      '^/weatherforecast': {
        target: 'https://localhost:7239',
        secure: false
      }
    }
  }, process.env.CI ? {} : { https: false }) // ✅ Conditionally attach `https: false` only if not in CI
})
