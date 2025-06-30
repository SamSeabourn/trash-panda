import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['dist']
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      perfectionist,
      prettier: prettierPlugin, // Add Prettier plugin here
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'line-length',
          order: 'asc',
        },
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'line-length',
          order: 'asc',
        },
      ],
      'perfectionist/sort-classes': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
        },
      ],
      
      // Move Prettier rule to this config object since we're defining the plugin here
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          singleQuote: true,
          jsxSingleQuote: false,
          bracketSameLine: false,
          endOfLine: 'auto',
        },
      ],
    },
  }
);