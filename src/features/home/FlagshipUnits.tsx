'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Maximize2, Layers } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { initialUnits, initialProjects } from '@/lib/initialCatalog';
import { formatPrice, formatPricePerSqm } from '@/lib/currency';

export function FlagshipUnits() {
  const { currency, openConsultModal } = useApp();

  // Pick 3 representative flagship units (1 from Avan, 1 from Nork, 1 from Townhouse)
  const flagshipIds = ['avan-102', 'nork-201', 'th-301'];
  const units = initialUnits.filter((u) => flagshipIds.includes(u.id));

  return (
    <section className="py-16 bg-white border-b border-graphite-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pine bg-pine-50 px-3 py-1 rounded-btn border border-pine-200">
              Выбор месяца
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-graphite-900 tracking-tight">
              Флагманские планировки
            </h2>
            <p className="text-sm text-graphite-600">
              Популярные квартиры с высокой инсоляцией и оптимальной стоимостью метра
            </p>
          </div>

          <Link
            href="/apartments"
            className="inline-flex items-center gap-2 text-sm font-bold text-pine hover:text-pine-800 transition-colors"
          >
            <span>Весь каталог квартир</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Unit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {units.map((unit) => {
            const project = initialProjects.find((p) => p.id === unit.projectId);
            const statusColor =
              unit.status === 'available'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : unit.status === 'reserved'
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-graphite-100 text-graphite-600 border-graphite-200';

            const statusLabel =
              unit.status === 'available'
                ? 'В продаже'
                : unit.status === 'reserved'
                ? 'Забронирована'
                : 'Продана';

            return (
              <div
                key={unit.id}
                className="group bg-white rounded-card border border-graphite-200 overflow-hidden shadow-card hover:border-pine/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Image Frame */}
                  <div className="relative h-48 w-full bg-limestone p-4 flex items-center justify-center border-b border-graphite-100">
                    <Image
                      src={unit.image}
                      alt={unit.roomsLabel}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded-btn text-[11px] font-semibold border ${statusColor}`}>
                        {statusLabel}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-btn bg-white/90 backdrop-blur-sm border border-graphite-200 text-[11px] font-semibold text-graphite-800">
                      {project?.name}
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-graphite-900 group-hover:text-pine transition-colors">
                        {unit.roomsLabel}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-graphite-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-brass shrink-0" />
                        <span className="truncate">{unit.exactAddress}</span>
                      </div>
                    </div>

                    {/* Metric Chips */}
                    <div className="grid grid-cols-2 gap-2 py-2 border-y border-graphite-100 text-xs">
                      <div className="flex items-center gap-1.5 text-graphite-700">
                        <Maximize2 className="w-3.5 h-3.5 text-graphite-400" />
                        <span>Площадь: <strong>{unit.areaSqm} м²</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-graphite-700">
                        <Layers className="w-3.5 h-3.5 text-graphite-400" />
                        <span>Этаж: <strong>{unit.floorNumber}</strong></span>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="pt-1">
                      <div className="text-xs text-graphite-500">
                        {formatPricePerSqm(unit.priceAMD, unit.areaSqm, currency)}
                      </div>
                      <div className="text-xl font-heading font-extrabold text-graphite-900">
                        {formatPrice(unit.priceAMD, currency)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 pb-5 pt-0 flex gap-2">
                  <Link
                    href={`/apartments?id=${unit.id}`}
                    className="flex-1 py-2 text-center rounded-btn bg-limestone-alt hover:bg-limestone text-graphite-800 text-xs font-semibold border border-graphite-200 transition-colors"
                  >
                    План и детали
                  </Link>
                  <button
                    type="button"
                    onClick={() => openConsultModal(unit.projectId)}
                    className="flex-1 py-2 rounded-btn bg-pine hover:bg-pine-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Забронировать
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-4 rounded-card bg-limestone-alt border border-graphite-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-graphite-700 text-left">
            Ищете другую площадь или этаж? В базе застройщика доступно <strong>150+ вариантов</strong> в трех жилых комплексах.
          </div>
          <Link
            href="/apartments"
            className="px-5 py-2 rounded-btn bg-pine text-white text-xs font-bold hover:bg-pine-800 transition-colors whitespace-nowrap"
          >
            Смотреть все 150+ квартир ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
