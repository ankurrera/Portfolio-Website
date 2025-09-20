import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAnalytics = () => {
  const trackPageView = async (pagePath: string) => {
    try {
      await supabase
        .from('analytics')
        .insert({
          event_type: 'page_view',
          page_path: pagePath,
          user_agent: navigator.userAgent,
        });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const trackProjectView = async (projectId: string) => {
    try {
      await supabase
        .from('analytics')
        .insert({
          event_type: 'project_view',
          project_id: projectId,
          user_agent: navigator.userAgent,
        });
    } catch (error) {
      console.error('Error tracking project view:', error);
    }
  };

  const trackResumeDownload = async () => {
    try {
      await supabase
        .from('analytics')
        .insert({
          event_type: 'resume_download',
          user_agent: navigator.userAgent,
        });

      // Increment resume download count
      const { data: currentResume } = await supabase
        .from('resume')
        .select('*')
        .order('uploaded_at', { ascending: false })
        .limit(1)
        .single();

      if (currentResume) {
        await supabase
          .from('resume')
          .update({ download_count: (currentResume.download_count || 0) + 1 })
          .eq('id', currentResume.id);
      }
    } catch (error) {
      console.error('Error tracking resume download:', error);
    }
  };

  return {
    trackPageView,
    trackProjectView,
    trackResumeDownload,
  };
};