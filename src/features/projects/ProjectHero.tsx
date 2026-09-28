'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, ShieldCheck, ArrowDown, Phone, Shield, Volume2, Flame, Award } from 'lucide-react';
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
    <section className="relative bg-graphite-950 text-white overflow-hidden border-b border-graphite-800">
      {/* Background Architectural Photography with Setl Luxury Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src={project.image}
          alt={project.name}
          fill
          priority
          className="object-cover object-center brightness-60 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/70 to-graphite-950/40" />
      </div>

      <div className="relative z-10 container pt-12 pb-16 sm:pt-20 sm:pb-24 space-y-8">
        {/* Top Badges & Location Strip */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-btn bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-white/40">•</span>
          <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
            <MapPin className="w-3.5 h-3.5 text-brass" />
            <span>{project.address}</span>
          </div>
          <span className="text-white/40">•</span>
          <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
            <Calendar className="w-3.5 h-3.5 text-brass" />
            <span>{dictionary.projects.deliveryPrefix} {project.deliveryDate}</span>
          </div>
        </div>

        {/* Hero Main Content */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
            {project.name}
          </h1>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* Pricing & CTA Action Group */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-card border border-white/20">
            <span className="text-[11px] text-white/70 font-semibold uppercase tracking-wider block">
              {dictionary.projects.fromPrice}
            </span>
            <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-400 mt-0.5">
              {formatPrice(project.priceFromAMD, currency)}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#floor-selector"
              className="px-6 py-3.5 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all shadow-card hover:shadow-hover cursor-pointer flex items-center gap-2"
            >
              <span>{dictionary.projectDetail.ctaChoosePlan}</span>
              <ArrowDown className="w-4 h-4 text-emerald-200" />
            </a>
            <button
              type="button"
              onClick={() => openConsultModal(project.id)}
              className="px-6 py-3.5 rounded-btn bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-brass" />
              <span>{dictionary.projectDetail.ctaBookTour}</span>
            </button>
          </div>
        </div>

        {/* Institutional 4-Metric Ribbon (Setl Palace Standard) */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-white/10">
          <div className="p-4 rounded-card bg-white/5 backdrop-blur-sm border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-brass">
              <Shield className="w-4 h-4" />
              <span className="text-lg font-heading font-black text-white">
                {dictionary.projectDetail.metricSeismic}
              </span>
            </div>
            <p className="text-[11px] text-white/70 leading-snug">
              {dictionary.projectDetail.metricSeismicSub}
            </p>
          </div>

          <div className="p-4 rounded-card bg-white/5 backdrop-blur-sm border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400">
              <Volume2 className="w-4 h-4" />
              <span className="text-lg font-heading font-black text-white">
                {dictionary.projectDetail.metricAcoustic}
              </span>
            </div>
            <p className="text-[11px] text-white/70 leading-snug">
              {dictionary.projectDetail.metricAcousticSub}
            </p>
          </div>

          <div className="p-4 rounded-card bg-white/5 backdrop-blur-sm border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-amber-300">
              <Award className="w-4 h-4" />
              <span className="text-lg font-heading font-black text-white">
                {dictionary.projectDetail.metricEnergy}
              </span>
            </div>
            <p className="text-[11px] text-white/70 leading-snug">
              {dictionary.projectDetail.metricEnergySub}
            </p>
          </div>

          <div className="p-4 rounded-card bg-white/5 backdrop-blur-sm border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-lg font-heading font-black text-white">
                {dictionary.projectDetail.metricEscrow}
              </span>
            </div>
            <p className="text-[11px] text-white/70 leading-snug">
              {dictionary.projectDetail.metricEscrowSub}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
