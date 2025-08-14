import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.ts', 'post-bundle.js', 'eslint.config.js'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    plugins: {
      perfectionist,
      prettier: prettierPlugin, // Add Prettier plugin here
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: true,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',

      'perfectionist/sort-imports': [
        'error',
        {
          order: 'asc',
          type: 'line-length',
        },
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          order: 'asc',
          type: 'line-length',
        },
      ],
      'perfectionist/sort-classes': [
        'error',
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          singleQuote: true,
          endOfLine: 'auto',
          jsxSingleQuote: false,
          bracketSameLine: false,
        },
      ],
    },
  },
);
