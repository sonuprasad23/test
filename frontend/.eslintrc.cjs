module.exports = {
    root: true,
    env: { browser: true, es2020: true, node: true }, // Added node env for config files
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended', // Use recommended TS rules
      // Consider adding stricter TS rules if desired: 'plugin:@typescript-eslint/recommended-requiring-type-checking'
      'plugin:react/recommended', // Use recommended React rules
      'plugin:react/jsx-runtime', // Use new JSX transform rules
      'plugin:react-hooks/recommended', // Enforce Rules of Hooks
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'postcss.config.js', 'tailwind.config.js'], // Ignore build output and config files
    parser: '@typescript-eslint/parser',
    // If using stricter TS rules, specify project path:
    // parserOptions: {
    //   ecmaVersion: 'latest',
    //   sourceType: 'module',
    //   project: ['./tsconfig.json', './tsconfig.node.json'],
    //   tsconfigRootDir: __dirname,
    // },
    plugins: ['react-refresh'], // Vite plugin for HMR
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Add or customize rules here
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn on unused vars, allow underscore prefix
      'react/prop-types': 'off', // Disable prop-types as we use TypeScript
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Allow console.warn and console.error
    },
  }