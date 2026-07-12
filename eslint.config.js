import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  js.configs.recommended,

  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      import: importPlugin,
    },

    rules: {
      // Possible Problems
      'no-unused-vars': 'warn',
      'no-console': 'off',

      // Best Practices
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],

      // Imports
      'import/no-duplicates': 'error',
      'import/order': [
        'warn',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  },

  eslintConfigPrettier,
];
