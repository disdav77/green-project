'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { initialProjects } from '@/lib/initialCatalog';
import { getLocalizedProject } from '@/lib/catalogLocalization';

export function Footer() {
  const { language, dictionary, openConsultModal } = useApp();
  const localizedProjects = initialProjects.map((p) => getLocalizedProject(p, language));

  const partnerBanks = ['Ameriabank', 'Ardshinbank', 'ACBA Bank', 'Inecobank', 'Converse'];

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Setl Top Institutional Tier: Brand Identity & Escrow Banking Row */}
        <div className="footer-top-tier">
          <div className="footer-top-brand">
            <Link
              href="/"
              className="brand-logo"
              style={{ display: 'inline-flex', alignItems: 'center' }}
              aria-label="Green Project"
            >
              <span className="brand-icon-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-leaf"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </span>
              <span className="brand-text-stacked">
                <span className="brand-name-top">Green</span>
                <span className="brand-name-bottom">Project</span>
              </span>
            </Link>
            <div className="footer-top-reg">
              {dictionary.footer.developerCharter} • {dictionary.engineering.disciplines.seismic.badge}
            </div>
          </div>

          <div className="footer-top-banks">
            <div className="footer-banks-label">{dictionary.footer.bankPartnersTitle}:</div>
            <div className="footer-banks-list">
              {partnerBanks.map((bank) => (
                <span key={bank} className="footer-bank-badge">
                  {bank}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Setl Group Corporate 5-Column Navigation Grid */}
        <div className="footer-grid-setl">
          {/* Col 1: Projects */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">{dictionary.footer.projectsTitle}</h4>
            <ul className="footer-links-list">
              {localizedProjects.map((proj) => (
                <li key={proj.slug}>
                  <Link href={`/projects/${proj.slug}`}>
                    {proj.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/apartments" className="footer-highlight-link">
                  {dictionary.flagship.allCatalogBtn} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Apartments & Layouts */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">{dictionary.footer.layoutsTitle}</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/apartments?rooms=1">{dictionary.footer.studiosLink}</Link>
              </li>
              <li>
                <Link href="/apartments?rooms=2">{dictionary.footer.twoRoomsLink}</Link>
              </li>
              <li>
                <Link href="/apartments?rooms=3">{dictionary.footer.threeRoomsLink}</Link>
              </li>
              <li>
                <Link href="/apartments?project=green-townhouse">{dictionary.footer.townhousesLink}</Link>
              </li>
              <li>
                <Link href="/apartments">{dictionary.nav.catalog}</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Mortgage & Subsidies */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">{dictionary.footer.standardsTitle}</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/mortgage">{dictionary.footer.taxRefundLink}</Link>
              </li>
              <li>
                <Link href="/mortgage#calculator">{dictionary.footer.mortgageCalcLink}</Link>
              </li>
              <li>
                <Link href="/standards#seismic">{dictionary.footer.seismicStandardLink}</Link>
              </li>
              <li>
                <Link href="/standards#acoustic">{dictionary.footer.acousticStandardLink}</Link>
              </li>
              <li>
                <Link href="/standards#escrow">{dictionary.footer.escrowLink}</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Buyers & Standards */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">{dictionary.footer.buyersTitle}</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/standards">{dictionary.nav.standards}</Link>
              </li>
              <li>
                <Link href="/#about">{dictionary.nav.about}</Link>
              </li>
              <li>
                <Link href="/#booking">{dictionary.bookingPolicy.title}</Link>
              </li>
              <li>
                <Link href="/#progress">{dictionary.hero.statFloors}</Link>
              </li>
              <li>
                <Link href="/admin">{dictionary.footer.adminLink}</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Sales Office & Callback */}
          <div className="footer-nav-col footer-col-contacts">
            <h4 className="footer-heading">{dictionary.footer.contactsTitle}</h4>
            <div className="footer-contacts-content">
              <p className="footer-address">
                {dictionary.brand.address}
              </p>
              <a
                href={`tel:${dictionary.brand.phone.replace(/\s+/g, '')}`}
                className="footer-phone-link"
              >
                {dictionary.brand.phone}
              </a>
              <div className="footer-hours">
                {dictionary.footer.workingHours}
              </div>
              <div className="footer-actions">
                <button
                  type="button"
                  onClick={() => openConsultModal()}
                  className="btn btn-primary footer-btn-consult"
                >
                  {dictionary.footer.consultBtn}
                </button>
                <a
                  href="https://wa.me/37494000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-whatsapp-link"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Setl Legal Disclaimer & Copyright */}
        <div className="footer-legal-bar">
          <p className="footer-disclaimer-text">
            {dictionary.footer.disclaimer}
          </p>
          <div className="footer-copyright-row">
            <p>© 2026 Green Project. {dictionary.footer.allRightsReserved}</p>
            <div className="footer-legal-links">
              <Link href="/privacy" className="footer-policy-link">
                {dictionary.footer.privacyPolicy}
              </Link>
              <Link href="/admin" className="footer-admin-link">
                {dictionary.footer.adminLink}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
