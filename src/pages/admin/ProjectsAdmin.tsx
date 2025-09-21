import React, { useEffect, useState } from 'react';
import { Plus, Edit, Archive, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProjectDialog from '@/components/admin/ProjectDialog';
import { useLocation } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

interface SortableProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onToggleFeatured: (project: Project) => void;
  onToggleArchive: (project: Project) => void;
  onDelete: (project: Project) => void;
}

const SortableProjectCard: React.FC<SortableProjectCardProps> = ({
  project,
  onEdit,
  onToggleFeatured,
  onToggleArchive,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={project.is_archived ? 'opacity-60' : ''}
    >
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
            <button
              className="flex items-center gap-1 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                #{project.display_order}
              </span>
            </button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
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

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(project)}
              className="gap-2"
            >
              <Edit className="w-3 h-3" />
              Edit
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onToggleFeatured(project)}
              className="gap-2"
            >
              {project.is_featured ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {project.is_featured ? 'Unfeature' : 'Feature'}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onToggleArchive(project)}
              className="gap-2"
            >
              <Archive className="w-3 h-3" />
              {project.is_archived ? 'Restore' : 'Archive'}
            </Button>
            
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(project)}
              className="gap-2"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  
  // Check for demo mode in URL or session storage
  const isDemoMode = location.search.includes('demo=true') || 
                     sessionStorage.getItem('demoMode') === 'true';

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Mock data for demo mode
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'AI Analytics Dashboard',
      description: 'Real-time data visualization platform with machine learning insights for enterprise clients.',
      start_date: '2024-01-01',
      finish_date: '2024-06-01',
      technologies: ['React', 'TypeScript', 'Python', 'TensorFlow'],
      github_url: 'https://github.com/example/ai-dashboard',
      live_url: 'https://ai-dashboard.example.com',
      thumbnail_url: null,
      is_featured: true,
      is_archived: false,
      display_order: 1,
    },
    {
      id: '2',
      title: 'Blockchain Wallet',
      description: 'Secure multi-chain cryptocurrency wallet with DeFi integration and advanced security features.',
      start_date: '2023-06-01',
      finish_date: null,
      technologies: ['Next.js', 'Web3', 'Solidity', 'Node.js'],
      github_url: 'https://github.com/example/blockchain-wallet',
      live_url: null,
      thumbnail_url: null,
      is_featured: false,
      is_archived: false,
      display_order: 2,
    },
    {
      id: '3',
      title: 'E-commerce Platform',
      description: 'Modern shopping experience with AR try-on features and personalized recommendations.',
      start_date: '2023-01-01',
      finish_date: '2023-12-01',
      technologies: ['Vue.js', 'Express', 'MongoDB', 'AWS'],
      github_url: 'https://github.com/example/ecommerce',
      live_url: 'https://shop.example.com',
      thumbnail_url: null,
      is_featured: true,
      is_archived: false,
      display_order: 3,
    },
    {
      id: '4',
      title: 'IoT Management System',
      description: 'Comprehensive platform for monitoring and controlling smart devices across multiple locations.',
      start_date: '2022-01-01',
      finish_date: '2022-12-01',
      technologies: ['React Native', 'MQTT', 'PostgreSQL', 'Docker'],
      github_url: 'https://github.com/example/iot-system',
      live_url: 'https://iot.example.com',
      thumbnail_url: null,
      is_featured: false,
      is_archived: true,
      display_order: 4,
    },
  ];

  useEffect(() => {
    if (isDemoMode) {
      setProjects(mockProjects);
      setLoading(false);
    } else {
      fetchProjects();
    }
  }, [isDemoMode]);

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = projects.findIndex((project) => project.id === active.id);
      const newIndex = projects.findIndex((project) => project.id === over?.id);

      const reorderedProjects = arrayMove(projects, oldIndex, newIndex);
      
      // Update display_order for all projects
      const updatedProjects = reorderedProjects.map((project, index) => ({
        ...project,
        display_order: index + 1,
      }));

      setProjects(updatedProjects);

      if (isDemoMode) {
        toast({
          title: "Demo Mode",
          description: "Project order updated (changes won't be saved in demo mode)",
        });
        return;
      }

      try {
        // Update display orders in database
        const updates = updatedProjects.map((project) =>
          supabase
            .from('projects')
            .update({ display_order: project.display_order })
            .eq('id', project.id)
        );

        await Promise.all(updates);

        toast({
          title: "Success",
          description: "Project order updated successfully",
        });
      } catch (error) {
        console.error('Error updating project order:', error);
        toast({
          title: "Error",
          description: "Failed to update project order",
          variant: "destructive",
        });
        // Revert changes
        fetchProjects();
      }
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
    if (isDemoMode) {
      // Update state locally in demo mode
      setProjects(prev => prev.map(p => 
        p.id === project.id 
          ? { ...p, is_archived: !p.is_archived }
          : p
      ));
      toast({
        title: "Demo Mode",
        description: `Project ${project.is_archived ? 'restored' : 'archived'} (changes won't be saved in demo mode)`,
      });
      return;
    }

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
    if (isDemoMode) {
      // Update state locally in demo mode
      setProjects(prev => prev.map(p => 
        p.id === project.id 
          ? { ...p, is_featured: !p.is_featured }
          : p
      ));
      toast({
        title: "Demo Mode",
        description: `Project ${project.is_featured ? 'removed from' : 'added to'} featured (changes won't be saved in demo mode)`,
      });
      return;
    }

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

    if (isDemoMode) {
      // Remove from state locally in demo mode
      setProjects(prev => prev.filter(p => p.id !== project.id));
      toast({
        title: "Demo Mode",
        description: "Project deleted (changes won't be saved in demo mode)",
      });
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

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Manage your portfolio projects and their display order. Drag projects to reorder them.
            {isDemoMode && <span className="text-yellow-600"> (Demo Mode - changes won't be saved)</span>}
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No projects found. Create your first project!</p>
            </CardContent>
          </Card>
        ) : (
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
              {projects.map((project) => (
                <SortableProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleEdit}
                  onToggleFeatured={handleToggleFeatured}
                  onToggleArchive={handleToggleArchive}
                  onDelete={handleDelete}
                />
              ))}
            </SortableContext>
          </DndContext>
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