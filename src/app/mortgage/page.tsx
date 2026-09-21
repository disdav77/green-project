'use client';

import React from 'react';
import { MortgageCalculator } from '@/features/mortgage/MortgageCalculator';
import { TaxLawExplanation } from '@/features/mortgage/TaxLawExplanation';
import { Calculator, Award } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function MortgagePage() {
  const { dictionary } = useApp();

  return (
    <div className="py-12 bg-limestone-alt min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Title Banner */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-pine uppercase tracking-wider bg-pine-50 px-3 py-1 rounded-btn border border-pine-200">
            <Award className="w-4 h-4 text-brass" />
            <span>Государственная поддержка покупателей новостроек</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-graphite-900 tracking-tight">
            {dictionary.mortgage.title}
          </h1>
          <p className="text-sm sm:text-base text-graphite-600 max-w-3xl">
            {dictionary.mortgage.subtitle}. Рассчитайте сумму государственной субсидии и фактический размер ежемесячного платежа с учетом созаёмщиков.
          </p>
        </div>

        {/* Interactive Calculator */}
        <MortgageCalculator />

        {/* Legal Breakdown & FAQs */}
        <TaxLawExplanation />
      </div>
    </div>
  );
}
