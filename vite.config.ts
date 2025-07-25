import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'
import path from 'path'
import child_process from 'child_process'
import { env } from 'process'

const isCI = process.env.CI === 'true'

let httpsConfig: false | { key: Buffer; cert: Buffer } = false

if (!isCI) {
  const baseFolder = env.APPDATA
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`

  const certificateName = 'adonishr.client'
  const certFilePath = path.join(baseFolder, `${certificateName}.pem`)
  const keyFilePath = path.join(baseFolder, `${certificateName}.key`)

  // Create cert if missing
  if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    const result = child_process.spawnSync('dotnet', [
      'dev-certs',
      'https',
      '--export-path',
      certFilePath,
      '--format',
      'Pem',
      '--no-password'
    ], { stdio: 'inherit' })

    if (result.status !== 0) {
      throw new Error('Could not create certificate.')
    }
  }

  httpsConfig = {
    key: fs.readFileSync(keyFilePath),
    cert: fs.readFileSync(certFilePath)
  }
}

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(';')[0]
    : 'https://localhost:7239'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    ...(httpsConfig ? { https: httpsConfig } : {}),
    proxy: {
      '^/weatherforecast': {
        target,
        secure: false
      }
    }
  }
})
