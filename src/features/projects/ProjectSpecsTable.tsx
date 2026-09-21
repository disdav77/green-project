'use client';

import React from 'react';
import { Project } from '@/types/database';
import { Shield, Layers, Building, Volume2, Car, Flame, Sparkles } from 'lucide-react';

interface ProjectSpecsTableProps {
  project: Project;
}

export function ProjectSpecsTable({ project }: ProjectSpecsTableProps) {
  const specs = [
    { label: 'Сейсмическая безопасность', value: project.seismicScore, icon: Shield },
    { label: 'Несущий конструктив', value: `Железобетонный монолит марки ${project.concreteGrade}`, icon: Building },
    { label: 'Акустический комфорт', value: `Нормативная изоляция ${project.acousticComfort} (многослойная стяжка)`, icon: Volume2 },
    { label: 'Высота потолков', value: project.slug === 'townhouse' ? '3.10 м' : project.slug === 'nork' ? '3.15 м' : '3.00 м', icon: Layers },
    { label: 'Парковочные места', value: project.slug === 'townhouse' ? 'Индивидуальные придомовые места' : 'Двухуровневый подземный паркинг с лифтом', icon: Car },
    { label: 'Отопление и коммуникации', value: 'Индивидуальное автономное отопление, двухконтурные котлы', icon: Flame },
    { label: 'Отделка фасадов', value: 'Натуральный армянский травертин, черный базальт, декор из латуни', icon: Sparkles },
  ];

  return (
    <section style={{ padding: '36px 0', backgroundColor: 'var(--background-alt)', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-pine bg-pine-50 px-3 py-1 rounded-btn border border-pine-200">
            Инженерная спецификация
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-graphite-900 tracking-tight">
            Технические характеристики {project.name}
          </h2>
          <p className="text-xs sm:text-sm text-graphite-600">
            Соответствие государственным строительным нормам Республики Армения
          </p>
        </div>

        <div className="bg-white rounded-card border border-graphite-200 divide-y divide-graphite-100 shadow-subtle overflow-hidden">
          {specs.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-limestone/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-btn bg-limestone text-pine flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-graphite-700">
                    {spec.label}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-graphite-900 sm:text-right pl-11 sm:pl-0">
                  {spec.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
