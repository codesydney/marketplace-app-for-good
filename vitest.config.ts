import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
