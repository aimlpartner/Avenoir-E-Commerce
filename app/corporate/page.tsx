import type { Metadata } from 'next';
import CorporateClient from './CorporateClient';

export const metadata: Metadata = {
  title: 'Personalized Corporate Gifting (Glass Bottles & Jars)',
  description:
    'Custom-labeled raw wildflower honey in glass bottles and glass jars for client appreciation, team milestones, and corporate holiday gifts.',
  openGraph: {
    title: 'Personalized Corporate Gifting | Singing Bee Honey',
    description:
      'Personalized glass honey bottles and jars with your company name and message from Madisonville Apiary, Basking Ridge, NJ.',
    images: ['/media/brand/singing-bee-logo.png'],
  },
};

export default function CorporatePage() {
  return <CorporateClient />;
}
