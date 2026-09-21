'use client';

import React from 'react';
import { MortgageCalculator } from '@/features/mortgage/MortgageCalculator';
import { TaxLawExplanation } from '@/features/mortgage/TaxLawExplanation';
import { useApp } from '@/context/AppContext';

export default function MortgagePage() {
  const { dictionary } = useApp();

  return (
    <div style={{ backgroundColor: 'var(--background-alt)', padding: '36px 0 64px', minHeight: '80vh' }}>
      <div className="container">
        {/* Top Title Banner */}
        <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '24px' }}>
          <span className="section-top-label">
            Государственная поддержка покупателей новостроек • Ст. 156.1 НК РА
          </span>
          <h1 className="section-h2" style={{ fontSize: '32px', marginBottom: '8px' }}>
            {dictionary.mortgage.title}
          </h1>
          <p className="section-subtitle" style={{ margin: '0', maxWidth: '800px' }}>
            {dictionary.mortgage.subtitle}. Рассчитайте сумму государственной субсидии и фактический размер ежемесячного платежа с учетом созаёмщиков.
          </p>
        </div>

        {/* Interactive Calculator */}
        <MortgageCalculator />

        {/* Legal Breakdown & FAQs */}
        <div style={{ marginTop: '36px' }}>
          <TaxLawExplanation />
        </div>
      </div>
    </div>
  );
}
