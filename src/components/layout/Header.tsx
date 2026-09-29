'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { initialProjects } from '@/lib/initialCatalog';
import { getLocalizedProject } from '@/lib/catalogLocalization';

export function Header() {
  const { language, currency, dictionary, setLanguage, setCurrency, openConsultModal } = useApp();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const localizedProjects = initialProjects.map((p) => getLocalizedProject(p, language));

  const isProjectsActive = pathname === '/projects' || pathname.startsWith('/projects/');
  const isApartmentsActive = pathname === '/apartments';
  const isMortgageActive = pathname === '/mortgage';
  const isStandardsActive = pathname === '/standards';
  const isAboutActive = pathname === '/#about';

  return (
    <>
      <header className="site-header" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container header-inner">
          {/* Brand Logo */}
          <Link href="/" className="brand-logo" aria-label="Green Project">
            <img
              src="/images/logo_horizontal.png"
              alt="Green Project"
              style={{ height: '42px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </Link>

          {/* Navigation Links */}
          <nav className="nav-links">
            <Link href="/projects" className={`nav-link ${isProjectsActive ? 'active' : ''}`}>
              {dictionary.nav.projects}
            </Link>
            <Link href="/apartments" className={`nav-link ${isApartmentsActive ? 'active' : ''}`}>
              {dictionary.nav.catalog}
            </Link>
            <Link href="/mortgage" className={`nav-link ${isMortgageActive ? 'active' : ''}`}>
              {dictionary.nav.mortgage}
            </Link>
            <Link href="/standards" className={`nav-link ${isStandardsActive ? 'active' : ''}`}>
              {dictionary.nav.standards}
            </Link>
            <Link href="/#about" className={`nav-link ${isAboutActive ? 'active' : ''}`}>
              {dictionary.nav.about}
            </Link>
          </nav>

          {/* Right Section */}
          <div className="header-right">
            <a href={`tel:${dictionary.brand.phone.replace(/\s+/g, '')}`} className="header-phone-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
              <span>{dictionary.brand.phone}</span>
            </a>

            <button
              type="button"
              className="btn btn-primary btn-sm header-cta-btn"
              onClick={() => openConsultModal()}
            >
              {dictionary.nav.requestCall}
            </button>

            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Navigation Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <>
          <div
            className="drawer-backdrop"
            style={{ opacity: 1, pointerEvents: 'auto' }}
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="mobile-drawer-box active" style={{ transform: 'translateX(0)' }}>
            <div className="drawer-head">
              <Link href="/" className="brand-logo" onClick={() => setIsDrawerOpen(false)} aria-label="Green Project">
                <img
                  src="/images/logo_horizontal.png"
                  alt="Green Project"
                  style={{ height: '36px', width: 'auto', display: 'block', objectFit: 'contain' }}
                />
              </Link>
              <button
                type="button"
                className="drawer-close"
                onClick={() => setIsDrawerOpen(false)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Currency & Language in Mobile Drawer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '16px' }}>
              <div className="pill-selector" style={{ width: '100%', justifyContent: 'center' }}>
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
                <button
                  type="button"
                  onClick={() => setCurrency('RUB')}
                  className={`pill-btn ${currency === 'RUB' ? 'active' : ''}`}
                >
                  ₽ RUB
                </button>
              </div>

              <div className="pill-selector" style={{ width: '100%', justifyContent: 'center' }}>
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

            <nav className="drawer-links">
              <Link
                href="/projects"
                className={`drawer-link ${isProjectsActive ? 'active' : ''}`}
                style={isProjectsActive ? { color: 'var(--primary)', fontWeight: 700 } : undefined}
                onClick={() => setIsDrawerOpen(false)}
              >
                {dictionary.nav.projects}
              </Link>
              <Link
                href="/apartments"
                className={`drawer-link ${isApartmentsActive ? 'active' : ''}`}
                style={isApartmentsActive ? { color: 'var(--primary)', fontWeight: 700 } : undefined}
                onClick={() => setIsDrawerOpen(false)}
              >
                {dictionary.nav.catalog}
              </Link>
              <Link
                href="/mortgage"
                className={`drawer-link ${isMortgageActive ? 'active' : ''}`}
                style={isMortgageActive ? { color: 'var(--primary)', fontWeight: 700 } : undefined}
                onClick={() => setIsDrawerOpen(false)}
              >
                {dictionary.nav.mortgage}
              </Link>
              <Link
                href="/standards"
                className={`drawer-link ${isStandardsActive ? 'active' : ''}`}
                style={isStandardsActive ? { color: 'var(--primary)', fontWeight: 700 } : undefined}
                onClick={() => setIsDrawerOpen(false)}
              >
                {dictionary.nav.standards}
              </Link>
              <Link
                href="/#about"
                className={`drawer-link ${isAboutActive ? 'active' : ''}`}
                style={isAboutActive ? { color: 'var(--primary)', fontWeight: 700 } : undefined}
                onClick={() => setIsDrawerOpen(false)}
              >
                {dictionary.nav.about}
              </Link>
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
              <a href={`tel:${dictionary.brand.phone.replace(/\s+/g, '')}`} className="btn btn-outline w-full mb-2">
                {dictionary.brand.phone}
              </a>
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={() => {
                  setIsDrawerOpen(false);
                  openConsultModal();
                }}
              >
                {dictionary.nav.requestCall}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
