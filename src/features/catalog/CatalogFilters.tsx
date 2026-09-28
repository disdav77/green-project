'use client';

import React from 'react';
import { LayoutGrid, List, RotateCcw, Check, Sparkles, Building2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { initialProjects } from '@/lib/initialCatalog';
import { getLocalizedProject } from '@/lib/catalogLocalization';
import { formatPrice } from '@/lib/currency';

export interface CatalogFilterState {
  project: string;
  rooms: string;
  status: string;
  delivery?: string;
  category?: string;
  taxRefundOnly?: boolean;
  maxPrice?: number;
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
  const { dictionary, language, currency } = useApp();
  const localizedProjects = initialProjects.map((p) => getLocalizedProject(p, language));

  const roomOptions = [
    { id: 'all', label: dictionary.catalog.allRooms },
    { id: '1', label: language === 'hy' ? '1 սենյակ / Ստուդիա' : language === 'en' ? '1-Bed / Studio' : '1к / Студия' },
    { id: '2', label: language === 'hy' ? '2 սենյակ' : language === 'en' ? '2-Bedroom' : '2-комнатная' },
    { id: '3', label: language === 'hy' ? '3 սենյակ' : language === 'en' ? '3-Bedroom' : '3-комнатная' },
    { id: '4', label: language === 'hy' ? '4+ սենյակ / Թաունհաուս' : language === 'en' ? '4+ Bed / Townhouse' : '4+ / Таунхаус' },
  ];

  const deliveryOptions = [
    { id: 'all', label: language === 'hy' ? 'Բոլոր ժամկետները' : language === 'en' ? 'All Delivery Dates' : 'Все сроки' },
    { id: '2025', label: language === 'hy' ? '2025 թ.' : language === 'en' ? '2025' : '2025 год' },
    { id: '2026', label: language === 'hy' ? '2026 թ.' : language === 'en' ? '2026' : '2026 год' },
  ];

  const pricePresetThresholds = [
    { max: 0, label: language === 'hy' ? 'Ցանկացած գին' : language === 'en' ? 'Any Price' : 'Любая цена' },
    { max: 20000000, label: formatPrice(20000000, currency) },
    { max: 35000000, label: formatPrice(35000000, currency) },
    { max: 55000000, label: formatPrice(55000000, currency) },
  ];

  const activeFiltersCount = [
    filters.project !== 'all',
    filters.rooms !== 'all',
    filters.status !== 'all',
    filters.delivery && filters.delivery !== 'all',
    filters.category && filters.category !== 'all',
    filters.taxRefundOnly,
    filters.maxPrice && filters.maxPrice > 0,
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-card border border-graphite-200 p-5 shadow-subtle space-y-4 select-none">
      {/* 1. Setl Project Master Chips */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-graphite-500 mb-2">
          {dictionary.catalog.filterProject}
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, project: 'all' })}
            className={`px-3.5 py-1.5 rounded-btn text-xs font-semibold transition-all cursor-pointer ${
              filters.project === 'all'
                ? 'bg-pine text-white shadow-sm ring-1 ring-pine'
                : 'bg-limestone-alt text-graphite-700 hover:bg-graphite-200/70 border border-graphite-200'
            }`}
          >
            {dictionary.catalog.allProjects}
          </button>
          {localizedProjects.map((proj) => (
            <button
              key={proj.slug}
              type="button"
              onClick={() => onFilterChange({ ...filters, project: proj.slug })}
              className={`px-3.5 py-1.5 rounded-btn text-xs font-semibold transition-all cursor-pointer ${
                filters.project === proj.slug
                  ? 'bg-pine text-white shadow-sm ring-1 ring-pine'
                  : 'bg-limestone-alt text-graphite-700 hover:bg-graphite-200/70 border border-graphite-200'
              }`}
            >
              {proj.name} ({proj.district.split(',')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* 2. Room Count Segmented Buttons */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-graphite-500 mb-2">
          {dictionary.catalog.filterRooms}
        </label>
        <div className="flex flex-wrap gap-2">
          {roomOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onFilterChange({ ...filters, rooms: opt.id })}
              className={`px-3.5 py-1.5 rounded-btn text-xs font-semibold transition-all cursor-pointer ${
                filters.rooms === opt.id
                  ? 'bg-pine text-white shadow-sm ring-1 ring-pine'
                  : 'bg-limestone-alt text-graphite-700 hover:bg-graphite-200/70 border border-graphite-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Delivery Date & Price Presets Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
        {/* Delivery Date */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-graphite-500 mb-1.5">
            {language === 'hy' ? 'Հանձնման ժամկետ' : language === 'en' ? 'Delivery Date' : 'Срок сдачи'}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {deliveryOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onFilterChange({ ...filters, delivery: opt.id })}
                className={`px-3 py-1.5 rounded-btn text-xs font-semibold transition-all cursor-pointer ${
                  (filters.delivery || 'all') === opt.id
                    ? 'bg-graphite-900 text-white'
                    : 'bg-limestone-alt text-graphite-600 hover:bg-graphite-200 border border-graphite-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Thresholds */}
        <div className="md:col-span-1 lg:col-span-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-graphite-500 mb-1.5">
            {dictionary.catalog.priceRange} (до)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {pricePresetThresholds.map((preset) => {
              const isSelected = (filters.maxPrice || 0) === preset.max;
              return (
                <button
                  key={preset.max}
                  type="button"
                  onClick={() => onFilterChange({ ...filters, maxPrice: preset.max })}
                  className={`px-3 py-1.5 rounded-btn text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-graphite-900 text-white'
                      : 'bg-limestone-alt text-graphite-600 hover:bg-graphite-200 border border-graphite-200'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Setl Fast Toggle Chips (Tax Refund & In Sale) */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-graphite-100">
        <button
          type="button"
          onClick={() => onFilterChange({ ...filters, taxRefundOnly: !filters.taxRefundOnly })}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-xs font-semibold transition-all cursor-pointer ${
            filters.taxRefundOnly
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          {filters.taxRefundOnly && <Check className="w-3.5 h-3.5" />}
          <span>
            {language === 'hy'
              ? 'Հարկի վերադարձ ՀՕ 156.1 (մինչև 55 մլն ֏)'
              : language === 'en'
              ? 'Tax Refund Eligible (Up to 55M AMD)'
              : 'Возврат налога Ст. 156.1 (до 55 млн ֏)'}
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            onFilterChange({
              ...filters,
              status: filters.status === 'available' ? 'all' : 'available',
            })
          }
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-xs font-semibold transition-all cursor-pointer ${
            filters.status === 'available'
              ? 'bg-pine text-white shadow-sm'
              : 'bg-limestone-alt text-graphite-700 border border-graphite-200 hover:bg-graphite-200'
          }`}
        >
          {filters.status === 'available' && <Check className="w-3.5 h-3.5" />}
          <span>{dictionary.catalog.statusAvailable}</span>
        </button>
      </div>

      {/* 5. Setl Action Bar: Counter, Sort, View Switcher & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-graphite-100 text-xs">
        <div className="flex items-center gap-2 text-graphite-700 font-semibold">
          <Building2 className="w-4 h-4 text-pine" />
          <span>
            {language === 'hy'
              ? `Գտնվել է ${totalFound} առաջարկ`
              : language === 'en'
              ? `Found ${totalFound} properties`
              : `Найдено ${totalFound} квартир`}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Sort Selector */}
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as CatalogFilterState['sortBy'] })}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-btn border border-graphite-300 bg-white text-graphite-800 focus:outline-none focus:border-pine cursor-pointer"
          >
            <option value="price-asc">{dictionary.catalog.sortByPriceAsc}</option>
            <option value="price-desc">{dictionary.catalog.sortByPriceDesc}</option>
            <option value="area-asc">{dictionary.catalog.sortByAreaAsc}</option>
            <option value="area-desc">{dictionary.catalog.sortByAreaDesc}</option>
          </select>

          {/* Grid / Table View Switcher */}
          <div className="inline-flex rounded-btn bg-graphite-100 p-0.5 border border-graphite-200">
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, viewMode: 'grid' })}
              className={`p-1.5 rounded-btn text-xs font-semibold transition-all cursor-pointer ${
                filters.viewMode === 'grid' ? 'bg-white text-pine shadow-sm' : 'text-graphite-500 hover:text-graphite-900'
              }`}
              title={dictionary.catalog.viewGrid}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, viewMode: 'table' })}
              className={`p-1.5 rounded-btn text-xs font-semibold transition-all cursor-pointer ${
                filters.viewMode === 'table' ? 'bg-white text-pine shadow-sm' : 'text-graphite-500 hover:text-graphite-900'
              }`}
              title={dictionary.catalog.viewTable}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reset Action */}
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-graphite-100 hover:bg-graphite-200 text-graphite-700 transition-colors cursor-pointer font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>
                {dictionary.catalog.resetFilters} ({activeFiltersCount})
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
