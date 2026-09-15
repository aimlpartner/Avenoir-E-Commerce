import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'All Products & Apiary Catalog',
  description: 'Complete collection of single-origin unheated raw honeys, commercial-grade beekeeping supplies, and handcrafted executive presentation trunks.',
  openGraph: {
    title: 'All Products & Apiary Catalog | Avenoir Apiary',
    description: 'Explore the full Sussex County apiary inventory across honey, hardware, and luxury gifts.',
  },
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs text-slate-400 font-mono">Loading Complete Catalog...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
