import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

export const metadata: Metadata = {
  title: 'Vishnu Priyan — Creative Developer & Designer',
  description: 'Computer Science student building ML systems, full-stack apps, and premium digital experiences. Based in Chennai, India.',
  metadataBase: new URL('https://vishnupriyan.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vishnu Priyan — Creative Developer & Designer',
    description: 'Computer Science student building ML systems, full-stack apps, and premium digital experiences. Based in Chennai, India.',
    url: 'https://vishnupriyan.dev',
    siteName: 'Vishnu Priyan Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishnu Priyan — Creative Developer & Designer',
    description: 'Computer Science student building ML systems, full-stack apps, and premium digital experiences. Based in Chennai, India.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <body className="bg-background text-text-primary antialiased font-body selection:bg-accent-violet/30 selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="vishnu-portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
