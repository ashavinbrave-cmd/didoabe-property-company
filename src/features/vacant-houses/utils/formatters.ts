import type { DidoabeContactConfig, PropertyApplicationPayload, VacantInquiryPayload } from '../types/property';

/**
 * Formats an integer UGX amount cleanly with thousands separators.
 * Example: 1800000 -> "UGX 1,800,000"
 */
export function formatUgx(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 0;
  return `UGX ${safeAmount.toLocaleString('en-UG')}`;
}

/**
 * Formats an ISO date string into a concise readable date.
 */
export function formatListingDate(isoDate: string): string {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }
  return parsed.toLocaleDateString('en-UG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Validates Ugandan and international telephone numbers.
 * Accepts formats such as 0772123456, +256772123456, 256 701 123 456.
 */
export function isValidPhoneNumber(rawPhone: string): boolean {
  const cleaned = rawPhone.replace(/[\s\-()]/g, '');
  return /^(\+?\d{9,15}|0\d{9})$/.test(cleaned);
}

export function hasVerifiedWhatsApp(config: DidoabeContactConfig): boolean {
  const digits = config.whatsappNumberDigits.replace(/\D/g, '');
  const contactValues = [
    config.phoneDisplayPlaceholder,
    config.emailPlaceholder,
    config.officeAddressPlaceholder,
  ];
  const allContactValuesProvided = contactValues.every(
    (value) => value.trim().length > 0 && !/placeholder|not provided|pending/i.test(value)
  );
  return config.contactDetailsVerified && allContactValuesProvided && /^\d{10,15}$/.test(digits);
}

/**
 * Builds a pre-filled WhatsApp application URL with all required property & applicant fields.
 */
export function buildPropertyApplicationWhatsAppUrl(
  config: DidoabeContactConfig,
  payload: Omit<PropertyApplicationPayload, 'submittedAt'>
): string | null {
  if (!hasVerifiedWhatsApp(config)) return null;
  const sanitizedDigits = config.whatsappNumberDigits.replace(/\D/g, '');
  const messageLines = [
    'Hello Didoabe Property Company,',
    '',
    'I would like to apply for a vacant rental house:',
    `• Applicant Name: ${payload.applicantFullName}`,
    `• Telephone Number: ${payload.telephoneNumber}`,
    `• Selected House: ${payload.propertyName} (${payload.propertyReference})`,
    `• House Location: ${payload.propertyLocation}`,
    `• Monthly Rental Price: ${formatUgx(payload.monthlyRentUgx)} / month`,
    `• Preferred Alternative Location: ${
      payload.preferredAlternativeLocation.trim() || 'None specified'
    }`,
    '',
    'Please let me know the next steps for inspection and approval.',
  ];

  const encoded = encodeURIComponent(messageLines.join('\n'));
  return `https://wa.me/${sanitizedDigits}?text=${encoded}`;
}

/**
 * Builds a pre-filled WhatsApp enquiry URL for the empty-state waitlist / general inquiry.
 */
export function buildGeneralInquiryWhatsAppUrl(
  config: DidoabeContactConfig,
  inquiry?: Partial<Omit<VacantInquiryPayload, 'submittedAt'>>
): string | null {
  if (!hasVerifiedWhatsApp(config)) return null;
  const sanitizedDigits = config.whatsappNumberDigits.replace(/\D/g, '');
  const locationText = inquiry?.preferredLocation?.trim()
    ? inquiry.preferredLocation.trim()
    : 'Kampala / Wakiso';
  const phoneText = inquiry?.telephoneNumber?.trim()
    ? `\n• Telephone Number: ${inquiry.telephoneNumber.trim()}`
    : '';

  const message = [
    'Hello Didoabe Property Company,',
    '',
    'I am looking for a vacant rental house and would like to enquire about upcoming availability:',
    `• Preferred Location: ${locationText}${phoneText}`,
    '',
    'Please notify me when suitable houses become available.',
  ].join('\n');

  return `https://wa.me/${sanitizedDigits}?text=${encodeURIComponent(message)}`;
}

