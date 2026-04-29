import tseslint from 'typescript-eslint';
import pluginN from 'eslint-plugin-n';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import vitestPlugin from '@vitest/eslint-plugin';

export const eslintConfigBase = tseslint.config(
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  }
);

export const eslintConfigNode = tseslint.config(
  ...eslintConfigBase,
  pluginN.configs['flat/recommended'],
  {
    rules: {
      'n/no-process-exit': 'off',
    },
  }
);

export const eslintConfigReact = tseslint.config(
  ...eslintConfigBase,
  pluginReact.configs.flat!.recommended,
  {
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: {
      'react/react-in-jsx-runtime': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  }
);

export const eslintConfigVitest = tseslint.config({
  files: ['**/*.test.ts', '**/*.test.tsx'],
  plugins: { vitest: vitestPlugin },
  rules: {
    'vitest/expect-expect': 'warn',
    'vitest/no-identical-title': 'error',
  },
});
