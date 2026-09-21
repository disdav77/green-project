'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

type DisciplineKey = 'seismic' | 'acoustic' | 'energy' | 'engineering';

interface DisciplineData {
  id: DisciplineKey;
  label: string;
  badge: string;
  title: string;
  standard: string;
  desc: string;
  metrics: { label: string; value: string }[];
  layersTitle: string;
  layers: string[];
  inspectorTitle: string;
  inspectorSubtitle: string;
  checks: string[];
  certificateLabel: string;
}

const DISCIPLINES: Record<DisciplineKey, DisciplineData> = {
  seismic: {
    id: 'seismic',
    label: 'Сейсмика 9 баллов',
    badge: 'СНиП РА II-6.02-2006',
    title: 'Монолитный железобетонный каркас повышенной надежности',
    standard: 'Расчетная сейсмостойкость: 9 баллов (Шкала MSK-64)',
    desc: 'Пространственный рамно-связевой каркас с диафрагмами и ядрами жесткости. Возводится с запасом прочности +35% относительно типовых требований для сейсмоактивных зон Закавказья.',
    metrics: [
      { label: 'Марка бетона', value: 'B25 / B30 (W6, F150)' },
      { label: 'Класс арматуры', value: 'A500C (Горячекатаная)' },
      { label: 'Толщина фундамента', value: '1200 мм (Монолитная плита)' },
      { label: 'Расчетный ресурс', value: '100+ лет без капремонта' },
    ],
    layersTitle: 'Конструктивная схема фундамента и перекрытий',
    layers: [
      'Скальное монолитное основание с песчано-щебеночной демпферной подушкой 300 мм',
      'Бесшовная двухслойная гидроизоляционная мембрана с ультразвуковой проверкой швов',
      'Непрерывная армированная фундаментная плита 1200 мм с гидрофобными добавками W6',
      'Монолитные пилоны и безригельные перекрытия 200 мм с деформационными поясами',
    ],
    inspectorTitle: 'Протокол технического надзора',
    inspectorSubtitle: 'Лабораторные испытания на каждой захватке бетонирования',
    checks: [
      'Ультразвуковой неразрушающий контроль прочности бетона на 7-е и 28-е сутки',
      'Рентгенографическая проверка 100% сварных и муфтовых соединений арматуры',
      'Геодезический мониторинг вертикальности пилонов лазерными тахеометрами Leica',
      'Официальное заключение Национального института стандартов Республики Армения',
    ],
    certificateLabel: 'Сертификат сейсмостойкости СНиП РА выдан и зарегистрирован',
  },
  acoustic: {
    id: 'acoustic',
    label: 'Акустика 55 дБ',
    badge: 'Европейский норматив DIN 4109',
    title: 'Бескомпромиссная звукоизоляция и акустический комфорт',
    standard: 'Индекс звукоизоляции ограждающих стен: Rw = 55 дБ',
    desc: 'Многослойный акустический пирог межквартирных стен и пола полностью гасит воздушные (голоса, музыка) и ударные (шаги, перемещение мебели) шумы.',
    metrics: [
      { label: 'Межквартирные стены', value: '200 мм + Акустическая мембрана' },
      { label: 'Индекс шумопоглощения', value: '55 дБ (Абсолютная тишина)' },
      { label: 'Плавающая стяжка', value: 'SoundGuard мат 20 мм' },
      { label: 'Канализационные стояки', value: 'Трубы Ostendorf Skolan Safe' },
    ],
    layersTitle: 'Многослойная структура межквартирной перегородки',
    layers: [
      'Автоклавный газобетонный акустический блок повышенной плотности D600 толщиной 200 мм',
      'Звукопоглощающий слой минеральной базальтовой ваты 50 мм в виброразвязанном каркасе',
      'Вязкоэластичная звукоизоляционная мембрана для гашения резонансных низких частот',
      'Демпферная уплотнительная лента по периметру примыкания к монолитному перекрытию',
    ],
    inspectorTitle: 'Акустический аудит помещений',
    inspectorSubtitle: 'Контрольные замеры поверенными шумомерами 1-го класса точности',
    checks: [
      'Лабораторное измерение приведенного уровня ударного шума под перекрытием (Lnw <= 52 дБ)',
      'Виброакустическая развязка стяжки пола от стен через кромочный демпфер',
      'Бесшумные чугунные и полипропиленовые фасонные части водоотведения с утолщенной стенкой',
      'Тяжелые стальные входные двери с 3 контурами трубчатых уплотнителей и магнитным замком',
    ],
    certificateLabel: 'Протокол акустической экспертизы подтверждает показатель 55 дБ',
  },
  energy: {
    id: 'energy',
    label: 'Энергоэффективность А+',
    badge: 'Класс А+ (Снижение затрат на 40%)',
    title: 'Вентилируемый фасад и мультифункциональное остекление',
    standard: 'Коэффициент сопротивления теплопередаче: R > 3.6 м²·°C/Вт',
    desc: 'Облицовка натуральным армянским травертином и базальтом в сочетании с негорючим базальтовым утеплителем Rockwool и стеклопакетами с аргоновым заполнением.',
    metrics: [
      { label: 'Материал фасада', value: 'Натуральный травертин и базальт' },
      { label: 'Базальтовый утеплитель', value: 'Rockwool 100 мм (НГ негорючий)' },
      { label: 'Профиль остекления', value: 'Премиум 76 мм (Schuco / Alumil)' },
      { label: 'Энергонапыление', value: 'Solar Control + Газ Аргон 90%' },
    ],
    layersTitle: 'Анатомия навесного вентилируемого фасада',
    layers: [
      'Несущая железобетонная стена с заполнением энергоэффективными теплыми блоками',
      'Двухслойная теплоизоляция из минераловатных плит Rockwool 100 мм плотностью 110 кг/м³',
      'Паропроницаемая гидроветрозащитная негорючая мембрана Tyvek Supro',
      'Вентилируемый воздушный зазор 40 мм для постоянного отвода влаги и конденсата',
      'Подсистема из коррозионностойкой стали и плиты натурального травертина и базальта',
    ],
    inspectorTitle: 'Тепловизионный аудит ограждающих конструкций',
    inspectorSubtitle: 'Инструментальный контроль теплопотерь в зимний и летний сезоны',
    checks: [
      'Сплошное сканирование тепловизором Fluke: 100% отсутствие температурных мостов',
      'Мультифункциональные двухкамерные стеклопакеты с отражением до 68% солнечного тепла летом',
      'Автоматические термостатические клапаны Danfoss на радиаторах отопления в каждой комнате',
      'Экономия до 40% на оплате отопления зимой и кондиционирования летом',
    ],
    certificateLabel: 'Энергетический паспорт здания высшей категории энергоэффективности А+',
  },
  engineering: {
    id: 'engineering',
    label: 'Лифты и Smart-паркинг',
    badge: 'OTIS Gen2 & EV 22 кВт',
    title: 'Интеллектуальная инженерия, скоростной транспорт и паркинг',
    standard: 'Лифты со скоростью 1.6 м/с и аварийной системой безопасной эвакуации ARD',
    desc: 'Современные инженерные коммуникации: скоростные лифты с прямым спуском в теплый паркинг, зарядные станции для электрокаров и многоступенчатая водоочистка.',
    metrics: [
      { label: 'Лифтовое оборудование', value: 'OTIS Gen2 (Безредукторные приводы)' },
      { label: 'Скорость подъема', value: '1.6 м/с с плавным разгоном' },
      { label: 'Отапливаемый паркинг', value: 'Прямой доступ на лифте' },
      { label: 'EV-зарядки', value: 'Станции мощностью до 22 кВт' },
    ],
    layersTitle: 'Комплекс жизнеобеспечения и безопасности дома',
    layers: [
      'Два независимых кабельных ввода электроснабжения 1-й категории с автоматическим АВР',
      'Резервный дизель-генератор для гарантированной работы лифтов, насосов и освещения',
      'Автоматическая спринклерная система пожаротушения и дымоудаления в паркинге',
      'Насосные станции Grundfos с частотным регулированием и фильтрацией воды тонкой очистки',
    ],
    inspectorTitle: 'Инженерная безопасность 24/7',
    inspectorSubtitle: 'Диспетчеризация и непрерывный мониторинг узлов комплекса',
    checks: [
      'Система автоматического доезда лифта до ближайшего этажа при внезапном обесточивании',
      'Круглосуточное видеонаблюдение 4K без слепых зон и биометрический контроль доступа',
      'Система контроля загазованности CO₂ с автоматическим включением турбовентиляции',
      'Круглогодичный подогрев рампы въезда в подземный паркинг против наледи',
    ],
    certificateLabel: 'Регламентная эксплуатация и авторизованный сервис от завода-изготовителя',
  },
};

