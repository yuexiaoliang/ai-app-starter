import { eslintConfigReact, eslintConfigVitest } from '@repo/eslint-config';

export default [
  ...eslintConfigReact,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  ...eslintConfigVitest,
];
