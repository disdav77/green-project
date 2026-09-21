import { describe, it } from 'node:test';
import assert from 'node:assert';
import { convertAmdToUsd, formatPrice, formatPricePerSqm } from '../src/lib/currency.ts';

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

  it('should format AMD and USD prices correctly', () => {
    const formattedAmd = formatPrice(14060000, 'AMD');
    assert.ok(formattedAmd.includes('14') && formattedAmd.includes('֏'));

    const formattedUsd = formatPrice(14060000, 'USD');
    assert.ok(formattedUsd.includes('$') && formattedUsd.includes('36'));
  });

  it('should calculate and format price per square meter', () => {
    const perSqm = formatPricePerSqm(14060000, 38, 'AMD');
    assert.ok(perSqm.includes('м²') && perSqm.includes('370'));
  });
});
