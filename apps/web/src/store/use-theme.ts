import { useEffect } from 'react';
import { useAppStore } from './index.js';

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useThemeEffect(): void {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    const resolved = theme === 'system' ? getSystemTheme() : theme;
    const root = document.documentElement;

    if (resolved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (useAppStore.getState().theme === 'system') {
        const resolved = getSystemTheme();
        const root = document.documentElement;
        if (resolved === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);
}

export function useResolvedTheme(): 'light' | 'dark' {
  const theme = useAppStore((state) => state.theme);
  return theme === 'system' ? getSystemTheme() : theme;
}
