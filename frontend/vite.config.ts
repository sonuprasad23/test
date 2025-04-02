import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Import path for aliases

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Or your preferred port
    strictPort: true,
  },
  resolve: { // Optional: Add aliases for cleaner imports
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: { // Optional: Configure build output
    outDir: 'dist',
  }
})