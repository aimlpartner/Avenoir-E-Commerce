import type { Metadata } from 'next';
import BeeRemovalClient from './BeeRemovalClient';

export const metadata: Metadata = {
  title: 'Humane Live Bee Removal & Relocation | Sussex County Apiary',
  description: '100% humane live honeybee swarm and hive removal across Sussex County and the Tristate area. Zero pesticides, zero extermination. We safely relocate colonies to our Kittatinny Ridge mountain sanctuary.',
  keywords: [
    'humane bee removal',
    'live swarm rescue nj',
    'bee removal sussex county nj',
    'no kill bee removal',
    'honeybee structural cut out',
    'swarm relocation tristate'
  ],
  openGraph: {
    title: 'Bee Removal | 100% Humane Live Colony Relocation',
    description: 'Zero poison, zero extermination. Emergency and scheduled live honeybee swarm rescue relocated to Avenoir protected mountain apiaries.',
    type: 'website',
  },
};

export default function BeeRemovalPage() {
  return <BeeRemovalClient />;
}
