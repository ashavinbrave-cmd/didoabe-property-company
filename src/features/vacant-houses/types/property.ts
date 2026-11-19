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
  applicantEmail: string;
  telephoneNumber: string;
  preferredAlternativeLocation: string;
  submittedAt: string;
}

/** Exact public property fields exposed by the private portal API. */
export interface ManagementPortalProperty {
  id: string;
  name: string;
  location: string;
  district: string;
  propertyType: string;
  price: number;
  depositTerms: string;
  status: 'Available' | 'Occupied' | 'Unavailable';
  isPublished: boolean;
  bedrooms: number;
  bathrooms: number;
  photos: Array<{ url: string; caption?: string }>;
  description: string;
  conditions: string;
  createdAt: string;
  updatedAt: string;
}

/** Request shape accepted by the private portal's public application endpoint. */
export interface ManagementPortalApplicationRequest {
  propertyId: string;
  propertyName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  occupation: string;
  moveInDate: string;
  householdSize: number;
  message: string;
}

export interface VacantInquiryPayload {
  visitorName: string;
  visitorEmail: string;
  preferredLocation: string;
  telephoneNumber: string;
  submittedAt: string;
}

export interface ManagementPortalInquiryRequest {
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  subject: string;
  message: string;
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

