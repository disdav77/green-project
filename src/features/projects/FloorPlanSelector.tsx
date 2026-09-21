'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Project, Building, Unit, UnitStatus } from '@/types/database';
import { useApp } from '@/context/AppContext';
import { formatPrice, formatPricePerSqm } from '@/lib/currency';
import { CheckCircle2, ShieldAlert, Phone, Maximize2, MapPin, Layers } from 'lucide-react';

interface FloorPlanSelectorProps {
  project: Project;
  buildings: Building[];
  units: Unit[];
}

export function FloorPlanSelector({ project, buildings, units }: FloorPlanSelectorProps) {
  const { currency, openConsultModal } = useApp();
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>(
    buildings[0]?.id || ''
  );
  const [selectedFloor, setSelectedFloor] = useState<number>(4);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const currentBuilding = useMemo(
    () => buildings.find((b) => b.id === selectedBuildingId) || buildings[0],
    [buildings, selectedBuildingId]
  );

  const floorNumbers = useMemo(() => {
    const total = currentBuilding?.totalFloors || project.floorsCount || 10;
    return Array.from({ length: total }, (_, i) => i + 1);
  }, [currentBuilding, project.floorsCount]);

  // Filter units belonging to this project
  const projectUnits = useMemo(
    () => units.filter((u) => u.projectId === project.id),
    [units, project.id]
  );

  // Units on the selected floor or simulated if sparse
  const unitsOnFloor = useMemo(() => {
    const matched = projectUnits.filter(
      (u) => u.buildingId === selectedBuildingId && u.floorNumber === selectedFloor
    );
    if (matched.length > 0) return matched;

    // Provide floor-adapted preview units from existing project inventory
    return projectUnits.map((u, idx) => ({
      ...u,
      id: `${u.id}-f${selectedFloor}`,
      floorNumber: selectedFloor,
      unitNumber: `${selectedFloor * 10 + (idx + 1)}`,
      status: (idx === 1 ? 'reserved' : idx === 3 ? 'sold' : 'available') as UnitStatus,
      exactAddress: `${project.address}, корп. 1, кв. ${selectedFloor * 10 + (idx + 1)}`,
    }));
  }, [projectUnits, selectedBuildingId, selectedFloor, project.address]);

  return (
    <section id="floor-selector" className="py-16 bg-white border-b border-graphite-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pine bg-pine-50 px-3 py-1 rounded-btn border border-pine-200">
              Поэтажная шахматка
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-graphite-900 tracking-tight">
              Интерактивный выбор на плане этажа
            </h2>
            <p className="text-xs sm:text-sm text-graphite-600">
              Выберите корпус, этаж и квартиру для просмотра планировки и текущего статуса
            </p>
          </div>

          {/* Status Legend */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-graphite-700">Свободна</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-graphite-700">Бронь</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-graphite-300" />
              <span className="text-graphite-400">Продана</span>
            </div>
          </div>
        </div>

        {/* Step 1: Building Selector */}
        {buildings.length > 1 && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-graphite-500 uppercase tracking-wider">
              Шаг 1: Выберите корпус / дом
            </label>
            <div className="flex flex-wrap gap-2">
              {buildings.map((bld) => {
                const isActive = bld.id === selectedBuildingId;
                return (
                  <button
                    key={bld.id}
                    type="button"
                    onClick={() => {
                      setSelectedBuildingId(bld.id);
                      setSelectedFloor(1);
                    }}
                    className={`px-4 py-2 rounded-btn text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-pine text-white shadow-sm'
                        : 'bg-limestone-alt text-graphite-700 hover:bg-limestone border border-graphite-200'
                    }`}
                  >
                    {bld.name} ({bld.totalFloors} этажей)
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Floor Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-graphite-500 uppercase tracking-wider">
              Шаг 2: Выберите этаж (текущий: {selectedFloor}-й этаж)
            </label>
            <span className="text-xs text-graphite-500">
              Адрес: {currentBuilding?.address || project.address}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {floorNumbers.map((floor) => {
              const isSelected = selectedFloor === floor;
              return (
                <button
                  key={floor}
                  type="button"
                  onClick={() => setSelectedFloor(floor)}
                  className={`min-w-9 h-9 rounded-btn text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? 'bg-pine text-white shadow-sm ring-2 ring-pine/30'
                      : 'bg-limestone-alt text-graphite-700 hover:bg-limestone border border-graphite-200'
                  }`}
                >
                  {floor}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Interactive 2D Floor Plan Layout */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-graphite-500 uppercase tracking-wider">
            Шаг 3: Планировки на {selectedFloor}-м этаже
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {unitsOnFloor.map((unit) => {
              const isAvailable = unit.status === 'available';
              const isReserved = unit.status === 'reserved';
              const isSold = unit.status === 'sold';

              const borderClass = isAvailable
                ? 'border-emerald-300 hover:border-emerald-600 bg-white hover:bg-emerald-50/20'
                : isReserved
                ? 'border-amber-300 hover:border-amber-600 bg-amber-50/30'
                : 'border-graphite-200 bg-graphite-50/80 opacity-60 cursor-not-allowed';

              const badgeColor = isAvailable
                ? 'bg-emerald-100 text-emerald-800'
                : isReserved
                ? 'bg-amber-100 text-amber-800'
                : 'bg-graphite-200 text-graphite-600';

              const statusText = isAvailable
                ? 'Свободна'
                : isReserved
                ? 'Забронирована'
                : 'Продана';

              return (
                <div
                  key={unit.id}
                  onClick={() => !isSold && setSelectedUnit(unit)}
                  className={`rounded-card p-4 border transition-all duration-200 shadow-subtle flex flex-col justify-between cursor-pointer ${borderClass}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-graphite-900">
                        Кв. № {unit.unitNumber}
                      </span>
                      <span className={`px-2 py-0.5 rounded-btn text-[10px] font-bold ${badgeColor}`}>
                        {statusText}
                      </span>
                    </div>

                    <div className="relative h-28 w-full bg-limestone-alt rounded-btn p-2 flex items-center justify-center overflow-hidden">
                      <Image
                        src={unit.image}
                        alt={`План кв. ${unit.unitNumber}`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-bold text-graphite-900 line-clamp-1">
                        {unit.roomsLabel}
                      </div>
                      <div className="flex items-center justify-between text-xs text-graphite-500">
                        <span>Площадь:</span>
                        <span className="font-semibold text-graphite-800">{unit.areaSqm} м²</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-graphite-500">
                        <span>Цена за м²:</span>
                        <span className="font-semibold text-graphite-800">
                          {formatPricePerSqm(unit.priceAMD, unit.areaSqm, currency)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-graphite-100 mt-3 flex items-center justify-between">
                    <div className="text-sm font-extrabold text-graphite-900">
                      {formatPrice(unit.priceAMD, currency)}
                    </div>
                    {isAvailable && (
                      <span className="text-[11px] font-bold text-pine hover:underline">
                        Выбрать →
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Unit Modal */}
        {selectedUnit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-900/70 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-card shadow-elevated border border-graphite-200 max-w-2xl w-full p-6 space-y-6 relative overflow-hidden">
              <div className="flex items-start justify-between border-b border-graphite-100 pb-4">
                <div>
                  <div className="text-xs font-bold text-pine uppercase tracking-wider">
                    {project.name} • Этаж {selectedUnit.floorNumber}
                  </div>
                  <h3 className="text-xl font-bold text-graphite-900 mt-0.5">
                    Квартира № {selectedUnit.unitNumber} ({selectedUnit.roomsLabel})
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-graphite-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-brass" />
                    <span>{selectedUnit.exactAddress}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedUnit(null)}
                  className="p-2 rounded-btn text-graphite-400 hover:text-graphite-800 hover:bg-limestone"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative h-60 w-full bg-limestone rounded-card p-4 flex items-center justify-center border border-graphite-200">
                  <Image
                    src={selectedUnit.image}
                    alt={selectedUnit.roomsLabel}
                    fill
                    className="object-contain p-3"
                  />
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-btn bg-limestone-alt border border-graphite-100">
                      <span className="text-graphite-400 block text-[11px]">Площадь</span>
                      <strong className="text-graphite-900 text-sm">{selectedUnit.areaSqm} м²</strong>
                    </div>
                    <div className="p-2.5 rounded-btn bg-limestone-alt border border-graphite-100">
                      <span className="text-graphite-400 block text-[11px]">Потолки</span>
                      <strong className="text-graphite-900 text-sm">{selectedUnit.ceilingHeight} м</strong>
                    </div>
                    <div className="p-2.5 rounded-btn bg-limestone-alt border border-graphite-100">
                      <span className="text-graphite-400 block text-[11px]">Балкон / Терраса</span>
                      <strong className="text-graphite-900 text-sm">{selectedUnit.balconyArea} м²</strong>
                    </div>
                    <div className="p-2.5 rounded-btn bg-limestone-alt border border-graphite-100">
                      <span className="text-graphite-400 block text-[11px]">Статус</span>
                      <strong className="text-emerald-700 text-sm">
                        {selectedUnit.status === 'available' ? 'В продаже' : 'Забронирована'}
                      </strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-btn bg-pine-50 border border-pine-200">
                    <span className="text-[11px] text-graphite-600 block">Полная стоимость</span>
                    <div className="text-2xl font-black text-pine">
                      {formatPrice(selectedUnit.priceAMD, currency)}
                    </div>
                    <div className="text-xs text-graphite-500 mt-0.5">
                      {formatPricePerSqm(selectedUnit.priceAMD, selectedUnit.areaSqm, currency)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedUnit(null);
                        openConsultModal(project.id);
                      }}
                      className="w-full py-2.5 rounded-btn bg-pine text-white text-xs font-bold hover:bg-pine-800 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-brass" />
                      <span>Забронировать по телефону</span>
                    </button>

                    <p className="text-[11px] text-graphite-500 text-center">
                      Бронь подтверждается менеджером по звонку с последующим визитом в офис.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
