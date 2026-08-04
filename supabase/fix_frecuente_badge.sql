-- ============================================================
-- FIX: Reasignar viajes para que driver1 tenga 10+ viajes
-- y active el badge 🏔️ Conductor Frecuente
-- Ejecutar en: Supabase → SQL Editor
-- ============================================================
-- driver1 (pedro_ski_cl): f21f03a4-16a4-4413-b52f-50b530cd5fd9 → actualmente tiene 6 viajes
-- driver2 (pedro2):       d5e3c74c-637b-4f83-bcb8-9e3d202de031 → tiene 5 viajes
-- driver3 (Zipp):         b40a2ced-361d-4ac9-b4a8-5c6b91b4f2ad → tiene 1 viaje
--
-- Plan: mover 4 viajes de driver2 a driver1 → driver1 tendrá 10 viajes = Badge 🏔️
-- ============================================================

DO $$
DECLARE
  driver1 UUID := 'f21f03a4-16a4-4413-b52f-50b530cd5fd9';
  driver2 UUID := 'd5e3c74c-637b-4f83-bcb8-9e3d202de031';
  trips_to_move UUID[];
BEGIN
  -- Tomar 4 viajes de driver2
  SELECT ARRAY(
    SELECT id FROM public.trips WHERE user_id = driver2 ORDER BY created_at LIMIT 4
  ) INTO trips_to_move;

  -- Reasignarlos a driver1
  UPDATE public.trips
  SET user_id = driver1
  WHERE id = ANY(trips_to_move);

  -- Verificar resultado
  RAISE NOTICE 'Viajes driver1 ahora: %', (SELECT COUNT(*) FROM public.trips WHERE user_id = driver1);
  RAISE NOTICE 'Viajes driver2 ahora: %', (SELECT COUNT(*) FROM public.trips WHERE user_id = driver2);
END $$;

-- Resultado esperado: driver1 = 10 viajes → 🏔️ Conductor Frecuente activo
