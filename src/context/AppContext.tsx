'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode, useCallback } from 'react';
import { Currency, Language, Unit, Project, PromoBanner, ConstructionProgress, UnitStatus } from '@/types/database';
import { getDictionary, Dictionary } from '@/lib/dictionaries';
import {
  getStoredUnits,
  getStoredProjects,
  getStoredBanners,
  getStoredProgress,
  addUnit as apiAddUnit,
  updateUnitStatus as apiUpdateUnitStatus,
  updateUnitPrice as apiUpdateUnitPrice,
  deleteUnit as apiDeleteUnit,
  addProject as apiAddProject,
  updateProject as apiUpdateProject,
  deleteProject as apiDeleteProject,
  addBanner as apiAddBanner,
  updateBanner as apiUpdateBanner,
  deleteBanner as apiDeleteBanner,
  addProgress as apiAddProgress,
  updateProgress as apiUpdateProgress,
  deleteProgress as apiDeleteProgress,
  resetAllDataToDefaults as apiResetDefaults,
  initialBanners,
} from '@/lib/supabaseClient';
import { initialUnits, initialProjects } from '@/lib/initialCatalog';

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

  // Real-time Data Store
  units: Unit[];
  projects: Project[];
  banners: PromoBanner[];
  progress: ConstructionProgress[];

  // CRUD Actions
  refreshData: () => void;
  addUnit: (unit: Unit) => Promise<boolean>;
  updateUnitStatus: (unitId: string, status: UnitStatus) => Promise<boolean>;
  updateUnitPrice: (unitId: string, priceAMD: number) => Promise<boolean>;
  deleteUnit: (unitId: string) => Promise<boolean>;

  addProject: (project: Project) => Promise<boolean>;
  updateProject: (project: Project) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;

  addBanner: (banner: PromoBanner) => Promise<boolean>;
  updateBanner: (banner: PromoBanner) => Promise<boolean>;
  deleteBanner: (id: string) => Promise<boolean>;

  addProgress: (item: ConstructionProgress) => Promise<boolean>;
  updateProgress: (item: ConstructionProgress) => Promise<boolean>;
  deleteProgress: (id: string) => Promise<boolean>;

  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ru');
  const [currency, setCurrencyState] = useState<Currency>('AMD');
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [selectedProjectForConsult, setSelectedProjectForConsult] = useState('all');

  // Dynamic CMS Store States
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [banners, setBanners] = useState<PromoBanner[]>(initialBanners);
  const [progress, setProgress] = useState<ConstructionProgress[]>([]);

  const refreshData = useCallback(() => {
    try {
      setUnits(getStoredUnits());
      setProjects(getStoredProjects());
      setBanners(getStoredBanners());
      setProgress(getStoredProgress());
    } catch {
      // Offline fallback
    }
  }, []);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('gp_lang') as Language;
      if (savedLang && (savedLang === 'ru' || savedLang === 'hy' || savedLang === 'en')) {
        setLanguageState(savedLang);
      }
      const savedCurr = localStorage.getItem('gp_curr') as Currency;
      if (savedCurr && (savedCurr === 'AMD' || savedCurr === 'USD' || savedCurr === 'RUB')) {
        setCurrencyState(savedCurr);
      }
    } catch {
      // LocalStorage unavailable
    }

    refreshData();

    const handleUpdate = () => {
      refreshData();
    };

    window.addEventListener('gp_data_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('gp_data_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [refreshData]);

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

  // CRUD Wrappers
  const addUnit = async (unit: Unit) => {
    const ok = await apiAddUnit(unit);
    if (ok) refreshData();
    return ok;
  };

  const updateUnitStatus = async (unitId: string, status: UnitStatus) => {
    const ok = await apiUpdateUnitStatus(unitId, status);
    if (ok) refreshData();
    return ok;
  };

  const updateUnitPrice = async (unitId: string, priceAMD: number) => {
    const ok = await apiUpdateUnitPrice(unitId, priceAMD);
    if (ok) refreshData();
    return ok;
  };

  const deleteUnit = async (unitId: string) => {
    const ok = await apiDeleteUnit(unitId);
    if (ok) refreshData();
    return ok;
  };

  const addProject = async (proj: Project) => {
    const ok = await apiAddProject(proj);
    if (ok) refreshData();
    return ok;
  };

  const updateProject = async (proj: Project) => {
    const ok = await apiUpdateProject(proj);
    if (ok) refreshData();
    return ok;
  };

  const deleteProject = async (id: string) => {
    const ok = await apiDeleteProject(id);
    if (ok) refreshData();
    return ok;
  };

  const addBanner = async (banner: PromoBanner) => {
    const ok = await apiAddBanner(banner);
    if (ok) refreshData();
    return ok;
  };

  const updateBanner = async (banner: PromoBanner) => {
    const ok = await apiUpdateBanner(banner);
    if (ok) refreshData();
    return ok;
  };

  const deleteBanner = async (id: string) => {
    const ok = await apiDeleteBanner(id);
    if (ok) refreshData();
    return ok;
  };

  const addProgress = async (item: ConstructionProgress) => {
    const ok = await apiAddProgress(item);
    if (ok) refreshData();
    return ok;
  };

  const updateProgress = async (item: ConstructionProgress) => {
    const ok = await apiUpdateProgress(item);
    if (ok) refreshData();
    return ok;
  };

  const deleteProgress = async (id: string) => {
    const ok = await apiDeleteProgress(id);
    if (ok) refreshData();
    return ok;
  };

  const resetToDefaults = () => {
    apiResetDefaults();
    refreshData();
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

      units,
      projects,
      banners,
      progress,

      refreshData,
      addUnit,
      updateUnitStatus,
      updateUnitPrice,
      deleteUnit,

      addProject,
      updateProject,
      deleteProject,

      addBanner,
      updateBanner,
      deleteBanner,

      addProgress,
      updateProgress,
      deleteProgress,

      resetToDefaults,
    }),
    [
      language,
      currency,
      dictionary,
      isConsultModalOpen,
      selectedProjectForConsult,
      units,
      projects,
      banners,
      progress,
      refreshData,
    ]
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
