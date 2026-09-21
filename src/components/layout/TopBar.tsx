'use client';

import React from 'react';
import { MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Currency, Language } from '@/types/database';

export function TopBar() {
  const { language, currency, dictionary, setLanguage, setCurrency, openConsultModal } = useApp();

  return (
    <aside className="w-full bg-graphite-900 text-graphite-200 text-xs py-2 px-4 border-b border-graphite-800 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1 text-brass-light font-medium">
            <MapPin className="w-3.5 h-3.5 text-brass" />
            <span>{dictionary.topBar.location}</span>
          </span>
          <span className="text-graphite-600 hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1.5 text-graphite-300">
            <ShieldCheck className="w-3.5 h-3.5 text-pine-500" />
            <span>{dictionary.topBar.accreditation}</span>
          </span>
        </div>

        <div className="flex items-center gap-4 self-end md:self-auto flex-wrap">
          {/* Currency Switcher */}
          <div className="inline-flex items-center rounded-btn bg-graphite-800 p-0.5 border border-graphite-700" role="group" aria-label="Currency">
            <button
              type="button"
              onClick={() => setCurrency('AMD')}
              className={`px-2.5 py-0.5 rounded-btn text-xs font-semibold transition-all ${
                currency === 'AMD' ? 'bg-pine text-white shadow-sm' : 'text-graphite-400 hover:text-white'
              }`}
            >
              ֏ AMD
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-0.5 rounded-btn text-xs font-semibold transition-all ${
                currency === 'USD' ? 'bg-pine text-white shadow-sm' : 'text-graphite-400 hover:text-white'
              }`}
            >
              $ USD
            </button>
          </div>

          {/* Language Switcher */}
          <div className="inline-flex items-center rounded-btn bg-graphite-800 p-0.5 border border-graphite-700" role="group" aria-label="Language">
            {(['ru', 'hy', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`px-2 py-0.5 rounded-btn text-xs font-semibold uppercase transition-all ${
                  language === lang ? 'bg-pine text-white shadow-sm' : 'text-graphite-400 hover:text-white'
                }`}
              >
                {lang === 'hy' ? 'AM' : lang}
              </button>
            ))}
          </div>

          <a
            href={`tel:${dictionary.brand.phone.replace(/\s+/g, '')}`}
            className="hidden lg:inline-flex items-center gap-1 text-graphite-200 hover:text-brass transition-colors"
          >
            <Phone className="w-3 h-3 text-brass" />
            <span>{dictionary.brand.phone}</span>
          </a>

          <button
            type="button"
            onClick={() => openConsultModal()}
            className="text-brass hover:text-brass-light font-medium underline underline-offset-2 transition-colors cursor-pointer"
          >
            {dictionary.topBar.bookTour}
          </button>
        </div>
      </div>
    </aside>
  );
}
