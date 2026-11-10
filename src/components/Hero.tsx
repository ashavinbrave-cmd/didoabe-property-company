import type { FC } from 'react';
import { COMPANY_INFO, PRIMARY_SERVICES_LIST } from '../data/companyData';
import { OptimizedImage } from './OptimizedImage';
import { ActivePage } from '../types/index';
import {
  ArrowRight,
  Building,
  Check,
  Info,
  KeyRound,
  MapPin,
  MessageCircle,
  PhoneCall,
  Receipt,
  Sparkles,
  Wrench,
} from 'lucide-react';

interface HeroProps {
  onNavigate: (page: ActivePage) => void;
}

export const Hero: FC<HeroProps> = ({ onNavigate }) => (
  <section className="relative isolate overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50/70 dark:from-slate-950 dark:via-slate-900 dark:to-sky-950/40 text-slate-900 dark:text-white border-b border-sky-100 dark:border-slate-800">
    <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />
    <div aria-hidden="true" className="pointer-events-none absolute -bottom-44 left-0 h-96 w-96 rounded-full bg-sky-400/15 blur-3xl" />

    <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-24">
      <div className="space-y-7 text-center lg:col-span-6 lg:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-800 shadow-sm dark:border-sky-800 dark:bg-slate-900/70 dark:text-sky-200">
          <Sparkles className="h-4 w-4 text-amber-500" aria-hidden="true" />
          Didoabe Property Company · Uganda
        </div>

        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
            Property management, made clearer
          </p>
          <h1 className="text-4xl leading-[1.04] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            We Manage.<br />
            <span className="text-sky-700 dark:text-sky-300">You Relax.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 lg:mx-0 lg:text-lg">
            Professional property management information for owners and residents, with clear ways to explore services and contact the team.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
          <button
            type="button"
            onClick={() => onNavigate('landlords')}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-900/10 transition hover:-translate-y-0.5 hover:bg-amber-400"
          >
            <KeyRound className="h-4 w-4" aria-hidden="true" />
            For Landlords
          </button>
          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sky-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-950/10 transition hover:-translate-y-0.5 hover:bg-sky-700"
          >
            <Building className="h-4 w-4" aria-hidden="true" />
            Explore Services
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-400 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            <Info className="h-4 w-4 text-sky-700 dark:text-sky-300" aria-hidden="true" />
            About Didoabe
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-400 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            <PhoneCall className="h-4 w-4 text-sky-700 dark:text-sky-300" aria-hidden="true" />
            Contact
          </button>
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:-translate-y-0.5 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200 dark:hover:bg-emerald-900"
            title="Chat with Didoabe Property Company on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 text-left shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            Services listed on this site
          </div>
          <ul className="grid grid-cols-1 gap-x-5 gap-y-2.5 text-sm text-slate-700 dark:text-slate-200 sm:grid-cols-2">
            {PRIMARY_SERVICES_LIST.map((service) => (
              <li key={service} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-700 dark:text-sky-300" aria-hidden="true" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
          Use the service pages and contact options to confirm availability, scope, and terms directly with the company.
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
        <div aria-hidden="true" className="absolute -inset-4 rotate-2 rounded-[2.25rem] bg-amber-300/30 dark:bg-sky-700/20" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-2xl shadow-slate-900/15 dark:border-slate-700 dark:bg-slate-800">
          <div className="relative overflow-hidden rounded-[1.5rem]">
            <OptimizedImage
              src="/assets/images/property-handover.jpg"
              alt="Two people shaking hands outside a modern residential home."
              className="aspect-[4/3] w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/5 to-transparent" />
            <div className="absolute left-5 top-5 flex items-center gap-3 rounded-2xl border border-white/40 bg-white/90 p-3 shadow-xl backdrop-blur dark:border-slate-600 dark:bg-slate-900/90">
              <OptimizedImage src={COMPANY_INFO.logoUrl} alt="" className="h-11 w-11 rounded-full object-contain" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Didoabe Property Company</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">Property management · Uganda</p>
              </div>
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-sm text-white">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">A service overview</p>
                <p className="mt-1 text-xl font-semibold">Support for property owners and residents</p>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/30 bg-black/40 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
                <MapPin className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                Residential property
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200">
                <Receipt className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-sans text-sm font-bold tracking-normal text-slate-900 dark:text-white">Owner information</h2>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">Explore services, estimates, and sample reporting details.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                <Wrench className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-sans text-sm font-bold tracking-normal text-slate-900 dark:text-white">Tenant support</h2>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">Prepare a WhatsApp draft for a property-related inquiry.</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('landlords')}
            className="mx-3 mb-3 flex min-h-12 w-[calc(100%-1.5rem)] items-center justify-center gap-2 rounded-xl bg-sky-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-900 dark:bg-sky-800 dark:hover:bg-sky-700"
          >
            <KeyRound className="h-4 w-4 text-amber-300" aria-hidden="true" />
            View landlord services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </section>
);
