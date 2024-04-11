import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      Routes: fileURLToPath(new URL('/src/app/router/Routes.ts', import.meta.url))
    }
  },
})
