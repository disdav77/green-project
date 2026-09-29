'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { getLocalizedProject } from '@/lib/catalogLocalization';
import { initialProjects } from '@/lib/initialCatalog';

export default function AboutPage() {
  const { dictionary, language, openConsultModal, projects } = useApp();
  const page = dictionary.aboutPage;
  const projectList = (projects && projects.length > 0 ? projects : initialProjects)
    .map((p) => getLocalizedProject(p, language));

  return (
    <div className="about-page-wrap" style={{ backgroundColor: 'var(--background)', minHeight: '80vh' }}>
      {/* 1. Hero & Company Identity Banner */}
      <section style={{ backgroundColor: '#0F382E', color: '#FFFFFF', padding: '56px 0 50px', borderBottom: '1px solid rgba(197, 162, 101, 0.25)' }}>
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

          <div style={{ maxWidth: '920px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                backgroundColor: 'rgba(197, 162, 101, 0.2)',
                color: '#F4E5B8',
                border: '1px solid rgba(197, 162, 101, 0.45)',
                marginBottom: '16px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {page.topBadge}
            </span>
            <h1 style={{ fontSize: '38px', lineHeight: 1.18, fontWeight: 700, margin: '0 0 16px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              {page.heroTitle}
            </h1>
            <p style={{ fontSize: '16.5px', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.90)', margin: '0 0 28px' }}>
              {page.heroSubtitle}
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/projects" className="btn btn-gold btn-lg" style={{ textDecoration: 'none', padding: '14px 28px' }}>
                {dictionary.hero.exploreProjects}
              </Link>
              <button
                type="button"
                onClick={() => openConsultModal()}
                className="btn btn-outline btn-lg"
                style={{ borderColor: 'rgba(255, 255, 255, 0.45)', color: '#FFFFFF', padding: '14px 26px' }}
              >
                {dictionary.nav.requestCall}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Strategic Scale */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {/* Left: Credential Highlight Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid rgba(15, 56, 46, 0.12)',
                padding: '36px 32px',
                boxShadow: '0 8px 24px rgba(15, 56, 46, 0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(33, 145, 78, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#21914E" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#C5A265', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    GREEN PROJECT
                  </span>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#0F382E' }}>
                    {page.sinceYear}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '28px', fontWeight: 800, color: '#0F382E', lineHeight: 1.2, marginBottom: '12px' }}>
                {page.sinceTagline}
              </div>

              <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#5F6B76', margin: '0 0 24px' }}>
                {page.licenseSubtitle}
              </p>

              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'var(--background-alt)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F382E', marginBottom: '4px' }}>
                  {page.licenseTitle}
                </div>
                <div style={{ fontSize: '12.5px', color: '#5F6B76' }}>
                  Республика Армения • Полный допуск к высотному монолитному строительству
                </div>
              </div>
            </div>

            {/* Right: Narrative Story */}
            <div>
              <span className="section-top-label" style={{ letterSpacing: '0.08em' }}>
                {dictionary.brand.name}
              </span>
              <h2 className="section-h2" style={{ fontSize: '30px', margin: '8px 0 16px' }}>
                {page.missionTitle}
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.68, color: '#44515B', margin: '0 0 16px' }}>
                {page.missionP1}
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.68, color: '#5F6B76', margin: '0 0 24px' }}>
                {page.missionP2}
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 600, color: '#0F382E' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#21914E" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Монолит B25/B30</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 600, color: '#0F382E' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#21914E" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Сейсмика 9.0 баллов</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 600, color: '#0F382E' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#21914E" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>100% Эскроу</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 Core Divisions (Девелопмент, Проектирование, Строительство, Дизайн) */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--background-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '36px' }}>
            <span className="section-top-label">{page.directionsBadge}</span>
            <h2 className="section-h2" style={{ fontSize: '30px', margin: '6px 0 10px' }}>
              {page.directionsTitle}
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '820px', margin: 0 }}>
              {page.directionsSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '24px',
            }}
          >
            {/* Division 1: Development */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '32px 26px',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(15, 56, 46, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F382E" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="9" y1="22" x2="9" y2="2" />
                    <line x1="15" y1="22" x2="15" y2="2" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#0F382E', margin: '0 0 10px' }}>
                  {page.directionDevTitle}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#5F6B76', margin: 0 }}>
                  {page.directionDevDesc}
                </p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <Link href="/projects" style={{ fontSize: '13.5px', fontWeight: 700, color: '#21914E', textDecoration: 'none' }}>
                  {dictionary.hero.exploreProjects} →
                </Link>
              </div>
            </div>

            {/* Division 2: Master Planning & Engineering */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '32px 26px',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(197, 162, 101, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8C6D37" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#0F382E', margin: '0 0 10px' }}>
                  {page.directionDesignTitle}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#5F6B76', margin: 0 }}>
                  {page.directionDesignDesc}
                </p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <Link href="/standards" style={{ fontSize: '13.5px', fontWeight: 700, color: '#21914E', textDecoration: 'none' }}>
                  {dictionary.nav.standards} →
                </Link>
              </div>
            </div>

            {/* Division 3: Monolithic Construction */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '32px 26px',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(33, 145, 78, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#21914E" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#0F382E', margin: '0 0 10px' }}>
                  {page.directionBuildTitle}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#5F6B76', margin: 0 }}>
                  {page.directionBuildDesc}
                </p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F382E' }}>
                  СНиП РА 9.0 баллов
                </span>
              </div>
            </div>

            {/* Division 4: Architectural & Interior Design */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '32px 26px',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(15, 56, 46, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F382E" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
                    <line x1="9.69" y1="8" x2="21.17" y2="8" />
                    <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
                    <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
                    <line x1="14.31" y1="16" x2="2.83" y2="16" />
                    <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#0F382E', margin: '0 0 10px' }}>
                  {page.directionInteriorTitle}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#5F6B76', margin: 0 }}>
                  {page.directionInteriorDesc}
                </p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <Link href="/apartments" style={{ fontSize: '13.5px', fontWeight: 700, color: '#21914E', textDecoration: 'none' }}>
                  {dictionary.nav.catalog} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Homebuyers Trust Green Project (4 Values) */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '36px' }}>
            <span className="section-top-label">{page.valuesBadge}</span>
            <h2 className="section-h2" style={{ fontSize: '30px', margin: '6px 0 10px' }}>
              {page.valuesTitle}
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '820px', margin: 0 }}>
              {page.valuesSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '20px',
            }}
          >
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '26px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#0F382E', marginBottom: '10px' }}>9.0</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F382E', margin: '0 0 8px' }}>{page.value1Title}</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#5F6B76', margin: 0 }}>{page.value1Desc}</p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '26px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#21914E', marginBottom: '10px' }}>100%</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F382E', margin: '0 0 8px' }}>{page.value2Title}</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#5F6B76', margin: 0 }}>{page.value2Desc}</p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '26px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#0F382E', marginBottom: '10px' }}>ECO</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F382E', margin: '0 0 8px' }}>{page.value3Title}</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#5F6B76', margin: 0 }}>{page.value3Desc}</p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '26px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#C5A265', marginBottom: '10px' }}>156.1</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F382E', margin: '0 0 8px' }}>{page.value4Title}</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#5F6B76', margin: 0 }}>{page.value4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Flagship Projects Showcase */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--background-alt)', borderTop: '1px solid var(--border)' }}>
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

      {/* 6. Media & Construction Video Monitoring */}
      <section style={{ padding: '56px 0', backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              padding: '36px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ maxWidth: '680px' }}>
              <span className="section-top-label" style={{ letterSpacing: '0.08em' }}>
                {page.mediaBadge}
              </span>
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#0F382E', margin: '8px 0 10px' }}>
                {page.mediaTitle}
              </h3>
              <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#5F6B76', margin: 0 }}>
                {page.mediaDesc}
              </p>
            </div>
            <div>
              <a
                href="https://www.youtube.com/@GreenProjectArm/shorts"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>{page.mediaBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Corporate Headquarters & Sales Office */}
      <section className="container" style={{ paddingBottom: '72px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #0F382E 0%, #174E41 100%)',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: '44px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '32px',
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
              {page.salesOfficeTitle}
            </span>
            <h3 style={{ fontSize: '28px', margin: '8px 0 14px', fontWeight: 700, color: '#FFFFFF' }}>
              {dictionary.consultModal.title}
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.90)', fontSize: '15px', lineHeight: 1.6, margin: '0 0 8px' }}>
              {page.salesOfficeAddress} • {dictionary.footer.workingHours}
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '13.5px', lineHeight: 1.5, margin: '0 0 14px' }}>
              <strong>{page.legalHeadOfficeTitle}:</strong> {page.legalHeadOfficeAddress}
            </p>
            <p style={{ color: '#F4E5B8', fontSize: '13.5px', fontWeight: 600, margin: 0 }}>
              sales@greenprojectarm.com • greendev.yvn@gmail.com
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
              href="tel:+37494664522"
              className="btn btn-outline btn-lg"
              style={{ borderColor: 'rgba(255, 255, 255, 0.45)', color: '#FFFFFF', padding: '14px 24px', fontSize: '14px', textDecoration: 'none' }}
            >
              +374 94 664522
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
