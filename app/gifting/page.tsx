import { Metadata } from 'next';
import GiftingClient from './GiftingClient';

export const metadata: Metadata = {
  title: 'Build Your Own Honey Box & Curated Gift Sets | Maison Avenoir',
  description: 'Design a bespoke artisan honey gift box or shop pre-made luxury bundles. Mix & match raw varietals, whipped creamed honeys, and botanical infusions with custom calligraphy notes.',
  openGraph: {
    title: 'Build Your Own Honey Box & Curated Gift Sets | Maison Avenoir',
    description: 'Design a bespoke artisan honey gift box or shop pre-made luxury bundles with custom wax-sealed calligraphy notes.',
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200'],
  }
};

export default function GiftingPage() {
  return <GiftingClient />;
}
