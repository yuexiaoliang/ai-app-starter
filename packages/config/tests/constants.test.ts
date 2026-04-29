import { describe, it, expect } from 'vitest';
import {
  DEFAULT_SERVER_PORT,
  DEFAULT_WEB_PORT,
  DEFAULT_API_BASE_URL,
  APP_NAME,
  APP_VERSION,
} from '../src/constants.js';

describe('Constants', () => {
  it('has correct default server port', () => {
    expect(DEFAULT_SERVER_PORT).toBe(13001);
  });

  it('has correct default web port', () => {
    expect(DEFAULT_WEB_PORT).toBe(13002);
  });

  it('has correct default API base URL', () => {
    expect(DEFAULT_API_BASE_URL).toBe('http://localhost:13001');
  });

  it('has correct app name', () => {
    expect(APP_NAME).toBe('ai-app-starter');
  });

  it('has correct app version', () => {
    expect(APP_VERSION).toBe('1.0.0');
  });
});
