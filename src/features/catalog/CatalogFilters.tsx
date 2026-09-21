'use client';

import React from 'react';
import { LayoutGrid, List, RotateCcw } from 'lucide-react';

export interface CatalogFilterState {
  project: string;
  rooms: string;
  status: string;
  sortBy: 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc';
  viewMode: 'grid' | 'table';
}

interface CatalogFiltersProps {
  filters: CatalogFilterState;
  onFilterChange: (filters: CatalogFilterState) => void;
  onReset: () => void;
  totalFound: number;
}

export function CatalogFilters({ filters, onFilterChange, onReset, totalFound }: CatalogFiltersProps) {
  return (
    <div className="bg-white rounded-card border border-graphite-200 p-5 shadow-subtle space-y-4">
      {/* Top row: Project & Rooms pills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Project Select */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-graphite-500 mb-1.5">
            Жилой комплекс
          </label>
          <select
            value={filters.project}
            onChange={(e) => onFilterChange({ ...filters, project: e.target.value })}
            className="w-full px-3 py-2 text-xs font-semibold rounded-input border border-graphite-300 bg-white focus:outline-none focus:border-pine focus:ring-1 focus:ring-pine"
          >
            <option value="all">Все комплексы</option>
            <option value="avan">ЖК Green Avan (Ереван, Аван)</option>
            <option value="nork">ЖК Green Nork (Ереван, Нор-Норк)</option>
            <option value="townhouse">Green Townhouse (с. Касах)</option>
          </select>
        </div>

        {/* Rooms Select */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-graphite-500 mb-1.5">
            Количество комнат
          </label>
          <select
            value={filters.rooms}
            onChange={(e) => onFilterChange({ ...filters, rooms: e.target.value })}
            className="w-full px-3 py-2 text-xs font-semibold rounded-input border border-graphite-300 bg-white focus:outline-none focus:border-pine focus:ring-1 focus:ring-pine"
          >
            <option value="all">Любая комнатность</option>
            <option value="1">1-комнатные / Студии</option>
            <option value="2">2-комнатные</option>
            <option value="3">3-комнатные</option>
            <option value="4">4-комнатные / Таунхаусы</option>
          </select>
        </div>

        {/* Status Select */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-graphite-500 mb-1.5">
            Статус лота
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="w-full px-3 py-2 text-xs font-semibold rounded-input border border-graphite-300 bg-white focus:outline-none focus:border-pine focus:ring-1 focus:ring-pine"
          >
            <option value="all">Все статусы</option>
            <option value="available">Только в продаже</option>
            <option value="reserved">Забронированные</option>
            <option value="sold">Проданные</option>
          </select>
        </div>

        {/* Sort Select */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-graphite-500 mb-1.5">
            Сортировка
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as CatalogFilterState['sortBy'] })}
            className="w-full px-3 py-2 text-xs font-semibold rounded-input border border-graphite-300 bg-white focus:outline-none focus:border-pine focus:ring-1 focus:ring-pine"
          >
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
            <option value="area-asc">По возрастанию площади</option>
            <option value="area-desc">По убыванию площади</option>
          </select>
        </div>
      </div>

      {/* Bottom row: Counter, View Mode, and Reset */}
      <div className="flex items-center justify-between pt-3 border-t border-graphite-100 text-xs">
        <div className="text-graphite-600">
          Найдено предложений: <strong className="text-graphite-900">{totalFound}</strong>
        </div>

        <div className="flex items-center gap-3">
          {/* View Switcher */}
          <div className="inline-flex rounded-btn bg-graphite-100 p-0.5 border border-graphite-200">
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, viewMode: 'grid' })}
              className={`p-1.5 rounded-btn text-xs font-semibold transition-all ${
                filters.viewMode === 'grid' ? 'bg-white text-pine shadow-sm' : 'text-graphite-500 hover:text-graphite-900'
              }`}
              title="Сетка"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, viewMode: 'table' })}
              className={`p-1.5 rounded-btn text-xs font-semibold transition-all ${
                filters.viewMode === 'table' ? 'bg-white text-pine shadow-sm' : 'text-graphite-500 hover:text-graphite-900'
              }`}
              title="Таблица"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-graphite-600 hover:text-graphite-900 hover:bg-limestone transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Сбросить</span>
          </button>
        </div>
      </div>
    </div>
  );
}
