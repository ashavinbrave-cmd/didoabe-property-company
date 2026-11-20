import type React from 'react';
import { useEffect, useState } from 'react';
import { MapPin, BedDouble, Bath, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { PropertyListing } from '../types/property';
import { formatUgx } from '../utils/formatters';
import { ResilientImage } from './ResilientImage';

interface PropertyCardProps {
  property: PropertyListing;
  onViewDetails: (property: PropertyListing) => void;
  contextLabel?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
  contextLabel,
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const images = property.images;
  const totalImages = images.length;

  useEffect(() => {
    if (totalImages <= 1 || isPaused || prefersReducedMotion || document.hidden) {
      return;
    }

    const timer = window.setInterval(() => {
      setImageIndex((prev) => (prev + 1) % totalImages);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [totalImages, isPaused, prefersReducedMotion]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(true);
    setImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(true);
    setImageIndex((prev) => (prev + 1) % totalImages);
  };

  const metadataParts = [
    contextLabel,
    property.propertyType,
    property.isSampleData ? 'Sample Listing' : undefined,
  ].filter(Boolean);

  return (
    <article
      className="group bg-white rounded-2xl border border-[#031130]/10 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Auto-Sliding Property Photograph Container */}
      <div className="relative aspect-[4/3] bg-[#F3F7FE] overflow-hidden">
        {images.map((img, idx) => (
          <div
            key={`${property.id}-img-${idx}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              idx === imageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={idx !== imageIndex}
          >
            <ResilientImage
              src={img.url}
              alt={img.alt}
              fallbackTitle={property.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Subtle Bottom Gradient Scrim for Photo Indicators */}
        <div
          className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#031130]/55 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Manual Image Slide Controls (shown on hover or focus) */}
        {totalImages > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label={`Previous photo of ${property.name}`}
              className="property-card-image-control absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#031130] flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              aria-label={`Next photo of ${property.name}`}
              className="property-card-image-control absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#031130] flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Photo Slide Indicator Bars */}
            <div
              className="absolute bottom-2.5 left-3 right-3 z-20 flex items-center gap-1.5"
              aria-hidden="true"
            >
              {images.map((_, idx) => (
                <span
                  key={`${property.id}-bar-${idx}`}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    idx === imageIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Clean Unboxed Metadata (Zero Pill Discipline) */}
        <p className="text-xs font-medium text-[#185DF1] tracking-wide mb-1.5 truncate">
          {metadataParts.join(' · ')}
        </p>

        {/* Property Title */}
        <h3 className="font-display font-semibold text-lg text-[#031130] leading-snug line-clamp-1">
          {property.name}
        </h3>

        {/* Location */}
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-[#031130]/70">
          <MapPin className="w-4 h-4 text-[#185DF1] shrink-0" aria-hidden="true" />
          <span className="truncate">{property.location}</span>
        </p>

        {/* Monthly Rental Price */}
        <div className="mt-3 pt-3 border-t border-[#031130]/8 flex items-baseline justify-between gap-2">
          <div>
            <span className="font-display font-bold text-lg text-[#031130] tabular-nums">
              {formatUgx(property.monthlyRentUgx)}
            </span>
            <span className="text-xs text-[#031130]/60 font-medium"> / month</span>
          </div>
          <span className="text-xs text-[#031130]/55 tabular-nums">
            {property.referenceCode}
          </span>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="mt-3 flex items-center gap-5 text-sm text-[#031130]/80 tabular-nums">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="w-4 h-4 text-[#185DF1]" aria-hidden="true" />
            <span>
              {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-[#185DF1]" aria-hidden="true" />
            <span>
              {property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
            </span>
          </span>
        </div>

        {/* Short Description */}
        <p className="mt-3 text-sm text-[#031130]/70 leading-relaxed line-clamp-2 flex-1">
          {property.shortDescription}
        </p>

        {/* Primary Card Action */}
        <div className="mt-5 pt-1">
          <button
            type="button"
            onClick={() => onViewDetails(property)}
            className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#031130] hover:bg-[#185DF1] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1] focus-visible:ring-offset-2"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};

