'use client';

import React from 'react';
import { Unit } from '@/types/database';
import { useApp } from '@/context/AppContext';
import { initialProjects } from '@/lib/initialCatalog';
import { getLocalizedProject, getLocalizedUnit } from '@/lib/catalogLocalization';
import { formatPrice, formatPricePerSqm } from '@/lib/currency';

interface CatalogTableViewProps {
  units: Unit[];
  onSelect: (unit: Unit) => void;
}

export function CatalogTableView({ units, onSelect }: CatalogTableViewProps) {
  const { currency, language, dictionary, openConsultModal } = useApp();

  return (
    <div className="bg-white rounded-card border border-graphite-200 overflow-x-auto shadow-subtle">
      <table className="w-full text-left text-xs text-graphite-700">
        <thead className="bg-limestone-alt text-graphite-500 font-bold uppercase tracking-wider text-[11px] border-b border-graphite-200">
          <tr>
            <th className="py-3.5 px-4">{dictionary.catalog.colProject} / №</th>
            <th className="py-3.5 px-4">{dictionary.catalog.colRooms}</th>
            <th className="py-3.5 px-4">{dictionary.catalog.colArea}</th>
            <th className="py-3.5 px-4">{dictionary.catalog.colFloor}</th>
            <th className="py-3.5 px-4">{dictionary.projectDetail.sqmPricePrefix}</th>
            <th className="py-3.5 px-4">{dictionary.catalog.colPrice}</th>
            <th className="py-3.5 px-4">{dictionary.catalog.colStatus}</th>
            <th className="py-3.5 px-4 text-right">{dictionary.catalog.colAction}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-graphite-100">
          {units.map((rawUnit) => {
            const unit = getLocalizedUnit(rawUnit, language);
            const rawProject = initialProjects.find((p) => p.id === unit.projectId);
            const project = rawProject ? getLocalizedProject(rawProject, language) : undefined;
            const isAvailable = unit.status === 'available';

            const statusClass =
              unit.status === 'available'
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                : unit.status === 'reserved'
                ? 'text-amber-700 bg-amber-50 border-amber-200'
                : 'text-graphite-500 bg-graphite-100 border-graphite-200';

            const statusLabel =
              unit.status === 'available'
                ? dictionary.catalog.statusAvailable
                : unit.status === 'reserved'
                ? dictionary.catalog.statusReserved
                : dictionary.catalog.statusSold;

            return (
              <tr key={unit.id} className="hover:bg-limestone/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-graphite-900">
                  <div>{project?.name}</div>
                  <div className="text-[11px] text-graphite-500 font-normal">
                    № {unit.unitNumber}
                  </div>
                </td>
                <td className="py-3 px-4 font-medium">{unit.roomsLabel}</td>
                <td className="py-3 px-4 font-bold text-graphite-900">
                  {unit.areaSqm} {dictionary.common.sqm}
                </td>
                <td className="py-3 px-4">
                  {unit.floorNumber} {dictionary.common.floor}
                </td>
                <td className="py-3 px-4 text-graphite-500">
                  {formatPricePerSqm(unit.priceAMD, unit.areaSqm, currency)}
                </td>
                <td className="py-3 px-4 font-extrabold text-graphite-900 text-sm">
                  {formatPrice(unit.priceAMD, currency)}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-btn text-[10px] font-bold border ${statusClass}`}>
                    {statusLabel}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onSelect(unit)}
                    className="px-2.5 py-1 rounded-btn bg-limestone-alt hover:bg-limestone text-graphite-800 border border-graphite-200 text-xs font-semibold cursor-pointer"
                  >
                    {dictionary.projectDetail.viewPlanBtn}
                  </button>
                  {isAvailable && (
                    <button
                      type="button"
                      onClick={() => openConsultModal(unit.projectId)}
                      className="px-2.5 py-1 rounded-btn bg-pine text-white hover:bg-pine-800 text-xs font-semibold cursor-pointer"
                    >
                      {dictionary.projectDetail.reserveBtn}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
