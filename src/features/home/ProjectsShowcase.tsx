'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/currency';

export function ProjectsShowcase() {
  const { currency, dictionary } = useApp();

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-top-label">{dictionary.brand.name}</span>
          <h2 className="section-h2">Жилые комплексы Green Project</h2>
          <p className="section-subtitle">
            Современная архитектура, экологически чистые районы и максимальный комфорт в Ереване и пригороде
          </p>
        </div>

        <div className="projects-grid">
          {/* Card 1: Green Avan */}
          <article className="project-showcase-card">
            <div className="project-media-wrap">
              <img src="/images/hero-complex.png" alt="ЖК Green Avan" loading="lazy" />
              <div className="project-media-overlay" />
              <div className="project-media-top-badges">
                <span className="project-class-badge">Комфорт-плюс</span>
                <span className="project-readiness-pill">Готовность 90%</span>
              </div>
              <div className="project-media-bottom-info">
                <span className="project-time-tag">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>10 мин до центра</span>
                </span>
              </div>
            </div>
            <div className="project-body">
              <span className="project-district-name">ЖК Green Avan • Аван</span>
              <h3 className="project-title">ЖК Green Avan</h3>
              <p className="project-features-line">
                14 этажей • Ландшафтный дизайн-парк во дворе, зоны воркаута • Отапливаемый подземный паркинг • Школа и садик рядом
              </p>
              <div className="project-status-row">
                <span className="project-delivery-badge">Сдача: IV кв. 2026 • 90%</span>
              </div>
              <div className="project-footer-row">
                <div className="project-price-block">
                  <span className="project-price-prefix">от</span>
                  <strong className="proj-price-dyn">{formatPrice(14060000, currency)}</strong>
                </div>
                <Link href="/projects/avan" className="btn btn-primary">
                  Выбрать квартиру
                </Link>
              </div>
            </div>
          </article>

          {/* Card 2: Green Nork */}
          <article className="project-showcase-card">
            <div className="project-media-wrap">
              <img src="/images/apt-2.png" alt="ЖК Green Nork" loading="lazy" />
              <div className="project-media-overlay" />
              <div className="project-media-top-badges">
                <span className="project-class-badge badge-business">Бизнес-класс</span>
                <span className="project-readiness-pill">Готовность 95%</span>
              </div>
              <div className="project-media-bottom-info">
                <span className="project-time-tag">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>15 мин до центра</span>
                </span>
              </div>
            </div>
            <div className="project-body">
              <span className="project-district-name">ЖК Green Nork • Нор-Норк</span>
              <h3 className="project-title">ЖК Green Nork</h3>
              <p className="project-features-line">
                6 этажей • Панорамный вид на Арарат • Монолитно-кирпичная технология, класс энергоэффективности А+
              </p>
              <div className="project-status-row">
                <span className="project-delivery-badge">Сдача: III кв. 2026 • 95%</span>
              </div>
              <div className="project-footer-row">
                <div className="project-price-block">
                  <span className="project-price-prefix">от</span>
                  <strong className="proj-price-dyn">{formatPrice(33650000, currency)}</strong>
                </div>
                <Link href="/projects/nork" className="btn btn-primary">
                  Выбрать квартиру
                </Link>
              </div>
            </div>
          </article>

          {/* Card 3: Green Townhouse */}
          <article className="project-showcase-card">
            <div className="project-media-wrap">
              <img src="/images/apt-5.png" alt="Green Townhouse" loading="lazy" />
              <div className="project-media-overlay" />
              <div className="project-media-top-badges">
                <span className="project-class-badge badge-th">Премиум таунхаусы</span>
                <span className="project-readiness-pill">Готовность 85%</span>
              </div>
              <div className="project-media-bottom-info">
                <span className="project-time-tag">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>12 мин до центра</span>
                </span>
              </div>
            </div>
            <div className="project-body">
              <span className="project-district-name">Green Townhouse • с. Касах</span>
              <h3 className="project-title">Green Townhouse</h3>
              <p className="project-features-line">
                2 этажа • Собственная терраса и благоустроенный участок 124 м² • Закрытая охраняемая территория, видеонаблюдение
              </p>
              <div className="project-status-row">
                <span className="project-delivery-badge">Сдача: IV кв. 2026 • 85%</span>
              </div>
              <div className="project-footer-row">
                <div className="project-price-block">
                  <span className="project-price-prefix">от</span>
                  <strong className="proj-price-dyn">{formatPrice(45880000, currency)}</strong>
                </div>
                <Link href="/projects/townhouse" className="btn btn-primary">
                  Выбрать таунхаус
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
