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
      data: dictionary.audience.tabFamily,
      recommendedLink: '/apartments?project=avan&rooms=2k',
    },
    {
      id: 'it' as const,
      icon: Laptop,
      data: dictionary.audience.tabIT,
      recommendedLink: '/mortgage',
    },
    {
      id: 'investor' as const,
      icon: TrendingUp,
      data: dictionary.audience.tabInvestor,
      recommendedLink: '/apartments?status=available',
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
          <p className="text-sm text-graphite-600">
            {dictionary.audience.subtitle}
          </p>
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
                  <span>{tab.data.label}</span>
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
                {currentTab.data.title}
              </h3>
              <p className="text-sm text-graphite-600 leading-relaxed">
                {currentTab.data.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {currentTab.data.benefits.map((benefit, idx) => (
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
                  {dictionary.projects.label}
                </span>
                <div className="text-base font-bold text-graphite-900 mt-0.5">
                  {currentTab.data.recommendedProject}
                </div>
              </div>

              <Link
                href={currentTab.recommendedLink}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-btn bg-pine text-white text-xs font-semibold hover:bg-pine-800 transition-colors shadow-subtle"
              >
                <span>{currentTab.data.recommendedCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
