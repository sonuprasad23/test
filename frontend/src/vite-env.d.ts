/// <reference types="vite/client" />

// Define type for environment variables accessed via import.meta.env
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL?: string // Mark as optional if default is provided
    // Add other VITE_ variables here if you use them
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }