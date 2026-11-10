import { RemittanceCalculation } from '../types/index';

/**
 * Calculates a percentage fee from user-entered scenario values.
 */
export function calculateManagementFee(grossRent: number, ratePercentage: number): number {
  if (!Number.isFinite(grossRent) || !Number.isFinite(ratePercentage) || grossRent <= 0 || ratePercentage <= 0) return 0;
  return Math.round((grossRent * Math.min(ratePercentage, 100)) / 100);
}

/**
 * Calculates an illustrative balance after user-entered fees and cost assumptions.
 */
export function calculateNetRemittance(
  grossRent: number,
  ratePercentage: number = 0,
  maintenanceReserve: number = 0,
  serviceDeductions: number = 0
): RemittanceCalculation {
  const safeGross = Number.isFinite(grossRent) ? Math.max(0, grossRent) : 0;
  const safeRate = Number.isFinite(ratePercentage) ? Math.max(0, Math.min(100, ratePercentage)) : 0;
  const fee = calculateManagementFee(safeGross, safeRate);
  const safeReserve = Number.isFinite(maintenanceReserve) ? Math.max(0, maintenanceReserve) : 0;
  const safeDeductions = Number.isFinite(serviceDeductions) ? Math.max(0, serviceDeductions) : 0;
  
  const net = safeGross - fee - safeReserve - safeDeductions;

  return {
    grossRent: safeGross,
    managementRate: safeRate,
    managementFee: fee,
    maintenanceReserve: safeReserve,
    serviceDeductions: safeDeductions,
    netRemittance: net,
  };
}

/**
 * Formats an amount in Ugandan Shillings (UGX).
 */
export function formatUGX(amount: number): string {
  if (!Number.isFinite(amount)) return 'UGX 0';
  return 'UGX ' + Math.round(amount).toLocaleString('en-US');
}
