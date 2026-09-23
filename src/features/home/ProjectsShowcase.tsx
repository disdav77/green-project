'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { initialProjects } from '@/lib/initialCatalog';
import { getLocalizedProject } from '@/lib/catalogLocalization';
import { formatPrice } from '@/lib/currency';

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
              <article key={proj.id} className="project-showcase-card">
                <div className="project-media-wrap">
                  <img src={proj.image} alt={proj.name} loading="lazy" />
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
                </div>

                <div className="project-body">
                  <span className="project-district-name">
                    {proj.name} • {proj.district}
                  </span>
                  <h3 className="project-title">{proj.name}</h3>
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
                    <Link href={`/projects/${proj.slug}`} className="btn btn-primary">
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
