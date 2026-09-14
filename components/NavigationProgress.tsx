'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Complete progress on route change
  useEffect(() => {
    let resetTimer: NodeJS.Timeout | undefined;
    const completeTimer = setTimeout(() => {
      setProgress(100);
      resetTimer = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 200);
    }, 10);

    return () => {
      clearTimeout(completeTimer);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [pathname, searchParams]);

  // Intercept click on internal links to provide instant visual feedback
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor tag safely
      if (!e.target || !(e.target instanceof Element)) return;
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // If valid internal route and not hash/same-page anchor
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !anchor.hasAttribute('download') &&
        anchor.target !== '_blank'
      ) {
        // Only trigger if navigating to a different path
        const currentUrl = window.location.pathname + window.location.search;
        if (href !== currentUrl) {
          setIsNavigating(true);
          setProgress(25);

          // Animate forward smoothly while loading
          const t1 = setTimeout(() => setProgress(65), 120);
          const t2 = setTimeout(() => setProgress(85), 350);

          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
          };
        }
      }
    };

    document.addEventListener('click', handleDocumentClick, { capture: true, passive: true });
    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true });
    };
  }, []);

  if (!isNavigating && progress === 0) {
    return null;
  }

  return (
    <div
      role="progressbar"
      aria-label="Page loading"
      aria-valuenow={progress}
      className="fixed top-0 left-0 right-0 z-[999999] pointer-events-none h-[3px] bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-600 transition-all duration-200 ease-out shadow-[0_0_8px_rgba(245,158,11,0.6)]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100 ? 'width 150ms ease-out, opacity 200ms ease-out' : 'width 250ms ease-out',
        }}
      />
    </div>
  );
}
