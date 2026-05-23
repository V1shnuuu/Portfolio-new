import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { LayoutProvider } from '@/components/layout/LayoutProvider';
import { LazyMotion, domAnimation } from 'framer-motion';

export const metadata: Metadata = {
  title: 'Vishnu Priyan — Creative Developer & ML Engineer',
  description: 'Computer Science student at Chennai Institute of Technology building ML systems, full-stack apps, and premium digital experiences. Hackathon finalist. UI/UX designer. Based in Chennai, India.',
  keywords: ['Vishnu Priyan', 'Creative Developer', 'Machine Learning', 'UI UX Designer', 'React Developer', 'Chennai', 'Portfolio', 'TensorFlow', 'Full Stack', 'CIT Chennai'],
  authors: [{ name: 'B Vishnu Priyan', url: 'https://vishnupriyan.dev' }],
  creator: 'B Vishnu Priyan',
  metadataBase: new URL('https://vishnupriyan.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vishnupriyan.dev',
    title: 'Vishnu Priyan — Creative Developer & ML Engineer',
    description: 'Building at the intersection of code, design, and machine intelligence.',
    siteName: 'Vishnu Priyan Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Vishnu Priyan Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishnu Priyan — Creative Developer & ML Engineer',
    description: 'Building at the intersection of code, design, and machine intelligence.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark font-body" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <body className="bg-background text-text-primary antialiased selection:bg-accent-violet/30 selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="vishnu-portfolio-theme"
        >
          <LenisProvider>
            <LazyMotion features={domAnimation}>
              <LayoutProvider>
                {children}
              </LayoutProvider>
            </LazyMotion>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
