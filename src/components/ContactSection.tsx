import React, { useRef, useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import {
  validateGeneralMessage,
  validateLandlordInquiry,
  validateTenantTicket,
} from '../utils/validation';
import { buildInquiryWhatsAppUrl, generateInquiryReference, openWhatsAppDraft } from '../utils/inquiry';
import { InquiryPrivacyNotice, WhatsAppDraftNotice } from './InquiryFeedback';
import { GeneralMessage, LandlordInquiry, TenantTicket } from '../types/index';
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Building,
  Wrench,
  Send,
  Navigation,
  Info,
} from 'lucide-react';

interface ContactSectionProps {
  headingLevel?: 'h1' | 'h2';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ headingLevel = 'h1' }) => {
  const Heading = headingLevel;
  const [activeTab, setActiveTab] = useState<'management' | 'information' | 'tenant'>('management');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // General info request state
  const [generalData, setGeneralData] = useState<Partial<GeneralMessage>>({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  // Landlord management inquiry state
  const [landlordData, setLandlordData] = useState<Partial<LandlordInquiry>>({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'Residential Apartments',
    location: '',
    unitsCount: 4,
    currentStatus: 'Currently Tenanted',
    preferredContact: 'Phone',
    notes: '',
  });
  const [landlordUnitsInput, setLandlordUnitsInput] = useState('4');

  // Tenant inquiry state
  const [tenantData, setTenantData] = useState<Partial<TenantTicket>>({
    tenantName: '',
    phone: '',
    propertyName: '',
    unitNumber: '',
    category: 'Plumbing & Drainage',
    urgency: 'Routine',
    description: '',
    preferredTime: 'Morning (8AM - 12PM)',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [whatsAppDraft, setWhatsAppDraft] = useState<{ href: string; reference: string } | null>(null);

  const handleLandlordUnitsChange = (value: string) => {
    setLandlordUnitsInput(value);
    const unitsCount = value === '' ? undefined : Number(value);
    setLandlordData((previous) => ({
      ...previous,
      unitsCount: unitsCount !== undefined && Number.isFinite(unitsCount) ? unitsCount : undefined,
    }));
  };

  const normalizeLandlordUnits = () => {
    const parsedUnits = Number.parseInt(landlordUnitsInput, 10);
    const unitsCount = Math.min(500, Math.max(1, Number.isFinite(parsedUnits) ? parsedUnits : 1));
    setLandlordUnitsInput(String(unitsCount));
    setLandlordData((previous) => ({ ...previous, unitsCount }));
  };

  const selectTab = (tab: 'management' | 'information' | 'tenant') => {
    setActiveTab(tab);
    setErrors({});
    setWhatsAppDraft(null);
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % 3;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex + 2) % 3;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = 2;
    else return;

    event.preventDefault();
    const nextTab = (['management', 'information', 'tenant'] as const)[nextIndex];
    selectTab(nextTab);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateGeneralMessage(generalData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    const reference = generateInquiryReference('general');
    const href = buildInquiryWhatsAppUrl('General information request', generalData as Record<string, string | number | undefined>, reference);
    setWhatsAppDraft({ href, reference });
    openWhatsAppDraft(href);
  };

  const handleLandlordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLandlordInquiry(landlordData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    const reference = generateInquiryReference('landlord');
    const href = buildInquiryWhatsAppUrl('Property management inquiry', landlordData as Record<string, string | number | undefined>, reference);
    setWhatsAppDraft({ href, reference });
    openWhatsAppDraft(href);
  };

  const handleTenantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateTenantTicket(tenantData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    const reference = generateInquiryReference('tenant');
    const href = buildInquiryWhatsAppUrl('Tenant inquiry or maintenance request', tenantData as Record<string, string | number | undefined>, reference);
    setWhatsAppDraft({ href, reference });
    openWhatsAppDraft(href);
  };

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors" id="contact">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-200 dark:border-sky-800">
            Contact Us
          </span>
          <Heading className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Get in Touch With Our Team
          </Heading>
          <p className="mt-3 text-sky-700 dark:text-sky-400 font-semibold text-lg">
            Didoabe Property Company &bull; Kampala, Uganda
          </p>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            Use the details below to ask about property management services, request information, or prepare a tenant inquiry.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Office Address */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-sky-100 dark:border-slate-800 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-100 dark:border-emerald-800">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">Office Address</h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Main Office:</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{COMPANY_INFO.primaryOffice}</p>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Branch Office:</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{COMPANY_INFO.branchOffice}</p>
            <p className="text-xs text-sky-700 dark:text-sky-400 font-mono mt-1">{COMPANY_INFO.postalAddress}</p>
          </div>

          {/* Official Phone Numbers */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-sky-100 dark:border-slate-800 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 flex items-center justify-center mb-4 border border-sky-100 dark:border-sky-800">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">Phone Numbers</h3>
            <div className="space-y-1.5 text-xs">
              <div>
                <a
                  href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
                  className="inline-block py-1 font-bold text-slate-900 dark:text-white hover:text-sky-700 dark:hover:text-sky-400"
                >
                  {COMPANY_INFO.phones[0]}
                </a>
                <span className="text-slate-500 block text-[10px]">Main contact</span>
              </div>
              <div>
                <a
                  href={`tel:${COMPANY_INFO.phones[1].replace(/\s+/g, '')}`}
                  className="inline-block py-1 text-slate-700 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-400 font-medium"
                >
                  {COMPANY_INFO.phones[1]}
                </a>
              </div>
              <div>
                <a
                  href={`tel:${COMPANY_INFO.phones[2].replace(/\s+/g, '')}`}
                  className="inline-block py-1 text-slate-700 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-400 font-medium"
                >
                  {COMPANY_INFO.phones[2]}
                </a>
              </div>
              <div>
                <a
                  href={`tel:${COMPANY_INFO.phones[3].replace(/\s+/g, '')}`}
                  className="inline-block py-1 text-slate-700 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-400 font-medium"
                >
                  {COMPANY_INFO.phones[3]}
                </a>
              </div>
            </div>
          </div>

          {/* Email & WhatsApp */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-sky-100 dark:border-slate-800 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 flex items-center justify-center mb-4 border border-sky-100 dark:border-sky-800">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">Email &amp; WhatsApp</h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Official Email:</p>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="text-xs text-sky-700 dark:text-sky-400 hover:underline break-all block mb-3 font-medium"
            >
              {COMPANY_INFO.email}
            </a>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">WhatsApp Contact:</p>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Open WhatsApp</span>
            </a>
          </div>

          {/* Availability */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-sky-100 dark:border-slate-800 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 border border-purple-100 dark:border-purple-800">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">Availability</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Call or message the company to confirm current availability.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold text-sky-700 dark:text-sky-400 uppercase block">
                Urgent issues:
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Call the company directly. Website forms are not emergency dispatch tickets.
              </p>
            </div>
          </div>
        </div>

        {/* Tabbed Interactive Forms Container (Matching the 3 prompt inquiry types) */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-800 overflow-hidden">
          {/* Tab Selection Bar */}
          <div role="tablist" aria-label="Choose an inquiry type" aria-orientation="horizontal" className="bg-sky-950 text-white px-3 sm:px-6 pt-4 flex flex-wrap gap-2 border-b border-sky-800">
            <button
              ref={(element) => { tabRefs.current[0] = element; }}
              id="contact-tab-management"
              role="tab"
              aria-controls="contact-panel-management"
              aria-selected={activeTab === 'management'}
              tabIndex={activeTab === 'management' ? 0 : -1}
              onKeyDown={(event) => handleTabKeyDown(event, 0)}
              onClick={() => selectTab('management')}
              type="button"
              className={`min-h-11 px-3 sm:px-5 py-3 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'management'
                  ? 'bg-white dark:bg-slate-800 text-sky-950 dark:text-sky-400 shadow'
                  : 'text-sky-200 hover:text-white hover:bg-sky-900'
              }`}
            >
              <Building className="w-4 h-4 text-sky-500" />
              <span>1. Inquire About Property Management Services</span>
            </button>

            <button
              ref={(element) => { tabRefs.current[1] = element; }}
              id="contact-tab-information"
              role="tab"
              aria-controls="contact-panel-information"
              aria-selected={activeTab === 'information'}
              tabIndex={activeTab === 'information' ? 0 : -1}
              onKeyDown={(event) => handleTabKeyDown(event, 1)}
              onClick={() => selectTab('information')}
              type="button"
              className={`min-h-11 px-3 sm:px-5 py-3 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'information'
                  ? 'bg-white dark:bg-slate-800 text-sky-950 dark:text-sky-400 shadow'
                  : 'text-sky-200 hover:text-white hover:bg-sky-900'
              }`}
            >
              <Info className="w-4 h-4 text-sky-500" />
              <span>2. Request Information</span>
            </button>

            <button
              ref={(element) => { tabRefs.current[2] = element; }}
              id="contact-tab-tenant"
              role="tab"
              aria-controls="contact-panel-tenant"
              aria-selected={activeTab === 'tenant'}
              tabIndex={activeTab === 'tenant' ? 0 : -1}
              onKeyDown={(event) => handleTabKeyDown(event, 2)}
              onClick={() => selectTab('tenant')}
              type="button"
              className={`min-h-11 px-3 sm:px-5 py-3 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'tenant'
                  ? 'bg-white dark:bg-slate-800 text-sky-950 dark:text-sky-400 shadow'
                  : 'text-sky-200 hover:text-white hover:bg-sky-900'
              }`}
            >
              <Wrench className="w-4 h-4 text-sky-500" />
              <span>3. Tenant Inquiry</span>
            </button>
          </div>

          <div className="p-6 sm:p-10">
            {/* Tab 1: Inquire About Property Management Services */}
            {activeTab === 'management' && (
              <div id="contact-panel-management" role="tabpanel" aria-labelledby="contact-tab-management" tabIndex={0}>
              <form onSubmit={handleLandlordSubmit} onChangeCapture={() => { setWhatsAppDraft(null); setErrors({}); }} className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    Inquire About Property Management Services
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tell us about your property. Prepare a WhatsApp message to send your inquiry to our team.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="c-mgmt-name" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Owner Name *
                    </label>
                    <input
                      id="c-mgmt-name"
                      type="text"
                      maxLength={100}
                      required
                      value={landlordData.fullName || ''}
                      onChange={(e) => setLandlordData({ ...landlordData, fullName: e.target.value })}
                      placeholder="e.g. Juliet Nabukeera"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                    />
                    {errors.fullName && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="c-mgmt-phone" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="c-mgmt-phone"
                      type="tel"
                      maxLength={25}
                      required
                      value={landlordData.phone || ''}
                      onChange={(e) => setLandlordData({ ...landlordData, phone: e.target.value })}
                      placeholder="e.g. +256 772 883 402"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                    />
                    {errors.phone && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="c-mgmt-location" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Property Location (District / Suburb) *
                    </label>
                    <input
                      id="c-mgmt-location"
                      type="text"
                      maxLength={160}
                      required
                      value={landlordData.location || ''}
                      onChange={(e) => setLandlordData({ ...landlordData, location: e.target.value })}
                      placeholder="e.g. Katooke, Nakawa, Naguru, Kira"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                    />
                    {errors.location && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.location}</p>}
                  </div>

                  <div>
                    <label htmlFor="c-mgmt-units" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Number of Units *
                    </label>
                    <input
                      id="c-mgmt-units"
                      type="number"
                      min="1"
                      max="500"
                      step="1"
                      required
                      value={landlordUnitsInput}
                      onChange={(e) => handleLandlordUnitsChange(e.target.value)}
                      onBlur={normalizeLandlordUnits}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="c-mgmt-notes" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Special notes or management requirements
                  </label>
                  <textarea
                    id="c-mgmt-notes"
                    rows={3}
                    maxLength={1200}
                    value={landlordData.notes || ''}
                    onChange={(e) => setLandlordData({ ...landlordData, notes: e.target.value })}
                    placeholder="Details about an existing tenancy, payment questions, or remote communication requests..."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <InquiryPrivacyNotice />

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Building className="w-4 h-4 text-white" />
                  <span>Prepare WhatsApp Inquiry</span>
                </button>
                {whatsAppDraft && <WhatsAppDraftNotice href={whatsAppDraft.href} reference={whatsAppDraft.reference} />}
              </form>
              </div>
            )}

            {/* Tab 2: Request Information */}
            {activeTab === 'information' && (
              <div id="contact-panel-information" role="tabpanel" aria-labelledby="contact-tab-information" tabIndex={0}>
              <form onSubmit={handleGeneralSubmit} onChangeCapture={() => { setWhatsAppDraft(null); setErrors({}); }} className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    Request Information
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Use this form to request brochures, fee schedules, partnership information, or general answers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="gen-fullName" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="gen-fullName"
                      type="text"
                      maxLength={100}
                      required
                      value={generalData.fullName || ''}
                      onChange={(e) => setGeneralData({ ...generalData, fullName: e.target.value })}
                      placeholder="e.g. Dennis Kasozi"
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                        errors.fullName ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                    {errors.fullName && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="gen-phone" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="gen-phone"
                      type="tel"
                      maxLength={25}
                      required
                      value={generalData.phone || ''}
                      onChange={(e) => setGeneralData({ ...generalData, phone: e.target.value })}
                      placeholder="e.g. +256 772 883 402"
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                        errors.phone ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                    {errors.phone && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="gen-email" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      id="gen-email"
                      type="email"
                      maxLength={254}
                      value={generalData.email || ''}
                      onChange={(e) => setGeneralData({ ...generalData, email: e.target.value })}
                      placeholder="e.g. dennis@gmail.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                    />
                    {errors.email && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="gen-subject" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Subject *
                    </label>
                    <input
                      id="gen-subject"
                      type="text"
                      maxLength={120}
                      required
                      value={generalData.subject || ''}
                      onChange={(e) => setGeneralData({ ...generalData, subject: e.target.value })}
                      placeholder="e.g. Inquiry on Management Terms &amp; Commission"
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                        errors.subject ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                    {errors.subject && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="gen-message" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Your Information Request *
                  </label>
                  <textarea
                    id="gen-message"
                    rows={4}
                    maxLength={1200}
                    required
                    value={generalData.message || ''}
                    onChange={(e) => setGeneralData({ ...generalData, message: e.target.value })}
                    placeholder="Provide details about what information you require..."
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                      errors.message ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.message && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.message}</p>}
                </div>

                <InquiryPrivacyNotice />

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Prepare WhatsApp Message</span>
                </button>
                {whatsAppDraft && <WhatsAppDraftNotice href={whatsAppDraft.href} reference={whatsAppDraft.reference} />}
              </form>
              </div>
            )}

            {/* Tab 3: Tenant Inquiry */}
            {activeTab === 'tenant' && (
              <div id="contact-panel-tenant" role="tabpanel" aria-labelledby="contact-tab-tenant" tabIndex={0}>
              <form onSubmit={handleTenantSubmit} onChangeCapture={() => { setWhatsAppDraft(null); setErrors({}); }} className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    Tenant Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Use this form for resident assistance, repair requests, or tenancy questions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="c-tenant-name" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Tenant Name *
                    </label>
                    <input
                      id="c-tenant-name"
                      type="text"
                      maxLength={100}
                      required
                      value={tenantData.tenantName || ''}
                      onChange={(e) => setTenantData({ ...tenantData, tenantName: e.target.value })}
                      placeholder="e.g. Patricia Namuli"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                    />
                    {errors.tenantName && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.tenantName}</p>}
                  </div>

                  <div>
                    <label htmlFor="c-tenant-phone" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="c-tenant-phone"
                      type="tel"
                      maxLength={25}
                      required
                      value={tenantData.phone || ''}
                      onChange={(e) => setTenantData({ ...tenantData, phone: e.target.value })}
                      placeholder="e.g. +256 784 609 532"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                    />
                    {errors.phone && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="c-tenant-property" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Property Name *
                    </label>
                    <input
                      id="c-tenant-property"
                      type="text"
                      maxLength={160}
                      required
                      value={tenantData.propertyName || ''}
                      onChange={(e) => setTenantData({ ...tenantData, propertyName: e.target.value })}
                      placeholder="e.g. Katooke Apartments"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                    />
                    {errors.propertyName && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.propertyName}</p>}
                  </div>

                  <div>
                    <label htmlFor="c-tenant-unit" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Unit Number *
                    </label>
                    <input
                      id="c-tenant-unit"
                      type="text"
                      maxLength={40}
                      required
                      value={tenantData.unitNumber || ''}
                      onChange={(e) => setTenantData({ ...tenantData, unitNumber: e.target.value })}
                      placeholder="e.g. Unit 2A"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                    />
                    {errors.unitNumber && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.unitNumber}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="c-tenant-desc" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Describe Your Inquiry or Issue *
                  </label>
                  <textarea
                    id="c-tenant-desc"
                    rows={3}
                    maxLength={1200}
                    required
                    value={tenantData.description || ''}
                    onChange={(e) => setTenantData({ ...tenantData, description: e.target.value })}
                    placeholder="Describe the inquiry or repair issue in detail..."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                  />
                  {errors.description && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.description}</p>}
                </div>

                <InquiryPrivacyNotice />

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Wrench className="w-4 h-4 text-white" />
                  <span>Prepare WhatsApp Inquiry</span>
                </button>
                {whatsAppDraft && <WhatsAppDraftNotice href={whatsAppDraft.href} reference={whatsAppDraft.reference} />}
              </form>
              </div>
            )}
          </div>
        </div>

        {/* Kampala Office Visiting Directions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-sky-700 dark:text-sky-400">
                <Navigation className="w-4 h-4" />
                <span>Visiting Our Offices</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Nakawa Ura Small Gate &amp; Katooke Wamala Road, Kampala
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Contact the company to confirm current office availability and arrange a visit before travelling.
              </p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent('Nakawa Ura Small Gate, Kampala, Uganda')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 text-sky-800 dark:text-sky-300 text-xs font-bold transition-colors inline-flex items-center gap-2 shrink-0 border border-sky-200 dark:border-slate-700"
            >
              <span>View Nakawa Office on Google Maps</span>
              <Navigation className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="text-sm font-bold text-sky-700 underline dark:text-sky-300" href={`https://maps.google.com/?q=${encodeURIComponent('Katooke Wamala Road, Kampala, Uganda')}`} target="_blank" rel="noopener noreferrer">View Katooke Office on Google Maps</a>
          </div>
        </div>
      </div>
    </div>
  );
};
