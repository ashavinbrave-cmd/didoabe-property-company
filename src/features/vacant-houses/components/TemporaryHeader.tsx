import type React from 'react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * TEMPORARY HEADER COMPONENT
 * ---------------------------------------------------------------------------
 * This header is provided solely for standalone previewing of the Vacant Houses
 * page. Remove or omit this component (`showTemporaryChrome={false}`) when
 * integrating VacantHousesPage into the existing Didoabe Property Company website.
 */
interface TemporaryHeaderProps {
  onSelectHome?: () => void;
  onSelectVacantHouses?: () => void;
  onEnquireClick?: () => void;
}

export const TemporaryHeader: React.FC<TemporaryHeaderProps> = ({
  onSelectHome,
  onSelectVacantHouses,
  onEnquireClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId?: string,
    callback?: () => void
  ) => {
    if (callback) {
      e.preventDefault();
      callback();
    } else if (targetId) {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#031130]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo Placeholder (single clean element) */}
        <a
          href="#vacant-houses-top"
          onClick={(e) => handleNavClick(e, 'vacant-houses-top', onSelectVacantHouses)}
          className="flex items-center gap-2.5 text-[#031130] whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1] rounded-lg py-1"
        >
          <span
            className="w-8 h-8 rounded-lg bg-[#031130] text-white flex items-center justify-center font-display font-bold text-sm tracking-tight"
            aria-hidden="true"
          >
            D
          </span>
          <span className="font-display font-bold text-base sm:text-lg tracking-tight">
            Didoabe Property Company
          </span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation (Temporary Preview)"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#031130]/75"
        >
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'vacant-houses-top', onSelectHome)}
            className="hover:text-[#031130] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#185DF1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1] rounded-xs"
          >
            Home
          </a>
          <a
            href="#vacant-houses-top"
            onClick={(e) => handleNavClick(e, 'vacant-houses-top', onSelectVacantHouses)}
            aria-current="page"
            className="text-[#185DF1] font-semibold transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-[#185DF1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1] rounded-xs"
          >
            Vacant Houses
          </a>
        </nav>

        {/* Zone 3: Single Primary Enquiry Action + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onEnquireClick) {
                onEnquireClick();
              } else {
                const el = document.getElementById('all-available-houses');
                el?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#185DF1] hover:bg-[#144ED0] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#031130] focus-visible:ring-offset-2 cursor-pointer"
          >
            Make an Enquiry
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#031130]/15 text-[#031130] hover:bg-[#F3F7FE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#185DF1] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#031130]/10 px-4 py-4 space-y-1 shadow-lg">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'vacant-houses-top', onSelectHome)}
            className="block px-3 py-3 rounded-lg text-sm font-medium text-[#031130]/80 hover:bg-[#F3F7FE] hover:text-[#031130]"
          >
            Home
          </a>
          <a
            href="#vacant-houses-top"
            onClick={(e) => handleNavClick(e, 'vacant-houses-top', onSelectVacantHouses)}
            className="block px-3 py-3 rounded-lg text-sm font-semibold text-[#185DF1] bg-[#F3F7FE]"
          >
            Vacant Houses
          </a>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onEnquireClick?.();
              }}
              className="w-full py-3 px-4 rounded-lg bg-[#185DF1] text-white text-sm font-semibold text-center"
            >
              Make an Enquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

