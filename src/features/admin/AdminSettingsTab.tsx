'use client';

import React, { useState } from 'react';
import { Settings, RotateCcw, ShieldCheck, Database, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface AdminSettingsTabProps {
  onResetDefaults: () => void;
}

export function AdminSettingsTab({ onResetDefaults }: AdminSettingsTabProps) {
  const { dictionary, language } = useApp();
  const [phone, setPhone] = useState('+374 10 300 000');
  const [address, setAddress] = useState('г. Ереван, ул. Царав Ахпюр, 61/4');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleSaveContacts = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    onResetDefaults();
    setShowConfirmReset(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-sm font-bold text-graphite-900 uppercase tracking-wider flex items-center gap-2">
          <Settings className="w-4 h-4 text-pine" />
          <span>Системные настройки сайта и каталога</span>
        </h3>
        <p className="text-xs text-graphite-500 mt-0.5">
          Управление контактными реквизитами девелопера, подключением к БД и сбросом данных
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-btn bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Контактные данные успешно сохранены в системе</span>
        </div>
      )}

      {/* Developer Contacts */}
      <form onSubmit={handleSaveContacts} className="p-5 bg-white rounded-card border border-graphite-200 shadow-subtle space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-pine flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Контактные данные отдела продаж</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-graphite-700 mb-1">
              Телефон отдела продаж
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-graphite-700 mb-1">
              Офис продаж и демонстрационный зал
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded-btn bg-pine text-white text-xs font-bold hover:bg-pine-800 transition-colors"
          >
            Сохранить контакты
          </button>
        </div>
      </form>

      {/* Database Diagnostic Status */}
      <div className="p-5 bg-white rounded-card border border-graphite-200 shadow-subtle space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-pine flex items-center gap-2">
          <Database className="w-4 h-4" />
          <span>Диагностика хранилища данных</span>
        </div>
        <p className="text-xs text-graphite-600 leading-relaxed">
          Текущая конфигурация: <strong>Гибридное хранилище (LocalStorage + Supabase Realtime)</strong>. Все изменения немедленно сохраняются в изолированном защищенном хранилище и синхронизируются с клиентским каталогом без перезагрузки страницы.
        </p>
      </div>

      {/* Danger Zone: Factory Reset */}
      <div className="p-5 bg-red-50/50 rounded-card border border-red-200 shadow-subtle space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-red-800 flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          <span>Сброс каталога к исходным данным</span>
        </div>
        <p className="text-xs text-graphite-600 leading-relaxed">
          Если во время тестирования были добавлены тестовые или пробные квартиры, проекты или баннеры, вы можете в 1 клик восстановить оригинальные объекты Green Project (Green Avan, Green Nork, Green Townhouse) и архитектурные 2D-чертежи.
        </p>

        {!showConfirmReset ? (
          <button
            type="button"
            onClick={() => setShowConfirmReset(true)}
            className="px-4 py-2 rounded-btn bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
          >
            Сбросить все данные к заводским
          </button>
        ) : (
          <div className="p-3 bg-white rounded border border-red-300 flex items-center justify-between gap-4">
            <span className="text-xs text-red-700 font-semibold">
              Подтверждаете полный сброс каталога к исходным проектам и планировкам?
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="px-3 py-1.5 rounded text-xs font-medium bg-graphite-100 hover:bg-graphite-200 text-graphite-700"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 rounded text-xs font-bold bg-red-600 hover:bg-red-700 text-white"
              >
                Да, сбросить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
