'use client';

import React from 'react';
import { Project } from '@/types/database';
import { useApp } from '@/context/AppContext';
import { getLocalizedProject } from '@/lib/catalogLocalization';
import { Shield, Layers, Building, Volume2, Car, Flame, Sparkles } from 'lucide-react';

interface ProjectSpecsTableProps {
  project: Project;
}

export function ProjectSpecsTable({ project: rawProject }: ProjectSpecsTableProps) {
  const { language, dictionary } = useApp();
  const project = getLocalizedProject(rawProject, language);

  const specs = [
    {
      label: dictionary.engineering.disciplines.seismic.label,
      value: project.seismicScore,
      icon: Shield,
    },
    {
      label: language === 'hy' ? 'Կրող կոնստրուկտիվ' : language === 'en' ? 'Structural Core' : 'Несущий конструктив',
      value:
        language === 'hy'
          ? `Երկաթբետոնե մոնոլիտ ${project.concreteGrade}`
          : language === 'en'
          ? `Reinforced concrete monolith ${project.concreteGrade}`
          : `Железобетонный монолит марки ${project.concreteGrade}`,
      icon: Building,
    },
    {
      label: dictionary.engineering.disciplines.acoustic.label,
      value:
        language === 'hy'
          ? `Նորմատիվ մեկուսացում ${project.acousticComfort}`
          : language === 'en'
          ? `Certified sound isolation ${project.acousticComfort}`
          : `Нормативная изоляция ${project.acousticComfort}`,
      icon: Volume2,
    },
    {
      label: language === 'hy' ? 'Առաստաղի բարձրություն' : language === 'en' ? 'Ceiling Height' : 'Высота потолков',
      value:
        project.slug === 'townhouse'
          ? `3.10 ${language === 'en' ? 'm' : 'м'}`
          : project.slug === 'nork'
          ? `3.15 ${language === 'en' ? 'm' : 'м'}`
          : `3.00 ${language === 'en' ? 'm' : 'м'}`,
      icon: Layers,
    },
    {
      label: language === 'hy' ? 'Կայանատեղի' : language === 'en' ? 'Parking' : 'Парковочные места',
      value:
        project.slug === 'townhouse'
          ? language === 'hy'
            ? 'Անհատական տնամերձ կայանատեղեր'
            : language === 'en'
            ? 'Private on-site individual parking'
            : 'Индивидуальные придомовые места'
          : language === 'hy'
          ? 'Ստորգետնյա երկմակարդակ կայանատեղի վերելակով'
          : language === 'en'
          ? 'Two-level underground heated parking with lift'
          : 'Двухуровневый подземный паркинг с лифтом',
      icon: Car,
    },
    {
      label: language === 'hy' ? 'Ջեռուցում և կոմունիկացիաներ' : language === 'en' ? 'Heating & Utilities' : 'Отопление и коммуникации',
      value:
        language === 'hy'
          ? 'Անհատական ինքնավար ջեռուցում, երկկոնտուր կաթսաներ'
          : language === 'en'
          ? 'Autonomous individual heating with dual-circuit boilers'
          : 'Индивидуальное автономное отопление, двухконтурные котлы',
      icon: Flame,
    },
    {
      label: language === 'hy' ? 'Ճակատի հարդարում' : language === 'en' ? 'Facade Cladding' : 'Отделка фасадов',
      value:
        language === 'hy'
          ? 'Բնական հայկական տրավերտին, սև բազալտ, արույր'
          : language === 'en'
          ? 'Natural Armenian travertine, black basalt, brass accents'
          : 'Натуральный армянский травертин, черный базальт, декор из латуни',
      icon: Sparkles,
    },
  ];

  return (
    <section style={{ padding: '36px 0', backgroundColor: 'var(--background-alt)', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-pine bg-pine-50 px-3 py-1 rounded-btn border border-pine-200">
            {dictionary.projectDetail.specsTitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-graphite-900 tracking-tight">
            {dictionary.projectDetail.specsSubtitle}: {project.name}
          </h2>
          <p className="text-xs sm:text-sm text-graphite-600">
            {dictionary.projectDetail.govStandardNotice}
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
