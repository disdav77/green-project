export type UnitStatus = 'available' | 'reserved' | 'sold';

export type Currency = 'AMD' | 'USD';

export type Language = 'ru' | 'hy' | 'en';

export interface Project {
  id: string;
  slug: string;
  name: string;
  district: string;
  address: string;
  category: string;
  floorsCount: number;
  totalUnits: number;
  readiness: string;
  deliveryDate: string;
  priceFromAMD: number;
  timeToCenter: string;
  image: string;
  description: string;
  acousticComfort: string;
  seismicScore: string;
  concreteGrade: string;
  taxRefundEligible: boolean;
  taxRefundType: 'phased' | 'indefinite';
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
}

export interface Building {
  id: string;
  projectId: string;
  name: string;
  totalFloors: number;
  address: string;
}

export interface Floor {
  id: string;
  buildingId: string;
  floorNumber: number;
  totalUnits: number;
}

export interface Unit {
  id: string;
  projectId: string;
  buildingId: string;
  floorNumber: number;
  unitNumber: string;
  rooms: number;
  roomsLabel: string;
  areaSqm: number;
  priceAMD: number;
  status: UnitStatus;
  image: string;
  planSvgKey?: string;
  ceilingHeight: number;
  balconyArea: number;
  viewDescription: string;
  features: string[];
  exactAddress: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  preferredProject: string;
  preferredTime: string;
  notes?: string;
  status: 'new' | 'contacted' | 'appointment' | 'closed';
}

export interface BankPreset {
  id: string;
  name: string;
  rate: number;
  minDownPaymentPercent: number;
  maxTermYears: number;
  isPopular?: boolean;
}
