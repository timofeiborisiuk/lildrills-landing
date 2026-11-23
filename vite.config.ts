import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        partners: fileURLToPath(new URL('./partners-investors/index.html', import.meta.url)),
        support: fileURLToPath(new URL('./support/index.html', import.meta.url)),
        terms: fileURLToPath(new URL('./terms/index.html', import.meta.url)),
        privacy: fileURLToPath(new URL('./privacy-policy/index.html', import.meta.url)),
        cookies: fileURLToPath(new URL('./cookie-policy/index.html', import.meta.url)),
        notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
      },
    },
  },
})