const MATRIX_ROWS = [
  {
    feature: 'Сейсмостойкость и каркас',
    standard: '7-8 баллов (допустимый минимум по нормам)',
    greenProject: '9 баллов (B25/B30 монолит, ригельная система +35%)',
    advantage: 'Максимальная безопасность семьи при любых сейсмических воздействиях',
  },
  {
    feature: 'Межквартирная шумоизоляция',
    standard: '42-45 дБ (слышны громкие разговоры и ТВ соседей)',
    greenProject: '55 дБ (акустический блок 200 мм + минеральная мембрана)',
    advantage: 'Абсолютная тишина и приватность в спальнях в любое время суток',
  },
  {
    feature: 'Конструкция пола и стяжки',
    standard: 'Обычная цементная стяжка без виброразвязки',
    greenProject: 'Плавающая стяжка с демпфирующим матом SoundGuard 20 мм',
    advantage: 'Гашение ударного шума шагов сверху до комфортных 28 дБ',
  },
  {
    feature: 'Оконные конструкции',
    standard: 'Типовой 3-камерный профиль 58 мм, обычное стекло',
    greenProject: 'Премиум 76 мм (Schuco/Alumil) с газом Аргон и Solar-напылением',
    advantage: 'Зимой сохраняет тепло, летом отсекает жару, экономия 40% на счетах',
  },
  {
    feature: 'Облицовка и фасад',
    standard: 'Мокрая штукатурка («короед»), требующая ремонта через 4-5 лет',
    greenProject: 'Вентилируемый фасад из натурального травертина и базальта',
    advantage: 'Благородный первозданный вид камня спустя 50+ лет без затрат на ремонт',
  },
  {
    feature: 'Лифтовое оборудование',
    standard: 'Бюджетные отечественные подъемники с рывками при старте',
    greenProject: 'Скоростные OTIS Gen2 с плавным ходом и аварийным доездом ARD',
    advantage: 'Бесшумный скоростной подъем и гарантия не застрять при аварии сети',
  },
];

