'use client';

import React, { useState } from 'react';
import { PromoBanner } from '@/types/database';
import { Megaphone, CheckCircle2, Save } from 'lucide-react';

interface AdminBannersTabProps {
  banners: PromoBanner[];
  onUpdateBanner: (banner: PromoBanner) => Promise<void>;
  onAddBanner: (banner: PromoBanner) => Promise<void>;
}

export function AdminBannersTab({
  banners,
  onUpdateBanner,
  onAddBanner,
}: AdminBannersTabProps) {
  const [editingBanners, setEditingBanners] = useState<PromoBanner[]>(banners);
  const [savedBannerId, setSavedBannerId] = useState<string | null>(null);

  const handleFieldChange = (id: string, field: keyof PromoBanner, value: any) => {
    setEditingBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const handleSave = async (banner: PromoBanner) => {
    await onUpdateBanner(banner);
    setSavedBannerId(banner.id);
    setTimeout(() => setSavedBannerId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-graphite-900 uppercase tracking-wider flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-pine" />
            <span>Управление рекламными баннерами и офферами ({editingBanners.length})</span>
          </h3>
          <p className="text-xs text-graphite-500 mt-0.5">
            Редактируйте тексты, бейджи, кнопки захвата и целевые ссылки на сайте
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {editingBanners.map((banner) => (
          <div
            key={banner.id}
            className="p-5 bg-white rounded-card border border-graphite-200 shadow-subtle space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-graphite-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-pine-50 text-pine border border-pine-200">
                  {banner.location === 'hero'
                    ? 'Главный экран (Hero)'
                    : banner.location === 'catalog'
                    ? 'Каталог квартир'
                    : 'Ипотечный центр'}
                </span>
                <span className="text-xs font-bold text-graphite-900">{banner.id}</span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-graphite-700">
                <input
                  type="checkbox"
                  checked={banner.active}
                  onChange={(e) => handleFieldChange(banner.id, 'active', e.target.checked)}
                  className="rounded text-pine focus:ring-pine"
                />
                <span>Баннер активен на сайте</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-graphite-600 mb-1">
                  Текст бейджа
                </label>
                <input
                  type="text"
                  value={banner.badge}
                  onChange={(e) => handleFieldChange(banner.id, 'badge', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-bold text-graphite-600 mb-1">
                  Главный заголовок оффера
                </label>
                <input
                  type="text"
                  value={banner.title}
                  onChange={(e) => handleFieldChange(banner.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold rounded border border-graphite-300 bg-white"
                />
              </div>
              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold text-graphite-600 mb-1">
                  Подзаголовок / Описание предложения
                </label>
                <input
                  type="text"
                  value={banner.subtitle}
                  onChange={(e) => handleFieldChange(banner.id, 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-graphite-600 mb-1">
                  Текст на кнопке (CTA)
                </label>
                <input
                  type="text"
                  value={banner.buttonText}
                  onChange={(e) => handleFieldChange(banner.id, 'buttonText', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-graphite-600 mb-1">
                  Ссылка перехода
                </label>
                <input
                  type="text"
                  value={banner.buttonLink}
                  onChange={(e) => handleFieldChange(banner.id, 'buttonLink', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
                />
              </div>
              <div className="flex items-end justify-end">
                <button
                  type="button"
                  onClick={() => handleSave(banner)}
                  className="w-full sm:w-auto px-5 py-2 rounded-btn bg-pine text-white text-xs font-bold hover:bg-pine-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {savedBannerId === banner.id ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>Сохранено!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Сохранить изменения</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
