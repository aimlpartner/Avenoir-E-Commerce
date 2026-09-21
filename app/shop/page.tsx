import type { Metadata } from 'next';
import { Suspense } from 'react';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: 'Shop All Collections | Honey, Gear & Gift Boxes | Maison Avenoir',
  description: 'Explore the full Sussex County apiary inventory: single-origin raw honeys, custom gift boxes, whipped creamed reserves, and commercial-grade beekeeping gear.',
  openGraph: {
    title: 'Shop All Collections | Maison Avenoir',
    description: 'Explore raw varietal honeys, custom gift boxes, and beekeeping hardware.',
    images: ['https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=1200'],
  },
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs text-slate-400 font-mono">Loading Shop...</div>}>
      <ShopClient />
    </Suspense>
  );
}
