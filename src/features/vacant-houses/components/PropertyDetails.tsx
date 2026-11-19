import type React from 'react';
import { useState } from 'react';
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Check,
  FileText,
  Home,
  MapPin,
} from 'lucide-react';
import type {
  DidoabeContactConfig,
  PropertyApplicationPayload,
  PropertyListing,
} from '../types/property';
import { formatListingDate, formatUgx } from '../utils/formatters';
import { ApplicationForm } from './ApplicationForm';
import { PropertyGallery } from './PropertyGallery';

interface PropertyDetailsProps {
  property: PropertyListing;
  config: DidoabeContactConfig;
  onBack: () => void;
  onSubmitApplication?: (
    payload: PropertyApplicationPayload
  ) => Promise<void> | void;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  config,
  onBack,
  onSubmitApplication,
}) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const handleApplyClick = () => {
    setShowApplicationForm(true);
    window.requestAnimationFrame(() => {
      const el = document.getElementById('house-application-form');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <article
      aria-labelledby="property-details-title"
      className="bg-[#F3F7FE] min-h-[75vh] py-8 sm:py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb / Back Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#031130]/12 text-sm font-semibold text-[#031130] hover:bg-[#F3F7FE] hover:border-[#185DF1]/40 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1]"
          >
            <ArrowLeft className="w-4 h-4 text-[#185DF1]" aria-hidden="true" />
            <span>Back to Vacant Houses</span>
          </button>

          <p className="text-xs font-medium text-[#031130]/65 tabular-nums">
            {property.isSampleData ? 'Demonstration Sample Listing · ' : ''}
            Ref: {property.referenceCode} · Listed {formatListingDate(property.addedAt)}
          </p>
        </div>

        {property.isSampleData && (
          <p role="note" className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            <strong>Demonstration listing only.</strong> This is not a genuine Didoabe vacancy. Applications and inquiries for sample properties cannot be submitted.
          </p>
        )}

        {/* Main 2-Column Layout: Gallery + Contiguous Summary Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Photograph Gallery & Full Details */}
          <div className="lg:col-span-7 space-y-8">
            <PropertyGallery
              images={property.images}
              propertyName={property.name}
            />

            {/* Full Property Description */}
            <div className="bg-white rounded-2xl border border-[#031130]/10 p-6 sm:p-8 shadow-xs">
              <h2 className="font-display font-bold text-xl text-[#031130] mb-3">
                Property Overview
              </h2>
              <p className="text-base text-[#031130]/80 leading-relaxed">
                {property.fullDescription}
              </p>
            </div>

            {/* Rental Conditions */}
            <div className="bg-white rounded-2xl border border-[#031130]/10 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#185DF1]" aria-hidden="true" />
                <h2 className="font-display font-bold text-xl text-[#031130]">
                  Rental Conditions
                </h2>
              </div>
              <ul className="space-y-3">
                {property.rentalConditions.map((condition, idx) => (
                  <li
                    key={`condition-${idx}`}
                    className="flex items-start gap-3 text-sm sm:text-base text-[#031130]/80 leading-relaxed"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#185DF1] shrink-0 mt-2.5"
                      aria-hidden="true"
                    />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Available Facilities and Features */}
            <div className="bg-white rounded-2xl border border-[#031130]/10 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-[#185DF1]" aria-hidden="true" />
                <h2 className="font-display font-bold text-xl text-[#031130]">
                  Available Facilities &amp; Features
                </h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.facilities.map((facility, idx) => (
                  <li
                    key={`facility-${idx}`}
                    className="flex items-start gap-2.5 text-sm text-[#031130]/85 bg-[#F3F7FE] rounded-xl px-3.5 py-2.5"
                  >
                    <Check
                      className="w-4 h-4 text-[#185DF1] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{facility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Sticky Contiguous Property Summary & Apply CTA */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-2xl border border-[#031130]/10 p-6 sm:p-8 shadow-sm">
              <p className="text-xs font-semibold text-[#185DF1] tracking-wide mb-2">
                {property.propertyType}
                {property.isSampleData ? ' · Sample Data' : ''}
              </p>

              <h1
                id="property-details-title"
                className="font-display font-bold text-2xl sm:text-3xl text-[#031130] tracking-tight leading-snug [text-wrap:balance]"
              >
                {property.name}
              </h1>

              <p className="mt-2.5 flex items-center gap-2 text-sm sm:text-base text-[#031130]/75">
                <MapPin className="w-4 h-4 text-[#185DF1] shrink-0" aria-hidden="true" />
                <span>{property.location}</span>
              </p>

              {/* Price Block */}
              <div className="mt-6 pt-5 border-t border-[#031130]/10">
                <p className="text-xs font-medium text-[#031130]/60">
                  Monthly Rental Price
                </p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-display font-extrabold text-3xl text-[#031130] tabular-nums">
                    {formatUgx(property.monthlyRentUgx)}
                  </span>
                  <span className="text-sm font-medium text-[#031130]/65">
                    / month
                  </span>
                </div>
              </div>

              {/* Bedrooms & Bathrooms Strip */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#F3F7FE] p-3.5 flex items-center gap-3">
                  <BedDouble className="w-5 h-5 text-[#185DF1] shrink-0" aria-hidden="true" />
                  <div>
                    <span className="block font-display font-bold text-base text-[#031130] tabular-nums">
                      {property.bedrooms}
                    </span>
                    <span className="block text-xs text-[#031130]/65">
                      {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-[#F3F7FE] p-3.5 flex items-center gap-3">
                  <Bath className="w-5 h-5 text-[#185DF1] shrink-0" aria-hidden="true" />
                  <div>
                    <span className="block font-display font-bold text-base text-[#031130] tabular-nums">
                      {property.bathrooms}
                    </span>
                    <span className="block text-xs text-[#031130]/65">
                      {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm text-[#031130]/70 leading-relaxed">
                {property.shortDescription}
              </p>

              {/* Prominent Apply for House CTA */}
              <div className="mt-6 pt-5 border-t border-[#031130]/10 space-y-3">
                <button
                  type="button"
                  onClick={handleApplyClick}
                  className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#185DF1] hover:bg-[#144ED0] text-white font-display font-semibold text-base transition-colors shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#031130] focus-visible:ring-offset-2"
                >
                  {property.isSampleData ? 'Preview Application Form' : 'Apply for House'}
                </button>
                <p className="text-xs text-center text-[#031130]/60">
                  {property.isSampleData
                    ? 'Demonstration reference only · Not a real vacancy'
                    : <>Reference: <span className="tabular-nums font-medium">{property.referenceCode}</span> · Subject to company approval</>}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Dedicated Application Form Section */}
        {showApplicationForm && (
          <div className="mt-10">
            <ApplicationForm
              property={property}
              config={config}
              onSubmitApplication={onSubmitApplication}
            />
          </div>
        )}
      </div>
    </article>
  );
};

