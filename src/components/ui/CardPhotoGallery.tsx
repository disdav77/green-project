'use client';

import React, { useState, useRef, useCallback } from 'react';

interface CardPhotoGalleryProps {
  images: string[];
  alt: string;
  aspectRatio?: string;
  className?: string;
  children?: React.ReactNode;
}

export function CardPhotoGallery({
  images,
  alt,
  aspectRatio = '16/10',
  className = '',
  children,
}: CardPhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const safeImages = images && images.length > 0 ? images : ['/images/hero-complex.png'];
  const total = safeImages.length;

  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    },
    [total]
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    },
    [total]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        // swipe right -> previous
        setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
      } else {
        // swipe left -> next
        setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={`card-photo-gallery-root relative overflow-hidden group select-none ${className}`}
      style={{ aspectRatio, width: '100%' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Current Photo */}
      {(() => {
        const currentSrc = safeImages[currentIndex] || '';
        const isPlan = currentSrc.toLowerCase().includes('plan');
        return (
          <div className={`w-full h-full ${isPlan ? 'bg-white flex items-center justify-center p-2.5' : ''}`}>
            <img
              src={currentSrc}
              alt={`${alt} - photo ${currentIndex + 1}`}
              className={`w-full h-full ${isPlan ? 'object-contain' : 'object-cover group-hover:scale-105'} transition-transform duration-500 ease-out`}
              loading="lazy"
            />
          </div>
        );
      })()}

      {/* Desktop Hover Segment Tracks (Setl / Cian Multi-Photo Zones) */}
      {total > 1 && (
        <div
          className="absolute inset-0 hidden md:flex z-10"
          style={{ pointerEvents: 'auto' }}
        >
          {safeImages.map((_, idx) => (
            <div
              key={idx}
              className="flex-1 h-full cursor-pointer"
              onMouseEnter={() => setCurrentIndex(idx)}
              aria-label={`Show photo ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Left / Right Arrow Navigation */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/45 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/75 cursor-pointer shadow-md"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/45 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/75 cursor-pointer shadow-md"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Setl-Style Segmented Pagination Indicators (Top or Bottom) */}
      {total > 1 && (
        <div className="absolute bottom-2.5 inset-x-3 z-20 flex items-center gap-1.5 pointer-events-none">
          {safeImages.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'bg-white shadow-sm'
                  : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* Embedded Badges / Overlay Children */}
      {children}
    </div>
  );
}
