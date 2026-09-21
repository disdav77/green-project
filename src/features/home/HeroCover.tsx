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
              <span>Монолитные кварталы класса А+ в Ереване</span>
            </span>

            <h1 className="hero-heading">
              Монолитное жилье с чистовой отделкой и подземным паркингом
            </h1>

            <p className="hero-text">
              Девелопер монолитных жилых кварталов класса А+ в Ереване: сейсмостойкость 9 баллов, подземный отапливаемый паркинг, бессрочный возврат налога по Ст. 156.1 НК РА и защищенные эскроу-счета.
            </p>

            <div className="hero-btn-group">
              <Link href="/apartments" className="btn btn-primary btn-lg">
                Смотреть квартиры
              </Link>
              <button
                type="button"
                className="btn btn-outline btn-lg"
                onClick={() => openConsultModal()}
              >
                Записаться на просмотр
              </button>
            </div>

            <dl className="hero-stats-dl">
              <div>
                <dt className="stat-dt">от 38 м²</dt>
                <dd className="stat-dd">площадь</dd>
              </div>
              <div>
                <dt className="stat-dt">14</dt>
                <dd className="stat-dd">этажей</dd>
              </div>
              <div>
                <dt className="stat-dt">10%</dt>
                <dd className="stat-dd">ипотека</dd>
              </div>
              <div>
                <dt className="stat-dt">3</dt>
                <dd className="stat-dd">флагманских проекта</dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Framed Image with Floating Badges */}
          <div className="hero-image-wrapper">
            <div className="hero-image-frame">
              <img
                src="/images/hero-complex.png"
                alt="Современный жилой комплекс Green Project"
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
                <p className="floating-card-title">Зелёные дворы</p>
                <p className="floating-card-sub">без машин</p>
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
                <p className="floating-card-title">Возврат налога</p>
                <p className="floating-card-sub">до 500 тыс ֏/мес</p>
              </div>
            </div>
          </div>
        </div>

        {/* Setl Group Promo Ribbon */}
        <div className="hero-promo-ribbon">
          <Link href="/mortgage" className="hero-promo-card">
            <span className="hero-promo-badge">Господдержка</span>
            <strong className="hero-promo-title">
              Ипотека от 10% • Возврат налога до 500 000 ֏/мес (до 1 000 000 ֏ с созаёмщиком)
            </strong>
          </Link>
          <Link href="/projects/townhouse" className="hero-promo-card">
            <span className="hero-promo-badge">Старт продаж</span>
            <strong className="hero-promo-title">
              Старт продаж в с. Касах — бессрочная господдержка
            </strong>
          </Link>
          <div className="hero-promo-card">
            <span className="hero-promo-badge">Надёжность</span>
            <strong className="hero-promo-title">
              Сейсмостойкость 9 баллов (монолит) • Сдача 2026
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
