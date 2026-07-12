import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Honor a PORT env var when provided (e.g. by the preview harness) so the
  // dev server lands on the expected port; fall back to Vite's default 5173.
  server: {
    port: Number(process.env.PORT) || 5173,
  },
})
