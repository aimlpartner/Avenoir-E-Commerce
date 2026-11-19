import type { Metadata } from 'next';
import { Suspense } from 'react';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: 'Shop Wildflower Honey | Singing Bee Honey',
  description:
    'Shop raw wildflower honey from Basking Ridge, NJ: 1/2 lb & 1 lb jars, 3-jar combos, holiday gift boxes, wedding & party favors, kids bottles, personalized corporate glass jars, and monthly subscriptions.',
  openGraph: {
    title: 'Shop Wildflower Honey | Singing Bee Honey',
    description:
      'Raw wildflower honey jars, 3-jar combos, holiday gift boxes, favors, kids bottles, corporate glass gifting, and monthly subscriptions.',
    images: ['/media/brand/singing-bee-logo.png'],
  },
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-xs text-stone-400">Loading Shop...</div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
