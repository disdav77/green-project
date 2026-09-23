'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export function HeroCover() {
  const { dictionary, openConsultModal } = useApp();

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Heading, Text, Buttons, Stats */}
          <div>
            <span className="hero-badge-pill">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
              <span>{dictionary.hero.badge}</span>
            </span>

            <h1 className="hero-heading">
              {dictionary.hero.title}
            </h1>

            <p className="hero-text">
              {dictionary.hero.subtitle}
            </p>

            <div className="hero-btn-group">
              <Link href="/apartments" className="btn btn-primary btn-lg">
                {dictionary.hero.chooseApartment}
              </Link>
              <button
                type="button"
                className="btn btn-outline btn-lg"
                onClick={() => openConsultModal()}
              >
                {dictionary.topBar.bookTour}
              </button>
            </div>

            <dl className="hero-stats-dl">
              <div>
                <dt className="stat-dt">{dictionary.hero.statAreaFrom}</dt>
                <dd className="stat-dd">{dictionary.hero.statAreaUnit}</dd>
              </div>
              <div>
                <dt className="stat-dt">{dictionary.hero.statFloors}</dt>
                <dd className="stat-dd">{dictionary.hero.statFloorsUnit}</dd>
              </div>
              <div>
                <dt className="stat-dt">{dictionary.hero.statMortgage}</dt>
                <dd className="stat-dd">{dictionary.hero.statMortgageUnit}</dd>
              </div>
              <div>
                <dt className="stat-dt">{dictionary.hero.statProjects}</dt>
                <dd className="stat-dd">{dictionary.hero.statProjectsUnit}</dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Framed Image with Floating Badges */}
          <div className="hero-image-wrapper">
            <div className="hero-image-frame">
              <img
                src="/images/hero-complex.png"
                alt={dictionary.brand.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Floating Card 1: Green Courtyard */}
            <div className="floating-card-bl">
              <span className="floating-icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" />
                  <path d="M12 22v-3" />
                </svg>
              </span>
              <div>
                <p className="floating-card-title">{dictionary.audience.tabFamily.label}</p>
                <p className="floating-card-sub">{dictionary.audience.tabFamily.benefits[0]}</p>
              </div>
            </div>

            {/* Floating Card 2: Tax Refund */}
            <div className="floating-card-tr">
              <span className="floating-icon-box-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 12h4" />
                  <path d="M10 8h4" />
                  <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
                  <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
                  <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
                </svg>
              </span>
              <div>
                <p className="floating-card-title">{dictionary.audience.tabIT.label}</p>
                <p className="floating-card-sub">{dictionary.mortgage.taxRefundMonthly}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Setl Group Promo Ribbon */}
        <div className="hero-promo-ribbon">
          <Link href="/mortgage" className="hero-promo-card">
            <span className="hero-promo-badge">{dictionary.nav.mortgage}</span>
            <strong className="hero-promo-title">
              {dictionary.mortgage.title} • {dictionary.mortgage.coBorrowerDesc}
            </strong>
          </Link>
          <Link href="/projects/townhouse" className="hero-promo-card">
            <span className="hero-promo-badge">{dictionary.projects.eliteTownhouse}</span>
            <strong className="hero-promo-title">
              {dictionary.projects.featuresSummaryTownhouse}
            </strong>
          </Link>
          <div className="hero-promo-card">
            <span className="hero-promo-badge">{dictionary.engineering.disciplines.seismic.label}</span>
            <strong className="hero-promo-title">
              {dictionary.engineering.about.p2}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
