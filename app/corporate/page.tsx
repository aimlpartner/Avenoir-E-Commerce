import type { Metadata } from 'next';
import CorporateClient from './CorporateClient';

export const metadata: Metadata = {
  title: 'Heirloom Presentation Trunks & Corporate Concierge',
  description: 'Cabinet-grade American walnut and birdseye maple trunks, solid C360 architectural brass plaques engraved with your insignia, and white-glove individual recipient dispatch.',
  openGraph: {
    title: 'Heirloom Presentation Trunks & Corporate Concierge | Singing Bee Honey',
    description: 'Bespoke corporate gifting, volume tier savings, and custom engraved brass plaques for discerning enterprises.',
    images: ['/media/brand/singing-bee-logo.png'],
  },
};

export default function CorporatePage() {
  return <CorporateClient />;
}
