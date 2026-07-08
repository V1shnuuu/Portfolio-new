import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { LayoutProvider } from '@/components/layout/LayoutProvider';
import { LazyMotion, domAnimation } from 'framer-motion';
import { VercelAnalytics } from '@/components/layout/Analytics';

export const metadata: Metadata = {
  title: 'Vishnu Priyan — Creative Developer & ML Engineer',
  description: 'Computer Science student at Chennai Institute of Technology building ML systems, full-stack apps, and premium digital experiences. Hackathon finalist. UI/UX designer. Based in Chennai, India.',
  keywords: ['Vishnu Priyan', 'Creative Developer', 'Machine Learning', 'UI UX Designer', 'React Developer', 'Chennai', 'Portfolio', 'TensorFlow', 'Full Stack', 'CIT Chennai', 'Verix AI', 'AI Chatbot', 'Voice Agent', 'Workflow Automation'],
  authors: [{ name: 'B Vishnu Priyan', url: 'https://vishnupriyan.dev' }],
  creator: 'B Vishnu Priyan',
  metadataBase: new URL('https://vishnupriyan.dev'),
  icons: {
    icon: '/favicon.svg',
  },
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

import BackgroundElements from '@/components/layout/BackgroundElements';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light font-body" style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <body className="bg-background text-text-primary antialiased selection:bg-accent-violet/30 selection:text-text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="vishnu-portfolio-theme"
        >
          <BackgroundElements />
          <LenisProvider>
            <LazyMotion features={domAnimation}>
              <LayoutProvider>
                {children}
                <VercelAnalytics />
              </LayoutProvider>
            </LazyMotion>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
