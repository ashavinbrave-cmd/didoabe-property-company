import type React from 'react';
import { ArrowUpDown, RotateCcw } from 'lucide-react';
import type {
  DidoabeContactConfig,
  PropertyListing,
  PropertySortOption,
  VacantInquiryPayload,
} from '../types/property';
import { EmptyState } from './EmptyState';
import { PropertyCard } from './PropertyCard';

interface AllAvailableHousesProps {
  totalInventoryCount: number;
  filteredProperties: PropertyListing[];
  sortBy: PropertySortOption;
  onSortChange: (nextSort: PropertySortOption) => void;
  onViewDetails: (property: PropertyListing) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  isUpdating: boolean;
  config: DidoabeContactConfig;
  isDemonstrationDataset: boolean;
  onSubmitInquiry?: (payload: VacantInquiryPayload) => Promise<void> | void;
}

export const AllAvailableHouses: React.FC<AllAvailableHousesProps> = ({
  totalInventoryCount,
  filteredProperties,
  sortBy,
  onSortChange,
  onViewDetails,
  hasActiveFilters,
  onClearFilters,
  isUpdating,
  config,
  isDemonstrationDataset,
  onSubmitInquiry,
}) => {
  const isFilteredEmpty = totalInventoryCount > 0 && filteredProperties.length === 0;

  return (
    <section
      id="all-available-houses"
      aria-labelledby="all-houses-heading"
      className="py-14 sm:py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Sorting Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#031130]/10">
          <div>
            <p className="text-xs font-semibold text-[#185DF1] tracking-wide mb-1.5">
              {isDemonstrationDataset
                ? 'Complete Collection · Demonstration Sample Data'
                : 'Current Property Listings'}
            </p>
            <h2
              id="all-houses-heading"
              className="font-display font-bold text-2xl sm:text-3xl text-[#031130] tracking-tight"
            >
              All Available Houses
            </h2>
            <p className="mt-1.5 text-sm text-[#031130]/70 tabular-nums">
              Showing {filteredProperties.length} of {totalInventoryCount}{' '}
              {totalInventoryCount === 1 ? 'listing' : 'listings'}
              {hasActiveFilters ? ' matching your filters' : ''}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#031130]/15 text-sm font-medium text-[#031130]/80 hover:bg-[#F3F7FE] hover:text-[#031130] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-[#185DF1]" aria-hidden="true" />
                <span>Clear Filters</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <label
                htmlFor="property-sort-select"
                className="text-xs font-semibold text-[#031130]/70 whitespace-nowrap flex items-center gap-1.5"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-[#185DF1]" aria-hidden="true" />
                <span>Sort by</span>
              </label>
              <select
                id="property-sort-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as PropertySortOption)}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#F3F7FE] border border-[#031130]/15 text-sm font-medium text-[#031130] focus:outline-none focus:bg-white focus:border-[#185DF1] focus:ring-2 focus:ring-[#185DF1]/20 cursor-pointer"
              >
                <option value="newest">Newest listings first</option>
                <option value="price-asc">Lowest rental price first</option>
                <option value="price-desc">Highest rental price first</option>
                <option value="bedrooms-desc">Most bedrooms first</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading Shimmer State during filter/sort transitions */}
        {isUpdating ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            aria-label="Updating property listings"
          >
            {[0, 1, 2].map((skeletonIdx) => (
              <div
                key={`skeleton-${skeletonIdx}`}
                className="bg-white rounded-2xl border border-[#031130]/10 overflow-hidden animate-pulse"
              >
                <div className="aspect-[4/3] bg-[#F3F7FE]" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-28 bg-[#F3F7FE] rounded" />
                  <div className="h-5 w-3/4 bg-[#F3F7FE] rounded" />
                  <div className="h-4 w-1/2 bg-[#F3F7FE] rounded" />
                  <div className="h-10 w-full bg-[#F3F7FE] rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <EmptyState
            config={config}
            isFilteredEmpty={isFilteredEmpty}
            onClearFilters={onClearFilters}
            onSubmitInquiry={onSubmitInquiry}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

