import React, { useState } from 'react';
import { TenantTicket } from '../types/index';
import { validateTenantTicket } from '../utils/validation';
import { buildInquiryWhatsAppUrl, generateInquiryReference, openWhatsAppDraft } from '../utils/inquiry';
import { InquiryPrivacyNotice, WhatsAppDraftNotice } from './InquiryFeedback';
import { COMPANY_INFO, TENANT_PILLARS } from '../data/companyData';
import {
  Wrench,
  AlertTriangle,
  PhoneCall,
  MessageCircle,
  Send,
  CheckCircle2,
} from 'lucide-react';

export const TenantSection: React.FC = () => {
  const [ticketData, setTicketData] = useState<Partial<TenantTicket>>({
    tenantName: '',
    phone: '',
    email: '',
    propertyName: '',
    unitNumber: '',
    category: 'Plumbing & Drainage',
    urgency: 'Routine',
    description: '',
    preferredTime: 'Morning (8AM - 12PM)',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [whatsAppDraft, setWhatsAppDraft] = useState<{ href: string; reference: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateTenantTicket(ticketData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const reference = generateInquiryReference('tenant');
    const href = buildInquiryWhatsAppUrl('Tenant maintenance inquiry', ticketData as Record<string, string | number | undefined>, reference);
    setWhatsAppDraft({ href, reference });
    openWhatsAppDraft(href);
  };

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors" id="tenants">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-200 dark:border-sky-800">
            For Tenants
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Tenant Support, Repairs &amp; Payment Care
          </h1>
          <p className="mt-3 text-sky-700 dark:text-sky-400 font-semibold text-lg">
            Tenant Support and Property Information
          </p>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            Find contact details and prepare an inquiry about rent payments, maintenance, tenancy information, or other property-related questions. Support arrangements depend on the property.
          </p>
        </div>

        {/* Emergency Notice Strip */}
        <div className="bg-sky-50 dark:bg-slate-900 border-2 border-sky-300 dark:border-sky-700/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-sky-700 dark:bg-sky-700 text-white rounded-xl shrink-0 shadow-xs">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white text-lg">
                Urgent Emergency (Burst Pipe, Electrical Sparks, Security Risk)?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                This website form is not an emergency dispatch service. For urgent safety or property issues, call the company directly.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
              className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>{COMPANY_INFO.phones[0]}</span>
            </a>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* 5 Tenant Pillars from Prompt */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
              Tenant Support Options
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Topics You Can Ask About
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TENANT_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-sky-100 dark:border-slate-800 shadow-xs hover:border-sky-400 dark:hover:border-sky-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-700/10 dark:bg-sky-700/20 text-sky-700 dark:text-sky-400 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tenant Maintenance Request Ticket Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 lg:p-10">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>WhatsApp Inquiry Form</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Prepare a Maintenance or Support Inquiry
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              This form prepares a WhatsApp message; it does not create a tracked ticket. Review the draft and press Send in WhatsApp to contact the company.
            </p>
          </div>

          <form onSubmit={handleSubmit} onChangeCapture={() => { setWhatsAppDraft(null); setErrors({}); }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tenant Name */}
              <div>
                <label htmlFor="tenant-name" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Tenant Full Name *
                </label>
                <input
                  id="tenant-name"
                  type="text"
                  maxLength={100}
                  required
                  value={ticketData.tenantName || ''}
                  onChange={(e) => setTicketData({ ...ticketData, tenantName: e.target.value })}
                  placeholder="e.g. Grace Tumusiime"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                    errors.tenantName ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.tenantName && (
                  <p role="alert" className="text-xs text-rose-600 mt-1">{errors.tenantName}</p>
                )}
              </div>

              {/* Tenant Phone */}
              <div>
                <label htmlFor="tenant-phone" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number *
                </label>
                <input
                  id="tenant-phone"
                  type="tel"
                  maxLength={25}
                  required
                  value={ticketData.phone || ''}
                  onChange={(e) => setTicketData({ ...ticketData, phone: e.target.value })}
                  placeholder="e.g. +256 784 609 532"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                    errors.phone ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.phone && <p role="alert" className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
              </div>

              {/* Property Name */}
              <div>
                <label htmlFor="tenant-property" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Managed Property Name / Building *
                </label>
                <input
                  id="tenant-property"
                  type="text"
                  maxLength={160}
                  required
                  value={ticketData.propertyName || ''}
                  onChange={(e) => setTicketData({ ...ticketData, propertyName: e.target.value })}
                  placeholder="e.g. Katooke Heights, Nakawa Court, Wamala Villas"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                    errors.propertyName ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.propertyName && (
                  <p role="alert" className="text-xs text-rose-600 mt-1">{errors.propertyName}</p>
                )}
              </div>

              {/* Unit / Flat Number */}
              <div>
                <label htmlFor="tenant-unit" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Unit / Apartment / Shop Number *
                </label>
                <input
                  id="tenant-unit"
                  type="text"
                  maxLength={40}
                  required
                  value={ticketData.unitNumber || ''}
                  onChange={(e) => setTicketData({ ...ticketData, unitNumber: e.target.value })}
                  placeholder="e.g. Apt 3B, House 12, Shop 04"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                    errors.unitNumber ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.unitNumber && (
                  <p role="alert" className="text-xs text-rose-600 mt-1">{errors.unitNumber}</p>
                )}
              </div>

              {/* Issue Category */}
              <div>
                <label htmlFor="tenant-category" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Issue Category *
                </label>
                <select
                  id="tenant-category"
                  value={ticketData.category}
                  onChange={(e) =>
                    setTicketData({
                      ...ticketData,
                      category: e.target.value as TenantTicket['category'],
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                >
                  <option value="Plumbing & Drainage">Plumbing &amp; Drainage (Leaks, Clogs, Taps)</option>
                  <option value="Electrical & Power">Electrical &amp; Power (Sockets, Breakers, Wiring)</option>
                  <option value="Roofing & Ceiling">Roofing &amp; Ceiling (Leaks, Dampness)</option>
                  <option value="Doors, Windows & Locks">Doors, Windows &amp; Locks (Security)</option>
                  <option value="Painting & Structural">Painting &amp; Structural Cracks</option>
                  <option value="Water / Utilities">Water / Utilities (NWSC meter, communal pump)</option>
                  <option value="Other Maintenance">Other Maintenance Issue</option>
                </select>
              </div>

              {/* Urgency Level */}
              <div>
                <label htmlFor="tenant-urgency" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Urgency Level *
                </label>
                <select
                  id="tenant-urgency"
                  value={ticketData.urgency}
                  onChange={(e) =>
                    setTicketData({
                      ...ticketData,
                      urgency: e.target.value as TenantTicket['urgency'],
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                >
                  <option value="Routine">Routine</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Emergency">Emergency (for urgent issues, call directly)</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="tenant-description" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                Detailed Description of the Issue *
              </label>
              <textarea
                id="tenant-description"
                rows={4}
                maxLength={1200}
                required
                value={ticketData.description || ''}
                onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
                placeholder="Describe when the issue began, exact location in the unit (e.g. bathroom mixer tap leaking), and any action taken..."
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white ${
                  errors.description ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.description && (
                <p role="alert" className="text-xs text-rose-600 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Preferred contact time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <label htmlFor="tenant-preferredTime" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Time to Contact You (Optional)
                </label>
                <select
                  id="tenant-preferredTime"
                  value={ticketData.preferredTime}
                  onChange={(e) =>
                    setTicketData({
                      ...ticketData,
                      preferredTime: e.target.value as TenantTicket['preferredTime'],
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 dark:text-white"
                >
                  <option value="Morning (8AM - 12PM)">Morning (8:00 AM – 12:00 PM)</option>
                  <option value="Afternoon (12PM - 5PM)">Afternoon (12:00 PM – 5:00 PM)</option>
                  <option value="Weekend">Weekend (confirm availability)</option>
                </select>
              </div>

              <InquiryPrivacyNotice />
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Prepare WhatsApp Inquiry</span>
              </button>
            </div>
            {whatsAppDraft && <WhatsAppDraftNotice href={whatsAppDraft.href} reference={whatsAppDraft.reference} />}
          </form>
        </div>
      </div>
    </div>
  );
};
