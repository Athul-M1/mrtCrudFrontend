import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '../components/ui/sonner';
import { NavigationBar } from '@/components/navigation-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'User Management App',
  description: 'A Next.js CRUD application with Go backend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar />
        <main className="container mx-auto pt-24 pb-12 px-4 min-h-screen">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}