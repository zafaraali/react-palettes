import js from '@eslint/js';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'node_modules/**', '.task-*'] },
  js.configs.recommended,
  {
    files: ['src/**/*.js', 'e2e/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
        process: 'readonly'
      },
      parserOptions: { ecmaFeatures: { jsx: true } }
    },
    plugins: { react, 'jsx-a11y': jsxA11y },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    },
    settings: { react: { version: 'detect' } }
  },
  { files: ['*.mjs'], languageOptions: { globals: globals.node } }
];
