import React from 'react';
import { COMPANY_INFO, COMPANY_VALUES } from '../data/companyData';
import { OptimizedImage } from './OptimizedImage';
import {
  Shield,
  Target,
  Eye,
  HeartHandshake,
  CheckCircle,
  Clock,
  Phone,
  CheckCircle2,
} from 'lucide-react';

interface AboutSectionProps {
  onRequestConsultation: () => void;
}

const VALUE_ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  Eye,
  CheckCircle2,
  Clock,
  HeartHandshake,
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onRequestConsultation }) => {
  return (
    <div className="py-16 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-200 dark:border-sky-800">
            About Our Company
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Didoabe Property Company
          </h1>
          <p className="mt-3 text-sky-700 dark:text-sky-400 font-semibold text-lg sm:text-xl">
            "We Manage, You Relax"
          </p>
        </div>

        {/* Who We Are Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-bold text-xs uppercase tracking-wide">
              <span>Who We Are</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
              Property Management Services for Owners and Tenants
            </h2>

            <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
              Didoabe Property Company provides property management services for property owners, landlords, and tenants.
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Services listed on this site include rent collection, tenant communication, maintenance coordination, and property-related recordkeeping.
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Through transparency, accountability, and efficient communication, we aim to build lasting relationships with our clients and provide dependable property management services.
            </p>

            <div className="p-4 rounded-xl bg-sky-50 dark:bg-slate-800/80 border border-sky-200 dark:border-slate-700 text-xs sm:text-sm text-sky-950 dark:text-sky-200 space-y-1">
              <span className="font-bold block text-sky-900 dark:text-sky-300">
                Property management services
              </span>
              <p>
                This site describes the company's property management services. Contact the company to confirm service scope and availability for your property.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-gradient-to-br from-sky-950 via-slate-900 to-sky-950 text-white p-8 shadow-xl border border-sky-800 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-sky-50 p-0.5 border-2 border-sky-400 shrink-0">
                  <OptimizedImage
                    src={COMPANY_INFO.logoUrl}
                    alt="Didoabe Property Company Official Logo"
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">DIDOABE PROPERTY CO LTD</h3>
                  <p className="text-xs text-sky-300 font-semibold">{COMPANY_INFO.tagline}</p>
                  <p className="text-xs text-sky-200 mt-0.5">{COMPANY_INFO.location}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Property management services in Kampala, Uganda</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Kampala Offices: Nakawa Ura Small Gate &amp; Katooke Wamala Road</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Property management, rent collection, tenant support, and maintenance coordination</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Services and communication arrangements can be discussed directly</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
                <span>P.O. Box:</span>
                <span className="text-white font-medium">{COMPANY_INFO.postalAddress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision from Prompt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-sky-50/60 dark:bg-slate-800/70 rounded-2xl p-8 border border-sky-100 dark:border-slate-700 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-700/15 text-sky-700 dark:text-sky-400 flex items-center justify-center mb-2">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              To support property owners and tenants through transparent property management, clear records, and constructive communication.
            </p>
          </div>

          <div className="bg-sky-50/60 dark:bg-slate-800/70 rounded-2xl p-8 border border-sky-100 dark:border-slate-700 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-700/15 text-sky-700 dark:text-sky-400 flex items-center justify-center mb-2">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              To become a trusted provider of professional property management services, recognized for integrity, accountability, and excellent customer service.
            </p>
          </div>
        </div>

        {/* Our Values Section from Prompt */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
              Guiding Principles
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Our Values
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              These principles guide the company's approach to property management and communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {COMPANY_VALUES.map((val, idx) => {
              const Icon = VALUE_ICON_MAP[val.iconName] || Shield;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-sky-100 dark:border-slate-700 shadow-xs hover:border-sky-400 dark:hover:border-sky-500 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-sky-700/10 dark:bg-sky-700/20 text-sky-700 dark:text-sky-400 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                      {val.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {val.shortDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border border-sky-200 dark:border-slate-700 rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Discuss Property Management Services
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Contact the company to discuss your residential or commercial property and ask what services are available.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onRequestConsultation()}
              className="px-6 py-3 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-sm transition-all shadow"
            >
              Request a Property Consultation
            </button>
            <a
              href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
              className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-sky-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold text-sm hover:bg-sky-50 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-sky-700 dark:text-sky-400" />
              <span>Call: {COMPANY_INFO.phones[0]}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
