import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  calculateTaxRefund,
  LAW_MAX_PROPERTY_PRICE_AMD,
  LAW_SINGLE_QUARTERLY_LIMIT_AMD,
  LAW_COBORROWER_QUARTERLY_LIMIT_AMD,
} from '../src/lib/calculations/taxRefundMath.ts';

describe('Tax Refund Calculations (Art. 156.1 Tax Code)', () => {
  it('should qualify properties up to 55,000,000 AMD', () => {
    const resUnder = calculateTaxRefund({
      propertyPriceAMD: 45000000,
      loanAmountAMD: 40500000,
      interestRatePercent: 11.2,
      monthlyPaymentAMD: 420000,
      hasCoBorrower: false,
    });
    assert.strictEqual(resUnder.isEligiblePrice, true);

    const resOver = calculateTaxRefund({
      propertyPriceAMD: 58000000,
      loanAmountAMD: 52000000,
      interestRatePercent: 11.2,
      monthlyPaymentAMD: 540000,
      hasCoBorrower: false,
    });
    assert.strictEqual(resOver.isEligiblePrice, false);
    assert.strictEqual(resOver.actualMonthlyRefundAMD, 0);
  });

  it('should respect single borrower monthly refund limit (up to 500,000 AMD)', () => {
    const res = calculateTaxRefund({
      propertyPriceAMD: 50000000,
      loanAmountAMD: 45000000,
      interestRatePercent: 15.0, // High interest generating > 500k monthly interest
      monthlyPaymentAMD: 580000,
      hasCoBorrower: false,
    });

    assert.strictEqual(res.quarterlyRefundLimitAMD, LAW_SINGLE_QUARTERLY_LIMIT_AMD);
    assert.strictEqual(res.maxMonthlyRefundLimitAMD, 500000);
    assert.strictEqual(res.actualMonthlyRefundAMD, 500000);
  });

  it('should double the quarterly and monthly refund limit with co-borrower', () => {
    const resSingle = calculateTaxRefund({
      propertyPriceAMD: 50000000,
      loanAmountAMD: 45000000,
      interestRatePercent: 15.0,
      monthlyPaymentAMD: 580000,
      hasCoBorrower: false,
    });

    const resCoBorrower = calculateTaxRefund({
      propertyPriceAMD: 50000000,
      loanAmountAMD: 45000000,
      interestRatePercent: 15.0,
      monthlyPaymentAMD: 580000,
      hasCoBorrower: true,
    });

    assert.strictEqual(resCoBorrower.quarterlyRefundLimitAMD, LAW_COBORROWER_QUARTERLY_LIMIT_AMD);
    assert.strictEqual(resCoBorrower.maxMonthlyRefundLimitAMD, 1000000);
    assert.ok(resCoBorrower.actualMonthlyRefundAMD > resSingle.actualMonthlyRefundAMD);
    assert.strictEqual(resCoBorrower.oneYearSavingsAMD, resCoBorrower.actualMonthlyRefundAMD * 12);
    assert.strictEqual(resCoBorrower.fiveYearSavingsAMD, resCoBorrower.actualMonthlyRefundAMD * 60);
  });

  it('should return indefinite status note for Kasakh Townhouse', () => {
    const res = calculateTaxRefund({
      propertyPriceAMD: 45000000,
      loanAmountAMD: 40500000,
      interestRatePercent: 11.2,
      monthlyPaymentAMD: 420000,
      hasCoBorrower: false,
      projectSlug: 'townhouse',
    });

    assert.ok(res.programStatusNote.includes('Бессрочный'));
  });
});
