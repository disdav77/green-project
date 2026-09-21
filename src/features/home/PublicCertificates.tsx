'use client';

import React from 'react';
import { FileCheck, ShieldCheck, Building, Landmark } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function PublicCertificates() {
  const { dictionary } = useApp();

  const documents = [
    {
      icon: FileCheck,
      title: dictionary.certificates.licenseName,
      authority: 'Комитет государственных доходов РА',
      description: 'Государственная лицензия девелопера на проектирование и строительство капитальных жилых зданий.',
    },
    {
      icon: Building,
      title: dictionary.certificates.avanPermit,
      authority: 'Мэрия г. Ереван',
      description: 'Официальное разрешение на строительство 14-этажного жилого комплекса Green Avan в административном районе Аван.',
    },
    {
      icon: Building,
      title: dictionary.certificates.norkPermit,
      authority: 'Мэрия г. Ереван',
      description: 'Официальное разрешение на строительство клубного дома Green Nork по адресу ул. Гюрджяна, 14.',
    },
    {
      icon: Landmark,
      title: dictionary.certificates.escrowNote,
      authority: 'ЦБ Республики Армения',
      description: 'Все финансовые расчеты ведутся через целевые эскроу-счета уполномоченных банков до сдачи объектов в эксплуатацию.',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-graphite-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pine uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-pine" />
            <span>Юридическая прозрачность</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-graphite-900 tracking-tight">
            {dictionary.certificates.title}
          </h2>
          <p className="text-xs sm:text-sm text-graphite-500">
            {dictionary.certificates.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {documents.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-card bg-limestone-alt border border-graphite-200/80 hover:bg-white hover:border-pine/30 transition-all shadow-subtle space-y-3"
              >
                <div className="w-8 h-8 rounded-btn bg-pine-50 text-pine flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-graphite-900 leading-snug">
                    {doc.title}
                  </h3>
                  <div className="text-[11px] font-medium text-brass mt-0.5">
                    {doc.authority}
                  </div>
                </div>
                <p className="text-xs text-graphite-600 leading-relaxed">
                  {doc.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
