import { createClient } from '@supabase/supabase-js';
import { Unit, Project, Building, Lead, UnitStatus, PromoBanner } from '@/types/database';
import { initialProjects, initialBuildings, initialUnits } from './initialCatalog';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const STORAGE_KEY_UNITS = 'gp_units_store_v2';
const STORAGE_KEY_LEADS = 'gp_leads_store_v2';
const STORAGE_KEY_PROJECTS = 'gp_projects_store_v2';
const STORAGE_KEY_BANNERS = 'gp_banners_store_v2';

export const initialBanners: PromoBanner[] = [
  {
    id: 'banner-hero',
    location: 'hero',
    badge: 'Госпрограмма Армении 2026',
    title: 'Возврат до 500 000 ֏ ежемесячно по подоходному налогу',
    subtitle: 'Ст. 156.1 НК РА — государство гасит проценты по вашей ипотеке',
    buttonText: 'Рассчитать вычет',
    buttonLink: '/mortgage',
    imageUrl: '/images/projects/avan_facade.jpg',
    active: true,
  },
  {
    id: 'banner-catalog',
    location: 'catalog',
    badge: 'Спецпредложение',
    title: 'Фиксация цен в драмах от 14 200 000 ֏',
    subtitle: 'Чистовая отделка White Box и панорамное остекление в подарок',
    buttonText: 'Выбрать планировку',
    buttonLink: '/apartments',
    active: true,
  },
  {
    id: 'banner-mortgage',
    location: 'mortgage',
    badge: 'Аккредитация в топ-банках',
    title: 'Ипотека от 10.5% с первым взносом от 10%',
    subtitle: 'Эскроу счета в Ameriabank, Inecobank, Ardshinbank, ACBA',
    buttonText: 'Оформить заявку',
    buttonLink: '/mortgage',
    active: true,
  },
];

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function getStoredProjects(): Project[] {
  if (!isBrowser()) return initialProjects;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(initialProjects));
      return initialProjects;
    }
    return JSON.parse(raw);
  } catch {
    return initialProjects;
  }
}

function setStoredProjects(projects: Project[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  } catch (error) {
    console.error('Failed to persist projects in local storage', error);
  }
}

function getStoredUnits(): Unit[] {
  if (!isBrowser()) return initialUnits;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_UNITS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_UNITS, JSON.stringify(initialUnits));
      return initialUnits;
    }
    return JSON.parse(raw);
  } catch {
    return initialUnits;
  }
}

function setStoredUnits(units: Unit[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY_UNITS, JSON.stringify(units));
  } catch (error) {
    console.error('Failed to persist units in local storage', error);
  }
}

function getStoredBanners(): PromoBanner[] {
  if (!isBrowser()) return initialBanners;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BANNERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_BANNERS, JSON.stringify(initialBanners));
      return initialBanners;
    }
    return JSON.parse(raw);
  } catch {
    return initialBanners;
  }
}

function setStoredBanners(banners: PromoBanner[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY_BANNERS, JSON.stringify(banners));
  } catch (error) {
    console.error('Failed to persist banners in local storage', error);
  }
}

function getStoredLeads(): Lead[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEADS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setStoredLeads(leads: Lead[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
  } catch (error) {
    console.error('Failed to persist leads in local storage', error);
  }
}

export async function fetchProjects(): Promise<Project[]> {
  let projects = getStoredProjects();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('projects').select('*');
      if (!error && data && data.length > 0) return data as Project[];
    } catch {
      // Fallback
    }
  }
  return projects;
}

export async function addProject(project: Project): Promise<boolean> {
  const current = getStoredProjects();
  const updated = [project, ...current];
  setStoredProjects(updated);
  if (supabase) {
    try {
      await supabase.from('projects').insert(project);
    } catch {
      // Fallback
    }
  }
  return true;
}

export async function updateProject(project: Project): Promise<boolean> {
  const current = getStoredProjects();
  const updated = current.map((p) => (p.id === project.id ? project : p));
  setStoredProjects(updated);
  if (supabase) {
    try {
      await supabase.from('projects').update(project).eq('id', project.id);
    } catch {
      // Fallback
    }
  }
  return true;
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await fetchProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function fetchBuildings(projectId?: string): Promise<Building[]> {
  if (!projectId) return initialBuildings;
  return initialBuildings.filter((b) => b.projectId === projectId);
}

export async function fetchUnits(projectId?: string): Promise<Unit[]> {
  let units = getStoredUnits();

  if (supabase) {
    try {
      const { data, error } = await supabase.from('units').select('*');
      if (!error && data && data.length > 0) {
        units = data as Unit[];
      }
    } catch {
      // Fallback
    }
  }

  if (projectId) {
    return units.filter((u) => u.projectId === projectId);
  }
  return units;
}

export async function addUnit(unit: Unit): Promise<boolean> {
  const current = getStoredUnits();
  const updated = [unit, ...current];
  setStoredUnits(updated);
  if (supabase) {
    try {
      await supabase.from('units').insert(unit);
    } catch {
      // Fallback
    }
  }
  return true;
}

export async function deleteUnit(id: string): Promise<boolean> {
  const current = getStoredUnits();
  const updated = current.filter((u) => u.id !== id);
  setStoredUnits(updated);
  if (supabase) {
    try {
      await supabase.from('units').delete().eq('id', id);
    } catch {
      // Fallback
    }
  }
  return true;
}

export async function updateUnitStatus(id: string, newStatus: UnitStatus): Promise<boolean> {
  const currentUnits = getStoredUnits();
  const index = currentUnits.findIndex((u) => u.id === id);
  if (index === -1) return false;

  const updatedUnits = currentUnits.map((u) => (u.id === id ? { ...u, status: newStatus } : u));
  setStoredUnits(updatedUnits);

  if (supabase) {
    try {
      await supabase.from('units').update({ status: newStatus }).eq('id', id);
    } catch {
      // Offline fallback succeeded
    }
  }
  return true;
}

export async function updateUnitPrice(id: string, newPriceAMD: number): Promise<boolean> {
  const currentUnits = getStoredUnits();
  const index = currentUnits.findIndex((u) => u.id === id);
  if (index === -1) return false;

  const updatedUnits = currentUnits.map((u) => (u.id === id ? { ...u, priceAMD: newPriceAMD } : u));
  setStoredUnits(updatedUnits);

  if (supabase) {
    try {
      await supabase.from('units').update({ price_amd: newPriceAMD }).eq('id', id);
    } catch {
      // Offline fallback succeeded
    }
  }
  return true;
}

export async function fetchBanners(): Promise<PromoBanner[]> {
  return getStoredBanners();
}

export async function updateBanner(banner: PromoBanner): Promise<boolean> {
  const current = getStoredBanners();
  const updated = current.map((b) => (b.id === banner.id ? banner : b));
  setStoredBanners(updated);
  return true;
}

export async function addBanner(banner: PromoBanner): Promise<boolean> {
  const current = getStoredBanners();
  const updated = [banner, ...current];
  setStoredBanners(updated);
  return true;
}

export async function submitLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> {
  const newLead: Lead = {
    ...lead,
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  const leads = getStoredLeads();
  setStoredLeads([newLead, ...leads]);

  if (supabase) {
    try {
      await supabase.from('leads').insert({
        name: lead.name,
        phone: lead.phone,
        preferred_project: lead.preferredProject,
        preferred_time: lead.preferredTime,
        notes: lead.notes,
      });
    } catch {
      // Offline fallback succeeded
    }
  }

  return newLead;
}

export async function fetchLeads(): Promise<Lead[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as Lead[];
    } catch {
      // Fallback
    }
  }
  return getStoredLeads();
}

