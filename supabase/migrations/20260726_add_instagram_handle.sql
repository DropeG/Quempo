-- Add instagram_handle column to trips table
ALTER TABLE public.trips 
ADD COLUMN IF NOT EXISTS instagram_handle TEXT;
