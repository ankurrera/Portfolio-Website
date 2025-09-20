-- Create database schema for portfolio admin dashboard

-- Admin users table for authentication
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE,
  finish_date DATE,
  technologies TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  thumbnail_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Case studies table  
CREATE TABLE public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  challenges TEXT,
  solutions TEXT,
  results TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resume table (single row for current resume)
CREATE TABLE public.resume (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_url TEXT NOT NULL,
  filename TEXT NOT NULL,
  download_count INTEGER DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings table
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  meta_title TEXT DEFAULT 'Portfolio',
  meta_description TEXT DEFAULT 'Professional Portfolio',
  og_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics table for tracking
CREATE TABLE public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- 'page_view', 'resume_download', 'project_view'
  page_path TEXT,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin access
CREATE POLICY "Admins can manage admin_users" ON public.admin_users
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Admins can manage projects" ON public.projects
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can read published projects" ON public.projects
  FOR SELECT USING (NOT is_archived);

CREATE POLICY "Admins can manage case_studies" ON public.case_studies
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can read case_studies" ON public.case_studies
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage resume" ON public.resume
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can read resume" ON public.resume
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage site_settings" ON public.site_settings
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can read site_settings" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Public can insert analytics" ON public.analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can read analytics" ON public.analytics
  FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid()));

-- Create storage bucket for project images and resumes
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('project-images', 'project-images', true),
  ('resumes', 'resumes', false);

-- Storage policies for project images
CREATE POLICY "Public can view project images" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'project-images' AND 
    auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can update project images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'project-images' AND 
    auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can delete project images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'project-images' AND 
    auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid())
  );

-- Storage policies for resumes
CREATE POLICY "Public can download resumes" ON storage.objects
  FOR SELECT USING (bucket_id = 'resumes');

CREATE POLICY "Admins can upload resumes" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'resumes' AND 
    auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can update resumes" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'resumes' AND 
    auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can delete resumes" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'resumes' AND 
    auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid())
  );

-- Insert default site settings
INSERT INTO public.site_settings (github_url, linkedin_url, meta_title, meta_description) 
VALUES ('https://github.com', 'https://linkedin.com', 'Portfolio', 'Professional Portfolio Website');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON public.case_studies 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();