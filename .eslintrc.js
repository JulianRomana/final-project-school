module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: false,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      arrowFunctions: true,
    },
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'off',
  },
}
