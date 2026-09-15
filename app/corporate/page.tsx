import type { Metadata } from 'next';
import CorporateClient from './CorporateClient';

export const metadata: Metadata = {
  title: 'Heirloom Presentation Trunks & Corporate Concierge',
  description: 'Cabinet-grade American walnut and birdseye maple trunks, solid C360 architectural brass plaques engraved with your insignia, and white-glove individual recipient dispatch.',
  openGraph: {
    title: 'Heirloom Presentation Trunks & Corporate Concierge | Avenoir Apiary',
    description: 'Bespoke corporate gifting, volume tier savings, and custom engraved brass plaques for discerning enterprises.',
    images: ['/images/banner-corporate-trunks.jpg'],
  },
};

export default function CorporatePage() {
  return <CorporateClient />;
}
