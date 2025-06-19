export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    ...(httpsConfig ? { https: httpsConfig } : {}), // ✅ Only add if httpsConfig is not false
    proxy: {
      '^/weatherforecast': {
        target,
        secure: false
      }
    }
  }
});
