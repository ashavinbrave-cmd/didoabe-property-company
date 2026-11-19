import type React from 'react';
import { useState } from 'react';
import {
  CheckCircle2,
  Info,
  MessageCircle,
  Send,
  ShieldCheck,
} from 'lucide-react';
import type {
  DidoabeContactConfig,
  PropertyApplicationPayload,
  PropertyListing,
} from '../types/property';
import {
  buildPropertyApplicationWhatsAppUrl,
  formatUgx,
  hasVerifiedWhatsApp,
  isValidPhoneNumber,
} from '../utils/formatters';

interface ApplicationFormProps {
  property: PropertyListing;
  config: DidoabeContactConfig;
  /**
   * Optional handler supplied by Didoabe's host application to send the
   * application payload to the private Property Management System (PMS).
   */
  onSubmitApplication?: (
    payload: PropertyApplicationPayload
  ) => Promise<void> | void;
}

interface FormErrors {
  fullName?: string;
  telephoneNumber?: string;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  property,
  config,
  onSubmitApplication,
}) => {
  const [fullName, setFullName] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [preferredAlternativeLocation, setPreferredAlternativeLocation] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedPayload, setSubmittedPayload] =
    useState<PropertyApplicationPayload | null>(null);
  const [submitMode, setSubmitMode] = useState<'pms' | 'whatsapp' | null>(null);

  const validateFields = (): boolean => {
    const nextErrors: FormErrors = {};
    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!isValidPhoneNumber(telephoneNumber)) {
      nextErrors.telephoneNumber =
        'Please enter a valid Ugandan or international telephone number (e.g. 0772 123 456).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildPayload = (): PropertyApplicationPayload => ({
    propertyId: property.id,
    propertyReference: property.referenceCode,
    propertyName: property.name,
    propertyLocation: property.location,
    monthlyRentUgx: property.monthlyRentUgx,
    applicantFullName: fullName.trim(),
    telephoneNumber: telephoneNumber.trim(),
    preferredAlternativeLocation: preferredAlternativeLocation.trim(),
    submittedAt: new Date().toISOString(),
  });

  const handleSubmitPms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (property.isSampleData) {
      setSubmissionError('This is a demonstration listing, not a genuine vacancy. No application was sent or stored.');
      return;
    }
    if (!validateFields()) return;

    const payload = buildPayload();
    setSubmissionError(null);
    if (!onSubmitApplication) {
      setSubmissionError(
        'The application service is not connected yet. Your details were not sent or stored. Please try again later.'
      );
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmitApplication(payload);
      setSubmittedPayload(payload);
      setSubmitMode('pms');
    } catch {
      setSubmissionError(
        'We could not submit your application. It has not been confirmed as received. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyWhatsApp = () => {
    if (property.isSampleData) {
      setSubmissionError('This is a demonstration listing, not a genuine vacancy. No WhatsApp message was prepared or sent.');
      return;
    }
    if (!validateFields()) return;

    const payload = buildPayload();
    setSubmissionError(null);
    const whatsappUrl = buildPropertyApplicationWhatsAppUrl(
      config,
      payload
    );
    if (!whatsappUrl) {
      setSubmissionError(
        `WhatsApp is unavailable until Didoabe confirms its official contact details. ${config.whatsappDisplayPlaceholder}`
      );
      return;
    }

    setSubmittedPayload(payload);
    setSubmitMode('whatsapp');

    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const preparedWhatsAppUrl = submittedPayload
    ? buildPropertyApplicationWhatsAppUrl(
        config,
        submittedPayload
      )
    : buildPropertyApplicationWhatsAppUrl(config, {
        propertyId: property.id,
        propertyReference: property.referenceCode,
        propertyName: property.name,
        propertyLocation: property.location,
        monthlyRentUgx: property.monthlyRentUgx,
        applicantFullName: fullName.trim() || '(Not yet entered)',
        telephoneNumber: telephoneNumber.trim() || '(Not yet entered)',
        preferredAlternativeLocation: preferredAlternativeLocation.trim(),
      });

  return (
    <section
      id="house-application-form"
      aria-labelledby="application-form-heading"
      className="bg-white rounded-2xl border border-[#031130]/12 shadow-sm p-6 sm:p-8"
    >
      <div className="max-w-2xl">
        <p className="text-xs font-semibold text-[#185DF1] tracking-wide mb-1.5">
          {property.isSampleData ? 'Demonstration Form Preview' : 'Tenancy Application'}
        </p>
        <h3
          id="application-form-heading"
          className="font-display font-bold text-2xl text-[#031130] tracking-tight"
        >
          {property.isSampleData ? 'Application Preview for Sample Listing' : 'Apply for This House'}
        </h3>
        <p className="mt-2 text-sm text-[#031130]/70 leading-relaxed">
          {property.isSampleData
            ? 'This listing is demonstration data only. Use the form to preview the application layout; submissions are disabled for sample properties.'
            : 'Complete your contact details below. The selected house details are automatically included with your application.'}
        </p>
      </div>

      {/* Selected Property Auto-Included Summary */}
      <div className="mt-6 p-4 rounded-xl bg-[#F3F7FE] border border-[#185DF1]/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div>
          <span className="block text-xs text-[#031130]/60">Selected House</span>
          <span className="font-semibold text-[#031130] block truncate">
            {property.name}
          </span>
          <span className="text-xs text-[#031130]/65 tabular-nums">
            Ref: {property.referenceCode}
          </span>
        </div>
        <div>
          <span className="block text-xs text-[#031130]/60">Location</span>
          <span className="font-semibold text-[#031130]">{property.location}</span>
        </div>
        <div>
          <span className="block text-xs text-[#031130]/60">Monthly Rent</span>
          <span className="font-bold text-[#185DF1] tabular-nums">
            {formatUgx(property.monthlyRentUgx)} / month
          </span>
        </div>
      </div>

      {submissionError && (
        <p role="alert" className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          {submissionError}
        </p>
      )}

      {submittedPayload ? (
        <div className="mt-6 p-5 sm:p-6 rounded-xl bg-[#F3F7FE] border border-[#185DF1]/25 space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2
              className="w-5 h-5 text-[#185DF1] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <h4 className="font-display font-semibold text-base text-[#031130]">
                {submitMode === 'whatsapp'
                  ? 'WhatsApp Application Message Prepared'
                  : onSubmitApplication
                  ? 'Application Submitted to Didoabe'
                  : 'Application Ready for Property Management System'}
              </h4>
              <p className="mt-1 text-sm text-[#031130]/75 leading-relaxed">
                {submitMode === 'whatsapp'
                  ? 'Your application details have been formatted for WhatsApp. If WhatsApp did not open automatically, use the button below.'
                  : onSubmitApplication
                  ? 'Your application payload has been passed to the connected Didoabe Property Management System handler.'
                  : 'This standalone Vacant Houses page is not yet connected to Didoabe’s live Property Management System backend, so this application has NOT been transmitted or stored on a server. Connect the onSubmitApplication prop during integration, or apply immediately through WhatsApp below.'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#031130]/10 text-sm space-y-1.5 text-[#031130]/80">
            <p>
              <strong className="text-[#031130]">Applicant:</strong>{' '}
              {submittedPayload.applicantFullName}
            </p>
            <p className="tabular-nums">
              <strong className="text-[#031130]">Telephone:</strong>{' '}
              {submittedPayload.telephoneNumber}
            </p>
            <p>
              <strong className="text-[#031130]">Selected House:</strong>{' '}
              {submittedPayload.propertyName} ({submittedPayload.propertyReference})
            </p>
            <p>
              <strong className="text-[#031130]">Alternative Location:</strong>{' '}
              {submittedPayload.preferredAlternativeLocation || 'None specified'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {preparedWhatsAppUrl && (
              <a
                href={preparedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#031130] hover:bg-[#185DF1] text-white text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Open in WhatsApp</span>
              </a>
            )}
            <button
              type="button"
              onClick={() => {
                setSubmittedPayload(null);
                setSubmitMode(null);
              }}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-[#031130]/15 text-sm font-medium text-[#031130] hover:bg-white transition-colors cursor-pointer"
            >
              Edit Application
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmitPms} noValidate className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Applicant Full Name */}
            <div>
              <label
                htmlFor="applicant-full-name"
                className="block text-xs font-semibold text-[#031130]/85 mb-1.5"
              >
                Applicant&apos;s full name <span className="text-[#185DF1]">*</span>
              </label>
              <input
                id="applicant-full-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setSubmissionError(null);
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                }}
                placeholder="e.g. Sarah Namukasa"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#F3F7FE] border border-[#031130]/15 text-sm text-[#031130] placeholder:text-[#031130]/45 focus:outline-none focus:bg-white focus:border-[#185DF1] focus:ring-2 focus:ring-[#185DF1]/20"
              />
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-700 font-medium">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* 2. Telephone Number */}
            <div>
              <label
                htmlFor="applicant-telephone"
                className="block text-xs font-semibold text-[#031130]/85 mb-1.5"
              >
                Telephone number <span className="text-[#185DF1]">*</span>
              </label>
              <input
                id="applicant-telephone"
                type="tel"
                inputMode="tel"
                required
                value={telephoneNumber}
                onChange={(e) => {
                  setTelephoneNumber(e.target.value);
                  setSubmissionError(null);
                  if (errors.telephoneNumber) {
                    setErrors({ ...errors, telephoneNumber: undefined });
                  }
                }}
                placeholder="e.g. 0772 123 456"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#F3F7FE] border border-[#031130]/15 text-sm text-[#031130] tabular-nums placeholder:text-[#031130]/45 focus:outline-none focus:bg-white focus:border-[#185DF1] focus:ring-2 focus:ring-[#185DF1]/20"
              />
              {errors.telephoneNumber && (
                <p className="mt-1.5 text-xs text-red-700 font-medium">
                  {errors.telephoneNumber}
                </p>
              )}
            </div>
          </div>

          {/* 3. Preferred Alternative Location */}
          <div>
            <label
              htmlFor="applicant-alternative-location"
              className="block text-xs font-semibold text-[#031130]/85 mb-1.5"
            >
              Preferred alternative location (optional, in case another house in a different area is suitable)
            </label>
            <input
              id="applicant-alternative-location"
              type="text"
              value={preferredAlternativeLocation}
              onChange={(e) => {
                setPreferredAlternativeLocation(e.target.value);
                setSubmissionError(null);
              }}
              placeholder="e.g. Kira, Kyanja, or Bukoto"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#F3F7FE] border border-[#031130]/15 text-sm text-[#031130] placeholder:text-[#031130]/45 focus:outline-none focus:bg-white focus:border-[#185DF1] focus:ring-2 focus:ring-[#185DF1]/20"
            />
          </div>

          {/* Company Approval Notice */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#F3F7FE] text-xs text-[#031130]/75 leading-relaxed">
            <ShieldCheck
              className="w-4 h-4 text-[#185DF1] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p>
              <strong className="text-[#031130]">Company Approval Notice:</strong>{' '}
              All applications are subject to Didoabe Property Company approval,
              property inspection, and tenant verification.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#185DF1] hover:bg-[#144ED0] disabled:opacity-60 text-white text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#031130] focus-visible:ring-offset-2"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>{isSubmitting ? 'Preparing Application...' : 'Submit Application'}</span>
            </button>

            <button
              type="button"
              onClick={handleApplyWhatsApp}
              disabled={!hasVerifiedWhatsApp(config) || property.isSampleData}
              className="min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#031130] hover:bg-[#0B2154] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1] focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>{property.isSampleData ? 'Unavailable for demo listing' : hasVerifiedWhatsApp(config) ? 'Apply through WhatsApp' : 'WhatsApp contact pending'}</span>
            </button>
          </div>

          <p className="flex items-center gap-1.5 text-xs text-[#031130]/55">
            <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>
              {property.isSampleData
                ? 'This demonstration listing cannot be submitted.'
                : hasVerifiedWhatsApp(config)
                ? 'WhatsApp opens a draft for you to review and send.'
                : `WhatsApp is disabled until official details are verified. Placeholder: ${config.whatsappDisplayPlaceholder}`}
            </span>
          </p>
        </form>
      )}
    </section>
  );
};

