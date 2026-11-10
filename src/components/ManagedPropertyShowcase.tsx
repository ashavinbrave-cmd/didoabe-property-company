import type { FC } from 'react';
import { OptimizedImage } from './OptimizedImage';
import { ActivePage } from '../types/index';
import { ArrowRight, Building2, Camera } from 'lucide-react';

interface ManagedPropertyShowcaseProps {
  onNavigate: (page: ActivePage) => void;
  onRequestConsultation: () => void;
}

const showcaseItems = [
  {
    title: 'Rental homes',
    description: 'A row of residential homes with shared access and landscaped frontage.',
    imageAlt: 'A row of residential homes around a shared courtyard.',
    imageSrc: '/assets/images/residential-homes.jpg',
  },
  {
    title: 'Residential property',
    description: 'Residential homes with paved access and covered entrances.',
    imageAlt: 'Several residential homes with tiled roofs and paved access.',
    imageSrc: '/assets/images/residential-property.jpg',
  },
  {
    title: 'Residential estate',
    description: 'A paved lane through a landscaped residential compound.',
    imageAlt: 'A paved lane between homes, plants, and residential gardens.',
    imageSrc: '/assets/images/residential-estate.jpg',
  },
  {
    title: 'Property partnership',
    description: 'Two people meeting outside a modern residential home.',
    imageAlt: 'Two people shaking hands in front of a modern home.',
    imageSrc: '/assets/images/property-handover.jpg',
  },
  {
    title: 'Office meeting',
    description: 'An office meeting between two people across a desk.',
    imageAlt: 'Two people meeting across a desk in a bright office.',
    imageSrc: '/assets/images/client-consultation.jpg',
  },
];

export const ManagedPropertyShowcase: FC<ManagedPropertyShowcaseProps> = ({
  onNavigate,
  onRequestConsultation,
}) => (
  <section className="bg-slate-50 py-20 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100" id="showcase">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-sky-800 dark:border-sky-800 dark:bg-slate-900 dark:text-sky-200">
            <Camera className="h-4 w-4 text-amber-500" aria-hidden="true" />
            Visual guide
          </div>
          <h2 className="text-3xl text-slate-950 dark:text-white sm:text-4xl">
            Property management, in context
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            Photos of residential properties and client interactions. Contact the company to confirm current services, locations, and availability.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('landlords')}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-sky-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-900 dark:bg-sky-800 dark:hover:bg-sky-700"
          >
            <Building2 className="h-4 w-4 text-amber-300" aria-hidden="true" />
            Landlord services
          </button>
          <button
            type="button"
            onClick={() => onRequestConsultation()}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-400 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            Request a consultation
            <ArrowRight className="h-4 w-4 text-sky-700 dark:text-sky-300" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {showcaseItems.map((item) => (
          <article
            key={item.title}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <OptimizedImage
                src={item.imageSrc}
                alt={item.imageAlt}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-lg font-bold text-white sm:text-xl">{item.title}</span>
            </div>
            <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
              <button
                type="button"
                aria-label={`Ask Didoabe about ${item.title.toLowerCase()}`}
                onClick={() => onRequestConsultation()}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-800 transition hover:bg-sky-100 dark:bg-sky-950 dark:text-sky-200 dark:hover:bg-sky-900"
              >
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
