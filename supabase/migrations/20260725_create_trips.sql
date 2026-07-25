-- Create Enum Types
CREATE TYPE trip_direction AS ENUM ('SUBIDA', 'BAJADA', 'ROUND_TRIP');
CREATE TYPE ski_resort AS ENUM ('FARELLONES', 'EL_COLORADO', 'LA_PARVA', 'VALLE_NEVADO');

-- Create Trips Table
CREATE TABLE IF NOT EXISTS public.trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    driver_name TEXT NOT NULL,
    driver_avatar TEXT,
    direction trip_direction NOT NULL DEFAULT 'SUBIDA',
    origin TEXT NOT NULL,
    destination ski_resort NOT NULL,
    departure_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    seats_available INT NOT NULL CHECK (seats_available > 0),
    price_per_seat INT NOT NULL CHECK (price_per_seat >= 0),
    has_4x4 BOOLEAN DEFAULT false,
    has_chains BOOLEAN DEFAULT false,
    has_rack BOOLEAN DEFAULT false,
    notes TEXT,
    whatsapp_number TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Policy 1: Everyone (public) can read active trips
CREATE POLICY "Public trips are viewable by everyone" 
ON public.trips FOR SELECT 
USING (true);

-- Policy 2: Authenticated users can create trips with their own user_id
CREATE POLICY "Authenticated users can create trips" 
ON public.trips FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users can update their own trips
CREATE POLICY "Users can update own trips" 
ON public.trips FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- Policy 4: Users can delete their own trips
CREATE POLICY "Users can delete own trips" 
ON public.trips FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);

-- Index for fast queries by date and destination
CREATE INDEX idx_trips_date_direction ON public.trips (departure_date, direction);
