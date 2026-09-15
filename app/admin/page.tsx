import type { Metadata } from 'next';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
  title: 'Atelier Operations & Administration',
  description: 'Enterprise operations command center: inventory allocations, commercial dispatch orders, customer tier administration, and telemetry diagnostics.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
