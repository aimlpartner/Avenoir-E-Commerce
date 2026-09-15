import type { Metadata } from 'next';
import EducateClient from './EducateClient';

export const metadata: Metadata = {
  title: 'Apiary Academy & Masterclasses | Beekeeping Education',
  description: 'Hands-on beekeeping masterclasses, hive ecology courses, and private honey terroir tasting seminars hosted at Avenoir Sussex County Apiary.',
  keywords: [
    'beekeeping classes nj',
    'apiary academy',
    'learn beekeeping sussex county',
    'honey extraction workshop',
    'honeybee masterclass',
    'pollinator education'
  ],
  openGraph: {
    title: 'Educate | Avenoir Apiary Academy & Masterclasses',
    description: 'Immersive hands-on beekeeping masterclasses and field workshops at Avenoir Sussex County apiary.',
    type: 'website',
  },
};

export default function EducatePage() {
  return <EducateClient />;
}
