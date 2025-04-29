import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
  plugins: [swc.vite(), react()],
})
