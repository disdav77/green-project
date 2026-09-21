'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Unit } from '@/types/database';
import { initialUnits } from '@/lib/initialCatalog';
import { CatalogFilters, CatalogFilterState } from '@/features/catalog/CatalogFilters';
import { CatalogUnitCard } from '@/features/catalog/CatalogUnitCard';
import { CatalogTableView } from '@/features/catalog/CatalogTableView';
import { MapPin, Phone, Building2, X } from 'lucide-react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { formatPrice, formatPricePerSqm } from '@/lib/currency';

function ApartmentsCatalogContent() {
  const searchParams = useSearchParams();
  const { currency, openConsultModal } = useApp();

  const [filters, setFilters] = useState<CatalogFilterState>({
    project: searchParams.get('project') || 'all',
    rooms: searchParams.get('rooms') || 'all',
    status: searchParams.get('status') || 'all',
    sortBy: 'price-asc',
    viewMode: 'grid',
  });

  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  useEffect(() => {
    const projectParam = searchParams.get('project');
    const roomsParam = searchParams.get('rooms');
    const statusParam = searchParams.get('status');

    if (projectParam || roomsParam || statusParam) {
      setFilters((prev) => ({
        ...prev,
        project: projectParam || prev.project,
        rooms: roomsParam || prev.rooms,
        status: statusParam || prev.status,
      }));
    }
  }, [searchParams]);

  const filteredUnits = useMemo(() => {
    return initialUnits
      .filter((u) => {
        if (filters.project !== 'all' && u.projectId !== filters.project) return false;
        if (filters.rooms !== 'all' && u.rooms !== parseInt(filters.rooms, 10)) return false;
        if (filters.status !== 'all' && u.status !== filters.status) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.priceAMD - b.priceAMD;
        if (filters.sortBy === 'price-desc') return b.priceAMD - a.priceAMD;
        if (filters.sortBy === 'area-asc') return a.areaSqm - b.areaSqm;
        if (filters.sortBy === 'area-desc') return b.areaSqm - a.areaSqm;
        return 0;
      });
  }, [filters]);

  const handleReset = () => {
    setFilters({
      project: 'all',
      rooms: 'all',
      status: 'all',
      sortBy: 'price-asc',
      viewMode: 'grid',
    });
  };

  return (
    <div style={{ padding: '36px 0 60px', backgroundColor: 'var(--background-alt)', minHeight: '80vh' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Header Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-pine uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Каталог недвижимости</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-graphite-900 tracking-tight">
            Квартиры и таунхаусы застройщика
          </h1>
          <p className="text-sm text-graphite-600">
            Официальные планировки, актуальные статусы и точные адреса объектов
          </p>
        </div>

        {/* Filters Box */}
        <CatalogFilters
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleReset}
          totalFound={filteredUnits.length}
        />

        {/* Units View */}
        {filteredUnits.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-card border border-graphite-200 shadow-subtle space-y-3">
            <p className="text-sm text-graphite-600">
              По выбранным фильтрам планировок не найдено.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-btn bg-pine text-white text-xs font-bold hover:bg-pine-800 transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : filters.viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUnits.map((unit) => (
              <CatalogUnitCard
                key={unit.id}
                unit={unit}
                onSelect={(u) => setSelectedUnit(u)}
              />
            ))}
          </div>
        ) : (
          <CatalogTableView
            units={filteredUnits}
            onSelect={(u) => setSelectedUnit(u)}
          />
        )}

        {/* Selected Unit Modal */}
        {selectedUnit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-900/70 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-card shadow-elevated border border-graphite-200 max-w-2xl w-full p-6 space-y-6 relative overflow-hidden">
              <div className="flex items-start justify-between border-b border-graphite-100 pb-4">
                <div>
                  <div className="text-xs font-bold text-pine uppercase tracking-wider">
                    {selectedUnit.roomsLabel} • Этаж {selectedUnit.floorNumber}
                  </div>
                  <h3 className="text-xl font-bold text-graphite-900 mt-0.5">
                    Квартира № {selectedUnit.unitNumber} ({selectedUnit.areaSqm} м²)
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
                  <X className="w-5 h-5" />
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
                      <span className="text-graphite-400 block text-[11px]">Балкон</span>
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
                    <span className="text-[11px] text-graphite-600 block">Стоимость квартиры</span>
                    <div className="text-2xl font-black text-pine">
                      {formatPrice(selectedUnit.priceAMD, currency)}
                    </div>
                    <div className="text-xs text-graphite-500 mt-0.5">
                      {formatPricePerSqm(selectedUnit.priceAMD, selectedUnit.areaSqm, currency)}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUnit(null);
                      openConsultModal(selectedUnit.projectId);
                    }}
                    className="w-full py-2.5 rounded-btn bg-pine text-white text-xs font-bold hover:bg-pine-800 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-brass" />
                    <span>Забронировать по телефону</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ApartmentsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-graphite-500 text-sm">Загрузка каталога...</div>}>
      <ApartmentsCatalogContent />
    </Suspense>
  );
}
