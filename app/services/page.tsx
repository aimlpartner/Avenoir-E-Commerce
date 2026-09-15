import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Atelier Services | Educate, Humane Bee Removal & Estate Beekeeping',
  description: 'Avenoir Sussex County Apiary services: Apiary Academy & Masterclasses, 100% Humane Live Honeybee Swarm Removal, and Full-Service Private Estate Beekeeping Management.',
  keywords: [
    'beekeeping education',
    'bee removal sussex county',
    'humane bee removal nj',
    'estate beekeeping services',
    'apiary management',
    'honeybee masterclass',
    'live swarm rescue'
  ],
  openGraph: {
    title: 'Avenoir Apiary Services | Educate, Removal & Estate Stewardship',
    description: 'Master beekeeping workshops, zero-chemical humane live bee swarm relocations, and private estate apiary management across the Sussex County & Tristate area.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
