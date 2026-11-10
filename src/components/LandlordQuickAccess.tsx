import React from 'react';
import { ActivePage } from '../types/index';
import {
  Building,
  Calculator,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  FileSpreadsheet,
} from 'lucide-react';

interface LandlordQuickAccessProps {
  onNavigate: (page: ActivePage) => void;
  onRequestConsultation: () => void;
}

export const LandlordQuickAccess: React.FC<LandlordQuickAccessProps> = ({
  onNavigate,
  onRequestConsultation,
}) => {
  return (
    <section className="py-12 bg-gradient-to-b from-sky-50/80 via-white to-sky-50/50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-b border-sky-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Container */}
        <div className="rounded-3xl bg-gradient-to-r from-sky-900 via-sky-800 to-sky-950 dark:from-sky-950 dark:via-slate-900 dark:to-sky-950 text-white p-6 sm:p-8 lg:p-10 shadow-xl border-2 border-sky-500/30 relative overflow-hidden">
          {/* Ambient decorative blur */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Heading and Description */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/20 border border-sky-300/40 text-sky-200 text-xs font-bold uppercase tracking-wider">
                <KeyRound className="w-3.5 h-3.5 text-sky-300" />
                <span>Property Owner &amp; Landlord Access</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Are You a Landlord or Property Owner?
              </h2>

              <p className="text-sky-100 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Explore property management services, model rent and expense scenarios, view a sample reporting layout, or contact the company.
              </p>

              {/* Quick stats checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-sky-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Payment and reporting arrangements as agreed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Tenant onboarding and payment tracking options</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Repair approvals discussed with the owner</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Remote communication arrangements can be discussed</span>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Fast-Action Buttons */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Action 1: Landlord Page Main */}
              <button
                onClick={() => onNavigate('landlords')}
                className="group p-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-sky-50 dark:hover:bg-slate-700 transition-all text-left shadow-md border border-white/20 flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2.5 rounded-xl bg-sky-700 text-white group-hover:scale-105 transition-transform">
                    <Building className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    Landlords Page &amp; Services
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Overview of services and owner benefits
                  </p>
                </div>
              </button>

              {/* Action 2: Consultation Request */}
              <button
                onClick={() => onRequestConsultation()}
                className="group p-4 rounded-2xl bg-sky-700 hover:bg-sky-700 text-white transition-all text-left shadow-md flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2.5 rounded-xl bg-white/20 text-white group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white leading-snug">
                    Request a Property Consultation
                  </h3>
                  <p className="text-[11px] text-white mt-1">
                    Ask whether a property walkthrough can be arranged
                  </p>
                </div>
              </button>

              {/* Action 3: Remittance Calculator */}
              <button
                onClick={() => {
                  const calcEl = document.getElementById('remittance-calculator-section');
                  if (calcEl) {
                    calcEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onNavigate('landlords');
                  }
                }}
                className="group p-4 rounded-2xl bg-sky-950/80 hover:bg-sky-900 text-white transition-all text-left shadow-md border border-sky-700/60 flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2.5 rounded-xl bg-sky-400/20 text-sky-300 group-hover:scale-105 transition-transform">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white leading-snug">
                    Rental Income Estimator
                  </h3>
                  <p className="text-[11px] text-sky-200 mt-1">
                    Explore a calculation using your own assumptions
                  </p>
                </div>
              </button>

              {/* Action 4: Sample Financial Statements */}
              <button
                onClick={() => onNavigate('transparency')}
                className="group p-4 rounded-2xl bg-sky-950/80 hover:bg-sky-900 text-white transition-all text-left shadow-md border border-sky-700/60 flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2.5 rounded-xl bg-sky-400/20 text-sky-300 group-hover:scale-105 transition-transform">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white leading-snug">
                    Sample Statement
                  </h3>
                  <p className="text-[11px] text-sky-200 mt-1">
                    View an example of how property records may be organized
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
