import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Maison Avenoir Honey | New Jersey Harvested. Beautifully Shared.',
  description: 'A premium New Jersey honey house: warm, editorial, traceable, and gift-first. Small-batch raw honey bottled with the story of the season still inside.',
  openGraph: {
    title: 'Maison Avenoir Honey | New Jersey Harvested. Beautifully Shared.',
    description: 'A premium New Jersey honey house: warm, editorial, traceable, and gift-first. Small-batch raw honey bottled with the story of the season still inside.',
    images: ['/images/hero-apiary-landscape.jpg'],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
