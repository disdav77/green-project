'use client';

import React, { useState } from 'react';
import { Unit, Project, UnitStatus } from '@/types/database';
import { formatNumber } from '@/lib/currency';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface AdminUnitsTabProps {
  units: Unit[];
  projects: Project[];
  onStatusChange: (unitId: string, newStatus: UnitStatus) => Promise<void>;
  onPriceChange: (unitId: string, newPriceStr: string) => Promise<void>;
  onAddUnit: (unit: Unit) => Promise<void>;
  onDeleteUnit: (unitId: string) => Promise<void>;
}

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
  const [newRoomsLabel, setNewRoomsLabel] = useState('2-комнатная квартира');
  const [newArea, setNewArea] = useState(58.5);
  const [newPrice, setNewPrice] = useState(24500000);
  const [newStatus, setNewStatus] = useState<UnitStatus>('available');
  const [newImage, setNewImage] = useState('/images/apt-1.png');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      image: newImage,
      ceilingHeight: 3.0,
      balconyArea: 4.5,
      viewDescription: 'Панорамный вид на гору Арарат',
      features: ['Чистовая отделка White Box', 'Шумоизоляция 55 дБ', 'Панорамные окна Schuco'],
      exactAddress: 'Ереван, Green Project',
    };

    await onAddUnit(newUnit);
    setShowAddModal(false);
    setNewUnitNumber('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-graphite-900 uppercase tracking-wider">
          Реестр квартир ({units.length} лотов)
        </h3>
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
        <form onSubmit={handleSubmit} className="p-5 bg-limestone rounded-card border border-graphite-200 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-pine">
            Добавление новой квартиры в каталог
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
                <option value={1}>1 комната (студия)</option>
                <option value={2}>2 комнаты</option>
                <option value={3}>3 комнаты</option>
                <option value={4}>4 комнаты</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Площадь (м²)</label>
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
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Статус</label>
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
              <label className="block text-[11px] font-bold text-graphite-700 mb-1">Фотография лота</label>
              <select
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-graphite-300 bg-white"
              >
                <option value="/images/apt-1.png">Планировка 1 (apt-1.png)</option>
                <option value="/images/apt-2.png">Планировка 2 (apt-2.png)</option>
                <option value="/images/apt-3.png">Планировка 3 (apt-3.png)</option>
                <option value="/images/apt-4.png">Планировка 4 (apt-4.png)</option>
                <option value="/images/apt-5.png">Планировка 5 (apt-5.png)</option>
                <option value="/images/apt-6.png">Планировка 6 (apt-6.png)</option>
              </select>
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
              <span>Сохранить квартиру</span>
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-card border border-graphite-200 overflow-x-auto shadow-subtle">
        <table className="w-full text-left text-xs text-graphite-700">
          <thead className="bg-limestone-alt text-graphite-500 font-bold uppercase tracking-wider text-[11px] border-b border-graphite-200">
            <tr>
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
