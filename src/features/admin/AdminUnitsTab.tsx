'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Unit, Project, UnitStatus } from '@/types/database';
import { formatNumber } from '@/lib/currency';
import { Plus, Trash2, CheckCircle2, Eye, Layout } from 'lucide-react';

interface AdminUnitsTabProps {
  units: Unit[];
  projects: Project[];
  onStatusChange: (unitId: string, newStatus: UnitStatus) => Promise<void>;
  onPriceChange: (unitId: string, newPriceStr: string) => Promise<void>;
  onAddUnit: (unit: Unit) => Promise<void>;
  onDeleteUnit: (unitId: string) => Promise<void>;
}

const FLOOR_PLAN_PRESETS = [
  {
    path: '/images/plans/plan_studio_38.png',
    label: '2D Чертёж: Студия 38.0 м² (прихожая, ниша кухни, гостиная-спальня, балкон)',
    defaultRooms: 1,
    defaultArea: 38.0,
    defaultRoomsLabel: 'Студия',
  },
  {
    path: '/images/plans/plan_1k_42.png',
    label: '2D Чертёж: 1-комнатная 42.0 м² (холл, кухня-столовая, спальня, лоджия)',
    defaultRooms: 1,
    defaultArea: 42.0,
    defaultRoomsLabel: '1-комнатная квартира',
  },
  {
    path: '/images/plans/plan_2k_64.png',
    label: '2D Чертёж: 2-комнатная Евро 64.0 м² (кухня-гостиная 22 м², мастер-спальня)',
    defaultRooms: 2,
    defaultArea: 64.0,
    defaultRoomsLabel: '2-комнатная квартира (Евро)',
  },
  {
    path: '/images/plans/plan_3k_88.png',
    label: '2D Чертёж: 3-комнатная 88.5 м² (2 санузла, большая кухня, 2 спальни)',
    defaultRooms: 3,
    defaultArea: 88.5,
    defaultRoomsLabel: '3-комнатная квартира',
  },
  {
    path: '/images/plans/plan_penthouse_110.png',
    label: '2D Чертёж: Пентхаус 110.0 м² (терраса по периметру, мастер-сьют, спа-ванная)',
    defaultRooms: 4,
    defaultArea: 110.0,
    defaultRoomsLabel: 'Пентхаус с видовой террасой',
  },
  {
    path: '/images/plans/plan_townhouse_120.png',
    label: '2D Чертёж: Таунхаус 120.0 м² (2 уровня, каминная зона, 3 спальни, патио)',
    defaultRooms: 4,
    defaultArea: 120.0,
    defaultRoomsLabel: '2-уровневый Таунхаус',
  },
];

