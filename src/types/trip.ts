export type TripDirection = 'SUBIDA' | 'BAJADA' | 'ROUND_TRIP';
export type SkiResort = 'FARELLONES' | 'EL_COLORADO' | 'LA_PARVA' | 'VALLE_NEVADO';

export interface Trip {
  id: string;
  user_id: string;
  driver_name: string;
  driver_avatar?: string;
  direction: TripDirection;
  origin: string;
  destination: SkiResort;
  departure_date: string;
  departure_time: string;
  seats_available: number;
  price_per_seat: number;
  has_4x4: boolean;
  has_chains: boolean;
  has_rack: boolean;
  notes?: string;
  whatsapp_number: string;
  instagram_handle?: string;
  created_at: string;
}

