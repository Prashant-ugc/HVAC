import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateInstantQuote,
  calculateMonthlyFinancing,
  getDiagnosis,
  calculateEnergySavings,
} from './hvacCalculations.ts';

test('calculateInstantQuote returns proper repair range and coupon', () => {
  const quote = calculateInstantQuote('ac_repair', 'under_1500', 'emergency_today');
  assert.equal(quote.minPrice, 149);
  assert.equal(quote.maxPrice, 380);
  assert.equal(quote.sameDayGuaranteed, true);
  assert.equal(quote.couponCode, 'COOL50');
  assert.equal(quote.discountAmount, 50);
});

test('calculateInstantQuote calculates replacement pricing with square footage multiplier', () => {
  const quoteSmall = calculateInstantQuote('full_replacement', 'under_1500', 'planning');
  const quoteLarge = calculateInstantQuote('full_replacement', 'over_2500', 'planning');
  assert.ok(quoteLarge.minPrice > quoteSmall.minPrice);
  assert.equal(quoteLarge.sameDayGuaranteed, false);
});

test('calculateMonthlyFinancing computes 0% APR promo correctly for 36 months', () => {
  const financing = calculateMonthlyFinancing(7200, 36, true);
  assert.equal(financing.aprPercent, 0);
  assert.equal(financing.monthlyPayment, 200);
  assert.equal(financing.totalInterest, 0);
});

test('calculateMonthlyFinancing computes standard APR for 120 months', () => {
  const financing = calculateMonthlyFinancing(8000, 120, true);
  assert.ok(financing.aprPercent > 0);
  assert.ok(financing.monthlyPayment > 0);
  assert.ok(financing.totalInterest > 0);
});

test('getDiagnosis retrieves correct details for all 4 required symptoms', () => {
  const warm = getDiagnosis('warm_air');
  assert.equal(warm.riskLevel, 'Moderate');
  assert.ok(warm.likelyCause.includes('Capacitor'));

  const noise = getDiagnosis('buzzing_noise');
  assert.equal(noise.riskLevel, 'Critical');

  const water = getDiagnosis('water_leaking');
  assert.equal(water.riskLevel, 'High');

  const cycling = getDiagnosis('short_cycling');
  assert.equal(cycling.riskLevel, 'High');
});

test('calculateEnergySavings yields positive financial savings for modern SEER2 upgrades', () => {
  const savings = calculateEnergySavings(10, 18, 350);
  assert.ok(savings.monthlySavings > 80);
  assert.ok(savings.annualSavings > 500);
  assert.ok(savings.tenYearSavings > 5000);
  assert.ok(savings.efficiencyGainPercent > 40);
});
