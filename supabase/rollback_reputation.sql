-- ============================================================
-- ROLLBACK: Eliminar tabla de reseñas y función de reputación
-- Ejecutar en: Supabase → SQL Editor
-- ============================================================

DROP TABLE IF EXISTS public.reviews CASCADE;
DROP FUNCTION IF EXISTS public.get_driver_reputation CASCADE;

RAISE NOTICE '✅ Reseñas y reputación eliminadas de la base de datos.';
