'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Currency, Language } from '@/types/database';

export function TopBar() {
  const { language, currency, dictionary, setLanguage, setCurrency } = useApp();

  return (
    <aside className="top-bar">
      <div className="container top-bar-inner">
        <div className="top-bar-announcement">
          <span className="top-bar-location-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{dictionary.topBar.location}</span>
          </span>
          <span className="top-bar-sep">•</span>
          <span>{dictionary.topBar.accreditation}</span>
        </div>

        <div className="top-bar-controls">
          {/* Currency */}
          <div className="pill-selector" role="group" aria-label="Валюта">
            <button
              type="button"
              onClick={() => setCurrency('AMD')}
              className={`pill-btn ${currency === 'AMD' ? 'active' : ''}`}
            >
              ֏ AMD
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`pill-btn ${currency === 'USD' ? 'active' : ''}`}
            >
              $ USD
            </button>
          </div>

          {/* Language */}
          <div className="pill-selector" role="group" aria-label="Язык">
            <button
              type="button"
              onClick={() => setLanguage('ru')}
              className={`pill-btn ${language === 'ru' ? 'active' : ''}`}
            >
              RU
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hy')}
              className={`pill-btn ${language === 'hy' ? 'active' : ''}`}
            >
              AM
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`pill-btn ${language === 'en' ? 'active' : ''}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
