'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types/database';
import { useApp } from '@/context/AppContext';
import { getLocalizedProject } from '@/lib/catalogLocalization';
import { formatPrice } from '@/lib/currency';
import {
  Compass,
  MapPin,
  Trees,
  Car,
  Layers,
  Sparkles,
  ShieldCheck,
  Building,
  Phone,
  Calculator,
  Percent,
} from 'lucide-react';

interface ProjectSetlSectionsProps {
  project: Project;
}

export function ProjectSetlSections({ project: rawProject }: ProjectSetlSectionsProps) {
  const { currency, language, dictionary, openConsultModal } = useApp();
  const project = getLocalizedProject(rawProject, language);

  // Mortgage micro-calculator state for this project
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [termYears, setTermYears] = useState(20);
  const interestRate = 11.5;

  const propertyPrice = project.priceFromAMD;
  const downPaymentAMD = Math.round(propertyPrice * (downPaymentPercent / 100));
  const loanAmountAMD = propertyPrice - downPaymentAMD;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = termYears * 12;
  const annuityFactor =
    (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  const monthlyPaymentAMD = Math.round(loanAmountAMD * annuityFactor);

  // Tax refund estimation (Article 156.1 RA Tax Code)
  const firstMonthInterest = Math.round(loanAmountAMD * monthlyRate);
  const statutoryMonthlyLimit = 500000;
  const taxRefundMonthlyAMD =
    project.taxRefundEligible && propertyPrice <= 55000000
      ? Math.min(firstMonthInterest, statutoryMonthlyLimit)
      : 0;

  const effectiveMonthlyPaymentAMD = Math.max(0, monthlyPaymentAMD - taxRefundMonthlyAMD);

  return (
    <div className="bg-white">
      {/* Sticky In-Page Navigation Bar (Setl Palace Standard) */}
      <nav aria-label="Project Sub Navigation" className="sticky top-14 sm:top-16 z-30 bg-white/95 backdrop-blur-md border-b border-graphite-200 shadow-subtle">
        <div className="container">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-thin">
            <a
              href="#about"
              className="px-3 py-1.5 rounded-btn text-xs font-bold text-graphite-700 hover:text-pine hover:bg-pine-50 transition-colors whitespace-nowrap"
            >
              {dictionary.projectDetail.navAbout}
            </a>
            <a
              href="#location"
              className="px-3 py-1.5 rounded-btn text-xs font-bold text-graphite-700 hover:text-pine hover:bg-pine-50 transition-colors whitespace-nowrap"
            >
              {dictionary.projectDetail.navLocation}
            </a>
            <a
              href="#architecture"
              className="px-3 py-1.5 rounded-btn text-xs font-bold text-graphite-700 hover:text-pine hover:bg-pine-50 transition-colors whitespace-nowrap"
            >
              {dictionary.projectDetail.navArchitecture}
            </a>
            <a
              href="#amenities"
              className="px-3 py-1.5 rounded-btn text-xs font-bold text-graphite-700 hover:text-pine hover:bg-pine-50 transition-colors whitespace-nowrap"
            >
              {dictionary.projectDetail.navAmenities}
            </a>
            <a
              href="#floor-selector"
              className="px-3 py-1.5 rounded-btn text-xs font-bold text-graphite-700 hover:text-pine hover:bg-pine-50 transition-colors whitespace-nowrap"
            >
              {dictionary.projectDetail.navPlans}
            </a>
            <a
              href="#mortgage-hub"
              className="px-3 py-1.5 rounded-btn text-xs font-bold text-graphite-700 hover:text-pine hover:bg-pine-50 transition-colors whitespace-nowrap"
            >
              {dictionary.projectDetail.navMortgage}
            </a>
          </div>
        </div>
      </nav>

      {/* Section 1: About & Concept (#about) */}
      <section id="about" className="py-16 sm:py-20 border-b border-graphite-200 scroll-mt-28">
        <div className="container space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pine bg-pine-50 px-3 py-1 rounded-btn border border-pine-200">
              {dictionary.projectDetail.navAbout}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-graphite-900 tracking-tight">
              {dictionary.projectDetail.sectionAboutTitle}
            </h2>
            <p className="text-xs sm:text-sm text-graphite-600">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-card bg-limestone-alt border border-graphite-200 space-y-2">
              <Layers className="w-5 h-5 text-pine" />
              <div className="text-xl font-heading font-bold text-graphite-900">
                {project.floorsCount} {dictionary.hero.statFloorsUnit}
              </div>
              <div className="text-xs text-graphite-600">
                {language === 'hy' ? 'Հարկայնություն և համայնապատկեր' : language === 'en' ? 'Floors with panoramic skyline' : 'Этажность с панорамными видами'}
              </div>
            </div>

            <div className="p-5 rounded-card bg-limestone-alt border border-graphite-200 space-y-2">
              <Compass className="w-5 h-5 text-brass" />
              <div className="text-xl font-heading font-bold text-graphite-900">
                {project.slug === 'townhouse' ? '3.10 м' : project.slug === 'nork' ? '3.15 м' : '3.00 м'}
              </div>
              <div className="text-xs text-graphite-600">
                {language === 'hy' ? 'Առաստաղի մաքուր բարձրություն' : language === 'en' ? 'Finished ceiling height' : 'Чистая высота потолков'}
              </div>
            </div>

            <div className="p-5 rounded-card bg-limestone-alt border border-graphite-200 space-y-2">
              <Building className="w-5 h-5 text-pine" />
              <div className="text-xl font-heading font-bold text-graphite-900">
                {project.concreteGrade}
              </div>
              <div className="text-xs text-graphite-600">
                {language === 'hy' ? 'Երկաթբետոնե մոնոլիտ' : language === 'en' ? 'Reinforced concrete monolith' : 'Марка монолитного бетона'}
              </div>
            </div>

            <div className="p-5 rounded-card bg-limestone-alt border border-graphite-200 space-y-2">
              <Car className="w-5 h-5 text-brass" />
              <div className="text-xl font-heading font-bold text-graphite-900">
                {language === 'hy' ? '-2 Հարկ' : language === 'en' ? '-2 Levels' : '-2 Уровня'}
              </div>
              <div className="text-xs text-graphite-600">
                {language === 'hy' ? 'Ստորգետնյա պարկինգ վերելակով' : language === 'en' ? 'Underground heated parking' : 'Отапливаемый подземный паркинг'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Location (#location) */}
      <section id="location" className="py-16 sm:py-20 bg-limestone border-b border-graphite-200 scroll-mt-28">
        <div className="container space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pine bg-pine-50 px-3 py-1 rounded-btn border border-pine-200">
              {dictionary.projectDetail.navLocation}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-graphite-900 tracking-tight">
              {dictionary.projectDetail.sectionLocationTitle}
            </h2>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-graphite-600">
              <MapPin className="w-4 h-4 text-brass" />
              <span>{project.address}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-card bg-white border border-graphite-200 space-y-3 shadow-subtle">
              <div className="w-10 h-10 rounded-btn bg-pine-50 text-pine flex items-center justify-center font-bold">
                {project.timeToCenter}
              </div>
              <h4 className="text-base font-bold text-graphite-900">
                {language === 'hy' ? 'Մինչև Երևանի կենտրոն' : language === 'en' ? 'To Yerevan Center' : 'До центра Еревана'}
              </h4>
              <p className="text-xs text-graphite-600 leading-relaxed">
                {language === 'hy'
                  ? 'Արագ տրանսպորտային հասանելիություն մինչև Օպերային թատրոն, Կասկադ և Հանրապետության հրապարակ առանց խցանումների:'
                  : language === 'en'
                  ? 'Direct transit link to the Opera House, Cascade complex, and Republic Square without heavy traffic.'
                  : 'Быстрый доступ к Оперному театру, Каскаду и Площади Республики по прямым транспортным магистралям.'}
              </p>
            </div>

            <div className="p-6 rounded-card bg-white border border-graphite-200 space-y-3 shadow-subtle">
              <div className="w-10 h-10 rounded-btn bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                5 {language === 'en' ? 'min' : 'мин'}
              </div>
              <h4 className="text-base font-bold text-graphite-900">
                {language === 'hy' ? 'Բուսաբանական այգի և էկոլոգիա' : language === 'en' ? 'Botanical Garden & Parks' : 'Ботанический сад и парки'}
              </h4>
              <p className="text-xs text-graphite-600 leading-relaxed">
                {language === 'hy'
                  ? 'Մաքուր լեռնային օդ և զբոսանքի գոտիներ ընտանիքի համար: Զերծ արդյունաբերական գոտիներից:'
                  : language === 'en'
                  ? 'Fresh mountain air and spacious recreational walking paths away from industrial zones.'
                  : 'Свежий горный воздух и прогулочные зоны для всей семьи. Полное отсутствие промышленных производств.'}
              </p>
            </div>

            <div className="p-6 rounded-card bg-white border border-graphite-200 space-y-3 shadow-subtle">
              <div className="w-10 h-10 rounded-btn bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                2 {language === 'en' ? 'min' : 'мин'}
              </div>
              <h4 className="text-base font-bold text-graphite-900">
                {language === 'hy' ? 'Զարգացած ենթակառուցվածք' : language === 'en' ? 'Developed Infrastructure' : 'Развитая инфраструктура'}
              </h4>
              <p className="text-xs text-graphite-600 leading-relaxed">
                {language === 'hy'
                  ? 'Քայլելու հեռավորության վրա են դպրոցներ, մանկապարտեզներ, սուպերմարկետներ և բժշկական կենտրոններ:'
                  : language === 'en'
                  ? 'Walking distance to top schools, kindergartens, supermarkets, and healthcare centers.'
                  : 'В шаговой доступности школы, детские сады, супермаркеты, фитнес-центры и поликлиники.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Architecture & Materials (#architecture) */}
      <section id="architecture" className="py-16 sm:py-20 border-b border-graphite-200 scroll-mt-28">
        <div className="container space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pine bg-pine-50 px-3 py-1 rounded-btn border border-pine-200">
              {dictionary.projectDetail.navArchitecture}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-graphite-900 tracking-tight">
              {dictionary.projectDetail.sectionArchitectureTitle}
            </h2>
            <p className="text-xs sm:text-sm text-graphite-600">
              {dictionary.engineering.about.p1}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-card bg-limestone-alt border border-graphite-200 space-y-3">
              <Sparkles className="w-6 h-6 text-brass" />
              <h4 className="text-base font-bold text-graphite-900">
                {language === 'hy' ? 'Բնական հայկական քար' : language === 'en' ? 'Natural Armenian Stone' : 'Натуральный армянский камень'}
              </h4>
              <p className="text-xs text-graphite-600 leading-relaxed">
                {language === 'hy'
                  ? 'Ճակատները երեսպատված են բնական տրավերտինով և սև բազալտով: Ժամանակի ընթացքում քարը պահպանում է իր ազնվական փայլը:'
                  : language === 'en'
                  ? 'Exterior facades cladded in genuine travertine and basalt with brass architectural details.'
                  : 'Фасады облицованы натуральным армянским травертином и черным базальтом с акцентами из латуни.'}
              </p>
            </div>

            <div className="p-6 rounded-card bg-limestone-alt border border-graphite-200 space-y-3">
              <ShieldCheck className="w-6 h-6 text-pine" />
              <h4 className="text-base font-bold text-graphite-900">
                {language === 'hy' ? 'Գերմանական Schuco պրոֆիլ' : language === 'en' ? 'German Schuco Panoramic Glazing' : 'Немецкое остекление Schuco'}
              </h4>
              <p className="text-xs text-graphite-600 leading-relaxed">
                {language === 'hy'
                  ? 'Էներգախնայող բազմաֆունկցիոնալ ապակեպատում արևապաշտպան ծածկույթով և բարձր ձայնամեկուսացմամբ:'
                  : language === 'en'
                  ? 'Multi-functional energy-efficient glass with UV solar protection and high acoustic damping.'
                  : 'Энергосберегающие панорамные стеклопакеты с защитой от ультрафиолета и шумоизоляцией 55 дБ.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Amenities (#amenities) */}
      <section id="amenities" className="py-16 sm:py-20 bg-limestone border-b border-graphite-200 scroll-mt-28">
        <div className="container space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pine bg-pine-50 px-3 py-1 rounded-btn border border-pine-200">
              {dictionary.projectDetail.navAmenities}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-graphite-900 tracking-tight">
              {dictionary.projectDetail.sectionAmenitiesTitle}
            </h2>
            <p className="text-xs sm:text-sm text-graphite-600">
              {language === 'hy'
                ? 'Անվտանգ փակ բակ առանց մեքենաների, մշտադալար պուրակներ և մանկական խաղահրապարակներ:'
                : language === 'en'
                ? 'Secure car-free courtyard, evergreen private parks, and eco-certified children playgrounds.'
                : 'Безопасный закрытый двор без машин, ландшафтный парк с вечнозелеными деревьями и эко-площадки.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-card bg-white border border-graphite-200 space-y-3 shadow-subtle">
              <Trees className="w-6 h-6 text-pine" />
              <h4 className="text-base font-bold text-graphite-900">
                {language === 'hy' ? 'Լանդշաֆտային էկո-պուրակ' : language === 'en' ? 'Landscape Eco-Park' : 'Ландшафтный эко-парк'}
              </h4>
              <p className="text-xs text-graphite-600 leading-relaxed">
                {language === 'hy'
                  ? 'Սոճիներ, տույաներ, նստարաններ հանգստի համար և ավտոմատ կաթիլային ոռոգման համակարգ:'
                  : language === 'en'
                  ? 'Pines, thujas, relaxation benches, and smart automatic drip irrigation system.'
                  : 'Хвойные сосны, туи, лавочки для отдыха и система автоматического капельного полива.'}
              </p>
            </div>

            <div className="p-6 rounded-card bg-white border border-graphite-200 space-y-3 shadow-subtle">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h4 className="text-base font-bold text-graphite-900">
                {language === 'hy' ? 'Փակ բակ 24/7 հսկողությամբ' : language === 'en' ? '24/7 Monitored Perimeter' : 'Охраняемый закрытый двор'}
              </h4>
              <p className="text-xs text-graphite-600 leading-relaxed">
                {language === 'hy'
                  ? 'Առանց մեքենաների տարածք, 4K տեսահսկում առանց կույր գոտիների և կոնսյերժ ծառայություն:'
                  : language === 'en'
                  ? 'Zero cars allowed on the ground, 4K CCTV security coverage, and professional concierge.'
                  : 'Двор без машин, круглосуточное видеонаблюдение 4K и консьерж-сервис в лобби.'}
              </p>
            </div>

            <div className="p-6 rounded-card bg-white border border-graphite-200 space-y-3 shadow-subtle">
              <Car className="w-6 h-6 text-brass" />
              <h4 className="text-base font-bold text-graphite-900">
                {language === 'hy' ? 'Էլեկտրոմոբիլների լիցքավորում 22 կՎտ' : language === 'en' ? '22kW EV Charging Stations' : 'Зарядки для электрокаров 22 кВт'}
              </h4>
              <p className="text-xs text-graphite-600 leading-relaxed">
                {language === 'hy'
                  ? 'Ստորգետնյա կայանատեղիում տեղադրված են ժամանակակից արագ լիցքավորման կայաններ:'
                  : language === 'en'
                  ? 'Fast EV chargers installed directly in the heated underground parking.'
                  : 'В подземном паркинге установлены скоростные станции для зарядки электромобилей.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Mortgage Hub for this specific project (#mortgage-hub) */}
      <section id="mortgage-hub" className="py-16 sm:py-20 border-b border-graphite-200 scroll-mt-28">
        <div className="container space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pine bg-pine-50 px-3 py-1 rounded-btn border border-pine-200">
              {dictionary.projectDetail.navMortgage}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-graphite-900 tracking-tight">
              {dictionary.projectDetail.sectionMortgageTitle}: {project.name}
            </h2>
            <p className="text-xs sm:text-sm text-graphite-600">
              {dictionary.mortgage.pageSubtitleExtra}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Sliders */}
            <div className="lg:col-span-2 p-6 rounded-card bg-limestone-alt border border-graphite-200 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-graphite-700">
                  <span>{dictionary.mortgage.downPayment}: {downPaymentPercent}%</span>
                  <span className="text-pine font-heading text-sm">
                    {formatPrice(downPaymentAMD, currency)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 bg-graphite-200 rounded-lg appearance-none cursor-pointer accent-pine"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-graphite-700">
                  <span>{dictionary.mortgage.loanTerm}: {termYears} {dictionary.mortgage.yearsUnit}</span>
                  <span className="text-graphite-900 font-semibold">{totalMonths} {dictionary.mortgage.monthsUnit}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                  className="w-full h-2 bg-graphite-200 rounded-lg appearance-none cursor-pointer accent-pine"
                />
              </div>

              <div className="p-4 rounded-btn bg-white border border-graphite-200 flex items-center justify-between text-xs">
                <span className="text-graphite-600 font-medium">{dictionary.mortgage.interestRate}:</span>
                <span className="font-bold text-graphite-900">{interestRate}% ({dictionary.mortgage.partnerBanks})</span>
              </div>
            </div>

            {/* Right: Summary Card with Tax Refund */}
            <div className="p-6 rounded-card bg-pine-900 text-white space-y-5 shadow-elevated">
              <div>
                <span className="text-[11px] text-white/70 uppercase tracking-wider block">
                  {dictionary.mortgage.effectivePayment}
                </span>
                <div className="text-3xl font-heading font-black text-emerald-300 mt-1">
                  {formatPrice(effectiveMonthlyPaymentAMD, currency)}
                  <span className="text-xs font-normal text-white/70 block mt-0.5">
                    {dictionary.mortgage.perMonth}
                  </span>
                </div>
              </div>

              {taxRefundMonthlyAMD > 0 && (
                <div className="p-3 rounded-btn bg-white/10 border border-white/20 text-xs space-y-1">
                  <div className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <Percent className="w-4 h-4" />
                    <span>{dictionary.mortgage.taxRefundMonthly}:</span>
                  </div>
                  <div className="text-base font-bold text-white">
                    - {formatPrice(taxRefundMonthlyAMD, currency)} / {dictionary.mortgage.monthsUnit}
                  </div>
                  <div className="text-[10px] text-white/70">
                    {dictionary.mortgage.lawArticle156Cap}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => openConsultModal(project.id)}
                className="w-full py-3 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-emerald-200" />
                <span>{dictionary.mortgage.ctaApproval}</span>
              </button>

              <p className="text-[10px] text-white/60 text-center leading-relaxed">
                {dictionary.mortgage.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
