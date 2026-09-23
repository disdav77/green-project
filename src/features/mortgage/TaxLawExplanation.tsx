'use client';

import React from 'react';
import { ShieldCheck, Calendar, AlertCircle, HelpCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function TaxLawExplanation() {
  const { dictionary } = useApp();

  return (
    <div className="space-y-8">
      {/* Urgency Schedule Banner */}
      <div className="bg-graphite-900 text-white rounded-card p-6 sm:p-8 border border-graphite-800 space-y-4">
        <div className="flex items-center gap-2 text-brass text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-4 h-4" />
          <span>{dictionary.mortgage.urgencyTitle}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-heading font-bold">
          {dictionary.mortgage.statusScheduleTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-graphite-300 pt-2">
          <div className="p-4 rounded-btn bg-graphite-800/80 border border-graphite-700/60 space-y-1">
            <span className="font-bold text-white block">Green Avan & Green Nork:</span>
            <p className="text-graphite-400 leading-relaxed">
              {dictionary.mortgage.urgencyYerevan} {dictionary.mortgage.yerevanScheduleNote}
            </p>
          </div>
          <div className="p-4 rounded-btn bg-pine-900/60 border border-pine-500/40 space-y-1">
            <span className="font-bold text-brass-light block">Green Townhouse:</span>
            <p className="text-graphite-300 leading-relaxed">
              {dictionary.mortgage.urgencyKasakh} {dictionary.mortgage.kasakhScheduleNote}
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-pine" />
          <h3 className="text-lg font-heading font-bold text-graphite-900">
            {dictionary.mortgage.faqTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dictionary.mortgage.faqs.map((faq, idx) => (
            <div key={idx} className="p-5 rounded-card bg-white border border-graphite-200 space-y-2 shadow-subtle">
              <h4 className="text-xs font-bold text-graphite-900 leading-snug">
                {faq.q}
              </h4>
              <p className="text-xs text-graphite-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
