import React, { lazy, Suspense, useState, useEffect, useCallback, useRef } from 'react';
import { ActivePage } from './types/index';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LandlordQuickAccess } from './components/LandlordQuickAccess';
import { ManagedPropertyShowcase } from './components/ManagedPropertyShowcase';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ServicesSection } from './components/ServicesSection';
const LandlordSection = lazy(() => import('./components/LandlordSection').then((module) => ({ default: module.LandlordSection })));
const TenantSection = lazy(() => import('./components/TenantSection').then((module) => ({ default: module.TenantSection })));
import { ProcessSection } from './components/ProcessSection';
import { TransparencySection } from './components/TransparencySection';
const AboutSection = lazy(() => import('./components/AboutSection').then((module) => ({ default: module.AboutSection })));
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { RemittanceCalculator } from './components/RemittanceCalculator';
import { LegalModal } from './components/LegalModals';
import { COMPANY_INFO } from './data/companyData';
import {
  MessageCircle,
  Shield,
  ArrowUp,
  CheckCircle2,
  FileCheck2,
  Clock,
  ArrowRight,
  KeyRound,
} from 'lucide-react';

const PAGE_METADATA: Record<ActivePage, { title: string; description: string }> = {
  home: { title: 'Didoabe Property Company | Professional Property Management Uganda', description: 'Property management information and WhatsApp inquiry forms for landlords and tenants in Uganda.' },
  about: { title: 'About Us | Didoabe Property Company', description: 'Learn about Didoabe Property Company and its property management services in Uganda.' },
  services: { title: 'Property Management Services | Didoabe Property Company', description: 'Explore property management services and prepare a WhatsApp inquiry for Didoabe Property Company.' },
  landlords: { title: 'Landlord Services | Didoabe Property Company', description: 'Property management information, an estimate calculator, and a WhatsApp inquiry form for property owners.' },
  tenants: { title: 'Tenant Support | Didoabe Property Company', description: 'Tenant support information and a WhatsApp draft form for property-related inquiries.' },
  process: { title: 'Management Process | Didoabe Property Company', description: 'Review the property management process and prepare an inquiry for Didoabe Property Company.' },
  transparency: { title: 'Financial Transparency | Didoabe Property Company', description: 'View sample reporting information and prepare a property management inquiry.' },
  faqs: { title: 'Frequently Asked Questions | Didoabe Property Company', description: 'Find answers to common property management questions or prepare an inquiry.' },
  contact: { title: 'Contact | Didoabe Property Company', description: 'Contact information and WhatsApp draft forms for Didoabe Property Company.' },
};

class RouteLoadErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-3xl px-4 py-16 text-center" role="alert">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">This page could not load.</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Check your connection and try loading the page again.</p>
          <button onClick={() => window.location.reload()} className="mt-5 rounded-lg bg-sky-700 px-5 py-3 text-sm font-bold text-white">Reload page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedServiceInquiry, setSelectedServiceInquiry] = useState<string | null>(null);
  const [scrollToLandlordForm, setScrollToLandlordForm] = useState(false);
  const consultationScrollPendingRef = useRef(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Dark and Light Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('didoabe-theme');
        if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      } catch {
        // Continue with the default theme when browser storage is unavailable.
      }
    }
    return 'light';
  });

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('didoabe-theme', theme);
    } catch {
      // Theme switching still works for this session when storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const metadata = PAGE_METADATA[activePage];
    const pageUrl = `${window.location.origin}${window.location.pathname}`;
    document.title = metadata.title;

    const setMetaContent = (selector: string, value: string) => {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', value);
    };

    setMetaContent('meta[name="description"]', metadata.description);
    setMetaContent('meta[property="og:title"]', metadata.title);
    setMetaContent('meta[property="og:description"]', metadata.description);
    setMetaContent('meta[property="og:url"]', pageUrl);
    setMetaContent(
      'meta[property="og:image"]',
      `${window.location.origin}/assets/aistudio/DIDOABE_LOGO_d8bd4994.jpg`,
    );
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', pageUrl);
  }, [activePage]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Synchronize hash in URL for smooth routing and browser history
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.slice(1);
      const validPages: ActivePage[] = [
        'home',
        'about',
        'services',
        'landlords',
        'tenants',
        'process',
        'transparency',
        'faqs',
        'contact',
      ];
      const isValidPage = validPages.includes(rawHash as ActivePage);
      const nextPage: ActivePage = isValidPage ? (rawHash as ActivePage) : 'home';

      if (!isValidPage && rawHash) {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      }

      setActivePage(nextPage);
      if (nextPage !== 'landlords') {
        setSelectedServiceInquiry(null);
        setScrollToLandlordForm(false);
        consultationScrollPendingRef.current = false;
      }

      const isConsultationScroll = nextPage === 'landlords' && consultationScrollPendingRef.current;
      if (isConsultationScroll) consultationScrollPendingRef.current = false;
      if (!isConsultationScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Monitor scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: ActivePage) => {
    if (page !== 'landlords') setSelectedServiceInquiry(null);
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestConsultation = (inquiryNote: string | null = null) => {
    consultationScrollPendingRef.current = window.location.hash !== '#landlords';
    setSelectedServiceInquiry(inquiryNote);
    setScrollToLandlordForm(true);
    navigateTo('landlords');
  };

  const handleFormScrollComplete = useCallback(() => {
    setScrollToLandlordForm(false);
  }, []);

  const handleCloseLegalModal = useCallback(() => {
    setLegalModalType(null);
  }, []);

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    handleRequestConsultation(serviceTitle);
  };

  return (
    <div className="site-shell min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Dynamic View Content */}
      <a href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById('main-content')?.focus(); }} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sky-950 focus:shadow-lg">
        Skip to main content
      </a>
      <main id="main-content" tabIndex={-1} className="flex-grow">
        <RouteLoadErrorBoundary>
        <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-center text-slate-600 dark:text-slate-300" role="status">Loading page…</div>}>
        <div key={activePage} className="page-transition">
        {activePage === 'home' && (
          <>
            {/* 1. Hero Section (with real photo preview & direct landlord action) */}
            <Hero
              onNavigate={navigateTo}
            />

            {/* 2. Direct Landlord Quick Access Station */}
            <LandlordQuickAccess
              onNavigate={navigateTo}
              onRequestConsultation={handleRequestConsultation}
            />

            {/* 3. Managed Properties Operational Photo Showcase */}
            <ManagedPropertyShowcase
              onNavigate={navigateTo}
              onRequestConsultation={handleRequestConsultation}
            />

            {/* 4. Quick Value Proposition Strip */}
            <section className="py-12 bg-white dark:bg-slate-900 border-b border-sky-100 dark:border-slate-800 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
                  <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-sky-700/15 text-sky-700 dark:text-sky-400 shrink-0">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                        Property Management Services
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Property management, tenant support, and related services described on this site.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-sky-700/15 text-sky-700 dark:text-sky-400 shrink-0">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                        Financial Records &amp; Reporting
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Reporting content and frequency can be discussed for each property.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-sky-700/15 text-sky-700 dark:text-sky-400 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                        Tenant Information &amp; Onboarding
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Confirm tenant information requirements and onboarding arrangements with the company.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-sky-700/15 text-sky-700 dark:text-sky-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                        Direct Emergency Contact
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Call the company directly for urgent safety or property issues; website forms are not dispatch tickets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Why Choose Us Section */}
            <WhyChooseUsSection
              onRequestConsultation={handleRequestConsultation}
              onContactClick={() => navigateTo('contact')}
            />

            {/* 6. Services Overview */}
            <ServicesSection
              onSelectServiceForInquiry={handleSelectServiceForInquiry}
              onRequestConsultation={handleRequestConsultation}
            />

            {/* 7. The 5-Step Management Process */}
            <ProcessSection onRequestConsultation={handleRequestConsultation} />

            {/* 8. Interactive Landlord Remittance Estimator Section */}
            <section
              id="remittance-calculator-section"
              className="py-16 bg-sky-50/60 dark:bg-slate-900 border-y border-sky-100 dark:border-slate-800 transition-colors"
            >
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center max-w-2xl mx-auto">
                  <span className="px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-200 dark:border-sky-800">
                    Scenario Planning
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                    Rental Income Scenario Calculator
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Enter your own assumptions to explore an estimate. Confirm actual fees, costs, payment terms, and services directly with the company.
                  </p>
                </div>

                <RemittanceCalculator onApplyToInquiry={(units, monthlyRent) => {
                  handleRequestConsultation(`Calculator inputs: ${units} units; UGX ${Math.round(monthlyRent / Math.max(units, 1)).toLocaleString('en-US')} assumed monthly rent per unit (UGX ${Math.round(monthlyRent).toLocaleString('en-US')} total assumed monthly rent)`);
                }} />
              </div>
            </section>

            {/* 9. Transparency & Recordkeeping Spotlight */}
            <TransparencySection onRequestConsultation={handleRequestConsultation} />

            {/* 10. Tenant Care Spotlight */}
            <section className="py-16 bg-white dark:bg-slate-900 border-t border-sky-100 dark:border-slate-800 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-sky-950 text-white rounded-3xl p-8 lg:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-sky-800">
                  <div className="space-y-3 max-w-2xl">
                    <span className="text-xs uppercase font-extrabold text-sky-400 tracking-wider">
                    Tenant Support
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Are You a Resident in a Didoabe-Managed Property?
                    </h2>
                    <p className="text-sky-200 text-sm leading-relaxed">
                      Prepare a maintenance inquiry for WhatsApp, request rent payment information, or contact your property manager. Website forms do not create tracked tickets.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <button
                      onClick={() => navigateTo('tenants')}
                      className="px-6 py-3.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-sm shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Prepare WhatsApp Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href={COMPANY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm border border-emerald-700 text-center"
                    >
                      WhatsApp Manager
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* 11. Frequently Asked Questions */}
            <FaqSection onContactClick={() => navigateTo('contact')} />

            {/* 12. Contact / Direct Inquiry */}
            <ContactSection headingLevel="h2" />
          </>
        )}

        {activePage === 'about' && (
          <>
            <AboutSection onRequestConsultation={handleRequestConsultation} />
            <ManagedPropertyShowcase
              onNavigate={navigateTo}
              onRequestConsultation={handleRequestConsultation}
            />
            <WhyChooseUsSection
              onRequestConsultation={handleRequestConsultation}
              onContactClick={() => navigateTo('contact')}
            />
          </>
        )}

        {activePage === 'services' && (
          <>
            <ServicesSection
              onSelectServiceForInquiry={handleSelectServiceForInquiry}
              onRequestConsultation={handleRequestConsultation}
              headingLevel="h1"
            />
            <ManagedPropertyShowcase
              onNavigate={navigateTo}
              onRequestConsultation={handleRequestConsultation}
            />
          </>
        )}

        {activePage === 'landlords' && (
          <LandlordSection
            initialServiceInquiry={selectedServiceInquiry}
            scrollToFormOnMount={scrollToLandlordForm}
            onFormScrollComplete={handleFormScrollComplete}
          />
        )}

        {activePage === 'tenants' && <TenantSection />}

        {activePage === 'process' && (
          <ProcessSection onRequestConsultation={handleRequestConsultation} headingLevel="h1" />
        )}

        {activePage === 'transparency' && (
          <TransparencySection onRequestConsultation={handleRequestConsultation} headingLevel="h1" />
        )}

        {activePage === 'faqs' && (
          <FaqSection onContactClick={() => navigateTo('contact')} headingLevel="h1" />
        )}

        {activePage === 'contact' && <ContactSection />}
        </div>
        </Suspense>
        </RouteLoadErrorBoundary>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Floating Quick Action Buttons */}
      <div className="mobile-safe-actions fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Floating Quick Landlord Access Pill Button */}
        <button
          onClick={() => navigateTo('landlords')}
          aria-label="Direct Landlord Access"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-sky-700 hover:bg-sky-600 text-white rounded-full shadow-xl transition-all border border-sky-400 font-bold text-xs cursor-pointer group"
          title="Direct Landlord Access"
        >
          <KeyRound className="w-3.5 h-3.5 text-sky-200 group-hover:scale-110 transition-transform" />
          <span>Landlord Access</span>
        </button>

        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll back to top"
            className="p-3 bg-slate-900 dark:bg-slate-800 text-white rounded-full shadow-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-all border border-slate-700 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5 text-sky-400" />
          </button>
        )}

        {/* Floating WhatsApp Action Button */}
        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Didoabe Property Company on WhatsApp"
          className="hidden sm:flex p-3.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full shadow-xl transition-all transform hover:scale-105 items-center justify-center border-2 border-white dark:border-slate-800 ring-4 ring-emerald-500/20"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      {/* Legal & Privacy Policy Modal */}
      <LegalModal
        isOpen={legalModalType !== null}
        onClose={handleCloseLegalModal}
        type={legalModalType}
      />
            <div className="w-full text-center py-4 text-sm text-slate-500 dark:text-slate-400">
        Created by <span className="font-semibold">Ainamani Brave Ashavin</span>
      </div>
    </div>
  );
}
