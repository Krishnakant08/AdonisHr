export default defineConfig({
  plugins: [react()],
  base: './', // ← ✅ This is the fix
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath)
    },
    proxy: {
      '^/weatherforecast': {
        target,
        secure: false
      }
    }
  }
})
