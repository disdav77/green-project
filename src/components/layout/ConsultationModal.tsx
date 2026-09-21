'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Phone, User, Calendar } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { leadFormSchema, LeadFormData } from '@/lib/validations/leadSchema';
import { submitLead } from '@/lib/supabaseClient';

export function ConsultationModal() {
  const { isConsultModalOpen, closeConsultModal, selectedProjectForConsult } = useApp();
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    preferredProject: selectedProjectForConsult || 'all',
    preferredTime: 'anytime',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isConsultModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = leadFormSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof LeadFormData, string>> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof LeadFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        preferredProject: formData.preferredProject || selectedProjectForConsult,
        preferredTime: formData.preferredTime || 'anytime',
        notes: formData.notes,
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        closeConsultModal();
      }, 2500);
    } catch {
      setErrors({ phone: 'Не удалось отправить заявку. Попробуйте еще раз или позвоните нам напрямую.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-card shadow-elevated border border-graphite-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-graphite-100 flex items-center justify-between bg-limestone-alt">
          <div>
            <h3 className="text-base font-semibold text-graphite-900">
              Запись на консультацию и просмотр
            </h3>
            <p className="text-xs text-graphite-500 mt-0.5">
              Специалист отдела продаж свяжется с вами в течение 15 минут
            </p>
          </div>
          <button
            type="button"
            onClick={closeConsultModal}
            className="p-1.5 rounded-btn text-graphite-400 hover:text-graphite-700 hover:bg-graphite-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-pine-50 text-pine flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-graphite-900">Заявка успешно принята!</h4>
              <p className="text-sm text-graphite-600 max-w-xs mx-auto">
                Менеджер проекта перезвонит вам по указанному номеру для согласования удобного времени визита.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-graphite-700 mb-1">
                  Ваше имя
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-graphite-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Арам Саргсян"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-input border border-graphite-300 focus:outline-none focus:border-pine focus:ring-1 focus:ring-pine transition-all"
                  />
                </div>
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-graphite-700 mb-1">
                  Номер телефона
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-graphite-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+374 94 00-00-00"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-input border border-graphite-300 focus:outline-none focus:border-pine focus:ring-1 focus:ring-pine transition-all"
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-graphite-700 mb-1">
                    Интересующий проект
                  </label>
                  <select
                    value={formData.preferredProject}
                    onChange={(e) => setFormData({ ...formData, preferredProject: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-input border border-graphite-300 bg-white focus:outline-none focus:border-pine"
                  >
                    <option value="all">Все проекты</option>
                    <option value="avan">ЖК Green Avan</option>
                    <option value="nork">ЖК Green Nork</option>
                    <option value="townhouse">Green Townhouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-graphite-700 mb-1">
                    Удобное время звонка
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-graphite-400 absolute left-3 top-3" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-input border border-graphite-300 bg-white focus:outline-none focus:border-pine"
                    >
                      <option value="anytime">В любое время</option>
                      <option value="morning">Утром (09:00 - 13:00)</option>
                      <option value="afternoon">Днем (13:00 - 18:00)</option>
                      <option value="evening">Вечером (18:00 - 21:00)</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-btn bg-pine text-white text-sm font-semibold hover:bg-pine-800 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Отправка...' : 'Заказать звонок менеджера'}
              </button>

              <div className="flex items-start gap-2 p-2.5 rounded-btn bg-limestone-alt border border-graphite-200/60 text-[11px] text-graphite-600 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-pine shrink-0 mt-0.5" />
                <span>
                  Бронирование осуществляется по телефону и фиксируется при личном визите в офис продаж с паспортом и внесением задатка.
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
