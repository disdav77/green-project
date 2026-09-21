'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export function PublicCertificates() {
  const { openConsultModal } = useApp();

  const escrowSteps = [
    {
      num: '01',
      title: 'Предварительный нотариальный договор',
      desc: 'Фиксация неизменной стоимости в драмах (֏), точного номера квартиры, этажа, площади и срока сдачи. Застройщик не имеет права изменять условия в одностороннем порядке.',
      badge: 'Юридическая фиксация',
    },
    {
      num: '02',
      title: 'Регистрация в Государственном кадастре РА',
      desc: 'Обязательная государственная регистрация права требования в Комитете кадастра недвижимости РА (e-cadastre.am), на 100% исключающая риск двойных продаж.',
      badge: 'Государственный учет',
    },
    {
      num: '03',
      title: 'Депонирование средств на счетах эскроу',
      desc: 'Ваши деньги замораживаются на персональном эскроу-счете в банке-партнере под защитой Центрального Банка РА. Застройщик строит за счет собственного банковского проектного финансирования.',
      badge: '0% финансового риска',
    },
    {
      num: '04',
      title: 'Ввод в эксплуатацию и вручение ключей',
      desc: 'Банк раскрывает эскроу-счет и переводит средства девелоперу только после подписания акта ввода здания мэрией г. Еревана и выдачи вам свидетельства о праве собственности.',
      badge: 'Гарантия сдачи дома',
    },
  ];

  const banks = [
    { name: 'Ameriabank', role: 'Генеральный эскроу-агент', rate: 'от 11.2%' },
    { name: 'Inecobank', role: 'Прямая интеграция со справками КГД РА', rate: 'от 11.5%' },
    { name: 'Ardshinbank', role: 'Программы семейной ипотеки с 10% взносом', rate: 'от 11.0%' },
    { name: 'ACBA Bank', role: 'Субсидированные IT-программы', rate: 'от 11.8%' },
    { name: 'Converse Bank', role: 'Дистанционное оформление для диаспоры', rate: 'от 11.9%' },
  ];

  return (
    <section className="escrow-section pre-footer-trust-section" id="escrow" style={{ padding: '54px 0 64px' }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '32px' }}>
          <span className="section-top-label" style={{ letterSpacing: '0.08em' }}>
            ГОСУДАРСТВЕННЫЙ ГРАДОСТРОИТЕЛЬНЫЙ РЕГЛАМЕНТ РА • ЗАКОН «О ГРАДОСТРОИТЕЛЬСТВЕ» № ЗР-104
          </span>
          <h2 className="section-h2" style={{ fontSize: '30px', margin: '6px 0 10px' }}>
            100% финансовая и правовая безопасность сделки
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '840px', margin: 0 }}>
            Покупка напрямую от аккредитованного девелопера Green Project. Деньги дольщиков хранятся на специальных целевых счетах эскроу до сдачи дома под контролем Центрального Банка Республики Армения.
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
                    Официальный статус
                  </span>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                    Институциональный девелопер РА
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1.3, marginBottom: '14px', color: '#FFFFFF' }}>
                Государственный сертификат и реестр гарантий Green Project
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: 1.55 }}>
                <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ color: '#C5A265', fontWeight: 700, display: 'block', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    Государственная лицензия
                  </span>
                  <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>
                    Лицензия застройщика КГД РА № 18492
                  </strong>
                  <div style={{ fontSize: '12px', opacity: 0.75, marginTop: '2px' }}>
                    Комитет по градостроительству Республики Армения
                  </div>
                </div>

                <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ color: '#C5A265', fontWeight: 700, display: 'block', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    Налоговый вычет по ипотеке
                  </span>
                  <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>
                    Ст. 156.1 Налогового кодекса РА
                  </strong>
                  <div style={{ fontSize: '12px', opacity: 0.75, marginTop: '2px' }}>
                    Прямая выгрузка реестров для возврата подоходного налога до 1 000 000 ֏ в месяц
                  </div>
                </div>

                <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ color: '#C5A265', fontWeight: 700, display: 'block', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    Строительный стандарт
                  </span>
                  <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>
                    СНиП РА II-6.02-2006 (Сейсмостойкость 9 баллов)
                  </strong>
                  <div style={{ fontSize: '12px', opacity: 0.75, marginTop: '2px' }}>
                    Цельнолитой монолит B25/B30 с независимым государственным технадзором
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
              <button
                type="button"
                onClick={() => openConsultModal()}
                className="btn btn-primary w-full"
                style={{
                  backgroundColor: '#C5A265',
                  color: '#11161B',
                  fontWeight: 800,
                  fontSize: '13px',
                  border: 'none',
                }}
              >
                Запросить юридический пакет документов
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
                  Регламент безопасной покупки
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  4 ступени защиты
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {escrowSteps.map((step) => (
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
              <span>Договоры согласованы правовыми департаментами 5 банков</span>
              <span style={{ fontWeight: 700, color: 'var(--primary)' }}>100% юридическая чистота</span>
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
              Консорциум банков-партнеров с открытыми эскроу-линиями:
            </span>
            <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              Ставки субсидируются по Ст. 156.1 НК РА
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {banks.map((bank) => (
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
