-- Create Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
    reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    driver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    tags TEXT[] DEFAULT '{}',
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT check_comment_on_low_rating CHECK (
        rating > 3 OR (comment IS NOT NULL AND length(trim(comment)) > 0)
    )
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policy 1: Reviews are viewable by everyone
CREATE POLICY "Reviews are viewable by everyone" 
ON public.reviews FOR SELECT 
USING (true);

-- Policy 2: Authenticated users can insert reviews for drivers (not for themselves)
CREATE POLICY "Authenticated users can insert reviews" 
ON public.reviews FOR INSERT 
TO authenticated 
WITH CHECK (
    auth.uid() = reviewer_id AND 
    auth.uid() <> driver_id
);

-- Index for fast queries by driver_id
CREATE INDEX IF NOT EXISTS idx_reviews_driver_id ON public.reviews (driver_id);

-- RPC Function to calculate reputation & badges for a driver
CREATE OR REPLACE FUNCTION public.get_driver_reputation(p_driver_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_rating_avg NUMERIC(3, 1) := 0.0;
    v_rating_count INT := 0;
    v_cadenas_count INT := 0;
    v_completed_trips INT := 0;
    v_has_whatsapp BOOLEAN := FALSE;
    v_has_instagram BOOLEAN := FALSE;
    v_is_frecuente BOOLEAN := FALSE;
    v_is_experto_cadenas BOOLEAN := FALSE;
    v_is_verificado_completo BOOLEAN := FALSE;
    v_tags_counts JSONB := '{}'::jsonb;
    v_result JSONB;
BEGIN
    -- Rating stats
    SELECT 
        COALESCE(ROUND(AVG(rating)::numeric, 1), 0.0),
        COUNT(*)
    INTO v_rating_avg, v_rating_count
    FROM public.reviews
    WHERE driver_id = p_driver_id;

    -- Count specific tag 'cadenas'
    SELECT COUNT(*)
    INTO v_cadenas_count
    FROM public.reviews
    WHERE driver_id = p_driver_id AND 'cadenas' = ANY(tags);

    -- Completed trips count for driver
    SELECT COUNT(*)
    INTO v_completed_trips
    FROM public.trips
    WHERE user_id = p_driver_id;

    -- Social verification check from profiles
    SELECT 
        (whatsapp_number IS NOT NULL AND length(trim(whatsapp_number)) > 0),
        (instagram_handle IS NOT NULL AND length(trim(instagram_handle)) > 0)
    INTO v_has_whatsapp, v_has_instagram
    FROM public.profiles
    WHERE id = p_driver_id;

    -- Calculate Badges
    v_is_frecuente := (v_completed_trips >= 10);
    v_is_experto_cadenas := (v_cadenas_count >= 10);
    v_is_verificado_completo := (COALESCE(v_has_whatsapp, FALSE) AND COALESCE(v_has_instagram, FALSE));

    -- Aggregate all tags counts
    SELECT jsonb_object_agg(tag, tag_count)
    INTO v_tags_counts
    FROM (
        SELECT unnest(tags) AS tag, COUNT(*) AS tag_count
        FROM public.reviews
        WHERE driver_id = p_driver_id
        GROUP BY tag
    ) t;

    IF v_tags_counts IS NULL THEN
        v_tags_counts := '{}'::jsonb;
    END IF;

    -- Build JSON result
    v_result := jsonb_build_object(
        'rating_avg', v_rating_avg,
        'rating_count', v_rating_count,
        'completed_trips', v_completed_trips,
        'cadenas_tags_count', v_cadenas_count,
        'tags_counts', v_tags_counts,
        'badges', jsonb_build_object(
            'frecuente', v_is_frecuente,
            'experto_cadenas', v_is_experto_cadenas,
            'verificado_completo', v_is_verificado_completo
        )
    );

    RETURN v_result;
END;
$$;
