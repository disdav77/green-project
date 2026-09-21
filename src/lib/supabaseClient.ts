import { createClient } from '@supabase/supabase-js';
import { Unit, Project, Building, Lead, UnitStatus } from '@/types/database';
import { initialProjects, initialBuildings, initialUnits } from './initialCatalog';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const STORAGE_KEY_UNITS = 'gp_units_store_v2';
const STORAGE_KEY_LEADS = 'gp_leads_store_v2';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
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
  if (supabase) {
    try {
      const { data, error } = await supabase.from('projects').select('*');
      if (!error && data && data.length > 0) return data as Project[];
    } catch {
      // Fallback
    }
  }
  return initialProjects;
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
