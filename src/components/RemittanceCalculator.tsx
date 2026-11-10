import React, { useState } from 'react';
import { calculateNetRemittance, formatUGX } from '../utils/calculator';
import { Calculator, ArrowRight, ShieldCheck } from 'lucide-react';

interface RemittanceCalculatorProps {
  onApplyToInquiry?: (units: number, monthlyRent: number) => void;
}

export const RemittanceCalculator: React.FC<RemittanceCalculatorProps> = ({ onApplyToInquiry }) => {
  const [unitCount, setUnitCount] = useState<number>(1);
  const [rentPerUnitInput, setRentPerUnitInput] = useState('');
  const [ratePercentInput, setRatePercentInput] = useState('');
  const [maintenanceReserveInput, setMaintenanceReserveInput] = useState('');

  const rentPerUnit = Math.min(20_000_000, Math.max(0, Number.parseInt(rentPerUnitInput, 10) || 0));
  const rateValue = ratePercentInput === '' ? Number.NaN : Number.parseFloat(ratePercentInput);
  const ratePercent = Number.isFinite(rateValue) ? Math.min(100, Math.max(0, rateValue)) : null;
  const maintenanceReserve = Math.min(5_000_000, Math.max(0, Number.parseInt(maintenanceReserveInput, 10) || 0));

  const totalGrossRent = unitCount * rentPerUnit;
  const result = calculateNetRemittance(totalGrossRent, ratePercent ?? 0, maintenanceReserve, 0);
  const hasEstimateInputs = rentPerUnit > 0 && ratePercent !== null;
  const annualNet = result.netRemittance * 12;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-800 overflow-hidden transition-colors">
      <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-sky-950 px-6 py-5 text-white flex items-center justify-between border-b border-sky-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-700/20 text-sky-300 rounded-lg border border-sky-400/30">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Rental Income Scenario Calculator</h3>
            <p className="text-xs text-sky-200">
              A calculation using only the assumptions you enter
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-2.5 py-1 bg-sky-700 text-white font-bold text-xs rounded-full uppercase tracking-wider">
          Transparent Math
        </span>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Units */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="unit-count-slider" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Number of Rental Units
              </label>
              <span className="text-base font-bold text-sky-700 dark:text-sky-400 px-3 py-1 bg-sky-50 dark:bg-slate-800 rounded-md border border-sky-200 dark:border-slate-700">
                {unitCount} {unitCount === 1 ? 'Unit' : 'Units'}
              </span>
            </div>
            <input
              id="unit-count-slider"
              type="range"
              min="1"
              max="50"
              step="1"
              value={unitCount}
              onChange={(e) => setUnitCount(parseInt(e.target.value) || 1)}
              className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>1 Unit</span>
              <span>15 Units</span>
              <span>30 Units</span>
              <span>50 Units</span>
            </div>
          </div>

          {/* Average Rent Per Unit */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="rent-per-unit-input" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Assumed Monthly Rent per Unit (UGX)
              </label>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {formatUGX(rentPerUnit)}
              </span>
            </div>
            <input
              id="rent-per-unit-input"
              type="number"
              min="0"
              max="20000000"
              step="50000"
              value={rentPerUnitInput}
              onChange={(e) => setRentPerUnitInput(e.target.value)}
              onBlur={() => setRentPerUnitInput(rentPerUnit ? String(rentPerUnit) : '')}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white dark:bg-slate-800 dark:text-white"
            />
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              Enter an estimated monthly rent per unit. The result assumes the entered rent for every unit; actual occupancy and collections can differ.
            </p>
          </div>

          {/* Fee assumption */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="rate-percent-input" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Agreed Fee Rate (%)
              </label>
              <span className="text-sm font-bold text-sky-700 dark:text-sky-400 px-2.5 py-0.5 bg-sky-50 dark:bg-slate-800 rounded border border-sky-200 dark:border-slate-700">
                {ratePercent === null ? 'Not entered' : `${ratePercent}%`}
              </span>
            </div>
            <input
              id="rate-percent-input"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={ratePercentInput}
              onChange={(e) => setRatePercentInput(e.target.value)}
              onBlur={() => ratePercent !== null && setRatePercentInput(String(ratePercent))}
              placeholder="Enter the rate confirmed with the company"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white dark:bg-slate-800 dark:text-white"
            />
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">This site does not publish a standard fee rate. Confirm the applicable rate directly with the company.</p>
          </div>

          {/* Maintenance Reserve */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="reserve-input" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>Other Agreed Costs to Include (Optional)</span>
              </label>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-500">
                {formatUGX(maintenanceReserve)}
              </span>
            </div>
            <input
              id="reserve-input"
              type="number"
              min="0"
              max="5000000"
              step="50000"
              value={maintenanceReserveInput}
              onChange={(e) => setMaintenanceReserveInput(e.target.value)}
              onBlur={() => setMaintenanceReserveInput(String(maintenanceReserve))}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white dark:bg-slate-800 dark:text-white"
              placeholder="Enter an estimated cost"
            />
            <p className="text-xs text-slate-500 mt-1">
              Enter an estimated monthly cost if you want to include one; this does not establish a reserve or authorize a deduction.
            </p>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-sky-950 via-slate-900 to-sky-950 text-white rounded-xl p-6 flex flex-col justify-between shadow-inner border border-sky-900">
          <div className="space-y-4">
            <div className="border-b border-sky-800 pb-3">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">
                Monthly Income Scenario
              </span>
              <p className="text-xs text-sky-200 mt-0.5">
                Based on {unitCount} units @ {formatUGX(rentPerUnit)}/month
              </p>
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between items-center text-slate-300">
                <span>Gross rent assumption:</span>
                <span className="font-bold text-white">{formatUGX(result.grossRent)}</span>
              </div>
              <div className="flex justify-between items-center text-rose-300">
                <span>Fee assumption:</span>
                <span>{ratePercent === null ? 'Enter an agreed rate' : `- ${formatUGX(result.managementFee)}`}</span>
              </div>
              {maintenanceReserve > 0 && (
                <div className="flex justify-between items-center text-sky-300 text-xs">
                  <span>Other cost assumption:</span>
                  <span>- {formatUGX(result.maintenanceReserve)}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-sky-800">
              <span className="text-xs uppercase text-sky-300 font-bold block mb-1">
                Estimated Balance After Entered Fee and Costs:
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 tracking-tight">
                {hasEstimateInputs ? formatUGX(result.netRemittance) : 'Enter rent and fee assumptions'}
              </div>
              <p className="text-[11px] text-sky-200 mt-1">
                Estimate only. It uses the assumptions entered and does not promise rent collection, income, or a payment amount.
              </p>
            </div>

            <div className="p-3 bg-sky-900/60 rounded-lg border border-sky-700/60 text-xs">
              <span className="text-sky-300 block mb-0.5">12-Month Illustration:</span>
              <span className="text-base font-bold text-sky-300">
                {hasEstimateInputs ? `${formatUGX(annualNet)} (same assumptions for 12 months)` : 'Enter rent and fee assumptions'}
              </span>
            </div>
          </div>

          <div className="pt-6">
            {onApplyToInquiry ? (
              <button
                onClick={() => onApplyToInquiry(unitCount, totalGrossRent)}
                disabled={!rentPerUnit}
                className="w-full py-3 px-4 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Request Consultation for {unitCount} Units</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-sky-300 shrink-0" />
                <span>Illustration only. Confirm fees and terms with the company, preferably in writing.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
