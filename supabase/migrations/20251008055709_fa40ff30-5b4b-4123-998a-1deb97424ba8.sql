-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  thumbnail_url TEXT,
  start_date DATE,
  finish_date DATE,
  is_featured BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create case_studies table
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  challenges TEXT,
  solutions TEXT,
  results TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics table
CREATE TABLE public.analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  page_path TEXT,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resume table
CREATE TABLE public.resume (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  download_count INTEGER DEFAULT 0,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_settings table
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  email TEXT,
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since there's no auth)
CREATE POLICY "Public read access for projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Public write access for projects"
  ON public.projects FOR ALL
  USING (true);

CREATE POLICY "Public read access for case_studies"
  ON public.case_studies FOR SELECT
  USING (true);

CREATE POLICY "Public write access for case_studies"
  ON public.case_studies FOR ALL
  USING (true);

CREATE POLICY "Public write access for analytics"
  ON public.analytics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public read access for analytics"
  ON public.analytics FOR SELECT
  USING (true);

CREATE POLICY "Public read access for resume"
  ON public.resume FOR SELECT
  USING (true);

CREATE POLICY "Public write access for resume"
  ON public.resume FOR ALL
  USING (true);

CREATE POLICY "Public read access for site_settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Public write access for site_settings"
  ON public.site_settings FOR ALL
  USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at
  BEFORE UPDATE ON public.case_studies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_projects_display_order ON public.projects(display_order);
CREATE INDEX idx_projects_is_archived ON public.projects(is_archived);
CREATE INDEX idx_projects_is_featured ON public.projects(is_featured);
CREATE INDEX idx_case_studies_project_id ON public.case_studies(project_id);
CREATE INDEX idx_analytics_event_type ON public.analytics(event_type);
CREATE INDEX idx_analytics_project_id ON public.analytics(project_id);
CREATE INDEX idx_analytics_created_at ON public.analytics(created_at);

-- Create storage bucket for project thumbnails
INSERT INTO storage.buckets (id, name) 
VALUES ('project-thumbnails', 'project-thumbnails')
ON CONFLICT DO NOTHING;

-- Create storage policies for project thumbnails
CREATE POLICY "Public access to project thumbnails"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-thumbnails');

CREATE POLICY "Public upload to project thumbnails"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-thumbnails');

CREATE POLICY "Public update to project thumbnails"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-thumbnails');

CREATE POLICY "Public delete from project thumbnails"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-thumbnails');

-- Create storage bucket for resume files
INSERT INTO storage.buckets (id, name) 
VALUES ('resume-files', 'resume-files')
ON CONFLICT DO NOTHING;

-- Create storage policies for resume files
CREATE POLICY "Public access to resume files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resume-files');

CREATE POLICY "Public upload to resume files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resume-files');

CREATE POLICY "Public delete from resume files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'resume-files');

-- Create storage bucket for og images
INSERT INTO storage.buckets (id, name) 
VALUES ('og-images', 'og-images')
ON CONFLICT DO NOTHING;

-- Create storage policies for og images
CREATE POLICY "Public access to og images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'og-images');

CREATE POLICY "Public upload to og images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'og-images');

CREATE POLICY "Public delete from og images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'og-images');