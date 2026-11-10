import React, { useEffect, useRef, useState } from 'react';
import { RemittanceCalculator } from './RemittanceCalculator';
import { OptimizedImage } from './OptimizedImage';
import { LandlordInquiry } from '../types/index';
import { validateLandlordInquiry } from '../utils/validation';
import { buildInquiryWhatsAppUrl, generateInquiryReference, openWhatsAppDraft } from '../utils/inquiry';
import { InquiryPrivacyNotice, WhatsAppDraftNotice } from './InquiryFeedback';
import { OWNER_BENEFITS } from '../data/companyData';
import {
  Building,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface LandlordSectionProps {
  initialServiceInquiry?: string | null;
  scrollToFormOnMount?: boolean;
  onFormScrollComplete?: () => void;
}

export const LandlordSection: React.FC<LandlordSectionProps> = ({
  initialServiceInquiry,
  scrollToFormOnMount = false,
  onFormScrollComplete,
}) => {
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<Partial<LandlordInquiry>>({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'Residential Apartments',
    location: '',
    unitsCount: 6,
    currentStatus: 'Currently Tenanted',
    preferredContact: 'Phone',
    notes: initialServiceInquiry ? `Interested in: ${initialServiceInquiry}` : '',
  });
  const [unitsCountInput, setUnitsCountInput] = useState('6');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [whatsAppDraft, setWhatsAppDraft] = useState<{ href: string; reference: string } | null>(null);

  useEffect(() => {
    const notes = initialServiceInquiry ? `Interested in: ${initialServiceInquiry}` : '';
    setFormData((previous) => ({ ...previous, notes }));
  }, [initialServiceInquiry]);

  useEffect(() => {
    if (!scrollToFormOnMount) return;

    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    onFormScrollComplete?.();
  }, [onFormScrollComplete, scrollToFormOnMount]);

  const handleApplyCalculatorValues = (units: number, monthlyRent: number) => {
    setUnitsCountInput(String(units));
    setFormData((prev) => ({
      ...prev,
      unitsCount: units,
      notes: `${prev.notes?.replace(/\n?Calculator inputs:.*$/s, '') ?? ''}${prev.notes ? '\n' : ''}Calculator inputs: ${units} units; assumed rent of UGX ${Math.round(monthlyRent / Math.max(units, 1)).toLocaleString('en-US')} per unit and UGX ${Math.round(monthlyRent).toLocaleString('en-US')} total per month.`,
    }));
    const formElement = document.getElementById('landlord-consultation-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedUnits = Number.parseInt(unitsCountInput, 10);
    const unitsCount = Math.min(500, Math.max(1, Number.isFinite(parsedUnits) ? parsedUnits : 1));
    const submissionData = { ...formData, unitsCount };
    setUnitsCountInput(String(unitsCount));
    setFormData(submissionData);

    const validation = validateLandlordInquiry(submissionData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const reference = generateInquiryReference('landlord');
    const href = buildInquiryWhatsAppUrl('Property management consultation request', submissionData as Record<string, string | number | undefined>, reference);
    setWhatsAppDraft({ href, reference });
    openWhatsAppDraft(href);
  };

  const handleUnitsCountChange = (value: string) => {
    setUnitsCountInput(value);
    const unitsCount = value === '' ? undefined : Number(value);
    setFormData((previous) => ({
      ...previous,
      unitsCount: unitsCount !== undefined && Number.isFinite(unitsCount) ? unitsCount : undefined,
    }));
  };

  const normalizeUnitsCount = () => {
    const parsedUnits = Number.parseInt(unitsCountInput, 10);
    const unitsCount = Math.min(500, Math.max(1, Number.isFinite(parsedUnits) ? parsedUnits : 1));
    setUnitsCountInput(String(unitsCount));
    setFormData((previous) => ({ ...previous, unitsCount }));
  };

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors" id="landlords">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-200 dark:border-sky-800">
            For Property Owners
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Professional Solutions for Property Owners
          </h1>
          <p className="mt-3 text-sky-700 dark:text-sky-400 font-semibold text-lg">
            "We Manage, You Relax"
          </p>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            Services listed here include rent collection, tenant relations, and maintenance coordination. Confirm the scope, fees, and arrangements directly with the company for each property.
          </p>
        </div>

        {/* Benefits of Working With Us (6 Exact Items from Prompt) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
              Why Partner With Didoabe
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Benefits of Working With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OWNER_BENEFITS.map((b, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-sky-100 dark:border-slate-800 shadow-xs hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-700/10 dark:bg-sky-700/20 text-sky-700 dark:text-sky-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Remittance Estimator */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
              Rental Income Scenario
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Rental Income Scenario Calculator
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Explore an estimate using your own rent, agreed fee, and cost assumptions. The calculator does not represent a quote or promise of rent collection or payment.
            </p>
          </div>
          <RemittanceCalculator onApplyToInquiry={handleApplyCalculatorValues} />
        </div>

        {/* Topics to discuss before appointing a property manager */}
        <div className="bg-gradient-to-br from-sky-900 via-slate-900 to-sky-950 text-white rounded-2xl p-8 lg:p-12 border border-sky-700">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">
              Before Appointing a Property Manager
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Topics to Discuss with Didoabe Property Company
            </h3>
            <p className="text-sm text-sky-100 mt-2">
              These are discussion topics, not a required sequence. Confirm the services, responsibilities, fees, and arrangements that apply to your property directly with the company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-sky-950/60 border border-sky-800">
              <span className="w-8 h-8 rounded-full bg-sky-400 text-slate-950 font-black flex items-center justify-center text-sm mb-3">
                1
              </span>
              <h4 className="font-bold text-white text-sm mb-1">Property Information</h4>
              <p className="text-xs text-sky-200 leading-relaxed">
                Discuss the property, its current tenancy situation, and the support you are looking for. Ask whether a visit or assessment is available.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sky-950/60 border border-sky-800">
              <span className="w-8 h-8 rounded-full bg-sky-400 text-slate-950 font-black flex items-center justify-center text-sm mb-3">
                2
              </span>
              <h4 className="font-bold text-white text-sm mb-1">Service Scope and Fees</h4>
              <p className="text-xs text-sky-200 leading-relaxed">
                Ask the company to confirm any fees, expense approvals, payment arrangements, and responsibilities before deciding how to proceed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sky-950/60 border border-sky-800">
              <span className="w-8 h-8 rounded-full bg-sky-400 text-slate-950 font-black flex items-center justify-center text-sm mb-3">
                3
              </span>
              <h4 className="font-bold text-white text-sm mb-1">Tenant and Utility Arrangements</h4>
              <p className="text-xs text-sky-200 leading-relaxed">
                If relevant, discuss tenant communication, utility accounts, and any transition arrangements for the property.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sky-950/60 border border-sky-800">
              <span className="w-8 h-8 rounded-full bg-sky-400 text-slate-950 font-black flex items-center justify-center text-sm mb-3">
                4
              </span>
              <h4 className="font-bold text-white text-sm mb-1">Ongoing Responsibilities</h4>
              <p className="text-xs text-sky-200 leading-relaxed">
                Confirm which rent, maintenance, reporting, and payment tasks are included and how they would be handled.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Proof: Managed Properties Photographic Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
              Residential Property Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Property types and management support
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              These photos show residential buildings and office meetings. Contact the company to confirm current service availability and coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-sky-100 dark:border-slate-800 shadow-sm group">
              <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                <OptimizedImage
                  src="/assets/images/residential-homes.jpg"
                  alt="A row of residential homes around a shared courtyard."
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Rental homes
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  A view of residential homes and their shared frontage.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-sky-100 dark:border-slate-800 shadow-sm group">
              <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                <OptimizedImage
                  src="/assets/images/residential-estate.jpg"
                  alt="A paved lane between homes, plants, and residential gardens."
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Residential estate
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  A residential compound with paved access and planted gardens.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-sky-100 dark:border-slate-800 shadow-sm group">
              <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                <OptimizedImage
                  src="/assets/images/client-consultation.jpg"
                  alt="Two people meeting across a desk in a bright office."
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Office meeting
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  An office meeting between two people across a desk.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Landlord Consultation Form */}
        <div
          id="landlord-consultation-form"
          ref={formSectionRef}
          className="scroll-mt-24 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 lg:p-10"
        >
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold mb-2">
              <Building className="w-3.5 h-3.5" />
              <span>Property Management Inquiry</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Request a Property Management Consultation
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Use this form to prepare a WhatsApp inquiry with details about your property. Review the draft and press Send in WhatsApp to contact the company.
            </p>
          </div>

          <form onSubmit={handleSubmit} onChangeCapture={() => { setWhatsAppDraft(null); setErrors({}); }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="landlord-fullName" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Owner's Full Name *
                </label>
                <input
                  id="landlord-fullName"
                  type="text"
                  maxLength={100}
                  required
                  value={formData.fullName || ''}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. John Mukasa"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                    errors.fullName ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.fullName && (
                  <p role="alert" className="text-xs text-rose-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="landlord-phone" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number (Uganda or WhatsApp) *
                </label>
                <input
                  id="landlord-phone"
                  type="tel"
                  maxLength={25}
                  required
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +256 772 883 402"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                    errors.phone ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.phone && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="landlord-email" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  id="landlord-email"
                  type="email"
                  maxLength={254}
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. owner@gmail.com"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                    errors.email ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.email && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.email}</p>}
              </div>

              {/* Property Location */}
              <div>
                <label htmlFor="landlord-location" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Property Location (District / Suburb) *
                </label>
                <input
                  id="landlord-location"
                  type="text"
                  maxLength={160}
                  required
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Nakawa, Katooke, Ntinda, Kira, Entebbe Rd"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                    errors.location ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.location && (
                  <p role="alert" className="text-xs text-rose-600 mt-1">{errors.location}</p>
                )}
              </div>

              {/* Property Type */}
              <div>
                <label htmlFor="landlord-propertyType" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Property Type
                </label>
                <select
                  id="landlord-propertyType"
                  value={formData.propertyType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      propertyType: e.target.value as LandlordInquiry['propertyType'],
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                >
                  <option value="Residential Apartments">Residential Apartments</option>
                  <option value="Commercial Complex">Commercial Complex / Arcade</option>
                  <option value="Stand-alone Houses">Stand-alone Residential Houses</option>
                  <option value="Mixed-Use Units">Mixed-Use Commercial &amp; Residential</option>
                  <option value="Other">Other Property Type</option>
                </select>
              </div>

              {/* Units Count */}
              <div>
                <label htmlFor="landlord-unitsCount" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Number of Units / Apartments *
                </label>
                <input
                  id="landlord-unitsCount"
                  type="number"
                  min="1"
                  max="500"
                  step="1"
                  required
                  value={unitsCountInput}
                  onChange={(e) => handleUnitsCountChange(e.target.value)}
                  onBlur={normalizeUnitsCount}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                    errors.unitsCount ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.unitsCount && (
                  <p role="alert" className="text-xs text-rose-600 mt-1">{errors.unitsCount}</p>
                )}
              </div>

              {/* Current Occupancy Status */}
              <div>
                <label htmlFor="landlord-currentStatus" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Current Occupancy Status
                </label>
                <select
                  id="landlord-currentStatus"
                  value={formData.currentStatus}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentStatus: e.target.value as LandlordInquiry['currentStatus'],
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                >
                  <option value="Currently Tenanted">Currently Fully Tenanted</option>
                  <option value="Partially Occupied">Partially Occupied</option>
                  <option value="Brand New / Vacant">Brand New / Currently Vacant</option>
                  <option value="Transitioning from Previous Manager">
                    Transitioning from Previous Manager
                  </option>
                </select>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label htmlFor="landlord-preferredContact" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Contact Channel
                </label>
                <select
                  id="landlord-preferredContact"
                  value={formData.preferredContact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferredContact: e.target.value as LandlordInquiry['preferredContact'],
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                >
                  <option value="Phone">Direct Phone Call</option>
                  <option value="WhatsApp">WhatsApp Chat</option>
                  <option value="Email">Email Communication</option>
                </select>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="landlord-notes" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                Additional Notes or Specific Management Requirements (Optional)
              </label>
              <textarea
                id="landlord-notes"
                rows={3}
                maxLength={1200}
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention any specific questions (e.g. remote communication, payment records, planned renovations)..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
              />
            </div>

            <InquiryPrivacyNotice />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Prepare WhatsApp Request</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
            {whatsAppDraft && <WhatsAppDraftNotice href={whatsAppDraft.href} reference={whatsAppDraft.reference} />}
          </form>
        </div>
      </div>
    </div>
  );
};
