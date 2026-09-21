'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Laptop, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function AudienceGateway() {
  const { dictionary } = useApp();
  const [activeTab, setActiveTab] = useState<'family' | 'it' | 'investor'>('it');

  const tabs = [
    {
      id: 'family' as const,
      icon: Users,
      label: dictionary.audience.tabFamily,
      title: 'Уют и безопасность для нескольких поколений семьи',
      description: dictionary.audience.tabFamilyDesc,
      benefits: [
        'Закрытые дворы без доступа автотранспорта',
        'Современные развивающие игровые площадки во дворе',
        'Школы, детские сады и супермаркеты в шаговой доступности',
        'Просторные кухни-гостиные и раздельные санузлы',
      ],
      recommendedProject: 'ЖК Green Avan',
      recommendedLink: '/apartments?project=avan&rooms=2k',
      recommendedCta: 'Смотреть семейные планировки 2к и 3к',
    },
    {
      id: 'it' as const,
      icon: Laptop,
      label: dictionary.audience.tabIT,
      title: 'Максимальный возврат подоходного налога по Ст. 156.1 НК РА',
      description: dictionary.audience.tabITDesc,
      benefits: [
        'Возврат до 500 000 ֏ ежемесячно (до 1 000 000 ֏ с созаёмщиком)',
        'Высокоскоростной оптоволоконный интернет и эргономичные кабинеты',
        'Шумоизоляция 55 дБ: тишина во время созвонов и удаленной работы',
        '10 минут до IT-хабов и коворкингов Еревана',
      ],
      recommendedProject: 'ЖК Green Avan & Green Nork',
      recommendedLink: '/mortgage',
      recommendedCta: 'Рассчитать персональную субсидию',
    },
    {
      id: 'investor' as const,
      icon: TrendingUp,
      label: dictionary.audience.tabInvestor,
      title: 'Высокая арендная доходность и защищенные инвестиции',
      description: dictionary.audience.tabInvestorDesc,
      benefits: [
        'Арендная доходность 9–12% годовых в драмах/долларах',
        'Рост стоимости метра на этапе строительства до 25%',
        '100% безопасность сделки: депонирование средств на счетах эскроу',
        'Возможность дистанционного оформления для диаспоры (Power of Attorney)',
      ],
      recommendedProject: 'Green Townhouse & Green Nork',
      recommendedLink: '/apartments?status=available',
      recommendedCta: 'Смотреть инвестиционный каталог',
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[1];

  return (
    <section className="py-16 bg-limestone-alt border-b border-graphite-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-pine bg-pine-50 px-3 py-1 rounded-btn border border-pine-200">
            {dictionary.audience.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-graphite-900 tracking-tight">
            {dictionary.audience.title}
          </h2>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-card bg-graphite-100 border border-graphite-200 max-w-full overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-btn text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-graphite-900 shadow-sm border border-graphite-200/80'
                      : 'text-graphite-600 hover:text-graphite-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-pine' : 'text-graphite-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tab Showcase */}
        <div className="bg-white rounded-card border border-graphite-200 p-6 sm:p-8 shadow-subtle max-w-4xl mx-auto animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xl font-heading font-bold text-graphite-900">
                {currentTab.title}
              </h3>
              <p className="text-sm text-graphite-600 leading-relaxed">
                {currentTab.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {currentTab.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-graphite-700">
                    <CheckCircle2 className="w-4 h-4 text-pine shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-limestone rounded-card p-5 border border-graphite-200/80 space-y-4 text-center md:text-left">
              <div>
                <span className="text-[11px] font-semibold text-graphite-500 uppercase tracking-wider">
                  Рекомендуемый комплекс
                </span>
                <div className="text-base font-bold text-graphite-900 mt-0.5">
                  {currentTab.recommendedProject}
                </div>
              </div>

              <Link
                href={currentTab.recommendedLink}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-btn bg-pine text-white text-xs font-semibold hover:bg-pine-800 transition-colors shadow-subtle"
              >
                <span>{currentTab.recommendedCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
