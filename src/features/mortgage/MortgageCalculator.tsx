'use client';

import React, { useState, useMemo } from 'react';
import { calculateMortgage } from '@/lib/calculations/mortgageMath';
import { calculateTaxRefund } from '@/lib/calculations/taxRefundMath';
import { initialBanks } from '@/lib/initialCatalog';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/currency';
import { Printer, ShieldCheck, Users, HelpCircle, ArrowRight, Building } from 'lucide-react';

export function MortgageCalculator() {
  const { currency, dictionary, openConsultModal } = useApp();

  // Inputs state
  const [propertyPriceAMD, setPropertyPriceAMD] = useState<number>(25000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(10);
  const [loanTermYears, setLoanTermYears] = useState<number>(20);
  const [interestRatePercent, setInterestRatePercent] = useState<number>(11.2);
  const [hasCoBorrower, setHasCoBorrower] = useState<boolean>(true);
  const [selectedBankId, setSelectedBankId] = useState<string>('ameria');

  // Perform pure calculations
  const mortgageResult = useMemo(() => {
    return calculateMortgage({
      propertyPriceAMD,
      downPaymentPercent,
      loanTermYears,
      interestRatePercent,
    });
  }, [propertyPriceAMD, downPaymentPercent, loanTermYears, interestRatePercent]);

  const taxRefundResult = useMemo(() => {
    return calculateTaxRefund({
      propertyPriceAMD,
      loanAmountAMD: mortgageResult.loanAmountAMD,
      interestRatePercent,
      monthlyPaymentAMD: mortgageResult.monthlyPaymentAMD,
      hasCoBorrower,
    });
  }, [propertyPriceAMD, mortgageResult.loanAmountAMD, interestRatePercent, mortgageResult.monthlyPaymentAMD, hasCoBorrower]);

  const handleBankSelect = (bankId: string) => {
    setSelectedBankId(bankId);
    const bank = initialBanks.find((b) => b.id === bankId);
    if (bank) {
      setInterestRatePercent(bank.rate);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-card border border-graphite-200 shadow-card p-6 sm:p-8 space-y-8">
      {/* Co-Borrower Highlight Banner */}
      <div className="p-4 rounded-card bg-pine-50 border border-pine-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-btn bg-pine text-white flex items-center justify-center shrink-0 mt-0.5">
            <Users className="w-5 h-5 text-brass" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-pine">
              {dictionary.mortgage.coBorrowerToggle}
            </div>
            <p className="text-xs text-graphite-700 mt-0.5">
              {dictionary.mortgage.coBorrowerDesc}
            </p>
          </div>
        </div>

        <label className="inline-flex items-center gap-2 cursor-pointer self-end sm:self-center">
          <input
            type="checkbox"
            checked={hasCoBorrower}
            onChange={(e) => setHasCoBorrower(e.target.checked)}
            className="w-4 h-4 text-pine rounded focus:ring-pine"
          />
          <span className="text-xs font-bold text-graphite-900">
            {hasCoBorrower ? 'Созаёмщик включен' : 'Один заёмщик'}
          </span>
        </label>
      </div>

      {/* Main Grid: Controls vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders & Bank Presets (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Bank Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-graphite-500 uppercase tracking-wider">
              {dictionary.mortgage.banksTitle}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {initialBanks.map((bank) => {
                const isSelected = selectedBankId === bank.id;
                return (
                  <button
                    key={bank.id}
                    type="button"
                    onClick={() => handleBankSelect(bank.id)}
                    className={`p-2.5 rounded-btn text-xs text-center border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-pine text-white border-pine font-bold shadow-sm'
                        : 'bg-limestone-alt text-graphite-700 border-graphite-200 hover:bg-limestone'
                    }`}
                  >
                    <div className="truncate">{bank.name}</div>
                    <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-brass-light' : 'text-graphite-500'}`}>
                      {bank.rate}%
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slider 1: Property Value */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-graphite-700">
                {dictionary.mortgage.propertyPrice}
              </span>
              <span className="text-sm font-extrabold text-graphite-900">
                {formatPrice(propertyPriceAMD, currency)}
              </span>
            </div>
            <input
              type="range"
              min={10000000}
              max={60000000}
              step={500000}
              value={propertyPriceAMD}
              onChange={(e) => setPropertyPriceAMD(Number(e.target.value))}
              className="w-full h-2 bg-graphite-200 rounded-lg appearance-none cursor-pointer accent-pine"
            />
            <div className="flex justify-between text-[11px] text-graphite-400">
              <span>10 млн ֏</span>
              <span>Лимит программы: 55 млн ֏</span>
              <span>60 млн ֏</span>
            </div>
          </div>

          {/* Slider 2: Down Payment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-graphite-700">
                {dictionary.mortgage.downPayment}
              </span>
              <span className="text-sm font-extrabold text-graphite-900">
                {downPaymentPercent}% ({formatPrice(mortgageResult.downPaymentAMD, currency)})
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-graphite-200 rounded-lg appearance-none cursor-pointer accent-pine"
            />
            <div className="flex justify-between text-[11px] text-graphite-400">
              <span>Мин. 10%</span>
              <span>20%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Slider 3: Loan Term */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-graphite-700">
                {dictionary.mortgage.loanTerm}
              </span>
              <span className="text-sm font-extrabold text-graphite-900">
                {loanTermYears} лет ({loanTermYears * 12} мес)
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(Number(e.target.value))}
              className="w-full h-2 bg-graphite-200 rounded-lg appearance-none cursor-pointer accent-pine"
            />
            <div className="flex justify-between text-[11px] text-graphite-400">
              <span>5 лет</span>
              <span>15 лет</span>
              <span>30 лет</span>
            </div>
          </div>

          {/* Slider 4: Interest Rate Manual Adjustment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-graphite-700">
                {dictionary.mortgage.interestRate} (ручная регулировка)
              </span>
              <span className="text-sm font-extrabold text-graphite-900">
                {interestRatePercent.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min={9.0}
              max={16.0}
              step={0.1}
              value={interestRatePercent}
              onChange={(e) => {
                setInterestRatePercent(Number(e.target.value));
                setSelectedBankId('custom');
              }}
              className="w-full h-2 bg-graphite-200 rounded-lg appearance-none cursor-pointer accent-pine"
            />
            <div className="flex justify-between text-[11px] text-graphite-400">
              <span>9.0%</span>
              <span>12.0%</span>
              <span>16.0%</span>
            </div>
          </div>
        </div>

        {/* Right Column: Output Summary Box (5 cols) */}
        <div className="lg:col-span-5 bg-limestone-alt rounded-card p-6 border border-graphite-200 space-y-6">
          <div className="space-y-4">
            <div className="border-b border-graphite-200 pb-3">
              <span className="text-xs text-graphite-500 uppercase font-semibold">
                {dictionary.mortgage.effectivePayment}
              </span>
              <div className="text-3xl font-heading font-black text-pine mt-0.5">
                {formatPrice(taxRefundResult.effectiveMonthlyPaymentAMD, currency)}
                <span className="text-xs font-normal text-graphite-500"> / мес</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-graphite-600">{dictionary.mortgage.monthlyPayment}:</span>
                <strong className="text-graphite-800 line-through">
                  {formatPrice(mortgageResult.monthlyPaymentAMD, currency)}
                </strong>
              </div>

              <div className="flex justify-between text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-btn border border-emerald-200">
                <span className="font-semibold">{dictionary.mortgage.taxRefundMonthly}:</span>
                <strong>- {formatPrice(taxRefundResult.actualMonthlyRefundAMD, currency)}</strong>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-graphite-600">{dictionary.mortgage.savings5Years}:</span>
                <strong className="text-pine font-bold">
                  {formatPrice(taxRefundResult.fiveYearSavingsAMD, currency)}
                </strong>
              </div>

              <div className="flex justify-between border-t border-graphite-200 pt-2">
                <span className="text-graphite-600">{dictionary.mortgage.requiredSalary}:</span>
                <strong className="text-graphite-800">
                  {formatPrice(mortgageResult.requiredGrossSalaryAMD, currency)}
                </strong>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => openConsultModal()}
              className="w-full py-3 rounded-btn bg-pine hover:bg-pine-800 text-white text-xs font-bold transition-all shadow-subtle cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Подать заявку на ипотеку</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="w-full py-2.5 rounded-btn bg-white hover:bg-limestone text-graphite-800 border border-graphite-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-brass" />
              <span>{dictionary.mortgage.downloadPdf}</span>
            </button>
          </div>

          <div className="flex items-start gap-2 text-[11px] text-graphite-500 leading-tight">
            <ShieldCheck className="w-4 h-4 text-pine shrink-0 mt-0.5" />
            <span>
              Расчет является предварительным. Точные условия утверждаются кредитным комитетом выбранного банка.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
