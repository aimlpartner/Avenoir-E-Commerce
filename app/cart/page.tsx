import type { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata: Metadata = {
  title: 'Shopping Bag & Checkout',
  description:
    'Review your Singing Bee Wildflower Honey order and complete checkout. Free shipping on orders over $60.',
  openGraph: {
    title: 'Shopping Bag & Checkout | Singing Bee Honey',
    description: 'Review your raw wildflower honey order from Madisonville Apiary, Basking Ridge, NJ.',
  },
};

export default function CartPage() {
  return <CartClient />;
}
