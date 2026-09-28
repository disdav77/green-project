'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, CheckCircle2, ShieldCheck, ArrowDown } from 'lucide-react';
import { Project } from '@/types/database';
import { useApp } from '@/context/AppContext';
import { getLocalizedProject } from '@/lib/catalogLocalization';
import { formatPrice } from '@/lib/currency';

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project: rawProject }: ProjectHeroProps) {
  const { currency, language, dictionary, openConsultModal } = useApp();
  const project = getLocalizedProject(rawProject, language);

  return (
    <section className="bg-white text-graphite-900 border-b border-graphite-200" style={{ padding: '40px 0' }}>
      <div className="container space-y-8">
        {/* Breadcrumbs & Category Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-btn bg-pine-50 border border-pine-200 text-pine text-xs font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-graphite-400">•</span>
          <div className="flex items-center gap-1.5 text-xs text-graphite-600 font-medium">
            <MapPin className="w-3.5 h-3.5 text-brass" />
            <span>{project.address}</span>
          </div>
        </div>

        {/* Hero Grid: Details & Executive Architectural Passport */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Title, Description, Image Frame & Features */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-graphite-900 tracking-tight">
                {project.name}
              </h1>
              <p className="text-base sm:text-lg text-graphite-600 leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>

            {/* Authentic Architectural Photograph Frame */}
            <div className="relative h-72 sm:h-96 w-full rounded-card overflow-hidden border border-graphite-200 shadow-subtle bg-limestone">
              <Image
                src={project.image}
                alt={project.name}
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Key Advantages list */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-graphite-500">
                {dictionary.engineering.topLabel}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-btn bg-limestone-alt border border-graphite-200 text-xs text-graphite-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-pine shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Executive Architectural Passport Card */}
          <div className="bg-limestone-alt rounded-card p-6 border border-graphite-200 space-y-5 shadow-subtle sticky top-24">
            <div>
              <div className="text-[11px] text-graphite-500 font-bold uppercase tracking-wider">
                {dictionary.projects.fromPrice}
              </div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-pine mt-0.5">
                {formatPrice(project.priceFromAMD, currency)}
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-graphite-200 text-xs">
              <div className="p-2.5 rounded-btn bg-white border border-graphite-100">
                <span className="text-graphite-500 block text-[11px]">{dictionary.projects.deliveryPrefix}</span>
                <div className="font-bold text-graphite-900 mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-brass" />
                  <span>{project.deliveryDate}</span>
                </div>
              </div>
              <div className="p-2.5 rounded-btn bg-white border border-graphite-100">
                <span className="text-graphite-500 block text-[11px]">{dictionary.projects.readinessPrefix}:</span>
                <div className="font-bold text-graphite-900 mt-0.5">{project.readiness}</div>
              </div>
              <div className="p-2.5 rounded-btn bg-white border border-graphite-100">
                <span className="text-graphite-500 block text-[11px]">{dictionary.catalog.colFloor}:</span>
                <div className="font-bold text-graphite-900 mt-0.5">
                  {project.floorsCount} {dictionary.hero.statFloorsUnit}
                </div>
              </div>
              <div className="p-2.5 rounded-btn bg-white border border-graphite-100">
                <span className="text-graphite-500 block text-[11px]">{dictionary.engineering.disciplines.seismic.label}:</span>
                <div className="font-bold text-graphite-900 mt-0.5">{project.seismicScore}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => openConsultModal(project.id)}
                className="w-full py-3 rounded-btn bg-pine hover:bg-pine-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                {dictionary.topBar.bookTour}
              </button>
              <a
                href="#floor-selector"
                className="w-full py-2.5 rounded-btn bg-white hover:bg-graphite-50 border border-graphite-300 text-graphite-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{dictionary.projectDetail.floorSelectorTitle}</span>
                <ArrowDown className="w-3.5 h-3.5 text-pine" />
              </a>
            </div>

            {/* Trust Escrow Badge */}
            <div className="flex items-center gap-2 p-2.5 rounded-btn bg-white border border-graphite-100 text-[11px] text-graphite-600">
              <ShieldCheck className="w-4 h-4 text-pine shrink-0" />
              <span>{dictionary.mortgage.subtitle}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
