import '../vacant-houses.css';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DIDOABE_CONFIG,
  SAMPLE_VACANT_HOUSES,
} from '../data/vacantHousesData';
import type {
  DidoabeContactConfig,
  PropertyApplicationPayload,
  PropertyListing,
  PropertySearchFilters,
  PropertySortOption,
  VacantInquiryPayload,
} from '../types/property';
import { AllAvailableHouses } from './AllAvailableHouses';
import { FeaturedHouses } from './FeaturedHouses';
import { HeroSection } from './HeroSection';
import { PropertyDetails } from './PropertyDetails';
import { RecentlyAddedHouses } from './RecentlyAddedHouses';
import { TemporaryFooter } from './TemporaryFooter';
import { TemporaryHeader } from './TemporaryHeader';

export interface VacantHousesPageProps {
  /**
   * Supply live property listings from Didoabe's backend/CMS.
   * Defaults to clearly marked demonstration sample listings.
   */
  properties?: PropertyListing[];
  /** Open a property selected from the homepage carousel on first render. */
  initialSelectedPropertyId?: string | null;
  /**
   * Override contact & WhatsApp placeholders with Didoabe's live details.
   */
  contactConfig?: DidoabeContactConfig;
  /**
   * Defaults to false because the live site already renders Didoabe's global
   * header and footer. Set true only for standalone preview.
   */
  showTemporaryChrome?: boolean;
  /**
   * Connect Didoabe's private Property Management System application endpoint.
   */
  onSubmitApplication?: (
    payload: PropertyApplicationPayload
  ) => Promise<void> | void;
  /**
   * Connect Didoabe's waiting-list inquiry endpoint for empty-state submissions.
   */
  onSubmitVacantInquiry?: (
    payload: VacantInquiryPayload
  ) => Promise<void> | void;
  /**
   * Optional callback when clicking Home in the temporary preview header.
   */
  onNavigateHome?: () => void;
}

const INITIAL_FILTERS: PropertySearchFilters = {
  query: '',
  location: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
};

