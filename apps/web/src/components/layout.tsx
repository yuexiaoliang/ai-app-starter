import { Navbar } from './navbar.js';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
