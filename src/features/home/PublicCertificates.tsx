'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export function PublicCertificates() {
  const { dictionary, openConsultModal } = useApp();
  const escrow = dictionary.escrow;

  return (
    <section className="escrow-section pre-footer-trust-section" id="escrow" style={{ padding: '54px 0 64px' }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '32px' }}>
          <span className="section-top-label" style={{ letterSpacing: '0.08em' }}>
            {escrow.topLabel}
          </span>
          <h2 className="section-h2" style={{ fontSize: '30px', margin: '6px 0 10px' }}>
            {escrow.sectionTitle}
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '840px', margin: 0 }}>
            {escrow.sectionSubtitle}
          </p>
        </div>

        {/* 2-Column Institutional Trust Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {/* Column 1: Institutional Developer Passport Card */}
          <div
            style={{
              backgroundColor: '#183B2B',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(24, 59, 43, 0.25)',
              border: '1px solid rgba(197, 162, 101, 0.35)',
            }}
          >
            {/* Background Watermark Crest */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                opacity: 0.06,
                pointerEvents: 'none',
              }}
            >
              <svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(197, 162, 101, 0.2)',
                    border: '1px solid rgba(197, 162, 101, 0.5)',
                    color: '#C5A265',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C5A265', fontWeight: 700 }}>
                    {escrow.passport.officialStatus}
                  </span>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                    {escrow.passport.developerStatus}
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1.3, marginBottom: '14px', color: '#FFFFFF' }}>
                {escrow.passport.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: 1.55 }}>
                <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ color: '#C5A265', fontWeight: 700, display: 'block', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    {escrow.passport.licenseLabel}
                  </span>
                  <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>
                    {escrow.passport.licenseNumber}
                  </strong>
                </div>

                <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ color: '#C5A265', fontWeight: 700, display: 'block', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    {escrow.passport.lawLabel}
                  </span>
                  <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>
                    {escrow.passport.lawTitle}
                  </strong>
                </div>

                <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ color: '#C5A265', fontWeight: 700, display: 'block', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    {escrow.passport.certLabel}
                  </span>
                  <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>
                    {escrow.passport.certTitle}
                  </strong>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
              <button
                type="button"
                onClick={() => openConsultModal(escrow.passport.title)}
                className="btn btn-primary w-full"
                style={{
                  backgroundColor: '#C5A265',
                  color: '#11161B',
                  fontWeight: 800,
                  fontSize: '13px',
                  border: 'none',
                }}
              >
                {escrow.passport.downloadReportBtn}
              </button>
            </div>
          </div>

          {/* Column 2: 4-Step Escrow Security Architecture */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '32px 28px',
              border: '1px solid var(--border)',
              boxShadow: '0 4px 20px rgba(17, 22, 27, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary)' }}>
                  {escrow.stepsTitle}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  4 {dictionary.common.details}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {escrow.steps.map((step) => (
                  <div
                    key={step.num}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start',
                      paddingBottom: '14px',
                      borderBottom: '1px solid #F0F2F4',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '15px',
                        fontWeight: 900,
                        color: 'var(--primary)',
                        backgroundColor: '#F1F8F3',
                        border: '1px solid #D1EAD8',
                        borderRadius: '8px',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {step.num}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                        <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                          {step.title}
                        </h4>
                        <span
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 700,
                            color: '#183B2B',
                            backgroundColor: '#EBF5EE',
                            padding: '2px 8px',
                            borderRadius: '4px',
                          }}
                        >
                          {step.badge}
                        </span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '4px 0 0', lineHeight: 1.5 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: '#FAFBFB',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: 'var(--text-secondary)',
              }}
            >
              <span>{escrow.legalNotice}</span>
              <span style={{ fontWeight: 700, color: 'var(--primary)' }}>100% {dictionary.escrow.passport.officialStatus}</span>
            </div>
          </div>
        </div>

        {/* Accredited Banking Consortium Bar */}
        <div
          style={{
            marginTop: '24px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '20px 24px',
            boxShadow: '0 2px 10px rgba(17, 22, 27, 0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)' }}>
              {escrow.consortiumTitle}
            </span>
            <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              {escrow.consortiumSubtitle}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {escrow.banks.map((bank) => (
              <div
                key={bank.name}
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#F8FAF9',
                  border: '1px solid #E5EBE7',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--text-primary)' }}>{bank.name}</strong>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)' }}>{bank.rate}</span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                  {bank.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
