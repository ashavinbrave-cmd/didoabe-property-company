import { COMPANY_INFO } from '../data/companyData';

export type InquiryKind = 'landlord' | 'tenant' | 'general';

const REFERENCE_PREFIX: Record<InquiryKind, string> = {
  landlord: 'DPC-LND',
  tenant: 'DPC-TKT',
  general: 'DPC-GEN',
};

function randomSuffix(): string {
  const bytes = new Uint8Array(3);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export function generateInquiryReference(kind: InquiryKind, now: Date = new Date()): string {
  const date = [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, '0'),
    String(now.getUTCDate()).padStart(2, '0'),
  ].join('');
  return `${REFERENCE_PREFIX[kind]}-${date}-${randomSuffix()}`;
}

export function buildInquiryWhatsAppUrl(
  subject: string,
  fields: Record<string, string | number | undefined>,
  reference?: string,
): string {
  const details = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([label, value]) => `${label.replace(/([A-Z])/g, ' $1').replace(/^./, (first) => first.toUpperCase())}: ${value}`)
    .join('\n');

  const referenceLine = reference ? `Reference: ${reference}\n` : '';
  const message = `Hello ${COMPANY_INFO.name},\n\n${subject}\n${referenceLine}\n${details}\n\nPlease contact me about this inquiry.`;
  return `https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppDraft(href: string): void {
  try {
    window.open(href, '_blank', 'noopener,noreferrer');
  } catch {
    // The on-page draft link remains available when a browser blocks pop-ups.
  }
}