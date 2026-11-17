import type { Metadata } from 'next';
import { Suspense } from 'react';
import BeekeepingClient from './BeekeepingClient';

export const metadata: Metadata = {
  title: 'Beekeeping Supplies & Professional Gear',
  description: 'Field-tested in active commercial apiaries across the Northeast. From triple-layer ventilated suits and goatskin gauntlets to Western Red Cedar Langstroth woodenware and titanium frame tools.',
  openGraph: {
    title: 'Beekeeping Supplies & Professional Gear | Singing Bee Honey',
    description: 'Commercial-grade beekeeping supplies, ventilated bee suits, cedar hive boxes, and precision apiculture tools.',
    images: ['/media/apiary/photos/sunset-hives-row.jpeg'],
  },
};

export default function BeekeepingPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs text-slate-400 font-mono">Loading Apiary Hardware Catalog...</div>}>
      <BeekeepingClient />
    </Suspense>
  );
}
