import type { Metadata } from 'next';
import GiftingClient from './GiftingClient';

export const metadata: Metadata = {
  title: 'Holiday Gift Boxes & Event Favors',
  description:
    'Shop Singing Bee Holiday Special Gift Boxes (Christmas, Thanksgiving, New Year) and custom-tagged Favor Gifts for weddings, parties, and events.',
  openGraph: {
    title: 'Holiday Gift Boxes & Event Favors | Singing Bee Honey',
    description:
      'Holiday honey gift boxes for Christmas, Thanksgiving, and New Year plus mini honey favor jars for weddings and parties.',
    images: ['/media/brand/singing-bee-logo.png'],
  },
};

export default function GiftingPage() {
  return <GiftingClient />;
}
