'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Waves, Award } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/currency';

export function HeroCover() {
  const { dictionary, currency, openConsultModal } = useApp();

  const portals = [
    {
      id: 'avan',
      name: 'ЖК Green Avan',
      location: 'Ереван, Аван',
      desc: '14 этажей • Закрытый двор-парк • 2 лифта',
      priceFrom: 14060000,
      image: '/images/apt-3.png',
      slug: 'avan',
      badge: 'Комфорт-плюс',
    },
    {
      id: 'nork',
      name: 'ЖК Green Nork',
      location: 'Ереван, Нор-Норк',
      desc: '6 этажей • Панорама Арарата • 55 дБ',
      priceFrom: 33650000,
      image: '/images/apt-2.png',
      slug: 'nork',
      badge: 'Бизнес-класс',
    },
    {
      id: 'townhouse',
      name: 'Green Townhouse',
      location: 'Котайк, с. Касах',
      desc: '2 этажа • Участок 124 м² • Бессрочный налог',
      priceFrom: 45880000,
      image: '/images/apt-5.png',
      slug: 'townhouse',
      badge: 'Премиум',
    },
  ];

  return (
    <section className="relative bg-graphite-900 text-white overflow-hidden pt-12 pb-20 border-b border-graphite-800">
      {/* Background Architectural Canvas */}
      <div className="absolute inset-0 z-0 opacity-25">
        <Image
          src="/images/hero-complex.png"
          alt="Green Project Architecture"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-900 via-graphite-900/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Manifest Header */}
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-btn bg-pine-900/80 border border-pine-500/40 text-brass-light text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-brass" />
            <span>Премиальный девелопмент в Республике Армения</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight">
            {dictionary.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-graphite-300 leading-relaxed max-w-2xl font-normal">
            {dictionary.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => openConsultModal()}
              className="px-6 py-3 rounded-btn bg-pine text-white text-sm font-semibold hover:bg-pine-800 transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>{dictionary.hero.chooseApartment}</span>
              <ArrowRight className="w-4 h-4 text-brass" />
            </button>

            <Link
              href="/mortgage"
              className="px-6 py-3 rounded-btn bg-graphite-800/90 text-graphite-200 hover:text-white hover:bg-graphite-700/90 text-sm font-semibold transition-all border border-graphite-700 flex items-center gap-2"
            >
              <span>{dictionary.hero.calculateMortgage}</span>
              <span className="text-xs text-brass font-normal">(Ст. 156.1 НК РА)</span>
            </Link>
          </div>
        </div>

        {/* 3 Architectural Portal Cards */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs uppercase tracking-widest text-graphite-400 font-semibold">
              Флагманские жилые комплексы
            </h2>
            <Link
              href="/apartments"
              className="text-xs text-brass hover:text-brass-light font-medium flex items-center gap-1 transition-colors"
            >
              <span>Смотреть все планировки</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portals.map((item) => (
              <Link
                key={item.id}
                href={`/projects/${item.slug}`}
                className="group relative bg-graphite-800/80 hover:bg-graphite-800 rounded-card border border-graphite-700/80 p-5 transition-all duration-200 hover:border-brass/60 hover:-translate-y-0.5 shadow-card"
              >
                <div className="relative h-44 w-full rounded-btn overflow-hidden mb-4 bg-graphite-950">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-btn bg-graphite-900/85 backdrop-blur-sm text-[11px] font-semibold text-brass-light border border-graphite-700">
                    {item.badge}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs text-graphite-400">{item.location}</div>
                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-brass-light transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-graphite-300 line-clamp-1">{item.desc}</p>

                  <div className="pt-3 border-t border-graphite-700/60 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-graphite-400 uppercase">Стоимость от</div>
                      <div className="text-sm font-bold text-white">
                        {formatPrice(item.priceFrom, currency)}
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-brass flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>В комплекс</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
