-- ============================================================
-- FIX: Actualizar fechas de viajes pasados a hoy y mañana
-- Ejecutar en: Supabase → SQL Editor
-- ============================================================

-- Viajes del 26-jul → HOY (para que aparezcan en el feed)
UPDATE public.trips
SET departure_date = CURRENT_DATE
WHERE id IN (
  '7d562197-3744-4c4f-8a34-564ed8e48957',
  'd0c33aaf-89ce-42fc-a694-d404bec55e5a',
  '6ef6d053-a83c-4a1d-9674-ed24e962d4a5',
  '0ef3eaf4-c89a-440e-88b0-dc0fd4f1342c',
  '1bb64eea-ef7a-463c-81e4-582ab2c543d8',
  'eb00c4b8-056d-4cce-8b00-6ff454258c95'
);

-- Viajes del 27 y 28-jul → MAÑANA
UPDATE public.trips
SET departure_date = CURRENT_DATE + 1
WHERE id IN (
  '42a41af1-dc43-4ce5-b978-18a39214bc2f',
  '41fd4681-6d06-49b5-b95c-ad297d7a6315'
);

-- Confirmación
SELECT id, driver_name, departure_date, direction, destination
FROM public.trips
ORDER BY departure_date, departure_time;
