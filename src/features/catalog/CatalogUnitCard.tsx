'use client';

import React from 'react';
import Image from 'next/image';
import { Unit } from '@/types/database';
import { useApp } from '@/context/AppContext';
import { initialProjects } from '@/lib/initialCatalog';
import { getLocalizedProject, getLocalizedUnit } from '@/lib/catalogLocalization';
import { formatPrice, formatPricePerSqm } from '@/lib/currency';
import { MapPin, Maximize2, Layers } from 'lucide-react';

interface CatalogUnitCardProps {
  unit: Unit;
  onSelect: (unit: Unit) => void;
}

export function CatalogUnitCard({ unit: rawUnit, onSelect }: CatalogUnitCardProps) {
  const { currency, language, dictionary, openConsultModal } = useApp();
  const unit = getLocalizedUnit(rawUnit, language);
  const rawProject = initialProjects.find((p) => p.id === unit.projectId);
  const project = rawProject ? getLocalizedProject(rawProject, language) : undefined;

  const statusBadge =
    unit.status === 'available'
      ? { label: dictionary.catalog.statusAvailable, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
      : unit.status === 'reserved'
      ? { label: dictionary.catalog.statusReserved, color: 'bg-amber-50 text-amber-800 border-amber-200' }
      : { label: dictionary.catalog.statusSold, color: 'bg-graphite-100 text-graphite-600 border-graphite-200' };

  return (
    <div className="group bg-white rounded-card border border-graphite-200 overflow-hidden shadow-subtle hover:border-pine/50 hover:shadow-card transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Plan Preview */}
        <div
          onClick={() => onSelect(unit)}
          className="relative h-48 w-full bg-limestone-alt p-4 flex items-center justify-center border-b border-graphite-100 cursor-pointer overflow-hidden"
        >
          <Image
            src={unit.image}
            alt={unit.roomsLabel}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-0.5 rounded-btn text-[10px] font-bold border ${statusBadge.color}`}>
              {statusBadge.label}
            </span>
          </div>
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-btn bg-white/90 backdrop-blur-sm border border-graphite-200 text-[10px] font-bold text-graphite-800">
            {project?.name}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-pine uppercase">
                № {unit.unitNumber}
              </span>
              <span className="text-xs text-graphite-500">
                {unit.floorNumber} {dictionary.common.floor}
              </span>
            </div>
            <h3
              onClick={() => onSelect(unit)}
              className="text-sm font-bold text-graphite-900 group-hover:text-pine transition-colors cursor-pointer mt-0.5"
            >
              {unit.roomsLabel}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-graphite-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-brass shrink-0" />
              <span className="truncate">{project?.address || unit.exactAddress}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 py-2 border-y border-graphite-100 text-xs">
            <div className="flex items-center gap-1.5 text-graphite-700">
              <Maximize2 className="w-3.5 h-3.5 text-graphite-400" />
              <span>{unit.areaSqm} {dictionary.common.sqm}</span>
            </div>
            <div className="flex items-center gap-1.5 text-graphite-700">
              <Layers className="w-3.5 h-3.5 text-graphite-400" />
              <span>
                {language === 'hy' ? 'Առաստաղ' : language === 'en' ? 'Ceilings' : 'Потолки'} {unit.ceilingHeight} {language === 'en' ? 'm' : 'м'}
              </span>
            </div>
          </div>

          <div>
            <div className="text-[11px] text-graphite-500">
              {formatPricePerSqm(unit.priceAMD, unit.areaSqm, currency)}
            </div>
            <div className="text-lg font-heading font-extrabold text-graphite-900">
              {formatPrice(unit.priceAMD, currency)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-4 pt-0 flex gap-2">
        <button
          type="button"
          onClick={() => onSelect(unit)}
          className="flex-1 py-2 text-center rounded-btn bg-limestone-alt hover:bg-limestone text-graphite-800 text-xs font-semibold border border-graphite-200 transition-colors cursor-pointer"
        >
          {dictionary.projectDetail.viewPlanBtn}
        </button>
        {unit.status === 'available' && (
          <button
            type="button"
            onClick={() => openConsultModal(unit.projectId)}
            className="flex-1 py-2 rounded-btn bg-pine hover:bg-pine-800 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            {dictionary.projectDetail.reserveBtn}
          </button>
        )}
      </div>
    </div>
  );
}
