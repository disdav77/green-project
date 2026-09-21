'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, MapPin, Phone, Mail, ShieldAlert } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Footer() {
  const { dictionary } = useApp();

  return (
    <footer className="bg-graphite-900 text-graphite-300 border-t border-graphite-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-graphite-800">
          {/* Col 1: Developer Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-btn bg-pine flex items-center justify-center text-white">
                <Building2 className="w-5 h-5 text-brass" />
              </div>
              <span className="font-heading font-bold text-lg text-white tracking-tight">
                {dictionary.brand.name}
              </span>
            </div>
            <p className="text-sm text-graphite-400 leading-relaxed">
              {dictionary.brand.tagline}
            </p>
            <div className="text-xs text-brass font-medium pt-1">
              Лицензия № 18492 КГД РА
            </div>
          </div>

          {/* Col 2: Projects */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              {dictionary.nav.projects}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects/avan" className="hover:text-brass-light transition-colors">
                  ЖК Green Avan (Ереван, Аван)
                </Link>
              </li>
              <li>
                <Link href="/projects/nork" className="hover:text-brass-light transition-colors">
                  ЖК Green Nork (Ереван, Нор-Норк)
                </Link>
              </li>
              <li>
                <Link href="/projects/townhouse" className="hover:text-brass-light transition-colors">
                  Green Townhouse (с. Касах)
                </Link>
              </li>
              <li>
                <Link href="/apartments" className="hover:text-brass-light transition-colors text-brass">
                  {dictionary.nav.catalog} ↗
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Финансы и Сервис
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mortgage" className="hover:text-brass-light transition-colors">
                  {dictionary.nav.mortgage} (Ст. 156.1 НК РА)
                </Link>
              </li>
              <li>
                <Link href="/#engineering" className="hover:text-brass-light transition-colors">
                  Инженерные стандарты (СНиП РА)
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brass-light transition-colors text-graphite-400">
                  Панель управления CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Офис продаж
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-graphite-300">
                <MapPin className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                <span>{dictionary.brand.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brass shrink-0" />
                <a href={`tel:${dictionary.brand.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {dictionary.brand.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brass shrink-0" />
                <a href={`mailto:${dictionary.brand.email}`} className="hover:text-white transition-colors">
                  {dictionary.brand.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-graphite-500">
          <div className="flex items-center gap-2 max-w-3xl">
            <ShieldAlert className="w-4 h-4 text-graphite-400 shrink-0" />
            <p>{dictionary.bookingPolicy.text}</p>
          </div>
          <div className="whitespace-nowrap">
            © {new Date().getFullYear()} {dictionary.brand.name}. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
}
