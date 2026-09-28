import { describe, it } from 'node:test';
import assert from 'node:assert';
import { convertAmdToUsd, convertAmdToRub, formatPrice, formatPricePerSqm } from '../src/lib/currency.ts';

describe('Currency Conversion & Rounding', () => {
  it('should round AMD to USD cleanly to hundreds or thousands', () => {
    // 14,060,000 AMD at 390 = 36,051.28 -> should round to 36,100 or 36,000
    const usd = convertAmdToUsd(14060000, 390);
    assert.strictEqual(usd % 100, 0, `Expected clean rounding to 100, got: ${usd}`);
    assert.ok(usd >= 36000 && usd <= 36100);

    // 45,880,000 AMD at 390 = 117,641 -> over 100k, should round to 500
    const largeUsd = convertAmdToUsd(45880000, 390);
    assert.strictEqual(largeUsd % 500, 0, `Expected clean rounding to 500, got: ${largeUsd}`);
  });

  it('should round AMD to RUB cleanly to thousands for property values', () => {
    // 14,060,000 AMD at 4.15 = ~3,387,951 -> over 1M, should round to 10,000 (e.g. 3,390,000)
    const rub = convertAmdToRub(14060000, 4.15);
    assert.strictEqual(rub % 10000, 0, `Expected clean rounding to 10000, got: ${rub}`);
    assert.ok(rub >= 3380000 && rub <= 3400000);
  });

  it('should format AMD, USD, and RUB prices correctly', () => {
    const formattedAmd = formatPrice(14060000, 'AMD');
    assert.ok(formattedAmd.includes('14') && formattedAmd.includes('֏'));

    const formattedUsd = formatPrice(14060000, 'USD');
    assert.ok(formattedUsd.includes('$') && formattedUsd.includes('36'));

    const formattedRub = formatPrice(14060000, 'RUB');
    assert.ok(formattedRub.includes('₽') && formattedRub.includes('3'));
  });

  it('should calculate and format price per square meter across all currencies', () => {
    const perSqmAmd = formatPricePerSqm(14060000, 38, 'AMD');
    assert.ok(perSqmAmd.includes('м²') && perSqmAmd.includes('370') && perSqmAmd.includes('֏'));

    const perSqmUsd = formatPricePerSqm(14060000, 38, 'USD');
    assert.ok(perSqmUsd.includes('м²') && perSqmUsd.includes('$'));

    const perSqmRub = formatPricePerSqm(14060000, 38, 'RUB');
    assert.ok(perSqmRub.includes('м²') && perSqmRub.includes('₽'));
  });
});
