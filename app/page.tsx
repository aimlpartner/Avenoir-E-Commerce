import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Artisanal Sussex Apiary, Raw Honey & Bespoke Gifting',
  description: '100% cold-spun raw unheated honeys from protected Sussex County apiaries along the Kittatinny Ridge, field-tested commercial beekeeping supplies, and handcrafted corporate presentation trunks.',
  openGraph: {
    title: 'Avenoir | Artisanal Sussex Apiary, Raw Honey & Bespoke Gifting',
    description: 'Cold-spun raw honeys, commercial beekeeping gear, and heirloom corporate presentation trunks.',
    images: ['/images/hero-apiary-landscape.jpg'],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
