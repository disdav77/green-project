export type Currency = 'AMD' | 'USD' | 'RUB';

export const DEFAULT_USD_RATE = 390;
export const DEFAULT_RUB_RATE = 4.15;

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

export function convertAmdToRub(amountAmd: number, rate = DEFAULT_RUB_RATE): number {
  if (!amountAmd || amountAmd <= 0) return 0;
  const rawRub = amountAmd / rate;

  // Clean rounding for real estate property values
  if (rawRub > 1000000) {
    return Math.round(rawRub / 10000) * 10000;
  }
  if (rawRub > 100000) {
    return Math.round(rawRub / 1000) * 1000;
  }
  if (rawRub > 10000) {
    return Math.round(rawRub / 100) * 100;
  }
  return Math.round(rawRub / 10) * 10;
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('ru-RU').format(Math.round(amount));
}

export function formatPrice(
  amountAmd: number,
  currency: Currency,
  usdRate = DEFAULT_USD_RATE,
  rubRate = DEFAULT_RUB_RATE
): string {
  if (currency === 'USD') {
    const usd = convertAmdToUsd(amountAmd, usdRate);
    return `$ ${formatNumber(usd)}`;
  }
  if (currency === 'RUB') {
    const rub = convertAmdToRub(amountAmd, rubRate);
    return `${formatNumber(rub)} ₽`;
  }
  return `${formatNumber(amountAmd)} ֏`;
}

export function formatPricePerSqm(
  amountAmd: number,
  areaSqm: number,
  currency: Currency,
  usdRate = DEFAULT_USD_RATE,
  rubRate = DEFAULT_RUB_RATE
): string {
  if (!areaSqm || areaSqm <= 0) return '';
  const perSqmAmd = Math.round(amountAmd / areaSqm);
  if (currency === 'USD') {
    const perSqmUsd = Math.round(convertAmdToUsd(perSqmAmd, usdRate));
    return `$ ${formatNumber(perSqmUsd)} / м²`;
  }
  if (currency === 'RUB') {
    const perSqmRub = Math.round(convertAmdToRub(perSqmAmd, rubRate));
    return `${formatNumber(perSqmRub)} ₽ / м²`;
  }
  return `${formatNumber(perSqmAmd)} ֏ / м²`;
}
