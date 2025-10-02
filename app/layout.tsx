import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import SmoothScrolling from '@/components/SmoothScrolling';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DJ Rishi - Official Website',
  description: 'Experience the rhythm and explore the soundscapes crafted by DJ Rishi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}


