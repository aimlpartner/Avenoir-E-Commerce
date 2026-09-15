import type { Metadata } from 'next';
import { Suspense } from 'react';
import HoneyClient from './HoneyClient';

export const metadata: Metadata = {
  title: 'Raw Honey Products & Terroir Reserves',
  description: '100% raw, unheated, cold-extracted varietals harvested directly from our protected Sussex County apiaries along the Kittatinny Ridge. Hand-bottled into apothecary glassware and solid walnut presentation vaults.',
  openGraph: {
    title: 'Raw Honey Products & Terroir Reserves | Avenoir Apiary',
    description: 'Cold-extracted single origin varietals, mountain infusions, and raw virgin comb slabs from Sussex County.',
    images: ['/images/banner-honey-terroir.jpg'],
  },
};

export default function HoneyPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs text-slate-400 font-mono">Synchronizing Sussex Honey Reserves...</div>}>
      <HoneyClient />
    </Suspense>
  );
}
