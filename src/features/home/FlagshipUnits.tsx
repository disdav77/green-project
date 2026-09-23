'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { initialUnits, initialProjects } from '@/lib/initialCatalog';
import { getLocalizedProject, getLocalizedUnit } from '@/lib/catalogLocalization';
import { formatPrice, formatPricePerSqm } from '@/lib/currency';

export function FlagshipUnits() {
  const { currency, language, dictionary } = useApp();

  const flagshipIds = ['avan-102', 'nork-201', 'th-301'];
  const units = initialUnits
    .filter((u) => flagshipIds.includes(u.id))
    .map((u) => getLocalizedUnit(u, language));

  return (
    <section id="apartments" className="apartments-section">
      <div className="container">
        <div className="section-header-row">
          <div>
            <h2 className="section-h2">{dictionary.flagship.title}</h2>
            <p className="section-subtitle">{dictionary.flagship.subtitle}</p>
          </div>
          <Link href="/apartments" className="btn btn-outline">
            {dictionary.flagship.allCatalogBtn}
          </Link>
        </div>

        <div className="apartments-grid">
          {units.map((unit) => {
            const rawProject = initialProjects.find((p) => p.id === unit.projectId);
            const project = rawProject ? getLocalizedProject(rawProject, language) : undefined;

            const badgeClass =
              unit.status === 'available'
                ? 'badge-sale'
                : unit.status === 'reserved'
                ? 'badge-reserved'
                : 'badge-sold';

            const badgeLabel =
              unit.status === 'available'
                ? dictionary.flagship.statusAvailable
                : unit.status === 'reserved'
                ? dictionary.flagship.statusReserved
                : dictionary.flagship.statusSold;

            return (
              <article key={unit.id} className="apartment-card">
                <Link href={`/apartments?id=${unit.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="apartment-media">
                    <img src={unit.image} alt={unit.roomsLabel} />
                    <span className={`apartment-badge ${badgeClass}`}>{badgeLabel}</span>
                    <span className="apt-delivery-tag">
                      {project?.deliveryDate} • {project?.readiness}
                    </span>
                  </div>

                  <div className="apartment-body">
                    <p className="apartment-district">{project?.name} • {project?.district}</p>
                    <h3 className="apartment-title">{unit.roomsLabel}</h3>
                    <div className="apartment-specs-grid">
                      <div className="spec-entry">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                          <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                          <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                          <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                        </svg>
                        <span>{unit.areaSqm} {dictionary.flagship.areaUnit}</span>
                      </div>
                      <div className="spec-entry">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
                          <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
                        </svg>
                        <span>{unit.rooms} {dictionary.flagship.roomsUnit}</span>
                      </div>
                      <div className="spec-entry">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 10h.01" />
                          <path d="M12 14h.01" />
                          <rect x="4" y="2" width="16" height="20" rx="2" />
                        </svg>
                        <span>{unit.floorNumber} {dictionary.flagship.floorUnit}</span>
                      </div>
                    </div>
                    <div className="apartment-footer">
                      <div>
                        <span className="apartment-price">{formatPrice(unit.priceAMD, currency)}</span>
                        <div className="apartment-price-sqm">
                          {formatPricePerSqm(unit.priceAMD, unit.areaSqm, currency)}
                        </div>
                      </div>
                      <span className="apartment-cta">{dictionary.flagship.detailsBtn}</span>
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
