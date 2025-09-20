import React, { useEffect, useState } from 'react';
import { Plus, Edit, Archive, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProjectDialog from '@/components/admin/ProjectDialog';

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
  is_archived: boolean;
  display_order: number;
}

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
  };

  const handleToggleArchive = async (project: Project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ is_archived: !project.is_archived })
        .eq('id', project.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Project ${project.is_archived ? 'restored' : 'archived'} successfully`,
      });

      fetchProjects();
    } catch (error) {
      console.error('Error toggling archive:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ is_featured: !project.is_featured })
        .eq('id', project.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Project ${project.is_featured ? 'removed from' : 'added to'} featured`,
      });

      fetchProjects();
    } catch (error) {
      console.error('Error toggling featured:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Are you sure you want to permanently delete "${project.title}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage your portfolio projects and their display order.
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No projects found. Create your first project!</p>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className={project.is_archived ? 'opacity-60' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      {project.is_featured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                      {project.is_archived && (
                        <Badge variant="outline">Archived</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      #{project.display_order}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Start Date:</span> {formatDate(project.start_date)}
                  </div>
                  <div>
                    <span className="font-medium">End Date:</span> {formatDate(project.finish_date)}
                  </div>
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(project)}
                      className="gap-2"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleFeatured(project)}
                      className="gap-2"
                    >
                      {project.is_featured ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {project.is_featured ? 'Unfeature' : 'Feature'}
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleArchive(project)}
                      className="gap-2"
                    >
                      <Archive className="w-3 h-3" />
                      {project.is_archived ? 'Restore' : 'Archive'}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(project)}
                      className="gap-2"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <ProjectDialog
        project={editingProject}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={() => {
          setIsDialogOpen(false);
          fetchProjects();
        }}
      />
    </div>
  );
};

export default ProjectsAdmin;