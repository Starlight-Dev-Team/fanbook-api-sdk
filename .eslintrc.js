/* eslint-disable quote-props */

const process = require('process');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: 'standard-with-typescript',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': [2, 'only-multiline'],
    '@typescript-eslint/comma-dangle': [2, 'always-multiline'],
    'curly': [2, 'multi-line'],
    'no-debugger': process.env.NODE_ENV === 'production' ? ['error'] : ['off'],
    'quotes': [2, 'single'],
    'semi': [2, 'always'],
    '@typescript-eslint/semi': [2, 'always'],
  }
};
