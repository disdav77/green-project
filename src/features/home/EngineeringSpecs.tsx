'use client';

import React from 'react';

export function EngineeringSpecs() {
  return (
    <>
      {/* ПРЕИМУЩЕСТВА (Exact Setl Group Standards Grid) */}
      <section id="advantages" className="advantages-section">
        <div className="container">
          <h2 className="section-h2">Инженерные стандарты и комфорт</h2>
          <p className="section-subtitle">
            Монолитный железобетон, шумоизоляция 55 дБ, отапливаемый паркинг и эскроу-счета застройщика Green Project.
          </p>

          <div className="advantages-grid">
            {/* 1 */}
            <div className="advantage-card">
              <span className="advantage-icon-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" />
                  <path d="M12 22v-3" />
                </svg>
              </span>
              <h3 className="advantage-title">Дворы-парки без машин</h3>
              <p className="advantage-text">
                Ландшафтное озеленение, безопасные детские городки из эко-материалов и зоны отдыха вместо парковок во дворе.
              </p>
            </div>

            {/* 2 */}
            <div className="advantage-card">
              <span className="advantage-icon-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
              </span>
              <h3 className="advantage-title">Качественная предчистовая отделка</h3>
              <p className="advantage-text">
                Ровная стяжка пола со звукоизоляционными матами, оштукатуренные стены и надежные металлические входные двери.
              </p>
            </div>

            {/* 3 */}
            <div className="advantage-card">
              <span className="advantage-icon-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <h3 className="advantage-title">Монолит и сейсмика 9 баллов</h3>
              <p className="advantage-text">
                Железобетонный каркас по СНиП РА, межквартирные перегородки 200 мм с шумопоглощением 55 дБ и круглосуточная охрана.
              </p>
            </div>

            {/* 4 */}
            <div className="advantage-card">
              <span className="advantage-icon-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 17h6" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </span>
              <h3 className="advantage-title">Подземный отапливаемый паркинг</h3>
              <p className="advantage-text">
                Отапливаемый паркинг с прямым доступом на скоростном лифте и станциями зарядки электромобилей.
              </p>
            </div>

            {/* 5 */}
            <div className="advantage-card">
              <span className="advantage-icon-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
                  <path d="M15 12h.01" />
                  <path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
                  <path d="M9 12h.01" />
                </svg>
              </span>
              <h3 className="advantage-title">Семейная инфраструктура</h3>
              <p className="advantage-text">
                Детские сады и школы в радиусе 300 метров, колясочные зоны на первых этажах и закрытые спортивные площадки.
              </p>
            </div>

            {/* 6 */}
            <div className="advantage-card">
              <span className="advantage-icon-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                </svg>
              </span>
              <h3 className="advantage-title">Возврат налога (Ст. 156.1 НК РА)</h3>
              <p className="advantage-text">
                Государственный возврат до 500 000 ֏ в месяц уплаченного подоходного налога на погашение процентов по ипотеке.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* О КОМПЛЕКСЕ (Exact Setl Group About Banner & Bento Metrics) */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-card-banner">
            <div>
              <span className="about-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>О комплексе</span>
              </span>
              <h2 className="about-title">
                Инженерное качество и сейсмическая безопасность 9 баллов
              </h2>
              <p className="about-p">
                Green Project — девелопер полного цикла в Армении. Мы возводим монолитные жилые комплексы с железобетонным каркасом марки B25/B30, расчетной сейсмостойкостью 9 баллов (СНиП РА) и двухкамерными стеклопакетами с аргоновым наполнением.
              </p>
              <p className="about-p">
                В квартирах исключительная тишина благодаря нормативной шумоизоляции 55 дБ и звукопоглощающей стяжке. Все сделки ведутся через защищенные счета эскроу банков Армении.
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
