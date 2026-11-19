import type React from 'react';
import type { PropertyListing } from '../types/property';
import { formatListingDate } from '../utils/formatters';
import { PropertyCard } from './PropertyCard';

interface RecentlyAddedHousesProps {
  properties: PropertyListing[];
  onViewDetails: (property: PropertyListing) => void;
}

export const RecentlyAddedHouses: React.FC<RecentlyAddedHousesProps> = ({
  properties,
  onViewDetails,
}) => {
  const recentHouses = [...properties]
    .filter((p) => p.isRecentlyAdded)
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, 3);

  if (recentHouses.length === 0) {
    return null;
  }

  return (
    <section
      id="recently-added-houses"
      aria-labelledby="recently-added-heading"
      className="py-14 sm:py-16 bg-[#F3F7FE] border-b border-[#031130]/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#185DF1] tracking-wide mb-1.5">
              Newest Properties · Just Listed
            </p>
            <h2
              id="recently-added-heading"
              className="font-display font-bold text-2xl sm:text-3xl text-[#031130] tracking-tight"
            >
              Recently Added Houses
            </h2>
          </div>
          <p className="text-sm text-[#031130]/70 max-w-md">
            Freshly added demonstration rental homes ready for inspection and tenant application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {recentHouses.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={onViewDetails}
              contextLabel={`Recently Added (${formatListingDate(property.addedAt)})`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

