import type React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import type { DidoabeContactConfig } from '../types/property';
import { buildGeneralInquiryWhatsAppUrl, hasVerifiedWhatsApp } from '../utils/formatters';

/**
 * TEMPORARY FOOTER COMPONENT
 * ---------------------------------------------------------------------------
 * Independent, removable footer for standalone testing of the Vacant Houses page.
 * Omit or remove this component (`showTemporaryChrome={false}`) during integration
 * into the existing Didoabe Property Company website.
 */
interface TemporaryFooterProps {
  config: DidoabeContactConfig;
  onNavigateVacantHouses?: () => void;
}

export const TemporaryFooter: React.FC<TemporaryFooterProps> = ({
  config,
  onNavigateVacantHouses,
}) => {
  const currentYear = new Date().getFullYear();
  const contactDetailsVerified = hasVerifiedWhatsApp(config);
  const whatsappHref = buildGeneralInquiryWhatsAppUrl(config);
  const phoneDigits = config.phoneDisplayPlaceholder.replace(/[^+\d]/g, '');

  return (
    <footer
      id="temporary-footer"
      className="bg-[#031130] text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span
                className="w-8 h-8 rounded-lg bg-[#185DF1] text-white flex items-center justify-center font-display font-bold text-sm"
                aria-hidden="true"
              >
                D
              </span>
              <span className="font-display font-bold text-lg tracking-tight">
                {config.companyName}
              </span>
            </div>
            <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-md">
              Professional residential property management across Uganda. Transparent
              monthly rentals, clear tenancy terms, and responsive tenant support.
            </p>
            <p className="text-xs text-[#94A3B8]">
              Preview footer — replace with Didoabe&apos;s site-wide footer during integration.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="font-display text-sm font-semibold text-white tracking-wide">
              Navigation
            </h2>
            <ul className="space-y-2.5 text-sm text-[#CBD5E1]">
              <li>
                <a
                  href="#all-available-houses"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateVacantHouses?.();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Back to listings
                </a>
              </li>
              <li>
                <a
                  href="#all-available-houses"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateVacantHouses?.();
                    document
                      .getElementById('all-available-houses')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Vacant Houses
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="font-display text-sm font-semibold text-white tracking-wide">
              Contact Placeholders
            </h2>
            <ul className="space-y-2.5 text-sm text-[#CBD5E1]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#185DF1] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {contactDetailsVerified ? config.officeAddressPlaceholder : `Address placeholder: ${config.officeAddressPlaceholder}`}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#185DF1] shrink-0" aria-hidden="true" />
                {contactDetailsVerified ? (
                  <a className="tabular-nums hover:text-white" href={`tel:${phoneDigits}`}>{config.phoneDisplayPlaceholder}</a>
                ) : (
                  <span className="tabular-nums">Telephone placeholder: {config.phoneDisplayPlaceholder}</span>
                )}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#185DF1] shrink-0" aria-hidden="true" />
                {contactDetailsVerified ? (
                  <a className="hover:text-white" href={`mailto:${config.emailPlaceholder}`}>{config.emailPlaceholder}</a>
                ) : (
                  <span>Email placeholder: {config.emailPlaceholder}</span>
                )}
              </li>
            </ul>

            <div className="pt-2">
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-sm font-medium text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span className="tabular-nums">WhatsApp: {config.whatsappDisplayPlaceholder}</span>
                </a>
              ) : (
                <p className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 text-sm text-[#CBD5E1]">
                  <MessageCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span>WhatsApp placeholder: {config.whatsappDisplayPlaceholder}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#94A3B8]">
          <p>
            © {currentYear} {config.companyName}. All rights reserved.
          </p>
          <p>All rental applications are subject to company verification and approval.</p>
        </div>
      </div>
    </footer>
  );
};

