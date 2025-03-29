/** @type {import('tailwindcss').Config} */
// Use ESM syntax if type: "module" in package.json
export default {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}', // Scan all relevant files in src
    ],
    theme: {
      extend: {
         // Add custom theme extensions here if needed
         // Example:
         // colors: {
         //   'brand-emerald': '#10b981',
         // },
         // fontFamily: {
         //   sans: ['Inter', 'sans-serif'], // Example custom font
         // },
         animation: { // Add animation definition if used
           'fade-in': 'fadeIn 0.5s ease-out forwards',
         },
         keyframes: { // Add keyframes definition if used
           fadeIn: {
             'from': { opacity: '0', transform: 'translateY(10px)' },
             'to': { opacity: '1', transform: 'translateY(0)' },
           }
         }
      },
    },
    plugins: [
      // Add any Tailwind plugins here
      // require('@tailwindcss/forms'), // Example
    ],
  }