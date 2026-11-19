import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type { PropertyImage } from '../types/property';
import { ResilientImage } from './ResilientImage';

interface PropertyGalleryProps {
  images: PropertyImage[];
  propertyName: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  images,
  propertyName,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const total = images.length;

  useEffect(() => {
    setActiveIndex(0);
    setIsAutoPlaying(true);
  }, [propertyName]);

  useEffect(() => {
    if (!isAutoPlaying || isHovering || total <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isAutoPlaying, isHovering, total]);

  if (total === 0) {
    return null;
  }

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsAutoPlaying(false);
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    if (touchDeltaX.current > 40) {
      goToPrev();
    } else if (touchDeltaX.current < -40) {
      goToNext();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const currentImage = images[activeIndex] ?? images[0];

  return (
    <div
      className="space-y-3"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`Photograph gallery for ${propertyName}. Use left and right arrow keys to navigate.`}
    >
      {/* Large Main Slider */}
      <div
        className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#F3F7FE] border border-[#031130]/10"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, idx) => (
          <div
            key={`${propertyName}-gallery-${idx}`}
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={idx !== activeIndex}
          >
            <ResilientImage
              src={img.url}
              alt={img.alt}
              loading={idx === 0 ? 'eager' : 'lazy'}
              fallbackTitle={propertyName}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Bottom Scrim + Caption */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#031130]/80 via-[#031130]/35 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        <div className="absolute bottom-3.5 left-4 right-4 z-20 flex items-end justify-between gap-4">
          <p className="text-xs sm:text-sm font-medium text-white">
            {currentImage.caption || currentImage.alt}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-medium text-white/90 tabular-nums">
              {activeIndex + 1} / {total}
            </span>
            {total > 1 && (
              <button
                type="button"
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {isAutoPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Previous / Next Controls */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous photograph"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#031130] flex items-center justify-center shadow-md transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next photograph"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#031130] flex items-center justify-center shadow-md transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Clickable Thumbnails Underneath */}
      {total > 1 && (
        <div
          className="grid grid-cols-4 sm:grid-cols-4 gap-2.5 sm:gap-3"
          role="list"
          aria-label="Gallery thumbnails"
        >
          {images.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={`${propertyName}-thumb-${idx}`}
                type="button"
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveIndex(idx);
                }}
                aria-label={`View photo ${idx + 1}: ${img.caption || img.alt}`}
                aria-current={isSelected ? 'true' : undefined}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1] ${
                  isSelected
                    ? 'border-[#185DF1] ring-2 ring-[#185DF1]/20 opacity-100'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <ResilientImage
                  src={img.url}
                  alt={img.alt}
                  fallbackTitle={`Photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

