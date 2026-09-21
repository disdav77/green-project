'use client';

import React, { useState, useEffect } from 'react';
import { Unit, UnitStatus, Lead } from '@/types/database';
import { fetchUnits, updateUnitStatus, updateUnitPrice, fetchLeads } from '@/lib/supabaseClient';
import { initialProjects } from '@/lib/initialCatalog';
import { formatNumber } from '@/lib/currency';
import { Lock, RefreshCw, Phone, CheckCircle, Clock } from 'lucide-react';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'inventory' | 'leads'>('inventory');

  const [units, setUnits] = useState<Unit[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const loadedUnits = await fetchUnits();
      const loadedLeads = await fetchLeads();
      setUnits(loadedUnits);
      setLeads(loadedLeads);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'green2026' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Неверный пароль администратора');
    }
  };

  const handleStatusChange = async (unitId: string, newStatus: UnitStatus) => {
    const ok = await updateUnitStatus(unitId, newStatus);
    if (ok) {
      setUnits(units.map((u) => (u.id === unitId ? { ...u, status: newStatus } : u)));
      showSuccess('Статус квартиры обновлен');
    }
  };

  const handlePriceChange = async (unitId: string, newPriceStr: string) => {
    const num = parseInt(newPriceStr.replace(/\D/g, ''), 10);
    if (!isNaN(num) && num > 0) {
      const ok = await updateUnitPrice(unitId, num);
      if (ok) {
        setUnits(units.map((u) => (u.id === unitId ? { ...u, priceAMD: num } : u)));
        showSuccess('Цена квартиры сохранена');
      }
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-6 bg-white rounded-card border border-graphite-200 shadow-card">
        <div className="flex items-center justify-center w-12 h-12 rounded-btn bg-pine-50 text-pine mx-auto mb-4">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-center text-graphite-900 mb-1">
          Вход в панель управления CMS
        </h2>
        <p className="text-xs text-center text-graphite-500 mb-6">
          Введите пароль администратора Green Project
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Пароль администратора"
              className="w-full px-3 py-2 text-sm rounded-input border border-graphite-300 focus:outline-none focus:border-pine focus:ring-1 focus:ring-pine"
            />
            {authError && <p className="text-xs text-red-600 mt-1">{authError}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-btn bg-pine text-white text-xs font-bold hover:bg-pine-800 transition-colors cursor-pointer"
          >
            Войти в систему
          </button>
        </form>
      </div>
    );
  }

  const counts = {
    total: units.length,
    available: units.filter((u) => u.status === 'available').length,
    reserved: units.filter((u) => u.status === 'reserved').length,
    sold: units.filter((u) => u.status === 'sold').length,
  };

  return (
    <div className="space-y-6">
      {/* Top Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-card bg-white border border-graphite-200 shadow-subtle">
          <span className="text-xs text-graphite-500 font-semibold uppercase">Всего лотов</span>
          <div className="text-2xl font-heading font-black text-graphite-900 mt-1">{counts.total}</div>
        </div>
        <div className="p-4 rounded-card bg-emerald-50/60 border border-emerald-200 shadow-subtle">
          <span className="text-xs text-emerald-800 font-semibold uppercase">В продаже</span>
          <div className="text-2xl font-heading font-black text-emerald-900 mt-1">{counts.available}</div>
        </div>
        <div className="p-4 rounded-card bg-amber-50/60 border border-amber-200 shadow-subtle">
          <span className="text-xs text-amber-800 font-semibold uppercase">Забронировано</span>
          <div className="text-2xl font-heading font-black text-amber-900 mt-1">{counts.reserved}</div>
        </div>
        <div className="p-4 rounded-card bg-graphite-100 border border-graphite-200 shadow-subtle">
          <span className="text-xs text-graphite-600 font-semibold uppercase">Продано</span>
          <div className="text-2xl font-heading font-black text-graphite-700 mt-1">{counts.sold}</div>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="inline-flex rounded-btn bg-graphite-100 p-1 border border-graphite-200">
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-1.5 rounded-btn text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'inventory' ? 'bg-white text-pine shadow-sm' : 'text-graphite-600'
            }`}
          >
            Управление квартирами ({units.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-1.5 rounded-btn text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'leads' ? 'bg-white text-pine shadow-sm' : 'text-graphite-600'
            }`}
          >
            Входящие заявки ({leads.length})
          </button>
        </div>

        <button
          type="button"
          onClick={loadData}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-white border border-graphite-200 text-xs font-semibold text-graphite-700 hover:bg-limestone transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Обновить данные</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-3 rounded-btn bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tab 1: Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-card border border-graphite-200 overflow-x-auto shadow-subtle">
          <table className="w-full text-left text-xs text-graphite-700">
            <thead className="bg-limestone-alt text-graphite-500 font-bold uppercase tracking-wider text-[11px] border-b border-graphite-200">
              <tr>
                <th className="py-3 px-4">Комплекс / №</th>
                <th className="py-3 px-4">Комнат</th>
                <th className="py-3 px-4">Площадь</th>
                <th className="py-3 px-4">Этаж</th>
                <th className="py-3 px-4">Цена в драмах (֏)</th>
                <th className="py-3 px-4">Статус лота</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-100">
              {units.map((unit) => {
                const project = initialProjects.find((p) => p.id === unit.projectId);
                return (
                  <tr key={unit.id} className="hover:bg-limestone/40">
                    <td className="py-3 px-4 font-semibold text-graphite-900">
                      <div>{project?.name}</div>
                      <div className="text-[11px] text-graphite-500 font-normal">Кв. {unit.unitNumber}</div>
                    </td>
                    <td className="py-3 px-4">{unit.roomsLabel}</td>
                    <td className="py-3 px-4 font-bold">{unit.areaSqm} м²</td>
                    <td className="py-3 px-4">{unit.floorNumber}</td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        defaultValue={formatNumber(unit.priceAMD)}
                        onBlur={(e) => handlePriceChange(unit.id, e.target.value)}
                        className="w-32 px-2 py-1 text-xs font-bold rounded border border-graphite-300 focus:outline-none focus:border-pine"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={unit.status}
                        onChange={(e) => handleStatusChange(unit.id, e.target.value as UnitStatus)}
                        className={`px-2 py-1 rounded text-xs font-bold border ${
                          unit.status === 'available'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : unit.status === 'reserved'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-graphite-100 text-graphite-600 border-graphite-200'
                        }`}
                      >
                        <option value="available">Свободна</option>
                        <option value="reserved">Бронь</option>
                        <option value="sold">Продана</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Leads Table */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-card border border-graphite-200 overflow-x-auto shadow-subtle">
          {leads.length === 0 ? (
            <div className="p-8 text-center text-graphite-500 text-xs">
              Входящих заявок на консультацию пока нет.
            </div>
          ) : (
            <table className="w-full text-left text-xs text-graphite-700">
              <thead className="bg-limestone-alt text-graphite-500 font-bold uppercase tracking-wider text-[11px] border-b border-graphite-200">
                <tr>
                  <th className="py-3 px-4">Дата и время</th>
                  <th className="py-3 px-4">Клиент</th>
                  <th className="py-3 px-4">Телефон</th>
                  <th className="py-3 px-4">Интересующий проект</th>
                  <th className="py-3 px-4">Удобное время</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-limestone/40">
                    <td className="py-3 px-4 text-graphite-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-graphite-400" />
                        <span>{new Date(lead.createdAt).toLocaleString('ru-RU')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-graphite-900">{lead.name}</td>
                    <td className="py-3 px-4">
                      <a href={`tel:${lead.phone}`} className="text-pine font-semibold hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3 text-brass" />
                        <span>{lead.phone}</span>
                      </a>
                    </td>
                    <td className="py-3 px-4 uppercase text-[11px] font-semibold text-graphite-700">
                      {lead.preferredProject}
                    </td>
                    <td className="py-3 px-4 text-graphite-600">{lead.preferredTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
