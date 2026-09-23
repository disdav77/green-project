'use client';

import React from 'react';
import { LayoutGrid, List, RotateCcw } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { initialProjects } from '@/lib/initialCatalog';
import { getLocalizedProject } from '@/lib/catalogLocalization';

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
  const { dictionary, language } = useApp();
  const localizedProjects = initialProjects.map((p) => getLocalizedProject(p, language));

  return (
    <div className="bg-white rounded-card border border-graphite-200 p-5 shadow-subtle space-y-4">
      {/* Top row: Project & Rooms pills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Project Select */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-graphite-500 mb-1.5">
            {dictionary.catalog.filterProject}
          </label>
          <select
            value={filters.project}
            onChange={(e) => onFilterChange({ ...filters, project: e.target.value })}
            className="w-full px-3 py-2 text-xs font-semibold rounded-input border border-graphite-300 bg-white focus:outline-none focus:border-pine focus:ring-1 focus:ring-pine"
          >
            <option value="all">{dictionary.catalog.allProjects}</option>
            {localizedProjects.map((proj) => (
              <option key={proj.slug} value={proj.slug}>
                {proj.name} ({proj.district})
              </option>
            ))}
          </select>
        </div>

        {/* Rooms Select */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-graphite-500 mb-1.5">
            {dictionary.catalog.filterRooms}
          </label>
          <select
            value={filters.rooms}
            onChange={(e) => onFilterChange({ ...filters, rooms: e.target.value })}
            className="w-full px-3 py-2 text-xs font-semibold rounded-input border border-graphite-300 bg-white focus:outline-none focus:border-pine focus:ring-1 focus:ring-pine"
          >
            <option value="all">{dictionary.catalog.allRooms}</option>
            <option value="1">
              {language === 'hy' ? '1 սենյականոց / Ստուդիա' : language === 'en' ? '1-Bedroom / Studio' : '1-комнатные / Студии'}
            </option>
            <option value="2">
              {language === 'hy' ? '2 սենյականոց' : language === 'en' ? '2-Bedroom' : '2-комнатные'}
            </option>
            <option value="3">
              {language === 'hy' ? '3 սենյականոց' : language === 'en' ? '3-Bedroom' : '3-комнатные'}
            </option>
            <option value="4">
              {language === 'hy' ? '4+ սենյականոց / Թաունհաուսներ' : language === 'en' ? '4+ Bedroom / Townhouses' : '4-комнатные / Таунхаусы'}
            </option>
          </select>
        </div>

        {/* Status Select */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-graphite-500 mb-1.5">
            {dictionary.catalog.filterStatus}
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="w-full px-3 py-2 text-xs font-semibold rounded-input border border-graphite-300 bg-white focus:outline-none focus:border-pine focus:ring-1 focus:ring-pine"
          >
            <option value="all">{dictionary.catalog.allStatuses}</option>
            <option value="available">{dictionary.catalog.statusAvailable}</option>
            <option value="reserved">{dictionary.catalog.statusReserved}</option>
            <option value="sold">{dictionary.catalog.statusSold}</option>
          </select>
        </div>

        {/* Sort Select */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-graphite-500 mb-1.5">
            {dictionary.catalog.sortByPriceAsc}
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as CatalogFilterState['sortBy'] })}
            className="w-full px-3 py-2 text-xs font-semibold rounded-input border border-graphite-300 bg-white focus:outline-none focus:border-pine focus:ring-1 focus:ring-pine"
          >
            <option value="price-asc">{dictionary.catalog.sortByPriceAsc}</option>
            <option value="price-desc">{dictionary.catalog.sortByPriceDesc}</option>
            <option value="area-asc">{dictionary.catalog.sortByAreaAsc}</option>
            <option value="area-desc">{dictionary.catalog.sortByAreaDesc}</option>
          </select>
        </div>
      </div>

      {/* Bottom row: Counter, View Mode, and Reset */}
      <div className="flex items-center justify-between pt-3 border-t border-graphite-100 text-xs">
        <div className="text-graphite-600">
          {language === 'hy' ? 'Գտնվել է առաջարկ.' : language === 'en' ? 'Units found:' : 'Найдено предложений:'}{' '}
          <strong className="text-graphite-900">{totalFound}</strong>
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
              title={dictionary.catalog.viewGrid}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, viewMode: 'table' })}
              className={`p-1.5 rounded-btn text-xs font-semibold transition-all ${
                filters.viewMode === 'table' ? 'bg-white text-pine shadow-sm' : 'text-graphite-500 hover:text-graphite-900'
              }`}
              title={dictionary.catalog.viewTable}
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
            <span>{dictionary.catalog.resetFilters}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
