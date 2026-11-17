import type {Metadata} from 'next';
import { Suspense } from 'react';
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AdminProvider } from '@/context/AdminContext';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import RoutePreheater from '@/components/RoutePreheater';
import NavigationProgress from '@/components/NavigationProgress';
import FirstOrderValueModal from '@/components/FirstOrderValueModal';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Singing Bee Wildflower Honey | New Jersey Harvested. Raw & Unfiltered.',
    template: '%s | Singing Bee Honey',
  },
  description: 'Singing Bee Wildflower Honey: warm, traceable, small-batch raw honey harvested by hand in Sussex County, New Jersey and bottled with the story of the season still inside.',
  keywords: ['Singing Bee', 'Singing Bee Wildflower Honey', 'raw honey', 'New Jersey honey', 'artisan honey', 'honey gift boxes', 'corporate gifting'],
  openGraph: {
    title: 'Singing Bee Wildflower Honey | New Jersey Harvested. Raw & Unfiltered.',
    description: 'Small-batch raw wildflower honey harvested in Sussex County, New Jersey—tended by real apiarists and bottled raw.',
    type: 'website',
    images: ['/media/brand/singing-bee-logo.png'],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${fraunces.variable} ${jetbrainsMono.variable} antialiased`}>
      <body suppressHydrationWarning className="bg-white text-stone-900 font-sans flex flex-col min-h-screen">
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <RoutePreheater />
        <CartProvider>
          <AdminProvider>
            <TopBanner />
            <Navbar />
            <CartDrawer />
            <FirstOrderValueModal />
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


