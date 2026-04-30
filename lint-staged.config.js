export default {
  'apps/**/src/*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  'packages/**/src/*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.{ts,tsx,js,jsx,json,yaml,yml,md}': ['prettier --write'],
  '!.claude/skills/**': [],
};
