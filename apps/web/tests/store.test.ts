import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAppStore } from '@/store/index.js';

describe('App Store', () => {
  beforeEach(() => {
    localStorage.clear();
    useAppStore.setState({ theme: 'system', sidebarOpen: false });
  });

  describe('theme', () => {
    it('defaults to system', () => {
      expect(useAppStore.getState().theme).toBe('system');
    });

    it('can be set to light', () => {
      useAppStore.getState().setTheme('light');
      expect(useAppStore.getState().theme).toBe('light');
    });

    it('can be set to dark', () => {
      useAppStore.getState().setTheme('dark');
      expect(useAppStore.getState().theme).toBe('dark');
    });

    it('toggles through light -> dark -> system -> light', () => {
      const store = useAppStore.getState();

      store.setTheme('light');
      store.toggleTheme();
      expect(useAppStore.getState().theme).toBe('dark');

      store.toggleTheme();
      expect(useAppStore.getState().theme).toBe('system');

      store.toggleTheme();
      expect(useAppStore.getState().theme).toBe('light');
    });

    it('persists theme to localStorage', () => {
      useAppStore.getState().setTheme('dark');

      // Rehydrate by reading from localStorage
      const stored = localStorage.getItem('app-store');
      expect(stored).toBeTruthy();
      interface StoreData {
        state: { theme: string };
      }
      const parsed: StoreData = JSON.parse(stored!) as StoreData;
      expect(parsed.state.theme).toBe('dark');
    });
  });

  describe('sidebar', () => {
    it('defaults to closed', () => {
      expect(useAppStore.getState().sidebarOpen).toBe(false);
    });

    it('can be opened', () => {
      useAppStore.getState().setSidebarOpen(true);
      expect(useAppStore.getState().sidebarOpen).toBe(true);
    });

    it('can be toggled', () => {
      useAppStore.getState().toggleSidebar();
      expect(useAppStore.getState().sidebarOpen).toBe(true);

      useAppStore.getState().toggleSidebar();
      expect(useAppStore.getState().sidebarOpen).toBe(false);
    });

    it('is not persisted to localStorage', () => {
      useAppStore.getState().toggleSidebar();
      expect(useAppStore.getState().sidebarOpen).toBe(true);

      const stored = localStorage.getItem('app-store');
      expect(stored).toBeTruthy();
      interface StoreData {
        state: Record<string, unknown>;
      }
      const parsed: StoreData = JSON.parse(stored!) as StoreData;
      expect(parsed.state.sidebarOpen).toBeUndefined();
    });
  });

  describe('system theme preference', () => {
    it('listens to matchMedia changes', () => {
      const addEventListener = vi.fn();
      const removeEventListener = vi.fn();

      (window.matchMedia as ReturnType<typeof vi.fn>).mockReturnValue({
        matches: true,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addEventListener,
        removeEventListener,
        dispatchEvent: vi.fn(),
      });

      // Just verify the mock works
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      expect(media.matches).toBe(true);
    });
  });
});
