import React from 'react';
import { WHY_CHOOSE_US_POINTS } from '../data/companyData';
import {
  ShieldCheck,
  FileSpreadsheet,
  Receipt,
  Wrench,
  UserCheck,
  MessageSquareText,
  Building2,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface WhyChooseUsSectionProps {
  onRequestConsultation: () => void;
  onContactClick: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck,
  FileSpreadsheet,
  Receipt,
  Wrench,
  UserCheck,
  MessageSquareText,
  Building2,
  HeartHandshake,
};

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  onRequestConsultation,
  onContactClick,
}) => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-b border-sky-100 dark:border-slate-800 transition-colors" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-200 dark:border-sky-700">
            Why Choose Us?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Property Management Services for Owners and Tenants
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore Didoabe's property management services, tenant support, rent collection, maintenance coordination, and reporting options.
          </p>
        </div>

        {/* 8 Core Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US_POINTS.map((point, index) => {
            const Icon = ICON_MAP[point.iconName] || ShieldCheck;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700/80 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-lg dark:hover:shadow-sky-950/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-700/10 dark:bg-sky-700/20 text-sky-700 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black text-sky-700 dark:text-sky-400">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
                    {point.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-sky-100 dark:border-slate-700/60 flex items-center gap-1.5 text-xs font-semibold text-sky-700 dark:text-sky-400">
                  <CheckCircle2 className="w-4 h-4 text-sky-500" />
                  <span>Our Approach</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Service commitment banner */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 dark:from-sky-950 dark:via-slate-900 dark:to-sky-950 text-white p-8 sm:p-10 shadow-xl border border-sky-400/30 dark:border-sky-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <span className="text-xs uppercase font-extrabold tracking-wider text-sky-100 dark:text-sky-400">
              Our approach
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              "We Manage, You Relax"
            </h3>
            <p className="text-sm text-sky-100 dark:text-slate-300 leading-relaxed">
              Ask the company to confirm service scope, fees, responsibilities, and arrangements for your property.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onRequestConsultation()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-sky-50 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Request a Property Consultation</span>
              <ArrowRight className="w-4 h-4 text-sky-700" />
            </button>
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-sky-700 hover:bg-sky-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-sm border border-sky-300/30 dark:border-slate-700 transition-all text-center"
            >
              Speak with a Manager
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
