'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export function Header() {
  const { dictionary, openConsultModal } = useApp();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="site-header" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container header-inner">
          {/* Brand Logo */}
          <Link href="/" className="brand-logo">
            <span className="brand-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </span>
            <span className="brand-name">{dictionary.brand.name}</span>
          </Link>

          {/* Navigation Links */}
          <nav className="nav-links">
            <Link href="/#projects" className="nav-link">
              {dictionary.nav.projects}
            </Link>
            <Link href="/projects/avan" className="nav-link">
              Green Avan
            </Link>
            <Link href="/projects/nork" className="nav-link">
              Green Nork
            </Link>
            <Link href="/projects/townhouse" className="nav-link">
              Townhouse
            </Link>
            <Link href="/apartments" className="nav-link nav-highlight-link">
              {dictionary.nav.catalog} ↗
            </Link>
            <Link href="/#engineering" className="nav-link">
              {dictionary.nav.standards}
            </Link>
            <Link href="/mortgage" className="nav-link nav-highlight-link">
              {dictionary.nav.mortgage} ↗
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
              className="btn btn-primary btn-sm"
              onClick={() => openConsultModal()}
            >
              Заказать звонок
            </button>

            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Меню"
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
              <span className="brand-name">{dictionary.brand.name}</span>
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

            <nav className="drawer-links">
              <Link href="/#projects" className="drawer-link" onClick={() => setIsDrawerOpen(false)}>
                {dictionary.nav.projects}
              </Link>
              <Link href="/projects/avan" className="drawer-link" onClick={() => setIsDrawerOpen(false)}>
                ЖК Green Avan
              </Link>
              <Link href="/projects/nork" className="drawer-link" onClick={() => setIsDrawerOpen(false)}>
                ЖК Green Nork
              </Link>
              <Link href="/projects/townhouse" className="drawer-link" onClick={() => setIsDrawerOpen(false)}>
                Green Townhouse
              </Link>
              <Link href="/apartments" className="drawer-link" style={{ color: 'var(--primary)', fontWeight: 700 }} onClick={() => setIsDrawerOpen(false)}>
                {dictionary.nav.catalog} ↗
              </Link>
              <Link href="/mortgage" className="drawer-link" style={{ color: 'var(--primary)', fontWeight: 700 }} onClick={() => setIsDrawerOpen(false)}>
                {dictionary.nav.mortgage} ↗
              </Link>
              <Link href="/#engineering" className="drawer-link" onClick={() => setIsDrawerOpen(false)}>
                {dictionary.nav.standards}
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
                Заказать звонок
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
