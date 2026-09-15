import type { Metadata } from 'next';
import BeekeepingServicesClient from './BeekeepingServicesClient';

export const metadata: Metadata = {
  title: 'Private Estate Beekeeping & Apiary Management Services',
  description: 'Turnkey beehive installation, seasonal apiary management, and custom private honey harvest bottling for luxury estates and country properties across Sussex County.',
  keywords: [
    'estate beekeeping services',
    'private apiary management',
    'beehive installation nj',
    'custom honey harvest bottling',
    'cedar beehive setup',
    'apiary stewardship contract'
  ],
  openGraph: {
    title: 'Bee Keeping | Private Estate Apiary Stewardship',
    description: 'Turnkey cedar beehive installation, year-round health management, and private estate honey bottling by Avenoir master apiarists.',
    type: 'website',
  },
};

export default function BeekeepingServicesPage() {
  return <BeekeepingServicesClient />;
}
