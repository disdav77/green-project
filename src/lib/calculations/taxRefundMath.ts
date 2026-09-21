export interface TaxRefundInput {
  propertyPriceAMD: number;
  loanAmountAMD: number;
  interestRatePercent: number;
  monthlyPaymentAMD: number;
  hasCoBorrower: boolean;
  projectSlug?: string;
}

export interface TaxRefundResult {
  isEligiblePrice: boolean;
  maxEligiblePriceAMD: number;
  monthlyInterestEstimatedAMD: number;
  maxMonthlyRefundLimitAMD: number;
  actualMonthlyRefundAMD: number;
  effectiveMonthlyPaymentAMD: number;
  oneYearSavingsAMD: number;
  fiveYearSavingsAMD: number;
  quarterlyRefundLimitAMD: number;
  programStatusNote: string;
}

export const LAW_MAX_PROPERTY_PRICE_AMD = 55000000;
export const LAW_SINGLE_QUARTERLY_LIMIT_AMD = 1500000;
export const LAW_COBORROWER_QUARTERLY_LIMIT_AMD = 3000000;

export function calculateTaxRefund(input: TaxRefundInput): TaxRefundResult {
  const { propertyPriceAMD, loanAmountAMD, interestRatePercent, monthlyPaymentAMD, hasCoBorrower, projectSlug } = input;

  const isEligiblePrice = propertyPriceAMD <= LAW_MAX_PROPERTY_PRICE_AMD;
  const quarterlyLimit = hasCoBorrower ? LAW_COBORROWER_QUARTERLY_LIMIT_AMD : LAW_SINGLE_QUARTERLY_LIMIT_AMD;
  const maxMonthlyRefundLimitAMD = Math.round(quarterlyLimit / 3);

  // During first years of mortgage, interest portion of monthly payment is highest
  const monthlyRate = interestRatePercent / 100 / 12;
  const monthlyInterestEstimatedAMD = Math.round(loanAmountAMD * monthlyRate);

  let actualMonthlyRefundAMD = 0;
  if (isEligiblePrice && loanAmountAMD > 0) {
    actualMonthlyRefundAMD = Math.min(monthlyInterestEstimatedAMD, maxMonthlyRefundLimitAMD);
  }

  const effectiveMonthlyPaymentAMD = Math.max(0, monthlyPaymentAMD - actualMonthlyRefundAMD);
  const oneYearSavingsAMD = actualMonthlyRefundAMD * 12;
  const fiveYearSavingsAMD = actualMonthlyRefundAMD * 60;

  let programStatusNote = '';
  if (projectSlug === 'townhouse') {
    programStatusNote = 'Бессрочный возврат подоходного налога для с. Касах (Котайкский марз)';
  } else if (projectSlug === 'avan' || projectSlug === 'nork') {
    programStatusNote = 'Действует согласно графику разрешений на строительство в г. Ереван';
  } else {
    programStatusNote = 'Государственная программа субсидирования процентных ставок по Ст. 156.1 НК РА';
  }

  return {
    isEligiblePrice,
    maxEligiblePriceAMD: LAW_MAX_PROPERTY_PRICE_AMD,
    monthlyInterestEstimatedAMD,
    maxMonthlyRefundLimitAMD,
    actualMonthlyRefundAMD,
    effectiveMonthlyPaymentAMD,
    oneYearSavingsAMD,
    fiveYearSavingsAMD,
    quarterlyRefundLimitAMD: quarterlyLimit,
    programStatusNote,
  };
}
