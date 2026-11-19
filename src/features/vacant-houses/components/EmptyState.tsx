import type React from 'react';
import { useState } from 'react';
import { CheckCircle2, MessageCircle, RotateCcw, Send } from 'lucide-react';
import { EMPTY_STATE_IMAGE } from '../data/vacantHousesData';
import type { DidoabeContactConfig, VacantInquiryPayload } from '../types/property';
import {
  buildGeneralInquiryWhatsAppUrl,
  hasVerifiedWhatsApp,
  isValidPhoneNumber,
} from '../utils/formatters';
import { isValidEmail } from '../../../utils/validation';
import { ResilientImage } from './ResilientImage';

interface EmptyStateProps {
  config: DidoabeContactConfig;
  isFilteredEmpty?: boolean;
  onClearFilters?: () => void;
  onSubmitInquiry?: (payload: VacantInquiryPayload) => Promise<void> | void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  config,
  isFilteredEmpty = false,
  onClearFilters,
  onSubmitInquiry,
}) => {
  const [preferredLocation, setPreferredLocation] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; location?: string; phone?: string }>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedPayload, setSubmittedPayload] = useState<VacantInquiryPayload | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const nextErrors: { name?: string; email?: string; location?: string; phone?: string } = {};
    if (visitorName.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (!isValidEmail(visitorEmail.trim())) nextErrors.email = 'Please enter a valid email address.';
    if (preferredLocation.trim().length < 2) {
      nextErrors.location = 'Please enter your preferred area or town in Uganda.';
    }
    if (!isValidPhoneNumber(telephoneNumber)) {
      nextErrors.phone = 'Please enter a valid telephone number (e.g. 0772 123 456).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: VacantInquiryPayload = {
      visitorName: visitorName.trim(),
      visitorEmail: visitorEmail.trim(),
      preferredLocation: preferredLocation.trim(),
      telephoneNumber: telephoneNumber.trim(),
      submittedAt: new Date().toISOString(),
    };

    setSubmissionError(null);
    if (!onSubmitInquiry) {
      setSubmissionError(
        'The vacancy inquiry service is not connected yet. Your details were not sent or stored. Please try again later.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmitInquiry(payload);
      setSubmittedPayload(payload);
    } catch {
      setSubmissionError(
        'We could not submit your inquiry. It has not been confirmed as received. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = buildGeneralInquiryWhatsAppUrl(config, {
    preferredLocation,
    telephoneNumber,
  });

  return (
    <div className="bg-white rounded-2xl border border-[#031130]/10 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Visual Column */}
        <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-[#F3F7FE]">
          <ResilientImage
            src={EMPTY_STATE_IMAGE.url}
            alt={EMPTY_STATE_IMAGE.alt}
            fallbackTitle="Didoabe Residential Rentals"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#031130]/75 via-[#031130]/20 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-xs font-medium text-[#93C5FD]">
              Didoabe Tenant Waiting List
            </p>
            <p className="mt-1 text-sm font-medium leading-snug">
              Share your preferred area with the management system once the inquiry service is connected.
            </p>
          </div>
        </div>

        {/* Right Content & Waitlist Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <p className="text-xs font-semibold text-[#185DF1] tracking-wide mb-2">
            {isFilteredEmpty ? 'No Matching Results' : 'Current Vacancy Status'}
          </p>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#031130] tracking-tight [text-wrap:balance]">
            No Vacant Houses Available at the Moment
          </h3>
          <p className="mt-3 text-sm sm:text-base text-[#031130]/70 leading-relaxed max-w-xl">
            {isFilteredEmpty
              ? 'No listings match these filters. Reset the filters or prepare an inquiry with your preferred location and telephone number.'
              : 'There are no listings in the current feed. This does not confirm that Didoabe-managed properties are occupied. Prepare an inquiry with your preferred location and telephone number.'}
          </p>

          {isFilteredEmpty && onClearFilters && (
            <div className="mt-5">
              <button
                type="button"
                onClick={onClearFilters}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F3F7FE] hover:bg-[#E5EEFD] text-[#185DF1] text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1]"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Reset Search Filters & View All Houses</span>
              </button>
            </div>
          )}

          {submittedPayload ? (
            <div className="mt-6 p-5 rounded-xl bg-[#F3F7FE] border border-[#185DF1]/25 space-y-2">
              <div className="flex items-center gap-2 text-[#185DF1] font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Enquiry Request Prepared</span>
              </div>
              <p className="text-sm text-[#031130]/80 leading-relaxed">
                Preferred location: <strong className="text-[#031130]">{submittedPayload.preferredLocation}</strong> ·
                Telephone: <strong className="text-[#031130] tabular-nums">{submittedPayload.telephoneNumber}</strong>
              </p>
              <p className="text-xs text-[#031130]/65 leading-relaxed">
                Your inquiry was accepted by the connected Didoabe management system.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#031130] hover:bg-[#185DF1] text-white text-sm font-semibold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Send via WhatsApp</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSubmittedPayload(null)}
                  className="min-h-[44px] px-4 py-2 text-sm font-medium text-[#031130]/75 hover:text-[#031130] cursor-pointer"
                >
                  Edit Details
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="empty-visitor-name" className="block text-xs font-semibold text-[#031130]/80 mb-1.5">Your name <span className="text-[#185DF1]">*</span></label>
                  <input id="empty-visitor-name" autoComplete="name" value={visitorName} onChange={(e) => { setVisitorName(e.target.value); setSubmissionError(null); if (errors.name) setErrors({ ...errors, name: undefined }); }} placeholder="Your full name" className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#F3F7FE] border border-[#031130]/15 text-sm text-[#031130] placeholder:text-[#031130]/45 focus:outline-none focus:bg-white focus:border-[#185DF1] focus:ring-2 focus:ring-[#185DF1]/20" />
                  {errors.name && <p className="mt-1 text-xs text-red-700 font-medium">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="empty-visitor-email" className="block text-xs font-semibold text-[#031130]/80 mb-1.5">Email address <span className="text-[#185DF1]">*</span></label>
                  <input id="empty-visitor-email" type="email" autoComplete="email" value={visitorEmail} onChange={(e) => { setVisitorEmail(e.target.value); setSubmissionError(null); if (errors.email) setErrors({ ...errors, email: undefined }); }} placeholder="you@example.com" className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#F3F7FE] border border-[#031130]/15 text-sm text-[#031130] placeholder:text-[#031130]/45 focus:outline-none focus:bg-white focus:border-[#185DF1] focus:ring-2 focus:ring-[#185DF1]/20" />
                  {errors.email && <p className="mt-1 text-xs text-red-700 font-medium">{errors.email}</p>}
                </div>
                <div>
                  <label
                    htmlFor="empty-preferred-location"
                    className="block text-xs font-semibold text-[#031130]/80 mb-1.5"
                  >
                    Preferred location <span className="text-[#185DF1]">*</span>
                  </label>
                  <input
                    id="empty-preferred-location"
                    type="text"
                    value={preferredLocation}
                    onChange={(e) => {
                      setPreferredLocation(e.target.value);
                      setSubmissionError(null);
                      if (errors.location) setErrors({ ...errors, location: undefined });
                    }}
                    placeholder="e.g. Ntinda, Kira, Entebbe"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#F3F7FE] border border-[#031130]/15 text-sm text-[#031130] placeholder:text-[#031130]/45 focus:outline-none focus:bg-white focus:border-[#185DF1] focus:ring-2 focus:ring-[#185DF1]/20"
                  />
                  {errors.location && (
                    <p className="mt-1 text-xs text-red-700 font-medium">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="empty-telephone-number"
                    className="block text-xs font-semibold text-[#031130]/80 mb-1.5"
                  >
                    Telephone number <span className="text-[#185DF1]">*</span>
                  </label>
                  <input
                    id="empty-telephone-number"
                    type="tel"
                    inputMode="tel"
                    value={telephoneNumber}
                    onChange={(e) => {
                      setTelephoneNumber(e.target.value);
                      setSubmissionError(null);
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="e.g. 0772 123 456"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#F3F7FE] border border-[#031130]/15 text-sm text-[#031130] tabular-nums placeholder:text-[#031130]/45 focus:outline-none focus:bg-white focus:border-[#185DF1] focus:ring-2 focus:ring-[#185DF1]/20"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-700 font-medium">{errors.phone}</p>
                  )}
                </div>
              </div>

              {submissionError && (
                <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                  {submissionError}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#185DF1] hover:bg-[#144ED0] disabled:opacity-60 text-white text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#031130] focus-visible:ring-offset-2"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{isSubmitting ? 'Preparing...' : 'Notify Me of Vacancies'}</span>
                </button>

                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#031130] hover:bg-[#0B2154] text-white text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1] focus-visible:ring-offset-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                )}
              </div>
              {!hasVerifiedWhatsApp(config) && (
                <p className="text-xs text-[#031130]/65">
                  WhatsApp contact is disabled until verified. Placeholder: {config.whatsappDisplayPlaceholder}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

