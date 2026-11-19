import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Singing Bee Wildflower Honey | Basking Ridge, NJ',
  description:
    'Raw wildflower honey from Madisonville Apiary in Basking Ridge, NJ. Shop 1/2 lb & 1 lb jars, 3-jar combos, holiday gift boxes, event favors, kids bottles, corporate glass jars, and monthly subscriptions.',
  openGraph: {
    title: 'Singing Bee Wildflower Honey | Basking Ridge, NJ',
    description: 'Raw wildflower honey straight from our hives in Basking Ridge, NJ.',
    images: ['/media/brand/singing-bee-logo.png'],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
