export type ActivePage = 
  | 'home'
  | 'about'
  | 'services'
  | 'landlords'
  | 'tenants'
  | 'process'
  | 'transparency'
  | 'faqs'
  | 'contact';

export interface PropertyService {
  id: string;
  title: string;
  category: 'Tenancy & Onboarding' | 'Financial & Remittance' | 'Maintenance & Care' | 'Legal & Operations';
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  ownerBenefit: string;
  iconName: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  timeline: string;
  description: string;
  keyOutputs: string[];
}

export interface FaqItem {
  id: string;
  category: 'Landlords' | 'Tenants' | 'Financials & Remittance' | 'Maintenance' | 'General';
  question: string;
  answer: string;
}

export interface LandlordInquiry {
  fullName: string;
  phone: string;
  email: string;
  propertyType: 'Residential Apartments' | 'Commercial Complex' | 'Stand-alone Houses' | 'Mixed-Use Units' | 'Other';
  location: string;
  unitsCount: number;
  currentStatus: 'Currently Tenanted' | 'Partially Occupied' | 'Brand New / Vacant' | 'Transitioning from Previous Manager';
  preferredContact: 'Phone' | 'WhatsApp' | 'Email';
  notes?: string;
}

export interface TenantTicket {
  tenantName: string;
  phone: string;
  email?: string;
  propertyName: string;
  unitNumber: string;
  category: 'Plumbing & Drainage' | 'Electrical & Power' | 'Roofing & Ceiling' | 'Doors, Windows & Locks' | 'Painting & Structural' | 'Water / Utilities' | 'Other Maintenance';
  urgency: 'Routine' | 'Urgent' | 'Emergency';
  description: string;
  preferredTime: 'Morning (8AM - 12PM)' | 'Afternoon (12PM - 5PM)' | 'Weekend';
}

export interface GeneralMessage {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface RemittanceCalculation {
  grossRent: number;
  managementRate: number; // e.g. 8 or 10
  managementFee: number;
  maintenanceReserve: number;
  serviceDeductions: number;
  netRemittance: number;
}
