module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // Consider adding if you want stricter type checks (requires parserOptions.project)
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // For new JSX Transform
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
      'dist',
      '.eslintrc.cjs',
      'vite.config.ts',
      'postcss.config.js',
      'tailwind.config.js',
      'node_modules' // Explicitly ignore node_modules
    ],
  parser: '@typescript-eslint/parser',
  // Uncomment and configure if using stricter TS rules:
  // parserOptions: {
  //   ecmaVersion: 'latest',
  //   sourceType: 'module',
  //   project: ['./tsconfig.json', './tsconfig.node.json'],
  //   tsconfigRootDir: __dirname,
  // },
  plugins: ['react-refresh'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Custom rules:
    'react/prop-types': 'off', // Using TypeScript for types
    '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_', // Allow unused vars/args starting with _
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
     }],
     // Allow console logs during development, but maybe warn/error in production build
     'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
     'react/no-unescaped-entities': 'off', // Allow apostrophes etc. directly in JSX text
  },
}