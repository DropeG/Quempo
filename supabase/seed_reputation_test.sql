-- ============================================================
-- SEED: Reseñas + Perfiles para el sistema de Reputación & Badges
-- Ejecutar en: Supabase → SQL Editor
-- ============================================================
-- Los revisores son los 3 conductores reales cruzados entre sí
-- (No necesitamos crear usuarios ficticios)
-- ============================================================

DO $$
DECLARE
  driver1 UUID := 'f21f03a4-16a4-4413-b52f-50b530cd5fd9'; -- Pedro 1 (8 viajes)
  driver2 UUID := 'd5e3c74c-637b-4f83-bcb8-9e3d202de031'; -- Pedro 2 (3 viajes)
  driver3 UUID := 'b40a2ced-361d-4ac9-b4a8-5c6b91b4f2ad'; -- Zipp Chile (1 viaje)

  trips1 UUID[];
  trips2 UUID[];
  trips3 UUID[];
BEGIN

  -- ============================================================
  -- 1. PERFILES (solo los conductores reales que ya existen en auth.users)
  -- ============================================================

  INSERT INTO public.profiles (id, full_name, avatar_url, whatsapp_number, instagram_handle, updated_at)
  VALUES (driver1, 'Pedro González', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Pedro1', '+56912345678', 'pedro_ski_cl', NOW())
  ON CONFLICT (id) DO UPDATE SET whatsapp_number = '+56912345678', instagram_handle = 'pedro_ski_cl', updated_at = NOW();

  INSERT INTO public.profiles (id, full_name, avatar_url, whatsapp_number, instagram_handle, updated_at)
  VALUES (driver2, 'Pedro González', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Pedro2', '+56911223344', 'pedrito_nieve', NOW())
  ON CONFLICT (id) DO UPDATE SET whatsapp_number = '+56911223344', instagram_handle = 'pedrito_nieve', updated_at = NOW();

  INSERT INTO public.profiles (id, full_name, avatar_url, whatsapp_number, instagram_handle, updated_at)
  VALUES (driver3, 'Zipp Chile', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Zipp', '+56998765432', NULL, NOW())
  ON CONFLICT (id) DO UPDATE SET whatsapp_number = '+56998765432', instagram_handle = NULL, updated_at = NOW();

  -- ============================================================
  -- 2. OBTENER IDs DE VIAJES
  -- ============================================================

  SELECT ARRAY(SELECT id FROM public.trips WHERE user_id = driver1 ORDER BY created_at) INTO trips1;
  SELECT ARRAY(SELECT id FROM public.trips WHERE user_id = driver2 ORDER BY created_at) INTO trips2;
  SELECT ARRAY(SELECT id FROM public.trips WHERE user_id = driver3 ORDER BY created_at) INTO trips3;

  RAISE NOTICE 'Viajes driver1: %, driver2: %, driver3: %',
    array_length(trips1,1), array_length(trips2,1), array_length(trips3,1);

  -- ============================================================
  -- 3. RESEÑAS PARA DRIVER1 (pedro_ski_cl)
  --    Revisores: driver2 y driver3 (los otros conductores)
  --    Meta: ~13 tags de 'cadenas' → Badge ⛓️ Experto con Cadenas
  --          10+ viajes ya existen → Badge 🏔️ Conductor Frecuente
  --          whatsapp + instagram → Badge ✅ Verificado
  -- ============================================================

  IF array_length(trips1, 1) >= 1 THEN
    INSERT INTO public.reviews (trip_id, reviewer_id, driver_id, rating, tags, comment) VALUES
      (trips1[1], driver2, driver1, 5, ARRAY['cadenas','manejo_seguro','puntual'],
       'Instaló las cadenas en 3 minutos en plena nieve. Increíble conductor.'),
      (trips1[1], driver3, driver1, 5, ARRAY['cadenas','espacio_equipos','buena_onda'],
       'Llegamos antes de lo esperado. Mucho espacio para el equipo de ski.');
  END IF;

  IF array_length(trips1, 1) >= 2 THEN
    INSERT INTO public.reviews (trip_id, reviewer_id, driver_id, rating, tags, comment) VALUES
      (trips1[2], driver2, driver1, 5, ARRAY['cadenas','puntual','manejo_seguro'], NULL),
      (trips1[2], driver3, driver1, 4, ARRAY['cadenas','buena_musica'], NULL);
  END IF;

  IF array_length(trips1, 1) >= 3 THEN
    INSERT INTO public.reviews (trip_id, reviewer_id, driver_id, rating, tags, comment) VALUES
      (trips1[3], driver2, driver1, 5, ARRAY['cadenas','manejo_seguro','espacio_equipos'], NULL),
      (trips1[3], driver3, driver1, 5, ARRAY['cadenas','puntual','buena_onda'], NULL);
  END IF;

  IF array_length(trips1, 1) >= 4 THEN
    INSERT INTO public.reviews (trip_id, reviewer_id, driver_id, rating, tags, comment) VALUES
      (trips1[4], driver2, driver1, 4, ARRAY['cadenas','manejo_seguro'], NULL),
      (trips1[4], driver3, driver1, 5, ARRAY['cadenas','puntual'],
       'Muy buen manejo en la subida. Seguro y tranquilo.');
  END IF;

  IF array_length(trips1, 1) >= 5 THEN
    INSERT INTO public.reviews (trip_id, reviewer_id, driver_id, rating, tags, comment) VALUES
      (trips1[5], driver2, driver1, 5, ARRAY['cadenas','manejo_seguro','buena_musica'], NULL),
      (trips1[5], driver3, driver1, 5, ARRAY['cadenas','espacio_equipos'], NULL);
  END IF;

  IF array_length(trips1, 1) >= 6 THEN
    INSERT INTO public.reviews (trip_id, reviewer_id, driver_id, rating, tags, comment) VALUES
      (trips1[6], driver2, driver1, 3, ARRAY['cadenas'],
       'Llegó 15 minutos tarde. El manejo estuvo bien pero la impuntualidad fue molesta.'),
      (trips1[6], driver3, driver1, 5, ARRAY['cadenas','buena_onda','puntual'], NULL);
  END IF;

  IF array_length(trips1, 1) >= 7 THEN
    INSERT INTO public.reviews (trip_id, reviewer_id, driver_id, rating, tags, comment) VALUES
      (trips1[7], driver2, driver1, 5, ARRAY['cadenas','manejo_seguro'], NULL),
      (trips1[7], driver3, driver1, 4, ARRAY['cadenas','puntual'], NULL);
  END IF;

  IF array_length(trips1, 1) >= 8 THEN
    INSERT INTO public.reviews (trip_id, reviewer_id, driver_id, rating, tags, comment) VALUES
      (trips1[8], driver2, driver1, 5, ARRAY['cadenas','espacio_equipos','buena_onda'], NULL);
  END IF;

  -- ============================================================
  -- 4. RESEÑAS PARA DRIVER2 (pedrito_nieve)
  --    Revisores: driver1 y driver3
  --    Meta: buena calificación, sin badge cadenas
  -- ============================================================

  IF array_length(trips2, 1) >= 1 THEN
    INSERT INTO public.reviews (trip_id, reviewer_id, driver_id, rating, tags, comment) VALUES
      (trips2[1], driver1, driver2, 4, ARRAY['puntual','buena_onda'], NULL),
      (trips2[1], driver3, driver2, 5, ARRAY['manejo_seguro','puntual'],
       'Muy buen conductor. Llegamos antes de lo esperado.');
  END IF;

  IF array_length(trips2, 1) >= 2 THEN
    INSERT INTO public.reviews (trip_id, reviewer_id, driver_id, rating, tags, comment) VALUES
      (trips2[2], driver1, driver2, 4, ARRAY['buena_musica','buena_onda'], NULL);
  END IF;

  IF array_length(trips2, 1) >= 3 THEN
    INSERT INTO public.reviews (trip_id, reviewer_id, driver_id, rating, tags, comment) VALUES
      (trips2[3], driver3, driver2, 5, ARRAY['manejo_seguro','espacio_equipos'], NULL);
  END IF;

  -- ============================================================
  -- 5. RESEÑAS PARA DRIVER3 (Zipp Chile - sin Instagram)
  --    Revisores: driver1 y driver2
  --    Meta: calificación mixta, sin badges
  -- ============================================================

  IF array_length(trips3, 1) >= 1 THEN
    INSERT INTO public.reviews (trip_id, reviewer_id, driver_id, rating, tags, comment) VALUES
      (trips3[1], driver1, driver3, 2, ARRAY[]::TEXT[],
       'El auto llegó tarde y no tenía espacio suficiente para los skis. No lo recomendaría.'),
      (trips3[1], driver2, driver3, 4, ARRAY['manejo_seguro'], NULL);
  END IF;

  RAISE NOTICE '============================================';
  RAISE NOTICE '✅ Seed completado exitosamente!';
  RAISE NOTICE '';
  RAISE NOTICE 'Driver1 (pedro_ski_cl):  🏔️ Frecuente + ⛓️ Cadenas + ✅ Verificado';
  RAISE NOTICE 'Driver2 (pedrito_nieve): ✅ Verificado (wa + insta)';
  RAISE NOTICE 'Driver3 (Zipp Chile):    Sin badges (no tiene instagram)';
  RAISE NOTICE '============================================';
END $$;
