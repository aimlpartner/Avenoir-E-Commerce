import { Metadata } from 'next';
import GiftingClient from './GiftingClient';

export const metadata: Metadata = {
  title: 'Build Your Own Honey Box & Curated Gift Sets | Singing Bee Honey',
  description: 'Design a bespoke artisan honey gift box or shop pre-made luxury bundles. Mix & match raw varietals, whipped creamed honeys, and botanical infusions with custom calligraphy notes.',
  openGraph: {
    title: 'Build Your Own Honey Box & Curated Gift Sets | Singing Bee Honey',
    description: 'Design a bespoke artisan honey gift box or shop pre-made luxury bundles with custom wax-sealed calligraphy notes.',
    images: ['/media/brand/singing-bee-logo.png'],
  }
};

export default function GiftingPage() {
  return <GiftingClient />;
}