export function EngineeringSpecs() {
  const { openConsultModal } = useApp();
  const [activeTab, setActiveTab] = useState<DisciplineKey>('seismic');

  const activeData = DISCIPLINES[activeTab];

  return (
    <>
      {/* 1. ИНТЕРАКТИВНЫЙ АРХИТЕКТУРНЫЙ ДОСЬЕ И ТЕХНИЧЕСКИЙ РЕГЛАМЕНТ */}
      <section id="advantages" className="engineering-section">
        <div className="container">
          {/* Section Heading */}
          <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '8px' }}>
            <span className="section-top-label" style={{ letterSpacing: '0.08em' }}>
              АРХИТЕКТУРНЫЙ ПАСПОРТ И СТРОИТЕЛЬНЫЙ РЕГЛАМЕНТ • СНиП РА II-6.02-2006 & DIN 4109
            </span>
            <h2 className="section-h2" style={{ fontSize: '30px', margin: '6px 0 10px' }}>
              Инженерные стандарты и строительная анатомия
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '840px', margin: 0 }}>
              Каждый дом Green Project возводится по бескомпромиссным стандартам долговечности. Ознакомьтесь с интерактивным паспортом монолитных конструкций, акустики, энергоэффективности и коммуникаций.
            </p>
          </div>

          {/* Interactive Discipline Tabs Navigation */}
          <div className="eng-tabs-nav" role="tablist" aria-label="Инженерные дисциплины">
            {(Object.keys(DISCIPLINES) as DisciplineKey[]).map((key) => {
              const item = DISCIPLINES[key];
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
                  ГОСТ 30674-99 • СНиП РА II-6.02-2006
                </span>
                <button
                  type="button"
                  onClick={() => openConsultModal('Инженерный регламент')}
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
                  Запросить чертеж узла
                </button>
              </div>
            </div>

            {/* Right Card: Technical Inspector & Verification Card */}
            <div className="eng-inspector-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ADE80' }}></span>
                  <span style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C5A265', fontWeight: 700 }}>
                    КОНТРОЛЬ КАЧЕСТВА GREEN QUALITY
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
                    {activeData.certificateLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. СРАВНИТЕЛЬНАЯ МАТРИЦА СПЕЦИФИКАЦИЙ */}
          <div className="eng-matrix-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#12161A', margin: '0 0 4px' }}>
                  Сравнительная матрица: Green Project против типовой застройки
                </h3>
                <p style={{ fontSize: '13.5px', color: '#5F6B76', margin: 0 }}>
                  Объективная разница между стандартом Green Project и усредненным строительством в Ереване
                </p>
              </div>
              <span className="eng-badge-pill">
                Аудит стандартов строительства 2026
              </span>
            </div>

            <table className="eng-matrix-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>Параметр / Конструктив</th>
                  <th style={{ width: '26%' }}>Типовое строительство</th>
                  <th style={{ width: '28%' }}>Стандарт Green Project</th>
                  <th style={{ width: '24%' }}>Результат для жителя</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map((row, idx) => (
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

          {/* 3. ОФИЦИАЛЬНЫЙ СЕРТИФИЦИРОВАННЫЙ CTA БАННЕР */}
          <div className="eng-passport-cta">
            <div>
              <span style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C5A265', fontWeight: 700 }}>
                ОФИЦИАЛЬНЫЙ ИНЖЕНЕРНЫЙ ПАСПОРТ ОБЪЕКТА
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', margin: '6px 0 8px' }}>
                Желаете изучить конструкторскую документацию и СНиП РА?
              </h3>
              <p style={{ fontSize: '14px', color: '#CBD5E1', maxWidth: '640px', margin: 0, lineHeight: 1.6 }}>
                Предоставим полный пакет проектных расчетов сейсмостойкости, протоколы акустических испытаний перекрытий и генеральный план инженерных сетей любого из наших жилых комплексов.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-gold"
                onClick={() => openConsultModal('Инженерный регламент и СНиП РА')}
                style={{ padding: '14px 24px', fontSize: '14px', whiteSpace: 'nowrap' }}
              >
                Запросить технический пакет (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. О КОМПЛЕКСЕ: BENTO METRICS BANNER */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-card-banner">
            <div>
              <span className="about-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>О застройщике Green Project</span>
              </span>
              <h2 className="about-title">
                Инженерная надежность и гарантии на десятилетия вперед
              </h2>
              <p className="about-p">
                Green Project — девелопер полного цикла в Республике Армения. Мы возводим монолитные жилые комплексы с железобетонным каркасом марки B25/B30, расчетной сейсмостойкостью 9 баллов (СНиП РА) и двухкамерными стеклопакетами с аргоновым наполнением.
              </p>
              <p className="about-p">
                В квартирах исключительная тишина благодаря нормативной шумоизоляции 55 дБ и звукопоглощающей стяжке. Все расчеты ведутся через государственные эскроу-счета банков Армении.
              </p>
            </div>

            <div className="about-engineering-showcase">
              <div className="eng-stat-item">
                <div className="eng-stat-num">9 <span className="eng-unit">баллов</span></div>
                <div className="eng-stat-title">Сейсмостойкость (СНиП РА)</div>
                <p className="eng-stat-desc">Монолитный железобетонный каркас марки B25/B30 с ригельной системой.</p>
              </div>
              <div className="eng-stat-item">
                <div className="eng-stat-num">55 <span className="eng-unit">дБ</span></div>
                <div className="eng-stat-title">Акустическая изоляция</div>
                <p className="eng-stat-desc">В квартире исключительная тишина: перекрытия со звукопоглощающими мембранами.</p>
              </div>
              <div className="eng-stat-item">
                <div className="eng-stat-num">А+ <span className="eng-unit">класс</span></div>
                <div className="eng-stat-title">Энергоэффективность</div>
                <p className="eng-stat-desc">Базальтовая теплоизоляция 100 мм и двухкамерные аргоновые стеклопакеты.</p>
              </div>
              <div className="eng-stat-item">
                <div className="eng-stat-num">100%</div>
                <div className="eng-stat-title">Эскроу-безопасность</div>
                <p className="eng-stat-desc">Защита средств покупателей в аккредитованных банках Армении.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
