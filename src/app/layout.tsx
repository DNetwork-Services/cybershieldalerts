import type { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - ${SITE_DESCRIPTION}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['cybersecurity', 'hacking', 'data breach', 'malware', 'ransomware', 'AI security', 'vulnerability', 'CVE'],
  authors: [{ name: 'CyberShield Alerts' }],
  creator: 'CyberShield Alerts',
  publisher: 'CyberShield Alerts',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
    creator: '@cybershieldalerts',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen bg-cyber-black">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
