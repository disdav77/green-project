'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export function Footer() {
  const { dictionary } = useApp();

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
              Современные жилые комплексы среди зелени в Ереване. Квартиры с отделкой под ключ, закрытые благоустроенные дворы и развитая эко-инфраструктура.
            </p>
            <div className="footer-license-note">
              Лицензия девелопера РА № 18492 • Строительство по стандартам сейсмостойкости 9 баллов (СНиП РА II-6.02-2006)
            </div>
          </div>

          {/* 2. Residential Complexes */}
          <div>
            <h3 className="footer-heading">{dictionary.nav.projects}</h3>
            <ul className="footer-links-list">
              <li>
                <Link href="/projects/avan">ЖК Green Avan • Аван</Link>
              </li>
              <li>
                <Link href="/projects/nork">ЖК Green Nork • Нор-Норк</Link>
              </li>
              <li>
                <Link href="/projects/townhouse">Green Townhouse • с. Касах</Link>
              </li>
              <li>
                <Link href="/apartments">Все квартиры и планировки →</Link>
              </li>
            </ul>
          </div>

          {/* 3. Buyers & Finance */}
          <div>
            <h3 className="footer-heading">Покупателям</h3>
            <ul className="footer-links-list">
              <li>
                <Link href="/apartments">Каталог квартир</Link>
              </li>
              <li>
                <Link href="/mortgage">Ипотека со ст. 156.1 НК РА</Link>
              </li>
              <li>
                <Link href="/#engineering">Инженерные стандарты</Link>
              </li>
              <li>
                <Link href="/#escrow">Эскроу-счета и гарантии</Link>
              </li>
              <li>
                <Link href="/admin">Панель управления CMS</Link>
              </li>
            </ul>
          </div>

          {/* 4. Sales Office Contacts */}
          <div>
            <h3 className="footer-heading">Контакты</h3>
            <ul className="footer-links-list">
              <li>Офис продаж: {dictionary.brand.address}</li>
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
                Ежедневно: 09:00 — 20:00
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-copyright-row">
          <p>© 2026 Green Project. Все права защищены.</p>
          <p>г. Ереван, Республика Армения</p>
        </div>
      </div>
    </footer>
  );
}
