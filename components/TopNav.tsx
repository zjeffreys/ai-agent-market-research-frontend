'use client';
import Link from 'next/link';
import BrandLogo from './BrandLogo';
import ThemeToggle from './ThemeToggle';

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-dark-900">
      <Link href="/" className="flex items-center gap-2">
        <BrandLogo />
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link href="/pricing">Pricing</Link>
        <Link href="/demo/demo">Demo</Link>
        <Link href="/console/dashboard">Console</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
