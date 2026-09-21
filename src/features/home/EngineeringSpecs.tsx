'use client';

import React from 'react';
import { Shield, Hammer, VolumeX, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function EngineeringSpecs() {
  const { dictionary } = useApp();

  const specs = [
    {
      icon: Shield,
      title: dictionary.engineering.seismicTitle,
      description: dictionary.engineering.seismicDesc,
      metric: '9 баллов',
      submetric: 'по СНиП РА II-6.02',
    },
    {
      icon: Hammer,
      title: dictionary.engineering.monolithTitle,
      description: dictionary.engineering.monolithDesc,
      metric: 'B25 / B30',
      submetric: 'арматура А500С',
    },
    {
      icon: VolumeX,
      title: dictionary.engineering.acousticTitle,
      description: dictionary.engineering.acousticDesc,
      metric: '55 дБ',
      submetric: 'акустическая тишина',
    },
    {
      icon: Sparkles,
      title: dictionary.engineering.materialsTitle,
      description: dictionary.engineering.materialsDesc,
      metric: '100% камень',
      submetric: 'травертин и базальт',
    },
  ];

  return (
    <section id="engineering" className="py-20 bg-graphite-900 text-white border-b border-graphite-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brass-light bg-graphite-800 px-3 py-1 rounded-btn border border-graphite-700">
            {dictionary.engineering.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            {dictionary.engineering.title}
          </h2>
          <p className="text-sm sm:text-base text-graphite-400">
            Здания возводятся по монолитно-каркасной технологии с расчетным запасом прочности более 100 лет
          </p>
        </div>

        {/* 4 Bento Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-graphite-800/80 rounded-card p-6 border border-graphite-700/80 hover:border-brass/50 transition-all duration-200 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-btn bg-graphite-700/60 flex items-center justify-center text-brass">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-graphite-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-graphite-700/60">
                  <div className="text-2xl font-heading font-extrabold text-brass-light">
                    {item.metric}
                  </div>
                  <div className="text-[11px] text-graphite-400 uppercase tracking-wider mt-0.5">
                    {item.submetric}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
