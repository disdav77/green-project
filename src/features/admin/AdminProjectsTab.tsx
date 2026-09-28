'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types/database';
import { formatNumber } from '@/lib/currency';
import { Plus, Building2, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

interface AdminProjectsTabProps {
  projects: Project[];
  onAddProject: (project: Project) => Promise<void>;
  onUpdateProject: (project: Project) => Promise<void>;
}

export function AdminProjectsTab({
  projects,
  onAddProject,
  onUpdateProject,
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
            Управление девелоперскими проектами ({projects.length} ЖК)
          </h3>
          <p className="text-xs text-graphite-500 mt-0.5">
            Добавляйте и редактируйте жилые комплексы и таунхаусы
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-pine text-white text-xs font-bold hover:bg-pine-800 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Скрыть форму' : 'Добавить проект (ЖК)'}</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="p-5 bg-limestone rounded-card border border-graphite-200 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-pine">
            Новый жилой комплекс / проект
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Название проекта</label>
              <input
                type="text"
                placeholder="Например: Green Arabkir"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                }}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">URL-идентификатор (slug)</label>
              <input
                type="text"
                placeholder="arabkir"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Категория / Класс</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              >
                <option value="Бизнес-класс">Бизнес-класс</option>
                <option value="Премиум-класс">Премиум-класс</option>
                <option value="Комфорт-плюс">Комфорт-плюс</option>
                <option value="Клубный квартал">Клубный квартал</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Район</label>
              <input
                type="text"
                placeholder="Арабкир, Аван, Нор-Норк"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Адрес объекта</label>
              <input
                type="text"
                placeholder="г. Ереван, ул. Комитаса 24"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Цена «от» в драмах (֏)</label>
              <input
                type="number"
                step="100000"
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
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Готовность</label>
              <input
                type="text"
                placeholder="55%"
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
                min="2"
                max="30"
                value={floorsCount}
                onChange={(e) => setFloorsCount(Number(e.target.value))}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Время до центра</label>
              <input
                type="text"
                placeholder="10 мин"
                value={timeToCenter}
                onChange={(e) => setTimeToCenter(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Изображение проекта</label>
              <select
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              >
                <option value="/images/hero-complex.png">Флагманский фасад (hero-complex.png)</option>
                <option value="/images/apt-1.png">Интерьерный рендер (apt-1.png)</option>
                <option value="/images/apt-2.png">Архитектурный ракурс (apt-2.png)</option>
              </select>
            </div>
            <div className="lg:col-span-3">
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Описание проекта</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Краткое архитектурное описание жилого комплекса..."
                required
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
              <span>Создать проект</span>
            </button>
          </div>
        </form>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white rounded-card border border-graphite-200 overflow-hidden shadow-subtle flex flex-col justify-between">
            <div>
              <div className="relative h-44 w-full bg-limestone">
                <Image
                  src={proj.image}
                  alt={proj.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-pine text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {proj.category}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="text-base font-bold text-graphite-900">{proj.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-graphite-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-brass" />
                    <span>{proj.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-limestone-alt border border-graphite-100">
                    <span className="text-[10px] text-graphite-400 block">От</span>
                    <strong className="text-pine font-bold">{formatNumber(proj.priceFromAMD)} ֏</strong>
                  </div>
                  <div className="p-2 rounded bg-limestone-alt border border-graphite-100">
                    <span className="text-[10px] text-graphite-400 block">Сдача</span>
                    <strong className="text-graphite-800 font-bold">{proj.deliveryDate}</strong>
                  </div>
                  <div className="p-2 rounded bg-limestone-alt border border-graphite-100">
                    <span className="text-[10px] text-graphite-400 block">Готовность</span>
                    <strong className="text-emerald-700 font-bold">{proj.readiness}</strong>
                  </div>
                  <div className="p-2 rounded bg-limestone-alt border border-graphite-100">
                    <span className="text-[10px] text-graphite-400 block">Этажей</span>
                    <strong className="text-graphite-800 font-bold">{proj.floorsCount}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <a
                href={`/projects/${proj.slug}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-btn bg-limestone hover:bg-limestone-alt border border-graphite-200 text-xs font-bold text-graphite-800 text-center block transition-colors"
              >
                Открыть страницу проекта →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
