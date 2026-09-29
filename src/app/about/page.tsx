'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { getLocalizedProject } from '@/lib/catalogLocalization';
import { initialProjects } from '@/lib/initialCatalog';

export default function AboutPage() {
  const { dictionary, language, openConsultModal, projects } = useApp();

  const about = dictionary.engineering.about;
  const projectList = (projects && projects.length > 0 ? projects : initialProjects)
    .map((p) => getLocalizedProject(p, language));

  return (
    <div className="about-page-wrap" style={{ backgroundColor: 'var(--background)', minHeight: '80vh' }}>
      {/* 1. Hero & Company Identity Banner */}
      <section style={{ backgroundColor: '#0F382E', color: '#FFFFFF', padding: '48px 0 44px', borderBottom: '1px solid rgba(197, 162, 101, 0.25)' }}>
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ marginBottom: '16px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)' }}>
            <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
              {dictionary.nav.projects}
            </Link>
            <span style={{ margin: '0 8px', color: '#C5A265' }}>/</span>
            <span style={{ color: '#FFFFFF', fontWeight: 500 }}>
              {dictionary.nav.about}
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
              {about.badge}
            </span>
            <h1 style={{ fontSize: '34px', lineHeight: 1.2, fontWeight: 700, margin: '0 0 14px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              {about.title}
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.88)', margin: '0 0 10px' }}>
              {about.p1}
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.75)', margin: 0 }}>
              {about.p2}
            </p>
          </div>
        </div>
      </section>

      {/* 2. 4 Key Figures & Standards Cards */}
      <section style={{ padding: '48px 0', backgroundColor: 'var(--background-alt)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '28px 24px',
                border: '1px solid rgba(15, 56, 46, 0.1)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#0F382E', lineHeight: 1 }}>
                {about.stat1Num} <span style={{ fontSize: '20px', fontWeight: 600, color: '#C5A265' }}>{about.stat1Unit}</span>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '14px 0 6px', color: '#0F382E' }}>
                {about.stat1Title}
              </h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: '#5F6B76', margin: 0 }}>
                {about.stat1Desc}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '28px 24px',
                border: '1px solid rgba(15, 56, 46, 0.1)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#0F382E', lineHeight: 1 }}>
                {about.stat2Num} <span style={{ fontSize: '20px', fontWeight: 600, color: '#C5A265' }}>{about.stat2Unit}</span>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '14px 0 6px', color: '#0F382E' }}>
                {about.stat2Title}
              </h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: '#5F6B76', margin: 0 }}>
                {about.stat2Desc}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '28px 24px',
                border: '1px solid rgba(15, 56, 46, 0.1)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#0F382E', lineHeight: 1 }}>
                {about.stat3Num} <span style={{ fontSize: '20px', fontWeight: 600, color: '#C5A265' }}>{about.stat3Unit}</span>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '14px 0 6px', color: '#0F382E' }}>
                {about.stat3Title}
              </h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: '#5F6B76', margin: 0 }}>
                {about.stat3Desc}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '28px 24px',
                border: '1px solid rgba(15, 56, 46, 0.1)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#0F382E', lineHeight: 1 }}>
                {about.stat4Num} <span style={{ fontSize: '20px', fontWeight: 600, color: '#C5A265' }}>{about.stat4Unit}</span>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '14px 0 6px', color: '#0F382E' }}>
                {about.stat4Title}
              </h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: '#5F6B76', margin: 0 }}>
                {about.stat4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Developer Projects in Development */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '32px' }}>
            <span className="section-top-label">{dictionary.projects.label}</span>
            <h2 className="section-h2" style={{ fontSize: '30px', margin: '6px 0 10px' }}>
              {dictionary.projects.title}
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '800px', margin: 0 }}>
              {dictionary.projects.subtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '24px',
            }}
          >
            {projectList.map((proj) => (
              <div
                key={proj.id}
                style={{
                  backgroundColor: 'var(--card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
                  <img
                    src={proj.image}
                    alt={proj.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(15, 56, 46, 0.88)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {proj.category}
                  </div>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '12.5px', color: '#5F6B76', fontWeight: 600 }}>
                      {proj.district}
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F382E', margin: '4px 0 8px' }}>
                      {proj.name}
                    </h3>
                    <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#5F6B76', margin: '0 0 16px' }}>
                      {proj.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                    <Link href={`/projects/${proj.slug}`} className="btn btn-primary btn-sm" style={{ flex: 1, textDecoration: 'none' }}>
                      {dictionary.common.details}
                    </Link>
                    <Link href={`/apartments?project=${proj.id}`} className="btn btn-outline btn-sm" style={{ flex: 1, textDecoration: 'none' }}>
                      {dictionary.nav.apartments}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sales Office & Contacts Card */}
      <section className="container" style={{ paddingBottom: '72px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #0F382E 0%, #174E41 100%)',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: '40px 36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '28px',
            border: '1px solid rgba(197, 162, 101, 0.35)',
            boxShadow: '0 12px 32px rgba(15, 56, 46, 0.15)',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#F4E5B8',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {dictionary.brand.salesOfficeTitle}
            </span>
            <h3 style={{ fontSize: '26px', margin: '8px 0 12px', fontWeight: 700, color: '#FFFFFF' }}>
              {dictionary.consultModal.title}
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '14.5px', lineHeight: 1.6, margin: '0 0 16px' }}>
              {dictionary.brand.address} • {dictionary.footer.workingHours}
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
              {dictionary.consultModal.subtitle}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => openConsultModal()}
              className="btn btn-gold btn-lg"
              style={{ padding: '14px 28px', fontSize: '14px', whiteSpace: 'nowrap' }}
            >
              {dictionary.consultModal.submitBtn}
            </button>
            <a
              href={`tel:${dictionary.brand.phone.replace(/\s+/g, '')}`}
              className="btn btn-outline btn-lg"
              style={{ borderColor: 'rgba(255, 255, 255, 0.4)', color: '#FFFFFF', padding: '14px 24px', fontSize: '14px', textDecoration: 'none' }}
            >
              {dictionary.brand.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
