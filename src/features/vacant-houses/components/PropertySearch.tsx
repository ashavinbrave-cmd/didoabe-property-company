import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, MapPin, BedDouble, X, SlidersHorizontal } from 'lucide-react';
import type { PropertyListing, PropertySearchFilters } from '../types/property';
import { formatUgx } from '../utils/formatters';

interface PropertySearchProps {
  properties: PropertyListing[];
  filters: PropertySearchFilters;
  onFiltersChange: (next: PropertySearchFilters) => void;
  onSearchSubmit: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

interface SearchSuggestion {
  id: string;
  label: string;
  sublabel: string;
  type: 'location' | 'property';
  value: string;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({
  properties,
  filters,
  onFiltersChange,
  onSearchSubmit,
  onClearFilters,
  hasActiveFilters,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const uniqueLocations = useMemo(() => {
    const locs = Array.from(new Set(properties.map((p) => p.location)));
    return locs.sort((a, b) => a.localeCompare(b));
  }, [properties]);

  const suggestions: SearchSuggestion[] = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const list: SearchSuggestion[] = [];

    if (!q) {
      uniqueLocations.slice(0, 4).forEach((loc) => {
        list.push({
          id: `loc-${loc}`,
          label: loc,
          sublabel: 'Location in Uganda',
          type: 'location',
          value: loc,
        });
      });
      return list;
    }

    const matchingLocations = uniqueLocations.filter((loc) =>
      loc.toLowerCase().includes(q)
    );
    matchingLocations.forEach((loc) => {
      list.push({
        id: `loc-${loc}`,
        label: loc,
        sublabel: 'Location match',
        type: 'location',
        value: loc,
      });
    });

    const matchingProperties = properties.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
    );
    matchingProperties.slice(0, 5).forEach((p) => {
      list.push({
        id: `prop-${p.id}`,
        label: p.name,
        sublabel: `${p.location} · ${formatUgx(p.monthlyRentUgx)}/mo`,
        type: 'property',
        value: p.name,
      });
    });

    return list.slice(0, 7);
  }, [filters.query, properties, uniqueLocations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApplySuggestion = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'location') {
      onFiltersChange({
        ...filters,
        location: suggestion.value,
        query: '',
      });
    } else {
      onFiltersChange({
        ...filters,
        query: suggestion.value,
      });
    }
    setShowSuggestions(false);
    setActiveIndex(-1);
    onSearchSubmit();
  };

