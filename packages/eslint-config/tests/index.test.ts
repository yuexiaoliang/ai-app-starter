import { describe, it, expect } from 'vitest';
import {
  eslintConfigBase,
  eslintConfigNode,
  eslintConfigReact,
  eslintConfigVitest,
} from '../src/index.js';

describe('eslint-config exports', () => {
  it('eslintConfigBase is a non-empty array', () => {
    expect(Array.isArray(eslintConfigBase)).toBe(true);
    expect(eslintConfigBase.length).toBeGreaterThan(0);
  });

  it('eslintConfigNode extends base', () => {
    expect(Array.isArray(eslintConfigNode)).toBe(true);
    expect(eslintConfigNode.length).toBeGreaterThan(eslintConfigBase.length);
  });

  it('eslintConfigReact extends base', () => {
    expect(Array.isArray(eslintConfigReact)).toBe(true);
    expect(eslintConfigReact.length).toBeGreaterThan(eslintConfigBase.length);
  });

  it('eslintConfigVitest is scoped to test files', () => {
    expect(Array.isArray(eslintConfigVitest)).toBe(true);
    const vitestEntry = eslintConfigVitest.find((c) => c && typeof c === 'object' && 'files' in c);
    expect(vitestEntry).toBeDefined();
    expect(vitestEntry!.files).toContain('**/*.test.ts');
  });
});
