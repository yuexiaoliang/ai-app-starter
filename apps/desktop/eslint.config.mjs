import { eslintConfigNode } from '@repo/eslint-config';

export default [
  ...eslintConfigNode,
  {
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
      'n/no-extraneous-import': ['error', { allowModules: ['@playwright/test'] }],
    },
  },
];
