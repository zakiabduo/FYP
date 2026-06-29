import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174
  },
  build: {
    rollupOptions: {
      // Vercel ko socket.io-client ka error dene se roknay ke liye
      external: ['socket.io-client']
    }
  }
})