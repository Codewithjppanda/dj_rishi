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
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DJ Rishi',
  },
  applicationName: 'DJ Rishi Music',
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E63946',
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icons/icon-192x192.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DJ Rishi" />
      </head>
      <body className={poppins.className}>
        <SmoothScrolling>{children}</SmoothScrolling>
       {/* <AudioPlayer /> */}
      </body>
    </html>
  );
}


