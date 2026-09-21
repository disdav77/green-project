'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, CheckCircle2, ShieldCheck, ArrowDown } from 'lucide-react';
import { Project } from '@/types/database';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/currency';

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const { currency, openConsultModal } = useApp();

  return (
    <section className="relative bg-graphite-900 text-white overflow-hidden py-16 border-b border-graphite-800">
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src={project.image}
          alt={project.name}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-900 via-graphite-900/80 to-graphite-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2.5 py-1 rounded-btn bg-pine-900/80 border border-pine-500/40 text-brass-light text-xs font-semibold uppercase">
            {project.category}
          </span>
          <span className="text-graphite-500">•</span>
          <div className="flex items-center gap-1.5 text-xs text-graphite-300">
            <MapPin className="w-3.5 h-3.5 text-brass" />
            <span>{project.address}</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              {project.name}
            </h1>
            <p className="text-base sm:text-lg text-graphite-300 leading-relaxed max-w-2xl">
              {project.description}
            </p>

            {/* Key Advantages list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-graphite-200">
                  <CheckCircle2 className="w-4 h-4 text-pine-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics Card */}
          <div className="bg-graphite-800/90 rounded-card p-6 border border-graphite-700/80 space-y-5 shadow-card">
            <div>
              <div className="text-[11px] text-graphite-400 uppercase tracking-wider">Стоимость от</div>
              <div className="text-2xl font-heading font-black text-brass-light mt-0.5">
                {formatPrice(project.priceFromAMD, currency)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-3 border-y border-graphite-700/60 text-xs">
              <div>
                <span className="text-graphite-400">Срок сдачи:</span>
                <div className="font-bold text-white mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-brass" />
                  <span>{project.deliveryDate}</span>
                </div>
              </div>
              <div>
                <span className="text-graphite-400">Готовность:</span>
                <div className="font-bold text-white mt-0.5">{project.readiness}</div>
              </div>
              <div>
                <span className="text-graphite-400">Этажность:</span>
                <div className="font-bold text-white mt-0.5">{project.floorsCount} этажей</div>
              </div>
              <div>
                <span className="text-graphite-400">Сейсмостойкость:</span>
                <div className="font-bold text-white mt-0.5">{project.seismicScore}</div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => openConsultModal(project.id)}
                className="w-full py-2.5 rounded-btn bg-pine hover:bg-pine-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Записаться на просмотр
              </button>
              <a
                href="#floor-selector"
                className="w-full py-2 rounded-btn bg-graphite-700/80 hover:bg-graphite-700 text-graphite-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Выбрать квартиру на плане</span>
                <ArrowDown className="w-3.5 h-3.5 text-brass" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-graphite-400">
              <ShieldCheck className="w-4 h-4 text-pine-500 shrink-0" />
              <span>Субсидия по Ст. 156.1 НК РА (до 500 тыс ֏ / мес)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
