import type {
  PropertyApplicationPayload,
  PropertyListing,
  VacantInquiryPayload,
} from '../types/property';

interface DatabaseProperty {
  id: string;
  title: string;
  location: string;
  district: string | null;
  price_ugx: number | string;
  bedrooms: number;
  bathrooms: number;
  description: string | null;
  rental_conditions: string | null;
  photos: string[] | null;
  facilities: string[] | null;
  reference_code: string | null;
  property_type: string | null;
  is_featured: boolean;
  created_at: string;
}

function getConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment settings.');
  }
  return { url: url.replace(/\/$/, ''), key };
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { url, key } = getConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed (${response.status}).`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

function mapProperty(row: DatabaseProperty): PropertyListing {
  const description = row.description ?? '';
  const daysSinceAdded = (Date.now() - new Date(row.created_at).getTime()) / 86400000;
  return {
    id: row.id,
    referenceCode: row.reference_code || row.id,
    name: row.title,
    location: row.location,
    district: row.district ?? '',
    monthlyRentUgx: Number(row.price_ugx),
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    shortDescription: description.slice(0, 180),
    fullDescription: description,
    rentalConditions: (row.rental_conditions ?? '').split(/\r?\n/).map((x) => x.trim()).filter(Boolean),
    facilities: row.facilities ?? [],
    images: (row.photos ?? []).map((url) => ({ url, alt: row.title })),
    isFeatured: row.is_featured,
    isRecentlyAdded: daysSinceAdded >= 0 && daysSinceAdded <= 30,
    addedAt: row.created_at,
    propertyType: row.property_type ?? '',
    isSampleData: false,
  };
}

export async function getPublicProperties(): Promise<PropertyListing[]> {
  const rows = await request<DatabaseProperty[]>(
    'properties?select=id,title,location,district,price_ugx,bedrooms,bathrooms,description,rental_conditions,photos,facilities,reference_code,property_type,is_featured,created_at&is_published=eq.true&status=eq.available&order=created_at.desc'
  );
  return rows.map(mapProperty);
}

export async function submitPublicApplication(payload: PropertyApplicationPayload): Promise<void> {
  await request<void>('applications', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      property_id: payload.propertyId,
      applicant_name: payload.applicantFullName.trim(),
      applicant_email: payload.applicantEmail.trim(),
      telephone: payload.telephoneNumber.trim(),
      preferred_location: payload.preferredAlternativeLocation.trim() || null,
      property_name: payload.propertyName,
      property_location: payload.propertyLocation,
      property_rent_ugx: payload.monthlyRentUgx,
      property_reference: payload.propertyReference,
    }),
  });
}

export async function submitVacancyInquiry(payload: VacantInquiryPayload): Promise<void> {
  await request<void>('inquiries', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      visitor_name: payload.visitorName.trim(),
      visitor_email: payload.visitorEmail.trim(),
      preferred_location: payload.preferredLocation.trim(),
      telephone: payload.telephoneNumber.trim(),
    }),
  });
}
