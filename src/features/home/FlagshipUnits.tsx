'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { initialUnits, initialProjects } from '@/lib/initialCatalog';
import { formatPrice, formatPricePerSqm } from '@/lib/currency';

export function FlagshipUnits() {
  const { currency } = useApp();

  // Pick 3 flagship units (1 from Avan, 1 from Nork, 1 from Townhouse)
  const flagshipIds = ['avan-102', 'nork-201', 'th-301'];
  const units = initialUnits.filter((u) => flagshipIds.includes(u.id));

  return (
    <section id="apartments" className="apartments-section">
      <div className="container">
        <div className="section-header-row">
          <div>
            <h2 className="section-h2">Флагманские планировки месяца</h2>
            <p className="section-subtitle">
              Популярные квартиры с высокой инсоляцией и оптимальной стоимостью метра от застройщика Green Project.
            </p>
          </div>
          <Link href="/apartments" className="btn btn-outline">
            Весь каталог планировок ↗
          </Link>
        </div>

        {/* 3 Authentic Setl Group Cards */}
        <div className="apartments-grid">
          {units.map((unit) => {
            const project = initialProjects.find((p) => p.id === unit.projectId);
            const badgeClass =
              unit.status === 'available'
                ? 'badge-sale'
                : unit.status === 'reserved'
                ? 'badge-reserved'
                : 'badge-sold';

            const badgeLabel =
              unit.status === 'available'
                ? 'В продаже'
                : unit.status === 'reserved'
                ? 'Забронирована'
                : 'Продано';

            return (
              <article key={unit.id} className="apartment-card">
                <Link href={`/apartments?id=${unit.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="apartment-media">
                    <img src={unit.image} alt={unit.roomsLabel} />
                    <span className={`apartment-badge ${badgeClass}`}>
                      {badgeLabel}
                    </span>
                    <span className="apt-delivery-tag">
                      {project?.deliveryDate} • {project?.readiness}
                    </span>
                  </div>
                  <div className="apartment-body">
                    <p className="apartment-district">{unit.exactAddress}</p>
                    <h3 className="apartment-title">{unit.roomsLabel}</h3>
                    <div className="apartment-specs-grid">
                      <div className="spec-entry">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                          <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                          <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                          <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                        </svg>
                        <span>{unit.areaSqm} м²</span>
                      </div>
                      <div className="spec-entry">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
                          <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
                        </svg>
                        <span>{unit.rooms} комн.</span>
                      </div>
                      <div className="spec-entry">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 10h.01" />
                          <path d="M12 14h.01" />
                          <rect x="4" y="2" width="16" height="20" rx="2" />
                        </svg>
                        <span>{unit.floorNumber} эт.</span>
                      </div>
                    </div>
                    <div className="apartment-footer">
                      <div>
                        <span className="apartment-price">{formatPrice(unit.priceAMD, currency)}</span>
                        <div className="apartment-price-sqm">
                          {formatPricePerSqm(unit.priceAMD, unit.areaSqm, currency)}
                        </div>
                      </div>
                      <span className="apartment-cta">Подробнее →</span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
