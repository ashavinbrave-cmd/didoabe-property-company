import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { ActivePage } from '../types/index';
import { OptimizedImage } from './OptimizedImage';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  MessageCircle,
  Building2,
  CheckCircle2,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacy, onOpenTerms }) => {
  const handleNav = (page: ActivePage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t-4 border-sky-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-sky-50 p-0.5 border-2 border-sky-400 shrink-0">
                <OptimizedImage
                  src={COMPANY_INFO.logoUrl}
                  alt="Didoabe Property Company Logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">
                  DIDOABE PROPERTY CO.
                </h3>
                <p className="text-sky-300 font-semibold text-xs tracking-wider uppercase">
                  {COMPANY_INFO.tagline}
                </p>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Property management support in Uganda, including rent collection, owner reporting, and tenant maintenance coordination.
            </p>

            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-sky-400">
                <Shield className="w-4 h-4 shrink-0 text-sky-400" />
                <span>Property Management Services</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-normal">
                This website describes the company's property management services. Contact the company with questions about other services.
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-sky-200 uppercase tracking-wider mb-4 border-l-2 border-sky-400 pl-2">
              Management Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-sky-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>Complete Property Management</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-sky-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>Rent Collection &amp; Payment Management</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-sky-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>Tenant Management &amp; Support</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-sky-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>Property Maintenance &amp; Repairs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('process')}
                  className="hover:text-sky-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>5-Step Management Process</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('transparency')}
                  className="hover:text-sky-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>Financial Records &amp; Reporting</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Support & Navigation */}
          <div>
            <h4 className="text-sm font-bold text-sky-200 uppercase tracking-wider mb-4 border-l-2 border-sky-400 pl-2">
              Client Support &amp; Hubs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('landlords')}
                  className="text-sky-300 hover:text-sky-200 transition-colors text-left font-medium cursor-pointer"
                >
                  For Property Owners (Consultation)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tenants')}
                  className="text-sky-300 hover:text-sky-200 transition-colors text-left font-medium cursor-pointer"
                >
                  For Tenants (WhatsApp Inquiries)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faqs')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  About Didoabe Property Company
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Office Location &amp; Directions
                </button>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-2">
                Availability
              </span>
              <p className="text-xs text-slate-300 flex items-start gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span>Call or message the company to confirm current availability.</span>
              </p>
              <p className="text-xs text-sky-300 mt-1.5 font-medium">
                {COMPANY_INFO.urgentContactNote}
              </p>
            </div>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-sky-200 uppercase tracking-wider mb-4 border-l-2 border-sky-400 pl-2">
              Kampala Offices
            </h4>
            
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Main Office:</p>
                  <p className="text-xs text-slate-400">{COMPANY_INFO.primaryOffice}</p>
                  <p className="font-semibold text-white mt-1">Branch Office:</p>
                  <p className="text-xs text-slate-400">{COMPANY_INFO.branchOffice}</p>
                  <p className="text-xs text-slate-400 mt-1">{COMPANY_INFO.postalAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div className="text-xs space-y-1">
                  <div>
                    <a href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`} className="inline-block py-1 text-white hover:text-sky-300 font-semibold">
                      {COMPANY_INFO.phones[0]}
                    </a>
                  </div>
                  <div>
                    <a href={`tel:${COMPANY_INFO.phones[1].replace(/\s+/g, '')}`} className="inline-block py-1 text-slate-300 hover:text-sky-300">
                      {COMPANY_INFO.phones[1]}
                    </a>
                  </div>
                  <div>
                    <a href={`tel:${COMPANY_INFO.phones[2].replace(/\s+/g, '')}`} className="inline-block py-1 text-slate-300 hover:text-sky-300">
                      {COMPANY_INFO.phones[2]}
                    </a>
                  </div>
                  <div>
                    <a href={`tel:${COMPANY_INFO.phones[3].replace(/\s+/g, '')}`} className="inline-block py-1 text-slate-300 hover:text-sky-300">
                      {COMPANY_INFO.phones[3]}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-xs text-slate-300 hover:text-sky-300 break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="pt-1">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
              &copy; {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={onOpenPrivacy} className="hover:text-slate-300 transition-colors cursor-pointer">
              Website Privacy Information
            </button>
            <button onClick={onOpenTerms} className="hover:text-slate-300 transition-colors cursor-pointer">
              Website Terms &amp; Calculator Notice
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
