import React, { useState } from 'react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/companyData';
import { PropertyService } from '../types/index';
import {
  Building2,
  Banknote,
  FileCheck,
  UserCheck,
  TrendingUp,
  BarChart3,
  Receipt,
  Search,
  Wrench,
  MessageSquareText,
  ShieldCheck,
  Calculator,
  Zap,
  Users,
  History,
  PieChart,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
  onRequestConsultation: () => void;
  headingLevel?: 'h1' | 'h2';
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForInquiry,
  onRequestConsultation,
  headingLevel = 'h2',
}) => {
  const Heading = headingLevel;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const categories = [
    'All',
    'Financial & Remittance',
    'Tenancy & Onboarding',
    'Maintenance & Care',
    'Legal & Operations',
  ];

  const filteredServices =
    selectedCategory === 'All'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  const renderIcon = (name: string) => {
    const props = { className: 'w-6 h-6 text-sky-500 dark:text-sky-400' };
    switch (name) {
      case 'Building2':
        return <Building2 {...props} />;
      case 'Banknote':
        return <Banknote {...props} />;
      case 'FileCheck':
        return <FileCheck {...props} />;
      case 'UserCheck':
        return <UserCheck {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'BarChart3':
        return <BarChart3 {...props} />;
      case 'Receipt':
        return <Receipt {...props} />;
      case 'Search':
        return <Search {...props} />;
      case 'Wrench':
        return <Wrench {...props} />;
      case 'MessageSquareText':
        return <MessageSquareText {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Calculator':
        return <Calculator {...props} />;
      case 'Zap':
        return <Zap {...props} />;
      case 'Users':
        return <Users {...props} />;
      case 'History':
        return <History {...props} />;
      case 'PieChart':
        return <PieChart {...props} />;
      default:
        return <Building2 {...props} />;
    }
  };

  const handleInquire = (service: PropertyService) => {
    if (onSelectServiceForInquiry) {
      onSelectServiceForInquiry(service.title);
    } else {
      onRequestConsultation();
    }
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-xs font-extrabold uppercase tracking-wider mb-3 border border-sky-200 dark:border-sky-800">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            Property Management Services
          </div>
          <Heading className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Property Management Solutions
          </Heading>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore property management services for owners and tenants. Confirm scope, availability, and arrangements directly with the company.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-700 dark:bg-sky-700 text-white shadow-md shadow-sky-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;
            return (
              <div
                key={service.id}
                className={`bg-white dark:bg-slate-800/90 rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                  isExpanded
                    ? 'border-sky-400 dark:border-sky-500 ring-2 ring-sky-400/20 dark:ring-sky-500/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-600'
                }`}
              >
                <div className="p-6">
                  {/* Category & Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-sky-50 dark:bg-slate-900 rounded-xl border border-sky-100 dark:border-slate-700">
                      {renderIcon(service.iconName)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-800 rounded-md">
                      {service.category.split('&')[0]}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Expandable Details */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-4 animate-fadeIn">
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {service.fullDesc}
                      </p>

                      <div>
                        <span className="text-[11px] uppercase font-bold text-sky-700 dark:text-sky-400 block mb-2">
                          Key Deliverables:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-sky-50/70 dark:bg-slate-900/60 rounded-lg border border-sky-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                          Owner Benefit:
                        </span>
                        {service.ownerBenefit}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <button
                    onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                    aria-expanded={isExpanded}
                    className="text-xs font-bold text-sky-700 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                  >
                    {isExpanded ? 'Show Less' : 'View Full Scope'}
                  </button>
                  <button
                    onClick={() => handleInquire(service)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-400 transition-colors"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-sky-900 via-sky-800 to-sky-950 text-white rounded-2xl p-8 lg:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-sky-700">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
              Service Areas
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Need Professional Management for Your Ugandan Property?
            </h3>
            <p className="text-sky-100 text-sm mt-2 leading-relaxed">
              The company lists the following areas of operation. Contact it to confirm coverage for your property.
            </p>
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2" aria-label="Listed areas of operation">
              {COMPANY_INFO.coverageAreas.map((area) => (
                <span key={area} className="rounded-full border border-sky-300/30 bg-sky-950/40 px-3 py-1 text-xs font-medium text-sky-100">
                  {area}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => onRequestConsultation()}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-sm shadow transition-all flex items-center gap-2"
          >
            <span>Request Management Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
