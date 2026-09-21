import { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateMortgage } from '../src/lib/calculations/mortgageMath.ts';

describe('Mortgage Math Calculations', () => {
  it('should calculate correct annuity monthly payment for 25M AMD property', () => {
    const res = calculateMortgage({
      propertyPriceAMD: 25000000,
      downPaymentPercent: 10,
      loanTermYears: 20,
      interestRatePercent: 11.2,
    });

    assert.strictEqual(res.propertyPriceAMD, 25000000);
    assert.strictEqual(res.downPaymentAMD, 2500000);
    assert.strictEqual(res.loanAmountAMD, 22500000);
    // Annuity for 22.5M AMD at 11.2% for 240 months
    // Monthly rate = 11.2 / 1200 = 0.009333333333333334
    // Factor = (1+r)^240 = 9.324...
    // Payment approx 235,116 AMD
    assert.ok(res.monthlyPaymentAMD > 230000 && res.monthlyPaymentAMD < 240000, `Got payment: ${res.monthlyPaymentAMD}`);
    assert.ok(res.requiredGrossSalaryAMD > res.monthlyPaymentAMD * 2);
  });

  it('should handle minimum down payment clamping at 10%', () => {
    const res = calculateMortgage({
      propertyPriceAMD: 20000000,
      downPaymentPercent: 5, // Below minimum 10%
      loanTermYears: 10,
      interestRatePercent: 11.0,
    });

    assert.strictEqual(res.downPaymentAMD, 2000000); // 10%
    assert.strictEqual(res.loanAmountAMD, 18000000);
  });

  it('should handle zero or negative prices gracefully', () => {
    const res = calculateMortgage({
      propertyPriceAMD: -5000000,
      downPaymentPercent: 20,
      loanTermYears: 15,
      interestRatePercent: 12.0,
    });

    assert.strictEqual(res.propertyPriceAMD, 0);
    assert.strictEqual(res.downPaymentAMD, 0);
    assert.strictEqual(res.loanAmountAMD, 0);
    assert.strictEqual(res.monthlyPaymentAMD, 0);
  });
});
