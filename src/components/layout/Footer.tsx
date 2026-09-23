'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { initialProjects } from '@/lib/initialCatalog';
import { getLocalizedProject } from '@/lib/catalogLocalization';

export function Footer() {
  const { language, dictionary } = useApp();
  const localizedProjects = initialProjects.map((p) => getLocalizedProject(p, language));

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* 1. About Developer */}
          <div className="footer-col-about">
            <Link href="/" className="brand-logo" style={{ marginBottom: '8px', display: 'inline-flex' }}>
              <span className="brand-icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </span>
              <span className="brand-name">{dictionary.brand.name}</span>
            </Link>
            <p className="footer-desc">
              {dictionary.hero.subtitle}
            </p>
            <div className="footer-license-note">
              {dictionary.footer.developerCharter} • {dictionary.engineering.disciplines.seismic.badge}
            </div>
          </div>

          {/* 2. Residential Complexes */}
          <div>
            <h3 className="footer-heading">{dictionary.footer.projectsTitle}</h3>
            <ul className="footer-links-list">
              {localizedProjects.map((proj) => (
                <li key={proj.slug}>
                  <Link href={`/projects/${proj.slug}`}>
                    {proj.name} • {proj.district}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/apartments">{dictionary.flagship.allCatalogBtn}</Link>
              </li>
            </ul>
          </div>

          {/* 3. Buyers & Finance */}
          <div>
            <h3 className="footer-heading">{dictionary.footer.buyersTitle}</h3>
            <ul className="footer-links-list">
              <li>
                <Link href="/apartments">{dictionary.nav.catalog}</Link>
              </li>
              <li>
                <Link href="/mortgage">{dictionary.nav.mortgage}</Link>
              </li>
              <li>
                <Link href="/#advantages">{dictionary.nav.standards}</Link>
              </li>
              <li>
                <Link href="/#escrow">{dictionary.escrow.sectionTitle}</Link>
              </li>
            </ul>
          </div>

          {/* 4. Sales Office Contacts */}
          <div>
            <h3 className="footer-heading">{dictionary.footer.contactsTitle}</h3>
            <ul className="footer-links-list">
              <li>
                {dictionary.footer.salesOffice} {dictionary.brand.address}
              </li>
              <li>
                <a href={`tel:${dictionary.brand.phone.replace(/\s+/g, '')}`}>
                  {dictionary.brand.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${dictionary.brand.email}`}>
                  {dictionary.brand.email}
                </a>
              </li>
              <li style={{ color: 'rgba(249, 253, 250, 0.55)' }}>
                {dictionary.footer.workingHours}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-copyright-row">
          <p>© 2026 Green Project. {dictionary.footer.allRightsReserved}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link
              href="/admin"
              style={{
                color: 'rgba(249, 253, 250, 0.35)',
                fontSize: '12px',
                textDecoration: 'none',
              }}
              title={dictionary.nav.admin}
            >
              {dictionary.footer.adminLink}
            </Link>
            <p style={{ margin: 0 }}>{dictionary.brand.address}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
