'use client';

import React, { useState, useEffect } from 'react';
import { Unit, UnitStatus, Lead, Project, PromoBanner } from '@/types/database';
import {
  fetchProjects,
  addProject,
  updateProject,
  fetchUnits,
  addUnit,
  deleteUnit,
  updateUnitStatus,
  updateUnitPrice,
  fetchBanners,
  updateBanner,
  addBanner,
  fetchLeads,
} from '@/lib/supabaseClient';
import { Lock, RefreshCw, CheckCircle, Home, Building2, Megaphone, Inbox, LogOut } from 'lucide-react';
import { AdminUnitsTab } from './AdminUnitsTab';
import { AdminProjectsTab } from './AdminProjectsTab';
import { AdminBannersTab } from './AdminBannersTab';
import { AdminLeadsTab } from './AdminLeadsTab';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'inventory' | 'projects' | 'banners' | 'leads'>('inventory');

  const [projects, setProjects] = useState<Project[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [banners, setBanners] = useState<PromoBanner[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Check existing session on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/admin/auth');
        if (res.ok) {
          setIsAuthenticated(true);
        }
      } catch {
        // Not authenticated
      }
    }
    checkSession();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [loadedProjects, loadedUnits, loadedBanners, loadedLeads] = await Promise.all([
        fetchProjects(),
        fetchUnits(),
        fetchBanners(),
        fetchLeads(),
      ]);
      setProjects(loadedProjects);
      setUnits(loadedUnits);
      setBanners(loadedBanners);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPasswordInput('');
        setAuthError('');
      } else {
        setAuthError(data.error || 'Неверный логин или пароль');
      }
    } catch {
      setAuthError('Ошибка сети при авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } finally {
      setIsAuthenticated(false);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  const handleStatusChange = async (unitId: string, newStatus: UnitStatus) => {
    const ok = await updateUnitStatus(unitId, newStatus);
    if (ok) {
      setUnits((prev) => prev.map((u) => (u.id === unitId ? { ...u, status: newStatus } : u)));
      showSuccess('Статус квартиры обновлен');
    }
  };

  const handlePriceChange = async (unitId: string, newPriceStr: string) => {
    const num = parseInt(newPriceStr.replace(/\D/g, ''), 10);
    if (!isNaN(num) && num > 0) {
      const ok = await updateUnitPrice(unitId, num);
      if (ok) {
        setUnits((prev) => prev.map((u) => (u.id === unitId ? { ...u, priceAMD: num } : u)));
        showSuccess('Цена квартиры сохранена');
      }
    }
  };

  const handleAddUnit = async (newUnit: Unit) => {
    const ok = await addUnit(newUnit);
    if (ok) {
      setUnits((prev) => [newUnit, ...prev]);
      showSuccess('Квартира успешно добавлена в каталог');
    }
  };

  const handleDeleteUnit = async (unitId: string) => {
    const ok = await deleteUnit(unitId);
    if (ok) {
      setUnits((prev) => prev.filter((u) => u.id !== unitId));
      showSuccess('Квартира удалена');
    }
  };

  const handleAddProject = async (newProject: Project) => {
    const ok = await addProject(newProject);
    if (ok) {
      setProjects((prev) => [newProject, ...prev]);
      showSuccess('Проект (ЖК) успешно создан');
    }
  };

  const handleUpdateProject = async (updatedProject: Project) => {
    const ok = await updateProject(updatedProject);
    if (ok) {
      setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
      showSuccess('Параметры проекта обновлены');
    }
  };

  const handleUpdateBanner = async (banner: PromoBanner) => {
    const ok = await updateBanner(banner);
    if (ok) {
      setBanners((prev) => prev.map((b) => (b.id === banner.id ? banner : b)));
      showSuccess('Баннер сохранен');
    }
  };

  const handleAddBanner = async (banner: PromoBanner) => {
    const ok = await addBanner(banner);
    if (ok) {
      setBanners((prev) => [banner, ...prev]);
      showSuccess('Новый баннер добавлен');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-6 bg-white rounded-card border border-graphite-200 shadow-card">
        <div className="flex items-center justify-center w-12 h-12 rounded-btn bg-pine-50 text-pine mx-auto mb-4">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-center text-graphite-900 mb-1">
          Вход для администрации
        </h2>
        <p className="text-xs text-center text-graphite-500 mb-6">
          Авторизация сотрудника Green Project (admin / admin)
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-graphite-700 mb-1">
              Логин
            </label>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Логин"
              required
              className="w-full px-3 py-2 text-sm rounded-input border border-graphite-300 focus:outline-none focus:border-pine focus:ring-1 focus:ring-pine"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-graphite-700 mb-1">
              Пароль
            </label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Пароль"
              required
              className="w-full px-3 py-2 text-sm rounded-input border border-graphite-300 focus:outline-none focus:border-pine focus:ring-1 focus:ring-pine"
            />
            {authError && <p className="text-xs text-red-600 mt-1.5">{authError}</p>}
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
    totalUnits: units.length,
    availableUnits: units.filter((u) => u.status === 'available').length,
    totalProjects: projects.length,
    totalBanners: banners.length,
    totalLeads: leads.length,
  };

  return (
    <div className="space-y-6">
      {/* Top Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-card bg-white border border-graphite-200 shadow-subtle">
          <span className="text-xs text-graphite-500 font-semibold uppercase">Квартир в базе</span>
          <div className="text-2xl font-heading font-black text-graphite-900 mt-1">{counts.totalUnits}</div>
        </div>
        <div className="p-4 rounded-card bg-emerald-50/60 border border-emerald-200 shadow-subtle">
          <span className="text-xs text-emerald-800 font-semibold uppercase">Проектов (ЖК)</span>
          <div className="text-2xl font-heading font-black text-emerald-900 mt-1">{counts.totalProjects}</div>
        </div>
        <div className="p-4 rounded-card bg-amber-50/60 border border-amber-200 shadow-subtle">
          <span className="text-xs text-amber-800 font-semibold uppercase">Промо-баннеров</span>
          <div className="text-2xl font-heading font-black text-amber-900 mt-1">{counts.totalBanners}</div>
        </div>
        <div className="p-4 rounded-card bg-pine-50/60 border border-pine-200 shadow-subtle">
          <span className="text-xs text-pine font-semibold uppercase">Входящих заявок</span>
          <div className="text-2xl font-heading font-black text-pine mt-1">{counts.totalLeads}</div>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="inline-flex rounded-btn bg-graphite-100 p-1 border border-graphite-200 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`px-3.5 py-1.5 rounded-btn text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'inventory' ? 'bg-white text-pine shadow-sm' : 'text-graphite-600 hover:text-graphite-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Квартиры ({units.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-1.5 rounded-btn text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'projects' ? 'bg-white text-pine shadow-sm' : 'text-graphite-600 hover:text-graphite-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Проекты / ЖК ({projects.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('banners')}
            className={`px-3.5 py-1.5 rounded-btn text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'banners' ? 'bg-white text-pine shadow-sm' : 'text-graphite-600 hover:text-graphite-900'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Баннеры ({banners.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`px-3.5 py-1.5 rounded-btn text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'leads' ? 'bg-white text-pine shadow-sm' : 'text-graphite-600 hover:text-graphite-900'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Заявки ({leads.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-white border border-graphite-200 text-xs font-semibold text-graphite-700 hover:bg-limestone transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Обновить данные</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-red-50 border border-red-200 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Выйти</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-3 rounded-btn bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tab Contents */}
      {activeTab === 'inventory' && (
        <AdminUnitsTab
          units={units}
          projects={projects}
          onStatusChange={handleStatusChange}
          onPriceChange={handlePriceChange}
          onAddUnit={handleAddUnit}
          onDeleteUnit={handleDeleteUnit}
        />
      )}

      {activeTab === 'projects' && (
        <AdminProjectsTab
          projects={projects}
          onAddProject={handleAddProject}
          onUpdateProject={handleUpdateProject}
        />
      )}

      {activeTab === 'banners' && (
        <AdminBannersTab
          banners={banners}
          onUpdateBanner={handleUpdateBanner}
          onAddBanner={handleAddBanner}
        />
      )}

      {activeTab === 'leads' && (
        <AdminLeadsTab leads={leads} />
      )}
    </div>
  );
}
