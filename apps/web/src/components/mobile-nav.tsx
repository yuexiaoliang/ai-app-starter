import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { Button } from '@/components/ui/button.js';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet.js';
import { ThemeToggle } from './theme-toggle.js';
import { APP_NAME } from '@repo/config';
import { useAppStore } from '@/store/index.js';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/settings', label: 'Settings' },
];

export function MobileNav() {
  const location = useLocation();
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px]">
        <SheetHeader>
          <SheetTitle>{APP_NAME}</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
