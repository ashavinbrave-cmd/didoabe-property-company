export interface PropertyImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface PropertyListing {
  id: string;
  referenceCode: string;
  name: string;
  location: string;
  district: string;
  monthlyRentUgx: number;
  bedrooms: number;
  bathrooms: number;
  shortDescription: string;
  fullDescription: string;
  rentalConditions: string[];
  facilities: string[];
  images: PropertyImage[];
  isFeatured: boolean;
  isRecentlyAdded: boolean;
  addedAt: string; // ISO date string e.g. '2026-11-15'
  propertyType: string;
  isSampleData: boolean;
}

export interface PropertySearchFilters {
  query: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string; // '' | '1' | '2' | '3' | '4'
}

export type PropertySortOption =
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'bedrooms-desc';

export interface PropertyApplicationPayload {
  propertyId: string;
  propertyReference: string;
  propertyName: string;
  propertyLocation: string;
  monthlyRentUgx: number;
  applicantFullName: string;
  telephoneNumber: string;
  preferredAlternativeLocation: string;
  submittedAt: string;
}

export interface VacantInquiryPayload {
  preferredLocation: string;
  telephoneNumber: string;
  submittedAt: string;
}

export interface DidoabeContactConfig {
  companyName: string;
  /** Set true only after all official company contact details have been confirmed. */
  contactDetailsVerified: boolean;
  /** Leave blank until Didoabe supplies its official WhatsApp number. */
  whatsappNumberDigits: string;
  /** Human-readable placeholder displayed until contact details are verified. */
  whatsappDisplayPlaceholder: string;
  phoneDisplayPlaceholder: string;
  emailPlaceholder: string;
  officeAddressPlaceholder: string;
}