export function AdminUnitsTab({
  units,
  projects,
  onStatusChange,
  onPriceChange,
  onAddUnit,
  onDeleteUnit,
}: AdminUnitsTabProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProjectId, setNewProjectId] = useState(projects[0]?.id || 'avan');
  const [newUnitNumber, setNewUnitNumber] = useState('');
  const [newFloor, setNewFloor] = useState(4);
  const [newRooms, setNewRooms] = useState(2);
  const [newRoomsLabel, setNewRoomsLabel] = useState('2-комнатная квартира (Евро)');
  const [newArea, setNewArea] = useState(64.0);
  const [newPrice, setNewPrice] = useState(25600000);
  const [newStatus, setNewStatus] = useState<UnitStatus>('available');
  const [newImage, setNewImage] = useState('/images/plans/plan_2k_64.png');
  const [newCeiling, setNewCeiling] = useState(3.0);
  const [newBalcony, setNewBalcony] = useState(5.2);
  const [newViewDesc, setNewViewDesc] = useState('Панорамный вид на гору Арарат и парковую зону');

  const handlePresetSelect = (planPath: string) => {
    setNewImage(planPath);
    const preset = FLOOR_PLAN_PRESETS.find((p) => p.path === planPath);
    if (preset) {
      setNewRooms(preset.defaultRooms);
      setNewArea(preset.defaultArea);
      setNewRoomsLabel(preset.defaultRoomsLabel);
      // Reasonable base pricing approx 400,000 AMD/sqm
      setNewPrice(Math.round(preset.defaultArea * 400000));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProj = projects.find((p) => p.id === newProjectId);
    const newUnit: Unit = {
      id: `unit-${Date.now()}`,
      projectId: newProjectId,
      buildingId: `${newProjectId}-b1`,
      floorNumber: Number(newFloor),
      unitNumber: newUnitNumber || `${newFloor}01`,
      rooms: Number(newRooms),
      roomsLabel: newRoomsLabel,
      areaSqm: Number(newArea),
      priceAMD: Number(newPrice),
      status: newStatus,
      image: newImage, // Strictly 2D floor plan as 1st photo
      ceilingHeight: Number(newCeiling),
      balconyArea: Number(newBalcony),
      viewDescription: newViewDesc,
      features: ['Чистовая отделка White Box', 'Шумоизоляция 55 дБ', 'Панорамные окна Schuco'],
      exactAddress: selectedProj?.address || 'Ереван, Green Project',
    };

    await onAddUnit(newUnit);
    setShowAddModal(false);
    setNewUnitNumber('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-graphite-900 uppercase tracking-wider flex items-center gap-2">
            <Layout className="w-4 h-4 text-pine" />
            <span>Реестр квартир и планировок ({units.length} лотов)</span>
          </h3>
          <p className="text-xs text-graphite-500 mt-0.5">
            Первой фотографией каждого лота автоматически выступает 2D архитектурная планировка (чертеж)
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(!showAddModal)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-pine text-white text-xs font-bold hover:bg-pine-800 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showAddModal ? 'Скрыть форму' : 'Добавить квартиру'}</span>
        </button>
      </div>

      {showAddModal && (
        <form onSubmit={handleSubmit} className="p-5 bg-limestone rounded-card border border-graphite-200 space-y-5">
          <div className="text-xs font-bold uppercase tracking-wider text-pine flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Добавление новой квартиры (с обязательным 2D чертежом в качестве 1-го фото)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Проект</label>
              <select
                value={newProjectId}
                onChange={(e) => setNewProjectId(e.target.value)}
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
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Номер квартиры</label>
              <input
                type="text"
                placeholder="Например: 42"
                value={newUnitNumber}
                onChange={(e) => setNewUnitNumber(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Этаж</label>
              <input
                type="number"
                min="1"
                max="25"
                value={newFloor}
                onChange={(e) => setNewFloor(Number(e.target.value))}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Комнат</label>
              <select
                value={newRooms}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setNewRooms(val);
                  setNewRoomsLabel(val === 1 ? '1-комнатная квартира' : val === 2 ? '2-комнатная квартира' : `${val}-комнатная квартира`);
                }}
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              >
                <option value={1}>1 комната / Студия</option>
                <option value={2}>2 комнаты (Евро)</option>
                <option value={3}>3 комнаты</option>
                <option value={4}>4+ комнат / Пентхаус</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Общая площадь (м²)</label>
              <input
                type="number"
                step="0.1"
                value={newArea}
                onChange={(e) => setNewArea(Number(e.target.value))}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Цена в драмах (֏)</label>
              <input
                type="number"
                step="100000"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Высота потолков (м)</label>
              <input
                type="number"
                step="0.05"
                value={newCeiling}
                onChange={(e) => setNewCeiling(Number(e.target.value))}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Балкон / Лоджия (м²)</label>
              <input
                type="number"
                step="0.1"
                value={newBalcony}
                onChange={(e) => setNewBalcony(Number(e.target.value))}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Видовые характеристики</label>
              <input
                type="text"
                value={newViewDesc}
                onChange={(e) => setNewViewDesc(e.target.value)}
                placeholder="Вид на Арарат, парковый двор"
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Статус лота</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as UnitStatus)}
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              >
                <option value="available">В продаже</option>
                <option value="reserved">Забронировано</option>
                <option value="sold">Продано</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Название планировки</label>
              <input
                type="text"
                value={newRoomsLabel}
                onChange={(e) => setNewRoomsLabel(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              />
            </div>
          </div>

          {/* 2D Floor Plan Blueprint Selector & Live Preview */}
          <div className="p-4 bg-white rounded-card border border-pine-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold text-pine uppercase tracking-wider">
                  2D Архитектурный чертеж (Первое фото в карточке и каталоге)
                </label>
                <p className="text-[11px] text-graphite-500">
                  Выберите один из векторизованных 2D чертежей с экспликацией комнат и размерами в метрах
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2">
                <select
                  value={newImage}
                  onChange={(e) => handlePresetSelect(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded border border-graphite-300 bg-white font-medium"
                >
                  {FLOOR_PLAN_PRESETS.map((preset) => (
                    <option key={preset.path} value={preset.path}>
                      {preset.label}
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-graphite-500 mt-2">
                  Путь к чертежу: <code className="bg-graphite-100 px-1 py-0.5 rounded text-pine font-mono">{newImage}</code>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-2 bg-white rounded border border-graphite-200">
                <span className="text-[10px] uppercase font-bold text-graphite-400 mb-1">Превью 1-го фото:</span>
                <div className="relative w-36 h-28 bg-white flex items-center justify-center">
                  <Image
                    src={newImage}
                    alt="Предпросмотр планировки"
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-btn bg-white border border-graphite-300 text-xs font-semibold text-graphite-700 hover:bg-graphite-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-btn bg-pine text-white text-xs font-bold hover:bg-pine-800 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Сохранить квартиру с чертежом</span>
            </button>
          </div>
        </form>
      )}

      {/* Units Table */}
      <div className="bg-white rounded-card border border-graphite-200 overflow-x-auto shadow-subtle">
        <table className="w-full text-left text-xs text-graphite-700">
          <thead className="bg-limestone-alt text-graphite-500 font-bold uppercase tracking-wider text-[11px] border-b border-graphite-200">
            <tr>
              <th className="py-3 px-4">План 1-м фото</th>
              <th className="py-3 px-4">Проект / №</th>
              <th className="py-3 px-4">Комнат</th>
              <th className="py-3 px-4">Площадь</th>
              <th className="py-3 px-4">Этаж</th>
              <th className="py-3 px-4">Цена в драмах (֏)</th>
              <th className="py-3 px-4">Статус лота</th>
              <th className="py-3 px-4 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-100">
            {units.map((unit) => {
              const project = projects.find((p) => p.id === unit.projectId);
              return (
                <tr key={unit.id} className="hover:bg-limestone/40">
                  <td className="py-2 px-4">
                    <div className="relative w-14 h-12 bg-white rounded border border-graphite-200 overflow-hidden flex items-center justify-center p-1">
                      <Image
                        src={unit.image}
                        alt={unit.roomsLabel}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-graphite-900">
                    <div>{project?.name || unit.projectId}</div>
                    <div className="text-[11px] text-graphite-500 font-normal">Кв. {unit.unitNumber}</div>
                  </td>
                  <td className="py-3 px-4">{unit.roomsLabel}</td>
                  <td className="py-3 px-4 font-bold">{unit.areaSqm} м²</td>
                  <td className="py-3 px-4">{unit.floorNumber}</td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      defaultValue={formatNumber(unit.priceAMD)}
                      onBlur={(e) => onPriceChange(unit.id, e.target.value)}
                      className="w-32 px-2 py-1 text-xs font-bold rounded border border-graphite-300 focus:outline-none focus:border-pine bg-white"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={unit.status}
                      onChange={(e) => onStatusChange(unit.id, e.target.value as UnitStatus)}
                      className={`px-2 py-1 rounded text-xs font-bold border ${
                        unit.status === 'available'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : unit.status === 'reserved'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-graphite-100 text-graphite-600 border-graphite-200'
                      }`}
                    >
                      <option value="available">В продаже</option>
                      <option value="reserved">Бронь</option>
                      <option value="sold">Продано</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => onDeleteUnit(unit.id)}
                      className="p-1.5 text-graphite-400 hover:text-red-600 rounded transition-colors"
                      title="Удалить квартиру"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
