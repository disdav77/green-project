'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { EngineeringSpecs } from '@/features/home/EngineeringSpecs';

export default function StandardsPage() {
  const { dictionary } = useApp();

  return (
    <div className="standards-page-wrap" style={{ backgroundColor: 'var(--background)', minHeight: '80vh' }}>
      {/* Architectural Passport Top Banner */}
      <section style={{ backgroundColor: '#0F382E', color: '#FFFFFF', padding: '40px 0 36px', borderBottom: '1px solid rgba(197, 162, 101, 0.25)' }}>
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ marginBottom: '16px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)' }}>
            <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
              {dictionary.nav.projects}
            </Link>
            <span style={{ margin: '0 8px', color: '#C5A265' }}>/</span>
            <span style={{ color: '#FFFFFF', fontWeight: 500 }}>
              {dictionary.engineering.topLabel}
            </span>
          </nav>

          <div style={{ maxWidth: '860px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: 'rgba(197, 162, 101, 0.2)',
                color: '#F4E5B8',
                border: '1px solid rgba(197, 162, 101, 0.4)',
                marginBottom: '12px',
                letterSpacing: '0.04em',
              }}
            >
              {dictionary.engineering.standardsNote}
            </span>
            <h1 style={{ fontSize: '32px', lineHeight: 1.2, fontWeight: 700, margin: '0 0 12px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              {dictionary.engineering.sectionTitle}
            </h1>
            <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
              {dictionary.engineering.sectionSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Specs & Architectural Dossier */}
      <EngineeringSpecs />
    </div>
  );
}
