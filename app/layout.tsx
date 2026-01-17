import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SafeguardAI',
  description: 'The seatbelt for enterprise AI.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-900 text-dark-50`}> 
        <TopNav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
