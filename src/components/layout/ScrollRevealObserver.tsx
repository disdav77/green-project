'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Immediately mark all current elements as in-view to prevent blank screens
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => {
      el.classList.add('in-view');
    });

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '50px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
