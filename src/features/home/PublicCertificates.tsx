'use client';

import React from 'react';

export function PublicCertificates() {
  return (
    <section className="escrow-section pre-footer-trust-section" id="escrow">
      <div className="container">
        <div className="escrow-banner-card">
          {/* Верхняя лента аккредитации */}
          <div className="trust-accreditation-bar">
            <div className="trust-accreditation-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Институциональный девелопер</span>
            </div>
            <div className="trust-banks-flow">
              <span className="trust-banks-label">• Аккредитация во всех банках РА • Эскроу • Ст. 156.1 НК РА</span>
              <div className="trust-banks-pills">
                <span className="trust-bank-pill">Ameriabank</span>
                <span className="trust-bank-pill">Inecobank</span>
                <span className="trust-bank-pill">Ardshinbank</span>
                <span className="trust-bank-pill">ACBA</span>
                <span className="trust-bank-pill">Converse</span>
              </div>
            </div>
          </div>

          {/* Заголовок и правовой статус */}
          <div className="escrow-header">
            <div className="escrow-shield-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h3 className="escrow-title">
                100% юридическая безопасность: защита средств по закону РА
              </h3>
              <p className="escrow-subtitle">
                Покупка квартиры напрямую от застройщика Green Project через специальные банковские счета эскроу в соответствии с Законом Республики Армения «О градостроительстве».
              </p>
            </div>
          </div>

          {/* Сетка 3 ключевых гарантий покупателя */}
          <div className="escrow-features-grid">
            <div className="escrow-feature-item">
              <span className="escrow-check-icon">✓</span>
              <div>
                <div className="escrow-item-title">Эскроу-счета (Escrow)</div>
                <div className="escrow-item-desc">
                  Ваши деньги замораживаются в банке-партнере и переводятся застройщику только после сдачи дома и регистрации в Кадастре.
                </div>
              </div>
            </div>
            <div className="escrow-feature-item">
              <span className="escrow-check-icon">✓</span>
              <div>
                <div className="escrow-item-title">Нотариальная регистрация</div>
                <div className="escrow-item-desc">
                  Каждый предварительный договор заверяется нотариусом и регистрируется в Государственном комитете кадастра РА.
                </div>
              </div>
            </div>
            <div className="escrow-feature-item">
              <span className="escrow-check-icon">✓</span>
              <div>
                <div className="escrow-item-title">Возврат подоходного налога</div>
                <div className="escrow-item-desc">
                  Официальная аккредитация во всех системообразующих банках Армении с прямой передачей документов в КГД РА.
                </div>
              </div>
            </div>
          </div>

          {/* Презентационная плашка корпоративных стандартов */}
          <div className="trust-eco-standards-row">
            <div className="eco-standard-pill">
              <span className="eco-pill-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22v-7" />
                  <path d="M17 14v-2a5 5 0 0 0-10 0v2" />
                  <path d="M5 14a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-2z" />
                </svg>
              </span>
              <span>Ландшафтный дизайн-парк во дворе</span>
            </div>
            <div className="eco-standard-pill">
              <span className="eco-pill-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </span>
              <span>Класс энергоэффективности А+</span>
            </div>
            <div className="eco-standard-pill">
              <span className="eco-pill-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="21" x2="20" y2="21" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <line x1="12" y1="3" x2="12" y2="10" />
                  <line x1="6" y1="10" x2="6" y2="21" />
                  <line x1="10" y1="10" x2="10" y2="21" />
                  <line x1="14" y1="10" x2="14" y2="21" />
                  <line x1="18" y1="10" x2="18" y2="21" />
                </svg>
              </span>
              <span>Сейсмостойкость 9 баллов (СНиП РА)</span>
            </div>
            <div className="eco-standard-pill">
              <span className="eco-pill-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </span>
              <span>Лицензия девелопера РА № 18492</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
