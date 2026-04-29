import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button.js';
import { useAppStore } from '@/store/index.js';
import { useResolvedTheme } from '@/store/use-theme.js';

export function ThemeToggle() {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const resolved = useResolvedTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={`Theme: ${theme} (${resolved})`}
      aria-label={`Current theme: ${theme}. Click to toggle.`}
    >
      {resolved === 'light' ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      {theme === 'system' && <Monitor className="absolute h-3 w-3 opacity-50" />}
    </Button>
  );
}
