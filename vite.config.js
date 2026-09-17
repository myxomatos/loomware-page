import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Expose the dev server on the local network so the site can be
    // previewed from a phone or tablet on the same Wi-Fi.
    host: true,
  },
})
