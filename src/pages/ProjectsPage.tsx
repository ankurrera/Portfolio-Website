import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Github, ExternalLink, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAnalytics } from '@/hooks/useAnalytics';

interface Project {
  id: string;
  title: string;
  description: string;
  start_date: string | null;
  finish_date: string | null;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  thumbnail_url: string | null;
  is_featured: boolean;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { trackPageView, trackProjectView } = useAnalytics();

  useEffect(() => {
    trackPageView('/projects');
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_archived', false)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (projectId: string) => {
    trackProjectView(projectId);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-content mx-auto px-8 py-6">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-2xl font-bold">All Projects</h1>
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="max-w-content mx-auto px-8 py-12">
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 space-y-4">
                    {/* Project Image */}
                    <div className="aspect-video bg-muted rounded-md overflow-hidden">
                      {project.thumbnail_url ? (
                        <img
                          src={project.thumbnail_url}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Featured Badge */}
                    {project.is_featured && (
                      <Badge variant="secondary" className="w-fit">
                        Featured
                      </Badge>
                    )}

                    {/* Project Info */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {formatDate(project.start_date)} 
                        {project.finish_date && ` - ${formatDate(project.finish_date)}`}
                      </span>
                    </div>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Tag className="w-3 h-3" />
                          <span>Technologies</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      {project.github_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 flex-1"
                          onClick={() => {
                            handleProjectClick(project.id);
                            window.open(project.github_url!, '_blank');
                          }}
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </Button>
                      )}
                      {project.live_url && (
                        <Button
                          size="sm"
                          className="gap-2 flex-1"
                          onClick={() => {
                            handleProjectClick(project.id);
                            window.open(project.live_url!, '_blank');
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectsPage;