'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Maximize2, ShieldCheck, ArrowRight, Home } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { initialUnits, initialProjects } from '@/lib/initialCatalog';
import { getLocalizedProject, getLocalizedUnit } from '@/lib/catalogLocalization';
import { formatPrice, formatPricePerSqm } from '@/lib/currency';
import { calculateMortgage } from '@/lib/calculations/mortgageMath';
import { CardPhotoGallery } from '@/components/ui/CardPhotoGallery';
import { Unit, Project } from '@/types/database';

const UNIT_PHOTO_SETS: Record<string, string[]> = {
  'avan-101': [
    '/images/projects/apartment_interior.jpg',
    '/images/apt-1.png',
    '/images/projects/avan_facade.jpg',
    '/images/apt-3.png',
  ],
  'avan-102': [
    '/images/apt-2.png',
    '/images/projects/apartment_interior.jpg',
    '/images/projects/avan_perspective.jpg',
    '/images/apt-4.png',
  ],
  'avan-103': [
    '/images/apt-3.png',
    '/images/projects/apartment_interior.jpg',
    '/images/projects/avan_ground.jpg',
    '/images/apt-5.png',
  ],
};

function SetlUnitCard({
  unit,
  rawProject,
}: {
  unit: Unit;
  rawProject: Project | undefined;
}) {
  const { currency, language, dictionary } = useApp();
  const [viewMode, setViewMode] = useState<'photo' | 'plan'>('photo');

  const project = rawProject ? getLocalizedProject(rawProject, language) : undefined;
  const localizedUnit = getLocalizedUnit(unit, language);

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

  const photos = UNIT_PHOTO_SETS[unit.id] || [
    '/images/projects/apartment_interior.jpg',
    '/images/apt-1.png',
    '/images/projects/avan_facade.jpg',
  ];

  const mortgageCalc = calculateMortgage({
    propertyPriceAMD: unit.priceAMD,
    downPaymentPercent: 10,
    loanTermYears: 20,
    interestRatePercent: 11.2,
  });

  return (
    <article className="apartment-card setl-apartment-card">
      {/* Top View Mode Switcher */}
      <div className="setl-card-mode-header">
        <div className="setl-mode-pills">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setViewMode('photo');
            }}
            className={`setl-mode-pill ${viewMode === 'photo' ? 'active' : ''}`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{dictionary.flagship.viewInterior}</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setViewMode('plan');
            }}
            className={`setl-mode-pill ${viewMode === 'plan' ? 'active' : ''}`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{dictionary.flagship.viewFloorPlan}</span>
          </button>
        </div>
        <span className="setl-tax-badge">
          <ShieldCheck className="w-3 h-3 text-brass" />
          <span>{dictionary.flagship.taxRefundBadge}</span>
        </span>
      </div>

      {/* Visual Area: Either 3D Gallery or Clean Floor Plan */}
      <Link href={`/apartments?project=${unit.projectId}&rooms=${unit.rooms}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="apartment-media setl-unit-media">
          {viewMode === 'photo' ? (
            <CardPhotoGallery images={photos} alt={localizedUnit.roomsLabel} aspectRatio="16/10">
              <span className={`apartment-badge ${badgeClass}`}>{badgeLabel}</span>
              <span className="apt-delivery-tag">
                {project?.deliveryDate} • {project?.readiness}
              </span>
            </CardPhotoGallery>
          ) : (
            <div className="setl-plan-preview-container">
              <div className="setl-plan-image-wrap">
                <Image
                  src={unit.image}
                  alt={localizedUnit.roomsLabel}
                  fill
                  className="setl-plan-img"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <span className={`apartment-badge ${badgeClass}`}>{badgeLabel}</span>
              <div className="setl-plan-specs-overlay">
                <span>{unit.areaSqm} {dictionary.flagship.areaUnit}</span>
                <span>•</span>
                <span>{unit.rooms} {dictionary.flagship.roomsUnit}</span>
              </div>
            </div>
          )}
        </div>

        <div className="apartment-body">
          <p className="apartment-district">{project?.name} • {project?.district}</p>
          <h3 className="apartment-title">{localizedUnit.roomsLabel}</h3>

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

          {/* Setl Mortgage Monthly Estimate Line */}
          <div className="setl-mortgage-line">
            <span className="setl-mortgage-label">
              {dictionary.flagship.mortgageMonthlyFrom}:
            </span>
            <strong className="setl-mortgage-val">
              {formatPrice(mortgageCalc.monthlyPaymentAMD, currency)} / {dictionary.mortgage.perMonth}
            </strong>
          </div>

          <div className="apartment-footer">
            <div>
              <span className="apartment-price">{formatPrice(unit.priceAMD, currency)}</span>
              <div className="apartment-price-sqm">
                {formatPricePerSqm(unit.priceAMD, unit.areaSqm, currency)}
              </div>
            </div>
            <span className="apartment-cta inline-flex items-center gap-1">
              <span>{dictionary.flagship.detailsBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function FlagshipUnits() {
  const { dictionary, units: allUnits, projects } = useApp();

  const sourceUnits = Array.isArray(allUnits) && allUnits.length > 0 ? allUnits : initialUnits;
  const units = sourceUnits.slice(0, 3);

  return (
    <section id="apartments" className="apartments-section setl-units-showcase">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="section-top-label inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brass" />
              <span>Setl Group Quality</span>
            </span>
            <h2 className="section-h2">{dictionary.flagship.title}</h2>
            <p className="section-subtitle">{dictionary.flagship.subtitle}</p>
          </div>
          <Link href="/apartments" className="btn btn-outline">
            {dictionary.flagship.allCatalogBtn}
          </Link>
        </div>

        <div className="apartments-grid">
          {units.map((unit) => {
            const rawProject =
              projects.find((p) => p.id === unit.projectId) ||
              initialProjects.find((p) => p.id === unit.projectId);

            return (
              <SetlUnitCard
                key={unit.id}
                unit={unit}
                rawProject={rawProject}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
