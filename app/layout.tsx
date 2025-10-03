import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import SmoothScrolling from '@/components/SmoothScrolling';
import AudioPlayer from '@/components/AudioPlayer';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: 'DJ Rishi - Official Website',
  description: 'Experience the rhythm and explore the soundscapes crafted by DJ Rishi',
  keywords: ['DJ Rishi', 'DJ', 'Music', 'Electronic Music', 'EDM', 'Performances'],
  authors: [{ name: 'DJ Rishi' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E63946',
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
        <AudioPlayer />
      </body>
    </html>
  );
}


