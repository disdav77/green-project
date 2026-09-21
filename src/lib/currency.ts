export type Currency = 'AMD' | 'USD';

export const DEFAULT_USD_RATE = 390;

export function convertAmdToUsd(amountAmd: number, rate = DEFAULT_USD_RATE): number {
  if (!amountAmd || amountAmd <= 0) return 0;
  const rawUsd = amountAmd / rate;

  // Round to nearest 100 or 500 for clean numbers
  if (rawUsd > 100000) {
    return Math.round(rawUsd / 500) * 500;
  }
  if (rawUsd > 10000) {
    return Math.round(rawUsd / 100) * 100;
  }
  return Math.round(rawUsd / 10) * 10;
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('ru-RU').format(Math.round(amount));
}

export function formatPrice(amountAmd: number, currency: Currency, rate = DEFAULT_USD_RATE): string {
  if (currency === 'USD') {
    const usd = convertAmdToUsd(amountAmd, rate);
    return `$ ${formatNumber(usd)}`;
  }
  return `${formatNumber(amountAmd)} ֏`;
}

export function formatPricePerSqm(amountAmd: number, areaSqm: number, currency: Currency, rate = DEFAULT_USD_RATE): string {
  if (!areaSqm || areaSqm <= 0) return '';
  const perSqmAmd = Math.round(amountAmd / areaSqm);
  if (currency === 'USD') {
    const perSqmUsd = Math.round(convertAmdToUsd(perSqmAmd, rate));
    return `$ ${formatNumber(perSqmUsd)} / м²`;
  }
  return `${formatNumber(perSqmAmd)} ֏ / м²`;
}
