'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/products';

const PRIMARY_ROUTES = [
  '/',
  '/honey',
  '/beekeeping',
  '/terroir',
  '/corporate',
  '/cart',
];

export default function RoutePreheater() {
  const router = useRouter();

  useEffect(() => {
    // Run prefetching during browser idle time to ensure instant navigation
    const warmRoutes = () => {
      // 1. Prefetch primary top-level routes
      PRIMARY_ROUTES.forEach((route) => {
        try {
          router.prefetch(route);
        } catch {
          // ignore if prefetch fails
        }
      });

      // 2. Prefetch primary product detail routes
      PRODUCTS.forEach((product) => {
        try {
          router.prefetch(`/products/${product.id}`);
        } catch {
          // ignore
        }
      });
    };

    // Use requestIdleCallback if available, or a short timeout
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(warmRoutes);
      } else {
        setTimeout(warmRoutes, 100);
      }

      // Also eagerly prefetch on mouseover/pointerenter of any internal link
      const handlePointerOver = (e: Event) => {
        if (!e.target || !(e.target instanceof Element)) return;
        const target = e.target.closest('a');
        if (!target) return;
        const href = target.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          try {
            router.prefetch(href);
          } catch {
            // ignore
          }
        }
      };

      document.addEventListener('pointerenter', handlePointerOver, { capture: true, passive: true });
      return () => {
        document.removeEventListener('pointerenter', handlePointerOver, { capture: true });
      };
    }
  }, [router]);

  return null;
}
