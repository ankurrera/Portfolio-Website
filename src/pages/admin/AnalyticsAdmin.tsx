import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, MousePointer, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  totalPageViews: number;
  totalProjectViews: number;
  totalResumeDownloads: number;
  recentEvents: {
    id: string;
    event_type: string;
    page_path: string | null;
    created_at: string;
    projects?: {
      title: string;
    } | null;
  }[];
  topPages: {
    page_path: string;
    views: number;
  }[];
  topProjects: {
    project_title: string;
    views: number;
  }[];
}

const AnalyticsAdmin = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalPageViews: 0,
    totalProjectViews: 0,
    totalResumeDownloads: 0,
    recentEvents: [],
    topPages: [],
    topProjects: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Get total counts
      const [pageViewsResponse, projectViewsResponse, resumeDownloadsResponse] = await Promise.all([
        supabase
          .from('analytics')
          .select('id')
          .eq('event_type', 'page_view'),
        
        supabase
          .from('analytics')
          .select('id')
          .eq('event_type', 'project_view'),
        
        supabase
          .from('analytics')
          .select('id')
          .eq('event_type', 'resume_download'),
      ]);

      // Get recent events
      const { data: recentEvents } = await supabase
        .from('analytics')
        .select(`
          id,
          event_type,
          page_path,
          created_at,
          projects (
            title
          )
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      // Get top pages
      const { data: pageViews } = await supabase
        .from('analytics')
        .select('page_path')
        .eq('event_type', 'page_view')
        .not('page_path', 'is', null);

      // Get top projects
      const { data: projectViews } = await supabase
        .from('analytics')
        .select(`
          project_id,
          projects (
            title
          )
        `)
        .eq('event_type', 'project_view')
        .not('project_id', 'is', null);

      // Process top pages
      const pageViewCounts: { [key: string]: number } = {};
      pageViews?.forEach((view) => {
        if (view.page_path) {
          pageViewCounts[view.page_path] = (pageViewCounts[view.page_path] || 0) + 1;
        }
      });

      const topPages = Object.entries(pageViewCounts)
        .map(([page_path, views]) => ({ page_path, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      // Process top projects
      const projectViewCounts: { [key: string]: number } = {};
      projectViews?.forEach((view) => {
        if (view.projects?.title) {
          const title = view.projects.title;
          projectViewCounts[title] = (projectViewCounts[title] || 0) + 1;
        }
      });

      const topProjects = Object.entries(projectViewCounts)
        .map(([project_title, views]) => ({ project_title, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      setAnalytics({
        totalPageViews: pageViewsResponse.data?.length || 0,
        totalProjectViews: projectViewsResponse.data?.length || 0,
        totalResumeDownloads: resumeDownloadsResponse.data?.length || 0,
        recentEvents: recentEvents || [],
        topPages,
        topProjects,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getEventBadgeVariant = (eventType: string) => {
    switch (eventType) {
      case 'page_view':
        return 'default';
      case 'project_view':
        return 'secondary';
      case 'resume_download':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'page_view':
        return <Eye className="w-3 h-3" />;
      case 'project_view':
        return <MousePointer className="w-3 h-3" />;
      case 'resume_download':
        return <Download className="w-3 h-3" />;
      default:
        return <Calendar className="w-3 h-3" />;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track visitor behavior and engagement with your portfolio.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalPageViews}</div>
            <p className="text-xs text-muted-foreground">Total page views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Views</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalProjectViews}</div>
            <p className="text-xs text-muted-foreground">Project interactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resume Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalResumeDownloads}</div>
            <p className="text-xs text-muted-foreground">Resume downloads</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.topPages.length === 0 ? (
              <p className="text-muted-foreground text-sm">No page view data available</p>
            ) : (
              <div className="space-y-3">
                {analytics.topPages.map((page, index) => (
                  <div key={page.page_path} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-muted-foreground">
                        #{index + 1}
                      </span>
                      <span className="text-sm">
                        {page.page_path || 'Homepage'}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {page.views} views
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Top Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.topProjects.length === 0 ? (
              <p className="text-muted-foreground text-sm">No project view data available</p>
            ) : (
              <div className="space-y-3">
                {analytics.topProjects.map((project, index) => (
                  <div key={project.project_title} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-muted-foreground">
                        #{index + 1}
                      </span>
                      <span className="text-sm">
                        {project.project_title}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {project.views} views
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {analytics.recentEvents.length === 0 ? (
            <p className="text-muted-foreground text-sm">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {analytics.recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={getEventBadgeVariant(event.event_type)} className="gap-1">
                      {getEventIcon(event.event_type)}
                      {event.event_type.replace('_', ' ')}
                    </Badge>
                    <span className="text-sm">
                      {event.event_type === 'project_view' && event.projects?.title
                        ? `Project: ${event.projects.title}`
                        : event.page_path
                        ? `Page: ${event.page_path}`
                        : 'Unknown action'
                      }
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(event.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsAdmin;