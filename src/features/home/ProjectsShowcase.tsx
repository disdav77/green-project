'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { initialProjects } from '@/lib/initialCatalog';
import { getLocalizedProject } from '@/lib/catalogLocalization';
import { formatPrice } from '@/lib/currency';
import { CardPhotoGallery } from '@/components/ui/CardPhotoGallery';

const PROJECT_GALLERIES: Record<string, string[]> = {
  avan: [
    '/images/projects/avan_facade.jpg',
    '/images/projects/avan_perspective.jpg',
    '/images/projects/avan_ground.jpg',
    '/images/projects/apartment_interior.jpg',
    '/images/projects/avan_street.jpg',
    '/images/floorplan.png',
  ],
  nork: [
    '/images/projects/hero_exterior_1.jpg',
    '/images/projects/avan_perspective.jpg',
    '/images/projects/apartment_interior.jpg',
    '/images/projects/avan_street.jpg',
    '/images/floorplan.png',
  ],
  townhouse: [
    '/images/projects/hero_exterior_2.jpg',
    '/images/projects/avan_ground.jpg',
    '/images/projects/apartment_interior.jpg',
    '/images/hero-complex.png',
    '/images/floorplan.png',
  ],
};

export function ProjectsShowcase() {
  const { currency, language, dictionary } = useApp();
  const localizedProjects = initialProjects.map((p) => getLocalizedProject(p, language));

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-top-label">{dictionary.projects.label}</span>
          <h2 className="section-h2">{dictionary.projects.title}</h2>
          <p className="section-subtitle">{dictionary.projects.subtitle}</p>
        </div>

        <div className="projects-grid">
          {localizedProjects.map((proj) => {
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
                    aspectRatio="16/9.5"
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
                  <h3 className="project-title" style={{ fontSize: '20px', margin: '2px 0 8px' }}>
                    {proj.name}
                  </h3>
                  <p
                    className="project-features-line"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: '12px',
                      lineHeight: 1.45,
                    }}
                  >
                    {proj.description}
                  </p>
                  <div className="project-status-row" style={{ marginBottom: '12px' }}>
                    <span className="project-delivery-badge">
                      {dictionary.projects.deliveryPrefix} {proj.deliveryDate} • {proj.readiness}
                    </span>
                  </div>
                  <div className="project-footer-row" style={{ paddingTop: '12px' }}>
                    <div className="project-price-block">
                      <span className="project-price-prefix">{dictionary.projects.fromPrice}</span>
                      <strong className="proj-price-dyn">{formatPrice(proj.priceFromAMD, currency)}</strong>
                    </div>
                    <Link href={`/projects/${proj.slug}`} className="btn btn-primary btn-sm">
                      {dictionary.projects.chooseApartment}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
