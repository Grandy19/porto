import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { MotionProvider } from '@/components/ui/motion-provider';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { Navbar } from '@/components/layout/navbar';
import { Preloader } from '@/components/ui/preloader';
import { Footer } from '@/components/layout/footer';
import { Analytics } from '@vercel/analytics/react';
import { siteConfig } from '@/constants/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/logo.png', sizes: 'any', type: 'image/png' }],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} bg-background text-foreground min-h-screen font-sans antialiased selection:bg-zinc-800 selection:text-zinc-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionProvider>
            <Preloader />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <div className="relative flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Analytics />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
