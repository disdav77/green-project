'use client';

import React, { useState, useEffect } from 'react';
import { Unit, UnitStatus, Lead, Project, PromoBanner, ConstructionProgress } from '@/types/database';
import { fetchLeads } from '@/lib/supabaseClient';
import { useApp } from '@/context/AppContext';
import {
  Lock,
  RefreshCw,
  CheckCircle,
  Home,
  Building2,
  Megaphone,
  Inbox,
  LogOut,
  HardHat,
  Settings,
} from 'lucide-react';
import { AdminUnitsTab } from './AdminUnitsTab';
import { AdminProjectsTab } from './AdminProjectsTab';
import { AdminBannersTab } from './AdminBannersTab';
import { AdminLeadsTab } from './AdminLeadsTab';
import { AdminProgressTab } from './AdminProgressTab';
import { AdminSettingsTab } from './AdminSettingsTab';

export function AdminDashboard() {
  const {
    units,
    projects,
    banners,
    progress,
    refreshData,
    addUnit,
    updateUnitStatus,
    updateUnitPrice,
    deleteUnit,
    addProject,
    updateProject,
    deleteProject,
    addBanner,
    updateBanner,
    addProgress,
    deleteProgress,
    resetToDefaults,
  } = useApp();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'inventory' | 'projects' | 'progress' | 'banners' | 'leads' | 'settings'>('inventory');

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

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      refreshData();
      const loadedLeads = await fetchLeads();
      setLeads(loadedLeads);
    } catch (err) {
      console.error('Failed to load leads', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
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
      showSuccess('Статус квартиры успешно обновлен');
    }
  };

  const handlePriceChange = async (unitId: string, newPriceStr: string) => {
    const num = parseInt(newPriceStr.replace(/\D/g, ''), 10);
    if (!isNaN(num) && num > 0) {
      const ok = await updateUnitPrice(unitId, num);
      if (ok) {
        showSuccess('Цена квартиры сохранена');
      }
    }
  };

  const handleAddUnit = async (newUnit: Unit) => {
    const ok = await addUnit(newUnit);
    if (ok) {
      showSuccess('Квартира успешно добавлена в каталог');
    }
  };

  const handleDeleteUnit = async (unitId: string) => {
    const ok = await deleteUnit(unitId);
    if (ok) {
      showSuccess('Квартира удалена');
    }
  };

  const handleAddProject = async (newProject: Project) => {
    const ok = await addProject(newProject);
    if (ok) {
      showSuccess('Девелоперский проект успешно создан');
    }
  };

  const handleUpdateProject = async (updatedProject: Project) => {
    const ok = await updateProject(updatedProject);
    if (ok) {
      showSuccess('Параметры проекта обновлены');
    }
  };

  const handleDeleteProject = async (id: string) => {
    const ok = await deleteProject(id);
    if (ok) {
      showSuccess('Проект удален из каталога');
    }
  };

  const handleUpdateBanner = async (banner: PromoBanner) => {
    const ok = await updateBanner(banner);
    if (ok) {
      showSuccess('Баннер сохранен');
    }
  };

  const handleAddBanner = async (banner: PromoBanner) => {
    const ok = await addBanner(banner);
    if (ok) {
      showSuccess('Новый баннер добавлен');
    }
  };

  const handleAddProgress = async (item: ConstructionProgress) => {
    const ok = await addProgress(item);
    if (ok) {
      showSuccess('Отчет о ходе строительства опубликован');
    }
    return ok;
  };

  const handleDeleteProgress = async (id: string) => {
    const ok = await deleteProgress(id);
    if (ok) {
      showSuccess('Отчет удален');
    }
    return ok;
  };

  const handleResetDefaults = () => {
    resetToDefaults();
    showSuccess('Каталог сброшен к заводским проектам и планировкам');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-6 bg-white rounded-card border border-graphite-200 shadow-card">
        <div className="flex items-center justify-center w-12 h-12 rounded-btn bg-pine-50 text-pine mx-auto mb-4">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-center text-graphite-900 mb-1">
          Вход в CMS-панель Green Project
        </h2>
        <p className="text-xs text-center text-graphite-500 mb-6">
          Логин: <strong className="text-graphite-800">admin</strong> • Пароль: <strong className="text-graphite-800">green2026</strong> (или admin)
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
    totalProgress: progress.length,
    totalBanners: banners.length,
    totalLeads: leads.length,
  };

  return (
    <div className="space-y-6">
      {/* Top Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-card bg-white border border-graphite-200 shadow-subtle">
          <span className="text-[11px] text-graphite-500 font-semibold uppercase">Квартир в базе</span>
          <div className="text-2xl font-heading font-black text-graphite-900 mt-1">{counts.totalUnits}</div>
        </div>
        <div className="p-4 rounded-card bg-emerald-50/60 border border-emerald-200 shadow-subtle">
          <span className="text-[11px] text-emerald-800 font-semibold uppercase">Проектов</span>
          <div className="text-2xl font-heading font-black text-emerald-900 mt-1">{counts.totalProjects}</div>
        </div>
        <div className="p-4 rounded-card bg-sky-50/60 border border-sky-200 shadow-subtle">
          <span className="text-[11px] text-sky-800 font-semibold uppercase">Ход стройки</span>
          <div className="text-2xl font-heading font-black text-sky-900 mt-1">{counts.totalProgress}</div>
        </div>
        <div className="p-4 rounded-card bg-amber-50/60 border border-amber-200 shadow-subtle">
          <span className="text-[11px] text-amber-800 font-semibold uppercase">Баннеров</span>
          <div className="text-2xl font-heading font-black text-amber-900 mt-1">{counts.totalBanners}</div>
        </div>
        <div className="col-span-2 sm:col-span-1 p-4 rounded-card bg-pine-50/60 border border-pine-200 shadow-subtle">
          <span className="text-[11px] text-pine font-semibold uppercase">Заявок</span>
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
            <span>Проекты ({projects.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('progress')}
            className={`px-3.5 py-1.5 rounded-btn text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'progress' ? 'bg-white text-pine shadow-sm' : 'text-graphite-600 hover:text-graphite-900'
            }`}
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>Ход стройки ({progress.length})</span>
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
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-1.5 rounded-btn text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'settings' ? 'bg-white text-pine shadow-sm' : 'text-graphite-600 hover:text-graphite-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Настройки</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadLeads}
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
          onDeleteProject={handleDeleteProject}
        />
      )}

      {activeTab === 'progress' && (
        <AdminProgressTab
          progressList={progress}
          projects={projects}
          onAddProgress={handleAddProgress}
          onDeleteProgress={handleDeleteProgress}
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

      {activeTab === 'settings' && (
        <AdminSettingsTab onResetDefaults={handleResetDefaults} />
      )}
    </div>
  );
}
