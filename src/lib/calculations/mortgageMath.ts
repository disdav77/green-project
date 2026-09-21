export interface MortgageInput {
  propertyPriceAMD: number;
  downPaymentPercent: number;
  loanTermYears: number;
  interestRatePercent: number;
}

export interface MortgageResult {
  propertyPriceAMD: number;
  downPaymentAMD: number;
  loanAmountAMD: number;
  monthlyPaymentAMD: number;
  totalPaymentAMD: number;
  totalInterestAMD: number;
  requiredGrossSalaryAMD: number;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { propertyPriceAMD, downPaymentPercent, loanTermYears, interestRatePercent } = input;

  const validPrice = Math.max(0, propertyPriceAMD);
  const validDownPercent = Math.min(90, Math.max(10, downPaymentPercent));
  const validYears = Math.min(30, Math.max(1, loanTermYears));
  const validRate = Math.max(0.1, interestRatePercent);

  const downPaymentAMD = Math.round((validPrice * validDownPercent) / 100);
  const loanAmountAMD = Math.max(0, validPrice - downPaymentAMD);

  const totalMonths = validYears * 12;
  const monthlyRate = validRate / 100 / 12;

  let monthlyPaymentAMD = 0;
  if (loanAmountAMD > 0 && monthlyRate > 0) {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyPaymentAMD = Math.round(loanAmountAMD * (monthlyRate * factor) / (factor - 1));
  }

  const totalPaymentAMD = monthlyPaymentAMD * totalMonths;
  const totalInterestAMD = Math.max(0, totalPaymentAMD - loanAmountAMD);

  // In Armenia, banks generally enforce a debt-to-income ratio of 40-50% on verified net income
  // Net salary = monthlyPayment / 0.45, with approximate income tax/social deduction of 21%
  const estimatedNetSalary = monthlyPaymentAMD > 0 ? monthlyPaymentAMD / 0.45 : 0;
  const requiredGrossSalaryAMD = Math.round(estimatedNetSalary / 0.79);

  return {
    propertyPriceAMD: validPrice,
    downPaymentAMD,
    loanAmountAMD,
    monthlyPaymentAMD,
    totalPaymentAMD,
    totalInterestAMD,
    requiredGrossSalaryAMD,
  };
}
