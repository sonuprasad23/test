/** @type {import('tailwindcss').Config} */
// Use ESM syntax if package.json has "type": "module"
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Ensure it scans all relevant files
  ],
  darkMode: 'class', // Enable dark mode based on class ('dark') - ThemeProvider adds this
  theme: {
    extend: {
      // Add custom theme extensions here
      colors: {
        // Example custom colors (align with your design)
        'primary': {
            light: '#2dd4bf', // teal-400
            DEFAULT: '#14b8a6', // teal-500
            dark: '#0f766e' // teal-700
        },
        'secondary': {
            light: '#60a5fa', // blue-400
            DEFAULT: '#3b82f6', // blue-500
            dark: '#1d4ed8' // blue-700
        },
        'accent': {
             light: '#a78bfa', // violet-400
             DEFAULT: '#8b5cf6', // violet-500
             dark: '#6d28d9' // violet-700
        }
      },
      fontFamily: {
        // Example: Use Inter font if included via index.html or CSS
        // sans: ['Inter', 'ui-sans-serif', 'system-ui', /* other fallbacks */],
      },
      animation: { // Ensure animations used in components are defined
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'spin': 'spin 1s linear infinite', // Ensure spin is defined if used
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        // Ensure spin keyframes are defined if not relying on default Tailwind
        spin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // Uncomment if you need form styling plugin
  ],
}

// Use CJS syntax (module.exports) if package.json DOES NOT have "type": "module"
// module.exports = { ... }