import type React from 'react';
import { HERO_BANNER_IMAGE } from '../data/vacantHousesData';
import type { PropertyListing, PropertySearchFilters } from '../types/property';
import { PropertySearch } from './PropertySearch';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  properties: PropertyListing[];
  filters: PropertySearchFilters;
  onFiltersChange: (next: PropertySearchFilters) => void;
  onSearchSubmit: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  properties,
  filters,
  onFiltersChange,
  onSearchSubmit,
  onClearFilters,
  hasActiveFilters,
}) => {
  return (
    <section
      id="vacant-houses-top"
      aria-labelledby="hero-heading"
      className="relative bg-[#031130] overflow-x-clip"
    >
      {/* Background Ugandan Residence Photograph with Measured Contrast Scrim */}
      <div className="relative min-h-[500px] sm:min-h-[540px] flex flex-col justify-end">
        <div className="absolute inset-0">
          <ResilientImage
            src={HERO_BANNER_IMAGE.url}
            alt={HERO_BANNER_IMAGE.alt}
            loading="eager"
            fallbackTitle="Didoabe Residential Rentals Across Uganda"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#031130] via-[#031130]/75 to-[#031130]/40"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#031130]/85 via-[#031130]/45 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pb-32">
          <div className="max-w-2xl vh-fade-up">
            <p className="text-sm font-medium text-[#93C5FD] tracking-wide mb-3">
              Didoabe Property Company · Residential Lettings Across Uganda
            </p>
            <h1
              id="hero-heading"
              className="font-display font-bold text-white tracking-tight leading-[1.12] [text-wrap:balance]"
              style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.65rem)' }}
            >
              Find Your Next Home with Didoabe
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#E2E8F0] leading-relaxed max-w-xl">
              Explore quality rental houses across Uganda with clear prices,
              locations and rental conditions.
            </p>
            <p className="mt-4 text-xs sm:text-sm text-[#CBD5E1] tabular-nums">
              {properties.length > 0
                ? `${properties.length} ${properties.every((p) => p.isSampleData) ? 'demonstration sample listings' : 'vacant houses'} currently displayed`
                : 'No vacant houses currently listed'}
            </p>
          </div>
        </div>
      </div>

      {/* Overlapping Modern Search Container */}
      <div className="relative z-20 bg-[#F3F7FE] pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-16 sm:-mt-20 vh-fade-up-delayed">
            <PropertySearch
              properties={properties}
              filters={filters}
              onFiltersChange={onFiltersChange}
              onSearchSubmit={onSearchSubmit}
              onClearFilters={onClearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

