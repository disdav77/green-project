'use client';

import React from 'react';
import { Unit } from '@/types/database';
import { useApp } from '@/context/AppContext';
import { initialProjects } from '@/lib/initialCatalog';
import { getLocalizedProject, getLocalizedUnit } from '@/lib/catalogLocalization';
import { formatPrice, formatPricePerSqm } from '@/lib/currency';
import { MapPin, Maximize2, Layers } from 'lucide-react';
import { CardPhotoGallery } from '@/components/ui/CardPhotoGallery';

interface CatalogUnitCardProps {
  unit: Unit;
  onSelect: (unit: Unit) => void;
}

export function CatalogUnitCard({ unit: rawUnit, onSelect }: CatalogUnitCardProps) {
  const { currency, language, dictionary, openConsultModal } = useApp();
  const unit = getLocalizedUnit(rawUnit, language);
  const rawProject = initialProjects.find((p) => p.id === unit.projectId);
  const project = rawProject ? getLocalizedProject(rawProject, language) : undefined;

  // Setl Group Standard: First slide on every apartment card is ALWAYS the 2D architectural floor plan!
  const floorPlanImage = unit.image && unit.image.includes('plan') ? unit.image : '/images/floorplan.png';
  const interiorImage = unit.id.includes('avan')
    ? (unit.rooms === 1 ? '/images/apt-3.png' : '/images/projects/apartment_interior.jpg')
    : unit.id.includes('nork')
    ? '/images/apt-2.png'
    : '/images/apt-5.png';
  const facadeImage = project?.image || '/images/projects/avan_facade.jpg';
  const courtyardImage = '/images/projects/avan_ground.jpg';

  const unitPhotos = [
    floorPlanImage, // 1. Architectural 2D Blueprint ALWAYS FIRST
    interiorImage,  // 2. Interior 3D
    facadeImage,    // 3. Complex facade render
    courtyardImage, // 4. Landscaped grounds
  ];

  const statusBadge =
    unit.status === 'available'
      ? { label: dictionary.catalog.statusAvailable, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
      : unit.status === 'reserved'
      ? { label: dictionary.catalog.statusReserved, color: 'bg-amber-50 text-amber-800 border-amber-200' }
      : { label: dictionary.catalog.statusSold, color: 'bg-graphite-100 text-graphite-600 border-graphite-200' };

  return (
    <div className="group bg-white rounded-card border border-graphite-200 overflow-hidden shadow-subtle hover:border-pine/50 hover:shadow-card transition-all duration-200 flex flex-col justify-between h-full">
      <div>
        {/* Photo & Floorplan Gallery */}
        <div className="relative w-full border-b border-graphite-100 overflow-hidden">
          <CardPhotoGallery
            images={unitPhotos}
            alt={unit.roomsLabel}
            aspectRatio="16/11"
          >
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <span className={`px-2.5 py-1 rounded-btn text-[11px] font-bold border shadow-xs tracking-wide ${statusBadge.color}`}>
                {statusBadge.label}
              </span>
            </div>
            <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-btn bg-white/95 backdrop-blur-sm border border-graphite-200 text-[11px] font-bold text-graphite-800 shadow-xs pointer-events-none">
              {project?.name}
            </div>
          </CardPhotoGallery>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs text-graphite-500 mb-1">
              <span className="font-bold text-pine uppercase tracking-wider">
                № {unit.unitNumber}
              </span>
              <span className="font-medium">
                {unit.floorNumber} {dictionary.common.floor}
              </span>
            </div>
            <h3
              onClick={() => onSelect(unit)}
              className="text-base font-bold text-graphite-900 group-hover:text-pine transition-colors cursor-pointer mt-0.5 line-clamp-1"
            >
              {unit.roomsLabel}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-graphite-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-brass shrink-0" />
              <span className="truncate">{project?.address || unit.exactAddress}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-graphite-100 text-xs my-2">
            <div className="flex items-center gap-1.5 text-graphite-700">
              <Maximize2 className="w-3.5 h-3.5 text-pine shrink-0" />
              <span className="font-medium">{unit.areaSqm} {dictionary.common.sqm}</span>
            </div>
            <div className="flex items-center gap-1.5 text-graphite-700">
              <Layers className="w-3.5 h-3.5 text-pine shrink-0" />
              <span className="font-medium">
                {language === 'hy' ? 'Առաստաղ' : language === 'en' ? 'Ceilings' : 'Потолки'} {unit.ceilingHeight} {language === 'en' ? 'm' : 'м'}
              </span>
            </div>
          </div>

          <div className="pt-0.5">
            <div className="text-lg sm:text-xl font-heading font-extrabold text-graphite-900 tracking-tight">
              {formatPrice(unit.priceAMD, currency)}
            </div>
            <div className="text-[11px] text-graphite-500 font-medium mt-0.5">
              {formatPricePerSqm(unit.priceAMD, unit.areaSqm, currency)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA: Symmetric two-button row for every unit card */}
      <div className="p-4 pt-0 flex gap-2">
        <button
          type="button"
          onClick={() => onSelect(unit)}
          className="flex-1 py-2 text-center rounded-btn bg-limestone-alt hover:bg-limestone text-graphite-800 text-xs font-semibold border border-graphite-200 transition-colors cursor-pointer"
        >
          {dictionary.projectDetail.viewPlanBtn}
        </button>
        {unit.status === 'available' ? (
          <button
            type="button"
            onClick={() => openConsultModal(unit.projectId)}
            className="flex-1 py-2 rounded-btn bg-pine hover:bg-pine-800 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            {dictionary.projectDetail.reserveBtn}
          </button>
        ) : unit.status === 'reserved' ? (
          <button
            type="button"
            onClick={() => openConsultModal(unit.projectId)}
            className="flex-1 py-2 rounded-btn bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200 transition-colors cursor-pointer"
          >
            {language === 'hy' ? 'Կարգավիճակ' : language === 'en' ? 'Status' : 'В резерве'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => openConsultModal(unit.projectId)}
            className="flex-1 py-2 rounded-btn bg-graphite-100 hover:bg-graphite-200 text-graphite-600 text-xs font-semibold border border-graphite-200 transition-colors cursor-pointer"
          >
            {language === 'hy' ? 'Նմանատիպ' : language === 'en' ? 'Similar' : 'Похожие'}
          </button>
        )}
      </div>
    </div>
  );
}
