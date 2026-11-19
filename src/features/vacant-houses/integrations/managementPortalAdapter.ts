import type {
  ManagementPortalApplicationRequest,
  ManagementPortalInquiryRequest,
  ManagementPortalProperty,
  PropertyApplicationPayload,
  PropertyListing,
  VacantInquiryPayload,
} from '../types/property';

/**
 * Pure adapter for a future Didoabe Management System connection.
 * It performs no network requests and deliberately rejects unpublished or
 * non-available listings. `portalOrigin` should be the trusted portal origin.
 */
export function mapManagementPortalProperty(
  source: ManagementPortalProperty,
  portalOrigin: string,
): PropertyListing | null {
  if (!source.isPublished || source.status !== 'Available') return null;

  const origin = new URL(portalOrigin);
  const conditions = [source.depositTerms, source.conditions]
    .map((item) => item.trim())
    .filter(Boolean);
  const images = source.photos.map((photo) => ({
    url: new URL(photo.url, origin).toString(),
    alt: photo.caption?.trim() || source.name,
    ...(photo.caption?.trim() ? { caption: photo.caption.trim() } : {}),
  }));
  const description = source.description.trim();

  return {
    id: source.id,
    referenceCode: source.id,
    name: source.name,
    location: source.location,
    district: source.district,
    monthlyRentUgx: source.price,
    bedrooms: source.bedrooms,
    bathrooms: source.bathrooms,
    shortDescription: description.slice(0, 180),
    fullDescription: description,
    rentalConditions: conditions,
    facilities: [],
    images,
    isFeatured: false,
    isRecentlyAdded: false,
    addedAt: source.createdAt || source.updatedAt,
    propertyType: source.propertyType,
    isSampleData: false,
  };
}

/** Maps the public form payload to the portal's accepted application schema. */
export function mapApplicationToManagementPortal(
  payload: PropertyApplicationPayload,
): ManagementPortalApplicationRequest {
  return {
    propertyId: payload.propertyId,
    propertyName: payload.propertyName,
    applicantName: payload.applicantFullName,
    applicantEmail: payload.applicantEmail,
    applicantPhone: payload.telephoneNumber,
    occupation: '',
    moveInDate: '',
    householdSize: 1,
    message: payload.preferredAlternativeLocation
      ? `Preferred alternative location: ${payload.preferredAlternativeLocation}`
      : '',
  };
}

export function mapInquiryToManagementPortal(
  payload: VacantInquiryPayload,
): ManagementPortalInquiryRequest {
  return {
    visitorName: payload.visitorName,
    visitorEmail: payload.visitorEmail,
    visitorPhone: payload.telephoneNumber,
    subject: `Vacancy inquiry for ${payload.preferredLocation}`,
    message: `Please notify me about vacancies in ${payload.preferredLocation}.`,
  };
}

