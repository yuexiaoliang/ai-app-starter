import { Link, useLocation } from 'react-router';
import { ThemeToggle } from './theme-toggle.js';
import { MobileNav } from './mobile-nav.js';
import { APP_NAME } from '@repo/config';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/providers', label: 'Providers' },
  { to: '/settings', label: 'Settings' },
];

export function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center px-4">
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link to="/" className="text-lg font-semibold tracking-tight">
            {APP_NAME}
          </Link>
        </div>

        <nav className="mx-6 hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
