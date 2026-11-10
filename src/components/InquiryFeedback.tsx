import { useEffect, useRef } from 'react';
import type { FC } from 'react';

export const InquiryPrivacyNotice: FC = () => (
  <p role="note" className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-xs leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
    Please do not include passwords, bank details, NINs, or other sensitive information. This form only prepares a WhatsApp draft. The company receives your inquiry only if you press Send in WhatsApp.
  </p>
);

export const WhatsAppDraftNotice: FC<{ href: string; reference: string }> = ({ href, reference }) => {
  const noticeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    noticeRef.current?.focus({ preventScroll: true });
    noticeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [href, reference]);

  return (
    <div ref={noticeRef} role="status" aria-live="polite" tabIndex={-1} className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100">
      <p className="font-bold">WhatsApp draft prepared — not sent yet.</p>
      <p className="mt-1">
        Your inquiry has not been received, registered, or stored by this website. You must open WhatsApp, review the message, and press Send there to deliver it to Didoabe Property Company.
      </p>
      <p className="mt-2 text-xs font-semibold">
        Your reference: <span className="font-mono break-all">{reference}</span>
      </p>
      <a
        className="mt-3 inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-700 px-5 py-2.5 font-bold text-white underline-offset-4 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open WhatsApp to review and send
      </a>
      <p className="mt-2 text-xs">Your form entries remain on this page until you choose to change them.</p>
    </div>
  );
};