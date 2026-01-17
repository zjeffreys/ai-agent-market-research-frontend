import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-dark-700 px-6 py-8 text-sm text-dark-400">
      <div className="flex justify-between">
        <span>© 2025 SafeguardAI</span>
        <div className="flex gap-4">
          <Link href="/security">Security</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/trust">Trust</Link>
        </div>
      </div>
    </footer>
  );
}
