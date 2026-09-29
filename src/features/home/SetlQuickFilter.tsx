'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Building2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/lib/currency';
import { getLocalizedProject } from '@/lib/catalogLocalization';

export function SetlQuickFilter() {
  const router = useRouter();
  const { dictionary, language, currency, units, projects } = useApp();

  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [selectedRooms, setSelectedRooms] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<number>(0);

  const localizedProjects = useMemo(() => {
    return projects.map((p) => getLocalizedProject(p, language));
  }, [projects, language]);

  const matchingUnitsCount = useMemo(() => {
    return units.filter((u) => {
      if (selectedProject !== 'all' && u.projectId !== selectedProject) return false;
      if (selectedRooms !== 'all') {
        const targetRooms = parseInt(selectedRooms, 10);
        if (targetRooms === 4 ? u.rooms < 4 : u.rooms !== targetRooms) return false;
      }
      if (selectedBudget > 0 && u.priceAMD > selectedBudget) return false;
      return true;
    }).length;
  }, [units, selectedProject, selectedRooms, selectedBudget]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedProject !== 'all') params.set('project', selectedProject);
    if (selectedRooms !== 'all') params.set('rooms', selectedRooms);
    if (selectedBudget > 0) params.set('maxPrice', selectedBudget.toString());

    const queryString = params.toString();
    router.push(`/apartments${queryString ? `?${queryString}` : ''}`);
  };

  const roomOptions = [
    { id: 'all', label: dictionary.quickFilter.allRooms },
    { id: '1', label: language === 'hy' ? '1 սենյակ' : language === 'en' ? '1-Bed / Studio' : '1к / Студия' },
    { id: '2', label: language === 'hy' ? '2 սենյակ' : language === 'en' ? '2-Bed' : '2-комн.' },
    { id: '3', label: language === 'hy' ? '3 սենյակ' : language === 'en' ? '3-Bed' : '3-комн.' },
    { id: '4', label: language === 'hy' ? '4+ / Թաունհաուս' : language === 'en' ? '4+ / Townhouse' : '4+ / Таунхаус' },
  ];

  const budgetOptions = [
    { value: 0, label: dictionary.quickFilter.anyBudget },
    { value: 20000000, label: `< ${formatPrice(20000000, currency)}` },
    { value: 35000000, label: `< ${formatPrice(35000000, currency)}` },
    { value: 55000000, label: `< ${formatPrice(55000000, currency)}` },
  ];

  return (
    <section className="setl-quick-filter-section">
      <div className="container">
        <form onSubmit={handleSearch} className="setl-quick-filter-card">
          <div className="setl-filter-header">
            <div className="setl-filter-title-group">
              <span className="setl-filter-kicker">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{dictionary.quickFilter.title}</span>
              </span>
              <p className="setl-filter-subtitle">{dictionary.quickFilter.subtitle}</p>
            </div>
            <div className="setl-filter-hint-pill">
              <span>{dictionary.quickFilter.taxRefundHint}</span>
            </div>
          </div>

          <div className="setl-filter-row">
            {/* Project Select */}
            <div className="setl-field-group">
              <label htmlFor="quick-project-select" className="setl-field-label">
                <Building2 className="w-3.5 h-3.5 text-brass" />
                <span>{dictionary.quickFilter.projectLabel}</span>
              </label>
              <select
                id="quick-project-select"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="setl-select-input"
              >
                <option value="all">{dictionary.quickFilter.allProjects} ({units.length})</option>
                {localizedProjects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.district})
                  </option>
                ))}
              </select>
            </div>

            {/* Rooms Chips */}
            <div className="setl-field-group setl-rooms-group">
              <label className="setl-field-label">
                <SlidersHorizontal className="w-3.5 h-3.5 text-brass" />
                <span>{dictionary.quickFilter.roomsLabel}</span>
              </label>
              <div className="setl-chips-wrap">
                {roomOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedRooms(opt.id)}
                    className={`setl-chip-btn ${selectedRooms === opt.id ? 'active' : ''}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Presets */}
            <div className="setl-field-group">
              <label htmlFor="quick-budget-select" className="setl-field-label">
                <span>{dictionary.quickFilter.budgetLabel}</span>
              </label>
              <select
                id="quick-budget-select"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(Number(e.target.value))}
                className="setl-select-input"
              >
                {budgetOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit CTA */}
            <div className="setl-submit-group">
              <button type="submit" className="setl-submit-btn">
                <Search className="w-4 h-4" />
                <span>
                  {dictionary.quickFilter.showUnits} ({matchingUnitsCount})
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
