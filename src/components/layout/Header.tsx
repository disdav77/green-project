'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ChevronDown, Building2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Header() {
  const { dictionary, openConsultModal } = useApp();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  const navLinks = [
    { label: dictionary.nav.catalog, href: '/apartments' },
    { label: dictionary.nav.mortgage, href: '/mortgage' },
    { label: dictionary.nav.standards, href: '/#engineering' },
    { label: dictionary.nav.admin, href: '/admin' },
  ];

  const projectItems = [
    { name: 'ЖК Green Avan', slug: 'avan', desc: '14 этажей • Аван • от 14 млн ֏' },
    { name: 'ЖК Green Nork', slug: 'nork', desc: '6 этажей • Нор-Норк • Клубный дом' },
    { name: 'Green Townhouse', slug: 'townhouse', desc: '2 этажа • с. Касах • Участок 124 м²' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-graphite-200/80 transition-all shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-btn bg-pine flex items-center justify-center text-white shadow-sm group-hover:bg-pine-800 transition-colors">
            <Building2 className="w-5 h-5 text-brass" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg text-graphite-900 tracking-tight leading-none group-hover:text-pine transition-colors">
              {dictionary.brand.name}
            </span>
            <span className="text-[11px] text-graphite-500 tracking-wider uppercase mt-1">
              Development
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {/* Projects Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProjectsDropdownOpen(true)}
            onMouseLeave={() => setProjectsDropdownOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-graphite-700 hover:text-pine transition-colors py-2 cursor-pointer"
            >
              <span>{dictionary.nav.projects}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${projectsDropdownOpen ? 'rotate-180 text-pine' : 'text-graphite-400'}`} />
            </button>

            {projectsDropdownOpen && (
              <div className="absolute top-full left-0 w-72 bg-white rounded-card shadow-elevated border border-graphite-200/80 py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                {projectItems.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/projects/${item.slug}`}
                    onClick={() => setProjectsDropdownOpen(false)}
                    className="block px-4 py-2.5 hover:bg-limestone-alt transition-colors"
                  >
                    <div className="text-sm font-semibold text-graphite-900">{item.name}</div>
                    <div className="text-xs text-graphite-500 mt-0.5">{item.desc}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-pine font-semibold' : 'text-graphite-700 hover:text-pine'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${dictionary.brand.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 text-sm font-medium text-graphite-800 hover:text-pine transition-colors"
          >
            <div className="w-8 h-8 rounded-btn bg-limestone flex items-center justify-center text-pine">
              <Phone className="w-4 h-4" />
            </div>
            <span>{dictionary.brand.phone}</span>
          </a>

          <button
            type="button"
            onClick={() => openConsultModal()}
            className="px-4 py-2 rounded-btn bg-pine text-white text-sm font-semibold hover:bg-pine-800 transition-colors shadow-subtle cursor-pointer"
          >
            {dictionary.nav.requestCall}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-btn text-graphite-700 hover:bg-limestone transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-graphite-200 px-4 pt-3 pb-6 space-y-4">
          <div className="space-y-1 border-b border-graphite-100 pb-3">
            <span className="text-xs font-semibold text-graphite-400 uppercase tracking-wider px-2">
              {dictionary.nav.projects}
            </span>
            {projectItems.map((item) => (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-btn text-sm font-medium text-graphite-800 hover:bg-limestone"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-btn text-sm font-medium text-graphite-800 hover:bg-limestone"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              openConsultModal();
            }}
            className="w-full py-2.5 rounded-btn bg-pine text-white text-sm font-semibold hover:bg-pine-800 transition-colors"
          >
            {dictionary.nav.requestCall}
          </button>
        </div>
      )}
    </header>
  );
}
