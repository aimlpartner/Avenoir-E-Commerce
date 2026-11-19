'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/products';

const PRIMARY_ROUTES = ['/', '/shop', '/gifting', '/corporate', '/cart'];

export default function RoutePreheater() {
  const router = useRouter();

  useEffect(() => {
    const warmRoutes = () => {
      PRIMARY_ROUTES.forEach((route) => {
        try {
          router.prefetch(route);
        } catch {
          // ignore
        }
      });

      PRODUCTS.forEach((product) => {
        try {
          router.prefetch(`/products/${product.id}`);
        } catch {
          // ignore
        }
      });
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(
          warmRoutes
        );
      } else {
        setTimeout(warmRoutes, 100);
      }
    }
  }, [router]);

  return null;
}
