import React, { useEffect, useRef, useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { ActivePage } from '../types/index';
import { OptimizedImage } from './OptimizedImage';
import {
  Phone,
  MapPin,
  Menu,
  X,
  MessageCircle,
  Shield,
  ChevronRight,
  Sun,
  Moon,
  KeyRound,
  ArrowRight,
} from 'lucide-react';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  theme,
  onToggleTheme,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navItems: { label: string; page: ActivePage; highlight?: boolean }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Our Services', page: 'services' },
    { label: 'For Landlords', page: 'landlords', highlight: true },
    { label: 'For Tenants', page: 'tenants' },
    { label: 'Process', page: 'process' },
    { label: 'Transparency', page: 'transparency' },
    { label: 'FAQs', page: 'faqs' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleLinkClick = (page: ActivePage) => {
    const restoreMenuFocus = isMobileMenuOpen;
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (restoreMenuFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Utility Announcement Bar */}
      <div className="bg-sky-950 text-sky-100 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-sky-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sky-200">
            <span className="inline-flex items-center gap-1.5 text-sky-300 font-semibold">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              Property management services in Uganda
            </span>
            <span className="hidden sm:inline text-sky-700">|</span>
            <span className="inline-flex items-center gap-1 text-sky-200">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              Nakawa &amp; Katooke, Kampala
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sky-200">
            {/* Landlord section link */}
            <button
              onClick={() => handleLinkClick('landlords')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-700 hover:bg-sky-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              <KeyRound className="w-3 h-3 text-sky-200" />
              <span>For Landlords</span>
            </button>

            <a
              href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1 hover:text-sky-300 transition-colors hidden sm:inline-flex"
            >
              <Phone className="w-3 h-3 text-sky-400" />
              <span>{COMPANY_INFO.phones[0]}</span>
            </a>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Company Title */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <span className="sr-only">Homepage</span>
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-sky-400 shadow-xs bg-sky-50 dark:bg-slate-800 flex items-center justify-center p-0.5">
              <OptimizedImage
                src={COMPANY_INFO.logoUrl}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-base sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
                  DIDOABE
                </span>
                <span className="text-sky-700 dark:text-sky-400 font-extrabold text-xs sm:text-sm tracking-wider uppercase">
                  PROPERTY CO.
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
                We Manage, You Relax
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleLinkClick(item.page)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer relative ${
                    isActive
                      ? 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 font-bold border-b-2 border-sky-500 shadow-2xs'
                      : item.highlight
                      ? 'text-sky-700 dark:text-sky-400 font-bold hover:bg-sky-50 dark:hover:bg-slate-800'
                      : 'text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-400 hover:bg-sky-50/60 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.highlight && !isActive && (
                    <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-sky-700 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Bar: Theme Toggle & Request Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className="p-2.5 rounded-xl text-slate-700 dark:text-sky-300 bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 border border-sky-200 dark:border-slate-700 transition-all cursor-pointer flex items-center justify-center shadow-2xs"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-5 h-5 text-sky-700" />
              )}
            </button>

            {/* Landlord section CTA button */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleLinkClick('landlords')}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-700 hover:bg-sky-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 border border-sky-500 cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-sky-100" />
                <span>Landlord Services</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex xl:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                ref={menuButtonRef}
                type="button"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
                className="min-h-11 min-w-11 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:text-sky-700 hover:bg-sky-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-navigation-menu"
        aria-hidden={!isMobileMenuOpen}
        className={`${isMobileMenuOpen ? '' : 'hidden'} xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl animate-fadeIn`}
      >
          {/* Landlord services card in mobile menu */}
          <div className="p-3 mb-3 rounded-xl bg-gradient-to-r from-sky-900 to-sky-950 text-white flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider block">
                Property Owner
              </span>
              <p className="text-xs font-bold text-white">Landlord Services &amp; Information</p>
            </div>
            <button
              onClick={() => handleLinkClick('landlords')}
              className="min-h-11 w-full sm:w-auto justify-center px-3 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Access Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1 mb-4">
            {navItems.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleLinkClick(item.page)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`min-h-11 w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-900 dark:text-sky-300 font-bold border-l-4 border-sky-500'
                      : item.highlight
                      ? 'text-sky-700 dark:text-sky-400 font-bold bg-sky-50/50 dark:bg-slate-800/50'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('landlords')}
              className="min-h-11 w-full py-2.5 rounded-lg text-sm font-bold text-white bg-sky-700 hover:bg-sky-700 text-center flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <KeyRound className="w-4 h-4 text-white" />
              <span>For Property Owners</span>
            </button>
            <button
              onClick={() => handleLinkClick('tenants')}
              className="min-h-11 w-full py-2.5 rounded-lg text-sm font-bold text-sky-950 dark:text-sky-200 bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 border border-sky-200 dark:border-slate-700 text-center cursor-pointer"
            >
              For Tenants (Maintenance Request)
            </button>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-slate-600 dark:text-slate-300 font-semibold">Theme Mode:</span>
              <button
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="flex items-center gap-1.5 font-bold text-sky-700 dark:text-sky-400 px-3 py-1 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 cursor-pointer"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Switch to Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-sky-700" />
                    <span>Switch to Dark Mode</span>
                  </>
                )}
              </button>
            </div>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Chat on WhatsApp: {COMPANY_INFO.phones[0]}
            </a>
          </div>
        </div>
    </header>
  );
};