export const VacantHousesPage: React.FC<VacantHousesPageProps> = ({
  properties = SAMPLE_VACANT_HOUSES,
  initialSelectedPropertyId = null,
  contactConfig = DIDOABE_CONFIG,
  showTemporaryChrome = false,
  onSubmitApplication,
  onSubmitVacantInquiry,
  onNavigateHome,
}) => {
  const [filters, setFilters] = useState<PropertySearchFilters>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<PropertySortOption>('newest');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(initialSelectedPropertyId);
  const [isUpdatingResults, setIsUpdatingResults] = useState(false);
  const updateTimerRef = useRef<number | null>(null);

  const selectedProperty = useMemo(
    () => properties.find((p) => p.id === selectedPropertyId) ?? null,
    [properties, selectedPropertyId]
  );

  const hasActiveFilters = Boolean(
    filters.query.trim() ||
      filters.location ||
      filters.minPrice.trim() ||
      filters.maxPrice.trim() ||
      filters.bedrooms
  );

  const triggerBriefLoadingFeedback = () => {
    if (updateTimerRef.current !== null) {
      window.clearTimeout(updateTimerRef.current);
    }
    setIsUpdatingResults(true);
    updateTimerRef.current = window.setTimeout(() => {
      setIsUpdatingResults(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (updateTimerRef.current !== null) {
        window.clearTimeout(updateTimerRef.current);
      }
    };
  }, []);

  const filteredAndSortedProperties = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const minPriceNum = filters.minPrice.trim()
      ? Number(filters.minPrice)
      : null;
    const maxPriceNum = filters.maxPrice.trim()
      ? Number(filters.maxPrice)
      : null;
    const minBedroomsNum = filters.bedrooms ? Number(filters.bedrooms) : null;

    const filtered = properties.filter((property) => {
      if (q) {
        const haystack = [
          property.name,
          property.location,
          property.district,
          property.shortDescription,
          property.fullDescription,
          property.propertyType,
          property.referenceCode,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      if (filters.location && property.location !== filters.location) {
        return false;
      }

      if (
        minPriceNum !== null &&
        !Number.isNaN(minPriceNum) &&
        property.monthlyRentUgx < minPriceNum
      ) {
        return false;
      }

      if (
        maxPriceNum !== null &&
        !Number.isNaN(maxPriceNum) &&
        property.monthlyRentUgx > maxPriceNum
      ) {
        return false;
      }

      if (
        minBedroomsNum !== null &&
        !Number.isNaN(minBedroomsNum) &&
        property.bedrooms < minBedroomsNum
      ) {
        return false;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.monthlyRentUgx - b.monthlyRentUgx;
        case 'price-desc':
          return b.monthlyRentUgx - a.monthlyRentUgx;
        case 'bedrooms-desc':
          return b.bedrooms - a.bedrooms || a.monthlyRentUgx - b.monthlyRentUgx;
        case 'newest':
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
    });
  }, [properties, filters, sortBy]);

  const handleViewDetails = (property: PropertyListing) => {
    setSelectedPropertyId(property.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToListings = () => {
    setSelectedPropertyId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFiltersChange = (next: PropertySearchFilters) => {
    setFilters(next);
  };

  const handleSearchSubmit = () => {
    triggerBriefLoadingFeedback();
    const el = document.getElementById('all-available-houses');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    triggerBriefLoadingFeedback();
  };

  const handleSortChange = (nextSort: PropertySortOption) => {
    setSortBy(nextSort);
    triggerBriefLoadingFeedback();
  };

  const handleEnquireScroll = () => {
    if (selectedProperty) {
      const formEl = document.getElementById('house-application-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    setSelectedPropertyId(null);
    window.requestAnimationFrame(() => {
      const el = document.getElementById('all-available-houses');
      el?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <div className="vh-page min-h-screen flex flex-col bg-white text-[#031130]">
      {showTemporaryChrome && (
        <TemporaryHeader
          onSelectHome={onNavigateHome ?? handleBackToListings}
          onSelectVacantHouses={handleBackToListings}
          onEnquireClick={handleEnquireScroll}
        />
      )}

      <main className="flex-1">
        {selectedProperty ? (
          <PropertyDetails
            property={selectedProperty}
            config={contactConfig}
            onBack={handleBackToListings}
            onSubmitApplication={onSubmitApplication}
          />
        ) : (
          <>
            <HeroSection
              properties={properties}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onSearchSubmit={handleSearchSubmit}
              onClearFilters={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Clear Sample Data Identification Strip */}
            {properties.some((p) => p.isSampleData) && (
              <div className="bg-[#F3F7FE] border-y border-[#031130]/8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#031130]/75">
                  <p>
                    <strong className="text-[#031130]">Demonstration Notice:</strong>{' '}
                    Properties shown below are sample Ugandan rental listings for
                    preview purposes only and do not represent genuine Didoabe
                    vacancies.
                  </p>
                </div>
              </div>
            )}

            {properties.length > 0 && !hasActiveFilters && (
              <>
                <FeaturedHouses
                  properties={properties}
                  onViewDetails={handleViewDetails}
                />
                <RecentlyAddedHouses
                  properties={properties}
                  onViewDetails={handleViewDetails}
                />
              </>
            )}

            <AllAvailableHouses
              totalInventoryCount={properties.length}
              filteredProperties={filteredAndSortedProperties}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onViewDetails={handleViewDetails}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
              isUpdating={isUpdatingResults}
              config={contactConfig}
              isDemonstrationDataset={properties.length > 0 && properties.every((property) => property.isSampleData)}
              onSubmitInquiry={onSubmitVacantInquiry}
            />
          </>
        )}
      </main>

      {showTemporaryChrome && (
        <TemporaryFooter
          config={contactConfig}
          onNavigateVacantHouses={handleBackToListings}
        />
      )}
    </div>
  );
};

