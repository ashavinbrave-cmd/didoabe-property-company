import React, { useEffect, useRef } from 'react';
import { X, Lock, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | null;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen || !type) return;

    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [isOpen, onClose, type]);

  if (!isOpen || !type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
    >
      <div className="legal-modal-panel bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex min-w-0 items-center gap-2">
            {type === 'privacy' ? (
              <Lock className="w-5 h-5 text-sky-400" />
            ) : (
              <FileText className="w-5 h-5 text-sky-400" />
            )}
            <h3 id="legal-modal-title" className="min-w-0 font-bold text-sm sm:text-base text-white">
              {type === 'privacy'
                ? 'Website Privacy Information'
                : 'Website Terms & Calculator Notice'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="shrink-0 p-1 rounded-md text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="font-semibold text-slate-800 dark:text-white">
                DIDOABE PROPERTY CO LTD &bull; Website information
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Website inquiry forms</h4>
              <p>
                The website does not store form entries or send them to a company database. Opening a prepared message passes its text to WhatsApp in a link so WhatsApp can load the draft. The company receives your inquiry only if you press Send in WhatsApp.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. WhatsApp</h4>
              <p>
                WhatsApp is an external service. If you send a message, WhatsApp processes it under its own terms and privacy policy. Do not include passwords, bank details, national identification numbers, or other sensitive information in a website inquiry.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. Property management records</h4>
              <p>
                Questions about information used during a property management relationship should be discussed directly with the company and addressed under the arrangements for that service.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-800 dark:text-white">
                Website information &bull; Didoabe Property Company
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Website inquiries</h4>
              <p>
                Completing a website form prepares an inquiry for WhatsApp; it does not send the message or confirm that the company received it. You must review and send the draft in WhatsApp, or contact the company using the details on this site.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Estimates and examples</h4>
              <p>
                Calculator results and sample statements are illustrations based only on the values entered or described. They are not an offer, quote, or guarantee of rental income or payment. Ask the company to confirm the applicable fees, services, and arrangements, preferably in writing.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. Emergencies</h4>
              <p>
                This website is not an emergency response service. Tenants with an urgent safety or property issue should call the company directly.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            ref={closeButtonRef}
            className="px-5 py-2 rounded-lg bg-sky-700 hover:bg-sky-600 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
