'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ConstructionProgress, Project } from '@/types/database';
import { Plus, Trash2, Calendar, CheckCircle2, HardHat } from 'lucide-react';

interface AdminProgressTabProps {
  progressList: ConstructionProgress[];
  projects: Project[];
  onAddProgress: (item: ConstructionProgress) => Promise<boolean>;
  onDeleteProgress: (id: string) => Promise<boolean>;
}

export function AdminProgressTab({
  progressList,
  projects,
  onAddProgress,
  onDeleteProgress,
}: AdminProgressTabProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [projectId, setProjectId] = useState(projects[0]?.id || 'avan');
  const [date, setDate] = useState('Сентябрь 2026');
  const [readinessPercent, setReadinessPercent] = useState(65);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('/images/projects/avan_perspective.jpg');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const proj = projects.find((p) => p.id === projectId);
    const newProgress: ConstructionProgress = {
      id: `prog-${Date.now()}`,
      projectId,
      projectName: proj?.name || 'Green Project',
      date,
      readinessPercent: Number(readinessPercent),
      title,
      description,
      imageUrl,
    };

    await onAddProgress(newProgress);
    setShowAddForm(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-graphite-900 uppercase tracking-wider flex items-center gap-2">
            <HardHat className="w-4 h-4 text-pine" />
            <span>Ход строительства проектов ({progressList.length} отчетов)</span>
          </h3>
          <p className="text-xs text-graphite-500 mt-0.5">
            Публикуйте ежемесячные фотоотчеты и процент готовности по объектам
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-pine text-white text-xs font-bold hover:bg-pine-800 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Скрыть форму' : 'Добавить фотоотчет'}</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="p-5 bg-limestone rounded-card border border-graphite-200 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-pine">
            Новая публикация хода строительства
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Проект</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Отчетный период / Дата</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                placeholder="Сентябрь 2026"
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">
                Общая строительная готовность (%): {readinessPercent}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={readinessPercent}
                onChange={(e) => setReadinessPercent(Number(e.target.value))}
                className="w-full accent-pine"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Заголовок этапа</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Например: Завершен монолит 14 этажа, начато остекление"
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Фотография площадки</label>
              <select
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              >
                <option value="/images/projects/avan_perspective.jpg">Аван — Перспектива фасада</option>
                <option value="/images/projects/avan_ground.jpg">Аван — Стилобат и благоустройство</option>
                <option value="/images/projects/avan_facade.jpg">Аван — Архитектурный фасад</option>
                <option value="/images/projects/hero_exterior_1.jpg">Грин Норк — Монолитный каркас</option>
                <option value="/images/projects/hero_exterior_2.jpg">Таунхаусы — Коттеджная линия</option>
              </select>
            </div>

            <div className="lg:col-span-3">
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Подробное описание работ</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                placeholder="Выполнены монолитные работы по возведению колонн и перекрытий. Производится монтаж двухкамерных энергоэффективных стеклопакетов Schuco..."
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-btn bg-white border border-graphite-300 text-xs font-semibold text-graphite-700 hover:bg-graphite-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-btn bg-pine text-white text-xs font-bold hover:bg-pine-800 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Опубликовать отчет</span>
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {progressList.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-card border border-graphite-200 overflow-hidden shadow-subtle flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-graphite-100">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-graphite-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-bold">
                  {item.projectName}
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-emerald-600 text-white px-2 py-0.5 rounded text-[11px] font-bold">
                  Готовность {item.readinessPercent}%
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-graphite-500">
                  <Calendar className="w-3.5 h-3.5 text-pine" />
                  <span>{item.date}</span>
                </div>
                <h4 className="text-sm font-bold text-graphite-900 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-graphite-600 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-graphite-100 flex items-center justify-between">
              <span className="text-[11px] text-graphite-400">ID: {item.id}</span>
              <button
                type="button"
                onClick={() => onDeleteProgress(item.id)}
                className="text-xs text-red-600 hover:text-red-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Удалить</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
