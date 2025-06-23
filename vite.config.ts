import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    server: isDev
      ? {
          https: true, // only for dev
          port: 3000,
        }
      : {},
    build: {
      outDir: 'dist',
    },
    // other shared config
  };
});
