'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Currency, Language } from '@/types/database';
import { getDictionary, Dictionary } from '@/lib/dictionaries';

interface AppContextType {
  language: Language;
  currency: Currency;
  dictionary: Dictionary;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  isConsultModalOpen: boolean;
  selectedProjectForConsult: string;
  openConsultModal: (projectId?: string) => void;
  closeConsultModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ru');
  const [currency, setCurrencyState] = useState<Currency>('AMD');
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [selectedProjectForConsult, setSelectedProjectForConsult] = useState('all');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('gp_lang') as Language;
      if (savedLang && (savedLang === 'ru' || savedLang === 'hy' || savedLang === 'en')) {
        setLanguageState(savedLang);
      }
      const savedCurr = localStorage.getItem('gp_curr') as Currency;
      if (savedCurr && (savedCurr === 'AMD' || savedCurr === 'USD')) {
        setCurrencyState(savedCurr);
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('gp_lang', lang);
    } catch {
      // ignore
    }
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem('gp_curr', curr);
    } catch {
      // ignore
    }
  };

  const openConsultModal = (projectId = 'all') => {
    setSelectedProjectForConsult(projectId);
    setIsConsultModalOpen(true);
  };

  const closeConsultModal = () => {
    setIsConsultModalOpen(false);
  };

  const dictionary = useMemo(() => getDictionary(language), [language]);

  const value = useMemo(
    () => ({
      language,
      currency,
      dictionary,
      setLanguage,
      setCurrency,
      isConsultModalOpen,
      selectedProjectForConsult,
      openConsultModal,
      closeConsultModal,
    }),
    [language, currency, dictionary, isConsultModalOpen, selectedProjectForConsult]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
