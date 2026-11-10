import { LandlordInquiry, TenantTicket, GeneralMessage } from '../types/index';

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

/**
 * Validates Ugandan local numbers and international E.164 numbers.
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const clean = phone.replace(/[\s\-()]/g, '');
  // Matches Ugandan +256/256 or local 0-prefixed mobile numbers.
  const regex = /^(\+?256|0)[37][0-9]{8}$/;
  // Other countries must include + and a non-zero country code; E.164 allows at most 15 digits.
  const internationalRegex = /^\+[1-9][0-9]{7,14}$/;
  return regex.test(clean) || internationalRegex.test(clean);
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

function enforceMaxLength(
  value: string | undefined,
  field: string,
  label: string,
  maxLength: number,
  errors: Record<string, string>,
): void {
  if (value && value.length > maxLength) {
    errors[field] = `${label} must be ${maxLength} characters or fewer.`;
  }
}

export function validateLandlordInquiry(data: Partial<LandlordInquiry>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }
  enforceMaxLength(data.fullName, 'fullName', 'Your name', 100, errors);
  enforceMaxLength(data.phone, 'phone', 'Your phone number', 25, errors);
  enforceMaxLength(data.email, 'email', 'Your email address', 254, errors);

  if (!data.phone || !isValidPhone(data.phone)) {
    errors.phone = 'Please provide a valid telephone number (e.g. +256 772 883 402).';
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.location || data.location.trim().length < 2) {
    errors.location = 'Please specify the property location (e.g. Nakawa, Ntinda, Kira).';
  }
  enforceMaxLength(data.location, 'location', 'Property location', 160, errors);
  enforceMaxLength(data.notes, 'notes', 'Additional notes', 1200, errors);

  if (!Number.isInteger(data.unitsCount) || data.unitsCount! < 1 || data.unitsCount! > 500) {
    errors.unitsCount = 'Please enter a whole number of units between 1 and 500.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateTenantTicket(data: Partial<TenantTicket>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.tenantName || data.tenantName.trim().length < 2) {
    errors.tenantName = 'Please enter your full name.';
  }
  enforceMaxLength(data.tenantName, 'tenantName', 'Your name', 100, errors);
  enforceMaxLength(data.phone, 'phone', 'Your phone number', 25, errors);
  enforceMaxLength(data.email, 'email', 'Your email address', 254, errors);

  if (!data.phone || !isValidPhone(data.phone)) {
    errors.phone = 'Please provide a valid phone number so the company can reply.';
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.propertyName || data.propertyName.trim().length < 2) {
    errors.propertyName = 'Please specify the building or property name.';
  }
  enforceMaxLength(data.propertyName, 'propertyName', 'Property name', 160, errors);

  if (!data.unitNumber || data.unitNumber.trim().length < 1) {
    errors.unitNumber = 'Please specify your unit or apartment number.';
  }
  enforceMaxLength(data.unitNumber, 'unitNumber', 'Unit number', 40, errors);

  if (!data.description || data.description.trim().length < 10) {
    errors.description = 'Please describe the issue in detail (at least 10 characters).';
  }
  enforceMaxLength(data.description, 'description', 'Description', 1200, errors);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateGeneralMessage(data: Partial<GeneralMessage>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your name.';
  }
  enforceMaxLength(data.fullName, 'fullName', 'Your name', 100, errors);
  enforceMaxLength(data.phone, 'phone', 'Your phone number', 25, errors);
  enforceMaxLength(data.email, 'email', 'Your email address', 254, errors);

  if (!data.phone || !isValidPhone(data.phone)) {
    errors.phone = 'Please provide a valid phone number.';
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Please specify a subject.';
  }
  enforceMaxLength(data.subject, 'subject', 'Subject', 120, errors);

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please provide details in your message (minimum 10 characters).';
  }
  enforceMaxLength(data.message, 'message', 'Message', 1200, errors);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

