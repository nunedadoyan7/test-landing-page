/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { produceCategoriesPlugin } from './src/api/produceCategoriesPlugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), produceCategoriesPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
