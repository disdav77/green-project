'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

type DisciplineKey = 'seismic' | 'acoustic' | 'energy' | 'engineering';

export function EngineeringSpecs() {
  const { dictionary, openConsultModal } = useApp();
  const [activeTab, setActiveTab] = useState<DisciplineKey>('seismic');

  const disciplines = dictionary.engineering.disciplines;
  const activeData = disciplines[activeTab];
  const matrix = dictionary.engineering.matrix;
  const about = dictionary.engineering.about;

  return (
    <>
      {/* 1. Interactive Architectural Dossier & Engineering Regulations */}
      <section id="advantages" className="engineering-section">
        <div className="container">
          {/* Section Heading */}
          <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '8px' }}>
            <span className="section-top-label" style={{ letterSpacing: '0.08em' }}>
              {dictionary.engineering.topLabel}
            </span>
            <h2 className="section-h2" style={{ fontSize: '30px', margin: '6px 0 10px' }}>
              {dictionary.engineering.sectionTitle}
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '840px', margin: 0 }}>
              {dictionary.engineering.sectionSubtitle}
            </p>
          </div>

          {/* Interactive Discipline Tabs Navigation */}
          <div className="eng-tabs-nav" role="tablist" aria-label="Engineering Disciplines">
            {(Object.keys(disciplines) as DisciplineKey[]).map((key) => {
              const item = disciplines[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`eng-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {key === 'seismic' && (
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    )}
                    {key === 'acoustic' && (
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm7 9a7 7 0 0 1-14 0M12 19v3m-4 0h8" />
                    )}
                    {key === 'energy' && (
                      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
                    )}
                    {key === 'engineering' && (
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2M9 17h6" />
                    )}
                  </svg>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Discipline Blueprint Dossier Grid */}
          <div className="eng-dossier-grid">
            {/* Left Card: Architectural Blueprint */}
            <div className="eng-blueprint-card">
              <div>
                <div className="eng-blueprint-header">
                  <div>
                    <span className="eng-badge-pill">{activeData.badge}</span>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '8px 0 4px', color: '#12161A' }}>
                      {activeData.title}
                    </h3>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#C5A265' }}>
                      {activeData.standard}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '14.5px', lineHeight: '1.6', color: '#5F6B76', marginBottom: '20px' }}>
                  {activeData.desc}
                </p>

                {/* 4 Technical Metrics Boxes */}
                <div className="eng-specs-metrics">
                  {activeData.metrics.map((m, idx) => (
                    <div key={idx} className="eng-metric-box">
                      <div className="eng-metric-label">{m.label}</div>
                      <div className="eng-metric-value">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Layered Anatomy Checklist */}
                <div>
                  <h4 className="eng-anatomy-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#183B2B" strokeWidth="2">
                      <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span>{activeData.layersTitle}</span>
                  </h4>
                  <div className="eng-layers-list">
                    {activeData.layers.map((layer, idx) => (
                      <div key={idx} className="eng-layer-row">
                        <span className="eng-layer-idx">{idx + 1}</span>
                        <span>{layer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #E2E6E9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12.5px', color: '#5F6B76' }}>
                  {dictionary.engineering.standardsNote}
                </span>
                <button
                  type="button"
                  onClick={() => openConsultModal(activeData.title)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#183B2B',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {dictionary.engineering.requestBlueprintBtn}
                </button>
              </div>
            </div>

            {/* Right Card: Technical Inspector & Verification Card */}
            <div className="eng-inspector-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ADE80' }}></span>
                  <span style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C5A265', fontWeight: 700 }}>
                    GREEN QUALITY
                  </span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 6px' }}>
                  {activeData.inspectorTitle}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#94A3B8', margin: 0 }}>
                  {activeData.inspectorSubtitle}
                </p>

                <div className="eng-checklist">
                  {activeData.checks.map((chk, idx) => (
                    <div key={idx} className="eng-check-item">
                      <span className="eng-check-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A265" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span style={{ fontSize: '12.5px', color: '#E2E8F0', fontWeight: 600 }}>
                    {activeData.certLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Specifications Comparative Matrix */}
          <div className="eng-matrix-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#12161A', margin: '0 0 4px' }}>
                  {matrix.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#5F6B76', margin: 0 }}>
                  {matrix.subtitle}
                </p>
              </div>
              <span className="eng-badge-pill">
                {matrix.badge}
              </span>
            </div>

            <table className="eng-matrix-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>{matrix.colParam}</th>
                  <th style={{ width: '26%' }}>{matrix.colStandard}</th>
                  <th style={{ width: '28%' }}>{matrix.colGreenProject}</th>
                  <th style={{ width: '24%' }}>{matrix.colResult}</th>
                </tr>
              </thead>
              <tbody>
                {matrix.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700, color: '#12161A' }}>{row.feature}</td>
                    <td>
                      <span className="eng-pill-muted">{row.standard}</span>
                    </td>
                    <td>
                      <span className="eng-pill-green">{row.greenProject}</span>
                    </td>
                    <td style={{ color: '#47515A' }}>{row.advantage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. Official Certified CTA Banner */}
          <div className="eng-passport-cta">
            <div>
              <span style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C5A265', fontWeight: 700 }}>
                {dictionary.engineering.passportCta.topBadge}
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', margin: '6px 0 8px' }}>
                {dictionary.engineering.passportCta.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#CBD5E1', maxWidth: '640px', margin: 0, lineHeight: 1.6 }}>
                {dictionary.engineering.passportCta.desc}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-gold"
                onClick={() => openConsultModal(dictionary.engineering.passportCta.title)}
                style={{ padding: '14px 24px', fontSize: '14px', whiteSpace: 'nowrap' }}
              >
                {dictionary.engineering.passportCta.btnText}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bento Metrics Banner */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-card-banner">
            <div>
              <span className="about-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{about.badge}</span>
              </span>
              <h2 className="about-title">{about.title}</h2>
              <p className="about-p">{about.p1}</p>
              <p className="about-p">{about.p2}</p>
            </div>

            <div className="about-engineering-showcase">
              <div className="eng-stat-item">
                <div className="eng-stat-num">
                  {about.stat1Num} <span className="eng-unit">{about.stat1Unit}</span>
                </div>
                <div className="eng-stat-title">{about.stat1Title}</div>
                <p className="eng-stat-desc">{about.stat1Desc}</p>
              </div>
              <div className="eng-stat-item">
                <div className="eng-stat-num">
                  {about.stat2Num} <span className="eng-unit">{about.stat2Unit}</span>
                </div>
                <div className="eng-stat-title">{about.stat2Title}</div>
                <p className="eng-stat-desc">{about.stat2Desc}</p>
              </div>
              <div className="eng-stat-item">
                <div className="eng-stat-num">
                  {about.stat3Num} <span className="eng-unit">{about.stat3Unit}</span>
                </div>
                <div className="eng-stat-title">{about.stat3Title}</div>
                <p className="eng-stat-desc">{about.stat3Desc}</p>
              </div>
              <div className="eng-stat-item">
                <div className="eng-stat-num">
                  {about.stat4Num} <span className="eng-unit">{about.stat4Unit}</span>
                </div>
                <div className="eng-stat-title">{about.stat4Title}</div>
                <p className="eng-stat-desc">{about.stat4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
