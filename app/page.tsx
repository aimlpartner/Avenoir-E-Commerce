import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Singing Bee Wildflower Honey | New Jersey Harvested. Raw & Unfiltered.',
  description: 'Small-batch raw wildflower honey harvested by hand in Sussex County, New Jersey and bottled unheated with full apiary provenance.',
  openGraph: {
    title: 'Singing Bee Wildflower Honey | New Jersey Harvested. Raw & Unfiltered.',
    description: 'Small-batch raw wildflower honey harvested by hand in Sussex County, New Jersey.',
    images: ['/media/brand/singing-bee-logo.png'],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
