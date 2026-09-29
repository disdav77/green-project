'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types/database';
import { formatNumber } from '@/lib/currency';
import { Plus, Building2, MapPin, Calendar, CheckCircle2, Trash2 } from 'lucide-react';

interface AdminProjectsTabProps {
  projects: Project[];
  onAddProject: (project: Project) => Promise<void>;
  onUpdateProject: (project: Project) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
}

export function AdminProjectsTab({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}: AdminProjectsTabProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Бизнес-класс');
  const [district, setDistrict] = useState('Аван');
  const [address, setAddress] = useState('');
  const [priceFromAMD, setPriceFromAMD] = useState(15000000);
  const [deliveryDate, setDeliveryDate] = useState('IV кв. 2026');
  const [readiness, setReadiness] = useState('50%');
  const [floorsCount, setFloorsCount] = useState(12);
  const [timeToCenter, setTimeToCenter] = useState('12 мин');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/images/hero-complex.png');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = slug.trim().toLowerCase() || name.trim().toLowerCase().replace(/\s+/g, '-');
    const newProject: Project = {
      id: generatedSlug,
      slug: generatedSlug,
      name,
      district,
      address,
      category,
      floorsCount: Number(floorsCount),
      totalUnits: 120,
      readiness,
      deliveryDate,
      priceFromAMD: Number(priceFromAMD),
      timeToCenter,
      image,
      description,
      acousticComfort: '55 дБ',
      seismicScore: '9.0 баллов',
      concreteGrade: 'B25/B30',
      taxRefundEligible: true,
      taxRefundType: 'phased',
      coordinates: { lat: 40.2185, lng: 44.5714 },
      features: [
        'Сейсмостойкость 9 баллов (монолит B25/B30)',
        'Межквартирная шумоизоляция 55 дБ',
        'Подземный двухуровневый паркинг с лифтом Otis',
        'Двор без машин и ландшафтный эко-парк',
      ],
    };

    await onAddProject(newProject);
    setShowAddForm(false);
    setName('');
    setSlug('');
    setAddress('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-graphite-900 uppercase tracking-wider">
            Управление девелоперскими проектами ({projects.length} проектов)
          </h3>
          <p className="text-xs text-graphite-500 mt-0.5">
            Добавляйте и редактируйте жилые проекты и коттеджные кварталы
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-pine text-white text-xs font-bold hover:bg-pine-800 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Скрыть форму' : 'Добавить проект'}</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="p-5 bg-limestone rounded-card border border-graphite-200 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-pine">
            Новый девелоперский проект
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Название проекта</label>
              <input
                type="text"
                placeholder="Например: Green Avan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">URL-идентификатор (slug)</label>
              <input
                type="text"
                placeholder="avan, nork, townhouse"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Класс проекта</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              >
                <option value="Бизнес-класс">Бизнес-класс</option>
                <option value="Комфорт-плюс">Комфорт-плюс</option>
                <option value="Премиум">Премиум</option>
                <option value="Эко-квартал">Эко-квартал</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Район / Локация</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Точный адрес</label>
              <input
                type="text"
                placeholder="ул. Бабаджаняна, 42"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Минимальная цена (֏)</label>
              <input
                type="number"
                step="500000"
                value={priceFromAMD}
                onChange={(e) => setPriceFromAMD(Number(e.target.value))}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Срок сдачи</label>
              <input
                type="text"
                placeholder="IV кв. 2026"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Готовность (%)</label>
              <input
                type="text"
                placeholder="65%"
                value={readiness}
                onChange={(e) => setReadiness(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Этажность</label>
              <input
                type="number"
                min="1"
                max="30"
                value={floorsCount}
                onChange={(e) => setFloorsCount(Number(e.target.value))}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">До центра города</label>
              <input
                type="text"
                placeholder="12 мин"
                value={timeToCenter}
                onChange={(e) => setTimeToCenter(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Фотография фасада</label>
              <select
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              >
                <option value="/images/hero-complex.png">Комплекс (hero-complex.png)</option>
                <option value="/images/projects/avan_facade.jpg">Аван Фасад (avan_facade.jpg)</option>
                <option value="/images/projects/avan_perspective.jpg">Аван Перспектива (avan_perspective.jpg)</option>
                <option value="/images/projects/hero_exterior_1.jpg">Экстерьер 1 (hero_exterior_1.jpg)</option>
                <option value="/images/projects/hero_exterior_2.jpg">Экстерьер 2 (hero_exterior_2.jpg)</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Краткое описание</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={2}
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
                placeholder="Флагманский проект в экологически чистом районе с видами на Арарат..."
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
              <span>Создать проект</span>
            </button>
          </div>
        </form>
      )}

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-5 bg-white rounded-card border border-graphite-200 shadow-subtle space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 w-full bg-graphite-100 rounded-btn overflow-hidden mb-3">
                <Image
                  src={proj.image}
                  alt={proj.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-graphite-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  {proj.category}
                </div>
                <div className="absolute bottom-2 right-2 bg-pine text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  Срок: {proj.deliveryDate}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-graphite-900">{proj.name}</h4>
                  <span className="text-xs font-bold text-pine">{proj.readiness}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-graphite-500">
                  <MapPin className="w-3.5 h-3.5 text-brass" />
                  <span>{proj.district}, {proj.address}</span>
                </div>
                <p className="text-xs text-graphite-600 line-clamp-2 mt-2">
                  {proj.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-graphite-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-graphite-400 block text-[11px]">Цена от:</span>
                  <strong className="text-graphite-900 font-bold">{formatNumber(proj.priceFromAMD)} ֏</strong>
                </div>
                <div>
                  <span className="text-graphite-400 block text-[11px]">Этажей:</span>
                  <strong className="text-graphite-900">{proj.floorsCount} эт.</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-graphite-100 flex items-center justify-between">
              <span className="text-[11px] text-graphite-400">ID: {proj.id}</span>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Удалить проект "${proj.name}"?`)) {
                    onDeleteProject(proj.id);
                  }
                }}
                className="text-xs text-red-600 hover:text-red-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Удалить проект</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
