import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateManagementFee, calculateNetRemittance, formatUGX } from './calculator';

test('calculateManagementFee computes accurate percentage fee', () => {
  const fee8 = calculateManagementFee(5000000, 8);
  assert.equal(fee8, 400000);

  const fee10 = calculateManagementFee(10000000, 10);
  assert.equal(fee10, 1000000);

  const feeZero = calculateManagementFee(0, 8);
  assert.equal(feeZero, 0);

  const feeNegative = calculateManagementFee(-1000, 8);
  assert.equal(feeNegative, 0);
});

test('calculateNetRemittance computes accurate deduction breakdown', () => {
  const result = calculateNetRemittance(10000000, 8, 300000, 200000);
  // Gross: 10M, Fee (8%): 800,000, Reserve: 300,000, Deductions: 200,000
  // Net Remittance = 10,000,000 - 800,000 - 300,000 - 200,000 = 8,700,000
  assert.equal(result.grossRent, 10000000);
  assert.equal(result.managementFee, 800000);
  assert.equal(result.maintenanceReserve, 300000);
  assert.equal(result.serviceDeductions, 200000);
  assert.equal(result.netRemittance, 8700000);
});

test('calculateNetRemittance uses no assumed fee and preserves a negative balance', () => {
  const defaultFee = calculateNetRemittance(100000);
  assert.equal(defaultFee.managementRate, 0);
  assert.equal(defaultFee.managementFee, 0);

  const shortfall = calculateNetRemittance(100000, 10, 100000);
  assert.equal(shortfall.netRemittance, -10000);
});

test('calculateNetRemittance handles decimal, zero, large, and invalid inputs', () => {
  const decimal = calculateNetRemittance(123456.78, 2.5, 100.25, 50.5);
  assert.equal(decimal.managementFee, 3086);
  assert.equal(decimal.netRemittance, 120220.03);

  const zero = calculateNetRemittance(0, 0, 0, 0);
  assert.equal(zero.netRemittance, 0);

  const large = calculateNetRemittance(1_000_000_000, 100, 500_000_000, 250_000_000);
  assert.equal(large.netRemittance, -750_000_000);

  const invalid = calculateNetRemittance(Number.NaN, Number.POSITIVE_INFINITY, Number.NaN, Number.NEGATIVE_INFINITY);
  assert.equal(invalid.grossRent, 0);
  assert.equal(invalid.managementRate, 0);
  assert.equal(invalid.maintenanceReserve, 0);
  assert.equal(invalid.serviceDeductions, 0);
  assert.equal(invalid.netRemittance, 0);

  const negative = calculateNetRemittance(-100, -1, -25, -25);
  assert.equal(negative.netRemittance, 0);
});

test('formatUGX correctly formats currency strings', () => {
  assert.equal(formatUGX(5000000), 'UGX 5,000,000');
  assert.equal(formatUGX(0), 'UGX 0');
});
