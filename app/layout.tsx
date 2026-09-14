import type {Metadata} from 'next';
import { Suspense } from 'react';
import { DM_Sans, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AdminProvider } from '@/context/AdminContext';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import RoutePreheater from '@/components/RoutePreheater';
import NavigationProgress from '@/components/NavigationProgress';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Avenoir Luxury Gifting',
  description: 'Definitive luxury raw honey e-commerce atelier, bespoke personalized gift vaults, corporate concierge, and full-featured operations admin management atelier.',
  openGraph: {
    title: 'Avenoir Luxury Gifting',
    description: 'Definitive luxury raw honey e-commerce atelier, bespoke personalized gift vaults, corporate concierge, and full-featured operations admin management atelier.',
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased`}>
      <body suppressHydrationWarning className="bg-[#F8FAF9] text-slate-900 font-sans flex flex-col min-h-screen">
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <RoutePreheater />
        <CartProvider>
          <AdminProvider>
            <TopBanner />
            <Navbar />
            <CartDrawer />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </AdminProvider>
        </CartProvider>
      </body>
    </html>
  );
}


