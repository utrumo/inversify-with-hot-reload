'use strict';

const path = require('path');

const Severity = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
};

const rules = {
  /* owerride rule  from eslint-config-airbnb-base/rules/style.js to allow for of */
  'no-restricted-syntax': [
    Severity.ERROR,
    {
      selector: 'ForInStatement',
      message:
        'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
    },
    // {
    //   selector: 'ForOfStatement',
    //   message:
    //     'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
    // },
    {
      selector: 'LabeledStatement',
      message:
        'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
    },
    {
      selector: 'WithStatement',
      message:
        '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
    },
  ],
  /* owerride rule  from eslint-config-airbnb-base/rules/style.js to allow for of */
  'sort-imports': [Severity.ERROR, { ignoreDeclarationSort: true }],
  'import/order': [
    Severity.ERROR,
    {
      alphabetize: { order: 'asc' },
      'newlines-between': 'never',
      groups: ['unknown', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    },
  ],
  strict: [Severity.ERROR, 'safe'],
  '@typescript-eslint/no-unused-vars': [
    Severity.ERROR,
    { args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
  ],
  '@typescript-eslint/naming-convention': [
    Severity.ERROR,
    {
      selector: 'variable',
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      leadingUnderscore: 'allow',
    },
  ],
  'no-underscore-dangle': [Severity.OFF],
  'no-console': [Severity.OFF],
  'lines-between-class-members': [Severity.ERROR, 'always', { exceptAfterSingleLine: true }],
  'class-methods-use-this': [Severity.OFF],
  'import/prefer-default-export': [Severity.OFF],
};

module.exports = {
  root: true,
  env: { browser: false, node: true },
  extends: [
    'eslint:recommended',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  parserOptions: {
    sourceType: 'script',
    project: path.resolve(__dirname, './tsconfig.eslint.json'),
    ecmaVersion: 2020,
  },
  settings: {
    'import/resolver': {
      typescript: null, // for correct resolving typescript files
    },
  },
  rules,
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        ecmaVersion: 2020,
      },
      extends: [
        'eslint:recommended',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
      ],
      rules,
    },
  ],
};
