'use client';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return (
    <button aria-label="Toggle theme" onClick={() => setDark(!dark)} className="p-2 rounded">
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
