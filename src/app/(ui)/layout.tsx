import NavMenu from '../../components/HomePage/NavMenu';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '../../components/HomePage/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ecoblocks',
  description: 'ecoblocks is a platform for recycling.',
  manifest: `/site.webmanifest.json`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavMenu />
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
