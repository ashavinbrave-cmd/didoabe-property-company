import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { OptimizedImage } from './OptimizedImage';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

interface TransparencySectionProps {
  onRequestConsultation: () => void;
  headingLevel?: 'h1' | 'h2';
}

const reportingTopics = [
  {
    title: 'Property and unit information',
    description: 'Property and unit details may be included where relevant to the agreed service scope.',
  },
  {
    title: 'Tenancy information',
    description: 'Information requirements and recordkeeping arrangements should be confirmed with the company.',
  },
  {
    title: 'Rent schedules and due dates',
    description: 'Rent terms and due dates depend on the tenancy arrangements for each property.',
  },
  {
    title: 'Payment records',
    description: 'Payment entries and supporting records depend on available information and the agreed process.',
  },
  {
    title: 'Outstanding balances',
    description: 'Any balance tracking or follow-up process should be discussed with the company.',
  },
  {
    title: 'Expenses and documents',
    description: 'Property costs and available receipts or invoices may be addressed as agreed.',
  },
  {
    title: 'Applicable fees',
    description: 'Confirm any fees and how they are calculated directly with the company.',
  },
  {
    title: 'Owner payment arrangements',
    description: 'Payment method and timing should be confirmed for each property.',
  },
  {
    title: 'Report format and timing',
    description: 'The format and frequency of reporting should be agreed for each property.',
  },
];

const statementRows = [
  ['Rental activity', 'Rent due and rent received, if included and supported by available records.'],
  ['Property expenses', 'Costs and supporting documents handled under the agreed arrangements.'],
  ['Fees and adjustments', 'Applicable fees or adjustments confirmed for the property.'],
  ['Owner balance', 'Based on rent actually received and applicable agreed fees or costs.'],
];

export const TransparencySection: React.FC<TransparencySectionProps> = ({ onRequestConsultation, headingLevel = 'h2' }) => {
  const Heading = headingLevel;

  return (
    <section className="py-20 bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors" id="transparency">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-200 dark:border-sky-800">
            Financial Records and Reporting
          </span>
          <Heading className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Clear Reporting Arrangements
          </Heading>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Property owners can ask how rental activity, costs, and other relevant information may be recorded and shared. Report content and timing should be confirmed directly with the company for each property.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-sky-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-500" />
            <span>Topics to Confirm for Property Records</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            {reportingTopics.map((topic, index) => (
              <div key={topic.title} className="p-4 rounded-xl bg-sky-50/50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 space-y-1">
                <span className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase">{index + 1}. {topic.title}</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-sky-950 text-white border border-sky-800 flex items-start sm:items-center gap-3">
          <Lock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold text-sky-300">Illustrative layout only: </span>
            No actual client, tenant, rent, fee, transaction, or payment information is displayed below.
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-sky-200 dark:border-slate-800 overflow-hidden">
          <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-sky-950 text-white p-6 sm:p-8 border-b-4 border-sky-400">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sky-50 p-0.5 border-2 border-sky-400 shrink-0">
                  <OptimizedImage src={COMPANY_INFO.logoUrl} alt="Didoabe Property Company logo" className="w-full h-full object-contain" loading="lazy" decoding="async" />
                </div>
                <div>
                  <span className="text-xs text-sky-300 font-bold uppercase tracking-wider block">Example Reporting Layout</span>
                  <h3 className="text-xl font-black text-white">PROPERTY OWNER STATEMENT</h3>
                  <p className="text-xs text-sky-200">DIDOABE PROPERTY CO LTD &bull; P O Box 176236 Kampala, Uganda</p>
                </div>
              </div>
              <div className="text-left sm:text-right text-xs text-sky-200">
                <p><span className="font-semibold text-white">Reporting period:</span> To be agreed</p>
                <p><span className="font-semibold text-white">Property reference:</span> Not shown</p>
                <p><span className="font-semibold text-white">Payment arrangement:</span> To be confirmed</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                Possible statement sections
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase font-bold text-[11px] border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Example information</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {statementRows.map(([category, description]) => (
                      <tr key={category} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{category}</td>
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Expenses and supporting records</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Any costs, approvals, and supporting documents included in a report depend on the arrangements agreed for the property and the records available.
                </p>
              </div>
              <div className="bg-gradient-to-br from-sky-950 via-slate-900 to-sky-950 text-white rounded-xl p-6 flex flex-col justify-between border border-sky-800">
                <div className="space-y-3">
                  <span className="text-xs uppercase font-bold text-sky-300 tracking-wider">Owner balance</span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Any balance depends on rent actually received and applicable fees or costs agreed for the property. This example shows no amount, fee rate, or payment date.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-sky-800 text-[11px] text-sky-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Confirm all service, fee, and payment terms directly with the company.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button onClick={onRequestConsultation} className="px-8 py-3.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 cursor-pointer">
            <span>Ask About Reporting Options</span>
          </button>
        </div>
      </div>
    </section>
  );
};
