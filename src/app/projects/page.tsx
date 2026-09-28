'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { initialProjects } from '@/lib/initialCatalog';
import { getLocalizedProject } from '@/lib/catalogLocalization';
import { formatPrice } from '@/lib/currency';
import { CardPhotoGallery } from '@/components/ui/CardPhotoGallery';

const PROJECT_GALLERIES: Record<string, string[]> = {
  avan: ['/images/hero-complex.png', '/images/apt-3.png', '/images/apt-4.png', '/images/floorplan.png'],
  nork: ['/images/apt-6.png', '/images/apt-2.png', '/images/apt-1.png', '/images/floorplan.png'],
  townhouse: ['/images/apt-1.png', '/images/apt-5.png', '/images/hero-complex.png', '/images/floorplan.png'],
};

export default function ProjectsPage() {
  const { currency, language, dictionary, openConsultModal } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const localizedProjects = initialProjects.map((p) => getLocalizedProject(p, language));

  const filteredProjects = localizedProjects.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.slug === selectedFilter;
  });

  return (
    <div className="projects-page-wrapper">
      {/* Header Banner */}
      <section className="catalog-header-section" style={{ padding: '48px 0 32px' }}>
        <div className="container">
          <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '24px' }}>
            <span className="section-top-label">{dictionary.projects.label}</span>
            <h1 className="section-h2" style={{ fontSize: '36px', marginBottom: '12px' }}>
              {dictionary.projects.title}
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '720px', margin: 0 }}>
              {dictionary.projects.subtitle}
            </p>
          </div>

          {/* Quick Project Filter Chips */}
          <div className="setl-filter-chips-row" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`filter-chip ${selectedFilter === 'all' ? 'active' : ''}`}
            >
              {dictionary.catalog.allProjects} ({localizedProjects.length})
            </button>
            {localizedProjects.map((proj) => (
              <button
                key={proj.slug}
                type="button"
                onClick={() => setSelectedFilter(proj.slug)}
                className={`filter-chip ${selectedFilter === proj.slug ? 'active' : ''}`}
              >
                {proj.name} ({proj.district})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase Cards Grid */}
      <section className="projects-section" style={{ paddingTop: '16px', paddingBottom: '64px' }}>
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((proj) => {
              const badgeClass =
                proj.slug === 'nork'
                  ? 'project-class-badge badge-business'
                  : proj.slug === 'townhouse'
                  ? 'project-class-badge badge-th'
                  : 'project-class-badge';

              return (
                <article key={proj.id} className="project-showcase-card reveal-on-scroll">
                  <div className="project-media-wrap">
                    <CardPhotoGallery
                      images={PROJECT_GALLERIES[proj.slug] || [proj.image]}
                      alt={proj.name}
                      aspectRatio="16/10"
                    >
                      <div className="project-media-overlay" />
                      <div className="project-media-top-badges">
                        <span className={badgeClass}>{proj.category}</span>
                        <span className="project-readiness-pill">
                          {dictionary.projects.readinessPrefix} {proj.readiness}
                        </span>
                      </div>
                      <div className="project-media-bottom-info">
                        <span className="project-time-tag">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>
                            {proj.timeToCenter} {dictionary.projects.timeToCenter}
                          </span>
                        </span>
                      </div>
                    </CardPhotoGallery>
                  </div>

                  <div className="project-body">
                    <span className="project-district-name">
                      {proj.name} • {proj.district}
                    </span>
                    <h2 className="project-title" style={{ fontSize: '22px', margin: '4px 0 10px' }}>
                      {proj.name}
                    </h2>
                    <p className="project-features-line">{proj.description}</p>
                    
                    <div className="project-status-row">
                      <span className="project-delivery-badge">
                        {dictionary.projects.deliveryPrefix} {proj.deliveryDate} • {proj.readiness}
                      </span>
                    </div>

                    <div className="project-footer-row">
                      <div className="project-price-block">
                        <span className="project-price-prefix">{dictionary.projects.fromPrice}</span>
                        <strong className="proj-price-dyn">{formatPrice(proj.priceFromAMD, currency)}</strong>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link href={`/projects/${proj.slug}`} className="btn btn-primary">
                          {dictionary.common.details}
                        </Link>
                        <Link href={`/apartments?project=${proj.id}`} className="btn btn-outline">
                          {dictionary.nav.apartments}
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Setl Trust & Map Location Banner */}
      <section className="container" style={{ paddingBottom: '64px' }}>
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {dictionary.brand.salesOfficeTitle}
            </span>
            <h3 style={{ fontSize: '24px', margin: '8px 0', fontFamily: 'var(--font-heading)' }}>
              {dictionary.consultModal.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
              {dictionary.consultModal.subtitle}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => openConsultModal()}
              className="btn btn-primary btn-lg"
            >
              {dictionary.consultModal.submitBtn}
            </button>
            <a
              href={`tel:${dictionary.brand.phone.replace(/\s+/g, '')}`}
              className="btn btn-outline btn-lg"
            >
              {dictionary.brand.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
