import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

interface ProjectDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({
  project,
  open,
  onOpenChange,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    finish_date: '',
    github_url: '',
    live_url: '',
    thumbnail_url: '',
    is_featured: false,
  });
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTech, setNewTech] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        start_date: project.start_date || '',
        finish_date: project.finish_date || '',
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        thumbnail_url: project.thumbnail_url || '',
        is_featured: project.is_featured,
      });
      setTechnologies(project.technologies || []);
    } else {
      setFormData({
        title: '',
        description: '',
        start_date: '',
        finish_date: '',
        github_url: '',
        live_url: '',
        thumbnail_url: '',
        is_featured: false,
      });
      setTechnologies([]);
    }
  }, [project]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTechnology = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies(prev => [...prev, newTech.trim()]);
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(prev => prev.filter(t => t !== tech));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `project-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      handleInputChange('thumbnail_url', data.publicUrl);

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project title",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const projectData = {
        ...formData,
        technologies,
        start_date: formData.start_date || null,
        finish_date: formData.finish_date || null,
        github_url: formData.github_url || null,
        live_url: formData.live_url || null,
        thumbnail_url: formData.thumbnail_url || null,
      };

      if (project) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id);

        if (error) throw error;
      } else {
        // Create new project
        const { data: maxOrder } = await supabase
          .from('projects')
          .select('display_order')
          .order('display_order', { ascending: false })
          .limit(1);

        const nextOrder = (maxOrder?.[0]?.display_order || 0) + 1;

        const { error } = await supabase
          .from('projects')
          .insert([{ ...projectData, display_order: nextOrder }]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Project ${project ? 'updated' : 'created'} successfully`,
      });

      onSave();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: `Failed to ${project ? 'update' : 'create'} project`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {project ? 'Edit Project' : 'Create Project'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter project title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your project"
                rows={3}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => handleInputChange('start_date', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="finish_date">End Date</Label>
              <Input
                id="finish_date"
                type="date"
                value={formData.finish_date}
                onChange={(e) => handleInputChange('finish_date', e.target.value)}
              />
            </div>
          </div>

          {/* Technologies */}
          <div>
            <Label>Technologies</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              />
              <Button type="button" onClick={addTechnology} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="gap-1">
                  {tech}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeTechnology(tech)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                type="url"
                value={formData.github_url}
                onChange={(e) => handleInputChange('github_url', e.target.value)}
                placeholder="https://github.com/username/repo"
              />
            </div>
            <div>
              <Label htmlFor="live_url">Live Demo URL</Label>
              <Input
                id="live_url"
                type="url"
                value={formData.live_url}
                onChange={(e) => handleInputChange('live_url', e.target.value)}
                placeholder="https://project-demo.com"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label>Project Thumbnail</Label>
            <div className="mt-2 space-y-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {formData.thumbnail_url && (
                <div className="mt-2">
                  <img
                    src={formData.thumbnail_url}
                    alt="Thumbnail preview"
                    className="w-32 h-20 object-cover rounded border"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => handleInputChange('is_featured', checked === true)}
            />
            <Label htmlFor="is_featured">Feature this project on homepage</Label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading || uploading}>
            {loading ? 'Saving...' : uploading ? 'Uploading...' : 'Save Project'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;