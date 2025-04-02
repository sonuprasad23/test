// frontend/postcss.config.js
// Use ESM syntax (export default) if package.json has "type": "module"
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Add other PostCSS plugins here if needed
  },
}

// Use CJS syntax (module.exports) if package.json DOES NOT have "type": "module"
// module.exports = {
//  plugins: {
//    tailwindcss: {},
//    autoprefixer: {},
//  },
// }