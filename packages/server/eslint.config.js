import { eslintConfigNode, eslintConfigVitest } from '@repo/eslint-config';

export default [
  ...eslintConfigNode,
  ...eslintConfigVitest,
  {
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
      'n/no-missing-import': 'off',
      '@typescript-eslint/require-await': 'off',
    },
  },
];
