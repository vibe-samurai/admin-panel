import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  js.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
        JSX: 'readonly',
      },
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...ts.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-undef': 'off',

      ...reactPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-vars': 'error',
      'react/button-has-type': 'error',
      'react/display-name': 'off',
      'react/jsx-boolean-value': ['error'],
      'react/jsx-curly-spacing': ['error', 'always'],
      'react/jsx-curly-brace-presence': [
        'error',
        { children: 'ignore', propElementValues: 'always', props: 'always' },
      ],
      'react/jsx-fragments': ['error'],
      'react/void-dom-elements-no-children': ['error'],
      'object-curly-spacing': ['error', 'always'],
    },
  },

  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/extensions': [
        'error',
        {
          pattern: {
            ts: 'never',
            tsx: 'never',
            js: 'never',
            jsx: 'never',
            css: 'always',
            json: 'always',
            scss: 'always',
            svg: 'always',
          },
        },
      ],
      'import/no-duplicates': [
        'error',
        {
          considerQueryString: true,
          'prefer-inline': false
        }
      ],
      'import/no-default-export': 'off',
      'import/no-anonymous-default-export': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'type',
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'index',
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '*.module.scss',
              group: 'object',
              position: 'after',
            },
            {
              pattern: '*.scss',
              group: 'object',
              position: 'after',
            },
          ],
        },
      ],
      'import/prefer-default-export': 'off',
    },
  },

  {
    rules: {
      'no-duplicate-imports': 'off',
      'arrow-parens': 'off',
      'consistent-return': 'off',
      curly: ['error', 'all'],
      'max-lines': ['error', { max: 350, skipComments: true }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'off',
      'no-empty-pattern': 'off',
      'no-nested-ternary': 'error',
      'no-undef': 'warn',
      'no-unused-vars': 'off',
      'no-var': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
        {
          blankLine: 'always',
          next: 'return',
          prev: ['if', 'for', 'while', 'switch', 'try'],
        },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var'],
        },
      ],
      'prefer-const': 'error',
    },
  },

  prettierConfig,
];