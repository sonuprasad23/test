import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default Vite port, ensure it's different from backend
    strictPort: true, // Optional: Fail if port is already in use
  }
})