-- Create Feedback Reports Table
CREATE TABLE IF NOT EXISTS public.feedback_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL, -- 'bug', 'suggestion', 'other'
    message TEXT NOT NULL,
    contact TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    page_url TEXT,
    user_agent TEXT,
    screen_size TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.feedback_reports ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone (authenticated or anon) can insert feedback reports
CREATE POLICY "Anyone can submit feedback" 
ON public.feedback_reports FOR INSERT 
TO public 
WITH CHECK (true);

-- Policy 2: Only admins can select feedback reports (or authenticated users viewing their own)
CREATE POLICY "Admins can view feedback reports" 
ON public.feedback_reports FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE public.profiles.id = auth.uid()
        AND public.profiles.is_admin = true
    )
    OR auth.uid() = user_id
);
