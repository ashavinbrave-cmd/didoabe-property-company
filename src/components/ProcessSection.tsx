import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/companyData';
import {
  CheckCircle2,
  Calendar,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

interface ProcessSectionProps {
  onRequestConsultation: () => void;
  headingLevel?: 'h1' | 'h2';
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onRequestConsultation, headingLevel = 'h2' }) => {
  const Heading = headingLevel;
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const totalSteps = PROCESS_STEPS.length;
  const currentStep = PROCESS_STEPS[activeStepIndex] ?? PROCESS_STEPS[0];
  const nextStepIndex = (activeStepIndex + 1) % totalSteps;

  return (
    <section className="py-20 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-200 dark:border-sky-800">
            Our Management Process
          </span>
          <Heading className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Property Management Process Overview
          </Heading>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            This overview introduces topics that may be discussed when arranging property management. Steps, timing, and responsibilities should be confirmed with the company for each property.
          </p>
        </div>

        {/* Stepper Navigation Strip (5 Steps) */}
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                type="button"
                aria-pressed={isSelected}
                className={`p-3 sm:p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-700 dark:bg-sky-700 text-white border-sky-500 shadow-md ring-2 ring-sky-300 dark:ring-sky-700'
                    : 'bg-sky-50/50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-sky-100 dark:border-slate-700 hover:bg-sky-100/60 dark:hover:bg-slate-700'
                }`}
              >
                <div className="flex min-w-0 items-start justify-between gap-2 mb-2">
                  <span
                    className={`w-7 h-7 shrink-0 rounded-full text-xs font-bold flex items-center justify-center ${
                      isSelected
                        ? 'bg-white text-sky-800 font-black'
                        : 'bg-sky-200 dark:bg-slate-700 text-sky-900 dark:text-sky-300'
                    }`}
                  >
                    {step.step}
                  </span>
                  <span
                    className={`min-w-0 text-right text-[10px] leading-tight sm:text-[11px] font-semibold ${
                      isSelected ? 'text-sky-100' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {step.timeline}
                  </span>
                </div>
                <h3 className="min-h-8 text-xs sm:text-sm font-bold leading-snug">
                  {step.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Detailed Spotlight of Selected Step */}
        <div id="process-step-details" aria-live="polite" className="bg-gradient-to-br from-sky-900 via-slate-900 to-sky-950 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-sky-700/80 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-sky-700 text-white text-xs font-extrabold rounded-md uppercase tracking-wider">
                  Step {currentStep.step} of {totalSteps}
                </span>
                <span className="text-xs font-medium text-sky-200 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  {currentStep.timeline}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentStep.title}
              </h3>

              <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
                {currentStep.description}
              </p>

              <div className="pt-2">
                <span className="text-xs uppercase font-bold text-sky-300 tracking-wider block mb-2">
                  Discussion Points:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentStep.keyOutputs.map((output, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-sky-950/60 border border-sky-800 text-xs text-sky-100 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{output}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-3 border-t lg:border-t-0 lg:border-l border-sky-800 pt-6 lg:pt-0 lg:pl-8">
              <div className="text-center lg:text-right">
                <span className="text-xs text-sky-300 block">Next in sequence:</span>
                <span className="text-sm font-bold text-white">
                  Step {PROCESS_STEPS[nextStepIndex].step}: {PROCESS_STEPS[nextStepIndex].title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : totalSteps - 1))}
                  className="px-3 py-2 rounded-lg bg-sky-900/80 hover:bg-sky-800 text-xs font-bold text-sky-200 transition-colors border border-sky-700/60"
                >
                  Previous Step
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStepIndex((prev) => (prev < totalSteps - 1 ? prev + 1 : 0))}
                  className="px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-600 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full Vertical Steps List */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {PROCESS_STEPS.map((step, idx) => {
            const isCurrent = activeStepIndex === idx;
            return (
              <button
                key={step.step}
                type="button"
                aria-pressed={isCurrent}
                className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-sky-50 dark:bg-slate-800 border-sky-400 dark:border-sky-500 shadow-md ring-1 ring-sky-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 hover:border-sky-300'
                }`}
                onClick={() => setActiveStepIndex(idx)}
              >
                <span className="w-8 h-8 rounded-full bg-sky-700 dark:bg-sky-700 text-white flex items-center justify-center font-bold text-sm mb-3">
                  {step.step}
                </span>
                <span className="block font-bold text-sm text-slate-900 dark:text-white mb-1">
                  {step.title}
                </span>
                <span className="block text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Call */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onRequestConsultation()}
            className="px-8 py-3.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Discuss Property Management Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