  const handleQueryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSearchSubmit();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleApplySuggestion(suggestions[activeIndex]);
      } else {
        setShowSuggestions(false);
        onSearchSubmit();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearchSubmit();
  };

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-2xl shadow-xl shadow-[#031130]/10 border border-[#031130]/10 p-4 sm:p-6"
    >
      <form onSubmit={handleFormSubmit} role="search" aria-label="Search vacant rental houses">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
          {/* Keyword Search with Live Suggestions */}
          <div className="lg:col-span-4 relative">
            <label
              htmlFor="property-search-query"
              className="block text-xs font-semibold text-[#031130]/75 mb-1.5"
            >
              Search by property name or description
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-[#031130]/45 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="property-search-query"
                type="text"
                value={filters.query}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  onFiltersChange({ ...filters, query: e.target.value });
                  setShowSuggestions(true);
                  setActiveIndex(-1);
                }}
                onKeyDown={handleQueryKeyDown}
                placeholder="e.g. Ntinda, bungalow, veranda, parking..."
                autoComplete="off"
                aria-autocomplete="list"
                aria-expanded={showSuggestions && suggestions.length > 0}
                className="w-full min-h-[44px] pl-10 pr-9 py-2.5 rounded-xl bg-[#F3F7FE] border border-[#031130]/12 text-sm text-[#031130] placeholder:text-[#031130]/45 focus:outline-none focus:bg-white focus:border-[#185DF1] focus:ring-2 focus:ring-[#185DF1]/20 transition-all"
              />
              {filters.query && (
                <button
                  type="button"
                  onClick={() => onFiltersChange({ ...filters, query: '' })}
                  aria-label="Clear search text"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#031130]/45 hover:text-[#031130] rounded-md cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul
                role="listbox"
                aria-label="Search suggestions"
                className="absolute left-0 right-0 top-full mt-2 z-30 bg-white rounded-xl border border-[#031130]/12 shadow-xl overflow-hidden divide-y divide-[#031130]/6"
              >
                {suggestions.map((item, idx) => (
                  <li key={item.id} role="option" aria-selected={idx === activeIndex}>
                    <button
                      type="button"
                      onClick={() => handleApplySuggestion(item)}
                      className={`w-full text-left px-3.5 py-2.5 flex items-start gap-2.5 transition-colors cursor-pointer ${
                        idx === activeIndex
                          ? 'bg-[#F3F7FE] text-[#185DF1]'
                          : 'hover:bg-[#F3F7FE]/70 text-[#031130]'
                      }`}
                    >
                      <MapPin
                        className="w-4 h-4 text-[#185DF1] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium truncate">
                          {item.label}
                        </span>
                        <span className="block text-xs text-[#031130]/60 truncate tabular-nums">
                          {item.sublabel}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Location Select */}
          <div className="lg:col-span-2">
            <label
              htmlFor="property-search-location"
              className="block text-xs font-semibold text-[#031130]/75 mb-1.5"
            >
              Location
            </label>
            <div className="relative">
              <MapPin
                className="w-4 h-4 text-[#031130]/45 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <select
                id="property-search-location"
                value={filters.location}
                onChange={(e) =>
                  onFiltersChange({ ...filters, location: e.target.value })
                }
                className="w-full min-h-[44px] pl-9 pr-3 py-2.5 rounded-xl bg-[#F3F7FE] border border-[#031130]/12 text-sm text-[#031130] focus:outline-none focus:bg-white focus:border-[#185DF1] focus:ring-2 focus:ring-[#185DF1]/20 transition-all cursor-pointer"
              >
                <option value="">All locations</option>
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Min Rental Price */}
          <div className="lg:col-span-2">
            <label
              htmlFor="property-search-min-price"
              className="block text-xs font-semibold text-[#031130]/75 mb-1.5"
            >
              Min price (UGX)
            </label>
            <input
              id="property-search-min-price"
              type="number"
              min={0}
              step={50000}
              inputMode="numeric"
              value={filters.minPrice}
              onChange={(e) =>
                onFiltersChange({ ...filters, minPrice: e.target.value })
              }
              placeholder="e.g. 700,000"
              className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F3F7FE] border border-[#031130]/12 text-sm text-[#031130] tabular-nums placeholder:text-[#031130]/45 focus:outline-none focus:bg-white focus:border-[#185DF1] focus:ring-2 focus:ring-[#185DF1]/20 transition-all"
            />
          </div>

          {/* Max Rental Price */}
          <div className="lg:col-span-2">
            <label
              htmlFor="property-search-max-price"
              className="block text-xs font-semibold text-[#031130]/75 mb-1.5"
            >
              Max price (UGX)
            </label>
            <input
              id="property-search-max-price"
              type="number"
              min={0}
              step={50000}
              inputMode="numeric"
              value={filters.maxPrice}
              onChange={(e) =>
                onFiltersChange({ ...filters, maxPrice: e.target.value })
              }
              placeholder="e.g. 2,500,000"
              className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F3F7FE] border border-[#031130]/12 text-sm text-[#031130] tabular-nums placeholder:text-[#031130]/45 focus:outline-none focus:bg-white focus:border-[#185DF1] focus:ring-2 focus:ring-[#185DF1]/20 transition-all"
            />
          </div>

          {/* Bedrooms Select */}
          <div className="lg:col-span-2">
            <label
              htmlFor="property-search-bedrooms"
              className="block text-xs font-semibold text-[#031130]/75 mb-1.5"
            >
              Bedrooms
            </label>
            <div className="relative">
              <BedDouble
                className="w-4 h-4 text-[#031130]/45 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <select
                id="property-search-bedrooms"
                value={filters.bedrooms}
                onChange={(e) =>
                  onFiltersChange({ ...filters, bedrooms: e.target.value })
                }
                className="w-full min-h-[44px] pl-9 pr-3 py-2.5 rounded-xl bg-[#F3F7FE] border border-[#031130]/12 text-sm text-[#031130] focus:outline-none focus:bg-white focus:border-[#185DF1] focus:ring-2 focus:ring-[#185DF1]/20 transition-all cursor-pointer"
              >
                <option value="">Any bedrooms</option>
                <option value="1">1+ Bedrooms</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-3.5 border-t border-[#031130]/8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#031130]/65">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#185DF1]" aria-hidden="true" />
            <span>Results update live as you refine your search criteria.</span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="min-h-[44px] px-4 py-2 rounded-xl border border-[#031130]/15 text-sm font-medium text-[#031130]/80 hover:text-[#031130] hover:bg-[#F3F7FE] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1]"
              >
                Clear Filters
              </button>
            )}
            <button
              type="submit"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#185DF1] hover:bg-[#144ED0] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#031130] focus-visible:ring-offset-2"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              <span>Search Houses</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

