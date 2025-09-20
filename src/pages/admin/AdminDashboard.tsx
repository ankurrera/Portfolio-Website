import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, BookOpen, FileText, Download, Eye, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  totalProjects: number;
  featuredProjects: number;
  totalCaseStudies: number;
  resumeDownloads: number;
  pageViews: number;
  projectViews: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    featuredProjects: 0,
    totalCaseStudies: 0,
    resumeDownloads: 0,
    pageViews: 0,
    projectViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch project stats
      const { data: projects } = await supabase
        .from('projects')
        .select('id, is_featured, is_archived');

      // Fetch case studies count
      const { data: caseStudies } = await supabase
        .from('case_studies')
        .select('id');

      // Fetch resume downloads
      const { data: resume } = await supabase
        .from('resume')
        .select('download_count')
        .order('uploaded_at', { ascending: false })
        .limit(1)
        .single();

      // Fetch analytics
      const { data: pageViewsData } = await supabase
        .from('analytics')
        .select('id')
        .eq('event_type', 'page_view');

      const { data: projectViewsData } = await supabase
        .from('analytics')
        .select('id')
        .eq('event_type', 'project_view');

      const { data: resumeDownloadsData } = await supabase
        .from('analytics')
        .select('id')
        .eq('event_type', 'resume_download');

      setStats({
        totalProjects: projects?.filter(p => !p.is_archived).length || 0,
        featuredProjects: projects?.filter(p => p.is_featured && !p.is_archived).length || 0,
        totalCaseStudies: caseStudies?.length || 0,
        resumeDownloads: resumeDownloadsData?.length || 0,
        pageViews: pageViewsData?.length || 0,
        projectViews: projectViewsData?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderOpen,
      description: `${stats.featuredProjects} featured`,
    },
    {
      title: 'Case Studies',
      value: stats.totalCaseStudies,
      icon: BookOpen,
      description: 'Published case studies',
    },
    {
      title: 'Resume Downloads',
      value: stats.resumeDownloads,
      icon: Download,
      description: 'All-time downloads',
    },
    {
      title: 'Page Views',
      value: stats.pageViews,
      icon: Eye,
      description: 'Total page views',
    },
    {
      title: 'Project Views',
      value: stats.projectViews,
      icon: Users,
      description: 'Project interactions',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your portfolio performance and content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-muted-foreground">
              • Add a new project to showcase your work
            </div>
            <div className="text-sm text-muted-foreground">
              • Write a case study for your latest project
            </div>
            <div className="text-sm text-muted-foreground">
              • Update your resume and track downloads
            </div>
            <div className="text-sm text-muted-foreground">
              • Review analytics to understand visitor behavior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Check the Analytics section for detailed visitor insights and engagement metrics.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;