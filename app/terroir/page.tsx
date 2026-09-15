import type { Metadata } from 'next';
import TerroirClient from './TerroirClient';

export const metadata: Metadata = {
  title: 'Botanical Terroir Profiles & Melissopalynology Guide',
  description: 'Explore the science of botanical honey terroir in Sussex County. Diastase lab numbers, pollen density, live weather telemetry from Kittatinny Ridge, and interactive sensory tasting notes.',
  openGraph: {
    title: 'Botanical Terroir Profiles & Melissopalynology Guide | Avenoir Apiary',
    description: 'Microclimates, botanical flora, and certified enzymatic purity analysis of Sussex County apiaries.',
    images: ['/images/spotlight-terroir.jpg'],
  },
};

export default function TerroirPage() {
  return <TerroirClient />;
}
