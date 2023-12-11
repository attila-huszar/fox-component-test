module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'promise', 'regexp', 'react-refresh'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:regexp/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'build', '.eslint*'],
  rules: {
    'import/prefer-default-export': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
