import type { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata: Metadata = {
  title: 'Shopping Bag & Express Checkout',
  description: 'Review your selected artisanal raw honeys, commercial apiary supplies, and bespoke presentation trunks. Enjoy complimentary white-glove shipping on orders over $150.',
  openGraph: {
    title: 'Shopping Bag & Checkout | Avenoir Apiary',
    description: 'Review and finalize your order of cold-extracted Sussex honey and apiary gear.',
  },
};

export default function CartPage() {
  return <CartClient />;
}
