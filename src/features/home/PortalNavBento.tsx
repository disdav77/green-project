'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export function PortalNavBento() {
  const { dictionary } = useApp();
  const bento = dictionary.bento;

  const cards = [
    {
      href: '/standards',
      data: bento.cardStandards,
      bg: 'linear-gradient(135deg, #0F382E 0%, #174E41 100%)',
      textColor: '#FFFFFF',
      badgeBg: 'rgba(197, 162, 101, 0.25)',
      badgeColor: '#F4E5B8',
      borderColor: 'rgba(197, 162, 101, 0.35)',
      metricColor: '#F4E5B8',
      subtextColor: 'rgba(255, 255, 255, 0.90)',
      arrowColor: '#F4E5B8',
    },
    {
      href: '/mortgage',
      data: bento.cardMortgage,
      bg: '#FFFFFF',
      textColor: '#0F382E',
      badgeBg: '#F4F1EA',
      badgeColor: '#8C6D37',
      borderColor: 'rgba(15, 56, 46, 0.12)',
      metricColor: '#21914E',
      subtextColor: '#5A6E65',
      arrowColor: '#21914E',
    },
    {
      href: '/mortgage#escrow',
      data: bento.cardEscrow,
      bg: '#FFFFFF',
      textColor: '#0F382E',
      badgeBg: '#F4F1EA',
      badgeColor: '#8C6D37',
      borderColor: 'rgba(15, 56, 46, 0.12)',
      metricColor: '#0F382E',
      subtextColor: '#5A6E65',
      arrowColor: '#21914E',
    },
    {
      href: '/apartments',
      data: bento.cardApartments,
      bg: 'linear-gradient(135deg, #183B2B 0%, #0F382E 100%)',
      textColor: '#FFFFFF',
      badgeBg: 'rgba(33, 145, 78, 0.3)',
      badgeColor: '#DCF7E1',
      borderColor: 'rgba(33, 145, 78, 0.4)',
      metricColor: '#DCF7E1',
      subtextColor: 'rgba(255, 255, 255, 0.90)',
      arrowColor: '#DCF7E1',
    },
  ];

  return (
    <section className="portal-bento-section" style={{ padding: '60px 0 72px', backgroundColor: 'var(--background-alt)' }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '28px' }}>
          <span className="section-top-label" style={{ letterSpacing: '0.08em' }}>
            {bento.badge}
          </span>
          <h2 className="section-h2" style={{ fontSize: '30px', margin: '6px 0 10px' }}>
            {bento.title}
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '820px', margin: 0 }}>
            {bento.subtitle}
          </p>
        </div>

        {/* 2x2 Bento Cards Grid */}
        <div
          className="portal-bento-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
            alignItems: 'stretch',
          }}
        >
          {cards.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className="bento-interactive-card"
              style={{
                background: card.bg,
                color: card.textColor,
                borderRadius: '16px',
                padding: '30px 28px',
                border: `1px solid ${card.borderColor}`,
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      backgroundColor: card.badgeBg,
                      color: card.badgeColor,
                    }}
                  >
                    {card.data.badge}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '26px', fontWeight: 800, lineHeight: 1, color: card.metricColor }}>
                      {card.data.metric}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '11px',
                        fontWeight: 600,
                        opacity: 0.85,
                        marginTop: '2px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: card.subtextColor,
                      }}
                    >
                      {card.data.metricLabel}
                    </span>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    lineHeight: 1.3,
                    margin: '0 0 10px',
                    letterSpacing: '-0.01em',
                    color: card.textColor,
                  }}
                >
                  {card.data.title}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.55,
                    color: card.subtextColor,
                    margin: 0,
                  }}
                >
                  {card.data.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '16px',
                  borderTop: `1px solid ${card.borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: card.arrowColor,
                }}
              >
                <span>{card.data.linkText}</span>
                <span style={{ fontSize: '18px', transition: 'transform 0.2s ease' }} className="bento-arrow">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
