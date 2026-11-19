import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import RoutePreheater from '@/components/RoutePreheater';
import NavigationProgress from '@/components/NavigationProgress';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Singing Bee Wildflower Honey | Basking Ridge, NJ',
    template: '%s | Singing Bee Honey',
  },
  description:
    'Raw wildflower honey harvested from Madisonville Apiary in Basking Ridge, NJ. Single jars, 3-jar combos, holiday gift boxes, event favors, kids bottles, corporate glass gifting, and monthly subscriptions.',
  keywords: [
    'Singing Bee Wildflower Honey',
    'raw wildflower honey',
    'Basking Ridge NJ honey',
    'Madisonville Apiary',
    'holiday honey gift box',
    'wedding honey favors',
    'corporate honey gifting',
    'honey subscription',
  ],
  openGraph: {
    title: 'Singing Bee Wildflower Honey | Basking Ridge, NJ',
    description:
      'Pure, raw wildflower honey from Madisonville Apiary in Basking Ridge, NJ.',
    type: 'website',
    images: ['/media/brand/singing-bee-logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${fraunces.variable} antialiased`}
    >
      <body
        suppressHydrationWarning
        className="bg-white text-stone-900 font-sans flex flex-col min-h-screen"
      >
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <RoutePreheater />
        <CartProvider>
          <TopBanner />
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
