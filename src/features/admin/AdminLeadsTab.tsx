'use client';

import React from 'react';
import { Lead } from '@/types/database';
import { Clock, Phone } from 'lucide-react';

interface AdminLeadsTabProps {
  leads: Lead[];
}

export function AdminLeadsTab({ leads }: AdminLeadsTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-graphite-900 uppercase tracking-wider">
          Входящие заявки на просмотр и консультации ({leads.length})
        </h3>
      </div>

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
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-pine font-semibold hover:underline flex items-center gap-1"
                    >
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
    </div>
  );
}
