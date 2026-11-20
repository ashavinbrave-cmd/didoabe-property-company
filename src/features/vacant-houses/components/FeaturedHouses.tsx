import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type { PropertyListing } from '../types/property';
import { PropertyCard } from './PropertyCard';

interface FeaturedHousesProps {
  properties: PropertyListing[];
  onViewDetails: (property: PropertyListing) => void;
  onViewAll?: () => void;
}

export const FeaturedHouses: React.FC<FeaturedHousesProps> = ({
  properties,
  onViewDetails,
  onViewAll,
}) => {
  // Always showcase the five newest live available listings on the homepage.
  // The public API already filters out unpublished and unavailable properties.
  const featured = [...properties]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, 5);
  const featuredAreDemonstrations = featured.length > 0 && featured.every((property) => property.isSampleData);
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, featured.length - visibleCount);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || maxIndex === 0) {
      return;
    }

    const timeout = window.setTimeout(() => {
      if (currentIndex >= maxIndex) {
        setSlideDirection(-1);
        setCurrentIndex(Math.max(0, maxIndex - 1));
      } else if (currentIndex <= 0) {
        setSlideDirection(1);
        setCurrentIndex(Math.min(1, maxIndex));
      } else {
        setCurrentIndex(currentIndex + slideDirection);
      }
    }, 4800);

    return () => window.clearTimeout(timeout);
  }, [isPaused, prefersReducedMotion, maxIndex, currentIndex, slideDirection]);

  if (featured.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setIsPaused(true);
    setSlideDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setIsPaused(true);
    setSlideDirection(1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    if (touchDeltaX.current > 45) {
      handlePrev();
    } else if (touchDeltaX.current < -45) {
      handleNext();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const stepPercent = 100 / visibleCount;

  return (
    <section
      id="featured-houses"
      aria-roledescription="carousel"
      aria-labelledby="featured-houses-heading"
      className="py-14 sm:py-16 bg-white border-b border-[#031130]/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#185DF1] tracking-wide mb-1.5">
              {featuredAreDemonstrations
                ? 'Curated Selection · Sample Demonstration Listings'
                : 'Curated Selection · Featured Listings'}
            </p>
            <h2
              id="featured-houses-heading"
              className="font-display font-bold text-2xl sm:text-3xl text-[#031130] tracking-tight"
            >
              Featured Vacant Houses
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            {maxIndex > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  aria-label={isPaused ? 'Resume automatic slide' : 'Pause automatic slide'}
                  className="min-h-[44px] min-w-[44px] px-3 rounded-xl border border-[#031130]/12 bg-[#F3F7FE] hover:bg-[#E5EEFD] text-[#031130] inline-flex items-center justify-center gap-1.5 text-xs font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1]"
                >
                  {isPaused ? (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#185DF1]" aria-hidden="true" />
                      <span>Play</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5 text-[#185DF1]" aria-hidden="true" />
                      <span>Pause</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous featured house"
                  className="w-11 h-11 rounded-xl border border-[#031130]/15 bg-white hover:bg-[#F3F7FE] text-[#031130] flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next featured house"
                  className="w-11 h-11 rounded-xl border border-[#031130]/15 bg-white hover:bg-[#F3F7FE] text-[#031130] flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Horizontal Sliding Track */}
        <div
          className="overflow-hidden -mx-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            style={{
              transform: `translate3d(-${currentIndex * stepPercent}%, 0, 0)`,
            }}
          >
            {featured.map((property) => (
              <div
                key={property.id}
                className="shrink-0 px-3"
                style={{ width: `${stepPercent}%` }}
              >
                <PropertyCard
                  property={property}
                  onViewDetails={onViewDetails}
                  contextLabel="Featured"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {maxIndex > 0 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={`featured-dot-${idx}`}
                type="button"
                onClick={() => {
                  setIsPaused(true);
                  setCurrentIndex(idx);
                }}
                aria-label={`Show featured slide ${idx + 1}`}
                aria-current={idx === currentIndex ? 'true' : undefined}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1] ${
                  idx === currentIndex
                    ? 'w-7 bg-[#185DF1]'
                    : 'w-2.5 bg-[#031130]/20 hover:bg-[#031130]/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

