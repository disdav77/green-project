'use client';

import React, { useState, useMemo } from 'react';
import { calculateMortgage } from '@/lib/calculations/mortgageMath';
import { calculateTaxRefund } from '@/lib/calculations/taxRefundMath';
import { initialBanks } from '@/lib/initialCatalog';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/currency';

export function MortgageCalculator() {
  const { currency, dictionary, openConsultModal } = useApp();

  // Inputs state
  const [propertyPriceAMD, setPropertyPriceAMD] = useState<number>(28000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(10);
  const [loanTermYears, setLoanTermYears] = useState<number>(20);
  const [interestRatePercent, setInterestRatePercent] = useState<number>(11.5);
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

  // Payment ratio calculations for the visual bar
  const clientPayRatio = mortgageResult.monthlyPaymentAMD > 0
    ? Math.max(0, Math.min(100, (taxRefundResult.effectiveMonthlyPaymentAMD / mortgageResult.monthlyPaymentAMD) * 100))
    : 100;
  const govPayRatio = Math.max(0, 100 - clientPayRatio);

  return (
    <div className="calc-card-container">
      {/* Left Column: Sliders & Settings */}
      <div className="calc-inputs-col">
        {/* Bank presets */}
        <div className="bank-presets-row">
          <span className="bank-presets-label">Банки-партнеры:</span>
          <div className="bank-presets-pills">
            {initialBanks.map((bank) => {
              const isSelected = selectedBankId === bank.id;
              return (
                <button
                  key={bank.id}
                  type="button"
                  onClick={() => handleBankSelect(bank.id)}
                  className={`bank-btn ${isSelected ? 'active' : ''}`}
                >
                  {bank.name} ({bank.rate}%)
                </button>
              );
            })}
          </div>
        </div>

        {/* Co-Borrower Setting */}
        <div className="calc-group" style={{ background: '#FAFBFB' }}>
          <div className="calc-label-row">
            <div className="calc-label-left">
              <label className="calc-label">{dictionary.mortgage.coBorrowerToggle}</label>
              <span className="tax-law-cap-badge">
                {hasCoBorrower ? 'Лимит: 1 000 000 ֏/мес' : 'Лимит: 500 000 ֏/мес'}
              </span>
            </div>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>
              <input
                type="checkbox"
                checked={hasCoBorrower}
                onChange={(e) => setHasCoBorrower(e.target.checked)}
                style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <span>{hasCoBorrower ? 'Созаёмщик включен' : 'Один заёмщик'}</span>
            </label>
          </div>
        </div>

        {/* 1. Property Price Slider */}
        <div className="calc-group">
          <div className="calc-label-row">
            <div className="calc-label-left">
              <label className="calc-label">{dictionary.mortgage.propertyPrice}</label>
              <span className="tax-law-cap-badge">Порог ст. 156.1: до 55 млн ֏</span>
            </div>
            <span className="calc-val-badge">
              {formatPrice(propertyPriceAMD, currency)}
            </span>
          </div>
          <input
            type="range"
            min={12000000}
            max={55000000}
            step={500000}
            value={propertyPriceAMD}
            onChange={(e) => setPropertyPriceAMD(Number(e.target.value))}
            className="calc-slider"
          />
        </div>

        {/* 2. Down Payment Slider */}
        <div className="calc-group">
          <div className="calc-label-row">
            <label className="calc-label">{dictionary.mortgage.downPayment}</label>
            <span className="calc-val-badge">
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
            className="calc-slider"
          />
        </div>

        {/* 3. Loan Term Slider */}
        <div className="calc-group">
          <div className="calc-label-row">
            <label className="calc-label">{dictionary.mortgage.loanTerm}</label>
            <span className="calc-val-badge">
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
            className="calc-slider"
          />
        </div>

        {/* 4. Interest Rate Manual Slider */}
        <div className="calc-group">
          <div className="calc-label-row">
            <label className="calc-label">{dictionary.mortgage.interestRate}</label>
            <span className="calc-val-badge">
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
            className="calc-slider"
          />
        </div>
      </div>

      {/* Right Column: High-Impact Dark Result Box */}
      <div className="calc-results-box">
        {/* Effective Monthly Payment */}
        <div className="calc-hero-result">
          <span className="calc-hero-label">{dictionary.mortgage.effectivePayment}:</span>
          <div className="effective-val">
            {formatPrice(taxRefundResult.effectiveMonthlyPaymentAMD, currency)}
            <span style={{ fontSize: '15px', fontWeight: 500, opacity: 0.8 }}> / мес.</span>
          </div>
        </div>

        {/* Loan Principal & Standard Payment */}
        <div className="calc-meta-row">
          <div className="calc-meta-item">
            <span className="calc-meta-label">Сумма кредита:</span>
            <strong className="calc-meta-val">
              {formatPrice(mortgageResult.loanAmountAMD, currency)}
            </strong>
          </div>
          <div className="calc-meta-item">
            <span className="calc-meta-label">{dictionary.mortgage.monthlyPayment}:</span>
            <strong className="calc-meta-val" style={{ textDecoration: 'line-through', opacity: 0.85 }}>
              {formatPrice(mortgageResult.monthlyPaymentAMD, currency)}
            </strong>
          </div>
        </div>

        {/* Tax Refund Highlight Box */}
        <div className="tax-highlight-box">
          <div className="tax-highlight-header">
            <span className="tax-highlight-title">{dictionary.mortgage.taxRefundMonthly}:</span>
            <div className="tax-highlight-amount">
              + {formatPrice(taxRefundResult.actualMonthlyRefundAMD, currency)}
            </div>
          </div>
          <small>
            Компенсируется государством из подоходного налога по Ст. 156.1 НК РА
          </small>
        </div>

        {/* Payment Ratio Visual Scale */}
        <div className="payment-ratio-wrap">
          <div className="payment-ratio-bar">
            <div
              className="ratio-client"
              style={{ width: `${clientPayRatio}%` }}
              title={`Ваш платёж: ${Math.round(clientPayRatio)}%`}
            />
            <div
              className="ratio-gov"
              style={{ width: `${govPayRatio}%` }}
              title={`Гасит государство: ${Math.round(govPayRatio)}%`}
            />
          </div>
          <div className="payment-ratio-legend">
            <span className="legend-client">
              ● Ваш платёж: ~{Math.round(clientPayRatio)}%
            </span>
            <span className="legend-gov">
              ● Гасит гос-во: ~{Math.round(govPayRatio)}%
            </span>
          </div>
        </div>

        {/* Sub-grid: Savings + Salary Requirement */}
        <div className="calc-sub-grid">
          <div className="savings-counter-box">
            <div className="savings-row">
              <span>Экономия за 1-й год:</span>
              <strong className="savings-val">
                + {formatPrice(taxRefundResult.oneYearSavingsAMD, currency)}
              </strong>
            </div>
            <div className="savings-row">
              <span>{dictionary.mortgage.savings5Years}:</span>
              <strong className="savings-val-highlight">
                + {formatPrice(taxRefundResult.fiveYearSavingsAMD, currency)}
              </strong>
            </div>
          </div>

          <div className="salary-requirement-box">
            <div style={{ fontSize: '18px', lineHeight: 1 }}>💼</div>
            <div>
              <span className="salary-title">{dictionary.mortgage.requiredSalary}:</span>
              <div className="salary-val">
                от {formatPrice(mortgageResult.requiredGrossSalaryAMD, currency)}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
          <button
            type="button"
            onClick={() => openConsultModal()}
            className="btn btn-primary w-full calc-submit-btn"
          >
            Получить одобрение ипотеки
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn btn-secondary w-full"
            style={{ fontSize: '12px', padding: '8px 12px' }}
          >
            Распечатать расчет (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
